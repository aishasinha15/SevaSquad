// import Gig from "../models/gig.model.js";
// import createError from "../utils/createError.js";

// export const createGig = async (req, res, next) => {
//   if (!req.isWorker)
//     return next(createError(403, "only professionals can add a gig!"));

//   const newGig = new Gig({
//     ...req.body,
//   });

//   try {
//     const savedGig = await newGig.save();
//     res.status(201).json(savedGig);
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteGig = async (req, res, next) => {
//   try {
//     const gig = await Gig.findById(req.params.id);

//     // Remove userId check since we’re using _id
//     if (!gig) return next(createError(404, "Gig not found!"));

//     await Gig.findByIdAndDelete(req.params.id);
//     res.status(200).send("Gig has been deleted!");
//   } catch (error) {
//     next(error);
//   }
// };

// // export const getGig = async (req, res, next) => {
// //   const { id } = req.params;

// //   try {
// //     // No need for ObjectId conversion if id is just a string
// //     const gig = await Gig.findOne({ userId: id }); // Assuming you're looking for gigs by userId or some other custom field

// //     if (!gig) {
// //       return res.status(404).json({ message: "Gig not found!" });
// //     }
// //     res.status(200).json(gig);
// //   } catch (error) {
// //     console.error("Error fetching gig:", error);
// //     next(error);
// //   }
// // };

// import mongoose from "mongoose";

// export const getGig = async (req, res, next) => {
//   const { id } = req.params;

//   // Check if the id is a valid MongoDB ObjectId
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ message: "Invalid ID format" });
//   }

//   try {
//     const gig = await Gig.findById(id); // Use findById if you're querying by _id (MongoDB default)
//     if (!gig) {
//       return res.status(404).json({ message: "Gig not found!" });
//     }
//     res.status(200).json(gig);
//   } catch (error) {
//     console.error("Error fetching gig:", error);
//     next(error);
//   }
// };

// export const getGigs = async (req, res, next) => {
//   const q = req.query;
//   const filters = {
//     ...(q.cat && { cat: q.cat }),
//     ...((q.min || q.max) && {
//       price: { ...(q.min && { $gt: q.min }), ...(q.max && { $lt: q.max }) },
//     }),
//     ...(q.search && { title: { $regex: q.search, $options: "i" } }),
//   };

//   try {
//     const gigs = await Gig.find(filters).sort({ [q.sort]: -1 });
//     res.status(200).send(gigs);
//   } catch (error) {
//     next(error);
//   }
// };

// import Gig from "../models/gig.model.js";
// import createError from "../utils/createError.js";
// import mongoose from "mongoose";

// // Create a new gig
// export const createGig = async (req, res, next) => {
//   if (!req.isWorker)
//     return next(createError(403, "Only professionals can add a gig!"));

//   const newGig = new Gig({
//     ...req.body,
//   });

//   try {
//     const savedGig = await newGig.save();
//     res.status(201).json(savedGig);
//   } catch (error) {
//     next(error);
//   }
// };

// // Delete a gig
// export const deleteGig = async (req, res, next) => {
//   try {
//     const gig = await Gig.findById(req.params.id);

//     // Check if gig exists
//     if (!gig) return next(createError(404, "Gig not found!"));

//     await Gig.findByIdAndDelete(req.params.id);
//     res.status(200).send("Gig has been deleted!");
//   } catch (error) {
//     next(error);
//   }
// };

// // Get a single gig by _id
// export const getGig = async (req, res, next) => {
//   const { id } = req.params;

//   // Check if the id is a valid MongoDB ObjectId
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ message: "Invalid ID format" });
//   }

//   try {
//     const gig = await Gig.findById(id); // Use findById to fetch gig by _id
//     if (!gig) {
//       return res.status(404).json({ message: "Gig not found!" });
//     }

//     // Send both MongoDB _id and your custom id
//     res.status(200).json({
//       _id: gig._id, // MongoDB _id
//       id: gig.id, // Your custom 'id' field
//       ...gig.toObject(), // The rest of the gig fields
//     });
//   } catch (error) {
//     console.error("Error fetching gig:", error);
//     next(error);
//   }
// };

// // Get all gigs with optional filters
// export const getGigs = async (req, res, next) => {
//   const q = req.query;
//   const filters = {
//     ...(q.cat && { cat: q.cat }),
//     ...((q.min || q.max) && {
//       price: { ...(q.min && { $gt: q.min }), ...(q.max && { $lt: q.max }) },
//     }),
//     ...(q.search && { title: { $regex: q.search, $options: "i" } }),
//   };

