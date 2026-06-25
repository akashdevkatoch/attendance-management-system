import { useEffect, useState } from "react";
import api from "../services/api";

function AttendanceReport() {
  const [employees, setEmployees] =
    useState([]);

  const [userId, setUserId] =
    useState("");

  const [month, setMonth] =
    useState(
      new Date().getMonth() + 1
    );

  const [year, setYear] =
    useState(
      new Date().getFullYear()
    );

  const [data, setData] =
    useState(null);

  const loadEmployees =
    async () => {
      try {
        const response =
          await api.get(
            "/admin/employees"
          );

        setEmployees(
          response.data.filter(
            (e) =>
              e.role !== "admin"
          )
        );

      } catch (error) {
        console.log(error);
        alert(
          "Unable to load employees"
        );
      }
    };

  const loadReport =
    async () => {

      if (!userId) {
        alert(
          "Please select employee"
        );
        return;
      }

      try {
        const response =
          await api.get(
            `/admin/attendance/monthly/${userId}?month=${month}&year=${year}`
          );

        setData(
          response.data
        );

      } catch (error) {
        console.log(error);

        alert(
          error.response?.data
            ?.message ||
          "Unable to load report"
        );
      }
    };

  const exportExcel =
    async () => {

      if (!userId) {
        alert(
          "Please select employee"
        );
        return;
      }

      try {
        const response =
          await api.get(
            `/admin/attendance/export/${userId}`,
            {
              responseType:
                "blob"
            }
          );

        const url =
          window.URL.createObjectURL(
            new Blob([
              response.data
            ])
          );

        const link =
          document.createElement(
            "a"
          );

        link.href = url;

        link.setAttribute(
          "download",
          "attendance.xlsx"
        );

        document.body.appendChild(
          link
        );

        link.click();

      } catch (error) {
        console.log(error);
        alert(
          "Export Failed"
        );
      }
    };

  useEffect(() => {
    loadEmployees();
  }, []);

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
          boxShadow:
            "0 2px 10px rgba(0,0,0,0.1)"
        }}
      >
        <h2>
          Attendance Reports
        </h2>

        <br />

        <label>
          Employee
        </label>

        <br />

        <select
          value={userId}
          onChange={(e) =>
            setUserId(
              e.target.value
            )
          }
        >
          <option value="">
            Select Employee
          </option>

          {employees.map(
            (emp) => (
              <option
                key={emp.id}
                value={emp.id}
              >
                {emp.name}
                {" "}
                (
                {
                  emp.employee_id
                }
                )
              </option>
            )
          )}
        </select>

        <br />
        <br />

        <label>
          Month
        </label>

        <br />

        <select
          value={month}
          onChange={(e) =>
            setMonth(
              e.target.value
            )
          }
        >
          <option value="1">
            January
          </option>
          <option value="2">
            February
          </option>
          <option value="3">
            March
          </option>
          <option value="4">
            April
          </option>
          <option value="5">
            May
          </option>
          <option value="6">
            June
          </option>
          <option value="7">
            July
          </option>
          <option value="8">
            August
          </option>
          <option value="9">
            September
          </option>
          <option value="10">
            October
          </option>
          <option value="11">
            November
          </option>
          <option value="12">
            December
          </option>
        </select>

        <br />
        <br />

        <label>
          Year
        </label>

        <br />

        <select
          value={year}
          onChange={(e) =>
            setYear(
              e.target.value
            )
          }
        >
          <option value="2025">
            2025
          </option>

          <option value="2026">
            2026
          </option>

          <option value="2027">
            2027
          </option>
        </select>

        <br />
        <br />

        <button
          onClick={
            loadReport
          }
        >
          Load Report
        </button>

        <button
          onClick={
            exportExcel
          }
          style={{
            marginLeft:
              "10px"
          }}
        >
          Export Excel
        </button>

        <br />
        <br />

        {data && (
          <>
            <h3>
              {data.name}
            </h3>

            <table
              border="1"
              cellPadding="10"
              style={{
                width:
                  "100%",
                borderCollapse:
                  "collapse"
              }}
            >
              <thead>
                <tr>
                  <th>
                    Date
                  </th>

                  <th>
                    Clock In
                  </th>

                  <th>
                    Clock Out
                  </th>

                  <th>
                    Working Hours
                  </th>

                  <th>
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.attendance.map(
                  (
                    item,
                    index
                  ) => (
                    <tr
                      key={
                        index
                      }
                    >
                      <td>
                        {
                          item.date
                        }
                      </td>

                      <td>
                        {
                          item.clock_in
                        }
                      </td>

                      <td>
                        {
                          item.clock_out
                        }
                      </td>

                      <td>
                        {
                          item.working_hours
                        }
                      </td>

                      <td>
                        {
                          item.status
                        }
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default AttendanceReport;