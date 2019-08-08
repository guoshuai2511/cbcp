<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page isELIgnored="false"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<html>
<head>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
<link rel="icon" type="image/ico" href="img/jiantong_logo.ico?v=2.0.4">
<title>实时作战</title>
<!--jquery-->
<script src="js/lib/jquery/jquery-3.2.1.min.js"></script>
<link rel="stylesheet"
	href="js/lib/jquery/jquery-ui-1.12.1/jquery-ui.min.css">
<script src="js/lib/jquery/jquery-ui-1.12.1/jquery-ui.min.js"></script>
<!--bootstrarp-->
<link rel="stylesheet" href="js/lib/bootstrarp/css/bootstrap.min.css">
<script src="js/lib/bootstrarp/js/bootstrap.min.js"></script>
<!--自定义图标-->
<link rel="stylesheet" href="js/lib/iconfont/iconfont.css">
<!--日期选择器-->
<script src="js/lib/My97DatePicker/WdatePicker.js?v=2.1.890"></script>
<!-- 时间格式化 -->
<script src="js/lib/TimeFormat/timeFormat.js"></script>
<!--MDUI-->
<link rel="stylesheet" href="js/lib/mdui-v0.4.0/css/mdui.min.css">
<script src="js/lib/mdui-v0.4.0/js/mdui.min.js"></script>
<!--右键点击菜单-->
<script src="js/lib/contextify/dist/jquery.contextify.min.js"></script>
<!-- 分页插件 -->
<script src="js/lib/pagination/jquery.pagination.js?v=2.1.892223"></script>
<link rel="stylesheet" href="js/lib/pagination/pagination.css?v=2.1.892223">
<!-- 滑动条插件-->
<script src="js/lib/jQRangeSlider-5.7.2/lib/jquery.mousewheel.min.js"></script>
<link rel="stylesheet" href="js/lib/jQRangeSlider-5.7.2/css/classic.css">
<script src="js/lib/jQRangeSlider-5.7.2/jQAllRangeSliders-min.js"></script>
<!--百度地图key-->
<script
	src="https://api.map.baidu.com/api?v=2.0&ak=PgNHPqzIRsGR1yhs8nkoCtXOZLbwmawp"></script>
<!--百度地图测距工具-->
<script src="js/lib/baidumap/DistanceTool.min.js"></script>
<!--百度点聚合-->
<script src="js/lib/baidumap/TextIconOverlay_min.js"></script>
<!-- <script type="text/javascript"
	src="js/lib/baidumap/MarkerClusterer_min.js"></script> -->
<script type="text/javascript" src="js/lib/baidumap/MarkerClusterer.js"></script>
<!--百度鼠标绘制工具-->
<script src="js/lib/baidumap/DrawingManager.js"></script>
<link rel="stylesheet" href="js/lib/baidumap/DrawingManager_min.css">
<!--百度地图路况信息控件-->
<script src="js/lib/baidumap/TrafficControl.min.js"></script>
<script type="text/javascript" src="js/lib/clipboard/clipboard.min.js"></script>
<link rel="stylesheet" href="js/lib/baidumap/TrafficControl.min.css">
<!--百度地图热力图-->
<script src="js/lib/baidumap/HeatMap.min.js"></script>
<!--自定义css-->
<link rel="stylesheet" type="text/css" href="css/common.css?v=2.1.7">
<link rel="stylesheet" type="text/css" href="css/cover.css?v=2.1.5">
<!--地图中组件样式-->
<link rel="stylesheet" href="css/map/component.css">
<!--地图右部信息栏样式-->
<link rel="stylesheet" href="css/map/map-right-panel.css">
<!--地图顶部工具样式-->
<link rel="stylesheet" href="css/map/map-top-tools.css">
<!--地图底部时间轴模块样式-->
<link rel="stylesheet" href="css/map/map-bottom-timeline.css?v=2.1.5">
<!--地图高级面板样式-->
<link rel="stylesheet" href="css/map/advance-info-panel.css">
<!-- 表格排版样式 -->
<link rel="stylesheet" type="text/css" href="css/table/table-view.css">
<!--add by gaochao start -->
<script src="js/lib/video/video.js"></script>
<script src="js/lib/video/videojs-ie8.min.js"></script>
<link rel="stylesheet" href="js/lib/video/video-js.css">
<link rel="stylesheet" href="css/map/map-top-navigation.css">
<!--add by gaochao end -->
<style>
/* add by gaochao start*/
 		.map-area-container {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
		/* add by gaochao end*/
.multi-search-tip {
	position: absolute;
	left: 30px;
	top: 118px;
	color: #cccccc;
}

.full-screen {
	display: none;
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 0);
	z-index: 9999;
}

.history-loading {
	width: 180px;
	height: 50px;
	position: absolute;
	left: 50%;
	top: 50%;
	margin-left: -90px;
	margin-top: -30px;
	background: #333333;
	border-radius: 5px;
	line-height: 50px;
	display: none;
}

.target-point-dev-selector-container {
	margin-left: 15px;
}

.target-point-send {
	position: relative;
	float: right;
	margin-bottom: 5px;
	margin-right: 3px;
}

.target-point-send-status {
	position: absolute;
	right: 70px;
	bottom: 11px;
}

.real-combat-end-star {
	width: 165px;
	height: 25px;
	position: relative;
	margin-top: 5px;
	margin-left: 58px;
}

.grade-star-icon-inmodal {
	width: 22px;
	height: 21px;
	position: relative;
	float: left;
	margin-top: 4px;
	margin-right: 10px;
	background: url("img/icon-lib.png") no-repeat;
	background-position: -240px -30px;
	cursor: default;
}
/*add by guoshuai start 2018-9-28*/
#table-tbody tr:nth-child(odd){
	background-color: rgba(23,193, 244, 0.1);
}
#table-tbody tr:nth-child(even){
	background-color: #07203e;
}
#table-tbody tr:nth-child(1){
	background-color: rgba(23,193, 244, 0.4);
} 
#table-tbody td{
	text-align: center;
}
#table-tbody div{
	white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.search-simple-rule{
	border-left:1px solid #03172f;
	border-right:1px solid #0e3463;
	height: 52px;
	margin-top: 14px;
	float: left;
}
#table-view-container-box{
		height:80px;
	}
.search-type-all{
	display:none;
}
@media screen and (max-width: 1511px) {
	.search-item{
		margin-top:9px;
	}
}
input::-webkit-input-placeholder{
    color:#fff !important;
}
input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color:#fff !important;
}
input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color:#fff !important;
}
input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
    color:#fff !important;
}
@media screen and (max-width: 1452px) {
	.time-range-selector{
		margin-top:0px !important;
	}
	.input-data-picker-md{
		width:100px !important;
	}
}
@media screen and (max-width: 1511px) {
	
}
.command-btn-realtime-class{
	margin-left:25%;
}

/* 基站查询 */
#bts-search{
	background: url('img/usermanageicon/bts-search.png') no-repeat;
    background-size: 100% 100%;
}

#bts-search-modal .input-group-addon{
	color: #fff;
    background: #08264a;
    border: none;
}
#bts-search-modal .modal-input{
	width: 500px;
    height: 30px;
	margin-bottom: 20px;
    margin-left: 150px;
}
#bts-search-modal .modal-input-background{
	background: #011731;
	border: 1px solid #174275;
	width: 214px;
    margin-left: -2px;
}
#cdma{
	display: none;
	position: relative;
}
.no-cdma-ci{
	margin-left: 35px !important;
}
.myCheckBox{
	float: left;
    margin-left: 72px;
	margin-top: 7px;
	position: relative;
}
.myCheckBox label{ 
	width: 15px;
    height: 15px;
    position: absolute;
    top: 2px;
    left: -1px;
    border: 1px solid #17c1f4;
    background: #08264a;
    cursor: pointer;
}

.myCheckBox input:checked + label:after{ 
	content: '';
    width: 6px;
    height: 6px;
    position: absolute;
    top: 2.4px;
    background: #23b5e8;
    position: absolute;
    background: transparent;
    border: #fff solid 2px;
    border-top: none;
    border-right: none;
    height: 6px;
    width: 11px;
    -moz-transform: rotate(-52deg);
    -ms-transform: rotate(-52deg);
    -webkit-transform: rotate(-52deg);
    transform: rotate(-52deg);
}

.binary-system {
	float: left;
    color: #fff;
    margin-top: 4px;
	margin-left: 10px;
	margin-top: 8px;
}
.cdma-sid,.cdma-nid,.cdma-bid{
	margin-left: 28px !important;
	color: #fff;
}
.dropdown-menu-selector{
	color: #fff !important;
}
.dropdown-menu-selector:hover {
    background: rgba(140, 140, 140, 0.4) !important;
}
/* #no-cdma-lac-tac,.cdma-sid{
	color: #fff;
} */
.no-cdma-lac-tac,.cdma-sid{
	color: #fff;
}
.no-cdma-ci,.cdma-sid,.cdma-nid{
	padding: 0;
    padding-left: 12px;
    color:#fff;
}
input::-webkit-input-placeholder{	
	color: #7e99b9 !important;
}

.careta{
	display: block;
    float: left;
    margin-top: 3px;
    width: 12px;
    height: 12px;
    border: none;
    margin-left: 6px;
    background: url('img/usermanageicon/slidedown3x.png');
    background-size: 100% 100%;
}
/*add by guoshuai start 2018-9-28*/
.mdui-radio-icon:before{
	top: -7px;
	left: -7px;
	background: #fff;
}
</style>
</head>

<!--delete by guoshuai start 2018-9-28
<body style="background: rgb(29, 33, 39)">
delete by guoshuai end 2018-9-28-->
<!--add by guoshuai start 2018-9-28-->
<body style="background:url('img/iconpic/bg.png');
background-color:#000;
">
<!--add by guoshuai end 2018-9-28-->
	<header class="top-header" id="top-header"> </header>

	<div class="map-area-container" style="display: none;">
		<div id="allmap" style=""></div>
<!--add by gaochao start-->
		<div class="top-map-navigation">
			<div class="case-name" id="case-users" title=""></div>
			<div class="target-icon"></div>
			<div class="target-title">目标</div>
			<div class="target-name" data-info-num=""></div>
			<div class="ta-info-btn">详情</div>
			<div class="target-lte-info-btn">高级</div>
			<div class="channel-icon"></div>
			<div class="channel-title">解析</div>
			<div class="channel-info-container">
				<div class="channel-info-title">LTE：</div>
				<div class="channel-info-value-item" id="data-channel-lte">0</div>
				<div class="channel-info-title">WCDMA：</div>
				<div class="channel-info-value-item" id="data-channel-wcdma">0</div>
				<div class="channel-info-title">CDMA：</div>
				<div class="channel-info-value-item" id="data-channel-cdma">0</div>
				<div class="channel-info-title">GSM：</div>
				<div class="channel-info-value-item" id="data-channel-gsm">0</div>
			</div>
			<div class="channel-info-btn">高级</div>
			<div class="sms-info-icon"></div>
			<div class="sms-info-container">
				<div class="sms-info-title">发送：</div>
				<div class="sms-info-item" id="sms-send-value" data-sms-send="">0</div>
				<div class="sms-info-title">成功：</div>
				<div class="sms-info-item"  id="sms-finish-value" data-sms-success="">0</div>
				<div class="sms-info-title">回执：</div>
				<div class="sms-info-item"  id="sms-receipt-value" data-sms-receipt="">0</div>
			</div>
			<div class="activedev-info-icon-new"></div>
			<div class="activedev-info-title"></div>
			<div class="activedev-info-value" data-activedev-value=""></div>
			<div class="activedev-info-time" data-activedev-time=""></div>
			<div class="activedev-info-btn">详情</div>
			<div class="tools-btn-container" style="width:311px;">
				<div class="tools-each-icon" id="vehicle-marker-view-switch"
					vehicle-marker-view-status="1" title="组队车辆" style="background:url(img/icon/vehicle_active.png)no-repeat;"></div>
				<div class="tools-each-icon" id="dev-route-line-switch"
					data-dev-route-line-status="1" title="设备轨迹" style="left:15px;background:url(img/icon/car_load_active.png)no-repeat;"></div>
				<div class="tools-each-icon"  id="eng-orientation-switch"
					data-eng-orientation-status="1" style="left:30px;background:url(img/icon/eng_load_active.png)no-repeat;"
				title="能量轨迹"></div>
				<div class="tools-each-icon" id="passive-route-line-switch"
					data-passive-route-line-status="1"
					data-switch-close="0"
				style="left:45px;background:url(img/icon/active_load.png)no-repeat;"title="主动式轨迹"></div>
				<div class="tools-each-icon" id="bts-show-switch" data-bts-show-status="1"
				 style="left:60px;background:url(img/icon/bts_icon_active.png)no-repeat;" title="基站"></div>
				<div class="tools-each-icon"
				id="ta-prod-show-switch" data-ta-prod-show-status="1"
				 style="left:75px;background:url(img/icon/ta_pro_active.png)no-repeat;" title="产品化绘图"></div>
				<div class="tools-each-icon"
				id="ta-debug-show-switch" data-ta-debug-show-status="1"
				 style="left:90px;background:url(img/icon/ta_debug_active.png)no-repeat;" title="调试绘图"></div>
				<div class="tools-each-icon" id="map-traffic-switch"
					data-traffic-status="0"
				 style="left:105px;background:url(img/icon/traffic.png)no-repeat;" title="路况信息"></div>
			</div>
			<button class="stop-btn-container" id="stop-btn" style="border:0;outline:0;" data-toggle="modal" data-target="#reset-search-modal"></button>
		</div>
		<div class="map-typeswich-container">
			<div class="map-typeswich-item" id="map-type-normal" style="color:rgba(255,255,255,1);">地图</div>
			<div class="map-typeswich-dividingline"></div>
			<div class="map-typeswich-item" id="map-type-satellife" style="background:rgba(255,255,255,1);">卫星</div>
			<%-- <div class="map-typeswich-dividingline"></div>
			<div class="map-typeswich-item" id="map-type-panorama" style="background:rgba(255,255,255,1);">街道</div> --%>
		</div>
		<div class="view-lock-btn" data-status=1>
			<div style="width:16px;height:16px;margin:5px;background:url(img/icon/location_active.png)no-repeat;"></div>
		</div>
		<div class="view-narrow-btn" data-status=1>
			<div style="width:16px;height:16px;margin:5px;background:url(img/icon/zoomout_active.png)no-repeat;"></div>
		</div>
		<div class="view-enlarge-btn" data-status=1>
			<div style="width:16px;height:16px;margin:5px;background:url(img/icon/zoomin.png)no-repeat;"></div>
		</div>
		<div class="view-color-container">
			<div class="view-color-legend"></div>
				<div class="view-color-line" style="right:10px;top:1px;"></div>
				<div class="view-color-value" style="right:12px;top:-2px;">255</div>
				<div class="view-color-line" style="right:10px;top:16px;"></div>
				<div class="view-color-value" style="right:12px;top:13px;">200</div>
				<div class="view-color-line" style="right:10px;top:31px;"></div>
				<div class="view-color-value" style="right:12px;top:28px;">150</div>
				<div class="view-color-line" style="right:10px;top:46px;"></div>
				<div class="view-color-value" style="right:12px;top:43px;">100</div>
				<div class="view-color-line" style="right:10px;top:61px;"></div>
				<div class="view-color-value" style="right:12px;top:58px;">50</div>
		</div>
		<img class="right-chat-control-btn" data-status="left" src="img/icon/chat_control.png" draggable="false" >
		<div class="right-tools-container">
			<div class="right-tools-item" id="gps-search" style="background:url(img/icon/gps_search.png)no-repeat;" title="经纬度查询"></div>
			<div class="right-tools-item" id="bts-search" style="top:23px;background:url(img/icon/bts_search.png)no-repeat;" title="基站查询"></div>
			<div class="right-tools-item" id="distance-measurement" data-is-open=0
			 style="top:37px;background:url(img/icon/rule.png)no-repeat;" title="测距工具"></div>
			<div class="right-tools-item" id="draw-point" data-drawing-type="marker" data-is-open=0 style="top:51px;background:url(img/icon/point.png)no-repeat;"title="绘制点"></div>
			<div class="right-tools-item" id="drap-circle" data-is-open=0  data-drawing-type=BMAP_DRAWING_CIRCLE style="top:65px;background:url(img/icon/circle.png)no-repeat;"title="绘制圆"></div>
			<div class="right-tools-item" id="drap-polygon" data-is-open=0  data-drawing-type=BMAP_DRAWING_POLYGON style="top:79px;background:url(img/icon/polygon.png)no-repeat;"title="绘制多边形"></div>
			<div class="right-tools-item" id="drap-arrow" style="top:93px;background:url(img/icon/arrow.png)no-repeat;"title="绘制箭头"></div>
			<div class="right-tools-item"  id="drawing-clear-last"
			 style="top:107px;background:url(img/icon/back_unclick.png)no-repeat;" title="撤销绘制"></div>
			<div class="right-tools-item" id="drawing-clear-all" 
			style="top:121px;background:url(img/icon/clear_unclick.png)no-repeat;" title="清除绘制"></div>
		</div>
		<div class="right-chat-container">
			<div class="right-chat-title">研判指挥</div>
			<div class="right-chat-content CR-scrollY">
					<%-- <div class="right-chat-get-photo"></div>
					<div class="right-chat-get-name">王五</div>
					<div class="right-chat-get-time">12:34</div>
					<div class="right-chat-get-value-content">
						<div class="right-chat-get-value">需要位置信息！需要位置信息！</div>
					</div>		 --%>
				<div class="right-chat-get-content">

				</div>
			</div>
			<div class="right-send-content">
				<input type="text" class="right-chat-input">
				<div class="right-chat-send-btn">发送</div>
			</div>
		</div>
		<!--add by gaochao end-->
		<!-- 上部工具栏 -->
		<div class="top-map-tools-area" style="margin-left: -300px" hidden>
			<div class="map-tools-block box-shadow">
				<!-- 设备轨迹开关-->
				<div class="tool-icon" id="dev-route-line-switch"
					data-dev-route-line-status="1"
					style="background-position: 0 -40px;" title="设备轨迹"></div>
				<div class="tool-divide-line"></div>
				<!-- 能量轨迹开关-->
				<div class="tool-icon" id="eng-orientation-switch"
					data-eng-orientation-status="1"
					style="background-position: -40px -40px;" title="能量轨迹"></div>
				<div class="tool-divide-line"></div>
				<!-- 主动式轨迹开关-->
				<div class="tool-icon gray-cover" id="passive-route-line-switch"
					data-passive-route-line-status="1" data-switch-close="0"
					style="background-position: -80px -40px;" title="主动式轨迹"></div>
				<div class="tool-divide-line"></div>
				<!-- 基站显示开关-->
				<div class="tool-icon" id="bts-show-switch" data-bts-show-status="1"
					style="background-position: -120px -40px;" title="基站"></div>
				<div class="tool-divide-line"></div>
				<!-- add by guoshuai start -->
				<!-- 产品化绘图开启-->
				<div class="tool-icon" id="ta-prod-show-switch" data-ta-prod-show-status="1"
					style="background:url('img/iconpic/production-overlay.png');" title="产品化绘图"></div>
				<div class="tool-divide-line"></div>
				<!-- 调试绘图开启-->
				<div class="tool-icon" id="ta-debug-show-switch" data-ta-debug-show-status="1"
					style="background:url('img/iconpic/debug-overlay.png');" title="调试绘图"></div>
				<div class="tool-divide-line"></div>
				<!-- add by guoshuai end -->
				<!-- 语音播报-->
				<div class="tool-icon" id="eng-audio-selector"
					style="background-position: -240px -40px;" title="语音播报"></div>
			</div>
			<div class="map-tools-block box-shadow">
				<!-- 绘制点 -->
				<div class="tool-icon drawing-tool-btn gray-cover"
					data-drawing-type="marker"
					style="background-position: -280px -40px;" title="绘制点"></div>
				<div class="tool-divide-line"></div>
				<!-- 基站查询-->
				<div class="tool-icon" id="bts-search"
					title="基站查询"></div>
				<div class="tool-divide-line"></div>
				<!-- 测距工具 -->
				<div class="tool-icon gray-cover" id="distance-measurement"
					data-is-open="0" style="background-position: -320px -40px;"
					title="测距工具"></div>
				<div class="tool-divide-line"></div>
				<!-- 地图拖动 -->
				<div class="tool-icon" id="drawing-remove"
					style="background-position: -360px -40px;" title="地图拖动"></div>
				<div class="tool-divide-line"></div>
				<!-- 撤销绘制 -->
				<div class="tool-icon gray-cover" id="drawing-clear-last"
					style="background-position: -400px -40px;" title="撤销绘制"></div>
				<div class="tool-divide-line"></div>
				<!-- 清除绘制 -->
				<div class="tool-icon gray-cover" id="drawing-clear-all"
					style="background-position: -440px -40px;" title="清除绘制"></div>
				<div class="tool-divide-line"></div>
				<!-- 锁定工具栏 -->
				<div class="tool-icon" id="tool-pin" data-is-pin="1"
					style="background-position: -480px -40px;" title="锁定工具栏"></div>
			</div>
			<div class="eng-audio-selector-menu box-shadow"
				style="display: none;">
				<div class="eng-audio-selector-item" data-audio-type="1"
					style="background-position: -200px -40px;" title="单选"></div>
				<div class="eng-audio-selector-item" data-audio-type="2"
					style="background-position: -240px -40px;" title="优选"></div>
				<div class="eng-audio-selector-item" data-audio-type="3"
					style="background-position: -160px -40px;" title="静音"></div>
			</div>
		</div>

		<!-- 能量比例尺-->
		<div class="energy-scale" hidden>
			<div class="energy-scale-content" style="top: 0;">
				<div class="energy-scale-color"
					style="background: rgb(255, 203, 203)"></div>
				<div class="energy-scale-word">&lt;50</div>
			</div>
			<div class="energy-scale-content" style="top: 25px">
				<div class="energy-scale-color"
					style="background: rgb(255, 176, 176)"></div>
				<div class="energy-scale-word">&lt;100</div>
			</div>
			<div class="energy-scale-content" style="top: 50px">
				<div class="energy-scale-color"
					style="background: rgb(255, 127, 127)"></div>
				<div class="energy-scale-word">&lt;150</div>
			</div>
			<div class="energy-scale-content" style="top: 75px">
				<div class="energy-scale-color" style="background: rgb(255, 86, 86)"></div>
				<div class="energy-scale-word">&lt;200</div>
			</div>
			<div class="energy-scale-content" style="top: 100px">
				<div class="energy-scale-color" style="background: rgb(255, 0, 0)"></div>
				<div class="energy-scale-word">&lt;255</div>
			</div>
			<div class="energy-scale-content-details">能量颜色图例</div>
		</div>
