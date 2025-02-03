import React, { useState } from "react";
import "./Login.scss";
import axios from "axios";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", { username, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      // Store user data (userId and token) in localStorage
      localStorage.setItem("userId", res.data._id); // Storing userId
      localStorage.setItem("accessToken", res.data.token); // Storing token

      toast.success("Login successful!");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      setError(error.response.data);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label htmlFor="username">Username</label>
        <input
          name="username"
          type="text"
          placeholder="Enter your name"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {/* {error && <p className="error-message">{error}</p>} */}
        <Link
          to="/register"
          className="link reg"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          New to SevaSquad? Register Now!
        </Link>
      </form>
    </div>
  );
}

export default Login;
