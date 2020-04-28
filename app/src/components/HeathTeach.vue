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
                        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"
                            v-model="form.content">
                        </el-input>
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
        <div class="heathteach-table">
            <el-table :data="actData" style="width: 100%;padding:0 20px">
                <el-table-column prop="name" label="项目名称" width="200">
                    <template slot-scope="scope">
                        <i class="el-icon-user"></i>
                        <span style="margin-left: 10px">{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="person" label="教育人员" width="240">
                    <template slot-scope="scope">
                        <i class="el-icon-discount"></i>
                        <span style="margin-left: 10px">{{ scope.row.person }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="content" label="教育内容" width="340">
                    <template slot-scope="scope">
                        <i class="el-icon-copy-document"></i>
                        <span style="margin-left: 10px">{{ scope.row.content }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="发布时间" width="200">
                    <template slot-scope="scope">
                        <i class="el-icon-news"></i>
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="400">
                    <template slot-scope="scope">
                        <el-button @click="actUpdate(scope.row)" type="info">修改项目</el-button>
                        <el-button type='danger' @click="actDelect(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="修改项目计划" :visible.sync="dialogProcess">
                <el-form :model="actProcess" status-icon>
                    <el-form-item label="计划项目名称" :label-width="formLabelWidth">
                        <el-input v-model="actProcess.name" style="width:250px"></el-input>
                    </el-form-item>
                    <el-form-item label="教育人员" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="actProcess.person" style="width:250px"></el-input>
                    </el-form-item>
                    <el-form-item label="教育内容" :label-width="formLabelWidth" prop="name">
                        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"
                            v-model="actProcess.content">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="活动时间" :label-width="formLabelWidth">
                        <div class="block">
                            <el-date-picker v-model="actProcess.date" type="datetime" placeholder="选择日期时间"
                                value-format="yyyy-MM-dd HH:mm:ss">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogProcess = false">取 消</el-button>
                    <el-button type="primary" @click="actUpadtePost()">确 定</el-button>
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

    .heathteach-table {
        width: 100%;
        background: #e8eaeb;
        padding-top: 4px
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
                actData: [], //健康教育工作项目数据
                dialogProcess: false, //内嵌修改表单
                actProcess: {
                    name: '',
                    person: '',
                    content: '',
                    date: '',
                    id: ''
                }
            };
        },

        components: {},

        computed: {},

        mounted() {
            this.getData();
        },

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
                        this.getData();
                    }
                }).catch(err => {
                    if (err.response.status == 400) {
                        this.$message.error(JSON.stringify(err.response.data))
                    }
                })
            },
            getData() { //获取项目列表
                this.axios.get('/api/teachacts/', {
                    headers: {
                        'Authorization': sessionStorage.getItem('userToken')
                    }
                }).then(res => {
                    if (res.status == 200) {
                        this.actData = res.data
                    }
                }).catch(err => {
                    if (err.response.status == 400) {
                        this.$message.error(JSON.stringify(err.response.data))
                    }
                })
            },
            actUpdate(row) { //打开修改项目
                this.actProcess.name = row.name;
                this.actProcess.person = row.person;
                this.actProcess.content = row.content;
                this.actProcess.date = row.date;
                this.actProcess.id = row._id;
                this.dialogProcess = true;
            },
            actUpadtePost() { //修改项目
                this.axios.put('/api/teachacts/' + this.actProcess.id, {
                    name: this.actProcess.name,
                    person: this.actProcess.person,
                    content: this.actProcess.content,
                    date: this.actProcess.date
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
                        this.dialogProcess = false;
                        this.getData();
                    }
                }).catch(err => {
                    if (err.response.status == 400) {
                        this.$message.error(JSON.stringify(err.response.data))
                    }
                })
            },
            actDelect(row) { //删除项目
                this.$confirm('此操作将删除该活动, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let id = row._id;
                    this.axios.delete('api/teachacts/' + id, {
                        headers: {
                            'Authorization': sessionStorage.getItem('userToken')
                        }
                    }).then(res => {
                        if (res.status == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            });
                            this.getData();
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
            }
        }
    }
</script>