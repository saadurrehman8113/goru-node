import Joi from 'joi';

// Validation schema for creating a cart item
export const createCartItemSchema = Joi.object({
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

// Validation middleware factory
export const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(', ');
      const validationError = new Error(errorMessage);
      validationError.status = 400;
      return next(validationError);
    }

    // Replace the original data with validated and sanitized data
    req[property] = value;
    next();
  };
};

export default {
  createCartItemSchema,
  userIdParamSchema,
  validate
};
