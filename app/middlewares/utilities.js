const { ObjectID }=require('mongodb');


const validateId=function(req,res,next){
    let id=req.params.id;
    if(!ObjectID.isValid(id)){
        res.send({
            notice:'Invalid object id'
        });
    }else{
        next();
    }
}

module.exports={
    validateId
}