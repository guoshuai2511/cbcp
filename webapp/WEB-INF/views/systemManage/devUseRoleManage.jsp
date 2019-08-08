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
<title>设备角色管理</title>
<script src="js/lib/jquery/jquery-3.2.1.min.js"></script>
<link rel="stylesheet" href="js/lib/bootstrarp/css/bootstrap.min.css">
<script src="js/lib/bootstrarp/js/bootstrap.min.js"></script>
<!--自定义图标-->
<link rel="stylesheet" href="js/lib/iconfont/iconfont.css">
<!-- 日期选择器 -->
<script language="javascript" type="text/javascript"
	src="js/lib/My97DatePicker/WdatePicker.js?v=2.1.890"></script>
<!--MDUI-->
<link rel="stylesheet" href="js/lib/mdui-v0.4.0/css/mdui.min.css">
<script src="js/lib/mdui-v0.4.0/js/mdui.min.js"></script>
<!-- 城市选择
<link rel="stylesheet" href="js/lib/ChinaCity-selector/css/pick-pcc.min.1.0.1.css"/>
<script type="text/javascript" src="js/lib/ChinaCity-selector/js/pick-pcc.min.1.0.1.js"></script> -->
<!-- 时间格式化 -->
<script src="js/lib/TimeFormat/timeFormat.js"></script>
<!-- 分页插件-->
<script src="js/lib/pagination/jquery.pagination.js?v=2.1.892223"></script>
<link rel="stylesheet" href="js/lib/pagination/pagination.css?v=2.1.892223">
<!-- 自定义css样式 -->
<link href="css/common.css?v=2.0.7" rel="stylesheet">
<link href="css/table/table-view.css" rel="stylesheet">
<style>
.modal-header {
	border-bottom: 1px solid rgb(100, 100, 100);
}

.modal-title {
	color: rgb(35, 220, 255);
}

.modal-content {
	top: 80px;
	background: rgb(51, 51, 51);
	color: #dedede;
}

.modal-footer {
	border-top: 1px solid rgb(100, 100, 100);
}
/*滚动条样式*/
textarea::-webkit-scrollbar { /*滚动条整体样式*/
	width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
	height: 4px;
}

textarea::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
	border-radius: 3px;
	-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	background: rgba(255, 255, 255, 0.4);
}

textarea::-webkit-scrollbar-track { /*滚动条里面轨道*/
	-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	border-radius: 0;
	background: rgba(255, 255, 255, 0.1);
}

/* MDUI*/
.mdui-radio-icon {
	border-color: #dedede !important;
}

.mdui-radio input[type=radio]:checked+.mdui-radio-icon {
	border-color: #00baff !important;
}

.mdui-radio input[type=radio]:disabled:checked+.mdui-radio-icon:before {
	border-color: #00baff !important;
	background-color: #00baff !important;
}

.mdui-radio input[type=radio]:disabled+.mdui-radio-icon {
	border-color: #bbb !important;
}

.mdui-radio-icon:before {
	background: #00baff !important;
}

.mdui-checkbox-icon:after {
	border-color: #bbb !important;
}

.mdui-checkbox input[type=checkbox]:checked+.mdui-checkbox-icon:after {
	border-color: #00baff !important;
	background-color: #00baff !important;
}

.mdui-switch-icon {
	background-color: rgb(100, 100, 100);
}

.mdui-switch input[type=checkbox]:checked+.mdui-switch-icon {
	background-color: rgba(33, 150, 243, 0.5) !important;
}

.mdui-switch input[type=checkbox]:checked+.mdui-switch-icon:before {
	background-color: #00baff !important;
}
/* MDUI*/
.table-in-checkbox {
	margin-left: 10px;
}

.secrecy-selector:hover {
	background: rgba(140, 140, 140, 0.4) !important;
}

.institutions-input-container {
	width: 200px;
	max-width: 300px;
	min-height: 30px;
	background: rgb(40, 40, 40);
	border: 1px solid rgb(150, 150, 150);
	border-radius: 3px;
	cursor: pointer;
	z-index: -10;
	overflow: hidden;
}

.add-role-table-btn {
	margin-top: 30px;
	position: relative;
	color: #fff !important;
	margin-left: 2.05%;
	z-index: 100;
}

.th-title {
	padding-left: 12px;
	padding-top: 10px;
	padding-bottom: 10px;
}

