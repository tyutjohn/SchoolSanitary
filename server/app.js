/*
 * @Author: johnwang
 * @since: 2019-11-01 19:37:57
 * @lastTime: 2019-11-01 21:45:33
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 */
const koa=require('koa');
const Router=require('koa-router');
const mongoose=require('mongoose');
const bodyParser=require('koa-bodyparser');
const passport=require('koa-passport')

//config
const db=require('./config/mongodb').mongoURI;

//实例化koa
const app=new koa();
const router=new Router();

app.use(bodyParser());

//引入users.js
const users=require('./routes/api/users');
//引入heathacts.js
const heathacts=require('./routes/api/heathacts');
//引入teachacts.js
const teachacts=require('./routes/api/teachacts');
//引入issues.js
const issues=require('./routes/api/issues');
//引入combloods.js
const combloods=require('./routes/api/combloods');
//引入students.js
const students=require('./routes/api/students');

//路由
router.get('/',async ctx=>{
    ctx.body={msg:'hello'};
});

//连接数据库
mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('mongodb connected...');
}).catch(()=>{
    console.log(err);
});

app.use(passport.initialize());
app.use(passport.session());

//回调到config文件中 passport.js
require('./config/passport')(passport);

//配置路由地址
router.use('/api/users',users);
router.use('/api/heathacts',heathacts);
router.use('/api/teachacts',teachacts);
router.use('/api/issues',issues);
router.use('/api/combloods',combloods);
router.use('/api/students',students);

//配置路由
app.use(router.routes()).use(router.allowedMethods());

const port=process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`server started on ${port}`);
})