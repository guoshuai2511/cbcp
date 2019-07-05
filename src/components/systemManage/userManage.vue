<template>
  <div class="userManage" v-wechat-title="$route.meta.title">
    <div class="guide-frame" style="height:911px;">
		<div class="guide-title" style="margin-left: -22px">用户管理</div>
		<div class="table-view-container">
			<div id="table-view-container-box" style="background: #07203e;"> 
				<div class="table-view-search-area">
					<!-- 账号 -->
					<div
						class="input-group input-group-sm search-item search-item-width-sm">
						<span class="input-group-addon input-group-title" id="query-id">账号</span>
						<input type="text" class="input-background"
							id="name-value" maxlength="16">
					</div>
					<!-- 停启用状态 -->
					<div
						class="input-group input-group-sm search-item search-item-width-sm">
						<span class="input-group-addon input-group-title"
							id="query-phone-num">停启用状态</span>
						<div class="btn-group">
							<button type="button" id="sex-button"
								style="width: 200px; text-align: left; border: none;background: #011731; color: rgb(204, 204, 204); margin-left:10px;"
								class="btn btn-default btn-sm dropdown-toggle"
								data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								<span id="locked-input" style="color: rgb(204, 204, 204);">&nbsp;</span>
								<span class="caret" style="float: right; margin-top: 6px;"></span>
							</button>
							<span id="locked-remove" class="glyphicon glyphicon-remove-circle"
								aria-hidden="true"
								style="display: none; position: absolute; top: 7px; right: 30px; color: rgb(204, 204, 204); z-index: 100; cursor: pointer;"></span>
							<ul class="dropdown-menu" style="width: 220px;">
								<li><a class="locked-selector">已启用</a></li>
								<li><a class="locked-selector">已停用</a></li>
							</ul>
						</div>
					</div>
					<!-- 真实姓名 -->
					<div
						class="input-group input-group-sm search-item search-item-width-sm">
						<span class="input-group-addon input-group-title"
							id="query-phone-num">真实姓名</span> <input type="text"
							class="input-background" id="realname-value"
							maxlength="16">
					</div>
					<!-- 手机号 -->
					<div class="input-group input-group-sm search-item search-item-width-sm">
						<span class="input-group-addon input-group-title" id="query-phone-num">手机号</span> 
						<input type="text" class="input-background" id="phone-num-value" maxlength="11">
					</div>
					<!-- 角色 -->
					<div
						class="input-group input-group-sm search-item search-item-width-sm">
						<span class="input-group-addon input-group-title"
							id="query-phone-num">角色</span>
						<div class="btn-group">
							<button type="button" id="role-selector-button" style="margin-left:10px;width: 200px; text-align: left; border: none;background: #011731; color: rgb(204, 204, 204);"
								class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								<span id="role-selector-input" data-role-id="" style="color: rgb(204, 204, 204);">&nbsp;</span> 
								<span class="caret" style="float: right; margin-top: 6px;"></span>
							</button>
							<span id="role-selector-remove" class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>
							<ul class="dropdown-menu" style="width: 220px;" id="role-selector-container">
							</ul>
						</div>
					</div>
					<!-- 所属机构 -->
					<div class="input-group input-group-sm search-item search-item-width-sm">
						<span class="input-group-addon input-group-title"
							id="query-phone-num">所属机构</span>
						<div class="btn-group">
							<button type="button" id="dept-selector-button" style="margin-left:10px;width: 200px; height:34px;text-align: left; border: none;background: #011731;color: rgb(204, 204, 204); padding-left:13px"
								class="btn btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								<span id="dept-query-selector-input" data-dept-id="" style="color: rgb(204, 204, 204);">&nbsp;</span> 
								<span class="caret" style="float: right; margin-right: 8px;"></span>
							</button>
							<span id="dept-query-selector-remove" class="glyphicon glyphicon-remove-circle" aria-hidden="true"
								style="display: none; position: absolute; top: 9px; right: 30px; color: rgb(204, 204, 204); z-index: 100; cursor: pointer;"></span>
							<ul class="dropdown-menu" style="width: 220px;">
								<div id="dept-query-selector-container"
									style="width: 218px; min-height: 50px; max-height: 350px; height: auto; background: #fff; border-radius: 3px; overflow-x: auto; overflow-y: auto; z-index: 1000;">
									<div class="ztree" id="dept-query-selector-tree"></div>
								</div>
							</ul>
						</div>
					</div>
				</div>
				<div class="search-simple-rule"></div>
				<!-- 搜索 -->
				<div class="table-view-search-btn">
					<div class="guide-search-btn mdui-ripple">
					</div>
				</div>
			</div>
			<div class="table-view-data-area auto-min-height" style="min-height:0px;">
				<!-- 表格 -->
				<paginateTable v-bind:url="url"></paginateTable>
			</div>
		</div>

	</div>

	<!-- Modal用户信息 -->
	<div class="modal fade" id="user-modal" data-backdrop="static"
		data-keyboard="false" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document" style="width:900px;margin-left: 28%;">
			<div class="modal-content" id="user-input-modal"></div>
		</div>
	</div>

	<!-- 角色选择-->
	<div class="modal fade bs-example-modal-lg" id="role-selector-modal"
		data-backdrop="static" data-keyboard="false" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel">
		<div class="modal-dialog modal-lg" role="document" style="margin-left:28%">
			<div class="modal-content">
				<div class="modal-header" style="margin-left:24px;">
					<h4 class="modal-title" style="margin-left:-14px;">角色选择</h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
		        		<span aria-hidden="true" class="add-user-close"></span>
					</button>
				</div>
				<div class="modal-body" style="overflow: hidden;">
					<div style="width: 100%; height: 500px;">
						<div class="dept-modal-area dept-modal-area-one">
							<div class="dept-selector-modal-title">已选角色</div>
							<div class="dept-selector-modal-container dept-selector-modal-container-selected"
								id="role-selected-area"></div>
						</div>
						<div class="dept-modal-area dept-modal-area-2">
							<div class="dept-selector-modal-title">角色列表</div>
							<div class="dept-selector-modal-container ztree selector-modal-box"
								id="role-selector-panel"></div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary dept-selector-ensure" data-dismiss="modal"	id="role-selector-ensure">确定</button>
					<button type="button" class="btn btn-default dept-selector-cancel" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Modal查看信息 -->
	<div class="modal fade" id="userinfo-view-modal" data-backdrop="static"
		data-keyboard="false" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document" style="margin-left:28%;">
			<div class="modal-content" style="width:770px;">
				<div class="modal-header">
					<h4 class="modal-title h4-information">查看用户信息</h4>
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
		                <span aria-hidden="true" class="add-user-close"></span> 
					</button>
				</div>
				<div class="modal-body" id="user-info-content"></div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				</div>
			</div>
		</div>
	</div>

	<!-- 组织机构选择 -->
	<div class="modal fade bs-example-modal-lg" id="dept-selector-modal"
		data-backdrop="static" data-keyboard="false" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel">
		<div class="modal-dialog modal-lg" role="document" style="margin-left:31%">
			<div class="modal-content">
				<div class="modal-header" style="margin-left:24px;">
					<h4 class="modal-title" style="margin-left:-14px;">机构选择</h4>
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
		                <span aria-hidden="true" class="add-user-close"></span>
					</button>
				</div>
				<div class="modal-body" style="overflow: hidden;">
					<div style="width: 100%; height: 500px;">
						<div class="dept-modal-area dept-modal-area-one">
							<div class="dept-selector-modal-title">已选机构</div>
							<div class="dept-selector-modal-container dept-selector-modal-container-selected" id="dept-selected-area"></div>
						</div>
						<div class="dept-modal-area dept-modal-area-2">
							<div class="dept-selector-modal-title">机构列表</div>
							<div class="dept-selector-modal-container ztree selector-modal-box" id="dept-selector-tree"></div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary dept-selector-ensure" data-dismiss="modal"	id="dept-selector-ensure">确定</button>
					<button type="button" class="btn btn-default dept-selector-cancel" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
	<!--guoshuai start 8-25-->
	<!-- 设备使用角色选择 -->
	<div class="modal fade bs-example-modal-lg" id="devrole-selector-modal"
		data-backdrop="static" data-keyboard="false" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">		
					<h4 class="modal-title">设备角色选择</h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          		<span aria-hidden="true" class="add-user-close"></span>
					</button>
				</div>
				<div class="modal-body">
					<div style="width: 100%; height: 500px;">
						<div class="dept-modal-area dept-modal-area-one">
							<div class="dept-selector-modal-title">已选</div>
							<div class="dept-selector-modal-container" id="dev-user-role-selected-area"></div>
						</div>
						<div class="dept-modal-area dept-modal-area-2">
							<div class="dept-selector-modal-title">列表</div>
							<div class="dept-selector-modal-container" id="dev-user-role-selector-panel"></div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" data-dismiss="modal" id="dev-user-role-selector-ensure">确定</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
	<div class="modal fade bs-example-modal-lg" id="devuse-selector-modal"
		data-backdrop="static" data-keyboard="false" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">设备使用权限选择</h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          		<span aria-hidden="true" class="add-user-close"></span>
					</button>
				</div>
				<div class="modal-body">
					<div style="width: 100%; height: 500px;">
						<div class="dept-modal-area dept-modal-area-one">
							<div class="dept-selector-modal-title">已选</div>
							<div class="dept-selector-modal-container" id="dev-user-role-selected-area"></div>
						</div>
						<div class="dept-modal-area dept-modal-area-2">
							<div class="dept-selector-modal-title">列表</div>
							<div class="dept-selector-modal-container" id="dev-use-rights-selector-panel"></div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" data-dismiss="modal" id="dev-user-role-selector-ensure">确定</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
	<div class="modal fade bs-example-modal-lg" id="targetphone-selector-modal"
		data-backdrop="static" data-keyboard="false" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">目标手机号权限选择</h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
		        		<span aria-hidden="true" class="add-user-close"></span>
					</button>
				</div>
				<div class="modal-body">
					<div style="width: 100%; height: 500px;">
						<div class="dept-modal-area dept-modal-area-one">
							<div class="dept-selector-modal-title">已选</div>
							<div class="dept-selector-modal-container" id="dev-user-role-selected-area"></div>
						</div>
						<div class="dept-modal-area dept-modal-area-2">
							<div class="dept-selector-modal-title">列表</div>
							<div class="dept-selector-modal-container" id="tar-phone-rights-selector-panel"></div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" data-dismiss="modal" id="dev-user-role-selector-ensure">确定</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
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
				<div class="modal-header" style="margin-left:8px;">
					<h4 class="modal-title" id="myModalLabel">确认</h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
		        		<span aria-hidden="true" class="add-user-close"></span>
					</button>
				</div>
				<div class="modal-body" id="modal-alert-content"></div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" id="ensure-modal-submit">确定</button>
					<button type="button" class="btn btn-primary" data-dismiss="modal" style="margin-left:5px;">取消</button>
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
					<h4 class="modal-title" id="alert-modal-title">提示</h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
		        		<span aria-hidden="true" class="add-user-close"></span>
					</button>
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
			<img class="loading-gif" src="../../../static/img/loading.gif"> 
			<span class="loading-word">正在提交...</span>
		</div>
	</div>
  </div>
</template>
<script type="text/javascript">
	import headerTOP from '../Header';
	import $axios from 'axios';
	import { DrawTable } from '../../../static/page/userManage/table/table.js';

	import paginateTable from '../paginateUserManageTable';
	import '../../../static/lib/bootstrarp/js/bootstrap.min.js';
	/* mdui */
	import "../../../static/lib/mdui-v0.4.0/js/mdui.min.js";
  	export default { //这里需要将模块引出，可在其他地方使用
		components:{
			'headerTOP':headerTOP,
			paginateTable
		},
		data (){ //注意：data即使不需要传数据，也必须return,否则会报错
			return {
				url:'http://localhost:9090/static/getUserList.json',
			}
		},
		methods:{
			
			 handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
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

<style type="text/css">
	@import "../../../static/css/common.css"; 
	@import "../../../static/mdui-v0.4.0/css/mdui.min.css";
	@import "../../../static/css/cover.css"; 
	
	@import "../../../static/css/table-view.css"; 
	@import "../../../static/css/page/userManage.css"; 
</style>
