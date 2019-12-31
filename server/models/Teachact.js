const mongoose=require('mongoose')
const Schema=mongoose.Schema;

//实例化数据模板
const TeachSchema=new Schema({
    name:{
        type:String
    },
    person:{
        type:String
    },
    content:{
        type:String
    },
    date:{
        type:Date
    },
    state:{
        type:Number,
        default:0
    }
});

module.exports=TeachSchema=mongoose.model('teachacts',TeachSchema);