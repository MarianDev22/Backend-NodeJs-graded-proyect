import express from 'express';


// Database
import {connectMongoose} from './lib/connectMongoose.js';
import mongoose from 'mongoose';
// Middlewares

// Routes
import { router as webRouter } from './routes/webRoutes.js';
import { router as apiRouter } from './routes/apiRoutes.js';
// -- Finish imports --

const app = express();

//Connection to DB
const connection = await connectMongoose();
console.log(`Connected to MongoDB: ${connection.name}`);
// json and forms

// template-engine

//**MIDDLEWARES**
import { serverErrorHandler } from './lib/middlewares/errorMiddleware.js';

//Environment

//Filters

//Routes
app.use('/', webRouter);
app.use('/api', apiRouter);

//Error handlers
app.use(serverErrorHandler);

export default app;
