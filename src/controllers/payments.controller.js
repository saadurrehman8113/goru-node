import createError from 'http-errors';
import Stripe from 'stripe';
import asyncHandler from '../utils/asyncHandler.js';
import { MESSAGES } from '../constants/index.js';
import config from '../configurations/env.js';

// Initialize Stripe with secret key
if (!config.stripe.secretKey) {
  throw new Error('STRIPE_SECRET_KEY environment variable is required');
}
const stripe = new Stripe(config.stripe.secretKey);

const preCheckoutSessionWorking = async ({ userId }) => {
  const cartItems = await Cart.find({ user: userId });

  const mappedCartItems = cartItems.map((item) => ({
    productId: item.product,
    quantity: item.quantity
  }));
};

export const createCheckoutSession = asyncHandler(async (req, res) => {
  const { successUrl, cancelUrl, metadata } = req.body;

  // const response = await preCheckoutSessionWorking({ userId: req.user._id });

  // Validate required fields
  if (!successUrl || !cancelUrl) {
    throw createError(400, 'successUrl and cancelUrl are required');
  }

  // Validate URLs
  const urlPattern = /^https?:\/\/.+/;
  if (!urlPattern.test(successUrl) || !urlPattern.test(cancelUrl)) {
    throw createError(400, 'successUrl and cancelUrl must be valid URLs');
  }

  try {
    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Sample Product',
              description: 'This is a sample product for testing'
            },
            unit_amount: 2000 // $20.00 in cents
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: metadata || {}
    });

    res.status(200).json({
      message: 'Checkout session created successfully',
      data: {
        url: session.url
      }
    });
  } catch (error) {
    console.error('Stripe error:', error);
    throw createError(500, 'Failed to create checkout session');
  }
});

export default {
  createCheckoutSession
};
