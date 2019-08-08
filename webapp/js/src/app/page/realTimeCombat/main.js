import { BaiduMapDrawing } from '../../common/baiduMap/Drawing.BaiduMap.js';
import { BaiduMapDistance } from '../../common/baiduMap/Distance.BaiduMap.js';
import { TopHeader } from '../../common/topHeader/TopHeader.js';
import { MyCookie } from '../../common/cookie/MyCookie.js';
import { CommonUtil } from '../../common/util/CommonUtil.js';

import { DrawHistoryOverlay } from './overlay/DrawHistoryOverlay.js';
import { WebSocketConnection } from './websocket/WebSocketConnection.js';
import { WebSocketJSONProcess } from './websocket/WebSocketJSONProcess.js';
import { PrasingBtsInfo } from './parsing/PrasingBtsInfo.js';
import { DrawBtsEcharts } from './overlay/DrawBtsEcharts.js'

import { QueryRealTime } from './ajax/QueryRealTime.js';
import { DrawTable } from './table/DrawTable.js';

import { Switch } from './tool/Switch.js';
import { TimeLine } from './tool/TimeLine.js';
import { View } from './tool/View.js';

import { CarHistoryShadowOverlayConstructor } from './overlay/CarHistoryShadowOverlayConstructor.js';
import { SingleHistoryShadowOverlayConstructor } from './overlay/SingleHistoryShadowOverlayConstructor.js';
import { GPSToBaiduPoint } from '../../common/baiduMap/GPSToBaiduPoint.BaiduMap.js';
import { PrasingTaDataInfo } from './parsing/PrasingTaDataInfo.js';
import { PrasingChartMsgInfo } from './parsing/PrasingChartMsgInfo.js';

/* 自测数据*/
// let testDataJson = `
// `;
// $('.guide-frame').css('display', 'none');
// $('.map-area-container').css('display', 'block');
// caseStartTime = new Date('2018-06-27 10:46:03'); // 14.50.40
// TimeLine.initTimeLine();
//Switch.initSwitch();
//View.initViewPanel();
//DrawHistoryOverlay.drawHistory(JSON.parse(testDataJson).dataMap);*/
// $('.guide-frame').css('display', 'none');
// $('.map-area-container').css('display', '');

/* js版本号，判断服务器端是否已刷新*/
console.log('js.version=2.1.8999');
/* 生成顶部菜单 */
TopHeader.initHeader();
/* 加载鼠标绘制工具*/
BaiduMapDrawing.initDrawingTools(map);
/* 加载地图测距工具*/
BaiduMapDistance.initDistanceTools(map);
/* 设置默认页数*/
if (MyCookie.getCookie('realTimeCombatPageNum') != '') {
    pageItemNum = Number(MyCookie.getCookie('realTimeCombatPageNum'));
    $('.show-item-num').html(pageItemNum + '条');
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
    }
});
$('.top-header').hover(function () {
    if ($('#tool-pin').attr('data-is-pin') == 0) {
        /*delete by guoshuai 2018-10-23
        $('.top-map-tools-area').animate({ top: '50px' });
        */
        /*add by guoshuai start 2018-10-23*/
        $('.top-map-tools-area').animate({ top: '58px' });
        /*add by guoshuai end 2018-10-23*/
    }
}, function () {

});

/* 向导页自动搜索定时器*/
let autoSearch;

let RealTimeCombatBean = function (serialNum) {
    this.serialNum = serialNum;
}

/* 从session中获取的案件编号*/
console.log(combatvoCaseSerial);

