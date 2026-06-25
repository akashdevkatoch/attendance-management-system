import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Employees() {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] =
  useState(1);

const employeesPerPage = 10;

  const loadEmployees = async () => {
    try {
      const response = await api.get(
        "/admin/employees"
      );

      setEmployees(response.data);
    } catch (error) {
      console.log(error);
      alert("Unable to load employees");
    }
  };

  const deleteEmployee = async (id) => {
    const confirmDelete = window.confirm(
      "Delete employee?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(
        `/admin/employees/${id}`
      );

      alert("Employee Deleted");
      loadEmployees();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  const resetDevice = async (id) => {
    try {
      await api.put(
        `/admin/employees/${id}/reset-device`
      );

      alert(
        "Device Reset Successful"
      );
    } catch (error) {
      console.log(error);
      alert(
        "Device Reset Failed"
      );
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const filteredEmployees =
    employees.filter((emp) => {
      const value = search
        .toLowerCase();

      return (
        emp.name
          ?.toLowerCase()
          .includes(value) ||
        emp.employee_id
          ?.toLowerCase()
          .includes(value) ||
        emp.designation
          ?.toLowerCase()
          .includes(value)
      );
    });
const indexOfLastEmployee =
  currentPage *
  employeesPerPage;

const indexOfFirstEmployee =
  indexOfLastEmployee -
  employeesPerPage;

const currentEmployees =
  filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

const totalPages = Math.ceil(
  filteredEmployees.length /
    employeesPerPage
);

  return (
    <div>
      <div
        style={{
          background: "#ffffff",
          padding: "35px",
          borderRadius: "24px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "32px",
              fontWeight: "700",
              color: "#111827",
            }}
          >
            Employees
          </h2>

          <button
            onClick={() =>
              navigate(
                "/admin/add-employee"
              )
            }
            style={{
              padding: "14px 24px",
              border: "none",
              borderRadius:
                "14px",
              background:
                "#2563eb",
              color:
                "#ffffff",
              cursor:
                "pointer",
              fontSize:
                "15px",
              fontWeight:
                "600",
              boxShadow:
                "0 6px 18px rgba(37,99,235,0.35)",
            }}
          >
            + Add Employee
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by Name, Employee ID or Designation"
          value={search}
          onChange={(e) => {
  setSearch(
    e.target.value
  );

  setCurrentPage(1);
}}
          style={{
            width: "100%",
            height: "54px",
            padding:
              "0 18px",
            border:
              "1px solid #d1d5db",
            borderRadius:
              "14px",
            marginBottom:
              "30px",
            boxSizing:
              "border-box",
            fontSize:
              "15px",
            outline:
              "none",
          }}
        />

        {/* Table */}
        <div
          style={{
            overflowX: "auto",
            border:
              "1px solid #e5e7eb",
            borderRadius:
              "18px",
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
                <th
                  style={
                    thStyle
                  }
                >
                  ID
                </th>
                <th
                  style={
                    thStyle
                  }
                >
                  Name
                </th>
                <th
                  style={
                    thStyle
                  }
                >
                  Email
                </th>
                <th
                  style={
                    thStyle
                  }
                >
                  Mobile
                </th>
                <th
                  style={
                    thStyle
                  }
                >
                  Designation
                </th>
                <th
                  style={
                    thStyle
                  }
                >
                  Role
                </th>
                <th
                  style={
                    thStyle
                  }
                >
                  Status
                </th>
                <th
                  style={
                    thStyle
                  }
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {currentEmployees.map(
                (emp) => (
                  <tr
                    key={
                      emp.id
                    }
                    style={{
                      transition:
                        "0.3s",
                    }}
                    onMouseEnter={(
                      e
                    ) =>
                      (e.currentTarget.style.background =
                        "#f8fafc")
                    }
                    onMouseLeave={(
                      e
                    ) =>
                      (e.currentTarget.style.background =
                        "#ffffff")
                    }
                  >
                    <td
                      style={
                        tdStyle
                      }
                    >
                      {
                        emp.employee_id
                      }
                    </td>

                    <td
                      style={
                        tdStyle
                      }
                    >
                      {emp.name}
                    </td>

                    <td
                      style={
                        tdStyle
                      }
                    >
                      {emp.email}
                    </td>

                    <td
                      style={
                        tdStyle
                      }
                    >
                      {emp.mobile}
                    </td>

                    <td
                      style={
                        tdStyle
                      }
                    >
                      {
                        emp.designation
                      }
                    </td>

                    <td
                      style={
                        tdStyle
                      }
                    >
                      {emp.role}
                    </td>

                    <td
                      style={
                        tdStyle
                      }
                    >
                      <span
                        style={{
                          background:
                            emp.status ===
                            "active"
                              ? "#dcfce7"
                              : "#fee2e2",
                          color:
                            emp.status ===
                            "active"
                              ? "#166534"
                              : "#991b1b",
                          padding:
                            "8px 16px",
                          borderRadius:
                            "999px",
                          fontSize:
                            "13px",
                          fontWeight:
                            "600",
                        }}
                      >
                        {
                          emp.status
                        }
                      </span>
                    </td>

                    <td
                      style={
                        tdStyle
                      }
                    >
                      <div
                        style={{
                          display:
                            "grid",
                          gridTemplateColumns:
                            "repeat(2,1fr)",
                          gap:
                            "10px",
                        }}
                      >
                        <button
                          style={
                            editBtn
                          }
                          onClick={() =>
                            navigate(
                              `/admin/edit-employee/${emp.id}`
                            )
                          }
                        >
                          Edit
                        </button>

                        <button
                          style={
                            resetBtn
                          }
                          onClick={() =>
                            navigate(
                              `/admin/reset-password/${emp.id}`
                            )
                          }
                        >
                          Password
                        </button>

                        <button
                          style={
                            deviceBtn
                          }
                          onClick={() =>
                            resetDevice(
                              emp.id
                            )
                          }
                        >
                          Device
                        </button>

                        <button
                          style={
                            deleteBtn
                          }
                          onClick={() =>
                            deleteEmployee(
                              emp.id
                            )
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
        <div
  style={{
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px",
    marginTop: "25px",
  }}
>
  <div
    style={{
      color: "#6b7280",
      fontWeight: "500",
    }}
  >
    Showing{" "}
    {filteredEmployees.length === 0
      ? 0
      : indexOfFirstEmployee + 1}
    {" - "}
    {Math.min(
      indexOfLastEmployee,
      filteredEmployees.length
    )}
    {" of "}
    {filteredEmployees.length}
    {" employees"}
  </div>

  <div
    style={{
      display: "flex",
      gap: "10px",
      alignItems: "center",
    }}
  >
    <button
      style={pageBtn}
      disabled={
        currentPage === 1
      }
      onClick={() =>
        setCurrentPage(
          currentPage - 1
        )
      }
    >
      Previous
    </button>

    <span
      style={{
        fontWeight: "600",
        color: "#111827",
      }}
    >
      {currentPage}
      {" / "}
      {totalPages || 1}
    </span>

    <button
      style={pageBtn}
      disabled={
        currentPage ===
          totalPages ||
        totalPages === 0
      }
      onClick={() =>
        setCurrentPage(
          currentPage + 1
        )
      }
    >
      Next
    </button>
  </div>
</div>
      </div>
    </div>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "20px",
  background:
    "#f8fafc",
  color: "#111827",
  fontSize: "15px",
  fontWeight: "700",
};

const tdStyle = {
  padding: "22px 20px",
  fontSize: "15px",
  borderBottom:
    "1px solid #f1f5f9",
};

const commonBtn = {
  width: "100px",
  padding: "10px",
  border: "none",
  borderRadius: "10px",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "600",
};

const editBtn = {
  ...commonBtn,
  background: "#2563eb",
};

const resetBtn = {
  ...commonBtn,
  background: "#7c3aed",
};

const deviceBtn = {
  ...commonBtn,
  background: "#f59e0b",
};

const deleteBtn = {
  ...commonBtn,
  background: "#dc2626",
};
const pageBtn = {
  padding: "10px 18px",
  border:
    "1px solid #d1d5db",
  borderRadius: "10px",
  background: "#ffffff",
  cursor: "pointer",
  fontWeight: "600",
};

export default Employees;