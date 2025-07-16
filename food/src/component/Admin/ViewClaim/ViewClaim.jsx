import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './ViewClaim.css'

function ViewClaim() {
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
       
        <h1 className="admin-title display-5 fw-bold mb-3"> View Claims Dashboard</h1>
        <p className="admin-subtitle lead text-muted">
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, ipsa. 
        </p>
      </div>

     
    </div>
  );
}

export default ViewClaim;
