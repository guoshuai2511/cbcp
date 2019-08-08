import { TopHeader } from '../../common/topHeader/TopHeader.js';
import { MyCookie } from '../../common/cookie/MyCookie.js';

import { RoleOperation } from './ajax/RoleOperation.js';

import { RoleListTable } from './table/RoleListTable.js';
import { UseDevRoleInfoInputTable } from './table/UseDevRoleInfoInputTable.js';
import { RoleUser } from './table/RoleUser.js';
import { PageInfo } from './table/PageInfo.js';
import { DevList } from './table/DevList.js';

/* js版本号，判断服务器端是否已刷新*/
console.log('js.version=2.1.9000');
/* 生成顶部菜单 */
TopHeader.initHeader();
/* 获取默认显示页数*/
if (MyCookie.getCookie('userDevRoleManagePageNum') != '') {
    pageItemNum = Number(MyCookie.getCookie('userDevRoleManagePageNum'));
    $('.show-item-num').html(pageItemNum + '条');
}

/* 禁止输入空格*/
$(document).on('keyup blur', '.input-space-forbidden', function () {
    this.value = this.value.replace(/\s+/g, '');
});
/* 只允许输入数字*/
$(document).on('keyup blur', '.input-num-only', function () {
    this.value = this.value.replace(/[^\d]/g, '');
});

let isRoleNameTrueType = 0; // 0空，1已存在，2可以输入

/* 新建角色切换*/
$('#add-role-btn').click(function () {
    checkForbidden = false;
    isRoleNameTrueType = 0;
    isDetailDevListSearched = false;
    addTelCache = new Map();
    addDevModeCache = new Map();
    addAreaCache = new Map();
    selectedDevsCache = new Set();
    UseDevRoleInfoInputTable.drawTable(roleInputCache, 'add');
    $('.table-view-container').css('display', 'none');
    $('#add-role-area').css('display', 'block');
    $('.title-small-text').css('display', 'none');
    $('#add-role-small-text').css('display', '');
    tableViewAutoSize();
});
$(document).on('click', '#return-role-list-btn', function () {
    $('#add-role-area').html('');
    $('.table-view-container').css('display', 'none');
    $('#role-table-list').css('display', 'block');
    $('.title-small-text').css('display', 'none');
    tableViewAutoSize();
});
/* nav切换*/
$(document).on('click', '.nav-switch-item', function () {
    $('.add-role-each-container').css('display', 'none');
    $('.guide-nav-item').removeClass('active');
    $(`#${$(this).attr('data-click-id')}`).css('display', 'block');
    $($(this).parent()).addClass('active');
    tableViewAutoSize();
});

