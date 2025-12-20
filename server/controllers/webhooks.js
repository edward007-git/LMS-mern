import { Webhook } from "svix";
import User from "../models/User.js";

// Clerk Webhook Controller
export const manageClerkUser = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // ✅ Verify webhook
    whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          name: `${data.first_name ?? ""} ${data.last_name ?? ""}`,
          email: data.email_addresses[0].email_address,
          imageUrl: data.profile_image_url,
        };

        await User.create(userData);
        break;
      }

      case "user.updated": {
        const updatedUser = {
          name: `${data.first_name ?? ""} ${data.last_name ?? ""}`,
          email: data.email_addresses[0].email_address,
          imageUrl: data.profile_image_url,
        };

        await User.findByIdAndUpdate(data.id, updatedUser);
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        break;
      }

      default:
        break;
    }

    return res.status(200).json({ success: true });
  } catch (error) {
res.jsosn({ success: false, message: error.message });
 
  
  }
};
