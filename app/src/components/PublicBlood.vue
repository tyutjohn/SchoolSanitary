<template>
    <div :style="height" style="overflow:hidden">
        <div class="publicblood-header">
            <el-breadcrumb separator="/" class="admin-header-crumb">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>公益献血管理</el-breadcrumb-item>
            </el-breadcrumb>
            <el-button type="primary" icon="el-icon-edit" @click="dialogFormVisible = true" class="publicheader-button">
                登记献血记录
            </el-button>
            <el-dialog title="登记献血者信息" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="献血者姓名" :label-width="formLabelWidth">
                        <el-input v-model="form.bloname" style="width:250px"></el-input>
                    </el-form-item>
                    <el-form-item label="献血量" :label-width="formLabelWidth">
                        <el-input v-model="form.quants" style="width:250px"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addBlood()">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="publiblood-table">
            <el-table :data="bloodData" style="width: 100%;padding:0 20px">
                <el-table-column prop="bloname" label="献血者姓名" width="240">
                    <template slot-scope="scope">
                        <i class="el-icon-user"></i>
                        <span style="margin-left: 10px">{{ scope.row.bloname }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="quants" label="献血量" width="240">
                    <template slot-scope="scope">
                        <i class="el-icon-discount"></i>
                        <span style="margin-left: 10px">{{ scope.row.quants }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="numid" label="献血证号" width="400">
                    <template slot-scope="scope">
                        <i class="el-icon-copy-document"></i>
                        <span style="margin-left: 10px">{{ scope.row.numid }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="献血时间" width="200">
                    <template slot-scope="scope">
                        <i class="el-icon-news"></i>
                        <span style="margin-left: 10px">{{ changeTime(scope.row.date) }}</span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="400">
                    <template slot-scope="scope">
                        <el-button @click="bloodUpdate(scope.row)" type="info">修改记录</el-button>
                        <el-button type='danger' @click="bloodDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="修改记录" :visible.sync="dialogBlood">
                <el-form :model="bloodupdate" status-icon>
                    <el-form-item label="献血者姓名" :label-width="formLabelWidth">
                        <el-input v-model="bloodupdate.bloname" style="width:250px"></el-input>
                    </el-form-item>
                    <el-form-item label="献血量" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="bloodupdate.quants" style="width:250px"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogBlood = false">取 消</el-button>
                    <el-button type="primary" @click="bloodUpdatePost()">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<style>
    .publicblood-header {
        width: 100%;
        height: 50px;
        background: #fff;
        position: relative;
    }

    .publicheader-button {
        position: absolute;
        bottom: 4px;
        right: 90px;
    }

    .publiblood-table {
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
                dialogFormVisible: false, //设置登记献血记录表单
                dialogBlood: false, //设置修改献血记录表单
                formLabelWidth: '120px', //表单宽度
                form: { //登记献血记录
                    bloname: '',
                    quants: ''
                },
                bloodData: [], //献血记录信息
                bloodupdate: {
                    bloname: '',
                    quants: '',
                    id: ''
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

        mounted() {
            this.getBlood()
        },

        methods: {
            addBlood() { //登记献血记录
                this.axios.post('/api/combloods/add', {
                    bloname: this.form.bloname,
                    quants: this.form.quants
                }, {
                    headers: {
                        'Authorization': sessionStorage.getItem('userToken')
                    }
                }).then(res => {
                    if (res.status == 200) {
                        this.$message({
                            type: 'success',
                            message: '登记成功'
                        });
                        this.dialogFormVisible = false;
                        this.getBlood()
                    }
                }).catch(err => {
                    if (err.response.status == 400) {
                        this.$message.error(JSON.stringify(err.response.data))
                    }
                })
            },
            getBlood() { //获取献血记录列表
                this.axios.get('/api/combloods/', {
                    headers: {
                        'Authorization': sessionStorage.getItem('userToken')
                    }
                }).then(res => {
                    if (res.status == 200) {
                        this.bloodData = res.data
                    }
                }).catch(err => {
                    if (err.response.status == 400) {
                        this.$message.error(JSON.stringify(err.response.data))
                    }
                })
            },
            bloodUpdate(row) { //打开修改记录内嵌表单
                this.bloodupdate.bloname = row.bloname;
                this.bloodupdate.quants = row.quants;
                this.bloodupdate.id = row._id;
                this.dialogBlood = true;
            },
            bloodUpdatePost() { //修改记录
                this.axios.put('/api/combloods/' + this.bloodupdate.id, {
                    bloname: this.bloodupdate.bloname,
                    quants: this.bloodupdate.quants
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
                        this.dialogBlood = false;
                        this.getBlood();
                    }
                }).catch(err => {
                    if (err.response.status == 400) {
                        this.$message.error(JSON.stringify(err.response.data))
                    }
                })
            },
            bloodDelete(row) { //删除记录
                this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios.delete('/api/combloods/' + row._id, {
                        headers: {
                            'Authorization': sessionStorage.getItem('userToken')
                        }
                    }).then(res => {
                        if (res.status == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            });
                            this.getBlood();
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