const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const validator=require('validator');

const productSchema=new Schema({
    name:{
        type:String,
        required:true,
        minlength:2,
        maxlength:64
    },
    price:{
        type:Number,
        required:true,
        min:1
    },
    description:{
        type:String,
        required:true,
        minlength:10,
        maxlength:1000
    },
    category:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Category'
    },
    codEligible:{
        type:Boolean,
        required:true,
        default:true,
        validate:{
            validator:function(value){
                return !(this.price>=25000 && this.codEligible)
            },
            message:function(){
                return 'This product is not eligible for COD'
            }
        }
    },
    stock:{
        type:Number,
        required:true,
        min:0
    },
    maxUnitPurchase:{
        type:Number,
        required:true,
        min:1
    },
    lowStockalert:{
        type:Number,
        required:true,
        min:0
    }
});

const Product=mongoose.model('Product',productSchema);

module.exports={
    Product
}