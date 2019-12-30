/*
 * @Author: johnwang
 * @since: 2019-11-01 20:10:34
 * @lastTime: 2019-11-01 20:13:39
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 */
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//实例化数据模板
const UserSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
    },
    data:{
        type:Date,
        default:Date.now
    },
    state:{
        type:Number,
        default:0
    },
    grade:{
        type:Number
    },
    duty:{
        type:String
    },
    worktype:{
        type:String
    },
    workcontent:{
        type:String
    }
});

module.exports=User=mongoose.model("users",UserSchema);