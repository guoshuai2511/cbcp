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
<meta name="viewport" content="initial-scale=1.0, dev-scalable=no" />
<link rel="icon" type="image/ico" href="img/jiantong_logo.ico?v=2.0.4">
<title>设备管理</title>
<script src="js/lib/jquery/jquery-3.2.1.min.js"></script>
<link rel="stylesheet" href="js/lib/bootstrarp/css/bootstrap.min.css">
<script src="js/lib/bootstrarp/js/bootstrap.min.js"></script>
<!--百度地图key-->
<script type="text/javascript"
	src="https://api.map.baidu.com/api?v=2.0&ak=PgNHPqzIRsGR1yhs8nkoCtXOZLbwmawp"></script>
<!-- 日期选择器 -->
<script language="javascript" type="text/javascript"
	src="js/lib/My97DatePicker/WdatePicker.js?v=2.1.890"></script>
<!--自定义图标-->
<link rel="stylesheet" href="js/lib/iconfont/iconfont.css">
<!--MDUI-->
<link rel="stylesheet" href="js/lib/mdui-v0.4.0/css/mdui.min.css">
<script src="js/lib/mdui-v0.4.0/js/mdui.min.js"></script>
<!-- 树状图 -->
<link rel="stylesheet"
	href="js/lib/zTree_v3/css/bootstrapStyle/bootstrapStyle_CBCP.css">
<script src="js/lib/zTree_v3/js/jquery.ztree.all.min.js"></script>
<!-- 时间格式化 -->
<script src="js/lib/TimeFormat/timeFormat.js"></script>
<!-- 分页插件-->
<script src="js/lib/pagination/jquery.pagination.js?v=2.1.892223"></script>
<link rel="stylesheet" href="js/lib/pagination/pagination.css?v=2.1.892224">
<link href="css/common.css?v=2.1.10" rel="stylesheet">
<link href="css/table/table-view.css?v=2.1.10" rel="stylesheet">
<style type="text/css">
.mdui-checkbox-icon {
	border-color: #BBBBBB;
}

.mdui-checkbox-icon:after {
	/*background: #00baff;*/
	/*背景颜色 #00baff*/
	border-color: #BBBBBB;
	/*边框颜色 #BBBBBB*/
}

.mdui-theme-accent-pink .mdui-checkbox input[type=checkbox]:checked+.mdui-checkbox-icon:after
	{
	background: #00baff;
	border-color: #BBBBBB;
}

.mdui-checkbox input[type=checkbox]:checked+.mdui-checkbox-icon:after {
	background: #00baff;
	border-color: #BBBBBB;
}

.modal-backdrop {
	display: none;
}

.mdui-checkbox-icon:after {
	border-color: #bbb;
}

.mdui-checkbox input[type=checkbox]:checked+.mdui-checkbox-icon:after {
	background-color: #00baff;
	border-color: #00baff;
}

.modal-input {
	width: 490px;
    margin-bottom: 20px;
    margin-left: 20px;
    left: 112px;
    position: relative;
}

