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
<title>用户管理</title>
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
<!-- 树状图-->
<link rel="stylesheet"
	href="js/lib/zTree_v3/css/bootstrapStyle/bootstrapStyle_CBCP.css">
<script src="js/lib/zTree_v3/js/jquery.ztree.all.min.js"></script>
<!-- 时间格式化 -->
<script src="js/lib/TimeFormat/timeFormat.js"></script>
<!-- 分页插件-->
<script src="js/lib/pagination/jquery.pagination.js?v=2.1.892223"></script>
<link rel="stylesheet" href="js/lib/pagination/pagination.css?v=2.1.892224">
<link href="css/common.css?v=2.1.10" rel="stylesheet">
<link href="css/table/table-view.css?v=2.1.11" rel="stylesheet">
<style>
.mdui-checkbox-icon:after {
	border-color: #bbb;
}

.mdui-checkbox input[type=checkbox]:checked+.mdui-checkbox-icon:after {
	background-color: #00baff;
	border-color: #00baff;
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
	/* background:#051b36; */
	background:#011731;
}

.modal-input-background {
	background: #08264a;
	color: #dedede;
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
	border:1px solid #174275;
	border-radius: 3px;
	line-height: 28px;
	font-size: 12px;
	cursor: pointer;
}

.role-input-container {
	width: auto;
	min-width: 200px;
	max-width: 350px;
	height: auto;
	min-height: 30px;
	max-height: 130px;
	position: relative;
	float: left;
	padding-left: 10px;
	background: #011731;
	border:1px solid #174275;
	border-radius: 3px;
	overflow: auto;
	cursor: pointer;
}

.dept-modal-area {
	/* height: 500px; */
	position: relative;
	float: left;
	margin-left: 1%;
	margin-right: 3%;
}

.dept-modal-area-one {
	width: 98%;
}

.dept-modal-area-3 {
	width: 98%;
}

.dept-modal-area-four {
	width:600px;
	/* position: absolute;
	z-index: 1051;
	background-color: rgb(51,51,51);
	
	border: 1px solid rgb(100,100,100);
	height: 550px;
	top:6.5%;
	padding-left: 150px;
	left: 20%; */
}

.dept-modal-area-five {
	width:600px;
	/* position: absolute;
	z-index: 1051;
	background-color: rgb(51,51,51);
	
	border: 1px solid rgb(100,100,100);
	height: 550px;
	top:6.5%;
	padding-left: 150px;
	left: 20%; */
}

.dept-modal-area-2 {
	/* width: 46%; */
	width:98%;
}

.dept-selector-modal-title {
	height: 30px;
	position: relative;
	line-height: 30px;
	color:#23b5e8;
}

.dept-selector-modal-container {
	width: 100%;
	height: 470px;
	/* position: absolute;*/ 
	bottom: 0;
	border: 1px solid #174275;
	border-radius: 5px;
	overflow: auto;
}
.dept-selector-modal-container-2 {
	width: 100%;
	height: 470px;
	bottom: 0;
	border: 1px solid #174275;
	overflow: auto;
}
.dept-selector-modal-container-3 {
	width: 100%;
	height: 433px;
	position: absolute;
	bottom: 40px;
	border-top: 1px solid rgb(100, 100, 100);
	/* border-radius: 5px; */
	overflow: auto;
}

/*滚动条样式*/
.role-input-container::-webkit-scrollbar { /*滚动条整体样式*/
	width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
	height: 4px;
}

.role-input-container::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
	border-radius: 3px;
	-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	background: rgba(255, 255, 255, 0.4);
}

.role-input-container::-webkit-scrollbar-track { /*滚动条里面轨道*/
	-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	border-radius: 0;
	background: rgba(255, 255, 255, 0.1);
}

.dept-selector-modal-container::-webkit-scrollbar { /*滚动条整体样式*/
	width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
	height: 4px;
}

.dept-selector-modal-container::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
	border-radius: 3px;
	-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	background: rgba(255, 255, 255, 0.4);
}

.dept-selector-modal-container::-webkit-scrollbar-track { /*滚动条里面轨道*/
	-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	border-radius: 0;
	background: rgba(255, 255, 255, 0.1);
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
}

.user-info-table {
	width: 667px;
	margin-left: 33px;
	line-height: 35px;
}

.user-info-table tr td {
	border: 1px solid #174275;
}

.user-info-name {
	text-align: center;
}

.user-info-value {
	padding-left: 15px;
}

.modal-input-title-query {
	width: 80px;
	text-align: right;
	color: #dedede;
	background: rgba(0, 0, 0, 0) !important;
	border: none;
	font-size: 13px !important;
}

.use-dev-role-dev-list {
	width: 100%;
	/* height: calc(100% - 65px);*/
	height: 100%;
	position: absolute;
	left: 0;
	bottom: 0;
	overflow: auto;
}

.dev-selector-each-items-words {
    padding-left: 8px;
	font-weight: 100;
}
#div_items .mdui-checkbox{
	width:100%;
}
.div_item {  
    width: 100%;  
    height: 20px;  
    margin-top: 1px;  
    font-size: 13px;  
    line-height: 20px;  
}
#div_txt {  
    position: relative;  
    width: 200px;
	left: 212px;  
    /* margin: 0 auto;   */
     
}  

#txt-dev ,#txt-phone {  
    width: 99%;  
}  

