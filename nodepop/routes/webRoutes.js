import express from 'express';

//Models
import { Product } from '../models/Product.js';

//Controllers
import { productController } from '../controllers/productController.js'

export const router = express.Router();

router.get('/', (req, res, next) => {
    // res.status(200).send(`
    //     <h1>Bienvenido a nuestro servidor</h1>
    //     <p>Este servidor esta escrito con node.js</p>
    // `);
    res.render('home.html');
});

router.get('/products', async (req, res, next) => {

    try {
        const products = await Product.find();
        console.table(products)

        res.render('home.html', {
            title: 'LISTA DE PRODUCTOS',
            message: 'Estos son los productos a la venta',
            productos: products,
        });
    } catch(ex) {
        next(ex);
    }
    
});

router.get('/login', loginController.index);
router.post('/login', loginController.postLogin);
router.get('/logout', loginController.logout);