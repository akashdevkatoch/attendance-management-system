import {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import api from "../services/api";

function EditEmployee() {

  const navigate =
    useNavigate();

  const { id } =
    useParams();

  const [form,
    setForm] =
    useState({
      name: "",
      email: "",
      mobile: "",
      designation: "",
      role: "",
      status: ""
    });

  const loadEmployee =
    async () => {

      try {

        const response =
          await api.get(
            "/admin/employees"
          );

        const emp =
          response.data.find(
            (e) =>
              e.id ===
              Number(id)
          );

        if (emp) {
          setForm(emp);
        }

      } catch (
        error
      ) {
        alert(
          "Unable to load employee"
        );
      }
    };

  const handleChange =
    (e) => {
      setForm({
        ...form,
        [e.target.name]:
          e.target.value
      });
    };

  const updateEmployee =
    async () => {

      try {

        await api.put(
          `/admin/employees/${id}`,
          form
        );

        alert(
          "Employee Updated"
        );

        navigate(
          "/admin/employees"
        );

      } catch (
        error
      ) {
        alert(
          "Update Failed"
        );
      }
    };

  useEffect(() => {
    loadEmployee();
  }, []);

  return (
    <div
      style={{
        padding:
          "30px"
      }}
    >
      <h2>
        Edit Employee
      </h2>

      <br />

      <input
        name="name"
        value={form.name}
        onChange={
          handleChange
        }
        placeholder="Name"
      />

      <br />
      <br />

      <input
        name="email"
        value={form.email}
        onChange={
          handleChange
        }
        placeholder="Email"
      />

      <br />
      <br />

      <input
        name="mobile"
        value={form.mobile}
        onChange={
          handleChange
        }
        placeholder="Mobile"
      />

      <br />
      <br />

      <input
        name="designation"
        value={
          form.designation
        }
        onChange={
          handleChange
        }
        placeholder="Designation"
      />

      <br />
      <br />

      <select
        name="role"
        value={form.role}
        onChange={
          handleChange
        }
      >
        <option
          value="employee"
        >
          Employee
        </option>

        <option
          value="admin"
        >
          Admin
        </option>
      </select>

      <br />
      <br />

      <select
        name="status"
        value={
          form.status
        }
        onChange={
          handleChange
        }
      >
        <option
          value="active"
        >
          Active
        </option>

        <option
          value="inactive"
        >
          Inactive
        </option>
      </select>

      <br />
      <br />

      <button
        onClick={
          updateEmployee
        }
      >
        Update Employee
      </button>
    </div>
  );
}

export default EditEmployee;