/* 获取省级区划列表*/
RoleOperation.operation(null, 'getProvinceAreas', 'GET').then((result) => {
    if (result.retcode == 1) {
        provinceAreasCache = result.dataList;
    }
});
/* 省级选择*/
$(document).on('click', '.province-selector', function () {
    $('#case-scene-area-add-btn').attr('data-code', $(this).attr('data-shortCode'));
    $('#case-scene-area-add-btn').attr('data-name', $(this).attr('data-name'));
    $('#province-input').html($(this).attr('data-name'));
    $('#province-input').attr('data-name', $(this).attr('data-name'));
    $('#province-input').attr('data-shortCode', $(this).attr('data-shortCode'));
    $('#province-input-selector-remove').css('display', 'block');
    $('#city-input').html('');
    $('#city-input-selector-remove').css('display', 'none');
    $('#area-input').html('');
    $('#area-input-selector-remove').css('display', 'none');
    $('#city-selector-conatiner').html(`
        <li>
            <a>
                <img src="img/loading.gif" style="width:26px; height:26px; margin-right:10px;">正在加载
            </a>
        </li>
    `);
    RoleOperation.operation(null, `getAreasByParentShortCode/${$(this).attr('data-shortCode')}`, 'GET').then((result) => { // 设置市级列表
        if (result.retcode == 1) {
            $('#city-selector-conatiner').html('');
            for (let i = 0; i < result.dataList.length; i++) {
                $('#city-selector-conatiner').append(`
                    <li>
                        <a class="dropdown-menu-selector city-selector"
                        data-code="${result.dataList[i].code}" data-shortCode="${result.dataList[i].shortCode}" data-name="${result.dataList[i].name}">
                        ${result.dataList[i].name}
                        </a>
                    </li>
                `);
            }
        }
    });
});
/* 市级选择*/
$(document).on('click', '.city-selector', function () {
    $('#case-scene-area-add-btn').attr('data-code', $(this).attr('data-shortCode'));
    $('#case-scene-area-add-btn').attr('data-name', $('#case-scene-area-add-btn').attr('data-name') + $(this).attr('data-name'));
    $('#city-input').html($(this).attr('data-name'));
    $('#city-input').attr('data-name', $(this).attr('data-name'));
    $('#city-input').attr('data-shortCode', $(this).attr('data-shortCode'));
    $('#city-input-selector-remove').css('display', 'block');
    $('#area-input').html('');
    $('#area-input-selector-remove').css('display', 'none');
    $('#area-selector-conatiner').html(`
        <li>
            <a>
                <img src="img/loading.gif" style="width:26px; height:26px; margin-right:10px;">正在加载
            </a>
        </li>
    `);
    RoleOperation.operation(null, `getAreasByParentShortCode/${$(this).attr('data-shortCode')}`, 'GET').then((result) => { // 设置区级列表
        if (result.retcode == 1) {
            $('#area-selector-conatiner').html('');
            for (let i = 0; i < result.dataList.length; i++) {
                $('#area-selector-conatiner').append(`
                    <li>
                        <a class="dropdown-menu-selector area-selector"
                        data-code="${result.dataList[i].code}" data-shortCode="${result.dataList[i].shortCode}" data-name="${result.dataList[i].name}">
                        ${result.dataList[i].name}
                        </a>
                    </li>
                `);
            }
        }
    });
});
/* 区级选择*/
$(document).on('click', '.area-selector', function () {
    $('#case-scene-area-add-btn').attr('data-code', $(this).attr('data-shortCode'));
    $('#case-scene-area-add-btn').attr('data-name', $('#case-scene-area-add-btn').attr('data-name') + $(this).attr('data-name'));
    $('#area-input').html($(this).attr('data-name'));
    $('#area-input').attr('data-name', $(this).attr('data-name'));
    $('#area-input').attr('data-shortCode', $(this).attr('data-shortCode'));
    $('#area-input-selector-remove').css('display', 'block');
});
$(document).on('click', '#province-input-selector-remove', function () { // 输入框中删除按钮
    $('#province-input').html('');
    $('#city-input').html('');
    $('#area-input').html('');
    $('#city-selector-conatiner').html('');
    $('#area-selector-conatiner').html('');
    $('#province-input-selector-remove').css('display', 'none');
    $('#city-input-selector-remove').css('display', 'none');
    $('#area-input-selector-remove').css('display', 'none');
    $('#case-scene-area-add-btn').attr('data-code', '');
    $('#case-scene-area-add-btn').attr('data-name', '');
});
$(document).on('click', '#city-input-selector-remove', function () { // 输入框中删除按钮
    $('#city-input').html('');
    $('#area-input').html('');
    $('#area-selector-conatiner').html('');
    $('#city-input-selector-remove').css('display', 'none');
    $('#area-input-selector-remove').css('display', 'none');
    $('#case-scene-area-add-btn').attr('data-code', $('#province-input').attr('data-shortCode'));
    $('#case-scene-area-add-btn').attr('data-name', $('#province-input').attr('data-name'));
});
$(document).on('click', '#area-input-selector-remove', function () { // 输入框中删除按钮
    $('#area-input').html('');
    $('#area-input-selector-remove').css('display', 'none');
    $('#case-scene-area-add-btn').attr('data-code', $('#city-input').attr('data-shortCode'));
    $('#case-scene-area-add-btn').attr('data-name', $('#province-input').attr('data-name') + $('#city-input').attr('data-name'));
});
/* 地域选择添加*/
$(document).on('click', '#case-scene-area-add-btn', function () {
    let areaCode = $(this).attr('data-code');
    let areaName = $(this).attr('data-name');
    if (areaCode != '' && areaCode != null) {
        if (addAreaCache.get(areaCode) == null) {
            $('#selected-area-item').append(`
                <div class="each-divinner-item case-scene-area-item-${areaCode}">
                    <span class="case-scene-area-value">${areaName}</span>
                    <i class="iconfont icon-x-close item-close case-scene-area-delete" data-areacode="${areaCode}"></i>
                </div>
            `);
            addAreaCache.set(areaCode, areaCode);
            $('#selected-area-item').css('padding-bottom', '20px');
            $('#province-input').html('');
            $('#city-input').html('');
            $('#area-input').html('');
            $('#city-selector-conatiner').html('');
            $('#area-selector-conatiner').html('');
            $('#province-input-selector-remove').css('display', 'none');
            $('#city-input-selector-remove').css('display', 'none');
            $('#area-input-selector-remove').css('display', 'none');
            $(this).attr('data-code', '');
            $(this).attr('data-name', '');
        } else {
            $('#alert-modal-content').html('该地域已添加');
            $('#alert-modal').modal('show');
        }
    } else {
        $('#alert-modal-content').html('请选择一个地域');
        $('#alert-modal').modal('show');
    }
});
/* 地域删除*/
$(document).on('click', '.case-scene-area-delete', function () {
    addAreaCache.delete($(this).attr('data-areacode'));
    $(`.case-scene-area-item-${$(this).attr('data-areacode')}`).remove();
    if (addAreaCache.size == 0) {
        $('#selected-area-item').css('padding-bottom', '0');
    }
});

