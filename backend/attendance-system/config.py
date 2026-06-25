import os

SECRET_KEY = "attendance_secret_key"

JWT_SECRET_KEY = "jwt_secret_key"

SQLALCHEMY_DATABASE_URI = os.getenv(
    "DATABASE_URL",
    "mysql+pymysql://root:root@localhost/attendance_db"
)

SQLALCHEMY_TRACK_MODIFICATIONS = False