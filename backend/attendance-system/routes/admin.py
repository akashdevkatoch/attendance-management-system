from flask import Blueprint, request
from flask_jwt_extended import jwt_required
import bcrypt

from extensions import db
from models.user import User
from datetime import date
from models.attendance import Attendance
from datetime import date
from models.attendance import Attendance
from models.leave import LeaveRequest
from models.leave_balance import LeaveBalance
from sqlalchemy import extract
from flask import send_file
from openpyxl import Workbook
from io import BytesIO


admin_bp = Blueprint(
    "admin",
    __name__
)


@admin_bp.route(
    "/employees",
    methods=["POST"]
)
@jwt_required()
def add_employee():

    data = request.get_json()

    user = User.query.filter_by(
        employee_id=data["employee_id"]
    ).first()

    if user:
        return {
            "message":
            "Employee already exists"
        }, 400

    password = bcrypt.hashpw(
        data["password"].encode(),
        bcrypt.gensalt()
    ).decode()

    employee = User(
        employee_id=data["employee_id"],
        name=data["name"],
        email=data["email"],
        mobile=data["mobile"],
        designation=data["designation"],
        role=data.get(
            "role",
            "employee"
        ),
        password=password,
        status="active"
    )

    db.session.add(employee)
    db.session.commit()

    return {
        "message":
        "Employee Added Successfully"
    }
@admin_bp.route(
    "/employees",
    methods=["GET"]
)
@jwt_required()
def get_employees():

    employees = User.query.all()

    result = []

    for emp in employees:
        result.append({
            "id": emp.id,
            "employee_id": emp.employee_id,
            "name": emp.name,
            "email": emp.email,
            "mobile": emp.mobile,
            "designation": emp.designation,
            "role": emp.role,
            "status": emp.status
        })

    return result
@admin_bp.route(
    "/employees/<int:id>",
    methods=["DELETE"]
)
@jwt_required()
def delete_employee(id):

    employee = User.query.get(id)

    if not employee:
        return {
            "message":
            "Employee not found"
        }, 404

    db.session.delete(employee)
    db.session.commit()

    return {
        "message":
        "Employee Deleted"
    }
@admin_bp.route(
    "/employees/<int:id>",
    methods=["PUT"]
)
@jwt_required()
def update_employee(id):

    employee = User.query.get(id)

    if not employee:
        return {
            "message":
            "Employee not found"
        }, 404

    data = request.get_json()

    employee.name = data.get(
        "name",
        employee.name
    )

    employee.email = data.get(
        "email",
        employee.email
    )

    employee.mobile = data.get(
        "mobile",
        employee.mobile
    )

    employee.designation = data.get(
        "designation",
        employee.designation
    )

    employee.role = data.get(
        "role",
        employee.role
    )

    employee.status = data.get(
        "status",
        employee.status
    )

    db.session.commit()

    return {
        "message":
        "Employee Updated"
    }
@admin_bp.route(
    "/employees/<int:id>/reset-password",
    methods=["PUT"]
)
@jwt_required()
def reset_password(id):

    employee = User.query.get(id)

    if not employee:
        return {
            "message":
            "Employee not found"
        }, 404

    data = request.get_json()

    password = bcrypt.hashpw(
        data["password"].encode(),
        bcrypt.gensalt()
    ).decode()

    employee.password = password
    employee.must_change_password = True

    db.session.commit()

    return {
        "message":
        "Password Reset Successfully"
    }

@admin_bp.route(
    "/dashboard",
    methods=["GET"]
)
@jwt_required()
def dashboard():

    today = date.today()

    total_employees = User.query.filter(
        User.role != "admin"
    ).count()

    present = Attendance.query.filter_by(
        attendance_date=today,
        status="present"
    ).count()

    late = Attendance.query.filter_by(
        attendance_date=today,
        status="late"
    ).count()

    clocked_out = Attendance.query.filter(
        Attendance.attendance_date == today,
        Attendance.clock_out.isnot(None)
    ).count()

    absent = (
        total_employees -
        present -
        late
    )

    pending_leaves = LeaveRequest.query.filter_by(
        status="pending"
    ).count()

    return {
        "total_employees":
        total_employees,

        "present":
        present,

        "late":
        late,

        "absent":
        absent,

        "clocked_out":
        clocked_out,

        "pending_leaves":
        pending_leaves
    }
from models.leave import LeaveRequest
@admin_bp.route(
    "/leaves",
    methods=["GET"]
)
@jwt_required()
def get_leaves():

    leaves = LeaveRequest.query.order_by(
        LeaveRequest.created_at.desc()
    ).all()

    result = []

    for leave in leaves:

        user = User.query.get(
            leave.user_id
        )

        result.append({
            "id": leave.id,
            "employee_id": user.employee_id,
            "name": user.name,
            "leave_type": leave.leave_type,
            "from_date": str(leave.from_date),
            "to_date": str(leave.to_date),
            "total_days": leave.total_days,
            "reason": leave.reason,
            "status": leave.status
        })

    return result
