<template>
  <div class="Home" v-wechat-title="$route.meta.title">
    <div class="main-page-content" id="case-content" style="z-index: 1000">
      <!--下钻返回-->
      <div id="homeReturn"></div>
      <!--加载遮罩-->
		  <!--<div class="new-map-echarts-mask">
        <div class="new-map-loading">
          <img src="../../static/img/loading.gif" style="width:50px;"> <span>正在加载</span>
        </div>
      </div>-->
      <!-- 案件分布echarts-->
      <div :style="{height : '500px'}">
        <div id="main" :style="{width: '41.6%', height: '100%' ,left:'20%',top:'-10px', position: 'relative'}"></div>
      </div>
      <!-- 案件统计-->
		  <div class="case-statistics-content">
        <div class="case-statistics-value">
          <div>历史办案:</div>
          <span style="color: #18c0f1;font-size: 3.125vw;line-height:85px;" id="case-history-statistics-value"></span>
          <p style="font-size: 1.46vw">起</p>
        </div>
        <div class="new-message-casine-count">
          <div>办案中:</div>
          <span id="working-case-num" style="">0</span>
          <p style="font-size: 1.46vw;float:left;">起</p>
        </div>
        <div class="case-value-type-selector">
          <form>
            <div class="selector-label-item case-value-type-selector-item" id="selector-label-item-all">
              <label class="mdui-radio" id="get-all-case" v-on:click="showAllCase()">
                <input type="radio" name="group1" /> 
                <i class="mdui-radio-icon"></i>全部
              </label>
            </div>
            <div class="selector-label-item case-value-type-selector-item">
              <label class="mdui-radio" id="get-current-year-case"> 
                <input type="radio" name="group1" checked /> 
                <i class="mdui-radio-icon"></i>最近一年
              </label>
            </div>
            
            <div class="selector-label-item case-value-type-selector-item" id="selector-label-item-self">
              <label class="mdui-radio" id="get-cos-year-case" v-on:click="searchTimeSwitch()"> 
                <input type="radio" name="group1" /> 
                <i class="mdui-radio-icon"></i>自定义
              </label>
            </div>
            <div class="selector-label-item case-value-type-selector-item" style="display: none;height: 64px; padding-left: 30px;margin-bottom: 10px;" id="get-current-year-case-more">
                <div class="block">
                    <el-date-picker v-model="datePickerTime" type="monthrange" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </div>
                <div id="get-cos-year-case-search" v-on:click="searchSomeTimeEcharts()">查询</div>
            </div>
          </form>
        </div>
		  </div>
      <!-- 办案次数统计echarts-->
      <div :style="{width:'56%',height:'50%',position:'relative'}">
        <div class="container-title">
            <div class="container-title-word-ct">案件统计</div>
        </div>
        <div id="cse-pic1"></div>
        <div id="cse-pic2"></div>
        <div id="cse-pic3"></div>
        <div id="echarts-btn1-line" v-on:click="switchLine()"></div>
        <div id="echarts-btn1-lineBar" v-on:click="switchBar()"></div>
        <div class="case-statistics-echarts" id="case-statistics-echarts-dom" :style="{width: '100%', height: '90%' ,top:'-10px'}"></div>
        <div class="case-statistics-echarts" id="case-statistics-echarts-dom2" :style="{width: '100%', height: '90%',top:'-10px',display:'none'}"></div>
      </div>
      <div class="new-message-container">
        <div class="container-title">
          <div class="container-title-word" style="margin-top: 14px;">最新动态</div>
        </div>
        <div class="new-message-item-container">
          <div class="new-message-loading">
            <img src="../../static/img/loading.gif"> <span>正在加载</span>
          </div>
        </div>
	  </div>
      <!-- 排行榜-->
      <div class="rank-list-container">
        <div id="rlc-pic1"></div>
        <div id="rlc-pic2"></div>
        <div id="rlc-pic3"></div>
        <div id="rlc-pic4"></div>
        <div id="rlc-pic5"></div>
        <div class="container-title">
          <div class="container-title-word" style="top: 24px;left: 16px;">累计排行榜Top10</div>
        </div>
        <rankListTable></rankListTable>
      </div>
    </div>
    <HomeDevPage></HomeDevPage>
    <!-- 导航条-->
    <div class="title-nav">
      <div class="title-nav-item active case-content-title-nav-item" data-nav-id="case-content" @click="homePageSwitch('case-content')">
        <div class="title-nav-item-icon" style="background-position: 0 0;"></div>
        <div class="title-nav-item-word">案件</div>
      </div>
      <div class="title-nav-item dev-content-title-nav-item" data-nav-id="dev-content" @click="homePageSwitch('dev-content')">
        <div class="title-nav-item-icon-two" style="background-position:0px 0px;">
        </div>
        <div class="title-nav-item-word">设备</div>
      </div>
    </div>
  </div>
