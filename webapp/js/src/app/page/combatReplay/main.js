import { BaiduMapDrawing } from '../../common/baiduMap/Drawing.BaiduMap.js';
import { BaiduMapDistance } from '../../common/baiduMap/Distance.BaiduMap.js';
import { GPSToBaiduPoint } from '../../common/baiduMap/GPSToBaiduPoint.BaiduMap.js';
import { TopHeader } from '../../common/topHeader/TopHeader.js';
import { MyCookie } from '../../common/cookie/MyCookie.js';

import { ParsingDevInfoCR } from './parsing/ParsingDevInfoCR.js';
import { PrasingBtsInfoCR } from './parsing/PrasingBtsInfoCR.js';
import { ParsingData } from './parsing/ParsingData.js'; // 将数据转换为实时作战所支持的格式
import { DrawHrefLoadingOverlay } from './overlay/DrawHrefLoadingOverlay.js';
import { EngColumnChartContainer } from './overlay/EngColumnChartContainer.js';

import { Panel } from '../realTimeCombat/tool/Panel.js';
import { Switch } from '../realTimeCombat/tool/Switch.js';
import { View } from '../realTimeCombat/tool/View.js';

import { TimeLine } from './tool/TimeLine.js';

import { QueryReplay } from './ajax/QueryReplay.js';

import { DrawTable } from './table/DrawTable.js';
import { PageInfo } from './table/PageInfo.js';
import { PrasingLteCatchInfo } from '../realTimeCombat/parsing/PrasingLteCatchInfo.js';
import { PrasingDevActiveDetailInfo } from '../realTimeCombat/parsing/PrasingDevActiveDetailInfo.js';
import { PrasingHistoryTaDataInfo } from './parsing/PrasingHistoryTaDataInfo.js';
import { PrasingTaDrawInfo } from '../realTimeCombat/parsing/PrasingTaDrawInfo.js';
import { ParsingMultiBtsInfo } from '../realTimeCombat/parsing/ParsingMultiBtsInfo.js';
import { ParsingMultiBtsInfo } from '../realTimeCombat/parsing/ParsingMultiBtsInfo.js';
import { EndOverlayConstructor } from '../realTimeCombat/overlay/EndOverlayConstructor.js';

/* js版本号，判断服务器端是否已刷新*/
console.log('js.version=2.1.8999');
/* 生成顶部菜单*/
TopHeader.initHeader();
/* 加载鼠标绘制工具*/
BaiduMapDrawing.initDrawingTools(map);
/* 加载地图测距工具*/
BaiduMapDistance.initDistanceTools(map);
/* 设置默认页数*/
if (MyCookie.getCookie('combatReplayPageNum') != '') {
    pageItemNum = Number(MyCookie.getCookie('combatReplayPageNum'));
    $('.show-item-num').html(pageItemNum + '条');
}
let CombatReplayBean = function (devCodes, startTime, endTime, serialNum) {
    this.devCodes = devCodes;
    this.startTime = startTime;
    this.endTime = endTime;
    this.serialNum = serialNum;
}

/* 工具栏显示/隐藏*/
$('#tool-pin').click(function () {
    if ($(this).attr('data-is-pin') == 1) {
        /* 取消pin*/
        $(this).addClass('gray-cover');
        $(this).attr('data-is-pin', 0);
    } else {
        /* 锁定pin*/
        $(this).removeClass('gray-cover');
        $(this).attr('data-is-pin', 1);
    }
});
$('.top-map-tools-area').hover(function () {
}, function () {
    if ($('#tool-pin').attr('data-is-pin') == 0) {
        $('.top-map-tools-area').animate({ top: '-10px' });
        $('.eng-audio-selector-menu').css('display', 'none');
    }
});
$('.top-header').hover(function () {
    if ($('#tool-pin').attr('data-is-pin') == 0) {
        /*delete by guoshuai start 2018-10-23
        $('.top-map-tools-area').animate({ top: '50px' });
        */
        /*add by guoshuai start 2018-10-23*/
        $('.top-map-tools-area').animate({ top: '58px' });
        /*add by guoshuai end 2018-10-23*/
    }
}, function () {

});
/* 分数重置*/
$('.grade-star-reset').click(function () {
    $('.grade-star-icon').addClass('gray-cover');
    $('.grade-star-icon').attr('data-is-clicked', 0);
    $('.grade-star-container').attr('data-selected-num', 0);
});

console.log(combatReplayInfoRedirect);
/*---------------------------作战回放向导页----------------------------*/
// $('.guide-frame').css('display', 'none');
if (combatReplayInfoRedirect != 'null') {
    MyCookie.deleteCookie('combatReplayQueryCache');
    MyCookie.deleteCookie('combatReplayPlayTimeCache');
    startReplay(JSON.parse(combatReplayInfoRedirect));
    /**add by sunbing start*/
    $('#alert-modal-button').click(function () {
        window.location.reload();
    });
    $('#alert-modal-close-button').click(function () {
        window.location.reload();
    });
    /**add by sunbing end*/
} else {
    /* 判断cookie中是否已储存作战回放信息*/
    if (MyCookie.getCookie('combatReplayQueryCache') != '') {
        let cookieCacheData = JSON.parse(MyCookie.getCookie('combatReplayQueryCache'));
        switch (cookieCacheData.type) {
            case 1:
                startByGuideFrame(cookieCacheData.data);
                break;
            case 2:
                startReplay(cookieCacheData.data);
                break;
            default:
                break;
        }
    } else {
        /* 获取案件标签列表*/
        $.ajax({
            url: 'commandManage/combatReplay/getCombatTagList',
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result.retcode == 1) {
                    tagListCache = result.dataList;
                    if (tagListCache != null && tagListCache.length > 0) {
                        let tagListOuterHtml = '';
                        let tagListInnerHtml = '';
                        for (let i = 0; i < tagListCache.length; i++) {
                            if (tagListCache[i].replace(/\s/g, '') != '') {
                                tagListOuterHtml = tagListOuterHtml + `
                                    <li>
                                        <a class="dropdown-menu-selector tag-selector-outer"
                                        style="width:100%; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${tagListCache[i]}</a>
                                    </li>
                                `;
                                tagListInnerHtml = tagListInnerHtml + `
                                    <li>
                                        <a class="dropdown-menu-selector tag-selector-inner"
                                        style="width:100%; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${tagListCache[i]}</a>
                                    </li>
                                `;
                            }
                        }
                        $('#tag-input-btn-outer').append(`
                            <ul class="dropdown-menu tag-list-outer-dropdown-menu" style="width:200px; max-height:250px; overflow:auto;">
                                ${tagListOuterHtml}
                            </ul>
                        `);
                        $('#tag-input-btn-inner').append(`
                            <ul class="dropdown-menu tag-list-inner-dropdown-menu" style="width:200px; max-height:250px; overflow:auto;">
                                ${tagListInnerHtml}
                            </ul>
                        `);
                    }
                }
            }
        });
        /* 选择案件标签*/
        $(document).on('click', '.tag-selector-outer', function () {
            $('#tag-input-outer').val($(this).html());
        });
        $(document).on('click', '.tag-selector-inner', function () {
            $('#tag-input-inner').val($(this).html());
        });
        /* 页面加载时的首次搜索*/
        queryDefault();
        /* 切换搜索模式*/
        //$('.search-type-all').css('display', 'none');
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
                $('#table-view-container-box').css('height', 185);
                $('.search-simple-rule').css('height', '160');
                $('.table-view-data-area').css('min-height', $(window).height() - 474);
                $('.page-selector').css('margin-top', '140px');
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
                $('.page-selector').css('margin-top', '140px');
                $('#table-view-container-box').css('height', '80');
                $('.search-simple-rule').css('height', '52');
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
            let combatReplayGuide = new CombatReplayGuideBean();
            combatReplayGuide.pageNum = 1;
            if ($('#search-mode-title-2').attr('data-search-type') == 0) {
                /* 简单搜索*/
                let keyword = $('#query-key-word').val();
                if (keyword != '') {
                    /*delete by guoshuai start 2018-10-13
                    if (/^[a-zA-Z]+$/.test(keyword)) { // 用户名
                    delete by guoshuai end 2018-10-13*/
                    /*add by guoshuai start 2018-10-13*/
                    if (/^[a-zA-Z0-9_-]+$/.test(keyword)) { // 用户名
                        /*add by guoshuai end 2018-10-13*/
                        combatReplayGuide.userName = keyword;
                    } else if (/[\u4e00-\u9fa5]/.test(keyword)) { // 城市
                        combatReplayGuide.areaName = keyword;
                    } else {
                        isContinue = false;
                        $('#alert-modal-content').html('输入内容有误')
                        $('#alert-modal').modal('show');
                    }
                }
                if ($('#tag-input-outer').val() != '') {
                    combatReplayGuide.tag = $('#tag-input-outer').val();
                }
            } else {
                /* 高级搜索*/
                if ($('#query-user-name').val() != '') {
                    combatReplayGuide.userName = $('#query-user-name').val();
                }
                if ($('#query-area-code').val() != '') {
                    combatReplayGuide.areaName = $('#query-area-code').val();
                }
                if ($('#tag-input-inner').val() != '') {
                    combatReplayGuide.tag = $('#tag-input-inner').val();
                }


                if ($('#query-dev-code').val() != '') {
                    combatReplayGuide.devCode = $('#query-dev-code').val();
                }
                if ($('#query-user-type').is(':checked')) {
                    combatReplayGuide.userType = 1;
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
                            combatReplayGuide.maxWorkingTime = Number(maxWorkingTime) * 60;
                            combatReplayGuide.mixWorkingTime = Number(mixWorkingTime) * 60;
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
                combatReplayGuide.score = Number($('.grade-star-container').attr('data-selected-num')) * 20;
                if ($('#query-time-day').is(':checked')) { // 今日
                    combatReplayGuide.startTime = new Date(`${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()} 00:00:00`).Format('yyyy-MM-dd hh:mm:ss');
                    combatReplayGuide.endTime = new Date(`${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()} 23:59:59`).Format('yyyy-MM-dd hh:mm:ss');
                }
                if ($('#query-time-week').is(':checked')) { // 本周
                    combatReplayGuide.startTime = new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 7).Format('yyyy-MM-dd hh:mm:ss');
                    combatReplayGuide.endTime = new Date().Format('yyyy-MM-dd hh:mm:ss');
                    if (new Date().getDay() == 0) {
                        combatReplayGuide.startTime = new Date(new Date(`${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()} 00:00:00`).getTime() - 6 * 24 * 3600 * 1000).Format('yyyy-MM-dd hh:mm:ss');
                        combatReplayGuide.endTime = new Date(`${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()} 23:59:59`).Format('yyyy-MM-dd hh:mm:ss');
                    } else {
                        combatReplayGuide.startTime = new Date(new Date(`${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()} 00:00:00`).getTime() - (new Date().getDay() - 1) * 24 * 3600 * 1000).Format('yyyy-MM-dd hh:mm:ss');
                        combatReplayGuide.endTime = new Date(new Date(`${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()} 23:59:59`).getTime() + (6 - new Date().getDay()) * 24 * 3600 * 1000).Format('yyyy-MM-dd hh:mm:ss');
                    }
                }
                if ($('#query-time-month').is(':checked')) { // 本月
                    combatReplayGuide.startTime = new Date(`${new Date().getFullYear()}/${new Date().getMonth() + 1}/01 00:00:00`).Format('yyyy-MM-dd hh:mm:ss');
                    /*delete by guoshuai start 2018-12-17
                    caseManageGuide.endTime =  new Date(`${new Date().getFullYear()}/${new Date().getMonth() + 2}/01 00:00:00`).Format('yyyy-MM-dd hh:mm:ss');
                    end guoshuai start 2018-12-17*/
                    if (new Date().getMonth() == 11) {
                        let month = 1;
                        combatReplayGuide.endTime = new Date(`${new Date().getFullYear() + 1}/` + month + `/01 00:00:00`).Format('yyyy-MM-dd hh:mm:ss');
                    } else {
                        combatReplayGuide.endTime = new Date(`${new Date().getFullYear()}/${new Date().getMonth() + 2}/01 00:00:00`).Format('yyyy-MM-dd hh:mm:ss');
                    }
                }
                if ($('#query-time-halfyear').is(':checked')) { // 最近半年
                    combatReplayGuide.startTime = new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 182).Format('yyyy-MM-dd hh:mm:ss');
                    combatReplayGuide.endTime = new Date().Format('yyyy-MM-dd hh:mm:ss');
                }
                if ($('#query-time-year').is(':checked')) { // 最近一年
                    combatReplayGuide.startTime = new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 365).Format('yyyy-MM-dd hh:mm:ss');
                    combatReplayGuide.endTime = new Date().Format('yyyy-MM-dd hh:mm:ss');
                }
                if ($('#query-time-costume').is(':checked')) { // 自定义
                    if ($('#query-time-start-time').val() != '') {
                        combatReplayGuide.startTime = $('#query-time-start-time').val();
                    }
                    if ($('#query-time-end-time').val() != '') {
                        combatReplayGuide.endTime = $('#query-time-end-time').val();
                    }
                }
            }
            if (isContinue) {
                CombatReplayGuideCache = combatReplayGuide;
                query(combatReplayGuide);
            }
        });

        /* 页面加载时的默认搜索全部*/
        function queryDefault() {
            let combatReplayGuide = new CombatReplayGuideBean();
            combatReplayGuide.pageNum = 1;
            CombatReplayGuideCache = combatReplayGuide;
            query(combatReplayGuide);
        }

        /* 作战回放向导页表查询*/
        function query(data) {
            console.log(data);
            QueryReplay.query(data).then((result) => {
                console.log(result);
                $('#table-tbody').html('');
                if (result.retcode == 1 && result.pageInfo != null && result.pageInfo.list != null && result.pageInfo.list.length > 0) {
                    queryResult = result.pageInfo.list;
                    DrawTable.caseTable(result);
                    PageInfo.drawPageController(result);
                    $('.no-data-realtime').css('display', 'none');
                    /*edit by guo shuai start 2019/3/5*/
                    if ($('#view-class-block').hasClass('combatCase-list-switch')) {
                        $('.view-data-table').css('display', 'none');
                    } else {
                        $('.view-data-table').show();
                    }
                    /*edit by guo shuai end 2019/3/5*/
                    /*add by guoshuai start */
                    if ($('.view-data-table').css('display') == 'block') {
                        $('.view-data-block').hide();
                    } else {
                        $('.view-data-block').show();
                    }
                    /*add by guoshuai start */
                    $('#total-count').html(result.pageInfo.total);
                    $('#total-page-num').html(`，共${result.pageInfo.pages}页`);
                } else {
                    $('.no-data-realtime').css('display', 'block');
                    $('.view-data-table').hide();
                    /*add by guoshuai start */
                    $('.view-data-block').hide();
                    /*add by guoshuai start */
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
            MyCookie.setCookie('combatReplayPageNum', pageItemNum, 365);
            /* 显示页数*/
            $('.show-item-num').html(pageItemNum + '条');
            CombatReplayGuideCache.pageNum = 1;
            CombatReplayGuideCache.pageSize = pageItemNum;
            query(CombatReplayGuideCache);
        });
    }

}
/*---------------------------作战回放向导页----------------------------*/

