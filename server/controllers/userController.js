import User from "../models/User.js";
import Course from "../models/course.js";
import Stripe from "stripe";
import Purchase from "../models/purchase.js";

// Get User Data
export const getUserData = async (req, res) => {
  try {
  const { userId } = req.auth();

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized - userId missing" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


// Users Enrolled Courses with lecture links
export const userEnrolledCourses = async (req, res) => {
  try {
    const { userId } = req.auth();
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized - userId missing" });
    }

    const user = await User.findById(userId).populate("enrolledCourses");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.json({ success: true, enrolledCourses: user.enrolledCourses });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


// Purchase course
export const purchaseCourse = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { courseId } = req.body;

    const origin =
      req.headers.origin ||
      process.env.FRONTEND_URL ||
      "http://localhost:3000";

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!courseId) {
      return res.status(400).json({ success: false, message: "courseId required" });
    }

    const userData = await User.findById(userId);
    const courseData = await Course.findById(courseId);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (!courseData) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    if (userData.enrolledCourses.some(id => id.toString() === courseId)) {
      return res.status(400).json({
        success: false,
        message: "Already enrolled",
      });
    }

    const price = Number(courseData.price);
    const discount = Number(courseData.discount || 0);

    const amount = price - (discount * price) / 100;

    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid course price or discount",
      });
    }

    const newPurchase = await Purchase.create({
      courseId: courseData._id,
      userId,
      amount,
      status: "pending",
    });

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const currency = (process.env.CURRENCY || "inr").toLowerCase();

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/loading/my-enrollments`,
      cancel_url: `${origin}/`,
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency,
            product_data: { name: courseData.title },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      metadata: {
        purchaseId: newPurchase._id.toString(),
      },
    });

    return res.json({ success: true, session_url: session.url });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
