import { TopHeader } from '../../common/topHeader/TopHeader.js';
import { MyCookie } from '../../common/cookie/MyCookie.js';
import { BlackBoxLogOperation } from './ajax/BlackBoxLogOperation.js';
import { DeptTree } from './tree/DeptTree.js';
import { DrawTable } from './table/DrawTable.js';
import { PageInfo } from './table/PageInfo.js';
import { ModalContent } from './table/ModalContent.js';

/* js版本号，判断服务器端是否已刷新*/
console.log('js.version=2.1.10');
/* 生成顶部菜单 */
TopHeader.initHeader();
/* 设置默认页数*/
if (MyCookie.getCookie('blackBoxLogPageNum') != '') {
    pageItemNum = Number(MyCookie.getCookie('blackBoxLogPageNum'));
    $('.show-item-num').html(pageItemNum + '条');
}

initQuery();
function initQuery() {
    blackBoxLogQuery.pageNum = 1;
    blackBoxLogQuery.pageSize = pageItemNum;
    query(blackBoxLogQuery);
}

/* 搜索*/
$('.guide-search-btn').click(function () {
    /*防止出现空*/
    function removeNull(val) {
        if (val == '') {
            return null;
        } else {
            //return new Date(val).Format('yyyy-MM-dd hh:mm:ss');
            return val;
        }
    }

    let blackBoxLogQueryTemp = new BlackBoxLogQueryBean();
    blackBoxLogQueryTemp.caseName = $('#case-name-value').val().trim();
    blackBoxLogQueryTemp.workTarget = $('#work-object-value').val().trim();
    blackBoxLogQueryTemp.phone = $('#tel-code-value').val().trim();
    blackBoxLogQueryTemp.imsi = $('#imsi-code-value').val().trim();
    blackBoxLogQueryTemp.imei = $('#imei-code-value').val().trim();
    blackBoxLogQueryTemp.devCode = $('#dev-name-value').val().trim();
    blackBoxLogQueryTemp.applicant = $('#case-operator-value').val().trim();
    blackBoxLogQueryTemp.deptId = $('#dept-query-selector-input').attr('data-dept-id');
    blackBoxLogQueryTemp.startTime = removeNull($('#query-time-start-time-console').val());
    blackBoxLogQueryTemp.endTime = removeNull($('#query-time-end-time-console').val());
    // blackBoxLogQueryTemp.remark = $('#remarks-value').val().trim();

    blackBoxLogQueryTemp.pageNum = 1;
    blackBoxLogQueryTemp.pageSize = pageItemNum;
    console.log(blackBoxLogQueryTemp);
    blackBoxLogQuery = blackBoxLogQueryTemp;
    query(blackBoxLogQueryTemp);
});

/* 选择每页显示数量*/
$('.total-count-selector').click(function () {
    pageItemNum = this.childNodes[0].innerHTML;
    /* 设置cookie*/
    MyCookie.setCookie('blackBoxLogPageNum', pageItemNum, 365);
    $('.show-item-num').html(pageItemNum + '条');
    blackBoxLogQuery.pageNum = 1;
    blackBoxLogQuery.pageSize = pageItemNum;
    query(blackBoxLogQuery);
});
/* 用户查询*/
function query(data) {
    console.log(data);
    BlackBoxLogOperation.operation(JSON.stringify(data), 'getBlackBoxLogList', 'POST').then((result) => {
        console.log(result);
        if (result.retcode == 1) {
            if (result.pageInfo.list.length > 0) {
                $('.no-data-tablesarch').remove();
                resultCache = result.pageInfo.list;
                DrawTable.blackBoxLogTable(result.pageInfo.list);
                PageInfo.drawPageController(result);
                $('#total-page-num').html(`，共${result.pageInfo.pages}页`);
                $('.view-data-table thead tr').show();
            } else {
                $('.table-view-data-area').append(`
                    <div class= "no-data-tablesarch">
                        <img class="no-data-icon" src="img/no_data_icon_search.png">
                        <span class="no-data-word">无搜索结果</span>
                    </div>
                `)
                // $('.view-data-table thead tr').hide();
                $('#table-tbody').html('');
                $('.M-box3').html('');
            }
            $('#total-count').html(result.pageInfo.total);
        } else {
            $('.table-view-data-area').append(`
                <div class= "no-data-tablesarch">
                    <img class="no-data-icon" src="img/no_data_icon_search.png">
                    <span class="no-data-word">无搜索结果</span>
                </div>
            `)
            // $('.view-data-table thead tr').hide();
            $('#table-tbody').html('');
            $('.M-box3').html('');
        }
    });
}

