import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddEmployee() {
  const navigate = useNavigate();

  const [form, setForm] =
    useState({
      employee_id: "",
      name: "",
      email: "",
      mobile: "",
      designation: "",
      role: "employee",
      password: ""
    });

  const handleChange =
    (e) => {
      setForm({
        ...form,
        [e.target.name]:
          e.target.value
      });
    };

  const addEmployee =
    async () => {
      try {
        await api.post(
          "/admin/employees",
          form
        );

        alert(
          "Employee Added Successfully"
        );

        navigate(
          "/admin/employees"
        );

      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
          "Unable to add employee"
        );
      }
    };

  return (
    <div
      style={{
        padding: "30px"
      }}
    >
      <h2>
        Add Employee
      </h2>

      <br />

      <input
        name="employee_id"
        placeholder="Employee ID"
        value={
          form.employee_id
        }
        onChange={
          handleChange
        }
      />

      <br />
      <br />

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={
          handleChange
        }
      />

      <br />
      <br />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={
          handleChange
        }
      />

      <br />
      <br />

      <input
        name="mobile"
        placeholder="Mobile"
        value={form.mobile}
        onChange={
          handleChange
        }
      />

      <br />
      <br />

      <input
        name="designation"
        placeholder="Designation"
        value={
          form.designation
        }
        onChange={
          handleChange
        }
      />

      <br />
      <br />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={
          form.password
        }
        onChange={
          handleChange
        }
      />

      <br />
      <br />

      <button
        onClick={
          addEmployee
        }
      >
        Add Employee
      </button>
    </div>
  );
}

export default AddEmployee;