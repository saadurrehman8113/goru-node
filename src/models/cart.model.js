import mongoose from 'mongoose';
import { COLLECTIONS } from '../constants/index.js';

const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      default: 1
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true,
    collection: COLLECTIONS.CARTS
  }
);

// Indexes
cartSchema.index({ user: 1 });
cartSchema.index({ user: 1, product: 1 }, { unique: true }); // Prevent duplicate products in same user's cart

/**
 * @openapi
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         user:
 *           type: string
 *           description: Reference to the user who owns this cart item
 *         product:
 *           type: string
 *           description: Reference to the product in the cart
 *         quantity:
 *           type: number
 *           minimum: 1
 *           default: 1
 *           description: Quantity of the product in cart
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

// JSON transformation: hide internal fields
cartSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);

export default Cart;
