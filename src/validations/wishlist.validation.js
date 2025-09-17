import Joi from 'joi';

// Validation schema for creating a wishlist item
export const createWishlistItemSchema = Joi.object({
  productId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.pattern.base': 'Product ID must be a valid MongoDB ObjectId',
      'any.required': 'Product ID is required'
    })
});

// Validation schema for user ID parameter
export const userIdParamSchema = Joi.object({
  userId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.pattern.base': 'User ID must be a valid MongoDB ObjectId',
      'any.required': 'User ID is required'
    })
});

// Validation schema for wishlist item ID parameter
export const wishlistItemIdParamSchema = Joi.object({
  userId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.pattern.base': 'User ID must be a valid MongoDB ObjectId',
      'any.required': 'User ID is required'
    }),
  wishlistItemId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.pattern.base': 'Wishlist item ID must be a valid MongoDB ObjectId',
      'any.required': 'Wishlist item ID is required'
    })
});

// Validation middleware factory
export const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(', ');

      return res.status(400).json({
        message: errorMessage,
        data: {}
      });
    }

    // Replace the original data with validated and sanitized data
    req[property] = value;
    next();
  };
};

export default {
  createWishlistItemSchema,
  userIdParamSchema,
  wishlistItemIdParamSchema,
  validate
};
