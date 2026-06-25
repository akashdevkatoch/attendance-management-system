from flask import Blueprint
from flask import request
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)
from datetime import datetime

from extensions import db
from models.leave import LeaveRequest

leave_bp = Blueprint(
    "leave",
    __name__
)


@leave_bp.route(
    "/apply",
    methods=["POST"]
)
@jwt_required()
def apply_leave():

    user_id = get_jwt_identity()

    data = request.get_json()

    from_date = datetime.strptime(
        data["from_date"],
        "%Y-%m-%d"
    ).date()

    to_date = datetime.strptime(
        data["to_date"],
        "%Y-%m-%d"
    ).date()

    # Validation 1
    if to_date < from_date:
        return {
            "message":
                "To Date cannot be before From Date"
        }, 400

    # Validation 2
    existing = LeaveRequest.query.filter(
        LeaveRequest.user_id == user_id,
        LeaveRequest.status.in_(
            ["pending", "approved"]
        ),
        LeaveRequest.from_date <= to_date,
        LeaveRequest.to_date >= from_date
    ).first()

    if existing:
        return {
            "message":
                "Leave already exists for selected dates"
        }, 400

    total_days = (
                         to_date -
                         from_date
                 ).days + 1
    leave = LeaveRequest(
        user_id=user_id,
        leave_type=data["leave_type"],
        from_date=from_date,
        to_date=to_date,
        total_days=total_days,
        reason=data["reason"]
    )

    db.session.add(leave)
    db.session.commit()

    return {
        "message":
        "Leave Applied Successfully"
    }
@leave_bp.route(
    "/history",
    methods=["GET"]
)
@jwt_required()
def leave_history():

    user_id = get_jwt_identity()

    leaves = LeaveRequest.query.filter_by(
        user_id=user_id
    ).order_by(
        LeaveRequest.created_at.desc()
    ).all()

    result = []

    for leave in leaves:

        result.append({
            "id": leave.id,
            "leave_type": leave.leave_type,
            "from_date": str(leave.from_date),
            "to_date": str(leave.to_date),
            "total_days": leave.total_days,
            "reason": leave.reason,
            "status": leave.status,
            "admin_remark": leave.admin_remark
        })

    return result