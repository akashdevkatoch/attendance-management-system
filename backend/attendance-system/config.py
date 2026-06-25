import os

SECRET_KEY = "attendance_secret_key"
JWT_SECRET_KEY = "jwt_secret_key"

SQLALCHEMY_DATABASE_URI = os.getenv(
    "DATABASE_URL",
    "postgresql://neondb_owner:npg_j7ZHxwRfaQt4@ep-restless-hill-aonk6q8a.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
)

SQLALCHEMY_TRACK_MODIFICATIONS = False