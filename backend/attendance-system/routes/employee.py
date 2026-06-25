from flask import Blueprint
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)
from datetime import date

from models.user import User
from models.attendance import Attendance
from models.leave_balance import LeaveBalance
from models.leave import LeaveRequest
from flask import request
import bcrypt
from extensions import db

employee_bp = Blueprint(
    "employee",
    __name__
)


@employee_bp.route(
    "/dashboard",
    methods=["GET"]
)
@jwt_required()
def dashboard():

    user_id = get_jwt_identity()

    user = User.query.get(user_id)

    today = date.today()

    attendance = Attendance.query.filter_by(
        user_id=user_id,
        attendance_date=today
    ).first()

    balance = LeaveBalance.query.filter_by(
        user_id=user_id
    ).first()

    pending_leaves = LeaveRequest.query.filter_by(
        user_id=user_id,
        status="pending"
    ).count()

    working_hours = None
    clock_in = None
    clock_out = None

    if attendance:

        if attendance.clock_in:
            clock_in = attendance.clock_in.strftime(
                "%H:%M:%S"
            )

        if attendance.clock_out:
            clock_out = attendance.clock_out.strftime(
                "%H:%M:%S"
            )

        if (
            attendance.clock_in and
            attendance.clock_out
        ):
            working_hours = str(
                attendance.clock_out -
                attendance.clock_in
            )

    remaining_cl = 0
    remaining_el = 0

    if balance:
        remaining_cl = (
            balance.opening_cl -
            balance.cl_used
        )

        remaining_el = (
            balance.opening_el -
            balance.el_used
        )

    return {
        "employee_id": user.employee_id,
        "name": user.name,
        "designation": user.designation,
        "today_status":
            attendance.status
            if attendance else "Not Marked",
        "clock_in": clock_in,
        "clock_out": clock_out,
        "working_hours": working_hours,
        "remaining_cl": remaining_cl,
        "remaining_el": remaining_el,
        "pending_leaves": pending_leaves
    }
@employee_bp.route(
    "/change-password",
    methods=["PUT"]
)
@jwt_required()
def change_password():

    user_id = get_jwt_identity()

    user = User.query.get(user_id)

    data = request.get_json()

    if not bcrypt.checkpw(
        data["old_password"].encode(),
        user.password.encode()
    ):
        return {
            "message":
            "Old password incorrect"
        }, 400

    new_password = bcrypt.hashpw(
        data["new_password"].encode(),
        bcrypt.gensalt()
    ).decode()

    user.password = new_password
    user.must_change_password = False

    db.session.commit()

    return {
        "message":
        "Password changed successfully"
    }