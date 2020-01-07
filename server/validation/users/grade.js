const Validator = require('validator');
const isEmpty=require('../is-empty');

module.exports=function validateRegisterInput(data){
    let errors={};
    //验证是否是字符串
    data.grade=!isEmpty(data.grade)?data.grade:'';

    if(!Validator.isLength(data.name,{min:2,max:10})){
        errors.name='名字的长度不能小于2位且不能超过10位';
    }

    if(Validator.isEmpty(data.name)){
        errors.name='名字不能为空';
    }

    return {
        errors,
        isValid:isEmpty(errors)
    }
}