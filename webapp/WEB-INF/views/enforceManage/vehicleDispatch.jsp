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
<title>车辆调度</title>
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
<!--百度地图key-->
<script type="text/javascript"
	src="https://api.map.baidu.com/api?v=2.0&ak=PgNHPqzIRsGR1yhs8nkoCtXOZLbwmawp"></script>
<!--百度地图测距工具-->
<script src="js/lib/baidumap/DistanceTool.min.js"></script>
<!--百度地图路况信息控件-->
<script src="js/lib/baidumap/TrafficControl.min.js"></script>
<link rel="stylesheet" href="js/lib/baidumap/TrafficControl.min.css">
<!--百度点聚合-->
<script type="text/javascript"
	src="js/lib/baidumap/TextIconOverlay_min.js"></script>
<!-- <script type="text/javascript"
	src="js/lib/baidumap/MarkerClusterer_min.js"></script> -->
<script type="text/javascript" src="js/lib/baidumap/MarkerClusterer.js"></script>
<!--百度鼠标绘制工具-->
<script type="text/javascript" src="js/lib/baidumap/DrawingManager.js"></script>
<script type="text/javascript" src="js/lib/clipboard/clipboard.min.js"></script>
<link href="js/lib/baidumap/DrawingManager_min.css" rel="stylesheet">
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
<link href="css/page/vehicleDispatch.css?v=2.1.10" rel="stylesheet">
</head>
<style>
.map-search-container{
	position:absolute;
	top:22px;
	left:25px;
	width:329px;
	height:34px;

}
.map-search-input-container{
	position:absolute;
	left:0px;
	top:0px;
	width:279px;
	height:34px;
	background:rgba(255,255,255,1);
	box-shadow:0px 2px 4px 0px rgba(0, 0, 0, 0.36);
}
.map-search-input{
	position: absolute;
    height: 100%;
    overflow: none;
    outline: none;
    border: 0px;
	padding-left: 20px;
	width:160px;
}
.map-search-input-close{
	position: absolute;
	height: 11px;
	width:11px;
	left:164px;
	top:12px;
	display:none;
	cursor:pointer;
}
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
  color: #C2C2C2;
}
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    input[type="number"]{
        -moz-appearance:textfield;
    }
