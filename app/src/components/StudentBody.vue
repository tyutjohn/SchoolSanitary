<template>
    <div :style="height" style="overflow:hidden">
        <div class="studentbody-header">
            <el-breadcrumb separator="/" class="admin-header-crumb">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>学生体验管理</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="studentbody-button">
                <el-select v-model="classInforvalue" placeholder="请选择班级" @change="getClassData()">
                    <el-option v-for="item in classInfor" :key="item._id" :label="item.class" :value="item.class">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="studentbody-table">
            <el-table :data="studentdata" style="width: 100%;padding:0 20px">
                <el-table-column prop="name" label="学生姓名" width="140">
                    <template slot-scope="scope">
                        <i class="el-icon-user"></i>
                        <span style="margin-left: 10px">{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="grade" label="年级" width="140" :filters="[{ text: '大一', value: '大一' }, { text: '大二', value: '大二' },
                {text:'大三',value:'大三'},{text:'大四',value:'大四'}]" :filter-method="filterTag">
                    <template slot-scope="scope">
                        <i class="el-icon-discount"></i>
                        <span style="margin-left: 10px">{{ scope.row.grade }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="class" label="班级" width="140">
                    <template slot-scope="scope">
                        <i class="el-icon-copy-document"></i>
                        <span style="margin-left: 10px">{{ scope.row.class }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="issusname" label="患病名称" width="200">
                    <template slot-scope="scope">
                        <i class="el-icon-copy-document"></i>
                        <span style="margin-left: 10px">{{ scope.row.issusname }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="condition" label="患者情况" width="300">
                    <template slot-scope="scope">
                        <i class="el-icon-copy-document"></i>
                        <span style="margin-left: 10px">{{ scope.row.condition }}</span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="400">
                    <template slot-scope="scope">
                        <el-button @click="studentUpdate(scope.row)" type="primary">记录体验信息</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="记录体检信息" :visible.sync="dialogStudent">
                <el-form :model="studentForm" status-icon>
                    <el-form-item label="学生姓名" :label-width="formLabelWidth">
                        <span>{{studentForm.name}}</span>
                    </el-form-item>
                    <el-form-item label="患病名称" :label-width="formLabelWidth" prop="name">
                        <el-select v-model="studentForm.issusname" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.name" :label="item.name" :value="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="患者情况" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="studentForm.condition" style="width:250px"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogStudent = false">取 消</el-button>
                    <el-button type="primary" @click="studentUpdatePost()">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<style>
    .studentbody-header {
        width: 100%;
        height: 50px;
        background: #fff;
        position: relative;
    }

    .studentbody-button {
        position: absolute;
        bottom: 4px;
        right: 90px;
    }

    .studentbody-table {
        width: 100%;
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
                classInfor: [], //班级信息列表
                classInforvalue: '', //班级下拉框选择值
                studentdata: [], //学生列表
                studentForm: { //学生体检信息表
                    name: '',
                    issusname: '',
                    condition: '',
                    id: ''
                },
                dialogStudent: false, //设置学生体检表单开关
                formLabelWidth: '120px', //设置内嵌表单宽度
                options: [], //常见病列表信息
            };
        },

        components: {},

        computed: {},

        mounted() {
            this.getClass();
            this.getStuents();
            this.getIssuedata();
        },

        methods: {
            getClass() { //获取班级
                this.axios.get('/api/students/class', {
                    headers: {
                        'Authorization': sessionStorage.getItem('userToken')
                    }
                }).then(res => {
                    if (res.status == 200) {
                        this.classInfor = res.data;
                    }
                }).catch(err => {
                    if (err.response.status == 400) {
                        this.$message.error(JSON.stringify(err.response.data))
                    }
                })
            },
            getStuents() { //获取学生列表
                this.axios.get('/api/students/', {
                    headers: {
                        'Authorization': sessionStorage.getItem('userToken')
                    }
                }).then(res => {
                    if (res.status == 200) {
                        this.studentdata = res.data
                    }
                }).catch(err => {
                    if (err.response.status == 400) {
                        this.$message.error(JSON.stringify(err.response.data))
                    }
                })
            },
            getClassData() { //获取班级学生列表
                let studentclass = this.classInforvalue;
                this.axios.get('/api/students/class/' + studentclass, {
                    headers: {
                        'Authorization': sessionStorage.getItem('userToken')
                    }
                }).then(res => {
                    if (res.status == 200) {
                        this.studentdata = res.data
                    }
                }).catch(err => {
                    if (err.response.status == 400) {
                        this.$message.error(JSON.stringify(err.response.data))
                    }
                })
            },
            getIssuedata() { //获取常见病列表
                this.axios.get('/api/issues/', {
                    headers: {
                        'Authorization': sessionStorage.getItem('userToken')
                    }
                }).then(res => {
                    if (res.status == 200) {
                        this.options = res.data
                    }
                }).catch(err => {
                    if (err.response.status == 400) {
                        this.$message.error(JSON.stringify(err.response.data))
                    }
                })
            },
            studentUpdate(row) { //打开记录体验表
                this.dialogStudent = true;
                this.studentForm.name = row.name;
                this.studentForm.id = row._id;
                this.studentForm.issusname = row.issusname;
                this.studentForm.condition = row.condition;
            },
            studentUpdatePost() { //修改体验记录
                this.axios.post('/api/students/report/' + this.studentForm.id, {
                    issusname: this.studentForm.issusname,
                    condition: this.studentForm.condition
                }, {
                    headers: {
                        'Authorization': sessionStorage.getItem('userToken')
                    }
                }).then(res => {
                    if (res.status == 200) {
                        this.$message({
                            type: 'success',
                            message: '记录成功'
                        });
                        this.dialogStudent = false;
                        this.getStuents();
                    }
                }).catch(err => {
                    if (err.response.status == 400) {
                        this.$message.error(JSON.stringify(err.response.data))
                    }
                })
            },
            filterTag(value, row) { //设置年级过滤
                return row.grade === value;
            },
        }
    }
</script>