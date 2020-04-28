<template>
    <div :style="height" style="overflow:hidden">
        <div class="disease-header">
            <el-breadcrumb separator="/" class="admin-header-crumb">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>常见病防治管理</el-breadcrumb-item>
            </el-breadcrumb>
            <el-button type="primary" icon="el-icon-edit" @click="dialogFormVisible = true"
                class="diseaseheader-button">
                添加常见病例
            </el-button>
            <el-dialog title="添加健康教育工作" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="常见病名称" :label-width="formLabelWidth">
                        <el-input v-model="form.name" style="width:250px"></el-input>
                    </el-form-item>
                    <el-form-item label="类型" :label-width="formLabelWidth">
                        <el-input v-model="form.class" style="width:250px"></el-input>
                    </el-form-item>
                    <el-form-item label="常见病发症状" :label-width="formLabelWidth">
                        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"
                            v-model="form.show">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="传染性" :label-width="formLabelWidth">
                        <el-select v-model="form.infect" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.value" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addActs()">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="disease-table">
            <el-table :data="issueData" style="width: 100%;padding:0 20px">
                <el-table-column prop="name" label="常见病名称" width="240">
                    <template slot-scope="scope">
                        <i class="el-icon-user"></i>
                        <span style="margin-left: 10px">{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="person" label="常见病类型" width="240">
                    <template slot-scope="scope">
                        <i class="el-icon-discount"></i>
                        <span style="margin-left: 10px">{{ scope.row.class }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="content" label="病发症状" width="400">
                    <template slot-scope="scope">
                        <i class="el-icon-copy-document"></i>
                        <span style="margin-left: 10px">{{ scope.row.show }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="传染性" width="200">
                    <template slot-scope="scope">
                        <i class="el-icon-news"></i>
                        <span style="margin-left: 10px">{{ scope.row.infect }}</span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="400">
                    <template slot-scope="scope">
                        <el-button @click="issueUpdate(scope.row)" type="info">修改病例</el-button>
                        <el-button type='danger' @click="issDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="修改病例" :visible.sync="dialogIssue">
                <el-form :model="issueUpate" status-icon>
                    <el-form-item label="常见病名称" :label-width="formLabelWidth">
                        <el-input v-model="issueUpate.name" style="width:250px"></el-input>
                    </el-form-item>
                    <el-form-item label="常见病类型" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="issueUpate.class" style="width:250px"></el-input>
                    </el-form-item>
                    <el-form-item label="病发症状" :label-width="formLabelWidth" prop="name">
                        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"
                            v-model="issueUpate.show">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="传染性" :label-width="formLabelWidth">
                        <el-select v-model="issueUpate.infect" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.value" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogIssue = false">取 消</el-button>
                    <el-button type="primary" @click="actUpadtePost()">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<style>
    .disease-header {
        width: 100%;
        height: 50px;
        background: #fff;
        position: relative;
    }

    .diseaseheader-button {
        position: absolute;
        bottom: 4px;
        right: 90px;
    }

    .disease-table {
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
                dialogFormVisible: false, //设置添加内嵌表单开关
                dialogIssue: false, //设置修改内嵌表单开关
                form: { //添加表单
                    name: '',
                    class: '',
                    show: '',
                    infect: ''
                },
                formLabelWidth: '120px', //内嵌表单宽度
                options: [{ //添加表单下拉框数据
                    value: '强传染性',
                    label: '强传染性'
                }, {
                    value: '弱传染性',
                    label: '弱传染性'
                }, {
                    value: '非传染性',
                    label: '非传染性'
                }],
                issueData: [], //常见病数据
                issueUpate: { //修改常见病表单
                    name: '',
                    class: '',
                    show: '',
                    infect: '',
                    id: ''
                }
            };
        },

        components: {},

        computed: {},

        mounted() {
            this.getIssue()
        },

        methods: {
            addActs() { //添加常见病例
                this.axios.post('/api/issues/add', {
                    name: this.form.name,
                    class: this.form.class,
                    show: this.form.show,
                    infect: this.form.infect
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
                        this.getIssue()
                    }
                }).catch(err => {
                    if (err.response.status == 400) {
                        this.$message.error(JSON.stringify(err.response.data))
                    }
                })
            },
            getIssue() { //获取常见病病例
                this.axios.get('/api/issues/', {
                    headers: {
                        'Authorization': sessionStorage.getItem('userToken')
                    }
                }).then(res => {
                    if (res.status == 200) {
                        this.issueData = res.data
                    }
                }).catch(err => {
                    if (err.response.status == 400) {
                        this.$message.error(JSON.stringify(err.response.data))
                    }
                })
            },
            issueUpdate(row) { //打开修改病例内嵌表单
                this.issueUpate.name = row.name;
                this.issueUpate.class = row.class;
                this.issueUpate.show = row.show;
                this.issueUpate.infect = row.infect;
                this.issueUpate.id = row._id
                this.dialogIssue = true;
            },
            actUpadtePost() { //修改病例
                this.axios.put('/api/issues/' + this.issueUpate.id, {
                    name: this.issueUpate.name,
                    class: this.issueUpate.class,
                    show: this.issueUpate.show,
                    infect: this.issueUpate.infect
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
                        this.getIssue();
                        this.dialogIssue = false;
                    }
                }).catch(err => {
                    if (err.response.status == 400) {
                        this.$message.error(JSON.stringify(err.response.data))
                    }
                })
            },
            issDelete(row) { //删除常见病病例
                this.$confirm('此操作将删除该病例, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios.delete('/api/issues/' + row._id, {
                        headers: {
                            'Authorization': sessionStorage.getItem('userToken')
                        }
                    }).then(res => {
                        if (res.status == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            });
                            this.getIssue()
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