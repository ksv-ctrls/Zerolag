import "dotenv/config";
import app from "./app.js";
import { connectToDatabase } from "./config/db.js";

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    console.log("Initializing database connection...");
    await connectToDatabase();
    
    app.listen(PORT, () => {
      console.log(`=============================================`);
      console.log(`🚀 ZeroLag Server is running on port ${PORT}`);
      console.log(`👉 API Endpoint: http://localhost:${PORT}/api/enquiries`);
      console.log(`👉 Health check: http://localhost:${PORT}/health`);
      console.log(`=============================================`);
    });
  } catch (error) {
    console.error("FATAL: Server startup failed due to database connection error:", error);
    process.exit(1);
  }
}

startServer();
