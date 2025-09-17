import createError from 'http-errors';
import Product from '../models/product.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import { MESSAGES } from '../constants/index.js';
import multer from 'multer';

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Check if file is an image
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

export const createProduct = asyncHandler(async (req, res) => {
  const { productName, productDescription, productPrice, isFeatured, stripProductId } =
    req.body || {};

  if (!productName || !productDescription || !productPrice) {
    throw createError(400, MESSAGES.MISSING_REQUIRED_FIELDS);
  }

  if (!req.file) {
    throw createError(400, 'Product image is required');
  }

  // Validate that productPrice is a valid number
  if (isNaN(productPrice) || productPrice < 0) {
    throw createError(400, 'Product price must be a valid positive number');
  }

  await Product.create({
    productName,
    productDescription,
    productPrice: Number(productPrice),
    stripProductId,
    productImage: {
      data: req.file.buffer,
      contentType: req.file.mimetype
    },
    isFeatured
  });

  res.status(201).json({
    message: MESSAGES.PRODUCT_CREATE_SUCCESS,
    data: {}
  });
});

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isAvailable: true }).sort({ createdAt: -1 });

  res.status(200).json({
    message: MESSAGES.PRODUCTS_GET_SUCCESS,
    data: {
      products,
      count: products.length
    }
  });
});

export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    throw createError(404, 'Product not found');
  }

  res.status(200).json({
    message: 'Product retrieved successfully',
    data: {
      product
    }
  });
});

export const getProductImage = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product || !product.productImage.data) {
    throw createError(404, 'Product image not found');
  }

  res.set('Content-Type', product.productImage.contentType);
  res.send(product.productImage.data);
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { productName, productDescription, productPrice, isFeatured, stripProductId } =
    req.body || {};

  const updateData = {
    productName,
    productDescription,
    productPrice,
    isFeatured,
    stripProductId
  };

  // Handle image update if provided
  if (req.file) {
    updateData.productImage = {
      data: req.file.buffer,
      contentType: req.file.mimetype
    };
  }

  // Update the product
  const { modifiedCount } = await Product.updateOne({ _id: id }, updateData, {
    runValidators: true
  });

  if (modifiedCount === 0) {
    throw createError(404, 'Product not found');
  }

  res.status(200).json({
    message: MESSAGES.PRODUCT_UPDATE_SUCCESS,
    data: {}
  });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Delete the product
  const { modifiedCount } = await Product.updateOne({ _id: id, isAvailable: false });

  if (modifiedCount === 0) {
    throw createError(404, 'Product not found');
  }

  res.status(200).json({
    message: MESSAGES.PRODUCT_DELETE_SUCCESS,
    data: {}
  });
});

export { upload };

export default {
  createProduct,
  getProducts,
  getProductById,
  getProductImage,
  updateProduct,
  deleteProduct
};
