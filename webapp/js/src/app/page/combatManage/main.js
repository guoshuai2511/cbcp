import { TopHeader } from '../../common/topHeader/TopHeader.js';
import { MyCookie } from '../../common/cookie/MyCookie.js';

import { CaseOperation } from './ajax/CaseOperation.js'

import { DrawTable } from './table/DrawTable.js'
import { PageInfo } from './table/PageInfo.js';
import { ModalContent } from './table/ModalContent.js';

/* js版本号，判断服务器端是否已刷新*/
console.log('js.version=2.1.89456465');
/* 生成顶部菜单*/
TopHeader.initHeader();

/* 禁止输入空格*/
$(document).on('keyup blur', '.input-space-forbidden', function () {
    this.value = this.value.replace(/\s/g, '');
});
/* 案件名禁止输入空格*/
$(document).on('keyup blur', '.input-space-forbidden-caseName', function () {
    if (/\s/.test(this.value)) {
        $('#is-caseName-true').html(`<span class="text-red">案件名不能包含空格</span>`);
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

/* 设置默认页数*/
if (MyCookie.getCookie('caseManagePageNum') != '') {
    pageItemNum = Number(MyCookie.getCookie('caseManagePageNum'));
    $('.show-item-num').html(pageItemNum + '条');
}

/* 获取案件标签列表*/
function getTagList() {
    CaseOperation.operation(null, 'getCombatTagList', 'GET').then((result) => {
        if (result.retcode == 1) {
            tagListCache = result.dataList;
        }
    });
}
getTagList();

/* 审核状态*/
$('.reviewStatus-search-selector-out').click(function () {
    $('#reviewStatus-search-input-out').html($(this).html());
    $('#reviewStatus-search-input-out').attr('data-status-type', $(this).attr('data-status-type'));
    $('#reviewStatus-remove-out').css('display', 'block');
});
$('#reviewStatus-remove-out').click(function () {
    $('#reviewStatus-search-input-out').html('&nbsp;');
    $('#reviewStatus-search-input-out').attr('data-status-type', '');
    $('#reviewStatus-remove-out').css('display', 'none');
});

/* 审核状态*/
$('.reviewStatus-search-selector').click(function () {
    $('#reviewStatus-search-input').html($(this).html());
    $('#reviewStatus-search-input').attr('data-status-type', $(this).attr('data-status-type'));
    $('#reviewStatus-remove').css('display', 'block');
});
$('#reviewStatus-remove').click(function () {
    $('#reviewStatus-search-input').html('&nbsp;');
    $('#reviewStatus-search-input').attr('data-status-type', '');
    $('#reviewStatus-remove').css('display', 'none');
});

/* 评分选择*/
$('.grade-star-icon').hover(function () {
    $('.grade-star-icon').addClass('gray-cover');
    for (let i = 0; i <= $(this).attr('data-star-index'); i++) {
        $($($(this).parent()).children()[i]).removeClass('gray-cover');
    }
}, function () {
    if ($(this).attr('data-is-clicked') == 0) {
        $('.grade-star-icon').addClass('gray-cover');
        for (let i = 0; i < $($(this).parent()).children().length; i++) {
            if ($($($(this).parent()).children()[i]).attr('data-is-clicked') == 1) {
                for (let j = 0; j <= i; j++) {
                    $($($(this).parent()).children()[j]).removeClass('gray-cover');
                }
                break;
            }
        }
    }
});
$('.grade-star-icon').click(function () {
    $('.grade-star-icon').attr('data-is-clicked', '0');
    $(this).attr('data-is-clicked', '1');
    $('.grade-star-container').attr('data-selected-num', Number($(this).attr('data-star-index')) + 1);
    $(this).removeClass('gray-cover');
});

/* 分数重置*/
$('.grade-star-reset').click(function () {
    $('.grade-star-icon').addClass('gray-cover');
    $('.grade-star-icon').attr('data-is-clicked', 0);
    $('.grade-star-container').attr('data-selected-num', 0);
});

/* 页面加载时的首次搜索*/
queryDefault();

/* 切换搜索模式*/
$('.search-type-all').css('display', 'none');
$('#search-mode-title-2').click(function () {
    if ($(this).attr('data-search-type') == 0) {
        $('.search-type-all').css('display', 'block');
        $('.search-type-simple').css('display', 'none');
        $('#search-mode-title-1').html('条件太多？');
        $('#search-mode-title-2').html('简单搜索');
        $(this).attr('data-search-type', '1');
        /*delete by guoshuai start 2018-9-29
        $('.table-view-data-area').css('min-height', $(window).height() - $('.table-view-search-area').height() - 250);
        delete by guoshuai end 2018-9-29*/
        /*add by guoshuai start 2018-9-29*/
        $('#table-view-container-box').css('height','250');
        $('.search-simple-rule').css('height','222');
        $('.table-view-data-area').css('min-height', $(window).height() - 474);
        $('.page-selector').css('margin-top','140px');
        /*add by guoshuai start 2018-9-29*/
    } else {
        $('.search-type-all').css('display', 'none');
        $('.search-type-simple').css('display', 'block');
        $('#search-mode-title-1').html('条件太少？');
        $('#search-mode-title-2').html('高级搜索');
        $(this).attr('data-search-type', '0');
        /*delete by guoshuai start 2018-9-29
        $('.table-view-data-area').css('min-height', $(window).height() - $('.table-view-search-area').height() - 250);
        delete by guoshuai end 2018-9-29*/
        /*add by guoshuai start 2018-9-29*/
        $('.table-view-data-area').css('min-height', $(window).height() - 474);
        $('.page-selector').css('margin-top','140px');
        $('#table-view-container-box').css('height','80');
        $('.search-simple-rule').css('height','52');
        /*add by guoshuai start 2018-9-29*/
    }
});

/* 时间范围选择点击*/
$('.time-range-selector-type-radio').mousedown(function () {
    if ($(this).attr('id') == 'custom-type-selector') {
        $('#custom-type-input').css('display', 'block');
    } else {
        $('#custom-type-input').css('display', 'none');
    }
});

/* 搜索按钮*/
$('.guide-search-btn').click(function () {
    let isContinue = true;
    let caseManageGuide = new CaseReviewBean();
    caseManageGuide.pageNum = 1;
    caseManageGuide.pageSize = pageItemNum;
    if ($('#search-mode-title-2').attr('data-search-type') == 0) {
        /* 简单搜索*/
        let keyword = $('#query-key-word').val();
        if (keyword != '') {
            /*delete by guoshuai start 2018-10-13
            if (/^[a-zA-Z]+$/.test(keyword)) { // 用户名
            delete by guoshuai end 2018-10-13*/
            /*add by guoshuai start 2018-10-13*/
            if(/^[a-zA-Z0-9_-]+$/.test(keyword)) { // 用户名
            /*add by guoshuai end 2018-10-13*/
                caseManageGuide.userName = keyword;
            }  else if (/[\u4e00-\u9fa5]/.test(keyword)) { // 城市
                caseManageGuide.areaName = keyword;
            } else {
                isContinue = false;
                $('#alert-modal-content').html('输入内容有误')
                $('#alert-modal').modal('show');
            }
        }
        if ($('#reviewStatus-search-input-out').attr('data-status-type') != null && $('#reviewStatus-search-input-out').attr('data-status-type') != '') {
            caseManageGuide.reviewStatus = Number($('#reviewStatus-search-input-out').attr('data-status-type'));
        }
    } else {
        /* 高级搜索*/
        if ($('#query-case-name').val() != '') {
            caseManageGuide.combatName = $('#query-case-name').val();
        }
        if ($('#query-tag').val() != '') {
            caseManageGuide.tag = $('#query-tag').val();
        }
        if ($('#query-user-name').val() != '') {
            caseManageGuide.userName = $('#query-user-name').val();
        }
        if ($('#query-area-code').val() != '') {
            caseManageGuide.areaName = $('#query-area-code').val();
        }
        
        if ($('#query-dev-code').val() != '') {
            caseManageGuide.devCode = $('#query-dev-code').val();
        }
        if ($('#query-user-type').is(':checked')) {
            caseManageGuide.userType = 1;
        }
        if ($('#reviewStatus-search-input').attr('data-status-type') != null && $('#reviewStatus-search-input').attr('data-status-type') != '') {
            caseManageGuide.reviewStatus = Number($('#reviewStatus-search-input').attr('data-status-type'));
        }
        let mixWorkingTime = $('#query-mix-working-time').val(); // 大于XX分钟，最短工作时间
        let maxWorkingTime = $('#query-max-working-time').val(); // 小于XX分钟，最长工作时间
        if (mixWorkingTime != '' || maxWorkingTime != '') {
            if (mixWorkingTime == '') {
                mixWorkingTime = 0;
            }
            if (maxWorkingTime == '') {
                maxWorkingTime = 999999;
            }
            if (/^[0-9]*[0-9]*$/.test(mixWorkingTime) && /^[0-9]*[0-9]*$/.test(maxWorkingTime)) {
                if (Number(mixWorkingTime) < Number(maxWorkingTime)) {
                    caseManageGuide.maxWorkingTime = Number(maxWorkingTime) * 60;
                    caseManageGuide.mixWorkingTime = Number(mixWorkingTime) * 60;
                } else {
                    isContinue = false;
                    $('#alert-modal-content').html('请输入正确的时间范围')
                    $('#alert-modal').modal('show');
                }
            } else {
                isContinue = false;
                $('#alert-modal-content').html('请输入正确的数字')
                $('#alert-modal').modal('show');
            }
        }
        caseManageGuide.score = Number($('.grade-star-container').attr('data-selected-num')) * 20;
        if ($('#query-time-day').is(':checked')) { // 今日
            caseManageGuide.startTime = new Date(`${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()} 00:00:00`).Format('yyyy-MM-dd hh:mm:ss');
            caseManageGuide.endTime = new Date(`${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()} 23:59:59`).Format('yyyy-MM-dd hh:mm:ss');
        }
        if ($('#query-time-week').is(':checked')) { // 本周
            caseManageGuide.startTime = new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 7).Format('yyyy-MM-dd hh:mm:ss');
            caseManageGuide.endTime = new Date().Format('yyyy-MM-dd hh:mm:ss');
            if (new Date().getDay() == 0) {
                caseManageGuide.startTime = new Date(new Date(`${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()} 00:00:00`).getTime() - 6 * 24 * 3600 * 1000).Format('yyyy-MM-dd hh:mm:ss');
                caseManageGuide.endTime = new Date(`${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()} 23:59:59`).Format('yyyy-MM-dd hh:mm:ss');
            } else {
                caseManageGuide.startTime = new Date(new Date(`${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()} 00:00:00`).getTime() - (new Date().getDay() - 1) * 24 * 3600 * 1000).Format('yyyy-MM-dd hh:mm:ss');
                caseManageGuide.endTime = new Date(new Date(`${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()} 23:59:59`).getTime() + (6 - new Date().getDay()) * 24 * 3600 * 1000).Format('yyyy-MM-dd hh:mm:ss');
            }
        }
        if ($('#query-time-month').is(':checked')) { // 本月
            caseManageGuide.startTime = new Date(`${new Date().getFullYear()}/${new Date().getMonth() + 1}/01 00:00:00`).Format('yyyy-MM-dd hh:mm:ss');
            /*delete by guoshuai start 2018-12-17
            caseManageGuide.endTime =  new Date(`${new Date().getFullYear()}/${new Date().getMonth() + 2}/01 00:00:00`).Format('yyyy-MM-dd hh:mm:ss');
            end guoshuai start 2018-12-17*/
            if(new Date().getMonth() ==11){
                let month = 1;
                caseManageGuide.endTime =  new Date(`${new Date().getFullYear() + 1}/`+month+`/01 00:00:00`).Format('yyyy-MM-dd hh:mm:ss');
            }else{
                caseManageGuide.endTime =  new Date(`${new Date().getFullYear()}/${new Date().getMonth() + 2}/01 00:00:00`).Format('yyyy-MM-dd hh:mm:ss');
            }
        }
        if ($('#query-time-halfyear').is(':checked')) { // 最近半年
            caseManageGuide.startTime = new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 182).Format('yyyy-MM-dd hh:mm:ss');
            caseManageGuide.endTime = new Date().Format('yyyy-MM-dd hh:mm:ss');
        }
        if ($('#query-time-year').is(':checked')) { // 最近一年
            caseManageGuide.startTime = new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 365).Format('yyyy-MM-dd hh:mm:ss');
            caseManageGuide.endTime = new Date().Format('yyyy-MM-dd hh:mm:ss');
        }
        if ($('#query-time-costume').is(':checked')) { // 自定义
            if ($('#query-time-start-time').val() != '') {
                caseManageGuide.startTime = $('#query-time-start-time').val();
            }
            if ($('#query-time-end-time').val() != '') {
                caseManageGuide.endTime = $('#query-time-end-time').val();
            }
        }
    }
    if (isContinue) {
        queryCache = caseManageGuide;
        query(caseManageGuide);
    }
});

