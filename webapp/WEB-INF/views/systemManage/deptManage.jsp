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
<title>组织机构管理</title>
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
<!-- CheckBox美化 -->
<link rel="stylesheet"
	href="js/lib/beauty-checkbox/dist/css/checkbix.min.css">
<script src="js/lib/beauty-checkbox/dist/js/checkbix.min.js"></script>
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
<link href="css/table/table-view.css?v=2.1.10" rel="stylesheet">
<style>
.modal-header{
	width: 95.5%;
    margin-left: 28px;
    border-bottom: 1px solid #23b5e8;
}

.modal-title {
	color: rgb(35, 220, 255);
}

.modal-content {
	top: 80px;
	/* background: rgb(51, 51, 51); */
	background: #08264a; 
	color: #dedede;
}

.modal-footer {
	border-top: 1px solid #08264a;
}

/*滚动条样式*/
textarea, .dept-content-area-each::-webkit-scrollbar { /*滚动条整体样式*/
	width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
	height: 4px;
}

textarea, .dept-content-area-each::-webkit-scrollbar-thumb {
	/*滚动条里面小方块*/
	border-radius: 3px;
	-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	background: rgba(255, 255, 255, 0.4);
}

textarea, .dept-content-area-each::-webkit-scrollbar-track { /*滚动条里面轨道*/
	-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	border-radius: 0;
	background: rgba(255, 255, 255, 0.1);
}

.modal-input {
	margin-top: 30px;
}

.modal-input-title {
	width: 150px;
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
	background: rgb(70, 70, 70) !important;
}

.modal-input-background {
	border-color: rgb(150, 150, 150);
	background: rgb(40, 40, 40) !important;
	color: #dedede;
}

.input-tip-img {
	width: 20px;
	height: 20px;
	position: relative;
	float: left;
	margin-top: 5px;
	margin-left: 10px;
}

.dropdown-menu-selector:hover {
	background: rgba(140, 140, 140, 0.4) !important;
}

.dept-btn-area {
	margin-top: 30px;
	position: relative;
	z-index: 100;
}

.dept-control-btn {
	color: #fff !important;
	margin-right: 5px;
}

.dept-content-area {
	width: 96%;
	position: relative;
	margin-top: 20px;
}

.dept-content-area-each {
	/*delete by guoshuai start 2018-9-29
	height: 100%;
	delete by guoshuai end 2018-9-29*/
	/*add by guoshuai start 2018-9-29*/
	height:98%;
	/*add by guoshuai end 2018-9-29*/
	position: relative;
	float: left;
	border: 1px solid #174275;
	border-radius: 5px;
	overflow: auto;
	margin-right:2%;
}

