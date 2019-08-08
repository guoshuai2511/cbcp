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
<link rel="icon" type="image/ico"
	href="img/jiantong_logo.ico?v=2.0.4">
<title>个人中心</title>
<script src="js/lib/jquery/jquery-3.2.1.min.js"></script>
<link rel="stylesheet" href="js/lib/bootstrarp/css/bootstrap.min.css">
<script src="js/lib/bootstrarp/js/bootstrap.min.js"></script>
<!--自定义图标-->
<link rel="stylesheet" href="js/lib/iconfont/iconfont.css">
<!-- 日期选择器 -->
<script language="javascript" type="text/javascript"
	src="js/lib/My97DatePicker/WdatePicker.js"></script>
<!--MDUI-->
<link rel="stylesheet" href="js/lib/mdui-v0.4.0/css/mdui.min.css">
<script src="js/lib/mdui-v0.4.0/js/mdui.min.js"></script>
<!-- 树状图-->
<link rel="stylesheet"
	href="js/lib/zTree_v3/css/bootstrapStyle/bootstrapStyle_CBCP.css">
<script src="js/lib/zTree_v3/js/jquery.ztree.all.min.js"></script>
<!-- 文件上传-->
<link type="text/css" rel="stylesheet"
	href="js/lib/bootstrap-fileinput/css/fileinput.min.css" />
<script type="text/javascript"
	src="js/lib/bootstrap-fileinput/js/fileinput.min.js"></script>
<script type="text/javascript"
	src="js/lib/bootstrap-fileinput/js/locales/zh.js"></script>
<!-- 时间格式化 -->
<script src="js/lib/TimeFormat/timeFormat.js"></script>
<!-- 分页插件-->
<script src="js/lib/pagination/jquery.pagination.js?v=2.1.892223"></script>
<link rel="stylesheet" href="js/lib/pagination/pagination.css?v=2.1.892224">
<link href="css/common.css?v=2.1.10" rel="stylesheet">
<link href="css/table/table-view.css?v=2.1.12" rel="stylesheet">
<style>
input:-webkit-autofill {
	/*-webkit-box-shadow: 0 0 0 1000px rgb(29, 33, 39) inset;*/
	
}

.user-name-area {
	width: 100%;
	height: 230px;
	position: relative;
	margin-top: 50px;
}

.user-name-area .user-pic {
	width: 140px;
	height: 140px;
	position: absolute;
	left: 50%;
	top: 0;
	margin-left: -70px;
	border-radius: 50%;
	cursor: pointer;
}

.user-pic .outer-cover {
	width: 140px;
	height: 140px;
	position: absolute;
	background: rgb(0, 0, 0);
	border-radius: 50%;
	text-align: center;
	line-height: 140px;
	font-family: 'Microsoft YaHei light';
	font-size: 23px;
	color: #fff;
	opacity: 0;
	transition: 0.3s;
}

.user-pic .outer-cover:hover {
	opacity: 0.3;
}

.user-pic img {
	width: 140px;
	height: 140px;
	position: absolute;
	border-radius: 50%;
}

.user-name-area .user-name {
	width: 500px;
	height: 50px;
	position: absolute;
	left: 50%;
	bottom: 0;
	margin-left: -250px;
	text-align: center;
	line-height: 50px;
	font-family: 'Microsoft YaHei light';
	font-size: 30px;
	color: #23dcff;
}

.user-info-area {
	width: 1050px;
	height: auto;
	min-height: 500px;
	position: relative;
	left: 50%;
	margin-left: -525px;
	margin-top: 30px;
	overflow: hidden;
}

.user-info-area .info-block {
	width: 450px;
	height: auto;
	min-height: 400px;
	position: relative;
	float: left;
	margin-right: 150px;
}

.user-info-table {
	width: 100%;
	font-size: 16px;
}

.user-info-table tr .table-title {
	height: 40px;
	background: #23dcff;
	line-height: 40px;
	text-align: center;
	border-bottom: 1px solid rgb(29, 33, 39);
}

.user-info-table tr .table-value {
	height: 40px;
	padding-left: 30px;
	line-height: 40px;
	text-align: left;
	color: #dedede;
	border-bottom: 1px solid rgb(100, 100, 100);
	border-right: 1px solid rgb(100, 100, 100);
	border-top: 1px solid rgb(100, 100, 100);
}

.info-block-title {
	position: relative;
	font-family: 'Microsoft YaHei light';
	font-size: 25px;
	color: #23dcff;
}

.info-block-item {
	margin-bottom: 40px;
}

.input-group-cos {
	width: 400px;
	height: 40px;
	position: relative;
	border-bottom: 1px solid rgb(100, 100, 100);
}

.input-group-cos .input-addon {
	width: 95px;
	height: 30px;
	position: relative;
	float: left;
	margin-top: 5px;
	padding-left: 10px;
	line-height: 30px;
	color: #dedede;
	font-size: 17px;
	border-right: 1px solid rgb(90, 90, 90);
}

