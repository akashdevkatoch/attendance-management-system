from flask import Blueprint, request
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity
)
import bcrypt

from extensions import db
from models.user import User

auth_bp = Blueprint(
    "auth",
    __name__
)


@auth_bp.route(
    "/register-admin",
    methods=["POST"]
)
def register_admin():

    data = request.get_json()

    if User.query.filter_by(
        employee_id=data["employee_id"]
    ).first():

        return {
            "message":
                "Employee ID already exists"
        }, 400

    hashed_password = bcrypt.hashpw(
        data["password"].encode("utf-8"),
        bcrypt.gensalt()
    ).decode("utf-8")

    admin = User(
        employee_id=data["employee_id"],
        name=data["name"],
        email=data["email"],
        mobile=data["mobile"],
        designation=data["designation"],
        role="admin",
        password=hashed_password,
        must_change_password=False,
        status="active"
    )

    db.session.add(admin)
    db.session.commit()

    return {
        "message":
            "Admin created successfully"
    }


@auth_bp.route(
    "/login",
    methods=["POST"]
)
def login():

    data = request.get_json()

    user = User.query.filter_by(
        employee_id=data["employee_id"]
    ).first()

    if not user:
        return {
            "message":
                "Invalid Employee ID"
        }, 401

    if user.status != "active":
        return {
            "message":
                "User Disabled"
        }, 403

    password_ok = bcrypt.checkpw(
        data["password"].encode("utf-8"),
        user.password.encode("utf-8")
    )

    if not password_ok:
        return {
            "message":
                "Invalid Password"
        }, 401

    token = create_access_token(
        identity=str(user.id)
    )

    return {
        "message": "Login Success",
        "token": token,
        "role": user.role,
        "name": user.name
    }


@auth_bp.route(
    "/change-password",
    methods=["POST"]
)
@jwt_required()
def change_password():

    user_id = get_jwt_identity()

    data = request.get_json()

    current_password = data.get(
        "current_password"
    )

    new_password = data.get(
        "new_password"
    )

    user = User.query.get(user_id)

    if not user:
        return {
            "message":
                "User not found"
        }, 404

    password_ok = bcrypt.checkpw(
        current_password.encode("utf-8"),
        user.password.encode("utf-8")
    )

    if not password_ok:
        return {
            "message":
                "Current password is incorrect"
        }, 400

    if len(new_password) < 6:
        return {
            "message":
                "Password must be at least 6 characters"
        }, 400

    if bcrypt.checkpw(
        new_password.encode("utf-8"),
        user.password.encode("utf-8")
    ):
        return {
            "message":
                "New password cannot be same as old password"
        }, 400

    hashed_password = bcrypt.hashpw(
        new_password.encode("utf-8"),
        bcrypt.gensalt()
    ).decode("utf-8")

    user.password = hashed_password

    db.session.commit()

    return {
        "message":
            "Password changed successfully"
    }, 200