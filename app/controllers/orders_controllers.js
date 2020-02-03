const express=require('express');
const router=express.Router();

const { Order }=require('../models/order');
const { authenticateUser }=require('../middlewares/authentication');
const { validateId }=require('../middlewares/utilities');

router.get('/',authenticateUser,(req,res) =>{
   let user=req.locals.user;
   Order.find({user:user._id}).then((orders) =>{
       res.send(orders);
   }).catch((err) =>{
       res.send(err);
   })
});

router.post('/',authenticateUser,(req,res) =>{
    let user=req.locals.user;
    let order=new Order();

    order.user=user._id;
    order.save().then((order) =>{
        res.send({
            order,
            notice:'Successfully created an order'
        })
    }).catch((err) =>{
        res.send(err);
    })
});

module.exports={
    orderControllers:router
}