import Razorpay from "razorpay";

export const razorpayInstance = new Razorpay({
  key_id: process.env.RZP_KEY_ID,
  key_secret: process.env.RZP_KEY_SECRET,
});
