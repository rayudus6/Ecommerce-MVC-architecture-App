const express=require('express');
const router=express.Router();
const { categoriesController }=require('../app/controllers/categories_controller');
const { productsContollers }=require('../app/controllers/prodcts_controllers');
const { usersControllers }=require('../app/controllers/user_controllers');
const { cartItemController }=require('../app/controllers/cart_items_controllers');
const { orderControllers }=require('../app/controllers/orders_controllers');

router.use('/categories',categoriesController);
router.use('/products',productsContollers);
router.use('/users',usersControllers);
router.use('/cart_items',cartItemController);
router.use('/orders',orderControllers);

module.exports={
    router
}