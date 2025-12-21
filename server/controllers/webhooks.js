import { Webhook } from "svix";
import User from "../models/User.js";

const manageClerkUser = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const event = whook.verify(req.body, {
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
            name: `${data.first_name ?? ""} ${data.last_name ?? ""}`,
            email: data.email_addresses[0].email_address,
            imageUrl: data.profile_image_url,
          },
          { upsert: true }
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

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default manageClerkUser;
