import session from 'express-session';
import ConnectMongo from 'connect-mongo';

const INACTIVITY_24H = 1000 *60 * 60 *24;

export function guard (req, res, next) {
    const redirect = req.url;
    if (!req.session.userId) {
        return res.redirect(`/login?redir=${redirect}`)
    };
    next();
    
} 

export const sessionMW = session ({
    name: 'nodepop-session',
    secret: 'randomlongsecretext',
    saveUninitialized:true,
    resave: false,
    cookie: {
        maxAge: INACTIVITY_24H
    },
    store: ConnectMongo.create({
    mongoUrl: process.env.MONGO_URI || 'mongodb://localhost:27017',
    })
})

export function sessionStatus (req, res, next) {
    res.locals.session = req.session;
    next();
}