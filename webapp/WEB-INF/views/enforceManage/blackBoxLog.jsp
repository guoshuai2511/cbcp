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
<title>黑匣子日志管理</title>
<script src="js/lib/jquery/jquery-3.2.1.min.js"></script>
<link rel="stylesheet" href="js/lib/bootstrarp/css/bootstrap.min.css">
<script src="js/lib/bootstrarp/js/bootstrap.min.js"></script>
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
<link href="css/page/blackBoxLog.css?v=2.1.10" rel="stylesheet">
</head>
<body style="background: url('img/iconpic/bg.png');background-size: 100% 100%;background-color:#000;">
	<header class="top-header" id="top-header"></header>
	<div class="left-menu"></div>
	<div class="guide-frame" style="height:1077px;">
		<div class="guide-title" style="margin-left: -22px">黑匣子日志管理</div>
		<div class="table-view-container" style="width: 96.35%;">
			<div id="table-view-container-box" style="background: #07203e;"> 
				<div class="table-view-search-area">
					<!-- 案件名称 -->
					<div
						class="input-group input-group-sm search-item search-item-width-sm">
						<span class="input-group-addon input-group-title"
							id="query-case-name">案件名称</span> <input type="text"
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
					<!-- 办案人 -->
					<div
						class="input-group input-group-sm search-item search-item-width-sm">
						<span class="input-group-addon input-group-title"
							id="query-case-operator">办案人</span> <input type="text"
							class="form-control input-background" id="case-operator-value">
					</div>
					<!-- 所属机构 -->
					<div
						class="input-group input-group-sm search-item search-item-width-sm">
						<span class="input-group-addon input-group-title"
							id="query-phone-num">所属机构</span>
						<div class="btn-group">
							<button type="button" id="dept-selector-button"
								style="width: 236px; text-align: left;border: none;background: #011731;color: rgb(204, 204, 204);"
								class="btn btn-default btn-sm dropdown-toggle"
								data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								<span id="dept-query-selector-input" data-dept-id=""
									style="color: #fff;">&nbsp;</span> <span
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
					<!-- 办案时间 -->
					<div class="input-group input-group-sm search-item search-item-width-sm case-time-fix">
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
								<div
									style="height: 20px; line-height: 20px;margin-top: 6px;margin-left:10px;display:inline-block">
									<!-- 新增设备按钮 --> 
									<button type="button" class="table-th-btn btn-green"
										id="add-phone-btn">
										<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>&nbsp;新增 
									</button>
								</div>
								<div id="table-thead">
									<button type="button" class="table-th-btn btn-green" id="add-download-btn" onclick="window.location.href='enforceManage/blackBoxLog/export'">导出</button>
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
				<!-- Modal用户信息 -->
		<div class="modal fade" id="blackBoxlog-modal" data-backdrop="static"
		data-keyboard="false" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel">
			<div class="modal-dialog" role="document" style="width:800px;">
				<div class="modal-content" id="blackBoxlog-input-modal">

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
						<button type="button" class="btn btn-primary" data-dismiss="modal"
							id="dept-selector-ensure">确定</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>
				<!-- Modal办案设备信息 -->
		<div class="modal fade bs-example-modal-lg" id="devAndVehicle-modal"
		data-backdrop="static" data-keyboard="false" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel">
			<div class="modal-dialog modal-lg" role="document">
				<div class="modal-content" style="width: 600px; left: 144px;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true" class="add-user-close"></span>
						</button>
						<h4 class="modal-title">办案设备</h4>
					</div>
					<div class="modal-body">
						<div class="devSelectFirst">
							<span class="chooseType">类型</span>
							<span id="chooseDev" data-status=1>
								<span class="select-ball select-ball-active"></span>
								<span class="select-word">设备</span>
							</span>
							<%-- <span id="chooseVehicle"data-status=0>
								<span class="select-ball"></span>
								<span class="select-word">车辆</span>
							</span> --%>
						</div>
						<input id="searchDev" maxlength="20"/>
						<div class="devListTitle" style="padding-left: 46px;">设备列表</div>
						<div id="devDisplayList" class="dwCaseManageScroll">

						</div>
						<div class="devSelectSecond" style="margin-left: 36px;">
							<span style="font-size: 16px;">已选设备</span>
							<div id="devSelectedArea"></div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
						<button type="button" class="btn btn-blue" id="devSure" style="margin-right: 28px;">确定</button>
					</div>
				</div>
			</div>
		</div>
</body>
<script type="text/javascript">
	const username = "${sessionScope.user.username}";
	const menuList = <%=session.getAttribute("menuPerms")%>;
		console.log("${net.sf.json.JSONObject(sessionScope.user.roleList)}");
</script>
<script type="text/javascript"
	src="js/src/app/page/blackBoxLog/declaration.js?v=2.1.891113"></script>
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
	src="js/src/app/page/blackBoxLog/bundle.js?v=2.1.15"></script>
<script type="text/javascript"
	src="js/src/app/common/script/autosize.js?v=2.1.892223"></script>
<script type="text/javascript">

	function autoSize() {
		$('.auto-min-height').css('min-height', $(window).height() - $('.table-view-search-area').height() - 350);
		/* $('.realCL-devCode').css('width', ($(window).width() - 1025) * 0.45); */
		//$('.devCode').css('width', ($(window).width() - 1025) * 0.45);
		//$('.remaker').css('width', ($(window).width() - 1085) * 0.55);
        //$('.realCL-remark').css('width', ($(window).width() - 1085) * 0.33);
	}
	autoSize();
	window.addEventListener('resize',() => autoSize(),false);
</script>
</html>