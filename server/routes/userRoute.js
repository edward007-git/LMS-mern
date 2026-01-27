import express from "express";
import { requireAuth } from "@clerk/express";
import { getUserData, userEnrolledCourses, purchaseCourse } from "../controllers/userController.js";

const userRouter = express.Router();
console.log("✅ userRoute loaded");


userRouter.get("/data", requireAuth(), getUserData);
userRouter.get("/enrolled-courses", requireAuth(), userEnrolledCourses);
userRouter.post("/purchase-course", requireAuth(), purchaseCourse);

export default userRouter;