/* 表格设备选择*/
$(document).on('change', '.checkbox-all', function () {
    if ($(this).is(':checked')) {
        // 取消全选
        $('.checkbox-item').prop('checked', true);
    } else {
        // 全选
        $('.checkbox-item').prop('checked', false);
    }
    for (let i = 0; i < $('.checkbox-item').length; i++) {
        if ($(this).is(':checked')) {
            selectedDevsCache.add($($('.checkbox-item')[i]).attr('data-devcode'));
        } else {
            selectedDevsCache.delete($($('.checkbox-item')[i]).attr('data-devcode'));
        }
    }
    setSelectedDevs(selectedDevsCache);
});
$(document).on('change', '.checkbox-item', function () {
    if ($(this).is(':checked')) {
        selectedDevsCache.add($(this).attr('data-devcode'));
        let isAllChecked = true;
        for (let i = 0; i < $('.checkbox-item').length; i++) {
            if (!$($('.checkbox-item')[i]).is(':checked')) {
                isAllChecked = false;
                break;
            }
        }
        if (isAllChecked) {
            $('.checkbox-all').prop('checked', true);
        }
    } else {
        $('.checkbox-all').prop('checked', false);
        selectedDevsCache.delete($(this).attr('data-devcode'));
    }
    setSelectedDevs(selectedDevsCache);
});
$(document).on('click', '.selected-devs-delete', function () {
    selectedDevsCache.delete($(this).attr('data-devcode'));
    $(`.selected-devs-item-${$(this).attr('data-devcode')}`).remove();
    $(`.checkbox-item-${$(this).attr('data-devcode')}`).prop('checked', false);
    for (let i = 0; i < $('.checkbox-all').length; i++) {
        if (!$($('.checkbox-item')[i]).is(':checked')) {
            $('.checkbox-all').prop('checked', false);
            break;
        }
    }
});
function setSelectedDevs(dataSet) {
    let htmlValue = '';
    for (let item of dataSet.values()) {
        htmlValue = htmlValue + `
            <div class="each-divinner-item selected-devs-item-${item}">
                <span class="selected-devs-value">${item}</span>
                <i class="iconfont icon-x-close item-close selected-devs-delete" data-devcode="${item}"></i>
            </div>
        `;
    }
    $('#selected-devs-area').html(htmlValue);
}

