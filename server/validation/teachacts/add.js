const Validator=require('validator');
const isEmpty=require('../is-empty');

module.exports=function validateAddInput(data){
    let errors={};
    //验证是否是字符串
    data.name=!isEmpty(data.name)?data.name:'';
    data.person=!isEmpty(data.person)?data.person:'';
    data.content=!isEmpty(data.content)?data.content:'';
    data.date=!isEmpty(data.date)?data.date:'';

    if(Validator.isEmpty(data.name)){
        errors.name='健康教育计划项目名称不能为空';
    }

    if(Validator.isEmpty(data.person)){
        errors.person='教育人员不能为空';
    }

    if(Validator.isEmpty(data.content)){
        errors.content='教育内容不能为空';
    }

    if(Validator.isEmpty(data.date)){
        errors.date='活动时间不能为空';
    }

    return {
        errors,
        isValid:isEmpty(errors)
    }
}