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
<title>车辆管理</title>
<script src="js/lib/jquery/jquery-3.2.1.min.js"></script>
<link rel="stylesheet" href="js/lib/bootstrarp/css/bootstrap.min.css">
<script src="js/lib/bootstrarp/js/bootstrap.min.js"></script>
<!--百度地图key-->
<script type="text/javascript" src="https://api.map.baidu.com/api?v=2.0&ak=PgNHPqzIRsGR1yhs8nkoCtXOZLbwmawp"></script>
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
<link href="css/page/vehicleManage.css?v=2.1.10" rel="stylesheet">
</head>
<body style="background: url('img/iconpic/bg.png'); background-size: 100% 100%;background-color: rgb(29, 33, 39);">
	<!-- 添加头部导航栏 -->
	<header class="top-header" id="top-header"></header>
	<div class="left-menu"></div>
	<div class="guide-frame">
		<div class="guide-title" style="margin-left: -22px">车辆管理</div>
		<div class="table-view-container" style="width: 96.35%;">
			<div id="table-view-container-box" style="background: #07203e; height: 85px;"> 
				<div class="table-view-search-area">
                    <!-- 车辆编号 -->
					<div class="input-group input-group-sm search-item search-item-width-sm">
						<span class="input-group-addon input-group-title" id="query-id">车辆编号</span>
						<input type="text" class="form-control input-background"
							id="vehicleNum-value" aria-describedby="basic-addon3">
					</div>
                    <!-- 车牌号 -->
					<div class="input-group input-group-sm search-item search-item-width-sm">
						<span class="input-group-addon input-group-title" id="query-id">车牌号</span>
						<input type="text" class="form-control input-background"
							id="plateNum-value" aria-describedby="basic-addon3">
					</div>
					<!-- 所属机构 -->
					<div class="input-group input-group-sm search-item search-item-width-sm">
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
							<span id="dept-query-selector-remove" class="glyphicon glyphicon-remove-circle" aria-hidden="true"
								style="display: none; position: absolute; top: 7px; right: 30px; color: rgb(204, 204, 204); z-index: 100; cursor: pointer;"></span>
							<ul class="dropdown-menu" style="width: 220px;">
								<div id="dept-query-selector-container"
									style="width: 218px; min-height: 50px; max-height: 350px; height: auto; background: #fff; border-radius: 3px; overflow-x: auto; overflow-y: auto; z-index: 1000;">
									<div class="ztree" id="dept-query-selector-tree"></div>
								</div>
							</ul>
						</div>
					</div>
                    <!-- 管理者 -->
					<div class="input-group input-group-sm search-item search-item-width-sm">
						<span class="input-group-addon input-group-title" id="query-id">管理者(账号/姓名)</span>
						<input type="text" class="form-control input-background"
							id="managerName-value" aria-describedby="basic-addon3">
					</div>
				</div>
				<div class="search-simple-rule"></div>
				<!-- 搜索 -->
				<div class="table-view-search-btn">
					<div class="guide-search-btn mdui-ripple">
					</div>
				</div>
			</div>
			<!-- 正文 -->
			<div class="table-view-data-area auto-min-height">
				<!-- 表格 -->
				<table class="view-data-table">
					<thead>
						<tr>
							<th colspan="15">
								<div id="table-thead"
									style="height: 35px; line-height: 35px; margin-left:10px;">
									<!-- 删除车辆按钮 -->
									<button type="button" class="table-th-btn btn-red"style="margin-top:4px;"
										id="del-dev-btn">
										<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>&nbsp;删除	
									</button>
								</div>
							</th>
						</tr>
                        <tr class="tbody-th">
                            <th style="width: 50px !important;height:42px">
                                <label class="mdui-checkbox">
                                    <input type="checkbox" class="checkbox-all"/>
                                    <i class="mdui-checkbox-icon"></i>
                                </label>
                            </th>
                            <th>车辆编号</th>
                            <th>车牌号</th>
                            <th>车辆类型</th>
                            <th>品牌型号</th>
                            <th>所属机构</th>
                            <th>管理者姓名</th>
							
							<th>使用人姓名</th>
							
                            <th>实时地点</th>
                            <th>实时GPS</th>
                            <th class = "confirmTimeBox">列装时间</th>
                            <th style="width: 20% !important; height:42px">备注</th>
                            <th>操作</th>
                        </tr>
					</thead>
					<tbody id="table-tbody"></tbody>
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
                            <span class="show-item-num" style="display: block; float: left;">20条</span> <span class="caret"style="display: block;float: left;margin-top:3px;
                                width: 12px;height: 12px;border: none;margin-left:6px;background: url('img/iconpic/eig-slideup.png');background-size:100% 100%;"></span>
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
		<!-- Modal查看信息 -->
		<div class="modal fade" id="devinfo-view-modal" data-backdrop="static"
			data-keyboard="false" tabindex="-1" role="dialog"
			aria-labelledby="myModalLabel">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
		                    <span aria-hidden="true" class="add-user-close"></span>
						</button>
						<h4 class="modal-title">查看车辆信息</h4>
					</div>
					<div class="modal-body" id="dev-info-content"></div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					</div>
				</div>
			</div>
		</div>
		<!-- Modal车辆信息 -->
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
		                    <span aria-hidden="true" class="add-user-close"></span>
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
		                    <span aria-hidden="true" class="add-user-close"></span>
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
		<!--确认模态框-->
		<div class="modal fade bs-example-modal-sm" id="ensure-modal"
			data-backdrop="static" data-keyboard="false" tabindex="-1"
			role="dialog" aria-labelledby="myModalLabel">
			<div class="modal-dialog modal-sm" role="document">
				<div class="modal-content">
					<div class="modal-header" style="margin-left:8px;">
						<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
		                    <span aria-hidden="true" class="add-user-close"></span>
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
	<!-- 标注车辆位置地图模态框 -->
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
					<h4 class="modal-title">实时GPS</h4>
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
	<!-- 管理下属设备 -->
	<div class="modal fade bs-example-modal-lg" id="vehicle-dev-manage-modal"
		data-backdrop="static" data-keyboard="false" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content" style="width:800px;">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" class="add-user-close"></span>
					</button>
					<h4 class="modal-title h4-devManage">下属设备管理</h4>
				</div>
				<div class="modal-body">
					<div class="vehicle_dev_title">
						<div class="vehicle_dev_title_div">所有设备列表</div>
						<div class="vehicle_dev_title_span">已选设备列表</div>
					</div>
					<div style="width: 100%; height: 500px;">
						<div class="container_left_dev">
							<!--搜索设备-->
							<div class="search_button"></div>
							<input id="search_dev"/>
							<!--展示所有设备-->
							<div id="dev-table-tbody" class="dev-selector-modal-container vehicle_dev_selector_scroll"></div>
						</div>
						
						<!--已选择的设备-->
						<div class="dev-selected-modal-container vehicle_dev_selector_scroll" id="dev-selected-area">
							
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" id="vehicle-modal-submit">确定</button>
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
	src="js/src/app/page/vehicleManage/declaration.js?v=2.1.892223"></script>
<!-- bundle.js -->
<script type="text/javascript"
	src="js/src/app/page/vehicleManage/bundle.js?v=2.1.892227"></script>
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