if (combatvoCaseSerial != '') {
    /* 若session中的案件编号不为空，直接开始实时作战*/
    startCombat(new RealTimeCombatBean(combatvoCaseSerial));
} else {
    /* 页面加载时的首次搜索 */
    queryDefault();
    /* 向导页搜索按钮 */
    $('.guide-search-btn').click(function () {
        let isContinue = true;
        let realTimeVoCache = new RealTimeCombatGuideVo();
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
                    realTimeVoCache.userName = keyword;
                } else if (/[\u4e00-\u9fa5]/.test(keyword)) { // 城市
                    realTimeVoCache.areaName = keyword;
                } else {
                    isContinue = false;
                    $('#alert-modal-content').html('输入内容有误')
                    $('#alert-modal').modal('show');
                }
            }
        } else {
            /* 高级搜索*/
            let latestStartTime = $('#latest-start-time').val(); // 大于XX分钟，最晚开始时间
            let earliestStartTime = $('#earliest-start-time').val(); // 小于XX分钟，最早开始时间
            if (latestStartTime != '' || earliestStartTime != '') {
                if (/^[0-9]*[0-9]*$/.test(earliestStartTime) && /^[0-9]*[0-9]*$/.test(latestStartTime)) {
                    if (Number(earliestStartTime) > Number(latestStartTime)) {
                        realTimeVoCache.latestStartTime = (new Date(new Date().getTime() - Number(latestStartTime) * 60 * 1000)).Format("yyyy-MM-dd hh:mm:ss");
                        realTimeVoCache.earliestStartTime = new Date(new Date().getTime() - Number(earliestStartTime) * 60 * 1000).Format("yyyy-MM-dd hh:mm:ss");
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
            if ($('#query-user-name').val() != '') {
                realTimeVoCache.userName = $('#query-user-name').val(); // 作战成员
            }
            if ($('#query-area-code').val() != '') {
                realTimeVoCache.areaName = $('#query-area-code').val(); // 作战城市
            }

            if ($('#query-dev-code').val() != '') {
                realTimeVoCache.devCode = $('#query-dev-code').val(); // 设备编号
            }
            // console.log(realTimeVoCache);
        }
        if (isContinue) {
            query(realTimeVoCache);
            RealTimeCombatGuideVoCache = realTimeVoCache; // 缓存搜索结果，分页切换需使用
        }
    });

    /* 页面加载时默认搜索全部*/
    function queryDefault() {
        let realTimeVo = new RealTimeCombatGuideVo();
        query(realTimeVo);
    }

    /* 向导页公共搜索方法*/
    function query(data) {
        console.log(data);
        QueryRealTime.query(data).then((result) => {
            console.log(result);
            queryResultCache = result;
            if (result.retcode == 1 && result.dataList.length != 0 && result.dataList != null) {
                $('.no-data-realtime').css('display', 'none');
                $('#total-count').html(result.dataList.length);
                DrawTable.caseTable(result.dataList);
            } else {
                $('.no-data-realtime').css('display', 'block');
                /*add by guoshuai start */
                $('.view-data-block').hide();
                /*add by guoshuai start */
                $('#total-count').html(0);
                $('.M-box3').html('');
            }
        });
    }

    /* 定时任务，每30秒刷新实时作战向导页面板*/
    autoSearch = setInterval(() => {
        query(RealTimeCombatGuideVoCache);
    }, 1000 * 30);

    /* 选择每页显示数量 */
    $('.total-count-selector').click(function () {
        pageItemNum = this.childNodes[0].innerHTML;
        /* 设置cookie*/
        MyCookie.setCookie('realTimeCombatPageNum', pageItemNum, 365);
        $('.show-item-num').html(pageItemNum + '条');
        if (queryResultCache.dataSet != null) {
            DrawTable.caseTable(result.dataSet);
        }
    });
    /*------------END------------实时作战向导页----------------------------*/
}

/* 打开websocket*/
function openWebsocket() {
    let webSocketUrl = [
        'ws:' + projectUrl + '/websocket/realTime',
        'ws:' + projectUrl + '/websocket/realTime',
        'ws:' + projectUrl + '/sockjs/websocket/realTime'
    ];
    let webSocket = new WebSocketConnection(webSocketUrl);
    webSocket.onopen = WebSocketJSONProcess.onOpen;
    webSocket.onmessage = WebSocketJSONProcess.onMessage;
    webSocket.onerror = WebSocketJSONProcess.onError;
    webSocket.onclose = WebSocketJSONProcess.onClose;
}

/* 指挥按钮*/
$(document).on('click', '.command-btn', function () {
    let serialNum = $(this).attr('data-case-serial');
    if (autoSearch != null) {
        clearInterval(autoSearch);
    }
    /* 开始作战*/
    startCombat(new RealTimeCombatBean(serialNum));
});

