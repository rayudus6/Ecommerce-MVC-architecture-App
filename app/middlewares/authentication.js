const { User} =require('../models/user');

//authenicate middleware
let authenticateUser=function(req,res,next){
    let token=req.header('x-auth');
    User.findByToken(token).then((user) =>{
        //between the functions if you want to pass along data,
        // you can attach it to req object
        //req.user=user;
        //req.token=token'
        req.locals={
            user,
            token
        }
        next();
    }).catch((err) =>{
        res.status(401).send(err);
    })
}

//authorization
let authorizedUser=function(req,res,next){
    if(req.locals.user.role=='admin'){
        next();
    }else{
        res.status(403).send();
    }
}

module.exports={
    authenticateUser,
    authorizedUser
}