/* 页面加载时的默认搜索全部*/
function queryDefault() {
    let queryAll = new CaseReviewBean();
    queryAll.pageNum = 1;
    queryAll.pageSize = pageItemNum;
    queryCache = queryAll;
    query(queryAll);
}

/* 作战回放向导页表查询*/
function query(data) {
    CaseOperation.operation(data, 'getCombatInfoList', 'POST').then((result) => {
        console.log(result);
        $('#table-tbody').html('');
        if (result.retcode == 1 && result.pageInfo != null && result.pageInfo.list != null && result.pageInfo.list.length > 0) {
            queryResult = result.pageInfo.list;
            DrawTable.caseTable(result);
            PageInfo.drawPageController(result);
            $('.no-data-realtime').css('display', 'none');
            $('#total-count').html(result.pageInfo.total);
            $('#total-page-num').html(`，共${result.pageInfo.pages}页`);
        } else {
            $('.no-data-realtime').css('display', 'block');
            $('#total-count').html(0);
            $('#total-page-num').html('');
            $('.M-box3').html('');
        }
    });
}

/* 选择每页显示数量*/
$('.total-count-selector').click(function () {
    pageItemNum = this.childNodes[0].innerHTML;
    /* 设置cookie*/
    MyCookie.setCookie('caseManagePageNum', pageItemNum, 365);
    /* 显示页数*/
    $('.show-item-num').html(pageItemNum + '条');
    queryCache.pageNum = 1;
    queryCache.pageSize = pageItemNum;
    query(queryCache);
});

