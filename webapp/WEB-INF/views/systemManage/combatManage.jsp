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
<title>作战筛查</title>
<!--jquery-->
<script src="js/lib/jquery/jquery-3.2.1.min.js"></script>
<link rel="stylesheet"
	href="js/lib/jquery/jquery-ui-1.12.1/jquery-ui.min.css">
<script src="js/lib/jquery/jquery-ui-1.12.1/jquery-ui.min.js"></script>
<!--bootstrarp-->
<link rel="stylesheet" href="js/lib/bootstrarp/css/bootstrap.min.css">
<script src="js/lib/bootstrarp/js/bootstrap.min.js"></script>
<!--自定义图标-->
<link rel="stylesheet" type="text/css"
	href="js/lib/iconfont/iconfont.css">
<!--日期选择器-->
<script type="text/javascript"
	src="js/lib/My97DatePicker/WdatePicker.js?v=2.1.890"></script>
<!-- 时间格式化 -->
<script src="js/lib/TimeFormat/timeFormat.js"></script>
<!--div拖动-->
<script src="js/lib/Tdrag20160709/js/Tdrag.js"></script>
<!--MDUI-->
<link rel="stylesheet" href="js/lib/mdui-v0.4.0/css/mdui.min.css">
<script src="js/lib/mdui-v0.4.0/js/mdui.min.js"></script>
<!--分页插件-->
<script src="js/lib/pagination/jquery.pagination.js?v=2.1.892223"></script>
<link rel="stylesheet" href="js/lib/pagination/pagination.css?v=2.1.892224">
<!--自定义css-->
<link href="css/common.css?v=2.1.10" rel="stylesheet">
<link href="css/cover.css?v=2.1.5" rel="stylesheet">
<!-- 表格排版样式 -->
<link rel="stylesheet" href="css/table/table-view.css?v=2.1.11">
<style>
.myCosButton:hover {
	color: #fff;
}

/*滚动条样式*/
.tag-list-dropdown-menu::-webkit-scrollbar { /*滚动条整体样式*/
	width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
	height: 4px;
}

.tag-list-dropdown-menu::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
	border-radius: 3px;
	-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	background: rgba(255, 255, 255, 0.4);
}

.tag-list-dropdown-menu::-webkit-scrollbar-track { /*滚动条里面轨道*/
	-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	border-radius: 0;
	background: rgba(255, 255, 255, 0.1);
}

/* 模态框样式*/
.input-check {
	float: left;
	line-height: 30px;
	margin-left: 10px;
	margin-right: 10px;
}

.modal-input {
	width: 550px;
	margin-bottom: 20px;
	margin-left: 20px;
}

.modal-input-title {
	width: 130px;
	text-align: right;
	color: #dedede;
	background: rgba(0, 0, 0, 0) !important;
	border: none;
	font-size: 13px !important;
}

.modal-input-area {
	width: 200px !important;
}

.modal-input-area:disabled {
	background: rgb(70, 70, 70);
}

.modal-input-background {
	background: rgb(40, 40, 40);
	color: #fff;
	font-size:12px;
}

.input-check {
	float: left;
	line-height: 30px;
	margin-left: 10px;
	margin-right: 10px;
	color: #222222;
}

.input-check-warning {
	color: #ff0000;
}

.submit-loading {
	width: 100%;
	height: 100%;
	position: fixed;
	background: rgba(0, 0, 0, 0);
	z-index: 9999;
	display: none;
}

.loading-area {
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
}

.loading-gif {
	width: 36px;
	height: 36px;
	position: absolute;
	top: 50%;
	left: 10px;
	margin-top: -18px;
}

.loading-word {
	color: #ffffff;
	font-size: 18px;
	margin-left: 60px;
}

.dropdown-menu li {
	cursor: pointer;
}

.is-password-change {
	width: 100px;
	height: 20px;
	position: absolute;
	left: 350px;
	top: 72px;
}

