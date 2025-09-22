import { Router } from 'express';
import {
  createProduct,
  getProducts,
  getFeaturedProducts,
  getProductById,
  getProductImage,
  updateProduct,
  deleteProduct,
  upload
} from '../controllers/products.controller.js';

const router = Router();

/**
 * @openapi
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [productName, productDescription, productPrice, productImage]
 *             properties:
 *               productName:
 *                 type: string
 *                 description: Name of the product
 *               productDescription:
 *                 type: string
 *                 description: Description of the product
 *               productPrice:
 *                 type: number
 *                 minimum: 0
 *                 description: Price of the product
 *               isAvailable:
 *                 type: boolean
 *                 default: true
 *                 description: Whether the product is available for purchase
 *               isFeatured:
 *                 type: boolean
 *                 default: false
 *                 description: Whether the product is featured
 *               stripProductId:
 *                 type: string
 *                 description: Stripe product ID for payment integration
 *               productImage:
 *                 type: string
 *                 format: binary
 *                 description: Product image file
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     product:
 *                       $ref: '#/components/schemas/Product'
 *       400:
 *         description: Missing required fields or invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 */
/**
 * @openapi
 * /products:
 *   get:
 *     summary: Get all products
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: isAvailable
 *         schema:
 *           type: boolean
 *         description: Filter products by availability status
 *       - in: query
 *         name: isFeatured
 *         schema:
 *           type: boolean
 *         description: Filter products by featured status
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     products:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           productName:
 *                             type: string
 *                           productDescription:
 *                             type: string
 *                           productPrice:
 *                             type: number
 *                           productPriceCurrency:
 *                             type: string
 *                           isAvailable:
 *                             type: boolean
 *                           isFeatured:
 *                             type: boolean
 *                           stripProductId:
 *                             type: string
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                     count:
 *                       type: number
 *                       description: Total number of products
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 */
router.get('/', getProducts);

/**
 * @openapi
 * /products/featured:
 *   get:
 *     summary: Get all featured products
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: Featured products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     products:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           productName:
 *                             type: string
 *                           productDescription:
 *                             type: string
 *                           productPrice:
 *                             type: number
 *                           productPriceCurrency:
 *                             type: string
 *                           isAvailable:
 *                             type: boolean
 *                           isFeatured:
 *                             type: boolean
 *                           stripProductId:
 *                             type: string
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                     count:
 *                       type: number
 *                       description: Total number of featured products
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 */
router.get('/featured', getFeaturedProducts);

router.post('/', upload.single('productImage'), createProduct);

/**
 * @openapi
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     product:
 *                       $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 */
router.get('/:id', getProductById);

/**
 * @openapi
 * /products/{id}/image:
 *   get:
 *     summary: Get product image by product ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product image retrieved successfully
 *         content:
 *           image/*:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Product image not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 */
router.get('/:productId/image', getProductImage);

/**
 * @openapi
 * /products/{id}:
 *   patch:
 *     summary: Update a product by ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *                 description: Name of the product
 *               productDescription:
 *                 type: string
 *                 description: Description of the product
 *               productPrice:
 *                 type: number
 *                 minimum: 0
 *                 description: Price of the product
 *               isAvailable:
 *                 type: boolean
 *                 description: Whether the product is available for purchase
 *               isFeatured:
 *                 type: boolean
 *                 description: Whether the product is featured
 *               stripProductId:
 *                 type: string
 *                 description: Stripe product ID for payment integration
 *               productImage:
 *                 type: string
 *                 format: binary
 *                 description: Product image file (optional)
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     product:
 *                       $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid data provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 */
router.patch('/:id', upload.single('productImage'), updateProduct);

/**
 * @openapi
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 */
router.delete('/:id', deleteProduct);

export default router;
