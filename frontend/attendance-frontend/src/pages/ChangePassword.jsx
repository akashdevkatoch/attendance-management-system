import { useState } from "react";
import api from "../services/api";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showCurrent, setShowCurrent] =
    useState(false);

  const [showNew, setShowNew] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const changePassword = async (e) => {
    e.preventDefault();

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      alert(
        "Please fill all fields"
      );
      return;
    }

    if (
      newPassword.length < 6
    ) {
      alert(
        "Password must be at least 6 characters"
      );
      return;
    }

    if (
      newPassword !==
      confirmPassword
    ) {
      alert(
        "Passwords do not match"
      );
      return;
    }

    try {
      const response =
        await api.post(
          "/auth/change-password",
          {
            current_password:
              currentPassword,
            new_password:
              newPassword,
          }
        );

      alert(
        response.data.message
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data
          ?.message ||
          "Password change failed"
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent:
          "center",
        alignItems:
          "center",
        minHeight:
          "calc(100vh - 120px)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "550px",
          background:
            "#ffffff",
          padding: "40px",
          borderRadius:
            "24px",
          boxShadow:
            "0 12px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h2
          style={{
            marginTop: 0,
            marginBottom:
              "10px",
          }}
        >
          🔐 Change Password
        </h2>

        <p
          style={{
            color: "#6b7280",
            marginBottom:
              "35px",
          }}
        >
          Update your account
          password securely.
        </p>

        <form
          onSubmit={
            changePassword
          }
        >
          {/* Current Password */}
          <div
            style={{
              marginBottom:
                "20px",
            }}
          >
            <label>
              Current Password
            </label>

            <div
              style={{
                display:
                  "flex",
                marginTop:
                  "8px",
              }}
            >
              <input
                type={
                  showCurrent
                    ? "text"
                    : "password"
                }
                value={
                  currentPassword
                }
                onChange={(e) =>
                  setCurrentPassword(
                    e.target
                      .value
                  )
                }
                style={
                  inputStyle
                }
              />

              <button
                type="button"
                onClick={() =>
                  setShowCurrent(
                    !showCurrent
                  )
                }
                style={
                  eyeBtn
                }
              >
                {showCurrent
                  ? "🙈"
                  : "👁"}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div
            style={{
              marginBottom:
                "20px",
            }}
          >
            <label>
              New Password
            </label>

            <div
              style={{
                display:
                  "flex",
                marginTop:
                  "8px",
              }}
            >
              <input
                type={
                  showNew
                    ? "text"
                    : "password"
                }
                value={
                  newPassword
                }
                onChange={(e) =>
                  setNewPassword(
                    e.target
                      .value
                  )
                }
                style={
                  inputStyle
                }
              />

              <button
                type="button"
                onClick={() =>
                  setShowNew(
                    !showNew
                  )
                }
                style={
                  eyeBtn
                }
              >
                {showNew
                  ? "🙈"
                  : "👁"}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div
            style={{
              marginBottom:
                "30px",
            }}
          >
            <label>
              Confirm Password
            </label>

            <div
              style={{
                display:
                  "flex",
                marginTop:
                  "8px",
              }}
            >
              <input
                type={
                  showConfirm
                    ? "text"
                    : "password"
                }
                value={
                  confirmPassword
                }
                onChange={(e) =>
                  setConfirmPassword(
                    e.target
                      .value
                  )
                }
                style={
                  inputStyle
                }
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirm(
                    !showConfirm
                  )
                }
                style={
                  eyeBtn
                }
              >
                {showConfirm
                  ? "🙈"
                  : "👁"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding:
                "15px",
              border: "none",
              borderRadius:
                "14px",
              background:
                "#2563eb",
              color:
                "#ffffff",
              fontSize:
                "16px",
              fontWeight:
                "600",
              cursor:
                "pointer",
            }}
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  flex: 1,
  height: "50px",
  border:
    "1px solid #d1d5db",
  borderRadius: "12px",
  padding:
    "0 15px",
  fontSize: "15px",
};

const eyeBtn = {
  marginLeft: "10px",
  border: "none",
  background:
    "#f3f4f6",
  borderRadius:
    "12px",
  width: "55px",
  cursor: "pointer",
  fontSize: "18px",
};

export default ChangePassword;