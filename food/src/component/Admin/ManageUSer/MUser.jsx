import { useState, useEffect } from "react";
import axios from 'axios';
import { __userapiurl } from '../../../Api_Url';
import './MUser.css';

function MUser() {
  const [users, setUser] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    axios.get(__userapiurl + "fetch",{
      params:{"role":"user"}
    })
      .then(res => setUser(res.data))
      .catch(console.error);
  }, []);

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / pageSize);
  const displayedUsers = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

 

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Manage User Dashboard</h1>

      <div className="row mb-3">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder=" Search users by name or email..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Id</th><th>Name</th><th>Email</th><th>Mobile</th>
              <th>City</th><th>Address</th><th>Info</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.map(u => (
              <tr key={u._id}>
                <td>{u._id}</td><td>{u.name}</td><td>{u.email}</td><td>{u.mobile}</td>
                <td>{u.city}</td><td>{u.address}</td><td>{u.info}</td><td>{u.status}</td>
                <td>
                  <button onClick={() => handleDelete(u)} className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
            ))}
            {displayedUsers.length === 0 && (
              <tr><td colSpan="9" className="text-center py-3">No matching users found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
              <button className="page-link" onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}>
                Previous
              </button>
            </li>
            {[...Array(totalPages)].map((_, i) => (
              <li key={i} className={`page-item ${currentPage === i + 1 && 'active'}`}>
                <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages && 'disabled'}`}>
              <button className="page-link" onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

export default MUser;
