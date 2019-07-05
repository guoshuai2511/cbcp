import { ControlAuthorityTree } from '../tree/ControlAuthorityTree.js';

import { RoleUser } from '../table/RoleUser.js';

export class RoleInfoInputTable {
    
    static drawTable(data, type, url) {

        /* switch (type) {
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
        } */

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
                        <span class="text-red role_alert_start">*</span>&nbsp;名称
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
                        <span class="text-red role_alert_start">*</span>&nbsp;所属机构
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
            </div>
            <div class="add-role-each-container" id="role-user-list" style="display: none">
                <div style="min-height: 268px;" id ="role_user_list_table" data-role-id="${data.roleId == null ? '' : data.roleId}">
                    <!--不想多说,这一块不能用之前的js，所以得方法改造一下-->
                    
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
        let menuTreeList = [{
            "menuId": 1,
            "name": "总览",
            "url": "/home",
            "type": 0,
            "remark": "总览",
            "level": 0,
            "parentId": -1,
            "childMenu": [{
                "menuId": 19,
                "name": "案件统计",
                "url": "res:caseInfoStatistics",
                "type": 1,
                "remark": "案件统计",
                "level": 1,
                "parentId": 1,
                "childMenu": null
            }, {
                "menuId": 20,
                "name": "最新动态",
                "url": "res:socketHome",
                "type": 1,
                "remark": "最新动态",
                "level": 1,
                "parentId": 1,
                "childMenu": null
            }, {
                "menuId": 21,
                "name": "累计排行榜",
                "url": "res:topRanking",
                "type": 1,
                "remark": "累计排行榜",
                "level": 1,
                "parentId": 1,
                "childMenu": null
            }, {
                "menuId": 22,
                "name": "设备统计分布",
                "url": "res:socketDevMonitor",
                "type": 1,
                "remark": "设备统计分布",
                "level": 1,
                "parentId": 1,
                "childMenu": null
            }, {
                "menuId": 23,
                "name": "设备使用率",
                "url": "res:workingHoursStatistic",
                "type": 1,
                "remark": "设备使用率",
                "level": 1,
                "parentId": 1,
                "childMenu": null
            }]
        }, {
            "menuId": 2,
            "name": "作战指挥",
            "url": "",
            "type": -1,
            "remark": "作战指挥",
            "level": 0,
            "parentId": -1,
            "childMenu": [{
                "menuId": 6,
                "name": "实时作战",
                "url": "/commandManage/realTimeCombat",
                "type": 0,
                "remark": "实时作战",
                "level": 0,
                "parentId": 2,
                "childMenu": [{
                    "menuId": 24,
                    "name": "实时作战查询",
                    "url": "res:queryRealTimeCombat",
                    "type": 1,
                    "remark": "实时作战查询",
                    "level": 1,
                    "parentId": 6,
                    "childMenu": null
                }, {
                    "menuId": 25,
                    "name": "实时作战观看",
                    "url": "res:execRealTimeCombat",
                    "type": 1,
                    "remark": "实时作战观看",
                    "level": 1,
                    "parentId": 6,
                    "childMenu": null
                }]
            }, {
                "menuId": 7,
                "name": "历史回放",
                "url": "/commandManage/combatReplay",
                "type": 0,
                "remark": "历史回放",
                "level": 0,
                "parentId": 2,
                "childMenu": [{
                    "menuId": 26,
                    "name": "历史回放查询",
                    "url": "res:queryCombatReplay",
                    "type": 1,
                    "remark": "历史回放查询",
                    "level": 1,
                    "parentId": 7,
                    "childMenu": null
                }, {
                    "menuId": 27,
                    "name": "历史回放观看",
                    "url": "res:execCombatReplay",
                    "type": 1,
                    "remark": "历史回放观看",
                    "level": 1,
                    "parentId": 7,
                    "childMenu": null
                }]
            }]
        }, {
            "menuId": 3,
            "name": "数据分析",
            "url": "",
            "type": -1,
            "remark": "数据分析",
            "level": 0,
            "parentId": -1,
            "childMenu": [{
                "menuId": 8,
                "name": "案件筛查",
                "url": "/systemManage/caseManage",
                "type": 0,
                "remark": "案件筛查",
                "level": 0,
                "parentId": 3,
                "childMenu": [{
                    "menuId": 28,
                    "name": "新增案件审核信息",
                    "url": "res:addCaseReview",
                    "type": 1,
                    "remark": "新增案件审核信息",
                    "level": 1,
                    "parentId": 8,
                    "childMenu": null
                }, {
                    "menuId": 29,
                    "name": "修改案件审核信息",
                    "url": "res:updateCaseReview",
                    "type": 1,
                    "remark": "修改案件审核信息",
                    "level": 1,
                    "parentId": 8,
                    "childMenu": null
                }, {
                    "menuId": 30,
                    "name": "查询案件",
                    "url": "res:queryCaseInfo",
                    "type": 1,
                    "remark": "查询案件",
                    "level": 1,
                    "parentId": 8,
                    "childMenu": null
                }]
            }]
        }, {
            "menuId": 4,
            "name": "执法监督",
            "url": "",
            "type": -1,
            "remark": "执法监督",
            "level": 0,
            "parentId": -1,
            "childMenu": [{
                "menuId": 9,
                "name": "我的DW案件",
                "url": "/enforceManage/myDwCaseManage",
                "type": 0,
                "remark": "我的DW案件",
                "level": 0,
                "parentId": 4,
                "childMenu": [{
                    "menuId": 31,
                    "name": "查询我的DW案件",
                    "url": "res:queryMyDwCaseList",
                    "type": 1,
                    "remark": "查询我的DW案件",
                    "level": 1,
                    "parentId": 9,
                    "childMenu": null
                }, {
                    "menuId": 61,
                    "name": "提交案件申请",
                    "url": "res:addCaseApplication",
                    "type": 1,
                    "remark": "提交案件申请",
                    "level": 1,
                    "parentId": 9,
                    "childMenu": null
                }, {
                    "menuId": 62,
                    "name": "修改案件申请",
                    "url": "res:updateCaseApplication",
                    "type": 1,
                    "remark": "修改案件申请",
                    "level": 1,
                    "parentId": 9,
                    "childMenu": null
                }]
            }, {
                "menuId": 10,
                "name": "DW案件管理",
                "url": "/enforceManage/dwCaseManage",
                "type": 0,
                "remark": "DW案件管理",
                "level": 0,
                "parentId": 4,
                "childMenu": [{
                    "menuId": 32,
                    "name": "查询DW案件",
                    "url": "res:queryDwCaseListForApprove",
                    "type": 1,
                    "remark": "查询DW案件",
                    "level": 1,
                    "parentId": 10,
                    "childMenu": null
                }, {
                    "menuId": 33,
                    "name": "DW案件审核",
                    "url": "res:approveDwCaseApplication",
                    "type": 1,
                    "remark": "DW案件审核",
                    "level": 1,
                    "parentId": 10,
                    "childMenu": null
                }]
            }, {
                "menuId": 11,
                "name": "车辆管理",
                "url": "/enforceManage/vehicleManage",
                "type": 0,
                "remark": "车辆管理",
                "level": 0,
                "parentId": 4,
                "childMenu": [{
                    "menuId": 34,
                    "name": "录入车辆",
                    "url": "res:entryDwVehicle",
                    "type": 1,
                    "remark": "录入车辆",
                    "level": 1,
                    "parentId": 11,
                    "childMenu": null
                }, {
                    "menuId": 35,
                    "name": "修改车辆",
                    "url": "res:updateDwVehicle",
                    "type": 1,
                    "remark": "修改车辆",
                    "level": 1,
                    "parentId": 11,
                    "childMenu": null
                }, {
                    "menuId": 36,
                    "name": "删除车辆",
                    "url": "res:deleteDwVehicle",
                    "type": 1,
                    "remark": "删除车辆",
                    "level": 1,
                    "parentId": 11,
                    "childMenu": null
                }, {
                    "menuId": 37,
                    "name": "查询车辆",
                    "url": "res:queryDwVehicle",
                    "type": 1,
                    "remark": "查询车辆",
                    "level": 1,
                    "parentId": 11,
                    "childMenu": null
                }]
            }, {
                "menuId": 12,
                "name": "设备管理",
                "url": "/systemManage/devManage",
                "type": 0,
                "remark": "设备管理",
                "level": 0,
                "parentId": 4,
                "childMenu": [{
                    "menuId": 38,
                    "name": "新增设备",
                    "url": "res:addDev",
                    "type": 1,
                    "remark": "新增设备",
                    "level": 1,
                    "parentId": 12,
                    "childMenu": null
                }, {
                    "menuId": 39,
                    "name": "修改设备",
                    "url": "res:updateDev",
                    "type": 1,
                    "remark": "修改设备",
                    "level": 1,
                    "parentId": 12,
                    "childMenu": null
                }, {
                    "menuId": 40,
                    "name": "删除设备",
                    "url": "res:deleteDev",
                    "type": 1,
                    "remark": "删除设备",
                    "level": 1,
                    "parentId": 12,
                    "childMenu": null
                }, {
                    "menuId": 41,
                    "name": "查询设备",
                    "url": "res:queryDev",
                    "type": 1,
                    "remark": "查询设备",
                    "level": 1,
                    "parentId": 12,
                    "childMenu": null
                }]
            }, {
                "menuId": 13,
                "name": "测试手机号管理",
                "url": "/enforceManage/phoneNumManage",
                "type": 0,
                "remark": "测试手机号管理",
                "level": 0,
                "parentId": 4,
                "childMenu": [{
                    "menuId": 42,
                    "name": "新增测试手机号",
                    "url": "res:addDwPhone",
                    "type": 1,
                    "remark": "新增测试手机号",
                    "level": 1,
                    "parentId": 13,
                    "childMenu": null
                }, {
                    "menuId": 43,
                    "name": "修改测试手机号",
                    "url": "res:updateDwPhone",
                    "type": 1,
                    "remark": "修改测试手机号",
                    "level": 1,
                    "parentId": 13,
                    "childMenu": null
                }, {
                    "menuId": 44,
                    "name": "删除测试手机号",
                    "url": "res:deleteDwPhone",
                    "type": 1,
                    "remark": "删除测试手机号",
                    "level": 1,
                    "parentId": 13,
                    "childMenu": null
                }, {
                    "menuId": 45,
                    "name": "查询测试手机号",
                    "url": "res:queryDwPhone",
                    "type": 1,
                    "remark": "查询测试手机号",
                    "level": 1,
                    "parentId": 13,
                    "childMenu": null
                }]
            }, {
                "menuId": 14,
                "name": "执法日志管理",
                "url": "/enforceManage/enforceLog",
                "type": 0,
                "remark": "执法日志管理",
                "level": 0,
                "parentId": 4,
                "childMenu": [{
                    "menuId": 46,
                    "name": "查询执法日志管理",
                    "url": "res:queryEnforceLog",
                    "type": 1,
                    "remark": "查询执法日志管理",
                    "level": 1,
                    "parentId": 14,
                    "childMenu": null
                }]
            }]
        }, {
            "menuId": 5,
            "name": "系统管理",
            "url": "",
            "type": -1,
            "remark": "系统管理",
            "level": 0,
            "parentId": -1,
            "childMenu": [{
                "menuId": 15,
                "name": "组织机构管理",
                "url": "/systemManage/deptManage",
                "type": 0,
                "remark": "组织机构管理",
                "level": 0,
                "parentId": 5,
                "childMenu": [{
                    "menuId": 47,
                    "name": "新增组织机构",
                    "url": "res:addDept",
                    "type": 1,
                    "remark": "新增组织机构",
                    "level": 1,
                    "parentId": 15,
                    "childMenu": null
                }, {
                    "menuId": 48,
                    "name": "修改组织机构",
                    "url": "res:updateDept",
                    "type": 1,
                    "remark": "修改组织机构",
                    "level": 1,
                    "parentId": 15,
                    "childMenu": null
                }, {
                    "menuId": 49,
                    "name": "删除组织机构",
                    "url": "res:deleteDept",
                    "type": 1,
                    "remark": "删除组织机构",
                    "level": 1,
                    "parentId": 15,
                    "childMenu": null
                }, {
                    "menuId": 50,
                    "name": "查询组织机构",
                    "url": "res:queryDept",
                    "type": 1,
                    "remark": "查询组织机构",
                    "level": 1,
                    "parentId": 15,
                    "childMenu": null
                }]
            }, {
                "menuId": 16,
                "name": "平台用户功能管理",
                "url": "/systemManage/roleManage",
                "type": 0,
                "remark": "平台用户功能管理",
                "level": 0,
                "parentId": 5,
                "childMenu": [{
                    "menuId": 51,
                    "name": "新增角色",
                    "url": "res:addRole",
                    "type": 1,
                    "remark": "新增角色",
                    "level": 1,
                    "parentId": 16,
                    "childMenu": null
                }, {
                    "menuId": 52,
                    "name": "修改角色",
                    "url": "res:updateRole",
                    "type": 1,
                    "remark": "修改角色",
                    "level": 1,
                    "parentId": 16,
                    "childMenu": null
                }, {
                    "menuId": 53,
                    "name": "删除角色",
                    "url": "res:deleteRole",
                    "type": 1,
                    "remark": "删除角色",
                    "level": 1,
                    "parentId": 16,
                    "childMenu": null
                }, {
                    "menuId": 54,
                    "name": "查询角色",
                    "url": "res:queryRole",
                    "type": 1,
                    "remark": "查询角色",
                    "level": 1,
                    "parentId": 16,
                    "childMenu": null
                }]
            }, {
                "menuId": 17,
                "name": "用户管理",
                "url": "/systemManage/userManage",
                "type": 0,
                "remark": "用户管理",
                "level": 0,
                "parentId": 5,
                "childMenu": [{
                    "menuId": 55,
                    "name": "新增用户",
                    "url": "res:addUser",
                    "type": 1,
                    "remark": "新增用户",
                    "level": 1,
                    "parentId": 17,
                    "childMenu": null
                }, {
                    "menuId": 56,
                    "name": "修改用户",
                    "url": "res:updateUser",
                    "type": 1,
                    "remark": "修改用户",
                    "level": 1,
                    "parentId": 17,
                    "childMenu": null
                }, {
                    "menuId": 57,
                    "name": "删除用户",
                    "url": "res:deleteUser",
                    "type": 1,
                    "remark": "删除用户",
                    "level": 1,
                    "parentId": 17,
                    "childMenu": null
                }, {
                    "menuId": 58,
                    "name": "查询用户",
                    "url": "res:queryUser",
                    "type": 1,
                    "remark": "查询用户",
                    "level": 1,
                    "parentId": 17,
                    "childMenu": null
                }]
            }]
        }, {
            "menuId": 18,
            "name": "个人中心",
            "url": "/systemManage/userCenter",
            "type": 0,
            "remark": "个人中心",
            "level": 0,
            "parentId": -1,
            "childMenu": [{
                "menuId": 59,
                "name": "查询个人信息",
                "url": "res:querySelfUserInfo",
                "type": 1,
                "remark": "查询个人信息",
                "level": 1,
                "parentId": 18,
                "childMenu": null
            }, {
                "menuId": 60,
                "name": "修改个人信息",
                "url": "res:updateSelfUserInfo",
                "type": 1,
                "remark": "修改个人信息",
                "level": 1,
                "parentId": 18,
                "childMenu": null
            }]
        }]
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
        //绘制角色下用户信息表格
    }

}