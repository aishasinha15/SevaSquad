// import multer from "multer";
// import path from "path";
// import createError from "./utils/createError.js";
// import fs from "fs";

// // Create uploads directory if it doesn't exist
// const uploadsDir = "uploads";
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir);
// }

// // Setting up the storage configuration for multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // Specify the folder where the files will be saved
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     // Setting a unique filename using the current timestamp and file extension
//     // cb(null, Date.now() + path.extname(file.originalname));
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(
//       null,
//       file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
//     );
//   },
// });

// // File filter to accept specific file types (optional)
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ["image/jpeg", "image/png", "image/gif"]; // Example for images
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true); // Accept the file
//   } else {
//     cb(new Error("Invalid file type!"), false); // Reject the file
//   }
// };

// // Initializing multer with the storage configuration and file filter
// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 }, // Example: limit file size to 10 MB
// });

// export default upload;

// // // Export a wrapped version with error handling
// // export default function uploadMiddleware(req, res, next) {
// //   upload(req, res, function (err) {
// //     if (err instanceof multer.MulterError) {
// //       // A Multer error occurred when uploading
// //       return next(createError(400, err.message));
// //     } else if (err) {
// //       // An unknown error occurred
// //       return next(createError(500, err.message));
// //     }
// //     // Everything went fine
// //     next();
// //   });
// // }

import multer from "multer";
import path from "path";
import createError from "./utils/createError.js";
import fs from "fs";

// Create uploads directory if it doesn't exist
const uploadsDir = "uploads";
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Setting up the storage configuration for multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(
//       null,
//       file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
//     );
//   },
// });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //console.log("Saving to:", path.join(__dirname, "uploads")); // Add this
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename =
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname);
    console.log("Generated filename:", filename); // Add this
    cb(null, filename);
  },
});

// File filter to accept specific file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type! Only JPEG, PNG and GIF are allowed."),
      false
    );
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

export default upload;
