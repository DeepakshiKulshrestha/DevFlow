import express from "express";
import { authenticate } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/me", authenticate, (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    });
});

export default router;