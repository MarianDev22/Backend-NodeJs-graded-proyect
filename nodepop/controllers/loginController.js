import { User } from '../models/User.js';
import { compare } from 'bcrypt';

export const loginController = {
    index: (req,res,next) => {
        res.render('login.html');

    },

    login: (req, res, next) =>{
        console.log(req.body);
        res.redir();
    },

    logout: (req, res, next) =>{
        res.end();
    }

}
