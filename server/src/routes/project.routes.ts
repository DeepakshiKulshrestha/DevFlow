import express from "express";
import { authenticate } from "../middleware/auth.middleware";

import {
    createProject,
    getWorkspaceProjects
} from "../controllers/project.controller";


const router = express.Router();



router.post(
    "/",
    authenticate,
    createProject
);



router.get(
    "/workspace/:workspaceId",
    authenticate,
    getWorkspaceProjects
);



export default router;