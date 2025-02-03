import createError from "../utils/createError.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return next(createError(401, "You are not authenticated!"));
  jwt.verify(token, process.env.JWT_Key, async (err, payload) => {
    if (err) return next(createError(403, "Token is not valid"));
    req.userId = payload.id;
    req.isWorker = payload.isWorker;
    next();
  });
};

// import createError from "../utils/createError.js";
// import jwt from "jsonwebtoken";
// import { toast } from "react-toastify";
// import "react-toastify/ReactToastify.css";

// export const verifyToken = (req, res, next) => {
//   const token = req.cookies.accessToken;

//   if (!token) {
//     toast.error("You are not authenticated!"); // This won't work here but can be used on the frontend
//     return next(createError(401, "You are not authenticated!"));
//   }

//   jwt.verify(token, process.env.JWT_Key, async (err, payload) => {
//     if (err) {
//       toast.error("Token is not valid"); // This won't work here but can be used on the frontend
//       return next(createError(403, "Token is not valid"));
//     }

//     req.userId = payload.id;
//     req.isWorker = payload.isWorker;

//     // Optionally, you can log success on the server, but the toast should be shown on the client side
//     next();
//   });
// };
