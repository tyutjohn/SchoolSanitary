const mongoose=require('mongoose')
const Schema=mongoose.Schema;

//实例化数据
const StudentSchema=new Schema({
    name:{
        type:String
    },
    grade:{
        type:Number
    },
    class:{
        type:String
    },
    issusname:{
        type:String
    },
    condition:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports=StudentSchema=mongoose.model('students',StudentSchema);