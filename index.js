import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/db/db.connection.js";
import cors from "cors";
import globalErrorHandler from "./src/middlewares/globalErrorHandler.middleware.js";
import AppRouter from "./src/routers/routers.js";
import path from "path";
import { createServer } from "http";
import { fileURLToPath } from "url";

// Create a new express application instance
const app = express();

// Use the environment variables
dotenv.config();

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure cors
app.use("*", cors());

// Parse the body of the request
app.use(express.json());

// Define the static files (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Define the port to run the server on
const port = process.env.PORT || 5000;

// Create an HTTP server
const httpServer = createServer(app);

// Connect to the database
connectDB();

app.get("/", (req, res) => {
    return res.status(200).json({ message: "running..." });
});

// Run the server
httpServer.listen(port, () => {
    console.log(`Server is running, listening on ${port}`);
});

// Routes
app.use("/api", AppRouter);

// Global Error Handler
app.use(globalErrorHandler);