.add-role-area {
	position: relative;
	margin-left: 2.05%;
	margin-top: 5px;
}

.add-role-each-container {
	width: 100%;
	height: auto;
	min-height: 400px;
	position: relative;
	padding-bottom: 50px;
	border: 1px solid rgb(110, 110, 110);
	border-radius: 0 5px 5px 5px;
	overflow: hidden;
}

.add-role-each-container .in-title {
	position: absolute;
	left: 60px;
	top: 30px;
	font-size: 15px;
	color: #dedede;
}

.add-role-each-container .in-selector {
	position: relative;
	margin-left: 130px;
	margin-top: 24px;
	font-size: 15px;
	color: #dedede;
}

.add-role-each-container .in-content {
	position: relative;
	left: 60px;
	top: 50px;
}
/*
.institutions-modal-area {
	width: 46%;
	height: 500px;
	position: relative;
	float: left;
	margin-left: 1%;
	margin-right: 3%;
}

.institutions-title {
	height: 30px;
	position: relative;
	line-height: 30px;
}

.institutions-container {
	width: 100%;
	height: 470px;
	position: absolute;
	bottom: 0;
	border: 1px solid rgb(100, 100, 100);
	border-radius: 5px;
	overflow: auto;
}
*/
.selector-label-item {
	position: relative;
	float: top;
	color: #fff;
}

.selector-label-item label {
	font-weight: 100;
}

.data-range-selector {
	margin-left: 30px;
}

.precise-data-range {
	position: relative;
	margin-top: 30px;
}

.precise-data-range .p-title {
	font-size: 15px;
	color: #dedede;
	margin-left: 60px;
	line-height: 50px;
}

.precise-data-range .c-title {
	font-size: 15px;
	color: #dedede;
}

.precise-data-value {
	padding-left: 180px;
	padding-right: 50px;
}

.value-container {
	width: 100%;
	height: auto;
	min-height: 100px;
	max-height: 300px;
	border: 1px solid rgb(100, 100, 100);
	overflow-y: auto;
}

/*滚动条样式*/
.value-container::-webkit-scrollbar { /*滚动条整体样式*/
	width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
	height: 4px;
}

.value-container::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
	border-radius: 3px;
	-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	background: rgba(255, 255, 255, 0.4);
}

.value-container::-webkit-scrollbar-track { /*滚动条里面轨道*/
	-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	border-radius: 0;
	background: rgba(255, 255, 255, 0.1);
}

.precise-data-in-table {
	width: 100%;
	margin-top: 15px;
	color: #dedede;
	border-top: 1px solid rgb(100, 100, 100) !important;
	border-right: 1px solid rgb(100, 100, 100) !important;
	border-bottom: 1px solid rgb(100, 100, 100) !important;
}

.precise-data-in-table thead th {
	background: linear-gradient(rgb(40, 40, 40), rgb(29, 33, 39));
	border-top: 1px solid rgb(100, 100, 100) !important;
	border-bottom: 1px solid rgb(100, 100, 100) !important;
	border-left: 1px solid rgb(100, 100, 100) !important;
}

.precise-data-in-table tbody {
	border-left: 1px solid rgb(100, 100, 100) !important;
}

.each-divinner-item {
	position: relative;
	float: left;
	padding: 3px 5px 3px 5px;
	margin: 3px 6px 2px 3px;
	color: #fff;
	background: rgb(0, 97, 160);
	cursor: default;
}

.each-divinner-item .item-close {
	font-size: 12px;
	margin-left: 7px;
	margin-top: -2px;
	cursor: pointer;
}

.add-role-submit-btn {
	position: relative;
	margin-top: 20px;
	left: 50%;
	margin-left: -44px;
	color: #fff !important;
}

/* input输入框*/
.modal-input {
	width: 800px;
	margin-bottom: 20px;
	margin-top: 30px;
}

.modal-input-title {
	width: 80px;
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
	border-color: rgb(150, 150, 150);
	background: rgb(40, 40, 40) !important;
	color: #dedede;
}

