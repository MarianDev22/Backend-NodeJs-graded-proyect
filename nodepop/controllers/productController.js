import { validationResult, matchedData } from 'express-validator';
import { Product } from '../models/Product.js';
import { User } from '../models/User.js';


export const productController ={
    getAll: async (req, res, next) => {

        const result = validationResult(req);
        const data = matchedData(req, {includeOptionals: true});
        const filter = {};
        
        if (!result.isEmpty()) {
           console.log('There are validation errors: ', result.array());
        }

        const userId = req.session.userId;
        filter.owner = userId;

        if (data.name) {
            filter.name = new RegExp(`^${data.name}`, 'i');;
        }
        if (data.minPrice || data.maxPrice) {
            filter.price = {};
            if (data.minPrice) filter.price.$gte = data.minPrice;
            if (data.maxPrice) filter.price.$lte = data.maxPrice;
  }
        if (data.tag) {
            filter.tag = data.tag;
        }
        const sortField = data.sort || 'name'

    try {
        
        const products = await Product.find(filter)
            .skip(data.skip || 0)
            .limit(data.limit || 100)
            .sort({[sortField]: 1})

        console.table(products);
      
        res.render('products.html', {
            title: 'LISTA DE PRODUCTOS',
            message: 'Estos son los productos a la venta',
            userId,
            productos: products,
            currentfilters: data

        });
    } catch(ex) {
       next(ex);
        }
    
},

    delete: async (req, res, next) => {
        
        const result = validationResult(req);
        const data = matchedData(req);

        if (!result.isEmpty()) {
            //return next()
            return res.redirect('/products');
        }
        
    try {
        const userId = req.session.userId;
        const productId = req.params.id;
        const deleteResult = await Product.deleteOne({
            _id: productId,
            owner: userId
        });

        if (deleteResult.deletedCount === 0) {
            console.error(`Failed attempt to delete: product with id ${productId} not found`);
            return res.redirect('/products');            
        }
    }catch (err){
        next(err);
    }        

    },

    add: async (req, res, next) => {
        const result = validationResult(req);
        const formData = matchedData(req, { includeOptionals: true });
        res.render('addProduct.html', {
        title: 'Añadir Nuevo Producto',
        errors: [], 
        formData: {} 
    });
},

    create: async (req, res, next) => {

        const productData = matchedData(req);
        productData.owner = req.session.userId;

        const newProduct = new Product(productData);

        try{
            const savedProduct = await newProduct.save();
            console.log(newProduct);
            res.redirect('/products');
        } catch (err) {
        next(err);
    }
}
}