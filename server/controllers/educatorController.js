import { clerkClient } from "@clerk/express";
import Course from "../models/course.js";
import User from "../models/User.js";
import Purchase from "../models/purchase.js";
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
      return res.json({
        success: false,
        message: "Thumbnail image is required",
      });
    }

    const parsedCourseData = JSON.parse(courseData);

    parsedCourseData.educator = userId || "testnilesh";

    const newCourse = await Course.create(parsedCourseData);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path);

    newCourse.thumbnailUrl = imageUpload.secure_url;
    await newCourse.save();

    res.json({
      success: true,
      message: "Course added successfully",
      course: newCourse,
    });
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

// ✅ Educator Dashboard Stats
export const educatorDashboardData = async (req, res) => {
  try {
    const educatorId = req.auth?.userId || "testnilesh";

    const courses = await Course.find({ educator: educatorId });
    const totalCourses = courses.length;

    const courseIds = courses.map((course) => course._id);

    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: "completed",
    });

    const totalEarnings = purchases.reduce(
      (acc, purchase) => acc + purchase.amount,
      0
    );

    const enrolledStudentsData = [];

    for (const course of courses) {
      const students = await User.find(
        { _id: { $in: course.studentsEnrolled } },
        "name imageUrl"
      );

      students.forEach((student) => {
        enrolledStudentsData.push({
          courseTitle: course.title,
          student,
        });
      });
    }

    res.json({
      success: true,
      data: {
        totalCourses,
        totalEarnings,
        enrolledStudentsData,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ✅ Get Enrolled Students with Purchase Data
export const getEnrolledStudents = async (req, res) => {
  try {
    const educatorId = req.auth?.userId || "testnilesh";

    const courses = await Course.find({ educator: educatorId });
    const courseIds = courses.map((course) => course._id);

    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: "completed",
    })
      .populate("userId", "name imageUrl")
      .populate("courseId", "title");

    const enrolledStudents = purchases.map((purchase) => ({
      courseTitle: purchase.courseId.title,
      student: purchase.userId,
      purchaseDate: purchase.purchaseDate,
    }));

    res.json({ success: true, enrolledStudents });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
