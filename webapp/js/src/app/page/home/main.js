import { BaiduMapDrawing } from '../../common/baiduMap/Drawing.BaiduMap.js';
import { GPSToBaiduPoint } from '../../common/baiduMap/GPSToBaiduPoint.BaiduMap.js';
import { MyCookie } from '../../common/cookie/MyCookie.js';
import { TopHeader } from '../../common/topHeader/TopHeader.js';

import { WebSocketConnection } from './websocket/WebSocketConnection.js';
import { WebSocketJSONProcessMsg } from './websocket/WebSocketJSONProcessMsg.js';
import { WebSocketJSONProcessDev } from './websocket/WebSocketJSONProcessDev.js';

import { Query } from './ajax/Query.js';
import { CaseDistributionEcharts } from './echarts/CaseDistributionEcharts.js';
import { CaseStatisticsEcharts } from './echarts/CaseStatisticsEcharts.js';
import { DevUsingrateEcharts } from './echarts/DevUsingrateEcharts.js';
import { MessageTable } from './table/MessageTable.js';
import { RankTable } from './table/RankTable.js';

import { FillDataToMap } from './echarts/FillDataToMap.js';

import { DrawDevCover } from './overlay/DrawDevCover.js';
import { ParsingDevInfo } from './parsing/ParsingDevInfo.js';

/*add by guoshuai start  2018-10-22*/
Date.prototype.format = function(fmt) {
	let o = {
		"M+" : this.getMonth()+1,                 //月份
		"d+" : this.getDate(),                    //日
		"h+" : this.getHours(),                   //小时
		"m+" : this.getMinutes(),                 //分
		"s+" : this.getSeconds(),                 //秒
		"q+" : Math.floor((this.getMonth()+3)/3), //季度
		"S"  : this.getMilliseconds()             //毫秒
	};
	if(/(y+)/.test(fmt)) {
		fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
	}
	for(let k in o) {
		if(new RegExp("("+ k +")").test(fmt)){
		fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
		}
	}
	return fmt;
}
	/*
	* 重写时间的toJSON方法，因为在调用JSON.stringify的时候，时间转换就调用的toJSON，这样会导致少8个小时，所以重写它的toJSON方法
// 	*/
// Date.prototype.toJSON = function () {
//     return this.format("yyyy-MM-dd hh:mm:ss"); // util.formatDate是自定义的个时间格式化函数
//     //return this.toLocaleString();
// }

/*add by guoshuai end  2018-10-22*/

/* 生成顶部菜单 */
TopHeader.initHeader();

/* 最新动态跳转点击事件*/
$(document).on('click', '.new-message-play-btn', function () {
    window.location.href = `./home/${$(this).attr('data-url')}/${$(this).attr('data-case-serial')}`;
});
$(document).on('click', '.new-message-replay-btn', function () {
    MyCookie.deleteCookie('combatReplayQueryCache');
    MyCookie.deleteCookie('combatReplayPlayTimeCache');
    window.location.href = `./home/${$(this).attr('data-url')}/${$(this).attr('data-case-serial')}`;
});

/*delete by guoshuai start 2018-9-27
let yearItemValue = Number(new Date().getFullYear());
$('#case-selected-year').html(`${yearItemValue} <span class="caret"></span>`);
for (let i = 0; i < 4; i++) {
    $('#case-year-item').append(`<li><a class="get-cos-year-case-item">${yearItemValue - i}</a></li>`);
}
delete by guoshuai end 2018-9-27*/

/* 初始化点聚合*/
carMarkerClustererWorking = new BMapLib.MarkerClusterer(map, {
    markers: carMarkerPointsWorking,
    styles: [{
        url: 'img/workMarkerClusterer.png', // 工作中的设备点聚合图标
        size: new BMap.Size(53, 53)
    }],
    isAverageCenter: true,
});
carMarkerClustererUnwork = new BMapLib.MarkerClusterer(map, {
    markers: carMarkerPointsUnwork,
    styles: [{
        url: 'img/unworkMarkerClusterer.png', // 未工作的设备点聚合图标
        size: new BMap.Size(53, 53)
    }],
    isAverageCenter: true,
});
map.addEventListener("zoomend", showMarkerClusterer);
map.addEventListener("dragend",showMarkerClusterer);
function showMarkerClusterer() {
    devDivMap.forEach((eachCarDiv) => {
        if (eachCarDiv.devIcon.map == null) {
            eachCarDiv.devCover.hide();
        } else {
            eachCarDiv.devCover.show();
        }
    });
}