.btn-group-show-value {
	height: 30px;
}

.dropdown-menu-selector {
	color: #dedede !important;
}

.dropdown-menu-selector:hover {
	background: rgba(140, 140, 140, 0.4) !important;
}

.modal-header {
	border-bottom: 1px solid #23b5e8;
	width: 95%;
    margin-left: 20px;
}

.modal-title {
	color: rgb(35, 220, 255);
}

.modal-content {
	top: 50px;
	background:#08264a;
	color: #fff;
}

.modal-footer {
	border-top: 1px solid #08264a;
}
/* -END- 模态框样式*/
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
	background: url("img/icon-lib.png") no-repeat;
	background-position: -240px -30px;
	cursor: pointer;
}

.grade-star-container-intable {
	height: 30px;
}

.grade-star-icon-intable {
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

.grade-star-reset {
	/* delete by guoshuai start 2018-9-29
	position: relative;
	delete by guoshuai end 2018-9-29*/
	/*add by guoshuai start 2018-9-29*/
	position:absolute;
	width:50px;
	/*add by guoshuai end 2018-9-29*/
	float: left;
	margin-left: 7px;
	color: #dedede;
	line-height: 30px;
	cursor: pointer;
}

.grade-star-reset:hover {
	color: rgb(35, 200, 255);
	text-decoration: underline;
}
/*add by guoshuai start 2018-10-8*/
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
#custom-type-input{
	margin-left:10px;
}
.search-item{
	margin-right:30px;
}
@media screen and (max-width: 1511px) {
	.search-item{
		margin-top:9px;
	}
	.input-data-picker-md{
		width:136px !important;
	}
	#custom-type-input{
		margin-left:0px;
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
		margin-top:18px !important;
	}
	.input-data-picker-md{
		width:100px !important;
	}
}
/* .btn-green{
	position:relative;
	left:15px;
}
.btn-blue{
	position:relative;
	left:15px;
} */
@media screen and (max-width: 1366px) {
	/* .btn-green{
		left:19px;
	}
	.btn-blue{
		left:5px;
	} */
}
@media screen and (max-width: 1440px) {
	/* .btn-green{
		left:19px;
	}
	.btn-blue{
		left:19px;
	} */
}

.table-td-used-devs{
	width:97%;
}
.dev-mana{
	width:364px;
}


@media screen and (max-width: 1440px) {
	.table-td-used-devs{
		width:275px;
	}
	.dev-mana{
		width:280px;
	}
	.tbody-tr{
		font-size:13px;
	}
}
@media screen and (max-width: 1366px) {
	.table-td-used-devs{
		width:170px;
	}
	.dev-mana{
		width:180px;
	}
	.search-item{
		margin-right:0px;
	}
}
#table-tbody tr:nth-child(even) {
    background-color: #07203e;
}

#table-tbody tr:nth-child(odd) {
    background-color: rgba(23,193, 244, 0.1);
}

#table-tbody tr:nth-child(1) {
    background-color: rgba(23,193, 244, 0.4);
}
td div{
	margin: 0 auto;
}
.caret{
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
/*模态框input样式*/
#caseName-input,#tag-input,#reviewStatus-button,#remark-input{
	border:1px solid #174275;
	background:#011731;
}
.input-group-title{
	text-align:left;
}
#query-case-name{
	width: 244px;
    margin-left: 8px;	
}

.time-range-selector{
	margin-top: 34px;
}
#query-tag{
	width: 244px;
    margin-left: 6px;
}
@media screen and (max-width: 1536px){
	.search-item{
		margin-top: 24px;
	}
	.time-range-selector{
		margin-top: 28px;
	}
}
/*add by guoshuai end 2018-10-8*/
</style>
</head>

<!--delete by guoshuai start 2018-9-29
<body style="background: rgb(29, 33, 39)">	
delete by guoshuai start 2018-9-29-->
<!--add by guoshuai start 2018-9-29-->
<body style="background: url('img/iconpic/bg.png');
	background-size: 100% 100%; background-color: #000;">
