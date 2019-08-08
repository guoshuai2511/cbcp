<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page isELIgnored="false"%>
<%
	response.setHeader("Pragma", "no-cache");
	response.setHeader("Cache-Control", "no-cache");
	response.setDateHeader("Expires", 0);
	response.setHeader("Cache-Control", "no-store");
%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<html>
<head>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
<link rel="icon" type="image/ico" href="img/jiantong_logo.ico?v=2.0.4">
<title>总览</title>
<!--jquery-->
<script src="js/lib/jquery/jquery-3.2.1.min.js"></script>
<!--bootstrarp-->
<link rel="stylesheet" href="js/lib/bootstrarp/css/bootstrap.min.css">
<script src="js/lib/bootstrarp/js/bootstrap.min.js"></script>
<!--自定义图标-->
<link rel="stylesheet" type="text/css"
	href="js/lib/iconfont/iconfont.css">
<!-- queue -->
<script src="js/lib/threadQueue/queue.js"></script>
<!--右键点击菜单-->
<script src="js/lib/contextify/dist/jquery.contextify.min.js"></script>
<!--日期选择器-->
<script language="javascript" type="text/javascript"
	src="js/lib/My97DatePicker/WdatePicker2.js"></script>
<!-- 时间格式化 -->
<script src="js/lib/TimeFormat/timeFormat.js"></script>
<!--MDUI-->
<link rel="stylesheet" href="js/lib/mdui-v0.4.0/css/mdui.min.css">
<script src="js/lib/mdui-v0.4.0/js/mdui.min.js"></script>
<!--百度地图key-->
<script type="text/javascript"
	src="https://api.map.baidu.com/api?v=2.0&ak=PgNHPqzIRsGR1yhs8nkoCtXOZLbwmawp"></script>
<!--百度点聚合-->
<script type="text/javascript"
	src="js/lib/baidumap/TextIconOverlay_min.js"></script>
<!-- <script type="text/javascript"
	src="js/lib/baidumap/MarkerClusterer_min.js"></script> -->
<script type="text/javascript" src="js/lib/baidumap/MarkerClusterer.js"></script>
<!--百度鼠标绘制工具-->
<script type="text/javascript" src="js/lib/baidumap/DrawingManager.js"></script>
<link href="js/lib/baidumap/DrawingManager_min.css" rel="stylesheet">
<!--百度地图路况信息控件-->
<script type="text/javascript"
	src="js/lib/baidumap/TrafficControl.min.js"></script>
<link href="js/lib/baidumap/TrafficControl.min.css" rel="stylesheet">
<!--echarts-->
<script src="js/lib/echarts/echarts.min.js"></script>
<!--echarts地图-->
<script src="js/lib/echarts/extension/dataTool.js?v=2.1.62"></script>
<script src="js/lib/echarts/extension/bmap.js?v=2.1.62"></script>
<!--echarts主题-->
<script src="js/lib/echarts/cbcp-theme.js"></script>
<link rel="stylesheet" type="text/css" href="js/lib/echarts-map/css/main.css">
<!-- 全国344个市、区、州对应的数字编号 -->
<script type="text/javascript" src="js/lib/echarts-map/js/citymap.js"></script>
<!--自定义css-->
<link href="css/common.css?v=2.1.6" rel="stylesheet">
<link href="css/cover.css?v=2.1.5" rel="stylesheet">
<!--add by guoshuai start 2018-9-27-->
<!--add by guoshuai end 2018-9-27-->
<style>
/*add by guoshuai start 2018-9-26*/
@font-face{
	font-family: DigitalICG;
	src: url('css/DigitalICG.ttf');
}
/*add by guoshuai end 2018-9-26*/
.title-nav {
	/*delete by guoshuai start 2018-9-26
	width: 300px;
	height: 45px;
	left: 25px;
	top: 65px;
	delete by guoshuai end 2018-9-26*/
	position: absolute;
	float: left;
	top: 50px;
	color: #fff;
	z-index: 1500;
	/*add by guoshuai start 2018-9-26*/
	width: 8.85%;
	height: 100%;
	opacity: 0.8;
	background-color: #153b69 ;
	/*add by guoshuai end 2018-9-26*/
}

.title-nav-item {
	/*delete by guoshuai start 2018-9-26
	width: 120px;
	height: 100%;
	delete by guoshuai end 2018-9-26*/
	position: relative;
	float: left;
	/*delete by guoshuai start 2018-9-26
	background: rgb(29, 33, 39);
	border-bottom: 1px solid #b7b7b7;
	delete by guoshuai end 2018-9-26*/
	cursor: pointer;
	/*add by guoshuai start 2018-9-26*/
	width:100%;
	height:80px;
	cursor: pointer;
	background: url("img/iconpic/nav-checked.png");
	background-size: 100% 100%;
	top:27px;
	color:#6586a9;
	/*add by guoshuai end 2018-9-26*/
}

.title-nav .active {
	/*delete by guoshuai start 2018-9-26
	color: #02b0f1 !important;
	border: 1px solid #b7b7b7;
	border-bottom: none;
	border-radius: 6px 6px 0 0;
	delete by guoshuai end 2018-9-26*/
	/*add by guoshuai start 2018-9-26*/
	color: #fff !important;
	line-height: 78px;
	font-size:20px;
	background: url("img/iconpic/nav-unchecked.png");
	background-size: 100% 100%;
	/*add by guoshuai end 2018-9-26*/
}
/*add by guoshuai start 2018-9-26*/
.title-nav-item-icon-two {
	width: 17.65%;
	height: 38.46%;
	position: relative;
	float: left;
	top: 50%;
	margin-top: -15px;
	margin-left: 20%;
	background: url("img/iconpic/nav-dev-un.png");
	background-size:100% 100%;
	top: 50%;
	filter: grayscale(100%);
}
/*add by guoshuai end 2018-9-26*/
.title-nav-item-icon {
	/*delete by guoshuai start 2018-9-26
	width: 30px;
	height: 30px;
	position: relative;
	float: left;
	top: 50%;
	margin-top: -15px;
	margin-left: 18px;
	background: url("./img/iconlib_mainpage.png");
	delete by guoshuai end 2018-9-26*/
	/*add by guoshuai start 2018-9-26*/
	width: 17.65%;
	height: 38.46%;
	position: relative;
	float: left;
	top: 50%;
	margin-top: -15px;
	margin-left: 20%;
	background: url("img/iconpic/nav-case-un.png");
	background-size: 100% 100%;
	/*add by guoshuai end 2018-9-26*/
	top: 50%;
	filter: grayscale(100%);
}

.title-nav .active .title-nav-item-icon {
	/*delete by guoshuai start 2018-9-26
	filter: grayscale(0%);
	delete by guoshuai end 2018-9-26*/
	/*add by guoshuai start 2018-9-26*/
	background: url("img/iconpic/nav-case.png") no-repeat;
	background-size: 100% 100%;
	/*add by guoshuai end 2018-9-26*/
}

/*add by guoshuai start 2018-9-26*/
.title-nav .active .title-nav-item-icon-two {
	background: url("img/iconpic/nav-dev.png") no-repeat;
	background-size: 100% 100%;
}
/*add by guoshuai end 2018-9-26*/

.title-nav-item-word {
	/*delete by guoshuai start 2018-9-26
	height: 45px;
	position: relative;
	float: left;
	font-size: 17px;
	margin-left: 16px;
	line-height: 45px;
	delete by guoshuai end 2018-9-26*/
	/*add by guoshuai start 2018-9-26*/
	height: 78px;
	position: relative;
	float: left;
	font-size: 17px;
	margin-left: 10%;
	color: #fff;
	line-height: 80px;
	font-size:1vw;
	/*add by guoshuai end 2018-9-26*/
}

.main-page-content {
	/*delete by guoshuai start 2018-9-26
	position: absolute;
	left: 25px;
	top: 109px;
	border: 1px solid #b7b7b7;
	background: rgb(29, 33, 39);
	overflow: hidden;
	delete by guoshuai end 2018-9-26*/
	/*add by guoshuai start 2018-9-26*/
	width: 97.40%;
	height:92%;
	position: absolute;
	left: 9.10%;
	float: left;
	top: 70px;
	background:url("img/iconpic/bg.png");
	background-size: 100% 100%;
	overflow: hidden;
	background-color: rgb(29, 33, 39);
	/*add by guoshuai end 2018-9-26*/
}

.new-message-container {
	/*delete by guoshuai start 2018-9-26
	width: 570px;
	position: absolute;
	top: 0;
	right: 0;
	delete by guoshuai end 2018-9-26*/
	/*add by guoshuai start 2018-9-26*/
	width: 30.48%;
	height: 40.76%;
	position: absolute;
	right: 8.45%;
	background: url('img/iconpic/message-content-bg.png');
	background-size:100% 100%; 
	/*add by guoshuai end 2018-9-26*/
}

/*delete by guoshuai start 2018-9-26*/
/*.container-title {
	width: 100%;
	height: 30px;
	position: absolute;
	top: 20px;
	left: 0;
}*/
/*delete by guoshuai end 2018-9-26*/

.container-title-icon {
	width: 30px;
	height: 30px;
	position: absolute;
	background: url("./img/iconlib_mainpage.png");
}

