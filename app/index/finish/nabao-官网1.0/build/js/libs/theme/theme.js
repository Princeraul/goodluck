var themeDefault = {
        title: {
            show: false
        },
        toolbox: {
            show: false
        },
        legend: function(data) {
            return legend = {
                show: true,
                orient: 'horizontal',
                x: 'right',
                padding: [20, 120, 0, 0],
                itemGap: 20, //每个栏目间距   
                data: data
            }
        },
        // 提示信息
        tooltip: {
            trigger: 'item',
            pad
            formatter: "{a} <br/>{b} : {c} ({d}%)",
            // enterable: true,          设置详情 链接 button 等
            textStyle: {
                fontFamily: fontFamily
            }
        },
        // 值域控件
        dataRange: {
            show: true,
            x: 'left',
            y: 'bottom',
            itemGap: 15,
            splitList: [
                /*单独只写start 表示大于  只写end表示小于*/
                {
                    start: 1500
                }, {
                    start: 900,
                    end: 1500,
                    color: colorDefault[4]
                }, {
                    start: 310,
                    end: 1000,
                    color: colorDefault[3]
                }, {
                    start: 200,
                    end: 300,
                    color: colorDefault[2]
                }, {
                    start: 10,
                    end: 200,
                    color: colorDefault[1]
                }, {
                    end: 10,
                    color: colorDefault[0]
                }
            ],
            selectedMode: true,
            color: this.colorDefault,
            textStyle: {
                fontFamily: this.fontFamily
            }
        },
        // 缩放漫游组件，仅对地图有效
        roamController: {
            show: false,
            x: 'right',
            mapTypeControl: {
                'china': true
            }
        },
        grid: {
            x: 40,
            x2: 40,
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: 'rgba(0,0,0,0)',
            borderWidth: 0,
        },
        xAxis: function(data) {
            return xAxis = {
                type: 'category',
                position: 'bottom',
                boundaryGap: false, //两端留空
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    interval: 'auto',
                    textStyle: {
                        align: 'center',
                    }
                },
                textStyle: {
                    align: 'center'
                },
                splitLine: {
                    show: false
                }, //默认axis 不要grid
                // 值之间分隔区域 默认关闭
                splitArea: {
                    show: false,
                    areaStyle: {}
                },
                data: data
            }
        },
        yAxis: function() {
            return yAxis = {
                type: 'value',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    interval: 'auto',
                    textStyle: {
                        align: 'center',
                    }
                },
                splitLine: {
                    color: '#333',
                    width: 2,
                    lineStyle: {
                        color: 'rgba(0,0,0,.1)',
                        type: 'dashed',
                        width: 1,
                    }
                },
                // axisLabel:{formatter:'{value}%'},
                splitArea: {
                    show: false
                },
            }
        },
        placeHolderStyle: {
            normal: {
                color: 'rgba(0,0,0,0)',
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            },
            emphasis: {
                color: 'rgba(0,0,0,0)'
            }
        },
        dataStyle: {
            normal: {
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            }
        }
    };

