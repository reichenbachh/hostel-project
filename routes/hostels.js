import express from "express";
import {
  createHostel,
  fetchHostel,
  getAllHostels,
} from "../controllers/hostel";

const router = express.Router();

router.post("/createHostel/:user_id", createHostel);
router.get("/fetchHostel/:hostel_id", fetchHostel);
router.get("/getAll", getAllHostels);

export { router };
