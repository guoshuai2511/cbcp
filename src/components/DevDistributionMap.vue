<template>
  <div class="dev-distribution-container">
    <div id="pic-heng"></div>
    <div id="pic-shu"></div>
    <div class="pic-scale" id="pic-scale-enlarge" @click="scaleSwicth('pic-scale-enlarge')">放大</div>
    <div class="pic-scale" id="pic-scale-narrow" @click="scaleSwicth('pic-scale-narrow')">放大</div>
    <div class="container-title">
      <div class="container-title-word-df">设备分布</div>
      <div class="dev-distribution-type" id="home-radio">
        <form>
          <label class="mdui-radio dev-distribution-switch" data-type="1" @click="onlineOrofflineDev(1)"
            style="font-weight: 100;padding-left: 0;
              background: url(../../static/img/iconpic/online.png) no-repeat;
              background-size: 100% 90%;
              color:#fff;
              " id="online-radio">在线
          </label> 
          <label class="mdui-radio dev-distribution-switch" data-type="0" @click="onlineOrofflineDev(0)"
            style="font-weight: 100;padding-left: 0;
                background: url(../../static/img/iconpic/offline.png) no-repeat;
              background-size: 100% 90%;
              color:#ccc;
              " id="offline-radio">离线
          </label>
        </form>
      </div>
    </div>
    <!--遮罩-->
    <div id="pic-scale-box"></div>
    <div class="dev-distribution-map">
      <div id="allmap" class="allmap" :style="{width: '100%', height: '100%'}">
      </div>
    </div>
    <div class="loading_data" style="display:none">
        <img class="loading_gif_devDistribution" src="../../static/img/loading.gif">
        <span class="loading_word_devDistribution">正在加载数据...</span>
    </div>
  </div>
  
</template>

