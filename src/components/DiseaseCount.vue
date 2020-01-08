<template>
    <div :style="height" style="overflow:hidden">
        <div class="count-header">
            <el-breadcrumb separator="/" class="admin-header-crumb">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>常见病统计</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="count-body">
            <div id="main" style="width: 600px;height:400px;"></div>
        </div>
    </div>
</template>

<style>
    .count-header {
        width: 100%;
        height: 50px;
        background: #fff;
        position: relative;
    }

    .count-body {
        width: 100%;
        bottom: 4px;
        right: 90px;
        margin: 30px;
    }
</style>
<script>
    const echarts = require('echarts')
    // 引入柱状图
    require('echarts/lib/chart/bar');
    // 引入提示框和标题组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    export default {
        data() {
            return {
                height: { //自适应高度
                    height: document.body.scrollHeight - 80 + 'px'
                },
                issueData: [], //常见病信息
                issueCount:[],//常见病数据
            };
        },

        components: {},

        computed: {},

        beforeMount() {
        },

        mounted() {
            this.printEchart()
        },

        methods: {
            printEchart() { //绘制eacherts
                this.axios.get('/api/students/issuecount', {
                    headers: {
                        'Authorization': sessionStorage.getItem('userToken')
                    }
                }).then(res => {
                    if (res.status == 200) {
                        //初始化echarts
                        const myChart = echarts.init(document.querySelector('#main'));
                        // 绘制图表
                        myChart.setOption({
                            title: {
                                text: '太原理工大学常见病人数统计'
                            },
                            tooltip: {},
                            xAxis: {
                                data: res.data.name
                            },
                            yAxis: {},
                            series: [{
                                name: '销量',
                                type: 'bar',
                                data: res.data.data
                            }]
                        });
                    }
                })
            }
        }
    }
</script>