.map-search-line{
	position:absolute;
	top:4px;
	left:185px;
	width:1px;
	height:26px;
	background:rgba(240,240,240,1);
}
.map-search-radius-container{
	position: absolute;
	height: 100%;
	width:calc(100% - 185px);
	right:0px;
	cursor:pointer;
}
.map-search-radius-content {
    position: absolute;
    width: 50px;
    height: 34px;
    font-size: 13px;
    font-weight: 400;
    line-height: 80px;
    z-index: 5000;
    line-height: 34px;
	left: 10px;
	color:#333333;
	text-align:center;
}
.map-search-radius-content-input-container {
	position: absolute;
    width: 50px;
    height: 34px;
    right: 30px;
    display: none;
    background: #fff;
    z-index: 5000;
}
.map-search-radius-content-input {
	position: absolute;
    width: 30px;
    height: 34px;
    font-size: 13px;
    font-weight: 400;
    line-height: 80px;
    z-index: 5000;
    line-height: 34px;
    right: 20px;
    color: #333333;
    text-align: center;
    outline: none;
    border: 0;
}
.map-search-radius-content-span{
	position: absolute;
    width: 20px;
    /* display: none; */
    height: 34px;
    z-index: 99999;
    line-height: 34px;
    right: 0px;
}
.map-search-radius-content:empty:before{
	content: attr(placeholder);   /* element attribute*/
	/*content: 'this is content';*/
	color:#C2C2C2;
}
.map-search-radius-content:focus:before{
	content:none;
}
.map-search-radius-dropdown{
	position:absolute;
	width:10px;
	height:8px;
	right:15px;
	top:12px;
}
.map-search-btn{
    position: absolute;
    top: 0px;
    left: 279px;
    width: 50px;
    height: 35px;
    background: rgba(42,140,255,1);
	box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.36);
	cursor: pointer;
}
.map-search-input-img {
    position: absolute;
    width: 20px;
    height: 20px;
    left: calc(50% - 10px);
    top: calc(50% - 10px);
}
.map-search-radius-choose{
	position:absolute;
	left: 190px;
    top: 42px;
	width:73px;
	height:270px;
	background:rgba(255,255,255,1);
	box-shadow:0px 2px 4px 0px rgba(0, 0, 0, 0.36);
}
.map-search-radius-choose-each{
	position:relative;
	left:4px;
	width:65px;
	height:30px;
	line-height:30px;
	border-bottom:1px rgba(240,240,240,1) solid;
	text-align: center;
    line-height: 30px;
	font-size:13px;
	font-weight:400;
	color:rgba(102,102,102,1);
	cursor:pointer;
}
#tangram-suggestion--TANGRAM__11-main{
	z-index:9999999	
}
td {
    white-space: unset;
    text-overflow: unset;
}
td, th {
    display: table-cell;
    vertical-align: inherit;
}
</style>
<body style="background: url('img/iconpic/bg.png');background-size: 100% 100%;background-color:#000;">
	<header class="top-header" id="top-header"></header>
	<div class="left-menu"></div>
	<div class="guide-frame" style="height:1077px;">
		<div class="guide-title" style="margin-left: -22px;font-size:18px">车辆调度</div>
		<div class="table-view-container" style="width: 96.35%">
            <div class="vehicle-list-container">
                <div class="vehicle-list-switch" id="vehicle-list-switch-dev">车辆列表</div>
                <div class="vehicle-list-switch" id="vehicle-list-switch-group" style="color:rgba(92,116,147,1);left:131px;">车辆编队</div>
                <div class="vehicle-list-line"></div>
                <div class="vehicle-list-dev-container">
                    <div class="vehicle-list-dev-search">
                        <div class="vehicle-list-dev-search-img"></div>
                        <input class="vehicle-list-dev-search-input">
                    </div>
                    <div class="table-view-data-area"></div>
                    <div class="vehicle-list-dev-content">

                    </div>
                </div>
                <div class="vehicle-list-group-container" style="display:none;">
                    <div class="table-view-data-area-group"></div>
                </div>
                <div class="vehicle-list-add-group"></div>
            </div>
            <div class="vehicle-map-container">
		        <div id="allmap"></div>
                <div class="information-in-map">
                    <div class="information-in-map-vehicle-title">车辆数:</div>
                    <div class="information-in-map-vehicle-content">0辆</div>
                    <div class="information-in-map-group-title">组队数:</div>
                    <div class="information-in-map-group-content">0</div>
                </div>
				<div class="map-search-container">

					<div class="map-search-input-container">
						<input class="map-search-input" placeholder='搜中心地点...' id="suggestId"/>
							<img class="map-search-input-close" src="img/icon/inputClose.png">
						    <div id="searchResultPanel" style="border:1px solid #C0C0C0;width:180px;height:auto; display:none;"></div>
						<div class="map-search-line"></div>
						<div class="map-search-radius-container" data-status="0" status="1" data-radius="" data-zoom="14">
							<div class="map-search-radius-content" placeholder="半径"></div>
							<img class="map-search-radius-dropdown" src="img/icon/dropdowngray.png">
						</div>
						<div class="map-search-radius-content-input-container"><input class="map-search-radius-content-input" type="number"><span class="map-search-radius-content-span">km</span></div>
						<div class="map-search-radius-choose" style="float:left;display:none;">
							<div class="map-search-radius-choose-each" status="1">不限</div>
							<div class="map-search-radius-choose-each" status="2" data-radius="5000" data-zoom="14">5km</div>
							<div class="map-search-radius-choose-each" status="2" data-radius="10000" data-zoom="13">10km</div>
							<div class="map-search-radius-choose-each" status="2" data-radius="30000" data-zoom="11">30km</div>
							<div class="map-search-radius-choose-each" status="2" data-radius="50000" data-zoom="11">50km</div>
							<div class="map-search-radius-choose-each" status="2" data-radius="100000" data-zoom="10">100km</div>
							<div class="map-search-radius-choose-each" status="2" data-radius="200000" data-zoom="9">200km</div>
							<div class="map-search-radius-choose-each" status="2" data-radius="500000" data-zoom="7">500km</div>
							<div class="map-search-radius-choose-each" status="3" data-radius="500000" data-zoom="7">自定义</div>
						</div>
					</div>
					<div class="map-search-btn">
						<img class="map-search-input-img" src="img/icon/search.png">
					<div>
				</div>
            </div>
		</div>
	</div>
	</div>
	<!-- 显示加载 -->
	<div class="load-loading">
		<div class="load-loading-area">
			<img class="load-loading-gif" src="img/loading.gif"> <span
				class="load-loading-word">正在加载...</span>
		</div>
	</div>

	<!-- 显示提交 -->
	<div class="submit-loading">
		<div class="loading-area">
			<img class="loading-gif" src="img/loading.gif"> <span
				class="loading-word">正在加载...</span>
		</div>
	</div>
    </div>
    <!-- Modal办案设备信息 -->
    <div class="modal fade bs-example-modal-lg" id="vehicleDispatch-add-modal"
    data-backdrop="static" data-keyboard="false" tabindex="-1"
    role="dialog" aria-labelledby="myLargeModalLabel" style="background:rgb(3,12,25,0.8)">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content" style="width: 510px; left: 234px;">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"
                        aria-label="Close">
                        <span aria-hidden="true" class="add-user-close"></span>
                    </button>
                    <h4 class="modal-title" id="vehicle-modal-title">新增车辆编队</h4>
                </div>
                <div class="modal-body">
                    <div class="modal-group-name-contanier">
                        <div class="modal-group-name-title">队伍名称</div>
                        <input class="modal-group-name-content">
                        <div class="modal-group-name-tips">请填写队伍名称</div>
                    </div>
                    <div class="modal-group-vehicle-contanier">
                        <div class="modal-group-vehicle-title">已选车辆</div>
                        <div class="modal-group-vehicle-content"></div>
                        <div class="modal-group-vehicle-tips">请勾选车辆</div>
                    </div>
                    <div class="modal-group-vehicle-list-contanier">
                        <div class="modal-group-vehicle-list-title">车辆列表</div>
                        <div class="modal-group-vehicle-list-img"></div>
                        <input class="modal-group-vehicle-list-input">
                        <div class="modal-group-vehicle-list-content">
                            <%-- <div class="data-member" id="鄂A·87081" data-status=0 data-id="1">
                                <span id="1" class="select-dev-block"></span>
                                <span class="data-display">鄂A·87082</span>
                            </div>
                            <div class="data-member" id="鄂A·87082" data-status=0 data-id="2">
                                <span id="2" class="select-dev-block"></span>
                                <span class="data-display">鄂A·87082</span>
                            </div> --%>
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-red" style="position:absolute;left:65px;display:none" id="dismissGroup">解散编队</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-blue" id="groupSure" style="margin-right: 28px;">确定</button>
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
</body>
<script type="text/javascript">
	const username = "${sessionScope.user.username}";
	const menuList = <%=session.getAttribute("menuPerms")%>;
    const projectUrl = "${pageContext.request.serverName}${':'}${pageContext.request.serverPort}${pageContext.request.contextPath}";

