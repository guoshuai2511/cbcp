export class CaseStatisticsEcharts {

    static parsingData(type, data) {
        /*add by guoshuai start 2018-9-27*/
        $('#echarts-btn1-line').css('display','block');
        $('#echarts-btn1-lineBar').css('display','block');
        /*add by guoshuai end 2018-9-27*/
        function add0(val) {
            if (val >= 10) {
                return '' + val;
            } else {
                return '0' + val;
            }
        }
        let dataValue = { name: [], value: [], markPoint: [] };
        let list = data;
        switch (type) {
            case 1:
                for (let i = 0; i < list.length; i++) {
                    dataValue.name.push(list[i].month);
                    dataValue.value.push(list[i].num);
                    dataValue.markPoint.push({ name: list[i].month, coord: [i, list[i].num], value: list[i].num, });
                }
                break;
            case 2:
                let endTime =  (new Date()).Format("yyyy-MM-dd hh:mm:ss");
                let startTime = (new Date(new Date(endTime).getTime() - 365 * 24 * 3600 * 1000)).Format("yyyy-MM-dd hh:mm:ss");
                let DateStartTime = new Date(startTime);
                let year = DateStartTime.getFullYear();
                let month;
                if(DateStartTime.getMonth() < 11) {
                    month = DateStartTime.getMonth() + 2;
                }else {
                    month=12;
                }
                if(month==12){
                    for (let i = 0; i < 12; i++) {
                        if (month == 12) {
                            month = 1;
                            year = year + 1;
                        } else {
                            month = month + 1;
                        }
                        dataValue.name.push(year + '-' + add0(month));
                        dataValue.value.push(0);
                        dataValue.markPoint.push({ name: year + '-' + add0(month), coord: [i, 0], value: 0, });
                    }
                }else{
                    for (let i = 0; i < 12; i++) {
                        dataValue.name.push(year + '-' + add0(month));
                        dataValue.value.push(0);
                        dataValue.markPoint.push({ name: year + '-' + add0(month), coord: [i, 0], value: 0, });
                        if (month == 12) {
                            month = 1;
                            year = year + 1;
                        } else {
                            month = month + 1;
                        }
                    }
                }
                /*for (let i = 0; i < 12; i++) {
                    dataValue.name.push(year + '-' + add0(month));
                    dataValue.value.push(0);
                    dataValue.markPoint.push({ name: year + '-' + add0(month), coord: [i, 0], value: 0, });
                    if (month == 12) {
                        month = 1;
                        year = year + 1;
                    } else {
                        month = month + 1;
                    }
                    if (month == 12) {
                        month = 1;
                        year = year + 1;
                    } else {
                        month = month + 1;
                    }
                    dataValue.name.push(year + '-' + add0(month));
                    dataValue.value.push(0);
                    dataValue.markPoint.push({ name: year + '-' + add0(month), coord: [i, 0], value: 0, }); 
                }*/
                for (let i = 0; i < 12; i++) {
                    for (let j = 0; j < list.length; j++) {
                        if (dataValue.name[i] == list[j].month) {
                            dataValue.value[i] = list[j].num;
                            dataValue.markPoint[i].coord[1] = list[j].num;
                            dataValue.markPoint[i].value = list[j].num;
                            break;
                        }
                    }
                }
                break;
            case 3:
                for (let i = 0; i < list.length; i++) {
                    dataValue.name.push(list[i].month);
                    dataValue.value.push(list[i].num);
                    dataValue.markPoint.push({ name: list[i].month, coord: [i, list[i].num], value: list[i].num, });
                }
                break;
            default:
                break;
        }
        CaseStatisticsEcharts.draw(dataValue)
    }

    static draw(data) {
        /* 办案次数统计echarts*/
        let caseStatisticsEchartsDom = document.getElementById('case-statistics-echarts-dom');
        /*add by guoshuai start 2018-9-27*/
        let caseStatisticsEchartsDom2 = document.getElementById('case-statistics-echarts-dom2');
        $('#case-statistics-echarts-dom').css('display','block');
        $('#case-statistics-echarts-dom2').css('display','none');
        /*add by guoshuai end 2018-9-27*/
        let caseStatisticsChart = echarts.init(caseStatisticsEchartsDom, 'cbcp-theme');
        let caseStatisticsEchartsOption = {
            tooltip: {
                trigger: 'axis',
                /*add by guoshuai start 2018-9-27*/
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#dd45e0'
                    }
                }
                /*add by guoshuai end 2018-9-27*/
            },
            toolbox: {
                show: true,
                /*delete by guoshuai start 2018-9-27
                feature: {
                    magicType: { type: ['line', 'bar'] },
                },
                left: 60,
                top: 0,
                delete by guoshuai end 2018-9-27*/
                /*add by guoshuai start 2018-9-27*/
                left:'93%',
                top: "20%",
                iconStyle:{
                    normal:{
                        color:'#23b5e8',//设置颜色
                        borderColor:"#23b5e8",
                    }
                }
                /*add by guoshuai end 2018-9-27*/
            },
            grid: {
                /*delete by guoshuai start 2018-9-27
                left: 90,
                right: 70,
                delete by guoshuai end 2018-9-27*/
                /*add by guoshuai start 2018-9-27*/
                left: "6%",
                right: '9%',
                top:'30%'
                /*add by guoshuai end 2018-9-27*/
            },
            xAxis: {
                type: 'category',
                boundaryGap: true,
                data: data.name,
                axisLine: {
                    lineStyle: {
                        /*delete by guoshuai start 2018-9-27
                        color: '#cccccc',
                        delete by guoshuai end 2018-9-27*/
                        /*add by guoshuai start 2018-9-27*/
                        color: '#fff',
                        /*add by guoshuai end 2018-9-27*/
                    }
                },
                /*add by guoshuai start 2018-9-27*/
                splitLine:{show: false},//去除网格线
                name:'时间/月',
                nameTextStyle:{
                    color:"#dd45e0"  
                },
                /*add by guoshuai end 2018-9-27*/
            },
            yAxis: {
                type: 'value',
                /*add by guoshuai start 2018-9-27*/
                name:'作战数/件',
                nameTextStyle:{
                    color:"#dd45e0"  
                },
                splitLine:{show: false},//去除网格线
                /*add by guoshuai end 2018-9-27*/
                /*delete by guoshuai start 2018-9-27 
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: '#666666',
                    }
                },
                delete by guoshuai end 2018-9-27 */
                axisLine: {
                    lineStyle: {
                        color: '#cccccc',
                    }
                },
            },
            series: [
                {
                    name: '办案次数',
                    type: 'line',
                    data: data.value,
                    /*delete by guoshuai start 2018-9-27 
                    markPoint: {
                        itemStyle: {
                            color: 'rgb(194,53,49)',
                        },
                        data: data.markPoint
                    },
                    delete by guoshuai end 2018-9-27 */
                    /*add by guoshuai start 2018-9-27*/
                    itemStyle: {
                        normal: {
                            color:"#dd45e0",
                            lineStyle:{
                                color:"#dd45e0"
                            },
                            label:{
                                show:true,
                                color:"#dd45e0"
                            },
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#dd45e0'
                            }, {
                                offset: 1,
                                color: 'rgba(0,0,0,0.4)'
                            }]),
                        }
                    },
                    //折线图颜色渐变
                    areaStyle:{
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: '#dd45e0'
                                }, {
                                    offset: 1,
                                    color: 'rgba(221,69,224,0)'
                                }
                            ]),
                    },
                    symbol:"emptyCircle"
                    /*add by guoshuai end 2018-9-27*/
                },
            ]
        };
        
        caseStatisticsChart.setOption(caseStatisticsEchartsOption);
        caseStatisticsChart.resize();
        window.addEventListener('resize', function () {
            caseStatisticsChart.resize();
        });
        /*add by guoshuai start 2018-9-27*/
        $('#echarts-btn1-line').click(function(){
            $('#case-statistics-echarts-dom').css('display','block');
            $('#case-statistics-echarts-dom2').css('display','none');
            let caseStatisticsChart = echarts.init(caseStatisticsEchartsDom, 'cbcp-theme');
            let caseStatisticsEchartsOption = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#dd45e0'
                        }
                    }
                },
                toolbox: {
                    show: true,
                    left:'93%',
                    top: "20%",
                    iconStyle:{
                        normal:{
                        color:'#23b5e8',//设置颜色
                        borderColor:"#23b5e8",
                        }
                    }
                },
                grid: {
                    left: "6%",
                    right: '9%',
                    top:'30%'
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: true,
                    data: data.name,
                    axisLine: {
                        lineStyle: {
                            color: '#fff',
                        }
                    },
                    splitLine:{show: false},//去除网格线
                    name:'时间/月',
                    nameTextStyle:{
                        color:"#dd45e0"  
                    },
                },
                yAxis: {
                    type: 'value',
                    name:'作战数/件',
                    nameTextStyle:{
                        color:"#dd45e0"  
                    },
                    splitLine:{show: false},//去除网格线
                    axisLine: {
                        lineStyle: {
                            color: '#cccccc',
                        }
                    },
                },
                series: [
                    {
                        name: '办案次数',
                        type: 'line',
                        barWidth: '100%',
                        barMinHeight:"10",
                        data: data.value,
                        itemStyle: {
                                normal: {
                                    color:"#dd45e0",
                                    lineStyle:{
                                        color:"#dd45e0"
                                    },
                                    label:{
                                        show:true,
                                        color:"#dd45e0"
                                    },
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#dd45e0'
                                    }, {
                                        offset: 1,
                                        color: 'rgba(221,69,224,0)'
                                    }]),
                                }
                        },
                        areaStyle:{
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: '#dd45e0'
                                    }, {
                                        offset: 1,
                                        color: 'rgba(221,69,224,0)'
                                    }
                                ]),
                        },
                        symbol:"emptyCircle"
                    }
                ]
            };
            caseStatisticsChart.setOption(caseStatisticsEchartsOption);
            caseStatisticsChart.resize();
            window.addEventListener('resize', function () {
                caseStatisticsChart.resize();
            });
        });
        $('#echarts-btn1-lineBar').click(function(){
            $('#case-statistics-echarts-dom').css('display','none');
            $('#case-statistics-echarts-dom2').css('display','block');
            let caseStatisticsChart = echarts.init(caseStatisticsEchartsDom2, 'cbcp-theme');
            let caseStatisticsEchartsOption = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#dd45e0'
                        }
                    }
                },
                toolbox: {
                    show: true,
                    left:'93%',
                    top: "20%",
                    iconStyle:{
                        normal:{
                        color:'#23b5e8',//设置颜色
                        borderColor:"#23b5e8",
                        }
                    }
                },
                grid: {
                    left: "6%",
                    right: '9%',
                    top:'30%'
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: true,
                    data: data.name,
                    axisLine: {
                        lineStyle: {
                            color: '#ccc',
                        }
                    },
                    splitLine:{
                        lineStyle: {
                            type: 'dashed',
                            color: '#666666',
                        }
                    },//添加网格线
                    name:'时间/月',
                    nameTextStyle:{
                        color:"#dd45e0"  
                    },
                },
                yAxis: {
                    type: 'value',
                    name:'作战数/件',
                    nameTextStyle:{
                        color:"#dd45e0"  
                    },
                    splitLine:{
                        lineStyle: {
                            type: 'dashed',
                            color: '#666666',
                        }
                    },//添加网格线
                    axisLine: {
                        lineStyle: {
                            color: '#cccccc',
                        }
                    },
                },
                series: [
                    {
                        name: '办案次数',
                        type: 'bar',
                        barWidth: '60%',
                        data: data.value,
                        itemStyle: {
                                normal: {
                                    color:"#dd45e0",
                                    lineStyle:{
                                        color:"#dd45e0"
                                    },
                                    label:{
                                        show: true, //开启显示
                                        position: 'top',
                                        textStyle:{
                                            color:"#dd45e0",
                                            fontSize: 16,
                                            fontWeight: 600
                                        }
                                    },
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#dd45e0'
                                    }, {
                                        offset: 1,
                                        color: 'rgba(0,0,0,0.4)'
                                    }]),
                                }
                        },
                        areaStyle:{
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: '#dd45e0'
                                    }, {
                                        offset: 1,
                                        color: 'rgba(221,69,224,0)'
                                    }
                                ]),
                        },
                        symbol:"emptyCircle",
                    }
                ]
            };
            caseStatisticsChart.setOption(caseStatisticsEchartsOption);
            caseStatisticsChart.resize();
            window.addEventListener('resize', function () {
                caseStatisticsChart.resize();
            });
        });
        /*add by guoshuai end 2018-9-27*/
    }

}