/* 回放按钮*/
$(document).on('click', '.command-btn', function () {
    queryResultIndex = $(this).attr('data-tr-index');
    console.log(queryResult[queryResultIndex]);
    startByGuideFrame(queryResult[queryResultIndex]);
});

function startByGuideFrame(data) {
    let devList = [];
    for (let i = 0; i < data.devList.length; i++) {
        devList.push(data.devList[i].devCode);
    }
    userInfosCache = data.userList;
    let nameValue = '';
    for (let i = 0; i < data.userList.length; i++) {
        nameValue = nameValue + data.userList[i].username + '/' + data.userList[i].handleSeq + '，';
    }

    $('#case-users').attr('title', nameValue.substring(0, nameValue.length - 1));
    $('#case-users').html(nameValue.substring(0, nameValue.length - 1));

    startReplay(new CombatReplayBean(devList, data.startTime, data.endTime, data.serialNum));
}

/* 开始作战回放*/
function startReplay(data) {
    /**add by gaochao start */
    $('.top-header').css('display', 'none');
    /**add by gaochao end */
    combatReplayBeanQueryCache = data;
    replayDevNumCache = data.devCodes.length;
    $('.map-area-container').css('display', 'block');
    $('.guide-frame').css('display', 'none');
    $('.loading-word').html('加载中...');
    $('.search-loading').css('display', 'block');
    $.ajax({
        url: 'commandManage/combatReplay/getCombatReplayDataInfo',
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        dataType: 'json',
        success: function (result) {
            console.log(result);
            if (result.retcode != 1 || result.dataMap.historyDevBaseInfoList == null || result.dataMap.historyDevBaseInfoList.length == 0) {
                $('.search-loading').css('display', 'none');
                $('.map-area-container').css('display', 'none');
                $('.guide-frame').css('display', 'block');
                $('#alert-modal-title').html('错误');
                $('#alert-modal-content').html('搜索结果不存在');
                $('#alert-modal').modal('show');
                $('.top-header').css('display', 'block');
            } else {
                /* 缓存搜索结果*/
                historyInfoCache = result.dataMap;
                if (historyInfoCache.endCombatReport != undefined && historyInfoCache.endCombatReport != null) {
                    let endPointData = historyInfoCache.endCombatReport;
                    if (endPointData.lng != undefined && endPointData.lat != undefined
                        && endPointData.lng != null && endPointData.lat != null
                        && endPointData.lng != "" && endPointData.lat != "") {
                        let pointEndData = GPSToBaiduPoint.getBaiduPointLocation([[endPointData.lng, endPointData.lat]]);
                        let pointEnd = new BMap.Point(pointEndData[0].lng, pointEndData[0].lat);
                        endPoint = pointEnd;
                        endMarker = new EndOverlayConstructor(pointEnd,endPointData.address);
                        map.addOverlay(endMarker);  // 将标注添加到地图中
                    }
                }
                $('.target-name').html(result.dataMap.combatInfo.targetKey);
                if (combatReplayInfoRedirect != 'null') {
                    userInfosCache = historyInfoCache.combatInfo.userList;
                    let nameValue = '';
                    for (let i = 0; i < userInfosCache.length; i++) {
                        nameValue = nameValue + userInfosCache[i].username + '/' + userInfosCache[i].handleSeq + '，';
                    }

                    $('#case-users').attr('title', nameValue.substring(0, nameValue.length - 1));
                    $('#case-users').html(nameValue.substring(0, nameValue.length - 1));

                    if (MyCookie.getCookie('combatReplayQueryCache') == '') {
                        queryResultCache = { type: 2, data: JSON.parse(combatReplayInfoRedirect), info: historyInfoCache.combatInfo };
                        MyCookie.setCookie('combatReplayQueryCache', JSON.stringify(queryResultCache), 365);
                    }
                } else {
                    if (MyCookie.getCookie('combatReplayQueryCache') == '') {
                        queryResultCache = { type: 1, data: queryResult[queryResultIndex] };
                        MyCookie.setCookie('combatReplayQueryCache', JSON.stringify(queryResultCache), 365);
                    } else {
                        let cookieCacheDataRedirected = JSON.parse(MyCookie.getCookie('combatReplayQueryCache'));
                        if (cookieCacheDataRedirected.type == 2) {
                            let caseInfoRedirected = cookieCacheDataRedirected.info;
                            userInfosCache = caseInfoRedirected.userList;
                            let nameValue = '';
                            for (let i = 0; i < userInfosCache.length; i++) {
                                nameValue = nameValue + userInfosCache[i].username + '/' + userInfosCache[i].handleSeq + '，';
                            }

                            $('#case-users').attr('title', nameValue.substring(0, nameValue.length - 1));
                            $('#case-users').html(nameValue.substring(0, nameValue.length - 1));

                        }
                    }
                }
                /* 设置案件开始时间*/
                caseStartTime = combatReplayBeanQueryCache.startTime;
                /* 设置案件结束时间*/
                caseEndTime = combatReplayBeanQueryCache.endTime;
                $('.time-line-start-time').html(new Date(caseStartTime).Format('hh:mm'));
                $('.time-line-end-time').html(new Date(caseEndTime).Format('hh:mm'));
                /* 转换目标基站信息*/
                let historyTargetCellInfoList = historyInfoCache.historyTargetCellInfoList;
                for (let i = 0; i < historyTargetCellInfoList.length; i++) {
                    let targetBtsBdPoint = GPSToBaiduPoint.getBaiduPointLocation([[historyTargetCellInfoList[i].lng, historyTargetCellInfoList[i].lat]])[0];
                    historyInfoCache.historyTargetCellInfoList[i].lng = targetBtsBdPoint.lng;
                    historyInfoCache.historyTargetCellInfoList[i].lat = targetBtsBdPoint.lat;
                }
                /**add by gaochao start */
                //转换预锁基站信息
                // let historyPreLockCellInfoList = historyInfoCache.historyPreLockCellInfoList;
                // for (let i = 0; i < historyPreLockCellInfoList.length; i++) {
                //     let targetBtsBdPoint = GPSToBaiduPoint.getBaiduPointLocation([[historyPreLockCellInfoList[i].lng, historyPreLockCellInfoList[i].lat]])[0];
                //     historyInfoCache.historyPreLockCellInfoList[i].lng = targetBtsBdPoint.lng;
                //     historyInfoCache.historyPreLockCellInfoList[i].lat = targetBtsBdPoint.lat;
                // }
                /**add by gaochao end*/

                /* 转换设备状态信息*/
                let listCache = [];
                let devStateInfoList = historyInfoCache.historyDevStateInfoList;
                let reportTimeCache;
                let triggerInfoCache = new Map();
                for (let i = 0; i < devStateInfoList.length; i++) {
                    let devStateInfo = ParsingData.FormatStatusData(devStateInfoList[i]);
                    if (devStateInfo.triggerInfo != null) {
                        /* 有触发信息，更新缓存*/
                        // triggerInfoCache.set(devStateInfo.devCode, devStateInfo.triggerInfo);
                        // if (triggerInfoCache.get(devStateInfo.devCode) == null) {
                        //     triggerInfoCache.set(devStateInfo.devCode, devStateInfo.triggerInfo);
                        // } else {
                        //     // 保证触发信息不为0
                        //     let laseValueCache = JSON.parse(triggerInfoCache.get(devStateInfo.devCode));
                        //     let currentValueCache = JSON.parse(devStateInfo.triggerInfo);
                        //     if (currentValueCache.completeTimes >= laseValueCache.completeTimes && currentValueCache.receiptTimes >= laseValueCache.receiptTimes && currentValueCache.sendTimes >= laseValueCache.sendTimes) {
                        //         triggerInfoCache.set(devStateInfo.devCode, devStateInfo.triggerInfo);
                        //     } else {
                        //         devStateInfo.triggerInfo = triggerInfoCache.get(devStateInfo.devCode);
                        //     }
                        // }
                    } else {
                        /* 没有触发信息，填充触发信息*/
                        devStateInfo.triggerInfo = triggerInfoCache.get(devStateInfo.devCode);
                    }
                    if (reportTimeCache == devStateInfo.reportTime) {
                        if (listCache[listCache.length - 1][devStateInfo.devCode] == null) {
                            listCache[listCache.length - 1][devStateInfo.devCode] = devStateInfo;
                        } else {
                            let cellAnalysisInfoList = listCache[listCache.length - 1][devStateInfo.devCode].cellAnalysisInfoList;
                            if (cellAnalysisInfoList != null && devStateInfo.cellAnalysisInfoList != null) {
                                for (let j = 0; j < cellAnalysisInfoList.length; j++) {
                                    if (cellAnalysisInfoList.btsId == devStateInfo.cellAnalysisInfoList[0].btsId) {
                                        listCache[listCache.length - 1][devStateInfo.devCode].cellAnalysisInfoList.splice(i, 1);
                                        break;
                                    }
                                }
                                listCache[listCache.length - 1][devStateInfo.devCode].cellAnalysisInfoList.push(devStateInfo.cellAnalysisInfoList[0]);
                            }
                        }
                    } else {
                        eval(`
                            listCache.push({
                                '${devStateInfo.devCode}': devStateInfo,
                                reportTime: devStateInfo.reportTime
                            });
                        `);
                        reportTimeCache = devStateInfo.reportTime;
                    }
                }
                // 排序
                var bubbleSort = function (arr) {
                    for (var i = 0; i < arr.length - 1; i++) {
                        for (var j = i + 1; j < arr.length; j++) {
                            if (arr[i].reportTime > arr[j].reportTime) {
                                var temp = arr[i];
                                arr[i] = arr[j];
                                arr[j] = temp;
                            }
                        }
                    }
                    return arr;
                }
                let SortedList = bubbleSort(listCache);
                listCache = SortedList;
                //
                let devStateInfoMap = new Map();
                let eachDevStateInfoCache = new Map();
                for (let i = 0; i < listCache.length; i++) {
                    for (let key in listCache[i]) {
                        if (listCache[i][key].devCode != null) {
                            if (eachDevStateInfoCache.get(listCache[i][key].devCode) == null) {
                                eachDevStateInfoCache.set(listCache[i][key].devCode, listCache[i][key]);
                            } else {
                                if (listCache[i][key].cellAnalysisInfoList == null) {
                                    eachDevStateInfoCache.get(listCache[i][key].devCode).triggerInfo = listCache[i][key].triggerInfo;
                                    eachDevStateInfoCache.get(listCache[i][key].devCode).energy = listCache[i][key].energy;
                                    eachDevStateInfoCache.get(listCache[i][key].devCode).temperature = listCache[i][key].temperature;
                                } else {
                                    eachDevStateInfoCache.set(listCache[i][key].devCode, listCache[i][key]);
                                }
                            }
                        }
                    }
                    if (devStateInfoMap.get(listCache[i].reportTime) == null) {
                        devStateInfoMap.set(listCache[i].reportTime, listCache[i]);
                    }
                    eachDevStateInfoCache.forEach((eachInfo) => {
                        devStateInfoMap.get(listCache[i].reportTime)[eachInfo.devCode] = eachInfo;
                        // eval(`
                        //     devStateInfoMap.get(listCache[i].reportTime).${eachInfo.devCode} = eachInfo;
                        // `);
                    });
                }
                let mapToListCache = [];
                devStateInfoMap.forEach((eachInfo) => {
                    mapToListCache.push(eachInfo);
                });
                historyInfoCache.historyDevStateInfoList = mapToListCache; // 
                console.log(historyInfoCache);
                /* 绘制时间轴*/
                TimeLine.initTimeLine(caseStartTime, caseEndTime);
                /**add by gaochao start */
                $('.case-time-all').html(`/<span>${add0(new Date((caseEndTime - caseStartTime < 0 ? 0 : caseEndTime - caseStartTime) - 8 * 3600 * 1000).getHours())}:${add0(new Date((caseEndTime - caseStartTime < 0 ? 0 : caseEndTime - caseStartTime) - 8 * 3600 * 1000).getMinutes())}:${add0(new Date((caseEndTime - caseStartTime < 0 ? 0 : caseEndTime - caseStartTime) - 8 * 3600 * 1000).getSeconds())}</span>`);
                /**add by gaochao end */
                /* 开关*/
                Switch.initSwitch();
                /* 视角切换*/
                View.initViewPanel();
                let historyDevBaseInfoList = historyInfoCache.historyDevBaseInfoList;
                for (let i = 0; i < historyDevBaseInfoList.length; i++) {
                    if (devDrawInfoMap.get(historyDevBaseInfoList[i].devCode) == null) {
                        /* 绘制面板*/
                        Panel.addNewDev(historyDevBaseInfoList, i);
                    }
                }
                /* 填充能量条*/
                EngColumnChartContainer.init(historyDevBaseInfoList);
                /* 如果只有一台设备，就不显示单兵A/车载A*/
                let carDevNum = 0;
                let singleDevNum = 0;
                devDrawInfoMap.forEach((eachDev) => {
                    switch (eachDev.devType) {
                        case 1:
                            carDevNum = carDevNum + 1;
                            break;
                        case 2:
                            singleDevNum = singleDevNum + 1;
                            break;
                        default:
                            break;
                    }
                });
                if (carDevNum < 2) {
                    $('.team-each-dev-index-car').css('display', 'none');
                }
                if (singleDevNum < 2) {
                    $('.team-each-dev-index-single').css('display', 'none');
                }
                /* */ //userInfosCache
                let userHtml = '';
                for (let i = 0; i < userInfosCache.length; i++) {
                    userHtml = userHtml + `${userInfosCache[i].username}/${userInfosCache[i].handleSeq} `;
                    $(`.user-name-value-by-id-${userInfosCache[i].id}`).html(`${userInfosCache[i].realname}`);
                    $(`.user-name-value-by-id-${userInfosCache[i].id}`).attr('title', `${userInfosCache[i].realname}`);
                    if (userInfosCache[i].headAddr != null && userInfosCache[i].headAddr != "") {
                        $(`.user-name-value-by-id-${userInfosCache[i].id}-photo`).css('background', `url(${userInfosCache[i].headAddr})no-repeat`);
                        $(`.user-name-value-by-id-${userInfosCache[i].id}-photo`).css('background-size', 'cover');
                    }
                    devDrawInfoMap.forEach((eachDev) => {
                        if (eachDev.userId == userInfosCache[i].id && eachDev.userName == null) {
                            devDrawInfoMap.get(eachDev.devCode).userName = userInfosCache[i].username;
                            devDrawInfoMap.get(eachDev.devCode).realName = userInfosCache[i].realname;
                            devDrawInfoMap.get(eachDev.devCode).headAddr = userInfosCache[i].headAddr;
                        }
                    });
                }
                $('#case-users').html(userHtml);
                $('#case-users').attr('title', $('#case-users').html());
                /* */
                $('.show-history-start').css('display', 'block');
                $('.show-history-pause').css('display', 'block');
                $('.show-history-end').css('display', 'block');
                $('.speed-setting').css('display', 'block');
                $('.search-back').css('display', 'block');
                /* 放置初始设备*/
                let firstDevInfo = ParsingData.FormatDevData(historyDevBaseInfoList[0]);
                ParsingDevInfoCR.parsingDevInfo(firstDevInfo, false);
                if (MyCookie.getCookie('combatReplayPlayTimeCache') != '') {
                    playStatus = 2;
                    /**add by gaochao start */
                    // $('#play-btn').html('播放');
                    $('.play-btn-container').css('background', 'url(img/icon/play.png)');
                    /**add by gaochao end */                    let timeLintInitInterval = setInterval(() => {
                        if ($('.ui-rangeSlider-container').width() > 0) {
                            clearInterval(timeLintInitInterval);
                            $('.search-loading').css('display', 'none');
                            hrefPlayTime(Number(MyCookie.getCookie('combatReplayPlayTimeCache')));
                            let isFirstStart = setInterval(() => {
                                if (historyRouteLineIsFinish) {
                                    clearInterval(isFirstStart);
                                    isFirstStart = false;
                                    showHistory(historyInfoCache);
                                }
                            }, 25);
                        }
                    }, 10);
                    map.setZoom(19);
                } else {
                    /* 设置地图中心*/
                    let defaultLng = historyDevBaseInfoList[0].lng;
                    let defaultLat = historyDevBaseInfoList[0].lat;
                    let pointFirst = GPSToBaiduPoint.getBaiduPointLocation([[defaultLng, defaultLat]]);
                    setTimeout(() => {
                        map.centerAndZoom(new BMap.Point(pointFirst[0].lng, pointFirst[0].lat), 19);
                        $('.search-loading').css('display', 'none');
                    }, 900);
                }
                //判断是否需要显示Catch信息
                /*delete by guoshuai start 2019/3/6*/
                /* if(result.dataMap.historyCatchInfoList && typeof(result.dataMap.historyCatchInfoList) != undefined && result.dataMap.historyCatchInfoList != '') {
                	$(`.target-lte-info-container`).css('display', 'block');
                } */
                /*delete by guoshuai end 2019/3/6*/
            }
        },
        error: function (xhr, textStatus) {
            $('.search-loading').css('display', 'none');
            console.log('错误');
            console.log(xhr);
            console.log(textStatus);
        },
    });
}