/* 精细数据范围开关*/
$(document).on('change', '#precise-data-range-switch', function () {
    if ($(this).is(':checked')) {
        $('.precise-data-value').css('display', 'block');
        if (!isDetailDevListSearched) {
            isDetailDevListSearched = true;
        }
    } else {
        $('.precise-data-value').css('display', 'none');
    }
});

/* 作战场景权限radio*/
$(document).on('change', '.case-scene-type', function () {
    if ($(this).is(':checked')) {
        switch ($(this).attr('data-type')) {
            case 'all':
                $('.case-scene-cos-info').css('display', 'none');
                break;
            case 'cos':
                $('.case-scene-cos-info').css('display', 'block');
                break;
            default:
                break;
        }
    }
});

/* 作战目标权限radio*/
$(document).on('change', '.case-target-type', function () {
    if ($(this).is(':checked')) {
        switch ($(this).attr('data-type')) {
            case 'all':
                $('.case-target-cos-info').css('display', 'none');
                break;
            case 'cos':
                $('.case-target-cos-info').css('display', 'block');
                break;
            default:
                break;
        }
    }
});

/* 选择制式*/
$(document).on('click', '.devmode-selector', function () {
    $('#devmode-input').html($(this).html());
    $('#devmode-input-selector-remove').css('display', 'block');
});
$(document).on('click', '#case-scene-add-devmode-btn', function () {
    let addDevMode = $('#devmode-input').html();
    if (addDevMode != '') {
        if (addDevModeCache.get(addDevMode) == null) {
            $('#selected-dev-mode-item').append(`
                <div class="each-divinner-item case-scene-devmode-item-${addDevMode}">
                    <span class="case-scene-devmode-value">${addDevMode}</span>
                    <i class="iconfont icon-x-close item-close case-scene-devmode-delete" data-devmode="${addDevMode}"></i>
                </div>
            `);
            addDevModeCache.set(addDevMode, addDevMode);
            $('#selected-dev-mode-item').css('padding-bottom', '20px');
            $('#devmode-input').html('');
            $('#devmode-input-selector-remove').css('display', 'none');
        } else {
            $('#alert-modal-content').html('该制式已添加');
            $('#alert-modal').modal('show');
        }
    } else {
        $('#alert-modal-content').html('请选择一个制式');
        $('#alert-modal').modal('show');
    }
});
$(document).on('click', '#devmode-input-selector-remove', function () {
    $('#devmode-input').html('');
    $('#devmode-input-selector-remove').css('display', 'none');
});
$(document).on('click', '.case-scene-devmode-delete', function () {
    addDevModeCache.delete($(this).attr('data-devmode'));
    $(`.case-scene-devmode-item-${$(this).attr('data-devmode')}`).remove();
    if (addDevModeCache.size == 0) {
        $('#selected-dev-mode-item').css('padding-bottom', '0');
    }
});

/* 添加手机号*/
$(document).on('click', '#case-target-addtel-btn', function () {
    let addTelVal = $('#case-target-addtel-input').val();
    if (/^1[3456789][0-9]{9}$/.test(addTelVal)) {
        if (addTelCache.get(addTelVal) == null) {
            $('#case-target-addtel-input').val('');
            $('.case-target-tel-values').append(`
                <div class="each-divinner-item case-target-telvalue-item-${addTelVal}">
                    <span class="case-targetTel-value">${addTelVal}</span>
                    <i class="iconfont icon-x-close item-close case-target-telvalue-delete" data-tel="${addTelVal}"></i>
                </div>
            `);
            addTelCache.set(addTelVal, addTelVal);
            $('.case-target-tel-values').css('padding-bottom', '20px');
        } else {
            $('#alert-modal-content').html('手机号已存在');
            $('#alert-modal').modal('show');
        }
    } else {
        $('#alert-modal-content').html('请输入正确的手机号');
        $('#alert-modal').modal('show');
    }
});
$(document).on('click', '.case-target-telvalue-delete', function () {
    addTelCache.delete($(this).attr('data-tel'));
    $(`.case-target-telvalue-item-${$(this).attr('data-tel')}`).remove();
    if (addTelCache.size == 0) {
        $('.case-target-tel-values').css('padding-bottom', '0');
    }
});

