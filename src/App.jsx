import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    salary: "",
  });

  const API_URL  = "https://ems-backend-7jpw.onrender.com/employees";

  const getEmployees = async () => {
    const params = new URLSearchParams();

    if (searchTerm) {
      params.append("search", searchTerm);
    }

    if (departmentFilter !== "All") {
      params.append("department", departmentFilter);
    }

    const response = await fetch(`${API_URL}?${params.toString()}`);
    const data = await response.json();
    setEmployees(data);
  };

  useEffect(() => {
    getEmployees();
  }, [searchTerm, departmentFilter]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      department: "",
      salary: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      salary: Number(formData.salary),
    };

    if (editingId) {
      await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    }

    resetForm();
    getEmployees();
  };

  const deleteEmployee = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (editingId === id) {
      resetForm();
    }

    getEmployees();
  };

  const startEdit = (employee) => {
    setEditingId(employee.id);
    setFormData({
      name: employee.name,
      department: employee.department,
      salary: employee.salary,
    });
  };

  const departmentOptions = [
    "All",
    ...new Set(employees.map((employee) => employee.department).filter(Boolean)),
  ];

  return (
    <div className="app-shell">
      <div className="header">
        <div>
          <h1>Employee Management System</h1>
          <p>Manage employees, search by name, filter by department, and edit details instantly.</p>
        </div>
        <div className="count-badge">Employees: {employees.length}</div>
      </div>

      <form onSubmit={handleSubmit} className="form-card">
        <h2>{editingId ? "Edit Employee" : "Add Employee"}</h2>

        <div className="form-grid">
          <input
            type="text"
            name="name"
            placeholder="Employee Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit">{editingId ? "Update Employee" : "Add Employee"}</button>
          {editingId ? (
            <button type="button" className="secondary-btn" onClick={resetForm}>
              Cancel
            </button>
          ) : null}
        </div>
      </form>

      <div className="toolbar">
        <input
          type="text"
          placeholder="Search employee"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
        >
          {departmentOptions.map((department) => (
            <option key={department} value={department}>
              {department === "All" ? "All Departments" : department}
            </option>
          ))}
        </select>
      </div>

      <div className="employee-grid">
        {employees.length === 0 ? (
          <div className="empty-state">No employees found.</div>
        ) : (
          employees.map((employee) => (
            <div key={employee.id} className="card">
              <h3>{employee.name}</h3>
              <p>Department: {employee.department}</p>
              <p>Salary: ₹{employee.salary}</p>

              <div className="card-actions">
                <button className="edit-btn" onClick={() => startEdit(employee)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteEmployee(employee.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