.dept-personnel {
	width: 300px;
	height: auto;
	min-height: 74px;
	background: rgb(40, 40, 40);
	border: 1px solid rgb(150, 150, 150);
	border-radius: 3px;
	overflow: hidden;
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

.update-btn {
	position: relative;
	margin-left: 150px;
	margin-top: 30px;
}

.input-check {
	float: left;
	line-height: 30px;
	margin-left: 10px;
	margin-right: 10px;
}

.dept-modal-area {
	width: 46%;
	/* height: 500px; */
	position: relative;
	float: left;
	margin-left: 1%;
	margin-right: 3%;
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
	/* position: absolute; */
	bottom: 0;
	border: 1px solid #174275;
	border-radius: 5px;
	overflow: auto;
}

.item-close {
	font-size: 12px;
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

/* 模态框中表格样式*/
.view-data-table-in-modal {
	width: 96%;
	position: relative;
	margin-top: 15px;
	left: 2%;
	color: #dedede;
	/* border: 1px solid rgb(100, 100, 100) !important; */
	border-left: 1px solid #174275 !important;
    border-top: 1px solid #174275 !important;
}

.modal-in-page-selector {
	width: 96%;
	margin-left: 2%;
	margin-top: 30px;
}

.no-data-tablesarch-in-modal {
	display: none;
	width: 320px;
	height: 70px;
	margin-left: calc(50% - 170px);
	margin-top: 165px;
	font-size: 25px;
	color: rgb(14, 144, 210);
	text-align: center;
	line-height: 70px;
}

.no-data-icon-in-modal {
	width: 70px;
	height: 70px;
}

.no-data-word-in-modal {
	margin-left: 10px;
}
/*add by guoshuai start 2018-10-19*/
td{
	text-align: center;
}
.table-view-container {
    width: 96%;
    left: 37px;
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
#dept-update-input-name ,#dept-update-input-parentId ,#dept-update-input-remark{
	border:1px solid #174275;
	background-color:#011731 !important;
}

.dept-modal-area-one {
	width:98%;
}

.dept-modal-area-2 {
	width:98%;
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

.dept-selector-modal-container-selected{
	height:36px;
	background: #011731;
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
/*add by guoshuai start 2018-10-19*/
</style>
</head>
<!-- delete by guoshuai start 2018-9-29
<body style="background: rgb(29, 33, 39)">
delete by guoshuai end 2018-9-29-->
<!--add by guoshuai start 2018-9-29-->
<body style="background: url('img/iconpic/bg.png');
	background-size: 100% 100%;background-color:rgb(29, 33, 39);">
<!--add by guoshuai end 2018-9-29-->
	<header class="top-header" id="top-header"> <!-- <span class="header-current-weather header-info-txt"></span> <span
		class="header-current-time header-info-txt"></span> --></header>
	<div class="left-menu"></div>

	<div class="guide-frame">
		<div class="guide-title" style="margin-left:-22px;">组织机构管理</div>
		<div class="guide-title-line"></div>
		<ul class="nav nav-tabs guide-nav">
		</ul>
		<div class="table-view-container">
			<div class="dept-btn-area">
				<button id="add-dept-btn"
					class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-blue dept-control-btn">新增组织</button>
				<button id="delete-dept-btn"
					class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-pink dept-control-btn">删除组织</button>
			</div>
			<div id="dept-content-title"
				style="position: absolute; left: 35%; top: 35px; font-size: 23px; /*color: #dedede;*/color: #23b5e8;"></div>
			<div class="dept-content-area">
				<div class="dept-content-area-each" style="width: 30%;">
					<div class="ztree" id="dept-show-area"></div>
				</div>
				<div class="dept-content-area-each" id="dept-info-panel"
					style="width: 66%;"></div>
			</div>
		</div>
	</div>

	<!-- 组织机构选择 -->
	<div class="modal fade bs-example-modal-lg" id="dept-selector-modal"
		data-backdrop="static" data-keyboard="false" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header" style="margin-left:18px;">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<!-- 
						<span aria-hidden="true">&times;</span>
						 -->
						<!--add by guoshuai start 2018-10-15-->
		                <span aria-hidden="true" class="add-user-close"></span>
		                <!--add by guoshuai end 2018-10-15-->
					</button>
					<h4 class="modal-title">机构选择</h4>
				</div>
				<div class="modal-body" style="height:auto;overflow:hidden;">
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

	<!-- 下属人员 -->
	<div class="modal fade bs-example-modal-lg" id="dept-user-modal"
		data-backdrop="static" data-keyboard="false" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel">
		<div class="modal-dialog modal-lg" role="document"
			style="width: 1200px;">
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
					<h4 class="modal-title" id="dept-user-title"></h4>
				</div>
				<div class="modal-body">
					<div style="min-height: 430px;">
						<table class="view-data-table-in-modal">
							<tbody id="table-tbody">
							</tbody>
						</table>
						<div class="no-data-tablesarch-in-modal">
							<img class="no-data-icon-in-modal"
								src="img/no_data_icon_search.png"> <span
								class="no-data-word-in-modal">该机构无下属人员</span>
						</div>
					</div>
					<!-- 底部分页 -->
					<div class="modal-in-page-selector">
						<div class="item-count-selector">
							每页：
							<div class="btn-group dropup">
								<button type="button" style="background: #08264a;color: #fff;border: 1px solid #174275;"
									class="btn btn-default btn-sm dropdown-toggle"
									data-toggle="dropdown" aria-haspopup="true"
									aria-expanded="false">
									<span class="show-item-num" style="float:left;">10条</span> <span class="caret" style="
										    display: block;
											float: left;
											margin-top: 3px;
											width: 12px;
											height: 12px;
											border: none;
											margin-left: 6px;
											background: url(img/iconpic/eig-slideup.png);
											background-size: 100% 100%;
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
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
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
				<div class="modal-header" style="margin-left:6px;">
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
</script>
<script type="text/javascript">
	function autoSize() {
		$('.auto-min-height').css('min-height', $(window).height() - $('.table-view-search-area').height() - 350);
		$('.dept-content-area').css('height',($(window).height() -240) +'px');
	}
	autoSize();
	window.addEventListener('resize',() => autoSize(),false);
</script>
<script type="text/javascript"
	src="js/src/app/page/deptManage/declaration.js?v=2.1.891112"></script>
<!-- bundle.js-->
<script type="text/javascript"
	src="js/src/app/page/deptManage/bundle.js?v=2.1.891115"></script>
<script type="text/javascript"
	src="js/src/app/common/script/autosize.js?v=2.1.892223"></script>
</html>