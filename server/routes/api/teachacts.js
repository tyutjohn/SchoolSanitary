const Router=require('koa-router');
const router=new Router();
const passport=require('koa-passport');
const mongoose=require('mongoose')

//引入Teachact
const Teachact=require('../../models/Teachact');

//引入input验证
const validateAddInput=require('../../validation/teachacts/add');

/**
 * @router  GET api/teachacts/test
 * @desc 测试接口地址
 * @access 接口是公开的
 */
router.get('/test',async ctx=>{
    ctx.status=200;
    ctx.body={
        msg:'teachacts works...'
    }
})

/**
 * @router  POST api/teachacts/add
 * @desc 提供健康教育工作
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
    const newAct=new Teachact({
        name:ctx.request.body.name,
        person:ctx.request.body.person,
        content:ctx.request.body.content,
        date:ctx.request.body.date
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
 * @router  PUT api/teachacts/:id
 * @desc 修改健康教育活动
 * @access 接口是私密的
 */
router.put('/:id',passport.authenticate('jwt',{
    session:false
}),async ctx=>{
    const _id=mongoose.Types.ObjectId(ctx.params.id);
    const update={
        $set:{
            name:ctx.request.body.name,
            person:ctx.request.body.person,
            content:ctx.request.body.content,
            date:ctx.request.body.date
        }
    };
    //修改数据
    await Teachact.update({_id},update,err=>{
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
 * @router  GET api/teachacts/
 * @desc 获取健康活动信息列表
 * @access 接口是私密的
 */
router.get('/',passport.authenticate('jwt',{
    session:false
}),async ctx=>{
    await Teachact.find({},(err,doc)=>{
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
 * @router  DELETC api/teachacts/:id
 * @desc 删除教育活动信息
 * @access 接口是私密的
 */
router.delete('/:id',passport.authenticate('jwt',{
    session:false
}),async ctx=>{
    const _id=mongoose.Types.ObjectId(ctx.params.id);
    await Teachact.deleteOne({_id},err=>{
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