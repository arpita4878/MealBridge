import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Home.css'

function AdminHome() {
  const [name, setName] = useState();

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setName(storedName);
    }
  }, []);

  return (
    <div className="admin-container py-5">
      <div className="admin-header text-center mb-5">
        <small
          className="admin-welcome d-inline-block fw-bold text-uppercase bg-light border border-primary rounded-pill px-4 py-2 mb-2"
          aria-label={name ? `Welcome, ${name}` : "Welcome"}
        >
          {name ? `Welcome, ${name}` : "Welcome"}
        </small>
        <h1 className="admin-title display-4 fw-bold mb-3">Admin Dashboard</h1>
        <p className="admin-subtitle lead text-muted">
          Manage and monitor food donations, claims, and generate reports easily.
        </p>
      </div>

      <div className="row g-4 justify-content-center admin-actions">
        <div className="col-md-4">
          <Link
            to="/manage-donations"
            className="admin-card card h-100 text-decoration-none text-white bg-primary shadow-sm"
            aria-label="Manage Donations"
          >
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <i className="fas fa-box-open fa-3x mb-3"></i>
              <h5 className="card-title">Manage Donations</h5>
              <p className="card-text text-center">
                View, edit, and organize all food donations in the system.
              </p>
            </div>
          </Link>
        </div>

        <div className="col-md-4">
          <Link
            to="/user-claims"
            className="admin-card card h-100 text-decoration-none text-white bg-success shadow-sm"
            aria-label="View Claims"
          >
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <i className="fas fa-check-circle fa-3x mb-3"></i>
              <h5 className="card-title">View Claims</h5>
              <p className="card-text text-center">
                Monitor food claims made by users and volunteers.
              </p>
            </div>
          </Link>
        </div>

        <div className="col-md-4">
          <Link
            to="/reports"
            className="admin-card card h-100 text-decoration-none text-white bg-info shadow-sm"
            aria-label="Reports and Analytics"
          >
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <i className="fas fa-chart-line fa-3x mb-3"></i>
              <h5 className="card-title">Reports & Analytics</h5>
              <p className="card-text text-center">
                Generate insights on donations, claims, and system usage.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
