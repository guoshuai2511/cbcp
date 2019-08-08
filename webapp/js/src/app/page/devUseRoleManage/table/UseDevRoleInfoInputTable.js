import { RoleOperation } from '../ajax/RoleOperation.js';

import { RoleUser } from '../table/RoleUser.js';
import { PageInfo } from '../table/PageInfo.js';

import { DevList } from '../table/DevList.js';

export class UseDevRoleInfoInputTable {

    static drawTable(data, type) {

        let useType = 1;
        let sceneType = 1;
        let targetNumType = 1;
        if (data.useDevPerms != null) {
            useType = data.useDevPerms.useType;
            sceneType = data.useDevPerms.sceneType;
            targetNumType = data.useDevPerms.targetNumType;
        }

        let areaArray = [];

        /* 设置默认权限值*/
        switch (type) {
            case 'add':
                permissionUseType = 1; // 设备使用权限
                permissionSceneType = 1; // 作战场景权限
                permissionTargetNumType = 1; // 作战目标权限
                break;
            case 'update':
                permissionUseType = data.useDevPerms.useType; // 设备使用权限
                permissionSceneType = data.useDevPerms.sceneType; // 作战场景权限
                permissionTargetNumType = data.useDevPerms.targetNumType; // 作战目标权限
                break;
            case 'view':
                permissionUseType = 1; // 设备使用权限
                permissionSceneType = 1; // 作战场景权限
                permissionTargetNumType = 1; // 作战目标权限
                break;
            default:
                break;
        }

        /* 精细数据范围*/
        let otherDevCodeHtml = '';
        switch (type) {
            case 'add':
                otherDevCodeHtml = `
                    <div class="precise-data-range">
                        <div class="p-title">
                            其他设备编号
                            <label class="mdui-switch" style="margin-left:20px;">
                                <input type="checkbox" id="precise-data-range-switch" />
                                <i class="mdui-switch-icon"></i>
                            </label>
                        </div>
                        <div class="c-title"></div>
                        <div class="precise-data-value" style="display:none;">
                            <div class="value-container" id="selected-devs-area"></div>
                            <table class="precise-data-in-table">
                                <thead>
                                    <tr>
                                        <th colspan="11"><div class="th-title">设备列表</div></th>
                                    </tr>
                                </thead>
                                <tbody id="table-tbody-dev-list">
                                </tbody>
                            </table>
                            <!-- 底部分页 -->
                            <div class="inner-page-selector">
                                <div class="item-count-selector">
                                    每页：
                                    <div class="btn-group dropup">
                                        <button type="button"
                                            class="btn btn-default btn-sm dropdown-toggle"
                                            data-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">
                                            <span class="dev-list-show-item-num">10条</span> <span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li><a class="dev-list-total-count-selector"><span>10</span>条</a></li>
                                            <li><a class="dev-list-total-count-selector"><span>20</span>条</a></li>
                                            <li><a class="dev-list-total-count-selector"><span>30</span>条</a></li>
                                            <li><a class="dev-list-total-count-selector"><span>40</span>条</a></li>
                                            <li><a class="dev-list-total-count-selector"><span>50</span>条</a></li>
                                        </ul>
                                    </div>
                                    ，总共<span id="total-count-dev-list"></span>条<span id="total-page-dev-list"></span>
                                </div>
                                <div class="m-style pagination M-box3 M-box3-dev-list"></div>
                            </div>
                        </div>
                        <div class="precise-data-table"></div>
                    </div>
                `;
                break;
            case 'view':
                if (data.useDevPerms.otherDevCode != null && data.useDevPerms.otherDevCode != '') {
                    let devItemsHtml = '';
                    let devItemsArray = data.useDevPerms.otherDevCode.split(';');
                    for (let i = 0; i < devItemsArray.length; i++) {
                        devItemsHtml = devItemsHtml + `
                            <div class="each-divinner-item">
                                <span>${devItemsArray[i]}</span>
                            </div>
                        `;
                    }
                    otherDevCodeHtml = otherDevCodeHtml + `
                        <div class="precise-data-range">
                            <div class="p-title">
                                其他设备编号
                            </div>
                            <div class="c-title"></div>
                            <div class="precise-data-value">
                                <div class="value-container" id="selected-devs-area">${devItemsHtml}</div>
                            </div>
                            <div class="precise-data-table"></div>
                        </div>
                    `;
                }
                break;
            case 'update':
                let devItemsHtml = ''
                let isDisplay = false;
                if (data.useDevPerms.otherDevCode != null && data.useDevPerms.otherDevCode != '') {
                    let devItemsArray = data.useDevPerms.otherDevCode.split(';');
                    for (let i = 0; i < devItemsArray.length; i++) {
                        devItemsHtml = devItemsHtml + `
                            <div class="each-divinner-item selected-devs-item-${devItemsArray[i]}">
                                <span class="selected-devs-value">${devItemsArray[i]}</span>
                                <i class="iconfont icon-x-close item-close selected-devs-delete" data-devcode="${devItemsArray[i]}"></i>
                            </div>
                        `;
                        selectedDevsCache.add(devItemsArray[i]);
                    }
                    isDisplay = true;
                }
                otherDevCodeHtml = `
                    <div class="precise-data-range">
                        <div class="p-title">
                            其他设备编号
                            <label class="mdui-switch" style="margin-left:20px;">
                                <input type="checkbox" id="precise-data-range-switch" ${isDisplay ? 'checked' : ''}/>
                                <i class="mdui-switch-icon"></i>
                            </label>
                        </div>
                        <div class="c-title"></div>
                        <div class="precise-data-value" ${isDisplay ? '' : 'style="display:none;"'}>
                            <div class="value-container" id="selected-devs-area">${devItemsHtml}</div>
                            <table class="precise-data-in-table">
                                <thead>
                                    <tr>
                                        <th colspan="11"><div class="th-title">设备列表</div></th>
                                    </tr>
                                </thead>
                                <tbody id="table-tbody-dev-list">
                                </tbody>
                            </table>
                            <!-- 底部分页 -->
                            <div class="inner-page-selector">
                                <div class="item-count-selector">
                                    每页：
                                    <div class="btn-group dropup">
                                        <button type="button"
                                            class="btn btn-default btn-sm dropdown-toggle"
                                            data-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">
                                            <span class="dev-list-show-item-num">10条</span> <span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li><a class="dev-list-total-count-selector"><span>10</span>条</a></li>
                                            <li><a class="dev-list-total-count-selector"><span>20</span>条</a></li>
                                            <li><a class="dev-list-total-count-selector"><span>30</span>条</a></li>
                                            <li><a class="dev-list-total-count-selector"><span>40</span>条</a></li>
                                            <li><a class="dev-list-total-count-selector"><span>50</span>条</a></li>
                                        </ul>
                                    </div>
                                    ，总共<span id="total-count-dev-list"></span>条<span id="total-page-dev-list"></span>
                                </div>
                                <div class="m-style pagination M-box3 M-box3-dev-list"></div>
                            </div>
                        </div>
                        <div class="precise-data-table"></div>
                    </div>
                `;
                break;
            default:
                break;
        }

        /* 地区默认值*/
        let enableAreaCodeHtml = '';
        if (type != 'add') {
            if (data.useDevPerms.enableAreaCode != null && data.useDevPerms.enableAreaCode != '') {
                areaArray = data.useDevPerms.enableAreaCode.split(';');
                for (let i = 0; i < areaArray.length; i++) {
                    enableAreaCodeHtml = enableAreaCodeHtml + `
                        <div class="each-divinner-item case-scene-area-item-${areaArray[i]}">
                            <img src="img/loading.gif" style="width:20px; height:20px; margin-right:10px;">
                        </div>
                    `;
                    if (type == 'update') {
                        addAreaCache.set(areaArray[i], areaArray[i]);
                    }
                }
            } else {
                if (type == 'view') {
                    enableAreaCodeHtml = `
                        <div class="each-divinner-item">
                            <span>全部地域</span>
                        </div>
                    `;
                }
            }
        }

        /* 制式默认值*/
        let enableModeValueHtml = '';
        if (type != 'add') {
            if (data.useDevPerms.enableMode != null && data.useDevPerms.enableMode != '') {
                let modeArray = data.useDevPerms.enableMode.split(';');
                for (let i = 0; i < modeArray.length; i++) {
                    if (type == 'view') {
                        enableModeValueHtml = enableModeValueHtml + `
                            <div class="each-divinner-item">
                                <span>${modeArray[i]}</span>
                            </div>
                        `;
                    } else {
                        enableModeValueHtml = enableModeValueHtml + `
                            <div class="each-divinner-item case-scene-devmode-item-${modeArray[i]}">
                                <span class="case-scene-devmode-value">${modeArray[i]}</span>
                                <i class="iconfont icon-x-close item-close case-scene-devmode-delete" data-devmode="${modeArray[i]}"></i>
                            </div>
                        `;
                        addDevModeCache.set(modeArray[i], modeArray[i]);
                    }
                }
            } else {
                if (type == 'view') {
                    enableModeValueHtml = `
                        <div class="each-divinner-item">
                            <span>全部制式</span>
                        </div>
                    `;
                }
            }
        }

        /* 时间默认值*/
        let timeRangeHtml = '';
        switch (type) {
            case 'add':
                timeRangeHtml = `
                    <div class="input-group input-group-sm modal-input">
                        <span class="input-group-addon modal-input-title">时间</span>
                        <input type="text" class="form-control modal-input-area modal-input-background" id="case-scene-startTime-value"
                            onClick="WdatePicker({maxDate:'#F{$dp.$D(\\'case-scene-endTime-value\\')}', dateFmt:'yyyy-MM-dd HH:mm:ss'})">
                        <span class="input-inwords">至</span>
                        <input type="text" class="form-control modal-input-area modal-input-background" id="case-scene-endTime-value"
                            onClick="WdatePicker({minDate:'#F{$dp.$D(\\'case-scene-startTime-value\\')}', dateFmt:'yyyy-MM-dd HH:mm:ss'})">
                    </div>
                `;
                break;
            case 'update':
                timeRangeHtml = `
                    <div class="input-group input-group-sm modal-input">
                        <span class="input-group-addon modal-input-title">时间</span>
                        <input type="text" class="form-control modal-input-area modal-input-background" id="case-scene-startTime-value"
                            onClick="WdatePicker({maxDate:'#F{$dp.$D(\\'case-scene-endTime-value\\')}', dateFmt:'yyyy-MM-dd HH:mm:ss'})"
                            value="${data.useDevPerms.startEnableTime == null ? '' : new Date(data.useDevPerms.startEnableTime).Format('yyyy-MM-dd hh:mm:ss')}">
                        <span class="input-inwords">至</span>
                        <input type="text" class="form-control modal-input-area modal-input-background" id="case-scene-endTime-value"
                            onClick="WdatePicker({minDate:'#F{$dp.$D(\\'case-scene-startTime-value\\')}', dateFmt:'yyyy-MM-dd HH:mm:ss'})"
                            value="${data.useDevPerms.endEnableTime == null ? '' : new Date(data.useDevPerms.endEnableTime).Format('yyyy-MM-dd hh:mm:ss')}">
                    </div>
                `;
                break;
            case 'view':
                timeRangeHtml = `
                    <div class="input-group input-group-sm modal-input">
                        <span class="input-group-addon modal-input-title">时间</span>
                        <input type="text" class="form-control modal-input-area modal-input-background" disabled="disabled"
                            value="${data.useDevPerms.startEnableTime == null ? '起始时间无限制' : new Date(data.useDevPerms.startEnableTime).Format('yyyy-MM-dd hh:mm:ss')}">
                        <span class="input-inwords">至</span>
                        <input type="text" class="form-control modal-input-area modal-input-background" disabled="disabled"
                            value="${data.useDevPerms.endEnableTime == null ? '结束时间无限制' : new Date(data.useDevPerms.endEnableTime).Format('yyyy-MM-dd hh:mm:ss')}">
                    </div>
                `;
                break;
            default:
                break;
        }

        /* 手机号默认值*/
        let enableTargetNumValueHtml = '';
        if (type != 'add') {
            if (data.useDevPerms.enableTargetNum != null && data.useDevPerms.enableTargetNum != '') {
                let telArray = data.useDevPerms.enableTargetNum.split(';');
                for (let i = 0; i < telArray.length; i++) {
                    if (type == 'view') {
                        enableTargetNumValueHtml = enableTargetNumValueHtml + `
                            <div class="each-divinner-item">
                                <span>${telArray[i]}</span>
                            </div>
                        `;
                    } else {
                        enableTargetNumValueHtml = enableTargetNumValueHtml + `
                            <div class="each-divinner-item case-target-telvalue-item-${telArray[i]}">
                                <span class="case-targetTel-value">${telArray[i]}</span>
                                <i class="iconfont icon-x-close item-close case-target-telvalue-delete" data-tel="${telArray[i]}"></i>
                            </div>
                        `;
                        addTelCache.set(telArray[i], telArray[i]);
                    }
                }
            } else {
                if (type == 'view') {
                    enableTargetNumValueHtml = `
                    
                    `;
                }
            }
        }

        let htmlValue = `
        <button id="return-role-list-btn" class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-blue add-role-table-btn">返回列表</button>
        <div class="add-role-area">
            <ul class="nav nav-tabs guide-nav add-role-nav">
                <li role="presentation" class="guide-nav-item active">
                    <a class="nav-switch-item" data-click-id="add-role-base-authority">基本信息</a>
                </li>
                <li role="presentation" class="guide-nav-item">
                    <a class="nav-switch-item" data-click-id="add-role-control-authority">设备使用权限</a>
                </li>
                <li role="presentation" class="guide-nav-item">
                    <a class="nav-switch-item" data-click-id="add-role-case-scene-authority">作战场景权限</a>
                </li>
                <li role="presentation" class="guide-nav-item">
                    <a class="nav-switch-item" data-click-id="add-role-case-target-authority">作战目标权限</a>
                </li>
                ${type != 'view' ? '' : `
                <li role="presentation" class="guide-nav-item">
                    <a class="nav-switch-item" data-click-id="role-user-list">下属人员</a>
                </li>
                `}
            </ul>
            <!--${/*角色名及描述*/0}-->
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
            <!--${/*设备使用权限*/0}-->
            <div class="add-role-each-container" id="add-role-control-authority" style="display: none">
                <div class="in-title">设备使用权限</div>
                <div class="in-selector">
                    <div class="data-range-selector">
                        <form>
                            <div class="selector-label-item">
                                <label class="mdui-radio permission-useType-checkinput" data-type="1">
                                    <input type="radio" name="group1" ${useType == 1 ? 'checked' : ''} ${type == 'view' ? 'disabled="disabled"' : ''}/>
                                    <i class="mdui-radio-icon"></i>
                                    本人下属设备
                                </label>
                            </div>
                            <div class="selector-label-item">
                                <label class="mdui-radio permission-useType-checkinput" data-type="2">
                                    <input type="radio" name="group1" ${useType == 2 ? 'checked' : ''} ${type == 'view' ? 'disabled="disabled"' : ''}/>
                                    <i class="mdui-radio-icon"></i>
                                    本人及所在单位设备
                                </label>
                            </div>
                            <div class="selector-label-item ">
                                <label class="mdui-radio permission-useType-checkinput" data-type="3">
                                    <input type="radio" name="group1" ${useType == 3 ? 'checked' : ''} ${type == 'view' ? 'disabled="disabled"' : ''}/>
                                    <i class="mdui-radio-icon"></i>
                                    本人及所在单位及下属单位设备
                                </label>
                            </div>
                            <div class="selector-label-item">
                                <label class="mdui-radio permission-useType-checkinput" data-type="4">
                                    <input type="radio" name="group1" ${useType == 4 ? 'checked' : ''} ${type == 'view' ? 'disabled="disabled"' : ''}/>
                                    <i class="mdui-radio-icon"></i>
                                    全部
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
                ${otherDevCodeHtml}
            </div>
            <!--${/*作战场景权限*/0}-->
            <div class="add-role-each-container" id="add-role-case-scene-authority" style="display: none">
                <div class="in-title">
                    <form>
                        <label class="mdui-radio permission-sceneType-checkinput" data-type="1" style="margin-right:30px;">
                            <input type="radio" name="group2" class="case-scene-type" data-type="all" ${sceneType == 1 ? 'checked' : ''} ${type == 'view' ? 'disabled="disabled"' : ''}/>
                            <i class="mdui-radio-icon"></i>
                            全部
                        </label>
                        <label class="mdui-radio permission-sceneType-checkinput" data-type="0" style="margin-right:30px;">
                            <input type="radio" name="group2" class="case-scene-type" data-type="cos" ${sceneType == 0 ? 'checked' : ''} ${type == 'view' ? 'disabled="disabled"' : ''}/>
                            <i class="mdui-radio-icon"></i>
                            自定义
                        </label>
                    </form>
                </div>
                <div class="in-content case-scene-cos-info" style="display:${sceneType == 0 ? '' : 'none'};">
                    <!--地域-->
                    <div class="mutli-selector-container">
                        <div class="mutli-selector-title">地域</div>
                        <div class="mutli-selector-value">
                            <div class="mutli-selector-items" id="selected-area-item" style="${type == 'update' && enableAreaCodeHtml != '' ? 'padding-bottom:20px;' : ''}">
                                ${enableAreaCodeHtml}
                            </div>
                            ${type == 'view' ? '' : `
                            <div class="mutli-selector-input">
                                <div class="input-group input-group-sm">
                                    <div class="btn-group" style="margin-right: 15px;">
                                        <button type="button"
                                            style="width: 200px; height: 30px; text-align: left; border: 1px solid rgb(150, 150, 150); background: rgb(40, 40, 40); color: #fff;"
                                            class="btn btn-default btn-sm dropdown-toggle"
                                            data-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">
                                            <span id="province-input"></span> <span class="caret" style="float: right; margin-top: 6px;"></span>
                                        </button>
                                        <span id="province-input-selector-remove"
							                  class="glyphicon glyphicon-remove-circle" aria-hidden="true"
							                  style="display: none; position: absolute; top: 7px; right: 30px; color: rgb(204, 204, 204); z-index: 100; cursor: pointer;"></span>
                                        <ul class="dropdown-menu" id="province-selector-conatiner" style="width: 200px; max-height: 220px; overflow: auto;">
                                        </ul>
                                    </div>
                                    <div class="btn-group" style="margin-right: 15px;">
                                        <button type="button"
                                            style="width: 200px; height: 30px; text-align: left; border: 1px solid rgb(150, 150, 150); background: rgb(40, 40, 40); color: #fff;"
                                            class="btn btn-default btn-sm dropdown-toggle"
                                            data-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">
                                            <span id="city-input"></span> <span class="caret" style="float: right; margin-top: 6px;"></span>
                                        </button>
                                        <span id="city-input-selector-remove"
							                  class="glyphicon glyphicon-remove-circle" aria-hidden="true"
							                  style="display: none; position: absolute; top: 7px; right: 30px; color: rgb(204, 204, 204); z-index: 100; cursor: pointer;"></span>
                                        <ul class="dropdown-menu" id="city-selector-conatiner" style="width: 200px; max-height: 220px; overflow: auto;">
                                        </ul>
                                    </div>
                                    <div class="btn-group" style="margin-right: 15px;">
                                        <button type="button"
                                            style="width: 200px; height: 30px; text-align: left; border: 1px solid rgb(150, 150, 150); background: rgb(40, 40, 40); color: #fff;"
                                            class="btn btn-default btn-sm dropdown-toggle"
                                            data-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">
                                            <span id="area-input"></span> <span class="caret" style="float: right; margin-top: 6px;"></span>
                                        </button>
                                        <span id="area-input-selector-remove"
							                  class="glyphicon glyphicon-remove-circle" aria-hidden="true"
							                  style="display: none; position: absolute; top: 7px; right: 30px; color: rgb(204, 204, 204); z-index: 100; cursor: pointer;"></span>
                                        <ul class="dropdown-menu" id="area-selector-conatiner" style="width: 200px; max-height: 220px; overflow: auto;">
                                        </ul>
                                    </div>
                                    <button class="add-val-btn mdui-btn mdui-btn-icon mdui-btn-dense mdui-color-blue mdui-ripple" id="case-scene-area-add-btn"><i class="mdui-icon material-icons">add</i></button>
                                </div>
                            </div>
                            `}
                        </div>
                    </div>
                    <!--制式选择-->
                    <div class="mutli-selector-container">
                        <div class="mutli-selector-title">制式</div>
                        <div class="mutli-selector-value">
                            <div class="mutli-selector-items" id="selected-dev-mode-item" style="${type == 'update' && enableModeValueHtml != '' ? 'padding-bottom:20px;' : ''}">
                                ${enableModeValueHtml}
                            </div>
                            ${type == 'view' ? '' : `
                            <div class="mutli-selector-input">
                                <div class="input-group input-group-sm">
                                    <div class="btn-group">
                                        <button type="button"
                                            style="width: 200px; height: 30px; text-align: left; border: 1px solid rgb(150, 150, 150); background: rgb(40, 40, 40); color: #fff;"
                                            class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">
                                            <span id="devmode-input"></span> <span class="caret" style="float: right; margin-top: 6px;"></span>
                                        </button>
                                        <span id="devmode-input-selector-remove"
							                  class="glyphicon glyphicon-remove-circle" aria-hidden="true"
							                style="display: none; position: absolute; top: 7px; right: 30px; color: rgb(204, 204, 204); z-index: 100; cursor: pointer;"></span>
                                        <ul class="dropdown-menu" style="width: 200px;">
                                            <li><a class="dropdown-menu-selector devmode-selector">GSM</a></li>
                                            <li><a class="dropdown-menu-selector devmode-selector">CDMA</a></li>
                                            <li><a class="dropdown-menu-selector devmode-selector">WCDMA</a></li>
                                            <li><a class="dropdown-menu-selector devmode-selector">LTE</a></li>
                                        </ul>
                                    </div>
                                    <button class="add-val-btn mdui-btn mdui-btn-icon mdui-btn-dense mdui-color-blue mdui-ripple" id="case-scene-add-devmode-btn"><i class="mdui-icon material-icons">add</i></button>
                                </div>   
                            </div>
                            `}
                        </div>
                    </div>
                    <!--时间范围选择-->
                    ${timeRangeHtml}
                    ${type == 'view' ? '' : `
                    <div class="mutli-selector-container">
                        <div style="width:500px; margin-left:50px; color:#ddd">
                            <span style="color:#ff5050">*</span>注：若不选择则表示该项无限制
                        </div>
                    </div>
                    `}
                </div>
            </div>
            <!--${/*作战目标权限*/0}-->
            <div class="add-role-each-container" id="add-role-case-target-authority" style="display: none">
                <div class="in-title">
                    <form>
                        <label class="mdui-radio permission-targetNumType-checkinput" data-type="1" style="margin-right:30px;">
                            <input type="radio" name="group2" class="case-target-type" data-type="all" ${targetNumType == 1 ? 'checked' : ''} ${type == 'view' ? 'disabled="disabled"' : ''}/>
                            <i class="mdui-radio-icon"></i>
                            全部
                        </label>
                        <label class="mdui-radio permission-targetNumType-checkinput" data-type="0" style="margin-right:30px;">
                            <input type="radio" name="group2" class="case-target-type" data-type="cos" ${targetNumType == 0 ? 'checked' : ''} ${type == 'view' ? 'disabled="disabled"' : ''}/>
                            <i class="mdui-radio-icon"></i>
                            自定义
                        </label>
                    </form>
                </div>
                <div class="in-content case-target-cos-info"  style="display:${targetNumType == 0 ? '' : 'none'};">
                    
                    <div style="position: relative; margin-left: 80px;">
                    
                        ${type == 'view' ? '' : `
                        
                        `}
                    </div>
                    ${type == 'view' ? '' : `
                    <div class="mutli-selector-container">
                        <div style="width:500px; color:#ddd">
                            <span style="color:#ff5050">*</span>注：若不选择则表示该项无限制
                        </div>
                    </div>
                    `}
                </div>
            </div>
            <!--${/*查看下属人员*/0}-->
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
								<span class="role-user-show-item-num">10条</span> <span class="caret"></span>
							</button>
							<ul class="dropdown-menu">
								<li><a class="role-user-total-count-selector"><span>10</span>条</a></li>
								<li><a class="role-user-total-count-selector"><span>20</span>条</a></li>
								<li><a class="role-user-total-count-selector"><span>30</span>条</a></li>
								<li><a class="role-user-total-count-selector"><span>40</span>条</a></li>
								<li><a class="role-user-total-count-selector"><span>50</span>条</a></li>
							</ul>
						</div>
						，总共<span id="total-count-user"></span>条<span id="total-page-num-user"></span>
					</div>
					<div class="m-style pagination M-box3 M-box3-user"></div>
				</div>
            </div>
            ${type == 'view' ? '' : `
                <button id="add-role-submit-btn" data-type="${type}" data-role-id="${data.roleId == null ? '' : data.roleId}" class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-blue add-role-submit-btn">提交</button>
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

        /* 省级区划列表*/
        let provinceInterval = setInterval(function () { setProvinceHtml() }, 10);
        function setProvinceHtml() {
            if (provinceAreasCache != null) {
                clearInterval(provinceInterval);
                for (let i = 0; i < provinceAreasCache.length; i++) {
                    $('#province-selector-conatiner').append(`
                        <li>
                            <a class="dropdown-menu-selector province-selector"
                               data-code="${provinceAreasCache[i].code}" data-shortCode="${provinceAreasCache[i].shortCode}" data-name="${provinceAreasCache[i].name}">
                               ${provinceAreasCache[i].name}
                            </a>
                        </li>
                    `);
                }
            }
        }

        /* 获取地域显示*/
        if (type != 'add' && areaArray.length > 0) {
            for (let i = 0; i < areaArray.length; i++) {
                RoleOperation.operation(null, `getAreaByShortCode/${areaArray[i]}`, 'GET').then((result) => {
                    if (result.retcode == 1) {
                        switch (type) {
                            case 'view':
                                $(`.case-scene-area-item-${areaArray[i]}`).html(`
                                    <span>${result.dataMap.data.fullName}</span>
                                `);
                                break;
                            case 'update':
                                $(`.case-scene-area-item-${areaArray[i]}`).html(`
                                    <span class="case-scene-area-value">${result.dataMap.data.fullName}</span>
                                    <i class="iconfont icon-x-close item-close case-scene-area-delete" data-areacode="${result.dataMap.data.shortCode}"></i>
                                `);
                                break;
                            default:
                                break;
                        }
                    }
                });
            }
        }

        /* 设备列表*/
        if (type != 'view') {
            let devQuery = new DevBean();
            devQuery.pageSize = devPageItemNum;
            devQuery.pageNum = 1;
            devQueryCache = devQuery;
            RoleOperation.operation(devQuery, `getDevList`, 'POST').then((result) => {
                if (result.retcode == 1 && result.pageInfo != null) {
                    if (result.pageInfo.list.length > 0) {
                        // $('.no-data-dev-inner').css('display', 'none');
                        DevList.draw(result.pageInfo.list);
                        DevList.pageInfo(result);
                        $('#total-count-dev-list').html(result.pageInfo.total);
                        $('#total-page-dev-list').html(`，共${result.pageInfo.pages}页`);
                    } else {
                        // $('.no-data-dev-inner').css('display', 'block');
                        $('#table-tbody-dev-list').html('');
                        $('#total-count-dev-list').html(0);
                        $('#total-page-dev-list').html('');
                        $('.M-box3-dev-list').html('');
                    }
                }
            });
        }

        if (type == 'view') {
            let userQuery = new UserBean();
            userQuery.devUseRoleId = data.roleId;
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