<!--
 * @Author: johnwang
 * @since: 2019-11-03 22:13:06
 * @lastTime: 2019-11-04 22:03:57
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 -->
<template>
  <div :style="height" style="overflow:hidden">
    <div class="admin-header">
      <el-breadcrumb separator="/" class="admin-header-crumb">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>卫生组工作成员管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button type="primary" icon="el-icon-edit" @click="dialogFormVisible = true" class="admin-header-button">添加成员
      </el-button>
      <el-dialog title="添加管理员" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="管理员昵称" :label-width="formLabelWidth">
            <el-input v-model="form.name" style="width:250px"></el-input>
          </el-form-item>
          <el-form-item label="管理员邮箱" :label-width="formLabelWidth">
            <el-input v-model="form.email" style="width:250px"></el-input>
          </el-form-item>
          <el-form-item label="管理员密码" :label-width="formLabelWidth">
            <el-input v-model="form.password" style="width:250px" show-password></el-input>
          </el-form-item>
          <el-form-item label="再次输入密码" :label-width="formLabelWidth">
            <el-input v-model="form.password2" style="width:250px" show-password></el-input>
          </el-form-item>
          <el-form-item label="管理员职务" :label-width="formLabelWidth">
            <el-input v-model="form.duty" style="width:250px"></el-input>
          </el-form-item>
          <el-form-item label="管理员工作类型" :label-width="formLabelWidth">
            <el-input v-model="form.worktype" style="width:250px"></el-input>
          </el-form-item>
          <el-form-item label="管理员工作内容" :label-width="formLabelWidth">
            <el-input v-model="form.workcontent" style="width:250px"></el-input>
          </el-form-item>
          <el-form-item label="管理员等级" :label-width="formLabelWidth">
            <el-select v-model="form.grade" placeholder="请选择管理员等级">
              <el-option label="超级管理员" value="0"></el-option>
              <el-option label="工作组管理员" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="admin-table">
      <el-table :data="userData" style="width: 100%;padding:0 20px">
        <el-table-column prop="name" label="姓名" width="100">
          <template slot-scope="scope">
            <i class="el-icon-user"></i>
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="200">
          <template slot-scope="scope">
            <i class="el-icon-message"></i>
            <span style="margin-left: 10px">{{ scope.row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="data" label="注册时间" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ changeTime(scope.row.data) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="duty" label="职务" width="100">
          <template slot-scope="scope">
            <i class="el-icon-discount"></i>
            <span style="margin-left: 10px">{{ scope.row.duty }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="worktype" label="工作类型" width="100">
          <template slot-scope="scope">
            <i class="el-icon-copy-document"></i>
            <span style="margin-left: 10px">{{ scope.row.worktype }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="workcontent" label="工作内容" width="140">
          <template slot-scope="scope">
            <i class="el-icon-news"></i>
            <span style="margin-left: 10px">{{ scope.row.workcontent }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="400">
          <template slot-scope="scope">
            <el-button @click="userUpdate(scope.row)" type="primary">修改信息</el-button>
            <el-button @click="userUpPwd(scope.row)" type="warning">修改密码</el-button>
            <el-button type='danger' @click="userDelect(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="修改管理员信息" :visible.sync="dialogInformation">
        <el-form :model="formInform" status-icon :rules="rules" ref="formInform">
          <el-form-item label="昵称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="formInform.name" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="职务" :label-width="formLabelWidth" prop="duty">
            <el-input v-model="formInform.duty" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="工作类型" :label-width="formLabelWidth" prop="worktype">
            <el-input v-model="formInform.worktype" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="工作内容" :label-width="formLabelWidth" prop="workcontent">
            <el-input v-model="formInform.workcontent" style="width:300px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogInformation = false">取 消</el-button>
          <el-button type="primary" @click="userUpdateAdd()">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="修改管理员密码" :visible.sync="dialogPassword">
        <el-form :model="formPass" status-icon :rules="rules" ref="formPass">
          <el-form-item label="新密码" :label-width="formLabelWidth" prop="password">
            <el-input v-model="formPass.password" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" :label-width="formLabelWidth" prop="password2">
            <el-input v-model="formPass.password2" style="width:300px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogPassword = false">取 消</el-button>
          <el-button type="primary" @click="userUpPwdPost()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<style>
  .admin-header {
    width: 100%;
    height: 50px;
    background: #fff;
    position: relative;
  }

  .admin-header-button {
    position: absolute;
    bottom: 4px;
    right: 90px;
  }

  .admin-header-crumb {
    position: absolute;
    left: 40px;
    bottom: 20px
  }

  .admin-table {
    width: 100%;
    background: #e8eaeb;
    padding-top: 4px
  }

  .admin-table-main {
    margin: 0 50px;
  }
</style>

<script>
  export default {
    data() {
      var validatePass = (rule, value, callback) => { //验证密码
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.formPass.password !== '') {
            this.$refs.formPass.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => { //二次验证密码
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formPass.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        dialogFormVisible: false, //设置内嵌注册表单默认关闭
        dialogPassword: false, //设置内嵌修改密码表单默认关闭
        dialogInformation: false, //设置内嵌修改信息表单默认关闭
        form: { //注册管理员表单
          name: '',
          email: '',
          password: '',
          password2: '',
          grade: '',
          duty: '',
          worktype: '',
          workcontent: ''
        },
        formInform: { //修改信息
          name: '',
          duty: '',
          worktype: '',
          workcontent: '',
          email: ''
        },
        formLabelWidth: '120px', //内嵌表单宽度
        userData: [], //用户列表
        formPass: { //修改密码
          password: '',
          password2: '',
          email: ''
        },
        rules: { //验证规则
          password: [{
            validator: validatePass,
            trigger: 'blur'
          }],
          password2: [{
            validator: validatePass2,
            trigger: 'blur'
          }]
        },
        authority: sessionStorage.getItem('userName'), //权限身份获取
        height:{//自适应高度
          height: document.body.scrollHeight - 80 + 'px'
        }
      };
    },

    components: {},

    computed: {
      changeTime() { //时间GMT转换
        return function (time) {
          let date = new Date(time)
          let Str = date.getUTCFullYear() + '-' +
            (date.getUTCMonth() + 1) + '-' +
            date.getUTCDate() + ' ' +
            date.getUTCHours() + ':' +
            date.getUTCMinutes()
          return Str
        }
      }
    },

    beforeMount() {},

    mounted() {
      this.getUsers();
    },

    methods: {
      getUsers() { //获取用户列表
        this.axios.get('/api/users/', {
          params:{
            grade:sessionStorage.getItem('userGrade'),
            id:sessionStorage.getItem('userId')
          },
          headers: {
            'Authorization': sessionStorage.getItem('userToken')
          }
        }).then(res => {
          if (res.status == 200) {
            this.userData = res.data;
          }
        }).catch(err => {
          if (err.response.status == 400) {
            this.$message.error(JSON.stringify(err.response.data))
          }
        })
      },
      addUser() { //添加成员
        this.axios.post('/api/users/register', {
          name: this.form.name,
          email: this.form.email,
          password: this.form.password,
          password2: this.form.password2,
          grade: this.form.grade,
          duty: this.form.duty,
          worktype: this.form.worktype,
          workcontent: this.form.workcontent,
          authority: this.authority
        }, {
          headers: {
            'Authorization': sessionStorage.getItem('userToken')
          }
        }).then(res => {
          if (res.status == 200) {
            this.dialogFormVisible = false;
            this.$message({
              type: 'success',
              message: '添加成功'
            })
            this.getUsers();
          }
        }).catch(err => {
          if (err.response.status == 400) {
            this.$message.error(JSON.stringify(err.response.data))
          }
        })
      },
      userUpdate(row) { //打开修改信息
        this.dialogInformation = true;
        this.formInform.name = row.name;
        this.formInform.duty = row.duty;
        this.formInform.worktype = row.worktype;
        this.formInform.workcontent = row.workcontent;
        this.formInform.email = row.email
      },
      userUpdateAdd() { //修改信息提交
        let email = this.formInform.email
        this.axios.put('/api/users/' + email, {
          name: this.formInform.name,
          duty: this.formInform.duty,
          worktype: this.formInform.worktype,
          workcontent: this.formInform.workcontent
        }, {
          headers: {
            'Authorization': sessionStorage.getItem('userToken')
          }
        }).then(res => {
          if (res.status == 200) {
            this.getUsers();
            this.dialogInformation = false;
            this.$message({
              type: 'success',
              message: '修改成功'
            })
          }
        }).catch(err => {
          if (err.response.status == 400) {
            this.$message.error(JSON.stringify(err.response.data))
          }
        })
      },
      userUpPwd(row) { //打开修改密码
        this.dialogPassword = true;
        this.formPass.email = row.email;
      },
      userUpPwdPost() { //提交修改密码
        this.axios.post('/api/users/password/' + this.formPass.email, {
          password: this.formPass.password,
          password2: this.formPass.password2
        }, {
          headers: {
            'Authorization': sessionStorage.getItem('userToken')
          }
        }).then(res => {
          if (res.status == 200) {
            this.$message({
              type: 'success',
              message: "修改密码成功"
            });
            this.dialogPassword = false;
          }
        }).catch(err => {
          if (err.response.status == 400) {
            this.$message.error(JSON.stringify(err.response.data))
          }
        })
      },
      userDelect(row) { //删除管理员
        this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let email = row.email;
          this.axios.delete('/api/users/' + email, {
            authority: this.authority
          }, {
            headers: {
              'Authorization': sessionStorage.getItem('userToken')
            }
          }).then(res => {
            if (res.status == 200) {
              this.getUsers();
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },

    watch: {}

  }
</script>