import React from 'react';
import './GetInvolved.css';

function GetInvolved() {
  return (
    <section className="get-involved" aria-labelledby="get-involved-title">
      <h2 id="get-involved-title">Get Involved</h2>
      <p className="get-involved-intro">
        Your support powers our mission. Join us in making a difference.
      </p>

      <div className="get-involved-options">
        <div className="involve-card">
          <h3>🤝 Volunteer</h3>
          <p>Give your time to help distribute food, organize events, or support logistics.</p>
          <button onClick={() => window.location.href = "/volunteer"}>Become a Volunteer</button>
        </div>

        <div className="involve-card">
          <h3>💝 Donate</h3>
          <p>Your donation helps us save more food and reach more people in need.</p>
          <button onClick={() => window.location.href = "/donate"}>Donate Now</button>
        </div>

        <div className="involve-card">
          <h3>📣 Partner With Us</h3>
          <p>Are you an organization or food business? Let’s team up and expand our impact.</p>
          <button onClick={() => window.location.href = "/partners"}>Become a Partner</button>
        </div>
      </div>
    </section>
  );
}

export default GetInvolved;