@admin_bp.route(
    "/leaves/<int:id>/approve",
    methods=["PUT"]
)
@jwt_required()
def approve_leave(id):

    leave = LeaveRequest.query.get(id)

    if not leave:
        return {
            "message": "Leave not found"
        }, 404

    if leave.status == "approved":
        return {
            "message": "Leave already approved"
        }, 400

    balance = LeaveBalance.query.filter_by(
        user_id=leave.user_id
    ).first()

    if not balance:
        return {
            "message": "Leave balance not set"
        }, 400

    # CL Validation
    if leave.leave_type == "CL":

        remaining_cl = (
            balance.opening_cl -
            balance.cl_used
        )

        if remaining_cl < leave.total_days:
            return {
                "message": "Insufficient CL Balance"
            }, 400

        balance.cl_used += leave.total_days

    # EL Validation
    elif leave.leave_type == "EL":

        remaining_el = (
            balance.opening_el -
            balance.el_used
        )

        if remaining_el < leave.total_days:
            return {
                "message": "Insufficient EL Balance"
            }, 400

        balance.el_used += leave.total_days

    leave.status = "approved"

    db.session.commit()

    return {
        "message": "Leave Approved Successfully",
        "leave_type": leave.leave_type,
        "total_days": leave.total_days,
        "remaining_cl": (
            balance.opening_cl - balance.cl_used
        ),
        "remaining_el": (
            balance.opening_el - balance.el_used
        )
    }
@admin_bp.route(
    "/leaves/<int:id>/reject",
    methods=["PUT"]
)
@jwt_required()
def reject_leave(id):

    leave = LeaveRequest.query.get(id)

    if not leave:
        return {
            "message":
            "Leave not found"
        }, 404

    data = request.get_json()

    leave.status = "rejected"
    leave.admin_remark = data.get(
        "remark"
    )

    db.session.commit()

    return {
        "message":
        "Leave Rejected"
    }
@admin_bp.route(
    "/employees/<int:id>/leave-balance",
    methods=["PUT"]
)
@jwt_required()
def set_leave_balance(id):

    employee = User.query.get(id)

    if not employee:
        return {
            "message":
            "Employee not found"
        }, 404

    data = request.get_json()

    balance = LeaveBalance.query.filter_by(
        user_id=id
    ).first()

    if not balance:

        balance = LeaveBalance(
            user_id=id
        )

        db.session.add(balance)

    balance.opening_cl = data.get(
        "opening_cl",
        balance.opening_cl
    )

    balance.opening_el = data.get(
        "opening_el",
        balance.opening_el
    )

    db.session.commit()

    return {
        "message":
        "Leave Balance Updated"
    }
@admin_bp.route(
    "/employees/<int:id>/reset-device",
    methods=["PUT"]
)
@jwt_required()
def reset_device(id):

    employee = User.query.get(id)

    if not employee:
        return {
            "message":
            "Employee not found"
        }, 404

    employee.device_id = None

    db.session.commit()

    return {
        "message":
        "Device Reset Successfully"
    }
@admin_bp.route(
    "/attendance/monthly/<int:user_id>",
    methods=["GET"]
)
@jwt_required()
def monthly_attendance(user_id):

    month = request.args.get(
        "month",
        type=int
    )

    year = request.args.get(
        "year",
        type=int
    )

    if not month or not year:
        return {
            "message":
            "Month and Year required"
        }, 400

    employee = User.query.get(user_id)

    if not employee:
        return {
            "message":
            "Employee not found"
        }, 404

    attendance = Attendance.query.filter(
        Attendance.user_id == user_id,
        extract(
            "month",
            Attendance.attendance_date
        ) == month,
        extract(
            "year",
            Attendance.attendance_date
        ) == year
    ).order_by(
        Attendance.attendance_date
    ).all()

    result = []

    for item in attendance:

        working_hours = None

        if item.clock_in and item.clock_out:
            diff = (
                item.clock_out -
                item.clock_in
            )
            working_hours = str(diff)

        result.append({
            "date":
            str(item.attendance_date),

            "clock_in":
            str(item.clock_in),

            "clock_out":
            str(item.clock_out),

            "working_hours":
            working_hours,

            "status":
            item.status
        })

    return {
        "employee_id":
        employee.employee_id,

        "name":
        employee.name,

        "month":
        month,

        "year":
        year,

        "attendance":
        result
    }
@admin_bp.route(
    "/attendance/export/<int:user_id>",
    methods=["GET"]
)
@jwt_required()
def export_attendance(user_id):

    employee = User.query.get(user_id)

    if not employee:
        return {
            "message": "Employee not found"
        }, 404

    attendance = Attendance.query.filter_by(
        user_id=user_id
    ).order_by(
        Attendance.attendance_date
    ).all()

    wb = Workbook()
    ws = wb.active
    ws.title = "Attendance"

    ws.append([
        "Date",
        "Clock In",
        "Clock Out",
        "Working Hours",
        "Status"
    ])

    for item in attendance:

        working_hours = ""

        if item.clock_in and item.clock_out:
            diff = (
                item.clock_out -
                item.clock_in
            )
            working_hours = str(diff)

        ws.append([
            str(item.attendance_date),
            str(item.clock_in),
            str(item.clock_out),
            working_hours,
            item.status
        ])

    file = BytesIO()
    wb.save(file)
    file.seek(0)

    return send_file(
        file,
        as_attachment=True,
        download_name=f"{employee.employee_id}_attendance.xlsx",
        mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )