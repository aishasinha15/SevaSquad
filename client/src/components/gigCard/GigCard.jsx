// import React from "react";
// import "./GigCard.scss";
// import { Link } from "react-router-dom";

// const GigCard = ({ item }) => {
//   console.log("GigCard item:", item);
//   const averageStars =
//     item.starNumber > 0 ? Math.round(item.totalStars / item.starNumber) : 0;

//   return (
//     <Link
//       to={`/gigs/single/${item._id}`}
//       className="link"
//       onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//     >
//       <div className="gigCard">
//         <img src={item.cover} alt={item.title} />
//         <div className="info">
//           <div className="user">
//             <img src="/img/noavatar.jpg" alt="User" />
//             <span className="name">{item.shortTitle}</span>
//           </div>
//           <p>{item.desc}</p>
//           <div className="star">
//             <img src="/img/star.png" alt="Rating Star" />
//             <span>{averageStars > 0 ? averageStars : "No Ratings Yet"}</span>
//           </div>
//         </div>
//         <hr />
//         <div className="detail">
//           <img src="/img/heart.png" alt="Heart" />
//           <div className="price">
//             <span>STARTING AT</span>
//             <h2>₹ {item.price}</h2>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default GigCard;

import React from "react";
import "./GigCard.scss";

const GigCard = ({ item }) => {
  const averageStars =
    item.starNumber > 0 ? Math.round(item.totalStars / item.starNumber) : 0;

  return (
    <div className="gigCard">
      <img src={item.cover} alt={item.title} />
      <div className="info">
        <div className="user">
          <img src="/img/noavatar.jpg" alt="User" />
          <span className="name">{item.shortTitle}</span>
        </div>
        <p>{item.desc}</p>
        <div className="star">
          <img src="/img/star.png" alt="Rating Star" />
          <span>{averageStars > 0 ? averageStars : "No Ratings Yet"}</span>
        </div>
      </div>
      <hr />
      <div className="detail">
        <img src="/img/heart.png" alt="Heart" />
        <div className="price">
          <span>STARTING AT</span>
          <h2>₹ {item.price}</h2>
        </div>
      </div>
    </div>
  );
};

export default GigCard;