/* 打开websocket*/
let msgWebsocket = openMsgWebSocket();
let devWebsocket = openDevWebSocket();

/* 导航条切换*/
$('.title-nav-item').click(function () {
    /*add by guoshuai start 2018-9-27*/
    $('#dev-distribution-map-mask').css('position','');
    $('#dev-content-mask').css('position','');
    /*add by guoshuai end 2018-9-27*/
    if (!$(this).hasClass('active')) {
        $('.title-nav-item').removeClass('active');
        $(this).addClass('active');
        $('.main-page-content').css('z-index', 0);
        $('#' + $(this).attr('data-nav-id')).css('z-index', 1000);
        // $('.main-page-content').css('display', 'none');
        // $('#' + $(this).attr('data-nav-id')).css('display', 'block');
    }
});

/* 首页统计信息*/
let caseStatisticsType = 2; // 显示类型
let CaseStatisticsBean = function (startTime, endTime) {
    this.startTime = startTime;
    this.endTime = endTime;
}
/* function getCaseStatistics(data) {
    console.log(data);
    Query.query(data, 'home/getCaseInfoStatistics', 'POST').then((result) => {
        console.log(result);
        $('#case-history-statistics-value').html(result.dataMap.totalCaseInfoNum.totalNum); // 历史办案数量
        CaseDistributionEcharts.parsingData(result.dataMap.areaCaseInfoStatistics,result.dataMap.areaCodesInfo, data.startTime, data.endTime, caseStatisticsType, 0, ""); // 地图显示
        CaseStatisticsEcharts.parsingData(caseStatisticsType, result.dataMap.monthCaseInfoStatistics); // 折线图统计
    });
} */

/* 默认获取最近一年信息*/
// getCaseStatistics(new CaseStatisticsBean(new Date(`${new Date().getFullYear()}/01/01 00:00:00`), new Date(`${new Date().getFullYear()}/12/31 23:59:59`)));
//getCaseStatistics(new CaseStatisticsBean(new Date(new Date().getTime() - 365 * 24 * 3600 * 1000), new Date()));
FillDataToMap.parsingData();
/* 作战统计选择点击事件*/

$('#get-all-case').mousedown(function () { // 全部
    if(queryCaseStatisticsType != 1) {
        queryCaseStatisticsType = 1;
        FillDataToMap.parsingData(null, null, null, queryCaseStatisticsType);
        let text =$('#get-all-case').text();
        $('#db2-test').text(text);
        $('.drop-div2').hide();
        $('.case-value-type-selector form').css('width','71%')
    }
    /*add by guoshuai start 2018-9-27*/
    $('#get-current-year-case-more').hide();
    $('#get-cos-year-case-search').hide();
    /*add by guoshuai end 2018-9-27*/
});
$('#get-current-year-case').mousedown(function () { // 最近一年
    if(queryCaseStatisticsType != 2) {
        queryCaseStatisticsType = 2;
        queryEndTime = (new Date()).Format("yyyy-MM-dd hh:mm:ss");
        queryStartTime = (new Date(new Date(queryEndTime).getTime() - 365 * 24 * 3600 * 1000)).Format("yyyy-MM-dd hh:mm:ss");
        FillDataToMap.parsingData();
        let text =$('#get-current-year-case').text();
        $('#db2-test').text(text);
        $('.drop-div2').hide();
    }
    /*add by guoshuai start 2018-9-27*/
    $('#get-current-year-case-more').hide();
    $('#get-cos-year-case-search').hide();
    $('.case-value-type-selector form').css('width','71%');
    /*add by guoshuai end 2018-9-27*/
});

/*delete by guoshuai  start 2018-9-27
$('#get-cos-year-case').mousedown(function () { // xxxx年
    caseStatisticsType = 3;
    let year = $('#case-selected-year').attr('data-current-year');
    getCaseStatistics(new CaseStatisticsBean(new Date(`${year}/01/01 00:00:00`), new Date(`${year}/12/31 23:59:59`)));
});
delete by guoshuai  end 2018-9-27*/
/*delete by guoshuai start2018-10-19
$('.get-cos-year-case-item').mousedown(function () { // xxxx年
    caseStatisticsType = 3;
    let year = $(this).html();
    /*delete by guoshuai  start 2018-9-27
    $('#case-selected-year').html(`${year}&nbsp;<span class="caret"></span>`);
    $('#case-selected-year').attr('data-current-year', year);
    delete by guoshuai  end 2018-9-27*/
    /*delete by guoshuai start2018-10-19
    getCaseStatistics(new CaseStatisticsBean(new Date(`${year}/01/01 00:00:00`), new Date(`${year}/12/31 23:59:59`)));
    /*add by guoshuai start 2018-9-27*/
    /*delete by guoshuai start2018-10-19
    $('#db2-test').text(year+'年');
    /*add by guoshuai end 2018-9-27*/
