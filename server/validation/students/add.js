const Validator=require('validator');
const isEmpty=require('../is-empty');

module.exports=function validateAddInput(data){
    let errors={};
    //验证是否是字符串
    data.name=!isEmpty(data.name)?data.name:'';
    data.grade=!isEmpty(data.grade)?data.grade:'';
    data.class=!isEmpty(data.class)?data.class:'';

    if(Validator.isEmpty(data.name)){
        errors.name='姓名不能为空';
    }

    if(Validator.isEmpty(data.grade)){
        errors.grade='年级不能为空'
    }

    if(Validator.isEmpty(data.class)){
        errors.class='班级不能为空'
    }

    return {
        errors,
        isValid:isEmpty(errors)
    }
}