</template>
<script>
    import headerTOP from './Header';
    import HomeDevPage from './HomeDev';
    import $axios from 'axios';
    import $echarts from 'echarts';
    import cityMap from '../../static/citymap.js';
    import {formatDate} from '../../static/lib/timeFormat.js'
    let queryCaseStatisticsType = 2;
    let queryStartTime = new Date(new Date().getTime() - 365 * 24 * 3600 * 1000);
    let queryEndTime = new Date();
    let queryAreaCode = null;
    let queryAreaName = null;
    let queryGrade = 0;
    let echartMap;
    let initMapFlag = false;
    let dataValueCache;
    let mergeData=[];
    let temp = {};
    import rankListTable from './RankListTable';
    //初始化绘制全国地图配置
    let caseDistributionEchartsOption = {
        title : {
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
        },
        formatter: function (e) {
            if (!e.value) {
                return `${e.name}：<br>案件数：${0}件`;
            } else {
                return `${e.name}：<br>案件数：${e.value}件`;
            } 
        },
        visualMap: {
            min: 0,
            max: 1000,
            left: '10%',
            bottom: '7.02%',
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
    export default {
        components:{
            'rankListTable':rankListTable,
            'headerTOP':headerTOP,
            'HomeDevPage':HomeDevPage,
        },
        data (){ //注意：data即使不需要传数据，也必须return,否则会报错
            return { 
                title:'总览',
                startTimeOptions: {}, //开始日期设置
                endTimeOptions: {}, //结束日期设置
                starttime: '', //开始日期model
                endtime: '',//结束日期model
                pickerOptions: { //element-UI的date-picker组件设置
                    shortcuts: [{
                        text: '本月',
                        onClick(picker) {
                        picker.$emit('pick', [new Date(), new Date()]);
                        }
                    }, {
                        text: '今年至今',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date(new Date().getFullYear(), 0);
                        picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近六个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setMonth(start.getMonth() - 6);
                        picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                datePickerTime: '',//获取input框中的时间
            }
        },
        mounted(){
            this.fillDate();
            this.getNewMessageDate();
        },
        methods: {
            homePageSwitch(val){
            if(val == 'case-content'){
                $('#dev-content').css('z-index', 0);
                $('#'+val).css({'z-index':1000});
                $('.case-content-title-nav-item').css({'background':'url(../../static/img/iconpic/nav-unchecked.png)','background-size':'100% 100%'});
                $('.dev-content-title-nav-item').css({'background':'url(../../static/img/iconpic/nav-checked.png)','background-size':'100% 100%'});
                $('.title-nav-item-icon').css({'background':'url(../../static/img/iconpic/nav-case.png)','background-size':'100% 100%'});
                $('.title-nav-item-icon-two').css({'background':'url(../../static/img/iconpic/nav-dev-un.png)','background-size':'100% 100%'});
            }else{
                $('#case-content').css('z-index', 0);
                $('#'+val).css('z-index', 1000);
                $('.dev-content-title-nav-item').css({'background':'url(../../static/img/iconpic/nav-unchecked.png)','background-size':'100% 100%'});
                $('.case-content-title-nav-item').css({'background':'url(../../static/img/iconpic/nav-checked.png)','background-size':'100% 100%'});
                $('.title-nav-item-icon').css({'background':'url(../../static/img/iconpic/nav-case-un.png)','background-size':'100% 100%'});
                $('.title-nav-item-icon-two').css({'background':'url(../../static/img/iconpic/nav-dev.png)','background-size':'100% 100%'});
            }
            },
            //处理数据
            parsingData(data, areaData, startTime, endTime, caseStatisticsType, grade, clickedAreaName) {
                console.log(data);
                let area = []; 
                let maxValue = 0;
                let dataValue = [];
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
                this.draw(dataValue, maxValue,areaData, startTime, endTime, caseStatisticsType,grade,clickedAreaName);
            },
            merge(grade){
                temp = {};
                mergeData = [];
                if(grade==0){
                    for(let i in dataValueCache) {
                        let key= dataValueCache[i].name;
                        if(temp[key]) {
                            temp[key].name = temp[key].name ;
                            temp[key].value = temp[key].value+ dataValueCache[i].value;
                            
                        } else {
                            temp[key] = {};
                            temp[key].name = dataValueCache[i].name;
                            temp[key].value = dataValueCache[i].value;
                        }
                    }
                } else if(grade==1){
                    for(let i in dataValueCache) {
                        let name = dataValueCache[i].name;
                        //直辖市里市辖区级市辖县的数据合并
                        if( name == "市辖区"|| name == '县'){
                            let district = dataValueCache[i].district;
                            let countValue = dataValueCache[i].value;
                            if(temp[district]) {
                                temp[district].name = temp[district].name ;
                                temp[district].value = temp[district].value + countValue; 

                            }else{
                                temp[district] = {};
                                temp[district].name = district;
                                temp[district].value = countValue;
                            }
                        }else{
                            //省份城市数据合并
                            let city = dataValueCache[i].name;
                            let countValue = dataValueCache[i].value;
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
                    for(let i in dataValueCache) {
                        let city= dataValueCache[i].name;
                        if(temp[city]) {
                            temp[city].name = temp[city].name ;
                            temp[kcity].value = temp[kcity].value+ dataValueCache[i].value; 
                        }else{
                            temp[city] = {};
                            temp[city].name = dataValueCache[i].name;
                            temp[city].value = dataValueCache[i].value;
                        }
                    }
                };
                for(let k in temp){
                    mergeData.push(temp[k])
                }
            },
            //画图
            draw(dataValue, maxValue,area, startTime, endTime, caseStatisticsType ,grade ,clickedAreaName) {
                dataValueCache = dataValue;
                if(echartMap) {
                    echartMap.clear();
                    initMapFlag = false;
                }else {
                    initMapFlag = true;
                }
                echartMap = $echarts.init(document.getElementById('main'));
                //数据合并
                this.merge(grade)
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
                let _self = this;
                //绘制全国地图
                if(grade==0){
                    this.merge(grade);
                    $axios.get('../../../static/echarts-map/map/china.json').then(function(res){
                        let data = res.data;
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
                        _self.mapdata = d;
                        //注册地图
                        $echarts.registerMap('china', data);
                        //绘制地图
                        _self.renderMap('china',d);
                    });
                }else if(grade==1) {
                    //绘制省级地图
                        this.merge(grade);
                        //如果点击的是34个省、市、自治区，绘制选中地区的二级地图
                        $axios.get('../../../static/echarts-map/map/province/'+ provinces[clickedAreaName] +'.json').then(function(res){
                            let data = res.data;
                            $echarts.registerMap(clickedAreaName, data);
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
                                for(let j = 0; i < mergeData.length; j++) {
                                    if(mergeData[j].name.indexOf(name) > -1) {
                                        d.push({
                                            name:name,
                                            value:mergeData[j].value,
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
                            _self.renderMap(clickedAreaName,d);
                            //add by guoshuai 只有二级下钻，返回按钮
                            $('#homeReturn').show();
                        });

                } else if(grade==2) {
                    //绘制市级地图
                    this.merge(grade);  
                    //显示县级地图
                    $axios.get('../../../static/echarts-map/map/city/'+ cityMap[clickedAreaName] +'.json').then(function(res){
                        let data = res.data;
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
                        _self.renderMap(clickedAreaName,d);
                    });
                    //显示县级地图同时出现返回按钮 add by guoshuai
                    $('#homeReturn').show();		
                }
                if(initMapFlag) {
                    //点击返回按钮 add by guoshuai
                    $(document).on('click','#homeReturn',function(){
                        queryGrade = 0;
                        _self.fillData();
                        $('#homeReturn').hide();
                    });
                    //地图点击事件
                    echartMap.on('click', function (params) {
                        console.log( params );
                        queryAreaCode = params.data.areaCode;
                        queryAreaName = params.name;
                        queryGrade = params.data.grade;
                        if(queryGrade < 3){
                            _self.fillDate();
                        }
                    });
                }
                
                echartMap.resize();
                window.addEventListener('resize', function () {
                    echartMap.resize();
                });
            },
            renderMap(map,data){
                caseDistributionEchartsOption.title.subtext = '';
                caseDistributionEchartsOption.series = [ 
                    {
                        name: '',
                        type: 'map',
                        mapType: map,
                        roam: false,
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
            },
            transform: function(val){
                if(val == null){
                    return val
                }else{
                    let value = val.toString();
                    if(value.indexOf("-")!=-1){
                        return val
                    }else{
                        return formatDate(val,"yyyy-MM-dd hh:mm:ss");
                    }
                }
                
            },
            getCaseStatistics(data, clickedAreaName, caseStatisticsType) {
                $('.new-map-echarts-mask').css('display', 'block');
                $('.case-distribution-echarts').css('visibility','hidden');
                let that = this;
                //query(data, 'home/getCaseInfoStatistics', 'POST').then((result) => {
                $axios.get('http://localhost:9090/static/caseInfoStatistics.json').then(resultS => {
                    $('.new-map-echarts-mask').css('display', 'none');
                    $('.case-distribution-echarts').css('visibility','visible');
                    let result = resultS.data;
                    console.log(result);
                    let grade = 0;
                    if(data.grade) {
                        grade = data.grade;
                    }
                    $('#case-history-statistics-value').html(result.dataMap.totalCaseInfoNum.totalNum); // 历史办案数量
                    this.parsingData(result.dataMap.areaCaseInfoStatistics, result.dataMap.areaCodesInfo, data.startTime, data.endTime, caseStatisticsType, grade, clickedAreaName); // 地图显示
                    this.lineParsingData(caseStatisticsType, result.dataMap.monthCaseInfoStatistics); // 折线图统计
                });
            },
            //fillDate
            fillDate() {
                if(queryGrade != 0) {
                    let queryParam = {"areaCode" :  queryAreaCode, "grade" : queryGrade, "startTime" : this.transform(queryStartTime), "endTime" : this.transform(queryEndTime)};
                    this.getCaseStatistics(queryParam, queryAreaName, queryCaseStatisticsType);
                }else {
                    let queryParam = {"startTime" : this.transform(queryStartTime), "endTime" : this.transform(queryEndTime)};
                    this.getCaseStatistics(queryParam, "", queryCaseStatisticsType);
                }
            },
            lineParsingData(type,data) {
                $('#echarts-btn1-line').css('display','block');
                $('#echarts-btn1-lineBar').css('display','block');
                function add0(val) {
                if (val >= 10) {
                    return '' + val;
                } else {
                    return '0' + val;
                }
                }
                let dataValueLine = { name: [], value: [], markPoint: [] };
                let endTime =  new Date();
                let startTime = new Date(new Date(endTime).getTime() - 365 * 24 * 3600 * 1000);
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
                    dataValueLine.name.push(year + '-' + add0(month));
                    dataValueLine.value.push(0);
                    dataValueLine.markPoint.push({ name: year + '-' + add0(month), coord: [i, 0], value: 0, });
                }
                }else{
                for (let i = 0; i < 12; i++) {
                    dataValueLine.name.push(year + '-' + add0(month));
                    dataValueLine.value.push(0);
                    dataValueLine.markPoint.push({ name: year + '-' + add0(month), coord: [i, 0], value: 0, });
                    if (month == 12) {
                        month = 1;
                        year = year + 1;
                    } else {
                        month = month + 1;
                    }
                }
                }
                for (let i = 0; i < 12; i++) {
                for (let j = 0; j < data.length; j++) {
                    if (dataValueLine.name[i] == data[j].month) {
                        dataValueLine.value[i] = data[j].num;
                        dataValueLine.markPoint[i].coord[1] = data[j].num;
                        dataValueLine.markPoint[i].value = data[j].num;
                        break;
                    }
                }
                };
                this.$options.methods.drawLine(dataValueLine);
                this.$options.methods.drawBar(dataValueLine);
                this.$options.methods.drawDefaultLine(dataValueLine);
            },
            drawLine(data){
            $('#case-statistics-echarts-dom').css('display','block');
            $('#case-statistics-echarts-dom2').css('display','none');
            // 基于准备好的dom，初始化echarts实例
            let caseStatisticsChart = $echarts.init(document.getElementById('case-statistics-echarts-dom'),'cbcp-theme');
            // 绘制图表
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
                name:'案件数/件',
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
                        color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [{
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
                    color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
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
                },
                ]
            };
            caseStatisticsChart.setOption(caseStatisticsEchartsOption);
            caseStatisticsChart.resize();
            window.addEventListener('resize', function () {
                caseStatisticsChart.resize();
            });
            },
            drawBar(data){
            $('#case-statistics-echarts-dom').css('display','none');
            $('#case-statistics-echarts-dom2').css('display','block');
            // 基于准备好的dom，初始化echarts实例
            let caseStatisticsChart = $echarts.init(document.getElementById('case-statistics-echarts-dom2'),'cbcp-theme');
            // 绘制图表
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
                    splitLine:{ //添加网格线
                    show: true,
                    lineStyle: {
                        type: 'dashed',
                        color: '#666666',
                    }
                    },
                    name:'时间/月',
                    nameTextStyle:{
                        color:"#dd45e0"  
                    },
        
                },
                yAxis: {
                type: 'value',
                name:'案件数/件',
                nameTextStyle:{
                    color:"#666666"  
                },
                splitLine:{ //添加网格线
                    show: true,
                    lineStyle: {
                    type: 'dashed',
                    color: '#666666',
                    }
                },
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
                        show:true,
                        position: 'top',
                        textStyle:{
                            color:"#dd45e0",
                            fontSize: 16,
                            fontWeight: 600
                        }
                        },
                        color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [{
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
                    color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
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
                },
                ]
            };
            caseStatisticsChart.setOption(caseStatisticsEchartsOption);
            caseStatisticsChart.resize();
            window.addEventListener('resize', function () {
                caseStatisticsChart.resize();
            });
            },
            drawDefaultLine(data){
            /* 办案次数统计echarts*/
                $('#case-statistics-echarts-dom').css('display','block');
                $('#case-statistics-echarts-dom2').css('display','none');
                let caseStatisticsEchartsDom = document.getElementById('case-statistics-echarts-dom');
                let caseStatisticsChart = $echarts.init(caseStatisticsEchartsDom, 'cbcp-theme');
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
                        top:'40%',
                        bottom:'40px'
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
                        name:'案件数/件',
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
                            smooth: true,
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
                                    color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [{
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
                                color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
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
                        },
                    ]
                };
                caseStatisticsChart.setOption(caseStatisticsEchartsOption);
                caseStatisticsChart.resize();
                window.addEventListener('resize', function () {
                    caseStatisticsChart.resize();
                });
            },
            switchBar(){
                        $('#case-statistics-echarts-dom').css('display','none');
                        $('#case-statistics-echarts-dom2').css('display','block');
                        $('#echarts-btn1-line').css('background','url(../../static/img/iconpic/line-uncheck.png)');
                        $('#echarts-btn1-lineBar').css('background','url(../../static/img/iconpic/bar-check.png)');

                },
            switchLine(){
            $('#case-statistics-echarts-dom').css('display','block');
            $('#case-statistics-echarts-dom2').css('display','none');
            $('#echarts-btn1-line').css('background','url(../../static/img/iconpic/line-check.png)');
            $('#echarts-btn1-lineBar').css('background','url(../../static/img/iconpic/bar-uncheck.png)');
            },
            //点击产生全部的案件图形，包括全国地图和折线图
            showAllCase () { // 全部
            if(queryCaseStatisticsType != 1) {
                queryCaseStatisticsType = 1;
                this.fillDate(null, null, null, queryCaseStatisticsType);
                let text =$('#get-all-case').text();
                $('#db2-test').text(text);
                $('.case-value-type-selector form').css('width','100%')
            }
            $('#get-current-year-case-more').hide();
            $('#get-cos-year-case-search').hide();
            },
            //打开时间选择弹框
            searchTimeSwitch(){
            $('#get-cos-year-case-search').show();
            $('#get-current-year-case-more').show();
            $('#query-time-start-timeDev').val('');
            $('#query-time-end-timeDev').val('');
            },
            //时间段选择
            searchSomeTimeEcharts(){
            queryCaseStatisticsType = 3;
            let startTime;
            let endTime;
            let oneDay=1000*60*60*8;
            if($('#query-time-start-timeDev').val()==''){
                startTime=null;
            }else{
                let start = new Date (new Date($('#query-time-start-timeDev').val()).getTime()-oneDay);
                startTime = (start).Format("yyyy-MM-dd hh:mm:ss");
            }
            if($('#query-time-end-timeDev').val()==''){
                endTime=null;
            }else{
                let end = new Date($('#query-time-end-timeDev').val());
                let month = end.getMonth()+1;
                let nextMonthFirstDay=new Date(end.getFullYear(),month,1);
                endTime = (new Date(nextMonthFirstDay-1)).Format("yyyy-MM-dd hh:mm:ss");
            }
            
            if(startTime != queryStartTime || endTime != queryEndTime) {
                queryStartTime = startTime;
                queryEndTime = endTime;
                this.fillDate();
            }
            },
            //获取最新动态数据
            getNewMessageDate(time1,time2){
            $axios.get('http://localhost:9090/static/message.json').then(resultS => {
                let result = resultS.data;
                console.log(result);
                this.parsingMessageData(result);
            });
            },
            parsingMessageData(data){
                if (data == null || data.length == 0) {
                    $('#working-case-num').html(0);
                    $('.new-message-item-container').html('<div class="new-message-none">暂无消息</div>');
                } else {
                    let htmlValue = '';
                    let workingNum = 0;
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].status == 1) {
                            workingNum = workingNum + 1;
                        }
                        htmlValue = htmlValue + `
                            <div class="new-message-item">
                                <div class="message-user-pic">
                                    <!-- delete by guoshuai start 2018-9-27
                                    <img src="./img/message_user_pic.png">
                                    delete by guoshuai end 2018-9-27-->
                                </div>
                                <div class="new-message-content">
                                    <div class="new-message-word-1">
                                        ${formatDate(new Date(data[i].startTime),'yyyy-MM-dd hh:mm')} <span style="color: /*add by guoshuai start 2018-9-27*/#23b5e8;/*add by guoshuai end 2018-9-27*//*delete by guoshua start 2018-9-27${this.getStatus(data[i].status).color}delete by guoshua end 2018-9-27*/">[${this.getContinousTime(data[i].status, data[i].startTime, data[i].endTime)}]</span>
                                    </div>
                                    <div class="new-message-word-2">
                                        <div title="${data[i].status == 1 ? this.getUsers(data[i].userMap) : this.getUsers(data[i].offlineUserMap)}" class="new-message-name-v">
                                            ${data[i].status == 1 ? this.getUsers(data[i].userMap) : this.getUsers(data[i].offlineUserMap)}
                                        </div>
                                        <div  class="new-message-area-v">
                                            <div title="${this.removeNull(data[i].areaFullName)}" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;margin-left:12px;" class="new-message-areaname-v">${this.removeNull(data[i].areaFullName)}</div>
                                            <span style="color: ${this.getStatus(data[i].status).color};float:right;">${this.getStatus(data[i].status).content}</span>
                                        </div>
                                    </div>
                                    <div></div>
                                    <div class="${this.getStatus(data[i].status).clazz} mdui-ripple" data-url="${this.getStatus(data[i].status).url}" data-case-serial="${data[i].caseSerial}"></div>
                                </div>
                            </div>
                        `;
                    }
                    $('#working-case-num').html(workingNum);
                    $('.new-message-item-container').html(htmlValue);
                }
            },
            getUsers(map) {
                let value = '';
                let userMap = new Map();
                for (let key in map) {
                    if (userMap.get(map[key].userName) == null) {
                        userMap.set(map[key].userName, { name: map[key].userName, seq: map[key].seq });
                    } else {
                        if (userMap.get(map[key].userName).seq < map[key].seq) {
                            userMap.set(map[key].userName, { name: map[key].userName, seq: map[key].seq });
                        }
                    }
                }
                userMap.forEach((each) => {
                    value = value + each.name + '/' + each.seq + '，';
                });
                return value.substring(0, value.length - 1);
            },
            getContinousTime(status, startTime, endTime) {
                let second;
                if (status == 1) {
                    second = new Date().getTime() - startTime;
                } else {
                    second = endTime - startTime;
                }
                let minutes = (second / 1000) / 60;
                if (minutes < 60) {
                    return (parseInt(minutes) <= 0 ? 1 : parseInt(minutes)) + 'min';
                } else {
                    let hours = parseInt(minutes / 60);
                    return '' + hours + 'h ' + parseInt(minutes - 60 * hours) + 'min';
                }
            },
            getStatus(status) {
                let color;
                let content;
                let clazz;
                let url;
                if (status == 1) {
                    color = '#23dcb3';
                    content = '进行中';
                    clazz = 'new-message-play-btn';
                    url = 'getRealTimeCombatInfo';
                } else {
                    color = '#ff6700';
                    content = '已结束';
                    clazz = 'new-message-replay-btn';
                    url = 'getHistoryCombatInfo';
                }
                return {
                    color: color,
                    content: content,
                    clazz: clazz,
                    url: url,
                };
            },
            removeNull(tmp) {
                if (tmp && typeof(tmp) != "undefined") {
                    return tmp;
                } else {
                    return '';
                }
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css">
    @import "../../static/css/common.css"; 
    @import "../../static/css/home.css"; 
    @import "../../static/mdui-v0.4.0/css/mdui.min.css";
    @import "../../static/css/cover.css"; 
</style>