/* 当前播放状态*/
let playStatus = 0; // 0停止；1开始；2暂停
/* 绘制方法的定时器*/
let timer;
/* 播放速度*/
/**del by gaochao start*/
let playSpeed = 1;
/**del by gaochao end */
/* 绘制设备*/
let playedDevCache = new Map();
function devHistory(dataList) {
    //edit by sunbing start
    devHistoryDataAll(dataList);
	/* 
	if (engAudioType == 3) {
        // 静音绘制全部数据
        devHistoryDataAll(dataList);
    } else {
        // 非静音丢失部分数据
        devHistoryDataPart(dataList);
    }*/
    //edit by sunbing end

}
function devHistoryDataAll(dataList) {
    if (playedDevCache.size > 0) {
        playedDevCache = new Map();
    }
    let devInfo = ParsingData.FormatDevData(dataList[devIndex]);
    if (devInfo.reportTime <= replayCurrentTime) {
        ParsingDevInfoCR.parsingDevInfo(devInfo, true);
        devIndex = devIndex + 1;
        if (devIndex < dataList.length) {
            if (dataList[devIndex].reportTime <= replayCurrentTime) {
                devHistory(dataList);
            }
        }
    }
}
function devHistoryDataPart(dataList) {
    let devInfo = ParsingData.FormatDevData(dataList[devIndex]);
    if (devInfo.reportTime <= replayCurrentTime) {
        ParsingDevInfoCR.parsingDevInfo(devInfo, true);
        playedDevCache.set(devInfo.devCode, 'played');
        devIndex = devIndex + 1;
        if (devIndex < dataList.length) {
            if (dataList[devIndex].reportTime <= replayCurrentTime) {
                if (playedDevCache.get(dataList[devIndex].devCode) == null) {
                    devHistory(dataList);
                } else {
                    devIndexAdd(dataList);
                }
            } else {
                playedDevCache = new Map();
            }
        }
    } else {
        playedDevCache = new Map();
    }
}
function devIndexAdd(dataList) {
    if (dataList[devIndex].reportTime <= replayCurrentTime) {
        if (playedDevCache.get(dataList[devIndex].devCode) != null) {
            devIndex = devIndex + 1;
            devIndexAdd(dataList);
        }
    }
}
// function devHistory(dataList) {
//     let devInfo = ParsingData.FormatDevData(dataList[devIndex]);
//     if (devInfo.reportTime <= replayCurrentTime) {
//         ParsingDevInfoCR.parsingDevInfo(devInfo, true);
//         playedDevCache.set(devInfo.devCode, 'played');
//         devIndex = devIndex + 1;
//         if (devIndex < dataList.length) {
//             if (dataList[devIndex].reportTime <= replayCurrentTime) {
//                 if (playedDevCache.get(dataList[devIndex].devCode) == null) {
//                     devHistory(dataList);
//                 } else {
//                     devIndex = devIndex + 1;
//                 }
//             } else {
//                 playedDevCache = new Map();
//             }
//         }
//     } else {
//         playedDevCache = new Map();
//     }
// }