/* 获取组织机构树状图*/
BlackBoxLogOperation.operation(null, `getDeptTreeList`, 'GET').then((result) => {
    if (result.retcode == 1) {
        deptTreeCache = result.dataList;
        DeptTree.drawTree(result.dataList);
    }
});
/* 所属机构选择（删除项）*/
$('#dept-query-selector-remove').click(function () {
    $('#dept-query-selector-input').html('&nbsp;');
    $('#dept-query-selector-input').attr('data-dept-id', '');
    $('#dept-query-selector-remove').css('display', 'none');
});
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
$(document).on('click', '#dept-input-container-value', function () {
    $('#dept-selector-modal').modal('show');
});

$('#add-phone-btn').click(function () {
    $('#blackBoxlog-input-modal').html(ModalContent.getInputHtml(1, null));
    $('#blackBoxlog-modal').modal('show');
});
$('#blackBoxlog-modal').on('hide.bs.modal',function(){
    $('#devSelectedArea').html('');
    devSelectedNameListCache='';
})
	
// let ids = { ids: [1] };
// BlackBoxLogOperation.operation(JSON.stringify(ids), `deleteblackBoxLog`, 'POST').then((result) => {
//     if (result.retcode == 1) {

//     }
// });
/* 所属机构选择*/
$('#dept-query-selector-remove').click(function () {
    $('#dept-query-selector-input').html('&nbsp;');
    $('#dept-query-selector-input').attr('data-dept-id', '');
    $('#dept-query-selector-remove').css('display', 'none');
});