.container-title-word {
	height: 30px;
	position: absolute;
	left: 45px;
	font-size: 18px;
	line-height: 30px;
	color: #fff;
}
.container-title-word-working-dev {
	height: 30px;
	font-size: 18px;
	line-height: 30px;
	color: #fff;
	margin-left: 6%;
}

.new-message-casine-count {
	/*delete by guoshuai start 2018-9-26
	height: 30px;
	position: absolute;
	right: 20px;
	text-align: right;
	font-family: "SimSun" !important;
	font-size: 26px;
	line-height: 30px;
	color: #fff;
	delete by guoshuai end 2018-9-26*/
	/*add by guoshuai start 2018-9-26*/
	position: absolute;
	
	text-align: right;
	font-family: "SimSun" !important;
	font-size: 133%;
	line-height: 150%;
	color: #fff;
	top:46%;
	width: 79.84%;
	height: 34.92%;
	background: url('img/iconpic/new-message-bg.png');
	background-size: 100% 100%;
	overflow: hidden;
	padding-left: 9.52%;
	/*add by guoshuai end 2018-9-26*/
}

.new-message-casine-count span {
	/*delete by guoshuai start 2018-9-26
	color: #23dcb3;
	delete by guoshuai end 2018-9-26*/
	/*add by guoshuai start 2018-9-26*/
	color: #18c0f1;
	font-family: DigitalICG;
	font-size: 60px;
	/*add by guoshuai end 2018-9-26*/
}

.new-message-item-container {
	/*delete by guoshuai start 2018-9-26
	width: 100%;
	bottom: 0;
	delete by guoshuai end 2018-9-26*/
	position: absolute;
	left: 0;
	overflow-y: scroll;
	/*add by guoshuai start 2018-9-26*/
	width: 99%;
	bottom: 5px;
	overflow-x:hidden;
	/*add by guoshuai end 2018-9-26*/
}

/*滚动条样式*/
.new-message-item-container::-webkit-scrollbar { /*滚动条整体样式*/
	/*delete by guoshuai start 2018-9-26*/
	/*width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
	/*height: 4px;
	/*delete by guoshuai end 2018-9-26*/
	/*add by guoshuai start 2018-9-26*/
	width: 10px; 
	height: 10px;
	/*add by guoshuai end 2018-9-26*/
}

.new-message-item-container::-webkit-scrollbar-arrow { /*滚动条整体样式*/
	color:#f2f2f3;
}

/*add by guoshuai start 2018-9-26*/
.new-message-item-container::-webkit-scrollbar-button{/*滚动条两端的按钮，可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果（位置2）*/
    height: 10px;
    width:10px;
}
/*add by guoshuai end 2018-9-26*/

.new-message-item-container::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
	/*delete by guoshuai start 2018-9-26
	border-radius: 3px;
	-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	background: rgba(255, 255, 255, 0.4);
	delete by guoshuai end 2018-9-26*/
	/*add by guoshuai start 2018-9-26*/
	border-radius: 4px;
	-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	background: #17c1f4;
	/*add by guoshuai end 2018-9-26*/
}

.new-message-item-container::-webkit-scrollbar-track { /*滚动条里面轨道*/
	-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	border-radius: 0;
	/*delete by guoshuai start 2018-9-26
	background: rgba(255, 255, 255, 0.1);
	delete by guoshuai end 2018-9-26*/
}

.new-message-item {
	/*delete by guoshuai start 2018-9-26
	width: 100%;
	height: 56px;
	position: relative;
	float: top;
	margin-bottom: 10px;
	delete by guoshuai end 2018-9-26*/
	/*add by guoshuai start 2018-9-26*/
	float:right;
	height: 20.35%;
	position: relative;
	width: 89.47%;
	border-bottom: 1px solid #03172f;
	border-top:1px solid #0e3463;
	/*add by guoshuai end 2018-9-26*/
}

/*add by guoshuai start 2018-9-26*/
.new-message-item-container div:nth-child(1){
	border-top:none;
}
/*add by guoshuai end 2018-9-26*/

.message-user-pic {
	/*delete by guoshuai start 2018-9-26
	width: 35px;
	height: 35px;
	position: absolute;
	left: 5px;
	top: 50%;
	margin-top: -18px;
	border-radius: 50%;
	overflow: hidden;
	delete by guoshuai end 2018-9-26*/
	/*add by guoshuai start 2018-9-26*/
	width: 7.84%;
	height: 57.14%;
	position: absolute;
	left: -7.86%;
	margin-top: 3.6%;
	border-radius: 50%;
	background:url("img/iconpic/case-group.png");
	background-size: 100% 100%;
	/*add by guoshuai end 2018-9-26*/
}

/*delete by guoshuai start 2018-9-26
.message-user-pic img {
	width: 35px;
	height: 35px;
}
delete by guoshuai end 2018-9-26*/

.new-message-content {
	/*delete by guoshuai start 2018-9-26
	width: 500px;
	height: 56px;
	border: 1px solid #b7b7b7;
	delete by guoshuai end 2018-9-26*/
	position: absolute;
	top: 0;
	right: 8px;
	color: #fff;
	font-size: 14px;
	/*add by guoshuai start 2018-9-26*/
	width: 97.15%;
	height:96.55%;
	/*add by guoshuai end 2018-9-26*/
}

.new-message-word-1 {
	height: 26px;
	/* position: absolute; */
	margin-left: 7px;
	top: 0;
	line-height: 26px;
	width: 57%;
}

.new-message-word-2 {
	height: 26px;
	/* position: absolute; */
	margin-left: 7px;
	bottom: 0;
	line-height: 24px;
	width:96%;
}

.new-message-word-2 div {
	position: relative;
	float: left;
}

.new-message-play-btn {
	width: 26px;
	height: 26px;
	position: absolute;
	top: 50%;
	margin-top: -13px;
	right: -4px;
	background: url("./img/iconlib_mainpage.png");
	background-position: 0 -30px;
}

.new-message-replay-btn {
	width: 26px;
	height: 28px;
	position: absolute;
	top: 50%;
	margin-top: -14px;
	right: -4px;
	/*delete by guoshuai start 2018-9-26
	background: url("./img/iconlib_mainpage.png");
	background-position: -26px -30px;
	delete by guoshuai end 2018-9-26*/
	/*add by guoshuai start 2018-9-26*/
	background: url("./img/iconpic/finished.png");
	background-size: 100% 100%;
	/*add by guoshuai end 2018-9-26*/
}

.new-message-loading {
	width: 200px;
	height: 30px;
	position: absolute;
	left: 230px;
	top: 50%;
	margin-top: -15px;
}

.new-message-loading img {
	width: 30px;
	height: 30px;
	position: absolute;
}

.new-message-loading span {
	height: 30px;
	position: absolute;
	left: 35px;
	color: rgb(0, 186, 255);
	font-size: 17px;
	line-height: 30px;
}

.new-message-none {
	width: 560px;
	height: 30px;
	position: absolute;
	left: 0;
	top: 50%;
	margin-top: -15px;
	text-align: center;
	color: rgb(0, 186, 255);
	font-size: 17px;
	text-align: center;
	line-height: 30px;
}

.rank-list-container {
	/*delete by guoshuai start 2018-9-26
	width: 570px;
	height: 500px;
	position: absolute;
	right: 0;
	bottom: 0;
	delete by guoshuai end 2018-9-26*/
	/*add by guoshuai start 2018-9-26*/
	width: 30.48%;
	height: 57%;
	position: absolute;
	right: 8.45%;
	bottom:-3px;
	background: url('img/iconpic/rank-list-bg.png') no-repeat;
	background-size: 100% 99.5%;
	
	/*add by guoshuai end 2018-9-26 */
}

.rank-list-table {
	/*delete by guoshuai start 2018-9-26
	position: absolute;
	top: 60px;
	color: #fff;
	font-size: 16px;
	line-height: 38px;
	width: 100%;
	delete by guoshuai end 2018-9-26*/
	/*add by guoshuai start 2018-9-26*/
	width: 95%;
	/* position: absolute;
	top: 14%; */
	color: #fff;
	height: 83.69%;
	/* left: 3.07%; */
	table-layout: fixed;
	margin-top: 70px;
	margin-left: 18px;
	/* overflow-y:scroll; */
	/*add by guoshuai end 2018-9-26 */
}

.rank-list-table tr {
	/*delete by guoshuai start 2018-10-12
	cursor: pointer;
	delete by guoshuai end 2018-10-12*/
	/*add by guoshuai start 2018-9-26*/
	height: 9.4528%
	/*add by guoshuai end 2018-9-26 */
}

/*add by guoshuai start 2018-9-26*/
.rank-list-table tr:nth-child(odd){
	background-color: rgba(23,193, 244, 0.2);
}

.rank-list-table #table-tbody tr:nth-child(1){
	background-color: rgba(23,193, 244, 0.2);
}	
/*add by guoshuai end 2018-9-26 */

/*delete by guoshuai start 2018-9-26
.rank-list-table tr:hover {
	background: rgba(255, 255, 255, 0.15);
}
delete by guoshuai end 2018-9-26*/

.rank-list-table tr td {
	text-align: center;
	/*add by guoshuai start 2018-9-26*/
	border-left: 1px solid rgba(23,193, 244, 0.2);
	/*add by guoshuai end 2018-9-26 */
}

