import express from "express";
import upload from "../uploads.js";
import {
  createGig,
  deleteGig,
  getGig,
  getGigs,
} from "../controllers/gig.controller.js";
import { verifyToken } from "../middleware/jwt.js";
const router = express.Router();

// router.post("/", verifyToken, upload.single("file"), createGig);
router.post("/", verifyToken, upload.single("cover"), createGig);
router.delete("/:id", verifyToken, deleteGig);
router.get("/single/:id", getGig);
router.get("/", getGigs);

export default router;
