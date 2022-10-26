import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Product from '../models/productModel.js'
import { getProductById, getProducts } from '../controllers/productController.js'


router.get('/',getProducts)
router.get('/:id',getProductById)

// router.route('/').get(getProducts)
// router.route('/:id').get(getProductById)

export default router
