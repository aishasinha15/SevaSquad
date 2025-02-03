// import Review from "../models/review.model.js";
// import createError from "../utils/createError.js";
// import Order from "../models/order.model.js";
// import Gig from "../models/gig.model.js";

// export const createReview = async (req, res, next) => {
//   if (req.isWorker)
//     return next(createError(403, "Professionals can't write a review!"));
//   const newReview = new Review({
//     userId: req.userId,
//     gigId: req.body.gigId,
//     desc: req.body.desc,
//     star: req.body.star,
//   });
//   try {
//     const review = await Review.findOne({
//       userId: req.userId,
//       gigId: req.body.gigId,
//     });

//     if (review)
//       return next(
//         createError(403, "You have alreay created a review for this gig!")
//       );

//     const order = await Order.findOne({
//       clientId: req.userId,
//       gigId: req.body.gigId,
//     });
//     if (!order) {
//       return next(
//         createError(403, "You can only review gigs you have ordered!")
//       );
//     }

//     const savedReview = await newReview.save();
//     await Gig.findByIdAndUpdate(req.body.gigId, {
//       $inc: { totalStars: req.body.star, starNumber: 1 },
//     });
//     res.status(201).send(savedReview);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getReviews = async (req, res, next) => {
//   try {
//     const reviews = await Review.find({ gigId: req.params.gigId });
//     res.status(200).send(reviews);
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteReview = async (req, res, next) => {
//   try {
//   } catch (error) {
//     next(error);
//   }
// };

import Review from "../models/review.model.js";
import createError from "../utils/createError.js";
import Order from "../models/order.model.js";
import Gig from "../models/gig.model.js";

export const createReview = async (req, res, next) => {
  try {
    // Check if user is a worker
    if (req.isWorker) {
      return next(createError(403, "Professionals can't write a review!"));
    }

    // Check if user has already reviewed this gig
    const existingReview = await Review.findOne({
      userId: req.userId,
      gigId: req.body.gigId,
    });

    if (existingReview) {
      return next(
        createError(403, "You have already created a review for this gig!")
      );
    }

    // Check if user has ordered and completed this gig
    const order = await Order.findOne({
      clientId: req.userId,
      gigId: req.body.gigId,
      isCompleted: true, // Make sure the order is completed
    });

    if (!order) {
      return next(
        createError(
          403,
          "You can only review gigs you have ordered and completed!"
        )
      );
    }

    // Create the review
    const newReview = new Review({
      userId: req.userId,
      gigId: req.body.gigId,
      desc: req.body.desc,
      star: req.body.star,
    });

    // Save the review and update gig ratings
    const savedReview = await newReview.save();

    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });

    res.status(201).json({
      success: true,
      review: savedReview,
      message: "Review created successfully",
    });
  } catch (error) {
    console.error("Review creation error:", error);
    next(error);
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ gigId: req.params.gigId }).sort({
      createdAt: -1,
    }); // Show newest reviews first
    res.status(200).send(reviews);
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return next(createError(404, "Review not found!"));
    }

    // Only allow the review creator to delete it
    if (review.userId !== req.userId) {
      return next(createError(403, "You can only delete your own reviews!"));
    }

    await Review.findByIdAndDelete(req.params.id);

    // Update the gig ratings
    await Gig.findByIdAndUpdate(review.gigId, {
      $inc: { totalStars: -review.star, starNumber: -1 },
    });

    res.status(200).send("Review has been deleted!");
  } catch (error) {
    next(error);
  }
};
