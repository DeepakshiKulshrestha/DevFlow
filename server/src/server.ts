import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/database";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import workspaceRoutes from "./routes/workspace.routes";
import projectRoutes from "./routes/project.routes";

dotenv.config();

connectDB();

const app = express();


// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/workspaces",workspaceRoutes);
app.use( "/api/projects", projectRoutes);

// Test Route
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "DevFlow API running 🚀"
    });
});


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});