/*add by guoshuai start 2018-9-26*/
.rank-list-table tr td:nth-child(5){
	border-right: 1px solid rgba(23,193, 244, 0.2);
}

.rank-list-table tr:nth-child(1) td{
	border:none;
	border-right: 1px solid rgba(23,193, 244, 0.2);  
}

.rank-list-table tr:nth-child(1) td:nth-child(5){
	border-right: 1px solid rgba(23,193, 244, 0.2);
}	
#table-tbody tr:nth-last-child(1){
	border-bottom: 1px solid rgba(23,193, 244, 0.2);
}
/*add by guoshuai end 2018-9-26 */

.rand-rise-icon {
	width: 11px;
	height: 17px;
	margin-left: 42%;
	background: url("./img/iconlib_mainpage.png");
	background-position: -52px -30px;
	line-height: 17px;
}

.rand-flat-icon {
	width: 13px;
	height: 1px;
	margin-left: 46%;
	background: url("./img/iconlib_mainpage.png");
	background-position: -52px -47px;
	line-height: 17px;
}

.rand-drop-icon {
	width: 11px;
	height: 17px;
	margin-left: 42%;
	background: url("./img/iconlib_mainpage.png");
	background-position: -63px -30px;
	line-height: 17px;
}

.case-statistics-content {
	/* delete by guoshuai start 2018-9-26
	width: 300px;
	height: 400px;
	position: absolute;
	left: 30px;
	delete by guoshuai end 2018-9-26*/
	/*add by guoshuai start 2018-9-26*/
	top: -6%;
	width: 16.04%;
	height: 47.39%;
	position: absolute;
	left: 1.07%;
	z-index: 1000;
	/*add by guoshuai end 2018-9-26*/
}

.case-statistics-value {
	position: absolute;
	color: #fff;
	/* delete by guoshuai start 2018-9-26
	left: 30px;
	top: 70px;
	font-family: "SimSun" !important;
	font-size: 37px;
	delete by guoshuai end 2018-9-26*/
	/*add by guoshuai start 2018-9-26*/
	top:13%;
	font-size: 133%;
	background: url('img/iconpic/new-message-bg.png');
	background-size: 100% 100%;
	width: 80%;
	height: 31.75%;
	padding-left: 9.52%;
	/*add by guoshuai end 2018-9-26*/

}

.case-value-type-selector {
	position: absolute;
	/* delete by guoshuai start 2018-9-26
	top: 130px;
	left: 70px;
	delete by guoshuai end 2018-9-26*/
	/*add by guoshuai start 2018-9-26*/
	top: 82%;
	width: 100%;
	background: url('img/iconpic/new-message-bg.png') no-repeat;
	background-size: 80% 100%;
	/*add by guoshuai end 2018-9-26*/
	color: #fff;
}

.case-value-type-selector i{
	margin-left: 31px;
}
.case-value-type-selector label{
	padding-left: 63px;
}

.selector-label-item {
	position: relative;
	float: top;
	color: #fff;
	/*add by guoshuai start 2018-9-26*/
	/* margin-left:-20px; */
	/*add by guoshuai end 2018-9-26*/
}

.selector-label-item label {
	font-weight: 100;
	/*add by guoshuai start 2018-9-26*/
	width: 127px;
	height: 30px;
	line-height: 36px;
	display: block;
	/*add by guoshuai end 2018-9-26*/
}

.mdui-radio-icon {
	border-color: #fff;
}

.mdui-radio input[type=radio]:checked+.mdui-radio-icon {
	border-color: #00baff;
}

.mdui-radio-icon:before {
	background: #00baff;
}

.case-statistics-echarts {
	width: 300px;
	/*delete by guoshuai start 2018-9-26
	height: 300px;
	position: absolute;
	left: 0;
	bottom: 0;
	delete by guoshuai end 2018-9-26*/
	/*add by guoshuai start 2018-9-26*/
	height: 40.76%;
	position: absolute;
	left: 1.07%;
	bottom: 0;
	background: url('img/iconpic/case-statistics-bg.png');
	background-size: 100% 100%;
	/*add by guoshuai end 2018-9-26*/
}

/*add by guoshuai start 2018-9-26*/
#case-statistics-echarts-dom2{
	display:none;
}	
/*add by guoshuai end 2018-9-26*/

.case-distribution-echarts {
	width: 300px;
	height: 300px;
	position: absolute;
	/*delete by guoshuai start 2018-9-26
	left: 200px;
	top: -20px;
	delete by guoshuai end 2018-9-26*/
	/*add by guoshuai start 2018-9-26*/
	left: 10.70%;
	top: -2.37%;
	/*add by guoshuai end 2018-9-26*/
}

.dev-statistics-container {
	/*delete by guoshuai start 2018-9-26
	width: 350px;
	height: 170px;
	position: absolute;
	left: 20px;
	border-bottom: 1px solid rgb(183, 183, 183);
	delete by guoshuai end 2018-9-26*/
	/*add by guoshuai start 2018-9-26*/
	width: 14.01%;
    height: 19.20%;
	left: 1.07%;
    top: 0.8%;
	background: url("img/iconpic/new-message-bg.png");
	background-size:100% 100%;
	position: absolute;
	/*add by guoshuai end 2018-9-26*/
}

.dev-working-container {
	/*delete by guoshuai start 2018-9-26
	width: 350px;
	height: 170px;
	position: absolute;
	left: 20px;
	top: 170px;
	border-bottom: 1px solid rgb(183, 183, 183);
	delete by guoshuai end 2018-9-26*/
	/*add by guoshuai start 2018-9-26*/
	width: 14.01%;
    height: 19.20%;
	position: absolute;
	left: 1.07%;
    top: 21.30%;
	background: url("img/iconpic/user-option-bg.png");
	background-size:100% 100%;
	/*add by guoshuai end 2018-9-26*/
}

.dev-statistics-value-1 {
	/*delete by guoshuai start 2018-9-26
	left: 0;
	top: 60px;
	font-size: 35px;
	font-family: "SimSun";
	delete by guoshuai end 2018-9-26*/
	/*add by guoshuai start 2018-9-26*/
	font-size: 28px;
	font-family: "DigitalICG";
	color: #fff;
	/*add by guoshuai end 2018-9-26*/
	float: left;
    margin-left: 12px;
}

/*add by guoshuai start 2018-9-26*/
.dev-statistics-value-1 span{
	font-size: 3.25vw;
}	
/*add by guoshuai end 2018-9-26*/

.dev-statistics-value-2 {
	/* position: absolute; */
	/*delete by guoshuai start 2018-9-26
	left: 0;
	top: 120px;
	delete by guoshuai end 2018-9-26*/
	/*add by guoshuai start 2018-9-26*/
	/* left: 24px;
	top: 71.85%; */
	width: 96%;
	/*add by guoshuai end 2018-9-26*/
	font-size: 1vw;
	color: #fff;
	float: left;
	height: 24px;
	line-height:24px;
	margin-left: 12px;
	font-family: "DigitalICG";
}

.dev-usingrate-container {
	width: 350px;
	height: 200px;
	position: absolute;
	left: 20px;
	/*delete by guoshuai start 2018-9-26
	top: 340px;
	delete by guoshuai end 2018-9-26*/
	/*add by guoshuai start 2018-9-26*/
	top: 49%;
	/*add by guoshuai end 2018-9-26*/
}

.dev-usingrate-selector {
	width: 180px;
	/*add by guoshuai start 2018-9-26*/
	height:36px;
	display:inline-block;
	position:relative;
	/*add by guoshuai end 2018-9-26*/
}

.dev-distribution-container {
	width: 500px;
	height: 500px;
	position: absolute;
	/*delete by guoshuai start 2018-9-26
	right: 20px;
	bottom: 20px;
	delete by guoshuai end 2018-9-26*/
	/*add by guoshuai start 2018-9-26*/
	top:7px;
	right: 158px;
	background: url('img/iconpic/dev-distribution-bg.png');
	background-size: 100% 100%;
	/*add by guoshuai end 2018-9-26*/
}

.dev-usingrate-no-data {
	width: 88%;
	height: 50px;
	position: absolute;
	top: 50%;
	margin-top: -50px;
	color: rgb(0, 186, 255);
	font-size: 20px;
	text-align: center;
	line-height: 50px;
}

.dev-usingrate-echarts {
	width: 100%;
	height: 100px;
	position: absolute;
	left: -65px;
	bottom: 0;
}

.dev-distribution-type {
	position: absolute;
	/*delete by guoshuai start 2018-9-27
	color: #fff;
	left: 160px;
	top: -3px;
	delete by guoshuai end 2018-9-27*/
	/*add by guoshuai start 2018-9-27*/
	z-index: 2;
	right: 11%;
	top: 0px;
	width:106px;
	height:27px;
	background-color: #000;
	border-radius: 16px;
	/*add by guoshuai end 2018-9-27*/
}

