import React from "react";
import "./Home.scss";
import Featured from "../../components/featured/Featured";
import Slide from "../../components/slide/Slide";
import { cards } from "../../data";
import CatCard from "../../components/catCard/CatCard";
import { FaHandshakeSimple } from "react-icons/fa6";
import { AiFillThunderbolt } from "react-icons/ai";
import { MdPayment } from "react-icons/md";
import { MdSupport } from "react-icons/md";
import Review from "../../components/reviews/Review";

const Home = () => {
  return (
    <div className="home">
      <Featured />
      <Slide slidesToShow={5} arrowsScroll={5} heading={"Popular Services"}>
        {cards.map((card) => (
          <CatCard key={card.id} item={card} />
        ))}
      </Slide>

      <div className="features">
        <div className="container">
          <div className="heading">
            <h1>
              Trusted local services
              <br />
              just a tap away
            </h1>
          </div>

          <div className="qualities">
            <div className="quality">
              <FaHandshakeSimple />
              <h3>Quality that fits every pocket</h3>
              <p>
                Explore a variety of local services tailored to your budget,
                ensuring exceptional quality is always within reach.
              </p>
            </div>

            <div className="quality">
              <AiFillThunderbolt />
              <h3>Quality work done faster</h3>
              <p>
                Filter services to find local providers quickly, ensuring you
                get quality assistance delivered on time, every time.
              </p>
            </div>

            <div className="quality">
              <MdPayment />
              <h3>Guaranteed safety with each payment.</h3>
              <p>
                Always know what youl'll pay upfront.Ensured safe transactions,
                always.
              </p>
            </div>

            <div className="quality">
              <MdSupport />
              <h3>24/7 Support</h3>
              <p>
                Chat with our team to get your questions answered or resolve any
                issues with your orders.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Review />
      </div>
    </div>
  );
};

export default Home;
