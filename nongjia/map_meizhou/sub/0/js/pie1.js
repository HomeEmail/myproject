// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('pie_1'));

// 指定图表的配置项和数据
option = {

    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },

    series: [
        {
            name: '访问来源1',
            type: 'pie',
            radius: '55%',
            center: ['70%', '55%'],
            labelLine: {
                normal: {
                    show: false
                }
            },
            label: {
                normal: {
                    show: false
                }
            },
            data: [
                {
                    value: 98,
                    name: '完成部分',
                    itemStyle: {
                        normal: {
                            color: '#FFF100'
                        }
                    }
                },
                {
                    value: 2,
                    name: '未完成部分',
                    itemStyle: {
                        normal: {
                            color: '#7ECEF4'
                        }
                    }
                }
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 50,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};


// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);