.modal-input-title {
	width: 100px;
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
	background: #011731;
	color: #dedede;
	border:1px solid #174275;
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

.modal-header{
	width: 95%;
    margin-left: 24px;
    border-bottom: 1px solid #23b5e8;
}

.modal-title {
	color: rgb(35, 220, 255);
}

.modal-content {
	top: 50px;
	background:#08264a;
	color: #dedede;
}

.modal-footer {
	border-top: 1px solid #08264a;
}

.dept-input-container {
	width: 200px;
	height: 30px;
	position: relative;
	float: left;
	padding-left: 10px;
	background: #011731;
	border: 1px solid #174275;
	border-radius: 3px;
	line-height: 28px;
	font-size: 12px;
	cursor: pointer;
}

.role-input-container {
	width: auto;
	min-width: 200px;
	max-width: 300px;
	height: auto;
	min-height: 30px;
	position: relative;
	float: left;
	padding-left: 10px;
	background: rgb(40, 40, 40);
	border: 1px solid #ccc;
	border-radius: 3px;
	overflow: hidden;
	cursor: pointer;
}

.dept-modal-area {
	/* height: 500px; */
	position: relative;
	float: left;
	margin-left: 1.5%;
	margin-right: 3%;
}

.dept-modal-area-one {
	/* width: 46%; */
	width:98%;
}

.dept-modal-area-2 {
	width:98%;
}

.dept-selector-modal-title {
	height: 30px;
	position: relative;
	line-height: 30px;
	color:#23b5e8;
}

.dept-selector-modal-container {
	width: 99%;
	height: 470px;
	/* position: absolute; */
	bottom: 0;
	border: 1px solid #174275;
	border-radius: 5px;
	overflow: auto;
}

.each-divinner-item {
	position: relative;
	float: left;
	padding: 3px 5px 3px 5px;
	margin: 3px 6px 2px 3px;
	color: #dedede;
	background: #011731;
	cursor: pointer;
}

.item-close {
	font-size: 12px;
}

.role-selector-each-items {
	margin-left: 20px;
}

.role-selector-each-items-words {
	color: #dedede;
	font-weight: 100;
	margin-left: 25px;
}

.dev-info-table {
	width: 500px;
	margin-left: 33px;
	line-height: 35px;
}

.dev-info-table tr td {
	border: 1px solid #aaa;
}

.dev-info-name {
	text-align: center;
}

.dev-info-value {
	padding-left: 15px;
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
.search-simple-rule {
    border-left: 1px solid #03172f;
    border-right: 1px solid #0e3463;
    height: 52px;
    margin-top: 14px;
    float: left;
}
/* .table-view-search-area{
	width: 81%;
}
.table-view-search-btn {
    width: 18%;
} */
@media screen and (max-width: 1440px){
	.tbody-tr {
    	font-size: 13px;
	}
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
.mdui-checkbox-icon{
	width: 12px;
    height: 12px;
    left:28%;
    border: 1px solid #fff;
    border-radius: 0px;
    top:15px;
}
.mdui-checkbox-icon:before{
	left: -3px;
	top:-1px;
    width: 7px;
    height: 12px;
}
.mdui-checkbox-icon:after{
    top: -1px;
    left: -1px;
    width: 12px;
    height: 12px;
    border: 1px solid #fff;
    border-radius: 0px;
}
.delete-user-um{
	border-right:none;
}
/* .confirm{
	display: block;
    margin-left: 18%;
    float: left;
    width: 140px;
    border-radius: 16px;
    background-color: #23b5e8;
    outline:none !important;
}

.cancel{
	display: block;
    margin-left: 17%;
    float: left;
    width: 140px;
    border-radius: 16px;
    outline:none !important;
} */
.btn:focus{
	outline:none !important;
}
.btn-primary:hover{
	color:#fff;
	background-color: #23b5e8;
}
.btn-default:hover{
	background-color:#fff;
}
/* .modal-footer .btn+.btn{
	margin-left: 21%;
} */

.update-user-um {
   border-left: none;
}
.dept-selector-modal-container-selected{
	height:36px;
	background:#011731;
}
.dept-selector-modal-container-selected::-webkit-scrollbar { /*滚动条整体样式*/
	width: 8px; 
	height: 10px;
}

.dept-selector-modal-container-selected::-webkit-scrollbar-arrow { /*滚动条整体样式*/
	color:#f2f2f3;
}

.dept-selector-modal-container-selected::-webkit-scrollbar-button{/*滚动条两端的按钮，可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果（位置2）*/
    height: 10px;
    width:8px;
}

.dept-selector-modal-container-selected::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
	border-radius: 4px;
	-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	background: #17c1f4;
}

.dept-selector-modal-container-selected::-webkit-scrollbar-track { /*滚动条里面轨道*/
	-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	border-radius: 0;
}
.selector-modal-box{
	overflow-y: scroll;
}
.selector-modal-box::-webkit-scrollbar { /*滚动条整体样式*/
	width: 8px; 
	height: 10px;
}

.selector-modal-box::-webkit-scrollbar-arrow { /*滚动条整体样式*/
	color:#f2f2f3;
}

.selector-modal-box::-webkit-scrollbar-button{/*滚动条两端的按钮，可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果（位置2）*/
    height: 10px;
    width:8px;
}

.selector-modal-box::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
	border-radius: 4px;
	-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	background: #17c1f4;
}

.selector-modal-box::-webkit-scrollbar-track { /*滚动条里面轨道*/
	-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	border-radius: 0;
	background:#08264a;
} 
.dept-selector-ensure{
	display: block;
    margin-left: 21%;
    float: left;
    width: 140px;
    border-radius: 16px;
    background-color: #23b5e8;
    margin-top:8px;
}
.dept-selector-cancel{
    margin-left: 28%;
    display: block;
    width: 140px;
    float: left;
    border-radius: 16px;
    margin-top:8px;
}
.modal-body{
	overflow: hidden;
}
.dev-position-map{
	width: 100%;
	height: 500px;
}
#disCode-input:disabled {
	background: rgb(70, 70, 70) !important;
}
#query-time-start-timeDev::-webkit-input-placeholder {
	/* placeholder颜色  */
		color: #fff;
		/* placeholder字体大小  */
	font-size: 13px;
		/* placeholder位置  */
	/* text-align: right; */
}
.view-dev{
	background: url('img/iconpic/GPSIcon.png') no-repeat;
	width: 24px;
    height: 24px;
    border: none;
}
#query-id{
    color:#fff;
}
.vehicle-select-item{
	width: 100%;
    padding-left:10px;
    line-height: 30px;
	height: 30px;
	cursor:pointer;
	color: #fff;
}
.vehicle-select-item:hover{
	background:rgba(255,255,255,0.2);
}
#dev-query-selector-container::-webkit-scrollbar { /*滚动条整体样式*/
	width: 8px; 
	height: 10px;
}