/* 绘制基站*/
function btsHistory(dataList) {

    let btsInfo = ParsingData.FormatBtsData(dataList[btsIndex]);
    if (btsInfo.reportTime <= replayCurrentTime) {
        let btsInfoList = [];
        let btsInfos = dataList.slice(0, btsIndex);
        for (let i = 0; i < btsInfos.length; i++) {
            btsInfoList[ParsingData.FormatBtsData(btsInfos[i]).btsId] = ParsingData.FormatBtsData(btsInfos[i]);
        }
        let btsInfoNew = {};
        btsInfoNew.btsInfos = btsInfoList;
        ParsingMultiBtsInfo.prasingBtsInfo(btsInfoNew);
        btsIndex = btsIndex + 1;
        if (btsIndex < dataList.length) {
            if (dataList[btsIndex].reportTime <= replayCurrentTime) {
                btsHistory(dataList);
            }
        }
    }
}



/* 绘制状态信息*/
function statusHistory(dataList) {
    let statusInfo = dataList[statusIndex];
    if (statusInfo.reportTime <= replayCurrentTime) {
        PrasingBtsInfoCR.prasingStatusInfo(statusInfo);
        statusIndex = statusIndex + 1;
        if (statusIndex < dataList.length) {
            if (dataList[statusIndex].reportTime <= replayCurrentTime) {
                statusHistory(dataList);
            }
        }
    }
}

/* 绘制目标小区*/
function targetCellHistory(dataList) {
    /* 保持定时器与数据时间同步*/
    if (dataList[targetCellInfoIndex].createTime <= replayCurrentTime - 1000) {
        /* 执行设备绘制方法*/
        console.log(dataList);
        targetCellInfosCache.set(dataList[targetCellInfoIndex].btsId, dataList[targetCellInfoIndex]);
        PrasingBtsInfoCR.showTargetCell();
        targetCellInfoIndex++;
    }
}
/**add by gaochao start */
/* 绘制预锁基站*/
function preLockCellHistory(dataList) {
    /* 保持定时器与数据时间同步*/
    if (dataList[devPreLockCellInfoIndex].createTime <= replayCurrentTime - 1000) {
        /* 执行设备绘制方法*/
        devPreLockCellInfosCache = new Map();
        let devPreLockCellInfoList = JSON.parse(dataList[devPreLockCellInfoIndex].btsInfos);
        if (devPreLockCellInfoList != null) {
            for (let i = 0; i < devPreLockCellInfoList.length; i++) {
                let btsPoint = GPSToBaiduPoint.getBaiduPointLocation([[devPreLockCellInfoList[i].lng, devPreLockCellInfoList[i].lat]])[0];
                devPreLockCellInfoList[i].lng = btsPoint.lng;
                devPreLockCellInfoList[i].lat = btsPoint.lat;
                devPreLockCellInfosCache.set(devPreLockCellInfoList[i].btsId, devPreLockCellInfoList[i]);
            }
        }
        PrasingBtsInfoCR.showPreLockCell();
        devPreLockCellInfoIndex++;
    }
}
/**add by gaochao end*/

/*绘制目标手机号所在基站LTE信息(Catch)*/
function lteCatchInfoHistory(dataList) {
    /* 保持定时器与数据时间同步*/
    let lteCatchInfo = dataList[lteCatchInfoIndex];
    if (new Date(lteCatchInfo.reportTime).getTime() <= replayCurrentTime) {
        PrasingLteCatchInfo.showLteCatchInfo(lteCatchInfo);
        lteCatchInfoIndex = lteCatchInfoIndex + 1;
        if (lteCatchInfoIndex < dataList.length) {
            if (new Date(dataList[lteCatchInfoIndex].reportTime).getTime() <= replayCurrentTime) {
                lteCatchInfoHistory(dataList);
            }
        }
    }
}

/* 绘制主动式详细信息 */
function devActiveDetailInfoHistory(dataList) {
    let devActiveDetailInfo = dataList[devActiveDetailInfoIndex];
    if (new Date(devActiveDetailInfo.reportTime).getTime() <= replayCurrentTime) {
        PrasingDevActiveDetailInfo.showDevActiveDetailInfo(devActiveDetailInfo);
        PrasingDevActiveDetailInfo.showDevActiveEngLogInfo(devActiveDetailInfo);
        devActiveDetailInfoIndex = devActiveDetailInfoIndex + 1;
        if (devActiveDetailInfoIndex < dataList.length) {
            if (new Date(dataList[devActiveDetailInfoIndex].reportTime).getTime() <= replayCurrentTime) {
                devActiveDetailInfoHistory(dataList);
            }
        }
    }
}

/* 绘制Ta Data信息 */
function devTdoaDataInfoHistory(dataList) {
    let devTdoaDataInfo = dataList[taDataInfoIndex];
    if (new Date(devTdoaDataInfo.reportTime).getTime() <= replayCurrentTime) {
        PrasingHistoryTaDataInfo.showTaDataInfo(devTdoaDataInfo);
        taDataInfoIndex = taDataInfoIndex + 1;
        if (taDataInfoIndex < dataList.length) {
            if (new Date(dataList[taDataInfoIndex].reportTime).getTime() <= replayCurrentTime) {
                devTdoaDataInfoHistory(dataList);
            }
        }
    }
}

/* 绘制Ta Draw信息 */
function devTdoaDrawInfoHistory(dataList) {
    let devTdoaDrawInfo = dataList[taDrawInfoIndex];
    if (new Date(devTdoaDrawInfo.reportTime).getTime() <= replayCurrentTime) {
        PrasingTaDrawInfo.showTaDrawInfo(devTdoaDrawInfo);
        taDrawInfoIndex = taDrawInfoIndex + 1;
        if (taDrawInfoIndex < dataList.length) {
            if (new Date(dataList[taDrawInfoIndex].reportTime).getTime() <= replayCurrentTime) {
                devTdoaDrawInfoHistory(dataList);
            }
        }
    }
}

function add0(val) {
    if (val >= 10) {
        return '' + val;
    } else {
        return '0' + val;
    }
}

function showHistory(dataMap) {
    /* 设定时间*/
    $('.continous-time-value').html(`
        ${add0(new Date((replayCurrentTime - caseStartTime < 0 ? 0 : replayCurrentTime - caseStartTime) - 8 * 3600 * 1000).getHours())}:${add0(new Date((replayCurrentTime - caseStartTime < 0 ? 0 : replayCurrentTime - caseStartTime) - 8 * 3600 * 1000).getMinutes())}:${add0(new Date((replayCurrentTime - caseStartTime < 0 ? 0 : replayCurrentTime - caseStartTime) - 8 * 3600 * 1000).getSeconds())}
    `);
    /**add by gaochao start */
    $('.case-time').html(`
        ${add0(new Date((replayCurrentTime - caseStartTime < 0 ? 0 : replayCurrentTime - caseStartTime) - 8 * 3600 * 1000).getHours())}:${add0(new Date((replayCurrentTime - caseStartTime < 0 ? 0 : replayCurrentTime - caseStartTime) - 8 * 3600 * 1000).getMinutes())}:${add0(new Date((replayCurrentTime - caseStartTime < 0 ? 0 : replayCurrentTime - caseStartTime) - 8 * 3600 * 1000).getSeconds())}
    `);
    /**add by gaochao end */
    replayCurrentTime = replayCurrentTime + 1000;
    if (replayCurrentTime < caseEndTime) {
        TimeLine.updateTimeLine(replayCurrentTime);
        //try {
        if (dataMap.historyDevBaseInfoList.length > 0 && devIndex <= dataMap.historyDevBaseInfoList.length - 1) {
            devHistory(dataMap.historyDevBaseInfoList);
        }
        //} catch (e) { console.error(e) }
        try {
            if (dataMap.historyDevActiveDetailInfoList && dataMap.historyDevActiveDetailInfoList.length > 0 && devActiveDetailInfoIndex <= dataMap.historyDevActiveDetailInfoList.length - 1) {
                devActiveDetailInfoHistory(dataMap.historyDevActiveDetailInfoList);
            }
        } catch (e) { console.error(e) }
        try {
            if (dataMap.historyBtsInfoList.length > 0 && btsIndex <= dataMap.historyBtsInfoList.length - 1) {
                btsHistory(dataMap.historyBtsInfoList);
            }
        } catch (e) { console.error(e) }
        try {
            if (dataMap.historyDevStateInfoList.length > 0 && statusIndex <= dataMap.historyDevStateInfoList.length - 1) {
                statusHistory(dataMap.historyDevStateInfoList);
            }
        } catch (e) { console.error(e) }
        try {
            if (dataMap.historyTargetCellInfoList.length > 0 && targetCellInfoIndex <= dataMap.historyTargetCellInfoList.length - 1) {
                targetCellHistory(dataMap.historyTargetCellInfoList);
            }
        } catch (e) { console.error(e) }
        try {
            if (dataMap.historyCatchInfoList && dataMap.historyCatchInfoList.length > 0 && lteCatchInfoIndex <= dataMap.historyCatchInfoList.length - 1) {
                lteCatchInfoHistory(dataMap.historyCatchInfoList);
            }
        } catch (e) { console.error(e) }
        // try {
        //     if (dataMap.historyDevActiveDetailInfoList && dataMap.historyDevActiveDetailInfoList.length > 0 && devActiveDetailInfoIndex <= dataMap.historyDevActiveDetailInfoList.length - 1) {
        //         devActiveDetailInfoHistory(dataMap.historyDevActiveDetailInfoList);
        //     }
        // } catch (e) { console.error(e) }
        try {
            if (dataMap.historyDevTdoaDataInfoList && dataMap.historyDevTdoaDataInfoList.length > 0 && taDataInfoIndex <= dataMap.historyDevTdoaDataInfoList.length - 1) {
                devTdoaDataInfoHistory(dataMap.historyDevTdoaDataInfoList);
            }
        } catch (e) { console.error(e) }
        try {
            if (dataMap.historyDevTdoaDrawInfoList && dataMap.historyDevTdoaDrawInfoList.length > 0 && taDrawInfoIndex <= dataMap.historyDevTdoaDrawInfoList.length - 1) {
                devTdoaDrawInfoHistory(dataMap.historyDevTdoaDrawInfoList);
            }
        } catch (e) { console.error(e) }
        /**add by gaochao start */
        try {
            if (dataMap.historyPreLockCellInfoList.length > 0 && devPreLockCellInfoIndex <= dataMap.historyPreLockCellInfoList.length - 1) {
                preLockCellHistory(dataMap.historyPreLockCellInfoList);
            }
        } catch (e) { console.error(e) }
        /**add by gaochao end*/
        MyCookie.setCookie('combatReplayPlayTimeCache', replayCurrentTime, 365);
    } else {
        replayEnd();
    }
}

/* 时间轴hover显示tips*/
let mouseMoveShowTips = function (e) {
    $('.time-line-mouse-tips').html(new Date(caseStartTime + (caseEndTime - caseStartTime) * (e.offsetX / $(this).width())).Format('hh:mm:ss'));
    $('.time-line-mouse-tips').css('left', e.offsetX + 'px');
}
$(document).on('mouseover mouseout', '.time-line-progress', function (e) {
    if (e.type == "mouseover") {
        //鼠标悬浮
        this.addEventListener('mousemove', mouseMoveShowTips);
        $('.time-line-mouse-tips').css('display', 'block');
    } else if (e.type == "mouseout") {
        //鼠标离开
        this.removeEventListener('mousemove', mouseMoveShowTips);
        $('.time-line-mouse-tips').css('display', 'none');
    }
});

/* 优化时间轴拖动*/
$(document).on('mousedown', '.time-line-slider', function () {
    timeLineSlidertIsPressed = true;
});

/* 时间轴点击事件*/
$(document).on('click', '#time-line-click-cover', function (e) {
    /* 暂停回放*/
    if (timer != null) {
        clearInterval(timer);
        timer = null;
    }
    if (playStatus != 0) {
        /**add by gaochao start */
        // $('#play-btn').html('播放');
        $('.play-btn-container').css('background', 'url(img/icon/play.png)');
        /**add by gaochao end */
        $('#time-line-progress').removeClass('active');
    }
    playStatus = 2;
    /* 放置刻度值*/
    let clickLeftPerc = (e.offsetX / $(this).width()) * 100;
    if ($('.time-line-divider-container').width() < (clickLeftPerc / 100) * $('.time-line-container').width()) {
        $('.time-line-marker').css('left', 100 * ($('.time-line-divider-container').width() / $('.time-line-container').width()) * ((caseEndTime - caseStartTime) / (timeDividerCount * 60 * 1000)) + '%');
    } else {
        $('.time-line-marker').css('left', clickLeftPerc + '%');
    }
    timeLineMarketIsClicked = true;
    /* 获取刻度时间，并绘制影子*/
    TimeLine.devHistoryShadow(TimeLine.getMarkerTime());
    $('.view-default-btn-bg').css('background-position', '-210px -30px');
});

function hrefPlayTime(hrefTime) {
    replayCurrentTime = hrefTime;
    /* 设置进度条*/
    let progressNewPerc = (1 - (caseEndTime - hrefTime) / (caseEndTime - caseStartTime)) * 100;
    $('#time-line-progress').css('width', progressNewPerc + '%');
    /* 设置时间轴*/
    let count = 0;
    count = (hrefTime - caseStartTime) / 1000;
    $('.time-line-blue-cover').css('width', '0%');
    let blueCoverWidthCache = $('.time-line-blue-cover').width();
    blueCoverWidthCache = blueCoverWidthCache + ($('.time-line-container').width() * 0.025 / 60) * count;
    $('.time-line-blue-cover').css('width', (blueCoverWidthCache / $('.time-line-divider-container').width()) * 100 + '%');
    TimeLine.resetTimeLineMarker();
    if ($('.time-line-divider-container').width() > $('.time-line-container').width() && parseFloat($('.time-line-marker').css('left')) / $('.time-line-container').width() >= 0.875) {
        if (($('.time-line-divider-container').width() - $('.time-line-blue-cover').width()) / $('.time-line-container').width() > 0.125) {
            $('.time-line-divider-container').css('left', -$('.time-line-blue-cover').width() + $('.time-line-container').width() * 0.875);
            $('.eng-column-chart-container').css('left', -$('.time-line-blue-cover').width() + $('.time-line-container').width() * 0.875);
        } else {
            $('.time-line-divider-container').css('left', -$('.time-line-divider-container').width() + $('.time-line-container').width());
            $('.eng-column-chart-container').css('left', -$('.time-line-divider-container').width() + $('.time-line-container').width());
        }
        TimeLine.resetTimeLineMarker();
        /* 修改滑动条*/
        $('.time-line-slider').rangeSlider('option', 'range', {
            min: ($('.time-line-container').width() / $('.time-line-divider-container').width()) * 100,
            max: ($('.time-line-container').width() / $('.time-line-divider-container').width()) * 100
        });
        /* 手动设置滑动条位置*/
        $('.ui-rangeSlider-bar').css('left', $('.ui-rangeSlider-container').width() * (($('.time-line-divider-container').width() - $('.time-line-container').width() + parseFloat($('.time-line-divider-container').css('right'))) / $('.time-line-divider-container').width()));
        $('.ui-rangeSlider-leftHandle').css('left', $('.ui-rangeSlider-container').width() * (($('.time-line-divider-container').width() - $('.time-line-container').width() + parseFloat($('.time-line-divider-container').css('right'))) / $('.time-line-divider-container').width()));
        $('.ui-rangeSlider-rightHandle').css('left', $('.ui-rangeSlider-container').width() * (1 + parseFloat($('.time-line-divider-container').css('right')) / $('.time-line-divider-container').width()) - 6);
    }
    /* 清空地图*/
    map.clearOverlays();
    if (endMarker != null) {
        map.addOverlay(endMarker)
    }
    /* 清空LTE Catch信息面板 */
    $(`.target-lte-info-content-container`).html('');
    /* 清空设备主动式详细信息面板 */
    $(`#active-info-content-infoArea`).html('');
    $(`.history-energy`).html('');
    $(`.ta-info-table`).html('');
    /* 重绘覆盖物*/
    DrawHrefLoadingOverlay.drawLoding(hrefTime);
    /* 设置右下角时间*/
    $('.continous-time-value').html(`
        ${add0(new Date((replayCurrentTime - caseStartTime < 0 ? 0 : replayCurrentTime - caseStartTime) - 8 * 3600 * 1000).getHours())}:${add0(new Date((replayCurrentTime - caseStartTime < 0 ? 0 : replayCurrentTime - caseStartTime) - 8 * 3600 * 1000).getMinutes())}:${add0(new Date((replayCurrentTime - caseStartTime < 0 ? 0 : replayCurrentTime - caseStartTime) - 8 * 3600 * 1000).getSeconds())}
    `);
    /**add by gaochao start */
    $('.case-time').html(`
    ${add0(new Date((replayCurrentTime - caseStartTime < 0 ? 0 : replayCurrentTime - caseStartTime) - 8 * 3600 * 1000).getHours())}:${add0(new Date((replayCurrentTime - caseStartTime < 0 ? 0 : replayCurrentTime - caseStartTime) - 8 * 3600 * 1000).getMinutes())}:${add0(new Date((replayCurrentTime - caseStartTime < 0 ? 0 : replayCurrentTime - caseStartTime) - 8 * 3600 * 1000).getSeconds())}
    `);
    /**add by gaochao end */
    MyCookie.setCookie('combatReplayPlayTimeCache', replayCurrentTime, 365);
}

