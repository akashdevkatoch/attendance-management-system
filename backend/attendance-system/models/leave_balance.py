from extensions import db


class LeaveBalance(db.Model):
    __tablename__ = "leave_balances"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    user_id = db.Column(
        db.Integer,
        unique=True,
        nullable=False
    )

    opening_cl = db.Column(
        db.Integer,
        default=0
    )

    opening_el = db.Column(
        db.Integer,
        default=0
    )

    cl_used = db.Column(
        db.Integer,
        default=0
    )

    el_used = db.Column(
        db.Integer,
        default=0
    )

    created_at = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )