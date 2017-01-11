// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('pie2'));

// 指定图表的配置项和数据
option = {

    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },

    series: [
        {
            selectedMode:'single',
            name: '流转情况',
            type: 'pie',
            radius: '60%',
            center: ['60%', '58%'],
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
                    value: dataList[0].rotateDate,
                    name: dataList[0].name,
                    itemStyle: {
                        normal: {
                            color: dataList[0].color
                        }
                    }
                },
                {
                    value: dataList[1].rotateDate,
                    name: dataList[1].name,
                    itemStyle: {
                        normal: {
                            color: dataList[1].color
                        }
                    }
                },
                {
                    value: dataList[2].rotateDate,
                    name: dataList[2].name,
                    itemStyle: {
                        normal: {
                            color: dataList[2].color
                        }
                    }
                },
                {
                    value: dataList[3].rotateDate,
                    name: dataList[3].name,
                    itemStyle: {
                        normal: {
                            color: dataList[3].color
                        }
                    }
                },
                {
                    value: dataList[4].rotateDate,
                    name: dataList[4].name,
                    itemStyle: {
                        normal: {
                            color: dataList[4].color
                        }
                    }
                },
                {
                    value: dataList[5].rotateDate,
                    name: dataList[5].name,
                    itemStyle: {
                        normal: {
                            color: dataList[5].color
                        }
                    }
                },
                {
                    value: dataList[6].rotateDate,
                    name: dataList[6].name,
                    itemStyle: {
                        normal: {
                            color: dataList[6].color
                        }
                    }
                },
                {
                    value: dataList[7].rotateDate,
                    name: dataList[7].name,
                    itemStyle: {
                        normal: {
                            color: dataList[7].color
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