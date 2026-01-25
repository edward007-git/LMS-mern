import express from "express";
import { addCourse, updateRoletoEducator,getEducatorCourses } from "../controllers/educatorController.js";
import { requireAuth } from "@clerk/express";
import { protectEducator } from "../middlewares/authMiddleware.js";
import upload from "../config/multer.js";

const educatorRouter = express.Router();

educatorRouter.get("/update-role", requireAuth(), updateRoletoEducator);

educatorRouter.post( "/add-course",requireAuth(),protectEducator,
 
  
  upload.single("thumbnail"),
  addCourse
)
educatorRouter.get("/courses",requireAuth(),protectEducator, getEducatorCourses);

export default educatorRouter;
