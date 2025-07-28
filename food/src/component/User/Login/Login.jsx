import './Login.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { __userapiurl } from '../../../Api_Url';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [output, setOutput] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState({});
  const [captchaText, setCaptchaText] = useState('');
  const [userInputCaptcha, setUserInputCaptcha] = useState('');
  const [captchaError, setCaptchaError] = useState('');

  const validate = () => {
    const newError = {};
    if (!email) newError.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newError.email = 'Invalid email format';
    if (!password) newError.password = 'Password is required';
    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const generateCaptcha = (length = 5) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  };

  const refreshCaptcha = () => {
    setCaptchaText(generateCaptcha());
    setUserInputCaptcha('');
    setCaptchaError('');
  };

  useEffect(() => {
    refreshCaptcha();

    // Initialize Google Sign-In
   window.google?.accounts.id.initialize({
  client_id: '906310881176-79sroguj45kjautpb9go7bhmn7gsl784.apps.googleusercontent.com',
  callback: handleGoogleResponse,
});


    window.google?.accounts.id.renderButton(
      document.getElementById('googleSignInDiv'),
      {
        theme: 'outline',
        size: 'large',
        text: 'signin_with',
      }
    );
  }, []);

  const handleGoogleResponse = async (response) => {
    try {
      setIsLoading(true);
      const res = await axios.post(`${__userapiurl}google-login`, {
        token: response.credential,
      });

      const user = res.data.userDetails;
      localStorage.setItem('token', res.data.token);
      Object.entries(user).forEach(([key, value]) => localStorage.setItem(key, value));

      setSuccess(true);
      setOutput('Successfully Logged In! Redirecting...');
      setTimeout(() => {
        navigate(user.role === 'admin' ? '/admin' : '/user');
      }, 2000);
    } catch (err) {
      console.error(err);
      setOutput('Google login failed');
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (userInputCaptcha !== captchaText) {
      setCaptchaError('Captcha does not match');
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(`${__userapiurl}login`, { email, password });

      const user = res.data.userDetails;
      localStorage.setItem('token', res.data.token);
      Object.entries(user).forEach(([key, value]) => localStorage.setItem(key, value));

      setSuccess(true);
      setOutput('Successfully Logged In! Redirecting...');
      setTimeout(() => {
        navigate(user.role === 'admin' ? '/admin' : '/user');
      }, 2000);
    } catch (err) {
      setOutput('Incorrect Email or Password');
      setEmail('');
      setPassword('');
      setUserInputCaptcha('');
      refreshCaptcha();
      console.log(err);
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="w-100 px-3" style={{ maxWidth: '420px' }}>
        <div className="container border rounded shadow p-4 bg-white position-relative">

          {success && (
            <div className="success-overlay d-flex justify-content-center align-items-center">
              <div className="success-animation text-success text-center">
                <i className="fas fa-check-circle fa-3x mb-2"></i>
                <h6 className="fw-bold">Login Successful</h6>
              </div>
            </div>
          )}

          <div className="text-center mb-3">
            <h3 className="fw-bold">Log In</h3>
            {output && (
              <p className={`mt-2 fw-semibold ${success ? 'text-success' : 'text-danger'}`}>{output}</p>
            )}
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
              {error.email && <small className="text-danger fw-semibold">{error.email}</small>}
            </div>

            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
              {error.password && <small className="text-danger fw-semibold">{error.password}</small>}
            </div>

            <div className="mb-3 text-center">
              <div className="d-flex justify-content-center align-items-center">
                <span className="captcha-box">{captchaText}</span>
                <i
                  className="fa fa-sync ms-2"
                  title="Refresh Captcha"
                  style={{ cursor: 'pointer' }}
                  onClick={refreshCaptcha}
                ></i>
              </div>
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Enter captcha"
                value={userInputCaptcha}
                onChange={(e) => setUserInputCaptcha(e.target.value)}
                disabled={isLoading}
              />
              {captchaError && <small className="text-danger">{captchaError}</small>}
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary px-4 py-2 w-100" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </div>

            <div className="my-3 text-center">
              <p className="text-muted">or</p>
              <div id="googleSignInDiv"></div>
              {isLoading && (
                <div className="d-flex justify-content-center mt-2">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Logging in...</span>
                  </div>
                </div>
              )}
            </div>

            <p className="text-center text-muted">
              Don’t have an account?{' '}
              <Link to="/register" className="text-primary fw-bold">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
