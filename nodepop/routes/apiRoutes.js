import express from 'express';
import { query, param } from 'express-validator'; 

//Controllers
import { productController } from '../controllers/productController.js';

export const router = express.Router();

//Product
router.get('/products',productController.getAll);
router.post('/products', productController.add);

//User