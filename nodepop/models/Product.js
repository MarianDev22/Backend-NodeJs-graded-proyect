import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema({
    name: { type: String, unique: true },
    price: { type: Number, min: 1, index: true },
    tags: { type: [String] }, 
    owner: {
        type: Schema.Types.ObjectId, ref: 'User', index: true
    },
});

export const Product = mongoose.model('Product', productSchema );