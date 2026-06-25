import { useEffect, useState } from "react";
import api from "../services/api";

function LeaveHistory() {
  const [leaves, setLeaves] =
    useState([]);

  const loadLeaves = async () => {
    try {
      const response =
        await api.get(
          "/leave/history"
        );

      setLeaves(
        response.data
      );

    } catch (error) {
      alert(
        "Unable to load leaves"
      );
    }
  };

  useEffect(() => {
    loadLeaves();
  }, []);

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
          padding: "25px",
          borderRadius:
            "15px",
          boxShadow:
            "0 2px 10px rgba(0,0,0,0.1)"
        }}
      >
        <h2>
          My Leave History
        </h2>

        <br />

        <table
          style={{
            width: "100%",
            borderCollapse:
              "collapse"
          }}
        >
          <thead>
            <tr>
              <th>
                Type
              </th>
              <th>
                From
              </th>
              <th>
                To
              </th>
              <th>
                Days
              </th>
              <th>
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {leaves.map(
              (leave) => (
                <tr
                  key={
                    leave.id
                  }
                >
                  <td>
                    {
                      leave.leave_type
                    }
                  </td>

                  <td>
                    {
                      leave.from_date
                    }
                  </td>

                  <td>
                    {
                      leave.to_date
                    }
                  </td>

                  <td>
                    {
                      leave.total_days
                    }
                  </td>

                  <td>
                    {
                      leave.status
                    }
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaveHistory;