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
<title>日志管理</title>
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
<link href="css/table/table-view.css?v=2.1.10" rel="stylesheet">
<style>


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

/*add by guoshuai start 2018-10-9*/

.search-simple-rule{
	float:right;
}
.table-view-search-btn{
	float: left;
	width: 18%;
}
.guide-search-btn{
	width: 35%;
	margin-top: 8.6%;
}
.search-simple-rule{
	border-left:1px solid #03172f;
	border-right:1px solid #0e3463;
	height: 172px;
	margin-top: 8px;
	float: left;
}
td{
	text-align: center;
}
#table-view-container-box{
	height:188px;
}
.input-data-picker-md{
	float: left;
}
#imei-code-value{
	margin-left: 13px;
    width: 235px;
}
.tbody-th{
	border-top: 1px solid #174275 !important;
}
#add-download-btn{
	background: url('img/iconpic/download.png') 4px 6px no-repeat;
    background-size: 20% 50%;
    width: 60px;
    height: 28px;
    padding-left: 20px;
	background-color: rgb(94, 185, 94);
	font-size:15px;
	margin-top: 6px;
}
.view-data-table{
	width: 99%;
}
#table-thead{
	width: 80px;
    height: 40px;
    position: relative;
    float: right;
    top: 1px;
}
.caseName{
	width:200px;
	white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.workTarget{
	width:200px;
	white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.phone{
	width:108px;
	white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.imsi{
	width:160px;
	white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.imei{
	width:160px;
	white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.devCode{
	width:360px;
	white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.applicantTime{
	width:150px;
	white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.applicantName{
	width:110px;
	white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.remaker{
	width:;
	white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.realCL-devCode{
	width:230px;
	white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0 auto;
}
.realCL-remark{
	width:200px;
	white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0 auto;
}
.realCL-caseName{
	width:120px;
	margin: 0 auto;
	white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.realCL-time{
	width:152px;
	margin: 0 auto;
	white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.realCL-workTarget{
	width:80px;
	margin: 0 auto;
	white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.realCL-realName{
	width:80px;
	margin: 0 auto;
	white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.realCL-phone{
	width:100px;
	margin: 0 auto;
	white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.realCL-imsi{
	width:128px;
	margin: 0 auto;
	white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
} 
.realCL-imei{
	width:128px;
	margin: 0 auto;
	white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
@media screen and (max-width: 1440px) {
	#table-view-container-box{
		height:237px;
	}
	.search-simple-rule{
		height:218px;
	}
}

@media screen and (max-width: 1366px) {
	.realCL-devCode{
		width:190px;
	}
	.realCL-remark{
		width:200px;
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
@media screen and (max-width: 1280px){
	.realCL-remark {
		width: 149px;
	}
}
/*add by guoshuai end 2018-10-9*/
</style>
</head>
<body style="background: url('img/iconpic/bg.png');background-size: 100% 100%;background-color:#000;">
	<header class="top-header" id="top-header"></header>
	<div class="left-menu"></div>
	<div class="guide-frame" style="height:1077px;">
		<div class="guide-title" style="margin-left: -22px">黑匣子管理</div>
		<div class="table-view-container" style="width: 96.35%;">
			<div id="table-view-container-box" style="background: #07203e;"> 
				<div class="table-view-search-area">
					<!-- 作战名称 -->
					<div
						class="input-group input-group-sm search-item search-item-width-sm">
						<span class="input-group-addon input-group-title"
							id="query-case-name">作战名称</span> <input type="text"
							class="form-control input-background" id="case-name-value">
					</div>
					<!-- 工作对象 -->
					<div
						class="input-group input-group-sm search-item search-item-width-sm">
						<span class="input-group-addon input-group-title"
							id="query-work-object">工作对象</span> <input type="text"
							class="form-control input-background" id="work-object-value">
					</div>
					<!-- 电信标识码 -->
					<div
						class="input-group input-group-sm search-item search-item-width-sm">
						<span class="input-group-addon input-group-title"
							id="query-tel-code">电信标识码</span> <input type="text"
							class="form-control input-background" id="tel-code-value"
							maxlength="11">
					</div>
					<!-- IMSI码 -->
					<div
						class="input-group input-group-sm search-item search-item-width-sm">
						<span class="input-group-addon input-group-title"
							id="query-imsi-code">IMSI码</span> <input type="text"
							class="form-control input-background" id="imsi-code-value"
							maxlength="15">
					</div>
					<!-- IMEI码 -->
					<div
						class="input-group input-group-sm search-item search-item-width-sm">
						<span class="input-group-addon input-group-title"
							id="query-imei-code">IMEI码</span> <input type="text"
							class="form-control input-background" id="imei-code-value"
							maxlength="15">
					</div>
					<!-- 设备名称 -->
					<div
						class="input-group input-group-sm search-item search-item-width-sm">
						<span class="input-group-addon input-group-title"
							id="query-dev-name">设备名称</span> <input type="text"
							class="form-control input-background" id="dev-name-value">
					</div>
					<!-- 申请人 -->
					<div
						class="input-group input-group-sm search-item search-item-width-sm">
						<span class="input-group-addon input-group-title"
							id="query-case-operator">申请人</span> <input type="text"
							class="form-control input-background" id="case-operator-value">
					</div>
					<!-- 办案时间 -->
					<div style="width: 480px;"
						class="input-group input-group-sm search-item search-item-width-sm">
						<span class="input-group-addon input-group-title"
							id="query-case-time">办案时间</span> 
							<input type="text" id="query-time-start-time-console" 
								class="form-control input-background input-data-picker-md"
								onclick="WdatePicker({maxDate:'#F{$dp.$D(\'query-time-end-time-console\')||\'%y-%M-%d\'}',dateFmt:'yyyy-MM-dd HH:mm:ss'})">
							<span class="input-inwords">至</span>
							<input type="text"id="query-time-end-time-console"
								class="form-control input-background input-data-picker-md"
								onclick="WdatePicker({minDate:'#F{$dp.$D(\'query-time-start-time-console\')}',maxDate:'%y-%M-%d',dateFmt:'yyyy-MM-dd HH:mm:ss'})">
					</div>
			</div>
			<div class="search-simple-rule"></div>
			<!-- 搜索 -->
			<div class="table-view-search-btn">
				<div class="guide-search-btn mdui-ripple"></div>
			</div>
			<!-- 正文 -->
			<div class="table-view-data-area auto-min-height" style="min-height:0px;">
				<!-- 表格 -->
				<table class="view-data-table" style="border-top: none;">
					<thead>
						<tr>
							<th colspan="11" style="/* border: none !important; background: none !important; */">
								<div id="table-thead">
									<button type="button" class="table-th-btn btn-green" id="add-download-btn" onclick="window.location.href='systemManage/realCaseLog/export'">导出</button>
								</div>
							</th>
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
	<!-- 显示加载 -->
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
<script type="text/javascript"
	src="js/src/app/page/realCaseLogManage/declaration.js?v=2.1.891113"></script>
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
	src="js/src/app/page/realCaseLogManage/bundle.js?v=2.1.15"></script>
<script type="text/javascript"
	src="js/src/app/common/script/autosize.js?v=2.1.892223"></script>
<script type="text/javascript">

	function autoSize() {
		$('.auto-min-height').css('min-height', $(window).height() - $('.table-view-search-area').height() - 350);
		$('.realCL-devCode').css('width', ($(window).width() - 1025) * 0.45);
		//$('.devCode').css('width', ($(window).width() - 1025) * 0.45);
		//$('.remaker').css('width', ($(window).width() - 1085) * 0.55);
        //$('.realCL-remark').css('width', ($(window).width() - 1085) * 0.33);
	}
	autoSize();
	window.addEventListener('resize',() => autoSize(),false);
</script>
</html>