/* 开始按钮*/
$('#play-btn').click(function () {
    switch (playStatus) {
        case 0: // 停止状态
            if (replayCurrentTime == 0) {
                /* 在开始之前清空界面与变量缓存*/
                map.clearOverlays();
                if (endMarker != null) {
                    map.addOverlay(endMarker)
                }
                /* 设置案件开始时间*/
                caseStartTime = combatReplayBeanQueryCache.startTime;
                /* 设置案件结束时间*/
                caseEndTime = combatReplayBeanQueryCache.endTime;
                /* 重置页面*/
                Panel.removeAllDev();
                $('.continous-time-value').html('00:00:00');
                /**add by gaochao start */
                $('.case-time').html('00:00:00');
                /**add by gaochao end */
                /* 重绘时间轴*/
                $('.time-line-area').html(`
                    <div class="progress time-line-progress">
                        <div class="progress-bar progress-bar-striped" id="time-line-progress" style="cursor: pointer; transition: width 0s !important;" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 0%">
                        </div>
                    </div>
                    <div class="eng-column-chart"></div>
                    <div class="time-line-container">
                        <div class="time-line-divider-container">
                            <div class="time-line-blue-cover"></div>
                        </div>
                        <div class="time-line-marker"></div>
                        <div id="time-line-click-cover" style="width: 100%; height: 100%; position: absolute;"></div>
                    </div>
                    <div class="time-line-slider"></div>
                    <div class="time-line-start-time">${new Date(caseStartTime).Format('hh:mm')}</div>
                    <div class="time-line-end-time">${new Date(caseEndTime).Format('hh:mm')}</div>
                    <div class="time-line-mouse-tips"></div>
                `);
                TimeLine.initTimeLine(caseStartTime, caseEndTime);
                TimeLine.resetTimeLineMarker();
                /* 重绘页面面板*/
                for (let i = 0; i < historyInfoCache.historyDevBaseInfoList.length; i++) {
                    if (devDrawInfoMap.get(historyInfoCache.historyDevBaseInfoList[i].devCode) == null) {
                        Panel.addNewDev(historyInfoCache.historyDevBaseInfoList, i);
                    }
                }
                /* 如果只有一台设备，就不显示单兵A/车载A*/
                let carDevNum = 0;
                let singleDevNum = 0;
                devDrawInfoMap.forEach((eachDev) => {
                    switch (eachDev.devType) {
                        case 1:
                            carDevNum = carDevNum + 1;
                            break;
                        case 2:
                            singleDevNum = singleDevNum + 1;
                            break;
                        default:
                            break;
                    }
                });
                if (carDevNum < 2) {
                    $('.team-each-dev-index-car').css('display', 'none');
                }
                if (singleDevNum < 2) {
                    $('.team-each-dev-index-single').css('display', 'none');
                }
                /* 设置用户名信息*/ //userInfosCache
                let userHtml = '';
                for (let i = 0; i < userInfosCache.length; i++) {
                    userHtml = userHtml + `${userInfosCache[i].username}/${userInfosCache[i].handleSeq} `;
                    $(`.user-name-value-by-id-${userInfosCache[i].id}`).html(`${userInfosCache[i].realname}`);
                    $(`.user-name-value-by-id-${userInfosCache[i].id}`).attr('title', `${userInfosCache[i].realname}`);
                    if (userInfosCache[i].headAddr != null && userInfosCache[i].headAddr != "") {
                        $(`.user-name-value-by-id-${userInfosCache[i].id}-photo`).css('background', `url(${userInfosCache[i].headAddr})no-repeat`);
                        $(`.user-name-value-by-id-${userInfosCache[i].id}-photo`).css('background-size', 'cover');
                    }
                    devDrawInfoMap.forEach((eachDev) => {
                        if (eachDev.userId == userInfosCache[i].id && eachDev.userName == null) {
                            devDrawInfoMap.get(eachDev.devCode).userName = userInfosCache[i].username;
                            devDrawInfoMap.get(eachDev.devCode).realName = userInfosCache[i].realname;
                            devDrawInfoMap.get(eachDev.devCode).headAddr = userInfosCache[i].headAddr;
                        }
                    });
                }
                $('#case-users').html(userHtml);
                $('#case-users').attr('title', $('#case-users').html());
                /* 发送回执归零*/
                $('#sms-send-value').html('0');
                $('#sms-finish-value').html('0');
                $('#sms-receipt-value').html('0');
                /* 填充能量条*/
                EngColumnChartContainer.init(historyInfoCache.historyDevBaseInfoList);
                /* 设置当前时间*/
                replayCurrentTime = caseStartTime;
                /* 放置初始设备*/
                let firstDevInfo = ParsingData.FormatDevData(historyInfoCache.historyDevBaseInfoList[0]);
                ParsingDevInfoCR.parsingDevInfo(firstDevInfo, false);
            }
            /* */
            /* 调用绘制方法*/
            showHistory(historyInfoCache);
            timer = setInterval(() => { showHistory(historyInfoCache) }, 1000 / playSpeed);
            /* 设置地图中心*/
            let defaultLng = historyInfoCache.historyDevBaseInfoList[0].lng;
            let defaultLat = historyInfoCache.historyDevBaseInfoList[0].lat;
            let pointFirst = GPSToBaiduPoint.getBaiduPointLocation([[defaultLng, defaultLat]]);
            map.centerAndZoom(new BMap.Point(pointFirst[0].lng, pointFirst[0].lat), 19);
            playStatus = 1;
            /**add by gaochao start */
            // $('#play-btn').html('暂停');
            $('.play-btn-container').css('background', 'url(img/icon/pause.png)');
            /**add by gaochao end */
            $('#time-line-progress').addClass('active');
            break;
        case 1: // 开始状态，暂停播放
            clearInterval(timer);
            timer = null;
            playStatus = 2;
            /**add by gaochao start */
            // $('#play-btn').html('播放');
            $('.play-btn-container').css('background', 'url(img/icon/play.png)');
            /**add by gaochao end */
            $('#time-line-progress').removeClass('active');
            break;
        case 2: // 暂停状态，继续播放
            playStatus = 1;
            /**add by gaochao start */
            // $('#play-btn').html('暂停');
            $('.play-btn-container').css('background', 'url(img/icon/pause.png)');
            /**add by gaochao end */
            $('#time-line-progress').addClass('active');
            /**add by gaochao start */
            $('.activedev-info-value').html("");
            $('.activedev-info-time').html("");
            btsActiveCache = null;
            $('.time-line-slider').rangeSlider('option', 'range', {
                min: ($('.time-line-container').width() / $('.time-line-divider-container').width()) * 100,
                max: ($('.time-line-container').width() / $('.time-line-divider-container').width()) * 100
            });
            /**add by gaochao end */

            if (timeLineMarketIsClicked) {
                /* 获取刻度尺对应时间*/
                hrefPlayTime(new Date(TimeLine.getMarkerTime()).getTime());
                /* 重置刻度尺*/
                TimeLine.resetTimeLineMarker();
                timeLineMarketIsClicked = false;
                $('.view-default-btn-bg').css('background-position', '-180px -30px');
                let isHrefPlayFinistInterval = setInterval(() => {
                    if (historyRouteLineIsFinish) {
                        clearInterval(isHrefPlayFinistInterval);
                        isHrefPlayFinistInterval = false;
                        showHistory(historyInfoCache);
                        if (replayCurrentTime > 0) {
                            timer = setInterval(() => { showHistory(historyInfoCache) }, 1000 / playSpeed);
                        }
                    }
                }, 50);
            } else {
                showHistory(historyInfoCache);
                if (replayCurrentTime > 0) {
                    timer = setInterval(() => { showHistory(historyInfoCache) }, 1000 / playSpeed);
                }
            }
            break;
        default:
            break;
    }
});

function replayEnd() {
    /* 停止定时器*/
    clearInterval(timer);
    timer = null;
    /* 各参数归零*/
    devIndex = 0;
    btsIndex = 0;
    statusIndex = 0;
    heatmapIndex = 0;
    targetCellInfoIndex = 0;
    /**add by gaochao start */
    devPreLockCellInfoIndex = 0;
    /**add by gaochao end*/
    lteCatchInfoIndex = 0;
    devActiveDetailInfoIndex = 0;
    taDataInfoIndex = 0;
    taDrawInfoIndex = 0;
    devActiveEngInfoLogCatch = [];
    lastDevActiveEngInfoReportTime = 0;
    devTdoaDataInfoLogCatch = [];
    taCircleProdOverlayCache = [];
    taCircleDebugOverlayCache = [];
    taPointsProdOverlayCache = [];
    taPointsDebugOverlayCache = [];
    taPolygonProdOverlayCache = [];
    taPolygonDebugOverlayCache = [];
    lastTaDataInfoReportTime = 0;
    usedSec = 0;
    replayCurrentTime = 0;
    playStatus = 0;
    /**add by gaochao start */
    // $('#play-btn').html('播放');
    $('.play-btn-container').css('background', 'url(img/icon/play.png)');
    /**add by gaochao end */
    $('#play-btn').removeAttr('disabled');
    $('#replay-end-modal').modal('hide');
    /** */
    $('#time-line-progress').removeClass('active');
    MyCookie.deleteCookie('combatReplayPlayTimeCache');
}

