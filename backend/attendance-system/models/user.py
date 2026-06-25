from extensions import db


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    employee_id = db.Column(
        db.String(20),
        unique=True,
        nullable=False
    )

    name = db.Column(
        db.String(100),
        nullable=False
    )

    email = db.Column(
        db.String(100),
        unique=True
    )

    mobile = db.Column(
        db.String(15)
    )

    designation = db.Column(
        db.String(100)
    )

    role = db.Column(
        db.Enum(
            "admin",
            "sse",
            "employee",
            name="user_role"
        ),
        default="employee",
        nullable=False
    )

    password = db.Column(
        db.String(255),
        nullable=False
    )

    device_id = db.Column(
        db.String(255)
    )

    must_change_password = db.Column(
        db.Boolean,
        default=True
    )

    status = db.Column(
        db.Enum(
            "active",
            "inactive",
            name="user_status"
        ),
        default="active",
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )