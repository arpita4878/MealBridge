import "./Login.css";
import { __userapiurl } from "../../../Api_Url";
import useLogin from "./useLogin"; 

function Login() {
  const {
    email,
    password,
    setEmail,
    setPassword,
    output,
    success,
    isLoading,
    error,
    captchaText,
    userInputCaptcha,
    setUserInputCaptcha,
    captchaError,
    showForm,
    setShowForm,
    darkMode,
    setDarkMode,
    handleSubmit,
    refreshCaptcha,
  } = useLogin();


  return (

  <div className={`container-fluid min-vh-100 ${darkMode ? "bg-dark text-white" : "bg-light"}`}>
    <div className="row g-0 min-vh-100">
      {/* LEFT COLUMN – LOGIN */}
      <div className="col-lg-6 d-flex align-items-center justify-content-center p-5">
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <div className="text-center mb-4">
            <h3 className="fw-bold">{showForm ? "Log In with Email" : "Log In"}</h3>
            {output && (
              <p className={`mt-2 fw-semibold ${success ? "text-success" : "text-danger"}`}>
                {output}
              </p>
            )}
          </div>

          {!showForm && (
            <>
              <div id="googleSignInDiv" className="d-flex justify-content-center mb-3" />
              <p className="text-center text-muted">or</p>
              <div className="text-center">
                <button type="button" className="btn btn-outline-secondary" onClick={() => setShowForm(true)}>
                  Login with Password
                </button>
              </div>
            </>
          )}

          {showForm && (
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
                {error.email && <small className="text-danger">{error.email}</small>}
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
                {error.password && <small className="text-danger">{error.password}</small>}
              </div>

              <div className="mb-3 text-center">
                <div className="d-flex justify-content-center align-items-center">
                  <span className="captcha-box bg-secondary text-white px-3 py-1 rounded">{captchaText}</span>
                  <i
                    className="fa fa-sync ms-2"
                    title="Refresh Captcha"
                    style={{ cursor: "pointer" }}
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
                <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
          )}

          {isLoading && (
            <div className="d-flex justify-content-center mt-3">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Logging in...</span>
              </div>
            </div>
          )}

          <p className="text-center text-muted mt-3">
            Don’t have an account?{" "}
            <Link to="/register" className="fw-bold">
              Register
            </Link>
          </p>

          {showForm && (
            <div className="text-center mt-3">
              <button className="btn btn-link" onClick={() => setShowForm(false)}>
                ← Back to Google Login
              </button>
            </div>
          )}

          <div className="text-center mt-2">
            <button className="btn btn-sm btn-outline-dark" onClick={() => setDarkMode(!darkMode)}>
              Toggle {darkMode ? "Light" : "Dark"} Mode
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN – IMAGE */}
      <div className="col-lg-6 d-none d-lg-block">
        <div className="h-100 w-100">
          <img
            src="/assets/img/Favicon.png"
            alt="Login Visual"
            className="img-fluid h-100 w-100"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  </div>
);

}

export default Login;
