import React, { useState } from "react";
import "./Navbar.scss";
import { MdCleaningServices } from "react-icons/md";
import { Link } from "react-router-dom";
import "../../App.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      toast.success("Logout successful!");
      setTimeout(() => {
        navigate("/register");
      }, 3000);
    } catch (error) {}
  };

  const [open, setOpen] = useState(false);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <MdCleaningServices />
          <Link
            to="/"
            className="link"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span className="text">SevaSquad</span>
          </Link>
        </div>

        <div className="links">
          {currentUser && (
            <Link
              className="link"
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Explore
            </Link>
          )}
          {!currentUser && (
            <Link
              className="link"
              onClick={() => {
                window.open("https://ask-ai-sevasquad.netlify.app/", "_blank");
              }}
            >
              Ask AI
            </Link>
          )}

          {!currentUser && (
            <Link
              to="/login"
              className="link"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Sign in
            </Link>
          )}

          {currentUser && !currentUser?.isWorker && (
            <Link className="link" onClick={handleLogout} to="/register">
              Get Listed
            </Link>
          )}
          {!currentUser && (
            <Link
              to="/register"
              className="link"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <button className="join">Join</button>
            </Link>
          )}
          {currentUser && (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
              <span className="nameUser">{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {currentUser?.isWorker && (
                    <>
                      <Link
                        className="link"
                        to="/mygigs"
                        onClick={() =>
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                      >
                        Gigs
                      </Link>
                      <Link
                        className="link"
                        to="/add"
                        onClick={() =>
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                      >
                        Add New Gig
                      </Link>
                    </>
                  )}
                  <Link
                    className="link"
                    to="/orders"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    Orders
                  </Link>
                  <Link
                    className="link"
                    to="/messages"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    Messages
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="second-container">
        <hr className="line" />
        <div className="menu">
          <Link to={`/gigs?cat=cleaning`} className="link">
            <span>Cleaning</span>
          </Link>
          <Link to={`/gigs?cat=childcare`} className="link">
            <span>Childcare</span>
          </Link>
          <Link to={`/gigs?cat=petcare`} className="link">
            <span>Petcare</span>
          </Link>
          <Link to={`/gigs?cat=plumbing`} className="link">
            <span>Plumbing</span>
          </Link>
          <Link to={`/gigs?cat=electrical`} className="link">
            <span>Electrical</span>
          </Link>
          <Link to={`/gigs?cat=gardening`} className="link">
            <span>Gardening</span>
          </Link>
          <Link to={`/gigs?cat=painting`} className="link">
            <span>Painting</span>
          </Link>
          <Link to={`/gigs?cat=carpentry`} className="link">
            <span>Carpentry</span>
          </Link>
          <Link to={`/gigs?cat=emergency`} className="link">
            <span>Emergency</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
