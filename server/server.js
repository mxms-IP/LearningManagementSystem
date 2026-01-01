import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import express from "express";
import cors from "cors";
import connectDB from "./configs/mongodb.js";
import educatorRouter from "./routes/educatorRoutes.js";
import { clerkMiddleware } from "@clerk/express";
import connectCloudinary from "./configs/cloudinary.js";
import courseRouter from "./routes/courseRoute.js";
import userRouter from "./routes/userRoutes.js";
import { clerkWebhooks, stripeWebhooks } from "./controllers/webhooks.js";

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env
dotenv.config({ path: resolve(__dirname, '.env') });

// Initialize Express
const app = express();

// Trust proxy (for Vercel)
app.set('trust proxy', 1);

// CORS - Restrict to your frontend domains only
app.use(cors({
  origin: [
    'https://skill-bridge-lms-frontend.vercel.app',
    'https://skillbridge-lms-henna.vercel.app',
    process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : null
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight
app.options('*', cors());

// Clerk middleware (apply to protected routes only)
app.use(clerkMiddleware());

// Webhook routes - BEFORE express.json() to handle raw body
app.post("/webhooks/clerk", express.raw({ type: 'application/json' }), clerkWebhooks);
app.post("/webhooks/stripe", express.raw({ type: 'application/json' }), stripeWebhooks);

// Body parsers for regular routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.get("/", (req, res) => res.send("API Working"));
app.use("/api/educator", educatorRouter);
app.use("/api/course", courseRouter);
app.use("/api/user", userRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    success: false, 
    message: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

// Connect to databases and start server
const startServer = async () => {
  try {
    await connectDB();
    await connectCloudinary();
    console.log('✅ Databases connected');

    const PORT = process.env.PORT || 5000;
    
    // For Vercel serverless
    if (process.env.VERCEL) {
      console.log('Running on Vercel serverless');
    } else {
      // For local development
      app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
      });
    }
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// Export for Vercel
export default app;