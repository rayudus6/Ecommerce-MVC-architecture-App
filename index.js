const express=require('express');
const _=require('lodash');
const morgan=require('morgan');
const mongoose=require('./config/db');
const app=express();
const { router }=require('./config/router');

app.use(morgan('short'));
app.use(express.json());

app.use('/',router);

app.listen(3000,() =>{
    console.log('Listening port 3000');
});