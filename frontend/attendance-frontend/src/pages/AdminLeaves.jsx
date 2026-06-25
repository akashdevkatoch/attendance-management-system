import { useEffect, useState } from "react";
import api from "../services/api";

function AdminLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [search, setSearch] = useState("");

  const loadLeaves = async () => {
    try {
      const response = await api.get(
        "/admin/leaves"
      );

      console.log(
        "Leaves API Response:",
        response.data
      );

      setLeaves(
        Array.isArray(response.data)
          ? response.data
          : []
      );
    } catch (error) {
      console.log(error);
      alert(
        "Failed to load leaves"
      );
    }
  };

  useEffect(() => {
    loadLeaves();
  }, []);

  const approveLeave = async (
    id
  ) => {
    try {
      await api.put(
        `/admin/leaves/${id}/approve`
      );

      alert(
        "Leave Approved Successfully"
      );

      loadLeaves();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data
          ?.message ||
          "Approval Failed"
      );
    }
  };

  const rejectLeave = async (
    id
  ) => {
    const remark = prompt(
      "Enter rejection remark"
    );

    if (
      remark === null
    ) {
      return;
    }

    try {
      await api.put(
        `/admin/leaves/${id}/reject`,
        {
          remark,
        }
      );

      alert(
        "Leave Rejected Successfully"
      );

      loadLeaves();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data
          ?.message ||
          "Reject Failed"
      );
    }
  };

  const filteredLeaves =
    leaves.filter((leave) => {
      const value =
        search.toLowerCase();

      return (
        leave.name
          ?.toLowerCase()
          .includes(value) ||
        leave.employee_id
          ?.toLowerCase()
          .includes(value) ||
        leave.status
          ?.toLowerCase()
          .includes(value)
      );
    });

  return (
    <div
      style={{
        background:
          "#ffffff",
        padding: "30px",
        borderRadius:
          "20px",
        boxShadow:
          "0 10px 25px rgba(0,0,0,0.08)",
      }}
    >
      <h2
        style={{
          marginTop: 0,
          marginBottom:
            "25px",
        }}
      >
        Manage Leave Requests
      </h2>

      <input
        type="text"
        placeholder="Search Employee..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        style={{
          width: "100%",
          height: "50px",
          padding:
            "0 18px",
          border:
            "1px solid #d1d5db",
          borderRadius:
            "12px",
          marginBottom:
            "25px",
          boxSizing:
            "border-box",
        }}
      />

      <div
        style={{
          overflowX:
            "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse:
              "collapse",
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>
                Employee
              </th>

              <th style={thStyle}>
                Type
              </th>

              <th style={thStyle}>
                From
              </th>

              <th style={thStyle}>
                To
              </th>

              <th style={thStyle}>
                Days
              </th>

              <th style={thStyle}>
                Status
              </th>

              <th style={thStyle}>
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredLeaves.length ===
            0 ? (
              <tr>
                <td
                  colSpan="7"
                  style={{
                    textAlign:
                      "center",
                    padding:
                      "40px",
                  }}
                >
                  No Leave Requests
                  Found
                </td>
              </tr>
            ) : (
              filteredLeaves.map(
                (
                  leave
                ) => (
                  <tr
                    key={
                      leave.id
                    }
                  >
                    <td
                      style={
                        tdStyle
                      }
                    >
                      {
                        leave.name
                      }
                      <br />

                      <small>
                        {
                          leave.employee_id
                        }
                      </small>
                    </td>

                    <td
                      style={
                        tdStyle
                      }
                    >
                      {
                        leave.leave_type
                      }
                    </td>

                    <td
                      style={
                        tdStyle
                      }
                    >
                      {
                        leave.from_date
                      }
                    </td>

                    <td
                      style={
                        tdStyle
                      }
                    >
                      {
                        leave.to_date
                      }
                    </td>

                    <td
                      style={
                        tdStyle
                      }
                    >
                      {
                        leave.total_days
                      }
                    </td>

                    <td
                      style={
                        tdStyle
                      }
                    >
                      <span
                        style={{
                          padding:
                            "8px 14px",
                          borderRadius:
                            "999px",
                          background:
                            leave.status ===
                            "approved"
                              ? "#dcfce7"
                              : leave.status ===
                                "rejected"
                              ? "#fee2e2"
                              : "#fef3c7",

                          color:
                            leave.status ===
                            "approved"
                              ? "#166534"
                              : leave.status ===
                                "rejected"
                              ? "#991b1b"
                              : "#92400e",
                        }}
                      >
                        {
                          leave.status
                        }
                      </span>
                    </td>

                    <td
                      style={
                        tdStyle
                      }
                    >
                      {leave.status ===
                      "pending" ? (
                        <>
                          <button
                            onClick={() =>
                              approveLeave(
                                leave.id
                              )
                            }
                            style={
                              approveBtn
                            }
                          >
                            Approve
                          </button>

                          <button
                            onClick={() =>
                              rejectLeave(
                                leave.id
                              )
                            }
                            style={
                              rejectBtn
                            }
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "18px",
  background:
    "#f8fafc",
};

const tdStyle = {
  padding: "18px",
  borderBottom:
    "1px solid #e5e7eb",
};

const approveBtn = {
  padding: "10px 15px",
  border: "none",
  borderRadius:
    "10px",
  background:
    "#16a34a",
  color: "#ffffff",
  cursor: "pointer",
  marginRight: "10px",
};

const rejectBtn = {
  padding: "10px 15px",
  border: "none",
  borderRadius:
    "10px",
  background:
    "#dc2626",
  color: "#ffffff",
  cursor: "pointer",
};

export default AdminLeaves;