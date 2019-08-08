import { TopHeader } from '../../common/topHeader/TopHeader.js';

import { UesrOperation } from './ajax/UesrOperation.js';
import { UserInfoTable } from './table/UserInfoTable.js';

let selectedImgPath;

/* 生成顶部菜单 */
TopHeader.initHeader();

/* 默认查询*/
function queryDefault() {
    UesrOperation.operation(null, 'getUserInfo', 'GET').then((result) => {
        console.log(result);
        if (result.retcode == 1 && result.dataMap != null) {
            resultCache = result;
            UserInfoTable.drawTable(result.dataMap.userInfo);
        }
    });
}
queryDefault();

/* 文件上传*/
$('#user-pic-selector').fileinput({
    uploadUrl: 'aliFileUpload/sysUpload',
    language: 'zh',
    showRemove: true,
    showUpload: false,
    showPreview: true,
    showCaption: true,
    dropZoneEnabled: true,
    maxFileCount: 1,
    maxFileSize: 512,
    allowedFileExtensions: ['png', 'jpg'],
    layoutTemplates: {
        actionDelete: '',
        actionUpload: ''
    }
}).on('filebatchselected', function (event, files) {
    for (let i = $('.kv-preview-thumb').length - 1; i >= 0; i--) {
        if (i == $('.kv-preview-thumb').length - 1) {
            continue;
        } else {
            $($('.kv-preview-thumb')[i]).remove(); // 删除上一个文件
        }
    }
    // if ($('.file-preview-frame').length > 2) {
    //     $($('.file-preview-frame')[0]).remove(); // 删除上一个文件
    // }
    $(this).fileinput('upload');
}).on('fileuploaded', function (event, data) {
    if (data.jqXHR.responseJSON.data != null) {
        selectedImgPath = data.jqXHR.responseJSON.data;
        if (selectedImgPath != null) {
            $('#head-pic-addr-submit').removeAttr('disabled');
        }
    }
});
$(document).on('click', '.fileinput-remove-button', function () {
    $('#head-pic-addr-submit').attr('disabled', 'disabled');
    selectedImgPath = null;
});

/* 头像路径提交*/
$('#head-pic-addr-submit').click(function () {
    if (selectedImgPath != null) {
        console.log(selectedImgPath);
        $(this).attr('disabled', 'disabled');
        /* 提交*/
        let data = new UserVo();
        data.id = resultCache.dataMap.userInfo.id;
        data.headAddr = selectedImgPath;
        $('.loading-gif').attr('src', 'img/loading.gif');
        $('.loading-word').html('正在提交...')
        $('.submit-loading').css('display', 'block');
        UesrOperation.operation(data, 'updateUserInfo', 'POST').then((result) => {
            console.log(result);
            if (result.retcode == 1) {
                $('#user-pic-selector').fileinput('clear');
                $('.loading-gif').attr('src', 'img/submit_success.png');
                $('.loading-word').html(`<span style="color: rgb(10, 180, 0)">修改成功</span>`);
                queryDefault();
            } else {
                $('.loading-gif').attr('src', 'img/submit_fail.png');
                $('.loading-word').html(`<span style="color: rgb(255, 120, 120);">修改失败</span>`);
            }
            setTimeout(function () {
                $('.submit-loading').fadeOut(800);
            }, 1000);
        });
        selectedImgPath = null;
    }
    $('#change-user-pic-modal').modal('hide');
    //$('#user-pic-selector').fileinput('clear');
});

/* 清空输入框*/
$('.input-clear').click(function () {
    $(`#${$(this).attr('data-id')}`).val('');
});

/* 禁止输入空格*/
$('.pwd-input').on('keyup', function () {
    this.value = this.value.replace(/\s+/g, '');
});

/* 提交密码修改*/
$('.pwd-change-input').click(function () {
    // let oldPwd = $('#old-pwd-input').val();
    let newPwd = $('#new-pwd-input').val();
    let newPwdCheck = $('#new-pwd-input-check').val();
    if (newPwd != '' && newPwdCheck != '') {
        if (newPwd == newPwdCheck) {
            // 提交
            if (resultCache != null) {
                $('.loading-gif').attr('src', 'img/loading.gif');
                $('.loading-word').html('正在提交...')
                $('.submit-loading').css('display', 'block');
                let data = new UserVo();
                data.id = resultCache.dataMap.userInfo.id;
                data.username = resultCache.dataMap.userInfo.username;
                data.password = newPwd;
                data.rePassword = newPwdCheck;
                UesrOperation.operation(data, 'updateUserInfo', 'POST').then((result) => {
                    console.log(result);
                    if (result.retcode == 1) {
                        $('.loading-gif').attr('src', 'img/submit_success.png');
                        $('.loading-word').html(`<span style="color: rgb(10, 180, 0)">修改成功</span>`);
                        $('#new-pwd-input').val('');
                        $('#new-pwd-input-check').val('');
                        $('#pwd-update-modal').modal('show');
                    } else {
                        $('.loading-gif').attr('src', 'img/submit_fail.png');
                        $('.loading-word').html(`<span style="color: rgb(255, 120, 120);">修改失败</span>`);
                    }
                    setTimeout(function () {
                        $('.submit-loading').fadeOut(800);
                    }, 1000);
                });
            }
        } else {
            $('#alert-modal-content').html('两次密码输入错误');
            $('#alert-modal').modal('show');
        }
    } else {
        $('#alert-modal-content').html('输入信息不完整');
        $('#alert-modal').modal('show');
    }
});

/* 登出*/
$('#pwd-update-logout-button').click(function () {
    window.location.href = 'logout';
});
/* add by guoshuai start 2018-8-24*/
//$('.header-menu-dropdown-3 .header-menu-dropdown-item:eq(3)').css('display','none');
/* add by guoshuai end 2018-8-24*/