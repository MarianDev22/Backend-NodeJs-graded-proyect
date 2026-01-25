import express from 'express';
import { renderFile } from 'ejs';


// Database
import { connectMongoose } from './lib/connectMongoose.js';

// Middlewares
import { serverErrorHandler, notFoundErrorHandler } from './lib/middlewares/errorMiddleware.js'


// Routes
import { router as webRouter } from './routes/webRoutes.js';
import { router as apiRouter } from './routes/apiRoutes.js';
import { sessionMW, sessionStatus } from './lib/middlewares/authMiddleware.js';

// -- END OF IMPORTS --

const app = express();

app.use(express.static('public'));

// template-engine
app.set('view engine', 'ejs');
app.engine('html', renderFile);
app.set('views', './views');

//Connection to DB
const connection = await connectMongoose();
console.log(`Connected to MongoDB: ${connection.name}`);

// json and forms
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//**MIDDLEWARES**
app.use((req, res, next) => {
    next();
});

//Environment
app.use((req,res, next) => {
    res.locals.appName = "NodePop";
    next();
})

//Filters
app.use(sessionMW);
app.use(sessionStatus);

//Routes
app.use('/', webRouter);
app.use('/api', apiRouter);

app.use((req, res, next) => {

    next();
});
//Error handlers
app.use(serverErrorHandler);

export default app;
