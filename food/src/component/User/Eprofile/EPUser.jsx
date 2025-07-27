 // Reuse same styling
import { useState, useEffect } from 'react';
import axios from 'axios';
import { __userapiurl } from '../../../Api_Url';
import { useNavigate } from 'react-router-dom';

function EditProfile() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState({});

  // Prefill form with data from localStorage
  useEffect(() => {
    setName(localStorage.getItem('name') || '');
    setEmail(localStorage.getItem('email') || '');
    setMobile(localStorage.getItem('mobile') || '');
    setCity(localStorage.getItem('city') || '');
    setAddress(localStorage.getItem('address') || '');
    setGender(localStorage.getItem('gender') || '');
  }, []);

  const validate = () => {
    const newError = {};
    if (!name) newError.name = 'Name is required.';
    if (!email) newError.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(email)) newError.email = 'Invalid email format.';
    if (!mobile) newError.mobile = 'Mobile number is required.';
    else if (!/^[0-9]{10}$/.test(mobile)) newError.mobile = 'Mobile must be 10 digits.';
    if (!city) newError.city = 'City is required.';
    if (!address) newError.address = 'Address is required.';
    if (!gender) newError.gender = 'Gender is required.';

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const updatedDetails = {
    "condition_obj": { "email": email },
   "content_obj":  { name, email, mobile, city, gender, address }
    }

    axios
      .patch(__userapiurl + 'update', updatedDetails,)
      .then((res) => {
        setOutput('Profile updated successfully!');
        setTimeout(() => {
          navigate('/user');
        }, 2000);
      })
      .catch((error) => {
        setOutput('Update failed. Please try again...');
        console.log(error)
      });
  };

  return (
    <>
      {/* Edit Profile Section */}
      <div className="container-fluid contact py-6 wow bounceInUp" data-wow-delay="0.1s">
        <div className="container">
          <div className="bg-light shadow p-5 rounded-4 border border-primary-subtle">
            <div className="text-center mb-5">
              {output && (
                <h4 className={`mb-2 ${output.includes('success') ? 'text-success' : 'text-danger'}`}>
                  {output}
                </h4>
              )}
              <h2 className="display-6 fw-semibold">Edit Your Profile</h2>
              <p className="text-muted">Update your information to keep your account current.</p>
            </div>

            <div className="row g-4">
              {/* Name */}
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control border-primary-subtle"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {error.name && <small className="text-danger fw-semibold">{error.name}</small>}
              </div>

              {/* Email */}
              <div className="col-md-6">
                <input
                  type="email"
                  className="form-control border-primary-subtle"
                  placeholder="Email Address"
                  value={email}
                  readOnly
                />
                {error.email && <small className="text-danger fw-semibold">{error.email}</small>}
              </div>

              {/* Mobile */}
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control border-primary-subtle"
                  placeholder="Mobile Number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
                {error.mobile && <small className="text-danger fw-semibold">{error.mobile}</small>}
              </div>

              {/* City */}
              <div className="col-md-6">
                <select
                  className="form-select border-primary-subtle"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option value="">Select City</option>
                  <option value="Indore">Indore</option>
                  <option value="Pune">Pune</option>
                  <option value="Khandwa">Khandwa</option>
                  <option value="Ujjain">Ujjain</option>
                </select>
                {error.city && <small className="text-danger fw-semibold">{error.city}</small>}
              </div>

              {/* Address */}
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control border-primary-subtle"
                  placeholder="Address / Location"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                {error.address && <small className="text-danger fw-semibold">{error.address}</small>}
              </div>

              {/* Gender */}
              <div className="col-md-6">
                <select
                  className="form-select border-primary-subtle"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {error.gender && <small className="text-danger fw-semibold">{error.gender}</small>}
              </div>

              {/* Submit Button */}
              <div className="col-12 text-center">
                <button
                  type="button"
                  className="btn btn-primary px-5 py-2 rounded-pill"
                  onClick={handleSubmit}
                >
                  Update Profile
                </button>

                <p className="mt-4 text-muted">
                  Want to go back?{' '}
                  <span
                    className="fw-bold text-decoration-none text-primary"
                    role="button"
                    onClick={() => navigate(-1)}
                  >
                    Cancel and return
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
