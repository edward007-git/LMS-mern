import { Webhook } from "svix";
import Stripe from "stripe";
import User from "../models/User.js";
import Purchase from "../models/purchase.js";
import Course from "../models/course.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
/* ======================
   CLERK WEBHOOK
====================== */
export const manageClerkUser = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const event = whook.verify(req.body.toString(), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { type, data } = event;

    switch (type) {
      case "user.created":
      case "user.updated":
        await User.findOneAndUpdate(
          { _id: data.id },
          {
            name: `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim(),
            email: data.email_addresses?.[0]?.email_address,
            imageUrl: data.profile_image_url,
          },
          { upsert: true, new: true }
        );
        break;

      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        break;

      default:
        console.log("Unhandled Clerk event:", type);
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Clerk webhook error:", error.message);
    res.status(400).json({ success: false });
  }
};

/* ======================
   STRIPE WEBHOOK
====================== */
export const stripeWebhooks = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Stripe webhook error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const purchaseId = session.metadata.purchaseId;

      const purchaseData = await Purchase.findById(purchaseId);
      if (!purchaseData) break;

      const userData = await User.findById(purchaseData.userId);
      const courseData = await Course.findById(purchaseData.courseId);

      if (!courseData.enrolledStudents.includes(userData._id)) {
        courseData.enrolledStudents.push(userData._id);
        await courseData.save();
      }

      if (!userData.enrolledCourses.includes(courseData._id)) {
        userData.enrolledCourses.push(courseData._id);
        await userData.save();
      }

      purchaseData.status = "completed";
      await purchaseData.save();

      console.log(" Payment completed:", purchaseId);
      break;
    }

    default:
      console.log("Unhandled Stripe event:", event.type);
  }

  res.json({ received: true });
};
