// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('line'));

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
        trigger: 'axis'
    },
    textStyle:{color:'#fff'},
    legend: {
        selected: {
            '莫村镇' : false,
            '官圩镇' : false,
            '高良镇' : false,
            '永丰镇' : false,
            '武垄镇' : false,
            '回龙镇' : false,
            '马圩镇' : false,
            '凤村镇' : false,
            '播植镇' : false,
            '新圩镇' : false,
            '九市镇' : false,
            '德城镇' : false,
            '悦城镇' : false,
            '德庆县' : true
        },        },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        // data: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
        data: ['一月','二月','三月','四月','五月','六月','七月'],
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name:'莫村镇',
            type:'line',
            stack: '总量',
            data:[0, 132, 101, 134, 90, 230, 210],
            itemStyle: {
                normal: {
                    color: group[0][1]
                }
            }

        },
        {
            name:'官圩镇',
            type:'line',
            stack: '总量',
            data:[0, 182, 191, 234, 290, 330, 310],
            itemStyle: {
                normal: {
                    color: group[1][1]
                }
            }
        },
        {
            name:'高良镇',
            type:'line',
            stack: '总量',
            data:[0, 232, 201, 154, 190, 330, 410],
            itemStyle: {
                normal: {
                    color: group[2][1]
                }
            }
        },
        {
            name:'永丰镇',
            type:'line',
            stack: '总量',
            data:[0, 332, 301, 334, 390, 330, 320],
            itemStyle: {
                normal: {
                    color: group[3][1]
                }
            }
        },
        {
            name:'武垄镇',
            type:'line',
            stack: '总量',
            data:[0, 932, 901, 934, 1290, 1330, 1320],
            itemStyle: {
                normal: {
                    color: group[4][1]
                }
            }
        },
        {
            name:'回龙镇',
            type:'line',
            stack: '总量',
            data:[0, 132, 101, 134, 90, 230, 210],
            itemStyle: {
                normal: {
                    color: group[5][1]
                }
            }
        },
        {
            name:'马圩镇',
            type:'line',
            stack: '总量',
            data:[0, 182, 191, 234, 290, 330, 310],
            itemStyle: {
                normal: {
                    color: group[6][1]
                }
            }
        },
        {
            name:'凤村镇',
            type:'line',
            stack: '总量',
            data:[0, 232, 201, 154, 190, 330, 410],
            itemStyle: {
                normal: {
                    color: group[7][1]
                }
            }
        },
        {
            name:'播植镇',
            type:'line',
            stack: '总量',
            data:[0, 332, 301, 334, 390, 330, 320],
            itemStyle: {
                normal: {
                    color: group[8][1]
                }
            }
        },
        {
            name:'新圩镇',
            type:'line',
            stack: '总量',
            data:[0, 932, 901, 934, 1290, 1330, 1320],
            itemStyle: {
                normal: {
                    color: group[9][1]
                }
            }
        },
        {
            name:'九市镇',
            type:'line',
            stack: '总量',
            data:[0, 232, 201, 154, 190, 330, 410],
            itemStyle: {
                normal: {
                    color: group[10][1]
                }
            }
        },
        {
            name:'德城镇',
            type:'line',
            stack: '总量',
            data:[0, 332, 301, 334, 390, 330, 320],
            itemStyle: {
                normal: {
                    color: group[11][1]
                }
            }
        },
        {
            name:'悦城镇',
            type:'line',
            stack: '总量',
            data:[0, 932, 901, 934, 1290, 1330, 1320],
            itemStyle: {
                normal: {
                    color: group[12][1]
                }
            }
        },
        {
            name:'德庆县',
            type:'line',
            stack: '总量',
            data:[0, 932, 901, 934, 1190, 1530, 2320],
            itemStyle: {
                normal: {
                    color: 'pink'
                }
            }
        },
    ]
};
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);