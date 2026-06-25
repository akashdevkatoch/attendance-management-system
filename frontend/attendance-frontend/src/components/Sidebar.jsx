import {
  NavLink,
  useNavigate,
} from "react-router-dom";

function Sidebar({
  mobile,
  sidebarOpen,
  setSidebarOpen,
}) {
  const navigate =
    useNavigate();

  const role =
    localStorage.getItem(
      "role"
    );

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const closeSidebar =
    () => {
      if (
        mobile
      ) {
        setSidebarOpen(
          false
        );
      }
    };

  const linkStyle = ({
    isActive,
  }) => ({
    padding:
      "14px 18px",
    borderRadius:
      "14px",
    textDecoration:
      "none",
    color:
      "#ffffff",
    background:
      isActive
        ? "#1e293b"
        : "transparent",
    transition:
      "all 0.3s ease",
    fontSize:
      "15px",
    fontWeight:
      "500",
  });

  return (
    <div
      style={{
        width: "240px",
        minHeight:
          "100vh",
        background:
          "#0f172a",
        color:
          "#ffffff",
        padding:
          "25px",
        boxSizing:
          "border-box",
        boxShadow:
          "4px 0 20px rgba(0,0,0,0.15)",
        display:
          "flex",
        flexDirection:
          "column",

        position:
          mobile
            ? "fixed"
            : "relative",

        left:
          mobile
            ? sidebarOpen
              ? 0
              : "-260px"
            : 0,

        top: 0,
        zIndex: 1000,

        transition:
          "all 0.3s ease",
      }}
    >
      {/* Logo */}
      <div
        style={{
          textAlign:
            "center",
          marginBottom:
            "45px",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize:
              "28px",
            fontWeight:
              "700",
          }}
        >
          Attendance
        </h2>

        <p
          style={{
            marginTop:
              "8px",
            fontSize:
              "13px",
            color:
              "#94a3b8",
          }}
        >
          Management System
        </p>
      </div>

      {/* Menu */}
      <div
        style={{
          display:
            "flex",
          flexDirection:
            "column",
          gap: "12px",
          flex: 1,
        }}
      >
        {role ===
          "admin" && (
          <>
            <NavLink
              to="/admin/dashboard"
              style={
                linkStyle
              }
              onClick={
                closeSidebar
              }
            >
              📊 Dashboard
            </NavLink>

            <NavLink
              to="/admin/employees"
              style={
                linkStyle
              }
              onClick={
                closeSidebar
              }
            >
              👥 Employees
            </NavLink>

            <NavLink
              to="/admin/leaves"
              style={
                linkStyle
              }
              onClick={
                closeSidebar
              }
            >
              📝 Manage Leaves
            </NavLink>

            <NavLink
              to="/admin/reports"
              style={
                linkStyle
              }
              onClick={
                closeSidebar
              }
            >
              📅 Attendance Reports
            </NavLink>
            <NavLink
  to="/admin/location"
  style={linkStyle}
>
  📍 Office Location
</NavLink>
          </>
        )}

        {role ===
          "employee" && (
          <>
            <NavLink
              to="/employee/dashboard"
              style={
                linkStyle
              }
              onClick={
                closeSidebar
              }
            >
              📊 Dashboard
            </NavLink>

            <NavLink
              to="/employee/apply-leave"
              style={
                linkStyle
              }
              onClick={
                closeSidebar
              }
            >
              📝 Apply Leave
            </NavLink>

            <NavLink
              to="/employee/leaves"
              style={
                linkStyle
              }
              onClick={
                closeSidebar
              }
            >
              📂 Leave History
            </NavLink>
          </>
        )}
    <NavLink
  to="/employee/change-password"
  style={linkStyle}
  onClick={closeSidebar}
>
  🔐 Change Password
</NavLink>
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        style={{
          padding:
            "14px",
          border:
            "none",
          borderRadius:
            "14px",
          background:
            "#dc2626",
          color:
            "#ffffff",
          cursor:
            "pointer",
          fontSize:
            "15px",
          fontWeight:
            "600",
        }}
      >
        🚪 Logout
      </button>
    </div>
  );
}

export default Sidebar;