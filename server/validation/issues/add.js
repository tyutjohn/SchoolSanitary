const Validator=require('validator');
const isEmpty=require('../is-empty');

module.exports=function validateAddInput(data){
    let errors={};
    //验证是否是字符串
    data.name=!isEmpty(data.name)?data.name:'';
    data.class=!isEmpty(data.class)?data.class:'';
    data.show=!isEmpty(data.show)?data.show:'';
    data.infect=!isEmpty(data.infect)?data.infect:'';

    if(Validator.isEmpty(data.name)){
        errors.name='常见病名称不能为空';
    }

    if(Validator.isEmpty(data.class)){
        errors.class='类型不能为空';
    }

    if(Validator.isEmpty(data.show)){
        errors.show='病发表现不能为空';
    }

    if(Validator.isEmpty(data.infect)){
        errors.infect='传染性不能为空';
    }

    return {
        errors,
        isValid:isEmpty(errors)
    }
}