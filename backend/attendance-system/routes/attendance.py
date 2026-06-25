
from flask import Blueprint
from flask import request
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from datetime import date
from datetime import datetime

from geopy.distance import geodesic

from extensions import db
from models.user import User
from models.location import Location
from models.attendance import Attendance

attendance_bp = Blueprint(
    "attendance",
    __name__
)


@attendance_bp.route(
    "/clock-in",
    methods=["POST"]
)
@jwt_required()
def clock_in():

    user_id = get_jwt_identity()

    data = request.get_json()

    latitude = data["latitude"]
    longitude = data["longitude"]
    device_id = data["device_id"]

    today = date.today()

    already = Attendance.query.filter_by(
        user_id=user_id,
        attendance_date=today
    ).first()

    if already:
        return {
            "message":
            "Already Clocked In Today"
        }, 400

    user = User.query.get(user_id)

    if user.device_id:

        if user.device_id != device_id:
            return {
                "message":
                "Device Not Registered"
            }, 403

    else:
        user.device_id = device_id
        db.session.commit()

    location = Location.query.first()

    office = (
        location.latitude,
        location.longitude
    )

    employee = (
        latitude,
        longitude
    )

    distance = geodesic(
        office,
        employee
    ).meters

    if distance > location.radius:

        return {
            "message":
            "Outside Geo Fence",
            "distance":
            round(distance, 2)
        }, 403

    if data.get(
            "is_mock_location",
            False):

        return {
            "message":
            "Fake GPS Detected"
        }, 403

    attendance = Attendance(
        user_id=user_id,
        attendance_date=today,
        clock_in=datetime.now(),
        latitude=latitude,
        longitude=longitude,
        gps_accuracy=data.get(
            "gps_accuracy",
            0
        ),
        is_mock_location=data.get(
            "is_mock_location",
            False
        ),
        device_id=device_id,
        status="present"
    )

    db.session.add(attendance)
    db.session.commit()

    return {
        "message":
        "Clock In Successful"
    }
@attendance_bp.route(
    "/clock-out",
    methods=["POST"]
)
@jwt_required()
def clock_out():

    user_id = get_jwt_identity()

    today = date.today()

    attendance = Attendance.query.filter_by(
        user_id=user_id,
        attendance_date=today
    ).first()

    if not attendance:
        return {
            "message":
            "Please Clock In First"
        }, 400

    if attendance.clock_out:
        return {
            "message":
            "Already Clocked Out"
        }, 400

    attendance.clock_out = datetime.now()

    db.session.commit()

    return {
        "message":
        "Clock Out Successful"
    }
@attendance_bp.route(
    "/today",
    methods=["GET"]
)
@jwt_required()
def today_attendance():

    user_id = get_jwt_identity()

    today = date.today()

    attendance = Attendance.query.filter_by(
        user_id=user_id,
        attendance_date=today
    ).first()

    if not attendance:
        return {
            "message":
            "No Attendance Found"
        }

    working_hours = None

    if attendance.clock_in and attendance.clock_out:

        diff = (
            attendance.clock_out -
            attendance.clock_in
        )

        working_hours = str(diff)

    return {
        "date":
        str(attendance.attendance_date),

        "clock_in":
        str(attendance.clock_in),

        "clock_out":
        str(attendance.clock_out),

        "working_hours":
        working_hours,

        "status":
        attendance.status
    }
@attendance_bp.route(
    "/history",
    methods=["GET"]
)
@jwt_required()
def attendance_history():

    user_id = get_jwt_identity()

    attendance = Attendance.query.filter_by(
        user_id=user_id
    ).order_by(
        Attendance.attendance_date.desc()
    ).all()

    result = []

    for item in attendance:

        result.append({
            "date":
            str(item.attendance_date),

            "clock_in":
            str(item.clock_in),

            "clock_out":
            str(item.clock_out),

            "status":
            item.status
        })

    return result