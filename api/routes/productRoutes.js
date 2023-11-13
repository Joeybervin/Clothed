const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authentificationSecurity } = require('../middleware/authentificationSecurity.js');

router.get('/', productController.getAllProducts);
router.get('/catégory/:category', productController.getProductsFilteredByCategory);

router.post('/', authentificationSecurity('admin'), productController.createProduct);

router.put('/:id', authentificationSecurity('admin'), productController.updateProductStock);

router.delete('/:id', authentificationSecurity('admin'), productController.deleteProduct);

module.exports = router;