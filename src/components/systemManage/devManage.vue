<template>
  	<div class="devManage" v-wechat-title="$route.meta.title">
		<div class="guide-frame">
			<div class="guide-title" style="margin-left: -22px">设备管理</div>
			<div class="table-view-container">
				<div id="table-view-container-box" style="background: #07203e; height: 85px;"> 
					<div class="table-view-search-area">
						<!-- 账号 -->
						<div class="input-group input-group-sm search-item search-item-width-sm">
							<span class="input-group-addon input-group-title" id="query-id">设备名称</span>
							<input type="text" class="form-control input-background" id="name-value" aria-describedby="basic-addon3">
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
					<devManageTable></devManageTable>
				</div>
			</div>
			<!-- Modal查看信息 -->
			<div class="modal fade" id="devinfo-view-modal" data-backdrop="false"
				data-keyboard="false" tabindex="-1" role="dialog"
				aria-labelledby="myModalLabel">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true" class="add-user-close"></span>
							</button>
							<h4 class="modal-title">查看设备信息</h4>
						</div>
						<div class="modal-body" id="dev-info-content"></div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
						</div>
					</div>
				</div>
			</div>
			<!-- Modal设备信息 -->
			<div class="modal fade" id="dev-modal" data-backdrop="false"
				data-keyboard="false" tabindex="-1" role="dialog"
				aria-labelledby="myModalLabel">
				<div class="modal-dialog" role="document">
					<div class="modal-content" id="dev-input-modal"></div>
				</div>
			</div>
			<!-- 组织机构选择 -->
			<div class="modal fade bs-example-modal-lg" id="dept-selector-modal"
				data-backdrop="false" data-keyboard="false" tabindex="-1"
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
				data-backdrop="false" data-keyboard="false" tabindex="-1"
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
			<!--个别删除模态框-->
			<div class="modal fade bs-example-modal-sm" id="ensure-modal"
				data-backdrop="false" data-keyboard="false" tabindex="-1"
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
			<!-- 标注设备位置地图模态框 -->
			<div class="modal fade bs-example-modal-lg" id="dev-position-modal"
			data-backdrop="false" data-keyboard="false" tabindex="-1"
			role="dialog" aria-labelledby="myLargeModalLabel">
				<div class="modal-dialog modal-lg" role="document" style="margin-left:30%;">
					<div class="modal-content">
						<div class="modal-header">
							<h4 class="modal-title">设备上报位置</h4>
							<button type="button" class="close" data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true" class="add-user-close"></span>
							</button>
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
			<div class="submit-loading">
				<div class="loading-area">
					<img class="loading-gif" src="../../../static/img/loading.gif"> <span
						class="loading-word">正在提交...</span>
				</div>
			</div>
		</div>
  	</div>
</template>
<script type="text/javascript">
	import $axios from 'axios';
	
	import '../../../static/lib/bootstrarp/js/bootstrap.min.js';
	/* mdui */
	import "../../../static/lib/mdui-v0.4.0/js/mdui.min.js";
  	import devManageTable from '../devManageTable';
  	export default { //这里需要将模块引出，可在其他地方使用
		components:{
			devManageTable
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
	@import "../../../static/css/page/devManage.css"; 
	@import "../../../static/css/table-view.css"; 
</style>