/* 标签选择*/
$(document).on('click', '.tag-selector', function () {
    console.log($(this).html());
    $('#tag-input').val($(this).html());
});

/* 状态选择*/
$(document).on('click', '.reviewStatus-selector', function () {
    $('#reviewStatus-input').html($(this).html());
    $('#reviewStatus-input').attr('data-status', $(this).attr('data-status'));
    $('#is-reviewStatus-true').html('');
});

/* 案件名*/
$(document).on('blur', '#caseName-input', function () {
    if (this.value.replace(/\s/g, '' != '')) {
        $('#is-caseName-true').html('');
    }
});
/* 标签*/
$(document).on('blur', '#tag-input', function () {
    if (this.value.replace(/\s/g, '' != '')) {
        $('#is-tag-true').html('');
    }
});

/* 新增/修改模态框*/
$(document).on('click', '.operation-modal-open-btn', function () {

    let modalType = $(this).attr('data-type');
    let dataIndex = queryResult[$(this).attr('data-tr-index')].combatReview;
    dataIndex.reviewStatus = queryResult[$(this).attr('data-tr-index')].reviewStatus;
    dataIndex.serialNum = queryResult[$(this).attr('data-tr-index')].serialNum;
    let id = queryResult[$(this).attr('data-tr-index')].id;
    console.log(dataIndex);
    $('#case-operation-content').html(ModalContent.getInputHtml(modalType, dataIndex,id));
    $('#case-operation-modal').modal('show');
});