</script>
<script type="text/javascript"
	src="js/src/app/page/vehicleDispatch/declaration.js?v=2.1.891114"></script>
    <script type="text/javascript">
	let map = new BMap.Map('allmap', {
		enableMapClick : false
	}); // 禁用显示标注详细信息
	map.centerAndZoom('中国', 5);
	// map.centerAndZoom(new BMap.Point(99.952789,32.742493), 6);
		/* 添加地图类型控件*/
	map.addControl(new BMap.MapTypeControl({
		mapTypes : [ BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP, BMAP_HYBRID_MAP ]
	}));
	/* 添加地图类型控件*/
	// map.addControl(new BMap.MapTypeControl({
	// 	mapTypes : [ BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP, BMAP_HYBRID_MAP ],
	// 	anchor : BMAP_ANCHOR_TOP_LEFT,
	// 	offset : new BMap.Size(65, 70)
	// }));
	/* 开启鼠标滚轮缩放*/
	map.enableScrollWheelZoom(true);
	/* 禁止双击放大*/
	map.disableDoubleClickZoom();
	/* 开启键盘控制功能*/
	map.enableKeyboard();
	/* zoom缩小，触发显示点聚合*/
	map.setZoom(6);
    </script>
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
	src="js/src/app/page/vehicleDispatch/bundle.js?v=2.1.892226"></script>
<script type="text/javascript"
	src="js/src/app/common/script/autosize.js?v=2.1.892224"></script>
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