/*delete by guoshuai start
});
delete by guoshuai end 2018-10-19*/
/*add by guoshuai start 2018-10-19*/
/*自定义查询时段*/
$('#get-cos-year-case').mousedown(function () {
    $('#get-cos-year-case-search').show();
    $('#get-current-year-case-more').show();
    $('#query-time-start-timeDev').val('');
    $('#query-time-end-timeDev').val('');
});
$('#get-cos-year-case-search').mousedown(function () { // xxxx时段
    queryCaseStatisticsType = 3;
    let startTime;
    let endTime;
    let oneDay=1000*60*60*8;
    if($('#query-time-start-timeDev').val()==''){
        startTime=null;
    }else{
        let start = new Date (new Date($('#query-time-start-timeDev').val()).getTime()-oneDay);
        startTime = (start).Format("yyyy-MM-dd hh:mm:ss");
    }
    if($('#query-time-end-timeDev').val()==''){
        endTime=null;
    }else{
        let end = new Date($('#query-time-end-timeDev').val());
        let month = end.getMonth()+1;
        let nextMonthFirstDay=new Date(end.getFullYear(),month,1);
        let oneDay=1000*60*60*8;
        /*endTime = new Date(nextMonthFirstDay-1+oneDay); */
        endTime = (new Date(nextMonthFirstDay-1)).Format("yyyy-MM-dd hh:mm:ss");
    }
    
    if(startTime != queryStartTime || endTime != queryEndTime) {
        queryStartTime = startTime;
        queryEndTime = endTime;
        FillDataToMap.parsingData();
    }
});
/*add by guoshuai end 2018-10-19*/

/* 获取排行榜*/
Query.query(null, 'home/getTopRanking', 'POST').then((result) => {
    if (result.retcode == 1) {
        RankTable.drawTable(result.dataList);
    }
    console.log(result);
});

/* 获取设备工作时长*/
let WorkingHoursVo = function (startTime, endTime) {
    this.startTime = startTime;
    this.endTime = endTime;
}
getDevWorkingHours(new Date(new Date().getTime() - 7 * 24 * 3600 * 1000), new Date());
/*设备分辨率时间为null的判断*/
function removeNull(val){
    if(val==null){
        return null
    }else{
        return val.Format("yyyy-MM-dd hh:mm:ss");
    }
}
function getDevWorkingHours(startTime, endTime) {
    startTime = removeNull(startTime);
    endTime = removeNull(endTime);
    console.log(new WorkingHoursVo(startTime, endTime));
    Query.query(new WorkingHoursVo(startTime, endTime), 'home/getWorkingHoursStatistic', 'POST').then((result) => {
        console.log(result);
        if (result.retcode == 1) {
            DevUsingrateEcharts.parsingData(result.analysisDataInfo);
        }
    });
}

/*add by guoshuai star t2018-9-27*/
$('.dev-usingrate-echarts div').css({'width':'100%','height':'100%'});
/*add by guoshuai end 2018-9-27*/

/* 设备使用率选择点击事件*/
$('#dev-usingrate-selector-all').mousedown(function () {
    getDevWorkingHours(null, null);
    /*add by guoshuai star t2018-9-27*/
    let text =$('#dev-usingrate-selector-all').text();
    $('#dp-w2').text(text);
    $('.drop-div').hide();
    /*add by guoshuai end 2018-9-27*/
});

/*add by guoshuai star t2018-9-27*/
$('#dropbtn').hover(function(){
    $('.drop-div').css("display","block");
},function(){
    $('.drop-div').css("display","none");
});
/*add by guoshuai end 2018-9-27*/

