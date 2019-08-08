import { GPSToBaiduPoint } from '../../../common/baiduMap/GPSToBaiduPoint.BaiduMap.js';

import { Panel } from '../tool/Panel.js';

import { ParsingDevInfo } from '../parsing/ParsingDevInfo.js';
import { PrasingBtsInfo } from '../parsing/PrasingBtsInfo.js';
import { DrawHeatmapOverlay } from '../overlay/DrawHeatmapOverlay.js';
import { PrasingLteCatchInfo } from '../parsing/PrasingLteCatchInfo.js';
import { PrasingDevActiveDetailInfo } from '../parsing/PrasingDevActiveDetailInfo.js';
import { PrasingTaDataInfo } from '../parsing/PrasingTaDataInfo.js';
import { PrasingTaDrawInfo } from '../parsing/PrasingTaDrawInfo.js';
import { PrasingChartMsgInfo } from '../parsing/PrasingChartMsgInfo.js';
import { ParsingMultiBtsInfo } from '../parsing/ParsingMultiBtsInfo.js';
import { PrasingVehicleInfo } from '../parsing/PrasingVehicleInfo.js';
import { DrawVehicleOverlay } from '../../vehicleDispatch/overLay/DrawVehicleOverlay.js';

let isFirst = true;
let exitRealTime = null;
let isFirstNoMsg = true;

export class WebSocketJSONProcess {

    static onOpen() {
        console.log('已连接');
    }

    static onMessage(evt) {

        //devBaseInfo = JSON.parse(evt.data);
        // console.log(evt.data);

        let resultDataMap = JSON.parse(evt.data);

        if (evt.data == '{}') {
            if (isFirstNoMsg) {
                $('#nogps-modal').modal('show');
            }
        }

        WebSocketJSONProcess.caseInfosProcessing(resultDataMap.combatInfo);
        WebSocketJSONProcess.userInfosProcessing(resultDataMap.userInfos);
        WebSocketJSONProcess.btsInfoProcessing(resultDataMap.devBtsInfos);
        WebSocketJSONProcess.devBaseInfoProcessing(resultDataMap.devBaseInfo);
        WebSocketJSONProcess.devActiveDetailInfoProcessing(resultDataMap.devActiveDetailInfo);
        WebSocketJSONProcess.devStateInfoProcessing(resultDataMap.devStateInfo);
        WebSocketJSONProcess.targetCellInfoProcessing(resultDataMap.devTargetCellInfos);
        // WebSocketJSONProcess.devActiveInfoProcessing(resultDataMap.devActiveInfo);
        WebSocketJSONProcess.heatMapInfoProcessing(resultDataMap.heatMapInfo);
        WebSocketJSONProcess.lteCatchInfoProcessing(resultDataMap.lteCatchInfo);
        // WebSocketJSONProcess.devActiveDetailInfoProcessing(resultDataMap.devActiveDetailInfo);
        WebSocketJSONProcess.devTdoaDataInfoProcessing(resultDataMap.devTdoaDataInfo);
        WebSocketJSONProcess.devTdoaDrawInfoProcessing(resultDataMap.devTdoaDrawInfo);
        /**add by gaochao start */
        WebSocketJSONProcess.preLockCellInfoProcessing(resultDataMap.devPreLockCellInfos);
        WebSocketJSONProcess.chartMsgInfoProcessing(resultDataMap.chartMsgInfo);
        WebSocketJSONProcess.vehicleInfoProcessing(resultDataMap.vehicleInfo);
        /**add by gaochao end*/

        /* 历史路径绘制完成*/
        if (historyRouteLineIsFinish) {
            historyRouteLineIsFinish = false;
            for (let [key, value] of historyDevLineMap) {
                let lintArrTemp = [];
                let devRouteLineTemp;
                for (let i = 0; i < value.data.length; i++) {
                    if (lintArrTemp.length == 0) {
                        lintArrTemp.push(value.data[i][0]);
                        lintArrTemp.push(value.data[i][1]);
                    } else {
                        if (value.data[i][0].lng == value.data[i - 1][1].lng && value.data[i][0].lat == value.data[i - 1][1].lat) {
                            // lintArrTemp.push(value.data[i][0]);
                            lintArrTemp.push(value.data[i][1]);
                        } else {
                            devRouteLineTemp = new BMap.Polyline(lintArrTemp, { strokeColor: '#888', strokeWeight: 5, strokeOpacity: 0.3 });
                            historyDevLineMap.get(key).line.push(devRouteLineTemp);
                            lineOverlayMap.line.get(key).line.push(devRouteLineTemp);
                            map.addOverlay(devRouteLineTemp);
                            if (!lineOverlayMap.isShow) {
                                devRouteLineTemp.hide();
                            }
                            lintArrTemp = [];
                            devRouteLineTemp = null;
                        }
                    }
                }
                devRouteLineTemp = new BMap.Polyline(lintArrTemp, { strokeColor: '#888', strokeWeight: 5, strokeOpacity: 0.3 });
                historyDevLineMap.get(key).line.push(devRouteLineTemp);
                lineOverlayMap.line.get(key).line.push(devRouteLineTemp);
                map.addOverlay(devRouteLineTemp);
                if (!lineOverlayMap.isShow) {
                    devRouteLineTemp.hide();
                }
                lintArrTemp = [];
                devRouteLineTemp = null;
                /*---------------------*/
                historyDevLineMap.get(key).data = [];
            }
            /* 当前视角的设备轨迹设置为绿色*/
            if (historyDevLineMap.get(currentViewDevCode) != null && historyDevLineMap.get(currentViewDevCode).line != null) {
                for (let i = 0; i < historyDevLineMap.get(currentViewDevCode).line.length; i++) {
                    historyDevLineMap.get(currentViewDevCode).line[i].setStrokeColor('#008030');
                }
            }
        }

    }