//   try {
//     const gigs = await Gig.find(filters).sort({ [q.sort]: -1 });
//     res.status(200).send(gigs);
//   } catch (error) {
//     next(error);
//   }
// };

import Gig from "../models/gig.model.js";
import createError from "../utils/createError.js";
import mongoose from "mongoose";

// Create a new gig
// export const createGig = async (req, res, next) => {
//   if (!req.isWorker)
//     return next(createError(403, "Only professionals can add a gig!"));

//   const newGig = new Gig({
//     ...req.body,
//   });

//   try {
//     const savedGig = await newGig.save();
//     res.status(201).json(savedGig);
//   } catch (error) {
//     next(error);
//   }
// };

// export const createGig = async (req, res, next) => {
//   if (!req.isWorker)
//     return next(createError(403, "Only professionals can add a gig!"));

//   try {
//     console.log("Request body:", req.body);
//     console.log("Request file:", req.file);

//     if (!req.file) {
//       return next(createError(400, "Cover image is required"));
//     }

//     // Parse features if it's a string
//     let parsedFeatures;
//     try {
//       parsedFeatures = JSON.parse(req.body.features);
//     } catch (err) {
//       parsedFeatures = [];
//     }

//     // Create the cover URL path
//     const coverUrl = `/uploads/${req.file.filename}`; // Changed this line

//     const newGig = new Gig({
//       id: req.id,
//       userId: req.userId,
//       title: req.body.title,
//       cat: req.body.cat,
//       cover: req.file ? req.file.path : "",
//       desc: req.body.desc,
//       shortTitle: req.body.shortTitle,
//       shortDesc: req.body.shortDesc,
//       deliveryTime: req.body.deliveryTime,
//       revisionNumber: req.body.revisionNumber,
//       features: parsedFeatures,
//       price: req.body.price,
//     });

//     const savedGig = await newGig.save();
//     res.status(201).json(savedGig);
//   } catch (error) {
//     console.error("Error in createGig:", error);
//     next(error);
//   }
// };

export const createGig = async (req, res, next) => {
  console.log("Received Body:", req.body); // Log request body
  console.log("Received File:", req.file); // Log uploaded file

  if (!req.body.id) {
    return next(createError(400, "Custom id is required"));
  }

  if (!req.isWorker) {
    return next(createError(403, "Only professionals can add a gig!"));
  }

  if (!req.file) {
    return next(createError(400, "Cover image is required"));
  }

  try {
    const newGig = new Gig({
      id: req.body.id, // <-- Check if this is coming
      userId: req.userId, // <-- Should be handled in backend (from auth)
      title: req.body.title,
      cat: req.body.cat,
      cover: `http://localhost:8800/uploads/${req.file.filename}`, // Store full URL
      desc: req.body.desc,
      shortTitle: req.body.shortTitle,
      shortDesc: req.body.shortDesc,
      deliveryTime: req.body.deliveryTime,
      revisionNumber: req.body.revisionNumber,
      features: JSON.parse(req.body.features || "[]"),
      price: req.body.price,
    });

    const savedGig = await newGig.save();
    res.status(201).json(savedGig);
  } catch (error) {
    next(error);
  }
};

// Delete a gig
export const deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);

    // Check if gig exists
    if (!gig) return next(createError(404, "Gig not found!"));

    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).send("Gig has been deleted!");
  } catch (error) {
    next(error);
  }
};

// Get a single gig by _id
export const getGig = async (req, res, next) => {
  const { id } = req.params;

  // Check if the id is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const gig = await Gig.findById(id); // Use findById to fetch gig by _id
    if (!gig) {
      return res.status(404).json({ message: "Gig not found!" });
    }

    // Send both MongoDB _id and your custom id
    res.status(200).json({
      _id: gig._id, // MongoDB _id
      id: gig.id, // Your custom 'id' field
      ...gig.toObject(), // The rest of the gig fields
    });
  } catch (error) {
    console.error("Error fetching gig:", error);
    next(error);
  }
};

// Get all gigs with optional filters
export const getGigs = async (req, res, next) => {
  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: q.cat }), // Filter by category
    ...((q.min || q.max) && {
      price: { ...(q.min && { $gt: q.min }), ...(q.max && { $lt: q.max }) },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };

  try {
    const gigs = await Gig.find(filters)
      .sort({ [q.sort]: q.sort === "createdAt" ? -1 : 1 }) // Sorting by sales, createdAt, or price
      .exec(); // Execute the query
    res.status(200).json(gigs); // Return the filtered and sorted gigs
  } catch (error) {
    next(error);
  }
};
