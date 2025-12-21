import { Webhook } from "svix";
import User from "../models/User.js";

const manageClerkUser = async (req, res) => {
  console.log("🔔 Clerk webhook hit"); // 1️⃣ Confirms endpoint is called

  try {
    // 2️⃣ Log headers (important for signature verification)
    console.log("📦 Headers:", {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    // 3️⃣ Log raw body
    console.log("📨 Raw body:", req.body.toString());

    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const event = whook.verify(req.body.toString(), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { type, data } = event;

    // 4️⃣ Log event type & user id
    console.log("✅ Event verified:", type);
    console.log("👤 Clerk user ID:", data.id);

    switch (type) {
      case "user.created":
        console.log("🟢 Creating user in MongoDB");

        await User.findOneAndUpdate(
          { _id: data.id },
          {
            name: `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim(),
            email: data.email_addresses?.[0]?.email_address,
            imageUrl: data.profile_image_url,
          },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        console.log("✅ User created/updated successfully");
        break;

      case "user.updated":
        console.log("🟡 Updating user in MongoDB");

        await User.findByIdAndUpdate(data.id, {
          name: `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim(),
          email: data.email_addresses?.[0]?.email_address,
          imageUrl: data.profile_image_url,
        });

        console.log("✅ User updated successfully");
        break;

      case "user.deleted":
        console.log("🔴 Deleting user from MongoDB");

        await User.findByIdAndDelete(data.id);

        console.log("✅ User deleted successfully");
        break;

      default:
        console.log("⚠️ Unhandled event type:", type);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Clerk webhook error:", error);
    return res.status(400).json({ success: false });
  }
};

export default manageClerkUser;
