import { useState } from 'react';
import axios from 'axios';
import { __userapiurl } from '../../../Api_Url';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState({});

  const validate = () => {
    const newError = {};
    if (!currentPassword) newError.currentPassword = 'Current password is required.';
    if (!newPassword) newError.newPassword = 'New password is required.';
    else if (newPassword.length < 6) newError.newPassword = 'Password must be at least 6 characters.';
    if (newPassword !== confirmPassword) newError.confirmPassword = 'Passwords do not match.';
    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const email = localStorage.getItem('email');

    axios
      .get(
        __userapiurl + 'fetch',
        {
          params:{email,password:currentPassword}
        }).then(()=>{
            if(newPassword===confirmPassword){
                const  updatedDetails={
                    condition_obj:{email},
                    content_obj:{password:newPassword}
                };
                axios.patch(__userapiurl+"update",updatedDetails).then(()=>{
                    localStorage.clear();
                    navigate("/login",{replace:true})
                })
            }
            else{
                setOutput("New and confirm new password not matched")
                setNewPassword("")
                setConfirmPassword("")
            }
        }).catch(()=>{
            setOutput("Invalid old password")
            setCurrentPassword("")
        });
  };

  return (
    <>
      <div className="container-fluid contact py-6 wow bounceInUp" data-wow-delay="0.1s">
        <div className="container">
          <div className="bg-light shadow p-5 rounded-4 border border-primary-subtle">
            <div className="text-center mb-5">
              {output && (
                <h4 className={`mb-2 ${output.includes('success') ? 'text-success' : 'text-danger'}`}>
                  {output}
                </h4>
              )}
              <h2 className="display-6 fw-semibold">Change Password</h2>
              <p className="text-muted">Protect your account by updating your password regularly.</p>
            </div>

            <div className="row g-4">
              {/* Current Password */}
              <div className="col-md-12">
                <input
                  type="password"
                  className="form-control border-primary-subtle"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                {error.currentPassword && (
                  <small className="text-danger fw-semibold">{error.currentPassword}</small>
                )}
              </div>

              {/* New Password */}
              <div className="col-md-6">
                <input
                  type="password"
                  className="form-control border-primary-subtle"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                {error.newPassword && <small className="text-danger fw-semibold">{error.newPassword}</small>}
              </div>

              {/* Confirm Password */}
              <div className="col-md-6">
                <input
                  type="password"
                  className="form-control border-primary-subtle"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {error.confirmPassword && (
                  <small className="text-danger fw-semibold">{error.confirmPassword}</small>
                )}
              </div>

              {/* Submit Button */}
              <div className="col-12 text-center">
                <button
                  type="button"
                  className="btn btn-primary px-5 py-2 rounded-pill"
                  onClick={handleSubmit}
                >
                  Update Password
                </button>

                <p className="mt-4 text-muted">
                  Changed your mind?{' '}
                  <span
                    className="fw-bold text-decoration-none text-primary"
                    role="button"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
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

export default ChangePassword;
