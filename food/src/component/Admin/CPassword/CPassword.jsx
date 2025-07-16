import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './CPassword.css'

function CPassword() {
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
       
        <h1 className="admin-title display-5 fw-bold mb-3"> Change Password Dashboard</h1>
        <p className="admin-subtitle lead text-muted">
          Change Password 
        </p>
      </div>

     
    </div>
  );
}

export default CPassword;