/* 获取默认角色列表*/
function queryDefault() {
    let defaultQueryData = new RoleBean();
    defaultQueryData.pageSize = pageItemNum;
    defaultQueryData.pageNum = 1;
    queryCache = defaultQueryData;
    query(defaultQueryData);
}
queryDefault();

/* 搜索*/
function query(data) {
    RoleOperation.operation(data, 'getDevUseRoleList', 'POST').then((result) => {
        console.log(result);
        if (result.retcode == 1) {
            resultCache = result.pageInfo.list;
            RoleListTable.drawTable(result.pageInfo.list);
            PageInfo.drawPageController(result, 'roleList');
            $('#total-count').html(result.pageInfo.total);
            $('#total-page-num').html(`，共${result.pageInfo.pages}页`);
        }
    });
}

/* 选择每页显示数量*/
$('.total-count-selector').click(function () {
    pageItemNum = this.childNodes[0].innerHTML;
    /* 设置cookie*/
    MyCookie.setCookie('userDevRoleManagePageNum', pageItemNum, 365);
    $('.show-item-num').html(pageItemNum + '条');
    queryCache.pageNum = 1;
    queryCache.pageSize = pageItemNum;
    query(queryCache);
});
/* 查看角色*/
$(document).on('click', '.view-user', function () {
    let dataIndex = Number($(this).attr('data-role-index'));
    console.log(resultCache[dataIndex]);
    isRoleNameTrueType = 2;
    UseDevRoleInfoInputTable.drawTable(resultCache[dataIndex], 'view');
    $('.table-view-container').css('display', 'none');
    $('#add-role-area').css('display', 'block');
    $('.title-small-text').css('display', 'none');
    $('#view-role-small-text').html('&nbsp;&nbsp;&gt;查看角色：' + resultCache[dataIndex].roleName);
    $('#view-role-small-text').css('display', '');
    tableViewAutoSize();
});
/* 修改角色*/
$(document).on('click', '.update-user', function () {
    let dataIndex = Number($(this).attr('data-role-index'));
    isRoleNameTrueType = 2;
    addTelCache = new Map();
    addDevModeCache = new Map();
    addAreaCache = new Map();
    selectedDevsCache = new Set();
    UseDevRoleInfoInputTable.drawTable(resultCache[dataIndex], 'update');
    $('.table-view-container').css('display', 'none');
    $('#add-role-area').css('display', 'block');
    $('.title-small-text').css('display', 'none');
    $('#update-role-small-text').css('display', '');
    tableViewAutoSize();
});
/* 删除角色*/
let deleteRoleId;
$(document).on('click', '.delete-user', function () {
    deleteRoleId = Number($(this).attr('data-role-id'));
    $('#modal-alert-content').html('是否删除该角色');
    $('#ensure-modal').modal('show');
});
$('#ensure-modal-submit').click(function () {
    if (deleteRoleId != null) {
        let deleteData = { 'ids': [] };
        deleteData['ids'].push(deleteRoleId);
        $('.loading-gif').attr('src', 'img/loading.gif');
        $('.loading-word').html('正在提交...')
        $('.submit-loading').css('display', 'block');
        RoleOperation.operation(deleteData, 'deleteDevUseRole', 'POST').then((result) => {
            console.log(result);
            if (result.retcode == 1) {
                $('.loading-gif').attr('src', 'img/submit_success.png');
                $('.loading-word').html(`<span style="color: rgb(10, 180, 0)">删除成功</span>`);
                queryDefault();
            } else {
                $('.loading-gif').attr('src', 'img/submit_fail.png');
                $('.loading-word').html(`<span style="color: rgb(255, 120, 120);">删除失败</span>`);
            }
            setTimeout(function () {
                $('.submit-loading').fadeOut(500);
            }, 700);
        });
    }
});