<script type="text/javascript">
  /* import $ from 'jquery'; */
  import $axios from 'axios';
  import { CarDivOverlayConstructor } from '../../static/lib/CarDivOverlayConstructor.js';
  import { SingleDivOverlayConstructor } from '../../static/lib/SingleDivOverlayConstructor.js';
  let map;
  /* import BMap from 'BMap'; */
  /* 设备信息所对应的Map集合 */
  let devInfoMap = new Map();

  /* 设备覆盖物所对应的Map集合 */
  let devDivMap = new Map();
  /* 工作中小车的数组 */
  let carMarkerPointsWorking = [];

  /* 工作中小车的点聚合对象 */
  let carMarkerClustererWorking;

  /* 未工作小车的数组 */
  let carMarkerPointsUnwork = [];

  /* 未工作小车的点聚合对象 */
  let carMarkerClustererUnwork;

  /* 地图设备分布显示类型*/
  let devDistributionType = 1;

  /* 地图设备分布数据缓存*/
  let devDistributionListCache;
  export default { //这里需要将模块引出，可在其他地方使用
    data (){ //注意：data即使不需要传数据，也必须return,否则会报错
      return {  
        markers:[],
        show: true,
      }
    },
    methods:{
      ready() {
        var Bmap = new BMap.Map('allmap',{enableMapClick:false});
        map = Bmap;
        var point = new BMap.Point(107.075796, 34.959684);
        Bmap.centerAndZoom(point, 6);
        Bmap.addControl(new BMap.MapTypeControl());
        Bmap.enableScrollWheelZoom(true);
        Bmap.enableDoubleClickZoom(true);
        /* 初始化点聚合*/
        carMarkerClustererWorking = new BMapLib.MarkerClusterer(map, {
          markers: carMarkerPointsWorking,
          styles: [{
                url: '../../static/img/workMarkerClusterer.png', // 工作中的设备点聚合图标
                size: new BMap.Size(53, 53)
          }],
          isAverageCenter: true,
        });
        carMarkerClustererUnwork = new BMapLib.MarkerClusterer(map, {
          markers: carMarkerPointsUnwork,
          styles: [{
                url: '../../static/img/unworkMarkerClusterer.png', // 未工作的设备点聚合图标
                size: new BMap.Size(53, 53)
          }],
          isAverageCenter: true,
        });
        Bmap.addEventListener("zoomend", function(){
            $('.loading_data').css('display','none');
            devDivMap.forEach((eachCarDiv) => {
                if (eachCarDiv.devIcon.map == null) {
                    eachCarDiv.devCover.hide();
                } else {
                    eachCarDiv.devCover.show();
                }
            });
        });
        Bmap.addEventListener("dragend",function(){
            $('.loading_data').css('display','none');
            devDivMap.forEach((eachCarDiv) => {
                if (eachCarDiv.devIcon.map == null) {
                    eachCarDiv.devCover.hide();
                } else {
                    eachCarDiv.devCover.show();
                }
            });
        });
      },
      parsingDevInfo(devBaseInfo) {
        /* 需要重绘制的设备数组*/
        let devBaseInfoRefresh = [];
        /* 将接收到的信息通过key-value存储*/
        for (let i = 0, len = devBaseInfo.length; i < len; i++) {
            if (devInfoMap.get(devBaseInfo[i].devCode) != null) {
                /* 如果map集合中的key含该设备编号，则保存其‘设备详细信息面板是否开启’的信息，若不包含，则设置默认值false */
                devBaseInfo[i].isInfoPanelOpen = devInfoMap.get(devBaseInfo[i].devCode).isInfoPanelOpen;
                /* 上一次的GPS坐标*/
                devBaseInfo[i].lastGpsInfo = devInfoMap.get(devBaseInfo[i].devCode).lastGpsInfo;
                /* 上一次的工作状态*/
                devBaseInfo[i].lastStatus = devInfoMap.get(devBaseInfo[i].devCode).lastStatus;
                if (devBaseInfo[i].lastGpsInfo.lng == devBaseInfo[i].gpsInfo.lng && devBaseInfo[i].lastGpsInfo.lat == devBaseInfo[i].gpsInfo.lat && devBaseInfo[i].lastStatus == devBaseInfo[i].status) {
                    devBaseInfo[i].shouldRefresh = false;
                } else {
                    devBaseInfo[i].shouldRefresh = true;
                    devBaseInfoRefresh.push(devBaseInfo[i]);
                }
            } else {
                devBaseInfo[i].isInfoPanelOpen = false;
                devBaseInfo[i].lastGpsInfo = { lng: '0', lat: '0' }; 
                devBaseInfo[i].lastStatus = 1;
                devBaseInfo[i].shouldRefresh = true;
                devBaseInfoRefresh.push(devBaseInfo[i]);
            }
            devInfoMap.set(devBaseInfo[i].devCode, devBaseInfo[i]);
        }
        this.getDevBaiduPoint(devBaseInfoRefresh);
      },
       /* 坐标转换离线方法（异步）*/
      getBaiduPointLocationPromise(pointArray) {
        return new Promise((resolve) => {
            let point = this.getBaiduPointLocation(pointArray);
            resolve(point);
        });

      },
      /* 坐标转换离线方法（同步）*/
      getBaiduPointLocation(pointArray) {

        // 圆周率
        let pi = Math.PI;
        // 卫星椭球坐标投影到平面坐标系的投影因子
        let a = 6378245.0;
        // 椭球的偏心率
        let ee = 0.00669342162296594323;
        // 圆周率转换量
        let x_pi = pi * 3000.0 / 180.0;

        function wgs2bd(lat, lng) {
            let _wgs2gcj = wgs2gcj(lat, lng);
            let _gcj2bd = gcj2bd(_wgs2gcj[0], _wgs2gcj[1]);
            return _gcj2bd;
        }

        /**
         * GCJ坐标转百度坐标
         * @param lat
         * @param lng
         * @return
         */
        function gcj2bd(lat, lng) {
            let x = lng, y = lat;
            let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
            let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
            let bd_lng = z * Math.cos(theta) + 0.0065;
            let bd_lat = z * Math.sin(theta) + 0.006;
            return [bd_lat, bd_lng];
        }

        /**
         * WGS坐标转GCJ坐标
         * @param lat
         * @param lng
         * @return
         */
        function wgs2gcj(lat, lng) {
            let dLat = transformLat(lng - 105.0, lat - 35.0);
            let dLng = transformLng(lng - 105.0, lat - 35.0);
            let radLat = lat / 180.0 * pi;
            let magic = Math.sin(radLat);
            magic = 1 - ee * magic * magic;
            let sqrtMagic = Math.sqrt(magic);
            dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
            dLng = (dLng * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
            let mgLat = lat + dLat;
            let mgLng = lng + dLng
            let loc = [mgLat, mgLng];
            return loc;
        }

        function transformLat(lat, lng) {
            let ret = -100.0 + 2.0 * lat + 3.0 * lng + 0.2 * lng * lng + 0.1 * lat * lng + 0.2 * Math.sqrt(Math.abs(lat));
            ret += (20.0 * Math.sin(6.0 * lat * pi) + 20.0 * Math.sin(2.0 * lat * pi)) * 2.0 / 3.0;
            ret += (20.0 * Math.sin(lng * pi) + 40.0 * Math.sin(lng / 3.0 * pi)) * 2.0 / 3.0;
            ret += (160.0 * Math.sin(lng / 12.0 * pi) + 320 * Math.sin(lng * pi / 30.0)) * 2.0 / 3.0;
            return ret;
        }

        function transformLng(lat, lng) {
            let ret = 300.0 + lat + 2.0 * lng + 0.1 * lat * lat + 0.1 * lat * lng + 0.1 * Math.sqrt(Math.abs(lat));
            ret += (20.0 * Math.sin(6.0 * lat * pi) + 20.0 * Math.sin(2.0 * lat * pi)) * 2.0 / 3.0;
            ret += (20.0 * Math.sin(lat * pi) + 40.0 * Math.sin(lat / 3.0 * pi)) * 2.0 / 3.0;
            ret += (150.0 * Math.sin(lat / 12.0 * pi) + 300.0 * Math.sin(lat / 30.0 * pi)) * 2.0 / 3.0;
            return ret;
        }

        let point = [];
        for (let i = 0; i < pointArray.length; i++) {
            let arr = wgs2bd(Number(pointArray[i][1]), Number(pointArray[i][0]));
            point.push({ lng: arr[1], lat: arr[0] });
        }
        return point;

      },
      /* GPS坐标转百度坐标 */
      getDevBaiduPoint(devBaseInfo) {
          let pointArray = [];
          for (let i = 0, len = devBaseInfo.length; i < len; i++) {
              let point = [devBaseInfo[i].gpsInfo.lng, devBaseInfo[i].gpsInfo.lat];
              pointArray.push(point);
          }

          /* 分割pointArray */
          let splitPointArray = [];
          let eachPointGroup = [];
          let index = 0;
          for (let i = 0, len = pointArray.length; i < len; i++) {
              eachPointGroup.push(pointArray[i]);
              index = index + 1;
              if (eachPointGroup.length == 100) {
                  splitPointArray.push(eachPointGroup);
                  eachPointGroup = [];
                  index = 0;
              }
              if (i == pointArray.length - 1) {
                  splitPointArray.push(eachPointGroup);
              }
          }
          for (let i = 0; i < splitPointArray.length; i++) {
              this.getBaiduPointLocationPromise(splitPointArray[i]).then((result) => {
                  let drawArr = [];
                  for (let j = 0; j < result.length; j++) {
                      devBaseInfo[j + i * 100].baiduGpsInfo = { lng: result[j].lng, lat: result[j].lat };
                      drawArr.push(devBaseInfo[j + i * 100]);
                  }
                  this.drawDev(drawArr);
              });
          }
      },

      /*在map中存储设备信息，并执行绘制方法*/
      drawDev(devBaseInfo) {
          let drawMap = new Map();
          for (let i = 0, len = devBaseInfo.length; i < len; i++) {
              devInfoMap.set(devBaseInfo[i].devCode, devBaseInfo[i]);
              drawMap.set(devBaseInfo[i].devCode, devBaseInfo[i]);
          }
          this.drawDevCover(drawMap);
      },
      drawDevCover(devInfo) {
        /* 缓存*/
        let devDivCacheMap = new Map();
        /* 绘制所有设备 */
        devInfo.forEach((eachDevInfo) => {
            /* 获取设备设备编号 */
            let devCode = eachDevInfo.devCode;
            /* 移除上一次的当前设备 */
            if (devDivMap.get(devCode) != null) {
                map.removeOverlay(devDivMap.get(devCode).devCover);
                map.removeOverlay(devDivMap.get(devCode).devIcon);
            }
            /* 获取设备坐标 */
            let lng = eachDevInfo.baiduGpsInfo.lng; // 114
            let lat = eachDevInfo.baiduGpsInfo.lat; // 30
            let baiduPoint = new BMap.Point(lng, lat); // 百度地图坐标
            /* 获取设备是否工作 */
            let status = eachDevInfo.status;
            /* 在地图上显示设备 */
            let cover;
            let devClass;
            switch (eachDevInfo.devType) {
                case 1:
                    devClass = 'car';
                    cover = new CarDivOverlayConstructor(baiduPoint, devCode); // 调用百度地图API，绘制设备
                    map.addOverlay(cover);
                    //cover.hide();
                    break;
                case 2:
                    devClass = 'single';
                    cover = new SingleDivOverlayConstructor(baiduPoint, devCode); // 调用百度地图API，绘制设备
                    map.addOverlay(cover);
                    //cover.hide();
                    break;
                /**add by gaochao start */
                case 3:
                    devClass = 'single';
                    cover = new SingleOutSideOverlayConstructor(baiduPoint, devCode); // 调用百度地图API，绘制设备
                    map.addOverlay(cover);
                    //cover.hide();
                    break;
                /**add by gaochao end*/
                default:
                    devClass = 'null';
                    break;
            }
            /* 获取设备的角度朝向 */
            let deg = eachDevInfo.gpsInfo.northAngle - 90;
            /* 设置设备角度 */
            $('.' + devClass + '-img-' + devCode).css('transform', 'rotate(' + deg + 'deg)');
            /* 设置上一次的GPS信息*/
            devInfoMap.get(devCode).lastGpsInfo = { lng: eachDevInfo.gpsInfo.lng, lat: eachDevInfo.gpsInfo.lat };
            /* 设置上一次的GPS信息*/
            devInfoMap.get(devCode).lastStatus = eachDevInfo.status;
            /* 设置设备详细信息面板是否开启 */
            if (eachDevInfo.isInfoPanelOpen) {
                $('.dev-selecter-circle-' + devCode).css('display', 'block');
                $('.dev-info-panel-' + devCode).css('display', 'block');
            } else {
                $('.dev-selecter-circle-' + devCode).css('display', 'none');
                $('.dev-info-panel-' + devCode).css('display', 'none');
            }
            /* 打开/关闭详细信息框 */
            $('.' + devClass + '-img-' + devCode).click(() => {
                if (!eachDevInfo.isInfoPanelOpen) {
                    $('.dev-selecter-circle-' + devCode).css('display', 'block');
                    $('.dev-info-panel-' + devCode).css('display', 'block');
                    eachDevInfo.isInfoPanelOpen = true;
                } else {
                    $('.dev-selecter-circle-' + devCode).css('display', 'none');
                    $('.dev-info-panel-' + devCode).css('display', 'none');
                    eachDevInfo.isInfoPanelOpen = false;
                }
            });
            $('.dev-info-panel-close-' + devCode).click(() => {
                $('.dev-selecter-circle-' + devCode).css('display', 'none');
                $('.dev-info-panel-' + devCode).css('display', 'none');
                eachDevInfo.isInfoPanelOpen = false;
            });

            /* hover*/
            $('.' + devClass + '-img-' + devCode).hover(function () {
                $('.dev-team-info-' + devCode).css('display', 'block');
            }, function () {
                $('.dev-team-info-' + devCode).css('display', 'none');
            });

            /* 设置设备点聚合所需使用的图标 */
            let icon = new BMap.Marker(
                new BMap.Point(lng, lat),
                { icon: new BMap.Icon("../../static/img/car_0.png", new BMap.Size(0, 0)) }
            );
            /* 移除上一次的点聚合信息 */
            try {
                carMarkerClustererWorking.removeMarker(devDivMap.get(devCode).devIcon);
            } catch (error) { }
            try {
                carMarkerClustererUnwork.removeMarker(devDivMap.get(devCode).devIcon);
            } catch (error) { }
            /* 判断小车是否正在工作 */
            if (status == 1) {
                /* 小车正在工作 */
                carMarkerClustererWorking.addMarker(icon);
            } else {
                /* 小车未工作 */
                carMarkerClustererUnwork.addMarker(icon);
                $('.' + devClass + '-img-' + devCode).css('filter', 'grayscale(100%)'); // 图标置灰
            }
            if (icon.map == null) {
                cover.hide();
            } else {
                cover.show();
            }
            /* 在map集合中保存覆盖物及图标实例 */
            let devDiv = class DevDiv {
                constructor() {
                    this.devCover;
                    this.devIcon;
                }
            }
            devDiv.devCover = cover;
            devDiv.devIcon = icon;
            // 重新保存当前设备覆盖物
            devDivMap.set(devCode, devDiv);
            devDivCacheMap.set(devCode, devDiv);
        });

        devDivMap.forEach((eachDevInfo) => {
            if (eachDevInfo.devIcon.map == null) {
                eachDevInfo.devCover.hide();
            }
        });
      },
      onlineOrofflineDev(val){
        $('.loading_data').css('display','block');
        let dataType = val;
        if (dataType != devDistributionType) {
            devDistributionType = val;
            carMarkerClustererWorking.clearMarkers();
            carMarkerClustererUnwork.clearMarkers();
            map.clearOverlays();
            devInfoMap = new Map();
            devDivMap = new Map();
            carMarkerPointsWorking = [];
            carMarkerPointsUnwork = [];
            switch (devDistributionType) {
                case 1:
                    this.parsingDevInfo(devDistributionListCache.onlineDevList);  
                    break;
                case 0:
                    this.parsingDevInfo(devDistributionListCache.offlineDevList);
                    break;
                default:
                    break;
            }
            map.setZoom(map.getZoom() - 1);
            map.setZoom(map.getZoom() + 1);
        }
        if(dataType == 1){
            $('.dev-distribution-switch').eq(0).css({"background":"url('../../static/img/iconpic/online.png') no-repeat","background-size":"100% 90%","color":"#fff"});
            $('.dev-distribution-switch').eq(1).css({"background":"url('../../static/img/iconpic/offline.png') no-repeat","background-size":"100% 90%","color":"#ccc"});
        }
        else{
            $('.dev-distribution-switch').eq(0).css({"background":"url('../../static/img/iconpic/offline.png') no-repeat","background-size":"100% 90%","color":"#ccc"});
            $('.dev-distribution-switch').eq(1).css({"background":"url('../../static/img/iconpic/online.png') no-repeat","background-size":"100% 90%","color":"#fff"});
        }
      },
      //接收原始数据
      offlineDevData(){
        $axios.get('http://localhost:9090/static/offlineDev.json').then(resultS => {
          let devList = resultS.data;
          devDistributionListCache = devList;
          switch (devDistributionType) {
              case 1:
                  this.parsingDevInfo(devList.onlineDevList);
                  break;
              case 0:
                  this.parsingDevInfo(devList.offlineDevList);
                  break;
              default:
                  break;
          }
          /* 工作中的设备*/
          $('#online-all-dev').html(devList.onlineDevList.length);
          let workingCarNum = 0;
          let workingSingleNum = 0;
          for (let i = 0; i < devList.onlineDevList.length; i++) {
              if (devList.onlineDevList[i].devType == 1) {
                  workingCarNum = workingCarNum + 1;
              } else if (devList.onlineDevList[i].devType == 2) {
                  workingSingleNum = workingSingleNum + 1;
              }
          }
          /* 工作中的车载*/
          $('#online-all-car').html(workingCarNum);
          /* 工作中的单兵*/
          $('#online-all-single').html(workingSingleNum);
          /* 所有设备*/
          $('#statistics-all-dev').html(devList.onlineDevList.length + devList.offlineDevList.length);
          let offlineCarNum = 0;
          let offlineSingleNum = 0;
          for (let i = 0; i < devList.offlineDevList.length; i++) {
              if (devList.offlineDevList[i].devType == 1) {
                  offlineCarNum = offlineCarNum + 1;
              } else if (devList.offlineDevList[i].devType == 2) {
                  offlineSingleNum = offlineSingleNum + 1;
              }
          }
          /* 所有车载*/
          $('#statistics-all-car').html(workingCarNum + offlineCarNum);
          /* 所有单兵*/
          $('#statistics-all-single').html(workingSingleNum + offlineSingleNum);
        });
      },
    },
    mounted() {
      this.ready();
      this.offlineDevData();
    },
  }
</script>
<style type="text/css">
    @import "../../static/css/common.css"; 
    @import "../../static/css/home.css"; 
    @import "../../static/css/cover.css"; 
    @import "../../static/mdui-v0.4.0/css/mdui.min.css";
</style>
