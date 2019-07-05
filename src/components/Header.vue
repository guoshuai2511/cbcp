<template>
  <header class="top-header"  id="top-header">
		<div class="top-header-menu">
			<div class="header-menu-content">
				<div class="header-menu-item header-menu-item-active" data-menu-index="0" onclick="window.location.href='http://localhost:9090/#/home'">总览</div>
			</div>
			<div class="header-menu-content">
				<div class="header-menu-item" data-menu-index="1" @click="selideNavigationItem(1)">
					作战指挥
					<p style="width: 11px;height: 9px;background:url('img/iconpic/slide.png') no-repeat;background-size:100% 100%;position:absolute;top:14px;left:80%;"></p>
				</div>
				<div class="header-menu-dropdown header-menu-dropdown-1">
					<div class="header-menu-dropdown-item" onclick="window.location.href='commandManage/realTimeCombat'">实时作战</div>
					<div class="header-menu-dropdown-item" onclick="window.location.href='http://localhost:9090/#/commandManage/combatReplay'">历史回放</div>
				</div>
			</div>
			<div class="header-menu-content">
				<div class="header-menu-item" data-menu-index="2" @click="selideNavigationItem(2)">
					数据分析
					<p style="width: 11px;height: 9px;background:url('img/iconpic/slide.png') no-repeat;background-size:100% 100%;position:absolute;top:14px;left:80%;"></p>
				</div>
				<div class="header-menu-dropdown header-menu-dropdown-2">
					<div class="header-menu-dropdown-item" onclick="window.location.href='http://localhost:9090/#/systemManage/caseManage'">案件筛查</div>
				</div>
			</div>  
			<div class="header-menu-content">
				<div class="header-menu-item" data-menu-index="3" @click="selideNavigationItem(3)">
					系统管理
					<p style="width: 11px;height: 9px;background:url('img/iconpic/slide.png') no-repeat;background-size:100% 100%;position:absolute;top:14px;left:80%;"></p>
				</div>
				<div class="header-menu-dropdown header-menu-dropdown-3">
					<div class="header-menu-dropdown-item" onclick="window.location.href='http://localhost:9090/#/systemManage/deptManage'">组织机构管理</div>
					<div class="header-menu-dropdown-item" onclick="window.location.href='http://localhost:9090/#/systemManage/roleManage'">平台用户功能管理</div>
					<div class="header-menu-dropdown-item" onclick="window.location.href='http://localhost:9090/#/systemManage/userManage'">用户管理</div>
					<div class="header-menu-dropdown-item" onclick="window.location.href='http://localhost:9090/#/systemManage/devManage'">设备管理</div>
				</div>
			</div>  
			<div class="header-menu-content">
				<div class="header-menu-item" data-menu-index="5" @click="selideNavigationItem(5)">
					执法监督
					<p style="width: 11px;height: 9px;background:url('img/iconpic/slide.png') no-repeat;background-size:100% 100%;position:absolute;top:14px;left:80%;"></p>
				</div>
				<div class="header-menu-dropdown header-menu-dropdown-5">
					<!--<div class="header-menu-dropdown-item" onclick="window.location.href='enforceManage/phoneNumManage'">测试手机号管理</div>
					<div class="header-menu-dropdown-item" onclick="window.location.href='enforceManage/vehicleManage'">车辆管理</div>
					<div class="header-menu-dropdown-item" onclick="window.location.href='enforceManage/dwCaseManage'">DW案件管理</div>
					<div class="header-menu-dropdown-item" onclick="window.location.href='enforceManage/myDwCaseManage'">我的DW案件</div>-->
					<div class="header-menu-dropdown-item" onclick="window.location.href='http://localhost:9090/#/systemManage/enforceLog'">执法日志管理</div>
				</div>
			</div>
    </div>
	</header>
</template>

<script type="text/javascript">
	let _self = this;
	export default { //这里需要将模块引出，可在其他地方使用
		data (){ //注意：data即使不需要传数据，也必须return,否则会报错
			return {   
			}
		},
		methods: {
			selideNavigationItem (index) {
				$('.header-menu-dropdown').slideUp(300);
				if ($('.header-menu-dropdown-' + index).css('display') == 'none') {
					$('.header-menu-dropdown-' + index).slideDown(200);
				}
			},
			//header-menu-dropdown-item
			slidefunction(){
				$(document).on('click','.header-menu-dropdown-item',function(){
					$(this).parent().slideUp(300);
				})
			}
		},
		mounted(){
			this.slidefunction()
		}
	}
</script>
<style scoped>
  @import "../../static/css/common.css"; 
</style>
<style type="text/css">
.top-header{
	z-index: 2000;	 
	width:100%;
	height:67px;
	background-color: #08264a;
	position: relative;
	background: url(../../static/img/iconpic/top-log.png) no-repeat;
	background-size: 100% 90%;
}
.top-header-icon {
	width: 98px;
	height: 32px;
	position: absolute;
	top: 9px;
	left: 9px;
	display: none;
}

.top-header-title {
	position: absolute;
	left: 45px;
	color: #ffffff;
	font-size: 30px;
	line-height: 48px;
	display: none;
}

.top-header-menu {
	height: auto;
	position: absolute;
	left: 23.44%;
	color: rgb(0, 186, 255);
	width: 38.34%;
	height: 48px;
	top:6px;
}
</style>
