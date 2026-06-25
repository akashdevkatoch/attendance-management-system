import { useState } from "react";
import {
  useNavigate,
  Navigate,
} from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const token = localStorage.getItem(
    "token"
  );

  const role = localStorage.getItem(
    "role"
  );

  const [employeeId, setEmployeeId] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // Already logged in
  if (token) {
    return (
      <Navigate
        to={
          role === "admin"
            ? "/admin/dashboard"
            : "/employee/dashboard"
        }
        replace
      />
    );
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await api.post(
        "/auth/login",
        {
          employee_id: employeeId,
          password: password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "role",
        response.data.role
      );

      localStorage.setItem(
        "name",
        response.data.name
      );

      if (
        response.data.role === "admin"
      ) {
        navigate(
          "/admin/dashboard"
        );
      } else {
        navigate(
          "/employee/dashboard"
        );
      }
    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f1f5f9",
      }}
    >
      <div
        style={{
          width: "400px",
          background: "#ffffff",
          padding: "35px",
          borderRadius: "20px",
          boxShadow:
            "0 5px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Attendance System
        </h1>

        <form
          onSubmit={
            handleLogin
          }
        >
          <div
            style={{
              marginBottom: "20px",
            }}
          >
            <label>
              Employee ID
            </label>

            <input
              type="text"
              value={
                employeeId
              }
              onChange={(e) =>
                setEmployeeId(
                  e.target.value
                )
              }
              required
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "8px",
                borderRadius:
                  "10px",
                border:
                  "1px solid #ccc",
                boxSizing:
                  "border-box",
              }}
            />
          </div>

          <div
            style={{
              marginBottom: "25px",
            }}
          >
            <label>
              Password
            </label>

            <input
              type="password"
              value={
                password
              }
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              required
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "8px",
                borderRadius:
                  "10px",
                border:
                  "1px solid #ccc",
                boxSizing:
                  "border-box",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={
              loading
            }
            style={{
              width: "100%",
              padding: "12px",
              background:
                "#2563eb",
              color:
                "#ffffff",
              border:
                "none",
              borderRadius:
                "10px",
              cursor:
                "pointer",
              fontSize: "16px",
            }}
          >
            {loading
              ? "Logging In..."
              : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;