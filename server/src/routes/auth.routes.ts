import express from "express";
import { signup, login } from "../controllers/auth.controller"; // must match named exports

const router = express.Router();

router.post("/signup", signup); // function reference
router.post("/login", login);   // function reference

export default router;