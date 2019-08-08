import { TopHeader } from '../../common/topHeader/TopHeader.js';
import { MyCookie } from '../../common/cookie/MyCookie.js';

import { RoleOperation } from './ajax/RoleOperation.js';

import { InstitutionTree } from './tree/InstitutionTree.js';
import { ControlAuthorityTree } from './tree/ControlAuthorityTree.js';
import { RoleListTable } from './table/RoleListTable.js';
import { RoleInfoInputTable } from './table/RoleInfoInputTable.js';
import { RoleUser } from './table/RoleUser.js';
import { PageInfo } from './table/PageInfo.js';

/* js版本号，判断服务器端是否已刷新*/
console.log('js.version=2.1.891112');
/* 生成顶部菜单 */
TopHeader.initHeader();
if (MyCookie.getCookie('roleManagePageNum') != '') {
    pageItemNum = Number(MyCookie.getCookie('roleManagePageNum'));
    $('.side_selector_num').html(pageItemNum + '条');
}
if (MyCookie.getCookie('roleManageUserPageNum') != '') {
    userPageItemNum = Number(MyCookie.getCookie('roleManageUserPageNum'));
    $('.role_selector_num').html(userPageItemNum + '条');
}

/* 禁止输入空格*/
$(document).on('keyup blur', '.input-space-forbidden', function () {
    this.value = this.value.replace(/\s+/g, '');
});

let isRoleNameTrueType = 0; // 0空，1已存在，2可以输入

