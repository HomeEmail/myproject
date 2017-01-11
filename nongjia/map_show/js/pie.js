// 基于准备好的dom，初始化echarts实例
var myChart1 = echarts.init(document.getElementById('pie_2'));
var group = [
    ['莫村镇','#84ccc9'],
    ['官圩镇','#13b5b1'],
    ['高良镇','#009e96'],
    ['永丰镇','#00736d'],
    ['武垄镇','#448aca'],
    ['回龙镇','#fff100'],
    ['马圩镇','#0068b7'],
    ['凤村镇','#556fb5'],
    ['播植镇','#88abda'],
    ['新圩镇','#005982'],
    ['九市镇','#0075a9'],
    ['德城镇','#00a0e9'],
    ['悦城镇','#7ecef4'],
],

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
                    value: 335,
                    name: group[0][0],
                    itemStyle: {
                        normal: {
                            color: group[0][1]
                        }
                    }
                },
                {
                    value: 310,
                    name: group[1][0],
                    itemStyle: {
                        normal: {
                            color: group[1][1]
                        }
                    }
                },
                {
                    value: 234,
                    name: group[2][0],
                    itemStyle: {
                        normal: {
                            color: group[2][1]
                        }
                    }
                },
                {
                    value: 135,
                    name: group[3][0],
                    itemStyle: {
                        normal: {
                            color: group[3][1]
                        }
                    }
                },
                {
                    value: 1548,
                    name: group[4][0],
                    itemStyle: {
                    normal: {
                        color: group[4][1]
                    }
                }
                },
                {
                    value: 108,
                    name: group[5][0],
                    itemStyle: {
                    normal: {
                        color: group[5][1]
                    }
                }
                },
                {
                    value: 348,
                    name: group[6][0],
                    itemStyle: {
                    normal: {
                        color: group[6][1]
                    }
                }
                },
                {
                    value: 548,
                    name: group[7][0],
                    itemStyle: {
                    normal: {
                        color: group[7][1]
                    }
                }
                },
                {
                    value: 48,
                    name: group[8][0],
                    itemStyle: {
                    normal: {
                        color: group[8][1]
                    }
                }
                },
                {
                    value: 748,
                    name: group[9][0],
                    itemStyle: {
                    normal: {
                        color: group[9][1]
                    }
                }
                },
                {
                    value: 748,
                    name: group[10][0],
                    itemStyle: {
                        normal: {
                            color: group[10][1]
                        }
                    }
                },
                {
                    value: 748,
                    name: group[11][0],
                    itemStyle: {
                        normal: {
                            color: group[11][1]
                        }
                    }
                },
                {
                    value: 748,
                    name: group[12][0],
                    itemStyle: {
                        normal: {
                            color: group[12][1]
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