/* 角色名*/
$(document).on('blur', '#add-role-rolename', function () {
    let roleName = $(this).val();
    if (roleName != '') {
        RoleOperation.operation(null, `checkRoleName/${$(this).attr('data-type')}/${roleName}/${$(this).attr('data-role-id') == '' ? 0 : $(this).attr('data-role-id')}`, 'GET').then((result) => {
            if (result.retcode == 1) {
                $('#is-rolename-true').css('color', '#00ffd0');
                $('#is-rolename-true').html('角色名可用');
                isRoleNameTrueType = 2;
            } else {
                $('#is-rolename-true').css('color', '#ff0000');
                $('#is-rolename-true').html('角色名已存在');
                isRoleNameTrueType = 1;
            }
        });
    } else {
        isRoleNameTrueType = 0;
    }
});

/* 设备使用权限*/
$(document).on('click', '.permission-useType-checkinput', function () {
    permissionUseType = Number($(this).attr('data-type'));
});
/* 作战场景权限*/
$(document).on('click', '.permission-sceneType-checkinput', function () {
    permissionSceneType = Number($(this).attr('data-type'));
});
/* 作战目标权限*/
$(document).on('click', '.permission-targetNumType-checkinput', function () {
    permissionTargetNumType = Number($(this).attr('data-type'));
});

/* 提交*/
$(document).on('click', '#add-role-submit-btn', function () {
    let submitType = $(this).attr('data-type');
    let addRoleData = new DevUseRoleVo();
    /* 检验角色名是否正确*/
    switch (isRoleNameTrueType) {
        case 0:
            $('#alert-modal-content').html('请输入角色名');
            $('#alert-modal').modal('show');
            return;
        case 1:
            $('#alert-modal-content').html('角色名已存在');
            $('#alert-modal').modal('show');
            return;
        case 2:
            break;
        default:
            break;
    }
    if ($('.institutions-input-container').html() == '') {
        $('#alert-modal-content').html('请选择所属机构');
        $('#alert-modal').modal('show');
        return;
    }
    /* roleId*/
    if (submitType == 'update') {
        addRoleData.roleId = $(this).attr('data-role-id');
    }
    /* 角色名*/
    addRoleData.roleName = $('#add-role-rolename').val();
    /* 角色描述*/
    addRoleData.remark = $('#add-role-remark').val();
    /* 设备使用权限*/
    addRoleData.useType = permissionUseType;
    let otherDevCode = '';
    addRoleData.otherDevCode = '';
    if ($('#precise-data-range-switch').is(':checked')) { // 其他设备编号
        if (selectedDevsCache.size > 0) {
            for (let item of selectedDevsCache.values()) {
                otherDevCode = otherDevCode + item + ';';
            }
        }
        if (otherDevCode != '') {
            addRoleData.otherDevCode = otherDevCode.substring(0, otherDevCode.length - 1);
        }
    }
    /* 作战场景权限*/
    addRoleData.sceneType = permissionSceneType;
    if (addRoleData.sceneType == 0) { // 自定义
        let enableAreaCode = ''; // 地域
        addRoleData.enableAreaCode = '';
        if (addAreaCache.size > 0) {
            addAreaCache.forEach((value) => {
                enableAreaCode = enableAreaCode + value + ';';
            });
        }
        if ($('#case-scene-area-add-btn').attr('data-code') != '' && $('#case-scene-area-add-btn').attr('data-code') != null) {
            if (addAreaCache.get($('#case-scene-area-add-btn').attr('data-code')) == null) {
                enableAreaCode = enableAreaCode + $('#case-scene-area-add-btn').attr('data-code') + ';'
            }
        }
        if (enableAreaCode != '') {
            addRoleData.enableAreaCode = enableAreaCode.substring(0, enableAreaCode.length - 1);
        }
        let enableMode = ''; // 可用制式
        addRoleData.enableMode = '';
        if (addDevModeCache.size > 0) {
            addDevModeCache.forEach((value) => {
                enableMode = enableMode + value + ';';
            });
        }
        if ($('#devmode-input').html() != '') {
            if (addDevModeCache.get($('#devmode-input').html()) == null) {
                enableMode = enableMode + $('#devmode-input').html() + ';'
            }
        }
        if (enableMode != '') {
            addRoleData.enableMode = enableMode.substring(0, enableMode.length - 1);
        }
        addRoleData.startEnableTime = '';
        if ($('#case-scene-startTime-value').val() != '') { // 有效时间--开始
            addRoleData.startEnableTime = new Date($('#case-scene-startTime-value').val());
        }
        addRoleData.endEnableTime = '';
        if ($('#case-scene-endTime-value').val() != '') { // 有效时间--结束
            addRoleData.endEnableTime = new Date($('#case-scene-endTime-value').val());
        }
    }
    /* 作战目标权限*/
    addRoleData.targetNumType = permissionTargetNumType;
    if (addRoleData.targetNumType == 0) { // 自定义
        let enableTargetNum = ''; // 可定位目标手机号
        addRoleData.enableTargetNum = '';
        if (addTelCache.size > 0) {
            addTelCache.forEach((value) => {
                enableTargetNum = enableTargetNum + value + ';';
            });
        }
        if ($('#case-target-addtel-input').val() != '') {
            if (/^1[3456789][0-9]{9}$/.test($('#case-target-addtel-input').val())) {
                enableTargetNum = enableTargetNum + $('#case-target-addtel-input').val() + ';';
            } else {
                $('#alert-modal-content').html('请输入正确的手机号');
                $('#alert-modal').modal('show');
                return;
            }
        }
        if (enableTargetNum != '') {
            addRoleData.enableTargetNum = enableTargetNum.substring(0, enableTargetNum.length - 1);
        }
    }
    console.log(addRoleData);
    $('.loading-gif').attr('src', 'img/loading.gif');
    $('.loading-word').html('正在提交...')
    $('.submit-loading').css('display', 'block');
    RoleOperation.operation(addRoleData, `${$(this).attr('data-type')}DevUseRole`, 'POST').then((result) => {
        if (result.retcode == 1) {
            queryDefault();
            $('.table-view-container').css('display', 'none');
            $('#role-table-list').css('display', 'block');
            tableViewAutoSize();
            $('.loading-gif').attr('src', 'img/submit_success.png');
            $('.loading-word').html(`<span style="color: rgb(10, 180, 0)">${$(this).attr('data-type') == 'add' ? '添加' : '修改'}成功</span>`);
        } else {
            $('.loading-gif').attr('src', 'img/submit_fail.png');
            $('.loading-word').html(`<span style="color: rgb(255, 120, 120);">${$(this).attr('data-type') == 'add' ? '添加' : '修改'}失败</span>`);
        }
        setTimeout(function () {
            $('.submit-loading').fadeOut(500);
        }, 700);
    });
});

