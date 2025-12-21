import { Webhook } from "svix";
import User from "../models/User.js";

const manageClerkUser = async (req, res) => {
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
await User.findOneAndUpdate(
  { _id: data.id },
  {
    name: `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim(),
    email: data.email_addresses?.[0]?.email_address,
    imageUrl: data.profile_image_url,
  },
  { upsert: true, new: true, setDefaultsOnInsert: true }
);

        break;

      case "user.updated":
        await User.findByIdAndUpdate(data.id, {
          name: `${data.first_name ?? ""} ${data.last_name ?? ""}`,
          email: data.email_addresses[0].email_address,
          imageUrl: data.profile_image_url,
        });
        break;

      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        break;
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Clerk webhook error:", error.message);
    return res.status(400).json({ success: false });
  }
};

export default manageClerkUser;