#div_items, #phone_items {  
    position: absolute;  
    width: 90%;  
    height: 200px;  
    z-index: 1;
    border-top: 0px;  
    overflow: auto;  
	display: none;
	background: #fff;
	color: #000;
    border-radius: 4px;
}
#div_items::-webkit-scrollbar {/*滚动条整体样式*/
	width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
	height: 1px;
}
#div_items::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
	border-radius: 10px;
		-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
	background: rgba(100,100,100,0.5);
}
#div_items::-webkit-scrollbar-track {/*滚动条里面轨道*/
	-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
	border-radius: 10px;
	background: #EDEDED;
}

#div_items div:hover{
	background: #aaa;
	color: #222222;
} 
#phone_items::-webkit-scrollbar {/*滚动条整体样式*/
	width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
	height: 1px;
}
#phone_items::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
	border-radius: 10px;
		-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
	background: rgba(100,100,100,0.5);
}
#phone_items::-webkit-scrollbar-track {/*滚动条里面轨道*/
	-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
	border-radius: 10px;
	background: #EDEDED;
}

#phone_items div:hover{
	background: #aaa;
	color: #222222;
} 
.new-item-dept{
	position: absolute;
	left: 94px;
	width: 150px;
	height: 100%;
	top: 0;
	padding-left: 20px;
}
.new-item-dept span{
	display: block;
	height: 34px;
	line-height: 34px;
	margin-bottom: 20px;
	font-size:13px;
}
#change-devCode[disabled]:hover{
    cursor:not-allowed;
}
#change-phoneNum[disabled]:hover{
    cursor:not-allowed;
}
#modal-tips-mask{
	width: 1080px;
    height: 911px;
    position: absolute;
    left: -9%;
    top: -17%;
    z-index: 1050;
}
#modal-area-five-mask{
	width: 1080px;
    height: 911px;
    position: absolute;
    left: -9%;
    top: -17%;
    z-index: 1050;
}
.dev-phone-active{
	display:block;
}
.close-btn2{
	margin-top: -2px;
    cursor: pointer;
    background: 0 0;
    border: 0;
    padding: 0;
    outline: none;
    color: #dedede;
    opacity: 0.6;
    float: right;
    font-size: 21px;
    font-weight: 700;
    line-height: 1;
    text-shadow: 0 1px 0 #fff;
}
/*add by guoshuai start 2018-10-9*/
.search-simple-rule{
	border-left:1px solid #03172f;
	border-right:1px solid #0e3463;
	height: 120px;
	margin-top: 8px;
	float: left;
}
td{
	text-align: center;
}
#table-view-container-box{
	height:135px;
}
/* .tbody-th td:nth-last-child(1){
	border-right:none !important;
}
.tbody-tr td:nth-last-child(1){
	border-right:none !important;
} */

@media screen and (max-width: 1511px) {
	#table-view-container-box{
		height:180px;
	}
	.search-simple-rule{
		height:160px;
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
@media screen and (max-width: 1440px){
	.tbody-tr {
    	font-size: 13px;
	}
}
.tbody-th{
	border-top: 1px solid #174275 !important;
}

.table-td-selector{
	width:52px;
}
@media screen and (max-width: 1440px) {
	.table-in-todo{
		width:370px;	
	}
	.text-green-on{
		background: url('img/usermanageicon/on3x.png') no-repeat 10px;
    	background-size: 62% 62%;
	}
	.text-red-off{
		background: url('img/usermanageicon/shut3x.png') no-repeat 10px;
    	background-size: 62% 62%;
	}
	.view-user-um{
		width:18%;
		background: url('img/usermanageicon/see3x.png') no-repeat 3px 1px;
		background-size: 38% 89%;
		font-size: 9px;
		padding-left: 27px;
	}
	.update-user-um{
		width: 18%;
		background: url('img/usermanageicon/changea3x.png') no-repeat 3px 1px;
		background-size: 38% 89%;
		font-size: 9px;
		padding-left: 26px;
	}
	.stop-user-manage{
		width: 18%;
		background: url('img/usermanageicon/blocka3x.png') no-repeat 3px 1px;
		background-size: 38% 89%;
		font-size: 9px;
		padding-left: 26px;
	}
	.delete-user-um{
		width: 18%;
		background: url('img/usermanageicon/dela3x.png') no-repeat 3px 1px;
		background-size: 38% 89%;
		font-size: 9px;
		padding-left: 26px;
	}
	.user-dev-manage-um{
		width:28%;
		background: url('img/usermanageicon/dev3x.png') no-repeat 3px 1px;
		background-size: 25% 89%;
		font-size: 9px;
	}
	.start-user-manage{
		width: 18%;
		background: url('img/usermanageicon/enable3x.png') no-repeat 3px 1px;
		background-size: 38% 89%;
		font-size: 9px;
		padding-left: 26px;
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
td{
	white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.h4-add{
	width: 112px;
    height: 42px;
    
    display: block;
    line-height: 42px;
    
}
.h4-update{
	width: 146px;
    height: 42px;
    
    display: block;
    line-height: 42px;
	
}
.h4-devManage{
	width: 164px;
    height: 42px;
    
    display: block;
    line-height: 42px;
	
}
.h4-information{
	width: 146px;
    height: 42px;
   
    display: block;
    line-height: 42px;
	
}
.form-control{
	border:1px solid #174275;
}
/* #user-modal-submit-add ,#user-modal-submit-update{
	display: block;
    margin-left: 21%;
    float: left;
    width: 140px;
    border-radius: 16px;
    background-color: #23b5e8;
}
#user-modal-submit-cancel , #user-modal-cancel-update{
	margin-left: 28%;
    display: block;
    width: 140px;
    float: left;
    border-radius: 16px;
} */
#dev-table-tbody tr:nth-child(1){
	background-color: rgba(23,193, 244, 0.4);
}
#dev-table-tbody tr:nth-child(even) {
    background-color: #07203e;
}
#dev-table-tbody tr:nth-child(even) {
	background-color: rgba(23,193, 244, 0.1);
}
#phone-table-tbody tr:nth-child(1){
	background-color: rgba(23,193, 244, 0.4);
}
#phone-table-tbody tr:nth-child(even) {
    background-color: #07203e;
}
#phone-table-tbody tr:nth-child(even) {
	background-color: rgba(23,193, 244, 0.1);
}
.table-view-search-area input{
	border: none;
}
.dept-selector-modal-container-selected{
	height:36px;
	background:#011731;
}
/* .dept-selector-ensure{
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
} */
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

