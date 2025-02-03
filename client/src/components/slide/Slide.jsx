import React from "react";
import "./Slide.scss";
import Slider from "infinite-react-carousel";

const Slide = ({ heading, children, slidesToShow, arrowsScroll }) => {
  return (
    <div className="slide">
      <h1>{heading}</h1>
      <div className="container">
        <Slider slidesToShow={slidesToShow} arrowsScroll={arrowsScroll}>
          {children}
        </Slider>
      </div>
    </div>
  );
};

export default Slide;