$('#dev-usingrate-selector-year').mousedown(function () {
    let startTime = new Date(new Date().getTime() - 365 * 24 * 3600 * 1000);
    let endTime = new Date();
    getDevWorkingHours(startTime, endTime);
    /*add by guoshuai start 2018-9-27*/
    let text =$('#dev-usingrate-selector-year').text();
    $('#dp-w2').text(text);
    $('.drop-div').hide();
    /*add by guoshuai end 2018-9-27*/
});
$('#dev-usingrate-selector-month').mousedown(function () {
    let startTime = new Date(new Date().getTime() - 30 * 24 * 3600 * 1000);
    let endTime = new Date();
    getDevWorkingHours(startTime, endTime);
    /*add by guoshuai start 2018-9-27*/
    let text =$('#dev-usingrate-selector-month').text();
    $('#dp-w2').text(text);
    $('.drop-div').hide();
    /*add by guoshuai end 2018-9-27*/
});
$('#dev-usingrate-selector-week').mousedown(function () {
    let startTime = new Date(new Date().getTime() - 7 * 24 * 3600 * 1000);
    let endTime = new Date();
    getDevWorkingHours(startTime, endTime);
    /*add by guoshuai start 2018-9-27*/
    let text =$('#dev-usingrate-selector-week').text();
    $('#dp-w2').text(text);
    $('.drop-div').hide();
    /*add by guoshuai end 2018-9-27*/
});

/* 地图在线/离线设备切换*/
$('.dev-distribution-switch').click(function () {
    let dataType = Number($(this).attr('data-type'));
    if (dataType != devDistributionType) {
        devDistributionType = Number($(this).attr('data-type'));
        carMarkerClustererWorking.clearMarkers();
        carMarkerClustererUnwork.clearMarkers();
        map.clearOverlays();
        devInfoMap = new Map();
        devDivMap = new Map();
        carMarkerPointsWorking = [];
        carMarkerPointsUnwork = [];
        switch (devDistributionType) {
            case 1:
                ParsingDevInfo.parsingDevInfo(devDistributionListCache.onlineDevList);
                break;
            case 0:
                ParsingDevInfo.parsingDevInfo(devDistributionListCache.offlineDevList);
                break;
            default:
                break;
        }
        map.setZoom(map.getZoom() - 1);
        map.setZoom(map.getZoom() + 1);
    }
    /*add by guoshuai start 2018-9-27*/
    if(dataType==1){
        $('.dev-distribution-switch').eq(0).css({"background":"url('img/iconpic/online.png') no-repeat","background-size":"100% 90%","color":"#fff"});
        $('.dev-distribution-switch').eq(1).css({"background":"url('img/iconpic/offline.png') no-repeat","background-size":"100% 90%","color":"#ccc"});
    }
    else{
        $('.dev-distribution-switch').eq(0).css({"background":"url('img/iconpic/offline.png') no-repeat","background-size":"100% 90%","color":"#ccc"});
        $('.dev-distribution-switch').eq(1).css({"background":"url('img/iconpic/online.png') no-repeat","background-size":"100% 90%","color":"#fff"});
    }
    /*add by guoshuai end 2018-9-27*/
});

function openMsgWebSocket() {
    let webSocketUrl = [
        'ws:' + projectUrl + '/websocket/home',
        'ws:' + projectUrl + '/websocket/home',
        'ws:' + projectUrl + '/sockjs/websocket/home'
    ];
    let webSocket = new WebSocketConnection(webSocketUrl);
    webSocket.onopen = WebSocketJSONProcessMsg.onOpen;
    webSocket.onmessage = WebSocketJSONProcessMsg.onMessage;
    webSocket.onerror = WebSocketJSONProcessMsg.onError;
    webSocket.onclose = WebSocketJSONProcessMsg.onClose;
    return webSocket;
}

function openDevWebSocket() {
    let webSocketUrl = [
        'ws:' + projectUrl + '/websocket/devMonitor',
        'ws:' + projectUrl + '/websocket/devMonitor',
        'ws:' + projectUrl + '/sockjs/websocket/devMonitor'
    ];
    let webSocket = new WebSocketConnection(webSocketUrl);
    webSocket.onopen = WebSocketJSONProcessDev.onOpen;
    webSocket.onmessage = WebSocketJSONProcessDev.onMessage;
    webSocket.onerror = WebSocketJSONProcessDev.onError;
    webSocket.onclose = WebSocketJSONProcessDev.onClose;
    return webSocket;
}

window.addEventListener("beforeunload", function (event) {
    msgWebsocket.close();
    devWebsocket.close();
});
/*add by guoshuai start 2018-10-11*/

/*add by guoshuai end 2018-10-11*/