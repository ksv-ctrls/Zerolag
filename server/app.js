import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import enquiryRoutes from "./routes/enquiryRoutes.js";

dotenv.config();

const app = express();

// Configure CORS to receive local client origins
const allowedOrigins = [
  "http://localhost:8080",
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enquiry Routes
app.use("/api/enquiries", enquiryRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy", timestamp: new Date() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Express uncaught error:", err);
  res.status(500).json({ success: false, error: err.message || "Internal server error" });
});

export default app;
