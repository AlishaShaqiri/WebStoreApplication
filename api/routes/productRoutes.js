const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/', productController.addProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.get('/', productController.getAllProducts);
router.get('/search', productController.searchProducts);
router.get('/filters', productController.getFilters);

router.get('/:id', productController.getProductById);
router.get('/:id/quantity', productController.getProductQuantity);

module.exports = router;
