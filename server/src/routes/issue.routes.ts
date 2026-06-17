import express from "express";

import {
    createIssue,
    getProjectIssues
} from "../controllers/issue.controller";

import { authenticate } from "../middleware/auth.middleware";


const router = express.Router();



// create issue

router.post(
    "/",
    authenticate,
    createIssue
);



// get all issues of a project

router.get(
    "/project/:projectId",
    authenticate,
    getProjectIssues
);



export default router;