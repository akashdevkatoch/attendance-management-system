import { useState } from "react";
import api from "../services/api";

function ApplyLeave() {
  const [leaveType, setLeaveType] =
    useState("CL");

  const [fromDate, setFromDate] =
    useState("");

  const [toDate, setToDate] =
    useState("");

  const [reason, setReason] =
    useState("");

  const applyLeave =
    async () => {
      try {
        await api.post(
          "/leave/apply",
          {
            leave_type:
              leaveType,
            from_date:
              fromDate,
            to_date:
              toDate,
            reason:
              reason
          }
        );

        alert(
          "Leave Applied Successfully"
        );

        setReason("");
        setFromDate("");
        setToDate("");

      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            "Leave Apply Failed"
        );
      }
    };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "#f5f7fb",
        padding: "30px"
      }}
    >
      <div
        style={{
          background:
            "#ffffff",
          padding: "30px",
          borderRadius:
            "15px",
          maxWidth:
            "500px",
          margin: "auto",
          boxShadow:
            "0 2px 10px rgba(0,0,0,0.1)"
        }}
      >
        <h2>
          Apply Leave
        </h2>

        <br />

        <label>
          Leave Type
        </label>

        <select
          value={leaveType}
          onChange={(e) =>
            setLeaveType(
              e.target.value
            )
          }
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px"
          }}
        >
          <option value="CL">
            CL
          </option>

          <option value="EL">
            EL
          </option>
        </select>

        <br />
        <br />

        <label>
          From Date
        </label>

        <input
          type="date"
          value={fromDate}
          onChange={(e) =>
            setFromDate(
              e.target.value
            )
          }
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px"
          }}
        />

        <br />
        <br />

        <label>
          To Date
        </label>

        <input
          type="date"
          value={toDate}
          onChange={(e) =>
            setToDate(
              e.target.value
            )
          }
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px"
          }}
        />

        <br />
        <br />

        <label>
          Reason
        </label>

        <textarea
          value={reason}
          onChange={(e) =>
            setReason(
              e.target.value
            )
          }
          rows="4"
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px"
          }}
        />

        <br />
        <br />

        <button
          onClick={
            applyLeave
          }
          style={{
            padding:
              "12px 25px",
            background:
              "#2563eb",
            color:
              "#ffffff",
            border:
              "none",
            borderRadius:
              "10px",
            cursor:
              "pointer"
          }}
        >
          Apply Leave
        </button>
      </div>
    </div>
  );
}

export default ApplyLeave;