#dev-query-selector-container::-webkit-scrollbar-arrow { /*滚动条整体样式*/
	color:#f2f2f3;
}

#dev-query-selector-container::-webkit-scrollbar-button{/*滚动条两端的按钮，可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果（位置2）*/
    height: 10px;
    width:8px;
}

#dev-query-selector-container::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
	border-radius: 4px;
	-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	background: #17c1f4;
}

#dev-query-selector-container::-webkit-scrollbar-track { /*滚动条里面轨道*/
	-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	border-radius: 0;
	background:#08264a;
}
.abbreviation{
	white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
</head>
<!--delete by guoshuai start 2018-9-29
<body style="background: rgb(29, 33, 39)">
delete by guoshuai end 2018-9-29-->
<!--add by guoshuai start 2018-9-29-->
<body style="background: url('img/iconpic/bg.png');
	background-size: 100% 100%;background-color: rgb(29, 33, 39);">
<!--add by guoshuai end 2018-9-29-->
	<%-- 添加头部导航栏 --%>
	<header class="top-header" id="top-header"></header>
	<div class="left-menu"></div>
	<div class="guide-frame">
		<!--delete by guoshuai start 2018-9-29
		<div class="guide-title" style="cursor: pointer;">设备管理</div>
		<div class="guide-title-line"></div>
		<ul class="nav nav-tabs guide-nav"></ul>
		delete by guoshuai end 2018-9-29-->
		<!--内容头部-->
		<!--
		<div class="table-view-container">
		-->
		<!--add by guoshuai end 2018-9-29-->
		<div class="guide-title" style="margin-left: -22px">设备管理</div>
		<div class="table-view-container" style="width: 96.35%;">
			<div id="table-view-container-box" style="background: #07203e; height: 85px;"> 
		<!--add by guoshuai end 2018-9-29-->
				<div class="table-view-search-area">
					<!-- 账号 -->
					<div
						class="input-group input-group-sm search-item search-item-width-sm">
						<span class="input-group-addon input-group-title" id="query-id">设备名称</span>
						<input type="text" class="form-control input-background"
							id="name-value" aria-describedby="basic-addon3">
					</div>

					<!-- 所属机构 -->
					<div
						class="input-group input-group-sm search-item search-item-width-sm">
						<span class="input-group-addon input-group-title"
							id="query-phone-num">所属机构</span>
						<div class="btn-group">
							<button type="button" id="dept-selector-button"
								style="width: 220px; text-align: left; /* delete by guoishuai border: 1px solid rgb(204, 204, 204); background: rgb(60, 60, 60); end*/border: none;background: #011731; color: rgb(204, 204, 204);"
								class="btn btn-default btn-sm dropdown-toggle"
								data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								<span id="dept-query-selector-input" data-dept-id=""
									style="color: rgb(204, 204, 204);">&nbsp;</span> <span
									class="caret" style="float: right; margin-top: 6px;"></span>
							</button>
							<span id="dept-query-selector-remove"
								class="glyphicon glyphicon-remove-circle" aria-hidden="true"
								style="display: none; position: absolute; top: 7px; right: 30px; color: rgb(204, 204, 204); z-index: 100; cursor: pointer;"></span>
							<ul class="dropdown-menu" style="width: 220px;">
								<div id="dept-query-selector-container"
									style="width: 218px; min-height: 50px; max-height: 350px; height: auto; background: #fff; border-radius: 3px; overflow-x: auto; overflow-y: auto; z-index: 1000;">
									<div class="ztree" id="dept-query-selector-tree"></div>
								</div>
							</ul>
						</div>
					</div>
				</div>
				<div class="search-simple-rule"></div>
				<!-- 搜索 -->
				<div class="table-view-search-btn">
					<div class="guide-search-btn mdui-ripple">
						<!--delete by guoshuai start 2018-9-29
						<span>搜索</span>
						delete by guoshuai end 2018-9-29-->
					</div>
				</div>
			<!--add by guoshuai start 2018-9-29-->
			</div>
			<!--add by guoshuai end 2018-9-29-->
			<!-- 正文 -->
			<div class="table-view-data-area auto-min-height">
				<!-- 表格 -->
				<table class="view-data-table">
					<thead>
						<tr>
							<th colspan="13">
								<div id="table-thead"
									style="height: 35px; line-height: 35px; margin-left:10px;">
									<!-- 新增设备按钮 -->
									<button type="button" class="table-th-btn btn-green"
										id="add-dev-btn">
										<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>&nbsp;新增 
										
									</button>
									<!-- 删除设备按钮 -->
									<button type="button" class="table-th-btn btn-red"style="margin-top:4px;"
										id="del-dev-btn">
										<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>&nbsp;删除	
									</button>
								</div>
							</th>
						</tr>
					</thead>
					<tbody id="table-tbody">
						<!-- <tr class="tbody-tr">
		                    <td style="width: 50px;text-align: center;"><label class="mdui-checkbox"><input type="checkbox" class="checkbox-all"/><i class="mdui-checkbox-icon"></i></label></td>
		                    <td>设备编号</td>
		                    <td>所属机构</td>
		                    <td style="width: 123px; text-align: center;">操作</td>
                		</tr> -->
					</tbody>
				</table>
			</div>

			<!-- 底部分页 -->
			<!--delete by guoshuai start 2018-9-29-->
			<div class="page-selector">
					<div class="item-count-selector">
						每页：
						<div class="btn-group dropup">
							<button type="button" style="background: #08264a; color: #fff;border:1px solid #174275;"
								class="btn btn-default btn-sm dropdown-toggle"
								data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								<span class="show-item-num" style="display: block; float: left;">20条</span> <span class="caret"style="
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
			<!--delete by guoshuai end 2018-9-29-->
			<!-- add by guoshuai start 2018-9-29-->
			<!--
			<div class="page-selector" style="top:-70px;">
					<div class="item-count-selector">
						<div style="margin-left: 50%;position: absolute;top: 20%;left: -3%;">每页：</div>
						
						<div class="btn-group dropup" style="margin-left: 50%;">
							<button type="button" style="background: #08264a; color: #fff;border:1px solid #174275;"
								class="btn btn-default btn-sm dropdown-toggle"
								data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								<span class="show-item-num" style="display: block; float: left;">10条</span> <span class="caret"style="
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
						&nbsp;&nbsp;总共<span id="total-count"></span>条
					</div>
					<div class="m-style pagination M-box3"style="margin-right: 55%;"></div>
			</div>
			-->
			<!-- add by guoshuai end 2018-9-29-->
		</div>
		<!-- Modal查看信息 -->
		<div class="modal fade" id="devinfo-view-modal" data-backdrop="static"
			data-keyboard="false" tabindex="-1" role="dialog"
			aria-labelledby="myModalLabel">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
							<!-- 
							<span aria-hidden="true">&times;</span>
							 -->
							<!--add by guoshuai start 2018-10-15-->
		                    <span aria-hidden="true" class="add-user-close"></span>
		                    <!--add by guoshuai end 2018-10-15-->
						</button>
						<h4 class="modal-title">查看设备信息</h4>
					</div>
					<div class="modal-body" id="dev-info-content"></div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					</div>
				</div>
			</div>
		</div>
		<!-- Modal设备信息 -->
		<div class="modal fade" id="dev-modal" data-backdrop="static"
			data-keyboard="false" tabindex="-1" role="dialog"
			aria-labelledby="myModalLabel">
			<div class="modal-dialog" role="document">
				<div class="modal-content" id="dev-input-modal"></div>
			</div>
		</div>
		<!-- 组织机构选择 -->
		<div class="modal fade bs-example-modal-lg" id="dept-selector-modal"
			data-backdrop="static" data-keyboard="false" tabindex="-1"
			role="dialog" aria-labelledby="myLargeModalLabel">
			<div class="modal-dialog modal-lg" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
							<!--delete by guoshuai start 2018-10-15
		                    <span aria-hidden="true">×</span>
		                    delete by guoshuai end 2018-10-15-->
		                    <!--delete by guoshuai start 2018-10-15-->
		                    <span aria-hidden="true" class="add-user-close"></span>
		                    <!--delete by guoshuai end 2018-10-15-->
						</button>
						<h4 class="modal-title">机构选择</h4>
					</div>
					<div class="modal-body">
					<div style="width: 100%; height: 500px;">
						<div class="dept-modal-area dept-modal-area-one">
							<div class="dept-selector-modal-title">已选机构</div>
							<div class="dept-selector-modal-container dept-selector-modal-container-selected"
								id="dept-selected-area"></div>
						</div>
						<div class="dept-modal-area dept-modal-area-2">
							<div class="dept-selector-modal-title">机构列表</div>
							<div class="dept-selector-modal-container ztree selector-modal-box"
								id="dept-selector-tree"></div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" data-dismiss="modal"
						id="dept-selector-ensure">确定</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				</div>
				</div>
			</div>
		</div>
		<!--批量删除按钮显示的模态框-->
		<div class="modal fade bs-example-modal-sm" id="alert-modal"
			data-backdrop="static" data-keyboard="false" tabindex="-1"
			role="dialog" aria-labelledby="myModalLabel">
			<div class="modal-dialog modal-sm" role="document">
				<div class="modal-content">
					<div class="modal-header" style="margin-left:8px;">
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
		<!--个别删除模态框-->
		<div class="modal fade bs-example-modal-sm" id="ensure-modal"
			data-backdrop="static" data-keyboard="false" tabindex="-1"
			role="dialog" aria-labelledby="myModalLabel">
			<div class="modal-dialog modal-sm" role="document">
				<div class="modal-content">
					<div class="modal-header" style="margin-left:8px;">
						<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
							<!-- 
							<span aria-hidden="true">&times;</span>
							 -->
							<!--add by guoshuai start 2018-10-15-->
		                    <span aria-hidden="true" class="add-user-close"></span>
		                    <!--add by guoshuai end 2018-10-15-->
						</button>
						<h4 class="modal-title" id="myModalLabel">确认</h4>
					</div>
					<div class="modal-body" id="modal-alert-content"></div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default"
							id="ensure-modal-submit">确定</button>
						<button type="button" class="btn btn-primary" data-dismiss="modal" style="margin-left: 5px;">取消</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- 标注设备位置地图模态框 -->
	<div class="modal fade bs-example-modal-lg" id="dev-position-modal"
	data-backdrop="static" data-keyboard="false" tabindex="-1"
	role="dialog" aria-labelledby="myLargeModalLabel">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true" class="add-user-close"></span>
					</button>
					<h4 class="modal-title">设备上报位置</h4>
				</div>
				<div class="modal-body">
					<div class="dev-position-map" id="devMap"></div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
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
	//const isAdmin = 1;
</script>
<script type="text/javascript"
	src="js/src/app/page/devManage/declaration.js?v=2.1.892223"></script>
<!-- bundle.js -->
<script type="text/javascript"
	src="js/src/app/page/devManage/bundle.js?v=2.1.892227"></script>
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