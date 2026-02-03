import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import { clerkMiddleware } from "@clerk/express";

import { manageClerkUser, stripeWebhooks } from "./controllers/webhooks.js";

import educatorRouter from "./routes/educatorRoutes.js";
import courseRouter from "./routes/courseRoute.js";
import userRouter from "./routes/userRoute.js";

const app = express();

await connectDB();
await connectCloudinary();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "https://studyxlms.vercel.app",
    credentials: true,
  })
);

app.use(clerkMiddleware);

/* 🔥 WEBHOOKS — MUST BE BEFORE express.json() */

// Clerk webhook
app.post(
  "/api/webhooks/clerk",
  express.raw({ type: "application/json" }),
  manageClerkUser
);

// Stripe webhook (ONLY ONE)
app.post(
  "/api/webhooks/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhooks
);

/* NORMAL MIDDLEWARE */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ROUTES */
app.use("/api/educator", educatorRouter);
app.use("/api/courses", courseRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Backend is live 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
