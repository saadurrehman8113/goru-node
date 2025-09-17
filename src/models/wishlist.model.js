import mongoose from 'mongoose';
import { COLLECTIONS } from '../constants/index.js';

const { Schema } = mongoose;

const wishlistSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true,
    collection: COLLECTIONS.WISHLISTS
  }
);

// Indexes
wishlistSchema.index({ user: 1 });
wishlistSchema.index({ user: 1, product: 1 }, { unique: true }); // Prevent duplicate products in same user's wishlist

/**
 * @openapi
 * components:
 *   schemas:
 *     Wishlist:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         user:
 *           type: string
 *           description: Reference to the user who owns this wishlist item
 *         product:
 *           type: string
 *           description: Reference to the product in the wishlist
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

// JSON transformation: hide internal fields
wishlistSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

const Wishlist = mongoose.models.Wishlist || mongoose.model('Wishlist', wishlistSchema);

export default Wishlist;