.dev-distribution-map {
	width: 100%;
	height: 300px;
	position: absolute;
	/*delete by guoshuai start 2018-9-27
	left: 0;
	bottom: 0;
	delete by guoshuai end 2018-9-27*/
	/*add by guoshuai start 2018-9-27*/
	left: 15px;
	top:70px;
	margin-left: 6px;
    margin-top: -10px;
	/*add by guoshuai end 2018-9-27*/
}
/*add by guoshuai start 2018-9-27*/
.drop-div a{
	display:block;
	float:left;
	width:100%;
	height:36px;
	line-height:36px;
}
.drop-div{
	font-size: 18px;	
	width:180px;
	height:144px;
	display:none;
	width:180px;
	height:144px;
	background:url("img/iconpic/drop-div-bg.png");
	background-size:100% 100%;
	float: left;
	text-align: left;
	margin-top:5px;
}
#dropbtn{
	width: 100%;
	height: 100%;
	line-height: 36px;
	color: #fff;
	cursor: pointer;
	float: left;
	/* background-color: #153b69;
	opacity: 0.4; */
	background:url("img/iconpic/dropbtn-bg.png");
	background-size:100% 100%;
	font-size: 20px;
}
#dropbtn:hover .drop-div{
	display:block;
}
#dropbtn label{
	padding-left: 14px;
}
.dev-usingrate-selector form{
	display:block;
	height:36px;
	width:180px;
	background:url("img/iconpic/drop-div-bg.png");
	background-size:100% 100%;
	/* background-color:#153b69;
	opacity:0.4; */
}
#dropbtn .mdui-icon{
	
	position: relative;
	
	right: -55px;
	color: rgb(0, 186, 255);
}
#dropbtn-2{
	width: 109%;
	height: 36px;
	line-height: 36px;
	color: #fff;
	padding-left: 14px;
	cursor: pointer;
	float: left;
	/* background-color: #153b69;
	opacity: 0.4; */
	background:url("img/iconpic/dropbtn-bg.png");
	background-size:100% 100%;
	font-size: 20px;
}
#dropbtn-2:hover .drop-div2{
	display:block;
}
#dropbtn-2:hover #case-year-item a:nth-child(1){
	display: none;
}
#dropbtn-2:hover #case-year-item li a:nth-child(1){
	display: none;
}
.drop-div2 a{
	display:block;
	float:left;
	width:100%;
	height:36px;
	line-height:36px;
}
.drop-div2{	
	width:109%;
	height:144px;
	display:none;
	height:144px;
	background:url("img/iconpic/drop-div-bg.png");
	background-size:100% 100%;
	float: left;
	text-align: left;
	overflow-x:hidden;
	overflow-y: scroll;
	position: relative;
    left: -14px;
}
/*滚动条样式*/
.drop-div2::-webkit-scrollbar { /*滚动条整体样式*/
	width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
	height: 10px;
}
.drop-div2::-webkit-scrollbar-arrow { /*滚动条整体样式*/
	color:#f2f2f3;
}
.drop-div2::-webkit-scrollbar-button{/*滚动条两端的按钮，可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果（位置2）*/
			/* background:#74D334; */
            height: 10px;
            width:10px;
			/* background: url('img/iconpic/shanggundong.png');
			background-size: 100% 100%;
            border-top: 1px solid red; */
}
.drop-div2::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
	border-radius: 4px;
	-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	background: #17c1f4;
}

.drop-div2::-webkit-scrollbar-track { /*滚动条里面轨道*/
	-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	border-radius: 0;
	/* background: rgba(255, 255, 255, 0.1); */
	background:url('img/iconpic/scroll-bar.png');
}
.case-value-type-selector form{
	display:block;
	height:auto;
	width:71%;
	/* background:url("img/iconpic/drop-div-bg.png");
	background-size:100% 100%; */
	/* background-color:#153b69;
	opacity:0.4; */
}
#db2-test{
	float: left;
}
#dropbtn-2 .mdui-icon{
	display: block;
	position: relative;
	top:10px;
	right: -60px;
	color: rgb(0, 186, 255);
	float: left;
}
#home-radio .mdui-radio{
	width: 53px;
	height: 27px;
	text-align: center;
	display: block;
	line-height: 27px;
	font-weight: 100;
	float: left;
}
#pic-heng{
	width: 11.76%;
	height: 1.08%;
	position: relative;
	/* top:10px;
	left: 320px; */
	top:1.36%;
	left:26.89%;
	background: url("img/iconpic/adorning-2.png");
	background-size: 100% 100%;
}
#pic-shu{
	width: 0.67%;
	height: 18.96%;
	position: relative;
	top:66.46%;
	left: 100%;
	background: url("img/iconpic/adorning.png");
	background-size: 100% 100%;
}
#pic-scale{
	width: 100px;
	height: 25px;
	background: url('img/iconpic/eig-enlarge.png') no-repeat;
	background-size: 25% 100%;
	position: absolute;
	top:0px;
	left: 90%;
	z-index: 2;
	color: #fff;
	padding-left: 30px;
	line-height: 25px;
	font-size: 16px;
	cursor: pointer;
}
/* 案例新增样式 */
.case-statistics-value span{
	font-size: 60px;
	font-family: DigitalICG;
	display: block;
	float: left;
}
.case-statistics-value div{
	float: left;
	width: 94%;
	/* text-align: left; */
	height: 20px;
	line-height: 20px;
	margin-top: 18px;
}
.case-statistics-value p{
	color: #ffffff;
	font-size: 28px;
	display: block;
	float: left;
	position: relative;
	top: 35px;
	margin-left: 10px;
}
.new-message-casine-count p{
	/* color: #ffffff;
	font-size: 28px;
	display: block;
	float: left; */
	position: relative;
	top:30px;
	margin-top: 10px;
	margin-left: 10px;
	/* left: 24px; */
	font-family: MicrosoftYaHeiLight;
}
.new-message-casine-count div{
	float: left;
	width: 208px;
	text-align: left;
	height: 20px;
	line-height: 20px;
	margin-top: 18px;
	font-family: MicrosoftYaHeiLight;
}
.new-message-casine-count span{
	/* display: block;
	float: left;
	position: relative;
	top:10px;
	left: 24px; */
}

.container-title-word-devrat{
	height: 5.52%;
	left:1.34%;
	top:3.81%;
	font-size: 20px;
	/* line-height: 18.52%; */
	/* color: #23b5e8; */
	color:#fff;
	position: absolute;
}
.container-title-word-tj{
	height: 40px;
	/* left:6%;
	margin-top:8px; */
	font-size: 20px;
	line-height: 40px;
	/* color: #23b5e8; */
	/* position: relative; */
	color:#fff;
	margin-left: 12px;
}
.container-title-word-df{
	position: absolute;
	/* left: 14px;
	top: 24px; */
	height: 3.52%;
	left:2.5%;
	top:14px;
	font-size: 133%;
	line-height: 20px;
	color: rgb(59, 180, 242);
	z-index:2;
}
.container-title-word-mess{
	position: absolute;
	/* left: 14px;
	top: 24px; */
	height: 18.52%;
	left:5.34%;
	top:8.81%;
	font-size: 160%;
	line-height: 18.52%;
	color: #23b5e8;
}
.container-title-word-rank{
	position: absolute;
	height: 18.52%;
	left:3.34%;
	top:4.81%;
	font-size: 160%;
	line-height: 18.52%;
	color:#23b5e8;
}
.container-title-word-dev{
	height: 30px;
    position: absolute;
    left: 0px;
    font-size: 18px;
    line-height: 30px;
	color: #fff;
	top:6%;
}
/* 动态消息新增 */
#nmc-pic1{
	width:1.40%;
	height:40.70%;
	background:url('img/iconpic/adorning.png');
	background-size: 100% 100%;
	position: relative;
	top:25%;
	left:-2%;
}
#nmc-pic2{
	width:211px;
	height:24px;
	background:url('img/iconpic/decorate-2.png');
	background-size: 100% 100%;
	position: relative;
	top:-33%;
	left:59.5%;
}
#rlc-pic1{
	width:1.40%;
	height:30%;
	background:url('img/iconpic/adorning.png');
	background-size: 100% 100%;
	position: absolute;
	top:47%;
	right: 0;
}
#rlc-pic2{
	width:211px;
	height:24px;
	background:url('img/iconpic/decorate-2.png');
	background-size: 100% 100%;
	position: absolute;;
	top:6%;
	right: 3%;
}
#rlc-more{
	position: relative;
	color: #23b5e8;
	top:47%;
	left:87.72%;
	font-family: MicrosoftYaHei;
	cursor: pointer;
}
#rlc-pic3{
	width: 2.81%;
	height: 3.35%;
	background: url('img/iconpic/first.png');
	background-size:100% 100%;
	position: absolute;
	top:21%;
	left: 38.5%;
	display:none;
}
#rlc-pic4{
	width: 2.81%;
	height: 3.35%;
	background: url('img/iconpic/second.png');
	background-size:100% 100%;
	position: absolute;
	top:25%;
	left: 38.5%;
	display:none;
}
#rlc-pic5{
	width: 2.81%;
	height: 3.35%;
	background: url('img/iconpic/third.png');
	background-size:100% 100%;
	position: absolute;
	top:29%;
	left: 38.5%;
	display: none;
}
.container-title-word-ct{
	height: 18.52%;
	left:3%;
	top:64%;
	font-size: 133%;
	line-height: 18.52%;
	color: #23b5e8;
	position:absolute;
	z-index:500;
}
#cse-pic1{
	width:30%;
	height:24px;
	background:url('img/iconpic/decorate-1.png');
	background-size: 100% 100%;
	position: absolute;
	top:63.5%;
	left:27.5%;
	z-index: 1000;
}
#cse-pic2{
	width:0.4%;
	height:16.40%;
	background:url('img/iconpic/adorning.png');
	background-size: 100% 100%;
	position: absolute;
	top:72%;
	left:59.4%;
	z-index: 1000;
}
#cse-pic3{
	width:8.04%;
	height:0.8%;
	background:url('img/iconpic/adorning-2.png');
	background-size: 100% 100%;
	position: absolute;
	top:59%;
	left:11%;
}

