import { FillDataToMap } from './FillDataToMap.js';
export class CaseDistributionEcharts {

    static parsingData(data, areaData, startTime, endTime, caseStatisticsType, grade, clickedAreaName) {
        console.log(data);
        let dataValue = [];
        let area = []; 
        let maxValue = 0;
        if(grade==0){ 
            for (let i = 0; i < data.length; i++) {
                if (data[i].province != null && data[i].province != '') {
                    let areaName;
                    switch (data[i].name) {
                        case '广西壮族自治区':
                            areaName = '广西';
                            break;
                        case '西藏自治区':
                            areaName = '西藏';
                            break;
                        case '宁夏回族自治区':
                            areaName = '宁夏';
                            break;
                        case '新疆维吾尔自治区':
                            areaName = '新疆';
                            break;
                        case '内蒙古自治区':
                            areaName = '内蒙古';
                            break;
                        default:
                            areaName = data[i].province.substring(0, data[i].province.length - 1);
                            break;
                    }
                    dataValue.push({ 
                        name: areaName,
                        value: data[i].value,
                        city: data[i].city,
                        district: data[i].district
                    });
                    if (maxValue < data[i].value) {
                        maxValue = data[i].value;
                    }
                }
            };
        }else if(grade==1){
            for (let i = 0; i < data.length; i++) {
                dataValue.push({ 
                    name: data[i].city,
                    value: data[i].value,
                    district: data[i].district,
                    areaCode: data[i].areaCode
                });
                if (maxValue < data[i].value) {
                    maxValue = data[i].value;
                }
            }
        }else if(grade==2){
            for (let i = 0; i < data.length; i++) {
                dataValue.push({ 
                    name: data[i].district,
                    value: data[i].value,
                });
                if (maxValue < data[i].value) {
                    maxValue = data[i].value;
                }
            }
        }
        CaseDistributionEcharts.draw(dataValue, maxValue,areaData, startTime, endTime, caseStatisticsType,grade,clickedAreaName);
    }

