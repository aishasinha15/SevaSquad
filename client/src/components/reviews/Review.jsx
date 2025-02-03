import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import "./review.scss";

const reviews = [
  {
    name: "Rohan Gupta",
    title: "Small Business Owner",
    image:
      "https://img.freepik.com/free-photo/cheerful-indian-businessman-smiling-closeup-portrait-jobs-career-campaign_53876-129416.jpg",
    text: "I run a small café and often need help with maintenance. SevaSquad’s electrical services have been a lifesaver, from fixing wiring issues to installing new appliances. The service providers are punctual, skilled, and their pricing is very reasonable. Highly recommend it to all small businesses!",
    rating: 4,
  },
  {
    name: "Anjali Singh",
    title: "Homemaker",
    image:
      "https://media.istockphoto.com/id/1029826628/photo/one-confident-attractive-indian-businesswoman-stock-image.jpg?s=612x612&w=0&k=20&c=KvtD7FrOoIJrMaTafsmYgJxlqNlEJmtbVBwVe_tZVWE=",
    text: "SevaSquad has been a game-changer for me! I needed urgent plumbing repairs, and within minutes of booking, the plumber arrived and fixed everything perfectly. The service is reliable, professional, and so easy to use. I’m relieved to have found such a convenient platform for all my home needs.",
    rating: 4,
  },
  {
    name: "Priya Nair",
    title: "Working Professional",
    image:
      "https://www.shutterstock.com/image-photo/profile-picture-calm-smiling-indian-260nw-1863568432.jpg",
    text: "Balancing work and home can be overwhelming, but SevaSquad’s childcare and cleaning services have made my life so much easier. The service providers are trustworthy and efficient, and I can book them with just a few taps on the app. It’s been a great experience every time!",
    rating: 4,
  },
  {
    name: "Sapan Verma",
    title: "Retired",
    image:
      "https://t4.ftcdn.net/jpg/00/33/37/83/360_F_33378356_gbnqycEE7TWnxa8Og49mkTn6ISTjxjVT.jpg",
    text: "I needed help with some gardening work, and SevaSquad made the process hassle-free. The gardener was knowledgeable, friendly, and did a great job transforming my yard. I appreciate how simple and user-friendly the platform is, especially for someone like me who's not very tech-savvy.",
    rating: 5,
  },
  // Add more review objects here
];

const Review = () => {
  const [currentReview, setCurrentReview] = useState(0);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const review = reviews[currentReview];

  return (
    <div className="review-container">
      <div>
        <h1>Completed with Care</h1>
      </div>
      <div className="review-content">
        <img src={review.image} alt={review.name} className="review-image" />
        <h2 className="review-name">{review.name}</h2>
        <p className="review-title">{review.title}</p>
        <p className="review-text">{review.text}</p>
        <div className="review-rating">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={20}
              className={i < review.rating ? "star filled" : "star"}
            />
          ))}
        </div>
        <div className="review-navigation">
          <button onClick={prevReview} className="nav-button prev">
            <ChevronLeft size={24} />
          </button>
          <button onClick={nextReview} className="nav-button next">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;
