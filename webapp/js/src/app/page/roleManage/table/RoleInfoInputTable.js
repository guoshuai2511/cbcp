import { RoleOperation } from '../ajax/RoleOperation.js';
import { InstitutionTree } from '../tree/InstitutionTree.js';
import { ControlAuthorityTree } from '../tree/ControlAuthorityTree.js';

import { RoleUser } from '../table/RoleUser.js';
import { PageInfo } from '../table/PageInfo.js';

export class RoleInfoInputTable {

    static drawTable(data, type, userPageItemNum) {

        switch (type) {
            case 'add':
                permissionDataType = 1;
                break;
            case 'update':
                permissionDataType = data.roleData.dataType;
                break;
            case 'view':
                permissionDataType = 1;
                break;
            default:
                break;
        }

        let checkDataType = { dataType: 1 };
        if (data.roleData != null) {
            checkDataType = data.roleData;
        }
        let htmlValue = `
        <button id="return-role-list-btn" class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-blue add-role-table-btn">返回列表</button>
        <div class="add-role-area">
            <ul class="nav nav-tabs guide-nav add-role-nav">
                <li role="presentation" class="guide-nav-item active">
                    <a class="nav-switch-item" data-click-id="add-role-base-authority">基本信息</a>
                </li>
                <li role="presentation" class="guide-nav-item">
                    <a class="nav-switch-item" data-click-id="add-role-control-authority">操作权限</a>
                </li>
                <li role="presentation" class="guide-nav-item">
                    <a class="nav-switch-item" data-click-id="add-role-data-authority">数据范围</a>
                </li>
                ${type != 'view' ? '' : `
                <li role="presentation" class="guide-nav-item">
                    <a class="nav-switch-item" data-click-id="role-user-list">下属人员</a>
                </li>
                `}
            </ul>
            <div class="add-role-each-container" id="add-role-base-authority" style="display: block">
                <div class="input-group modal-input">
                    <span class="input-group-addon modal-input-title">
                        <span class="text-red">*</span>&nbsp;名称
                    </span>
                    <input type="text" value="${data.roleName == null ? '' : data.roleName}" data-type="${type}" data-role-id="${data.roleId == null ? '' : data.roleId}" ${type == 'view' ? 'disabled="disabled' : ''}
                           id="add-role-rolename" class="form-control modal-input-area modal-input-background input-space-forbidden" maxlength="16">
                    <span class="input-check" id="is-rolename-true"></span>
                </div>
                <div class="input-group modal-input">
                    <span class="input-group-addon modal-input-title">角色描述</span>
                    <textarea ${type == 'view' ? 'readonly' : ''} style="width: 300px !important;" rows="3" id="add-role-remark" class="form-control modal-input-background" maxlength="140">${data.remark == null ? '' : data.remark}</textarea>
                </div>
                <!--
                <div class="input-group modal-input">
                    <span class="input-group-addon modal-input-title">
                        <span class="text-red">*</span>&nbsp;所属机构
                    </span>
                    <div class="institutions-input-container" data-toggle="modal" data-target="#affiliated-institutions-modal"></div>
                </div>
                -->
            </div>
            <div class="add-role-each-container" id="add-role-control-authority" style="display: none">
                <div class="in-title">操作权限</div>
                <div class="in-selector ztree" id="control-authority-tree"></div>
            </div>
            <div class="add-role-each-container" id="add-role-data-authority" style="display: none">
                <div class="in-title">数据范围</div>
                <div class="in-selector">
                    <div class="data-range-selector">
                        <form>
                            <div class="selector-label-item">
                                <label class="mdui-radio permission-range-checkinput" data-type="1">
                                    <input type="radio" name="group1" ${checkDataType.dataType == 1 ? 'checked' : ''} ${type == 'view' ? 'disabled="disabled' : ''}"/>
                                    <i class="mdui-radio-icon"></i>
                                    本人数据
                                </label>
                            </div>
                            <div class="selector-label-item">
                                <label class="mdui-radio permission-range-checkinput" data-type="2">
                                    <input type="radio" name="group1" ${checkDataType.dataType == 2 ? 'checked' : ''} ${type == 'view' ? 'disabled="disabled' : ''}"/>
                                    <i class="mdui-radio-icon"></i>
                                    本人及所在单位
                                </label>
                            </div>
                            <div class="selector-label-item ">
                                <label class="mdui-radio permission-range-checkinput" data-type="3">
                                    <input type="radio" name="group1" ${checkDataType.dataType == 3 ? 'checked' : ''} ${type == 'view' ? 'disabled="disabled' : ''}"/>
                                    <i class="mdui-radio-icon"></i>
                                    本人及所在单位及下属单位
                                </label>
                            </div>
                            <div class="selector-label-item">
                                <label class="mdui-radio permission-range-checkinput" data-type="4">
                                    <input type="radio" name="group1" ${checkDataType.dataType == 4 ? 'checked' : ''} ${type == 'view' ? 'disabled="disabled' : ''}"/>
                                    <i class="mdui-radio-icon"></i>
                                    全部
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
                <!--
                <div class="precise-data-range">
                    <div class="p-title">精细数据范围</div>
                    <div class="c-title"></div>
                    <div class="precise-data-value">
                        <div class="value-container" id="selected-devs-area"></div>
                        <table class="precise-data-in-table">
                            <thead>
                                <tr>
                                    <th colspan="11"><div class="th-title">设备列表</div></th>
                                </tr>
                            </thead>
                            <tbody id="table-tbody">
                                <tr class="tbody-th">
                                    <td style="width: 32px;"><label
                                        class="mdui-checkbox table-in-checkbox"> <input
                                            class="checkbox-all" type="checkbox" /> <i
                                            class="mdui-checkbox-icon checkbox-all"></i>
                                    </label></td>
                                    <td>设备编号</td>
                                    <td>XXX</td>
                                    <td>XXX</td>
                                </tr>
                                <tr class="tbody-tr">
                                    <td style="width: 32px;"><label
                                        class="mdui-checkbox table-in-checkbox"> <input
                                            class="checkbox-item checkbox-item-BBCG401_40106"
                                            data-devcode="BBCG401_40106" type="checkbox" /> <i
                                            class="mdui-checkbox-icon"></i>
                                    </label></td>
                                    <td>BBCG401_40106</td>
                                    <td>XXX</td>
                                    <td>XXX</td>
                                </tr>
                                <tr class="tbody-tr">
                                    <td style="width: 32px;"><label
                                        class="mdui-checkbox table-in-checkbox"> <input
                                            class="checkbox-item checkbox-item-BBC1500_00222"
                                            data-devcode="BBC1500_00222" type="checkbox" /> <i
                                            class="mdui-checkbox-icon"></i>
                                    </label></td>
                                    <td>BBC1500_00222</td>
                                    <td>XXX</td>
                                    <td>XXX</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="precise-data-table"></div>
                </div>
                -->
            </div>
            <div class="add-role-each-container" id="role-user-list" style="display: none">
                <div style="min-height: 268px;">
                    <table class="view-data-table-in-modal">
                        <tbody id="table-tbody-role-user">
                        </tbody>
                    </table>
                    <div class="no-data-tablesarch-inner">
                        <img class="no-data-icon-inner" src="img/no_data_icon_search.png">
                        <span class="no-data-word-inner">该角色无下属人员</span>
				    </div>
                </div>
                <!-- 底部分页 -->
				<div class="inner-page-selector">
					<div class="item-count-selector">
						每页：
						<div class="btn-group dropup">
							<button type="button"
								class="btn btn-default btn-sm dropdown-toggle"
								data-toggle="dropdown" aria-haspopup="true"
								aria-expanded="false">
								<span class="show-item-num role_selector_num">${userPageItemNum}条</span> <span class="caret"></span>
							</button>
							<ul class="dropdown-menu">
								<li><a class="total-count-selector role_selector"><span>10</span>条</a></li>
								<li><a class="total-count-selector role_selector"><span>20</span>条</a></li>
								<li><a class="total-count-selector role_selector"><span>30</span>条</a></li>
								<li><a class="total-count-selector role_selector"><span>40</span>条</a></li>
								<li><a class="total-count-selector role_selector"><span>50</span>条</a></li>
							</ul>
						</div>
						&nbsp;&nbsp;总共<span id="total-count-user"></span>条<span id="total-page-num-user"></span>
					</div>
					<div class="m-style pagination M-box3 M-box3-user"></div>
				</div>
            </div>
            ${type == 'view' ? '' : `
                <button id="add-role-submit-btn" data-type="${type}" data-role-id="${data.roleId == null ? '' : data.roleId}" class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-blue add-role-submit-btn">提交</button>
                <button id="return-role-list-btn" class="btn btn-default return-role-table-btn">取消</button>
            `}
            
            <!-- Modal所属机构-->
            <div class="modal fade bs-example-modal-lg" id="affiliated-institutions-modal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"  aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 class="modal-title">机构选择</h4>
                        </div>
                        <div class="modal-body">
                            <div style="width: 100%; height: 500px;">
                                <div class="institutions-modal-area">
                                    <div class="institutions-title">已选</div>
                                    <div class="institutions-container"
                                        id="selected-institutions-area"></div>
                                </div>
                                <div class="institutions-modal-area">
                                    <div class="institutions-title">列表</div>
                                    <div class="institutions-container ztree" id="institutions-tree"></div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-dismiss="modal" id="institutions-select-ensure">确定</button>
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        $('#add-role-area').html(htmlValue);
        /* 生成树状图*/
        // InstitutionTree.drawTree(null);
        ControlAuthorityTree.drawTree(menuTreeList);
        if (type == 'update' || type == 'view') {
            let treeObj = $.fn.zTree.getZTreeObj('control-authority-tree');
            let nodes = treeObj.transformToArray(treeObj.getNodes());
            if (data != null && data.menuList != null) {
                for (let i = 0; i < data.menuList.length; i++) {
                    for (let j = 0; j < nodes.length; j++) {
                        if (data.menuList[i].menuId == nodes[j].menuId) {
                            if (nodes[j].children == null) {
                                treeObj.checkNode(treeObj.getNodeByParam('menuId', nodes[j].menuId, null), true, true);
                            }
                        }
                    }
                }
            }
        }
        if (type == 'view') {
            let userQuery = new UserBean();
            userQuery.roleId = data.roleId;
            userQuery.pageSize = userPageItemNum;
            userQuery.pageNum = 1;
            userQueryCache = userQuery;
            RoleOperation.operation(userQuery, `getUserListByRoleId`, 'POST').then((result) => {
                if (result.retcode == 1 && result.pageInfo != null) {
                    if (result.pageInfo.list.length > 0) {
                        $('.no-data-tablesarch-inner').css('display', 'none');
                        RoleUser.draw(result.pageInfo.list);
                        PageInfo.drawPageController(result, 'userList');
                        $('#total-count-user').html(result.pageInfo.total);
                        $('#total-page-num-user').html(`，共${result.pageInfo.pages}页`);
                    } else {
                        $('.no-data-tablesarch-inner').css('display', 'block');
                        $('#table-tbody-role-user').html('');
                        $('#total-count-user').html(0);
                        $('#total-page-num-user').html('');
                        $('.M-box3-user').html('');
                    }
                }
            });
        }
    }

}