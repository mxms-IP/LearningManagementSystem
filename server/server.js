import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env file explicitly
dotenv.config({ path: resolve(__dirname, '.env') });

// Debug - Check if env vars loaded
console.log('🔍 Environment Check:');
console.log('  PORT:', process.env.PORT);
console.log('  MONGODB_URI:', process.env.MONGODB_URI);
console.log('  NODE_ENV:', process.env.NODE_ENV);
console.log('---');

import express from "express";
import cors from "cors";
import connectDB from "./configs/mongodb.js";
//import { clerkWebhooks, stripeWebhooks } from "./controllers/webhooks.js";
import educatorRouter from "./routes/educatorRoutes.js";
import { clerkMiddleware } from "@clerk/express";
import connectCloudinary from "./configs/cloudinary.js";
import courseRouter from "./routes/courseRoute.js";
import userRouter from "./routes/userRoutes.js";


// Initialize Express
const app = express();

// Connect to the MongoDB database
await connectDB();
// Connect to Cloudinary
await connectCloudinary();

// Middlewares
app.use(cors());
app.use(clerkMiddleware());

// Routes
app.get("/", (req, res) => res.send("API Working"));
//app.post("/clerk", express.json(), clerkWebhooks);
app.use("/api/educator", express.json(), educatorRouter);
app.use("/api/course", express.json(), courseRouter);
app.use("/api/user", express.json(), userRouter);
//app.post("/stripe", express.raw({ type: "application/json" }), stripeWebhooks);

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
