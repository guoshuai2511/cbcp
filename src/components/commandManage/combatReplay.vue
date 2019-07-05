<template>
  <div class="combatReplayPage" v-wechat-title="$route.meta.title">
    <div class="map-area-container" style="display: none;">
		<div id="allmap"></div>
		<div class="top-map-navigation">
			<div class="case-name" id="case-users" title=""></div>
			<div class="target-icon"></div>
			<div class="target-title">目标</div>
			<div class="target-name" data-info-num=""></div>
			<div class="ta-info-btn">详情</div>
			<div class="target-lte-info-btn">高级</div>
			<div class="channel-icon"></div>
			<div class="channel-title">解析</div>
			<div class="channel-info-container">
				<div class="channel-info-title">LTE：</div>
				<div class="channel-info-value-item" id="data-channel-lte">&nbsp;&nbsp;0</div>
				<div class="channel-info-title">WCDMA：</div>
				<div class="channel-info-value-item" id="data-channel-wcdma">&nbsp;&nbsp;0</div>
				<div class="channel-info-title">CDMA：</div>
				<div class="channel-info-value-item" id="data-channel-cdma">&nbsp;&nbsp;0</div>
				<div class="channel-info-title">GSM：</div>
				<div class="channel-info-value-item" id="data-channel-gsm">&nbsp;&nbsp;0</div>
			</div>
			<div class="channel-info-btn">高级</div>
			<div class="sms-info-icon"></div>
			<div class="sms-info-container">
				<div class="sms-info-title">发送：</div>
				<div class="sms-info-item" id="sms-send-value" data-sms-send="">0</div>
				<div class="sms-info-title">成功：</div>
				<div class="sms-info-item"  id="sms-finish-value" data-sms-success="">0</div>
				<div class="sms-info-title">回执：</div>
				<div class="sms-info-item"  id="sms-receipt-value" data-sms-receipt="">0</div>
			</div>
			<div class="activedev-info-icon-new"></div>
			<div class="activedev-info-title">主动式未命中</div>
			<div class="activedev-info-value" data-activedev-value=""></div>
			<div class="activedev-info-time" data-activedev-time=""></div>
			<div class="activedev-info-btn">详情</div>
			<div class="tools-btn-container">
				<div class="tools-each-icon" id="dev-route-line-switch"
					data-dev-route-line-status="1" title="设备轨迹" style="background:url(../../../static/img/icon/car_load_active.png)no-repeat;"></div>
				<div class="tools-each-icon"  id="eng-orientation-switch"
					data-eng-orientation-status="1" style="left:15px;background:url(../../../static/img/icon/eng_load_active.png)no-repeat;"
				title="能量轨迹"></div>
				<div class="tools-each-icon" id="passive-route-line-switch"
					data-passive-route-line-status="1"
					data-switch-close="0"
				style="left:30px;background:url(../../../static/img/icon/active_load.png)no-repeat;" title="主动式轨迹"></div>
				<div class="tools-each-icon" id="bts-show-switch" data-bts-show-status="1"
				 style="left:45px;background:url(../../../static/img/icon/bts_icon_active.png)no-repeat;" title="基站"></div>
				<div class="tools-each-icon"
				id="ta-prod-show-switch" data-ta-prod-show-status="1"
				 style="left:60px;background:url(../../../static/img/icon/ta_pro_active.png)no-repeat;" title="产品化绘图"></div>
				<div class="tools-each-icon"
				id="ta-debug-show-switch" data-ta-debug-show-status="1"
				 style="left:75px;background:url(../../../static/img/icon/ta_debug_active.png)no-repeat;" title="调试绘图"></div>
				<div class="tools-each-icon" id="map-traffic-switch"
					data-traffic-status="0"
				 style="left:90px;background:url(../../../static/img/icon/traffic.png)no-repeat;" title="路况信息"></div>
			</div>
			<button class="stop-btn-container" id="stop-btn" style="border:0;outline:0;" data-toggle="modal" data-target="#reset-search-modal"></button>
		</div>
		<div class="map-typeswich-container">
			<div class="map-typeswich-item" id="map-type-normal" style="color:rgba(255,255,255,1);">地图</div>
			<div class="map-typeswich-dividingline"></div>
			<div class="map-typeswich-item" id="map-type-satellife" style="background:rgba(255,255,255,1);">卫星</div>
			
		</div>
		<div class="view-lock-btn" data-status=1>
			<div style="width:16px;height:16px;margin:5px;background:url(../../../static/img/icon/location_active.png)no-repeat;"></div>
		</div>
		<div class="view-narrow-btn" data-status=1>
			<div style="width:16px;height:16px;margin:5px;background:url(../../../static/img/icon/zoomout_active.png)no-repeat;"></div>
		</div>
		<div class="view-enlarge-btn" data-status=1>
			<div style="width:16px;height:16px;margin:5px;background:url(../../../static/img/icon/zoomin.png)no-repeat;"></div>
		</div>
		<div class="view-color-container">
			<div class="view-color-legend"></div>
				<div class="view-color-line" style="right:10px;top:1px;"></div>
				<div class="view-color-value" style="right:12px;top:-2px;">255</div>
				<div class="view-color-line" style="right:10px;top:16px;"></div>
				<div class="view-color-value" style="right:12px;top:13px;">200</div>
				<div class="view-color-line" style="right:10px;top:31px;"></div>
				<div class="view-color-value" style="right:12px;top:28px;">150</div>
				<div class="view-color-line" style="right:10px;top:46px;"></div>
				<div class="view-color-value" style="right:12px;top:43px;">100</div>
				<div class="view-color-line" style="right:10px;top:61px;"></div>
				<div class="view-color-value" style="right:12px;top:58px;">50</div>
		</div>
		<div class="right-tools-container" style="right:20px;">
			<div class="right-tools-item" id="gps-search" style="background:url(../../../static/img/icon/gps_search.png)no-repeat;" title="经纬度查询"></div>
			<div class="right-tools-item" id="bts-search" style="top:23px;background:url(../../../static/img/icon/bts_search.png)no-repeat;" title="基站查询"></div>
			<div class="right-tools-item" id="distance-measurement" data-is-open=0
			 style="top:37px;background:url(../../../static/img/icon/rule.png)no-repeat;" title="测距工具"></div>
			<div class="right-tools-item" id="draw-point" data-drawing-type="marker" data-is-open=0 style="top:51px;background:url(../../../static/img/icon/point.png)no-repeat;" title="绘制点"></div>
			<div class="right-tools-item" id="drap-circle" data-is-open=0  data-drawing-type=BMAP_DRAWING_CIRCLE style="top:65px;background:url(../../../static/img/icon/circle.png)no-repeat;" title="绘制圆"></div>
			<div class="right-tools-item" id="drap-polygon" data-is-open=0  data-drawing-type=BMAP_DRAWING_POLYGON style="top:79px;background:url(../../../static/img/icon/polygon.png)no-repeat;" title="绘制多边形"></div>
			<div class="right-tools-item" id="drap-arrow" style="top:93px;background:url(img/icon/arrow.png)no-repeat;" title="绘制箭头"></div>
			<div class="right-tools-item"  id="drawing-clear-last"
			 style="top:107px;background:url(../../../static/img/icon/back_unclick.png)no-repeat;" title="撤销绘制"></div>
			<div class="right-tools-item" id="drawing-clear-all" 
			style="top:121px;background:url(../../../static/img/icon/clear_unclick.png)no-repeat;" title="清除绘制"></div>
		</div>
		<!-- 上部工具栏 -->
		<div class="top-map-tools-area" style="margin-left: -174px" hidden>
			<div class="map-tools-block box-shadow">
				<!-- 设备轨迹开关-->
				<div class="tool-icon" id="dev-route-line-switch"
					data-dev-route-line-status="1"
					style="background-position: 0 -40px;" title="设备轨迹"></div>
				<div class="tool-divide-line"></div>
				<!-- 能量轨迹开关-->
				<div class="tool-icon" id="eng-orientation-switch"
					data-eng-orientation-status="1"
					style="background-position: -40px -40px;" title="能量轨迹"></div>
				<div class="tool-divide-line"></div>
				<!-- 主动式轨迹开关-->
				<div class="tool-icon gray-cover" id="passive-route-line-switch"
					data-passive-route-line-status="1" data-switch-close="0"
					style="background-position: -80px -40px;" title="主动式轨迹"></div>
				<div class="tool-divide-line"></div>
				<!-- 基站显示开关-->
				<div class="tool-icon" id="bts-show-switch" data-bts-show-status="1"
					style="background-position: -120px -40px;" title="基站"></div>
				<div class="tool-divide-line"></div>
				<!-- add by guoshuai start -->
				<!-- 产品化绘图开启-->
				<div class="tool-icon" id="ta-prod-show-switch" data-ta-prod-show-status="1"
					style="background:url('../../../static/img/iconpic/production-overlay.png');" title="产品化绘图"></div>
				<div class="tool-divide-line"></div>
				<!-- 调试绘图开启-->
				<div class="tool-icon" id="ta-debug-show-switch" data-ta-debug-show-status="1"
					style="background:url('../../../static/img/iconpic/debug-overlay.png');" title="调试绘图"></div>
				<div class="tool-divide-line"></div>
				<!-- add by guoshuai end -->
				<!-- 语音播报-->
				<div class="tool-icon" id="eng-audio-selector"
					style="background-position: -240px -40px;" title="语音播报"></div>
			</div>
			<div class="map-tools-block box-shadow">
				<!-- 测距工具 -->
				<div class="tool-icon gray-cover" id="distance-measurement"
					data-is-open="0" style="background-position: -320px -40px;"
					title="测距工具"></div>
				<div class="tool-divide-line"></div>
				<!-- 基站查询-->
				<div class="tool-icon" id="bts-search"
					title="基站查询"></div>
				<div class="tool-divide-line"></div>
				<!-- 锁定工具栏 -->
				<div class="tool-icon" id="tool-pin" data-is-pin="1"
					style="background-position: -480px -40px;" title="锁定工具栏"></div>
			</div>
			<div class="eng-audio-selector-menu box-shadow"
				style="display: none;">
				<div class="eng-audio-selector-item" data-audio-type="1"
					style="background-position: -200px -40px;" title="单选"></div>
				<div class="eng-audio-selector-item" data-audio-type="2"
					style="background-position: -240px -40px;" title="优选"></div>
				<div class="eng-audio-selector-item" data-audio-type="3"
					style="background-position: -160px -40px;" title="静音"></div>
			</div>
		</div>

		<!-- 能量比例尺-->
		<div class="energy-scale" hidden>
			<div class="energy-scale-content" style="top: 0;">
				<div class="energy-scale-color"
					style="background: rgb(255, 203, 203)"></div>
				<div class="energy-scale-word">&lt;50</div>
			</div>
			<div class="energy-scale-content" style="top: 25px">
				<div class="energy-scale-color"
					style="background: rgb(255, 176, 176)"></div>
				<div class="energy-scale-word">&lt;100</div>
			</div>
			<div class="energy-scale-content" style="top: 50px">
				<div class="energy-scale-color"
					style="background: rgb(255, 127, 127)"></div>
				<div class="energy-scale-word">&lt;150</div>
			</div>
			<div class="energy-scale-content" style="top: 75px">
				<div class="energy-scale-color" style="background: rgb(255, 86, 86)"></div>
				<div class="energy-scale-word">&lt;200</div>
			</div>
			<div class="energy-scale-content" style="top: 100px">
				<div class="energy-scale-color" style="background: rgb(255, 0, 0)"></div>
				<div class="energy-scale-word">&lt;255</div>
			</div>
			<div class="energy-scale-content-details">能量颜色图例</div>
		</div>
		<div class="group-switch-btn-container">
			<div class="group-switch-btn-item" id="group-location">定位组</div>
			<div class="group-switch-btn-item" id="group-outside" style="background:#fff;color:rgba(153,153,153,1)">外线组</div>
		</div>
		<!--设备信息 -->
		<div class="group-location-container">
			<div class="group-location-car-container">
				
			</div>
			<div class="group-location-single-container">
				
			</div>
		</div>
		<div class="group-outside-container">
			
		</div>
		<div class="right-info-panel-container" hidden>
			<!-- 上信息面板-->
			<div class="case-info-panel box-shadow">
				<div class="case-info-area">
					<div class="case-info-item">
						<div class="case-info-item-icon" style="background-position: 0 0;"></div>
						<div class="case-info-item-value" title=""
							style="color: rgb(137, 146, 200);" id="case-users"></div>
					</div>
					
					
				</div>
				<div class="sms-info-area">
					<div class="sms-value-contaoner">
						<span class="sms-value-item">发送</span>
						<span class="sms-value-item">完成</span>
						<span class="sms-value-item">回执</span>
					</div>
					<div class="sms-value-contaoner">
						<span id="sms-send-value" class="sms-value-item">0</span>
						<span id="sms-finish-value" class="sms-value-item">0</span>
						<span id="sms-receipt-value" class="sms-value-item">0</span>
					</div>
				</div>
				<div>
					<div class="activedev-info-area">
						<div class="activedev-info-icon gray-cover" title="查看主动式详情"></div>
						<div class="activedev-info-status-value">主动式未命中</div>
					</div>
					<div class="activedev-history-energy">
						<span class="activedev-history-energy-open" title="查看历史能量"></span>
					</div>
				</div>
			</div>

			<!-- 下信息面板-->
			<div class="team-info-panel box-shadow">
				<div class="team-each-dev-container">
					<div class="team-each-dev-container-car"></div>
					<div class="team-each-dev-container-single"></div>
				</div>
				<button
					class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-blue CR-ta-target-info">目标信息</button>
				<button data-toggle="modal" data-target="#advance-info-panel"
					class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-blue advance-panel-btn">高级</button>
			</div>
		</div>
		<!--主动式详情-->
		<div class="active-info-container box-shadow">
			<div class="active-info-title"></div>
			<div class="active-info-header" style="height: 17px;margin-left:6px;">
				<span class="red-ball-span"></span>
				<div style="width: 150px;height: 17px;float: left;margin-left: 4px;">主动式详情</div>
				<span class="CR-close active-info-container-close"></span>
			</div>
			<div class="active-info-switch-container">
				<div class="active-info-switch-item" id="active-info-baseinfo">基本信息</div>
				<div class="active-info-switch-item" id="active-info-enghistory" style="color:#ABABAD;background:#fff;">历史能量</div>
			</div>
			
			<!--基本信息-->
			<div class="active-info-content CR-scrollY" style="margin-left:10px;width: 90%;margin-top: 36px; height: 105px;">
				<table style="width: 100%; height: 84px;">
					<thead>
						<tr>
							<th style="text-align: center;font-weight: 400; color: #17c1f4;">推荐</th>
							<th style="text-align: center;font-weight: 400; color: #17c1f4;">Band</th>
							<th style="text-align: center;font-weight: 400; color: #17c1f4;">Freq/Pci</th>
							<th style="text-align: center;font-weight: 400; color: #17c1f4;">Power</th>
							<th style="text-align: center;font-weight: 400; color: #17c1f4;">Status</th>
						</tr>
					</thead>
					<tbody id="active-info-content-infoArea"></tbody>
				</table>
			</div>
			<!--历史能量-->
			<div class="history-energy-info" style="display:none;">
				<div class="history-energy-info-header" style="height: 24px;">			
					<span class="history-energy-info-header-span">能量</span>				
					<span class="history-energy-info-header-span">时间</span>	
				</div>			
				<div class="history-energy CR-scrollY">
				</div> 
			</div>
		</div>
		<!-- 高级面板-->
		<div class="advance-info-containers box-shadow">
			<div class="advance-info-title"></div>
			<div class="active-info-header" style="height: 17px;margin-left:10px;">
				<span class="red-ball-span"></span>
				<div style="width: 150px;height: 17px;float: left;margin-left: 4px;">解析高级面板</div>
				<span class="CR-close advance-info-container-close"></span>
			</div>
			<div class="advance-info-dropdown-toggle-container dropdown-toggle" data-toggle="dropdown" data-status=0>
				
			</div>
			<div class="advance-info-dropdown-toggle-content dropdown-menu" style="float:left">
				
			</div>
			<div class="advance-info-modetype-switch-container">
				<div class="advance-info-modetype-btn" data-mode="lte" id="advance-info-modetype-btn-lte" style="background: rgba(23, 193, 244, 1);color:#fff">LTE</div>
				<div class="advance-info-modetype-btn" data-mode="wcdma" id="advance-info-modetype-btn-wcdma">WCDMA</div>
				<div class="advance-info-modetype-btn" data-mode="cdma" id="advance-info-modetype-btn-cdma">CDMA</div>
				<div class="advance-info-modetype-btn" data-mode="gsm" id="advance-info-modetype-btn-gsm">GSM</div>
			</div>
			<div class="advance-info-contents">
				<div class="advance-info-line"></div>
				<div class="advance-info-bts">基站</div>
				<div class="advance-info-locationcode">位置区标示码</div>
				<div class="advance-info-analysis">解析</div>
				<div class="advance-info-bid">中标数</div>
				<div class="advance-info-fieldstrength">场强</div>
				<div class="advance-info-value-container">
				</div>
				<div class="advance-info-time-container">
				</div>
			</div>
		</div>
		<!-- 目标信息 -->
		<div class="ta-info-container box-shadow">
			<div class="ta-info-title"></div>
			<div class="active-info-header" style="height: 17px;">
				<span class="red-ball-span"></span>
				<div style="width: 150px;height: 17px;float: left;margin-left: 4px;">目标信息</div>
				<span class="CR-close ta-info-container-close"></span>
			</div>
			<div class="ta-info-box" style="margin-top: 10px;width: 756px;">
				<div class="ta-info-header">
					<span class="ta-info-content-header-first">基站信息</span>
					<span class="ta-info-content-header-secede">目标信息</span>
					<span class="ta-info-content-header-third">设备信息</span>
					<span class="ta-info-content-header-fourth"></span>
				</div>
				<div class="ta-info-middle">
					<div class="ta-info-content-header-first CR-blue-font-color">
						<span class="ta-info-middle-span" style="width: 40px; border-right: 1px solid #f0f0f0;">类型</span>
						<span class="ta-info-middle-span" style="width: 159px;border-right: 1px solid #f0f0f0;">TAC/CI</span>
						<span class="ta-info-middle-span" style="width: 50px;">经纬度</span>
					</div>
					<div class="ta-info-content-header-secede CR-blue-font-color">
						<span class="ta-info-middle-span" style="width: 30px;border-right: 1px solid #f0f0f0;">P1</span>
						<span class="ta-info-middle-span" style="width: 50px;border-right: 1px solid #f0f0f0; font-size: 13px;">半径(M)</span>
						<span class="ta-info-middle-span" style="width: 78px;border-right: 1px solid #f0f0f0;">TMSI</span>
						<span class="ta-info-middle-span" style="width: 41px;border-right: 1px solid #f0f0f0;">RNIT</span>
						<span class="ta-info-middle-span" style="width: 62px;">P1时间</span>
					</div>
					<div class="ta-info-content-header-third CR-blue-font-color">
						<span class="ta-info-middle-span" style="width: 146px;border-right: 1px solid #f0f0f0;">编号</span>
						<span class="ta-info-middle-span" style="width: 33px;">GPS</span>
					</div>
					<div class="ta-info-content-header-fourth CR-blue-font-color" style="line-height: 34px;">时间</div>
				</div>
				<div class="ta-info-table CR-scrollY">
					
				</div>
			</div>
		</div>
		<!-- 目标所在基站LTE信息 -->
		<div class="target-lte-info-container" style="display:none;">
			<div class="target-lte-info-title"></div>
			<div class="target-lte-info box-shadow">
				<div class="target-lte-info-time"></div>
				<span class="CR-close target-lte-info-container-close"></span>
				<div class="target-lte-system-info">
					<div class="target-lte-system-info-point"></div>				
					<div class="target-lte-system-info-title">目标LTE信息</div>				
					<div class="target-lte-system-info-base">MCC/MNC/TAC/CI</div>				
					<div class="target-lte-system-info-rssi">RSSI</div>				
					<div class="target-lte-system-info-content">
					</div>
				</div>
				<div class="target-lte-nearby-info">
					<div class="target-lte-nearby-info-point"></div>				
					<div class="target-lte-nearby-info-title">目标LTE邻区</div>				
					<div class="target-lte-nearby-info-pci">EARFCN/PCI</div>				
					<div class="target-lte-nearby-info-rsrp">RSRP</div>				
					<div class="target-lte-nearby-info-rsrq">RSRQ</div>
					<div class="target-lte-info-content-container CR-scrollY">
					</div>
					<div class="target-lte-nearby-info-ta">TA</div>
				</div>
			</div>
		</div>
		<!-- 持续时长 -->
		<div class="continous-time" hidden>
			<div class="continous-time-value">00:00:00</div>
			<div class="continous-time-title">时长</div>
		</div>

		<!-- 回到当前视角 -->
		<div class="view-default-btn mdui-btn-raised mdui-ripple" hidden>
			<div class="view-default-btn-bg"></div>
		</div>

		<!-- 视角切换 -->
		<div class="view-switch" hidden>
			<div class="view-current-dev">
			</div>
			<div class="view-switch-chooser mdui-btn-raised"
				style="height: 0; top: 0; display: none;">
				<div class="choose-container-car"></div>
				<div class="choose-container-single"></div>
			</div>
		</div>
		<div class="bottom-time-line-container">
			<div class="view-current-dev-container">
			</div>

			<div class="time-line-area" style="bottom: 6px;left:200px;">
				<div class="eng-column-chart"></div>
				<div class="time-line-container">
					<div class="time-line-divider-container">
						<div class="time-line-blue-cover"></div>
					</div>
					<div class="time-line-marker"></div>
					<div id="time-line-click-cover"
						style="width: 100%; height: 100%; position: absolute;"></div>
				</div>
				<div class="time-line-slider"></div>
				<div class="time-line-mouse-tips"></div>
			</div>

			<div class="play-btn-container" id="play-btn"></div>
			<div class="case-time-container">
				<div class="case-time">00:00:00</div>
				<div class="case-time-all">
				</div>
			</div>
			<div class="speed-switch-btn" data-status="0">
				<div class="speed-switch-value">X<span>1</span></div>
				<div class="speed-switch-dropup"></div>
			</div>
			<div class="speed-switch-content">
				<div class="speed-switch-item">X<span>0.5</span></div>
				<div class="speed-switch-item-line"></div>
				<div class="speed-switch-item">X<span>1</span></div>
				<div class="speed-switch-item-line"></div>
				<div class="speed-switch-item">X<span>2</span></div>
				<div class="speed-switch-item-line"></div>
				<div class="speed-switch-item">X<span>4</span></div>
				<div class="speed-switch-item-line"></div>
				<div class="speed-switch-item">X<span>8</span></div>
				<div class="speed-switch-item-line"></div>
				<div class="speed-switch-item">X<span>16</span></div>
				<div class="speed-switch-item-line"></div>
				<div class="speed-switch-item">X<span>32</span></div>
			</div>
		</div>
		<!-- 时间轴 -->
		<div class="time-line-area" style="bottom: 28px;" hidden>
			<div class="progress time-line-progress">
				<div class="progress-bar progress-bar-striped"
					id="time-line-progress"
					style="cursor: pointer; transition: width 0s !important;"
					role="progressbar" aria-valuenow="45" aria-valuemin="0"
					aria-valuemax="100"></div>
			</div>
			<div class="eng-column-chart"></div>
			<div class="time-line-container">
				<div class="time-line-divider-container">
					<div class="time-line-blue-cover"></div>
				</div>
				<div class="time-line-marker"></div>
				<div id="time-line-click-cover"
					style="width: 100%; height: 100%; position: absolute;"></div>
			</div>
			<div class="time-line-slider"></div>
			<div class="time-line-start-time"></div>
			<div class="time-line-end-time"></div>
			<div class="time-line-mouse-tips"></div>
		</div>

		<div class="replay-control-container" hidden>
			<button id="play-btn"
				class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-blue replay-control-btn">播放</button>
			<button id="stop-btn"
				class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-pink replay-control-btn"
				data-toggle="modal" data-target="#reset-search-modal">结束</button>
			<div class="dropup speed-setting" hidden>
				<button class="btn btn-default dropdown-toggle" id="speed-value"
					type="button" data-toggle="dropdown" aria-haspopup="true"
					aria-expanded="false">
					速度&nbsp;x1 <span class="caret"></span>
				</button>
				<ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
					<li><a class="speed-value">&nbsp;x<span>0.5</span></a></li>
					<li><a class="speed-value">&nbsp;x<span>1</span></a></li>
					<li><a class="speed-value">&nbsp;x<span>2</span></a></li>
					<li><a class="speed-value">&nbsp;x<span>4</span></a></li>
					<li><a class="speed-value">&nbsp;x<span>8</span></a></li>
					<li><a class="speed-value">&nbsp;x<span>16</span></a></li>
					<li><a class="speed-value">&nbsp;x<span>32</span></a></li>
				</ul>
			</div>
		</div>

	</div>

	<!-- 在此设置中框默认显示状态-->
	<div class="guide-frame" style="display: block">
		<div class="guide-title" style="margin-left: -22px">历史回放</div>
		<div class="table-view-container" style="width: 100%;">
			<div id="table-view-container-box" style="background: #07203e;"> 
				<div class="table-view-search-area">
					<div class="search-type-simple">
						<!-- 模糊搜索-->
						<div class="input-group input-group-sm search-item search-item-width-md">
							<span class="input-group-addon input-group-title">关键词 &nbsp;:</span> 
							<input type="text" class="form-control input-background" placeholder="输入作战成员/城市" id="query-key-word">
						</div>
					</div>
					<div class="search-type-all">
						<!-- 作战成员 -->
						<div
							class="input-group input-group-sm search-item search-item-width-sm">
							<span class="input-group-addon input-group-title" id="query-id">作战成员</span>
							<input type="text" class="form-control input-background"
								id="query-user-name">
						</div>
						<!-- 作战城市 -->
						<div
							class="input-group input-group-sm search-item search-item-width-sm">
							<span class="input-group-addon input-group-title" id="query-id">作战城市</span>
							<input type="text" class="form-control input-background"
								id="query-area-code">
						</div>
						<!-- 设备编号-->
						<div
							class="input-group input-group-sm search-item search-item-width-sm">
							<span class="input-group-addon input-group-title"
								id="query-phone-num">设备编号</span> <input type="text"
								class="form-control input-background" id="query-dev-code">
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
										id="query-time-costume" name="group1" />
										<i class="mdui-radio-icon"></i> 自定义
									</label>
								</div>
								<div class="time-range-selector-item" id="custom-type-input" style="margin-left: 10px; margin-top: 1px; display: none;">
									<div class="block">
										<el-date-picker v-model="datePickerTime" type="monthrange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" value-format="yyyy-MM-ddHH:mm:ss">
										</el-date-picker>
									</div>
								</div>
							</form>
						</div>
					</div>

				</div>
				<div class="search-simple-rule"></div>
			<!-- 搜索 -->
				<div class="table-view-search-btn">
					<div class="guide-search-btn mdui-ripple">
					</div>
					<div class="search-mode-switch">
						<span id="search-mode-title-1">条件太少？</span><span class="text-blue"
							id="search-mode-title-2" data-search-type="0"
							style="cursor: pointer; text-decoration: underline;">高级搜索</span>
					</div>
				</div>
			</div>
			<!-- 正文 -->
			<div class="table-view-data-area auto-min-height" style="width:96%;">
				<div id="view-data-class">
					<div id="view-class">
						<div id="view-class-list"></div>
						<div id="view-class-block"></div>
					</div>
				</div>
				<div class="" style="display:block;table-layout:fixed;">
					<paginateCombatReplayTable></paginateCombatReplayTable>
				</div> 
				<div class="view-data-block">
					<paginateCombatReplayBlock></paginateCombatReplayBlock>	
				</div>
				<!-- 暂无数据-->
				<div class="no-data-realtime" style="display: none;">
					<img class="no-data-icon" src="../../../static/img/no_data_icon_search.png">
					<span class="no-data-word">暂无案件信息数据</span>
				</div>
			</div>
		</div>

	</div>

	<div class="search-loading">
		<img class="loading-gif" src="../../../static/img/loading.gif"> <span
			class="loading-word">加载中...</span>
	</div>

	<!-- Modal重置搜索确认 -->
	<div class="modal fade bs-example-modal-sm" id="reset-search-modal"
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
				<div class="modal-body" id="modal-research-content">是否结束观看？</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-primary"
						id="reset-search-submit">确定</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Modal回放停止确认 -->
	<div class="modal fade bs-example-modal-sm" id="replay-end-modal"
		tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog modal-sm" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title" id="myModalLabel">确认</h4>
				</div>
				<div class="modal-body">是否结束当前回放？</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" id="replay-end">确定</button>
					<button type="button" class="btn btn-primary" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Modal删除点标记确认 -->
	<div class="modal fade bs-example-modal-sm" data-backdrop="static"
		data-keyboard="false" id="delete-pointmarks-modal" tabindex="-1"
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
				<div class="modal-body">是否删除所有点标记？</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default"
						id="drawing-clear-all-ensure">确定</button>
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
						aria-label="Close" id="alert-modal-close-button">
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

	<!-- 高级面板-->
	<div class="modal fade bs-example-modal-lg" id="advance-info-panel"
		data-backdrop="static" data-keyboard="false" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">高级面板</h4>
					<div class="btn-group"
						style="position: absolute; left: 100px; top: 10px; cursor: pointer;">
						<button type="button" class="btn btn-default dropdown-toggle"
							data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
							id="default-advance-info-panel-dev">
						</button>
						<ul class="dropdown-menu" id="advance-info-panel-dev-selector">
						</ul>
					</div>
				</div>
				<div class="modal-body" id="advance-info-content-body"></div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				</div>
			</div>
		</div>
	</div>

	<audio id="engAudioPlay" src="" hidden="true"></audio>
	<audio id="passiveAudioPlay" src="" hidden="true"></audio>
	<!--add by guo shuai start 2018-11-30-->
	<!-- 基站查询模态框-->
	<div class="modal fade bs-example-modal-lg" id="bts-search-modal"
		data-backdrop="static" data-keyboard="false" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel" style="
			background-color: rgba(8, 38, 74,0.5);
			-webkit-box-shadow: 0 5px 15px rgba(0,0,0,.5);
    		box-shadow: 0 5px 15px rgba(0,0,0,.5);"
		>
		<div class="modal-dialog modal-lg" role="document" style="top:80px;width: 600px;">
			<div class="modal-content" style="
				top:0px;
				background: #08264a;
			">
				<div class="modal-header" style="margin-left:24px;border-color: #17c1f4;color: #17c1f4;">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
		                <span aria-hidden="true" class="add-user-close"></span>
					</button>
					<h4 class="modal-title" style="margin-left:-14px;">基站查询</h4>
				</div>
				<div class="modal-body" style="overflow: hidden; margin-left: -12px;">
					
						<div class="input-group input-group-sm modal-input">
                            <span class="input-group-addon modal-input-title">MNC</span>
                            <div class="btn-group" id="mncType-box" data-type="add">
                                <button type="button" id="dev-button"
                                style="width: 214px; text-align: left; border: 1px solid #174275; background: #011731; color: #fff;height:30px;margin-left: 21px;"
                                class="btn btn-default btn-sm dropdown-toggle"
                                data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                                <span id="mncType" style="
                                        text-overflow: ellipsis;
                                        overflow: hidden;
                                        width: 165px !important;
                                        display: block;
                                        float: left;
                                    ">中国移动</span> <span class="careta" style="float: right;"></span>
                                </button>
                                <ul class="dropdown-menu" style="width: 214px; background: rgb(40, 40, 40) ;background: #08264a; margin-left: 21px;" id="devUseTypeSelect">
                                    <li><a class="dropdown-menu-selector mnc-selector" data-dev-id="">中国移动</a></li>
                                    <li><a class="dropdown-menu-selector mnc-selector" data-dev-id="">中国联通</a></li>
                                    <li><a class="dropdown-menu-selector mnc-selector" data-dev-id="">中国电信</a></li>
                                </ul>
                            </div>
                        </div>
						<!--中国移动网络制式-->
						<div id="mob-netWork">
							<div class="input-group input-group-sm modal-input">
								<span class="input-group-addon modal-input-title">网络制式</span>
								<div class="btn-group" id="networkType-box" data-type="add">
									<button type="button" id="dev-button"
									style="width: 214px; text-align: left; border: 1px solid #174275; background: #011731; color: #fff;height:30px;"
									class="btn btn-default btn-sm dropdown-toggle"
									data-toggle="dropdown" aria-haspopup="true"
									aria-expanded="false">
									<span id="mob-networkType" style="
											text-overflow: ellipsis;
											overflow: hidden;
											width: 165px !important;
											display: block;
											float: left;
										">LTE</span> <span class="careta" style="float: right;"></span>
									</button>
									<ul class="dropdown-menu" style="width: 214px; background: rgb(40, 40, 40) ;background: #08264a ;" id="devUseTypeSelect">
										<li><a class="dropdown-menu-selector mob-network-selector">LTE</a></li>
										<li><a class="dropdown-menu-selector mob-network-selector">GSM</a></li>
									</ul>
								</div>
							</div>
						</div>
						<!--中国联通网络制式-->
						<div id="uni-netWork" style="display: none;">
							<div class="input-group input-group-sm modal-input">
								<span class="input-group-addon modal-input-title">网络制式</span>
								<div class="btn-group" id="networkType-box" data-type="add">
									<button type="button" id="dev-button"
									style="width: 214px; text-align: left; border: 1px solid #174275; background: #011731; color: #fff;height:30px;"
									class="btn btn-default btn-sm dropdown-toggle"
									data-toggle="dropdown" aria-haspopup="true"
									aria-expanded="false">
									<span id="uni-networkType" style="
											text-overflow: ellipsis;
											overflow: hidden;
											width: 165px !important;
											display: block;
											float: left;
										">LTE</span> <span class="careta" style="float: right;"></span>
									</button>
									<ul class="dropdown-menu" style="width: 214px; background: rgb(40, 40, 40) ;background: #08264a ;" id="devUseTypeSelect">
										<li><a class="dropdown-menu-selector uni-network-selector">LTE</a></li>
										<li><a class="dropdown-menu-selector uni-network-selector">GSM</a></li>
										<li><a class="dropdown-menu-selector uni-network-selector">WCDMA</a></li>
									</ul>
								</div>
							</div>
						</div>
						<!--中国电信网络制式-->
						<div id="tel-netWork" style="display: none;">
							<div class="input-group input-group-sm modal-input">
								<span class="input-group-addon modal-input-title">网络制式</span>
								<div class="btn-group" id="networkType-box" data-type="add">
									<button type="button" id="dev-button"
									style="width: 214px; text-align: left; border: 1px solid #174275; background: #011731; color: #fff;height:30px;"
									class="btn btn-default btn-sm dropdown-toggle"
									data-toggle="dropdown" aria-haspopup="true"
									aria-expanded="false">
									<span id="tel-networkType" style="
											text-overflow: ellipsis;
											overflow: hidden;
											width: 165px !important;
											display: block;
											float: left;
										">LTE</span> <span class="careta" style="float: right;"></span>
									</button>
									<ul class="dropdown-menu" style="width: 214px; background: rgb(40, 40, 40) ;background: #08264a ;" id="devUseTypeSelect">
										<li><a class="dropdown-menu-selector tel-network-selector">LTE</a></li>
										<li><a class="dropdown-menu-selector tel-network-selector">CDMA</a></li>
									</ul>
								</div>
							</div>
						</div>
						<!-- 不含CDMA -->
						<div id="no-cdma" style="position: relative;">
							<div class="input-group input-group-sm modal-input">
								<span class="input-group-addon modal-input-title">LAC/TAC</span>
								<input type="text" class="form-control modal-input-area modal-input-background input-space-forbidden input-num-only no-cdma-lac-tac" id="ten-lac-tac"
									placeholder="1~65535" maxlength="5"
								>

								<input type="text" class="form-control modal-input-area modal-input-background input-space-forbidden input-num-word no-cdma-lac-tac" id="sixteen-lac-tac"
									placeholder="1~FFFF" maxlength="4" style="display: none;"
								>
								<span class="input-check isTrue" id="is-lacTac-true"></span>
							</div>
							<div class="input-group input-group-sm modal-input">
								<span class="input-group-addon modal-input-title">CI</span>
								<input type="text" class="form-control modal-input-area modal-input-background input-space-forbidden input-num-only no-cdma-ci" id="ten-ci"
									placeholder="2G(1~65535) 3G/4G(1~268435455)" maxlength="9"
								>
								<input type="text" class="form-control modal-input-area modal-input-background input-space-forbidden input-num-word no-cdma-ci" id="sixteen-ci"
									placeholder="2G(1~FFFF) 3G/4G(1~FFFFFFF)" maxlength="7" style="display: none;"
								>
								<span class="input-check isTrue" id="is-ci-true"></span>
							</div>
						</div>
						<!-- 含CDMA -->
						<div id="cdma">
							<div class="input-group input-group-sm modal-input">
								<span class="input-group-addon modal-input-title">SID</span>
								<input type="text" class="form-control modal-input-area modal-input-background input-space-forbidden input-num-only cdma-sid" id="ten-sid"
									placeholder="0~32767" maxlength="5"
								>
								<input type="text" class="form-control modal-input-area modal-input-background input-space-forbidden input-num-word cdma-sid" id="sixteen-sid"
									placeholder="0~7F73" maxlength="4"
								>
								<span class="input-check isTrue" id="is-sid-true"></span>
							</div>
							<div class="input-group input-group-sm modal-input">
								<span class="input-group-addon modal-input-title">NID</span>
								<input type="text" class="form-control modal-input-area modal-input-background input-space-forbidden input-num-only cdma-nid" id="ten-nid"
									placeholder="0~65535" maxlength="5"
								>
								<input type="text" class="form-control modal-input-area modal-input-background input-space-forbidden input-num-word cdma-nid" id="sixteen-nid"
									placeholder="0~FFFF" maxlength="4"
								>
								<span class="input-check isTrue" id="is-nid-true"></span>
							</div>
							<div class="input-group input-group-sm modal-input">
								<span class="input-group-addon modal-input-title">BID</span>
								<input type="text" class="form-control modal-input-area modal-input-background input-space-forbidden input-num-only cdma-bid" id="ten-bid"
									placeholder="1~65535" maxlength="5"
								>
								<input type="text" class="form-control modal-input-area modal-input-background input-space-forbidden input-num-word cdma-bid" id="sixteen-bid"
									placeholder="1~FFFF" maxlength="4"
								>
								<span class="input-check isTrue" id="is-bid-true"></span>
							</div>
						</div>
						<div class="input-group input-group-sm modal-input" id="no-cdma-hex">
							<span class="input-group-addon modal-input-title" id="bts-hex">HEX</span>
							<div class="myCheckBox" id="ten-radio">
								<input type="radio" id="ten-binary-system" name="radio" checked>
    							<label for="ten-binary-system"></label>
							</div>
							<div class="binary-system">10进制</div>
							<div class="myCheckBox" id="sixteen-radio">
								<input type="radio" id="sixteen-binary-system" name="radio">
    							<label for="sixteen-binary-system"></label>
							</div>
							<div class="binary-system">16进制</div>
						</div>
				</div>
				<div class="modal-footer" style="border-color: #08264a;">
					<button id="bts-mark-delete" class="btn">清除基站</button>
					<button type="button" class="btn btn-primary dept-selector-ensure"
						id="bts-search-ensure">查询</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
  </div>
