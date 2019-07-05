<template>
  <div class="deptManage" v-wechat-title="$route.meta.title">
    <div class="guide-frame">
		<div class="guide-title" style="margin-left:-22px;">组织机构管理</div>
		<ul class="nav nav-tabs guide-nav">
		</ul>
		<div class="table-view-container">
			<div class="dept-btn-area">
				<button id="add-dept-btn"
					class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-blue dept-control-btn">新增组织</button>
				<button id="delete-dept-btn"
					class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-pink dept-control-btn">删除组织</button>
			</div>
			<div id="dept-content-title"
				style="position: absolute; left: 31%; top: 18px; font-size: 23px;color: #23b5e8;"></div>
			<div class="dept-content-area">
				<div class="dept-content-area-each" style="width: 30%;">
					<div class="ztree" id="dept-show-area"></div>
				</div>
				<div class="dept-content-area-each" id="dept-info-panel"
					style="width: 66%;"></div>
			</div>
		</div>
	</div>
	<!-- 组织机构选择 -->
	<div class="modal fade bs-example-modal-lg" id="dept-selector-modal"
		data-backdrop="static" data-keyboard="false" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header" style="margin-left:18px;">
					<h4 class="modal-title">机构选择</h4>
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
		                <span aria-hidden="true" class="add-user-close"></span>
					</button>
				</div>
				<div class="modal-body" style="height:auto;overflow:hidden;">
					<div style="width: 100%; height: 500px;">
						<div class="dept-modal-area dept-modal-area-one">
							<div class="dept-selector-modal-title">已选机构</div>
							<div class="dept-selector-modal-container dept-selector-modal-container-selected" id="dept-selected-area"></div>
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

	<!-- 下属人员 -->
	<div class="modal fade bs-example-modal-lg" id="dept-user-modal"
		data-backdrop="static" data-keyboard="false" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel">
		<div class="modal-dialog modal-lg" role="document" style="margin-left:28%;">
			<div class="modal-content" style="padding-left: 24px;padding-right: 24px;">
				<div class="modal-header">
					<h4 class="modal-title" id="dept-user-title"></h4>
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
                        <span aria-hidden="true" class="add-user-close"></span>
					</button>
				</div>
				<div class="modal-body">
					<div style="min-height: 430px;">
						<paginateDeptManageTable></paginateDeptManageTable>
						<div class="no-data-tablesarch-in-modal">
							<img class="no-data-icon-in-modal"
								src="img/no_data_icon_search.png"> <span
								class="no-data-word-in-modal">该机构无下属人员</span>
						</div>
					</div>
					
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
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
					<h4 class="modal-title" id="myModalLabel">确认</h4>
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
		                <span aria-hidden="true" class="add-user-close"></span>
					</button>
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
				<div class="modal-header" style="margin-left:8px;">
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
	<!--正在加载-->
	<div class="submit-loading">
		<div class="loading-area">
			<img class="loading-gif" src="img/loading.gif"> <span
				class="loading-word">正在提交...</span>
		</div>
	</div>
  </div>
