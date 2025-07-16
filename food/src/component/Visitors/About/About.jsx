import './About.css';

function About() {
  return (
    <>
      {/* About Start */}
      <div className="container-fluid py-0">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-5 wow bounceInUp" data-wow-delay="0.1s">
              <img src="/assets/img/food-redistribution.jpg" className="img-fluid rounded" alt="Helping reduce food waste" />
            </div>
            <div className="col-lg-7 wow bounceInUp" data-wow-delay="0.3s">
              <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
                About Us
              </small>
              <h1 className="display-5 mb-4">Connecting Surplus Food to Those Who Need It</h1>
              <p className="mb-4">
                Every year, tons of edible food go to waste while millions remain hungry. Our mission is to bridge this gap.
                We provide a smart and efficient platform where restaurants, bakeries, and supermarkets can list excess food, 
                and NGOs or volunteers can claim and collect it — all in real-time,  and expiry tracking.
              </p>
              <div className="row g-4 text-dark mb-5">
                <div className="col-sm-6">
                  <i className="fas fa-map-marker-alt text-primary me-2"></i>Location-Based Listings
                </div>
                <div className="col-sm-6">
                  <i className="fas fa-clock text-primary me-2"></i>Real-Time Expiry Tracking
                </div>
                <div className="col-sm-6">
                  <i className="fas fa-hands-helping text-primary me-2"></i>Verified NGO & Volunteer Network
                </div>
                <div className="col-sm-6">
                  <i className="fas fa-seedling text-primary me-2"></i>Reducing Waste, Feeding Communities
                </div>
              </div>
              {/* <a  className="btn btn-primary py-3 px-5 rounded-pill">
                Learn More<i className="fas fa-arrow-right ps-2"></i>
              </a> */}
            </div>
          </div>
        </div>
      </div>
      {/* About End */}
    </>
  );
}

export default About;
