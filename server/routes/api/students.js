const Router = require('koa-router');
const router = new Router();
const passport = require('koa-passport');
const mongoose = require('mongoose')

//引入Student
const Student = require('../../models/Student');

//引入input验证
const validateAddInput = require('../../validation/students/add');


/**
 * @router GET api/students/test
 * @desc 测试接口地址
 * @access 接口是公开的
 */
router.get('/test', async ctx => {
    ctx.status = 200;
    ctx.body = {
        msg: 'students works...'
    }
})

/**
 * @router POST api/students/add
 * @desc 添加学生信息
 * @access 接口是私密的
 */
router.post('/add', passport.authenticate('jwt', {
    session: false
}), async ctx => {
    const {
        errors,
        isValid
    } = validateAddInput(ctx.request.body);
    //判断验证是否通过
    if (!isValid) {
        ctx.status = 400;
        ctx.body = errors;
        return;
    }
    //存储到数据库
    const newStudent = new Student({
        name: ctx.request.body.name,
        grade: ctx.request.body.grade,
        class: ctx.request.body.class
    });

    await newStudent.save().then(doc => {
        ctx.body = doc;
    }).catch(err => {
        console.log(err)
    });

    //返回json数据
    ctx.body = newStudent;
})

/**
 * @router PUT api/students/:id
 * @desc 修改学生信息
 * @access 接口是私密的
 */
router.put('/:id', passport.authenticate('jwt', {
    session: false
}), async ctx => {
    const _id = mongoose.Types.ObjectId(ctx.params.id);
    const update = {
        $set: {
            name: ctx.request.body.name,
            grade: ctx.request.body.grade,
            class: ctx.request.body.class
        }
    };
    //更新数据
    await Student.updateOne({
        _id
    }, update, err => {
        if (err) {
            ctx.status = 400
            ctx.body = err
        } else {
            ctx.status = 200
            ctx.body = '修改成功'
        }
    })
})

/**
 * @router GET api/students/
 * @desc 查看学生信息列表
 * @access 接口是私密的
 */
router.get('/', passport.authenticate('jwt', {
    session: false
}), async ctx => {
    await Student.find({}, (err, doc) => {
        if (err) {
            ctx.status = 400
            ctx.body = err
        } else {
            ctx.status = 200
            ctx.body = doc
        }
    })
})

/**
 * @router DELETC api/students/:id
 * @desc 删除学生信息
 * @access 接口是私密的
 */
router.delete('/:id', passport.authenticate('jwt', {
    session: false
}), async ctx => {
    const _id = mongoose.Types.ObjectId(ctx.params.id);
    await Student.deleteOne({
        _id
    }, err => {
        if (err) {
            ctx.status = 400
            ctx.body = err
        } else {
            ctx.status = 200
            ctx.body = '删除成功'
        }
    })
})

/**
 * @router POST api/students/report/:id
 * @desc 记录学生体验指标
 * @access 接口是私密的
 */
router.post('/report/:id', passport.authenticate('jwt', {
    session: false
}), async ctx => {
    const _id = mongoose.Types.ObjectId(ctx.params.id);
    const update = {
        $set: {
            issusname: ctx.request.body.issusname,
            condition: ctx.request.body.condition
        }
    };
    //更新数据
    await Student.updateOne({
        _id
    }, update, err => {
        if (err) {
            ctx.status = 400
            ctx.body = err
        } else {
            ctx.status = 200
            ctx.body = '修改成功'
        }
    })
})

/**
 * @router GET api/students/class/
 * @desc 获取学生班级信息
 * @access 接口是私密的
 */
router.get('/class', passport.authenticate('jwt', {
    session: false
}), async ctx => {
    //查询班级信息
    await Student.find({}, {
        class: 1
    }, (err, doc) => {
        if (err) {
            ctx.status = 400
            ctx.body = err
        } else {
            ctx.status = 200
            ctx.body = doc
        }
    })
})

/**
 * @router GET api/students/class/:class
 * @desc 获取班级学生列表 
 * @access 接口是私密的
 */
router.get('/class/:studentclass', passport.authenticate('jwt', {
    session: false
}), async ctx => {
    //查询班级学生信息
    await Student.find({
        class: ctx.params.studentclass
    }, (err, doc) => {
        if (err) {
            ctx.status = 400
            ctx.body = err
        } else {
            ctx.status = 200
            ctx.body = doc
        }
    })
})

/**
 * @router GET api/students/all
 * @desc 获取学生个人的综合信息
 * @access 接口是私密的
 */
router.post('/all', passport.authenticate('jwt', {
    session: false
}),async ctx => {
    let name = ctx.request.body.name;
    await Student.aggregate([{
        $lookup:{
            from:'combloods',
            localField:'name',
            foreignField:'bloname',
            as:'arrs'
        }
    },{
        $match:{
            name:name
        }
    }],(err,docs)=>{
        if(err){
            ctx.status=400
            ctx.body=errs
        }else{
            ctx.status=200
            ctx.body=docs[0]
        }
    })
})

/**
 * @router api/students/issuecount
 * @desc 统计各类常见病人数
 * @access 接口是私密的
 */
router.get('/issuecount',passport.authenticate('jwt',{
    session:false
}),async ctx=>{
    await Student.aggregate([{$group:{_id:"$issusname",num_count:{$sum:1}}}],(err,doc)=>{
        if(err){
            ctx.status=400
            ctx.body=err
        }else{
            ctx.status=200
            let data=[];
            let name=[]
            let datainfo={data,name}
            for(let i=0;i<doc.length;i++){
                    data.push(doc[i].num_count)
            }
            for(let j=0;j<doc.length;j++){
                name.push(doc[j]._id)
            }
            ctx.body=datainfo
        }
    })
})

module.exports = router.routes();