.input-group-cos .input-content {
	width: 270px;
	height: 30px;
	position: relative;
	float: left;
	margin-top: 5px;
	padding-left: 20px;
	background: rgba(0, 0, 0, 0);
	border: none;
	border-left: 1px solid rgb(0, 0, 0);
	color: #dedede;
	font-size: 16px;
	outline: none;
}

.pwd-change-input {
	width: 140px;
	height: 50px;
	position: relative;
	margin-left: 140px;
	background: #23dcff;
	border-radius: 25px;
	text-align: center;
	line-height: 50px;
	font-size: 20px;
	cursor: pointer;
}

.input-clear {
	color: #dedede;
	position: absolute;
	right: 10px;
	top: 10px;
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
</style>
</head>
<!--delete by guoshuai start 2018-9-27 
<body style="background: rgb(29, 33, 39);">
delete by guoshuai end 2018-9-27 -->
<!-- add by guoshuai start 2018-9-27 -->
<body style="background: url('img/iconpic/bg.png');background-size: 100% 100%;background-color:#000;">
<!--add by guoshuai end 2018-9-27-->
	<header class="top-header" id="top-header"> <!-- <span class="header-current-weather header-info-txt"></span> <span
		class="header-current-time header-info-txt"></span> --></header>
	<div class="left-menu"></div>

	<div class="guide-frame">
		<div class="guide-title" style="margin-left:-22px">个人中心</div>
		<div class="guide-title-line"></div>
		<ul class="nav nav-tabs guide-nav">
		</ul>
		<div class="table-view-container">
			<div class="user-name-area">
				<div class="user-pic">
					<img id="user-pic-show" src="img/user_pic_default.png"
						onerror='this.src="img/user_pic_default.png"'>
					<div class="outer-cover" data-toggle="modal"
						data-target="#change-user-pic-modal">点击更换</div>
				</div>
				<div class="user-name">
					<shiro:principal type="java.lang.String" />
				</div>
			</div>
			<div class="user-info-area">
				<div class="info-block">
					<table class="user-info-table">
						<!-- 
						<tr>
							<td class="table-title">版本号</td>
							<td class="table-value">V 2.1.15</td>
						</tr>
						 -->
					</table>
				</div>
				<div class="info-block" style="margin-right: 0">
					<input type="text" style="display: none;"><input
						type="password" style="display: none;">
					<div class="info-block-title info-block-item">修改密码</div>
					<!-- 
					<div class="input-group-cos info-block-item">
						<div class="input-addon">旧密码</div>
						<input class="input-content pwd-input" type="password"
							placeholder="请输入旧密码 " id="old-pwd-input" data-name-id="oldPwd"><i
							class="iconfont icon-x-close input-clear" data-id="old-pwd-input"></i>
					</div>
					 -->
					<div class="input-group-cos info-block-item">
						<div class="input-addon">新密码</div>
						<input class="input-content pwd-input" type="password"
							placeholder="请输入新密码" id="new-pwd-input" data-name-id="newPwd"><i
							class="iconfont icon-x-close input-clear" data-id="new-pwd-input"></i>
					</div>
					<div class="input-group-cos info-block-item">
						<div class="input-addon">确认密码</div>
						<input class="input-content pwd-input" type="password"
							placeholder="请确认新密码" id="new-pwd-input-check"
							data-name-id="newPwdCheck"> <i
							class="iconfont icon-x-close input-clear"
							data-id="new-pwd-input-check"></i>
					</div>
					<div class="pwd-change-input">确认修改</div>
				</div>
			</div>
		</div>
	</div>

	<div class="modal fade bs-example-modal-lg" id="change-user-pic-modal"
		data-backdrop="static" data-keyboard="false" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">更换头像</h4>
				</div>
				<div class="modal-body">
					<input type="file" class="file" id="user-pic-selector">
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-primary" disabled="disabled"
						id="head-pic-addr-submit">确定</button>
				</div>
			</div>
		</div>
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
						id="ensure-modal-submit">确定</button>
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

	<!-- Modal密码修改成功 -->
	<div class="modal fade bs-example-modal-sm" id="pwd-update-modal"
		data-backdrop="static" data-keyboard="false" tabindex="-1"
		role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog modal-sm" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">提示</h4>
				</div>
				<div class="modal-body" id="alert-modal-content">修改密码成功，请重新登录</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" data-dismiss="modal"
						id="pwd-update-logout-button">确定</button>
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
</script>
<!-- 公共组件的打开与关闭
<script type="text/javascript"
	src="js/src/app/common/script/commonComponentOpenAndClose.js"></script> -->
<script type="text/javascript"
	src="js/src/app/page/userCenter/declaration.js?v=2.1.89114"></script>
<!-- bundle.js-->
<script type="text/javascript"
	src="js/src/app/page/userCenter/bundle.js?v=2.1.13"></script>
<script type="text/javascript"
	src="js/src/app/common/script/autosize.js?v=2.1.892223"></script>
<script type="text/javascript">
	function autoSize() {
		$('.auto-min-height').css('min-height', $(window).height() - $('.table-view-search-area').height() - 350);
		$('.dept-content-area').css('height',($(window).height() -240) +'px');
	}
	autoSize();
	window.addEventListener('resize',() => autoSize(),false);
</script>
</html>