    static onError() {
        console.log('连接异常');
    }

    static onClose() {
        console.log('连接关闭');
    }

    static caseInfosProcessing(caseInfo) {
        if (caseInfo != null) {

            /* 设置分数*/
            $('#real-combat-end-score').html(caseInfo.score);
            let grayNum = 0;
            if (caseInfo.score == 100) {
                grayNum = 0;
            } else if (caseInfo.score >= 80) {
                grayNum = 1;
            } else if (caseInfo.score >= 60) {
                grayNum = 2;
            } else if (caseInfo.score >= 40) {
                grayNum = 3;
            } else if (caseInfo.score >= 20) {
                grayNum = 4;
            } else {
                grayNum = 5;
            }
            let htmlString = '';
            for (let i = 0; i < 5; i++) {
                let isGray = '';
                if (i < grayNum) {
                    isGray = 'gray-cover';
                }
                htmlString = `
                    <div class="grade-star-icon-inmodal ${isGray}"></div>
                `+ htmlString;
            }
            $('.real-combat-end-star').html(htmlString);
            if (caseInfo.status == 0) {
                switch (caseInfo.endType) {
                    case 0:
                        if (exitRealTime == null) {
                            exitRealTime = setTimeout(function () {
                                $('.re-search').html('结束观战');
                                $('#case-end-type').html('作战结束');
                                $('#real-combat-end-modal').modal('show');
                                /*edit by guoshuai start 2019/3/19*/
                                clearInterval(realTimeCombatTimer);
                                clearInterval(realTimeCombatLineTimer);
                                /*edit by guoshuai end 2019/3/19*/
                            }, 1000 * 60 * 5);
                        }
                        break;
                    case 1:
                        $('.re-search').html('结束观战');
                        $('#case-end-type').html('作战结束，<span style="color:#ff6700">未捕获目标</span>');
                        $('#real-combat-end-modal').modal('show');
                        clearInterval(realTimeCombatTimer);
                        clearInterval(realTimeCombatLineTimer);
                        break;
                    case 2:
                        $('.re-search').html('结束观战');
                        $('#case-end-type').html('作战结束，<span style="color:rgb(0,200,55);">已捕获目标</span>');
                        $('#real-combat-end-modal').modal('show');
                        /*edit by guoshuai start 2019/3/19*/
                        clearInterval(realTimeCombatTimer);
                        clearInterval(realTimeCombatLineTimer);
                        /*edit by guoshuai end 2019/3/19*/
                        break;
                    default:
                        break;
                }
            } else {
                if (exitRealTime != null) {
                    clearTimeout(exitRealTime);
                    exitRealTime = null;
                }
            }
        }
    }

