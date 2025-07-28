import './Register.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { __userapiurl } from '../../../Api_Url';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    city: '',
    address: '',
    gender: '',
    password: ''
  });

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Your Google Client ID here
  const CLIENT_ID = '906310881176-79sroguj45kjautpb9go7bhmn7gsl784.apps.googleusercontent.com';

  useEffect(() => {
    // Initialize Google Sign-In button
    if (window.google && window.google.accounts) {
      window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleGoogleResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById('googleSignUpDiv'),
        {
          theme: 'outline',
          size: 'large',
          text: 'signup_with',
        }
      );
    }
  }, []);

  const validate = () => {
    const newError = {};
    if (!form.name) newError.name = 'Name is required.';
    if (!form.email) newError.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newError.email = 'Invalid email format.';
    if (!form.mobile) newError.mobile = 'Mobile number is required.';
    else if (!/^[0-9]{10}$/.test(form.mobile)) newError.mobile = 'Mobile must be 10 digits.';
    if (!form.city) newError.city = 'City is required.';
    if (!form.address) newError.address = 'Address is required.';
    if (!form.gender) newError.gender = 'Gender is required.';
    if (!form.password) newError.password = 'Password is required.';
    else if (form.password.length < 6) newError.password = 'Password must be at least 6 characters.';

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);

    try {
      // Check if email already exists
      const checkRes = await axios.get(`${__userapiurl}check-email?email=${form.email}`);
      if (checkRes.data.exists) {
        setLoading(false);
        Swal.fire({
          icon: 'warning',
          title: 'Already Registered',
          text: 'This email is already in use. Please login instead.',
        });
        return;
      }

      // Register user
      await axios.post(`${__userapiurl}register`, form);

      setForm({
        name: '',
        email: '',
        mobile: '',
        city: '',
        address: '',
        gender: '',
        password: ''
      });

      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: '🎉 Welcome to MealBridge!',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'Something went wrong. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  // Google Sign-Up handler
  const handleGoogleResponse = async (response) => {
    try {
      setLoading(true);
      const res = await axios.post(`${__userapiurl}google-login`, {
        token: response.credential,
      });

      const user = res.data.userDetails;
      localStorage.setItem('token', res.data.token);
      Object.entries(user).forEach(([key, value]) => localStorage.setItem(key, value));

      Swal.fire({
        icon: 'success',
        title: 'Google Sign Up Successful!',
        text: 'Welcome to MealBridge!',
        showConfirmButton: false,
        timer: 2000,
      });

      setTimeout(() => {
        navigate(user.role === 'admin' ? '/admin' : '/user');
      }, 2000);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Google Sign Up Failed',
        text: 'Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid contact py-6 wow fadeInUp" data-wow-delay="0.1s">
      <div className="container">
        <div className="bg-light shadow p-5 rounded-4 border border-primary-subtle">

          <div className="text-center mb-5">
            <h2 className="display-6 fw-semibold">Create Your Account</h2>
            <p className="text-muted">Join MealBridge to help reduce food waste and feed those in need.</p>
          </div>

          <div className="row g-4">
            {/* Name */}
            <div className="col-md-6">
              <input
                type="text"
                name="name"
                className="form-control border-primary-subtle"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                disabled={loading}
              />
              {error.name && <small className="text-danger">{error.name}</small>}
            </div>

            {/* Email */}
            <div className="col-md-6">
              <input
                type="email"
                name="email"
                className="form-control border-primary-subtle"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                disabled={loading}
              />
              {error.email && <small className="text-danger">{error.email}</small>}
            </div>

            {/* Mobile */}
            <div className="col-md-6">
              <input
                type="text"
                name="mobile"
                className="form-control border-primary-subtle"
                placeholder="Mobile Number"
                value={form.mobile}
                onChange={handleChange}
                disabled={loading}
              />
              {error.mobile && <small className="text-danger">{error.mobile}</small>}
            </div>

            {/* Password */}
            <div className="col-md-6">
              <input
                type="password"
                name="password"
                className="form-control border-primary-subtle"
                placeholder="Create Password"
                value={form.password}
                onChange={handleChange}
                disabled={loading}
              />
              {error.password && <small className="text-danger">{error.password}</small>}
            </div>

            {/* City */}
            <div className="col-md-6">
              <select
                className="form-select border-primary-subtle"
                name="city"
                value={form.city}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="">Select City</option>
                <option value="Indore">Indore</option>
                <option value="Pune">Pune</option>
                <option value="Khandwa">Khandwa</option>
                <option value="Ujjain">Ujjain</option>
              </select>
              {error.city && <small className="text-danger">{error.city}</small>}
            </div>

            {/* Address */}
            <div className="col-md-6">
              <input
                type="text"
                name="address"
                className="form-control border-primary-subtle"
                placeholder="Address / Location"
                value={form.address}
                onChange={handleChange}
                disabled={loading}
              />
              {error.address && <small className="text-danger">{error.address}</small>}
            </div>

            {/* Gender */}
            <div className="col-md-6">
              <select
                className="form-select border-primary-subtle"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {error.gender && <small className="text-danger">{error.gender}</small>}
            </div>

            {/* Submit Button */}
            <div className="col-12 text-center">
              <button
                type="button"
                className="btn btn-primary px-5 py-2 rounded-pill d-flex align-items-center justify-content-center gap-2"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading && (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
                {loading ? 'Registering...' : 'Register'}
              </button>

              <p className="mt-4 text-muted">
                Already have an account?{' '}
                <Link to="/login" className="fw-bold text-decoration-none text-primary">
                  Login here
                </Link>
              </p>
            </div>
          </div>

          {/* Google Sign-Up Button */}
          <div className="text-center my-4">
            <p>Or sign up using</p>
            <div id="googleSignUpDiv"></div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Register;
