import User from "../models/user.model.js";
import createError from "../utils/createError.js";

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(createError(404, "User not found"));

    if (req.userId !== user._id.toString()) {
      return next(createError(403, "You can only delete your account!"));
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("Account deleted");
  } catch (err) {
    next(createError(500, "Error deleting user"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(createError(404, "User not found!"));
    }

    // Only send necessary user data
    const { password, ...info } = user._doc;
    res.status(200).send(info);
  } catch (err) {
    next(createError(500, "Error fetching user"));
  }
};

// import User from "../models/user.model.js";
// import createError from "../utils/createError.js";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export const deleteUser = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.params.id);

//     if (req.userId !== user._id.toString()) {
//       toast.error("You can only delete your own account!");
//       return next(createError(403, "You can only delete your account!"));
//     }

//     await User.findByIdAndDelete(req.params.id);
//     toast.success("Account deleted successfully!");
//     res.status(200).send("Account deleted");
//   } catch (error) {
//     console.error("Error deleting user:", error.message);
//     toast.error("Failed to delete account. Please try again.");
//     next(createError(500, "Failed to delete account. Please try again."));
//   }
// };

// export const getUser = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       toast.error("User not found!");
//       return next(createError(404, "User not found"));
//     }

//     toast.success("User details fetched successfully!");
//     res.status(200).send(user);
//   } catch (error) {
//     console.error("Error fetching user:", error.message);
//     toast.error("Failed to fetch user details. Please try again.");
//     next(createError(500, "Failed to fetch user details. Please try again."));
//   }
// };
