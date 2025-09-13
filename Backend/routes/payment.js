const paymentRouter = require('express').Router();
const Razorpay = require('razorpay');
const User = require('../models/User');
const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
  
  
  // Utility function for expiry calculation
  const calculateExpiryDate = (planType) => {
    const expiry = new Date();
    if (planType === 'monthly') expiry.setMonth(expiry.getMonth() + 1);
    else if (planType === 'yearly') expiry.setFullYear(expiry.getFullYear() + 1);
    return expiry;
  };
  
  // Create Order Endpoint
  paymentRouter.post('/create-order', async (req, res) => {
    try {
      const { amount, currency, planType } = req.body;
      
      const options = {
        amount: amount * 100,
        currency,
        receipt: `receipt_${Date.now()}`,
        payment_capture: 1,
        notes: { planType }
      };
  
      const response = await razorpay.orders.create(options);
      res.json({
        id: response.id,
        currency: response.currency,
        amount: response.amount
      });
    } catch (error) {
      console.error('Razorpay error:', error);
      res.status(500).json({ error: 'Error creating order' });
    }
  });
  
  // Verify Payment Endpoint
  paymentRouter.post('/verify-payment', async (req, res) => {
    try {
      const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
      const secret = process.env.RAZORPAY_KEY_SECRET;
  
      // Signature verification
      const generatedSignature = crypto
        .createHmac('sha256', secret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');
  
      if (generatedSignature !== razorpay_signature) {
        return res.status(400).json({ error: 'Invalid signature' });
      }
  
      // Fetch order details
      const order = await razorpay.orders.fetch(razorpay_order_id);
      
      // Update user subscription
      const user = await User.findOneAndUpdate(
        { email: order.notes.email },
        {
          subscriptionType: order.notes.planType,
          subscriptionExpiry: calculateExpiryDate(order.notes.planType),
          $push: {
            paymentHistory: {
              paymentId: razorpay_payment_id,
              amount: order.amount / 100,
              currency: order.currency,
              createdAt: new Date()
            }
          }
        },
        { new: true, upsert: true }
      );
  
      res.json({
        status: 'success',
        paymentId: razorpay_payment_id,
        user: {
          subscriptionType: user.subscriptionType,
          expiry: user.subscriptionExpiry
        }
      });
    } catch (error) {
      console.error('Verification error:', error);
      res.status(500).json({ error: 'Payment verification failed' });
    }
  });

  export default paymentRouter;