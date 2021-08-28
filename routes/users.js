import express from "express";
import { createUser, loginUser } from "../controllers/user";

const router = express.Router();

router.post("/createUser", createUser);
router.post("/login", loginUser);

export { router };
