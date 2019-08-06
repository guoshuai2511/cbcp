<template>
  	<div class="enforceManage" v-wechat-title="$route.meta.title">
		<div class="guide-frame" style="height:1077px;">
			<div class="guide-title" style="margin-left: -22px">执法日志管理</div>
			<div class="table-view-container">
				<div id="table-view-container-box" style="background: #07203e;height:130px;"> 
					<div class="table-view-search-area">
						<!-- 案件名称 -->
						<div class="input-group input-group-sm search-item search-item-width-sm">
							<span class="input-group-addon input-group-title" id="query-case-name">案件名称</span>
							<input type="text" class="input-background input-space-forbidden" id="case-name-value">
						</div>
						<!-- 工作对象 -->
						<div class="input-group input-group-sm search-item search-item-width-sm">
							<span class="input-group-addon input-group-title" id="query-work-object">工作对象</span>
							<input type="text" class="input-background input-space-forbidden" id="work-object-value">
						</div>
						<!-- 电信标识码 -->
						<div class="input-group input-group-sm search-item search-item-width-sm">
							<span class="input-group-addon input-group-title" id="query-tel-code">电信标识码</span> 
							<input type="text" class="input-background input-space-forbidden" id="tel-code-value" maxlength="11">
						</div>
						<!-- IMSI码 -->
						<div class="input-group input-group-sm search-item search-item-width-sm">
							<span class="input-group-addon input-group-title" id="query-imsi-code">IMSI码</span> 
							<input type="text" class="input-background input-space-forbidden" id="imsi-code-value" maxlength="15">
						</div>
						<!-- IMEI码 -->
						<div class="input-group input-group-sm search-item search-item-width-sm">
							<span class="input-group-addon input-group-title" id="query-imei-code">IMEI码</span> 
							<input type="text" class="input-background input-space-forbidden" id="imei-code-value" maxlength="15">
						</div>
						<!-- 设备名称 -->
						<div class="input-group input-group-sm search-item search-item-width-sm">
							<span class="input-group-addon input-group-title" id="query-dev-name">设备名称</span> 
							<input type="text" class="input-background input-space-forbidden" id="dev-name-value">
						</div>
						<!-- 办案人 -->
						<div class="input-group input-group-sm search-item search-item-width-sm">
							<span class="input-group-addon input-group-title" id="query-case-operator">办案人</span> 
							<input type="text" class="input-background input-space-forbidden" id="case-operator-value">
						</div>
						<!-- 所属机构 -->
						<div class="input-group input-group-sm search-item search-item-width-sm">
							<span class="input-group-addon input-group-title"
								id="query-phone-num">所属机构</span>
							<div class="btn-group">
								<button type="button" id="dept-selector-button" style="margin-left:10px;width: 200px; height:34px; text-align: left; border: none;background: #011731;color: rgb(204, 204, 204); padding-left:13px"
									class="btn btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									<span id="dept-query-selector-input" data-dept-id="" style="color: rgb(204, 204, 204);">&nbsp;</span> 
									<span class="caret" style="float: right; margin-right: 8px;"></span>
								</button>
								<span id="dept-query-selector-remove" aria-hidden="true" class="glyphicon glyphicon-remove-circle" style="display: none; position: absolute; top: 9px; right: 30px; color: rgb(204, 204, 204); z-index: 100; cursor: pointer;"></span>
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
							
						</div>
					</div>
					<div class="search-simple-rule"></div>
					<!-- 搜索 -->
					<div class="table-view-search-btn">
						<div class="guide-search-btn mdui-ripple"></div>
					</div>
				</div>
				<!-- 正文 -->
				<div class="table-view-data-area auto-min-height" style="width:96%;">
					<paginateEnforceLogTable></paginateEnforceLogTable>
				</div>
				
			</div>
		</div>
  	</div>
</template>
<script type="text/javascript">
	import $axios from 'axios';
	import paginateEnforceLogTable from '../paginateEnforceLogTable.vue'
  	export default { //这里需要将模块引出，可在其他地方使用
		components:{
			paginateEnforceLogTable
		},
		data (){ //注意：data即使不需要传数据，也必须return,否则会报错
			return {
				
			}
		},
		methods:{
			/* 所属机构选择（删除项）*/
			deleteSelectDept(){
				$('#dept-query-selector-remove').click(function () {
					$('#dept-query-selector-input').html('&nbsp;');
					$('#dept-query-selector-input').attr('data-dept-id', '');
					$('#dept-query-selector-remove').css('display', 'none');
				});
			},
		},
		mounted() {
			this.deleteSelectDept();		
		},
  	}
</script>

<style type="text/css" scoped>
	@import "../../../static/css/common.css"; 
	@import "../../../static/mdui-v0.4.0/css/mdui.min.css";
	@import "../../../static/css/cover.css"; 
	@import "../../../static/css/page/enforceManage.css"; 
	@import "../../../static/css/table-view.css"; 
</style>
<style type="text/css" scoped>
	
</style>