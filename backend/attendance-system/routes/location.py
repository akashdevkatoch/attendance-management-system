from flask import Blueprint, request
from flask_jwt_extended import jwt_required

from extensions import db
from models.location import Location

location_bp = Blueprint(
    "location",
    __name__
)


@location_bp.route(
    "/",
    methods=["GET"]
)
@jwt_required()
def get_location():

    location = Location.query.first()

    if not location:
        return {
            "message": "Office location not configured"
        }, 404

    return {
        "id": location.id,
        "office_name": location.location_name,
        "latitude": location.latitude,
        "longitude": location.longitude,
        "radius": location.radius
    }


@location_bp.route(
    "/",
    methods=["PUT"]
)
@jwt_required()
def update_location():

    data = request.get_json()

    location = Location.query.first()

    if not location:

        location = Location()

        db.session.add(location)

    location.location_name = data["office_name"]
    location.latitude = data["latitude"]
    location.longitude = data["longitude"]
    location.radius = data["radius"]

    db.session.commit()

    return {
        "message": "Office Location Updated Successfully"
    }