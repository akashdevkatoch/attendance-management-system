import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import ChangePassword from "./pages/ChangePassword";

// Employee Pages
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ApplyLeave from "./pages/ApplyLeave";
import LeaveHistory from "./pages/LeaveHistory";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import ResetPassword from "./pages/ResetPassword";
import AttendanceReport from "./pages/AttendanceReport";
import AdminLeaves from "./pages/AdminLeaves";
import OfficeLocation from "./pages/OfficeLocation";

// Layout & Security
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* Employee Routes */}
        <Route
          element={
            <ProtectedRoute
              allowedRole="employee"
            >
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/employee/dashboard"
            element={
              <EmployeeDashboard />
            }
          />

          <Route
            path="/employee/apply-leave"
            element={<ApplyLeave />}
          />

          <Route
            path="/employee/leaves"
            element={
              <LeaveHistory />
            }
          />
          <Route
  path="/employee/change-password"
  element={<ChangePassword />}
/>
        </Route>


        {/* Admin Routes */}
        <Route
          element={
            <ProtectedRoute
              allowedRole="admin"
            >
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/admin/dashboard"
            element={
              <AdminDashboard />
            }
          />

          <Route
            path="/admin/employees"
            element={<Employees />}
          />

          <Route
            path="/admin/add-employee"
            element={
              <AddEmployee />
            }
          />

          <Route
            path="/admin/edit-employee/:id"
            element={
              <EditEmployee />
            }
          />

          <Route
            path="/admin/reset-password/:id"
            element={
              <ResetPassword />
            }
          />

          <Route
            path="/admin/reports"
            element={
              <AttendanceReport />
            }
          />

          <Route
            path="/admin/leaves"
            element={
              <AdminLeaves />
            }
          />
          <Route
  path="/admin/location"
  element={
    <OfficeLocation />
  }
/>
        </Route>
        {/* Invalid URL */}
        <Route
          path="*"
          element={<Login />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;