/*新增的两个板块*/

#pic-scale-box{
	border: 1px solid #1a3c69;
	border-bottom: none;
	/* width:91.9%; */
	height: 50px;
	position: absolute;
	top:20px;
	left: 21px;
	display:none;
	background: #08264a;
	z-index:1;
}
a:hover{
	text-decoration: none;
}
.get-cos-year-case-item:hover{
	color:#337ab7;
}
.drop-div2 p {
    display: block;
    float: left;
    width: 100%;
    height: 36px;
    line-height: 36px;
}
#get-cos-year-case-search{
	float: left;
    margin-right: 31px;
    background: #18c0f1;
    border: none;
    width: 50px;
    height: 26px;
    border-radius: 6px;
	line-height: 28px;
	text-align: center;
	cursor: pointer;
	position: absolute;
    right: -20%;
    top: 31px;
}
#selector-label-item-self{
	margin-bottom: 10px;
}
#selector-label-item-all{
	margin-top: 10px;
}


@media screen and (max-height: 768px) {
	.case-statistics-echarts{
		bottom:12px;
	}
	.rank-list-container{
		bottom:8px;
	}
}
@media screen and (max-width: 1440px) {
	
	#get-cos-year-case-search{
		right: -28%;
	}
	.input-data-picker-md{
		font-size:10px;
		padding:0;
	}
	.new-message-none{
		left: -17%;
    	top: 45%;
	}
	.new-message-loading img {
		left: -33%;
		top: 10%;
	}
	.new-message-loading span{
		left: -17%;
    	top: 10%;
	}
	.dev-usingrate-echarts{
		left: -37px;
	}
	#selector-label-item-self{
	margin-bottom: 10px;
	}
	#selector-label-item-all{
		margin-top: 0px;
	}
	.case-value-type-selector label {
		margin-bottom: 0px;
	}
	.dev-distribution-container{
		right: 110px;
	}	
}
.new-message-name-v{
	width:18%;
}

.new-message-areaname-v{
	width: 80%;
	
}

.new-message-area-v{
	width: 76.5%;
	margin-left:5px;
}
.new-message-area-v span:nth-child(3){
	width: 17%;
	float: left;
}

.new-message-phone-v{
	width: 43%;
    float: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-left: 4px;
}


@media screen and (max-height: 768px) {
	.dev-usingrate-container{
		top:47%;
	}
	.dev-distribution-map{
		margin-top: -19px;
	}
}

@media screen and (max-width: 1440px) {
	/* .new-message-name-v{
		width: 40px;
	} */
	
	/* .new-message-areaname-v{
		width: 53px;
		height:24px
	} */
	
	/* .new-message-area-v{
		width: 257px;
		margin-left:5px;
	} */
	/* .new-message-phone-v{
		width: 75px;
		font-size:9px;
	} */
}

@media screen and (max-width: 1366px) {
	.case-value-type-selector{
		background-size:80% 93%;
	}
	#get-cos-year-case-search{
		right: -32%;
	}
	/* .new-message-name-v{
		width: 40px;
	}
	 */
/* 	.new-message-areaname-v{
		width: 113px;
		
	} */
	
	/* .new-message-area-v{
		width: 242px;
		margin-left:5px;
	} */
	/* .new-message-phone-v{
		width: 78px;
		font-size:9px;
	} */
}
#table-tbody::-webkit-scrollbar { /*滚动条整体样式*/
	width: 8px; 
	height: 10px;
}

#table-tbody::-webkit-scrollbar-arrow { /*滚动条整体样式*/
	color:#f2f2f3;
}

#table-tbody::-webkit-scrollbar-button{/*滚动条两端的按钮，可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果（位置2）*/
    height: 10px;
    width:8px;
}

#table-tbody::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
	border-radius: 4px;
	-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	background: #17c1f4;
}

