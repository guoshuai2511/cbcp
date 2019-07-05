<template>
  	<div class="roleManage" v-wechat-title="$route.meta.title">
		<div class="guide-frame">
			<div class="guide-title" style="margin-left: -22px">平台用户功能管理</div>
			<div class="table-view-container" id="role-table-list" style="display: block;">
				<button id="add-role-btn" class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-blue add-role-table-btn">新增角色</button>
				<!-- 正文 -->
				<div class="table-view-data-area auto-min-height" style="margin-top: -20px;">
					<!-- 表格 -->
					<roleManageTable></roleManageTable>
				</div>	
			</div>	
			<div class="table-view-container" id="add-role-area" style="display: none;"></div>
		</div>
		<!-- Modal确认框 -->
		<div class="modal fade bs-example-modal-sm" id="ensure-modal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
			<div class="modal-dialog modal-sm" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true" class="add-user-close"></span>
						</button>
						<h4 class="modal-title" id="myModalLabel">确认</h4>
					</div>
					<div class="modal-body" id="modal-alert-content"></div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default"
							id="ensure-modal-submit" data-dismiss="modal">确定</button>
						<button type="button" class="btn btn-primary" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>
		<!-- Modal-Alert提示框 -->
		<div class="modal fade bs-example-modal-sm" id="alert-modal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
			<div class="modal-dialog modal-sm" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true" class="add-user-close"></span>
						</button>
						<h4 class="modal-title" id="alert-modal-title">提示</h4>
					</div>
					<div class="modal-body" id="alert-modal-content"></div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary" data-dismiss="modal" id="alert-modal-button">确定</button>
					</div>
				</div>
			</div>
		</div>
		<div class="submit-loading">
			<div class="loading-area">
				<img class="loading-gif" src="img/loading.gif"> 
				<span class="loading-word">正在提交...</span>
			</div>
		</div>
		<roleManageUserListTable style="display:none"></roleManageUserListTable>
  	</div>
</template>
<script type="text/javascript">
	import $axios from 'axios';
	import '../../../static/lib/bootstrarp/js/bootstrap.min.js';
	/* mdui */
	import "../../../static/lib/mdui-v0.4.0/js/mdui.min.js";
	import roleManageTable from '../roleManageTable';
	import roleManageUserListTable from '../roleManageUserListTable';
  	export default { //这里需要将模块引出，可在其他地方使用
		components:{
			roleManageTable,
			roleManageUserListTable
		},
		data (){ //注意：data即使不需要传数据，也必须return,否则会报错
			return {
				
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
	@import "../../../static/css/page/roleManage.css"; 
	@import "../../../static/css/table-view.css"; 
</style>