//显示办案设备模态框
$(document).on('click', '#myNewCaseDev-selector-button', function () {
    $('#devAndVehicle-modal').modal('show');
    let selectedDevList = []
    if ($(this).attr('data-open') == 'true') {
        let htmlValue = '';
        let list = $(this).attr('data-data').replace(/\s*/g, "").split(',');
        for (let i = 0; i < list.length; i++) {
            let single = list[i].split('.');
            htmlValue = htmlValue + `
                <div class="devItem dev-${single[0]}">
                    <span class="dev-item" disCode="${single[1]}">
                        ${single[0]}
                    </span>
                    <span class="delete-dev-this"></span>
                    <span>&nbsp;</span>
                </div>
            `;
            selectedDevList.push(single[0]);
        }
        $('#devSelectedArea').html(htmlValue);
    } else {
        selectedDevList = devSelectedNameListCache.split(',');
    }
    searchAllDev(1, selectedDevList);
    $('#searchDev').val('')
    //$('#devSelectedArea').html('');
    //devSelectedListCache ='';
})
$('#chooseDev').click(function () {
    searchAllDev(1, null);
    $(this).children('.select-ball').addClass('select-ball-active');
    $('#chooseVehicle').children('.select-ball').removeClass('select-ball-active');
})
//搜索设备的方法
function searchAllDev(type, selectedDevList) {
    $('#devDisplayList').html('');
    BlackBoxLogOperation.operation(null, `getDevListByParam/`, 'GET').then((result) => {
        if (result.retcode == 1) {
            if (result.data != null) {
                let list = result.data;
                let htmlValue = ``;
                if (selectedDevList == null || selectedDevList == '' || selectedDevList == undefined) {
                    for (let i = 0; i < list.length; i++) {
                        htmlValue = htmlValue + `
                            <div class="data-member" id="${list[i].disCode}" data-status=0 data-id="${list[i].id}">
                                <span id="${list[i].disCode}" class="select-dev-block"></span>
                                <span class="data-display">${list[i].disCode}</span>
                            </div>
                        `;
                    }
                } else {
                    for (let i = 0; i < list.length; i++) {
                        if (selectedDevList.indexOf(list[i].disCode) != -1) {
                            htmlValue = htmlValue + `
                                <div class="data-member" id="${list[i].disCode}" data-status=1 data-id="${list[i].id}">
                                    <span id="${list[i].disCode}" class="select-dev-block select-dev-block-active"></span>
                                    <span class="data-display">${list[i].disCode}</span>
                                </div>
                            `;
                        } else {
                            htmlValue = htmlValue + `
                                <div class="data-member" id="${list[i].disCode}" data-status=0 data-id="${list[i].id}">
                                    <span id="${list[i].disCode}" class="select-dev-block"></span>
                                    <span class="data-display">${list[i].disCode}</span>
                                </div>
                            `;
                        }
                    }
                }
                $('#devDisplayList').html(htmlValue);
            } else {
                $('#devDisplayList').html(``)
            }

        } else {
            $('#devDisplayList').html(``)
        }
    }).catch((e) => {
        $('#devDisplayList').html(`<span class="text-red">http错误${e.status}</span>`);
    });
}
//勾选设备
$(document).on('click', '.data-member', function () {
    let disCode = $(this).attr('id');
    let devId = $(this).attr('data-id');
    let status = $(this).attr('data-status');
    if (status == 0) {
        $(this).children('.select-dev-block').addClass('select-dev-block-active');
        let htmlValue = `
            <div class="devItem dev-${disCode}">
                <span class="dev-item" disCode="${devId}">
                    ${disCode}
                </span>
                <span class="delete-dev-this"></span>
                <span>&nbsp;</span>
            </div>
        `;
        if ($('.dev-' + disCode).length < 1) {
            $('#devSelectedArea').append(htmlValue);
        }

        $(this).attr('data-status', 1);
    } else if (status == 1) {
        $(this).children('.select-dev-block').removeClass('select-dev-block-active');
        $('.dev-' + disCode).remove();
        $(this).attr('data-status', 0);
    }
})
//删除选中的设备
$(document).on('click', '.delete-dev-this', function () {
    $(this).parent('.devItem').remove();
    let devName = $(this).parent('.devItem').children('.dev-item').text().replace(/\s*/g, "");
    if ($('#' + devName).attr('data-status') == 1) {
        $('#' + devName).attr('data-status', 0);
        $('#' + devName).children('.select-dev-block').removeClass('select-dev-block-active');
    }
})
//搜索特定的设备编号方法
function searchDev(type, id) {
    $('#devDisplayList').html('')
    BlackBoxLogOperation.operation(null, `getDevListByParam/`+ id, 'GET').then((result) => {
        if (result.retcode == 1) {
            if (result.data != null) {
                let list = result.data;
                let htmlValue = ``;
                for (let i = 0; i < list.length; i++) {
                    htmlValue = htmlValue + `
                        <div class="data-member" id="${list[i].disCode}" data-status=0 data-id="${list[i].id}">
                            <span id="${list[i].disCode}" class="select-dev-block"></span>
                            <span class="data-display">${list[i].disCode}</span>
                        </div>
                    `;
                }
                $('#devDisplayList').html(htmlValue);
            } else {
                $('#devDisplayList').html(``)
            }

        } else {
            $('#devDisplayList').html(``)
        }
    }).catch((e) => {
        $('#devDisplayList').html(`<span class="text-red">http错误${e.status}</span>`);
    });
}
//搜索栏搜索车辆或设备
$(document).on('keyup blur', '#searchDev', function () {
    let val = $(this).val();
    if ($('#chooseVehicle').children('.select-ball').hasClass('select-ball-active')) {
        searchVehicle(2, val)
    } else {
        if(val == ''){

        }else{
            searchDev(1, val)
        }
    }
});
//收集选中的设备名称
function getSelectDevAggregateName() {
    let length = $('#devSelectedArea .devItem').length;
    let list = [];
    for (let i = 0; i < length; i++) {
        list.push($('.devItem').eq(i).children('.dev-item').text().replace(/\s/g, ''));
    }
    return list;
}
$(document).on('click', '#devSure', function () {
    devSelectedNameListCache = getSelectDevAggregateName().toString();
    $('#myNewCaseDev-selector-button').html(devSelectedNameListCache);
    $('#myNewCaseDev-selector-button').attr('title', devSelectedNameListCache.replace(/\s/g, ''));
    isDevCode(devSelectedNameListCache);
    $('#devAndVehicle-modal').modal('hide');
})

// $(document).on('blur', '#applicatName', function () {
//     let val = $('#applicatName').val();
//     isUserLegal(val);
// })
// $(document).on('blur', '#caseName', function () {
//     let val = $('#caseName').val();
//     isCaseName(val);
// })
// $(document).on('blur', '#workTarget', function () {
//     let val = $('#workTarget').val();
//     isWorkTarget(val);
// })
// $(document).on('blur', '#phoneNum', function () {
//     let val = $('#phoneNum').val();
//     isPhoneNum(val);
// })
// $(document).on('blur', '#time-input', function () {
//     let val = $('#time-input').val();
//     isTime(val);
// })