/* 新增/修改模态框提交*/
$(document).on('click', '#case-modal-submit-add', function () {
    let submitType = $(this).attr('data-type');
    let caseReview = new CaseReviewVo();
    caseReview.combatId = parseInt($(this).attr('data-caseId'));
    caseReview.combatSerialNum=$(this).attr('data-caseSerial');
    caseReview.combatName = $('#caseName-input').val();
    caseReview.tag = $('#tag-input').val().replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    caseReview.reviewStatus = Number($('#reviewStatus-input').attr('data-status'));
    caseReview.remark = $('#remark-input').val();
    if (caseReview.reviewStatus != 100) {
        $('#case-operation-modal').modal('hide');
        $('.loading-gif').attr('src', 'img/loading.gif');
        $('.loading-word').html('正在提交...')
        $('.submit-loading').css('display', 'block');
        CaseOperation.operation(caseReview, `${submitType}CombatReview`, 'POST').then((result) => {
            if (result.retcode == 1) {
                $('.loading-gif').attr('src', 'img/submit_success.png');
                $('.loading-word').html(`<span style="color: rgb(10, 180, 0)">${submitType == 'add' ? '添加' : '修改'}成功</span>`);
                query(queryCache);
                getTagList();
            } else {
                $('.loading-gif').attr('src', 'img/submit_fail.png');
                $('.loading-word').html(`<span style="color: rgb(255, 120, 120);">${submitType == 'add' ? '添加' : '修改'}失败</span>`);
            }
            setTimeout(function () {
                $('.submit-loading').fadeOut(500);
            }, 700);
        }).catch((e) => {
            console.log(e);
            $('.loading-gif').attr('src', 'img/submit_fail.png');
            $('.loading-word').html(`<span style="color: rgb(255, 120, 120);">${submitType == 'add' ? '添加' : '修改'}失败</span > `);
            setTimeout(function () {
                $('.submit-loading').fadeOut(500);
            }, 700);
        });
    } else {
        if (caseReview.reviewStatus == 100) {
            $('#is-reviewStatus-true').html('<span class="text-red">请选择审核状态</span>');
        } else {
            $('#is-reviewStatus-true').html('');
        }
    }
});