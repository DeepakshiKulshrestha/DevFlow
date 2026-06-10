import express from "express";
import { authenticate } from "../middleware/auth.middleware";
import {
    createWorkspace,
    getMyWorkspaces
} from "../controllers/workspace.controller";


const router = express.Router();


// Create workspace
router.post(
    "/",
    authenticate,
    createWorkspace
);


// Get logged-in user's workspaces
router.get(
    "/",
    authenticate,
    getMyWorkspaces
);


export default router;