.mdui-checkbox-icon{
	width: 12px;
    height: 12px;
    left:0%;
    border: 1px solid #fff;
    border-radius: 0px;
    top:12px;
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
#user-modal input{
	background-color:#011731 !important;
}
.text-red{
	font-size:12px;
}
.text-green{
	font-size:12px;
}
.checkbox-phone{
	position:relative;
}
/*add by guoshuai end 2018-10-9*/
</style>
</head>
<body style="background: url('img/iconpic/bg.png');background-size: 100% 100%;background-color:#000;">
	<header class="top-header" id="top-header"></header>
	<div class="left-menu"></div>
	<div class="guide-frame" style="height:1077px;">
		<div class="guide-title" style="margin-left: -22px">用户管理</div>
		<div class="table-view-container" style="width: 96.35%;">
			<div id="table-view-container-box" style="background: #07203e;"> 
				<div class="table-view-search-area">
					<!-- 账号 -->
					<div
						class="input-group input-group-sm search-item search-item-width-sm">
						<span class="input-group-addon input-group-title" id="query-id" style="text-align: left;">账号</span>
						<input type="text" class="form-control input-background"
							id="name-value" maxlength="16">
					</div>
					<!-- 停启用状态 -->
					<div
						class="input-group input-group-sm search-item search-item-width-sm">
						<span class="input-group-addon input-group-title"
							id="query-phone-num">停启用状态</span>
						<div class="btn-group">
							<button type="button" id="sex-button"
								style="width: 220px; text-align: left; /*delete by guoshuai border: 1px solid rgb(204, 204, 204); background: rgb(60, 60, 60); end*/border: none;background: #011731; color: rgb(204, 204, 204);"
								class="btn btn-default btn-sm dropdown-toggle"
								data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								<span id="locked-input" style="color: rgb(204, 204, 204);">&nbsp;</span>
								<span class="caret" style="float: right; margin-top: 6px;"></span>
							</button>
							<span id="locked-remove" class="glyphicon glyphicon-remove-circle"
								aria-hidden="true"
								style="display: none; position: absolute; top: 7px; right: 30px; color: rgb(204, 204, 204); z-index: 100; cursor: pointer;"></span>
							<ul class="dropdown-menu" style="width: 220px;">
								<li><a class="locked-selector">已启用</a></li>
								<li><a class="locked-selector">已停用</a></li>
							</ul>
						</div>
					</div>
					<!-- 真实姓名 -->
					<div
						class="input-group input-group-sm search-item search-item-width-sm">
						<span class="input-group-addon input-group-title"
							id="query-phone-num">真实姓名</span> <input type="text"
							class="form-control input-background" id="realname-value"
							maxlength="16">
					</div>
					<!-- 手机号 -->
					<div
						class="input-group input-group-sm search-item search-item-width-sm">
						<span class="input-group-addon input-group-title"
							id="query-phone-num">手机号</span> <input type="text"
							class="form-control input-background" id="phone-num-value"
							maxlength="11">
					</div>
					<!-- 角色 -->
					<div
						class="input-group input-group-sm search-item search-item-width-sm">
						<span class="input-group-addon input-group-title" style="text-align: left"
							id="query-phone-num">角色</span>
						<div class="btn-group" style="margin-left: 30px;">
							<button type="button" id="role-selector-button"
								style="width: 220px; text-align: left; /*delete by guoshuai border: 1px solid rgb(204, 204, 204); background: rgb(60, 60, 60); color: rgb(204, 204, 204); end*/border: none;background: #011731; color: rgb(204, 204, 204);"
								class="btn btn-default btn-sm dropdown-toggle"
								data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								<span id="role-selector-input" data-role-id=""
									style="color: rgb(204, 204, 204);">&nbsp;</span> <span
									class="caret" style="float: right; margin-top: 6px;"></span>
							</button>
							<span id="role-selector-remove"
								class="glyphicon glyphicon-remove-circle" aria-hidden="true"
								style="display: none; position: absolute; top: 7px; right: 30px; color: rgb(204, 204, 204); z-index: 100; cursor: pointer;"></span>
							<ul class="dropdown-menu" style="width: 220px;"
								id="role-selector-container">
							</ul>
						</div>
					</div>
					<!-- 所属机构 -->
					<div
						class="input-group input-group-sm search-item search-item-width-sm">
						<span class="input-group-addon input-group-title"
							id="query-phone-num">所属机构</span>
						<div class="btn-group">
							<button type="button" id="dept-selector-button"
								style="width: 237px; text-align: left; /*delete by guoshuai border: 1px solid rgb(204, 204, 204); background: rgb(60, 60, 60); end*/border: none;background: #011731;color: rgb(204, 204, 204);"
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
					<!-- 设备使用角色 -->
					<!--delete by guoshuai start 2018-10-8
					<div
						class="input-group input-group-sm search-item search-item-width-sm">
						<span class="input-group-addon input-group-title"
							id="query-phone-num">设备使用角色</span>
						<div class="btn-group">
							<button type="button" id="dev-use-role-selector-button"
								style="width: 220px; text-align: left; border: 1px solid rgb(204, 204, 204); background: rgb(60, 60, 60); color: rgb(204, 204, 204);"
								class="btn btn-default btn-sm dropdown-toggle"
								data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								<span id="dev-use-role-selector-input" data-role-id=""
									style="color: rgb(204, 204, 204);">&nbsp;</span> <span
									class="caret" style="float: right; margin-top: 6px;"></span>
							</button>
							<span id="dev-use-role-selector-remove"
								class="glyphicon glyphicon-remove-circle" aria-hidden="true"
								style="display: none; position: absolute; top: 7px; right: 30px; color: rgb(204, 204, 204); z-index: 100; cursor: pointer;"></span>
							<ul class="dropdown-menu" style="width: 220px;"
								id="dev-use-role-selector-container">
							</ul>
						</div>
					</div>
					delete by guoshuai end 2018-10-8-->
				</div>
				<!--add by guoshuai start 2018-10-8-->
				<div class="search-simple-rule"></div>
				<!--add by guoshuai end 2018-10-8-->
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
			<!--delete by guoshuai start 2018-9-29
			<div class="table-view-data-area auto-min-height">
			delete by guoshuai end 2018-9-29-->
			<!--add by guoshuai start 2018-9-29-->
			<div class="table-view-data-area auto-min-height" style="min-height:0px;">
			<!--add by guoshuai end 2018-9-29-->
				<!-- 表格 -->
				<table class="view-data-table">
					<thead>
						<tr>
							<th colspan="11">
								<div id="table-thead"
									style="height: 35px; line-height: 35px; margin-left:10px;">
									<button type="button" class="table-th-btn btn-green"
										id="add-user-btn">
										<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>&nbsp;新增
									</button>
									<button type="button" class="table-th-btn btn-red"
										id="del-user-btn">
										<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>&nbsp;删除
									</button>
								</div>
							</th>
						</tr>
					</thead>
					<tbody id="table-tbody">
					</tbody>
				</table>
			</div>

			<!-- 底部分页 -->
			<!--delete by guoshuai start 2018-9-29
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

	<!-- Modal用户信息 -->
	<div class="modal fade" id="user-modal" data-backdrop="static"
		data-keyboard="false" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document" style="width:800px;">
			<div class="modal-content" id="user-input-modal"></div>
		</div>
	</div>

	<!-- 角色选择-->
	<div class="modal fade bs-example-modal-lg" id="role-selector-modal"
		data-backdrop="static" data-keyboard="false" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header" style="margin-left:24px;">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
		                <span aria-hidden="true" class="add-user-close"></span>
					</button>
					<h4 class="modal-title" style="margin-left:-14px;">角色选择</h4>
				</div>
				<div class="modal-body" style="overflow: hidden;">
					<div style="width: 100%; height: 500px;">
						<div class="dept-modal-area dept-modal-area-one">
							<div class="dept-selector-modal-title">已选角色</div>
							<div class="dept-selector-modal-container dept-selector-modal-container-selected"
								id="role-selected-area"></div>
						</div>
						<div class="dept-modal-area dept-modal-area-2">
							<div class="dept-selector-modal-title">角色列表</div>
							<div class="dept-selector-modal-container ztree selector-modal-box"
								id="role-selector-panel"></div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary dept-selector-ensure" data-dismiss="modal"
						id="role-selector-ensure">确定</button>
					<button type="button" class="btn btn-default dept-selector-cancel" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Modal查看信息 -->
	<div class="modal fade" id="userinfo-view-modal" data-backdrop="static"
		data-keyboard="false" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content" style="width:770px; margin-left:-70px">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
		                <span aria-hidden="true" class="add-user-close"></span> 
					</button>
					<h4 class="modal-title h4-information">查看用户信息</h4>
				</div>
				<div class="modal-body" id="user-info-content"></div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				</div>
			</div>
		</div>
	</div>

	<!-- 组织机构选择 -->
	<div class="modal fade bs-example-modal-lg" id="dept-selector-modal"
		data-backdrop="static" data-keyboard="false" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header" style="margin-left:24px;">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
		                <span aria-hidden="true" class="add-user-close"></span>
					</button>
					<h4 class="modal-title" style="margin-left:-14px;">机构选择</h4>
				</div>
				<div class="modal-body" style="overflow: hidden;">
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
					<button type="button" class="btn btn-primary dept-selector-ensure" data-dismiss="modal"
						id="dept-selector-ensure">确定</button>
					<button type="button" class="btn btn-default dept-selector-cancel" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
	<!--guoshuai start 8-25-->
	<!-- 设备使用角色选择 -->
	<div class="modal fade bs-example-modal-lg" id="devrole-selector-modal"
		data-backdrop="static" data-keyboard="false" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel">
		<div class="modal-dialog modal-lg" role="document">
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
					<h4 class="modal-title">设备角色选择</h4>
				</div>
				<div class="modal-body">
					<div style="width: 100%; height: 500px;">
						<div class="dept-modal-area dept-modal-area-one">
							<div class="dept-selector-modal-title">已选</div>
							<div class="dept-selector-modal-container"
								id="dev-user-role-selected-area"></div>
						</div>
						<div class="dept-modal-area dept-modal-area-2">
							<div class="dept-selector-modal-title">列表</div>
							<div class="dept-selector-modal-container"
								id="dev-user-role-selector-panel"></div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" data-dismiss="modal"
						id="dev-user-role-selector-ensure">确定</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
	<div class="modal fade bs-example-modal-lg" id="devuse-selector-modal"
		data-backdrop="static" data-keyboard="false" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel">
		<div class="modal-dialog modal-lg" role="document">
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
					<h4 class="modal-title">设备使用权限选择</h4>
				</div>
				<div class="modal-body">
					<div style="width: 100%; height: 500px;">
						<div class="dept-modal-area dept-modal-area-one">
							<div class="dept-selector-modal-title">已选</div>
							<div class="dept-selector-modal-container"
								id="dev-user-role-selected-area"></div>
						</div>
						<div class="dept-modal-area dept-modal-area-2">
							<div class="dept-selector-modal-title">列表</div>
							<div class="dept-selector-modal-container"
								id="dev-use-rights-selector-panel"></div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" data-dismiss="modal"
						id="dev-user-role-selector-ensure">确定</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
	<div class="modal fade bs-example-modal-lg" id="targetphone-selector-modal"
		data-backdrop="static" data-keyboard="false" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
		                <span aria-hidden="true" class="add-user-close"></span>
					</button>
					<h4 class="modal-title">目标手机号权限选择</h4>
				</div>
				<div class="modal-body">
					<div style="width: 100%; height: 500px;">
						<div class="dept-modal-area dept-modal-area-one">
							<div class="dept-selector-modal-title">已选</div>
							<div class="dept-selector-modal-container"
								id="dev-user-role-selected-area"></div>
						</div>
						<div class="dept-modal-area dept-modal-area-2">
							<div class="dept-selector-modal-title">列表</div>
							<div class="dept-selector-modal-container"
								id="tar-phone-rights-selector-panel"></div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" data-dismiss="modal"
						id="dev-user-role-selector-ensure">确定</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
	<!-- 管理下属设备 -->
	<div class="modal fade bs-example-modal-lg" id="user-dev-manage-modal"
		data-backdrop="static" data-keyboard="false" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close user-dev-manage-x" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" class="add-user-close"></span>
					</button>
					<h4 class="modal-title h4-devManage">下属设备管理</h4>
				</div>
				<div class="modal-body">
					<div style="width: 100%; height: 500px;">
						<div class="dept-modal-area dept-modal-area-3" style="display: block">
							<div style="height:36px; border:1px solid #174275; border-bottom:none;background: linear-gradient(rgb(40, 40, 40), rgb(29, 33, 39));">
								<button type="button" class="table-th-btn btn-green" id="dept-selector-modal-add" style="margin-top:4px; margin-left:10px;">
									<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>&nbsp;新增
								</button>
								<button type="button" class="table-th-btn btn-red" id="dept-selector-modal-del" style="margin-top:4px;">
									<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>&nbsp;删除
								</button>
							</div>
							<div id="dev-table-tbody" class="dept-selector-modal-container-2"></div>
							<div class="dept-selector-modal-container-2" id="dev-selected-area" style="display:none;">
								
							</div>
						</div>
						

					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default user-dev-manage-x" data-dismiss="modal">关闭</button>
				</div>
			</div>
		</div>
	</div>
	<!--add by guo shuai start content: 新修改的设备新增模态框 2018-9-18-->
	<div class="modal fade bs-example-modal-lg " id="user-dev-add-modal" data-backdrop="static" data-keyboard="false" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel">
		<div class="modal-dialog modal-lg" role="document" style="
			width: 550px;
			background-color: #08264a;
			margin-top: 80px;
			-webkit-box-shadow: 0 5px 15px rgba(0,0,0,.5);
    		box-shadow: 0 5px 15px rgba(0,0,0,.5);
		">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
                            <span aria-hidden="true" class="add-user-close"></span>
						</button>
				<h4 class="modal-title">下属设备管理新增</h4>
			</div>
			<div class="modal-body dept-modal-area-four">
				<div id="div_txt">  
					<!--要模糊匹配的文本框-->  
					<input type="text" id="txt-dev"  style="
						background-color:#011731 !important;; width:200px; height:32px; border:1px solid #174275; margin-top:50px;margin-bottom:20px;
						background:url('img/nine-search.png') no-repeat 166px 4px;
						background-size: 14% 70%;
						padding-left: 8px;
						color: #fff;
						font-size:13px;
					"/><span class="input-check" id="is-phone-true" style="
						position: absolute;
						width: 105px;
						top: 50px;
						left: 202px;
						"></span> 
					<!--模糊匹配窗口-->  
					<div id="div_items">  
						
					</div>
				</div>
				<input type="text" id="query-time-start-timeSix" style="float: none;margin-bottom:20px;position: relative; left: 212px;background-color: #011731 !important; width:200px !important;
					background:url('img/usermanageicon/date3x.png')172px 4px no-repeat; background-size:11% 70%;font-size:13px;"
					class="form-control input-background input-data-picker-md"
					onclick="WdatePicker({maxDate:'#F{$dp.$D(\'query-time-end-timeSix\')}',dateFmt:'yyyy-MM-dd HH:mm:ss'})"><span class="input-check" id="is-startTime-true" style="
						position: absolute;
						width: 105px;
						top: 120px;
						left: 428px;
					"></span>
				<input type="text" id="query-time-end-timeSix" style="float: none;margin-bottom:20px;position: relative; left: 212px;background-color: #011731 !important; width:200px !important;
					background:url('img/usermanageicon/date3x.png')172px 4px no-repeat; background-size:11% 70%;font-size:13px;"
					class="form-control input-background input-data-picker-md"
					onclick="WdatePicker({minDate:'#F{$dp.$D(\'query-time-start-timeSix\')}',dateFmt:'yyyy-MM-dd HH:mm:ss'})"><span class="input-check" id="is-endTime-true" style="
						position: absolute;
						width: 105px;
						top: 173px;
						left: 428px;
					"></span>
				<div class="new-item-dept">
					<span class="text-red" style="width:10px!important; float: left;
						position: absolute;
						left: 8px;
						top: 63px;
					">*</span><span style="float: none;margin-top:62px; color: #fff;">设备编号</span>
					<span class="text-red" style="width:10px!important; float: left;
						position: absolute;
						left: 8px;
						top: 118px;
					">*</span><span style="color: #fff;">有效开始时间</span>
					<span class="text-red" style="width:10px!important; float: left;
						position: absolute;
						left: 8px;
						top: 173px;
					">*</span><span style="color: #fff;">有效结束时间</span>
					<!-- <span>启用状态</span> -->
				</div>
				<div class="dept-selector-modal-container-3" style="display: none;">
					<!-- 设备列表框 -->
					<div class="use-dev-role-dev-list"></div>
				</div>
				<div class="modal-input" id="content-tips" style=" display: block;
					width: 200px !important;
					position: absolute;
					left: -12px;
				">
					<span style="margin-left: 35px; color: #fff;">
						注：带 "<span class="text-red">*</span>"为必填项
					</span>
				</div>
			</div>         
			<div class="modal-footer">
				<button type="button" class="btn btn-primary" id="new-user-dev-submit" data-userid="">确定</button>
				<button type="button" class="btn btn-default"  data-dismiss="modal" id="new-user-dev-cancel">取消</button>
			</div>
		</div>
	</div>
	<!--add by guo shuai end content: 新修改的设备新增模态框 2018-9-18-->
	<!--add by guo shuai start content: 新增修改设备信息的模态框 2018-9-18-->
	<div class="modal fade bs-example-modal-lg " id="user-dev-update-modal"data-backdrop="static" data-keyboard="false" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel">
		<div class="modal-dialog modal-lg" role="document" style="
			    width: 528px;
			    background-color: #08264a;
			    margin-top: 80px;
			    -webkit-box-shadow: 0 5px 15px rgba(0,0,0,.5);
			    box-shadow: 0 5px 15px rgba(0,0,0,.5);
		">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
                            <span aria-hidden="true" class="add-user-close"></span>
						</button>
				<h4 class="modal-title">下属设备管理修改</h4>
			</div>
			<div class="modal-body dept-modal-area-five">
				<input id="change-devCode" type="text" disabled="disabled" style=" 
					width:200px;
					height:34px;
					border:1px solid #174275;
					margin-top:50px;
					background:#011731;
					line-height:34px;
					display: block;
					padding-left: 8px;
					position: relative;
					left: 208px;
					color: #fff;
					font-size:13px;
				"/>
				<input type="text" id="query-time-start-time" style="float: none;margin-bottom:20px;margin-top: 23px;position: relative;left: 208px;
					background-color: #011731 !important;
				    background: url('img/usermanageicon/date3x.png')172px 4px no-repeat;
				    background-size: 11% 70%; font-size:13px;width:200px !important;"
					class="form-control input-background input-data-picker-md query-time-start-time"
					onclick="WdatePicker({maxDate:'#F{$dp.$D(\'query-time-end-time\')}',dateFmt:'yyyy-MM-dd HH:mm:ss'})">
					<span class="input-check" id="is-change-startTime-true" style="
						position: absolute;
						width: 105px;
						top: 124px;
						left: 422px;
					"></span>
				<input type="text" id="query-time-end-time" style="float: none;margin-bottom:20px;position: relative;left: 208px;
					background-color: #011731 !important;
				    background: url('img/usermanageicon/date3x.png')172px 4px no-repeat;
				    background-size: 11% 70%; font-size:13px;width:200px !important;"
					class="form-control input-background input-data-picker-md query-time-end-time" 
					onclick="WdatePicker({minDate:'#F{$dp.$D(\'query-time-start-time\')}',dateFmt:'yyyy-MM-dd HH:mm:ss'})">
					<span class="input-check" id="is-change-endTime-true" style="
						position: absolute;
						width: 105px;
						top: 178px;
						left: 422px;
					"></span>
					<div class="new-item-dept">
						<span style="margin-top:65px;color: #fff;">设备编号</span>
						<span class="text-red" style="width:10px!important; float: left;
							position: absolute;
							left: 8px;
							top: 124px;
						">*</span><span style="color: #fff;">有效开始时间</span>
						<span class="text-red" style="width:10px!important; float: left;
							position: absolute;
							left: 8px;
							top: 178px;
						">*</span><span style="color: #fff;">有效结束时间</span>	
					</div>
					<div class="modal-input" id="content-tips" style=" display: block;
						width: 200px !important;
						position: absolute;
						left: -12px;
					">
						<span style="margin-left: 35px; color: #fff;">注：带 "<span class="text-red">*</span>"为必填项</span>
					</div>
			</div>  
			<div class="modal-footer">
				<button type="button" class="btn btn-primary"  id="new-user-dev-change" data-userid="">确定</button>
				<button type="button" class="btn btn-default" data-dismiss="modal" id="new-user-dev-change-cancel">取消</button>
			</div>
		</div>
	</div>
	<!--add by guo shuai start content: 新增修改设备信息的模态框 2018-9-18-->

	<!-- 修改手机号信息的模态框 -->
	<div class="modal fade bs-example-modal-lg " id="user-phone-update-modal"data-backdrop="static" data-keyboard="false" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel">
		<div class="modal-dialog modal-lg" role="document" style="
			    width: 528px;
			    background-color: #08264a;
			    margin-top: 80px;
			    -webkit-box-shadow: 0 5px 15px rgba(0,0,0,.5);
			    box-shadow: 0 5px 15px rgba(0,0,0,.5);
		">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
                            <span aria-hidden="true" class="add-user-close"></span>
						</button>
				<h4 class="modal-title">下属测试手机号信息修改</h4>
			</div>
			<div class="modal-body dept-modal-area-five">
				<input id="change-phoneNum" type="text" disabled="disabled" style=" 
					width:200px;
					height:34px;
					border:1px solid #174275;
					margin-top:50px;
					background:#011731;
					line-height:34px;
					display: block;
					padding-left: 8px;
					position: relative;
					left: 208px;
					color: #fff;
					font-size:13px;
				"/>
				<input type="text" id="update-phone-start-time" style="float: none;margin-bottom:20px;margin-top: 23px;position: relative;left: 208px;
					background-color: #011731 !important;
				    background: url('img/usermanageicon/date3x.png')172px 4px no-repeat;
				    background-size: 11% 70%; font-size:13px;width:200px !important;"
					class="form-control input-background input-data-picker-md query-time-start-time"
					onclick="WdatePicker({maxDate:'#F{$dp.$D(\'update-phone-end-time\')}',dateFmt:'yyyy-MM-dd HH:mm:ss'})">
					<span class="input-check" id="is-phoneUpdate-startTime-true" style="
						position: absolute;
						width: 105px;
						top: 124px;
						left: 422px;
					"></span>
				<input type="text" id="update-phone-end-time" style="float: none;margin-bottom:20px;position: relative;left: 208px;
					background-color: #011731 !important;
				    background: url('img/usermanageicon/date3x.png')172px 4px no-repeat;
				    background-size: 11% 70%; font-size:13px;width:200px !important;"
					class="form-control input-background input-data-picker-md query-time-end-time" 
					onclick="WdatePicker({minDate:'#F{$dp.$D(\'update-phone-start-time\')}',dateFmt:'yyyy-MM-dd HH:mm:ss'})">
					<span class="input-check" id="is-phoneUpdate-endTime-true" style="
						position: absolute;
						width: 105px;
						top: 178px;
						left: 422px;
					"></span>
					<div class="new-item-dept">
						<span style="margin-top:65px;color: #fff;">手机号</span>
						<span class="text-red" style="width:10px!important; float: left;
							position: absolute;
							left: 8px;
							top: 124px;
						">*</span><span style="color: #fff;">有效开始时间</span>
						<span class="text-red" style="width:10px!important; float: left;
							position: absolute;
							left: 8px;
							top: 178px;
						">*</span><span style="color: #fff;">有效结束时间</span>	
					</div>
					<div class="modal-input" id="content-tips" style=" display: block;
						width: 200px !important;
						position: absolute;
						left: -12px;
					">
						<span style="margin-left: 35px; color: #fff;">注：带 "<span class="text-red">*</span>"为必填项</span>
					</div>
			</div>  
			<div class="modal-footer">
				<button type="button" class="btn btn-primary"  id="user-phone-update-confirm" data-userid="">确定</button>
				<button type="button" class="btn btn-default" data-dismiss="modal" id="user-phone-update-cancel">取消</button>
			</div>
		</div>
	</div>
	<!-- Modal确认框 -->
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
					<button type="button" class="btn btn-primary" data-dismiss="modal" style="margin-left:5px;">取消</button>
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
	/*add by guoshuai start 2018-9-15*/
	$('.user-dev-manage-x').click(function(){
		$('.modal-backdrop').remove();
	});
	$(document).on('click','#txt-dev',function(){
		$("#div_items").css('display', 'block'); 
	});
	$(document).on('click','#dept-selector-modal-add',function(){
		$('#new-user-dev-submit').attr('data-userid',$('#dept-selector-modal-add').attr('data-id'));
		// $('.dept-modal-area-four').css('display','block');
		$('#user-dev-add-modal').modal('show');
		$('.dept-modal-area-four #txt-dev').val('');
		$('.dept-modal-area-four #txt-dev').attr('dev-id','');
		$('.dept-modal-area-four #txt-dev').attr('dev-code','');
		$('.dept-modal-area-four #query-time-start-timeSix').val('');
		$('.dept-modal-area-four #query-time-end-timeSix').val('');
		$('#is-dev-true').html('');
		$('#is-startTime-true').html('');
		$('#is-endTime-true').html('');
	});
	$(document).on('click','#new-user-dev-submit',function(){
		let dev = $('#txt-dev').val();
		let start = $('.dept-modal-area-four #query-time-start-timeSix').val();
		let end = $('.dept-modal-area-four #query-time-end-timeSix').val();
		if(dev==''){
			$('#is-dev-true').html('<span class="text-red">请选择设备</span>');
		}else{
			$('#is-dev-true').html('');
		}
		if(start==''){
			$('#is-startTime-true').html('<span class="text-red">请设置开始时间</span>')
		}else{
			$('#is-startTime-true').html('');
		}
		if(end==''){
			$('#is-endTime-true').html('<span class="text-red">请设置结束时间</span>');
		}else{
			$('#is-endTime-true').html('');
		}
		if(dev!=''&&start!=''&&end!=''){
			if(!$('#is-dev-true').html('<span class="text-red">该设备已被选用</span>')){
				// $('.dept-modal-area-four').css('display','none');
				
				//$('#user-dev-add-modal').modal('hide');
				//$('#user-dev-add-modal').attr('data-dismiss','modal');
			}else{	
				//$('.dept-modal-area-four').css('display','block');
				// $('#modal-tips-mask').css('display','block');
				//$('#user-dev-add-modal').modal('show');
			}
		}else{
			//$('.dept-modal-area-four').css('display','block');
			
			//$('#user-dev-add-modal').modal('show');
		}
	});
	
	$(document).on('click','#new-user-dev-cancel',function(){
		//$('.dept-modal-area-four').css('display','none');
		
		// $('#user-dev-add-modal').modal('hide');
		//$('#user-dev-add-modal').attr('data-dismiss','modal');
	});
	/*状态选择*/
	$(document).on('click', '.state-gender-selector', function () {
    	$('#state-input').html($(this).html());
	});
	/*修改时间实时显示*/
	$(document).on('click',".update-dev-change",function(){
		// $('.dept-modal-area-five').css('display','block');
		
		$('#user-dev-update-modal').modal('show');
		let index =$(this).attr('data-index');
		$('#is-change-startTime-true').html('');
		/*add children() by guoshuai*/
		$(".dept-modal-area-five .query-time-start-time").val($('.update-dev-change').eq(index).parent().siblings().eq(2).html());
		$(".dept-modal-area-five .query-time-end-time").val($('.update-dev-change').eq(index).parent().siblings().eq(3).html());
		$('#is-change-endTime-true').html('');
		$('.dept-modal-area-five').attr('data-index',index);
		/*add children() by guoshuai*/
		$('#change-devCode').val($('.update-dev-change').eq(index).parent().siblings().eq(1).html());
		$('#change-devCode').attr('data-id',$('.update-dev-change').eq(index).parent().siblings().eq(1).attr('data-id'));
	});
	$(document).on('click','#new-user-dev-change',function(){
		$(this).attr('data-index',$('.dept-modal-area-five').attr('data-index'));
		let idx=$(this).attr('data-index');
		let start = $(".dept-modal-area-five .query-time-start-time").val();
		let end = $(".dept-modal-area-five .query-time-end-time").val();
		if(start==''){
			$('#is-change-startTime-true').html('<span class="text-red">请设置开始时间</span>')
		}else{
			$('#is-change-startTime-true').html('');
		}
		if(end==''){
			$('#is-change-endTime-true').html('<span class="text-red">请设置结束时间</span>');
		}else{
			$('#is-change-endTime-true').html('');
		}
		if(start!=''&&end!=''){
			/*add children() by guoshuai*/
			$('.update-dev-change').eq(idx).parent().siblings().eq(2).text(start);
			$('.update-dev-change').eq(idx).parent().siblings().eq(3).text(end);
		}	
	});
	/*停启用*/
	$(document).on('click','.update-use3',function(){
		if($(this).text()=="启用"){
			$(this).parent().siblings().eq(4).text("启用");
			$(this).text("停用");
		}else{
			$(this).parent().siblings().eq(4).text("停用");
			$(this).text("启用");
		}		
	});
	/*设备选择*/
	$(document).on('click','#new-dev-change',function(){
		$(".new-dev-change-six").css('display', 'none');
		$(".new-dev-change-six #txt-dev").val('');
	});
	$(document).on('click','#new-dev-change-two',function(){
		$(".new-dev-change-six").css('display', 'none');
		$(".new-dev-change-six #txt-dev").val('');
	});
	
	/*add by guoshuai end 2018-9-15*/
</script>
<script type="text/javascript"
	src="js/src/app/page/userManage/declaration.js?v=2.1.891114"></script>
<script type="text/javascript">
//覆盖Modal.prototype的hideModal方法
$.fn.modal.Constructor.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
        //判断当前页面所有的模态框都已经隐藏了之后body移除.modal-open，即body出现滚动条。
        $('.modal.fade.in').length === 0 && that.$body.removeClass('modal-open')
        that.resetAdjustments()
        that.resetScrollbar()
        that.$element.trigger('hidden.bs.modal')
    })
}
</script>
<!-- bundle.js -->
<script type="text/javascript"
	src="js/src/app/page/userManage/bundle.js?v=2.1.16"></script>
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