/* 新建角色切换*/
$('#add-role-btn').click(function () {
    checkForbidden = false;
    isRoleNameTrueType = 0;
    RoleInfoInputTable.drawTable(roleInputCache, 'add', null);
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

/* 获取权限资源菜单树状列表*/
RoleOperation.operation(null, 'getMenuTreeList', 'GET').then((result) => {
    if (result.retcode == 1 && result.dataList != null) {
        menuTreeList = result.dataList;
    }
});

/* 表格设备选择*/
let selectedDevsCache = new Set();
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

/* 获取默认角色列表*/
function queryDefault() {
    let defaultQueryData = new RoleBean();
    defaultQueryData.pageSize = pageItemNum;
    defaultQueryData.pageNum = 1;
    queryCache = defaultQueryData;
    query(defaultQueryData);
}
/* 搜索*/
function query(data) {
    RoleOperation.operation(data, 'getRoleList', 'POST').then((result) => {
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
queryDefault();

/* 选择每页显示数量*/
$('.side_selector').click(function () {
    pageItemNum = this.childNodes[0].innerHTML;
    /* 设置cookie*/
    MyCookie.setCookie('roleManagePageNum', pageItemNum, 365);
    $('.side_selector_num').html(pageItemNum + '条');
    queryCache.pageNum = 1;
    queryCache.pageSize = pageItemNum;
    query(queryCache);
});
/* 查看角色*/
$(document).on('click', '.view-user', function () {
    let dataIndex = Number($(this).attr('data-role-index'));
    RoleOperation.operation(null, `getRoleDetail/${resultCache[dataIndex].roleId}`, 'GET').then((result) => {
        console.log(result);
        if (result.retcode == 1 && result.dataMap != null) {
            checkForbidden = true;
            isRoleNameTrueType = 2;
            RoleInfoInputTable.drawTable(result.dataMap.roleDetail, 'view', userPageItemNum);
            $('.table-view-container').css('display', 'none');
            $('#add-role-area').css('display', 'block');
            $('.title-small-text').css('display', 'none');
            $('#view-role-small-text').html('&nbsp;&nbsp;&gt;查看角色：' + resultCache[dataIndex].roleName);
            $('#view-role-small-text').css('display', '');
            tableViewAutoSize();
        }
    });
});
/* 修改角色*/
$(document).on('click', '.update-user', function () {
    let dataIndex = Number($(this).attr('data-role-index'));
    RoleOperation.operation(null, `getRoleDetail/${resultCache[dataIndex].roleId}`, 'GET').then((result) => {
        console.log(result);
        if (result.retcode == 1 && result.dataMap != null) {
            checkForbidden = false;
            isRoleNameTrueType = 2;
            RoleInfoInputTable.drawTable(result.dataMap.roleDetail, 'update', null);
            $('.table-view-container').css('display', 'none');
            $('#add-role-area').css('display', 'block');
            $('.title-small-text').css('display', 'none');
            $('#update-role-small-text').css('display', '');
            tableViewAutoSize();
        }
    });
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
        RoleOperation.operation(deleteData, 'deleteRole', 'POST').then((result) => {
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

/* ztree操作*/
$(document).on('click', '.selected-institutions-item-delete', function () {
    let clickedId = $(this).attr('data-tree-id');
    let treeObj = $.fn.zTree.getZTreeObj('institutions-tree');
    let nodes = treeObj.getCheckedNodes(true);
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].tId == clickedId) {
            nodes[i].checked = false;
            treeObj.updateNode(nodes[i]);
            break;
        }
    }
    $($(this).parent()).remove();
});
$(document).on('click', '#institutions-select-ensure', function () {
    let valueArr = [];
    for (let i = 0; i < $('.selected-institutions-value-modal').length; i++) {
        valueArr.push($($('.selected-institutions-value-modal')[i]).html());
    }
    let htmlValue = '';
    for (let i = 0; i < valueArr.length; i++) {
        htmlValue = htmlValue + `
            <div class="each-divinner-item selected-institutions-value-final">${valueArr[i]}</div>
        `;
    }
    $('.institutions-input-container').html(htmlValue);
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

$(document).on('click', '.permission-range-checkinput', function () {
    permissionDataType = $(this).attr('data-type');
});

/* 提交*/
$(document).on('click', '#add-role-submit-btn', function () {
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
    let addRoleData = new RoleVo();
    /* 角色名*/
    addRoleData.roleName = $('#add-role-rolename').val();
    /* 角色描述*/
    addRoleData.remark = $('#add-role-remark').val();
    /* 机构*/
    for (let i = 0; i < $('.selected-institutions-value-final').length; i++) {
        addRoleData.otherDeptIds = addRoleData.otherDeptIds + $($('.selected-institutions-value-final')[i]).html() + ';';
    }
    if (addRoleData.otherDeptIds != '') {
        addRoleData.otherDeptIds = addRoleData.otherDeptIds.substring(0, addRoleData.otherDeptIds.length - 1);
    }
    /* 菜单权限*/
    let menuTreeObj = $.fn.zTree.getZTreeObj('control-authority-tree');
    let menuNodes = menuTreeObj.getCheckedNodes(true);
    for (let i = 0; i < menuNodes.length; i++) {
        // if (menuNodes[i].level == 1) {
        //     addRoleData.menus.push(menuNodes[i].menuId);
        // }
        if (menuNodes[i].menuId != null) {
            addRoleData.menus.push(menuNodes[i].menuId);
        }
    }
    /* 数据权限范围*/
    addRoleData.dataType = Number(permissionDataType);
    /* 设备范围*/
    for (let i = 0; i < $('.selected-devs-value').length; i++) {
        addRoleData.otherDevCodes = addRoleData.otherDevCodes + $($('.selected-devs-value')[i]).html() + ';';
    }
    if (addRoleData.otherDevCodes != '') {
        addRoleData.otherDevCodes = addRoleData.otherDevCodes.substring(0, addRoleData.otherDevCodes.length - 1);
    }
    if ($(this).attr('data-role-id') != '') {
        addRoleData.roleId = Number($(this).attr('data-role-id'));
    }
    console.log(addRoleData);
    $('.loading-gif').attr('src', 'img/loading.gif');
    $('.loading-word').html('正在提交...')
    $('.submit-loading').css('display', 'block');
    RoleOperation.operation(addRoleData, `${$(this).attr('data-type')}Role`, 'POST').then((result) => {
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

/* 选择每页显示数量*/
$(document).on('click', '.role_selector', function () {
    userPageItemNum = this.childNodes[0].innerHTML;
    /* 显示页数*/
    MyCookie.setCookie('roleManageUserPageNum', userPageItemNum, 365);
    $('.role_selector_num').html(userPageItemNum + '条');
    userQueryCache.pageNum = 1;
    userQueryCache.pageSize = userPageItemNum;
    RoleOperation.operation(userQueryCache, `getUserListByRoleId`, 'POST').then((result) => {
        console.log(result);
        if (result.retcode == 1 && result.pageInfo != null) {
            if (result.pageInfo.list.length > 0) {
                RoleUser.draw(result.pageInfo.list);
                PageInfo.drawPageController(result, 'userList');
                $('#total-count').html(result.pageInfo.total);
                $('#total-page-num').html(`，共${result.pageInfo.pages}页`);
            } else {
                $('#table-tbody-role-user').html('');
                $('#total-count').html(0);
                $('#total-page-num').html('');
                $('.M-box3').html('');
            }
        }
    });
});
/* add by guoshuai start 2018-8-24*/
/*顶部跳转*/
// $('.header-menu-item:eq(3)').html("平台用户功能管理"+`<p style="
// width:11px;
// height:9px;
// background:url('img/iconpic/slide.png') no-repeat;
// background-size:100% 100%;
// position:absolute;
// top:14px;
// left:80%;
// "></p>`);
// $('.header-menu-dropdown-3').css({'margin-left': '14px'});
// $('.header-menu-item:eq(3)').css({'font-size':'14px','padding-left':'1px','width':'118%'});
/* add by guoshuai end 2018-8-24*/