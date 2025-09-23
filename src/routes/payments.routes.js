import { Router } from 'express';
import { createCheckoutSession } from '../controllers/payments.controller.js';
import { authenticateToken } from '../middlewares/auth.js';

const router = Router();

/**
 * @swagger
 * /payments/create-checkout-session:
 *   post:
 *     summary: Create a Stripe checkout session
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - successUrl
 *               - cancelUrl
 *             properties:
 *               successUrl:
 *                 type: string
 *                 format: uri
 *                 description: URL to redirect to on successful payment
 *                 example: "https://yourapp.com/checkout/success"
 *               cancelUrl:
 *                 type: string
 *                 format: uri
 *                 description: URL to redirect to on cancelled payment
 *                 example: "https://yourapp.com/checkout/cancel"
 *               metadata:
 *                 type: object
 *                 description: Optional metadata to attach to the session
 *                 example: { "orderId": "12345", "userId": "user123" }
 *     responses:
 *       200:
 *         description: Checkout session created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Checkout session created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                       format: uri
 *                       example: "https://checkout.stripe.com/c/session_..."
 *       400:
 *         description: Bad request - missing required fields or invalid URLs
 *       401:
 *         description: Unauthorized - invalid or missing token
 *       500:
 *         description: Internal server error
 */
router.post('/create-checkout-session', authenticateToken, createCheckoutSession);

export default router;
