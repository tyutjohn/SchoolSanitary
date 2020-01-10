/*
 * @Author: tyutjohn 
 * @Date: 2019-12-30 15:15:20 
 * @Last Modified by: tyutjohn
 * @Last Modified time: 2020-01-10 17:52:13
 */
# SchoolSanitary
学校卫生管理系统

# 系统启动
```
前台启动
cnpm install 
cnpm run serve

后台启动
cd server
cnpm install
cnpm install nodemon -g
nodemon

超级管理员注册
接口地址
@route api/users/register
@access 公开
@descript 字段:email（登录的账号), password,password2,name,grade(0为超级管理员，1为普通管理员) 

超级管理员注册后，在/server/routes/api/users.js中，第45至52行，将管理员查询权限开启
    // const authority = await User.findOne({
    //     email: ctx.request.body.authority
    // })
    // if (authority.grade == 1) {
    //     ctx.status = 400;
    //     ctx.body = '权限不足';
    //     return;
    // }
去掉上面代码的注释
```

# 项目打包部署
```
前台
cnpm run bulid
nginx代理配置
后台端口：http://localhost:3000/api/
后台
nodemon
```

# 系统功能
* 卫生工作组成员管理
提供工作组成员信息（职务、工作类型、工作内容等）的维护和查询功能）
* 卫生工作安排
提供卫生活动信息（活动名称、地点、内容、人员/单位及负责人等）的维护和查询功能，评定每次卫生活动情况
* 健康教育管理
提供健康教育工作（健康教育计划项目、教育人员、教育内容等）的维护和查询功能
* 学生体验管理
记录每位学生每学期体验各项指标详细情况
* 常见病防治管理
提供常见病信息（常见病名称、类型、病发表现、传染性等）的维护和查询功能，记录每个班学生常见病患者情况，统计年级、班级或个人常见病患者情况
* 公益献血管理
提供学生献血信息（包括献血量、献血证号和献血时间）的维护和查询功能
* 综合体制管理
提供每位学生综合体制信息的维护和查询功能

# 开发分类
## 后台开发
* 接口开发
** 管理员
```
系统基本功能
    * 登录          --完成
    * 退出
系统管理员
    * 维护卫生工作组成员的信息          --完成
    
工作组成员
    * 维护卫生活动信息                  --完成
    * 维护健康教育工作信息              --完成
    * 维护常见病信息                    --完成
    * 维护学生信息                      --完成
    * 维护学生献血信息                  --完成
```
## 前台开发
* view开发
```
Login   \\登录页面              --完成
Home    \\系统主页              --完成

```
* components组件
```
Header          \\头部              --完成
Bottom          \\尾部              --完成
Adminuser       \\工作组管理员模块        --完成
HeathActivity   \\卫生活动信息模快        --完成
HeathTeach      \\健康教育工作模块        --完成
StudentBody     \\学生体验管理模块        --完成
CommonDisease   \\常见病管理模块          --完成
StudentDisease  \\学生常见病管理模块      --完成
PublicBlood     \\公益献血模块            --完成
StudentSys      \\综合体质管理             --完成     
```
## UI设计
* view页
```
Login   \\登录页
Home    \\主页

```
* components组件
```
Header          \\头部
Bottom          \\尾部
Adminuser       \\超级管理员模块
WorkGroup       \\工作组成员信息模快
HeathActivity   \\卫生活动信息模快
HeathTeach      \\健康教育工作模块
StudentBody     \\学生体验管理模块
CommonDisease   \\常见病管理模块
StudentDisease  \\学生常见病管理模块
PublicBlood     \\公益献血模块
StudentSys      \\综合体质管理
```
## 数据库设计
mongodb数据库
* 模型设计
* 数据库关联设计
## 文档设计
* 项目计划书

# 开发人员
tyutjohn
邮箱(tyutjohnwang@163.com)
