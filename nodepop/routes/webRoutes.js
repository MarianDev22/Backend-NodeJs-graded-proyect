import express from 'express';
import { query, param, body } from 'express-validator';

//Models
import { Product } from '../models/Product.js';

//Controllers
import { productController } from '../controllers/productController.js';
import { loginController } from '../controllers/loginController.js';

//MW
import { guard } from '../lib/middlewares/authMiddleware.js';


export const router = express.Router();

router.get('/', guard, (req, res, next) => {

    res.render('home.html');
});

router.get('/products', 
        query('skip', 'Must be a valid positive number')
        .optional()
        .isInt({
            min: 0,
        })
        .toInt(),
    query('limit', 'Must be a valid positive number')
        .optional()
        .isInt({
            min: 1
        })
        .toInt(),
    query('minPrice', 'Must be a valid positive number')
        .optional()
        .isInt({ min: 1 })
        .toInt(),
    query('maxPrice', 'Must be a valid positive number')
        .optional()
        .isInt({ min: 1 })
        .toInt(),
    query('name', 'Must be a valid name')
        .optional()
        .isString(),
    query('tag', 'Must be a valid tag')
        .optional()
        .isIn(['work', 'lifestyle', 'motor', 'mobile']),
    query('sort', 'Must be a valid field')
        .optional()
        .isIn(['name','price']),
        guard, productController.getAll);

router.post('/products/:id/delete',
    param('id')
    .notEmpty()
    .isMongoId(),
    guard, productController.delete);

router.get('/addProduct', guard, productController.add);
router.post('/addProduct',
    body ('name', 'Must be a valid name')
        .notEmpty()
        .isString(),
    body ('tag', 'Must be a valid tag')
        .optional()
        .isIn(['work', 'lifestyle', 'motor', 'mobile']),
    body ('Price', 'Must be a valid positive number')
        .notEmpty()
        .isInt({ min: 1 })
        .toInt(),
    guard, productController.create);


//Login
router.get('/login', loginController.index);
router.post('/login', loginController.login);
router.get('/logout', loginController.logout);

