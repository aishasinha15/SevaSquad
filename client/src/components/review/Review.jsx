// import React, { useEffect } from "react";
// import "./Review.scss";
// import ReviewSingle from "../reviewSingle/ReviewSingle";
// import newRequest from "../../utils/newRequest.js";
// import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Review = ({ gigId }) => {
//   const queryClient = useQueryClient();

//   const { isLoading, error, data } = useQuery({
//     queryKey: ["reviews", gigId],
//     queryFn: () => newRequest.get(`/reviews/${gigId}`).then((res) => res.data),
//   });

//   const mutation = useMutation({
//     mutationFn: (review) => {
//       return newRequest.post("/reviews", review);
//     },
//     onSuccess: () => {
//       toast.success("Review added successfully!");
//       queryClient.invalidateQueries(["reviews", gigId]);
//     },
//     onError: () => {
//       toast.error("Failed to add review. Please try again.");
//     },
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const desc = e.target[0].value;
//     const star = e.target[1].value;
//     mutation.mutate({ gigId, desc, star });
//     e.target.reset();
//   };

//   // Show toast notification for loading errors
//   useEffect(() => {
//     if (error) {
//       toast.error("Failed to load reviews. Please refresh the page.");
//     }
//   }, [error]);

//   return (
//     <div className="reviews">
//       <ToastContainer />
//       <h2>Reviews</h2>
//       {isLoading
//         ? "Loading..."
//         : error
//         ? null
//         : data &&
//           data.map((review) => (
//             <ReviewSingle key={review._id} review={review} />
//           ))}
//       <div className="add">
//         <h3>Add a review</h3>
//         <form onSubmit={handleSubmit} className="addForm">
//           <div className="cont2">
//             <input type="text" placeholder="Write your opinion..." />

//             <select name="star">
//               <option value="1">1</option>
//               <option value="2">2</option>
//               <option value="3">3</option>
//               <option value="4">4</option>
//               <option value="5">5</option>
//             </select>
//           </div>
//           <button type="submit">Send</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Review;

import React from "react";
import "./Review.scss";
import ReviewSingle from "../reviewSingle/ReviewSingle";
import newRequest from "../../utils/newRequest.js";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Review = ({ gigId }) => {
  const queryClient = useQueryClient();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews", gigId],
    queryFn: () => newRequest.get(`/reviews/${gigId}`).then((res) => res.data),
  });

  // Query to check if user has ordered this gig
  const { data: orderData } = useQuery({
    queryKey: ["userOrder", gigId],
    queryFn: () =>
      newRequest.get("/orders").then((res) => {
        return res.data.some(
          (order) => order.gigId === gigId && order.isCompleted
        );
      }),
    enabled: !!currentUser && !currentUser.isWorker, // Only run for non-worker users
  });

  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post("/reviews", review);
    },
    onSuccess: () => {
      toast.success("Review added successfully!");
      queryClient.invalidateQueries(["reviews", gigId]);
    },
    onError: (error) => {
      toast.error(error.response?.data || "Failed to add review");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = e.target[1].value;

    if (!desc.trim()) {
      toast.error("Please write a review description");
      return;
    }

    mutation.mutate({ gigId, desc, star });
    e.target.reset();
  };

  return (
    <div className="reviews">
      <ToastContainer />
      <h2>Reviews</h2>
      {isLoading ? (
        "Loading reviews..."
      ) : error ? (
        "Error loading reviews"
      ) : (
        <>
          {data?.map((review) => (
            <ReviewSingle key={review._id} review={review} />
          ))}
        </>
      )}

      {currentUser && !currentUser.isWorker && orderData ? (
        <div className="add">
          <h3>Add a review</h3>
          <form onSubmit={handleSubmit} className="addForm">
            <div className="cont2">
              <input type="text" placeholder="Write your opinion..." />
              <select name="star">
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
              </select>
            </div>
            <button type="submit">Send</button>
          </form>
        </div>
      ) : currentUser?.isWorker ? (
        <p className="note">Professionals cannot write reviews</p>
      ) : !currentUser ? (
        <p className="note">Please login to write a review</p>
      ) : !orderData ? (
        <p className="note">You can only review gigs you have ordered</p>
      ) : null}
    </div>
  );
};

export default Review;
