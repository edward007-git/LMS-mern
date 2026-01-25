import { clerkClient } from "@clerk/express";
import Course from "../models/course.js";
import { v2 as cloudinary } from "cloudinary";

// Update user role to educator
export const updateRoletoEducator = async (req, res) => {
  try {
    const userId = req.auth.userId;

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: { role: "educator" },
    });

    res.json({ success: true, message: "you can publish a course now" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Add New Course
export const addCourse = async (req, res) => {
  try {
    const { courseData } = req.body;

    const userId = req.auth?.userId; 
    const imageFile = req.file;      

    if (!imageFile) {
      return res.json({ success: false, message: "Thumbnail image is required" });
    }

    const parsedCourseData = JSON.parse(courseData);

    // for testing without auth
    parsedCourseData.educator = userId || "testnilesh";

    const newCourse = await Course.create(parsedCourseData);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path);

    newCourse.thumbnailUrl = imageUpload.secure_url; // ✅ correct spelling
    await newCourse.save();

    res.json({ success: true, message: "Course added successfully", course: newCourse });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get Educator Courses
export const getEducatorCourses = async (req, res) => {
  try {
    const educator = req.auth?.userId || "testnilesh"; 

    const courses = await Course.find({ educator });

    res.json({ success: true, courses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
