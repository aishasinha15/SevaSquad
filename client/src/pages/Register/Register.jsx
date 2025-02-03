import React, { useState } from "react";
import "./Register.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import upload from "../../utils/upload";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function Register() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    locality: "",
    isWorker: "false",
    desc: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = await upload(file);
      await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });

      toast.success("Registration successful!");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error("Registration failed. Please try again.");
    }
  };

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleWorker = (e) => {
    setUser((prev) => ({
      ...prev,
      isWorker: e.target.checked,
    }));
  };

  return (
    <div className="register">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label>Username</label>
          <input
            name="username"
            type="text"
            placeholder="Enter your name"
            onChange={handleChange}
          />
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={handleChange}
          />
          <label>Password</label>
          <input name="password" type="password" onChange={handleChange} />
          <label>Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <label>Locality</label>
          <input
            name="locality"
            type="text"
            placeholder="Mayur Vihar..."
            onChange={handleChange}
          />
          <button type="submit">Register</button>
          <Link
            to="/login"
            className="link log"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Already have an account? Login
          </Link>
        </div>
        <div className="right">
          <h1>I want to become a professional</h1>
          <div className="toggle">
            <label>Activate the professional account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleWorker} />
              <span className="slider round"></span>
            </label>
          </div>
          <label>Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+91 1234567890"
            onChange={handleChange}
          />
          <label>Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default Register;
