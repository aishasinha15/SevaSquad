// import React from "react";
// import "./MyGigs.scss";
// import { Link } from "react-router-dom";

// const MyGigs = () => {
//   return (
//     <div className="myGigs">
//       <div className="container">
//         <div className="title">
//           <h1>Gigs</h1>
//           <Link to="/add">
//             <button>Add New Gig</button>
//           </Link>
//         </div>

//         <table>
//           <tr>
//             <th>Image</th>
//             <th>Title</th>
//             <th>Price</th>
//             <th>Bookings</th>
//             <th>Action</th>
//           </tr>

//           <tr>
//             <td>
//               <img
//                 className="img"
//                 src="https://img.freepik.com/free-photo/middle-aged-woman-wearing-apron-ruuber-gloves-with-cleaning-supplies-pointing-with-finger-them-smiling-friendly-positive-happy-standing-orange-wall_141793-22774.jpg?ga=GA1.1.993608287.1728901447&semt=ais_hybrid-rr-similar"
//                 alt=""
//               />
//             </td>
//             <td>maria Anders</td>
//             <td>499</td>
//             <td>113</td>
//             <td>
//               <img className="delete" src="/img/delete.png" alt="" />
//             </td>
//           </tr>

//           <tr>
//             <td>
//               <img
//                 className="img"
//                 src="https://img.freepik.com/free-photo/professional-cleaning-service-person-cleaning-office-window_23-2150520597.jpg?ga=GA1.1.993608287.1728901447&semt=ais_hybrid-rr-similar"
//                 alt=""
//               />
//             </td>
//             <td>maria Anders</td>
//             <td>499</td>
//             <td>113</td>
//             <td>
//               <img className="delete" src="/img/delete.png" alt="" />
//             </td>
//           </tr>

//           <tr>
//             <td>
//               <img
//                 className="img"
//                 src="https://img.freepik.com/free-photo/young-man-wearing-orange-t-shirt-rubber-gloves-holding-bucket-with-cleaning-tools-cleaning-spray_141793-23404.jpg?ga=GA1.1.993608287.1728901447&semt=ais_hybrid-rr-similar"
//                 alt=""
//               />
//             </td>
//             <td>maria Anders</td>
//             <td>499</td>
//             <td>113</td>
//             <td>
//               <img className="delete" src="/img/delete.png" alt="" />
//             </td>
//           </tr>

//           <tr>
//             <td>
//               <img
//                 className="img"
//                 src="https://img.freepik.com/free-photo/young-woman-cleaning-house_23-2147916565.jpg?ga=GA1.1.993608287.1728901447&semt=ais_hybrid-rr-similar"
//                 alt=""
//               />
//             </td>
//             <td>maria Anders</td>
//             <td>499</td>
//             <td>113</td>
//             <td>
//               <img className="delete" src="/img/delete.png" alt="" />
//             </td>
//           </tr>

//           <tr>
//             <td>
//               <img
//                 className="img"
//                 src="https://img.freepik.com/free-photo/young-hansdome-man-wearing-apron-rubber-gloves-holding-cleaning-spray-sponge-displeased-with-frowning-face-standing-orange-wall_141793-23303.jpg?ga=GA1.1.993608287.1728901447&semt=ais_hybrid-rr-similar"
//                 alt=""
//               />
//             </td>
//             <td>maria Anders</td>
//             <td>499</td>
//             <td>113</td>
//             <td>
//               <img className="delete" src="/img/delete.png" alt="" />
//             </td>
//           </tr>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default MyGigs;

import React, { useState, useEffect } from "react";
import "./MyGigs.scss";
import { Link } from "react-router-dom";
import newRequest from "../../utils/newRequest";

const MyGigs = ({ userId }) => {
  const [gigs, setGigs] = useState([]);

  // Fetch gigs based on the userId
  useEffect(() => {
    const fetchGigs = async () => {
      if (!userId) {
        console.error("User ID is required to fetch gigs");
        return;
      }

      console.log("Fetching gigs for user:", userId); // Debugging line

      try {
        const response = await newRequest.get(`/gigs`, {
          params: { userId },
        });
        setGigs(response.data);
      } catch (error) {
        console.error("Error fetching gigs:", error);
      }
    };

    fetchGigs();
  }, [userId]);

  // const handleDelete = async (gigId) => {
  //   // Ask for confirmation before deleting
  //   const isConfirmed = window.confirm(
  //     "Are you sure you want to delete this gig?"
  //   );
  //   console.log(gigId);
  //   if (isConfirmed) {
  //     try {
  //       // Make the API call to delete the gig
  //       await newRequest.delete(`/gigs/${gigId}`);

  //       // Remove the deleted gig from the state
  //       setGigs(gigs.filter((gig) => gig.id !== gigId));
  //       alert("Gig has been deleted!");
  //     } catch (error) {
  //       console.error("Error deleting gig:", error);
  //       alert("Failed to delete gig!");
  //     }
  //   }
  // };

  const handleDelete = async (gigId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this gig?"
    );

    console.log(gigId); // Log the ID to ensure it's correct

    if (isConfirmed) {
      try {
        // Make the API call to delete the gig
        await newRequest.delete(`/gigs/${gigId}`);

        // Remove the deleted gig from the state
        setGigs(gigs.filter((gig) => gig._id !== gigId)); // Use _id instead of id
        alert("Gig has been deleted!");
      } catch (error) {
        console.error("Error deleting gig:", error);
        alert("Failed to delete gig!");
      }
    }
  };

  return (
    <div className="myGigs">
      <div className="container">
        <div className="title">
          <h1>Gigs</h1>
          <Link to="/add">
            <button>Add New Gig</button>
          </Link>
        </div>

        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Bookings</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {gigs.map((gig) => (
              <tr key={gig._id}>
                <td>
                  <img className="img" src={gig.cover} alt={gig.title} />
                </td>
                <td>{gig.title}</td>
                <td>{gig.price}</td>
                <td>{gig.sales}</td>
                <td>
                  <img
                    className="delete"
                    src="/img/delete.png"
                    alt="Delete"
                    onClick={() => handleDelete(gig._id)} // Make sure gig._id exists
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyGigs;
