const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);
router.get('/catégory/:category', productController.getProductsFilteredByCategory);

router.post('/', productController.createProduct);

router.put('/:id', productController.updateProductStock);

router.delete('/:id', productController.deleteProduct);

module.exports = router;