</template>
<script type="text/javascript">
	import $axios from 'axios';
	import paginateCombatReplayTable from '../paginateCombatReplayTable';
	import paginateCombatReplayBlock from '../paginateCombatReplayBlock';
	import '../../../static/lib/bootstrarp/js/bootstrap.min.js';
	/* mdui */
	import "../../../static/lib/mdui-v0.4.0/js/mdui.min.js";
  	
  	export default { //这里需要将模块引出，可在其他地方使用
		components:{
			paginateCombatReplayTable,
			paginateCombatReplayBlock
		},
		data (){ //注意：data即使不需要传数据，也必须return,否则会报错
			return {
				pickerOptions: { //element-UI的date-picker组件设置
                    shortcuts: [{
                        text: '本月',
                        onClick(picker) {
                        picker.$emit('pick', [new Date(), new Date()]);
                        }
                    }, {
                        text: '今年至今',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date(new Date().getFullYear(), 0);
                        picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近六个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setMonth(start.getMonth() - 6);
                        picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                datePickerTime: '',//获取input框中的时间
			}
		},
		methods:{
			
		},
		mounted() {
				
		},
  	}
</script>

<style type="text/css">
	@import "../../../static/css/common.css"; 
	@import "../../../static/mdui-v0.4.0/css/mdui.min.css";
	@import "../../../static/css/cover.css"; 
	@import "../../../static/css/page/combatReplay.css"; 
	@import "../../../static/css/table-view.css"; 
</style>
