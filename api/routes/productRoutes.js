const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               category_id:
 *                 type: integer
 *               brand_id:
 *                 type: integer
 *               size_id:
 *                 type: integer
 *               color_id:
 *                 type: integer
 *               person:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 price:
 *                   type: number
 *                 description:
 *                   type: string
 *                 category_id:
 *                   type: integer
 *                 brand_id:
 *                   type: integer
 *                 size_id:
 *                   type: integer
 *                 color_id:
 *                   type: integer
 *                 person:
 *                   type: string
 *                 quantity:
 *                   type: integer
 *                 image:
 *                   type: string
 *       400:
 *         description: Bad request (missing required fields)
 *       500:
 *         description: Internal server error
 */
router.post('/', productController.addProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update an existing product by ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Product ID to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 price:
 *                   type: number
 *                 description:
 *                   type: string
 *                 quantity:
 *                   type: integer
 *                 image:
 *                   type: string
 *       404:
 *         description: Product not found
 *       400:
 *         description: Bad request (missing required fields)
 *       500:
 *         description: Internal server error
 */
router.put('/:id', productController.updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Product ID to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', productController.deleteProduct);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get a list of all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   description:
 *                     type: string
 *                   quantity:
 *                     type: integer
 *                   image:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
router.get('/', productController.getAllProducts);

/**
 * @swagger
 * /api/products/search:
 *   get:
 *     summary: Search for products based on query parameters
 *     tags: [Products]
 *     parameters:
 *       - name: category
 *         in: query
 *         description: Filter by category
 *         required: false
 *         schema:
 *           type: integer
 *       - name: gender
 *         in: query
 *         description: Filter by gender
 *         required: false
 *         schema:
 *           type: string
 *       - name: brand
 *         in: query
 *         description: Filter by brand
 *         required: false
 *         schema:
 *           type: integer
 *       - name: price_min
 *         in: query
 *         description: Filter by minimum price
 *         required: false
 *         schema:
 *           type: number
 *       - name: price_max
 *         in: query
 *         description: Filter by maximum price
 *         required: false
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: A list of filtered products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   description:
 *                     type: string
 *                   quantity:
 *                     type: integer
 *                   image:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
router.get('/search', productController.searchProducts);

/**
 * @swagger
 * /api/products/filters:
 *   get:
 *     summary: Get available filters for products (categories, genders, brands, etc.)
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of available filters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                 genders:
 *                   type: array
 *                   items:
 *                     type: string
 *                 brands:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                 colors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                 sizes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       size:
 *                         type: string
 *       500:
 *         description: Internal server error
 */
router.get('/filters', productController.getFilters);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a specific product by ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 price:
 *                   type: number
 *                 description:
 *                   type: string
 *                 quantity:
 *                   type: integer
 *                 image:
 *                   type: string
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', productController.getProductById);

/**
 * @swagger
 * /api/products/{id}/quantity:
 *   get:
 *     summary: Get the quantity of a product by ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product to get the quantity of
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The current quantity of the product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product_id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 initial_quantity:
 *                   type: integer
 *                 sold_quantity:
 *                   type: integer
 *                 current_quantity:
 *                   type: integer
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id/quantity', productController.getProductQuantity);

module.exports = router;
