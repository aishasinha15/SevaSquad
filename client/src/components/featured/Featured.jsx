import React, { useState } from "react";
import "./Featured.scss";
import { IoMdSearch } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

const Featured = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission
    if (input.trim()) {
      const lowerCaseInput = input.trim().toLowerCase(); // Convert input to lowercase
      navigate(`/gigs?cat=${encodeURIComponent(lowerCaseInput)}`); // Use `cat` parameter
    }
  };

  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Ghar ka kaam, <i>SevaSquad</i> ke naam!
          </h1>
        </div>

        <div className="right">
          {/* Wrap search in a form */}
          <form className="search" onSubmit={handleSubmit}>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Try cleaning services"
                value={input}
                onChange={(e) => setInput(e.target.value)} // Update state
              />
            </div>
            <button type="submit">
              {" "}
              {/* Type must be "submit" */}
              <IoMdSearch />
            </button>
          </form>

          <div className="popular">
            <span>Popular:</span>
            <Link to={`/gigs?cat=cleaning`} className="link">
              <button>Cleaning Services</button>
            </Link>
            <Link to={`/gigs?cat=plumbing`} className="link">
              <button>Plumbing Services</button>
            </Link>
            <Link to={`/gigs?cat=childcare`} className="link">
              <button>Childcare Services</button>
            </Link>
            <Link to={`/gigs?cat=petcare`} className="link">
              <button>Pet Care Services</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
