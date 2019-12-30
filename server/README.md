<!--
 * @Author: johnwang
 * @since: 2019-11-01 22:47:38
 * @lastTime: 2019-11-01 23:08:15
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 -->
# koa-consoleboard
基于koa2的脚手架搭建

# 目录树
```
config              //配置文件夹
   mongodb.js       //mongodb配置
   passport.js      //token验证
   
models              //模型文件夹
   User.js          //user模型

routes              //路由文件夹
   api              //接口文件夹
      users.js      //接口文件

validation          //验证器文件夹
   is-empty.js      //抽象为空类
   login.js         //登陆验证
   register.js      //注册验证
   
app.js              //入口启动文件

package.json        //配置文件
```
