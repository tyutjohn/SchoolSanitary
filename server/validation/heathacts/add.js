const Validator=require('validator');
const isEmpty=require('../is-empty');

module.exports=function validateAddInput(data){
    let errors={};
    //验证是否是字符串
    data.name=!isEmpty(data.name)?data.name:'';
    data.address=!isEmpty(data.address)?data.address:'';
    data.content=!isEmpty(data.content)?data.content:'';
    data.unit=!isEmpty(data.unit)?data.unit:'';
    data.principal=!isEmpty(data.principal)?data.principal:'';
    data.actdate=!isEmpty(data.actdate)?data.actdate:'';

    if(Validator.isEmpty(data.name)){
        errors.name='活动名称不能为空';
    }

    if(Validator.isEmpty(data.address)){
        errors.address='活动地点不能为空'
    }

    if(Validator.isEmpty(data.content)){
        errors.content='活动内容不能为空'
    }

    if(Validator.isEmpty(data.unit)){
        errors.unit='负责单位不能为空'
    }

    if(Validator.isEmpty(data.principal)){
        errors.principal='负责人不能为空'
    }

    if(Validator.isEmpty(data.actdate)){
        errors.actdate='活动时间不能为空'
    }

    return {
        errors,
        isValid:isEmpty(errors)
    }
}