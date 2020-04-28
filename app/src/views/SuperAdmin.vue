<template>
    <div class="bg-admin">
        <div class="admin-container">
            <el-card class="box-card" style="background:rgba(244, 244, 244, 0.73)">
                <el-form :label-position="labelPosition" label-width="80px" :model="formlogin" style="width:100%">
                    <p class="form-p" style="color:rgb(199, 129, 129);margin:50px 0">超级管理员注册</p>
                    <el-form-item label="邮箱">
                        <el-input v-model="formlogin.email" style="width:60%">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="昵称">
                        <el-input v-model="formlogin.name" style="width:60%">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="formlogin.password" style="width:60%" show-password>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="确认密码">
                        <el-input v-model="formlogin.password2" style="width:60%" @keyup.enter.native="super_register()"
                            show-password>
                        </el-input>
                    </el-form-item>
                    <el-button type="primary" class="button"
                        style="margin:0 auto;display:block;border-radius:20px;font-size:16px" @click="super_register()">
                        立即注册
                    </el-button>
                </el-form>
            </el-card>
        </div>
    </div>
</template>

<style>
    .bg-admin {
        background: url("../assets/images/superadmin.jpg") no-repeat center;
        background-size: 100% 100%;
        height: 100%;
        position: fixed;
        width: 100%;
    }

    .admin-container {
        width: 40%;
        margin: 0 auto;
        margin-top: 130px;
    }
</style>
<script>
    import {
        Loading
    } from 'element-ui'
    export default {
        data() {
            return {
                labelPosition: 'right',
                formlogin: {
                    email: '', //注册邮箱
                    name: '', //昵称
                    password: '', //密码
                    password2: '', //确认密码
                }
            };
        },

        components: {},

        computed: {},

        mounted() {},

        methods: {
            //注册超级管理员
            super_register() {
                this.axios.post('/api/users/super', {
                    email: this.formlogin.email,
                    password: this.formlogin.password,
                    password2: this.formlogin.password2,
                    name: this.formlogin.name,
                    grade: 0
                }).then(res => {
                    console.log(res)
                    if (res.status==200) {
                        Loading.service({
                            fullscreen: true,
                            text: '注册成功，正在跳转'
                        });
                        setTimeout(() => {
                            this.$router.push({
                                path: '/Login'
                            })
                            Loading.service().close();
                        }, 2000)
                    }else{
                        this.$message.error(res.data)
                        setTimeout(()=>{
                            this.$router.push({
                                path:'/Login'
                            })
                            Loading.service().close();
                        },2000)
                    }
                }).catch(err => {
                    if(err.response.status==400){
                        this.$message.error(JSON.stringify(err.response.data))
                    }
                })
            }
        }
    }
</script>