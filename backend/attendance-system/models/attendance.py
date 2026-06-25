from extensions import db


class Attendance(db.Model):
    __tablename__ = "attendance"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    user_id = db.Column(
        db.Integer,
        nullable=False
    )

    attendance_date = db.Column(
        db.Date,
        nullable=False
    )

    clock_in = db.Column(
        db.DateTime
    )

    clock_out = db.Column(
        db.DateTime
    )

    latitude = db.Column(
        db.Float
    )

    longitude = db.Column(
        db.Float
    )

    gps_accuracy = db.Column(
        db.Float
    )

    is_mock_location = db.Column(
        db.Boolean,
        default=False
    )

    device_id = db.Column(
        db.String(255)
    )

    status = db.Column(
        db.String(50)
    )