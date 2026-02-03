import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import { clerkMiddleware } from "@clerk/express";

import educatorRouter from "./routes/educatorRoutes.js";
import courseRouter from "./routes/courseRoute.js";
import userRouter from "./routes/userRoute.js";

import { manageClerkUser, stripeWebhooks } from "./controllers/webhooks.js";

const app = express();

await connectDB();
await connectCloudinary();

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "https://studyxlms.vercel.app/"
    ],
    credentials: true,
  })
);



app.use(clerkMiddleware());

// Clerk webhook (must be before json)
app.post(
  "/api/webhooks/clerk",
  express.raw({ type: "application/json" }),
  manageClerkUser
);

app.post(
  "/api/webhooks/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhooks
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/educator", educatorRouter);
app.use("/api/courses", courseRouter);
app.use("/api/user", userRouter);

app.post('/stripe',express.raw({type:'application/json'}), stripeWebhooks);

app.get("/", (req, res) => {
  res.send("Backend is live 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
