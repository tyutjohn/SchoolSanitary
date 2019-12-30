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
    }
});

module.exports=User=mongoose.model("users",UserSchema);