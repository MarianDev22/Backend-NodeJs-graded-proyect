import { User } from '../models/User.js';


export const loginController = {
    index: (req,res,next) => {
        res.locals.email = '';
        res.locals.errors = '';
        res.render('login.html');

    },

    login: async (req, res, next) =>{

        try{
            const user = await User.findOne({
                email: req.body.email
            }).select('+password');
            console.log(user);

           
            if (!user||!(await user.comparePassword(req.body.password))) {
                res.locals.email = req.body.email;
                res.locals.errors = 'Las credenciales son inválidas';
                return !res.render('login.html')
            }
            
            req.session.userId = user.id;

            res.redirect(req.query.redir || '/');

        } catch(err) {
            next(err);
        }

        
    },

    logout: (req, res, next) =>{
        req.session.regenerate((err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        });
        
    }

}
