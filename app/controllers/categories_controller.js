const express=require('express');
const router=express.Router();
const _=require('lodash');

const { Category }=require('../models/category');

router.get('/',(req,res) =>{
    Category.find().then((categories) =>{
        res.send(categories);
    }).catch((err) =>{
        res.send(err);
    })
});

router.get('/:id',(req,res) =>{
    let id=req.params.id;
    Category.findById(id).then((category) =>{
        res.send(category);
    }).catch((err) =>{
        res.send(err);
    })
});

router.post('/',(req,res) =>{
    let body=req.body;
    let category=new Category(body);
    category.save().then((category) =>{
        res.send(category);
    }).catch((err) =>{
        res.send(err);
    })
})

module.exports={
    categoriesController:router
}