<!--add by guoshuai end 2018-9-29-->
	<header class="top-header" id="top-header"></header>
	<div class="guide-frame">
		<div class="guide-title" style="margin-left: -22px">作战筛查</div>
		<div class="table-view-container" style="width: 96.35%;">
			<div id="table-view-container-box" style="background: #07203e;"> 
		<!--add by guoshuai end 2018-9-29-->
				<div class="table-view-search-area">
					<div class="search-type-simple">
						<!-- 模糊搜索-->
						<div
							class="input-group input-group-sm search-item search-item-width-md">
							<span class="input-group-addon input-group-title">关键词</span> 
							
							<!--add by guoshuai 2018-8-3 start-->
							<input
								type="text" class="form-control input-background"
								placeholder="输入作战成员/城市" id="query-key-word">
							<!--add by guoshuai 2018-8-3 end-->
						</div>
						<!-- 审核状态 -->
						<div
							class="input-group input-group-sm search-item search-item-width-sm">
							<span class="input-group-addon input-group-title">审核状态</span>
							<div class="btn-group">
								<button type="button"
									style="width: 220px; text-align: left; /*delete by guoshuai border: 1px solid rgb(204, 204, 204); background: rgb(60, 60, 60); end*/border: none;background: #011731;color: rgb(204, 204, 204);"
									class="btn btn-default btn-sm dropdown-toggle"
									data-toggle="dropdown" aria-haspopup="true"
									aria-expanded="false">
									<span id="reviewStatus-search-input-out" data-status-type=""
										style="color: #fff;">&nbsp;</span> <span
										class="caret" style="float: right; margin-top: 6px;"></span>
								</button>
								<span id="reviewStatus-remove-out"
									class="glyphicon glyphicon-remove-circle" aria-hidden="true"
									style="display: none; position: absolute; top: 7px; right: 30px; color: rgb(204, 204, 204); z-index: 100; cursor: pointer;"></span>
								<ul class="dropdown-menu" style="width: 220px;">
									<li><a class="reviewStatus-search-selector-out"
										data-status-type="0">未审核</a></li>
									<li><a class="reviewStatus-search-selector-out"
										data-status-type="1">真实</a></li>
									<li><a class="reviewStatus-search-selector-out"
										data-status-type="-1">无效</a></li>
								</ul>
							</div>
						</div>
					</div>
					<div class="search-type-all">
						<!-- 作战名称 -->
						<div
							class="input-group input-group-sm search-item search-item-width-sm">
							<span class="input-group-addon input-group-title">作战名称</span> <input
								type="text" class="form-control input-background"
								id="query-case-name">
						</div>
						<!-- 标签 -->
						<div
							class="input-group input-group-sm search-item search-item-width-sm">
							<span class="input-group-addon input-group-title">标签</span> <input
								type="text" class="form-control input-background" id="query-tag">
						</div>
						<!-- 审核状态 -->
						<div
							class="input-group input-group-sm search-item search-item-width-sm">
							<span class="input-group-addon input-group-title">审核状态</span>
							<div class="btn-group">
								<button type="button"
									style="width: 230px; text-align: left; /*delete by guoshuai border: 1px solid rgb(204, 204, 204); background: rgb(60, 60, 60); end*/border: none;background: #011731;color: rgb(204, 204, 204);margin-left:14px;"
									class="btn btn-default btn-sm dropdown-toggle"
									data-toggle="dropdown" aria-haspopup="true"
									aria-expanded="false">
									<span id="reviewStatus-search-input" data-status-type=""
										style="color: rgb(204, 204, 204);">&nbsp;</span> <span
										class="caret" style="float: right; margin-top: 6px;"></span>
								</button>
								<span id="reviewStatus-remove"
									class="glyphicon glyphicon-remove-circle" aria-hidden="true"
									style="display: none; position: absolute; top: 7px; right: 30px; color: rgb(204, 204, 204); z-index: 100; cursor: pointer;"></span>
								<ul class="dropdown-menu" style="width: 220px;">
									<li><a class="reviewStatus-search-selector"
										data-status-type="0">未审核</a></li>
									<li><a class="reviewStatus-search-selector"
										data-status-type="1">真实</a></li>
									<li><a class="reviewStatus-search-selector"
										data-status-type="-1">无效</a></li>
								</ul>
							</div>
						</div>
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
							<span class="input-group-addon input-group-title">作战城市</span> <input
								type="text" class="form-control input-background"
								id="query-area-code">
						</div>
						<!-- 设备编号-->
						<div
							class="input-group input-group-sm search-item search-item-width-sm">
							<span class="input-group-addon input-group-title">设备编号</span> <input
								type="text" class="form-control input-background"
								id="query-dev-code">
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
						<!--delete by guoshuai start 2018-10-19
						<div
							class="input-group input-group-sm search-item search-item-width-smsm">
							<label class="mdui-checkbox" style="margin-left: 70px;"> <input
								id="query-user-type" type="checkbox" /> <i
								class="mdui-checkbox-icon search-page-checkbox"></i><span
								style="color: rgb(204, 204, 204);">排除游客</span>
							</label>
						</div>
						delete by guoshuai end 2018-10-19-->
						<!-- 排除脏数据
						<div
							class="input-group input-group-sm search-item search-item-width-smsm">
							<label class="mdui-checkbox" style="margin-left: 70px;"> <input
								type="checkbox" /> <i
								class="mdui-checkbox-icon search-page-checkbox"></i><span
								style="color: rgb(204, 204, 204);">排除脏数据</span>
							</label>
						</div>-->
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
									style=" margin-top: 1px; display: none;">
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
				<table class="view-data-table" style="table-layout:fixed;">
					<tbody id="table-tbody">
					</tbody>
				</table>
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

	<div class="submit-loading">
		<div class="loading-area">
			<img class="loading-gif" src="img/loading.gif"> <span
				class="loading-word">正在提交...</span>
		</div>
	</div>

	<!-- 作战新增/审核modal -->
	<div class="modal fade" id="case-operation-modal"
		data-backdrop="static" data-keyboard="false" tabindex="-1"
		role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content" id="case-operation-content"></div>
		</div>
	</div>

	<!-- Modal-Alert提示框 -->
	<div class="modal fade bs-example-modal-sm" id="alert-modal"
		data-backdrop="static" data-keyboard="false" tabindex="-1"
		role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog modal-sm" role="document">
			<div class="modal-content">
				<div class="modal-header" style="margin-left: 8px;">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<!-- 
						<span aria-hidden="true">&times;</span>
						 -->
						<!--add by guoshuai start 2018-10-15-->
		                <span aria-hidden="true" class="add-user-close"></span>
		                <!--add by guoshuai end 2018-10-15-->
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

</body>
<script type="text/javascript">
	const username = `${sessionScope.user.username}`;
	const menuList =
<%=session.getAttribute("menuPerms")%>
	;
</script>
<!-- bundle.js -->
<script src="js/src/app/page/combatManage/declaration.js?v=2.1.13"></script>
<script src="js/src/app/page/combatManage/bundle.js?v=2.1.16"></script>
<script>
	function autoWidth() {
		/*表格td自适应*/
		/*delete by guoshuai start 2018-9-29
		$('.table-td-user-names').css('width',
				($(window).width() - 1350) * 0.45);
		$('.table-td-used-devs')
				.css('width', ($(window).width() - 1350) * 0.55);
		
		$('.view-data-table').css('margin-left',
				-$('.view-data-table').width() / 2);
		delete by guoshuai end 2018-9-29*/
	}
	autoWidth();
	window.onresize = function() {
		autoWidth();
	}
</script>
<script src="js/src/app/common/script/autosize.js?v=2.1.892223"></script>
</html>