#table-tbody::-webkit-scrollbar-track { /*滚动条里面轨道*/
	-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	border-radius: 0;
}
.rank-list-table tr{
	display: table;
    width: 100%;
	table-layout: fixed;
}
.rank-list-table tbody {
    display: block;
    height: 100%;
    overflow-y: scroll;
}
.rank-list-table thead tr:nth-child(1){
	height: 40px;
    line-height: 40px;
    background-color: rgba(23,193, 244, 0.4);
}
.new-map-echarts-mask{
	position: absolute;
    left: 13%;
    width: 50%;
    height: 58%;
}
.new-map-loading{
	position: relative;
    top: 39%;
    left: 44%;
}
.new-map-echarts-mask span{
	color:#fff;
}
#homeReturn{
	width:34px;
	height:30px;
	float:left;
	display:none;
	position: absolute;
	background: url('img/iconpic/eig-narrow.png');
	background-size:100% 100%; 
	top:20px;
	right: 42%;
	z-index:1050;
	cursor:pointer;
}
/*add by guoshuai end 2018-9-27*/
</style>
</head>
<!--delete by guoshuai start 2018-9-27 
<body style="background: rgb(29, 33, 39);">
delete by guoshuai end 2018-9-27 -->
<!-- add by guoshuai start 2018-9-27 -->
<body style="background: url('img/iconpic/bg.png');background-size: 100% 100%;background-color:#000;">
<!--add by guoshuai end 2018-9-27-->
	<header class="top-header" style="z-index: 2000;" id="top-header"> <!-- <span class="header-current-weather header-info-txt"></span> <span
		class="header-current-time header-info-txt"></span> --></header>

	<!-- 正文-->
	<div class="main-page-content" id="case-content" style="z-index: 1000">
		<!--下钻返回-->
		<div id="homeReturn"></div>
		<!--加载遮罩-->
		<div class="new-map-echarts-mask">
			<div class="new-map-loading">
				<img src="./img/loading.gif" style="width:50px;"> <span>正在加载</span>
			</div>
		</div>
		<!-- 作战分布echarts-->
		<div class="case-distribution-echarts"
			id="case-distribution-echarts-dom"></div>
		<!-- 作战统计-->
		<div class="case-statistics-content">
			<!-- delete by guoshuai start 2018-9-27
			<div class="container-title">
				<div class="container-title-icon"
					style="background-position: -30px 0;"></div>
				<div class="container-title-word">作战统计</div>
			</div>
			delete by guoshuai end 2018-9-27-->
			<div class="case-statistics-value">
				<div>历史作战:</div>
				<span style="color: #18c0f1;font-size: 3.125vw;line-height:85px;" id="case-history-statistics-value"></span>
				<p style="font-size: 1.46vw">起</p>
			<!--add by guoshuai end 2018-9-27-->	
			</div>
			<!--add by guoshuai start 2018-9-27-->
			<div class="new-message-casine-count">
				<div>作战中:</div>
				<span id="working-case-num" style="font-size: 3.125vw;text-align: left;
					width: auto;
					height: 70px;
					line-height: 80px;
					float: left;
					margin-top: 10px;
				">0</span>
				<p style="font-size: 1.46vw;float:left;">起</p>
			</div>
			<!--add by guoshuai end 2018-9-27-->
			<div class="case-value-type-selector">
				<form>
					<!-- delete by guoshuai start 2018-9-27
					<div class="selector-label-item case-value-type-selector-item">
						<label class="mdui-radio" id="get-all-case"> <input
							type="radio" name="group1" /> <i class="mdui-radio-icon"></i>全部
						</label>
					</div>
					delete by guoshuai end 2018-9-27-->
					<!-- delete by guoshuai start 2018-9-27
					<div class="selector-label-item case-value-type-selector-item">
						<label class="mdui-radio" id="get-current-year-case"> <input
							type="radio" name="group1" checked /> <i class="mdui-radio-icon"></i>最近一年
						</label>
					</div>
					delete by guoshuai end 2018-9-27-->
					<!-- delete by guoshuai start 2018-9-27
					<div class="selector-label-item case-value-type-selector-item">
						<label class="mdui-radio" id="get-cos-year-case"> <input
							type="radio" name="group1" /> <i class="mdui-radio-icon"></i>
							<div class="btn-group">
								<button type="button" id="case-selected-year"
									class="btn btn-default dropdown-toggle"
									style="background: rgb(60, 60, 60); color: #fff;"
									data-toggle="dropdown" aria-haspopup="true"
									aria-expanded="false" data-current-year="2018">delete by guoshuai end 2018-9-27-->
									<!-- 2018 <span class="caret"></span>-->
								<!-- delete by guoshuai start 2018-9-27
								</button>
								<ul class="dropdown-menu" id="case-year-item">delete by guoshuai end 2018-9-27-->
									<!-- 
									<li><a class="get-cos-year-case-item">2018</a></li>
									<li><a class="get-cos-year-case-item">2017</a></li>
									<li><a class="get-cos-year-case-item">2015</a></li>
									<li><a class="get-cos-year-case-item">2014</a></li>
									 -->
								<!-- delete by guoshuai start 2018-9-27</ul>
							</div>&nbsp;&nbsp;年
						</label>
					</div>
					delete by guoshuai end 2018-9-27-->
					<!--add by guoshuai start 2018-9-27-->
					
					<div class="selector-label-item case-value-type-selector-item" id="selector-label-item-all">
						<label class="mdui-radio" id="get-all-case"> <input
							type="radio" name="group1" /> <i class="mdui-radio-icon"></i>全部
						</label>
					</div>
					<div class="selector-label-item case-value-type-selector-item">
						<label class="mdui-radio" id="get-current-year-case"> <input
							type="radio" name="group1" checked /> <i class="mdui-radio-icon"></i>最近一年
						</label>
					</div>
					
					<div class="selector-label-item case-value-type-selector-item" id="selector-label-item-self">
						<label class="mdui-radio" id="get-cos-year-case"> <input
							type="radio" name="group1" /> <i class="mdui-radio-icon"></i>自定义
						</label>
					</div>
					<div class="selector-label-item case-value-type-selector-item" style="display: none;height: 64px; padding-left: 30px;margin-bottom: 10px;" id="get-current-year-case-more">
						<div style="width:100%;height:30px;padding-left:3px;">
                        	<p style="float:left;width: 20px;line-height:30px;">起</p><input type="text" id="query-time-start-timeDev" style="float: left;display: block;width: 53%;background: #153b69;border: none;color: #fff;box-shadow:none;height: 28px !important;"
                    			class="form-control input-background input-data-picker-md"
								onclick="WdatePicker({maxDate:'#F{$dp.$D(\'query-time-end-timeDev\')}',dateFmt:'yyyy-MM'})">
						</div>
						<div style="width:99%;height:30px;padding-left:3px;">
							<p style="float:left;display:block; position:absolute;top:35px;">止</p><input type="text" id="query-time-end-timeDev" style="display: block;width: 53%;background: #153b69;border: none; color: #fff;box-shadow:none;height: 28px !important;"
								class="form-control input-background input-data-picker-md"
								onclick="WdatePicker({minDate:'#F{$dp.$D(\'query-time-start-timeDev\')}',dateFmt:'yyyy-MM'})">
						</div>
						<div id="get-cos-year-case-search" style="">查询</div>
                    </div>
					<!--add by guoshuai end 2018-9-27-->
				</form>
			</div>
		</div>

		<!-- 作战次数统计echarts-->
		<!--add by guoshuai start 2018-9-27-->
		<div class="container-title">
				<div class="container-title-word-ct">作战统计</div>
		</div>
		<div id="cse-pic1"></div>
		<div id="cse-pic2"></div>
		<div id="cse-pic3"></div>
		<div id="echarts-btn1-line" style="
			color: #fff; display: none;
			background: url('img/iconpic/line-check.png');
			background-size:100% 100%;
			width: 26px;
			height: 26px;
			position: absolute;
			top: 67%;
			left: 54%;
			z-index: 2;
			cursor: pointer;
		"></div>
		<div id="echarts-btn1-lineBar" style="
			color: #fff;display: none;
			background: url('img/iconpic/bar-uncheck.png');
			background-size:100% 100%;
			width: 26px;
			height: 26px;
			position: absolute;
			top: 67%;
			left: 56.7%;
			z-index: 2;
			cursor: pointer;
		"></div>
		<!--add by guoshuai end 2018-9-27-->
		<div class="case-statistics-echarts" id="case-statistics-echarts-dom"></div>
		<!--add by guoshuai start 2018-9-27-->
		<div class="case-statistics-echarts" id="case-statistics-echarts-dom2" style="display: none;"></div>
		<!--add by guoshuai end 2018-9-27-->
		<!-- 最新动态-->
		<div class="new-message-container">
			<div class="container-title">
				<!--delete by guoshuai start 2018-9-27
				<div class="container-title-icon"
					style="background-position: -90px 0;"></div>
				delete by guoshuai end 2018-9-27-->
				<div class="container-title-word" style="margin-top: 14px;">最新动态</div>
				<!--delete by guoshuai start 2018-10-27
				<div class="new-message-casine-count">
					
					作战中<span id="working-case-num">0</span>起
					
					<div style="
						float: left;
						width: 180px;
						/* text-align: left; */
						height: 20px;
						line-height: 20px;
						margin-top: 18px;
					">
						作战中:
					</div>
				
					<span id="working-case-num" style="font-size: 3.125vw;text-align: left;
						width: auto;
						height: 70px;
						line-height: 80px;
						float: left;
						margin-left: 30px;
					">0</span>
					<p style="font-size: 1.46vw;float:left;">起</p>
				</div>
				delete by guoshuai start 2018-10-27-->
			</div>
			<div class="new-message-item-container">
				<div class="new-message-loading">
					<img src="./img/loading.gif"> <span>正在加载</span>
				</div>
			</div>
		</div>
		<!-- 排行榜-->
		<div class="rank-list-container">
			<!--add by guoshuai start 2018-9-27-->
			<div id="rlc-pic1"></div>
			<div id="rlc-pic2"></div>
			<div id="rlc-pic3"></div>
			<div id="rlc-pic4"></div>
			<div id="rlc-pic5"></div>
			<!--add by guoshuai end 2018-9-27-->
			<div class="container-title">
				<!--delete by guoshuai start 2018-9-27
				<div class="container-title-icon"
					style="background-position: -120px 0;"></div>
				delete by guoshuai end 2018-9-27-->
				<div class="container-title-word" style="top: 24px;left: 16px;">累计排行榜Top10</div>
			</div>
				<table class="rank-list-table">
						<thead>
								<tr style="width:98.6% ">
									<td class="rank-list-rowno">排名</td>
									<td class="rank-list-name">账号</td>
									<td>作战次数</td>
									<td>评分</td>
									<td>排名变化</td>	
								</tr>
						</thead>
						<tbody id="table-tbody">
						</tbody>
				</table>
		</div>
	</div>
	<!--add by guoshuai start 2018-9-27-->
	<!--
	<div id="dev-content-mask" style=" position: relative;">
	-->
	<!--add by guoshuai end 2018-9-27-->
		<div class="main-page-content" id="dev-content" style="z-index: 0">
			<!--add by guoshuai start 2018-9-27-->
			
			<!--add by guoshuai end 2018-9-27-->
			<!-- 设备统计-->
			<div class="dev-statistics-container">
				<div class="container-title">
					<!--delete by guoshuai start 2018-9-27
					<div class="container-title-icon"
						style="background-position: -180px 0;"></div>
					<div class="container-title-word">设备统计</div>
					delete by guoshuai end 2018-9-27-->
					<!--add by guoshuai start 2018-9-27-->
					<div class="container-title">
						<div class="container-title-word-tj">设备统计</div>
					</div>
					<!--add by guoshuai end 2018-9-27-->
				</div>
				<div class="dev-statistics-value-1">
					<!--delete by guoshuai start 2018-9-27
					<span style="color: #23dcb3" id="statistics-all-dev">0</span>台
					delete by guoshuai end 2018-9-27-->
					<!--add by guoshuai start 2018-9-27-->
					<span style="color: #18c0f1;font-size: 3.125vw;" id="statistics-all-dev" font-family="DigitalICG">0</span>
					台
					<!--add by guoshuai end 2018-9-27-->
					<!-- （已定位<span style="color: #23dcb3" id="statistics-located-dev">0</span>台） -->
				</div>
				<div class="dev-statistics-value-2">
					<span id="statistics-all-car">0</span>台车载，<span
						id="statistics-all-single">0</span>台单兵
				</div>
			</div>
			<!-- 工作中的设备-->
			<div class="dev-working-container">
				<div class="container-title" style="height: 30px; margin-top: 6px;">
					<!--delete by guoshuai start 2018-9-27
					<div class="container-title-icon"
						style="background-position: -210px 0;"></div>
					delete by guoshuai end 2018-9-27-->
					<div class="container-title-word-working-dev">工作中的设备</div>
				</div>
				<div class="dev-statistics-value-1">
					<!--delete by guoshuai start 2018-9-27
					<span style="color: #23dcb3" id="online-all-dev">0</span>台
					delete by guoshuai end 2018-9-27-->
					<!--add by guoshuai start 2018-9-27-->
					<span style="color: #18c0f1" id="online-all-dev" style="font-size: 3.125vw"font-family="DigitalICG">0</span>台
					<!--add by guoshuai end 2018-9-27-->
					<!-- （已定位<span style="color: #23dcb3" id="online-located-dev">0</span>台） -->
				</div>
				<div class="dev-statistics-value-2">
					<span id="online-all-car">0</span>台车载，<span id="online-all-single">0</span>台单兵
				</div>
			</div>
			<!-- 设备使用率-->
			<div class="dev-usingrate-container">
				<div class="container-title">
					<!--delete by guoshuai start 2018-9-27
					<div class="container-title-icon"
						style="background-position: -240px 0;"></div>
					delete by guoshuai end 2018-9-27-->
					<div class="container-title-word-dev">设备使用率</div>
				</div>
				<div class="dev-usingrate-echarts" id="dev-usingrate-echarts-dom"></div>
				<div style="position: absolute; top: 70px; left: 0px;">
					<div class="dev-usingrate-selector">
						<!--delete by guoshuai start 2018-9-27
						<form>
							<div class="selector-label-item">
								<label class="mdui-radio" id="dev-usingrate-selector-all">
									<input type="radio" name="group2" /> <i class="mdui-radio-icon"></i>全部
								</label>
							</div>
							<div class="selector-label-item">
								<label class="mdui-radio" id="dev-usingrate-selector-year">
									<input type="radio" name="group2" /> <i class="mdui-radio-icon"></i>最近一年
								</label>
							</div>
							<div class="selector-label-item ">
								<label class="mdui-radio" id="dev-usingrate-selector-month">
									<input type="radio" name="group2" /> <i class="mdui-radio-icon"></i>最近一月
								</label>
							</div>
							<div class="selector-label-item">
								<label class="mdui-radio" id="dev-usingrate-selector-week">
									<input type="radio" name="group2" checked /> <i
									class="mdui-radio-icon"></i>最近一周
								</label>
							</div>
						</form>
						delete by guoshuai end 2018-9-27-->
						<!--add by guoshuai start 2018-9-27-->
						<form>
								<div id="dropbtn">
										<div id="dp-w2" style="margin-left:14px;">
											最近一周
										</div>
										<i class="mdui-icon material-icons menu-arrow-down"
											style="display:block;margin-top:-30px;"
										>&#xe5c5;</i>
									<div class="drop-div">
										<p class="selector-label-item">
											<label class="mdui-radio" id="dev-usingrate-selector-all">
												<input type="radio" name="group2" />全部
											</label>
										</p>
										<p class="selector-label-item">
											<label class="mdui-radio" id="dev-usingrate-selector-year">
												<input type="radio" name="group2" />最近一年
											</label>
										</p>
										<p class="selector-label-item ">
											<label class="mdui-radio" id="dev-usingrate-selector-month">
												<input type="radio" name="group2" />最近一月
											</label>
										</p>
										<p class="selector-label-item">
											<label class="mdui-radio" id="dev-usingrate-selector-week">
												<input type="radio" name="group2" checked /> 最近一周
											</label>
										</p>
									</div>
								</div>
							</form>
						<!--add by guoshuai end 2018-9-27-->
					</div>
				</div>
			</div>
			<!-- 设备分布-->
			<div class="dev-distribution-container">
				<!--add by guoshuai start 2018-9-27-->
				<div id="pic-heng"></div>
				<div id="pic-shu"></div>
				
				<div id="pic-scale">放大</div>
				
				<!--add by guoshuai end 2018-9-27-->
				<div class="container-title">
					<!--delete by guoshuai start 2018-9-27
					<div class="container-title-icon"
						style="background-position: -60px 0;"></div>
					<div class="container-title-word">设备分布</div>
					delete by guoshuai end 2018-9-27-->
					<!--add by guoshuai start 2018-9-27-->
					<div class="container-title-word-df">设备分布</div>
					<!--add by guoshuai end 2018-9-27-->
					<!--delete by guoshuai start 2018-9-27
					<div class="dev-distribution-type">
					delete by guoshuai end 2018-9-27-->
					<!--add by guoshuai start 2018-9-27-->
					<div class="dev-distribution-type" id="home-radio">
					<!--add by guoshuai end 2018-9-27-->
						<form>
							<!--delete by guoshuai start 2018-9-27
							<label class="mdui-radio dev-distribution-switch" data-type="1"
								style="margin-right: 25px; font-weight: 100;"> <input
								type="radio" name="group1" checked /> <i class="mdui-radio-icon"></i>在线
							</label> <label class="mdui-radio dev-distribution-switch" data-type="0"
								style="font-weight: 100;"> <input type="radio"
								name="group1" /> <i class="mdui-radio-icon"></i>离线
							</label>
							delete by guoshuai end 2018-9-27-->
							<!--add by guoshuai start 2018-9-27-->
							<label class="mdui-radio dev-distribution-switch" data-type="1"
								style="font-weight: 100;padding-left: 0;
									background: url('img/iconpic/online.png') no-repeat;
									background-size: 100% 90%;
									color:#fff;
									" id="online-radio">在线
							</label> 
							<label class="mdui-radio dev-distribution-switch" data-type="0"
								style="font-weight: 100;padding-left: 0;
								    background: url('img/iconpic/offline.png') no-repeat;
									background-size: 100% 90%;
									color:#ccc;
									" id="offline-radio">离线
							</label>
							<!--add by guoshuai end 2018-9-27-->
						</form>
					</div>
				</div>
				<!--delete by guoshuai start 2018-9-27
				<div class="dev-distribution-map" id="bmap"></div>
				delete by guoshuai end 2018-9-27-->
				<!--add by guoshuai start 2018-9-27-->
				<!--遮罩-->
					<div id="pic-scale-box"></div>
					<div class="dev-distribution-map" id="bmap" height="740px"></div>
				<!--</div>-->
				<!--add by guoshuai end 2018-9-27-->
			</div>
		</div>
	<!--add by guoshuai start 2018-9-27-->
	<!--</div>-->
	<!--add by guoshuai end 2018-9-27-->
	<!-- 导航条-->
	<div class="title-nav">
		<div class="title-nav-item active" data-nav-id="case-content">
			<div class="title-nav-item-icon" style="background-position: 0 0;"></div>
			<div class="title-nav-item-word">作战</div>
		</div>
		<div class="title-nav-item" data-nav-id="dev-content">
			<!--delete by guoshuai start 2018-9-27
			<div class="title-nav-item-icon"
			delete by guoshuai end 2018-9-27-->
			<!--add by guoshuai start 2018-9-27-->
			<div class="title-nav-item-icon-two"
				style="background-position:0px 0px;">
			<!--add by guoshuai end 2018-9-27-->
			</div>
			<div class="title-nav-item-word">设备</div>
		</div>
	</div>

	<!-- Modal Alert提示框 -->
	<div class="modal fade bs-example-modal-sm" id="modal-alert"
		data-backdrop="static" data-keyboard="false" tabindex="-1"
		role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog modal-sm" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" style="color: #dedede"
						data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title" id="modal-alert-title"></h4>
				</div>
				<div class="modal-body" id="modal-alert-content"></div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
				</div>
			</div>
		</div>
	</div>
