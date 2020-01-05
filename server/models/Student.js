const mongoose=require('mongoose')
const Schema=mongoose.Schema;

//实例化数据
const StudentSchema=new Schema({
    name:{
        type:String
    },
    grade:{
        type:String
    },
    class:{
        type:Number
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

module.exports=Student=mongoose.model('students',StudentSchema);