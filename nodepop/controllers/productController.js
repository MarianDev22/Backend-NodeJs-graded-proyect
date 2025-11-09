import { Product } from '../models/Product.js';
import { User } from '../models/User.js';

export const productController ={
    getAll: async (req, res, next) => {

    try {
        const userId = req.session.userId
        const products = await Product.find({
            owner: userId
        });
        console.table(products);
      
        res.render('products.html', {
            title: 'LISTA DE PRODUCTOS',
            message: 'Estos son los productos a la venta',
            userId,
            productos: products,

        });
    } catch(ex) {
       res.status(500).json({
                message: 'Internal Server Error'
            })
        }
    
},
    // getAll: async (req, res, next) =>{
    //     const userId = req.session.userId
    //     try{
    //         const products = await Product.find().populate('owner');
    //         res.status(200).json(products);
    //     } catch(err) {
    //         res.status(500).json({
    //             message: 'Internal Server Error'
    //         })
    //     }
    // },

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