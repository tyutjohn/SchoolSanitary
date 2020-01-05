/*
 * @Author: tyutjohn 
 * @Date: 2019-12-30 16:45:48 
 * @Last Modified by: tyutjohn
 * @Last Modified time: 2020-01-05 22:27:29
 */
# 后台开发日志
/*
 * @Date:2019-12-30 16:45:48
*/
* 数据库设计
* * users表
用户表
```

name    姓名

email   邮箱(登录索引)

password    密码

avatar      头像

data        日期

state       状态（0为正常，1为删除）

grade       等级（0为超级管理员，1为工作组成员）

duty        职务

worktype    工作类型

workcontent     工作内容
```

* * heathacts表
卫生工作活动表
```
name        活动名称

address     活动地点

content     内容

unit        单位

principal   负责人  (聚合查询users)

condition   活动情况

date        时间

actdate     活动时间

state       状态(0:未评定,1:已经评定)
```

* * teachacts表
健康教育工作表
```
name        健康教育计划项目名称

person      教育人员  

content     教育内容

date        时间

state       状态(0:正常,1:删除)
```

* * issues表
常见病表
```
name        常见病名称

class       类型

show        病发表现

infect      传染性

state       状态(0:正常,1:删除)
```

* * students表
学生信息表
```
name        姓名

grade       年级

class       班级

issusname   患病名称

condition   患者情况

date        时间
```

* * combloods表
公益献血表
```
bloname     献血者姓名(外键，和students表中的name关联)

quants      献血量

numid       献血证号

date        献血时间
```

/*
 * @Date:2019-12-31 13:36
*/
```
定义models下模型文件
Comblood.js
Heathact.js
Issue.js
Student.js
Teachact.js
User.js
```

/*
 * @Date:2019-12-31 14:18
 */
 ```
 接口开发
 /**
 * @route POST api/users/register
 * @desc 注册接口地址
 * @access 接口是公开的
 */
 
/**
 * @route POST api/users/login
 * @desc 登陆接口地址 返回token
 * @access 接口是公开的
 */

 /**
 * @route GET api/users/current
 * @desc 用户信息接口地址 返回用户信息
 * @access 接口是私密的
 */

/**
 * @route GET api/users/
 * @desc 获取用户组信息
 * @access 接口是私密的
 */

 /**
 * @route PUT api/users/:email
 * @desc 修改用户组成员信息
 * @access 接口是私密的
 */

 /**
 * @route DELETE api/users/:email
 * @desc 删除用户组成员信息
 * @access 接口是私密的
 */

 /**
 * @route POST api/users/password/:email
 * @desc 更新用户组成员的密码
 * @access 接口是私密的
 */
 ```

/*
 * @Date:2019-12-31 16:23
 */
 ```
 验证器添加
 validation\
    is-empty.js
    login.js
    password.js
    register.js
```

/*
* @Date:2020-1-2 14:10
*/
```
api配置
在routes\api中新建heathacts.js
引入router,gravatar验证器，jwttoken验证，koapassport拦截器
在app.js中引入heathacts.js 
app.use('heathacts',heathacts);

接口开发
/**
 * @router GET api/heathacts/test
 * @desc 测试接口地址
 * @access 接口是公开的
 */

/**
 * @router POST api/heathacts/add
 * @desc 添加卫生工作活动
 * @access 接口是私密的
 */

/**
 * @router PUT api/heathacts/grade/:id
 * @desc 评定每次卫生活动情况
 * @access 接口是私密的
 */

/**
 * @router GET api/heathacts/
 * @desc 查看卫生活动信息列表
 * @access 接口是私密的
 */

 /**
 * @router DELETC api/heathacts/:id
 * @desc 删除卫生活动信息
 * @access 接口是私密的
 */
```

/*
* @Date:2020-1-5 20:05
*/
```
api配置
在routes\api中新建teachacts.js
引入router,gravatar验证器，jwttoken验证，koapassport拦截器
在app.js中引入teachacts.js 
app.use('teachacts',teachacts);

接口开发
/**
 * @router  GET api/teachacts/test
 * @desc 测试接口地址
 * @access 接口是公开的
 */

/**
 * @router  POST api/teachacts/add
 * @desc 提供健康教育工作
 * @access 接口是私密的
 */

/**
 * @router  PUT api/teachacts/:id
 * @desc 修改健康教育活动
 * @access 接口是私密的
 */

 /**
 * @router  GET api/teachacts/
 * @desc 获取健康活动信息列表
 * @access 接口是私密的
 */

 /**
 * @router  DELETC api/teachacts/:id
 * @desc 删除教育活动信息
 * @access 接口是私密的
 */
 ```

 /*
* @Date:2020-1-5 21:04
*/
```
api配置
在routes\api中新建issues.js
引入router,gravatar验证器，jwttoken验证，koapassport拦截器
在app.js中引入issues.js 
app.use('issues',issues);

接口开发
/**
 * @router GET api/issues/test
 * @desc 测试接口地址
 * @access 接口是公开的
 */

/**
 * @router  POST api/issues/add
 * @desc 添加常见病例
 * @access 接口是私密的
 */

 /**
 * @router  PUT api/issues/:id
 * @desc 修改常见病例
 * @access 接口是私密的
 */

/**
 * @router  GET api/issues/
 * @desc 获取常见病列表
 * @access 接口是私密的
 */

 /**
 * @router  DELETC api/issues/:id
 * @desc 删除常见病信息
 * @access 接口是私密的
 */
 ```

/*
* @Date:2020-1-5 21:04
*/
```
api配置
在routes\api中新建combloods.js
引入router,gravatar验证器，jwttoken验证，koapassport拦截器
在app.js中引入issues.js 
app.use('combloods',combloods);

接口开放
/**
 * @router GET api/combloods/test
 * @desc 测试接口地址
 * @access 接口是公开的
 */

/**
 * @router POST api/combloods/add
 * @desc 添加献血者信息
 * @access 接口是私密的
 */

 /**
 * @router PUT api/combloods/:id
 * @desc 修改献血者信息
 * @access 接口是私密的
 */

/**
 * @router GET api/combloods/
 * @desc 查看献血者信息列表
 * @access 接口是私密的
 */

/**
 * @router DELETC api/combloods/:id
 * @desc 删除献血者信息
 * @access 接口是私密的
 */
 ```

 /*
* @Date:2020-1-5 22：10
*/
```
api配置
在routes\api中新建students.js
引入router,gravatar验证器，jwttoken验证，koapassport拦截器
在app.js中引入issues.js 
app.use('students',students);

接口开发
/**
 * @router GET api/students/test
 * @desc 测试接口地址
 * @access 接口是公开的
 */

/**
 * @router POST api/students/add
 * @desc 添加学生信息
 * @access 接口是私密的
 */

 /**
 * @router PUT api/students/:id
 * @desc 修改学生信息
 * @access 接口是私密的
 */

/**
 * @router GET api/students/
 * @desc 查看献血者信息列表
 * @access 接口是私密的
 */

/**
 * @router DELETC api/students/:id
 * @desc 删除献血者信息
 * @access 接口是私密的
 */
 ```