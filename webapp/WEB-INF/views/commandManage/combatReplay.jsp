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
<title>历史回放</title>
<!--jquery-->
<script src="js/lib/jquery/jquery-3.2.1.min.js"></script>
<link rel="stylesheet"
	href="js/lib/jquery/jquery-ui-1.12.1/jquery-ui.min.css">
<script src="js/lib/jquery/jquery-ui-1.12.1/jquery-ui.min.js"></script>
<!--bootstrarp-->
<link rel="stylesheet" href="js/lib/bootstrarp/css/bootstrap.min.css">
<script src="js/lib/bootstrarp/js/bootstrap.min.js"></script>
<!--图标库-->
<link rel="stylesheet"
	href="js/lib/Font-Awesome/css/font-awesome.min.css">
<!--自定义图标-->
<link rel="stylesheet" type="text/css"
	href="js/lib/iconfont/iconfont.css">
<!--日期选择器-->
<script language="javascript" type="text/javascript"
	src="js/lib/My97DatePicker/WdatePicker.js?v=2.1.890"></script>
<!-- 时间格式化 -->
<script src="js/lib/TimeFormat/timeFormat.js"></script>
<!--MDUI-->
<link rel="stylesheet" href="js/lib/mdui-v0.4.0/css/mdui.min.css">
<script src="js/lib/mdui-v0.4.0/js/mdui.min.js"></script>
<!--右键点击菜单-->
<script src="js/lib/contextify/dist/jquery.contextify.min.js"></script>
<!--分页插件-->
<script src="js/lib/pagination/jquery.pagination.js?v=2.1.892223"></script>
<link rel="stylesheet" href="js/lib/pagination/pagination.css?v=2.1.892223">
<!-- 滑动条插件-->
<script src="js/lib/jQRangeSlider-5.7.2/lib/jquery.mousewheel.min.js"></script>
<link rel="stylesheet" href="js/lib/jQRangeSlider-5.7.2/css/classic.css">
<script src="js/lib/jQRangeSlider-5.7.2/jQAllRangeSliders-min.js"></script>
<!--百度地图key-->
<script type="text/javascript"
	src="https://api.map.baidu.com/api?v=2.0&ak=PgNHPqzIRsGR1yhs8nkoCtXOZLbwmawp"></script>
<!--百度地图测距工具-->
<script src="js/lib/baidumap/DistanceTool.min.js"></script>
<!--百度地图路况信息控件-->
<script src="js/lib/baidumap/TrafficControl.min.js"></script>
<link rel="stylesheet" href="js/lib/baidumap/TrafficControl.min.css">
<!--百度点聚合-->
<script type="text/javascript"
	src="js/lib/baidumap/TextIconOverlay_min.js"></script>
<!-- <script type="text/javascript"
	src="js/lib/baidumap/MarkerClusterer_min.js"></script> -->