/* 开始实时作战 */
function startCombat(data) {
    /**add by gaochao start */
    $('.top-header').css('display', 'none');
    /**add by gaochao end */
    $('.guide-frame').css('display', 'none');
    $('.search-loading').css('display', 'block');
    // $('.full-screen').css('display', 'block');
    $('.re-search').css('display', 'block');
    $.ajax({
        url: 'commandManage/realTimeCombat/getRealTimeCombatDataInfo',
        type: 'POST',
        async: true,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        dataType: 'json',
        success: function (result) {
            console.log(result);
            $('.map-area-container').css('display', 'block');
            if (result.retcode == 1) {
                /* 缓存案件开始时间*/
                caseStartTime = result.dataMap.combatInfo.startTime;
                /**add by gaochao start */
                $('.target-name').html(result.dataMap.combatInfo.targetKey);
                /**add by gaochao end*/
                /* 从服务器获取当前准确时间*/
                let serverDate = CommonUtil.getServerDate().getTime();
                /* 绘制时间轴*/
                TimeLine.initTimeLine();
                /* 建立websocket连接*/
                openWebsocket();
                /* 设置定时器，用于显示右下角案件已进行的时间*/
                /*edit by guoshuai start 2019/3/19*/
                realTimeCombatTimer = setInterval(() => {
                    /*edit by guoshuai end 2019/3/19*/
                    let sec = parseInt((new Date(serverDate).getTime() - caseStartTime) / 1000);
                    let hour = parseInt(sec / 3600);
                    let minute = parseInt((sec % 3600) / 60);
                    $('.continous-time-value').html(`${hour >= 10 ? hour : ('0' + hour)}:${minute >= 10 ? minute : ('0' + minute)}:${(sec % 60) >= 10 ? (sec % 60) : '0' + (sec % 60)}`);
                    /**add by gaochao start */
                    $('.case-time').html(`${hour >= 10 ? hour : ('0' + hour)}:${minute >= 10 ? minute : ('0' + minute)}:${(sec % 60) >= 10 ? (sec % 60) : '0' + (sec % 60)}`);
                    /**add by gaochao end*/
                    serverDate = serverDate + 1000;
                    $('.group-switch-time-value').html(new Date(serverDate).Format('hh:mm:ss'));
                }, 1000);
                /* 初始化顶部工具栏按钮点击事件*/
                Switch.initSwitch();
                /* 初始化右部面板视角切换点击事件*/
                View.initViewPanel();
                /* 绘制历史路径*/
                DrawHistoryOverlay.drawHistory(result.dataMap);
                /* 在右部面板显示设备历史中最后一次能量值与授时状态*/
                DrawHistoryOverlay.engPanelHistory(result.dataMap.historyDevBaseInfoList, result.dataMap.combatInfo.devCodeList.length);
                /* 绘制TA Data信息 */
                PrasingTaDataInfo.showTaDataInfoList(result.dataMap.historyDevTdoaDataInfoList);
                PrasingChartMsgInfo.showHistoryChartMsg(result.dataMap.historyChartMsgList, result.dataMap.combatInfo.serialNum);
                chartMsgInfosListCache = result.dataMap.historyChartMsgList;
            } else {
                $('#nogps-modal').modal('show');
            }
        },
        error: function (xhr, textStatus) {
            console.log(xhr);
            console.log(textStatus);
        },
    });
}

/* 无GPS返回上一页*/
$('#nogps-modal-button').click(function () {
    $.ajax({
        url: 'commandManage/realTimeCombat/resetTask',
        type: 'GET',
        success: function (result) {
            if (combatvoCaseSerial != '') {
                window.location.href = 'home';
            } else {
                location.reload();
            }
        },
        error: function (xhr, textStatus) {
            console.log('错误');
            console.log(xhr);
            console.log(textStatus);
        },
    });
});

/* 重置搜索 */
$("#reset-search-submit").click(() => {
    $.ajax({
        url: 'commandManage/realTimeCombat/resetTask',
        type: 'GET',
        success: function (result) {
            location.reload();
        },
        error: function (xhr, textStatus) {
            console.log('错误');
            console.log(xhr);
            console.log(textStatus);
        },
    });
});

/* hover显示基站id */
let hoverShowBtsId = function () {
    if (event.type == 'mouseover') {
        $('.bts-value-' + $(this).attr('data-bts-id')).css('display', 'block');
        $('.multi-sub-bts-value-' + $(this).attr('data-bts-id')).css('display', 'block');
    } else if (event.type == 'mouseout') {
        $('.bts-value-' + $(this).attr('data-bts-id')).css('display', 'none');
        $('.multi-sub-bts-value-' + $(this).attr('data-bts-id')).css('display', 'none');
    }
}
$(document).on('mouseover mouseout', '.bts-img, .bts-hit-count, .multi-sub-bts-img', '.bts-search-img', hoverShowBtsId);

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

