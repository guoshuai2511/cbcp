<template>
  <div class="main-page-content" id="dev-content" style="z-index: 0">
    <div class="dev-page-content-left">
      <!-- 设备统计-->
      <div class="dev-statistics-container">
        <div class="container-title">
          <div class="container-title">
            <div class="container-title-word-tj">设备统计</div>
          </div>
        </div>
        <div class="dev-statistics-value-1">
          <span style="color: #18c0f1;font-size: 3.125vw;" id="statistics-all-dev" font-family="DigitalICG">0</span>
          台
        </div>
        <div class="dev-statistics-value-2">
          <span id="statistics-all-car">0</span>台车载，<span
            id="statistics-all-single">0</span>台单兵
        </div>
      </div>
      <!-- 工作中的设备-->
      <div class="dev-working-container">
        <div class="container-title" style="height: 30px; margin-top: 6px;">
          <div class="container-title-word-working-dev">工作中的设备</div>
        </div>
        <div class="dev-statistics-value-1">
          <span id="online-all-dev" :style="{fontSize:'3.25vm',color :'#18c0f1',fontFamily:'DigitalICG'}">0</span>台
        </div>
        <div class="dev-statistics-value-2">
          <span id="online-all-car">0</span>台车载，<span id="online-all-single">0</span>台单兵
        </div>
      </div>
      <!-- 设备使用率-->
      <div class="dev-usingrate-container">
        <div class="container-title">
          <div class="container-title-word-dev">设备使用率</div>
        </div>
        <div class="dev-usingrate-echarts" id="dev-usingrate-echarts-dom"></div>
        <div style="position: absolute; top: 70px; left: 0px;">
          <div class="dev-usingrate-selector">
            <select name="" id="companyid" v-model="select2" @change="clickSwitchTime($event)">
              <option v-for ='item in optionList' :key='item'>{{ item }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="dev-page-content-right">
      <!-- 设备分布-->
      <DevDistributionMap></DevDistributionMap>
    </div>
  </div>
</template>

<script>
import DevDistributionMap from "./DevDistributionMap";
import $axios from 'axios';
import $echarts from 'echarts';
import {formatDate} from '../../static/lib/timeFormat.js';

export default {
  components:{
    'DevDistributionMap':DevDistributionMap,
  },
  data (){ //注意：data即使不需要传数据，也必须return,否则会报错
    return {
        select2: '最近一周',
        optionList: ['全部', '最近一年', '最近一月', '最近一周'],
    }
  },
  created(){
    this.scaleSwicth()
  },
  mounted(){
    this.getDevWorkingHours(new Date(new Date().getTime() - 7 * 24 * 3600 * 1000), new Date());
    this.autoWidth();
  },
  methods: {
    scaleSwicth(val){
      if(val == 'pic-scale-enlarge'){
        $('#pic-scale-narrow').css({'background':'url(../../static/img/iconpic/eig-narrow.png)no-repeat','background-size':'36% 100%'});
        $('#pic-scale-narrow').text('缩小'); 
        $('#pic-scale-narrow').css('display','block');
        $('#pic-scale-enlarge').css('display','none');
        $('.dev-page-content-right').css({'width':'100%'});
        $('.dev-page-content-left').css({'display':'none'});
        $('.dev-distribution-container').css({'left':'15px','background':'url()'});
        $('#pic-scale-box').css('display','block');
        $('.dev-distribution-map').css({'left':0,'top':52,'margin-left':0,'margin-top':0,'width':'100.1%'})
        $('#pic-scale-box').css('width',$('.dev-distribution-map').width());
        $('.pic-scale').css({'top':'12px','left':'95%'});
        $('.dev-distribution-type').css({'top':'12px','right':'6%'});
      }else{
        $('#pic-scale-enlarge').css({'background':'url(../../static/img/iconpic/eig-enlarge.png)no-repeat','background-size':'36% 100%'});
        $('#pic-scale-enlarge').text('放大');
        $('#pic-scale-enlarge').css('display','block');
        $('#pic-scale-narrow').css('display','none');
        $('.dev-page-content-right').css({'width':'70%'});
        $('.dev-page-content-left').css({'display':'block'});
        $('.dev-distribution-container').css({'left':'0','background':'url(../../static/img/iconpic/dev-distribution-bg.png)','background-size':'100% 100%'});
        $('.dev-distribution-map').css({'left':20,'width': '96%'})
        $('#pic-scale-box').css('display','none');
        $('.pic-scale').css({'top':'2px','left':'90%'});
        $('.dev-distribution-type').css({'top':'2px','right':'11%'});
      }
    },
    //冒泡排序
    sortMap(mapData){
      let mapKeyTemp = [];
      for (let key of mapData.keys()) {
        mapKeyTemp.push(key);
      }
      for (var i = 0; i < mapKeyTemp.length - 1; i++) {
        for (var j = i + 1; j < mapKeyTemp.length; j++) {
          if (mapKeyTemp[i] > mapKeyTemp[j]) {
            var temp = mapKeyTemp[i];
            mapKeyTemp[i] = mapKeyTemp[j];
            mapKeyTemp[j] = temp;
          }
        }
      }
      let sortedMap = new Map();
      for (let i = 0; i < mapKeyTemp.length; i++) {
        sortedMap.set(mapKeyTemp[i], mapData.get(mapKeyTemp[i]));
      }
      return sortedMap;
    },
    //设备工作时长分布率时间除去null
    removeTimeNull(val){
      if(val==null){
        return null
      }else{
        return formatDate(val,"yyyy-MM-dd hh:mm:ss");
      }
    },
    //获取设备工作时长原始数据
    getDevWorkingHours(time1,time2){
      let startTime = this.removeTimeNull(time1);
      let endTime = this.removeTimeNull(time2);
      $axios.get('http://localhost:9090/static/devUseTime.json').then(resultS => {
        let result = resultS.data.analysisDataInfo;
        console.log(result);
        this.parsingDevUseTimeData(result);
      });
    },
    //对设备工作时长数据进行加工
    parsingDevUseTimeData(data){
      console.log(data)
      let minValue = 1;
      let maxValue = 1;
      let valueNumMap = new Map();
      for (let i = 0; i < data.length; i++) {
        let timeHour;
        let time = data[i].timeLength;
        if(time <= 1800 ){
            timeHour = 0.5;
        }
        if(1800 <time && time<= 3600 ){
            timeHour = 1;
        }
        if(3600 < time && time <= 5400 ){
            timeHour = 1.5;
        }
        if(5400 < time && time <= 7200 ){
            timeHour = 2;
        }
        if(7200 <time ){
            timeHour = 2.5;
        }
        if (minValue > timeHour) {
            minValue = timeHour
        }
        if (timeHour > maxValue) {
            maxValue = timeHour;
        }
        if (valueNumMap.get(timeHour) == null) {
            valueNumMap.set(timeHour, { time: timeHour, count: 1 });
        } else {
            let countTemp = valueNumMap.get(timeHour).count;
            countTemp = countTemp + 1;
            valueNumMap.set(timeHour, { time: timeHour, count: countTemp });
        }
        data[i].timeLength = timeHour;
      }
      valueNumMap = this.sortMap(valueNumMap);
      console.log(valueNumMap);
      let echartsData = [];
      if (valueNumMap.size <= 6) {
        valueNumMap.forEach((each) => {
          if( each.time == 0.5){
              echartsData.push({ value:  each.count, name:  '< 0.5小时' });
          }
          if( each.time == 1){
              echartsData.push({ value:  each.count, name:  '0.5~1小时' });
          }
          if( each.time == 1.5){
              echartsData.push({ value:  each.count, name:  '1~1.5小时' });
          }
          if( each.time == 2){
              echartsData.push({ value:  each.count, name:  '1.5~2小时' });
          }
          if( each.time == 2.5){
              echartsData.push({ value:  each.count, name:  '>2小时' });
          }
        }); 
      } else {
        let mapArr = [];
        for (let [key, value] of valueNumMap) {
          mapArr.push({ key: key, value: value });
        }
        let tempLast;
        let tempCount = 0;
        for (let i = 0; i < mapArr.length; i++) {
          if( mapArr[i].value.time == 0.5){
              echartsData.push({ value:  mapArr[i].value.count, name:  '< 0.5小时' });
          }
          if( mapArr[i].value.time == 1){
              echartsData.push({ value:  mapArr[i].value.count, name:  '0.5~1小时' });
          }
          if( mapArr[i].value.time == 1.5){
              echartsData.push({ value:  mapArr[i].value.count, name:  '1~1.5小时' });
          }
          if( mapArr[i].value.time == 2){
              echartsData.push({ value:  mapArr[i].value.count, name:  '1.5~2小时' });
          }
          if( mapArr[i].value.time == 2.5){
              echartsData.push({ value:  mapArr[i].value.count, name:  '>2小时' });
          }
        }
      }
      this.drawDevUseTimeEcharts(echartsData);
    },
    drawDevUseTimeEcharts(data){
      let devUsingrateEchartsDom = document.getElementById('dev-usingrate-echarts-dom');
      let devUsingrateChart = $echarts.init(devUsingrateEchartsDom, 'cbcp-theme');
      if (data.length == 0) {
          devUsingrateChart.dispose();
          $('#dev-usingrate-echarts-dom').html(`<div class="dev-usingrate-no-data">暂无数据</div>`);
      } else {
        let devUsingrateEchartsOption = {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend:{
            y:'85%',
            itemWidth: 18,
            itemHeight: 18,
            borderRadius:4,
            textStyle: {
              color: '#fff'
            },
          },
          series: [
            {
              name: '设备工作时长',
              type: 'pie',
              center: ['48%', '43%'],
              data: data,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
              color:[
                '#4572ff',
                '#ea4ba8',
                '#6901d2',
                '#fff',
                '#02eee2'
              ]
            }
          ]
        };
        devUsingrateChart.setOption(devUsingrateEchartsOption);
        devUsingrateChart.resize();
        window.addEventListener('resize', function () {
            devUsingrateChart.resize();
        });
      }
    },
    //点击切换
    clickSwitchTime(event){
      this.photoPosition = $(event.target).index();
      let id = this.photoPosition;
      if(id === 0){
        this.getDevWorkingHours(null, null);
      }else if(id === 1){

        let startTime = new Date(new Date().getTime() - 365 * 24 * 3600 * 1000);
        let endTime = new Date();
        this.getDevWorkingHours(startTime, endTime);
      }else if(id === 2){

        let startTime = new Date(new Date().getTime() - 30 * 24 * 3600 * 1000);
        let endTime = new Date();
        getDevWorkingHours(startTime, endTime);
      }else if(id === 3){

        let startTime = new Date(new Date().getTime() - 7 * 24 * 3600 * 1000);
        let endTime = new Date();
        getDevWorkingHours(startTime, endTime);
      };
      $('.drop-div').hide();
    },
    //切换时间的滑动效果
    autoWidth() {
      window.addEventListener('resize', function() {
       /*  $('.dev-usingrate-echarts').css('width',($('.dev-usingrate-container').width() ) * 0.8116);
        $('.dev-usingrate-echarts').css('height',$('.dev-usingrate-container').height() - 150);	 */
      });
    },
  }
}
</script>
<style>
  @font-face{
    font-family: DigitalICG;
    src: url(../../static/css/DigitalICG.ttf);
  }
  #statistics-all-dev{
    font-family: DigitalICG;
  }
  .dev-page-content-left{
    height: 100%;
    width: 30%;
    float: left;
  }
  .dev-page-content-right{
    height: 100%;
    width: 70%;
    float: right;
  }
  .dev-distribution-container {
    width: 99%;
    height: 99%;
    position: relative;
    top:0px;
    left: 0;
    background: url(../../static/img/iconpic/dev-distribution-bg.png);
    background-size: 100% 100%;
  }
  #pic-scale-enlarge{
    background: url(../../static/img/iconpic/eig-enlarge.png) no-repeat;
  }
  #pic-scale-narrow{
    display: none;
  }
</style>
<style scoped>
  @import "../../static/css/common.css"; 
  @import "../../static/css/home.css"; 
  @import "../../static/mdui-v0.4.0/css/mdui.min.css";
</style>