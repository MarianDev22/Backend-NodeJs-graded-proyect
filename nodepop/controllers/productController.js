import { Product } from '../models/Product';

export const productController = {
    add: async(req,res,next) => {
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            tags: req.body.tags,
            owner: req.body.owner
        });
        try {
            const savedProduct = await product.save();
            res.satus(201).json(savedProduct);
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: 'Internal Server Error'
            })
        }
    },
}