/* 设置播放速度*/
$('.speed-value').click((e) => {
    playSpeed = e.currentTarget.children[0].innerText;
    if (Number(playSpeed) > 1) {
        engAudioType = 3;
        $('#eng-audio-selector').addClass('gray-cover');
    } else {
        engAudioType = engAudioTypeCache;
        $('#eng-audio-selector').removeClass('gray-cover');
    }
    $('#speed-value').html('速度&nbsp;x' + playSpeed + ' <span class="caret"></span>');
    if (playStatus == 1) {
        clearInterval(timer);
        if (replayCurrentTime > 0) {
            timer = setInterval(() => { showHistory(historyInfoCache) }, 1000 / playSpeed);
        }
    }
});
/**add by gaochao start */
$('.speed-switch-btn').click(function (e) {
    $('.speed-switch-content').toggle();
    e = e || event;
    stopFunc(e);

});

document.onclick = function (e) {
    $(".speed-switch-content").hide();
}

function stopFunc(e) {
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
}

$('.speed-switch-item').click((e) => {
    playSpeed = e.currentTarget.children[0].innerText;
    if (Number(playSpeed) > 1) {
        engAudioType = 3;
        $('#eng-audio-selector').addClass('gray-cover');
    } else {
        engAudioType = engAudioTypeCache;
        $('#eng-audio-selector').removeClass('gray-cover');
    }
    $('.speed-switch-btn').html('<div class="speed-switch-value">X<span>' + playSpeed + '</span></div><div class="speed-switch-dropup"></div>');
    $('.speed-switch-content').hide();
    if (playStatus == 1) {
        clearInterval(timer);
        if (replayCurrentTime > 0) {
            timer = setInterval(() => { showHistory(historyInfoCache) }, 1000 / playSpeed);
        }
    }
});
/**add by gaochao end */
/* 高级面板设备切换*/
$(document).on('click', '.advance-info-panel-selector-item', function () {
    let selectedDevCode = $(this).attr('data-dev-code');
    $('.advance-info-content').css('display', 'none');
    $(`.advance-info-content-${selectedDevCode}`).css('display', 'block');
    $('#default-advance-info-panel-dev').html(`
        ${selectedDevCode}&nbsp;<span style="color: #566ae2">${devDrawInfoMap.get(selectedDevCode).userName}</span> <span class="caret"></span>
    `);
});

/* 结束观看*/
$('#reset-search-submit').click(function () {
    if (timer != null) {
        clearInterval(timer);
        timer = null;
    }
    MyCookie.deleteCookie('combatReplayPlayTimeCache');
    MyCookie.deleteCookie('combatReplayQueryCache');
    window.location.reload();
});

/* hover显示基站id */
let hoverShowBtsId = function () {
    if (event.type == 'mouseover') {
        $('.bts-value-' + $(this).attr('data-bts-id')).css('display', 'block');
    } else if (event.type == 'mouseout') {
        $('.bts-value-' + $(this).attr('data-bts-id')).css('display', 'none');
    }
}
$(document).on('mouseover mouseout', '.bts-img, .bts-hit-count, .multi-sub-bts-img', '.bts-search-img', hoverShowBtsId);

/* 目标点击显示详细信息*/
$(document).on('click', '.endMarker-img, .endMarker-info-panel-close', function () {
    if ($(`.endMarkerIcon`).attr('data-open-status') == 'open') {
        /* 关闭*/
        $(`.endMarkerIcon`).attr('data-open-status', 'close');
        $(`.endMarker-info-panel`).css('display', 'none');
        $(`.endMarkerIcon`).css('z-index', $(`.endMarkerIcon`).attr('z-index-temp'));
    } else {
        /* 打开*/
        $(`.endMarkerIcon`).attr('z-index-temp', $(`.endMarkerIcon`).css('z-index'));
        $(`.endMarkerIcon`).attr('data-open-status', 'open');
        $(`.endMarker-info-panel`).css('display', 'block');
        $(`.endMarkerIcon`).css('z-index', 9000);
    }
});
/* 基站点击显示详细信息*/
$(document).on('click', '.bts-img, .bts-hit-count, .bts-info-panel-close', function () {
    let clickedBtsId = $(this).attr('data-bts-id');
    if ($(`.bts-click-${clickedBtsId}`).attr('data-open-status') == 'open') {
        /* 关闭*/
        $(`.bts-click-${clickedBtsId}`).attr('data-open-status', 'close');
        $(`.bts-selectedCircle-${clickedBtsId}`).css('display', 'none');
        $(`.bts-info-panel-${clickedBtsId}`).css('display', 'none');
        $(`.bts-click-${clickedBtsId}`).css('z-index', $(`.bts-click-${clickedBtsId}`).attr('z-index-temp'));
    } else {
        /* 打开*/
        $(`.bts-click-${clickedBtsId}`).attr('z-index-temp', $(`.bts-click-${clickedBtsId}`).css('z-index'));
        $(`.bts-click-${clickedBtsId}`).attr('data-open-status', 'open');
        $(`.bts-selectedCircle-${clickedBtsId}`).css('display', 'block');
        $(`.bts-info-panel-${clickedBtsId}`).css('display', 'block');
        $(`.bts-click-${clickedBtsId}`).css('z-index', 9000);
    }
});
/*复合基站点击显示详细信息*/
$(document).on('click', '.multi-bts-img, .multi-bts-hit-count, .multi-bts-info-panel-close', function () {
    let clickedBtsId = $(this).attr('data-bts-id');
    if ($(`.multi-bts-click-${clickedBtsId}`).attr('data-open-status') == 'open') {
        /* 关闭*/
        $(`.multi-bts-click-${clickedBtsId}`).attr('data-open-status', 'close');
        $(`.multi-bts-info-panel-${clickedBtsId}`).attr('data-open-status', 'close');
        $(`.multi-bts-selectedCircle-${clickedBtsId}`).css('display', 'none');
        $(`.multi-bts-info-panel-${clickedBtsId}`).css('display', 'none');
        $(`.multi-bts-click-${clickedBtsId}`).css('z-index', '5000');
    } else {
        /* 打开*/
        $(`.multi-bts-click-${clickedBtsId}`).attr('data-open-status', 'open');
        $(`.multi-bts-info-panel-${clickedBtsId}`).attr('data-open-status', 'open');
        $(`.multi-bts-selectedCircle-${clickedBtsId}`).css('display', 'block');
        $(`.multi-bts-info-panel-${clickedBtsId}`).css('display', 'block');
        let offsetWidth = '-' + ($(`.multi-bts-info-panel-${clickedBtsId}`).children().eq(0).width() / 2 + 23) + 'px'
        $(`.multi-bts-info-panel-${clickedBtsId}`).children().eq(0).css('left', offsetWidth)
        $(`.multi-bts-click-${clickedBtsId}`).css('z-index', '8100');
    }
});
/* 复合基站子基站点击显示详细信息*/
$(document).on('click', '.multi-sub-bts-img, .multi-sub-bts-hit-count, .multi-sub-bts-info-panel-close', function () {
    let clickedBtsId = $(this).attr('data-bts-id');
    if ($(`.multi-sub-bts-click-${clickedBtsId}`).attr('data-open-status') == 'open') {
        /* 关闭*/
        $(`.multi-sub-bts-click-${clickedBtsId}`).attr('data-open-status', 'close');
        $(`.multi-sub-bts-selectedCircle-${clickedBtsId}`).css('display', 'none');
        $(`.multi-sub-bts-info-panel-${clickedBtsId}`).css('display', 'none');
        $(`.multi-sub-bts-click-${clickedBtsId}`).css('z-index', $(`.multi-sub-bts-click-${clickedBtsId}`).attr('z-index-temp'));
    } else {
        /* 打开*/
        $(`.multi-sub-bts-click-${clickedBtsId}`).attr('z-index-temp', $(`.multi-sub-bts-click-${clickedBtsId}`).css('z-index'));
        $(`.multi-sub-bts-click-${clickedBtsId}`).attr('data-open-status', 'open');
        $(`.multi-sub-bts-selectedCircle-${clickedBtsId}`).css('display', 'block');
        $(`.multi-sub-bts-info-panel-${clickedBtsId}`).css('display', 'block');
    }
});

/* 搜索基站点击显示详细信息*/
$(document).on('click', '.bts-search-img, .bts-info-panel-search-close', function () {
    let clickedBtsId = $(this).attr('data-bts-id');
    if ($(`.bts-click-search-${clickedBtsId}`).attr('data-open-status') == 'open') {
        /* 关闭*/
        $(`.bts-click-search-${clickedBtsId}`).attr('data-open-status', 'close');
        $(`.bts-selectedCircle-${clickedBtsId}`).css('display', 'none');
        $(`.bts-info-search-panel-${clickedBtsId}`).css('display', 'none');
        $(`.bts-click-search-${clickedBtsId}`).css('z-index', $(`.bts-click-search-${clickedBtsId}`).attr('z-index-temp'));
    } else {
        /* 打开*/
        $(`.bts-click-search-${clickedBtsId}`).attr('z-index-temp', $(`.bts-click-search-${clickedBtsId}`).css('z-index'));
        $(`.bts-click-search-${clickedBtsId}`).attr('data-open-status', 'open');
        $(`.bts-selectedCircle-${clickedBtsId}`).css('display', 'block');
        $(`.bts-info-search-panel-${clickedBtsId}`).css('display', 'block');
        $(`.bts-click-search-${clickedBtsId}`).css('z-index', 9000);
    }
});

/* 基站范围显示*/
$(document).on('click', '.show-range-button', function () {
    let clickedBtsId = $(this).attr('data-bts-id');
    if ($(this).attr('data-open-status') == 'open') {
        /* 关闭*/
        $(this).attr('data-open-status', 'close');
        $(this).html('显示半径');
        map.removeOverlay(btsDivMap.get(clickedBtsId).btsRadius);
        btsDivMap.get(clickedBtsId).btsRadius = null;
    } else {
        /* 打开*/
        $(this).attr('data-open-status', 'open');
        $(this).html('隐藏半径');
        drawBtsRange(clickedBtsId);
    }
});
/* 绘制基站覆盖范围 */
function drawBtsRange(btsId) {
    let btsInfo = btsInfoMap.get(btsId);
    let currentPoint = GPSToBaiduPoint.getBaiduPointLocation([[btsInfo.lng, btsInfo.lat]])[0];
    let btsRangeCircle = new BMap.Circle(
        new BMap.Point(btsInfo.lng, btsInfo.lat), btsInfo.radius,
        {
            strokeColor: "red",
            strokeWeight: 1,
            strokeOpacity: 0.3,
            fillColor: "red",
            fillOpacity: "0.05"
        }
    );
    btsDivMap.get(btsId).btsRadius = btsRangeCircle;
    map.addOverlay(btsRangeCircle);
}

