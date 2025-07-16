import './Footer.css';

function Footer() {
  return (
    <>
      {/* Footer Start */}
      <div className="container-fluid footer py-6 my-6 mb-0 bg-light wow bounceInUp" data-wow-delay="0.1s">
        <div className="container">
          <div className="row">

            {/* Brand Info */}
            <div className="col-lg-3 col-md-6">
              <div className="footer-item">
                <h1 className="text-primary">Meal<span className="text-dark">Bridge</span></h1>
                <p className="lh-lg mb-4">
                  MealBridge is a platform that connects restaurants and grocery stores with NGOs and individuals to rescue surplus food and fight hunger — one meal at a time.
                </p>
                <div className="footer-icon d-flex">
                  <a className="btn btn-primary btn-sm-square me-2 rounded-circle"><i className="fab fa-facebook-f"></i></a>
                  <a className="btn btn-primary btn-sm-square me-2 rounded-circle"><i className="fab fa-twitter"></i></a>
                  <a className="btn btn-primary btn-sm-square me-2 rounded-circle"><i className="fab fa-instagram"></i></a>
                  <a className="btn btn-primary btn-sm-square rounded-circle"><i className="fab fa-linkedin-in"></i></a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-lg-3 col-md-6">
              <div className="footer-item">
                <h4 className="mb-4">Quick Links</h4>
                <div className="d-flex flex-column align-items-start">
                  <a href="/about" className="text-body mb-3"><i className="fa fa-check text-primary me-2"></i>About Us</a>
                  <a href="/services" className="text-body mb-3"><i className="fa fa-check text-primary me-2"></i>Our Services</a>
                  <a href="/impact" className="text-body mb-3"><i className="fa fa-check text-primary me-2"></i>Impact Dashboard</a>
                  <a href="/contact" className="text-body mb-3"><i className="fa fa-check text-primary me-2"></i>Contact Us</a>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="col-lg-3 col-md-6">
              <div className="footer-item">
                <h4 className="mb-4">Contact Us</h4>
                <div className="d-flex flex-column align-items-start">
                  <p><i className="fa fa-map-marker-alt text-primary me-2"></i> Clerk Colony, Indore</p>
                  <p><i className="fa fa-phone-alt text-primary me-2"></i> +91-XXXXXXXXXX</p>
                  <p><i className="fas fa-envelope text-primary me-2"></i> support@mealbridge.org</p>
                  <p><i className="fa fa-clock text-primary me-2"></i> Open 24/7</p>
                </div>
              </div>
            </div>

            {/* App Preview or Gallery */}
            <div className="col-lg-3 col-md-6">
              <div className="footer-item">
                <h4 className="mb-4">App Gallery</h4>
                <div className="row g-2">
                  {[1, 2, 3, 4].map(num => (
                    <div key={num} className="col-4">
                      <img
                        src={`/assets/img/feature-${num}.jpg`}
                        className="img-fluid rounded-circle border border-primary p-2"
                        alt={`Feature ${num}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      {/* Footer End */}

      {/* Copyright */}
      <div className="container-fluid copyright bg-dark py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <span className="text-light">
                <i className="fas fa-copyright text-light me-2"></i>
                MealBridge © {new Date().getFullYear()}, All rights reserved.
              </span>
            </div>
            <div className="col-md-6 text-center text-md-end text-white">
              <a href="/terms" className="text-white me-3">Terms</a>
              <a href="/privacy" className="text-white">Privacy</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
