import express from 'express';


// Database
import {connectMongoose} from './lib/connectMongoose.js';

// Middlewares
import {serverErrorHandler} from './lib/middlewares/errorMiddleware.js'

// Routes
//import { router as webRouter } from './routes/webRoutes.js';
import { router as apiRouter } from './routes/apiRoutes.js';

// -- EN OF IMPORTS --

const app = express();

//Connection to DB
const connection = await connectMongoose();
console.log(`Connected to MongoDB: ${connection.name}`);

// json and forms
app.use(express.json());

// template-engine

//**MIDDLEWARES**
app.use((req, res, next) => {
    next();
});

//Environment

//Filters

//Routes
//app.use('/', webRouter);
app.use('/api', apiRouter);

app.use((req, res, next) => {

    next();
});
//Error handlers
app.use(serverErrorHandler);

export default app;
