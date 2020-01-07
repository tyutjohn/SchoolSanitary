<template>
    <div :style="height" style="overflow:hidden">
        <div class="heathteach-header">
            <el-breadcrumb separator="/" class="admin-header-crumb">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>健康教育管理</el-breadcrumb-item>
            </el-breadcrumb>
            <el-button type="primary" icon="el-icon-edit" @click="dialogFormVisible = true" class="heathteach-button">
                添加项目
            </el-button>
            <el-dialog title="添加健康教育工作" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="计划项目名称" :label-width="formLabelWidth">
                        <el-input v-model="form.name" style="width:250px"></el-input>
                    </el-form-item>
                    <el-form-item label="教育人员" :label-width="formLabelWidth">
                        <el-input v-model="form.person" style="width:250px"></el-input>
                    </el-form-item>
                    <el-form-item label="教育内容" :label-width="formLabelWidth">
                        <el-input v-model="form.content" style="width:250px"></el-input>
                    </el-form-item>
                    <el-form-item label="活动时间" :label-width="formLabelWidth">
                        <div class="block">
                            <el-date-picker v-model="form.date" type="datetime" placeholder="选择日期时间"
                                value-format="yyyy-MM-dd HH:mm:ss">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addActs()">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<style>
    .heathteach-header {
        width: 100%;
        height: 50px;
        background: #fff;
        position: relative;
    }

    .heathteach-button {
        position: absolute;
        bottom: 4px;
        right: 90px;
    }
</style>
<script>
    export default {
        data() {
            return {
                height: { //自适应高度
                    height: document.body.scrollHeight - 80 + 'px'
                },
                dialogFormVisible: false, //设置内嵌添加项目表单
                form: {
                    name: '',
                    person: '',
                    content: '',
                    date: ''
                },
                formLabelWidth: '120px', //内嵌表单宽度
            };
        },

        components: {},

        computed: {},

        mounted() {},

        methods: {
            addActs() { //添加计划项目
                this.axios.post('/api/teachacts/add', {
                    name: this.form.name,
                    person: this.form.person,
                    content: this.form.content,
                    date: this.form.date
                }, {
                    headers: {
                        'Authorization': sessionStorage.getItem('userToken')
                    }
                }).then(res => {
                    if (res.status == 200) {
                        this.$message({
                            type: 'success',
                            message: '新建成功'
                        });
                        this.dialogFormVisible = false;
                    }
                }).catch(err => {
                    if (err.response.status == 400) {
                        this.$message.error(JSON.stringify(err.response.data))
                    }
                })
            }
        }
    }
</script>