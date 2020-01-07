const Router=require('koa-router');
const router=new Router();
const passport=require('koa-passport');
const mongoose=require('mongoose')

//引入Heathact
const Heathact=require('../../models/Heathact');
//引入User
const User=require('../../models/User');

//引入input验证
const validateAddInput=require('../../validation/heathacts/add');


/**
 * @router GET api/heathacts/test
 * @desc 测试接口地址
 * @access 接口是公开的
 */
router.get('/test',async ctx=>{
    ctx.status=200;
    ctx.body={
        msg:'heathacts works...'
    }
})

/**
 * @router POST api/heathacts/add
 * @desc 添加卫生工作活动
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
    const newAct=new Heathact({
        name:ctx.request.body.name,
        address:ctx.request.body.address,
        content:ctx.request.body.content,
        unit:ctx.request.body.unit,
        principal:ctx.request.body.principal,
        condition:ctx.request.body.condition,
        actdate:ctx.request.body.actdate
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
 * @router PUT api/heathacts/grade/:id
 * @desc 评定每次卫生活动情况
 * @access 接口是私密的
 */
router.put('/grade/:id',passport.authenticate('jwt',{
    session:false
}),async ctx=>{
    const _id=mongoose.Types.ObjectId(ctx.params.id);
    const update={
        $set:{
            condition:ctx.request.body.condition,
            state:1
        }
    };
    //更新数据
    await Heathact.update({_id},update,err=>{
        if(err){
            ctx.status=400
            ctx.body=err
        }else{
            ctx.status=200
            ctx.body='评定成功'
        }
    })
})

/**
 * @router GET api/heathacts/
 * @desc 查看卫生活动信息列表
 * @access 接口是私密的
 */
router.get('/',passport.authenticate('jwt',{
    session:false
}),async ctx=>{
    await Heathact.find({},(err,doc)=>{
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
 * @router DELETE api/heathacts/:id
 * @desc 删除卫生活动信息
 * @access 接口是私密的
 */
router.delete('/:id',passport.authenticate('jwt',{
    session:false
}),async ctx=>{
    const _id=mongoose.Types.ObjectId(ctx.params.id);
    await Heathact.deleteOne({_id},err=>{
        if(err){
            ctx.status=400
            ctx.body=err
        }else{
            ctx.status=200
            ctx.body='删除成功'
        }
    })
})

/**
 * @router GET api/heathacts/principal
 * @desc 查询活动负责人
 * @access 接口是私密的
 */
router.get('/principal',passport.authenticate('jwt',{
    session:false
}),async ctx=>{
    await User.find({state:0},{name:1},(err,doc)=>{
        if(err){
            ctx.status=400
            ctx.body=err
        }else{
            ctx.status=200
            ctx.body=doc
        }
    })
})
 
module.exports=router.routes();