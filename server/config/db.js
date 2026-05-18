import mongoose from "mongoose";

let cachedConnection = null;
let cachedPromise = null;

export async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not defined in environment variables.");
    throw new Error("MONGODB_URI is missing from environment variables.");
  }

  if (cachedConnection && mongoose.connection.readyState === 1) {
    console.log("Using cached MongoDB connection");
    return cachedConnection;
  }

  if (cachedPromise) {
    console.log("Waiting for existing MongoDB connection promise to resolve");
    try {
      cachedConnection = await cachedPromise;
      return cachedConnection;
    } catch (err) {
      console.error("Existing MongoDB connection promise failed, retrying...", err);
      cachedPromise = null;
    }
  }

  console.log("Establishing new MongoDB connection...");
  
  const options = {
    serverSelectionTimeoutMS: 8000,
    socketTimeoutMS: 45000,
    maxPoolSize: 10,
    dbName: "zerolag",
  };

  cachedPromise = (async () => {
    let retries = 3;
    while (retries > 0) {
      try {
        console.log(`Connection attempt started. Retries left: ${retries}`);
        const conn = await mongoose.connect(uri, options);
        console.log("MongoDB connected successfully to host:", conn.connection.host);
        return conn;
      } catch (error) {
        retries -= 1;
        console.error(`MongoDB connection attempt failed. Error: ${error.message}`);
        if (retries === 0) {
          cachedPromise = null;
          throw error;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  })();

  try {
    cachedConnection = await cachedPromise;
    return cachedConnection;
  } catch (err) {
    cachedPromise = null;
    throw err;
  }
}
