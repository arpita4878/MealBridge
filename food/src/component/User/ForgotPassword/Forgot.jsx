import './ForgotPassword.css';
import { useState } from 'react';
import axios from 'axios';
import { __userapiurl } from '../../../Api_Url';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const validateEmail = () => {
    if (!email) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Invalid email format';
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailError = validateEmail();
    if (emailError) {
      setError(emailError);
      return;
    }

    axios
      .post(__userapiurl + 'forgot-password', { email })
      .then((res) => {
        setOutput('Password reset link sent to your email!');
        setEmail('');
        setError('');
      })
      .catch((err) => {
        setOutput('Failed to send reset link. Please try again.');
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="container bg-white border rounded p-4 shadow" style={{ maxWidth: '500px' }}>
        <h3 className="text-center mb-4">Forgot Password</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <small className="text-danger">{error}</small>}
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary px-4">
              Send Reset Link
            </button>
          </div>
          {output && <p className="text-success text-center mt-3">{output}</p>}
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
