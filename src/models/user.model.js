import mongoose from 'mongoose';
import { COLLECTIONS, USER_STATUSES } from '../constants/index.js';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    emailAddress: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      trim: true,
      required: true
    },
    lastName: {
      type: String,
      trim: true,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    isEmailVerified: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: Object.values(USER_STATUSES),
      default: USER_STATUSES.ACTIVE
    }
  },
  {
    timestamps: true,
    collection: COLLECTIONS.USERS
  }
);

// Indexes
userSchema.index({ emailAddress: 1 }, { unique: true });

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         emailAddress:
 *           type: string
 *           format: email
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         isEmailVerified:
 *           type: boolean
 *         status:
 *           type: string
 *           enum: [active, deleted]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

// JSON transformation: hide sensitive/internal fields
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.passwordHash;
    return ret;
  }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
