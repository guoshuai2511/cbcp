import { TopHeader } from '../../common/topHeader/TopHeader.js';
import { MyCookie } from '../../common/cookie/MyCookie.js';
import { UserOperation } from './ajax/UserOperation.js';

import { DrawTable } from './table/DrawTable.js';
import { PageInfo } from './table/PageInfo.js';
import { ModalContent } from './table/ModalContent.js';
import { DeptTree } from './tree/DeptTree.js';
import { DevListPanel } from './table/DevListPanel.js';
import { RoleSelectorPanel } from './table/RoleSelectorPanel.js';
import { DevUseRoleSelectorPanel } from './table/DevUseRoleSelectorPanel.js';

/* js版本号，判断服务器端是否已刷新*/
console.log('js.version=2.1.10');
/* 生成顶部菜单 */
TopHeader.initHeader();
/* 设置默认页数*/
if (MyCookie.getCookie('userManagePageNum') != '') {
    pageItemNum = Number(MyCookie.getCookie('userManagePageNum'));
    $('.show-item-num').html(pageItemNum + '条');
}

/* 禁止输入空格*/
$(document).on('keyup blur', '.input-space-forbidden', function () {
    this.value = this.value.replace(/\s/g, '');
});
/* 用户名禁止输入空格*/
$(document).on('keyup blur', '.input-space-forbidden-user', function () {
    if (/\s/.test(this.value)) {
        $('#is-have-user').html(`<span class="text-red">用户名不能包含空格</span>`);
    }
    this.value = this.value.replace(/\s/g, '');
});
/* 密码禁止输入空格*/
$(document).on('keyup blur', '.input-space-forbidden-password', function () {
    if (/\s/.test(this.value)) {
        $('#is-pwd-true').html(`<span class="text-red">密码不能包含空格</span>`);
    }
    this.value = this.value.replace(/\s/g, '');
});
/* 禁止输入中文*/
$(document).on('keyup blur', '.input-znch-forbidden', function () {
    this.value = this.value.replace(/[\u4e00-\u9fa5]/g, '');
});
/* 只允许输入数字*/
$(document).on('keyup blur', '.input-num-only', function () {
    this.value = this.value.replace(/[^\d]/g, '');
});
/*只允许输入IP*/
function onlyInputIPAddress(val){
    if(/(\d{1,3}|\*)(\.(\d{1,3}|\*)){3}(\/*(\d{1,3}|\*)(\.(\d{1,3}|\*)){3})*/.test(val)){

    }else{
        $('#is-ip-true').html(`<span class="text-red">IP格式不正确</span>`);
    }
}
initQuery();
function initQuery() {
    userQuery.pageNum = 1;
    userQuery.pageSize = pageItemNum;
    query(userQuery);
}
/*获取时间*/

/* 获取角色列表*/
UserOperation.operation(null, `getRoleList`, 'GET').then((result) => {
    if (result.retcode == 1) {
        roleListCache = result.dataList;
        RoleSelectorPanel.draw(result.dataList);
    }
});
/* 获取组织机构树状图*/
UserOperation.operation(null, `getDeptTreeList`, 'GET').then((result) => {
    if (result.retcode == 1) {
        deptTreeCache = result.dataList;
        DeptTree.drawTree(result.dataList);
    }
});
/*delete by guoshuai 2018-9-12 start content:获取设备使用角色列表*/
/* 获取设备使用角色列表*/
/*UserOperation.operation(null, `getDevUseRoleList`, 'GET').then((result) => {
    if (result.retcode == 1) {
        devUseRoleListCache = result.dataList;
        DevUseRoleSelectorPanel.draw(result.dataList);
    }
});*/
/*delete by guoshuai 2018-9-12 end content:获取设备使用角色列表*/
$(document).on('click', '.selected-dept-modal-item-delete', function () {
    $($(this).parent()).remove();
    let treeObj = $.fn.zTree.getZTreeObj('dept-selector-tree');
    treeObj.cancelSelectedNode();
});
/* 选取上级组织modal确定*/
$('#dept-selector-ensure').click(function () {
    let deptName = $('#selected-institutions-value').html();
    let deptId = $('#selected-institutions-value').attr('data-dept-id');
    if (deptName != null && deptId != null) {
        $('#dept-input-container-value').html(`${deptName == null ? '' : deptName}`);
        $('#dept-input-container-value').attr('data-dept-id', `${deptId == null ? '' : deptId}`);
    }
});

/* 打开组织机构选择框*/
$(document).on('click', '#dept-input-container-value', function () {
    $('#dept-selector-modal').modal('show');
});
/* 打开角色选择框*/
$(document).on('click', '#role-input-container-value', function () {
    $('#role-selector-modal').modal('show');
});
/*add by guoshuai start 8-25*/
/* 打开设备角色选择框*/
// $(document).on('click', '#dev-user-role-input-container-value', function () {
//     $('#devrole-selector-modal').modal('show');
// });
/*打开设备使用权限选择框*/
// $(document).on('click', '#dev-use-rights-input-container-value', function () {
//     $('#devuse-selector-modal').modal('show');
// });
/*打开目标手机使用权限选择框*/
// $(document).on('click', '#target-phone-rights-input-container-value', function () {
//     $('#targetphone-selector-modal').modal('show');
//  });
/*add by guoshuai end 8-25*/
/* 打开下属设备管理框*/
$(document).on('click', '.user-dev-manage', function () {
    selectedDevMap = new Map();
    //$('.dept-modal-area-four').css('display','none');
    //$('#modal-tips-mask').css('display','none');
    //$('#modal-tips-mask').hide(); 
    $('.dept-modal-area-four #txt-dev').val('');
    $('.new-dev-change-six').css('display','none');
    $('.new-dev-change-six #txt-dev').val('');
    $('#dept-selector-modal-add').attr('data-id',$(this).attr('data-userid'));
    $('#dept-selector-modal-del').attr('data-id',$(this).attr('data-userid'));
    $('#user-dev-submit').attr('data-userId', '');
    $('#dev-selected-area').html('');
    $('.use-dev-role-dev-list').html('');
    $('.loading-gif').attr('src', 'img/loading.gif');
    $('.loading-word').html('加载中...')
    $('.submit-loading').css('display', 'block');
    UserOperation.operation(null, `getDevListByDeptId/${$(this).attr('data-dept')}`, 'GET').then((result) => { // 获取机构下属设备列表
        if (result.retcode == 1) {
            if (result.dataList != null && result.dataList.length > 0) {
                DevListPanel.drawAll(result.dataList);
            }
            /*add by guoshuai start 2018-10-8*/
            else{
                $('.dept-modal-area-four #div_items').html('');
                DevListPanel.drawAll(result.dataList);
            }
             /*add by guoshuai end 2018-10-8*/
            UserOperation.operation(null, `getDevListByUserId/${$(this).attr('data-userId')}`, 'GET').then((result) => { // 获取用户下属设备列表
                if (result.retcode == 1) {
                    console.log(result);
                    resultDevCache=result.dataList;
                    if (result.dataList != null && result.dataList.length > 0) {
                        DevListPanel.drawUser(result.dataList); // 显示列表的方法
                    }else{
                        $('#dev-table-tbody').html('');
                    }
                    $('#user-dev-submit').attr('data-userId', $(this).attr('data-userId'));
                    $('.submit-loading').css('display', 'none');
                    $('#user-dev-manage-modal').modal('show');
                } else {
                    $('.loading-gif').attr('src', 'img/submit_fail.png');
                    $('.loading-word').html(`<span style="color: rgb(255, 120, 120);">加载失败</span > `);
                    setTimeout(function () {
                        $('.submit-loading').fadeOut(500);
                    }, 700);
                }
            });
        } else {
            $('.loading-gif').attr('src', 'img/submit_fail.png');
            $('.loading-word').html(`<span style="color: rgb(255, 120, 120);">加载失败</span > `);
            setTimeout(function () {
                $('.submit-loading').fadeOut(500);
            }, 700);
        }
    });
});
/* 下属设备管理面板CheckBox*/
$(document).on('change', '.dev-checkbox-all', function () {
    if ($(this).is(':checked')) {
        $('.dev-checkbox-item').prop('checked', true);
    } else {
        $('.dev-checkbox-item').prop('checked', false);
    }
    for (let i = 0; i < $('.dev-checkbox-item').length; i++) {
        let devCode = $($('.dev-checkbox-item')[i]).attr('data-devCode');
        let devId = $($('.dev-checkbox-item')[i]).attr('data-devId');
        $(`.selected-devCode-${devCode}`).remove();
        selectedDevMap.delete(devCode);
        if ($($('.dev-checkbox-item')[i]).is(':checked')) {
            if (!selectedDevMap.has(devCode)) {
                selectedDevMap.set(devCode, devId);
                let htmlValue = `
                    <div class="each-divinner-item selected-dev-items-in-panel selected-devCode-${devCode}" data-devCode="${devCode}">
                        <span class="selected-dev-value-in-panel">${devCode}</span>
                        <i class="iconfont icon-x-close item-close selected-dev-delete" data-devCode="${devCode}"></i>
                    </div>
                `;
                $('#dev-selected-area').append(htmlValue);
            }
        }
    }
});
$(document).on('change', '.dev-checkbox-item', function () {
    if ($(this).is(':checked')) {
        let htmlValue = `
           <div class="each-divinner-item selected-dev-items-in-panel selected-devCode-${$(this).attr('data-devCode')}" data-devCode="${$(this).attr('data-devCode')}">
                <span class="selected-dev-value-in-panel">${$(this).attr('data-devCode')}</span>
                <i class="iconfont icon-x-close item-close selected-dev-delete" data-devCode="${$(this).attr('data-devCode')}"></i>
            </div>
        `;
        $('#dev-selected-area').append(htmlValue);
        //$('#dev-table-tbody').append(htmlValue);
        selectedDevMap.set($(this).attr('data-devCode'), $(this).attr('data-devId'));
        let isAllChecked = true;
        for (let i = 0; i < $('.dev-checkbox-item').length; i++) {
            if (!$($('.dev-checkbox-item')[i]).is(':checked')) {
                isAllChecked = false;
            }
        }
        if (isAllChecked) {
            $('.dev-checkbox-all').prop('checked', true);
        }
    } else {
        $(`.selected-devCode-${$(this).attr('data-devCode')}`).remove();
        $('.dev-checkbox-all').prop('checked', false);
        selectedDevMap.delete($(this).attr('data-devCode'));
    }
});
/* 设备选择项删除*/
$(document).on('click', '.selected-dev-delete', function () {
    $(`.dev-checkbox-item-${$(this).attr('data-devCode')}`).prop('checked', false);
    $(`.selected-devCode-${$(this).attr('data-devCode')}`).remove();
    selectedDevMap.delete($(this).attr('data-devCode'));
    let isAllChecked = true;
    for (let i = 0; i < $('.dev-checkbox-item').length; i++) {
        if (!$($('.dev-checkbox-item')[i]).is(':checked')) {
            isAllChecked = false;
        }
    }
    if (!isAllChecked) {
        $('.dev-checkbox-all').prop('checked', false);
    }
});
/* delete by guoshuai start 2018-9-18*/
/* 用户下属设备管理提交*/
// $('#user-dev-submit').click(function () {
//     let userVoSubmit = new UserVo();
//     userVoSubmit.id = Number($(this).attr('data-userId'));
//     userVoSubmit.devIds = [];
//     selectedDevMap.forEach((id) => {
//         userVoSubmit.devIds.push(Number(id));
//     });

//     $('.loading-gif').attr('src', 'img/loading.gif');
//     $('.loading-word').html('提交中...')
//     $('.submit-loading').css('display', 'block');
//     if (userVoSubmit.devIds.length == 0) {
//         /* 如果设备列表为空，提交到删除接口*/
//         UserOperation.operation(null, `deleteUserDev/${userVoSubmit.id}`, 'GET').then((result) => {
//             if (result.retcode == 1) {
//                 $('.loading-gif').attr('src', 'img/submit_success.png');
//                 $('.loading-word').html(`<span style="color: rgb(10, 180, 0)">修改成功</span>`);
//             } else {
//                 $('.loading-gif').attr('src', 'img/submit_fail.png');
//                 $('.loading-word').html(`<span style="color: rgb(255, 120, 120);">修改失败</span > `);
//             }
//             setTimeout(function () {
//                 $('.submit-loading').fadeOut(500);
//             }, 700);
//         });
//     } else {
//         /* 如果设备列表不为空，提交到更新接口*/
//         // UserOperation.operation(JSON.stringify(userVoSubmit), 'updateUserDev', 'POST').then((result) => {
//         //     if (result.retcode == 1) {
//         //         $('.loading-gif').attr('src', 'img/submit_success.png');
//         //         $('.loading-word').html(`<span style="color: rgb(10, 180, 0)">修改成功</span>`);
//         //     } else {
//         //         $('.loading-gif').attr('src', 'img/submit_fail.png');
//         //         $('.loading-word').html(`<span style="color: rgb(255, 120, 120);">修改失败</span > `);
//         //     }
//         //     setTimeout(function () {
//         //         $('.submit-loading').fadeOut(500);
//         //     }, 700);
//         // });
//         
//     }
// });
/* delete by guoshuai end 2018-9-18*/
/* 设备列表中设备信息的修改 add by guoshuai start 2018-9-18*/
$(document).on('click','#new-user-dev-change',function () {
    // if($('#new-user-dev-change').attr('data-userid')==$('.update-dev-change').attr('data-id')){
    //     $('.update-dev-change').parent().siblings().eq(2).html($('.dept-modal-area-five #query-time-start-time').val());
    //     $('.update-dev-change').parent().siblings().eq(3).html($('.dept-modal-area-five #query-time-end-time').val());
    // }
    updateUserDev();
});

$(document).on('click','.update-dev-change',function () {
    
    let userid=$(this).attr('data-id');
    $('#new-user-dev-change').attr('data-userid',userid);
    
    //$('.dept-modal-area-five').html('');
    //$('.dept-modal-area-five').html(ModalContent.getUserInputHtml(3, null));
});
/* 设备列表中设备信息的修改 add by guoshuai end 2018-9-18*/
/* 角色选择CheckBox*/
$(document).on('change', '.role-checkbox-item', function () {
    if ($(this).is(':checked')) {
        let htmlValue = `
            <div class="each-divinner-item selected-role-items-in-panel selected-role-id-${$(this).attr('data-role-id')}" data-role-id="${$(this).attr('data-role-id')}" data-role-name="${$(this).attr('data-role-name')}">
                <span class="selected-role-value-in-panel">${$(this).attr('data-role-name')}</span>
                <i class="iconfont icon-x-close item-close selected-role-delete" data-role-id="${$(this).attr('data-role-id')}"></i>
            </div>
        `;
        $('#role-selected-area').append(htmlValue);
    } else {
        $(`.selected-role-id-${$(this).attr('data-role-id')}`).remove();
    }
});
/* 角色选择项删除*/
$(document).on('click', '.selected-role-delete', function () {
    $(`.role-checkbox-item-${$(this).attr('data-role-id')}`).prop('checked', false);
    $(`.selected-role-id-${$(this).attr('data-role-id')}`).remove();
});
/* 角色选择确定*/
$('#role-selector-ensure').click(function () {
    let htmlValue = '';
    for (let i = 0; i < $('.selected-role-items-in-panel').length; i++) {
        htmlValue = htmlValue + `
            <div class="each-divinner-item selected-role-items-in-input">
                <span class="selected-role-value-in-input" data-role-id="${$($('.selected-role-items-in-panel')[i]).attr('data-role-id')}">${$($('.selected-role-items-in-panel')[i]).attr('data-role-name')}</span>
            </div>
        `;
    }
    $('#role-input-container-value').html(htmlValue);
    if (htmlValue != '') {
        $('#is-role-true').html('');
    }
});

/* 设备使用角色选择CheckBox*/
$(document).on('change', '.dev-user-role-checkbox-item', function () {
    if ($(this).is(':checked')) {
        let htmlValue = `
            <div class="each-divinner-item selected-dev-user-role-items-in-panel selected-dev-user-role-id-${$(this).attr('data-role-id')}" data-role-id="${$(this).attr('data-role-id')}" data-role-name="${$(this).attr('data-role-name')}">
                <span class="selected-dev-user-role-value-in-panel">${$(this).attr('data-role-name')}</span>
                <i class="iconfont icon-x-close item-close selected-dev-user-role-delete" data-role-id="${$(this).attr('data-role-id')}"></i>
            </div>
        `;
        $('#dev-user-role-selected-area').append(htmlValue);
    } else {
        $(`.selected-dev-user-role-id-${$(this).attr('data-role-id')}`).remove();
    }
});
/* 设备使用角色选择项删除*/
$(document).on('click', '.selected-dev-user-role-delete', function () {
    $(`.dev-user-role-checkbox-item-${$(this).attr('data-role-id')}`).prop('checked', false);
    $(`.selected-dev-user-role-id-${$(this).attr('data-role-id')}`).remove();
});
/* 设备使用角色选择确定*/
$('#dev-user-role-selector-ensure').click(function () {
    let htmlValue = '';
    for (let i = 0; i < $('.selected-dev-user-role-items-in-panel').length; i++) {
        htmlValue = htmlValue + `
            <div class="each-divinner-item selected-dev-user-role-items-in-input">
                <span class="selected-dev-user-role-value-in-input" data-role-id="${$($('.selected-dev-user-role-items-in-panel')[i]).attr('data-role-id')}">${$($('.selected-dev-user-role-items-in-panel')[i]).attr('data-role-name')}</span>
            </div>
        `;
    }
    $('#dev-user-role-input-container-value').html(htmlValue);
});

/* 搜索*/
$('.guide-search-btn').click(function () {
    let userQueryTemp = new UserQueryBean();
    userQueryTemp.username = $('#name-value').val().trim();
    userQueryTemp.tel = $('#phone-num-value').val().trim();
    userQueryTemp.realname = $('#realname-value').val().trim();
    // userQueryTemp.realname = $('#realname-value').val().replace(/(^\s*)|(\s*$)/g, "");
    if ($('#locked-input').html() == '已启用') {
        userQueryTemp.locked = 0;
    } else if ($('#locked-input').html() == '已停用') {
        userQueryTemp.locked = 1;
    } else {
        userQueryTemp.locked = '';
    }
    userQueryTemp.deptId = $('#dept-query-selector-input').attr('data-dept-id') == '' ? null : Number($('#dept-query-selector-input').attr('data-dept-id'));
    userQueryTemp.roleId = $('#role-selector-input').attr('data-role-id') == '' ? null : Number($('#role-selector-input').attr('data-role-id'));
    userQueryTemp.devUseRoleId = $('#dev-use-role-selector-input').attr('data-role-id') == '' ? null : Number($('#dev-use-role-selector-input').attr('data-role-id'));
    userQueryTemp.pageNum = 1;
    userQueryTemp.pageSize = pageItemNum;
    console.log(userQueryTemp);
    userQuery = userQueryTemp;
    query(userQueryTemp);
});

/* 用户表格左侧勾选框 */
$(document).on('change', '.all-checkbox-user', function () {
    if ($(this).is(':checked')) {
        $('.checkbox-user').each(function () {
            $(this).prop('checked', true);
        });
    } else {
        $('.checkbox-user').each(function () {
            $(this).prop('checked', false);
        });
    }
    $('.checkbox-user').each(function () {
        $(this).change();
    });
});
/*add by guoshuai start 2018-8-31*/
let selectedDevArr=new Array();
$(document).on('change', '.all-checkbox-user-dev', function () {
    if ($(this).is(':checked')) {
        $('.checkbox-user-dev').each(function () {
            $(this).prop('checked', true);
        });
    } else {
        $('.checkbox-user-dev').each(function () {
            $(this).prop('checked', false);
        });
    }
    $('.checkbox-user-dev').each(function () {
        $(this).change();
    });
});
$(document).on('change', '.checkbox-user-dev', function () {
    let selectId = parseInt($(this).attr('data-dev-id'));
    let currentIndex = $.inArray(selectId, selectedDevArr);
    console.log(currentIndex);
    if ($(this).is(':checked')) {
        if (currentIndex == -1) {
            selectedDevArr.push(selectId);
        }
    } else {
        if (currentIndex > -1) {
            selectedDevArr.splice(currentIndex, 1);
        }
        $('.all-checkbox-user-dev').prop('checked', false);
    }
    let isAllUserChecked = true;
    for (let i = 0; i < $('.checkbox-user-dev').length; i++) {
        if (!$($('.checkbox-user-dev')[i]).is(':checked')) {
            isAllUserChecked = false;
            break;
        }
    }
    if (isAllUserChecked) {
        $('.all-checkbox-user-dev').prop('checked', true);
    }
});
/*add by guoshuai start 2018-8-31*/
/* 用户表格左侧勾选框 */
$(document).on('change', '.checkbox-user', function () {
    let selectId = parseInt($(this).attr('data-id'));
    let currentIndex = $.inArray(selectId, selectedArr);
    if ($(this).is(':checked')) {
        if (currentIndex == -1) {
            selectedArr.push(selectId);
        }
    } else {
        if (currentIndex > -1) {
            selectedArr.splice(currentIndex, 1);
        }
        $('.all-checkbox-user').prop('checked', false);
    }
    let isAllUserChecked = true;
    for (let i = 0; i < $('.checkbox-user').length; i++) {
        if (!$($('.checkbox-user')[i]).is(':checked')) {
            isAllUserChecked = false;
            break;
        }
    }
    if (isAllUserChecked) {
        $('.all-checkbox-user').prop('checked', true);
    }
});

/* 新增*/
$('#add-user-btn').click(function () {
    $('#dev-user-role-selected-area').html('');
    $('.dev-user-role-checkbox-item').prop('checked', false);
    $('#user-input-modal').html(ModalContent.getUserInputHtml(1, null));
    $('#user-modal').modal('show');
});
/*add by guoshuai start 2018-8-24 */
/* 下属设备管理的批量删除*/
$('#dept-selector-modal-del').click(function () {
    let ids = { ids: [] };
    let userid=$('#dept-selector-modal-del').attr('data-id');
    if (selectedDevArr.length > 0) {
        ids.ids = selectedDevArr;
        console.log(111);
        console.log(ids.ids);
        ensureModal2('deleteUserDev', '是否删除？', ids,userid);
        selectedDevArr=[];
        $('.all-checkbox-user-dev').prop('checked', false);
        $('.checkbox-user-dev').prop('checked', false);
    } else {
        $('#alert-modal-content').html('请先勾选');
        $('#alert-modal').modal('show');
    }
});

/*add by guoshuai end 2018-8-24 */
/* 用户批量删除*/
$('#del-user-btn').click(function () {
    batchDel();
});

/*add by guo shuai start 2018-9-17*/

/*add by guo shuai start 2018-9-17*/

/* 用户信息修改*/
$(document).on('click', '.update-user', function () {
    let divIndex = $($($(this).parent()).parent()).index();
    let userInfo = resultCache[divIndex - 1];
    console.log(userInfo);
    currentUpdateUser = userInfo;
    
    /* 获取该用户角色*/
    $('.loading-gif').attr('src', 'img/loading.gif');
    $('.loading-word').html('查询中...')
    $('.submit-loading').css('display', 'block');
    UserOperation.operation(null, `getUserDetailInfo/${userInfo.id}`, 'GET').then((result) => {
        $('.submit-loading').css('display', 'none');
        if (result.retcode == 1 && result.dataMap != null) {
            console.log(result.dataMap);
            // userInfo.roleList = result.dataMap.user.roleList;
            $('#user-input-modal').html(ModalContent.getUserInputHtml(2, result.dataMap.user));
            $('#user-modal').modal('show');
            /*add by guoshuai start 2018-9-18*/
            if(result.dataMap.user.dwPerms){
                if(result.dataMap.user.dwPerms.devUseType =='1'){
                    $('#set-devPermsStartTime').css('display','none');
                    
                    $('#devUseType').html('本人下属设备');
                }
                if(result.dataMap.user.dwPerms.devUseType =='2'){
                    $('#set-devPermsStartTime').css('display','');
                    
                    $('#devUseType').html('本人及所在单位设备');
                }
                if(result.dataMap.user.dwPerms.devUseType =='3'){
                    $('#set-devPermsStartTime').css('display','');
                    
                    $('#devUseType').html('本人及所在单位及下属单位设备');
                }
    
                if(result.dataMap.user.dwPerms.devUseType =='4'){
                    $('#set-devPermsStartTime').css('display','');
                   
                    $('#devUseType').html('系统内全部设备');
                }
                if(result.dataMap.user.dwPerms.devUseType =='5'){
                    $('#set-devPermsStartTime').css('display','');
                    
                    $('#devUseType').html('不限');
                }
                if(result.dataMap.user.dwPerms.phoneUseType =='1'){
                    $('#set-phonePermsStartTime').css('display','none');
                    
                    $('#phoneUseType').html('本人下属手机号');
                }
                if(result.dataMap.user.dwPerms.phoneUseType =='2'){
                    $('#set-phonePermsStartTime').css('display','');
                    
                    $('#phoneUseType').html('本人及所在单位手机号');
                }
                if(result.dataMap.user.dwPerms.phoneUseType =='3'){
                    $('#set-phonePermsStartTime').css('display','');
                    
                    $('#phoneUseType').html('本人及所在单位及下属单位手机号');
                }
    
                if(result.dataMap.user.dwPerms.phoneUseType =='4'){
                    $('#set-phonePermsStartTime').css('display','');
                    
                    $('#phoneUseType').html('系统内全部手机号');
                }
                if(result.dataMap.user.dwPerms.phoneUseType =='5'){
                    $('#set-phonePermsStartTime').css('display','');
                    
                    $('#phoneUseType').html('不限');
                }
                $('#query-time-start-timeEig').val(result.dataMap.user.dwPerms.devPermsStartTime==null? '' : new Date(result.dataMap.user.dwPerms.devPermsStartTime).Format('yyyy-MM-dd hh:mm:ss'));
                $('#query-time-end-timeEig').val(result.dataMap.user.dwPerms.devPermsEndTime==null? '' : new Date(result.dataMap.user.dwPerms.devPermsEndTime).Format('yyyy-MM-dd hh:mm:ss'));
                $('#query-time-start-timeNin').val(result.dataMap.user.dwPerms.phonePermsStartTime==null? '' : new Date(result.dataMap.user.dwPerms.phonePermsStartTime).Format('yyyy-MM-dd hh:mm:ss'));
                $('#query-time-end-timeNin').val(result.dataMap.user.dwPerms.phonePermsEndTime==null? '' : new Date(result.dataMap.user.dwPerms.phonePermsEndTime).Format('yyyy-MM-dd hh:mm:ss'));
            }else{
                $('#set-devPermsStartTime').css('display','none');
                
                $('#devUseType').html('本人下属设备');  
                $('#set-phonePermsStartTime').css('display','none');
                
                $('#phoneUseType').html('本人下属手机号'); 
            }

            
            if(($('#devUseType').html()=='本人下属设备')||$('#devUseType').html()==''){
                $('#set-devPermsStartTime').css('display','none');
            }else{
                $('#set-devPermsStartTime').css('display','');
            }
            
            if(($('#phoneUseType').html()=='本人下属手机号')||$('#phoneUseType').html()==''){
                $('#set-phonePermsStartTime').css('display','none');
            }else{
                $('#set-phonePermsStartTime').css('display','');
            }
            /*add by guoshuai end 2018-9-18*/
        } else {
            $('.loading-gif').attr('src', 'img/submit_fail.png');
            $('.loading-word').html(`<span style="color: rgb(255, 120, 120);">获取用户信息失败</span > `);
            setTimeout(function () {
                $('.submit-loading').fadeOut(500);
            }, 700);
        }
    });

});

/* 停用*/
$(document).on('click', '.stop-user', function () {
    let divIndex = $($($(this).parent()).parent()).index();
    let userInfo = resultCache[divIndex - 1];
    let updateVo = new UserVo();
    updateVo.id = userInfo.id;
    if (userInfo.locked == 0) {
        updateVo.locked = 1;
    } else {
        updateVo.locked = 0;
    }
    doOperation(updateVo, 'updateUser', '修改');
});

/* 用户删除*/
$(document).on('click', '.delete-user', function () {
    let divIndex = $($($(this).parent()).parent()).index();
    let userInfo = resultCache[divIndex - 1];
    let ids = {
        ids: [userInfo.id]
    };
    console.log(ids)
    //doOperation(ids, 'deleteUser', '删除');
    ensureModal('deleteUser', '是否删除？', ids,'');
});
/*设备管理删除*/
$(document).on('click', '.delete-dev-four', function () {
    let divIndex = $(this).attr('data-index');
    let userid=$(this).attr('data-id'); 
    let id = $(this).attr('data-dev-id'); 
    //let userInfo = resultDevCache[divIndex];
    //console.log(userInfo);
    let ids = {
        ids: [id]
    }
    console.log('2222');
    console.log(ids);
    ensureModal2('deleteUserDev', '是否删除？', ids,userid);
});
/* 用户批量删除方法*/
function batchDel() {
    let ids = { ids: [] };
    if (selectedArr.length > 0) {
        ids.ids = selectedArr;
        // doOperation(ids, 'deleteUser', '删除');
        ensureModal('deleteUser', '是否删除？', ids,'');
    } else {
        $('#alert-modal-content').html('请先勾选');
        $('#alert-modal').modal('show');
    }

}

/* 添加*/
// $(document).on('click',function (e) {
//     let drag = $(".modal-content");
//     let dragel = $(".modal-content")[0];
//     let target = e.target;
//     if (dragel !== target && !$.contains(dragel, target)) {
//         drag.hide();
//     }
// });

/* Modal用户信息提交*/
$(document).on('click', '#user-modal-submit-add', function () {
    addUser();
});
$(document).on('click', '#user-modal-submit-update', function () {
    updateUser();
});
$(document).on('click', '#new-user-dev-submit', function () {
    let id=$(this).attr('data-userid');
    if($('#txt-dev').val()!=''){
        let devCode = $('#txt-dev').attr('dev-code');
        let arr=[];
        for(let i=0;i<$('.discernment-dev').length;i++){
            arr.push($('.discernment-dev').eq(i).html());
        }
        if(arr.indexOf(devCode)==-1){
            addUserDev();
            $('#is-dev-true').html('<span class="text-green">该设备可选用</span>');
        }else{
            $('#is-dev-true').html('<span class="text-red">该设备已被选用</span>');
        }
    }
    setTimeout(function(){getDevList(id)},500);
});
let isUserNameExistAdd = false;
let isPwdTrue = false;
let isTelExistAdd = false;
/* 检验用户是否存在*/
$(document).on('blur', '#username-input', function () {
    let usernameVal = $('#username-input').val().replace(/(^\s*)|(\s*$)/g, "");
    if (usernameVal != '') {
        /*delete by guoshuai start 2018-10-13
        if (/[\u0391-\uffe5]/.test(usernameVal)) {
            $('#is-have-user').html(`<span class="text-red">用户名不能使用中文字符</span>`);
        delete by guoshuai end 2018-10-13*/
        if (!(/^[a-zA-Z0-9_-]+$/.test(usernameVal))) {
            $('#is-have-user').html(`<span class="text-red">用户名只能由字母，数字，下划线，减号组成</span>`);
            isUserNameExistAdd = true;
            return;
        }
        UserOperation.operation(null, `checkUsername/${usernameVal}`, 'GET').then((result) => {
            if (result.retcode == 1) {
                isUserNameExistAdd = false;
                $('#is-have-user').html(`<span class="text-green">用户名可用</span>`);
            } else {
                isUserNameExistAdd = true;
                $('#is-have-user').html(`<span class="text-red">用户名已注册</span>`);
            }
        }).catch((e) => {
            $('#is-have-user').html(`<span class="text-red">系统异常，http错误${e.status}</span>`);
        });
    }
});


/* 检验密码是否正确*/
$(document).on('blur', '#password-input', function () {
    let passwordVal = $('#password-input').val();
    let repasswordVal = $('#repassword-input').val();
    if (repasswordVal != '') {
        if (passwordVal == repasswordVal) {
            isPwdTrue = true;
            $('#is-pwd-true').html('');
        } else {
            isPwdTrue = false;
            $('#is-pwd-true').html(`<span class="text-red">两次密码不一致</span>`);
        }
    }
});
$(document).on('blur', '#repassword-input', function () {
    let passwordVal = $('#password-input').val();
    let repasswordVal = $('#repassword-input').val();
    if (passwordVal != '') {
        if (passwordVal == repasswordVal) {
            isPwdTrue = true;
            $('#is-pwd-true').html('');
        } else {
            isPwdTrue = false;
            $('#is-pwd-true').html(`<span class="text-red">两次密码不一致</span>`);
        }
    } else {
        isPwdTrue = false;
        $('#is-pwd-true').html(`<span class="text-red">请输入密码</span>`);
    }
});

/* 检验手机号是否合法*/
$(document).on('blur', '#tel-input', function () {
    let telVal = $('#tel-input').val().replace(/(^\s*)|(\s*$)/g, '');
    if (telVal != '') {
        if (/^1[3456789][0-9]{9}$/.test(telVal)) {
            /* 检测手机号唯一性*/
            let url;
            if (Number($(this).attr('data-type')) == 1) {
                url = `checkTel/${telVal}`;
            } else {
                url = `checkTel/${$(this).attr('data-user-name')}/${telVal}`;
            }
            UserOperation.operation(null, url, 'GET').then((result) => {
                if (result.retcode == 1) {
                    isTelExistAdd = false;
                    $('#is-tel-true').html(`<span class="text-green">手机号可用</span>`);
                } else {
                    isTelExistAdd = true;
                    $('#is-tel-true').html(`<span class="text-red">手机号已注册</span>`);
                }
            }).catch((e) => {
                isTelExistAdd = true;
                $('#is-tel-true').html(`<span class="text-red">系统异常，http错误${e.status}</span>`);
            });
        } else {
            $('#is-tel-true').html(`<span class="text-red">请输入正确的手机号</span>`);
        }
    } else {
        $('#is-tel-true').html('<span class="text-red">请输入手机号</span>');
    }
});

/* 检验姓名是否输入*/
$(document).on('blur', '#realname-input', function () {
    if ($(this).val() != '') {
        $('#is-realname-input').html('');
    }
});

/*add by guoshuai start 2018-9-11*/
$(document).on('click','#dev-button',function(){
    $(document).on('click','#devUseTypeSelect li :eq(0)',function(){
        $('#set-devPermsStartTime').css('display','none');
        $('#set-devPermsEndTime').css('display','none'); 
    }); 
    $(document).on('click','#devUseTypeSelect li :eq(1)',function(){
        $('#set-devPermsStartTime').css('display','');
        $('#set-devPermsEndTime').css('display',''); 
    });
    $(document).on('click','#devUseTypeSelect li :eq(2)',function(){
        $('#set-devPermsStartTime').css('display','');
        $('#set-devPermsEndTime').css('display',''); 
    });
    $(document).on('click','#devUseTypeSelect li :eq(3)',function(){
        $('#set-devPermsStartTime').css('display','');
        $('#set-devPermsEndTime').css('display',''); 
    });
    $(document).on('click','#devUseTypeSelect li :eq(4)',function(){
        $('#set-devPermsStartTime').css('display','');
        $('#set-devPermsEndTime').css('display',''); 
    });
});
$(document).on('click','#phone-button',function(){
    $(document).on('click','#phoneUseTypeSelect li :eq(0)',function(){
        $('#set-phonePermsStartTime').css('display','none');
        $('#set-phonePermsEndTime').css('display','none'); 
    }); 
    $(document).on('click','#phoneUseTypeSelect li :eq(1)',function(){
        $('#set-phonePermsStartTime').css('display','');
        $('#set-phonePermsEndTime').css('display',''); 
    });
    $(document).on('click','#phoneUseTypeSelect li :eq(2)',function(){
        $('#set-phonePermsStartTime').css('display','');
        $('#set-phonePermsEndTime').css('display',''); 
    });
    $(document).on('click','#phoneUseTypeSelect li :eq(3)',function(){
        $('#set-phonePermsStartTime').css('display','');
        $('#set-phonePermsEndTime').css('display',''); 
    });
    $(document).on('click','#phoneUseTypeSelect li :eq(4)',function(){
        $('#set-phonePermsStartTime').css('display','');
        $('#set-phonePermsEndTime').css('display',''); 
    });
});
/*add by guoshuai end 2018-9-11*/
/* 添加用户*/
function addUser() {
    let userInfo = new UserVo();
    userInfo.username = $('#username-input').val().replace(/(^\s*)|(\s*$)/g, "");
    userInfo.password = $('#password-input').val();
    userInfo.realname = $('#realname-input').val().replace(/(^\s*)|(\s*$)/g, "");
    userInfo.tel = $('#tel-input').val().replace(/(^\s*)|(\s*$)/g, "");
    userInfo.deptId = $('#dept-input-container-value').attr('data-dept-id');
    /* 角色*/
    let selectedRoleList = [];
    for (let i = 0; i < $('.selected-role-value-in-input').length; i++) {
        selectedRoleList.push(Number($($('.selected-role-value-in-input')[i]).attr('data-role-id')));
    }
    userInfo.roleIds = selectedRoleList;
    /*add by guoshuai start 2018-9-18*/
    /* 设备使用角色*/
    let selectedDevUseRoleList = [];
    for (let i = 0; i < $('.selected-dev-user-role-value-in-input').length; i++) {
        selectedDevUseRoleList.push(Number($($('.selected-dev-user-role-value-in-input')[i]).attr('data-role-id')));
    }
    /*delet by guoshuai start 2018-9-26*/
    //userInfo.devUseRoleIds = selectedDevUseRoleList;
    /*delet by guoshuai end 2018-9-26*/
    if ($('#sex-input').html() == '男') {
        userInfo.sex = '0';
    } else if ($('#sex-input').html() == '女') {
        userInfo.sex = '1';
    } else {
        userInfo.sex = '';
    }
    /*设备权限有效期设置*/
    let chstime='';
    let chetime='';
    let chpstime='';
    let chpetime='';
    let falgtime =true;
    let falgptime=true;
    if ($('#devUseType').html() == '本人下属设备') {
        $('#set-devPermsStartTime').css('display','none');
        $('#set-devPermsEndTime').css('display','none');
        userInfo.devPermsStartTime = null;
        userInfo.devPermsEndTime = null;
    } else{
        $('#set-devPermsStartTime').css('display','');
        $('#set-devPermsEndTime').css('display','');
        if($('#query-time-start-timeTwo').val()==''){
            userInfo.devPermsStartTime=null;
        }else{
            //chstime = $('#query-time-start-timeTwo').val();
            userInfo.devPermsStartTime = $('#query-time-start-timeTwo').val();
        }
        if($('#query-time-start-timeThree').val()==''){
            userInfo.devPermsEndTime=null;
        }else{
            //chetime = $('#query-time-start-timeThree').val();
            userInfo.devPermsEndTime = $('#query-time-start-timeThree').val();
        }
        // if(chstime > chetime){
        //     $('#ch-sec-beyond-title').css('display','block');
        //     $('#is-sec-chtime-true').html('<span class="text-red">结束时间小于起始时间或者时段未填写完整</span>');
        //     falgptime=false;
        // }else{
        //     userInfo.devPermsStartTime =='' ? null : $('#query-time-start-timeTwo').val();
        //     userInfo.devPermsEndTime =='' ? null : $('#query-time-start-timeThree').val();
        //     falgptime=true;
        // }
    } 
    /*手机号权限有效期设置*/
    if ($('#phoneUseType').html() == '本人下属手机号') {
        $('#set-phonePermsStartTime').css('display','none');
        $('#set-phonePermsEndTime').css('display','none');
        userInfo.phonePermsStartTime = null;
        userInfo.phonePermsEndTime = null;
    } else{
        $('#set-phonePermsStartTime').css('display','');
        $('#set-phonePermsEndTime').css('display','');
        if($('#query-time-start-timeFour').val()==''){
            userInfo.phonePermsStartTime=null;
        }else{
            //chpstime = $('#query-time-start-timeFour').val();
            userInfo.phonePermsStartTime = $('#query-time-start-timeFour').val();
        }
        if($('#query-time-end-timeFive').val()==''){
            userInfo.phonePermsEndTime = null;
        }else{
            //chpetime = $('#query-time-end-timeFive').val();
            userInfo.phonePermsEndTime = $('#query-time-end-timeFive').val();
        }
        // if(chpstime>chpetime){
        //     $('#chp-sec-beyond-title').css('display','block');
        //     $('#is-sec-chptime-true').html('<span class="text-red">结束时间小于起始时间或者时段未填写完整</span>');
        //     falgtime=false;
        // }else{
        //     updateVo.phonePermsEndTime =='' ? null : $('#query-time-end-timeFive').val();
        //     updateVo.phonePermsStartTime =='' ? null : $('#query-time-start-timeFour').val();
        //     falgtime=true;
        // }
    } 
    /* 设备使用权限*/
    if ($('#devUseType').html() == '本人下属设备') {
        userInfo.devUseType = '1';
    } else if ($('#devUseType').html() == '本人及所在单位设备') {
        userInfo.devUseType = '2';
    } else if ($('#devUseType').html() == '本人及所在单位及下属单位设备'){
        userInfo.devUseType = '3';
    }else if ($('#devUseType').html() == '系统内全部设备'){
        userInfo.devUseType = '4';
    }else if ($('#devUseType').html() == '不限'){
        userInfo.devUseType = '5';
    }
    /* 目标手机使用权限*/
    if ($('#phoneUseType').html() == '本人下属手机号') {
        userInfo.phoneUseType = '1';
    } else if ($('#phoneUseType').html() == '本人及所在单位手机号') {
        userInfo.phoneUseType = '2';
    } else if ($('#phoneUseType').html() == '本人及所在单位及下属单位手机号'){
        userInfo.phoneUseType = '3';
    }else if ($('#phoneUseType').html() == '系统内全部手机号'){
        userInfo.phoneUseType = '4';
    }else if ($('#phoneUseType').html() == '不限'){
        userInfo.phoneUseType = '5';
    }
    /*add by guoshuai end 2018-9-18*/
    if (userInfo.username != '' && userInfo.password != '' && userInfo.realname != '' && userInfo.tel != '' && userInfo.deptId != '' && selectedRoleList.length > 0) {
        if (isUserNameExistAdd) {
            /* delete by guoshuai start 2018-10-13
            if (/[\u0391-\uffe5]/.test(userInfo.username)) {
                $('#is-have-user').html(`<span class="text-red">用户名不能使用中文字符</span>`);
            delete by guoshuai end 2018-10-13*/
            if (!(/^[a-zA-Z0-9_-]+$/.test(userInfo.username))) {
                $('#is-have-user').html(`<span class="text-red">用户名只能由字母，数字，下划线，减号组成</span>`);
            } else {
                $('#is-have-user').html(`<span class="text-red">用户名已注册</span>`);
            }
        }
        if (!isPwdTrue) {
            $('#is-pwd-true').html(`<span class="text-red">密码不一致</span>`);
        }
        if (isTelExistAdd) {
            $('#is-tel-true').html(`<span class="text-red">手机号已注册</span>`);
        }
        if (!isUserNameExistAdd && isPwdTrue && !isTelExistAdd) {
            if (/^1[3456789][0-9]{9}$/.test(userInfo.tel)) {
                doOperation(userInfo, 'addUser', '添加');    
            } else {
                $('#is-tel-true').html(`<span class="text-red">请输入正确的手机号</span>`);
            }
        }
    } else {
        if (userInfo.username == '') {
            $('#is-have-user').html(`<span class="text-red">请输入用户名</span>`);
        } else {
            $('#is-have-user').html('');
        }
        if (userInfo.password == '') {
            $('#is-pwd-true').html(`<span class="text-red">请输入密码</span>`);
        } else {
            $('#is-pwd-true').html('');
        }
        if (userInfo.realname == '') {
            $('#is-realname-input').html(`<span class="text-red">请输入姓名</span>`);
        } else {
            $('#is-realname-input').html('');
        }
        if (userInfo.tel == '') {
            $('#is-tel-true').html(`<span class="text-red">请输入手机号</span>`);
        } else {
            $('#is-tel-true').html('');
        }
        if (userInfo.deptId == '') {
            $('#is-dept-true').html(`<span class="text-red">请选择所属机构</span>`);
        } else {
            $('#is-dept-true').html('');
        }
        if (selectedRoleList.length == 0) {
            $('#is-role-true').html(`<span class="text-red">请选择角色</span>`);
        } else {
            $('#is-role-true').html('');
        }
    }
}
/*新增设备管理 add by guoshuai 2018-9-4*/
function addUserDev(){
    let userInfo = new UserVo();
    userInfo.userId=$('#dept-selector-modal-add').attr('data-id');
    userInfo.devId=($('.dept-modal-area-four #txt-dev').attr('dev-id'));
    userInfo.startTime=$('.dept-modal-area-four #query-time-start-timeSix').val();
    userInfo.endTime=$('.dept-modal-area-four #query-time-end-timeSix').val();
    if(userInfo.devId!=null&&$('.dept-modal-area-four #query-time-start-timeSix').val()!=''&&$('.dept-modal-area-four #query-time-end-timeSix').val()!=''){
        doOperation(userInfo, 'addUserDev', '添加');
        //$('.dept-modal-area-four').css('display','none');
        //$('#modal-tips-mask').css('display','none');
        $('#user-dev-add-modal').modal('hide');
    }
    getDevList(userInfo.userId);
}
/*新增设备管理有效日期的修改 add by guoshuai start 2018-9-4*/
function updateUserDev(){
    let updateVo = new UserVo();
    updateVo.id=$('#new-user-dev-change').attr('data-userid');
    //if($('.dept-modal-area-five #query-time-start-time').val()==''){
        //updateVo.startTime=null;
    //}else{
        updateVo.startTime=$('.dept-modal-area-five #query-time-start-time').val();
    //}
    //if($('.dept-modal-area-five #query-time-start-time').val()==''){
        //updateVo.endTime=null;
    //}else{
        updateVo.endTime=$('.dept-modal-area-five #query-time-end-time').val();
    //}
    if($('.dept-modal-area-five #query-time-start-time').val()!=''&&$('.dept-modal-area-five #query-time-end-time').val()!=''){
        doOperation(updateVo, 'updateUserDev', '修改');
        $('#user-dev-update-modal').modal('hide');
    }
}
/*新增设备管理有效日期的修改 add by guoshuai end 2018-9-4*/
/* 修改*/
function updateUser() {
    let updateVo = new UserVo();
    updateVo.id = currentUpdateUser.id;
    updateVo.username = currentUpdateUser.username;
    updateVo.deptId = $('#dept-input-container-value').attr('data-dept-id');
    updateVo.realname = $('#realname-input').val().replace(/(^\s*)|(\s*$)/g, ''); // 
    updateVo.tel = $('#tel-input').val().replace(/(^\s*)|(\s*$)/g, ''); // 
    /* 角色*/
    let selectedRoleList = [];
    for (let i = 0; i < $('.selected-role-value-in-input').length; i++) {
        selectedRoleList.push(Number($($('.selected-role-value-in-input')[i]).attr('data-role-id')));
    }
    if (selectedRoleList.length > 0) {
        updateVo.roleIds = selectedRoleList;
    }
    /*add by guoshuai start 2018-9-1*/
    /*设备权限有效期设置*/
    if ($('#devUseType').html() == '本人下属设备') {
        $('#set-devPermsStartTime').css('display','none');
        $('#set-devPermsEndTime').css('display','none');
        updateVo.devPermsStartTime = null;
        updateVo.devPermsEndTime = null;
    } else{
        $('#set-devPermsStartTime').css('display','');
        $('#set-devPermsEndTime').css('display','');
        if($('#query-time-start-timeEig').val()==''){
            updateVo.devPermsStartTime=null;
        }else{
            updateVo.devPermsStartTime = $('#query-time-start-timeEig').val();
        }
        if($('#query-time-end-timeEig').val()==''){
            updateVo.devPermsEndTime =null;
        }else{
            updateVo.devPermsEndTime = $('#query-time-end-timeEig').val();
        }
    } 
    /*手机号权限有效期设置*/
    
    if ($('#phoneUseType').html() == '本人下属手机号') {
        $('#set-phonePermsStartTime').css('display','none');
        $('#set-phonePermsEndTime').css('display','none');
        updateVo.phonePermsStartTime = null;
        updateVo.phonePermsEndTime = null;
    } else{
        $('#set-phonePermsStartTime').css('display','');
        $('#set-phonePermsEndTime').css('display','');
        if($('#query-time-start-timeNin').val()==''){
            updateVo.phonePermsStartTime=null;
        }else{
            updateVo.phonePermsStartTime = $('#query-time-start-timeNin').val();
        }
        if($('#query-time-end-timeNin').val()==''){
            updateVo.phonePermsEndTime=null;
        }else{
            updateVo.phonePermsEndTime = $('#query-time-end-timeNin').val();
        }
    } 
    /* 设备使用角色*/
    let selectedDevUseRoleList = [];
    for (let i = 0; i < $('.selected-dev-user-role-value-in-input').length; i++) {
        selectedDevUseRoleList.push(Number($($('.selected-dev-user-role-value-in-input')[i]).attr('data-role-id')));
    }
    /*delet by guoshuai start 2018-9-26*/
    /*if (selectedDevUseRoleList.length > 0) {
        updateVo.devUseRoleIds = selectedDevUseRoleList;
    }*/
    /*delet by guoshuai end 2018-9-26*/
    if ($('#sex-input').html() == '男') {
        updateVo.sex = '0';
    } else if ($('#sex-input').html() == '女') {
        updateVo.sex = '1';
    }
    /* 设备使用权限*/
    if ($('#devUseType').html() == '本人下属设备') {
        updateVo.devUseType = '1';
    } else if ($('#devUseType').html() == '本人及所在单位设备') {
        updateVo.devUseType = '2';
    } else if ($('#devUseType').html() == '本人及所在单位及下属单位设备'){
        updateVo.devUseType = '3';
    }else if ($('#devUseType').html() == '系统内全部设备'){
        updateVo.devUseType = '4';
    }else if ($('#devUseType').html() == '不限'){
        updateVo.devUseType = '5';
    }
    /* 目标手机使用权限*/
    if ($('#phoneUseType').html() == '本人下属手机号') {
        updateVo.phoneUseType = '1';
    } else if ($('#phoneUseType').html() == '本人及所在单位手机号') {
        updateVo.phoneUseType = '2';
    } else if ($('#phoneUseType').html() == '本人及所在单位及下属单位手机号'){
        updateVo.phoneUseType = '3';
    }else if ($('#phoneUseType').html() == '系统内全部手机号'){
        updateVo.phoneUseType = '4';
    }else if ($('#phoneUseType').html() == '不限'){
        updateVo.phoneUseType = '5';
    }
    /*add by guoshuai end 2018-9-1*/
    if (updateVo.tel != '' && updateVo.realname != '') {
        let isTelTrue = false;
        if ($('#tel-input').val().replace(/(^\s*)|(\s*$)/g, "") != '') {
            if (/^1[3456789][0-9]{9}$/.test($('#tel-input').val())) {
                isTelTrue = true;
            } else {
                isTelTrue = false;
            }
        } else {
            isTelTrue = true;
        }
        if (isTelTrue) {
            if ($('#password-input').val() != '' || $('#repassword-input').val() != '') {
                if (isPwdTrue) {
                    updateVo.password = $('#password-input').val();
                    updateVo.rePassword = $('#repassword-input').val();
                    doOperation(updateVo, 'updateUser', '修改');
                } else {
                    $('#is-pwd-true').html(`<span class="text-red">密码不一致</span>`);
                }
            } else {
                doOperation(updateVo, 'updateUser', '修改');
                
            }
        } else {
            $('#is-tel-true').html(`<span class="text-red">请输入正确的手机号</span>`);
        }
    } else {
        if (updateVo.tel == '') {
            $('#is-tel-true').html(`<span class="text-red">请输入手机号</span>`);
        }
        if (updateVo.realname == '') {
            $('#is-realname-input').html(`<span class="text-red">请输入姓名</span>`);
        }
    }

}

/* 提交操作*/
function doOperation(userInfo, url, word) {
    $('#user-modal').modal('hide');
    $('.loading-gif').attr('src', 'img/loading.gif');
    $('.loading-word').html('正在提交...')
    $('.submit-loading').css('display', 'block');
    console.log(userInfo);
    UserOperation.operation(JSON.stringify(userInfo), url, 'POST').then((result) => {
        console.log('Operation Result:↓');
        console.log(result);
        if (result.retcode == 1) {
            $('.loading-gif').attr('src', 'img/submit_success.png');
            $('.loading-word').html(`<span style="color: rgb(10, 180, 0)">${word}成功</span>`);
            switch (url) {
                case 'updateUser':
                    query(userQuery);
                    break;
                case 'addUser':
                    initQuery();
                    isUserNameExistAdd = false;
                    isPwdTrue = false;
                    isTelExistAdd = false;
                    $('#is-have-user').html('');
                    $('#is-pwd-true').html('');
                    $('#is-tel-true').html('');
                    break;
                case 'deleteUser':
                    initQuery();
                    break;
                case 'addUserDev':
                    
                    break;
                case 'updateUserDev':    
                    break;
                case 'deleteUserDev':    
                    break;
                default:
                    break;
            }
        } else {
            $('.loading-gif').attr('src', 'img/submit_fail.png');
            $('.loading-word').html(`<span style="color: rgb(255, 120, 120);">${word}失败</span>`);
        }
        setTimeout(function () {
            $('.submit-loading').fadeOut(500);
        }, 700);
    }).catch((e) => {
        console.log(e);
        $('.loading-gif').attr('src', 'img/submit_fail.png');
        $('.loading-word').html(`<span style="color: rgb(255, 120, 120);">${word}失败</span > `);
        setTimeout(function () {
            $('.submit-loading').fadeOut(500);
        }, 700);
    });
}

/* 危险操作确认框*/
function ensureModal(type, content, data ,userId) {
    $('#modal-alert-content').html(content);
    $('#ensure-modal').modal('show');
    $('#ensure-modal').css('z-index',1051);
    $('#ensure-modal-submit').unbind("click");
    $('#ensure-modal-submit').click(function () {
        $('#ensure-modal').modal('hide');
        switch (type) {
            case 'deleteUser':
                doOperation(data, 'deleteUser', '删除');
                break;
            case 'deleteUserDwPhone':
                doPhoneOperation(data, 'deleteUserDwPhone', '删除',userId);
                break;
            break;
            default:
                break;
        }
        $('#ensure-modal-submit').unbind("click");
    });
}
/*查询设备列表的方法 add by guoshuai start 2018-9-18*/
function getDevList(userid){
    UserOperation.operation(null, `getDevListByUserId/${userid}`, 'GET').then((result) => { // 获取用户下属设备列表
        if (result.retcode == 1) {
        $('.loading-gif').attr('src', 'img/loading.gif');
        $('.loading-word').html('加载中...');
            if (result.dataList != null && result.dataList.length > 0) {
                DevListPanel.drawUser(result.dataList); // 显示列表的方法
            }else{
                $('#dev-table-tbody').html('');
            }
            //$('#user-dev-submit').attr('data-userId', $(this).attr('data-userId'));
            $('.submit-loading').css('display', 'none');
            $('#user-dev-manage-modal').modal('show');
        } else {
            $('.loading-gif').attr('src', 'img/submit_fail.png');
            $('.loading-word').html(`<span style="color: rgb(255, 120, 120);">加载失败</span > `);
            setTimeout(function () {
                $('.submit-loading').fadeOut(500);
            }, 700);
        }
    }); 
}
/*查询设备列表的方法 add by guoshuai end 2018-9-18*/
/*设备列表删除的方法 add by guoshuai start 2018-9-18*/
function ensureModal2(type, content, data,userid) {
    $('#modal-alert-content').html(content);
    $('#ensure-modal').modal('show');
    $('#ensure-modal-submit').unbind("click");
    $('#ensure-modal-submit').click(function () {
        $('#ensure-modal').modal('hide');
        switch (type) {
            case 'deleteUserDev':
                doOperation(data, 'deleteUserDev', '删除');
                break;
            default:
                break;
        }
        $('.loading-gif').attr('src', 'img/loading.gif');
        $('.loading-word').html('加载中...');
        setTimeout(function(){getDevList(userid);},500);
        
        $('#ensure-modal-submit').unbind("click");
    });
}
/*设备列表删除的方法 add by guoshuai end 2018-9-18*/
/* 性别选择*/
$(document).on('click', '.gender-selector', function () {
    $('#sex-input').html($(this).html());
});
/*权限选择 add by guoshuai start 2018-9-18*/
/*手机号权限选择*/
$(document).on('click', '.phone-selector', function () {
    $('#phoneUseType').html($(this).html());
});
/*设备权限选择*/
$(document).on('click', '.dev-selector', function () {
    $('#devUseType').html($(this).html());
});
/*权限选择 add by guoshuai end 2018-9-18*/
/* 角色选择*/
$(document).on('click', '.role-selector', function () {
    $('#role-input').html($(this).html());
    $('#role-input').attr('data-role-id', $(this).attr('data-role-id'));
});

/* 停启用选择*/
$('.locked-selector').click(function () {
    $('#locked-input').html($(this).html());
    $('#locked-remove').css('display', '');
});

/*下属设备停启用选择*/
// $('.locked-selector').click(function () {
//     $('#locked-input').html($(this).html());
//     $('#locked-remove').css('display', '');
// });

/* 清除停启用选择*/
$('#locked-remove').click(function () {
    $('#locked-input').html('&nbsp;');
    $('#locked-remove').css('display', 'none');
});

/* 选择每页显示数量*/
$('.total-count-selector').click(function () {
    pageItemNum = this.childNodes[0].innerHTML;
    /* 设置cookie*/
    MyCookie.setCookie('userManagePageNum', pageItemNum, 365);
    $('.show-item-num').html(pageItemNum + '条');
    userQuery.pageNum = 1;
    userQuery.pageSize = pageItemNum;
    query(userQuery);
});
/* 用户查询*/
function query(data) {
    console.log(data);
    UserOperation.operation(JSON.stringify(data), 'getUserList', 'POST').then((result) => {
        console.log(result);
        if (result.retcode == 1) {
            //清空已选择的id集
            selectedArr = new Array();
            if (result.pageInfo.list.length > 0) {
                $('.no-data-tablesarch').remove();
                resultCache = result.pageInfo.list;
                DrawTable.userTable(result.pageInfo.list);
                PageInfo.drawPageController(result);
                $('#total-page-num').html(`，共${result.pageInfo.pages}页`);
            } else {
                let divHeight = $(window).height() - 500;
                $('.table-view-data-area').append(`
                    <div class= "no-data-tablesarch">
                        <img class="no-data-icon" src="img/no_data_icon_search.png">
                        <span class="no-data-word">无搜索结果</span>
                    </div>
                `)
                $('#table-tbody').html('');
                $('.M-box3').html('');
            }
            $('#total-count').html(result.pageInfo.total);
        } else {
            let divHeight = $(window).height() - 500;
            $('.table-view-data-area').append(`
                <div class= "no-data-tablesarch">
                    <img class="no-data-icon" src="img/no_data_icon_search.png">
                    <span class="no-data-word">无搜索结果</span>
                </div>
            `)
            $('#table-tbody').html('');
            $('.M-box3').html('');
        }
    });
}

/*add by guo shuai start 2018-9-17*/

/*add by guo shuai end 2018-9-17*/
/* 查看用户信息按钮*/
$(document).on('click', '.view-user', function () {
    let userInfo = resultCache[$(this).attr('data-index')];
    /* 获取该用户角色*/
    $('.loading-gif').attr('src', 'img/loading.gif');
    $('.loading-word').html('查询中...')
    $('.submit-loading').css('display', 'block');
    UserOperation.operation(null, `getUserDetailInfo/${userInfo.id}`, 'GET').then((result) => {
        $('.submit-loading').css('display', 'none');
        if (result.retcode == 1 && result.dataMap != null) {
            // userInfo.roleList = result.dataMap.user.roleList;
            // userInfo.devUseRoleList = result.dataMap.user.devUseRoleList;
            $('#user-info-content').html(ModalContent.getUserViewHtml(result.dataMap.user));
            $('#userinfo-view-modal').modal('show');
            if(($('.user-info-value-1').attr('data-id')=='本人下属设备')||($('.user-info-value-1').html()=='')){
                $('.dev-use-limit').css('display','none');
            }else{
                $('.dev-use-limit').show();
            }
            if(($('.user-info-value-2').attr('data-id')=='本人下属手机号')||($('.user-info-value-2').html()=='')){
                $('.phone-use-limit').css('display','none');
            }else{
                $('.phone-use-limit').show();
            }

        } else {
            $('.loading-gif').attr('src', 'img/submit_fail.png');
            $('.loading-word').html(`<span style="color: rgb(255, 120, 120);">获取用户信息失败</span > `);
            setTimeout(function () {
                $('.submit-loading').fadeOut(500);
            }, 700);
        }
    });
});

/* 角色选择*/
$(document).on('click', '.role-selector-item', function () {
    $('#role-selector-input').html($(this).html());
    $('#role-selector-input').attr('data-role-id', $(this).attr('data-role-id'));
    $('#role-selector-remove').css('display', 'block');
});
$('#role-selector-remove').click(function () {
    $('#role-selector-input').html('&nbsp;');
    $('#role-selector-input').attr('data-role-id', '');
    $(this).css('display', 'none');
});

/* 所属机构选择（删除项）*/
$('#dept-query-selector-remove').click(function () {
    $('#dept-query-selector-input').html('&nbsp;');
    $('#dept-query-selector-input').attr('data-dept-id', '');
    $('#dept-query-selector-remove').css('display', 'none');
});

/* 设备使用角色选择*/
$(document).on('click', '.dev-use-role-selector-item', function () {
    $('#dev-use-role-selector-input').html($(this).html());
    $('#dev-use-role-selector-input').attr('data-role-id', $(this).attr('data-role-id'));
    $('#dev-use-role-selector-remove').css('display', 'block');
});
$('#dev-use-role-selector-remove').click(function(){
    $('#dev-use-role-selector-input').html('&nbsp;');
    $('#dev-use-role-selector-input').attr('data-role-id', '');
    $(this).css('display', 'none');
});

$("body").click(function () {  
    $("#div_items").css('display', 'none');
    $('#phone_items').css('display','none');
});   
//文本框输入  
$("#txt-dev").keyup(function () {  
    $("#div_items").css('display', 'block');//只要输入就显示列表框  

    if ($("#txt-dev").val().length <= 0) {  
        $(".div_item").css('display', 'block');//如果什么都没填，跳出，保持全部显示状态 
        $(".div_item").siblings().css('display', 'block');
        $(".div_item").parent().parent().css('display', 'block'); 
        return;  
    }  

    $(".div_item").siblings().css('display', 'none');//如果填了，先将所有的选项隐藏  
    $(".div_item").css('display', 'none');
    $(".div_item").parent().parent().css('display', 'none');
    for (var i = 0; i < $(".div_item").length; i++) {  
        //模糊匹配，将所有匹配项显示[匹配首字母]  
        if ($(".div_item").eq(i).siblings().text().substr(0, $("#txt-dev").val().length) == $("#txt-dev").val()) {
            $(".div_item").eq(i).css('display', 'block');
            $(".div_item").eq(i).siblings().css('display', 'block');
            $(".div_item").eq(i).parent().parent().css('display', 'block'); 
        } 
        //匹配全部文字
        if($(".div_item").eq(i).siblings().text().indexOf( $("#txt-dev").val() )!=-1 ){
            $(".div_item").eq(i).css('display', 'block');
            $(".div_item").eq(i).siblings().css('display', 'block');
            $(".div_item").eq(i).parent().parent().css('display', 'block');   
        }  
    }  
});  

//项点击  
$(document).on('click',".div_item",function () { 
    let dev_code= $(this).attr('data-devcode');
    let dev_id=$(this).attr('data-devid');
    $("#txt-dev").val($(this).siblings().text());
    $('#txt-dev').attr('dev-id',dev_id);
    $('#txt-dev').attr('dev-code',dev_code);
}); 
/* add by guoshuai end 2018-8-31*/
/* add by guoshuai start 2018-9-1*/
//时间选择插件点击事件的优化
$(document).on('click','#query-time-start-timeTwo',function(){
    WdatePicker({
        el:this,
        readOnly:true,
        dateFmt:'yyyy-MM-dd HH:mm:ss',
        maxDate:'#F{$dp.$D(\'query-time-start-timeThree\')}'
    });
});
$(document).on('click','#query-time-start-timeThree',function(){
    WdatePicker({
        el:this,
        readOnly:true,
        dateFmt:'yyyy-MM-dd HH:mm:ss',
        minDate:'#F{$dp.$D(\'query-time-start-timeTwo\')}'
    });
});

$(document).on('click','#query-time-start-timeFour',function(){
    WdatePicker({
        el:this,
        readOnly:true,
        dateFmt:'yyyy-MM-dd HH:mm:ss',
        maxDate:'#F{$dp.$D(\'query-time-end-timeFive\')}'
    });
});
$(document).on('click','#query-time-end-timeFive',function(){
    WdatePicker({
        el:this,
        readOnly:true,
        dateFmt:'yyyy-MM-dd HH:mm:ss',
        minDate:'#F{$dp.$D(\'query-time-start-timeFour\')}'
    });
});

$(document).on('click','#query-time-start-timeEig',function(){
    WdatePicker({
        el:this,
        readOnly:true,
        dateFmt:'yyyy-MM-dd HH:mm:ss',
        maxDate:'#F{$dp.$D(\'query-time-end-timeEig\')}'
    });
});
$(document).on('click','#query-time-end-timeEig',function(){
    WdatePicker({
        el:this,
        readOnly:true,
        dateFmt:'yyyy-MM-dd HH:mm:ss',
        minDate:'#F{$dp.$D(\'query-time-start-timeEig\')}'
    });
});

$(document).on('click','#query-time-start-timeNin',function(){
    WdatePicker({
        el:this,
        readOnly:true,
        dateFmt:'yyyy-MM-dd HH:mm:ss',
        maxDate:'#F{$dp.$D(\'query-time-end-timeNin\')}'
    });
});
$(document).on('click','#query-time-end-timeNin',function(){
    WdatePicker({
        el:this,
        readOnly:true,
        dateFmt:'yyyy-MM-dd HH:mm:ss',
        minDate:'#F{$dp.$D(\'query-time-start-timeNin\')}'
    });
});
/* add by guoshuai end 2018-9-1*/

// 获取用户下属手机号列表 
function getUserPhoneList(UserId){
    UserOperation.operation(null, `getDwPhoneListByUserId/`+UserId, 'GET').then((result) => { 
        if (result.retcode == 1) {
            selectedPhoneArr = new Array();
            resultPhoneCache=result.dataList;
            if (result.dataList != null && result.dataList.length > 0) {
                DevListPanel.drawUserPhone(result.dataList); // 显示列表的方法
            }else{
                $('#phone-table-tbody').html('');
            };
        } else {
            $('.loading-gif').attr('src', 'img/submit_fail.png');
            $('.loading-word').html(`<span style="color: rgb(255, 120, 120);">加载失败</span > `);
            setTimeout(function () {
                $('.submit-loading').fadeOut(500);
            }, 700);
        }
    }).catch((e) => {
                
    });
} 
//获取机构下的手机号
function getDeptPhoneList(DeptId){
    UserOperation.operation(null, `getDwPhoneListByDeptId/`+DeptId, 'GET').then((result) => {
        if(result.retcode == 1){
            if (result.retcode == 1) {
                resultPhoneCacheList=result.dataList;
                if (result.dataList != null && result.dataList.length > 0) {
                    DevListPanel.drawPhoneList(result.dataList); // 显示列表的方法
                }else{
                    $('#phone-table-tbody').html('');
                };
            } else {
                $('.loading-gif').attr('src', 'img/submit_fail.png');
                $('.loading-word').html(`<span style="color: rgb(255, 120, 120);">加载失败</span > `);
                setTimeout(function () {
                    $('.submit-loading').fadeOut(500);
                }, 700);
            }
        }
    }).catch((e) => {
                
    });
}    

//打开下属手机号管理模态框
$(document).on('click','.user-phone-manage',function(){
    let deptId = $(this).attr('data-dept');
    let index = $(this).attr('data-index');
    $('#phone-selector-modal-add').attr('deptId',deptId);
    let UserId = parseInt($(this).attr('data-userId'));
    $('#phone-selector-modal-add').attr('userId',UserId);
    $('#phone-selector-modal-add').attr('data-index',index);
    $('#phone-selector-modal-del').attr('data-index',index);
    $('#phone-selector-modal-del').attr('userId',UserId);
    getUserPhoneList(UserId);
    $('#user-phone-manage-modal').modal('show');
})

/* 手机号提交操作*/
function doPhoneOperation(phoneInfo, url, word,userId) {
    $('#dev-modal').modal('hide');
    $('.loading-gif').attr('src', 'img/loading.gif');
    $('.loading-word').html('正在提交...')
    $('.submit-loading').css('display', 'block');
    UserOperation.operation(JSON.stringify(phoneInfo), url, 'POST').then((result) => {
        if (result.retcode == 1) {
            $('.loading-gif').attr('src', 'img/submit_success.png');
            $('.loading-word').html(`<span style="color: rgb(10, 180, 0)">${word}成功</span>`);
            switch (url) {
                case 'deleteUserDwPhone':
                    getUserPhoneList(userId);
                    break;
                case 'addUserDwPhone':
                    getUserPhoneList(phoneInfo.userId);
                    break;
                case 'updateUserDwPhone':
                    getUserPhoneList(phoneInfo.userId);
                    break;
                default:
                    break;
            }
        } else {
            $('.loading-gif').attr('src', 'img/submit_fail.png');
            $('.loading-word').html(`<span style="color: rgb(255, 120, 120);">${word}失败</span>`);
        }
        setTimeout(function () {
            $('.submit-loading').fadeOut(800);
        }, 1000);
    }).catch((e) => {
        $('.loading-gif').attr('src', 'img/submit_fail.png');
        $('.loading-word').html(`<span style="color: rgb(255, 120, 120);">${word}失败</span > `);
        setTimeout(function () {
            $('.submit-loading').fadeOut(800);
        }, 1000);
    });
};

/* 手机号表格左侧勾选框 */
$(document).on('change', '.checkbox-phone', function () {
    let selectId = parseInt($(this).attr('data-phone-id'));
    let currentIndex = $.inArray(selectId, selectedPhoneArr);
    if ($(this).is(':checked')) {
        if (currentIndex == -1) {
            selectedPhoneArr.push(selectId);
        }
    } else {
        if (currentIndex > -1) {
            selectedPhoneArr.splice(currentIndex, 1);
        }
        $('.all-checkbox-pho').prop('checked', false);
    }
    let isAllUserChecked = true;
    for (let i = 0; i < $('.checkbox-phone').length; i++) {
        if (!$($('.checkbox-phone')[i]).is(':checked')) {
            isAllUserChecked = false;
            break;
        }
    }
    if (isAllUserChecked) {
        $('.all-checkbox-phone').prop('checked', true);
    }
});
$(document).on('change', '.all-checkbox-phone', function () {
    if ($(this).is(':checked')) {
        $('.checkbox-phone').each(function () {
            $(this).prop('checked', true);
        });
    } else {
        $('.checkbox-phone').each(function () {
            $(this).prop('checked', false);
        });
    }
    $('.checkbox-phone').each(function () {
        $(this).change();
    });
});

/* 测试手机删除*/
$(document).on('click', '.delete-phone', function () {
    let divIndex = $($($(this).parent()).parent()).index();
    let phoneInfo = resultPhoneCache[divIndex - 1];
    let userId = phoneInfo.userId
    let ids = {
        ids: [phoneInfo.id],
        //userId:userId
    };
    console.log(ids)
    ensureModal('deleteUserDwPhone', '是否删除？', ids, userId);
});

/* 测试手机号批量删除方法*/
function batchDelPhone(userId) {
    let ids = { 
        ids: [] ,
        //userId:userId
    };
    if (selectedPhoneArr.length > 0) {
        ids.ids = selectedPhoneArr;
        ensureModal('deleteUserDwPhone', '是否删除？', ids,userId);
    } else {
        $('#alert-modal-content').html('请先勾选');
        $('#alert-modal').modal('show');
        $('#alert-modal').css('z-index',1051);
    }

}
//批量删除下属测试手机号
$(document).on('click','#phone-selector-modal-del',function(){
    let index = $(this).attr('data-index');
    let phoneInfo = resultPhoneCache[index];
    if(phoneInfo==undefined){
        $('#alert-modal-content').html('请先添加下属手机号');
        $('#alert-modal').modal('show');
        $('#alert-modal').css('z-index',1051);
    }else{
        $('#phone-selector-modal-del').attr('data-id',phoneInfo.id);
    }
    batchDelPhone($(this).attr('data-id'));
})

//文本框输入  
$(document).on('click','#txt-phone',function(){
    $("#phone_items").css('display', 'block'); 
});
$("#txt-phone").keyup(function () {  
    $("#phone_items").css('display', 'block');//只要输入就显示列表框  

    if ($("#txt-phone").val().length <= 0) {  
        $(".phone-item").css('display', 'block');//如果什么都没填，跳出，保持全部显示状态 
        $(".phone-item").siblings().css('display', 'block');
        $(".phone-item").parent().parent().css('display', 'block'); 
        return;  
    }  

    $(".phone-item").siblings().css('display', 'none');//如果填了，先将所有的选项隐藏  
    $(".phone-item").css('display', 'none');
    $(".phone-item").parent().parent().css('display', 'none');
    for (var i = 0; i < $(".phone-item").length; i++) {  
        //模糊匹配，将所有匹配项显示[匹配首字母]  
        if ($(".phone-item").eq(i).siblings().text().substr(0, $("#txt-phone").val().length) == $("#txt-phone").val()) {
            $(".phone-item").eq(i).css('display', 'block');
            $(".phone-item").eq(i).siblings().css('display', 'block');
            $(".phone-item").eq(i).parent().parent().css('display', 'block'); 
        } 
        //匹配全部文字
        if($(".phone-item").eq(i).siblings().text().indexOf( $("#txt-phone").val() )!=-1 ){
            $(".phone-item").eq(i).css('display', 'block');
            $(".phone-item").eq(i).siblings().css('display', 'block');
            $(".phone-item").eq(i).parent().parent().css('display', 'block');   
        }  
    }  
}); 
//项点击  
$(document).on('click',".phone-item",function () { 
    let phoneNum= $(this).attr('data-phonenum');
    let id=$(this).attr('data-phoneid');
    $("#txt-phone").val($(this).siblings().text());
    $('#txt-phone').attr('phoneid',id);
    $('#txt-phone').attr('phoneNum',phoneNum);
});

//打开测试手机号新增模态框
$(document).on('click','#phone-selector-modal-add',function(){
    let deptId = parseInt($(this).attr('deptId'))
    getDeptPhoneList(deptId);
    $('#user-phone-add-modal').modal('show');
    $('#user-phone-add-modal').css('z-index','1051');
    $('#user-phone-add-submit').attr('userId',$(this).attr('userId'));
    $('#user-phone-add-submit').attr('data-index',$(this).attr('data-index'));
    $('#txt-phone').val('');
    $('#query-phone-start-time').val('');
    $('#query-phone-end-time').val('');
    $('#is-phone-add-true').html('');
    $('#is-phone-startTime-true').html('');
    $('#is-phone-endTime-true').html('');
})
//用户下属测试手机号新增提交
$(document).on('click','#user-phone-add-submit',function(){
    let phoneInfo = new UserVo();
    let flag;
    let divIndex = $(this).attr('data-index');
    let userInfo = resultPhoneCache[divIndex];
    if(userInfo !=undefined){
        if(userInfo.phoneNum.indexOf($('#txt-phone').val())!=-1){
            flag = false;
        }else{
            flag = true;
        }
    }else{
        flag = true;
    }
    phoneInfo.dwPhoneId = parseInt($('#txt-phone').attr('phoneid'));
    phoneInfo.userId = parseInt($(this).attr('userId'));
    phoneInfo.startTime = $('#query-phone-start-time').val();
    phoneInfo.endTime = $('#query-phone-end-time').val();
    //检查手机号是否为空,时间是否填写完整
    if($('#txt-phone').val()!=''&& phoneInfo.startTime!='' && phoneInfo.endTime!=''&& flag ==true){
        doPhoneOperation(phoneInfo,'addUserDwPhone','添加',phoneInfo.userId);
        $('#user-phone-add-modal').modal('hide');
    }else if($('#txt-phone').val()==''){
        $('#is-phone-add-true').html(`<span class="text-red">请填写手机号</span>`);
    }else if(phoneInfo.startTime ==''){
        $('#is-phone-startTime-true').html(`<span class="text-red">请设置开始时间</span>`);
    }else if(phoneInfo.endTime ==''){
        $('#is-phone-endTime-true').html(`<span class="text-red">请设置结束时间</span>`);
    }else if(flag ==false){
        $('#is-phone-add-true').html(`<span class="text-red">该手机号已被添加</span>`);
    }   
})

//打开下属手机号修改模态框
$(document).on('click','.update-phone',function(){
    $('#user-phone-update-modal').modal('show');
    $('#user-phone-update-modal').css('z-index',1051);
    let phoneInfo =resultPhoneCache[$(this).attr('data-index')];
    let phoneNum = parseInt(phoneInfo.phoneNum);
    let startTime = new Date(phoneInfo.startTime).Format("yyyy-MM-dd hh:mm:ss");
    let endTime = new Date(phoneInfo.endTime).Format("yyyy-MM-dd hh:mm:ss");
    $('#change-phoneNum').val(phoneNum);
    $('#update-phone-start-time').val(startTime);
    $('#update-phone-end-time').val(endTime);
    $('#is-phoneUpdate-startTime-true').html('');
    $('#is-phoneUpdate-endTime-true').html('');
    $('#user-phone-update-confirm').attr('data-id',$(this).attr('data-phoneid'));
    $('#user-phone-update-confirm').attr('userId',phoneInfo.userId);
    //$('#user-phone-update-confirm').attr('data-index',$(this).attr('data-index'));
})
//修改下手手机提交
$(document).on('click','#user-phone-update-confirm',function(){
    let phoneInfo = new UserVo();
    //let userInfo = resultPhoneCache[$(this).attr('data-index')];
    phoneInfo.id = parseInt($(this).attr('data-id'));
    phoneInfo.userId = parseInt($(this).attr('userId'));
    //phoneInfo.userId = userInfo.userId;
    phoneInfo.startTime = $('#update-phone-start-time').val();
    phoneInfo.endTime = $('#update-phone-end-time').val();
    //检查时间是否填写完整
    if(phoneInfo.startTime!='' && phoneInfo.endTime!=''){
        doPhoneOperation(phoneInfo,'updateUserDwPhone','修改',phoneInfo.userId);
        $('#user-phone-update-modal').modal('hide');
    }else if(phoneInfo.startTime ==''){
        $('#is-phoneUpdate-startTime-true').html(`<span class="text-red">请设置开始时间</span>`);
    }else if(phoneInfo.endTime ==''){
        $('#update-phone-end-time').html(`<span class="text-red">请设置结束时间</span>`);
    }
})
//add by guoshuai start 2019/4/22
//开启或关闭短信验证
$(document).on('click','.user_login_message_verification',function(){
    status = $(this).attr('data-status');
    if(status == 0){
        $(this).css('background','#999');
        $(this).children('.user_login_message_verification_ball').css('float','left');
        $(this).attr('data-status',1);
    }else{
        $(this).css('background','#3699FF');
        $(this).children('.user_login_message_verification_ball').css('float','right');
        $(this).attr('data-status',0);
    }
})

//add by guoshuai end 2019/4/22