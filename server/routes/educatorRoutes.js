import express from "express";
import { addCourse, updateRoletoEducator,getEducatorCourses,getEnrolledStudents } from "../controllers/educatorController.js";
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
 educatorRouter.get('/enrolled-students', requireAuth(), protectEducator, 
 getEnrolledStudents);
export default educatorRouter;
