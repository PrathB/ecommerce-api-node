const Razorpay = require("razorpay");

apiKey = process.env.RAZORPAY_API_KEY;
apiSecret = process.env.RAZORPAY_SECRET_KEY;

export const razorpay = new Razorpay({
  key_id: apiKey,
  key_secret: apiSecret,
});