<!--add by gaochao start-->
		<div class="group-switch-btn-container" style="width:230px;">
			<div class="group-switch-btn-item" id="group-location">定位组</div>
			<div class="group-switch-btn-item" id="group-outside" style="background:#fff;color:rgba(153,153,153,1)">外线组</div>
			<div class="group-switch-line"></div>
			<div class="group-switch-time-icon"></div>
			<div class="group-switch-time-value"></div>
		</div>
		<!--设备信息 -->
		<div class="group-location-container">
			<div class="group-location-car-container">
				<%-- <div class="group-location-each group-location-choose">
					<div class="group-location-person">
						<div class="group-location-person-photo"></div>
						<div class="group-location-person-status" data-info-status=1></div>
						<div class="group-location-person-name">李四四</div>
						<div class="group-location-person-gps-icon"></div>
						<div class="group-location-person-gps-value">正常</div>
						<div class="group-location-person-speed-icon"></div>
						<div class="group-location-person-speed-value">49km/h</div>
					</div>
					<div class="group-location-line"></div>
					<div class="group-location-car-dev">
						<div class="group-location-devcode">JT400C001-H-00001</div>
						<div class="group-location-car-engtime">11:05:30</div>
						<div class="group-location-more-engtime"></div>
						<div class="group-location-timeserver-icon"></div>
						<div class="group-location-timeserver-value">被授时</div>
						<div class="group-location-temperature-icon"></div>
						<div class="group-location-temperature-value">45℃</div>
						<div class="group-location-battery-car-icon"></div>
						<div class="group-location-battery-value">60%</div>
						<div class="group-location-dev-line"></div>
						<div class="group-location-car-icon"></div>
						<div class="group-location-careng-top">220</div>
						<div class="group-location-careng-left">143</div>
						<div class="group-location-careng-right">156</div>
						<div class="group-location-careng-bottom">165</div>
						<div class="group-location-voice"></div>
						<div class="group-location-video-out"></div>
					</div>
				</div> --%>
			</div>
			<div class="group-location-single-container">
				<%-- <div class="group-location-each">
					<div class="group-location-person">
						<div class="group-location-person-photo"></div>
						<div class="group-location-person-status" data-info-status=1></div>
						<div class="group-location-person-name">李四</div>
						<div class="group-location-person-gps-icon"></div>
						<div class="group-location-person-gps-value">无信号</div>
						<div class="group-location-person-altitude-icon"></div>
						<div class="group-location-person-altitude-value">-192m</div>
					</div>
					<div class="group-location-line"></div>
					<div class="group-location-single-dev">
						<div class="group-location-devcode">JT400C001-H-00001</div>
						<div class="group-location-single-engtime">11:05:30</div>
						<div class="group-location-timeserver-icon"></div>
						<div class="group-location-timeserver-value">主授时</div>
						<div class="group-location-temperature-icon"></div>
						<div class="group-location-temperature-value">45℃</div>
						<div class="group-location-battery-single-icon"></div>
						<div class="group-location-battery-value">30%</div>
						<div class="group-location-dev-line"></div>
						<div class="group-location-single-icon"></div>
						<div class="group-location-single-eng">198</div>
						<div class="group-location-voice"></div>
						<div class="group-location-video-out"></div>
					</div>
					<div class=""></div>
				</div> --%>
			</div>
		</div>
		<div class="group-outside-container">
			<%-- <div class="group-outside-each-item group-location-choose">
				<div class="group-outside-each-photo"></div>
				<div class="group-outside-each-status"></div>
				<div class="group-outside-each-name">李四四四</div>
				<div class="group-outside-each-gps-icon"></div>
				<div class="group-outside-each-gps-value">正常</div>
				<div class="group-outside-each-speed-icon"></div>
				<div class="group-outside-each-speed-value">12km/h</div>
				<div class="group-outside-each-line"></div>
			</div>
			<div class="group-outside-each-item">
				<div class="group-outside-each-photo"></div>
				<div class="group-outside-each-status"></div>
				<div class="group-outside-each-name">李四四</div>
				<div class="group-outside-each-gps-icon" style="background:url(img/icon/my_gps.png);"></div>
				<div class="group-outside-each-gps-value">无信号</div>
				<div class="group-outside-each-speed-icon"></div>
				<div class="group-outside-each-speed-value">12km/h</div>
				<div class="group-outside-each-line"></div>
			</div> --%>
		</div>
		<!--add by gaochao end-->
		<div class="right-info-panel-container" hidden>
			<!-- 上信息面板-->
			<div class="case-info-panel box-shadow">
				<div class="case-info-area">
					<div class="case-info-item">
						<div class="case-info-item-icon" style="background-position: 0 0;"></div>
						<div class="case-info-item-value"
							title="chenliang sunbing yangjing"
							style="color: rgb(137, 146, 200);" id="case-users"></div>
					</div>
					
				</div>
				<div class="sms-info-area">
					<!-- edit by guoshuai start  -->
					<!-- <div class="sms-info-icon"></div>
					<div class="sms-value-contaoner">
						<div class="sms-value-item">
							发送：<span id="sms-send-value">0</span>
						</div>
						<div class="sms-value-item">
							完成：<span id="sms-finish-value">0</span>
						</div>
						<div class="sms-value-item">
							回执：<span id="sms-receipt-value">0</span>
						</div>
					</div> -->
					<div class="sms-value-contaoner">
						<span class="sms-value-item">发送</span>
						<span class="sms-value-item">完成</span>
						<span class="sms-value-item">回执</span>
					</div>
					<div class="sms-value-contaoner">
						<span id="sms-send-value" class="sms-value-item">0</span>
						<span id="sms-finish-value" class="sms-value-item">0</span>
						<span id="sms-receipt-value" class="sms-value-item">0</span>
					</div>
				</div>
				<div>
					<div class="activedev-info-area">
						<div class="activedev-info-icon gray-cover" title="查看主动式详情"></div>
						<div class="activedev-info-status-value">主动式未命中</div>
					</div>
					<div class="activedev-history-energy">
						<span class="activedev-history-energy-open" title="查看历史能量"></span>
					</div>
				</div>
				<!-- edit by guoshuai end -->
			</div>

			<!-- 下信息面板-->
			<div class="team-info-panel box-shadow">
				<div class="team-each-dev-container">
					<div class="team-each-dev-container-car"></div>
					<div class="team-each-dev-container-single"></div>
					<!-- 
				<div class="team-each-dev team-each-dev-active">
					<div class="team-each-dev-uaername">(陈亮)</div>
					<img class="team-each-dev-icon-car" src="img/car_0.png">
					<div class="team-each-dev-gpsstatus" title="GPS信号强"></div>
					<div class="team-each-dev-timeservice"></div>
					<div class="team-each-dev-eng-car">
						<div class="eng-orientation-icon"></div>
						<div class="eng-value-car eng-value-car-0">182</div>
						<div class="eng-value-car eng-value-car-1">255</div>
						<div class="eng-value-car eng-value-car-2">100</div>
						<div class="eng-value-car eng-value-car-3">130</div>
						<div class="eng-hit-time-car"></div>
					</div>
				</div>
				<div class="team-each-dev">
					<div class="team-each-dev-uaername">(孙兵)</div>
					<img class="team-each-dev-icon-single" src="img/single_0.png">
					<div class="team-each-dev-gpsstatus gray-cover" title="GPS信号弱"></div>
					<div class="team-each-dev-eng-single">
						<div class="eng-value-single">0</div>
						<div class="eng-hit-time-single"></div>
					</div>
				</div>
				<div class="team-each-dev">
					<div class="team-each-dev-uaername">(孙兵)</div>
					<img class="team-each-dev-icon-single" src="img/single_0.png">
					<div class="team-each-dev-gpsstatus gray-cover" title="GPS信号弱"></div>
					<div class="team-each-dev-eng-single">
						<div class="eng-value-single">0</div>
						<div class="eng-hit-time-single"></div>
					</div>
				</div>
 -->
				</div>
				<!-- add by guoshuai start -->
				<button
					class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-blue CR-ta-target-info">调试信息</button>
				<!-- add by guoshuai end -->
				<button data-toggle="modal" data-target="#advance-info-panel"
					class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-blue advance-panel-btn">高级</button>
			</div>

			<!-- 结束指挥按钮面板-->
			<div class="end-combat-panel box-shadow">
				<button data-toggle="modal" data-target="#reset-search-modal"
					class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-pink end-combat-btn">结束指挥</button>
			</div>
		</div>
		<!-- add by guoshuai start -->
		<!--主动式详情-->
		<div class="active-info-container box-shadow">
			<div class="active-info-title"></div>
			<div class="active-info-header" style="height: 17px;margin-left:6px;">
				<span class="red-ball-span"></span>
				<div style="width: 250px;height: 17px;float: left;margin-left: 4px; font-weight: bold; font-size:14px;">主动式详情<span id="active-mode" class="sd_span"></span><span id="active-info-time"></span></div>
				<span class="CR-close active-info-container-close"></span>
			</div>
					<!-- edit by gaochao start-->
			<div class="active-info-switch-container">
				<div class="active-info-switch-item" id="active-info-baseinfo">基本信息</div>
				<div class="active-info-switch-item" id="active-info-enghistory" style="color:#2A8CFF;background:#fff;">历史能量</div>
			</div>
			<%-- <div class="active-info-top" style="height: 14px;margin-top: 6px;border-bottom: 1px solid #f0f0f0;"></div> --%>
			<!--基本信息-->
			<div class="active-info-content CR-scrollY">
				<table style="width: 100%; height: 84px;">
					<thead>
						<tr style="border-bottom: #F0F0F0 solid 1px;">
							<th class="active_info_content_title">推荐</th>
							<th class="active_info_content_title">Band</th>
							<th class="active_info_content_title">Freq/Pci</th>
							<th class="active_info_content_title">Power</th>
							<th class="active_info_content_title">Status</th>
						</tr>
					</thead>
					<tbody id="active-info-content-infoArea"></tbody>
				</table>
			</div>
			<!--历史能量-->
			<div class="history-energy-info" style="display:none;">
				<div class="history-energy-info-header">			
					<span class="history-energy-info-header-span">能量</span>	
					<span class="history-energy-info-header-span">Freq/Pci</span>				
					<span class="history-energy-info-header-span">时间</span>	
				</div>			
				<div class="history-energy CR-scrollY">
				</div> 
			</div>
		</div>
		<!--历史能量-->
		<%-- <div class="historical-energy-container box-shadow">
			<div class="active-info-header" style="height: 17px;">
				<span class="red-ball-span"></span>
				<div style="width: 150px;height: 17px;float: left;margin-left: 4px;">历史能量</div>
				<span class="CR-close historical-energy-container-close"></span>
			</div>
			<div class="history-energy-info">
				<div class="history-energy-info-header" style="height: 24px;">			
					<span class="history-energy-info-header-span">能量</span>				
					<span class="history-energy-info-header-span">时间</span>	
				</div>			
				<div class="history-energy CR-scrollY">
				</div> 
			</div>
		</div> --%>
		<!-- edit by gaochao end-->
		<!-- 高级面板-->
		<div class="advance-info-containers box-shadow" style="height:480px;">
			<div class="advance-info-title"></div>
			<div class="active-info-header" style="height: 17px;margin-left:10px;">
				<span class="red-ball-span"></span>
				<div style="width: 150px;height: 17px;float: left;margin-left: 4px; font-weight:600;">解析高级面板</div>
				<span class="CR-close advance-info-container-close"></span>
				<!--add by guoshuai start-->
				<div class="active-info-header_border_left"></div>
				<div class="active-info-header_border_right"></div>
				<!--add by guoshuai end-->
			</div>
				<div class="advance-info-switch-container">
					<div class="advance-info-switch-item" id="advance-info-bts-model">解析高级面板</div>
					<div class="advance-info-switch-item" id="advance-info-bts-list" style="color:#2A8CFF;background:#fff;">基站列表信息</div>
				</div>
			<div class="advance-info-bts-model-container">
				<div class="advance-info-dropdown-toggle-container dropdown-toggle" data-toggle="dropdown" data-status=0>
					<%-- <div class="advance-info-dropdown-toggle">JT400C001-H_00075(chenliang)</div>
					<div class="advance-info-dropdown-toggle-icon"></div> --%>
				</div>
				<div class="advance-info-dropdown-toggle-content dropdown-menu" style="float:left">
					<%-- <div class="advance-info-dropdown-toggle-content-item">JT400C001-H_00075(chenliang)</div>
					<div class="advance-info-dropdown-toggle-content-item">BBC1000_000001(chenliang)</div> --%>
				</div>
				<div class="advance-info-modetype-switch-container">
					<div class="advance-info-modetype-btn" data-mode="lte" id="advance-info-modetype-btn-lte" style="background:#2A8CFF;color:#fff">LTE</div>
					<div class="advance-info-modetype-btn" data-mode="wcdma" id="advance-info-modetype-btn-wcdma">WCDMA</div>
					<div class="advance-info-modetype-btn" data-mode="cdma" id="advance-info-modetype-btn-cdma">CDMA</div>
					<div class="advance-info-modetype-btn" data-mode="gsm" id="advance-info-modetype-btn-gsm">GSM</div>
				</div>
				<div class="advance-info-contents">
					<div class="advance-info-line"></div>
					<div class="advance-info-bts">Freq</div>
					<div class="advance-info-locationcode">基站</div>
					<div class="advance-info-analysis">解析</div>
					<div class="advance-info-bid">中标数</div>
					<div class="advance-info-fieldstrength">场强</div>
					<div class="advance-info-value-container">
					<%-- <div class="advance-info-content-container">
						<div class="advance-info-content-odd">
							<div class="advance-info-content-bts">350-260</div>
							<div class="advance-info-content-locationcode">13750-129111603</div>
							<div class="advance-info-content-analysis">0%-0%</div>
							<div class="advance-info-content-bid">0</div>
							<div class="advance-info-content-fieldstrength">-91</div>
						</div>
						<div class="advance-info-content-even">
							<div class="advance-info-content-bts">100-172</div>
							<div class="advance-info-content-locationcode">8341-34309890</div>
							<div class="advance-info-content-analysis">100%-98%</div>
							<div class="advance-info-content-bid">0</div>
							<div class="advance-info-content-fieldstrength">-101</div>
						</div>
					</div> --%>
					</div>
					<div class="advance-info-time-container">
					</div>
				</div>
			</div>
			<div class="advance-info-bts-list-container" style="display:none;">
				<div class="advance-info-line" style="margin:-10px 0px 0px 10px";></div>
				<div class="advance-info-list-btsId">基站</div>
				<div class="advance-info-list-GPS">经纬度</div>
				<div class="advance-info-list-time">时间</div>
				<div class="advance-info-list-content-container CR-scrollY">
					<%-- <div class="advance-info-content-odd">
						<div class="advance-info-list-content-btsId clipboard" data-clipboard-text="460-0-13750-129111603">13750-129111603</div>
						<div class="advance-info-list-content-GPS"><img class="advance-info-list-content-GPS-img" src="img/icon/gps.png"></div>
						<div class="advance-info-list-content-time">16:02:34</div>
					</div>
					<div class="advance-info-content-even">
						<div class="advance-info-list-content-btsId clipboard" data-clipboard-text="460-0-13750-129111603">13750-129111603</div>
						<div class="advance-info-list-content-GPS"><img class="advance-info-list-content-GPS-img" src="img/icon/gps.png"></div>
						<div class="advance-info-list-content-time">16:02:34</div>
					</div> --%>
				</div>
				<div class="advance-info-list-content-lastTime"></div>
			</div>
		</div>
		<!-- 调试信息 -->
		<div class="ta-info-container box-shadow">
			<div class="ta-info-title"></div>
			<div class="active-info-header" style="height: 17px;">
				<span class="red-ball-span"></span>
				<div style="width: 150px;height: 17px;float: left;margin-left: 4px; font-weight: bold;">调试信息</div>
				<span class="CR-close ta-info-container-close"></span>
			</div>
			<div class="ta-info-box">
				<div class="ta-info-header">
					<span class="ta-info-content-header-first">基站信息</span>
					<span class="ta-info-content-header-secede">调试信息</span>
					<span class="ta-info-content-header-third">设备信息</span>
					<span class="ta-info-content-header-fourth"></span>
				</div>
				<div class="ta-info-middle">
					<div class="ta-info-content-header-first CR-blue-font-color">
						<span class="ta-info-middle-span" style="width: 40px; border-right: 1px solid #f0f0f0;">类型</span>
						<span class="ta-info-middle-span" style="width: 79px; border-right: 1px solid #f0f0f0;">Freq/Pci</span>
						<span class="ta-info-middle-span" style="width: 159px;border-right: 1px solid #f0f0f0;">基站</span>
						<span class="ta-info-middle-span" style="width: 50px;">经纬度</span>
					</div>
					<div class="ta-info-content-header-secede CR-blue-font-color">
						<span class="ta-info-middle-span" style="width: 30px;border-right: 1px solid #f0f0f0;">P1</span>
						<span class="ta-info-middle-span" style="width: 50px;border-right: 1px solid #f0f0f0; font-size: 12px;">半径(M)</span>
						
						<span class="ta-info-middle-span" style="width: 62px;">P1时间</span>
					</div>
					<div class="ta-info-content-header-third CR-blue-font-color">
						<span class="ta-info-middle-span" style="width: 146px;border-right: 1px solid #f0f0f0;">编号</span>
						<span class="ta-info-middle-span" style="width: 33px;">GPS</span>
					</div>
					<div class="ta-info-content-header-fourth CR-blue-font-color" style="line-height: 34px;">时间</div>
				</div>
				<div class="ta-info-table CR-scrollY">
				</div>
			</div>
		</div>
		<!-- add by guoshuai end -->
		<!-- 目标所在基站LTE信息 -->
		<div class="target-lte-info-container" style="display:none;">
			<div class="target-lte-info-title"></div>
			<div class="target-lte-info box-shadow">
				<div class="target-lte-info-time"></div>
				<span class="CR-close target-lte-info-container-close"></span>
				<div class="target-lte-system-info">
					<div class="target-lte-system-info-point"></div>				
					<div class="target-lte-system-info-title">Catch信息</div>				
					<div class="target-lte-system-info-base">MCC/MNC/TAC/CI</div>				
					<div class="target-lte-system-info-rssi">RSSI</div>				
					<div class="target-lte-system-info-content">
					
					</div>
				</div>
				<div class="target-lte-nearby-info">
					<div class="target-lte-nearby-info-point"></div>				
					<div class="target-lte-nearby-info-title">Catch邻区</div>				
					<div class="target-lte-nearby-info-pci">EARFCN/PCI</div>				
					<div class="target-lte-nearby-info-rsrp">RSRP</div>				
					<div class="target-lte-nearby-info-rsrq">RSRQ</div>
					<div class="target-lte-info-content-container CR-scrollY">
					
					</div> 
					<div class="target-lte-nearby-info-ta">P1</div>
				</div>
			</div>
		</div>
		<!-- 车速显示 -->
		<%-- <div class="car-speed" style="display: none;">
			<div class="car-speed-value">0</div>
			<div class="car-speed-kmh">km/h</div>
		</div> --%>

		<!-- 持续时长 -->
		<div class="continous-time" hidden>
			<div class="continous-time-value">00:00:00</div>
			<div class="continous-time-title">时长</div>
		</div>

		<!-- 回到当前视角 -->
		<div class="view-default-btn mdui-btn-raised mdui-ripple" hidden>
			<div class="view-default-btn-bg"></div>
		</div>

		<!-- 视角切换 -->
		<div class="view-switch" hidden>
			<div class="view-current-dev">
				<!-- 
			<span class="view-current-username">(陈亮)</span> <img
				class="view-current-dev-img-car" src="img/car_0.png"> <i
				class="mdui-icon material-icons">&#xe5c7;</i>
			 -->
			</div>
			<div class="view-switch-chooser mdui-btn-raised"
				style="height: 0; top: 0; display: none;">
				<div class="choose-container-car"></div>
				<div class="choose-container-single"></div>
				<!-- 
			<div class="choose-container">
				<span>(孙兵)</span> <img class="choose-item-img-single"
					src="img/single_0.png">
			</div>
			<div class="choose-divide-line"></div>
			<div class="choose-container">
				<span>(孙兵)</span> <img class="choose-item-img-car"
					src="img/car.png">
			</div>
			<div class="choose-divide-line"></div>
			<div class="choose-container">
				<span>(孙兵)</span> <img class="choose-item-img-single"
					src="img/single_2.png">
			</div>
			 -->
			</div>
		</div>
		<div class="bottom-time-line-container">
			<div class="view-current-dev-container">
				<%-- <div class="view-current-dev-icon-single"></div>
				<div class="view-current-dev-icon-car"></div>
				<div class="view-current-username-content"></div> --%>
			</div>
			<div class="time-line-area" style="bottom: 6px;left:140px;">
				<div class="eng-column-chart"></div>
				<div class="time-line-container">
					<div class="time-line-divider-container">
						<div class="time-line-blue-cover"></div>
					</div>
					<div class="time-line-marker"></div>
					<div id="time-line-click-cover"
						style="width: 100%; height: 100%; position: absolute;"></div>
				</div>
				<div class="time-line-slider"></div>
				<div class="time-line-mouse-tips"></div>
			</div>

			<%-- <div class="play-btn-container" id="play-btn"></div> --%>
			<div class="case-time-container" style="width:auto;right:30px;">
				<div class="case-time">00:00:00</div>
				</div>
			</div>
		</div>
		<!-- 时间轴 -->
		<div class="time-line-area" hidden>
			<div class="eng-column-chart"></div>
			<div class="time-line-container">
				<div class="time-line-divider-container">
					<div class="time-line-blue-cover"></div>
				</div>
				<div class="time-line-marker"></div>
				<div id="time-line-click-cover"
					style="width: 100%; height: 100%; position: absolute;"></div>
			</div>
			<div class="time-line-slider"></div>
		</div>

	</div>
	<!-- 在此设置中框默认显示状态-->
	<c:if test="${empty sessionScope.REAL_TIME_COMBAT}">
		<div class="guide-frame" style="display: block">
			<!-- delete by guoshuai start 2018-9-28
			<div class="guide-title">实时作战</div>
			<div class="guide-title-line"></div>
			<div class="table-view-container">
			delete by guoshuai end 2018-9-28-->
			<!--add by guoshuai start 2018-9-28-->
			<div class="guide-title" style="margin-left: -22px;">实时作战</div>
			<div class="table-view-container"style="width: 96.35%;">
				<div id="table-view-container-box" style="background:#07203e;">
			<!--add by guoshuai end 2018-9-28-->
					<div class="table-view-search-area">
						<div class="search-type-simple">
							<!-- 模糊搜索-->
							<div
								class="input-group input-group-sm search-item search-item-width-md">
								<span class="input-group-addon input-group-title"
									id="query-key-words">关键词</span> 
								
								<!--add by guoshuai 2018-8-3 start-->
								<input type="text"
									class="form-control input-background"
									placeholder="输入作战成员/城市" id="query-key-word">
								<!--add by guoshuai 2018-8-3 end-->
							</div>
						</div>
						<div class="search-type-all">
							<!-- 作战成员 -->
							<div
								class="input-group input-group-sm search-item search-item-width-sm">
								<span class="input-group-addon input-group-title">作战成员</span> <input
									type="text" class="form-control input-background"
									id="query-user-name">
							</div>
							<!-- 作战城市 -->
							<div
								class="input-group input-group-sm search-item search-item-width-sm">
								<span class="input-group-addon input-group-title" id="query-id">作战城市</span>
								<input type="text" class="form-control input-background"
									id="query-area-code">
							</div>
							
							<!-- 设备编号-->
							<div
								class="input-group input-group-sm search-item search-item-width-sm">
								<span class="input-group-addon input-group-title"
									id="query-phone-num">设备编号</span> <input type="text"
									class="form-control input-background" id="query-dev-code">
							</div>
							<!-- 持续时长-->
							<div
								class="input-group input-group-sm search-item search-item-width-lg">
								<span class="input-group-addon input-group-title"
									id="query-phone-num">持续时长</span> <span class="input-inwords">大于</span><input
									type="text" id="latest-start-time"
									class="form-control input-background input-data-picker-sm"><span
									class="input-inwords">分钟，小于</span><input type="text"
									id="earliest-start-time"
									class="form-control input-background input-data-picker-sm"><span
									class="input-inwords">分钟</span>
							</div>
							<!-- 排除游客-->
							<!--delete by guoshuai start 2018-10-19
							<div
								class="input-group input-group-sm search-item search-item-width-sm">
								<label class="mdui-checkbox" style="margin-left: 70px;">
									<input type="checkbox" /> <i
									class="mdui-checkbox-icon search-page-checkbox"></i><span
									style="color: rgb(204, 204, 204);">排除游客</span>
								</label>
							</div>
							delete by guoshuai end 2018-10-19-->
						</div>
					</div>
					<!--add by guoshuai start 2018-9-29-->
					<div class="search-simple-rule"></div>
					<!--add by guoshuai end 2018-9-29-->
				<!-- 搜索 -->
					<div class="table-view-search-btn">
						<div class="guide-search-btn mdui-ripple">
							<!--delete by guoshuai start 2018-9-29
							<span>搜索</span>
							delete by guoshuai end 2018-9-29-->
						</div>
						<div class="search-mode-switch">
							<span id="search-mode-title-1">条件太少？</span><span class="text-blue"
								id="search-mode-title-2" data-search-type="0"
								style="cursor: pointer; text-decoration: underline;">高级搜索</span>
						</div>
					</div>
				<!--add by guoshuai start 2018-9-28-->
				</div>
				<!--add by guoshuai end 2018-9-28 -->
				

				<!-- 正文 -->
				<div class="table-view-data-area auto-min-height">
					<!--add by guoshuai start 2018-9-28-->
					<div id="view-data-class">
						<div id="view-class">
							<div id="view-class-list"></div>
							<div id="view-class-block"></div>
						</div>
					</div>
					<!--add by guoshuai end 2018-9-28-->
					<table class="view-data-table">
						<tbody id="table-tbody">
							<!-- 
							<tr class="tbody-th">
								<td>作战成员</td>
								<td>起始时间</td>
								<td>持续时长</td>
								<td>省市</td>
								<td>目标手机号</td>
								<td>目标IMSI</td>
								<td>设备</td>
								<td>操作</td>
							</tr>
							<tr class="tbody-tr" id="table-value-content">
								<td title="zhouli/9 chenliang/1 sunbing/3"><div
										class="table-td-user-names"
										style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">zhouli/9
										chenliang/1 sunbing/3</div></td>
								<td><div style="width: 135px; white-space: nowrap;">2018-03-06
										12:11</div></td>
								<td><div style="width: 85px; white-space: nowrap;">1小时19分</div></td>
								<td><div style="width: 100px; white-space: nowrap;">湖北-武汉</div></td>
								<td><div style="width: 110px; white-space: nowrap;">18611111111</div></td>
								<td><div style="width: 135px; white-space: nowrap;">46012323542345</div></td>
								<td title="BBC1500_00002 BBCG401_00337 BBCG401_12121"><div
										class="table-td-used-devs"
										style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">BBC1500_00002
										BBCG401_00337 BBCG401_12121</div></td>
								<td>
									<div style="width: 67px;">
										<div class="mdui-ripple command-btn">指挥</div>
									</div>
								</td>
							</tr>
							 -->
						</tbody>
					</table>
					<!--add by guoshuai start 2018-9-28-->
					<table class="view-data-block"></table>
					<!--add by guoshuai end 2018-9-28-->
					<!-- 暂无数据-->
					<div class="no-data-realtime" style="display: none;">
						<img class="no-data-icon" src="img/no_data_icon_realtime.png">
						<span class="no-data-word">暂无正在进行的作战</span>
					</div>
				</div>

				<!-- 底部分页 -->
				<div class="page-selector">
					<div class="item-count-selector">
						每页：
						<div class="btn-group dropup">
							<button type="button" style="background: #08264a; color: #fff;border:1px solid #174275;"
								class="btn btn-default btn-sm dropdown-toggle"
								data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								<span class="show-item-num" style="display: block; float: left;">30条</span> <span class="caret"style="
									display: block;
									float: left;
									margin-top:3px;
									width: 12px;
									height: 12px;
									border: none;
									margin-left:6px;
									background: url('img/iconpic/eig-slideup.png');
									background-size:100% 100%;
								"></span>
							</button>
							<ul class="dropdown-menu">
								<li><a class="total-count-selector"><span>10</span>条</a></li>
								<li><a class="total-count-selector"><span>20</span>条</a></li>
								<li><a class="total-count-selector"><span>30</span>条</a></li>
								<li><a class="total-count-selector"><span>40</span>条</a></li>
								<li><a class="total-count-selector"><span>50</span>条</a></li>
							</ul>
						</div>
						&nbsp;&nbsp;总共<span id="total-count"></span>条<span id="total-page-num"></span>
					</div>
					<div class="m-style pagination M-box3"></div>
				</div>
			</div>

		</div>
	</c:if>

	<div class="search-loading">
		<img class="loading-gif" src="img/loading.gif"> <span
			class="loading-word">数据处理中...</span>
	</div>

	<div class="tip-content">
		 <span class="tip-word">暂无该基站信息</span>
	</div>

	<div class="history-loading">
		<img class="loading-gif" src="img/loading.gif"> <span
			class="loading-word">绘制历史路径...</span>
	</div>

	<!-- 
	<button class="myCosButton re-search" data-toggle="modal"
		data-target="#reset-search-modal">结束指挥</button>
	 -->

	<!-- Modal重置搜索确认 -->
	<div class="modal fade bs-example-modal-sm" id="reset-search-modal"
		data-backdrop="static" data-keyboard="false" tabindex="-1"
		role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog modal-sm" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title" id="myModalLabel">确认</h4>
				</div>
				<div class="modal-body" id="modal-research-content">是否结束指挥？</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-primary"
						id="reset-search-submit">确定</button>
				</div>
			</div>
		</div>
	</div>
	<!-- Modal删除点标记确认 -->
	<div class="modal fade bs-example-modal-sm"
		id="delete-pointmarks-modal" tabindex="-1" role="dialog"
		data-backdrop="static" data-keyboard="false"
		aria-labelledby="myModalLabel">
		<div class="modal-dialog modal-sm" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title" id="myModalLabel">警告</h4>
				</div>
				<div class="modal-body">这将删除所有点标记</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default"
						id="drawing-clear-all-ensure">确定</button>
					<button type="button" class="btn btn-primary" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Modal-Alert提示框 -->
	<div class="modal fade bs-example-modal-sm" id="alert-modal"
		data-backdrop="static" data-keyboard="false" tabindex="-1"
		role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog modal-sm" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title" id="alert-modal-title">提示</h4>
				</div>
				<div class="modal-body" id="alert-modal-content"></div>
				<div class="modal-footer">
					<button type="button" id="alert-modal-button"
						class="btn btn-primary" data-dismiss="modal">确定</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Modal-无GPS -->
	<div class="modal fade bs-example-modal-sm" id="nogps-modal"
		data-backdrop="static" data-keyboard="false" tabindex="-1"
		role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog modal-sm" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title" id="nogps-modal-title">提示</h4>
				</div>
				<div class="modal-body" id="nogps-modal-content">当前作战中设备无GPS信息</div>
				<div class="modal-footer">
					<button type="button" id="nogps-modal-button"
						class="btn btn-primary" data-dismiss="modal">返回上一页</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Modal-作战结束 -->
	<div class="modal fade bs-example-modal-sm" id="real-combat-end-modal"
		data-backdrop="static" data-keyboard="false" tabindex="-1"
		role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog modal-sm" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<!-- <button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button> -->
					<h4 class="modal-title" id="myModalLabel">作战结束</h4>
				</div>
				<div class="modal-body">
					<div style="width: 100%; text-align: center;">
						<span id="case-end-type"></span>，得分<span
							id="real-combat-end-score"></span>
					</div>
					<div class="real-combat-end-star"></div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" id="href-to-home">返回首页</button>
					<!-- <button type="button" class="btn btn-default" id="href-to-home"
						data-dismiss="modal">留在此页</button> -->
				</div>
			</div>
		</div>
	</div>

	<!-- 高级面板-->
	<div class="modal fade bs-example-modal-lg" id="advance-info-panel"
		data-backdrop="static" data-keyboard="false" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">高级面板</h4>
					<div class="btn-group"
						style="position: absolute; left: 100px; top: 10px; cursor: pointer;">
						<button type="button" class="btn btn-default dropdown-toggle"
							data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
							id="default-advance-info-panel-dev">
							<!-- BBC1500_00022&nbsp;<span style="color: #566ae2">(陈亮)</span> <span
								class="caret"></span> -->
						</button>
						<ul class="dropdown-menu" id="advance-info-panel-dev-selector">
							<!-- 
							<li><a>BBCG402_00337&nbsp;<span style="color: #566ae2">(孙兵)</span></a></li>
							<li><a>BBCG402_12121&nbsp;<span style="color: #566ae2">(杨竞)</span></a></li>
							 -->
						</ul>
					</div>
				</div>
				<div class="modal-body" id="advance-info-content-body">
					<div class="advance-info-content" style="display: none;">
						<div class="channel-info-area">
							<div class="info-block-title">通道信息</div>
							<div class="channel-info-table-border">
								<table class="channel-info-table">
									<thead>
										<tr>
											<th style="width: 81px;">频点/PCI</th>
											<th style="width: 155px;">TAC/CI</th>
											<th style="width: 82px;">解析</th>
											<th style="width: 54px;">中标数</th>
											<th style="width: 39px;">场强</th>
											<th style="width: 37px;">增益</th>
										</tr>
									</thead>
									<tbody class="channel-info-table-tbody">
										<tr>
											<td style="width: 81px;">1650-353</td>
											<td style="width: 155px;">134477-46545445</td>
											<td style="width: 82px; color: rgb(0, 125, 222)">15%-18%</td>
											<td style="width: 54px;">37</td>
											<td style="width: 39px; color: #ff0000">-154</td>
											<td style="width: 37px;">13</td>
										</tr>
										<tr>
											<td style="width: 81px;">1650-353</td>
											<td style="width: 155px;">134477-46545445</td>
											<td style="width: 82px; color: rgb(0, 125, 222)">15%-18%</td>
											<td style="width: 54px;">37</td>
											<td style="width: 39px; color: #ff0000">-154</td>
											<td style="width: 37px;">13</td>
										</tr>
										<tr>
											<td style="width: 81px;">1650-353</td>
											<td style="width: 155px;">134477-46545445</td>
											<td style="width: 82px; color: rgb(0, 125, 222)">15%-18%</td>
											<td style="width: 54px;">37</td>
											<td style="width: 39px; color: #ff0000">-154</td>
											<td style="width: 37px;">13</td>
										</tr>
										<tr>
											<td style="width: 81px;">1650-353</td>
											<td style="width: 155px;">134477-46545445</td>
											<td style="width: 82px; color: rgb(0, 125, 222)">15%-18%</td>
											<td style="width: 54px;">37</td>
											<td style="width: 39px; color: #ff0000">-154</td>
											<td style="width: 37px;">13</td>
										</tr>
										<tr>
											<td style="width: 81px;">1650-353</td>
											<td style="width: 155px;">134477-46545445</td>
											<td style="width: 82px; color: rgb(0, 125, 222)">15%-18%</td>
											<td style="width: 54px;">37</td>
											<td style="width: 39px; color: #ff0000">-154</td>
											<td style="width: 37px;">13</td>
										</tr>
										<tr>
											<td style="width: 81px;">1650-353</td>
											<td style="width: 155px;">134477-46545445</td>
											<td style="width: 82px; color: rgb(0, 125, 222)">15%-18%</td>
											<td style="width: 54px;">37</td>
											<td style="width: 39px; color: #ff0000">-154</td>
											<td style="width: 37px;">13</td>
										</tr>
										<tr>
											<td style="width: 81px;">1650-353</td>
											<td style="width: 155px;">134477-46545445</td>
											<td style="width: 82px; color: rgb(0, 125, 222)">15%-18%</td>
											<td style="width: 54px;">37</td>
											<td style="width: 39px; color: #ff0000">-154</td>
											<td style="width: 37px;">13</td>
										</tr>
										<tr>
											<td style="width: 81px;">1650-353</td>
											<td style="width: 155px;">134477-46545445</td>
											<td style="width: 82px; color: rgb(0, 125, 222)">15%-18%</td>
											<td style="width: 54px;">37</td>
											<td style="width: 39px; color: #ff0000">-154</td>
											<td style="width: 37px;">13</td>
										</tr>
										<tr>
											<td style="width: 81px;">1650-353</td>
											<td style="width: 155px;">134477-46545445</td>
											<td style="width: 82px; color: rgb(0, 125, 222)">15%-18%</td>
											<td style="width: 54px;">37</td>
											<td style="width: 39px; color: #ff0000">-154</td>
											<td style="width: 37px;">13</td>
										</tr>
										<tr>
											<td style="width: 81px;">1650-353</td>
											<td style="width: 155px;">134477-46545445</td>
											<td style="width: 82px; color: rgb(0, 125, 222)">15%-18%</td>
											<td style="width: 54px;">37</td>
											<td style="width: 39px; color: #ff0000">-154</td>
											<td style="width: 37px;">13</td>
										</tr>
										<tr>
											<td style="width: 81px;">1650-353</td>
											<td style="width: 155px;">134477-46545445</td>
											<td style="width: 82px; color: rgb(0, 125, 222)">15%-18%</td>
											<td style="width: 54px;">37</td>
											<td style="width: 39px; color: #ff0000">-154</td>
											<td style="width: 37px;">13</td>
										</tr>
										<tr>
											<td style="width: 81px;">1650-353</td>
											<td style="width: 155px;">134477-46545445</td>
											<td style="width: 82px; color: rgb(0, 125, 222)">15%-18%</td>
											<td style="width: 54px;">37</td>
											<td style="width: 39px; color: #ff0000">-154</td>
											<td style="width: 37px;">13</td>
										</tr>
										<tr>
											<td style="width: 81px;">1650-353</td>
											<td style="width: 155px;">134477-46545445</td>
											<td style="width: 82px; color: rgb(0, 125, 222)">15%-18%</td>
											<td style="width: 54px;">37</td>
											<td style="width: 39px; color: #ff0000">-154</td>
											<td style="width: 37px;">13</td>
										</tr>
										<tr>
											<td style="width: 81px;">1650-353</td>
											<td style="width: 155px;">134477-46545445</td>
											<td style="width: 82px; color: rgb(0, 125, 222)">15%-18%</td>
											<td style="width: 54px;">37</td>
											<td style="width: 39px; color: #ff0000">-154</td>
											<td style="width: 37px;">13</td>
										</tr>
										<tr>
											<td style="width: 81px;">1650-353</td>
											<td style="width: 155px;">134477-46545445</td>
											<td style="width: 82px; color: rgb(0, 125, 222)">15%-18%</td>
											<td style="width: 54px;">37</td>
											<td style="width: 39px; color: #ff0000">-154</td>
											<td style="width: 37px;">13</td>
										</tr>
										<tr>
											<td style="width: 81px;">1650-353</td>
											<td style="width: 155px;">134477-46545445</td>
											<td style="width: 82px; color: rgb(0, 125, 222)">15%-18%</td>
											<td style="width: 54px;">37</td>
											<td style="width: 39px; color: #ff0000">-154</td>
											<td style="width: 37px;">13</td>
										</tr>
										<tr>
											<td style="width: 81px;">1650-353</td>
											<td style="width: 155px;">134477-46545445</td>
											<td style="width: 82px; color: rgb(0, 125, 222)">15%-18%</td>
											<td style="width: 54px;">37</td>
											<td style="width: 39px; color: #ff0000">-154</td>
											<td style="width: 37px;">13</td>
										</tr>
										<tr>
											<td style="width: 81px;">1650-353</td>
											<td style="width: 155px;">134477-46545445</td>
											<td style="width: 82px; color: rgb(0, 125, 222)">15%-18%</td>
											<td style="width: 54px;">37</td>
											<td style="width: 39px; color: #ff0000">-154</td>
											<td style="width: 37px;">13</td>
										</tr>
										<tr>
											<td style="width: 81px;">1650-353</td>
											<td style="width: 155px;">134477-46545445</td>
											<td style="width: 82px; color: rgb(0, 125, 222)">15%-18%</td>
											<td style="width: 54px;">37</td>
											<td style="width: 39px; color: #ff0000">-154</td>
											<td style="width: 37px;">13</td>
										</tr>
										<tr>
											<td style="width: 81px;">1650-353</td>
											<td style="width: 155px;">134477-46545445</td>
											<td style="width: 82px; color: rgb(0, 125, 222)">15%-18%</td>
											<td style="width: 54px;">37</td>
											<td style="width: 39px; color: #ff0000">-154</td>
											<td style="width: 37px;">13</td>
										</tr>
										<tr>
											<td style="width: 81px;">1650-353</td>
											<td style="width: 155px;">134477-46545445</td>
											<td style="width: 82px; color: rgb(0, 125, 222)">15%-18%</td>
											<td style="width: 54px;">37</td>
											<td style="width: 39px; color: #ff0000">-154</td>
											<td style="width: 37px;">13</td>
										</tr>
										<tr>
											<td style="width: 81px;">1650-353</td>
											<td style="width: 155px;">134477-46545445</td>
											<td style="width: 82px; color: rgb(0, 125, 222)">15%-18%</td>
											<td style="width: 54px;">37</td>
											<td style="width: 39px; color: #ff0000">-154</td>
											<td style="width: 37px;">13</td>
										</tr>
										<tr>
											<td style="width: 81px;">1650-353</td>
											<td style="width: 155px;">134477-46545445</td>
											<td style="width: 82px; color: rgb(0, 125, 222)">15%-18%</td>
											<td style="width: 54px;">37</td>
											<td style="width: 39px; color: #ff0000">-154</td>
											<td style="width: 37px;">13</td>
										</tr>
										<tr>
											<td style="width: 81px;">1650-353</td>
											<td style="width: 155px;">134477-46545445</td>
											<td style="width: 82px; color: rgb(0, 125, 222)">15%-18%</td>
											<td style="width: 54px;">37</td>
											<td style="width: 39px; color: #ff0000">-154</td>
											<td style="width: 37px;">13</td>
										</tr>
										<tr>
											<td style="width: 81px;">1650-353</td>
											<td style="width: 155px;">134477-46545445</td>
											<td style="width: 82px; color: rgb(0, 125, 222)">15%-18%</td>
											<td style="width: 54px;">37</td>
											<td style="width: 39px; color: #ff0000">-154</td>
											<td style="width: 37px;">13</td>
										</tr>
										<tr>
											<td style="width: 81px;">1650-353</td>
											<td style="width: 155px;">134477-46545445</td>
											<td style="width: 82px; color: rgb(0, 125, 222)">15%-18%</td>
											<td style="width: 54px;">37</td>
											<td style="width: 39px; color: #ff0000">-154</td>
											<td style="width: 37px;">13</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div class="uplink-gain-info-area">
							<div class="info-block-title">上行增益</div>
							<div class="uplink-gain-info-content">
								<div class="uplink-gain-status-line">
									<div class="uplink-gain-status-gray-cover" style="width: 30%"></div>
									<div class="uplink-gain-status-pot" style="left: 70%;"></div>
								</div>
								<div class="uplink-gain-status-value">12</div>
							</div>
						</div>
						<div class="statistical-info-area">
							<div class="info-block-title">统计信息</div>
							<ul class="nav nav-tabs statistical-info-nav">
								<li role="presentation" class="active"><a>LTE统计一</a></li>
								<li role="presentation"><a>LTE统计二</a></li>
								<li role="presentation"><a>LTE目标状态显示</a></li>
							</ul>
							<div class="statistical-info-table-border">
								<table class="statistical-info-table">
									<thead>
										<tr>
											<th>时间</th>
											<th>次数</th>
											<th>标识1</th>
											<th>标识2</th>
											<th>tac</th>
											<th>ci</th>
											<th>level</th>
										</tr>
									</thead>
									<tbody>
										<tr>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>

				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				</div>
			</div>
		</div>
	</div>

	<div class="full-screen"></div>

	<!-- 自测数据 
	<div style="position: absolute; left: 10px; top: 500px;">
		<button id="send-test-btn">发送设备数据</button>
	</div>-->

	<audio id="engAudioPlay" src="" hidden="true"></audio>
	<audio id="passiveAudioPlay" src="" hidden="true"></audio>
	<!--add by guo shuai start 2018-11-30-->
	<!-- 基站查询模态框-->
	<div class="search-bts-containers box-shadow">
		<div class="modal-header" style="color: #333; width:100%; height:52px; padding:0; border-color:#17c1f4">
			<div class="move_search_modal">基站查询</div>
			<span aria-hidden="true" class="close_search_modal"></span>
		</div>
		<div class="modal-body" style="overflow: hidden; margin-left: -12px; min-height:360px;">
			<!--切换模式-->
			<div class="mode_radio_selected">
				<label class="mdui-radio" id="classic_mode"> 
					<input type="radio" name="group1" id="classic_mode_input" checked />
					<i class="mdui-radio-icon"></i>经典输入
				</label>
				<label class="mdui-radio" id="paste_mode"> 
					<input type="radio" name="group1" id="paste_mode_input" /> 
					<i class="mdui-radio-icon"></i>粘贴识别
				</label>
			</div>
			<!--经典模式-->
			<div class="search_bts_classic_mode">
				<div class="input-group input-group-sm modal-input new_style_search_bts">
					<span class="">MNC</span>
					<div class="btn-group" id="mncType-box" data-type="add">
						<button type="button" id="dev-button"
						style="width: 214px; text-align: left; border: 1px solid #174275; background: #011731; color: #fff;height:30px;margin-left: 34px;"
						class="btn btn-default btn-sm dropdown-toggle"
						data-toggle="dropdown" aria-haspopup="true"
						aria-expanded="false">
						<span id="mncType"style="
								text-overflow: ellipsis;
								overflow: hidden;
								width: 165px !important;
								display: block;
								float: left;
							">中国移动</span> <span class="careta" style="float: right;"></span>
						</button>
						<ul class="dropdown-menu" style="width: 214px; background: rgb(40, 40, 40) ;background: #08264a; margin-left: 34px;" id="devUseTypeSelect">
							<li><a class="dropdown-menu-selector mnc-selector" data-dev-id="">中国移动</a></li>
							<li><a class="dropdown-menu-selector mnc-selector" data-dev-id="">中国联通</a></li>
							<li><a class="dropdown-menu-selector mnc-selector" data-dev-id="">中国电信</a></li>
						</ul>
					</div>
				</div>
				<!--中国移动网络制式-->
				<div id="mob-netWork">
					<div class="input-group input-group-sm modal-input new_style_search_bts">
						<span class="">网络制式</span>
						<div class="btn-group" id="networkType-box" data-type="add">
							<button type="button" id="dev-button"
							style="width: 214px; text-align: left; border: 1px solid #174275; background: #011731; color: #fff;height:30px; margin-left:11px;"
							class="btn btn-default btn-sm dropdown-toggle"
							data-toggle="dropdown" aria-haspopup="true"
							aria-expanded="false">
							<span id="mob-networkType"style="
									text-overflow: ellipsis;
									overflow: hidden;
									width: 165px !important;
									display: block;
									float: left;
								">LTE</span> <span class="careta" style="float: right;"></span>
							</button>
							<ul class="dropdown-menu" style="width: 214px; background: rgb(40, 40, 40) ;background: #08264a; margin-left:11px;" id="devUseTypeSelect">
								<li><a class="dropdown-menu-selector mob-network-selector">LTE</a></li>
								<li><a class="dropdown-menu-selector mob-network-selector">GSM</a></li>
							</ul>
						</div>
					</div>
				</div>
				<!--中国联通网络制式-->
				<div id="uni-netWork" style="display: none;">
					<div class="input-group input-group-sm modal-input new_style_search_bts">
						<span class="">网络制式</span>
						<div class="btn-group" id="networkType-box" data-type="add">
							<button type="button" id="dev-button"
							style="width: 214px; text-align: left; border: 1px solid #174275; background: #011731; color: #fff;height:30px; margin-left:10px;"
							class="btn btn-default btn-sm dropdown-toggle"
							data-toggle="dropdown" aria-haspopup="true"
							aria-expanded="false">
							<span id="uni-networkType"style="
									text-overflow: ellipsis;
									overflow: hidden;
									width: 165px !important;
									display: block;
									float: left;
								">LTE</span> <span class="careta" style="float: right;"></span>
							</button>
							<ul class="dropdown-menu" style="width: 214px; background: rgb(40, 40, 40) ;background: #08264a ; margin-left:10px;" id="devUseTypeSelect">
								<li><a class="dropdown-menu-selector uni-network-selector">LTE</a></li>
								<li><a class="dropdown-menu-selector uni-network-selector">GSM</a></li>
								<li><a class="dropdown-menu-selector uni-network-selector">WCDMA</a></li>
							</ul>
						</div>
					</div>
				</div>
				<!--中国电信网络制式-->
				<div id="tel-netWork" style="display: none;">
					<div class="input-group input-group-sm modal-input new_style_search_bts">
						<span class="">网络制式</span>
						<div class="btn-group" id="networkType-box" data-type="add">
							<button type="button" id="dev-button"
							style="width: 214px; text-align: left; border: 1px solid #174275; background: #011731; color: #fff;height:30px; margin-left:10px;"
							class="btn btn-default btn-sm dropdown-toggle"
							data-toggle="dropdown" aria-haspopup="true"
							aria-expanded="false">
							<span id="tel-networkType"style="
									text-overflow: ellipsis;
									overflow: hidden;
									width: 165px !important;
									display: block;
									float: left;
								">LTE</span> <span class="careta" style="float: right;"></span>
							</button>
							<ul class="dropdown-menu" style="width: 214px; background: rgb(40, 40, 40) ;background: #08264a ; margin-left:10px;" id="devUseTypeSelect">
								<li><a class="dropdown-menu-selector tel-network-selector">LTE</a></li>
								<li><a class="dropdown-menu-selector tel-network-selector">CDMA</a></li>
							</ul>
						</div>
					</div>
				</div>
				<!-- 不含CDMA -->
				<div id="no-cdma" style="position: relative;">
					<div class="input-group input-group-sm modal-input new_style_search_bts">
						<span class="serach_span">LAC/TAC</span>
						<input type="text" class="form-control modal-input-area modal-input-background input-space-forbidden input-num-only no-cdma-lac-tac search_input" id="ten-lac-tac"
							placeholder="1~65535" maxlength="5"
						>

						<input type="text" class="form-control modal-input-area modal-input-background input-space-forbidden input-num-word no-cdma-lac-tac search_input" id="sixteen-lac-tac"
							placeholder="1~FFFF" maxlength="4" style="display: none;"
						>
						<span class="input-check isTrue" id="is-lacTac-true"></span>
					</div>
					<div class="input-group input-group-sm modal-input new_style_search_bts">
						<span class="serach_span">CI</span>
						<input type="text" class="form-control modal-input-area modal-input-background input-space-forbidden input-num-only no-cdma-ci search_input" id="ten-ci"
							placeholder="2G(1~65535) 3G/4G(1~268435455)" maxlength="9" style="left:35px;"
						>
						<input type="text" class="form-control modal-input-area modal-input-background input-space-forbidden input-num-word no-cdma-ci search_input" id="sixteen-ci"
							placeholder="2G(1~FFFF) 3G/4G(1~FFFFFFF)" maxlength="7" style="display: none;left:35px;"
						>
						<span class="input-check isTrue" id="is-ci-true"></span>
					</div>
				</div>
				<!-- 含CDMA -->
				<div id="cdma">
					<div class="input-group input-group-sm modal-input new_style_search_bts">
						<span class="serach_span">SID</span>
						<input type="text" class="form-control modal-input-area modal-input-background input-space-forbidden input-num-only cdma-sid search_input" id="ten-sid"
							placeholder="0~32767" maxlength="5" style="left:42px;"
						>
						<input type="text" class="form-control modal-input-area modal-input-background input-space-forbidden input-num-word cdma-sid search_input" id="sixteen-sid"
							placeholder="0~7F73" maxlength="4" style="left:42px;"
						>
						<span class="input-check isTrue" id="is-sid-true"></span>
					</div>
					<div class="input-group input-group-sm modal-input new_style_search_bts">
						<span class="serach_span">NID</span>
						<input type="text" class="form-control modal-input-area modal-input-background input-space-forbidden input-num-only cdma-nid search_input" id="ten-nid"
							placeholder="0~65535" maxlength="5" style="left:42px;"
						>
						<input type="text" class="form-control modal-input-area modal-input-background input-space-forbidden input-num-word cdma-nid search_input" id="sixteen-nid"
							placeholder="0~FFFF" maxlength="4" style="left:42px;"
						>
						<span class="input-check isTrue" id="is-nid-true"></span>
					</div>
					<div class="input-group input-group-sm modal-input new_style_search_bts">
						<span class="serach_span">BID</span>
						<input type="text" class="form-control modal-input-area modal-input-background input-space-forbidden input-num-only cdma-bid search_input" id="ten-bid"
							placeholder="1~65535" maxlength="5" style="left:42px;"
						>
						<input type="text" class="form-control modal-input-area modal-input-background input-space-forbidden input-num-word cdma-bid search_input" id="sixteen-bid"
							placeholder="1~FFFF" maxlength="4" style="left:42px;"
						>
						<span class="input-check isTrue" id="is-bid-true"></span>
					</div>
				</div>
				<!--来源-->
				<div id="paste-source">
					<div class="input-group input-group-sm modal-input new_style_search_bts">
						<span class="">来源</span>
						<div class="btn-group" id="networkType-box" data-type="add">
							<button type="button" id="dev-button"
							style="width: 214px; text-align: left; border: 1px solid #174275; background: #011731; color: #fff;height:30px;margin-left: 40px;"
							class="btn btn-default btn-sm dropdown-toggle"
							data-toggle="dropdown" aria-haspopup="true"
							aria-expanded="false">
							<span id="source-networkType"style="
									text-overflow: ellipsis;
									overflow: hidden;
									width: 165px !important;
									display: block;
									float: left;
								">源1</span> <span class="careta" style="float: right;"></span>
							</button>
							<ul class="dropdown-menu" style="width: 214px; background: rgb(40, 40, 40) ;background: #08264a; margin-left:40px;" id="devUseTypeSelect">
								<li><a class="dropdown-menu-selector source-network-selector">源1</a></li>
								<li><a class="dropdown-menu-selector source-network-selector">源2</a></li>
								<li><a class="dropdown-menu-selector source-network-selector">源3</a></li>
							</ul>
						</div>
					</div>
				</div>
				<div class="input-group input-group-sm modal-input new_style_search_bts" id="no-cdma-hex">
					<span class="" id="bts-hex">HEX</span>
					<div class="myCheckBox" id="ten-radio">
						<input type="radio" id="ten-binary-system" name="radio" checked>
						<label for="ten-binary-system"></label>
					</div>
					<div class="binary-system">10进制</div>
					<div class="myCheckBox" id="sixteen-radio">
						<input type="radio" id="sixteen-binary-system" name="radio">
						<label for="sixteen-binary-system"></label>
					</div>
					<div class="binary-system">16进制</div>
				</div>
			</div>
			<!--粘贴模式-->
			<div class="search_bts_paste_mode">
				<div id="paste-netWork">
					<div class="input-group input-group-sm modal-input new_style_search_bts">
						<span class="">网络制式</span>
						<div class="btn-group" id="networkType-box" data-type="add">
							<button type="button" id="dev-button"
							style="width: 214px; text-align: left; border: 1px solid #174275; background: #011731; color: #fff;height:30px; margin-left:10px;"
							class="btn btn-default btn-sm dropdown-toggle"
							data-toggle="dropdown" aria-haspopup="true"
							aria-expanded="false">
							<span id="paste-networkType"style="
									text-overflow: ellipsis;
									overflow: hidden;
									width: 165px !important;
									display: block;
									float: left;
								">LTE</span> <span class="careta" style="float: right;"></span>
							</button>
							<ul class="dropdown-menu" style="width: 214px; background: rgb(40, 40, 40) ;background: #08264a ; margin-left:10px;" id="devUseTypeSelect">
								<li><a class="dropdown-menu-selector paste-network-selector">LTE</a></li>
								<li><a class="dropdown-menu-selector paste-network-selector">GSM</a></li>
								<li><a class="dropdown-menu-selector paste-network-selector">WCDMA</a></li>
								<li><a class="dropdown-menu-selector paste-network-selector">CDMA</a></li>
							</ul>
						</div>
					</div>
				</div>
				<!--粘贴基站ID-->
				<div class="input-group input-group-sm modal-input new_style_search_bts">
					<span class="serach_span">基站ID</span>
					<input type="text" class="form-control modal-input-area modal-input-background input-space-forbidden search_input" id="paste_btsId">
					<span class="input-check" id="is-paste_btsId-true"></span>
				</div>
				<!--来源-->
				<div id="paste-source">
					<div class="input-group input-group-sm modal-input new_style_search_bts">
						<span class="">来源</span>
						<div class="btn-group" id="networkType-box" data-type="add">
							<button type="button" id="dev-button"
							style="width: 214px; text-align: left; border: 1px solid #174275; background: #011731; color: #fff;height:30px; margin-left: 40px;"
							class="btn btn-default btn-sm dropdown-toggle"
							data-toggle="dropdown" aria-haspopup="true"
							aria-expanded="false">
							<span id="source-networkType2"style="
									text-overflow: ellipsis;
									overflow: hidden;
									width: 165px !important;
									display: block;
									float: left;
								">源1</span> <span class="careta" style="float: right;"></span>
							</button>
							<ul class="dropdown-menu" style="width: 214px; background: rgb(40, 40, 40) ;background: #08264a; margin-left: 40px;" id="devUseTypeSelect">
								<li><a class="dropdown-menu-selector source-network-selector-2">源1</a></li>
								<li><a class="dropdown-menu-selector source-network-selector-2">源2</a></li>
								<li><a class="dropdown-menu-selector source-network-selector-2">源3</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="modal-footer" style="border-color: #17c1f4;">
			<button type="button" class="btn btn-primary dept-selector-ensure" id="bts-search-ensure">查询</button>
			<button type="button" id="bts-mark-delete" class="btn btn-default">清除基站</button>
		</div>
	</div>
	<!--add by guo shuai end 2018-11-30-->
