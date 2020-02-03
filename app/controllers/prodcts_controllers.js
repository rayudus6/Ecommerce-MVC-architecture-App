const express=require('express');
const router=express.Router();
const _=require('lodash');
const { Product }=require('../models/product');


router.get('/',(req,res) =>{
    Product.find().then((products) =>{
        res.send(products);
    }).catch((err) =>{
        res.send(err);
    })
});
router.post('/',(req,res) =>{
    let body=_.pick(req.body,['name','price','description','category','stock','codEligible','maxUnitPurchase','lowStockalert'])
    let product=new Product(body);
    product.save().then((product) =>{
        res.send(product);
    }).catch((err) =>{
        res.send(err);
    })
});
router.put('/:id',(req,res) =>{
    let id=req.params.id;
    let body=_.pick(req.body,['name','price','description','category','stock','codEligible','maxUnitPurchase','lowStockalert'])
    
    //1st approach is find the id and update the product and save it
    Product.findById(id).then((product) =>{
        Object.assign(product,body);
        return product.save().then((product) =>{
            res.send(product);
        }).catch((err) =>{
            res.send(err)
        })
    })
    
    //2nd approach find and update the id but in this in the model page hte 'this' keyword is not
    // working properly so we need to follow above method
    
    // Product.findByIdAndUpdate(id,{$set:body},{new:true,runValidators:true}).then((product) =>{
    //     res.send(product);
    // }).catch((err) =>{
    //     res.send(err);
    // })
});

module.exports={
    productsContollers:router
}