</template>
<script type="text/javascript">
	import $axios from 'axios';
	import paginateDeptManageTable from '../paginateDeptManageTable';
	import '../../../static/lib/bootstrarp/js/bootstrap.min.js';
	/* mdui */
	import "../../../static/lib/mdui-v0.4.0/js/mdui.min.js";
  	let isDeptNameTrueType = 0;
	let currentSelectedDept;
	/* 用户每页显示数量*/
	let userPageItemNum = 10;

	/* 更新类，添加类*/
	class DeptVo {
		constructor() {
			this.deptId;
			this.parentId;
			this.name;
			this.remark;
			this.createrId;
			this.createTime;
			this.updaterId;
			this.updateTime;
		}
	}

	/* 用户类*/
	class UserBean {
		constructor() {
			this.username; 
			this.realname;
			this.tel;
			this.locked;
			this.deptId;
			this.roleId;
			this.pageSize;
			this.pageNum;
		}
	}

	let userQueryCache;
  	export default { //这里需要将模块引出，可在其他地方使用
		components:{
			paginateDeptManageTable
		},
		data (){ //注意：data即使不需要传数据，也必须return,否则会报错
			return {
				deptTreeCache:[],
			}
		},
		methods:{
			//获取含机构的json数据
			getDeptList(){
				 $axios.get('http://localhost:9090/static/getDeptTreeList.json').then(resultS => {
					let result = resultS.data.dataList;
					this.deptTreeCache = result;
					console.log(result);
					this.drawTree(result);
				});
			},
			 //画树状数据结构
			drawTree(data) {
				let self = this;
				let resultCache = this.deptTreeCache;
				let treeData = this.parsingDataToTree(data);
				let pageAreaSetting = {
					view: {
						showIcon: false,
						fontCss: { color: '#dedede', "font-size": "20px" }
					},
					callback: {
						onClick: function (event, treeId, treeNode) {
							for (let i = 0; i < resultCache.length; i++) {
								if (resultCache[i].deptId == treeNode.deptId) {
									isDeptNameTrueType = 2;
									currentSelectedDept = resultCache[i];
									$('#dept-content-title').html(`${resultCache[i].name}&nbsp;&nbsp;基本信息`);
									self.draw(resultCache, resultCache[i], 'update');
									break;
								}
							}
						}
					},
        		};
				let panelAreaSetting = {
					view: {
						showIcon: false,
						fontCss: { color: '#dedede', "font-size": "20px" }
					},
					callback: {
						onClick: function (event, treeId, treeNode) {
							let temp = treeNode;
							let parentNodes = [];
							while (true) {
								if (temp != null) {
									parentNodes.push(temp);
									temp = temp.getParentNode();
								} else {
									break;
								}
							}
							let htmlValue = `
								<div class="each-divinner-item">
									<span class="selected-institutions-value-modal" id="selected-institutions-value" data-dept-id="${treeNode.deptId}">${treeNode.name}</span>
									<i class="iconfont icon-x-close item-close selected-dept-modal-item-delete"></i>
								</div>
							`;
							$('#dept-selected-area').html(htmlValue);
							// console.log(parentNodes);
						}
					},
				};
				$.fn.zTree.init($('#dept-show-area'), pageAreaSetting, treeData);
				$.fn.zTree.init($('#dept-selector-tree'), panelAreaSetting, treeData);
			},
			//将数控处理成树状数据
			parsingDataToTree(data,deptTreeCache) {
				let layerIndex = data[0].layer;
				let treeData = [];
				function getTreeEval(layer) {
					let defaultValue = 'treeData';
					for (let i = layerIndex; i < layer; i++) {
						defaultValue = `${defaultValue}[${defaultValue}.length - 1].children`;
					}
					return (defaultValue);
				}
				for (let i = 0; i < data.length; i++) {
					if (data[i].name != '') {
						eval(`
							if (${getTreeEval(data[i].layer)} == null) {
								${getTreeEval(data[i].layer)} = [];
							}
							${getTreeEval(data[i].layer)}.push({ name: data[i].name, open: true, deptId: data[i].deptId });
						`);
					}
				}
			
				return treeData;
			},
			main(){
				/* 禁止输入空格*/
				$(document).on('keyup blur', '.input-space-forbidden', function () {
					this.value = this.value.replace(/\s+/g, '');
				});
				/* 选取上级组织*/
				$(document).on('click', '.selected-dept-modal-item-delete', function () {
					$($(this).parent()).remove();
					let treeObj = $.fn.zTree.getZTreeObj('dept-selector-tree');
					// let nodes = treeObj.getSelectedNodes();
					treeObj.cancelSelectedNode();
				});
				/* 选取上级组织modal确定*/
				$('#dept-selector-ensure').click(function () {
					let deptName = $('#selected-institutions-value').html();
					let deptId = $('#selected-institutions-value').attr('data-dept-id');
					$('#dept-update-input-parentId').html(`${deptName == null ? '' : deptName}`);
					$('#dept-update-input-parentId').attr('data-dept-id', `${deptId == null ? '' : deptId}`);
				});
				/* 删除组织机构*/
				$('#delete-dept-btn').click(function () {
					if (currentSelectedDept == null) {
						$('#alert-modal-content').html('未选择组织机构');
						$('#alert-modal').modal('show');
					} else {
						$('.loading-gif').attr('src', 'img/loading.gif');
						$('.loading-word').html('正在提交...')
						$('.submit-loading').css('display', 'block');
						deptOperation.operation(null, `deleteDept/${currentSelectedDept.deptId}`, 'GET').then((result) => {
							console.log(result);
							if (result.retcode == 1) {
								$('.loading-gif').attr('src', 'img/submit_success.png');
								$('.loading-word').html(`<span style="color: rgb(10, 180, 0)">删除成功</span>`);
								$('#dept-content-title').html('');
								$('#dept-info-panel').html('');
								queryDefault();
							} else {
								$('.loading-gif').attr('src', 'img/submit_fail.png');
								$('.loading-word').html(`<span style="color: rgb(255, 120, 120);">删除失败</span>`);
							}
							setTimeout(function () {
								$('.submit-loading').fadeOut(800);
							}, 1000);
						});
					}
				});

				/* 组织名是否重复*/
				$(document).on('blur', '#dept-update-input-name', function () {
					let inputName = $(this).val();
					if (inputName != '') {
						deptOperation.operation(null, `checkDeptName/${$(this).attr('data-type')}/${inputName}/${$(this).attr('data-dept-id') == '' ? 0 : $(this).attr('data-dept-id')}`, 'GET').then((result) => {
							console.log(result);
							if (result.retcode == 1) {
								$('#is-deptname-true').css('color', '#00ffd0');
								$('#is-deptname-true').html('机构名可用');
								isDeptNameTrueType = 2;
							} else {
								$('#is-deptname-true').css('color', '#ff0000');
								$('#is-deptname-true').html('机构名已存在');
								isDeptNameTrueType = 1;
							}
						});
					}
				});

				/* 选择上级组织机构*/
				$(document).on('click', '.dept-selector-item', function () {
					$('#dept-update-input-parentId').html($(this).html());
					$('#dept-update-input-parentId').attr('data-dept-id', $(this).attr('data-dept-id'));
				});
				let deptTreeCache = this.deptTreeCache;
				let self = this;
				/* 新增组织机构*/
				$('#add-dept-btn').click(function () {
					isDeptNameTrueType = 0;
					currentSelectedDept = null;
					$('#dept-content-title').html('新增组织');
					self.draw(deptTreeCache, {}, 'add');
				});
				/* 更新组织机构*/
				$(document).on('click', '#update-dept-btn', function () {
					let deptUpdateData = new DeptVo();
					/* 组织机构ID*/
					if ($(this).attr('data-dept-id') != '') {
						deptUpdateData.deptId = Number($(this).attr('data-dept-id'));
					}
					/* 组织机构名称*/
					switch (isDeptNameTrueType) {
						case 0:
							$('#alert-modal-content').html('请输入机构名');
							$('#alert-modal').modal('show');
							return;
						case 1:
							$('#alert-modal-content').html('机构名已存在');
							$('#alert-modal').modal('show');
							return;
						case 2:
							break;
						default:
							break;
					}
					if ($(this).attr('data-type') == 'add' && $('#dept-update-input-parentId').attr('data-dept-id') == '') {
						$('#alert-modal-content').html('请选择上级组织机构');
						$('#alert-modal').modal('show');
						return;
					}
					deptUpdateData.name = $('#dept-update-input-name').val();
					/* 上级组织机构*/
					if ($(this).attr('data-type') == 'add') {
						deptUpdateData.parentId = Number($('#dept-update-input-parentId').attr('data-dept-id'));
					}
					/* 组织机构描述*/
					deptUpdateData.remark = $('#dept-update-input-remark').val();
					console.log(deptUpdateData);
					$('.loading-gif').attr('src', 'img/loading.gif');
					$('.loading-word').html('正在提交...')
					$('.submit-loading').css('display', 'block');
					deptOperation.operation(deptUpdateData, `${$(this).attr('data-type')}Dept`, 'POST').then((result) => {
						console.log(result);
						if (result.retcode == 1) {
							$('.loading-gif').attr('src', 'img/submit_success.png');
							$('.loading-word').html(`<span style="color: rgb(10, 180, 0)">${$(this).attr('data-type') == 'add' ? '添加' : '修改'}成功</span>`);
							queryDefault();
							if ($(this).attr('data-type') == 'add') {
								$('#dept-update-input-name').val('');
								$('#dept-update-input-remark').val('');
								$('#dept-update-input-parentId').html('');
								$('#dept-update-input-parentId').attr('data-dept-id', '');
								$('#dept-selected-area').html('');
								$('#is-deptname-true').css('display','none');
							}
						} else {
							$('.loading-gif').attr('src', 'img/submit_fail.png');
							$('.loading-word').html(`<span style="color: rgb(255, 120, 120);">${$(this).attr('data-type') == 'add' ? '添加' : '修改'}失败</span>`);
						}
						setTimeout(function () {
							$('.submit-loading').fadeOut(800);
						}, 1000);
					});
				});	
			},
			//画组织机构主干
			draw(allData, data, type) {
				let parentDept = {};
				let parentItemHtml = '';
				if (data != null) {
					for (let i = 0; i < allData.length; i++) {
						if (data.layer != null) {
							if (allData[i].layer < data.layer) {
								parentDept = allData[i];
							}
							if (allData[i].deptId == data.deptId) {
								break;
							}
						}
					}
				}
				let htmlValue = `
					<div class="input-group modal-input">
						<span class="input-group-addon modal-input-title">
						<span class="text-red">*</span>&nbsp;组织机构名称</span>
						<input type="text" value="${data.name == null ? '' : data.name}" data-type="${type}" data-dept-id="${data.deptId == null ? '' : data.deptId}"
							class="modal-input-area modal-input-background input-space-forbidden dept_input" id="dept-update-input-name" maxlength="16">
						<span class="input-check" id="is-deptname-true"></span>
					</div>
					<div class="input-group modal-input">
						<span class="input-group-addon modal-input-title">
							<span class="text-red">*</span>&nbsp;上级组织机构
						</span>
						<div class="btn-group">
							<button type="button" ${type == 'add' ? '' : 'disabled="disabled"'}  data-toggle="modal" data-target="#dept-selector-modal"
								style="width: 200px; height:34px; text-align: left; color: #fff; margin-left:16px;"
								class="btn btn-default btn-sm dept_input" id="dept-update-input-parentId" data-dept-id="${parentDept.deptId == null ? '' : parentDept.deptId}">
								${parentDept.name == null ? '' : parentDept.name}
							</button>
							<ul class="dropdown-menu" style="width: 200px; cursor: pointer;">
								${parentItemHtml}
							</ul>
						</div>
					</div>
					<div class="input-group modal-input">
						<span class="input-group-addon modal-input-title">组织架构描述</span>
						<textarea style="width: 300px !important;" rows="3" id="dept-update-input-remark" class="modal-input-background dept_text_area" maxlength="140">${data.remark == null ? '' : data.remark}</textarea>
					</div>
					<div class="update-btn">
						${type == 'update' ? `
						<button data-dept-name="${data.name}" data-dept-id="${data.deptId}" class="view-user-btn">查看下属人员</button>
						` : ''}
						<button id="update-dept-btn" data-dept-id="${data.deptId == null ? '' : data.deptId}" data-type="${type}" style="${this.changeCssStyle(type)}">${type == 'add' ? '提交' : '更新'}</button>
					</div>
				`;
				$('#dept-info-panel').html(htmlValue);
			},
			//查看机构下属成员
			viewDeptUser(){
				$(document).on('click', '.view-user-btn', function () {
					  $('#dept-user-modal').modal('show');
					  $('#dept-user-title').html($(this).attr('data-dept-name') + '&nbsp;&nbsp;下属成员')
				});
			},
			changeCssStyle(val){
				if(val == 'add'){
					return 'margin-left:66px;margin-top:20px';
				} else{
					return 'margin-left:20px;';
				}
			},
		},
		mounted() {
			this.main();
			this.getDeptList();
			this.viewDeptUser();
		},

  }
</script>

<style type="text/css">
	@import "../../../static/css/common.css"; 
	@import "../../../static/mdui-v0.4.0/css/mdui.min.css";
	@import "../../../static/css/cover.css"; 
	@import "../../../static/css/page/deptManage.css"; 
	@import "../../../static/css/table-view.css"; 
</style>
