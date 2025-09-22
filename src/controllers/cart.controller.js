import createError from 'http-errors';
import Cart from '../models/cart.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import { MESSAGES } from '../constants/index.js';

export const createCartItem = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { productId } = req.body;

  // Check if the product is already in the user's cart
  const existingCartItem = await Cart.findOne({
    user: userId,
    product: productId
  });

  if (existingCartItem) {
    // Increment quantity if item already exists
    existingCartItem.quantity += 1;
    await existingCartItem.save();

    res.status(200).json({
      message: MESSAGES.CART_UPDATE_SUCCESS,
      data: {}
    });
  } else {
    // Create new cart item with default quantity of 1
    await Cart.create({
      user: userId,
      product: productId
    });

    res.status(201).json({
      message: MESSAGES.CART_CREATE_SUCCESS,
      data: {}
    });
  }
});

export const getCartItems = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  // Get all cart items for the user with populated product details
  const cartItems = await Cart.find({ user: userId }).populate('product').sort({ createdAt: -1 });

  // Calculate total price for all items
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.product.productPrice * item.quantity;
  }, 0);

  res.status(200).json({
    message: MESSAGES.CART_GET_SUCCESS,
    data: {
      cartItems,
      count: cartItems.length,
      totalPrice
    }
  });
});

export const deleteCartItem = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { productId, multi } = req.query;

  // Find the cart item
  const cartItem = await Cart.findOne({
    product: productId,
    user: userId
  });

  if (!cartItem) {
    throw createError(404, 'Cart item not found');
  }

  // Check if multi is true (remove completely) or false/undefined (decrease quantity)
  if (multi === 'true') {
    // Remove the product completely from cart
    await Cart.deleteOne({
      product: productId,
      user: userId
    });
  } else {
    // Decrease quantity by 1, remove if quantity becomes 0
    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
      await cartItem.save();
    } else {
      await Cart.deleteOne({
        product: productId,
        user: userId
      });
    }
  }

  res.status(200).json({
    message: MESSAGES.CART_DELETE_SUCCESS,
    data: {}
  });
});

export const getCartItemQuantity = asyncHandler(async (req, res) => {
  const { userId, productId } = req.params;

  // Find the cart item
  const cartItem =
    (await Cart.findOne({
      product: productId,
      user: userId
    })) || {};

  res.status(200).json({
    message: 'Cart item quantity retrieved successfully',
    data: {
      productId,
      quantity: cartItem.quantity || 0
    }
  });
});

export const clearCart = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  // Delete all cart items for the user
  const result = await Cart.deleteMany({ user: userId });

  res.status(200).json({
    message: 'Cart cleared successfully',
    data: {
      deletedCount: result.deletedCount
    }
  });
});

export default {
  createCartItem,
  getCartItems,
  deleteCartItem,
  getCartItemQuantity,
  clearCart
};