</body>
<script>
	const username = "${sessionScope.user.username}";
	const projectUrl = "${pageContext.request.serverName}${':'}${pageContext.request.serverPort}${pageContext.request.contextPath}";
	const menuList = <%=session.getAttribute("menuPerms")%>;
	console.log(menuList);
	/*add by guoshuai start 2018-9-27*/
	$('#uo-sp2').text(username);
	$(document).on('click','.header-menu-dropdown-item div:eq(0)',function(){
		$('.header-menu-dropdown-item').text($('.header-menu-dropdown-item div:eq(0)').text())
	});
	$(document).on('click','#echarts-btn1-line',function(){
		$('#case-statistics-echarts-dom').css('display','block');
		$('#case-statistics-echarts-dom2').css('display','none');
		$('#echarts-btn1-line').css('background','url("img/iconpic/line-check.png")');
		$('#echarts-btn1-lineBar').css('background','url("img/iconpic/bar-uncheck.png")');
	});
	$(document).on('click','#echarts-btn1-lineBar',function(){
		$('#case-statistics-echarts-dom').css('display','none');
		$('#case-statistics-echarts-dom2').css('display','block');
		$('#echarts-btn1-line').css('background','url("img/iconpic/line-uncheck.png")');
		$('#echarts-btn1-lineBar').css('background','url("img/iconpic/bar-check.png")');
		
	});
	//点击年份，echarts切换的图标变化
	$(document).on('click','.case-value-type-selector-item',function(){
		$('#echarts-btn1-line').css('background','url(img/iconpic/line-check.png)');
		$('#echarts-btn1-lineBar').css('background','url(img/iconpic/bar-uncheck.png)');
		$('.drop-div2').hide();
	});
	$(document).on('click','.get-cos-year-case-item',function(){
		$('#echarts-btn1-line').css('background','url(img/iconpic/line-check.png)');
		$('#echarts-btn1-lineBar').css('background','url(img/iconpic/bar-uncheck.png)');
		//$('.drop-div2').css('display','none');
		$('.drop-div2').hide();
	});
	
	/*add by guoshuai end 2018-9-27*/
</script>
<!-- 相关变量的声明 -->
<script type="text/javascript"
	src="js/src/app/page/home/declaration.js?v=2.1.891112"></script>
