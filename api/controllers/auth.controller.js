import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const register = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(201).send(" New user created");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return next(createError(404, "user not found"));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);

    if (!isCorrect)
      return next(createError(400, "Invalid username or password"));

    const token = jwt.sign(
      {
        id: user._id,
        isWorker: user.isWorker,
      },
      process.env.JWT_Key
    );

    const { password, ...info } = user._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(info);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out");
};

// import User from "../models/user.model.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import createError from "../utils/createError.js";
// import "ignore-styles";
// import { toast } from "react-toastify";
// import "react-toastify/ReactToastify.css";

// export const register = async (req, res, next) => {
//   try {
//     const hash = bcrypt.hashSync(req.body.password, 5);
//     const newUser = new User({
//       ...req.body,
//       password: hash,
//     });

//     await newUser.save();
//     toast.success("New user created successfully");
//     res.status(201).send("New user created successfully");
//   } catch (error) {
//     console.error("Registration error:", error.message);
//     toast.error("Failed to register new user. Please try again.");
//     next(createError(500, "Failed to register new user. Please try again."));
//   }
// };

// export const login = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ username: req.body.username });
//     if (!user) {
//       console.error("Login error: User not found");
//       toast.error("User not found");
//       return next(createError(404, "User not found"));
//     }

//     const isCorrect = bcrypt.compareSync(req.body.password, user.password);
//     if (!isCorrect) {
//       console.error("Login error: Invalid credentials");
//       toast.error("Invalid username or password");
//       return next(createError(400, "Invalid username or password"));
//     }

//     const token = jwt.sign(
//       {
//         id: user._id,
//         isWorker: user.isWorker,
//       },
//       process.env.JWT_Key
//     );

//     const { password, ...info } = user._doc;
//     toast.success("Login successful");
//     res
//       .cookie("accessToken", token, {
//         httpOnly: true,
//       })
//       .status(200)
//       .send(info);
//   } catch (error) {
//     console.error("Login error:", error.message);
//     toast.error("Failed to log in. Please try again.");
//     next(createError(500, "Failed to log in. Please try again."));
//   }
// };

// export const logout = async (req, res) => {
//   res
//     .clearCookie("accessToken", {
//       sameSite: "none",
//       secure: true,
//     })
//     .status(200)
//     .send("User has been logged out");
//   toast.info("User has been logged out");
// };