function isCaseName(data) {
    let flag = false;
    if (data != "") {
        flag = true;
        $('#is-casename-true').html(`<img src="img/iconpic/success.png" style="margin-top: 8px;" />`);
    } else {
        $('#is-casename-true').html(`<img src="img/iconpic/fail.png" style="margin-top: 5px; float:left;" />
        <span class="text-red" style="float:left">请输入案件名称</span>`);
    }
    return flag;
}

function isWorkTarget(data) {
    let flag = false;
    if (data != "") {
        flag = true;
        $('#is-worktarget-true').html(`<img src="img/iconpic/success.png" style="margin-top: 8px;" />`);
    } else {
        $('#is-worktarget-true').html(`<img src="img/iconpic/fail.png" style="margin-top: 5px; float:left;" />
        <span class="text-red" style="float:left">请输入工作对象</span>`);
    }
    return flag;
}
function isPhoneNum(data) {
    let flag = false;
    if (data != "") {
        if (/^1[3456789][0-9]{9}$/.test(data)) {
            flag = true;
            $('#is-tel-true').html(`<img src="img/iconpic/success.png" style="margin-top: 8px;" />`);
        } else {
            $('#is-tel-true').html(`<img src="img/iconpic/fail.png" style="margin-top: 5px; float:left;" />
            <span class="text-red" style="float:left">请输入正确的电信标识码</span>`);
        }
    } else {
        $('#is-tel-true').html(`<img src="img/iconpic/fail.png" style="margin-top: 5px; float:left;" />
        <span class="text-red" style="float:left">请输入电信标识码</span>`);
    }
    return flag;
}
function isDevCode(data) {
    let flag = false;
    if (data != "") {
        flag = true;
        $('#is-dev-true').html(`<img src="img/iconpic/success.png" style="margin-top: 8px;" />`);
    } else {
        $('#is-dev-true').html(`<img src="img/iconpic/fail.png" style="margin-top: 5px; float:left;" />
        <span class="text-red" style="float:left">请选择设备</span>`);
    }
    return flag;
}
function isUserLegal(val) {
    if (val != '') {
        $('#is-applicatname-true').html(`<img src="img/loading.gif" style="width:20px;height:20px;margin-top:6px;" />`);
        BlackBoxLogOperation.operation(null, `getUserByUserName/` + val, 'GET').then((result) => {
            $('#is-applicatname-true').html(``);
            if (result.retcode == 1) {
                if (result.data != null) {
                    $('#is-applicatname-true').html(`<img src="img/iconpic/success.png" style="margin-top: 8px;" />`);
                    $('#applicatName').attr('managerId', result.data.id);

                } else {
                    $('#is-applicatname-true').html(`<img src="img/iconpic/fail.png" style="margin-top: 5px; float:left;" />
                        <span class="text-red" style="float:left">该用户不存在</span>`);
                    $('#applicatName').attr('managerId', 0);
                }

            } else {
                $('#is-applicatname-true').html(`<span class="text-red">错误！</span>`);
            }
        }).catch((e) => {
            $('#is-applicatname-true').html(`<span class="text-red">http错误${e.status}</span>`);
        });
    } else {
        $('#is-applicatname-true').html(`<img src="img/iconpic/fail.png" style="margin-top: 5px; float:left;" />
        <span class="text-red" style="float:left">请填写申请人账户</span>`);
        $('#applicatName').attr('managerId', 0);
    }
}
function isUserNameTrue(val) {
    let flag = false;
    if (val != '') {
        let dataType = `getUserByUserName/` + val;
        let url = 'enforceManage/blackBoxLog/' + dataType;
        let method = 'GET';
        $.ajax({
            url: url,
            type: method,
            async: false,
            contentType: "application/json; charset=utf-8",
            data: null,
            dataType: 'json',
            success: function (result) {
                if (result.retcode == 1) {
                    if (result.data != null) {
                        flag = true;
                    }
                }
            },
            error: function (error) {
               console.log(error);
            },
        });
    }
    return flag;
}
function isTime(data) {
    let flag = false;
    if (data != "" && data != undefined) {
        flag = true;
        $('#is-have-time').html(`<img src="img/iconpic/success.png" style="margin-top: 8px;" />`);
    } else {
        $('#is-have-time').html(`<img src="img/iconpic/fail.png" style="margin-top: 5px; float:left;" />
        <span class="text-red" style="float:left">请选择办案时间</span>`);
    }
    return flag;
}

