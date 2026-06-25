import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function ResetPassword() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [password, setPassword] =
    useState("");

  const resetPassword =
    async () => {
      if (!password) {
        alert(
          "Enter Password"
        );
        return;
      }

      try {
        await api.put(
          `/admin/employees/${id}/reset-password`,
          {
            password:
              password
          }
        );

        alert(
          "Password Reset Successfully"
        );

        navigate(
          "/admin/employees"
        );

      } catch (error) {
        console.log(error);

        alert(
          error.response?.data
            ?.message ||
            "Password Reset Failed"
        );
      }
    };

  return (
    <div
      style={{
        minHeight:
          "100vh",
        background:
          "#f5f7fb",
        padding:
          "30px"
      }}
    >
      <div
        style={{
          background:
            "#ffffff",
          padding:
            "25px",
          borderRadius:
            "15px",
          maxWidth:
            "500px",
          margin:
            "0 auto"
        }}
      >
        <h2>
          Reset Password
        </h2>

        <br />

        <input
          type="password"
          placeholder="New Password"
          value={
            password
          }
          onChange={
            (e) =>
              setPassword(
                e.target.value
              )
          }
          style={{
            width:
              "100%",
            padding:
              "12px"
          }}
        />

        <br />
        <br />

        <button
          onClick={
            resetPassword
          }
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;