</body>
<script type="text/javascript">
	const username = "${sessionScope.user.username}";
	/**add by gaochao start */
	const realname = "${sessionScope.user.realname}";
	/**add by gaochao end*/
	const projectUrl = "${pageContext.request.serverName}${':'}${pageContext.request.serverPort}${pageContext.request.contextPath}";
	const combatvoCaseSerial = "${sessionScope.REAL_TIME_COMBAT.serialNum}";
	/*add by guoshuai start 2018-9-28*/
	$('#uo-sp2').text(username);
	/*add by guoshuai end 2018-9-28*/
	const menuList =
<%=session.getAttribute("menuPerms")%>
	;
	Array.prototype.removeByValue = function(val) {
		for (let i = 0; i < this.length; i++) {
			if (this[i] == val) {
				this.splice(i, 1);
				break;
			}
		}
	}
	Array.prototype.unique = function() {
		var res = [];
		var json = {};
		for (let i = 0; i < this.length; i++) {
			if (!json[this[i]]) {
				res.push(this[i]);
				json[this[i]] = 1;
			}
		}
		return res;
	}

	/* 新版添加js代码*/
	$('.table-td-user-names').css('width', ($(window).width() - 1025) * 0.45); // 表格td自适应
	$('.table-td-used-devs').css('width', ($(window).width() - 1000) * 0.55);
	window.addEventListener('resize', function() {
		$('.table-td-user-names').css('width',
				($(window).width() - 1025) * 0.45);
		$('.table-td-used-devs')
				.css('width', ($(window).width() - 1000) * 0.55);
		$('.advance-info-content').css('height', $(window).height() - 350);
		$('.channel-info-table-border').css('height',
				$('.advance-info-content').height() - 30);
		$('.channel-info-table-tbody').css('height',
				$('.advance-info-content').height() - 70);
		$('.statistical-info-table-border').css('height',
				$('.advance-info-content').height() - 198);
	}, false);
	/* 切换搜索模式*/
	$('.search-type-all').css('display', 'none');
	$('#search-mode-title-2').click(function() {
		if ($(this).attr('data-search-type') == 0) {
			$('.search-type-all').css('display', 'block');
			$('.search-type-simple').css('display', 'none');
			$('#search-mode-title-1').html('条件太多？');
			$('#search-mode-title-2').html('简单搜索');
			$(this).attr('data-search-type', '1');
			/*add by guoshuai start 2018-9-28*/
			$('#table-view-container-box').css('height','135');
			$('.search-simple-rule').css('height','110');
			$('.page-selector').css('margin-top','0');
			/*add by guoshuai end 2018-9-28*/
		} else {
			$('.search-type-all').css('display', 'none');
			$('.search-type-simple').css('display', 'block');
			$('#search-mode-title-1').html('条件太少？');
			$('#search-mode-title-2').html('高级搜索');
			$(this).attr('data-search-type', '0');
			/*add by guoshuai start 2018-9-28*/
			$('#table-view-container-box').css('height','80');
			$('.search-simple-rule').css('height','52');
			$('.page-selector').css('margin-top','160');
			/*add by guoshuai end 2018-9-28*/
		}
	});

	/* 上传坐标点类*/
	let TargetLocationBean = function(devCode, locationType, lng, lat, radius,
			status) {
		this.devCode = devCode;
		this.locationType = locationType;
		this.lng = lng;
		this.lat = lat;
		this.radius = radius;
		this.status = status;
	}
	/*add by guoshuai start 2018-9-28*/
	$('#view-class-block').click(function(){
		if($('.no-data-realtime').css("display")=='block'){
			$('.view-data-block').css('display','none');
		}else{
			$('.view-data-block').css('display','block');
		}
		$('#view-class-list').css({'background':'url("img/iconpic/eig-table-unattack.png") no-repeat 10px 10px','background-size':' 50% 50%'});
		$('.view-data-table').css({'display':'none','border-top':'none','border-bottom':'none'});
		$('#view-class-block').css({'background':'url("img/iconpic/eig-block-attack.png") no-repeat 10px 10px','background-size':' 50% 50%'});
	});
	$('#view-class-list').click(function(){
		$('.view-data-block').css('display','none');
		$('#view-class-list').css({'background':'url("img/iconpic/eig-table-attack.png") no-repeat 10px 10px','background-size':' 50% 50%'});
		$('.view-data-table').css({'display':'block','border':'none','border-top':'none','border-bottom':'none'});
		$('#view-class-block').css({'background':'url("img/iconpic/eig-block-un.png") no-repeat 10px 10px','background-size':' 50% 50%'});
	});
	/*add by guoshuai end 2018-9-28*/
