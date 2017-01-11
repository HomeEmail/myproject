// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('line'));
option = {
    tooltip: {
        trigger: 'axis'
    },
    textStyle:{color:'#fff'},
    legend: {
        selected: {
            '罗浮镇' : false,
            '罗岗镇' : false,
            '黄槐镇' : false,
            '太平镇' : false,
            '黄陂镇' : false,
            '合水镇' : false,
            '石马镇' : false,
            '叶塘镇' : false,
            '西南片区' : false,
            '径南镇' : false,
            '新圩镇' : false,
            '水口镇' : false,
            '蕉岭县' : true
        }, 
	},
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
            name:dataList[0].name,
            type:'line',
            stack: '总量',
            data:[0, 132, 101, 134, 90, 230, 210],
            itemStyle: {
                normal: {
                    color: dataList[0].color
                }
            }

        },
        {
            name:dataList[1].name,
            type:'line',
            stack: '总量',
            data:[0, 182, 191, 234, 290, 330, 310],
            itemStyle: {
                normal: {
                    color:dataList[1].color
                }
            }
        },
        {
            name:dataList[2].name,
            type:'line',
            stack: '总量',
            data:[0, 232, 201, 154, 190, 330, 410],
            itemStyle: {
                normal: {
                    color:dataList[2].color
                }
            }
        },
        {
            name:dataList[3].name,
            type:'line',
            stack: '总量',
            data:[0, 332, 301, 334, 390, 330, 320],
            itemStyle: {
                normal: {
                    color:dataList[3].color
                }
            }
        },
        {
            name:dataList[4].name,
            type:'line',
            stack: '总量',
            data:[0, 932, 901, 934, 1290, 1330, 1320],
            itemStyle: {
                normal: {
                    color:dataList[4].color
                }
            }
        },
        {
            name:dataList[5].name,
            type:'line',
            stack: '总量',
            data:[0, 132, 101, 134, 90, 230, 210],
            itemStyle: {
                normal: {
                    color:dataList[5].color
                }
            }
        },
        {
            name:dataList[6].name,
            type:'line',
            stack: '总量',
            data:[0, 182, 191, 234, 290, 330, 310],
            itemStyle: {
                normal: {
                    color:dataList[6].color
                }
            }
        },
        {
            name:dataList[7].name,
            type:'line',
            stack: '总量',
            data:[0, 232, 201, 154, 190, 330, 410],
            itemStyle: {
                normal: {
                    color:dataList[7].color
                }
            }
        },
        {
            name:dataList[8].name,
            type:'line',
            stack: '总量',
            data:[0, 242, 211, 154, 190, 330, 410],
            itemStyle: {
                normal: {
                    color:dataList[8].color
                }
            }
        },
        {
            name:dataList[9].name,
            type:'line',
            stack: '总量',
            data:[0, 252, 221, 154, 190, 330, 401],
            itemStyle: {
                normal: {
                    color:dataList[9].color
                }
            }
        },
        {
            name:dataList[10].name,
            type:'line',
            stack: '总量',
            data:[0, 262, 231, 154, 190, 330, 440],
            itemStyle: {
                normal: {
                    color:dataList[10].color
                }
            }
        },
        {
            name:dataList[11].name,
            type:'line',
            stack: '总量',
            data:[0, 272, 241, 164, 195, 330, 420],
            itemStyle: {
                normal: {
                    color:dataList[11].color
                }
            }
        },
        {
            name:'兴宁市',
            type:'line',
            stack: '总量',
            data:[0, 300, 280, 200, 220, 360, 490],
            itemStyle: {
                normal: {
                    color:'pink'
                }
            }
        }
    ]
};
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);