import express from "express";
import {
  bookHostel,
  createHostel,  
  fetchHostel,
  getAllHostels,
} from "../controllers/hostel";

const router = express.Router();

router.post("/createHostel/:user_id", createHostel);
router.get("/fetchHostel/:hostel_id", fetchHostel);
router.post("/book/:hostel_id", bookHostel);
router.get("/getAll", getAllHostels);

export { router };
