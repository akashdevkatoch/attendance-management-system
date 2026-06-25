import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function AdminDashboard() {
  const navigate = useNavigate();

  const [data, setData] = useState(null);

  const loadDashboard = async () => {
    try {
      const response = await api.get(
        "/admin/dashboard"
      );

      setData(response.data);
    } catch (error) {
      console.log(error);
      alert("Dashboard Load Failed");
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (!data) {
    return <h2>Loading...</h2>;
  }

  const pieData = [
    {
      name: "Present",
      value: data.present,
    },
    {
      name: "Late",
      value: data.late,
    },
    {
      name: "Absent",
      value: data.absent,
    },
  ];

  const COLORS = [
    "#16a34a",
    "#f59e0b",
    "#dc2626",
  ];

  const barData = [
    {
      name: "Present",
      value: data.present,
    },
    {
      name: "Late",
      value: data.late,
    },
    {
      name: "Absent",
      value: data.absent,
    },
    {
      name: "Pending",
      value: data.pending_leaves,
    },
  ];

  return (
    <div
      style={{
        background: "#f5f7fb",
        padding: "30px",
      }}
    >
      {/* Header */}
      <div
        style={{
  background: "#ffffff",
  padding: "35px",
  borderRadius: "25px",
  boxShadow:
    "0 15px 35px rgba(0,0,0,0.08)",
  marginBottom: "30px",
}}
      >
        <h1
          style={{
            margin: 0,
            marginBottom: "10px",
          }}
        >
          Admin Dashboard
        </h1>

        <p
          style={{
            margin: 0,
            color: "#6b7280",
            fontSize: "16px",
          }}
        >
          Welcome,{" "}
          {localStorage.getItem("name")}
        </p>
        <p
  style={{
    marginTop: "12px",
    color: "#6b7280",
    fontSize: "15px",
  }}
>
  {new Date().toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  )}
</p>
      </div>

      {/* Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
        }}
      >
        <Card
          title="Total Employees"
          value={
            data.total_employees
          }
        />

        <Card
          title="Present"
          value={data.present}
        />

        <Card
          title="Late"
          value={data.late}
        />

        <Card
          title="Absent"
          value={data.absent}
        />

        <Card
          title="Pending Leaves"
          value={
            data.pending_leaves
          }
        />
      </div>

      {/* Charts */}
      <div
        style={{
          display: "flex",
          gap: "25px",
          flexWrap: "wrap",
          marginTop: "35px",
        }}
      >
        {/* Pie Chart */}
        <div
          style={{
            flex: 1,
            minWidth: "350px",
            background: "#ffffff",
            borderRadius: "20px",
            padding: "25px",
            boxShadow:
              "0 10px 25px rgba(0,0,0,0.08)",
          }}
        >
          <h3
            style={{
              marginTop: 0,
            }}
          >
            Attendance Status
          </h3>

          <div
            style={{
              width: "100%",
              height: "300px",
            }}
          >
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={
                    100
                  }
                  dataKey="value"
                  label
                >
                  {pieData.map(
                    (
                      entry,
                      index
                    ) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div
          style={{
            flex: 1,
            minWidth: "350px",
            background: "#ffffff",
            borderRadius: "20px",
            padding: "25px",
            boxShadow:
              "0 10px 25px rgba(0,0,0,0.08)",
          }}
        >
          <h3
            style={{
              marginTop: 0,
            }}
          >
            Attendance Analytics
          </h3>

          <div
            style={{
              width: "100%",
              height: "300px",
            }}
          >
            <ResponsiveContainer>
              <BarChart
                data={barData}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="name"
                />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#2563eb"
                  radius={[
                    10,
                    10,
                    0,
                    0,
                  ]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div
        style={{
          marginTop: "35px",
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() =>
            navigate(
              "/admin/employees"
            )
          }
          style={{
            padding:
              "14px 24px",
            border: "none",
            borderRadius:
              "12px",
            background:
              "#2563eb",
            color:
              "#ffffff",
            cursor:
              "pointer",
            fontWeight:
              "600",
            boxShadow:
              "0 5px 15px rgba(37,99,235,0.25)",
          }}
        >
          Employees
        </button>

        <button
          onClick={() =>
            navigate(
              "/admin/leaves"
            )
          }
          style={{
            padding:
              "14px 24px",
            border: "none",
            borderRadius:
              "12px",
            background:
              "#7c3aed",
            color:
              "#ffffff",
            cursor:
              "pointer",
            fontWeight:
              "600",
            boxShadow:
              "0 5px 15px rgba(124,58,237,0.25)",
          }}
        >
          Manage Leaves
        </button>

        <button
          onClick={() =>
            navigate(
              "/admin/reports"
            )
          }
          style={{
            padding:
              "14px 24px",
            border: "none",
            borderRadius:
              "12px",
            background:
              "#16a34a",
            color:
              "#ffffff",
            cursor:
              "pointer",
            fontWeight:
              "600",
            boxShadow:
              "0 5px 15px rgba(22,163,74,0.25)",
          }}
        >
          Attendance Reports
        </button>
        <button
  onClick={() =>
    navigate(
      "/admin/location"
    )
  }
  style={{
    padding: "14px 24px",
    border: "none",
    borderRadius: "12px",
    background: "#ea580c",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: "600",
    boxShadow:
      "0 5px 15px rgba(234,88,12,0.25)",
  }}
>
  📍 Office Location
</button>
      </div>
    </div>
  );
}

function Card({
  title,
  value,
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "30px",
        borderRadius: "22px",
        boxShadow:
          "0 10px 25px rgba(0,0,0,0.08)",
        transition:
          "all 0.3s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform =
          "translateY(-6px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          "translateY(0px)";
      }}
    >
      <h3
        style={{
          margin: 0,
          marginBottom: "15px",
          color: "#6b7280",
          fontSize: "15px",
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          margin: 0,
          fontSize: "38px",
          fontWeight: "700",
          color: "#111827",
        }}
      >
        {value}
      </h1>
    </div>
  );
}


export default AdminDashboard;