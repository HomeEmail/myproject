// 基于准备好的dom，初始化echarts实例
var myChart1 = echarts.init(document.getElementById('pie_2'));
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
                    value: dataList[0].data,
                    name: dataList[0].name,
                    itemStyle: {
                        normal: {
                            color: dataList[0].color
                        }
                    }
                },
                {
                    value: dataList[1].data,
                    name: dataList[1].name,
                    itemStyle: {
                        normal: {
                            color: dataList[1].color
                        }
                    }
                },
                {
                    value: dataList[2].data,
                    name: dataList[2].name,
                    itemStyle: {
                        normal: {
                            color: dataList[2].color
                        }
                    }
                },
                {
                    value: dataList[3].data,
                    name: dataList[3].name,
                    itemStyle: {
                        normal: {
                            color: dataList[3].color
                        }
                    }
                },
                {
                    value: dataList[4].data,
                    name: dataList[4].name,
                    itemStyle: {
                        normal: {
                            color: dataList[4].color
                        }
                    }
                },
                {
                    value: dataList[5].data,
                    name: dataList[5].name,
                    itemStyle: {
                        normal: {
                            color: dataList[5].color
                        }
                    }
                },
                {
                    value: dataList[6].data,
                    name: dataList[6].name,
                    itemStyle: {
                        normal: {
                            color: dataList[6].color
                        }
                    }
                },
                {
                    value: dataList[7].data,
                    name: dataList[7].name,
                    itemStyle: {
                        normal: {
                            color: dataList[7].color
                        }
                    }
                },
                {
                    value: dataList[8].data,
                    name: dataList[8].name,
                    itemStyle: {
                        normal: {
                            color: dataList[8].color
                        }
                    }
                },
                {
                    value: dataList[9].data,
                    name: dataList[9].name,
                    itemStyle: {
                        normal: {
                            color: dataList[9].color
                        }
                    }
                },
                {
                    value: dataList[10].data,
                    name: dataList[10].name,
                    itemStyle: {
                        normal: {
                            color: dataList[10].color
                        }
                    }
                },
                {
                    value: dataList[11].data,
                    name: dataList[11].name,
                    itemStyle: {
                        normal: {
                            color: dataList[11].color
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
myChart1.setOption(option);