/* 基站范围显示*/
$(document).on('click', '#show-range-button-search', function () {
    let clickedBtsId = $(this).attr('data-bts-id');
    if ($(this).attr('data-open-status') == 'open') {
        /* 关闭*/
        $(this).attr('data-open-status', 'close');
        $(this).html('显示半径');
        map.removeOverlay(btsSearchDivMap.get(clickedBtsId).btsRangeCircle);
    } else {
        /* 打开*/
        $(this).attr('data-open-status', 'open');
        $(this).html('隐藏半径');
        drawSearchBtsRanges(clickedBtsId);
    }
});

/* 绘制基站覆盖范围 */
function drawSearchBtsRanges(btsId) {
    let btsRadius = btsSearchDivMap.get(btsId).btsRadius;
    //坐标转换
    let currentPoint = GPSToBaiduPoint.getBaiduPointLocation([[btsSearchDivMap.get(btsId).lng, btsSearchDivMap.get(btsId).lat]])[0];
    let lat = currentPoint.lat;
    let lng = currentPoint.lng;
    let btsRangeCircle = new BMap.Circle(
        new BMap.Point(lng, lat), btsRadius,
        {
            strokeColor: "red",
            strokeWeight: 1,
            strokeOpacity: 0.3,
            fillColor: "red",
            fillOpacity: "0.05"
        }
    );

    btsSearchDivMap.get(btsId).btsRangeCircle = btsRangeCircle;
    map.addOverlay(btsRangeCircle);
}

/* 能量指示悬浮*/
$(document).on('mouseover mouseout', '.energy-arrow-hover', function (e) {
    if (e.type == 'mouseover') {
        $($(this).next()).css('display', 'block');
    } else if (e.type == 'mouseout') {
        $($(this).next()).css('display', 'none');
    }
});

/* 隐藏地图版权信息*/
$('#allmap').css('height', $(window).height() + 60);
window.addEventListener('resize', function () {
    $('#allmap').css('height', $(window).height() + 60);
}, false);
/* add by guoshuai start */
/*打开关闭ta各类信息模态框*/
$(document).on('click', '.active-info-container-close', function () {
    $('.active-info-container').slideUp(50);
});
$(document).on('click', '.activedev-info-icon', function () {
    $('.active-info-container').slideDown(50);
});
$(document).on('click', '.historical-energy-container-close', function () {
    $('.historical-energy-container').slideUp(50);
});
$(document).on('click', '.activedev-history-energy-open', function () {
    $('.historical-energy-container').slideDown(50);
});
$(document).on('click', '.ta-info-container-close', function () {
    $('.ta-info-container').slideUp(50);
    $('.dev-gps-span').css('display', 'none');
    $('.bts-gps-span').css('display', 'none');
});
$(document).on('click', '.CR-ta-target-info', function () {
    $('.ta-info-container').slideDown(50);
    $('.target-lte-info-container').slideDown(50);
});
$(document).on('click', '.target-lte-info-container-close', function () {
    $('.target-lte-info-container').slideUp(50);
});
/*点击gps图标显示gps信息*/
$(document).on('click', '.show-dev-gps', function () {
    if ($(this).attr('data-dev-gps-show-status') == 0) {
        $(this).children(".dev-gps-span").show();
        $(this).attr('data-dev-gps-show-status', 1)
    } else if ($(this).attr('data-dev-gps-show-status') == 1) {
        $(this).children(".dev-gps-span").hide();
        $(this).attr('data-dev-gps-show-status', 0)
    }
});
$(document).on('click', '.show-bts-gps', function () {
    if ($(this).attr('data-bts-gps-show-status') == 0) {
        $(this).children(".bts-gps-span").show();
        $(this).attr('data-bts-gps-show-status', 1)
    } else if ($(this).attr('data-bts-gps-show-status') == 1) {
        $(this).children(".bts-gps-span").hide();
        $(this).attr('data-bts-gps-show-status', 0)
    }
});
$(document).on('click', '.bts-gps-span', function (event) {
    event.stopPropagation();
});
$(document).on('click', '.dev-gps-span', function (event) {
    event.stopPropagation();
});
/* add by guoshuai end */
/**add by gaochao start */
$(document).on('click', '.ta-info-btn', function () {
    $('.ta-info-container').toggle();
});
$(document).on('click', '.target-lte-info-btn', function () {
    $('.target-lte-info-container').toggle();
});
$(document).on('click', '.target-lte-info-close', function () {
    $('.target-lte-info-container').toggle();
});
$(document).on('click', '.activedev-info-btn', function () {
    $('.active-info-container').toggle();
});
$(document).on('click', '.advance-info-container-close', function () {
    $('.advance-info-containers').toggle();
});
$(document).on('click', '.channel-info-btn', function () {
    $('.advance-info-containers').toggle();
});

$(document).on('click', '.active-info-switch-item', function () {
    let activeInfoSwitchId = $(this).attr('id');
    $('.active-info-switch-item').css({
        "background": "#fff",
        "color": "#2A8CFF"
    });
    if (activeInfoSwitchId == "active-info-baseinfo") {
        $('#active-info-baseinfo').css({
            "background": "#38A6FE",
            "color": "#ffffff"
        });
        $('.active-info-content').css("display", "block");
        $('.history-energy-info').css("display", "none");
    } else if (activeInfoSwitchId == "active-info-enghistory") {
        $('#active-info-enghistory').css({
            "background": "#38A6FE",
            "color": "#ffffff"
        });
        $('.active-info-content').css("display", "none");
        $('.history-energy-info').css("display", "block");
    }
});
/**add by gaochao end */
/**复制功能*/
var clipboard = new ClipboardJS('.clipboard');
clipboard.on('success', function (e) {
    // console.info('Action:', e.action);
    // console.info('Text:', e.text);
    // console.info('Trigger:', e.trigger);
    let options = {
        title: '基站ID已复制',
        trigger: 'manual',
        placement: 'right',
        //container: 'body',
    };
    $(e.trigger).tooltip(options);
    $(e.trigger).tooltip('show');
    e.clearSelection();
    setTimeout(function () {
    	$(e.trigger).tooltip('hide');
        $(".clipboard").tooltip('destroy');
    }, 1000);
});
clipboard.on('error', function (e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});
$(document).on('click', '.clipboard', function () {
    let text = $(this).attr("data-clipboard-text");
    if (text != undefined && text != null) {
        let activeStatus=  $(this).attr('active-status');
        MoveToBts(text,activeStatus);
    }
});
$(document).on('click', '.advance-info-list-content-GPS-img', function () {
    let text = $(this).attr("data-clipboard-text");
    if (text != undefined && text != null) {
        MoveToBts(text,'false');
    }
});

function MoveToBts(data,activeStatus) {
    let btsData = null;
    if (btsNowFlagMarker != null) {
        map.removeOverlay(btsNowFlagMarker);
    }
    if(activeStatus!="true"){
        let btsInfo = btsInfoMap.get(data);
        let multiBtsInfo = multiBtsInfoMap.get(data);
        if (multiBtsInfo != null) {
            btsData = multiBtsInfo;
        } else if (btsInfo != undefined && btsInfo != null) {
            let parentBtsId = btsInfo.parentBtsId;
            let parentBtsData = multiBtsInfoMap.get(parentBtsId);
            if (parentBtsData != undefined && parentBtsData != null) {
                btsData = parentBtsData;
            }
        }
        if (btsData != undefined && btsData != null) {
            mapFollowFlag = false;
            $('.view-lock-btn div').css("background", "url(img/icon/location.png)no-repeat");
            map.setCenter(new BMap.Point(btsData.lng, btsData.lat));
            map.setZoom(map.getZoom() - 1);
            map.setZoom(map.getZoom() + 1);
            let pt = new BMap.Point(btsData.lng, btsData.lat);
            let myIcon = new BMap.Icon("./img/nowView.png", new BMap.Size(50, 50));
            btsNowFlagMarker = new BMap.Marker(pt, { icon: myIcon });  // 创建标注
            map.addOverlay(btsNowFlagMarker);  // 将标注添加到地图中
            btsNowFlagLabel = new BMap.Label("点击隐藏",{offset:new BMap.Size(20,-10)});
            btsNowFlagMarker.setLabel(btsNowFlagLabel);
            btsNowFlagMarker.setOffset(new BMap.Size(6, -60));
            btsNowFlagLabel.hide();
            btsNowFlagMarker.setAnimation(BMAP_ANIMATION_BOUNCE);
            btsNowFlagMarker.addEventListener('click', function () {
                map.removeOverlay(btsNowFlagMarker);
                btsNowFlagMarker = null;
            });
            btsNowFlagMarker.addEventListener('mouseover', function () {
                btsNowFlagLabel.show();
            });
            btsNowFlagMarker.addEventListener('mouseout', function () {
                btsNowFlagLabel.hide();
            });
        } else {
            $('.tip-content').css("display", "block");
            setTimeout(function () {
                $('.tip-content').fadeOut(800);
            }, 1000);
        }
    }
}

$(document).on('click', '.advance-info-switch-item', function () {
    let advanceInfoSwitchId = $(this).attr('id');
    $('.advance-info-switch-item').css({
        "background": "#fff",
        "color": "#2A8CFF"
    });
    if (advanceInfoSwitchId == "advance-info-bts-model") {
        $('#advance-info-bts-model').css({
            "background": "#38A6FE",
            "color": "#ffffff"
        });
        $('.advance-info-bts-model-container').css("display", "block");
        $('.advance-info-bts-list-container').css("display", "none");
    } else if (advanceInfoSwitchId == "advance-info-bts-list") {
        $('#advance-info-bts-list').css({
            "background": "#38A6FE",
            "color": "#ffffff"
        });
        $('.advance-info-bts-model-container').css("display", "none");
        $('.advance-info-bts-list-container').css("display", "block");
    }
});

$(document).on('click', '#bts-search', function () {
    $('.search-bts-containers').toggle();
});

$(document).on('click', '.close_search_modal', function () {
    $('.search-bts-containers').toggle();
});
