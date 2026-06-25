from flask import Flask
from flask_cors import CORS
from sqlalchemy import text
import config

from extensions import db, jwt

# ==========================
# Create Flask App
# ==========================
app = Flask(__name__)

# ==========================
# Configuration
# ==========================
app.config["SQLALCHEMY_DATABASE_URI"] = config.SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = config.SQLALCHEMY_TRACK_MODIFICATIONS
app.config["SECRET_KEY"] = config.SECRET_KEY
app.config["JWT_SECRET_KEY"] = config.JWT_SECRET_KEY

# ==========================
# Initialize Extensions
# ==========================
db.init_app(app)
jwt.init_app(app)
CORS(app)

# ==========================
# Import Models
# ==========================
from models.user import User
from models.attendance import Attendance
from models.leave import LeaveRequest
from models.leave_balance import LeaveBalance
from models.location import Location

# ==========================
# Import Blueprints
# ==========================
from routes.auth import auth_bp
from routes.admin import admin_bp
from routes.attendance import attendance_bp
from routes.leave import leave_bp
from routes.employee import employee_bp

# ==========================
# Register Blueprints
# ==========================
app.register_blueprint(
    auth_bp,
    url_prefix="/api/auth"
)

app.register_blueprint(
    admin_bp,
    url_prefix="/api/admin"
)

app.register_blueprint(
    attendance_bp,
    url_prefix="/api/attendance"
)

app.register_blueprint(
    leave_bp,
    url_prefix="/api/leave"
)

app.register_blueprint(
    employee_bp,
    url_prefix="/api/employee"
)

# ==========================
# Create Database Tables
# ==========================
with app.app_context():
    db.create_all()

# ==========================
# Routes
# ==========================
@app.route("/")
def home():
    return {
        "message": "Attendance System Running"
    }


@app.route("/db-test")
def db_test():
    try:
        db.session.execute(text("SELECT 1"))

        return {
            "message": "Database Connected"
        }

    except Exception as e:

        return {
            "error": str(e)
        }, 500


# ==========================
# Run Application
# ==========================
if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )