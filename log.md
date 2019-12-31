/*
 * @Author: tyutjohn 
 * @Date: 2019-12-30 16:45:48 
 * @Last Modified by: tyutjohn
 * @Last Modified time: 2019-12-31 13:38:22
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

state       状态(0:正常,1:删除)
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
