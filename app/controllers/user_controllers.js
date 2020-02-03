const express=require('express');
const _=require('lodash');
const { User} =require('../models/user');
const { authenticateUser,authorizedUser }=require('../middlewares/authentication');
const router=express.Router();


router.get('/',authenticateUser,(req,res) =>{
    User.find().then((users) =>{
        res.send(users);
    })
});

router.post('/',authenticateUser,(req,res) =>{
    let body=_.pick(req.body,['name','email','password','mobile','role']);
    let user=new User(body);
    user.save().then((user) =>{
        return user.generateToken();
    }).then((token) =>{
        res.header('x-auth',token).send(user);
    }).catch((err) =>{
        res.status(400).send(err);
    })
});

//login route
router.post('/login',authenticateUser,(req,res) =>{
    let body=_.pick(req.body,['email','password']);
    User.findByEmailAndPassword(body.email,body.password).then((user) =>{
        user.generateToken().then((token) =>{
            res.header('x-auth',token).send();
        });
    }).catch((err) =>{
        res.send(err);
    })
});

//logout route
router.delete('/logout',authenticateUser,(req,res) =>{
    req.locals.user.deleteToken(req.locals.token).then(() =>{
        res.send();
    }).catch((err) =>{
        res.send(err);
    })
})

//user profile
//between the functions if you want to pass along data,
// you can attach it to req object
router.get('/profile',authenticateUser,authorizedUser,(req,res) =>{
    res.send(req.locals.user);
})

module.exports={
    usersControllers:router
}