<template>
  	<div class="caseManage" v-wechat-title="$route.meta.title">
		<div class="guide-frame">
			<div class="guide-title" style="margin-left: -22px">案件筛查</div>
			<div class="table-view-container">
				<div id="table-view-container-box" style="background: #07203e;"> 
					<div class="table-view-search-area">
						<div class="search-type-simple">
							<!-- 模糊搜索-->
							<div
								class="input-group input-group-sm search-item search-item-width-md">
								<span class="input-group-addon input-group-title">关键词</span> 
								<input
									type="text" class="form-control input-background"
									placeholder="输入作战成员/城市" id="query-key-word">
							</div>
							<!-- 审核状态 -->
							<div
								class="input-group input-group-sm search-item search-item-width-sm">
								<span class="input-group-addon input-group-title">审核状态</span>
								<div class="btn-group">
									<button type="button"
										style="width: 220px; text-align: left; margin-left:10px; border: none;background: #011731;color: rgb(204, 204, 204);"
										class="btn btn-default btn-sm dropdown-toggle"
										data-toggle="dropdown" aria-haspopup="true"
										aria-expanded="false">
										<span id="reviewStatus-search-input-out" data-status-type=""
											style="color: #fff;">&nbsp;</span> <span
											class="caret" style="float: right; margin-top: 6px;"></span>
									</button>
									<span id="reviewStatus-remove-out"
										class="glyphicon glyphicon-remove-circle" aria-hidden="true"
										style="display: none; position: absolute; top: 7px; right: 30px; color: rgb(204, 204, 204); z-index: 100; cursor: pointer;"></span>
									<ul class="dropdown-menu" style="width: 220px;">
										<li><a class="reviewStatus-search-selector-out"
											data-status-type="0">未审核</a></li>
										<li><a class="reviewStatus-search-selector-out"
											data-status-type="1">真实案件</a></li>
										<li><a class="reviewStatus-search-selector-out"
											data-status-type="-1">无效案件</a></li>
									</ul>
								</div>
							</div>
						</div>
						<div class="search-type-all">
							<!-- 案件名 -->
							<div
								class="input-group input-group-sm search-item search-item-width-sm">
								<span class="input-group-addon input-group-title">案件名</span> <input
									type="text" class="form-control input-background"
									id="query-case-name">
							</div>
							<!-- 标签 -->
							<div
								class="input-group input-group-sm search-item search-item-width-sm">
								<span class="input-group-addon input-group-title">标签</span> <input
									type="text" class="form-control input-background" id="query-tag">
							</div>
							<!-- 审核状态 -->
							<div
								class="input-group input-group-sm search-item search-item-width-sm">
								<span class="input-group-addon input-group-title">审核状态</span>
								<div class="btn-group">
									<button type="button"
										style="width: 230px; text-align: left; /*delete by guoshuai border: 1px solid rgb(204, 204, 204); background: rgb(60, 60, 60); end*/border: none;background: #011731;color: rgb(204, 204, 204);margin-left:14px;"
										class="btn btn-default btn-sm dropdown-toggle"
										data-toggle="dropdown" aria-haspopup="true"
										aria-expanded="false">
										<span id="reviewStatus-search-input" data-status-type=""
											style="color: rgb(204, 204, 204);">&nbsp;</span> <span
											class="caret" style="float: right; margin-top: 6px;"></span>
									</button>
									<span id="reviewStatus-remove"
										class="glyphicon glyphicon-remove-circle" aria-hidden="true"
										style="display: none; position: absolute; top: 7px; right: 30px; color: rgb(204, 204, 204); z-index: 100; cursor: pointer;"></span>
									<ul class="dropdown-menu" style="width: 220px;">
										<li><a class="reviewStatus-search-selector"
											data-status-type="0">未审核</a></li>
										<li><a class="reviewStatus-search-selector"
											data-status-type="1">真实案件</a></li>
										<li><a class="reviewStatus-search-selector"
											data-status-type="-1">无效案件</a></li>
									</ul>
								</div>
							</div>
							<!-- 作战成员 -->
							<div
								class="input-group input-group-sm search-item search-item-width-sm">
								<span class="input-group-addon input-group-title">作战成员</span> <input
									type="text" class="form-control input-background"
									id="query-user-name">
							</div>
							<!-- 作战城市 -->
							<div
								class="input-group input-group-sm search-item search-item-width-sm">
								<span class="input-group-addon input-group-title">作战城市</span> <input
									type="text" class="form-control input-background"
									id="query-area-code">
							</div>
							<!-- 设备编号-->
							<div
								class="input-group input-group-sm search-item search-item-width-sm">
								<span class="input-group-addon input-group-title">设备编号</span> <input
									type="text" class="form-control input-background"
									id="query-dev-code">
							</div>
							<!-- 评分-->
							<div
								class="input-group input-group-sm search-item search-item-width-sm">
								<span class="input-group-addon input-group-title">评分</span>
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
									<div class="time-range-selector-item" id="custom-type-input"
										style=" margin-top: 1px; display: none;">
										<input type="text" id="query-time-start-time"
											class="form-control input-background input-data-picker-md"
											onclick="WdatePicker({maxDate:'#F{$dp.$D(\'query-time-end-time\')||\'%y-%M-%d\'}',dateFmt:'yyyy-MM-dd HH:mm:ss'})"><span
											class="input-inwords">至</span><input type="text"
											id="query-time-end-time"
											class="form-control input-background input-data-picker-md"
											onclick="WdatePicker({minDate:'#F{$dp.$D(\'query-time-start-time\')}',maxDate:'%y-%M-%d',dateFmt:'yyyy-MM-dd HH:mm:ss'})">
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
				<div class="table-view-data-area auto-min-height">
					<caseManageTable></caseManageTable>
				</div>	
			</div>
		</div>

		<div class="submit-loading">
			<div class="loading-area">
				<img class="loading-gif" src="img/loading.gif">
				<span class="loading-word">正在提交...</span>
			</div>
		</div>

		<!-- 案件新增/审核modal -->
		<div class="modal fade" id="case-operation-modal"
			data-backdrop="static" data-keyboard="false" tabindex="-1"
			role="dialog" aria-labelledby="myModalLabel">
			<div class="modal-dialog" role="document">
				<div class="modal-content" id="case-operation-content"></div>
			</div>
		</div>

		<!-- Modal-Alert提示框 -->
		<div class="modal fade bs-example-modal-sm" id="alert-modal"
			data-backdrop="static" data-keyboard="false" tabindex="-1"
			role="dialog" aria-labelledby="myModalLabel">
			<div class="modal-dialog modal-sm" role="document">
				<div class="modal-content">
					<div class="modal-header" style="margin-left: 8px;">
						<h4 class="modal-title" id="alert-modal-title">提示</h4>
						<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true" class="add-user-close"></span>
						</button>
					</div>
					<div class="modal-body" id="alert-modal-content"></div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary" data-dismiss="modal"
							id="alert-modal-button">确定</button>
					</div>
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
  	import caseManageTable from '../caseManageTable';
  	export default { //这里需要将模块引出，可在其他地方使用
		components:{
			caseManageTable
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
	@import "../../../static/css/page/caseManage.css"; 
	@import "../../../static/css/table-view.css"; 
</style>
