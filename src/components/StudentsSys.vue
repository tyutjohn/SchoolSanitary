<template>
    <div :style="height" style="overflow:hidden">
        <div class="studentsys-header">
            <el-breadcrumb separator="/" class="admin-header-crumb">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>综合体制管理</el-breadcrumb-item>
            </el-breadcrumb>
            <el-button type="primary" icon="el-icon-edit" @click="dialogFormVisible = true" class="studentsys-button">
                添加学生信息
            </el-button>
            <el-dialog title="添加学生信息" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="学生姓名" :label-width="formLabelWidth">
                        <el-input v-model="form.name" style="width:250px"></el-input>
                    </el-form-item>
                    <el-form-item label="年级" :label-width="formLabelWidth">
                        <el-select v-model="form.grade" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.value" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="班级" :label-width="formLabelWidth">
                        <el-input v-model="form.class" style="width:250px"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addStudent()">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="studentsys-table">
            <el-table :data="studentData" style="width: 100%;padding:0 20px">
                <el-table-column prop="name" label="学生姓名" width="200">
                    <template slot-scope="scope">
                        <i class="el-icon-user"></i>
                        <span style="margin-left: 10px">{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="grade" label="年级" width="200">
                    <template slot-scope="scope">
                        <i class="el-icon-discount"></i>
                        <span style="margin-left: 10px">{{ scope.row.grade }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="class" label="班级" width="200">
                    <template slot-scope="scope">
                        <i class="el-icon-copy-document"></i>
                        <span style="margin-left: 10px">{{ scope.row.class }}</span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="400">
                    <template slot-scope="scope">
                        <el-button @click="getStudentAll(scope.row)" type="primary"
                            v-loading.fullscreen.lock="fullscreenLoading">详细信息</el-button>
                        <el-button @click="studentUpdate(scope.row)" type="info">修改信息</el-button>
                        <el-button type='danger' @click="studentDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="个人综合体制信息" :visible.sync="dialogFindAll">
                <el-form :model="studentAll">
                    <el-form-item label="姓名" :label-width="formLabelWidth">
                        <span>{{studentAll.name}}</span>
                    </el-form-item>
                    <el-form-item label="年级" :label-width="formLabelWidth">
                        <span>{{studentAll.grade}}</span>
                    </el-form-item>
                    <el-form-item label="班级" :label-width="formLabelWidth">
                        <span>{{studentAll.class}}</span>
                    </el-form-item>
                    <el-form-item label="患病名称" :label-width="formLabelWidth">
                        <span>{{studentAll.issusname}}</span>
                    </el-form-item>
                    <el-form-item label="患病情况" :label-width="formLabelWidth">
                        <span>{{studentAll.condition}}</span>
                    </el-form-item>
                    <div v-if="comlood">
                        <el-form-item label="献血量" :label-width="formLabelWidth">
                            <span>{{studentAll.arrs[0].quants}}</span>
                        </el-form-item>
                        <el-form-item label="献血证号" :label-width="formLabelWidth">
                            <span>{{studentAll.arrs[0].numid}}</span>
                        </el-form-item>
                        <el-form-item label="献血时间" :label-width="formLabelWidth">
                            <span>{{changeTime(studentAll.arrs[0].date)}}</span>
                        </el-form-item>
                    </div>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFindAll = false">关 闭</el-button>
                </div>
            </el-dialog>
            <el-dialog title="修改记录" :visible.sync="dialogStudent">
                <el-form :model="studentForm" status-icon>
                    <el-form-item label="学生姓名" :label-width="formLabelWidth">
                        <el-input v-model="studentForm.name" style="width:250px"></el-input>
                    </el-form-item>
                    <el-form-item label="年级" :label-width="formLabelWidth" prop="name">
                        <el-select v-model="studentForm.grade" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.value" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="班级" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="studentForm.class" style="width:250px"></el-input>
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
    .studentsys-header {
        width: 100%;
        height: 50px;
        background: #fff;
        position: relative;
    }

    .studentsys-button {
        position: absolute;
        bottom: 4px;
        right: 90px;
    }

    .studentsys-table {
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
                dialogFormVisible: false, //设置添加学生信息开关
                dialogStudent: false, //设置修改学生信息开关
                dialogFindAll: false, //设置信息详情信息开关
                comlood: false, //设置献血信息详情开关
                form: { //注册学生表单
                    name: '',
                    grade: '',
                    class: ''
                },
                formLabelWidth: '120px', //表单宽度设置
                options: [{ //添加表单下拉框数据
                    value: '大一',
                    label: '大一'
                }, {
                    value: '大二',
                    label: '大二'
                }, {
                    value: '大三',
                    label: '大三'
                }, {
                    value: '大四',
                    label: '大四'
                }],
                studentData: [], //学生信息列表
                studentForm: { //学生修改表单
                    name: '',
                    grade: '',
                    class: '',
                    id: ''
                },
                studentAll: {
                    arrs: [{
                        quants: '',
                        numid: '',
                        date: ''
                    }]
                }, //学生个人信息
                fullscreenLoading: false, //详情等待遮罩开关
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

        mounted() {
            this.getStudentdata()
        },

        methods: {
            addStudent() { //添加学生信息
                this.axios.post('/api/students/add', {
                    name: this.form.name,
                    grade: this.form.grade,
                    class: this.form.class
                }, {
                    headers: {
                        'Authorization': sessionStorage.getItem('userToken')
                    }
                }).then(res => {
                    if (res.status == 200) {
                        this.$message({
                            type: 'success',
                            message: '添加成功'
                        });
                        this.dialogFormVisible = false;
                        this.getStudentdata();
                    }
                }).catch(err => {
                    if (err.response.status == 400) {
                        this.$message.error(JSON.stringify(err.response.data))
                    }
                })
            },
            getStudentdata() { //获取学生信息
                this.axios.get('/api/students/', {
                    headers: {
                        'Authorization': sessionStorage.getItem('userToken')
                    }
                }).then(res => {
                    if (res.status == 200) {
                        this.studentData = res.data;
                    }
                }).catch(err => {
                    if (err.response.status == 400) {
                        this.$message.error(JSON.stringify(err.response.data))
                    }
                })
            },
            studentUpdate(row) { //打开修改信息表单
                this.studentForm.name = row.name;
                this.studentForm.grade = row.grade;
                this.studentForm.class = row.class;
                this.studentForm.id = row._id;
                this.dialogStudent = true;
            },
            studentUpdatePost() { //修改学生信息
                this.axios.put('/api/students/' + this.studentForm.id, {
                    name: this.studentForm.name,
                    grade: this.studentForm.grade,
                    class: this.studentForm.class
                }, {
                    headers: {
                        'Authorization': sessionStorage.getItem('userToken')
                    }
                }).then(res => {
                    if (res.status == 200) {
                        this.$message({
                            type: 'success',
                            message: '修改成功'
                        });
                        this.dialogStudent = false;
                        this.getStudentdata();
                    }
                }).catch(err => {
                    if (err.response.status == 400) {
                        this.$message.error(JSON.stringify(err.response.data))
                    }
                })
            },
            studentDelete(row) { //删除学生信息
                this.$confirm('此操作将删除该信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios.delete('/api/students/' + row._id, {
                        headers: {
                            'Authorization': sessionStorage.getItem('userToken')
                        }
                    }).then(res => {
                        if (res.status == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            })
                            this.getStudentdata()
                        }
                    }).catch(err => {
                        if (err.response.status == 400) {
                            this.$message.error(JSON.stringify(err.response.data))
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            getStudentAll(row) {
                this.axios.post('/api/students/all', {
                    name: row.name
                }, {
                    headers: {
                        'Authorization': sessionStorage.getItem('userToken')
                    }
                }).then(res => {
                    if (res.status == 200) {
                        this.studentAll = res.data
                        if (!res.data.arrs.length == 0) {
                            this.comlood = true;
                        }
                    }
                }).catch(err => {
                    if (err.response.status == 400) {
                        this.$message.error(JSON.stringify(err.response.data))
                    }
                })
                this.fullscreenLoading = true;
                setTimeout(() => {
                    this.fullscreenLoading = false;
                    this.dialogFindAll=true;
                }, 2000);
            }
        }
    }
</script>