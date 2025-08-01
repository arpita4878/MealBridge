
import { useState, useEffect } from "react";
import axios from "axios";
import { __userapiurl } from "../../../Api_Url";
import { useNavigate } from "react-router-dom";

 function useLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [output, setOutput] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const [captchaText, setCaptchaText] = useState("");
  const [userInputCaptcha, setUserInputCaptcha] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const validate = () => {
    const newError = {};
    if (!email) newError.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newError.email = "Invalid email format";
    if (!password) newError.password = "Password is required";
    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const generateCaptcha = (length = 5) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  };

  const refreshCaptcha = () => {
    setCaptchaText(generateCaptcha());
    setUserInputCaptcha("");
    setCaptchaError("");
  };

  const handleGoogleResponse = async (response) => {
    try {
      setIsLoading(true);
      const res = await axios.post(`${__userapiurl}google-login`, {
        token: response.credential,
      });
      const user = res.data.userDetails;
      localStorage.setItem("token", res.data.token);
      Object.entries(user).forEach(([key, value]) => localStorage.setItem(key, value));
      setSuccess(true);
      setOutput("Successfully Logged In! Redirecting...");
      setTimeout(() => {
        navigate(user.role === "admin" ? "/admin" : "/user");
      }, 2000);
    } catch (err) {
      setOutput("Google login failed");
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (userInputCaptcha !== captchaText) {
      setCaptchaError("Captcha does not match");
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(`${__userapiurl}login`, { email, password });
      const user = res.data.userDetails;
      localStorage.setItem("token", res.data.token);
      Object.entries(user).forEach(([key, value]) => localStorage.setItem(key, value));
      setSuccess(true);
      setOutput("Successfully Logged In! Redirecting...");
      setTimeout(() => {
        navigate(user.role === "admin" ? "/admin" : "/user");
      }, 2000);
    } catch (err) {
      setOutput("Incorrect Email or Password");
      setEmail("");
      setPassword("");
      setUserInputCaptcha("");
      refreshCaptcha();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshCaptcha();
    window.google?.accounts.id.initialize({
      client_id: "906310881176-79sroguj45kjautpb9go7bhmn7gsl784.apps.googleusercontent.com",
      callback: handleGoogleResponse,
    });
    window.google?.accounts.id.renderButton(document.getElementById("googleSignInDiv"), {
      theme: "outline",
      size: "large",
      text: "signin_with",
    });
  }, []);

  return {
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
  };
}
export default useLogin;