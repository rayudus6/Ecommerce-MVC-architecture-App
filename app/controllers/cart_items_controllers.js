const express=require('express');
const router=express.Router();
const _=require('lodash');
const { validateId }=require('../middlewares/utilities');
const { authenticateUser }=require('../middlewares/authentication');
const { CartItem }=require('../models/cart_item');

router.get('/',authenticateUser,(req,res) =>{
    let user=req.locals.user;
    res.send(user.cartItems);
});

router.post('/',authenticateUser,(req,res) =>{
    let user=req.locals.user;
    let body=_.pick(req.body,['product','quantity']);
    let cartItem=new CartItem(body);
    user.cartItems.push(cartItem);
    user.save().then((user) =>{
        res.send({
            cartItem,
            notice:'Successfully added the product'
        });
    }).catch((err) =>{
        res.send(err);
    })
});

router.put('/:id',validateId,authenticateUser,(req,res) =>{
    let user=req.locals.user;
    let id=req.params.id;
    let body=_.pick(req.body,['quantity']);
    let inCart=user.cartItems.id(id);
    if(inCart){
        Object.assign(inCart,body);
    }
    user.save().then((user) =>{
        res.send({
            cartItem:inCart,
            notice:'Successfully added the product'
        });
    }).catch((err) =>{
        res.send(err);
    })
})

router.delete('/:id',authenticateUser,(req,res) =>{
    let user=req.locals.user;
    let id=req.params.id;
    user.cartItems.id(id).remove();
    user.save().then((user) =>{
        res.send({
            cartItems:user.cartItems,
            notice:'Removed Successfully'
        })
    }).catch((err) =>{
        res.send(err)
    })
})

module.exports={
    cartItemController:router
}