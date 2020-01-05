const Router=require('koa-router');
const router=new Router();
const passport=require('koa-passport');
const mongoose=require('mongoose')

//引入Student
const Student=require('../../models/Student');

//引入input验证
const validateAddInput=require('../../validation/students/add');


/**
 * @router GET api/students/test
 * @desc 测试接口地址
 * @access 接口是公开的
 */
router.get('/test',async ctx=>{
    ctx.status=200;
    ctx.body={
        msg:'students works...'
    }
})

/**
 * @router POST api/students/add
 * @desc 添加学生信息
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
    const newStudent=new Student({
        name:ctx.request.body.name,
        grade:ctx.request.body.grade,
        class:ctx.request.body.class
    });

    await newStudent.save().then(doc=>{
        ctx.body=doc;
    }).catch(err=>{
        console.log(err)
    });

    //返回json数据
    ctx.body=newStudent;
})

/**
 * @router PUT api/students/:id
 * @desc 修改学生信息
 * @access 接口是私密的
 */
router.put('/:id',passport.authenticate('jwt',{
    session:false
}),async ctx=>{
    const _id=mongoose.Types.ObjectId(ctx.params.id);
    const update={
        $set:{
            name:ctx.request.body.name,
            grade:ctx.request.body.grade,
            class:ctx.request.body.class
        }
    };
    //更新数据
    await Student.updateOne({_id},update,err=>{
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
 * @router GET api/students/
 * @desc 查看献血者信息列表
 * @access 接口是私密的
 */
router.get('/',passport.authenticate('jwt',{
    session:false
}),async ctx=>{
    await Student.find({},(err,doc)=>{
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
 * @router DELETC api/students/:id
 * @desc 删除献血者信息
 * @access 接口是私密的
 */
router.delete('/:id',passport.authenticate('jwt',{
    session:false
}),async ctx=>{
    const _id=mongoose.Types.ObjectId(ctx.params.id);
    await Student.deleteOne({_id},err=>{
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