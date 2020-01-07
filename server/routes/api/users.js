/*
 * @Author: johnwang
 * @since: 2019-11-01 20:05:27
 * @lastTime: 2019-11-01 22:31:43
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 */
const Router = require('koa-router');
const router = new Router();
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const secretOrKey = require('../../config/mongodb').secretOrKey;
const passport = require('koa-passport');
const mongoose=require('mongoose')

//引入User
const User = require('../../models/User');

//引入input验证
const validateRegisterInput = require('../../validation/users/register');
const validateLoginInput = require('../../validation/users/login');
const validatorPasswordInput = require('../../validation/users/password');

/**
 * @route GET api/users/test
 * @desc 测试接口地址
 * @access 接口是公开的
 */
//test
router.get('/test', async ctx => {
    ctx.status = 200;
    ctx.body = {
        msg: 'users works...'
    };
});

/**
 * @route POST api/users/register
 * @desc 注册接口地址
 * @access 接口是公开的
 */
router.post('/register', async ctx => {
    //查询权限
    const authority = await User.findOne({
        email: ctx.request.body.authority
    })
    if (authority.grade == 1) {
        ctx.status = 400;
        ctx.body = '权限不足';
        return;
    }
    const {
        errors,
        isValid
    } = validateRegisterInput(ctx.request.body);
    //判断是否验证通过
    if (!isValid) {
        ctx.status = 400;
        ctx.body = errors;
        return;
    }

    //存储到数据库
    const findResult = await User.find({
        email: ctx.request.body.email
    });
    // console.log(findResult);
    if (findResult.length > 0) {
        ctx.data = false;
        ctx.body = {
            email: '邮箱已经被占用'
        };
    } else {
        const avatar = gravatar.url(ctx.request.body.email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });
        const newUser = new User({
            name: ctx.request.body.name,
            email: ctx.request.body.email,
            avatar,
            password: ctx.request.body.password,
            grade: ctx.request.body.grade,
            duty: ctx.request.body.duty,
            worktype: ctx.request.body.worktype,
            workcontent: ctx.request.body.workcontent
        });

        //加密密码
        newUser.password = await new Promise((res, rej) => {
            bcrypt.hash(newUser.password, 10, function (err, hash) {
                if (err) rej(err)
                res(hash)
            });
        })

        //存储到数据库
        await newUser.save().then(user => {
            ctx.body = user;
        }).catch(err => {
            console.log(err)
        });

        //返回json数据
        ctx.body = newUser;
    }
});

/**
 * @route POST api/users/login
 * @desc 登陆接口地址 返回token
 * @access 接口是公开的
 */
router.post('/login', async ctx => {
    const {
        errors,
        isValid
    } = validateLoginInput(ctx.request.body);
    //判断是否验证通过
    if (!isValid) {
        ctx.status = 400;
        ctx.body = errors;
        return;
    }
    //查询
    const findResult = await User.find({
        email: ctx.request.body.email
    });
    const user = findResult[0]
    const password = ctx.request.body.password;
    //判断查没查到
    if (findResult.length == 0) {
        ctx.status = 404;
        ctx.body = {
            email: '用户不存在'
        };
    } else {
        //查到后 验证密码
        var result = await bcrypt.compareSync(password, user.password);

        //验证通过
        if (result) {
            //返回token
            const payload = {
                id: user.id,
                name: user.name,
                avatar: user.avatar,
                grade: user.grade
            };
            const token = jwt.sign(payload, secretOrKey, {
                expiresIn: "6h"
            })

            ctx.status = 200;
            ctx.body = {
                success: true,
                token: "Bearer " + token
            };
        } else {
            ctx.status = 400;
            ctx.body = {
                password: "密码错误"
            }
        }
    }
})

/**
 * @route GET api/users/current
 * @desc 用户信息接口地址 返回用户信息
 * @access 接口是私密的
 */
router.get('/current', passport.authenticate('jwt', {
    session: false
}), async ctx => {
    ctx.body = {
        id: ctx.state.user.id,
        name: ctx.state.user.name,
        email: ctx.state.user.email,
        avatar: ctx.state.user.avatar,
        grade: ctx.state.user.grade
    };
})

/**
 * @route GET api/users/
 * @desc 获取用户组信息
 * @access 接口是私密的
 */
router.get('/', passport.authenticate('jwt', {
    session: false
}), async ctx => {
    //权限设置
    if (ctx.request.query.grade==1) {
        //查询自身
        let _id=mongoose.Types.ObjectId(ctx.request.query.id)
        await User.find({_id:_id},(err,docs)=>{
            if(err){
                ctx.status==400
                ctx.body=err
            }else{
                ctx.body=docs
            }
        })
    } else {
        //查询所有
        await User.find({
            state: 0
        }, (err, doc) => {
            if (err) {
                ctx.status = 400
                ctx.body = err
            } else {
                ctx.body = doc
            }
        })
    }
})

/**
 * @route PUT api/users/:email
 * @desc 修改用户组成员信息
 * @access 接口是私密的
 */
router.put('/:email', passport.authenticate('jwt', {
    session: false
}), async ctx => {
    //设置修改
    const email = ctx.params.email
    const update = {
        $set: {
            name: ctx.request.body.name,
            duty: ctx.request.body.duty,
            worktype: ctx.request.body.worktype,
            workcontent: ctx.request.body.workcontent
        }
    };

    await User.updateOne({
        email
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
 * @route DELETE api/users/:email
 * @desc 删除用户组成员信息
 * @access 接口是私密的
 */
router.delete('/:email', passport.authenticate('jwt', {
    session: false
}), async ctx => {
    //设置删除
    const email = ctx.params.email
    const Vdelete = {
        $set: {
            state: 1
        }
    }
    await User.update({
        email
    }, Vdelete, err => {
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
 * @route POST api/users/password/:email
 * @desc 更新用户组成员的密码
 * @access 接口是私密的
 */
router.post('/password/:email', async ctx => {
    //设置修改
    const email = ctx.params.email
    const {
        errors,
        isValid
    } = validatorPasswordInput(ctx.request.body)
    //判断验证是否通过
    if (!isValid) {
        ctx.status = 400;
        ctx.body = errors;
        return;
    }

    //定义密码
    const passwordOld = {
        password: ctx.request.body.password
    }

    //加密密码
    passwordOld.password = await new Promise((res, rej) => {
        bcrypt.hash(passwordOld.password, 10, function (err, hash) {
            if (err) rej(err)
            res(hash)
        });
    })

    //存储到数据库
    await User.update({
        email
    }, {
        $set: passwordOld
    }, err => {
        if (err) {
            ctx.status = 400
            ctx.body = err
        } else {
            ctx.status = 200
            ctx.body = '修改密码成功'
        }
    })
})


module.exports = router.routes();