/* 选择下属成员每页显示数量*/
$(document).on('click', '.role-user-total-count-selector', function () {
    userPageItemNum = this.childNodes[0].innerHTML;
    /* 显示页数*/
    $('.role-user-show-item-num').html(userPageItemNum + '条');
    userQueryCache.pageNum = 1;
    userQueryCache.pageSize = userPageItemNum;
    RoleOperation.operation(userQueryCache, `getUserListByRoleId`, 'POST').then((result) => {
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
});

/* 选择设备列表每页显示数量*/
$(document).on('click', '.dev-list-total-count-selector', function () {
    userPageItemNum = this.childNodes[0].innerHTML;
    /* 显示页数*/
    $('.dev-list-show-item-num').html(userPageItemNum + '条');
    devQueryCache.pageNum = 1;
    devQueryCache.pageSize = userPageItemNum;
    RoleOperation.operation(devQueryCache, `getDevList`, 'POST').then((result) => {
        if (result.retcode == 1 && result.pageInfo != null) {
            if (result.pageInfo.list.length > 0) {
                DevList.draw(result.pageInfo.list);
                DevList.pageInfo(result);
                $('#total-count-dev-list').html(result.pageInfo.total);
                $('#total-page-dev-list').html(`，共${result.pageInfo.pages}页`);
            } else {
                $('#table-tbody-dev-list').html('');
                $('#total-count-dev-list').html(0);
                $('#total-page-dev-list').html('');
                $('.M-box3-dev-list').html('');
            }
        }
    });
});