.input-check {
	float: left;
	line-height: 30px;
	margin-left: 10px;
	margin-right: 10px;
}
/* input输入框*/
.dropdown-menu-selector {
	cursor: pointer;
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

.view-data-table-in-modal {
	width: 96%;
	position: relative;
	margin-top: 15px;
	left: 2%;
	color: #dedede;
	border: 1px solid rgb(100, 100, 100) !important;
}

.inner-page-selector {
	width: 96%;
	margin-left: 2%;
	margin-top: 30px;
}

.no-data-tablesarch-inner {
	display: none;
	width: 320px;
	height: 70px;
	margin-left: calc(50% - 170px);
	margin-top: 120px;
	margin-bottom: 110px;
	font-size: 25px;
	color: rgb(14, 144, 210);
	text-align: center;
	line-height: 70px;
}

.no-data-icon-inner {
	width: 70px;
	height: 70px;
}

.no-data-word-inner {
	margin-left: 10px;
}

.case-target-addtel {
	width: 250px;
	height: 30px;
	position: relative;
}

.add-val-btn {
	color: #fff !important;
	margin-left: 15px;
}

.mutli-selector-container {
	margin-bottom: 20px;
	margin-top: 30px;
}

.mutli-selector-title {
	width: 80px;
	height: 32px;
	position: absolute;
	padding: 5px 10px;
	color: #dedede;
	font-size: 14px;
	text-align: right;
}

.mutli-selector-value {
	position: relative;
	margin-left: 80px;
}

.mutli-selector-items {
	height: auto;
	overflow: hidden;
}

.mutli-selector-input {
	
}
</style>
</head>
<body style="background: rgb(29, 33, 39)">
	<header class="top-header"> <!-- <span class="header-current-weather header-info-txt"></span> <span
		class="header-current-time header-info-txt"></span> --></header>
	<div class="left-menu"></div>

	<div class="guide-frame">
		<div class="guide-title">
			设备使用角色管理<small id="add-role-small-text" class="title-small-text"
				style="display: none;">&nbsp;&nbsp;&gt;新增角色</small><small
				id="update-role-small-text" class="title-small-text"
				style="display: none;">&nbsp;&nbsp;&gt;修改角色</small> <small
				id="view-role-small-text" class="title-small-text"
				style="display: none;"></small>
		</div>
		<div class="guide-title-line"></div>
		<ul class="nav nav-tabs guide-nav">
		</ul>
		<div class="table-view-container" id="role-table-list"
			style="display: block;">
			<button id="add-role-btn"
				class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-blue add-role-table-btn">新增角色</button>
			<!-- 正文 -->
			<div class="table-view-data-area auto-min-height"
				style="margin-top: -20px;">
				<!-- 表格 -->
				<table class="view-data-table">
					<thead>
						<tr>
							<th colspan="11"><div class="th-title">角色列表</div></th>
						</tr>
					</thead>
					<tbody id="table-tbody">
					</tbody>
				</table>
			</div>
			<!-- 底部分页 -->
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
		</div>
		<div class="table-view-container" id="add-role-area"
			style="display: none;"></div>
	</div>


	<!-- Modal确认框 -->
	<div class="modal fade bs-example-modal-sm" id="ensure-modal"
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
				<div class="modal-body" id="modal-alert-content"></div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default"
						id="ensure-modal-submit" data-dismiss="modal">确定</button>
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
					<button type="button" class="btn btn-primary" data-dismiss="modal"
						id="alert-modal-button">确定</button>
				</div>
			</div>
		</div>
	</div>

	<div class="submit-loading">
		<div class="loading-area">
			<img class="loading-gif" src="img/loading.gif"> <span
				class="loading-word">正在提交...</span>
		</div>
	</div>

</body>
<script type="text/javascript">
	const username = "${sessionScope.user.username}";
	const menuList = <%=session.getAttribute("menuPerms")%>;
	console.log(menuList);
</script>
<script type="text/javascript"
	src="js/src/app/page/devUseRoleManage/declaration.js?v=2.1.891112"></script>
<!-- bundle.js-->
<script type="text/javascript"
	src="js/src/app/page/devUseRoleManage/bundle.js?v=2.1.891113"></script>
<script type="text/javascript"
	src="js/src/app/common/script/autosize.js?v=2.1.892223"></script>
<script type="text/javascript">
	function autoSize() {
		$('.auto-min-height').css('min-height', $(window).height() - $('.table-view-search-area').height() - 350);
	}
	autoSize();
	window.addEventListener('resize',() => autoSize(),false);
</script>
</html>