</script>
<!-- 相关变量的声明 -->
<script type="text/javascript"
	src="js/src/app/page/realTimeCombat/declaration.js?v=2.1.892231"></script>
<!--百度地图-->
<script type="text/javascript">
	let map = new BMap.Map('allmap', {
		enableMapClick : false
	}); // 禁用显示标注详细信息
	map.centerAndZoom(new BMap.Point(114.2814580000, 30.5249590000), 6);
	/* 添加地图类型控件*/
	// map.addControl(new BMap.MapTypeControl({
	// 	mapTypes : [ BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP, BMAP_HYBRID_MAP ],
	// 	anchor : BMAP_ANCHOR_TOP_LEFT,
	// 	offset : new BMap.Size(65, 70)
	// }));
	/* 开启鼠标滚轮缩放*/
	map.enableScrollWheelZoom(true);
	/* 禁止双击放大*/
	map.disableDoubleClickZoom();
	/* 开启键盘控制功能*/
	map.enableKeyboard();
	/* zoom缩小，触发显示点聚合*/
	map.setZoom(12);
	/* 地图缩放与移动控件*/
	// let mapNavigation = new BMap.NavigationControl({
	// 	offset : new BMap.Size(10, 60)
	// });
	// map.addControl(mapNavigation);
	// /* 距离比例尺*/
	let mapScale = new BMap.ScaleControl({
		anchor : BMAP_ANCHOR_TOP_RIGHT,
		offset : new BMap.Size(180, 48)
	});
	map.addControl(mapScale);
	let stCtrl = new BMap.PanoramaControl(); //构造全景控件
	stCtrl.setOffset(new BMap.Size(13, 51));
	map.addControl(stCtrl);//添加全景控件
	$('.pano_close').css({
		'right':'13px',
		'top':'51px'
	});
	// Firefox和Chrome早期版本中带有前缀
	var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
	// 选择目标节点
	var target = document.querySelector('.pano_close');
	// 创建观察者对象
	var observer = new MutationObserver(function (mutations) {
		mutations.forEach(function (mutation) {
			if($('.pano_close').css('display')=='none'){
				$('.pano_close').css({
					'right':'13px',
					'top':'51px'
				});	
			}else if($('.pano_close').css('display')=='block'){
				$('.pano_close').css({
					'right':'13px',
					'top':'51px'
				});		
			}
		});
	});
	// 配置观察选项:
	var config = {
		attributes: true,//检测属性变动
		childList: true,//检测子节点变动
		characterData: true//节点内容或节点文本的变动。
	}
	// 传入目标节点和观察选项
	observer.observe(target, config);

	// /* 交通流量控件*/
	// let trafficCtrl = new BMapLib.TrafficControl({
	// 	showPanel : false
	// });
	// trafficCtrl.defaultOffset = new BMap.Size(75, 160);
	// trafficCtrl.setAnchor(BMAP_ANCHOR_TOP_LEFT);
	// map.addControl(trafficCtrl);

	function sendPointToDev(id) {
		$('.target-point-send-status-' + id).html('正在发送');
		let lng = $('.target-point-send-' + id).attr('data-lng');
		let lat = $('.target-point-send-' + id).attr('data-lat');
		let dom = document.getElementsByClassName('target-point-radio-' + id);
		for (let i = 0; i < dom.length; i++) {
			if ($(dom[i]).is(':checked')) {
				sentMarkerPointDev = $(dom[i]).attr('data-dev-code');
				$
						.ajax({
							url : 'commandManage/realTimeCombat/sendMsgToDev',
							type : 'POST',
							async : true,
							contentType : "application/json; charset=utf-8",
							data : JSON.stringify(new TargetLocationBean($(
									dom[i]).attr('data-dev-code'), 0, lng, lat,
									0, 1)),
							dataType : 'json',
							success : function(result) {
								if (result.retcode == 1) {
									$('.target-point-send-status-' + id)
											.html(
													'<span style="color: rgb(0, 170, 80);">发送完成');
								} else {
									$('.target-point-send-status-' + id)
											.html(
													'<span style="color: rgb(255, 120, 120);">发送失败');
								}
							}
						});
				break;
			}
		}
	}
	/*
	var citys1 = [{
	    lnglat: ['116.3', '39.9'],
	    color: '#5070FF',
	    type: 'circle',
	    speed: 0.5,
	}, {
	    lnglat: ['121.29', '31.11'],
	    color: '#6EE7FF',
	    type: 'ellipse',
	    speed: 1,
	    max: 40,
	}];
	var citys2 = [{
	    lnglat: ['113.394818', '23.408004'],
	    color: '#f8983a',
	    type: 'circle',
	    speed: 0.9,
	}, {
	    lnglat: ['108.924274', '23.552255'],
	    color: '#FAFA32',
	    type: 'ellipse',
	    speed: 0.8,
	    max: 50,
	}];
	var citys3 = [{
	    lnglat: ['117.984943', '26.050118'],
	    color: '#ff6700',
	    type: 'circle',
	    speed: 0.8,
	    max: 90,
	}];
	

	new FlashMarker(map, citys1);*/
	//new FlashMarker(map, citys2);
	//new FlashMarker(map, citys3);
</script>
<!-- bundle.js -->
<script type="text/javascript"
	src="js/src/app/page/realTimeCombat/bundle.js?v=2.1.892233"></script>
<!-- 向导页尺寸自适应 -->
<script type="text/javascript"
	src="js/src/app/common/script/autosize.js?v=2.1.892223"></script>
</html>