$(document).on('click', '#blackBoxlog-modal-submit-add', function () {
    addblackBoxlog();
});
function addblackBoxlog() {
    let blackBoxLogInfo = new BlackBoxLogVo();
    blackBoxLogInfo.caseName = $('#caseName').val();
    blackBoxLogInfo.workTarget = $('#workTarget').val();
    blackBoxLogInfo.phone = $('#phoneNum').val();
    blackBoxLogInfo.imsi = $('#imsi-input').val();
    blackBoxLogInfo.imei = $('#imei-input').val();
    blackBoxLogInfo.devCode = $('#myNewCaseDev-selector-button').html();
    blackBoxLogInfo.disCode = $('#myNewCaseDev-selector-button').html();
    blackBoxLogInfo.applicantName = $('#applicatName').val();
    blackBoxLogInfo.createrId = $('#applicatName').attr('managerId');
    blackBoxLogInfo.remark = $('#remark-input').val();
    if ($('#time-input').val() != "") {
        blackBoxLogInfo.createTime = new Date($('#time-input').val()).getTime();
        blackBoxLogInfo.applyTime = new Date($('#time-input').val()).getTime();
    }
    isCaseName(blackBoxLogInfo.caseName);
    isWorkTarget(blackBoxLogInfo.workTarget);
    isPhoneNum(blackBoxLogInfo.phone);
    isUserLegal(blackBoxLogInfo.applicantName);
    isDevCode(blackBoxLogInfo.devCode); isTime(blackBoxLogInfo.applyTime)
    if (isCaseName(blackBoxLogInfo.caseName) && isWorkTarget(blackBoxLogInfo.workTarget)
        && isPhoneNum(blackBoxLogInfo.phone) && isUserNameTrue(blackBoxLogInfo.applicantName)
        && isDevCode(blackBoxLogInfo.devCode) && isTime(blackBoxLogInfo.applyTime)) {
        $('.submit-loading').css('display', 'block');
        BlackBoxLogOperation.operation(JSON.stringify(blackBoxLogInfo), "addBlackBoxLog", 'POST').then((result) => {
            if (result.retcode == 1) {
                $('.loading-gif').attr('src', 'img/submit_success.png');
                $('.loading-word').html(`<span style="color: rgb(10, 180, 0);">提交成功</span > `);
                setTimeout(function () {
                    $('.submit-loading').fadeOut(800);
                }, 1000);
            } else {
                $('.loading-gif').attr('src', 'img/submit_fail.png');
                $('.loading-word').html(`<span style="color: rgb(255, 120, 120);">提交失败</span > `);
                setTimeout(function () {
                    $('.submit-loading').fadeOut(800);
                }, 1000);
            }
        }).catch((e) => {
            $('.loading-gif').attr('src', 'img/submit_fail.png');
            $('.loading-word').html(`<span style="color: rgb(255, 120, 120);">提交失败</span > `);
            setTimeout(function () {
                $('.submit-loading').fadeOut(800);
            }, 1000);
        });
        $('#blackBoxlog-modal').modal('hide');
        initQuery();
    }

}

/* 删除*/
$(document).on('click', '.delete-blackBoxlog', function () {
    let id = $(this).attr('data-id');
    let ids = {
        ids: [id]
    }
    ensureModal('是否删除？', ids);
});

/* 危险操作确认框*/
function ensureModal(content, data) {
    $('#modal-alert-content').html(content);
    $('#ensure-modal').modal('show');
    $('#ensure-modal-submit').unbind("click");
    $('#ensure-modal-submit').click(function () {
        $('#ensure-modal').modal('hide');
        $('.submit-loading').css('display', 'block');
        BlackBoxLogOperation.operation(JSON.stringify(data), "deleteblackBoxLog", 'POST').then((result) => {
            if (result.retcode == 1) {
                $('.loading-gif').attr('src', 'img/submit_success.png');
                $('.loading-word').html(`<span style="color: rgb(10, 180, 0);">删除成功</span > `);
                setTimeout(function () {
                    $('.submit-loading').fadeOut(800);
                }, 1000);
            } else {
                $('.loading-gif').attr('src', 'img/submit_fail.png');
                $('.loading-word').html(`<span style="color: rgb(255, 120, 120);">删除失败</span > `);
                setTimeout(function () {
                    $('.submit-loading').fadeOut(800);
                }, 1000);
            }
        }).catch((e) => {
            $('.loading-gif').attr('src', 'img/submit_fail.png');
            $('.loading-word').html(`<span style="color: rgb(255, 120, 120);">删除失败</span > `);
            setTimeout(function () {
                $('.submit-loading').fadeOut(800);
            }, 1000);
        });
        $('#ensure-modal-submit').unbind("click");
        $('#blackBoxlog-modal').modal('hide');
        initQuery();
    });
};