<script type="text/javascript" src="js/lib/baidumap/MarkerClusterer.js"></script>
<!--百度鼠标绘制工具-->
<script type="text/javascript" src="js/lib/baidumap/DrawingManager.js"></script>
<script type="text/javascript" src="js/lib/clipboard/clipboard.min.js"></script>
<link href="js/lib/baidumap/DrawingManager_min.css" rel="stylesheet">
<!--自定义css-->
<link href="css/common.css?v=2.1.6" rel="stylesheet">
<link href="css/cover.css?v=2.1.5" rel="stylesheet">
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
<link rel="stylesheet" href="css/table/table-view.css?v=2.1.892223">
<!--add by gaochao start -->
<script src="js/lib/video/video.js"></script>
<script src="js/lib/video/videojs-ie8.min.js"></script>
<link rel="stylesheet" href="js/lib/video/video-js.css">
<link rel="stylesheet" href="css/map/map-top-navigation.css">
<!--add by gaochao start -->
<style>
/* add by gaochao start*/
 		.map-area-container {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
/* add by gaochao end*/
.myCosButton:hover {
	color: #fff;
}

.show-history-start {
	display: none;
	position: absolute;
	left: 350px;
	bottom: 40px;
	background: rgb(15, 155, 255);
	color: #fff !important;
}

.show-history-pause {
	display: none;
	position: absolute;
	left: 425px;
	bottom: 40px;
	background: #777777;
	color: #fff !important;
}

.show-history-end {
	display: none;
	position: absolute;
	left: 500px;
	bottom: 40px;
	background: #777777;
	color: #fff !important;
}

.show-history-time {
	display: none;
	position: absolute;
	right: 30px;
	bottom: 40px;
	background: rgb(15, 155, 255);
	color: #fff !important;
}

.speed-setting {
	display: none;
	position: absolute;
	left: 0;
	bottom: 50px;
}

.speed-value {
	cursor: pointer;
}

.search-back {
	display: none;
	position: absolute;
	left: 431px;
	bottom: 80px;
}

.selected-time {
	position: absolute;
	top: -30px;
	font-weight: 600;
	color: #333;
	text-shadow: 0 0 3px #fff;
}

.current-time {
	position: absolute;
	top: -30px;
	left: 500px;
	font-weight: 600;
	color: #333;
	text-shadow: 0 0 3px #fff;
}

.grade-star-container {
	width: 160px;
}

.grade-star-icon {
	width: 22px;
	height: 21px;
	position: relative;
	float: left;
	margin-top: 4px;
	margin-right: 10px;
	/* delete by guoshuai start 2018-9-29
	background: url("img/icon-lib.png") no-repeat;
	background-position: -240px -30px;
	delete by guoshuai start 2018-9-29 */
	/*add by guoshuai start 2018-9-29*/
	background: url("img/iconpic/eig-start.png") no-repeat;
	background-size: 100% 100%;
	/*add by guoshuai end 2018-9-29*/
	cursor: pointer;
}

.grade-star-container-intable {
	height: 30px;
}

.grade-star-icon-intable {
	width: 14%;
	height: 21px;
	position: relative;
	float: left;
	margin-top: 4px;
	margin-right: 2%;
	margin-left: 3%;
	/* delete by guoshuai start 2018-9-29
	background: url("img/icon-lib.png") no-repeat;
	background-position: -240px -30px;
	delete by guoshuai start 2018-9-29 */
	/*add by guoshuai start 2018-9-29*/
	background: url("img/iconpic/eig-start.png") no-repeat;
	background-size: 100% 100%;
	/*add by guoshuai end 2018-9-29*/
	cursor: default;
}

.grade-star-reset {
	/* delete by guoshuai start 2018-9-29
	position: relative;
	float: left;
	margin-left: 7px;
	color: #dedede;
	line-height: 30px;
	cursor: pointer;
	delete by guoshuai start 2018-9-29 */
	/*add by guoshuai start 2018-9-29*/
	margin-left: 7px;
    color: #dedede;
    line-height: 30px;
    cursor: pointer;
    position: absolute;
    float: right;
    left: 307px;
    width: 50px;
	/*add by guoshuai end 2018-9-29*/
}

.grade-star-reset:hover {
	color: rgb(35, 200, 255);
	text-decoration: underline;
}

.replay-control-container {
	position: absolute;
	left: 10px;
	bottom: 25px;
}

.replay-control-btn {
	color: #fff !important;
}

.view-default-btn {
	left: 205px;
}

.view-switch {
	left: 245px;
}

.time-line-area {
	left: 325px;
}

.time-line-start-time {
	position: absolute;
	top: 92px;
	left: 0px; /*-45*/
	text-shadow: 0 0 5px #fff;
	font-weight: 600;
	color: rgb(51, 122, 183);
}

.time-line-end-time {
	position: absolute;
	top: 92px;
	right: 0px; /*-45*/
	text-shadow: 0 0 5px #fff;
	font-weight: 600;
	color: rgb(51, 122, 183);
}

.time-line-progress {
	position: absolute;
	height: 12px;
	left: 45px;
	top: 97px;
	margin-bottom: 0;
}

.time-line-mouse-tips {
	display: none;
	width: 80px;
	height: 30px;
	position: absolute;
	top: 60px;
	margin-left: 5px;
	background: rgba(0, 0, 0, 0.5);
	border-radius: 5px;
	font-size: 14px;
	color: #fff;
	text-align: center;
	line-height: 30px;
}
/*add by guoshuai start 2018-9-29*/
/*新增2*/
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
/*
#table-tbody tr:nth-child(1) td:nth-child(1){
	width: 7.568%;
}
#table-tbody tr:nth-child(1) td:nth-child(2){
	width: 5.081%;
}
#table-tbody tr:nth-child(1) td:nth-child(3){
	width: 9.95%;
}
#table-tbody tr:nth-child(1) td:nth-child(4){
	width: 10.594%;
}
#table-tbody tr:nth-child(1) td:nth-child(5){
	width: 5.8378%;
}
#table-tbody tr:nth-child(1) td:nth-child(6){
	width: 7.243%;
}
#table-tbody tr:nth-child(1) td:nth-child(8){
	width: 10.784%;
}
#table-tbody tr:nth-child(1) td:nth-child(9){
	width: 3.2432%;
}
#table-tbody tr:nth-child(1) td:nth-child(10){
	width: 10.65%;
}
*/
#guide-frame-b1{
	width: 100px;
	height: 300px;
	background: rgba(0,0,0,0.9);
	position: absolute;
	z-index: 200;
	
	left: 38px;
}
#body-new-mask{
	width: 100%;
	height: 100%;
	position: relative;
	background: rgba(0, 0, 0, 0.5);
	z-index: 101;
}
#body-new-mask-box{
	position: absolute;
	left: 37%;
	top: 18%;
	color: #fff;
	width: 517px;
	height: 711px;
	background: url('img/iconpic/eig-bg.png');
	background-size: 100% 100%;
	background-color: #08264a;
	border-radius:24px;
}
#body-new-mask-quit{
	background: url('img/iconpic/eig-close.png');
	width: 40px !important;
	height: 40px !important;
	background-size: 100% 100%;
	position: absolute;
	top: -10px;
	right: -10px;	
}
#body-new-mask-box h3{
	display: block;
	width: 100%;
	text-align: center;
	color:  rgb(35, 200, 255);
	margin-top: 24px;
	margin-bottom: 30px;
}
#body-new-mask-box .bnm-1{
	margin-left: 40px;
	font-size: 16px;
	width: 427px;
	height: 38px;
	margin-bottom: 10px;
}
#body-new-mask-box .bnm-1 span:nth-child(1){
	width: 75px;
	font-size: 16px;
	color: #fff;
	text-align: left;
	margin-right:40px ;
	float: left;
	height: 38px;
	line-height: 38px;
}
#body-new-mask-box .bnm-1 span:nth-child(2){
	width: 310px;
	font-size: 16px;
	color: #999;
	float: left;
	padding-left: 20px;
	border:1px solid #1a3c69;
	height: 36px;
	background: #081e39;
	white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
	line-height:38px;
	padding-right:10px;
}
.m-view-drop-btn{
	position: absolute;
	
	left: 156px;
	z-index:103;

}
.m-view-drop-text{
	width: 310px;
	height: 38px;
	padding-left: 20px;
	border: 1px solid #1a3c69;
	background: #08264a;
	color: #fff;
	cursor: pointer;
}
.m-view-drop-t{
	width: 239px;
	height: 38px;
	line-height: 40px;
	font-size: 16px;
	border-right: 1px solid #03172f;
	float: left;
}
.m-view-drop-dowm{
	width: 49px;
	height: 38px;
	background: url('img/iconpic/eig-slidedown.png') no-repeat 20px 14px;
	background-size: 34% 30%;
	float: left;
	
	border-left:1px solid #0e3463;
}
.m-view-drop-area{
	display: none;
	width: 310px;
	height:auto ;
	border:  1px solid #1a3c69;
	background: #08264a;
	color: #fff;
	margin-top:5px;
	
}
.m-view-drop-area p{
	color: #fff;
	padding-left: 20px;
	border-top:1px solid #0e3463; 
	border-bottom: 1px solid  #03172f;
	height: 36px;
	width:100%;
	line-height: 40px;
	cursor: pointer;
	margin:0 auto;
}
.m-view-drop-area p:nth-child(1){
	height: 37px;
	border-top: none;
}
.m-view-drop-area p:nth-last-child(){
	height: 37px;
	border-bottom: none;
}
.m-view-drop-btn:hover .m-view-drop-area{
	display: block;
}
/*--------------------------*/
.ms-view-drop-btn{
	position: absolute;
	
	left: 156px;
	z-index:102;

}
.ms-view-drop-text{
	width: 310px;
	height: 38px;
	padding-left: 20px;
	border: 1px solid #1a3c69;
	background: #08264a;
	color: #fff;
	cursor: pointer;
}
.ms-view-drop-t{
	width: 239px;
	height: 38px;
	line-height: 40px;
	font-size: 16px;
	border-right: 1px solid #03172f;
	float: left;
}
.ms-view-drop-dowm{
	width: 49px;
	height: 38px;
	background: url('img/iconpic/eig-slidedown.png') no-repeat 20px 14px;
	background-size: 34% 30%;
	float: left;
	
	border-left:1px solid #0e3463;
}
.ms-view-drop-area{
	display: none;
	width: 310px;
	height:auto ;
	border:  1px solid #1a3c69;
	background: #08264a;
	color: #fff;
	margin-top:5px;
	
}
.ms-view-drop-area p{
	color: #fff;
	padding-left: 20px;
	border-top:1px solid #0e3463; 
	border-bottom: 1px solid  #03172f;
	height: 36px;
	width:100%;
	line-height: 40px;
	cursor: pointer;
	margin:0 auto;
}
.ms-view-drop-area p:nth-child(1){
	height: 37px;
	border-top: none;
}
.ms-view-drop-area p:nth-last-child(){
	height: 37px;
	border-bottom: none;
}
.ms-view-drop-btn:hover .ms-view-drop-area{
	display: block;
}
.bnm-btn1,.bnm-btn2{
	width: 100px;
	height: 40px;
	border-radius: 30px;
	color: #fff;
	font-size: 18px;
	text-align: center;
	line-height: 40px;
	border: none;
	outline:none;
	margin-top: 140px;
}
.bnm-btn1{
	margin-left: 36px;
	background: url('img/iconpic/eig-save.png');
	background-size: 100% 100%;
}
.bnm-btn2{
	margin-left: 226px;
	background: url('img/iconpic/eig-cancel.png');
	background-size: 100% 100%;
}
.search-simple-rule{
	border-left:1px solid #03172f;
	border-right:1px solid #0e3463;
	height: 52px;
	margin-top: 14px;
	float: left;
}
.prev{
	background: url('img/iconpic/eig-prev-arrow.png') no-repeat;
	background-size:  100% 100%;
}
.next{
	background: url('img/iconpic/eig-next-arrow.png') no-repeat;
	background-size:  100% 100%;
}
.disable:hover{
    cursor:not-allowed;
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
	.table-view-container-box{
		height:240px;
	}
}
@media screen and (max-width: 1452px) {
	.time-range-selector{
		margin-top:0px !important;
	}
	.input-data-picker-md{
		width:100px !important;
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

@media screen and (max-width: 1366px) {
	.view-data-block .case-jt-block{
		margin-right: 43px;
		width:291px;
	}
	.view-data-block{
		width:107%;
	}
}
@media screen and (max-width: 1440px) {
	.tbody-tr{
		font-size:13px;
	}
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
.table-view-data-area{
	width:99%;
}
.view-data-table{
	width:100%;
	margin-top: 10px;
	border-bottom:none;
}
#view-data-class{
	position:relative;
	width:100%;
}
#view-class{
	right:0;
}
.view-data-block{
	margin-top: 10px;
}
.view-data-block .case-jt-block{
	margin-right: 12px;
    margin-left: 12px;
}
.command-btn-combat{
	left:245px;
}
.command-btn-media{
	margin-left:35%;
}
/*add by guoshuai end 2018-9-29*/
.mdui-radio-icon:before{
	top: -7px;
	left: -7px;
	background: #fff;
}
</style>
</head>

<!--delete by guoshuai start 2018-9-29
<body style="background: rgb(29, 33, 39)">
delete by guoshuai end 2018-9-29 -->
<!--add by guoshuai start 2018-9-29-->
<body style="background: url('img/iconpic/bg.png');background-color: rgb(29, 33, 39);
	background-size: 100% 100%;">
	<!--新增遮罩&编辑作战信息-->
	<div style="display: none;" id="body-new-mask">
		<div  id="body-new-mask-box">
		<div id="body-new-mask-quit"></div>
		<h3>编辑作战信息</h3>
		<div class="bnm-1" id="bnm-no">
			<span>作战成员:</span>
			<span class="disable"></span>
		</div>
		<div class="bnm-1" id="bnm-date">
			<span>作战日期:</span>
			<span class="disable"></span>
		</div>
		<div class="bnm-1" id="bnm-con">
			<span>作战时长:</span>
			<span class="disable"></span>
		</div>
		<div class="bnm-1" id="bnm-address">
			<span>作战地址:</span>
			<span class="disable"></span>
		</div class="bnm-1">
		<div class="bnm-1" id="bnm-dev">
			<span>主战设备:</span>
			<span title=""></span>
		</div>
		<div class="bnm-1">
			<span>作战标签:</span>
			<div class="m-view-drop-btn">
				<div class="m-view-drop-text">
					<div class="m-view-drop-t">经典作战</div>
					<div class="m-view-drop-dowm"></div>
				</div>	
				<div class="m-view-drop-area">
					<p>经典作战</p>
					<p>多点协同</p>
					<p>广场定位</p>
					<p>人口密集</p>
					<p>实战演习</p>
				</div>
			</div>
		</div>
		<div class="bnm-1" id="bnm-res">
			<span>作战结果:</span>
			<div class="ms-view-drop-btn">
				<div class="ms-view-drop-text">
					<div class="ms-view-drop-t">成功</div>
					<div class="ms-view-drop-dowm"></div>
				</div>	
				<div class="ms-view-drop-area">
					<p>成功</p>
					<p>失败</p>
				</div>
			</div>
		</div>
		<button type="button" value="保存" class="bnm-btn1"></button>
		<button type="button" value="取消" class="bnm-btn2"></button>
		</div>
	</div>
<!--add by guoshuai end 2018-9-29-->
	<header class="top-header" id="top-header"> <!-- <span class="header-current-weather header-info-txt"></span> <span
		class="header-current-time header-info-txt"></span> --></header>

	<div class="map-area-container" style="display: none;">
		<div id="allmap"></div>
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
				<div class="channel-info-value-item" id="data-channel-lte">&nbsp;&nbsp;0</div>
				<div class="channel-info-title">WCDMA：</div>
				<div class="channel-info-value-item" id="data-channel-wcdma">&nbsp;&nbsp;0</div>
				<div class="channel-info-title">CDMA：</div>
				<div class="channel-info-value-item" id="data-channel-cdma">&nbsp;&nbsp;0</div>
				<div class="channel-info-title">GSM：</div>
				<div class="channel-info-value-item" id="data-channel-gsm">&nbsp;&nbsp;0</div>
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
				<div class="tools-each-icon" id="end-marker-view-switch"
					end-marker-view-status="1" title="目标标记" style="background:url(img/icon/endMarker_active.png)no-repeat;"></div>
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
		<div class="right-tools-container" style="right:20px;">
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
		<!--add by gaochao end-->
		<!-- 上部工具栏 -->
		<div class="top-map-tools-area" style="margin-left: -174px" hidden>
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
				<!-- 测距工具 -->
				<div class="tool-icon gray-cover" id="distance-measurement"
					data-is-open="0" style="background-position: -320px -40px;"
					title="测距工具"></div>
				<div class="tool-divide-line"></div>
				<!-- 基站查询-->
				<div class="tool-icon" id="bts-search"
					title="基站查询"></div>
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
		<div class="group-switch-btn-container">
			<div class="group-switch-btn-item" id="group-location">定位组</div>
			<div class="group-switch-btn-item" id="group-outside" style="background:#fff;color:rgba(153,153,153,1)">外线组</div>
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
			<%-- <div class="group-outside-each-item">
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
						<div class="case-info-item-value" title=""
							style="color: rgb(137, 146, 200);" id="case-users"></div>
					</div>
					
					
				</div>
				<div class="sms-info-area">
					<!-- edit by guoshuai start -->
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
				</div>
				<!-- add by guoshuai start  -->
				<button
					class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-blue CR-ta-target-info">调试信息</button>
				<!-- add by guoshuai end -->
				<button data-toggle="modal" data-target="#advance-info-panel"
					class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-blue advance-panel-btn">高级</button>
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
		<!-- 高级面板-->
		<div class="advance-info-containers box-shadow" style = "height:480px">
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
		<!-- edit by gaochao end-->
		<!-- 调试信息 -->
		<div class="ta-info-container box-shadow">
			<div class="ta-info-title"></div>
			<div class="active-info-header" style="height: 17px;">
				<span class="red-ball-span"></span>
				<div style="width: 150px;height: 17px;float: left;margin-left: 4px; font-weight: bold;">调试信息</div>
				<span class="CR-close ta-info-container-close"></span>
			</div>
			<!--delete by guoshuai<div class="ta-info-box" style="margin-top: 10px;width: 756px;"> realTimeCombat同-->
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
						<!-- delete by guoshuai
						<span class="ta-info-middle-span" style="width: 78px;border-right: 1px solid #f0f0f0;">TMSI</span>
						<span class="ta-info-middle-span" style="width: 41px;border-right: 1px solid #f0f0f0;">RNIT</span>
						realTimeCombat同-->
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

			<div class="time-line-area" style="bottom: 6px;left:200px;">
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

			<div class="play-btn-container" id="play-btn"></div>
			<div class="case-time-container">
				<div class="case-time">00:00:00</div>
				<div class="case-time-all">
				<%-- /<span>12:00:00</span> --%>
				</div>
			</div>
			<div class="speed-switch-btn" data-status="0">
				<div class="speed-switch-value">X<span>1</span></div>
				<div class="speed-switch-dropup"></div>
			</div>
			<div class="speed-switch-content">
				<div class="speed-switch-item">X<span>0.5</span></div>
				<div class="speed-switch-item-line"></div>
				<div class="speed-switch-item">X<span>1</span></div>
				<div class="speed-switch-item-line"></div>
				<div class="speed-switch-item">X<span>2</span></div>
				<div class="speed-switch-item-line"></div>
				<div class="speed-switch-item">X<span>4</span></div>
				<div class="speed-switch-item-line"></div>
				<div class="speed-switch-item">X<span>8</span></div>
				<div class="speed-switch-item-line"></div>
				<div class="speed-switch-item">X<span>16</span></div>
				<div class="speed-switch-item-line"></div>
				<div class="speed-switch-item">X<span>32</span></div>
			</div>
		</div>
		<!-- 时间轴 -->
		<div class="time-line-area" style="bottom: 28px;" hidden>
			<div class="progress time-line-progress">
				<div class="progress-bar progress-bar-striped"
					id="time-line-progress"
					style="cursor: pointer; transition: width 0s !important;"
					role="progressbar" aria-valuenow="45" aria-valuemin="0"
					aria-valuemax="100" style="width: 0%"></div>
			</div>
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
			<div class="time-line-start-time"></div>
			<div class="time-line-end-time"></div>
			<div class="time-line-mouse-tips"></div>
		</div>

		<div class="replay-control-container" hidden>
			<button id="play-btn"
				class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-blue replay-control-btn">播放</button>
			<button id="stop-btn"
				class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-pink replay-control-btn"
				data-toggle="modal" data-target="#reset-search-modal">结束</button>
			<!-- 
			<button id="play-href-btn"
				class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-pink replay-control-btn"
				style="position: absolute; bottom: 49px; left: 100px;">选择</button>
			 -->
			<div class="dropup speed-setting" hidden>
				<button class="btn btn-default dropdown-toggle" id="speed-value"
					type="button" data-toggle="dropdown" aria-haspopup="true"
					aria-expanded="false">
					速度&nbsp;x1 <span class="caret"></span>
				</button>
				<ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
					<li><a class="speed-value">&nbsp;x<span>0.5</span></a></li>
					<li><a class="speed-value">&nbsp;x<span>1</span></a></li>
					<li><a class="speed-value">&nbsp;x<span>2</span></a></li>
					<li><a class="speed-value">&nbsp;x<span>4</span></a></li>
					<li><a class="speed-value">&nbsp;x<span>8</span></a></li>
					<li><a class="speed-value">&nbsp;x<span>16</span></a></li>
					<li><a class="speed-value">&nbsp;x<span>32</span></a></li>
				</ul>
			</div>
		</div>

	</div>

	<!-- 在此设置中框默认显示状态-->
	<div class="guide-frame" style="display: block">
		<!--delete by guoshuai start 2018-9-29
		<div class="guide-title">历史回放</div>
		<div class="guide-title-line"></div>
		<div class="table-view-container">
		delete by guoshuai start 2018-9-29-->
		<!--add by guoshuai start 2018-9-29-->
		<div class="guide-title" style="margin-left: -22px">历史回放</div>
		<div class="table-view-container" style="width: 96.35%;">
			<div id="table-view-container-box" style="background: #07203e;"> 
		<!--add by guoshuai end 2018-9-29-->
				<div class="table-view-search-area">
					<div class="search-type-simple">
						<!-- 模糊搜索-->
						<div
							class="input-group input-group-sm search-item search-item-width-md">
							<span class="input-group-addon input-group-title">关键词 &nbsp;:</span> 
							<!--add by guoshuai 2018-8-3 start-->
								<input type="text"
									class="form-control input-background"
									placeholder="输入作战成员/城市" id="query-key-word">
							<!--add by guoshuai 2018-8-3 end-->
							
						</div>
						<!-- 标签-->
						<!--delete by guoshuai 2018-10-15 start
						<div
							class="input-group input-group-sm search-item search-item-width-sm">
							<span class="input-group-addon input-group-title">标签</span>
							<div class="btn-group" id="tag-input-btn-outer"
								style="float: left;">
								<input type="text" style="width: 214px; height: 30px;"
									class="form-control input-background dropdown-toggle"
									data-toggle="dropdown" aria-haspopup="true"
									aria-expanded="false" id="tag-input-outer" maxlength="16">
							</div>
						</div>
						delete by guoshuai 2018-10-15 end-->
					</div>
					<div class="search-type-all">
						<!-- 作战成员 -->
						<div
							class="input-group input-group-sm search-item search-item-width-sm">
							<span class="input-group-addon input-group-title" id="query-id">作战成员</span>
							<input type="text" class="form-control input-background"
								id="query-user-name">
						</div>
						<!-- 作战城市 -->
						<div
							class="input-group input-group-sm search-item search-item-width-sm">
							<span class="input-group-addon input-group-title" id="query-id">作战城市</span>
							<input type="text" class="form-control input-background"
								id="query-area-code">
						</div>
						<!-- 标签-->
						<!--delete by guoshuai start 2018-10-18
						<div
							class="input-group input-group-sm search-item search-item-width-sm">
							<span class="input-group-addon input-group-title">标签</span>
							<div class="btn-group" id="tag-input-btn-inner"
								style="float: left;">
								<input type="text" style="width: 214px; height: 30px;"
									class="form-control input-background dropdown-toggle"
									data-toggle="dropdown" aria-haspopup="true"
									aria-expanded="false" id="tag-input-inner" maxlength="16">
							</div>
						</div>
						delete by guoshuai end 2018-10-18-->
						<!-- 设备编号-->
						<div
							class="input-group input-group-sm search-item search-item-width-sm">
							<span class="input-group-addon input-group-title"
								id="query-phone-num">设备编号</span> <input type="text"
								class="form-control input-background" id="query-dev-code">
						</div>
						<!-- 评分-->
						<div
							class="input-group input-group-sm search-item search-item-width-sm">
							<span class="input-group-addon input-group-title">评分(大于或等于)</span>
							<div class="grade-star-container" data-selected-num="0">
								<div class="grade-star-icon gray-cover" data-star-index="0"
									data-is-clicked="0"></div>
								<div class="grade-star-icon gray-cover" data-star-index="1"
									data-is-clicked="0"></div>
								<div class="grade-star-icon gray-cover" data-star-index="2"
									data-is-clicked="0"></div>
								<div class="grade-star-icon gray-cover" data-star-index="3"
									data-is-clicked="0"></div>
								<div class="grade-star-icon gray-cover" data-star-index="4"
									data-is-clicked="0"></div>
							</div>
							<span class="grade-star-reset">重置</span>
						</div>
						<!-- 持续时长-->
						<div
							class="input-group input-group-sm search-item search-item-width-md">
							<span class="input-group-addon input-group-title"
								id="query-phone-num">持续时长</span> <span class="input-inwords">大于</span><input
								type="text" id="query-mix-working-time"
								class="form-control input-background input-data-picker-sm"><span
								class="input-inwords">分钟，小于</span><input type="text"
								id="query-max-working-time"
								class="form-control input-background input-data-picker-sm"><span
								class="input-inwords">分钟</span>
						</div>
						<!-- 排除游客-->
						<!--delete by guoshuai start 2018-10-18 
						<div
							class="input-group input-group-sm search-item search-item-width-smsm">
							<label class="mdui-checkbox" style="margin-left: 70px;"> <input
								id="query-user-type" type="checkbox" /> <i
								class="mdui-checkbox-icon search-page-checkbox"></i><span
								style="color: rgb(204, 204, 204);">排除游客</span>
							</label>
						</div>
						delete by guoshuai end 2018-10-18 -->
						<!-- 排除脏数据-->
						<!--delete by guoshuai start 2018-10-18 
						<div
							class="input-group input-group-sm search-item search-item-width-smsm">
							<label class="mdui-checkbox" style="margin-left: 70px;"> <input
								type="checkbox" /> <i
								class="mdui-checkbox-icon search-page-checkbox"></i><span
								style="color: rgb(204, 204, 204);">排除脏数据</span>
							</label>
						</div>
						delete by guoshuai end 2018-10-18 -->
						<!-- 时间范围选择-->
						<div class="time-range-selector">
							<form>
								<div
									class="time-range-selector-item time-range-selector-type-radio">
									<label class="mdui-radio"> <input type="radio"
										id="query-time-all" name="group1" checked /> <i
										class="mdui-radio-icon"></i>全部
									</label>
								</div>
								<div
									class="time-range-selector-item time-range-selector-type-radio">
									<label class="mdui-radio"> <input type="radio"
										id="query-time-day" name="group1" /> <i
										class="mdui-radio-icon"></i>今天
									</label>
								</div>
								<div
									class="time-range-selector-item time-range-selector-type-radio">
									<label class="mdui-radio"> <input type="radio"
										id="query-time-week" name="group1" /> <i
										class="mdui-radio-icon"></i>本周
									</label>
								</div>
								<div
									class="time-range-selector-item time-range-selector-type-radio">
									<label class="mdui-radio"> <input type="radio"
										id="query-time-month" name="group1" /> <i
										class="mdui-radio-icon"></i>本月
									</label>
								</div>
								<div
									class="time-range-selector-item time-range-selector-type-radio">
									<label class="mdui-radio"> <input type="radio"
										id="query-time-halfyear" name="group1" /> <i
										class="mdui-radio-icon"></i>最近半年
									</label>
								</div>
								<div
									class="time-range-selector-item time-range-selector-type-radio">
									<label class="mdui-radio"> <input type="radio"
										id="query-time-year" name="group1" /> <i
										class="mdui-radio-icon"></i>最近一年
									</label>
								</div>
								<div
									class="time-range-selector-item time-range-selector-type-radio"
									id="custom-type-selector">
									<label class="mdui-radio"> <input type="radio"
										id="query-time-costume" name="group1" id="custom-type-radio" />
										<i class="mdui-radio-icon"></i> 自定义
									</label>
								</div>
								<div class="time-range-selector-item" id="custom-type-input"
									style="margin-left: 10px; margin-top: 1px; display: none;">
									<input type="text" id="query-time-start-time"
										class="form-control input-background input-data-picker-md"
										onclick="WdatePicker({maxDate:'#F{$dp.$D(\'query-time-end-time\')||\'%y-%M-%d\'}',dateFmt:'yyyy-MM-dd HH:mm:ss'})"><span
										class="input-inwords">至</span><input type="text"
										id="query-time-end-time"
										class="form-control input-background input-data-picker-md"
										onclick="WdatePicker({minDate:'#F{$dp.$D(\'query-time-start-time\')}',maxDate:'%y-%M-%d',dateFmt:'yyyy-MM-dd HH:mm:ss'})">
								</div>
							</form>
						</div>
					</div>

				</div>
				<!--add by guoshuai start 2018-10-8-->
				<div class="search-simple-rule"></div>
				<!--add by guoshuai end 2018-10-8-->
			<!-- 搜索 -->
				<div class="table-view-search-btn">
					<div class="guide-search-btn mdui-ripple">
						<!-- delete by guoshuai start 2018-9-29
						<span>搜索</span>
						delete by guoshuai end 2018-9-29-->
					</div>
					<div class="search-mode-switch">
						<span id="search-mode-title-1">条件太少？</span><span class="text-blue"
							id="search-mode-title-2" data-search-type="0"
							style="cursor: pointer; text-decoration: underline;">高级搜索</span>
					</div>
				</div>
			<!--add by guoshuai start 2018-9-29-->
			</div>
			<!--add by guoshuai end 2018-9-29-->
			<!-- 正文 -->
			<div class="table-view-data-area auto-min-height">
				<!--add by guoshuai start 2018-9-29-->
				<div id="view-data-class">
					<div id="view-class">
						<div id="view-class-list"></div>
						<div id="view-class-block"></div>
					</div>
				</div>
				<!--add by guoshuai end 2018-9-29-->
				<table class="view-data-table" style="display:block;table-layout:fixed;">
					<tbody id="table-tbody">
						<!-- 
						<tr class="tbody-th">
							<td>作战成员</td>
							<td>起始日期</td>
							<td>作战时长</td>
							<td>省市</td>
							
							<td>评分</td>
							<td>设备</td>
							<td>操作</td>
						</tr>
						<tr class="tbody-tr">
							<td title="zhouli/9 chenliang/1 sunbing/3"><div
									class="table-td-user-names"
									style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">zhouli/9
									chenliang/1 sunbing/3</div></td>
							<td><div style="width: 95px; white-space: nowrap;">2018-03-06</div></td>
							<td><div style="width: 185px; white-space: nowrap;">1小时19分(12:11~14:20)</div></td>
							<td><div style="width: 100px; white-space: nowrap;">湖北-武汉</div></td>
							<td><div style="width: 110px; white-space: nowrap;">18611111111</div></td>
							<td><div style="width: 135px; white-space: nowrap;">46012323542345</div></td>
							<td>
								<div class="grade-star-container-intable" style="width: 160px;">
									<div class="grade-star-icon-intable"></div>
									<div class="grade-star-icon-intable"></div>
									<div class="grade-star-icon-intable"></div>
									<div class="grade-star-icon-intable gray-cover"></div>
									<div class="grade-star-icon-intable gray-cover"></div>
								</div>
							</td>
							<td title="BBC1500_00002 BBCG401_00337 BBCG401_12121"><div
									class="table-td-used-devs"
									style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">BBC1500_00002
									BBCG401_00337 BBCG401_12121</div></td>
							<td><div style="width: 68px;">
									<div class="mdui-ripple command-btn">回放</div>
								</div></td>
						</tr>
						 -->
					</tbody>
				</table>
				<!--add by guoshuai start 2018-9-29-->
				<table class="view-data-block" style="display:none;">	
				</table>
				<!--add by guoshuai end 2018-9-29-->
				<!-- 暂无数据-->
				<div class="no-data-realtime" style="display: none;">
					<img class="no-data-icon" src="img/no_data_icon_search.png">
					<span class="no-data-word">暂无作战信息数据</span>
				</div>
			</div>
			<!-- 底部分页 -->
			<!-- delete by guoshuai start 2018-9-29
			<div class="page-selector">
				<div class="item-count-selector">
					每页：
					<div class="btn-group dropup">
						<button type="button"
							class="btn btn-default btn-sm dropdown-toggle"
							data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							<span class="show-item-num">10条</span> <span class="caret"></span>
						</button>
						<ul class="dropdown-menu">
							<li><a class="total-count-selector"><span>10</span>条</a></li>
							<li><a class="total-count-selector"><span>20</span>条</a></li>
							<li><a class="total-count-selector"><span>30</span>条</a></li>
							<li><a class="total-count-selector"><span>40</span>条</a></li>
							<li><a class="total-count-selector"><span>50</span>条</a></li>
						</ul>
					</div>
					，总共<span id="total-count"></span>条<span id="total-page-num"></span>
				</div>
				<div class="m-style pagination M-box3"></div>
			</div>
			delete by guoshuai end 2018-9-29-->
			<!-- add by guoshuai start 2018-9-29-->
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
			<!-- add by guoshuai end 2018-9-29-->
		</div>

	</div>

	<div class="search-loading">
		<img class="loading-gif" src="img/loading.gif"> <span
			class="loading-word">加载中...</span>
	</div>

	<div class="tip-content">
		 <span class="tip-word">暂无该基站信息</span>
	</div>


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
				<div class="modal-body" id="modal-research-content">是否结束观看？</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-primary"
						id="reset-search-submit">确定</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Modal回放停止确认 -->
	<div class="modal fade bs-example-modal-sm" id="replay-end-modal"
		tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog modal-sm" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title" id="myModalLabel">确认</h4>
				</div>
				<div class="modal-body">是否结束当前回放？</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" id="replay-end">确定</button>
					<button type="button" class="btn btn-primary" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Modal删除点标记确认 -->
	<div class="modal fade bs-example-modal-sm" data-backdrop="static"
		data-keyboard="false" id="delete-pointmarks-modal" tabindex="-1"
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
				<div class="modal-body">是否删除所有点标记？</div>
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
						aria-label="Close" id="alert-modal-close-button">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title" id="alert-modal-title">提示</h4>
				</div>
				<div class="modal-body" id="alert-modal-content"></div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" data-dismiss="modal"
						id="alert-modal-button">确定</button>
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
				<div class="modal-body" id="advance-info-content-body"></div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				</div>
			</div>
		</div>
	</div>

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
	const username = `${sessionScope.user.username}`;
	const combatReplayInfoRedirect = `${requestScope.combatReplay}`;
	const menuList =
<%=session.getAttribute("menuPerms")%>
	;
	// const combatvoCaseSerial = '';
	/*add by guoshuai start 2018-9-29*/
	let flag=true;
	$('#view-class-block').click(function(){
		if($('.no-data-realtime').css("display")=='block'){
			$('.view-data-block').css('display','none');
		}else{
			$('.view-data-block').css('display','block');
		}
		$('#view-class-list').css({'background':'url("img/iconpic/eig-table-unattack.png") no-repeat 10px 10px','background-size':' 50% 50%'});
		$('.view-data-table').css('display','none');
		$('#view-class-block').css({'background':'url("img/iconpic/eig-block-attack.png") no-repeat 10px 10px','background-size':' 50% 50%'});
		/*add by guoshuai start 2019/3/5*/
		$('#view-class-list').removeClass('combatCase-list-switch');
		$('#view-class-block').addClass('combatCase-list-switch');
		/*add by guoshuai end 2019/3/5*/
	});
	$('#view-class-list').click(function(){
		$('.view-data-block').css('display','none');
		$('#view-class-list').css({'background':'url("img/iconpic/eig-table-attack.png") no-repeat 10px 10px','background-size':' 50% 50%'});
		if($('.no-data-realtime').css("display")=='none'){
			$('.view-data-table').css('display','block');
		}else{
			$('.view-data-table').css('display','none');
		}
		$('#view-class-block').css({'background':'url("img/iconpic/eig-block-un.png") no-repeat 10px 10px','background-size':' 50% 50%'});
		/*add by guoshuai start 2019/3/5*/
		$('#view-class-list').addClass('combatCase-list-switch');
		$('#view-class-block').removeClass('combatCase-list-switch');
		/*add by guoshuai end 2019/3/5*/
	});
	/*模态框退出*/
	$('#body-new-mask-quit').click(function(){
		$('#body-new-mask').css('display','none')
	});
	/*标签选择*/
	$(document).on('click','#view-drop-area p:eq(0)',function(){
		let comrTitle=$('#view-drop-area p:eq(0)').text();
		$('#view-drop-t').text(comrTitle);
		$('#view-drop-area').hide();
	});
	$(document).on('click','#view-drop-area p:eq(1)',function(){
		let comrTitle=$('#view-drop-area p:eq(1)').text();
		$('#view-drop-t').text(comrTitle);
		$('#view-drop-area').hide(); 
	});
	$(document).on('click','#view-drop-area p:eq(2)',function(){
		let comrTitle=$('#view-drop-area p:eq(2)').text();
		$('#view-drop-t').text(comrTitle);
		$('#view-drop-area').hide();
	});
	$(document).on('click','#view-drop-area p:eq(3)',function(){
		let comrTitle=$('#view-drop-area p:eq(3)').text();
		$('#view-drop-t').text(comrTitle);
		$('#view-drop-area').hide();
	});
	$(document).on('click','#view-drop-area p:eq(4)',function(){
		let comrTitle=$('#view-drop-area p:eq(4)').text();
		$('#view-drop-t').text(comrTitle);
		$('#view-drop-area').hide();
	});
	$(document).on('click','#view-drop-area p:eq(5)',function(){
		let comrTitle=$('#view-drop-area p:eq(5)').text();
		$('#view-drop-t').text(comrTitle);
		$('#view-drop-area').hide();
	});
	$(document).on('click','#view-drop-area p:eq(6)',function(){
		let comrTitle=$('#view-drop-area p:eq(6)').text();
		$('#view-drop-t').text(comrTitle);
		$('#view-drop-area').hide();
	});
	$('#view-drop-btn').hover(function(){
		$('#view-drop-area').show();
	},function(){
		$('#view-drop-area').hide();
	});
	/*模态框里的下拉选择*/
	$(document).on('click','.m-view-drop-area p:eq(0)',function(){
		let comrTitle=$('.m-view-drop-area p:eq(0)').text();
		$('.m-view-drop-t').text(comrTitle);
		$('#m-view-drop-area').hide();
	});
	$(document).on('click','.m-view-drop-area p:eq(1)',function(){
		let comrTitle=$('.m-view-drop-area p:eq(1)').text();
		$('.m-view-drop-t').text(comrTitle);
		$('#m-view-drop-area').hide();
	});
	$(document).on('click','.m-view-drop-area p:eq(2)',function(){
		let comrTitle=$('.m-view-drop-area p:eq(2)').text();
		$('.m-view-drop-t').text(comrTitle);
		$('#m-view-drop-area').hide();
	});
	$(document).on('click','.m-view-drop-area p:eq(3)',function(){
		let comrTitle=$('.m-view-drop-area p:eq(3)').text();
		$('.m-view-drop-t').text(comrTitle);
		$('#m-view-drop-area').hide();
	});
	$(document).on('click','.m-view-drop-area p:eq(4)',function(){
		let comrTitle=$('.m-view-drop-area p:eq(4)').text();
		$('.m-view-drop-t').text(comrTitle);
		$('#m-view-drop-area').hide();
	});
	$('#m-view-drop-btn').hover(function(){
		$('#m-view-drop-area').show();
	},function(){
		$('#m-view-drop-area').hide();
	});
	/*成功失败状态选取*/
	$(document).on('click','#bnm-res .ms-view-drop-area p:eq(0)',function(){
		let comrTitle=$('#bnm-res .ms-view-drop-area p:eq(0)').text();
		$('#bnm-res .ms-view-drop-t').text(comrTitle);
		$('#ms-view-drop-area').hide();
	});
	$(document).on('click','#bnm-res .ms-view-drop-area p:eq(1)',function(){
		let comrTitle=$('#bnm-res .ms-view-drop-area p:eq(1)').text();
		$('#bnm-res .ms-view-drop-t').text(comrTitle);
		$('#ms-view-drop-area').hide(); 
	});
	$('#ms-view-drop-btn').hover(function(){
		$('#ms-view-drop-area').show();
	},function(){
		$('#ms-view-drop-area').hide();
	 });
	 /*模态框的保存和取消操作*/
	$('.bnm-btn1').click(function(){
		$('#body-new-mask').css('display','none');
	});
	$('.bnm-btn2').click(function(){
		$('#body-new-mask').css('display','none');
	});
	$('.header-menu-item').text('历史回放');
	/*add by guoshuai start 2018-9-29*/
</script>
<!-- 小车信息类及相关变量的声明 -->
<script type="text/javascript"
	src="js/src/app/page/combatReplay/declaration.js?v=2.1.892231"></script>
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
	/* 距离比例尺*/
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

	/* 交通流量控件*/
	// let trafficCtrl = new BMapLib.TrafficControl({
	// 	showPanel : false
	// });
	// trafficCtrl.defaultOffset = new BMap.Size(80, 160);
	// trafficCtrl.setAnchor(BMAP_ANCHOR_TOP_LEFT);
	// map.addControl(trafficCtrl);
</script>
<!-- bundle.js -->
<script src="js/src/app/page/combatReplay/bundle.js?v=2.1.892233"></script>
<script>
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

	/* 评分选择*/
	$('.grade-star-icon')
			.hover(
					function() {
						$('.grade-star-icon').addClass('gray-cover');
						for (let i = 0; i <= $(this).attr('data-star-index'); i++) {
							$($($(this).parent()).children()[i]).removeClass(
									'gray-cover');
						}
					},
					function() {
						if ($(this).attr('data-is-clicked') == 0) {
							$('.grade-star-icon').addClass('gray-cover');
							for (let i = 0; i < $($(this).parent()).children().length; i++) {
								if ($($($(this).parent()).children()[i]).attr(
										'data-is-clicked') == 1) {
									for (let j = 0; j <= i; j++) {
										$($($(this).parent()).children()[j])
												.removeClass('gray-cover');
									}
									break;
								}
							}
						}
					});

	$('.grade-star-icon').click(
			function() {
				$('.grade-star-icon').attr('data-is-clicked', '0');
				$(this).attr('data-is-clicked', '1');
				$('.grade-star-container').attr('data-selected-num',
						Number($(this).attr('data-star-index')) + 1);
				$(this).removeClass('gray-cover');
			});

	function autoWidth() {
		/*表格td自适应*/
		/*delete by guoshuai start 2018-10-23
		$('.table-td-user-names').css('width',
				($(window).width() - 1025) * 0.45);
		
		$('.table-td-used-devs')
				.css('width', ($(window).width() - 1085) * 0.55);
		delete by guoshuai end 2018-10-23*/
	}
	autoWidth();
	window.onresize = function() {
		autoWidth();
	}
</script>
<script src="js/src/app/common/script/autosize.js?v=2.1.892223"></script>
</html>