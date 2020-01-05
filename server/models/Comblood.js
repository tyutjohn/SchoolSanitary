const mongoose=require('mongoose')
const Schema=mongoose.Schema;

//实例化数据
const CombloodSchema=new Schema({
    bloname:{
        type:String,
        ref:'students'
    },
    quants:{
        type:String
    },
    numid:{
        type:Number
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports=Comblood=mongoose.model('combloods',CombloodSchema);