    static userInfosProcessing(userInfos) {
        if (userInfos != null) {
            /* 存储用户名*/
            let userHtml = '';
            // let userHtmlSet = new Set();
            // for (let i = 0; i < userInfos.length; i++) {
            //     userHtmlSet.add(`${userInfos[i].userName}/${userInfos[i].seq} `);
            // }
            // for (let item of userHtmlSet.keys()) {
            //     userHtml = userHtml + item;
            // }

            let userMap = new Map();
            for (let i = 0; i < userInfos.length; i++) {
                if (userMap.get(userInfos[i].userName) == null) {
                    userMap.set(userInfos[i].userName, { name: userInfos[i].userName, seq: userInfos[i].seq });
                } else {
                    if (userMap.get(userInfos[i].userName).seq < userInfos[i].seq) {
                        userMap.set(userInfos[i].userName, { name: userInfos[i].userName, seq: userInfos[i].seq });
                    }
                }
            }
            userMap.forEach((each) => {
                userHtml = userHtml + each.name + '/' + each.seq + '，';
            });
            userHtml = userHtml.substring(0, userHtml.length - 1);

            for (let i = 0; i < userInfos.length; i++) {
                /**edti by gaochao start */
                $(`.user-name-value-by-id-${userInfos[i].userId}`).html(`${userInfos[i].realName}`);
                $(`.user-name-value-by-id-${userInfos[i].userId}`).attr('title', `${userInfos[i].realName}`);
                if (userInfos[i].headAddr != null && userInfos[i].headAddr != "") {
                    $(`.user-name-value-by-id-${userInfos[i].userId}-photo`).css('background', `url(${userInfos[i].headAddr})no-repeat`);
                    $(`.user-name-value-by-id-${userInfos[i].userId}-photo`).css('background-size', 'cover');
                }
                /**edit by gaochao end */
                /**add by gaochao start */
                $(`.team-each-dev-video-id-${userInfos[i].userId}`).attr('data-info-username', `${userInfos[i].userName}`);
                /**add by gaochao end */
                devDrawInfoMap.forEach((eachDev) => {
                    if (eachDev.userId == userInfos[i].userId && eachDev.userName == null) {
                        eachDev.userName = userInfos[i].userName;
                        /**add by gaochao start */
                        eachDev.realName = userInfos[i].realName;
                        eachDev.headAddr = userInfos[i].headAddr;
                        /**add by gaochao end*/
                    }
                });
            }
            if (userInfosCache.length == 0 || userInfosCache.length <= userInfos.length) {
                userInfosCache = userInfos;
                if ($('#case-users').html() != userHtml) {
                    $('#case-users').html(userHtml);
                    $('#case-users').attr('title', $('#case-users').html());
                }
            }
        }
    }

