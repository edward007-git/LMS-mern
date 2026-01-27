import User from "../models/User.js";
import Course from "../models/course.js";
import Stripe from "stripe";
import Purchase from "../models/Purchase.js";

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
    const { courseId } = req.body;
    const { origin } = req.headers;

    const { userId } = req.auth();
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized - userId missing" });
    }

    const userData = await User.findById(userId);
    const courseData = await Course.findById(courseId);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (!courseData) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    const amount = (
      courseData.coursePrice -
      (courseData.discountPrice * courseData.coursePrice) / 100
    ).toFixed(2);

    const purchaseData = {
      courseId: courseData._id,
      userId,
      amount,
      status: "pending",
    };

    const newPurchase = await Purchase.create(purchaseData);

    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
    const currency = process.env.CURRENCY.toLowerCase();

    const lineItems = [
      {
        price_data: {
          currency,
          product_data: { name: courseData.courseTitle },
          unit_amount: Math.floor(Number(newPurchase.amount) * 100),
        },
        quantity: 1,
      },
    ];

    const session = await stripeInstance.checkout.sessions.create({
      success_url: `${origin}/loading/my-enrollments`,
      cancel_url: `${origin}/`,
      line_items: lineItems,
      mode: "payment",
      metadata: {
        purchaseId: newPurchase._id.toString(),
      },
    });

    return res.json({ success: true, session_url: session.url });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

