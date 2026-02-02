import express from "express";
import { requireAuth } from "@clerk/express";
import {
  getUserData,
  userEnrolledCourses,
  purchaseCourse
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/data", requireAuth(), getUserData);
userRouter.get("/enrolled-courses", requireAuth(), userEnrolledCourses);

userRouter.post(
  "/purchase-course",
  requireAuth({
    unauthorizedHandler: (req, res) => {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    },
  }),
  purchaseCourse
);

export default userRouter;