    static devBaseInfoProcessing(devBaseInfoMap) {
        if (devBaseInfoMap == null) {
            $('.car-img').css('filter', 'grayscale(100%)');
            $('.single-img').css('filter', 'grayscale(100%)');
            $('.energy-word').css('display', 'none');
            $('.energy-word-single').css('display', 'none');
            if (exitRealTime == null) {
                exitRealTime = setTimeout(function () {
                    $('.re-search').html('结束观战');
                    $('#case-end-type').html('作战结束');
                    $('#real-combat-end-modal').modal('show');
                    /*edit by guoshuai start 2019/3/19*/
                    clearInterval(realTimeCombatTimer);
                    clearInterval(realTimeCombatLineTimer);
                    /*edit by guoshuai end 2019/3/19*/
                }, 1000 * 60 * 5);
            }
        } else {
            let devBaseInfo = [];
            for (let key in devBaseInfoMap) {
                devBaseInfo.push(devBaseInfoMap[key]);
            }
            /* 解析数据并在地图上绘制设备*/
            for (let i = 0; i < devBaseInfo.length; i++) {
                if (devDrawInfoMap.get(devBaseInfo[i].devCode) == null) {
                    Panel.addNewDev(devBaseInfo, i);
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
                    } else {
                        $('.team-each-dev-index-car').css('display', 'block');
                    }
                    if (singleDevNum < 2) {
                        $('.team-each-dev-index-single').css('display', 'none');
                    } else {
                        $('.team-each-dev-index-single').css('display', 'block');
                    }
                }
                /* */
                if (devBaseInfo[i].status == 1) {
                    $(`.team-each-dev-icon-${devBaseInfo[i].devCode}`).css('filter', '');
                    /**add by gaochao start */
                    $(`.group-location-person-status-${devBaseInfo[i].devCode}`).css('background', '#73D84D');
                    /**add by gaochao end*/
                } else {
                    $(`.team-each-dev-icon-${devBaseInfo[i].devCode}`).css('filter', 'grayscale(100%)');
                    /**add by gaochao start */
                    $(`.group-location-person-status-${devBaseInfo[i].devCode}`).css('background', '#999999');
                    /**add by gaochao end*/
                }
            }
            /* 作战结束超时*/
            let isAllClose = false;
            for (let i = 0; i < devBaseInfo.length; i++) {
                if (devBaseInfo[i].status == 1) {
                    isAllClose = true;
                    break;
                }
            }
            if (isAllClose) {
                if (exitRealTime != null) {
                    clearTimeout(exitRealTime);
                    exitRealTime = null;
                }
            } else {
                if (exitRealTime == null) {
                    exitRealTime = setTimeout(function () {
                        $('.re-search').html('结束观战');
                        $('#real-combat-end-modal').modal('show');
                        /*edit by guoshuai start 2019/3/19*/
                        clearInterval(realTimeCombatTimer);
                        clearInterval(realTimeCombatLineTimer);
                        /*edit by guoshuai end 2019/3/19*/
                    }, 1000 * 60 * 5);
                }
            }
            /* 设置地图中心点*/
            if (isFirst) {
                let centerData = devBaseInfo[0];
                isFirst = false;
                isFirstNoMsg = false;
                let lng = devBaseInfo[0].gpsInfo.lng;
                let lat = devBaseInfo[0].gpsInfo.lat;
                GPSToBaiduPoint.getBaiduPointLocationPromise([[lng, lat]]).then((point) => {
                    map.centerAndZoom(new BMap.Point(point[0].lng, point[0].lat), 19);
                    $('.search-loading').css('display', 'none');
                    $('.full-screen').css('display', 'none');
                    if (isNoGpsModalOpen) {
                        $('#nogps-modal').modal('hide');
                        isNoGpsModalOpen = false;
                    }
                });
                canBtsOpen = true;
            }
            /* 执行绘制方法*/
            ParsingDevInfo.parsingDevInfo(devBaseInfo, true);
        }
    }

    static btsInfoProcessing(devBtsInfosMap) {
        ParsingMultiBtsInfo.parsingBtsInfosMap(devBtsInfosMap);
        /* 在地图上绘制基站*/
       /*  $('.bts-hit-count').html("");
        for (let key in devBtsInfosMap) {
            //PrasingBtsInfo.prasingBtsInfo(devBtsInfosMap[key]);
            ParsingMultiBtsInfo.prasingBtsInfo(devBtsInfosMap[key]);
        } */
    }

    static devStateInfoProcessing(devStateInfoMap) {
        devStateInfoMapCache = devStateInfoMap;
        /* 基站解析进度与触发信息*/
        //PrasingBtsInfo.cellAnalysis(devStateInfoMap);
        ParsingMultiBtsInfo.cellAnalysis(devStateInfoMap);
    }

    static targetCellInfoProcessing(devTargetCellInfosMap) {
        if (devTargetCellInfosMap != null) {
            for (let key0 in devTargetCellInfosMap) {
                let targetCellInfos = devTargetCellInfosMap[key0].targetCellInfos;
                for (let key in targetCellInfos) {
                    let btsPoint = GPSToBaiduPoint.getBaiduPointLocation([[targetCellInfos[key].lng, targetCellInfos[key].lat]])[0];
                    targetCellInfos[key].lng = btsPoint.lng;
                    targetCellInfos[key].lat = btsPoint.lat;
                    targetCellInfosCache.set(targetCellInfos[key].btsId, targetCellInfos[key]);
                }
            }
        }
        PrasingBtsInfo.showTargetCell();
    }

    static preLockCellInfoProcessing(devPreLockCellInfoList) {
        devPreLockCellInfosCache = new Map();
        if (devPreLockCellInfoList != null) {
            for (let key0 in devPreLockCellInfoList) {
                let btsInfos = devPreLockCellInfoList[key0].btsInfos;
                for (let key in btsInfos) {
                    let btsPoint = GPSToBaiduPoint.getBaiduPointLocation([[btsInfos[key].lng, btsInfos[key].lat]])[0];
                    btsInfos[key].lng = btsPoint.lng;
                    btsInfos[key].lat = btsPoint.lat;
                    devPreLockCellInfosCache.set(btsInfos[key].btsId, btsInfos[key]);
                }
            }
        }
        ParsingMultiBtsInfo.showPreLockCell();
    }

    static chartMsgInfoProcessing(chartMsgInfo) {
        if (chartMsgInfo != null) {
            PrasingChartMsgInfo.showChartMsg(chartMsgInfo);
            for (let key in chartMsgInfo) {
                chartMsgInfosCache.set(key, chartMsgInfo[key]);
            }
        }
    }
    static vehicleInfoProcessing(vehicleInfo) {
        if (vehicleInfo != null) {
            PrasingVehicleInfo.showVehicle(vehicleInfo);
        }
    }

    static devActiveInfoProcessing(devActiveInfo) {

    }

    static heatMapInfoProcessing(heatMapInfo) {
        if (heatMapInfo != null) {
            let heatMapInfoArray = [];
            for (let key in heatMapInfo) {
                heatMapInfoArray.push(heatMapInfo[key]);
            }
            DrawHeatmapOverlay.drawHeatmap(heatMapInfoArray);
        }
    }

    static lteCatchInfoProcessing(lteCatchInfo) {
        // console.log(lteCatchInfo);
        if (lteCatchInfo && typeof (lteCatchInfo) != undefined && lteCatchInfo != '') {
            PrasingLteCatchInfo.showLteCatchInfo(lteCatchInfo);
        }
    }

    static devActiveDetailInfoProcessing(devActiveDetailInfoMap) {
        if (devActiveDetailInfoMap && typeof (devActiveDetailInfoMap) != undefined && devActiveDetailInfoMap != '') {
            for (let key in devActiveDetailInfoMap) {
                PrasingDevActiveDetailInfo.showDevActiveDetailInfo(devActiveDetailInfoMap[key]);
                PrasingDevActiveDetailInfo.showDevActiveEngLogInfo(devActiveDetailInfoMap[key]);
            }
        }
    }

    static devTdoaDataInfoProcessing(devTdoaDataInfoMap) {
        let devTdoaDataInfoList = [];
        if (devTdoaDataInfoMap && typeof (devTdoaDataInfoMap) != undefined && devTdoaDataInfoMap != '') {
            for (let key in devTdoaDataInfoMap) {
                devTdoaDataInfoList.push(devTdoaDataInfoMap[key]);
            }
            PrasingTaDataInfo.showTaDataInfoList(devTdoaDataInfoList);
        }
    }

    static devTdoaDrawInfoProcessing(devTdoaDrawInfoMap) {
        if (devTdoaDrawInfoMap && typeof (devTdoaDrawInfoMap) != undefined && devTdoaDrawInfoMap != '') {
            let devTdoaDrawInfoList = [];
            for (let key in devTdoaDrawInfoMap) {
                devTdoaDrawInfoList.push(devTdoaDrawInfoMap[key]);
            }
            PrasingTaDrawInfo.showTaDrawInfoList(devTdoaDrawInfoList);
        }
    }
}