/* 目标点击显示详细信息*/
$(document).on('click', '.vehicleMarker-img, .vehicleMarker-info-panel-close', function () {
    let id = $(this).attr("data-id");
    if ($(`.vehicleMarkerIcon-${id}`).attr('data-open-status') == 'open') {
        /* 关闭*/
        $(`.vehicleMarkerIcon-${id}`).attr('data-open-status', 'close');
        // $(`.vehicleMarker-info-panel-${id}`).css('display', 'none');
        $(`.vehicleMarkerIcon-${id}`).css('z-index', $(`.vehicleMarkerIcon`).attr('z-index-temp'));
    } else {
        /* 打开*/
        $(`.vehicleMarkerIcon-${id}`).attr('z-index-temp', $(`.vehicleMarkerIcon`).css('z-index'));
        $(`.vehicleMarkerIcon-${id}`).attr('data-open-status', 'open');
        // $(`.vehicleMarker-info-panel-${id}`).css('display', 'block');
        $(`.vehicleMarkerIcon-${id}`).css('z-index', 9000);
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
    if (btsDivMap.get(btsId) == null) {
        /**存储绘制结果 */
        let btsDiv = function () {
            this.btsCover;
            this.btsRadius;
        }
        btsDiv.btsRadius = btsRangeCircle;
        btsDivMap.set(btsId, btsDiv);
    } else {
        btsDivMap.get(btsId).btsRadius = btsRangeCircle;
    }
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

/* 高级面板设备切换*/
$(document).on('click', '.advance-info-panel-selector-item', function () {
    let selectedDevCode = $(this).attr('data-dev-code');
    $('.advance-info-content').css('display', 'none');
    $(`.advance-info-content-${selectedDevCode}`).css('display', 'block');
    $('#default-advance-info-panel-dev').html(`
        ${selectedDevCode}&nbsp;<span style="color: #566ae2">${devDrawInfoMap.get(selectedDevCode).userName}</span> <span class="caret"></span>
    `);
});

/* 作战结束 */
$('#href-to-home').click(function () {
    window.location.href = 'commandManage/realTimeCombat/redirectHome';
    /* add by guoshuai start 2018-8-24*/
    /* add by guoshuai end 2018-8-24*/
});

/* 隐藏地图版权信息*/
$('#allmap').css('height', $(window).height() + 60);
window.addEventListener('resize', function () {
    $('#allmap').css('height', $(window).height() + 60);
}, false);
/* 隐藏地图版权信息*/
$('#allmap').css('height', $(window).height() + 60);
window.addEventListener('resize', function () {
    $('#allmap').css('height', $(window).height() + 60);
}, false);
/* add by guoshuai start */
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
});
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

/* 向服务器发送聊天消息*/
function MsgSend(content) {
    let devCodes = [];
    devDrawInfoMap.forEach((eachDev) => {
        devCodes.push(eachDev.devCode);
    });
    let ChatMsgBean = function (devCodes, content) {
        this.devCodes = devCodes;
        this.content = content;
    };
    let url = 'commandManage/realTimeCombat/sendChartMsgToDev';
    // console.log(JSON.stringify(new ChatMsgBean(devCodes,content)));
    $.ajax({
        url: url,
        type: 'POST',
        async: true,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(new ChatMsgBean(devCodes, content)),
        dataType: 'json',
        success: function (result) {
            console.log(result.message);
        }
    });
}
$(document).on('click', '.right-chat-send-btn', function () {
    let inputValue = $(".right-chat-input").val();
    if (inputValue.length > 0) {
        MsgSend(inputValue);
        $(".right-chat-input").val('')
        $(".right-chat-input").focus();
    }
});
$('.right-chat-input').bind('keydown', function (event) {
    if (event.keyCode == "13") {
        let inputValue = $(".right-chat-input").val();
        if (inputValue.length > 0) {
            MsgSend(inputValue);
            $(".right-chat-input").val('')
            // $('.right-chat-content').append(
            //     `<div class="right-chat-send-photo"></div>
            //     <div class="right-chat-send-name">${realname}</div>
            //     <div class="right-chat-send-time">${(new Date()).Format('hh:mm')}</div>
            //     <div class="right-chat-send-value-content">
            //         <div class="right-chat-send-value">${inputValue}</div>
            //     </div>	`
            // );
            // let scrollHeight = $('.right-chat-content').prop("scrollHeight");
            // $('.right-chat-content').scrollTop(scrollHeight,200);
            // $(".right-chat-input").val('')
        }
    }
});
/**add by gaochao end */
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
$(document).on('click', '.CR-ta-target-info', function () {
    $('.ta-info-container').slideDown(50);
    $('.target-lte-info-container').slideDown(50);
});
$(document).on('click', '.target-lte-info-container-close', function () {
    $('.target-lte-info-container').slideUp(50);
});
/* add by guoshuai end */
/* add by guoshuai start 2018-8-24*/
$('.end-combat-btn').click(function () {
    $('#live-mask').css({ 'display': 'block', 'z-index': '1050' });
})
/* add by guoshuai end 2018-8-24*/
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
        let activeStatus = $(this).attr('active-status');
        MoveToBts(text, activeStatus);
    }
});

$(document).on('click', '.advance-info-list-content-GPS-img', function () {
    let text = $(this).attr("data-clipboard-text");
    if (text != undefined && text != null) {
        MoveToBts(text,'false');
    }
});

function MoveToBts(data, activeStatus) {
    let btsData = null;
    if (btsNowFlagMarker != null) {
        map.removeOverlay(btsNowFlagMarker);
    }
    if (activeStatus != "true") {
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

//搜索框弹出和关闭
$(document).on('click', '#bts-search', function () {
    $('.search-bts-containers').toggle();
});
//搜索框弹出和关闭
$(document).on('click', '.close_search_modal', function () {
    $('.search-bts-containers').toggle();
});