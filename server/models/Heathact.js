/*
 * @Author: tyutjohn 
 * @Date: 2019-12-30 17:47:10 
 * @Last Modified by: tyutjohn
 * @Last Modified time: 2020-01-02 14:17:42
 */
const mongoose=require('mongoose')
const Schema=mongoose.Schema;

//实例化数据模板
const HeathSchema=new Schema({
    name:{
        type:String
    },
    address:{
        type:String
    },
    content:{
        type:String
    },
    unit:{
        type:String
    },
    principal:{
        type:String
    },
    condition:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },
    actdate:{
        type:String
    },
    state:{
        type:Number,
        default:0
    }
});

module.exports=Heathact=mongoose.model("heathacts",HeathSchema);