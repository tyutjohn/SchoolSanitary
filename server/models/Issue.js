const mongoose=require('mongoose')
const Schema=mongoose.Schema;

//实例化数据模板
const IssueSchema=new Schema({
    name:{
        type:String
    },
    class:{
        type:String
    },
    show:{
        type:String
    },
    infect:{
        type:String
    },
    state:{
        type:Number,
        default:0
    }
});

module.exports=Issue=mongoose.model('issues',IssueSchema);