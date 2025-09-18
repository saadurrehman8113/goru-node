import createError from 'http-errors';
import Wishlist from '../models/wishlist.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import { MESSAGES } from '../constants/index.js';

export const createWishlistItem = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { productId } = req.body;

  // Check if the product is already in the user's wishlist
  const existingWishlistItem = await Wishlist.findOne({
    user: userId,
    product: productId
  });

  if (existingWishlistItem) {
    throw createError(409, MESSAGES.WISHLIST_ITEM_EXISTS);
  }

  // Create the wishlist item
  await Wishlist.create({
    user: userId,
    product: productId
  });

  res.status(201).json({
    message: MESSAGES.WISHLIST_CREATE_SUCCESS,
    data: {}
  });
});

export const getWishlistItems = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  // Get all wishlist items for the user with populated product details
  const wishlistItems = await Wishlist.find({ user: userId })
    .populate('product')
    .sort({ createdAt: -1 });

  res.status(200).json({
    message: MESSAGES.WISHLIST_GET_SUCCESS,
    data: {
      wishlistItems,
      count: wishlistItems.length
    }
  });
});

export const deleteWishlistItem = asyncHandler(async (req, res) => {
  const { userId, productId } = req.params;

  // Find and delete the wishlist item by product ID
  const { deletedCount } = await Wishlist.deleteOne({
    product: productId,
    user: userId
  });

  if (deletedCount === 0) {
    throw createError(404, 'Wishlist item not found');
  }

  res.status(200).json({
    message: MESSAGES.WISHLIST_DELETE_SUCCESS,
    data: {}
  });
});

export default {
  createWishlistItem,
  getWishlistItems,
  deleteWishlistItem
};
