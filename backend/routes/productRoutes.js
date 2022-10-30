import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Product from '../models/productModel.js'
import { deleteProduct, getProductById, getProducts, createProduct, updateProduct } from '../controllers/productController.js'
import { protect, admin} from '../middleware/authMiddleware.js'


router.get('/',getProducts)
router.post('/',protect, admin, createProduct)
router.get('/:id',getProductById)
router.delete('/:id', protect, admin, deleteProduct)
router.put('/id:', protect, admin, updateProduct)


// router.route('/').get(getProducts)
// router.route('/:id').get(getProductById)

export default router
