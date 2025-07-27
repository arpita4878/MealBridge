import { useState, useEffect } from "react";
import {Link} from 'react-router-dom'


function UserHome() {
  const [name, setName] = useState();

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setName(storedName);
    }
  }, []);

  return (
    <>
      <br /><br />
      <div className="container">
        <div className="col-lg-12 wow bounceInUp" data-wow-delay="0.3s">
          <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
            {name ? `Welcome, ${name}` : "Welcome"}
          </small>
          <h1 className="display-5 mb-4">Food Waste Tracking & Redistribution System</h1>
          <p className="mb-4">
            This platform connects restaurants, bakeries, and supermarkets with NGOs or individuals to redistribute surplus food efficiently and reduce waste.
          </p>

          <div className="row g-4 text-dark mb-5">
            <div className="col-sm-6">
              <i className="fas fa-map-marker-alt text-primary me-2"></i> Location-based Food Listings
            </div>
            <div className="col-sm-6">
              <i className="fas fa-clock text-primary me-2"></i> Real-Time Expiry Tracking
            </div>
            <div className="col-sm-6">
              <i className="fas fa-hand-holding-heart text-primary me-2"></i> NGO & Volunteer Involvement
            </div>
            <div className="col-sm-6">
              <i className="fas fa-seedling text-primary me-2"></i> Helping Reduce Food Waste & Hunger
            </div>
          </div>

          <div className="mb-4">
            <h4>How It Works</h4>
            <ol className="ps-3">
              <li>Restaurants list extra food with expiry and location.</li>
              <li>NGOs or users view and claim food nearby.</li>
              <li>Pickup is coordinated using location and contact info.</li>
              <li>Food is redistributed before expiration.</li>
            </ol>
          </div>

          <div className="d-flex flex-wrap gap-3">
            <button className="btn btn-success py-3 px-5 rounded-pill"><Link to='/donate'>  Donate Food</Link></button>
            <button className="btn btn-outline-primary py-3 px-5 rounded-pill" ><Link to='/findfood'> Find Food</Link></button>
          </div>
        </div>
      </div>
      <br /><br />
    </>
  );
}

export default UserHome;
