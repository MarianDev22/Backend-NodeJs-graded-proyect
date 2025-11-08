import express from 'express';


// Database
import {connectMongoose} from './lib/connectMongoose.js';
import mongoose from 'mongoose';
// Middlewares

// Routes

// -- Finish imports --

const app = express();

//Connection to DB
const connection = await connectMongoose();
console.log(`Connected to MongoDB: ${connection.name}`);
// json and forms

// template-engine

//**MIDDLEWARES**

//Environment

//FilerS

//Routes

//Error handlers

export default app;
