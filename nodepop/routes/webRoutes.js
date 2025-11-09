import express from 'express';

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

router.get('/products', guard, productController.getAll);

router.get('/login', loginController.index);
router.post('/login', loginController.login);
router.get('/logout', loginController.logout);

