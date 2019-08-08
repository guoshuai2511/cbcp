import { TopHeader } from '../../common/topHeader/TopHeader.js';

import { deptOperation } from './ajax/deptOperation.js';

import { DeptTree } from './tree/DeptTree.js';
import { DeptInfo } from './table/DeptInfo.js';
import { DeptUser } from './table/DeptUser.js';
import { PageInfo } from './table/PageInfo.js';

/* js版本号，判断服务器端是否已刷新*/
console.log('js.version=2.1.8999');
/* 生成顶部菜单 */
TopHeader.initHeader();

/* 禁止输入空格*/
$(document).on('keyup blur', '.input-space-forbidden', function () {
    this.value = this.value.replace(/\s+/g, '');
});

function queryDefault() {
    deptOperation.operation(null, 'getDeptTreeList', 'GET').then((result) => {
        console.log(result);
        if (result.retcode == 1 && result.dataList != null) {
            resultCache = result.dataList;
            DeptTree.drawTree(result.dataList);
        }
    });
}
queryDefault();
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
/*delete by guoshuai start*/
/* $('#delete-dept-btn').click(function () {
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
}); */
/*delete by guoshuai end*/
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
/* 新增组织机构*/
$('#add-dept-btn').click(function () {
    isDeptNameTrueType = 0;
    currentSelectedDept = null;
    $('#dept-content-title').html('新增组织');
    DeptInfo.draw(resultCache, {}, 'add');
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

/* 查看机构下属成员*/
$(document).on('click', '.view-user-btn', function () {
    $('#dept-user-title').html($(this).attr('data-dept-name') + '&nbsp;&nbsp;下属成员')
    let userQuery = new UserBean();
    userQuery.deptId = Number($(this).attr('data-dept-id'));
    userQuery.pageSize = userPageItemNum;
    userQuery.pageNum = 1;
    userQueryCache = userQuery;
    queryDeptUser(userQuery);
});

/* 选择每页显示数量*/
$('.total-count-selector').click(function () {
    userPageItemNum = this.childNodes[0].innerHTML;
    /* 显示页数*/
    $('.show-item-num').html(userPageItemNum + '条');
    userQueryCache.pageNum = 1;
    userQueryCache.pageSize = userPageItemNum;
    queryDeptUser(userQueryCache);
});

/* 查询用户方法*/
function queryDeptUser(data) {
    deptOperation.operation(data, `getUserListByDeptId`, 'POST').then((result) => {
        console.log(result);
        if (result.retcode == 1 && result.pageInfo != null) {
            $('#dept-user-modal').modal('show');
            if (result.pageInfo.list.length > 0) {
                $('.no-data-tablesarch-in-modal').css('display', 'none');
                DeptUser.draw(result.pageInfo.list);
                PageInfo.drawPageController(result);
                $('#total-count').html(result.pageInfo.total);
                $('#total-page-num').html(`，共${result.pageInfo.pages}页`);
            } else {
                $('.no-data-tablesarch-in-modal').css('display', 'block');
                $('#table-tbody').html('');
                $('#total-count').html(0);
                $('#total-page-num').html('');
                $('.M-box3').html('');
            }
        }
    });
};

/*add by guoshuai start*/
/* 危险操作确认框*/
function ensureModal(type, content, data) {
    $('#modal-alert-content').html(content);
    $('#ensure-modal').modal('show');
    $('#ensure-modal').css('z-index',1051);
    $('#ensure-modal-submit').unbind("click");
    $('#ensure-modal-submit').click(function () {
        $('#ensure-modal').modal('hide');
        switch (type) {
            case 'deleteDept':
                deptDelete(data, 'deleteDept', '删除');
                break;
            default:
                break;
        }
        $('#ensure-modal-submit').unbind("click");
    });
}
/*删除方法*/
function deptDelete(id, url, word){
    $('.loading-gif').attr('src', 'img/loading.gif');
    $('.loading-word').html('正在提交...')
    $('.submit-loading').css('display', 'block');
    deptOperation.operation(null, `${url}/${id}`, 'GET').then((result) => {
        console.log(result);
        if (result.retcode == 1) {
            $('.loading-gif').attr('src', 'img/submit_success.png');
            $('.loading-word').html(`<span style="color: rgb(10, 180, 0)">${word}成功</span>`);
            $('#dept-content-title').html('');
            $('#dept-info-panel').html('');
            queryDefault();
        } else {
            $('.loading-gif').attr('src', 'img/submit_fail.png');
            $('.loading-word').html(`<span style="color: rgb(255, 120, 120);">${word}失败</span>`);
        }
        setTimeout(function () {
            $('.submit-loading').fadeOut(800);
        }, 1000);
    });
}

/*点击删除机构操作*/
$('#delete-dept-btn').click(function () {
    if (currentSelectedDept == null) {
        $('#alert-modal-content').html('未选择组织机构');
        $('#alert-modal').modal('show');
    } else {
        ensureModal('deleteDept', '是否删除', currentSelectedDept.deptId) 

    }
})
/*add by guoshuai end*/
/* add by guoshuai start 2018-8-24*/
/*顶部跳转*/
// $('.header-menu-item:eq(3)').html("组织机构管理"+`<p style="
// width:11px;
// height:9px;
// background:url('img/iconpic/slide.png') no-repeat;
// background-size:100% 100%;
// position:absolute;
// top:14px;
// left:81%;
// "></p>`);
/* add by guoshuai end 2018-8-24*/