    static draw(dataValue, maxValue,area, startTime, endTime, caseStatisticsType ,grade ,clickedAreaName) {
        //$('#case-distribution-echarts-dom').html('');
        if(echartMap) {
            echartMap.clear();
            initMapFlag = false;
        }else {
            initMapFlag = true;
        }
        echartMap = echarts.init(document.getElementById('case-distribution-echarts-dom'));

        //数据合并
        let mergeData=[];
        let temp = {};
        function merge(grade){
            if(grade==0){
                for(let i in dataValue) {
                    let key= dataValue[i].name;
                    if(temp[key]) {
                        temp[key].name = temp[key].name ;
                        temp[key].value = temp[key].value+ dataValue[i].value;
                        
                    } else {
                        temp[key] = {};
                        temp[key].name = dataValue[i].name;
                        temp[key].value = dataValue[i].value;
                    }
                }
            } else if(grade==1){
                for(let i in dataValue) {
                    let name = dataValue[i].name;
                    //直辖市里市辖区级市辖县的数据合并
                    if( name == "市辖区"|| name == '县'){
                        let district = dataValue[i].district;
                        if(temp[district]) {
                            temp[district].name = temp[district].name ;
                            temp[district].value = temp[district].value+ countValue; 
     
                        }else{
                            temp[district] = {};
                            temp[district].name = district;
                            temp[district].value = dataValue[i].value;
                        }
                    }else{
                        //省份城市数据合并
                        let city = dataValue[i].name;
                        let countValue = dataValue[i].value;
                        if(temp[city]) {
                            temp[city].name = temp[city].name ;
                            temp[city].value = temp[city].value + countValue; 
     
                        }else{
                            temp[city] = {};
                            temp[city].name = city;
                            temp[city].value = countValue;
                        }
                    }
                }
            }else if(grade==2){
                for(let i in dataValue) {
                    let city= dataValue[i].name;
                    if(temp[city]) {
                        temp[city].name = temp[city].name ;
                        temp[kcity].value = temp[kcity].value+ dataValue[i].value; 
                    }else{
                        temp[city] = {};
                        temp[city].name = dataValue[i].name;
                        temp[city].value = dataValue[i].value;
                    }
                }
            }
    
            for(let k in temp){
                mergeData.push(temp[k])
            }
        }
        
        
        //34个省、市、自治区的名字拼音映射数组
        let provinces = {
            //23个省
            "台湾": "taiwan",
            "河北": "hebei",
            "山西": "shanxi",
            "辽宁": "liaoning",
            "吉林": "jilin",
            "黑龙江": "heilongjiang",
            "江苏": "jiangsu",
            "浙江": "zhejiang",
            "安徽": "anhui",
            "福建": "fujian",
            "江西": "jiangxi",
            "山东": "shandong",
            "河南": "henan",
            "湖北": "hubei",
            "湖南": "hunan",
            "广东": "guangdong",
            "海南": "hainan",
            "四川": "sichuan",
            "贵州": "guizhou",
            "云南": "yunnan",
            "陕西": "shanxi1",
            "甘肃": "gansu",
            "青海": "qinghai",
            //5个自治区
            "新疆": "xinjiang",
            "广西": "guangxi",
            "内蒙古": "neimenggu",
            "宁夏": "ningxia",
            "西藏": "xizang",
            //4个直辖市
            "北京": "beijing",
            "天津": "tianjin",
            "上海": "shanghai",
            "重庆": "chongqing",
            //2个特别行政区
            "香港": "xianggang",
            "澳门": "aomen"
        };

        //直辖市和特别行政区-只有二级地图，没有三级地图
        let special = ["北京","天津","上海","重庆","香港","澳门"];
        let mapdata = [];
        //绘制全国地图
        if(grade==0){
            merge(grade);
            $.getJSON('js/lib/echarts-map/map/china.json',function(data){
                let d = [];
                for(let i=0; i<data.features.length; i++ ){
                    let name = data.features[i].properties.name;
                    let areaCode;
                    let grade;
                    for(let i=0; i < area.length; i++) {
                        if(area[i].name.indexOf(name) > -1) {
                            areaCode = area[i].areaCode;
                            grade = area[i].grade;
                            break;
                        }
                    }
                    let flag = false;
                    for(let i=0; i < mergeData.length; i++) {
                        if(mergeData[i].name.indexOf(name) > -1) {
                            d.push({
                                name:name,
                                value:mergeData[i].value,
                                areaCode: areaCode,
                                grade: grade
                            });
                            flag = true;
                            break;
                        }
                    }
                    if(!flag) {
                        d.push({
                            name:name,
                            value:0,
                            areaCode: areaCode,
                            grade: grade
                        })
                    }
                } 
                mapdata = d;
                //注册地图
                echarts.registerMap('china', data);
                //绘制地图
                renderMap('china',d);
            });
        }else if(grade==1) {
            //绘制省级地图
                merge(grade);
                //如果点击的是34个省、市、自治区，绘制选中地区的二级地图
                $.getJSON('js/lib/echarts-map/map/province/'+ provinces[clickedAreaName] +'.json', function(data){
                    echarts.registerMap(clickedAreaName, data);
                    let d = [];
                    for( let i=0;i<data.features.length;i++ ){
                        let name = data.features[i].properties.name;
                        let areaCode;
                        let grade;
                        for(let i=0; i < area.length; i++) {
                            if(area[i].name.indexOf(name) > -1) {
                                areaCode = area[i].areaCode;
                                grade = area[i].grade;
                                break;
                            }
                        }
                        let flag = false;
                        for(let i=0; i < mergeData.length; i++) {
                            if(mergeData[i].name.indexOf(name) > -1) {
                                d.push({
                                    name:name,
                                    value:mergeData[i].value,
                                    areaCode: areaCode,
                                    grade: grade
                                });
                                flag = true;
                                break;
                            }
                        }
                        if(!flag) {
                            d.push({
                                name:name,
                                value:0,
                                areaCode: areaCode,
                                grade: grade
                            })
                        }
                    }
                    renderMap(clickedAreaName,d);
                    //add by guoshuai 只有二级下钻，返回按钮
                    $('#homeReturn').show();
                });

        } else if(grade==2) {
            //绘制市级地图
            merge(grade);  
            //显示县级地图
            $.getJSON('js/lib/echarts-map/map/city/'+ cityMap[clickedAreaName] +'.json', function(data){
                echarts.registerMap( clickedAreaName, data);
                let d = [];
                for( let i=0;i<data.features.length;i++ ){
                
                        let name = data.features[i].properties.name;
                        let areaCode;
                        let grade;
                        for(let i=0; i < area.length; i++) {
                            if(area[i].name.indexOf(name) > -1) {
                                areaCode = area[i].areaCode;
                                grade = area[i].grade;
                                break;
                            }
                        }
                        let flag = false;
                        for(let i=0; i <mergeData.length; i++) {
                            if(mergeData[i].name.indexOf(name) > -1) {
                                d.push({
                                    name:name,
                                    value:mergeData[i].value,
                                    areaCode: areaCode,
                                    grade: grade
                                });
                                flag = true;
                                break;
                            }
                        }
                        if(!flag) {
                            d.push({
                                name:name,
                                value:0,
                                areaCode: areaCode,
                                grade: grade
                            })
                        }
                }
                
                renderMap(clickedAreaName,d);
            });
            //显示县级地图同时出现返回按钮 add by guoshuai
            $('#homeReturn').show();		
        }
        //add by guo shuai 首页地图设置为深圳市
        /* $.getJSON('js/lib/echarts-map/map/city/440300.json', function(data){
            let d = [];
            for( let i=0;i<data.features.length;i++ ){
                d.push({
                    name:data.features[i].properties.name
                })
            }
            mapdata = d;
            //注册地图
            echarts.registerMap('深圳', data);
            //绘制地图
            renderMap('深圳',d);
        }); */
        if(initMapFlag) {
            //点击返回按钮 add by guoshuai
            $(document).on('click','#homeReturn',function(){
                //FillDataToMap.parsingData(null, startTime, endTime, caseStatisticsType);
                queryGrade = 0;
                FillDataToMap.parsingData();
                $('#homeReturn').hide();
            });
            //地图点击事件
            echartMap.on('click', function (params) {
                console.log( params );
                queryAreaCode = params.data.areaCode;
                queryAreaName = params.name;
                queryGrade = params.data.grade;
                if(queryGrade < 3){
                    FillDataToMap.parsingData();
                   // FillDataToMap.parsingData(params, startTime, endTime, caseStatisticsType);
                }
            });
        }

        //初始化绘制全国地图配置
        let caseDistributionEchartsOption = {
            //backgroundColor: 'rgb(29, 33, 39)',
            title : {
            /*  text: 'Echarts3 中国地图下钻至县级', */
                //subtext: '三级下钻',
                /* link: 'https://blog.csdn.net/example440982', */
                left: 'center',
                top:'20px',
                textStyle:{
                    color: '#fff',
                    fontSize:16,
                    fontWeight:'normal',
                    fontFamily:"Microsoft YaHei"
                },
                subtextStyle:{
                    color: '#ccc',
                    fontSize:13,
                    fontWeight:'normal',
                    fontFamily:"Microsoft YaHei"
                }
            },
            tooltip: {
                trigger: 'item',
                //formatter: '{b}'
            },
            formatter: function (e) {
               /*  if (e.name == '') {
                    return '';
                } else {
                    return `${e.name}：<br>作战&nbsp;&nbsp;${e.value}`;
                } */
                if (!e.value) {
                    return `${e.name}：<br>作战数：${0}件`;
                } else {
                    return `${e.name}：<br>作战数：${e.value}件`;
                } 
            },
            visualMap: {
                min: 0,
                max: maxValue,
                left: '14.74%',
                bottom: '7.02%',
                //text: ['高', '低'],           // 文本，默认为数值文本
                //calculable: true,
                //show: false,
                text:['High','Low'],
                realtime: false,
                calculable: true,
                inRange: {
                    color: ['#fff','#cd9a5b','#d5c59f','#feeeed','#f05b72','yellow','#f7acbc','#bd6758','#bb505d','#973c3f', 'orangered','red']
                }
            },
            toolbox: {
                show: false,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    dataView: {readOnly: false},
                    restore: {},
                    saveAsImage: {}
                },
                iconStyle:{
                    normal:{
                        color:'#fff'
                    }
                }
            },
            animationDuration:1000,
            animationEasing:'cubicOut',
            animationDurationUpdate:1000
            
        };
        function renderMap(map,data){
            if(map!='china'){
                caseDistributionEchartsOption.title.subtext = map;
            }else{
                caseDistributionEchartsOption.title.subtext = '';
            }
            
            caseDistributionEchartsOption.series = [ 
                {
                    name: map,
                    type: 'map',
                    mapType: map,
                    roam: false,
                    /* nameMap:{
                        'china':'中国'
                    }, */
                    label: {
                        normal:{
                            show:true,
                            textStyle:{
                                color:'#999',
                                fontSize:13
                            }  
                        },
                        emphasis: {
                            show: true,
                            textStyle:{
                                color:'#fff',
                                fontSize:13
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            areaColor: '#323c48',
                            borderColor: 'dodgerblue'
                        },
                        emphasis: {
                            areaColor: 'darkorange'
                        }
                    },
                    data:data
                }	
            ];
            //渲染地图
            echartMap.setOption(caseDistributionEchartsOption);
        }
        echartMap.resize();
        window.addEventListener('resize', function () {
            echartMap.resize();
        });
    }

}