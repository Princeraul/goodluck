function chatdefult(e, a, t) {
    e.hideLoading(), e.setOption(a)
}

function requireCallback(e, a) {
    if (0 !== domCharts.length) {
        for (var t = 0; t < domCharts.length; t++) myChart[t] = function(l) {
            var o = domCharts[t].getAttribute("md-index");
            str[l] = e.init(domCharts[l], a), str[l].showLoading(), clearTimeout(loadingTicket[l]), null !== o ? loadingTicket[l] = setTimeout(function() {
                chatdefult(str[l], option[o])
            }, 200 * l) : loadingTicket[l] = setTimeout(function() {
                chatdefult(str[l], option[l])
            }, 200 * l)
        }(t);
        window.onresize = function() {
            for (t = 0; t < domCharts.length; t++) str[t].resize()
        }
    }
}
var themeDefault = {
        align: ["left", "center", "right"],
        tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        roamController: {
            show: !1,
            x: "right",
            mapTypeControl: {
                china: !0
            }
        },
        textStyle: {
            color: "rgba(0,0,0,0.7)",
            fontSize: 14,
            fontWeight: "normal"
        },
        X: ["left", "center", "right"],
        placeHolderStyle: {
            normal: {
                color: "rgba(0,0,0,0)",
                label: {
                    show: !1
                },
                labelLine: {
                    show: !1
                }
            },
            emphasis: {
                color: "rgba(0,0,0,0)"
            }
        },
        dataStyle: {
            normal: {
                label: {
                    show: !1
                },
                labelLine: {
                    show: !1
                }
            }
        },
        orient: ["horizontal", "vertical"],
        defaultColor: ["rgba(0,0,0,0)"],
        lineAxisGrid: {
            x: 55,
            y: 60,
            x2: 35,
            borderColor: "rgba(0,0,0,0)"
        },
        splitLine: {
            lineStyle: {
                color: "rgba(0,0,0,.1)",
                type: "dashed",
                width: 1
            }
        },
        cList: function(e) {
            var a = ["#C1232B", "#B5C334", "#FCCE10", "#E87C25", "#27727B", "#FE8463", "#9BCA63", "#FAD860", "#F3A43B", "#60C0DD", "#D7504B", "#C6E579", "#F4E001", "#F0805A", "#26C0C0"];
            return a[e.dataIndex]
        }
    },
    str = [],
    myChart = [],
    loadingTicket = [],
    domCharts = $("[md='main']");
require.config({
    paths: {
        echarts: "../Public/Home/js/libs"
    }
}), require(["echarts", "echarts/theme/macarons", "echarts/chart/chord", "echarts/chart/bar", "echarts/chart/eventRiver", "echarts/chart/force", "echarts/chart/funnel", "echarts/chart/gauge", "echarts/chart/heatmap", "echarts/chart/k", "echarts/chart/line", "echarts/chart/map", "echarts/chart/pie", "echarts/chart/radar", "echarts/chart/scatter", "echarts/chart/tree", "echarts/chart/treemap", "echarts/chart/venn", "echarts/chart/wordCloud"], requireCallback);
var option = {
    0: {
        color: ['#5faff4'],
        title:{
            text:'近7天扫码人数统计',
            textStyle:{
                color: '#555',
                fontWeight: 'bolder'
            }
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            show: false,
            data:['扫码数量']
        },
        grid: {
            x: 50,
            y: 70,
            x2: 30,
            y2: 35,
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : sweep_time,
                boundaryGap: true,
                splitLine:{
                    show: false
                },
                axisLine:{
                    lineStyle:{
                        color: '#ccc'
                    }
                },
                axisTick:{
                    show: false
                },
                axisLabel:{
                    textStyle:{
                        color: '#999999',
                        fontSize: '16',
                        fontWeight: '400'
                    }
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLine:{
                    lineStyle:{
                        color: '#ccc'
                    }
                },
                axisTick:{
                    show: false
                },
                lineStyle:{
                    lineStyle:{
                        color: ['#ccc'],
                        width: 1,
                        type: 'solid'
                    }
                },
                splitArea:{
                    show: false
                },
                axisLabel:{
                    textStyle:{
                        color: '#999999',
                        fontSize: '16',
                        fontWeight: '400'
                    }
                }
            }
        ],
        series : [
            {
                name:'扫码人数',
                type:'line',
                stack: '总量',
                data: sweep_data,
                type:'line',
                symbol: 'none'
            }
        ]
    }
};
//# sourceMappingURL=maps/echartdata.min.js.map
