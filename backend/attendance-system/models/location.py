from extensions import db


class Location(db.Model):
    __tablename__ = "locations"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    location_name = db.Column(
        db.String(100)
    )

    latitude = db.Column(
        db.Float
    )

    longitude = db.Column(
        db.Float
    )

    radius = db.Column(
        db.Integer,
        default=100
    )