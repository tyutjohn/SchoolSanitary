const Router=require('koa-router');
const router=new Router();
const passport=require('koa-passport');
const mongoose=require('mongoose')

//引入Issue
const Issue=require('../../models/Issue');

//引入Input验证
const validateAddInput=require('../../validation/issues/add');

/**
 * @router GET api/issues/test
 * @desc 测试接口地址
 * @access 接口是公开的
 */
router.get('/test',async ctx=>{
    ctx.status=200;
    ctx.body={
        msg:'issues works...'
    }
})

/**
 * @router  POST api/issues/add
 * @desc 添加常见病例
 * @access 接口是私密的
 */
router.post('/add',passport.authenticate('jwt',{
    session:false
}),async ctx=>{
    const {errors,isValid}=validateAddInput(ctx.request.body);
    //判断验证是否通过
    if(!isValid){
        ctx.status=400;
        ctx.body=errors;
        return;
    }
    //存储到数据库
    const newAct=new Issue({
        name:ctx.request.body.name,
        class:ctx.request.body.class,
        show:ctx.request.body.show,
        infect:ctx.request.body.infect
    });

    await newAct.save().then(doc=>{
        ctx.body=doc;
    }).catch(err=>{
        console.log(err)
    });

    //返回json数据
    ctx.body=newAct;
})

/**
 * @router  PUT api/issues/:id
 * @desc 修改常见病例
 * @access 接口是私密的
 */
router.put('/:id',passport.authenticate('jwt',{
    session:false
}),async ctx=>{
    const _id=mongoose.Types.ObjectId(ctx.params.id);
    const update={
        $set:{
            name:ctx.request.body.name,
            class:ctx.request.body.class,
            show:ctx.request.body.show,
            infect:ctx.request.body.infect
        }
    };
    //修改数据
    await Issue.update({_id},update,err=>{
        if(err){
            ctx.status=400
            ctx.body=err
        }else{
            ctx.status=200
            ctx.body='修改成功'
        }
    })
})

/**
 * @router  GET api/issues/
 * @desc 获取常见病列表
 * @access 接口是私密的
 */
router.get('/',passport.authenticate('jwt',{
    session:false
}),async ctx=>{
    await Issue.find({},(err,doc)=>{
        if(err){
            ctx.status=400
            ctx.body=err
        }else{
            ctx.status=200
            ctx.body=doc
        }
    })
})

/**
 * @router  DELETC api/issues/:id
 * @desc 删除常见病信息
 * @access 接口是私密的
 */
router.delete('/:id',passport.authenticate('jwt',{
    session:false
}),async ctx=>{
    const _id=mongoose.Types.ObjectId(ctx.params.id);
    await Issue.deleteOne({_id},err=>{
        if(err){
            ctx.status=400
            ctx.body=err
        }else{
            ctx.status=200
            ctx.body='删除成功'
        }
    })
})

module.exports=router.routes();