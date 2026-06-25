from extensions import db


class LeaveRequest(db.Model):
    __tablename__ = "leave_requests"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    user_id = db.Column(
        db.Integer,
        nullable=False
    )

    leave_type = db.Column(
        db.Enum(
            "CL",
            "EL",
            name="leave_type"
        ),
        nullable=False
    )

    from_date = db.Column(
        db.Date,
        nullable=False
    )

    to_date = db.Column(
        db.Date,
        nullable=False
    )

    total_days = db.Column(
        db.Integer,
        nullable=False
    )

    reason = db.Column(
        db.Text
    )

    status = db.Column(
        db.Enum(
            "pending",
            "approved",
            "rejected",
            name="leave_status"
        ),
        default="pending",
        nullable=False
    )

    admin_remark = db.Column(
        db.Text
    )

    created_at = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )