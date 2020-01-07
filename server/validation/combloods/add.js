const Validator=require('validator');
const isEmpty=require('../is-empty');

module.exports=function validateAddInput(data){
    let errors={};
    //验证是否是字符串
    data.bloname=!isEmpty(data.bloname)?data.bloname:'';
    data.quants=!isEmpty(data.quants)?data.quants:'';

    if(Validator.isEmpty(data.bloname)){
        errors.bloname='献血者姓名不能为空';
    }

    if(Validator.isEmpty(data.quants)){
        errors.quants='献血量不能为空'
    }

    return {
        errors,
        isValid:isEmpty(errors)
    }
}