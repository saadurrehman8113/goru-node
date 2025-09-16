import mongoose from 'mongoose';
import { COLLECTIONS } from '../constants/index.js';

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true
    },
    productDescription: {
      type: String,
      required: true,
      trim: true
    },
    productPrice: {
      type: Number,
      required: true,
      min: 0
    },
    productPriceCurrency: {
      type: String,
      required: false,
      default: 'USD'
    },
    productImage: {
      data: {
        type: Buffer,
        required: true
      },
      contentType: {
        type: String,
        required: true
      }
    },
    isAvailable: {
      type: Boolean,
      default: true,
      required: true
    },
    isFeatured: {
      type: Boolean,
      default: false,
      required: true
    },
    isTrending: {
      type: Boolean,
      default: false,
      required: true
    },
    stripProductId: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true,
    collection: COLLECTIONS.PRODUCTS
  }
);

// Indexes
productSchema.index({ productName: 1 });

// Virtual for base64 image data
productSchema.virtual('productImage.base64Data').get(function () {
  if (this.productImage && this.productImage.data) {
    return this.productImage.data.toString('base64');
  }
  return null;
});

/**
 * @openapi
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         productName:
 *           type: string
 *         productDescription:
 *           type: string
 *         productPrice:
 *           type: number
 *           minimum: 0
 *         productImage:
 *           type: object
 *           properties:
 *             data:
 *               type: string
 *               format: binary
 *               description: Binary image data
 *             contentType:
 *               type: string
 *               description: MIME type of the image
 *         isAvailable:
 *           type: boolean
 *           default: true
 *           description: Whether the product is available for purchase
 *         isFeatured:
 *           type: boolean
 *           default: false
 *           description: Whether the product is featured
 *         isTrending:
 *           type: boolean
 *           default: false
 *           description: Whether the product is currently trending
 *         stripProductId:
 *           type: string
 *           description: Stripe product ID for payment integration
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

// JSON transformation: hide internal fields and convert image data to base64
productSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;

    // Replace buffer data with base64 string
    if (ret.productImage && ret.productImage.data) {
      try {
        // Use the virtual field if available, otherwise convert directly
        if (ret.productImage.base64Data) {
          ret.productImage.data = ret.productImage.base64Data;
        } else {
          const buffer = Buffer.isBuffer(ret.productImage.data)
            ? ret.productImage.data
            : Buffer.from(ret.productImage.data);
          ret.productImage.data = buffer.toString('base64');
        }
      } catch (error) {
        console.error('Error converting image to base64:', error);
        // If conversion fails, remove the data field
        delete ret.productImage.data;
      }
    }

    return ret;
  }
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