<script type="text/javascript">
	/*add by guoshuai start 2018-9-27*/
	$('.title-nav-item').click(function () {
		$('#dev-distribution-map-mask').css('position','');
		$('#dev-content-mask').css('position','');
	});
	let flag=true;
		$(document).on('click','#pic-scale',function(){
			if(flag){
				$('.container-title-word-df').css('top','40px');
				$('.dev-distribution-container').css('width',$(window).width()*0.92552);
				$('.dev-distribution-container').css('height',$(window).height()*0.99383);
				$('.dev-distribution-container').css({'right':'94px','top':'-25px'
					,'background':'url()'});
				// $('.dev-distribution-map').css('width',$(window).width()*0.89427);
				// $('.dev-distribution-map').css('height',$(window).height()*0.83264);
				$('.dev-distribution-map').css('width',$('.dev-distribution-container').width()*0.9664);
				if($(window).width()=="1400"||$(window).width()=="1366"){
					$('.dev-distribution-map').css('height','646.065px');
				}else{
					$('.dev-distribution-map').css('height',$('.dev-distribution-container').height()*0.8766);
				}
				
				$('.dev-distribution-map').css('margin-top','0');
				$('#pic-scale-box').css('display','block');
				$('#pic-scale-box').css('width',$('.dev-distribution-map').width());
				$('#pic-scale').css({'background':'url("img/iconpic/eig-narrow.png")no-repeat','background-size':'25% 100%'});
				$('#pic-scale').text('缩小');
				setTimeout(() => {
					map.centerAndZoom(new BMap.Point(99.952789,32.742493), 6);
				}, 100);
				$('#pic-scale').css('top','35px');
				$('.dev-distribution-type').css('top','-2px');
				flag=false;
			}
			else{
				$('.container-title-word-df').css('top','14px');
				// $('.dev-distribution-container').css('width',$(window).width()*0.61979);
				// $('.dev-distribution-container').css('height',$(window).height()*0.76694);
				$('.dev-distribution-container').css({'right':'10%','top':'7px'
					,'background': "url('img/iconpic/dev-distribution-bg.png')",'background-size':'100% 100%'});
				// $('.dev-distribution-map').css('width',$(window).width()*0.59895);
				// $('.dev-distribution-map').css('height',$(window).height()*0.67145);
				$('.dev-distribution-map').css('width',$(window).width()*0.59895);
				$('.dev-distribution-map').css('height',$(window).height()*0.81568);
				$('.dev-distribution-container').css('width',$(window).width()*0.61979);
				$('.dev-distribution-container').css('height',$(window).height()*0.89527);
				if($(window).width()=="1400"||$(window).width()=="1366"){
					$('.dev-distribution-map').css('margin-top','-19px');
				}else{
					$('.dev-distribution-map').css('margin-top','-10px');
				}
				
				$('#pic-scale-box').css('display','none');
				$('#pic-scale').css({'background':'url("img/iconpic/eig-enlarge.png")no-repeat','background-size':'25% 100%'});
				$('#pic-scale').text('放大');
				setTimeout(() => {
					map.centerAndZoom(new BMap.Point(111.952789,31.742493), 6);
				}, 100);
				$('#pic-scale').css('top','-2px');
				$('.dev-distribution-type').css('top','-2px');
				flag=true;
			}
		});
	/*add by guoshuai end 2018-9-27*/
	/* 设置echarts主题*/
	// echarts.init(dom, 'cbcp-theme');
	/* 初始化地图*/
	let map = new BMap.Map('bmap', {
		enableMapClick : false
	}); // 禁用显示标注详细信息
	map.centerAndZoom(new BMap.Point(114.291454, 30.544862), 12);
	/* 添加地图类型控件*/
	map.addControl(new BMap.MapTypeControl({
		mapTypes : [ BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP, BMAP_HYBRID_MAP ]
	}));
	/* 开启鼠标滚轮缩放*/
	map.enableScrollWheelZoom(true);
	/* 禁止双击放大*/
	map.disableDoubleClickZoom();
	/* 开启键盘控制功能*/
	map.enableKeyboard();
	/* zoom缩小，触发显示点聚合*/
	/* 地图缩放与移动控件*/
	let mapNavigation = new BMap.NavigationControl({
		offset : new BMap.Size(5, 5)
	});
	map.addControl(mapNavigation);
	/* 地图路况信息控件*/
	let trafficCtrl = new BMapLib.TrafficControl({
		showPanel : false
	});
	map.addControl(trafficCtrl);
	trafficCtrl.setAnchor(BMAP_ANCHOR_BOTTOM_RIGHT);
	/* 距离比例尺*/
	let mapScale = new BMap.ScaleControl({
		anchor : BMAP_ANCHOR_BOTTOM_LEFT,
	// offset : new BMap.Size(65, 120)
	});
	map.addControl(mapScale);
	/* 窗口自适应*/
	function autoWidth() {
		/*delete by guoshuai start 2018-9-27
		$('.main-page-content').css('width', $(window).width() - 50);
		$('.main-page-content').css('height', $(window).height() - 130);
		$('.new-message-container').css('height',
				$('.main-page-content').height() - 500); // 消息面板高度自适应
		$('.new-message-item-container').css('height',
				$('.new-message-container').height() - 60) // 消息内容高度自适应
		$('.case-statistics-echarts').css('width',
				$('.main-page-content').width() - 570); // 作战次数统计echarts自适应
		$('.case-distribution-echarts').css('width',
				$('.main-page-content').width() - 700); // 作战分布统计echarts自适应 
		$('.case-distribution-echarts').css('height',
				$('.main-page-content').height() - 250); // 作战分布统计echarts自适应 
		$('.dev-usingrate-container').css('height',
				$('.main-page-content').height() - 340); // 设备使用率高度自适应 
		$('.dev-usingrate-container').css('width',
				($('.main-page-content').width() - 20) * 0.38); // 设备使用率宽度自适应 
		$('.dev-usingrate-echarts').css('height',
				$('.dev-usingrate-container').height() - 50); // 设备使用率echarts高度自适应 
		$('.dev-distribution-container').css('width',
				($('.main-page-content').width() - 20) * 0.62 - 20); // 设备分布宽度自适应
		$('.dev-distribution-container').css('height',
				$('.main-page-content').height() - 20); // 设备分布高度自适应
		$('.dev-distribution-map').css('height',
				$('.dev-distribution-container').height() - 70); // 设备分布地图高度自适应
		// map.centerAndZoom(new BMap.Point(114.291454, 30.544862), 6);
		delete by guoshuai end 2018-9-27*/
		/*add by guoshuai start 2018-9-27*/
		$('.new-message-item-container').css('height',
				$('.new-message-container').height() - 60); // 消息内容高度自适应
		$('.case-statistics-echarts').css({'width':'58.18%'});//折线图宽
		$('.case-distribution-echarts').css({'width':'58%','height':'64%'});//中国地图包框宽高
		//给设备使用率echarts固定宽高
		$('.dev-usingrate-container').css('width','36.90%');
		$('.dev-usingrate-container').css('height','52.13%');
		$('.dev-usingrate-echarts').css('width',
				($('.dev-usingrate-container').width() ) * 0.8116);
		// let dueh =$('.main-page-content').height()*0.5213;
		// $('.dev-usingrate-echarts').css('height',
		// 		dueh * 0.6818);
		$('.dev-usingrate-echarts').css('height',
				$('.dev-usingrate-container').height() - 150);	
		//给设备分布地图固定宽高
		//$('.dev-distribution-container').css({'width':'63.64%','height':'87.1%','right':'158','top':'70'});
		// $('.dev-distribution-container').css('width',$(window).width()*0.61979);
		// $('.dev-distribution-container').css('height',$(window).height()*0.89527);
		//$('.dev-distribution-map').css({'width':'96.64%','height':'87.66%'});
		// $('.dev-distribution-map').css('width',$('.dev-distribution-container').width()*0.9664);
		// $('.dev-distribution-map').css('height',$('.dev-distribution-container').height()*0.8766);
		if($('#pic-scale-box').css('display')=='block'){
			$('.dev-distribution-container').css('width',$(window).width()*0.92552);
			$('.dev-distribution-container').css('height',$(window).height()*0.99383);
			$('.dev-distribution-map').css('width',$('.dev-distribution-container').width()*0.9664);
			$('.dev-distribution-map').css('height',$('.dev-distribution-container').height()*0.8766);
			$('#pic-scale-box').css('width',$('.dev-distribution-map').width());	
		}else{
			$('.dev-distribution-map').css('width',$(window).width()*0.59895);
			$('.dev-distribution-map').css('height',$(window).height()*0.81568);
			$('.dev-distribution-container').css('width',$(window).width()*0.61979);
			$('.dev-distribution-container').css('height',$(window).height()*0.89527);
		}
		
		
		/*add by guoshuai end 2018-9-27*/
	}
	autoWidth();
	window.addEventListener('resize', function() {
		autoWidth();
	});
	/*
	new BMap.LocalCity().get((result) => {
	    map.setCenter(result.name);
	});*/
	/*deletet by guoshuai start 2018-10-8
	setTimeout(() => {
		map.centerAndZoom(new BMap.Point(108.952789,32.742493), 6);
	}, 600);
	deletet by guoshuai end 2018-10-8*/
	/*add by guoshuai start 2018-10-8*/
	setTimeout(() => {
		map.centerAndZoom(new BMap.Point(108.952789,32.042493), 6);
	},600);
	/*add by guoshuai end 2018-10-8*/
</script>
<!-- bundle.js -->
<script type="text/javascript"
	src="js/src/app/page/home/bundle.js?v=2.1.891116"></script>
</html>