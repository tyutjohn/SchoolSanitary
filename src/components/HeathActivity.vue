<template>
    <div :style="height" style="overflow:hidden">
        <div class="heath-header">
            <el-breadcrumb separator="/" class="admin-header-crumb">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>卫生活动安排</el-breadcrumb-item>
            </el-breadcrumb>
            <el-button type="primary" icon="el-icon-edit" @click="dialogFormVisible = true" class="heath-header-button">
                添加活动
            </el-button>
            <el-dialog title="添加卫生活动" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="活动名称" :label-width="formLabelWidth">
                        <el-input v-model="form.name" style="width:250px"></el-input>
                    </el-form-item>
                    <el-form-item label="活动地点" :label-width="formLabelWidth">
                        <el-input v-model="form.address" style="width:250px"></el-input>
                    </el-form-item>
                    <el-form-item label="活动内容" :label-width="formLabelWidth">
                        <el-input v-model="form.content" style="width:250px"></el-input>
                    </el-form-item>
                    <el-form-item label="主办单位" :label-width="formLabelWidth">
                        <el-input v-model="form.unit" style="width:250px"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人" :label-width="formLabelWidth">
                        <el-select v-model="form.principal" placeholder="请选择负责人">
                            <el-option v-for="item in principal" :key="item._id" :label="item.name" :value="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="活动时间" :label-width="formLabelWidth">
                        <div class="block">
                            <el-date-picker v-model="form.actdate" type="datetime" placeholder="选择日期时间"
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
        <div class="heath-table">
            <el-table :data="actData" style="width: 100%;padding:0 20px">
                <el-table-column prop="name" label="活动名称" width="200">
                    <template slot-scope="scope">
                        <i class="el-icon-user"></i>
                        <span style="margin-left: 10px">{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="unit" label="主办单位" width="140">
                    <template slot-scope="scope">
                        <i class="el-icon-discount"></i>
                        <span style="margin-left: 10px">{{ scope.row.unit }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="principal" label="负责人" width="100">
                    <template slot-scope="scope">
                        <i class="el-icon-copy-document"></i>
                        <span style="margin-left: 10px">{{ scope.row.principal }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="发布时间" width="140">
                    <template slot-scope="scope">
                        <i class="el-icon-news"></i>
                        <span style="margin-left: 10px">{{ changeTime(scope.row.date) }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="actdate" label="活动时间" width="200">
                    <template slot-scope="scope">
                        <i class="el-icon-news"></i>
                        <span style="margin-left: 10px">{{ scope.row.actdate }}</span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="400">
                    <template slot-scope="scope">
                        <el-button @click="findAll(scope.row)" type="primary">查看详情</el-button>
                        <el-button @click="actUpdate(scope.row)" type="info">评定活动</el-button>
                        <el-button type='danger' @click="actDelect(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="活动详情" :visible.sync="dialogFindAll">
                <el-form :model="actAll">
                    <el-form-item label="活动名称" :label-width="formLabelWidth">
                        <span>{{actAll.name}}</span>
                    </el-form-item>
                    <el-form-item label="活动地点" :label-width="formLabelWidth">
                        <span>{{actAll.address}}</span>
                    </el-form-item>
                    <el-form-item label="活动内容" :label-width="formLabelWidth">
                        <span>{{actAll.content}}</span>
                    </el-form-item>
                    <el-form-item label="主办单位" :label-width="formLabelWidth">
                        <span>{{actAll.unit}}</span>
                    </el-form-item>
                    <el-form-item label="负责人" :label-width="formLabelWidth">
                        <span>{{actAll.principal}}</span>
                    </el-form-item>
                    <el-form-item label="活动情况" :label-width="formLabelWidth">
                        <span>{{actAll.condition}}</span>
                    </el-form-item>
                    <el-form-item label="发布时间" :label-width="formLabelWidth">
                        <span>{{changeTime(actAll.date)}}</span>
                    </el-form-item>
                    <el-form-item label="活动时间" :label-width="formLabelWidth">
                        <span>{{actAll.actdate}}</span>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFindAll = false">关 闭</el-button>
                </div>
            </el-dialog>
            <el-dialog title="评定活动情况" :visible.sync="dialogGrade">
                <el-form :model="actGrade" status-icon>
                    <el-form-item label="活动名称" :label-width="formLabelWidth">
                        <span>{{actGrade.name}}</span>
                    </el-form-item>
                    <el-form-item label="评定活动" :label-width="formLabelWidth" prop="name">
                        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"
                            v-model="actGrade.condition">
                        </el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogGrade = false">取 消</el-button>
                    <el-button type="primary" @click="actGradePost()">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<style>
    .heath-header {
        width: 100%;
        height: 50px;
        background: #fff;
        position: relative;
    }

    .heath-header-button {
        position: absolute;
        bottom: 4px;
        right: 90px;
    }

    .heath-table {
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
                dialogFormVisible: false, //设置添加表单开关
                dialogFindAll: false, //设置详情开关
                dialogGrade: false, //设置评定开关
                form: { //添加表单
                    name: '',
                    address: '',
                    content: '',
                    unit: '',
                    principal: '',
                    actdate: ''
                },
                formLabelWidth: '120px', //内嵌表单宽度
                principal: {}, //负责人信息
                actData: [], //活动列表
                actAll: { //活动详情
                    name: '',
                    address: '',
                    content: '',
                    unit: '',
                    principal: '',
                    condition: '',
                    date: '',
                    actdate: ''
                },
                actGrade: {
                    condition: '',
                    id: '',
                    name: ''
                }
            };
        },
        mounted() {
            this.getPrincipal();
            this.getActdata();
        },
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
        methods: {
            getPrincipal() { //获取负责人信息
                this.axios.get('/api/heathacts/principal', {
                    headers: {
                        'Authorization': sessionStorage.getItem('userToken')
                    }
                }).then(res => {
                    if (res.status == 200) {
                        this.principal = res.data;
                    }
                }).catch(err => {
                    if (err.response.status == 400) {
                        this.$message.error(JSON.stringify(err.response.data))
                    }
                })
            },
            addActs() { //添加活动
                this.axios.post('/api/heathacts/add', {
                    name: this.form.name,
                    address: this.form.address,
                    content: this.form.content,
                    unit: this.form.unit,
                    principal: this.form.principal,
                    condition: '',
                    actdate: this.form.actdate
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
                        this.getActdata()
                    }
                }).catch(err => {
                    if (err.response.status == 400) {
                        this.$message.error(JSON.stringify(err.response.data))
                    }
                })
            },
            getActdata() { //获取活动信息
                this.axios.get('/api/heathacts/', {
                    headers: {
                        'Authorization': sessionStorage.getItem('userToken')
                    }
                }).then(res => {
                    if (res.status == 200) {
                        this.actData = res.data;
                    }
                }).catch(err => {
                    if (err.response.status == 400) {
                        this.$message.error(JSON.stringify(err.response.data))
                    }
                })
            },
            actDelect(row) { //   删除活动j
                this.$confirm('此操作将删除该活动, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let id = row._id;
                    this.axios.delete('/api/heathacts/' + id, {
                        headers: {
                            'Authorization': sessionStorage.getItem('userToken')
                        }
                    }).then(res => {
                        if (res.status == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            })
                            this.getActdata()
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
            findAll(row) { //查看详情
                this.actAll.name = row.name;
                this.actAll.address = row.address;
                this.actAll.content = row.content;
                this.actAll.unit = row.unit;
                this.actAll.principal = row.principal;
                this.actAll.condition = row.condition;
                this.actAll.date = row.date;
                this.actAll.actdate = row.actdate;
                this.dialogFindAll = true
            },
            actUpdate(row) { //打开评定内嵌表单
                this.actGrade.id = row._id;
                this.actGrade.name = row.name;
                this.dialogGrade = true;
            },
            actGradePost(){//评定卫生活动
                this.axios.put('/api/heathacts/grade/'+this.actGrade.id,{
                    condition:this.actGrade.condition
                },{
                    headers: {
                        'Authorization': sessionStorage.getItem('userToken')
                    }
                }).then(res=>{
                    if(res.status==200){
                        this.$message({
                            type:"success",
                            message:'评定成功'
                        });
                        this.dialogGrade=false;
                        this.getActdata();
                    }
                }).catch(err=>{
                    if (err.response.status == 400) {
                            this.$message.error(JSON.stringify(err.response.data))
                        }
                })
            }
        }
    }
</script>