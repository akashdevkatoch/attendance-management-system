import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function EmployeeDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  const loadDashboard = async () => {
    try {
      const response = await api.get(
        "/employee/dashboard"
      );

      setData(response.data);
    } catch (error) {
      console.log(error);
      alert("Dashboard Load Failed");
    }
  };

  const clockIn = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          await api.post(
            "/attendance/clock-in",
            {
              latitude:
                position.coords.latitude,

              longitude:
                position.coords.longitude,

              gps_accuracy:
                position.coords.accuracy,

              is_mock_location:
                false,

              device_id:
                navigator.userAgent
            }
          );

          alert("Clock In Successful");
          loadDashboard();
        } catch (error) {
          alert(
            error.response?.data
              ?.message ||
              "Clock In Failed"
          );
        }
      },
      () => {
        alert(
          "Please Allow Location Permission"
        );
      }
    );
  };

  const clockOut = async () => {
    try {
      await api.post(
        "/attendance/clock-out"
      );

      alert("Clock Out Successful");
      loadDashboard();
    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          "Clock Out Failed"
      );
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (!data) {
    return <h2>Loading...</h2>;
  }

  return (

      <div
        style={{
          background: "#f5f7fb",
          padding: "30px"
        }}
      >
        {/* Welcome Card */}
        <div
          style={{
            background: "#ffffff",
            padding: "25px",
            borderRadius: "15px",
            boxShadow:
              "0 2px 10px rgba(0,0,0,0.1)",
            marginBottom: "20px"
          }}
        >
          <h1>
            Welcome, {data.name}
          </h1>

          <p>
            Employee ID :{" "}
            {data.employee_id}
          </p>

          <p>
            Designation :{" "}
            {data.designation}
          </p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap"
          }}
        >
          <div
            style={{
              background: "#ffffff",
              padding: "20px",
              width: "220px",
              borderRadius: "15px",
              boxShadow:
                "0 2px 10px rgba(0,0,0,0.1)"
            }}
          >
            <h3>Status</h3>
            <h2>
              {data.today_status}
            </h2>
          </div>

          <div
            style={{
              background: "#ffffff",
              padding: "20px",
              width: "220px",
              borderRadius: "15px",
              boxShadow:
                "0 2px 10px rgba(0,0,0,0.1)"
            }}
          >
            <h3>
              Working Hours
            </h3>

            <h2>
              {data.working_hours ||
                "00:00:00"}
            </h2>
          </div>

          <div
            style={{
              background: "#ffffff",
              padding: "20px",
              width: "220px",
              borderRadius: "15px",
              boxShadow:
                "0 2px 10px rgba(0,0,0,0.1)"
            }}
          >
            <h3>
              Remaining CL
            </h3>

            <h2>
              {data.remaining_cl}
            </h2>
          </div>

          <div
            style={{
              background: "#ffffff",
              padding: "20px",
              width: "220px",
              borderRadius: "15px",
              boxShadow:
                "0 2px 10px rgba(0,0,0,0.1)"
            }}
          >
            <h3>
              Remaining EL
            </h3>

            <h2>
              {data.remaining_el}
            </h2>
          </div>
        </div>

        {/* Attendance Section */}
        <div
          style={{
            background: "#ffffff",
            marginTop: "20px",
            padding: "25px",
            borderRadius: "15px",
            boxShadow:
              "0 2px 10px rgba(0,0,0,0.1)"
          }}
        >
          <h3>
            Clock In :{" "}
            {data.clock_in || "-"}
          </h3>

          <h3>
            Clock Out :{" "}
            {data.clock_out || "-"}
          </h3>

          <h3>
            Pending Leaves :{" "}
            {data.pending_leaves}
          </h3>

          <br />

          <button
            onClick={clockIn}
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
              marginRight:
                "15px",
              cursor:
                "pointer"
            }}
          >
            Clock In
          </button>

          <button
            onClick={clockOut}
            style={{
              padding:
                "12px 25px",
              background:
                "#16a34a",
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
            Clock Out
          </button>
        </div>
      </div>

  );
}

export default EmployeeDashboard;