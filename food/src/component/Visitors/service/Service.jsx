import './Service.css';
import { Link } from 'react-router-dom';

function Service() {
  return (
    <>
      {/* Service Start */}
      <div className="container-fluid service py-6">
        <div className="container">
          <div className="text-center wow bounceInUp" data-wow-delay="0.1s">
            <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
              Our Services
            </small>
            <h1 className="display-5 mb-5">What We Offer</h1>
          </div>
          <div className="row g-4">

            {/* Food Listing */}
            <div className="col-lg-3 col-md-6 col-sm-12 wow bounceInUp" data-wow-delay="0.1s">
              <div className="bg-light rounded service-item">
                <div className="service-content d-flex align-items-center justify-content-center p-4">
                  <div className="service-content-icon text-center">
                    <i className="fas fa-utensils fa-7x text-primary mb-4"></i>
                    <h4 className="mb-3">Food Listing</h4>
                    <p className="mb-4">Restaurants and stores can easily post surplus food with photos, quantity, and expiry info.</p>
            <Link to='/register'>       <a className="btn btn-primary px-4 py-2 rounded-pill">Post Surplus Food</a></Link> 
                  </div>
                </div>
              </div>
            </div>

            {/* Real-Time Matching */}
            <div className="col-lg-3 col-md-6 col-sm-12 wow bounceInUp" data-wow-delay="0.3s">
              <div className="bg-light rounded service-item">
                <div className="service-content d-flex align-items-center justify-content-center p-4">
                  <div className="service-content-icon text-center">
                    <i className="fas fa-clock fa-7x text-primary mb-4"></i>
                    <h4 className="mb-3">Real-Time Matching</h4>
                    <p className="mb-4">NGOs and individuals can browse available food nearby, filtered by expiry time and type.</p>
                 <Link to='/register'>    <a className="btn btn-primary px-4 py-2 rounded-pill">Find Nearby Food</a></Link> 
                  </div>
                </div>
              </div>
            </div>

            {/* Pickup Coordination */}
            <div className="col-lg-3 col-md-6 col-sm-12 wow bounceInUp" data-wow-delay="0.5s">
              <div className="bg-light rounded service-item">
                <div className="service-content d-flex align-items-center justify-content-center p-4">
                  <div className="service-content-icon text-center">
                    <i className="fas fa-truck-pickup fa-7x text-primary mb-4"></i>
                    <h4 className="mb-3">Pickup Coordination</h4>
                    <p className="mb-4">Use in-location Coordinatess and messaging to arrange timely pickups between donors and collectors.</p>
               <Link to='/register'>      <a className="btn btn-primary px-4 py-2 rounded-pill">Coordinate Pickup</a></Link> 
                  </div>
                </div>
              </div>
            </div>

            {/* Impact Tracking */}
            <div className="col-lg-3 col-md-6 col-sm-12 wow bounceInUp" data-wow-delay="0.7s">
              <div className="bg-light rounded service-item">
                <div className="service-content d-flex align-items-center justify-content-center p-4">
                  <div className="service-content-icon text-center">
                    <i className="fas fa-chart-line fa-7x text-primary mb-4"></i>
                    <h4 className="mb-3">Impact Tracking</h4>
                    <p className="mb-4">Track how much food you’ve saved and how many people you’ve helped, all in one dashboard.</p>
                 <Link to='impactracking'>   <a className="btn btn-primary px-4 py-2 rounded-pill">View Impact Dashboard</a></Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      {/* Service End */}
    </>
  );
}

export default Service;
