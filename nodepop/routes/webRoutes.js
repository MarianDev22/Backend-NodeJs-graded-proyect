import express from 'express';
import { query, param } from 'express-validator';

//Models
import { Product } from '../models/Product.js';

//Controllers
import { productController } from '../controllers/productController.js';
import { loginController } from '../controllers/loginController.js';

//MW
import { guard } from '../lib/middlewares/authMiddleware.js';


export const router = express.Router();

router.get('/', guard, (req, res, next) => {
    // res.status(200).send(`
    //     <h1>Bienvenido a nuestro servidor</h1>
    //     <p>Este servidor esta escrito con node.js</p>
    // `);
    res.render('home.html');
});

router.get('/products', 
        query('skip', 'Must be a valid positive number')
        .optional()
        .isInt({
            min: 1,
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
    query('name', 'Must be a valid tag')
        .optional()
        .isIn(['work', 'lifestyle', 'motor', 'mobile']),
        guard, productController.getAll);

router.get('/addProduct',productController.add);

//Login
router.get('/login', loginController.index);
router.post('/login', loginController.login);
router.get('/logout', loginController.logout);

