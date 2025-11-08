import { contextsKey } from 'express-validator/lib/base.js';
import { Product } from '../models/Product.js';

export const productController ={
    add: async (req, res, next) => {
        const userData = req.body;

        const product = new Product({
            name: req.body.name
        });

        const savedProduct = await product.save();
        console.log(product);

        res.status(201).json(product);
    }
}