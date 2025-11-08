import { User } from '../models/User.js';
import { compare } from 'bcrypt';

export const loginController = {
    index: (req,res,next) => {
        res.end();

    },

    login: (req, res, next) =>{
        res.end();
    },

    logout: (req, res, next) =>{
        res.end();
    }

}
