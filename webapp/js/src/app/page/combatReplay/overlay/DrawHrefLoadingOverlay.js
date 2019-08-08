import { GPSToBaiduPoint } from '../../../common/baiduMap/GPSToBaiduPoint.BaiduMap.js';
import { Energy } from '../../realTimeCombat/energy/Energy.js';

import { PassiveActiveMarkerOverlayConstructor } from '../../realTimeCombat/overlay/PassiveActiveMarkerOverlayConstructor.js';
import { CarEngOrientationConstructor } from '../../realTimeCombat/overlay/CarEngOrientationConstructor.js';
import { SingleEngOrientationConstructor } from '../../realTimeCombat/overlay/SingleEngOrientationConstructor.js';

import { ParsingDevInfoCR } from '../parsing/ParsingDevInfoCR.js';
import { PrasingBtsInfoCR } from '../parsing/PrasingBtsInfoCR.js';
import { ParsingData } from '../parsing/ParsingData.js'; // 将数据转换为实时作战所支持的格式
import { DrawBtsEcharts } from '../../realTimeCombat/overlay/DrawBtsEcharts.js';
import { DrawMultiBtsEcharts } from '../../realTimeCombat/overlay/DrawMultiBtsEcharts.js';

import { EngPanel } from '../../realTimeCombat/table/EngPanel.js';
import { PrasingLteCatchInfo } from '../../realTimeCombat/parsing/PrasingLteCatchInfo.js';
import { PrasingDevActiveDetailInfo } from '../../realTimeCombat/parsing/PrasingDevActiveDetailInfo.js';
import { PrasingHistoryTaDataInfo } from '../parsing/PrasingHistoryTaDataInfo.js';
import { PrasingTaDrawInfo } from '../../realTimeCombat/parsing/PrasingTaDrawInfo.js';
import { ParsingMultiBtsInfo } from '../../realTimeCombat/parsing/ParsingMultiBtsInfo.js';

export class DrawHrefLoadingOverlay {

    static drawLoding(endTime) {

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
        devActiveEngInfoLogCatch = [];
        lastDevActiveEngInfoReportTime = 0;
        taDataInfoIndex = 0;
        taDrawInfoIndex = 0;
        devTdoaDataInfoLogCatch = [];
        lastTaDataInfoReportTime = 0;
        taCircleProdOverlayCache = [];
        taCircleDebugOverlayCache = [];
        taPointsProdOverlayCache = [];
        taPointsDebugOverlayCache = [];
        taPolygonProdOverlayCache = [];
        taPolygonDebugOverlayCache = [];
        devInfoMap = new Map();
        devDivMap = new Map();
        btsInfoMap = new Map();
        multiBtsInfoMap = new Map();
        btsDivMap = new Map();
        historyDevLineMap = new Map();
        lineOverlayMap.line.forEach((eachLine) => {
            eachLine.line = [];
            eachLine.dataCache = [];
        });
        lineOverlayCountCache = new Map();
        linePassive = { overlay: [], line: [], isShow: true };
        heatmapOverlayCache = new Map();
        passiveActiveStatus = 0;
        carEngOrientationArray = { overlay: [], isShow: true };
        singleEngOrientationArray = { overlay: [], isShow: true };
        targetCellInfosCache = new Map();
        targetCellLineCache = null;
        devStateInfoMapCache = new Map();
        btsAnalysisOverlayCache = [];
        hitedBtsEcharts = new Map();
        hitedBtsCache = { btsId: null, dev: [] };
        devCellAnalysisMap = new Map();
        btsHitEffectionCover = null;
        centerPointDevCode = null;
        // if (flashMarkerInterval != null) {
        //     /* 清除定时器*/
        //     clearInterval(flashMarkerInterval);
        //     flashMarkerInterval = null;
        //     /* 清除canvas*/
        //     $('.bts-hit-canvas').remove();
        // }

        let _devBaseInfo = historyInfoCache.historyDevBaseInfoList;
        let _btsInfo = historyInfoCache.historyBtsInfoList;
        let _statusInfo = historyInfoCache.historyDevStateInfoList;
        let _targetCellInfo = historyInfoCache.historyTargetCellInfoList;
        /**add by gaochao start */
        let _preLockCellInfo = historyInfoCache.historyPreLockCellInfoList;
        /**add by gaochao end*/
        let _lteCatchInfo = historyInfoCache.historyCatchInfoList;
        let _devActiveDetailInfo = historyInfoCache.historyDevActiveDetailInfoList;
        let _devTdoaDataInfo = historyInfoCache.historyDevTdoaDataInfoList;
        let _devTdoaDrawInfo = historyInfoCache.historyDevTdoaDrawInfoList;

        let historyDevInfoMap = new Map();
        let cpt = { devCode: null, devType: null, lng: null, lat: null };
        /* 定义中心点*/
        for (let j = 0; j < _devBaseInfo.length; j++) {
            if (_devBaseInfo[j].devType == 1) {
                cpt.devCode = _devBaseInfo[j].devCode;
                cpt.devType = 1;
                cpt.lng = _devBaseInfo[j].lng;
                cpt.lat = _devBaseInfo[j].lat;
                break;
            }
        }
        if (cpt.devCode == null) {
            cpt.devCode = _devBaseInfo[0].devCode;
            cpt.devType = 2;
            cpt.lng = _devBaseInfo[0].lng;
            cpt.lat = _devBaseInfo[0].lat;
        }
        $('.loading-word').html('加载中...');
        $('.search-loading').css('display', 'block');
        /**add by gaochao start */
        if (btsHitTimer.length > 0) {
            for (let i = 0; i < btsHitTimer.length; i++) {
                clearInterval(btsHitTimer[i]);
            }
        }
        /**add by gaochao end*/

        setTimeout(() => { drawDev(_devBaseInfo, _btsInfo, _statusInfo, _targetCellInfo, _preLockCellInfo, _lteCatchInfo, _devActiveDetailInfo, _devTdoaDataInfo, _devTdoaDrawInfo); }, 50);

        function drawDev(devBaseInfo, btsInfo, statusInfo, targetCellInfo, preLockCellInfo, lteCatchInfo, devActiveDetailInfo, devTdoaDataInfo, devTdoaDrawInfo) {
            /* 设备*/
            // for (let i = 0; i < btsInfo.length; i++) {
            //     if (btsInfo[i].reportTime > endTime) {
            //         btsIndex = i;
            //         break;
            //     }
            //     let parsedBtsInfo = ParsingData.FormatBtsData(btsInfo[i]);
            //     PrasingBtsInfoCR.prasingBtsInfo(parsedBtsInfo);
            // }
            let btsi = 0;
            //基站集合
            let btsInfoList = []

            for (let i = 0; i < devBaseInfo.length; i++) {
                while (true) {
                    if (btsi >= btsInfo.length) {
                        break;
                    }
                    if (btsInfo[btsi].reportTime <= devBaseInfo[i].reportTime) {
                        let btsInfoList = [];
                        let btsInfos = btsInfo.slice(0, btsi);
                        for (let i = 0; i < btsInfos.length; i++) {
                            btsInfoList[ParsingData.FormatBtsData(btsInfos[i]).btsId] = ParsingData.FormatBtsData(btsInfos[i]);
                        }
                        let btsInfoNew = {};
                        btsInfoNew.btsInfos = btsInfoList;
                        ParsingMultiBtsInfo.prasingBtsInfo(btsInfoNew);
                        // let parsedBtsInfo = ParsingData.FormatBtsData(btsInfo[btsi]);
                        // PrasingBtsInfoCR.prasingBtsInfo(parsedBtsInfo);
                        btsIndex = btsi;
                        btsi = btsi + 1;
                    } else {
                        break;
                    }
                }
                /* 更新中心点*/
                if (devBaseInfo[i].devCode == cpt.devCode) {
                    cpt.lng = _devBaseInfo[i].lng;
                    cpt.lat = _devBaseInfo[i].lat;
                }
                if (historyDevLineMap.get(devBaseInfo[i].devCode) == null) {
                    historyDevLineMap.set(devBaseInfo[i].devCode, { line: [], data: [] });
                }
                let currentPoint = GPSToBaiduPoint.getBaiduPointLocation([[devBaseInfo[i].lng, devBaseInfo[i].lat]])[0];
                let currentBaiduPoint = new BMap.Point(currentPoint.lng, currentPoint.lat);
                let lastBaiduPoint = null;
                let lastActiveHit = null;
                if (historyDevInfoMap.get(devBaseInfo[i].devCode) != null) {
                    lastBaiduPoint = historyDevInfoMap.get(devBaseInfo[i].devCode).lastBaiduPoint;
                    lastActiveHit = historyDevInfoMap.get(devBaseInfo[i].devCode).lastActiveHit;
                    /* 精度大于10，使用上一次的GPS信息*/
                    if (devBaseInfo[i].devType == 2 && devBaseInfo[i].accuracy > 50) {
                        currentBaiduPoint = lastBaiduPoint;
                    }
                    /**add by gaochao start */
                    if (devBaseInfo[i].devType == 3 && devBaseInfo[i].accuracy > 50) {
                        currentBaiduPoint = lastBaiduPoint;
                    }
                    /**add by gaochao end*/

                }
                /* 绘制能量指示*/
                let carEngCache = [0, 0, 0, 0];
                if (devBaseInfo[i].isShow == 1) {
                    switch (devBaseInfo[i].devType) {
                        case 1: // 车载
                            let energyArray;
                            /**edit by gaochao start */
                            if (devBaseInfo[i].eng != null && devBaseInfo[i].eng != "") {
                                /**edit by gaochao end */
                                let energyArrayCache = devBaseInfo[i].eng.split('-');
                                energyArray = [Number(energyArrayCache[0]), Number(energyArrayCache[1]), Number(energyArrayCache[2]), Number(energyArrayCache[3])];
                            }
                            if (energyArray != null) {
                                carEngCache = energyArray;
                                if (energyArray[0] != 0 && energyArray[1] != 0 && energyArray[2] != 0 && energyArray[3] != 0) {
                                    // 绘制能量指示
                                    let carEngOriRedraw = true;
                                    for (let j = 0; j < carEngOrientationArray.overlay.length; j++) {
                                        // 去掉重复
                                        let lastCarEngOriPoint = new BMap.Point(carEngOrientationArray.overlay[j].gps.lng, carEngOrientationArray.overlay[j].gps.lat);
                                        let currentCarEngOriPoint = new BMap.Point(devBaseInfo[i].lng, devBaseInfo[i].lat);
                                        if (map.getDistance(lastCarEngOriPoint, currentCarEngOriPoint) <= 5) {
                                            carEngOriRedraw = false;
                                            if (carEngOrientationArray.overlay[j].value < Energy.getEnergyMaxValue(energyArray)) {
                                                map.removeOverlay(carEngOrientationArray.overlay[j].overlay);
                                                carEngOrientationArray.overlay.splice(j, 1);
                                                carEngOriRedraw = true;
                                            }
                                        }
                                        // if (carEngOrientationArray.overlay[j].gps.lng == devBaseInfo[i].lng && carEngOrientationArray.overlay[j].gps.lat == devBaseInfo[i].lat) {
                                        //     map.removeOverlay(carEngOrientationArray.overlay[j].overlay);
                                        //     carEngOrientationArray.overlay.splice(j, 1);
                                        // }
                                    }
                                    if (carEngOriRedraw) {
                                        let carEngOrientation = new CarEngOrientationConstructor(currentBaiduPoint, energyArray, devBaseInfo[i].northAngle, devBaseInfo[i].devCode, devBaseInfo[i].reportTime);
                                        carEngOrientationArray.overlay.push({ gps: { lng: devBaseInfo[i].lng, lat: devBaseInfo[i].lat }, overlay: carEngOrientation, value: Energy.getEnergyMaxValue(energyArray) });
                                        map.addOverlay(carEngOrientation);
                                        if (!carEngOrientationArray.isShow) {
                                            carEngOrientation.hide();
                                        }
                                    }
                                }
                            }
                            break;
                        case 2: // 单兵
                            if (devBaseInfo[i].eng > 0) {
                                // 绘制能量指示
                                let singleEngOriRedraw = true;
                                for (let j = 0; j < singleEngOrientationArray.overlay.length; j++) {
                                    let lastSingleEngOriPoint = new BMap.Point(singleEngOrientationArray.overlay[j].gps.lng, singleEngOrientationArray.overlay[j].gps.lat);
                                    let currentSingleEngOriPoint = new BMap.Point(devBaseInfo[i].lng, devBaseInfo[i].lat);
                                    if (map.getDistance(lastSingleEngOriPoint, currentSingleEngOriPoint) <= 5) {
                                        singleEngOriRedraw = false;
                                        if (singleEngOrientationArray.overlay[j].value < devBaseInfo[i].eng) {
                                            map.removeOverlay(singleEngOrientationArray.overlay[j].overlay);
                                            singleEngOrientationArray.overlay.splice(j, 1);
                                            singleEngOriRedraw = true;
                                        }
                                    }
                                    // if (singleEngOrientationArray.overlay[j].gps.lng == devBaseInfo[i].lng && singleEngOrientationArray.overlay[j].gps.lat == devBaseInfo[i].lat) {
                                    //     map.removeOverlay(singleEngOrientationArray.overlay[j].overlay);
                                    //     singleEngOrientationArray.overlay.splice(j, 1);
                                    // }
                                }
                                if (singleEngOriRedraw) {
                                    let singleEngOrientation = new SingleEngOrientationConstructor(currentBaiduPoint, devBaseInfo[i].eng, devBaseInfo[i].northAngle, devBaseInfo[i].devCode, devBaseInfo[i].reportTime);
                                    singleEngOrientationArray.overlay.push({ gps: { lng: devBaseInfo[i].lng, lat: devBaseInfo[i].lat }, overlay: singleEngOrientation, value: devBaseInfo[i].eng });
                                    map.addOverlay(singleEngOrientation);
                                    if (!singleEngOrientationArray.isShow) {
                                        singleEngOrientation.hide();
                                    }
                                }
                            }
                            break;
                        default:
                            break;
                    }
                }
                /* 绘制路径线*/
                if (lastBaiduPoint != null) {
                    // if (devBaseInfo[i].status != 0 && historyDevInfoMap.get(devBaseInfo[i].devCode).lastStatus == 1) {
                    if (currentBaiduPoint.lng != lastBaiduPoint.lng && currentBaiduPoint.lat != lastBaiduPoint.lat) {
                        /* 中心点坐标*/
                        let cpGpsBd = GPSToBaiduPoint.getBaiduPointLocation([[cpt.lng, cpt.lat]])[0]
                        let canDrawLine = false; // 根据中心点判断是否绘制路径线
                        if (devBaseInfo[i].devType == 1) { // 车载
                            canDrawLine = true;
                            /**edti by gaochao start */
                            // } else if (devBaseInfo[i].devType == 2) { // 单兵
                        } else if (devBaseInfo[i].devType == 2 || devBaseInfo[i].devType == 3) { // 单兵
                            /**edit by gaochao end */
                            let setCanDrawLine = function (val) {
                                if (cpt.devType == 1) {
                                    /* 单兵以车载为中心*/
                                    if (map.getDistance(new BMap.Point(cpGpsBd.lng, cpGpsBd.lat), currentBaiduPoint) > val) {
                                        canDrawLine = true;
                                    }
                                    /**edti by gaochao start */
                                    // } else if (cpt.devType == 2) {
                                } else if (cpt.devType == 2 || cpt.devType == 3) {
                                    /**edit by gaochao end */
                                    /* 单兵以单兵为中心*/
                                    if (cpt.devCode != devBaseInfo[i].devCode) { // 自己不是中心
                                        if (map.getDistance(new BMap.Point(cpGpsBd.lng, cpGpsBd.lat), currentBaiduPoint) > val) {
                                            canDrawLine = true;
                                        }
                                    } else { // 自己是中心 
                                        canDrawLine = true;
                                    }
                                }
                            }
                            switch (devBaseInfo[i].separateFlag) {
                                case 0:
                                    setCanDrawLine(50);
                                    break;
                                case 1:
                                    canDrawLine = false;
                                    setCanDrawLine(100);
                                    break;
                                case 2:
                                    canDrawLine = true;
                                    break;
                                default:
                                    setCanDrawLine(50);
                                    break;
                            }
                        }
                        let divide = 0;
                        if (devBaseInfo[i].devType == 1) {
                            divide = 70;
                        } else {
                            divide = 35;
                        }
                        if (map.getDistance(currentBaiduPoint, lastBaiduPoint) <= divide) {
                            if (canDrawLine) {
                                historyDevLineMap.get(devBaseInfo[i].devCode).data.push([lastBaiduPoint, currentBaiduPoint]);
                            }
                        }
                    }
                }
                if (lastActiveHit != null) {
                    /* 绘制主动式轨迹*/
                    let drawPassiveLine = function () {
                        let passiveActiveLine = new BMap.Polyline([
                            lastBaiduPoint,
                            currentBaiduPoint,
                        ], { strokeColor: 'red', strokeWeight: 5, strokeOpacity: 0.5 });
                        linePassive.line.push(passiveActiveLine);
                        map.addOverlay(passiveActiveLine);
                        if (!linePassive.isShow) {
                            passiveActiveLine.hide();
                        }
                    }
                    if (devBaseInfo[i].activeHit == 1 && lastActiveHit == 1 || devBaseInfo[i].activeHit != 1 && lastActiveHit == 1) {
                        if (currentBaiduPoint.lng != lastBaiduPoint.lng && currentBaiduPoint.lat != lastBaiduPoint.lat) {
                            drawPassiveLine();
                        } else {
                            if (devBaseInfo[i].activeHit == 1 && lastActiveHit != 1) {
                                drawPassiveLine();
                            }
                        }
                    }
                    /* 绘制主动式命中/脱网标记*/
                    let isDrawPassiveActiveMarkerOverlay = 0;
                    if (devBaseInfo[i].activeHit == 1 && lastActiveHit != 1) {
                        isDrawPassiveActiveMarkerOverlay = 1; // 主动式命中
                    } else if (devBaseInfo[i].activeHit != 1 && lastActiveHit == 1) {
                        isDrawPassiveActiveMarkerOverlay = 2; // 主动式脱网
                    }
                    if (isDrawPassiveActiveMarkerOverlay != 0) {
                        let passiveActiveMarkerOverlay = new PassiveActiveMarkerOverlayConstructor(currentBaiduPoint, isDrawPassiveActiveMarkerOverlay);
                        linePassive.overlay.push(passiveActiveMarkerOverlay);
                        map.addOverlay(passiveActiveMarkerOverlay);
                        if (!linePassive.isShow) {
                            passiveActiveMarkerOverlay.hide();
                        }
                    }
                }
                /* 结束绘制（放到前面会有路径线中断的问题）*/
                if (i == devBaseInfo.length - 1 || devBaseInfo[i + 1].reportTime > endTime) {
                    let devBaseInfoExistMap = new Map();
                    /* 放置设备*/
                    let isPut = false;
                    for (let j = i; j > 0; j--) {
                        if (devBaseInfoExistMap.get(devBaseInfo[j].devCode) == null) {
                            isPut = true;
                            ParsingDevInfoCR.parsingDevInfo(ParsingData.FormatDevData(devBaseInfo[j]));
                            devBaseInfoExistMap.set(devBaseInfo[j].devCode, 'existed');
                        }
                        if (devBaseInfoExistMap.size == replayDevNumCache) {
                            break;
                        }
                    }
                    if (!isPut) {
                        ParsingDevInfoCR.parsingDevInfo(ParsingData.FormatDevData(devBaseInfo[0]));
                    }
                    devIndex = i + 1;
                    /* 设置能量面板*/
                    devBaseInfoExistMap = new Map();
                    for (let j = i; j > 0; j--) {
                        /**edit by gaochao start */
                        if (devBaseInfoExistMap.get(devBaseInfo[j].devCode) == null && devBaseInfo[j].eng != null && devBaseInfo[j].eng != "") {
                            /**edit by gaochao end */
                            switch (devBaseInfo[j].devType) {
                                case 1:
                                    let energyArrTemp = devBaseInfo[j].eng.split("-");
                                    energyArrTemp = [Number(energyArrTemp[0]), Number(energyArrTemp[1]), Number(energyArrTemp[2]), Number(energyArrTemp[3])];
                                    EngPanel.showCarEng(devBaseInfo[j].devCode, energyArrTemp, devBaseInfo[j].reportTime);
                                    break;
                                case 2:
                                    EngPanel.showCarEng(devBaseInfo[j].devCode, devBaseInfo[j].eng, devBaseInfo[j].reportTime);
                                    break;
                                default:
                                    break;
                            }
                            isPut = true;
                            devBaseInfoExistMap.set(devBaseInfo[j].devCode, 'existed');
                        }
                        if (devBaseInfoExistMap.size == replayDevNumCache) {
                            break;
                        }
                    }
                    /* 绘制路径线，并将当前视角的设备轨迹设置为绿色*/
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
                    if (historyDevLineMap.get(currentViewDevCode) != null && historyDevLineMap.get(currentViewDevCode).line != null) {
                        for (let j = 0; j < historyDevLineMap.get(currentViewDevCode).line.length; j++) {
                            historyDevLineMap.get(currentViewDevCode).line[j].setStrokeColor('#008030');
                        }
                    }
                    let mapCenterPoint = GPSToBaiduPoint.getBaiduPointLocation([[devBaseInfo[i].lng, devBaseInfo[i].lat]])[0];
                    map.setCenter(new BMap.Point(mapCenterPoint.lng, mapCenterPoint.lat));
                    $('.search-loading').css('display', 'none');
                    break;
                }
                /* 基站命中次数，放到前面命中次数可能会多一次*/
                let hitedBts = { btsId: null, dev: [] };
                /**edit by sunbing start*/
                if (devBaseInfo[i].eng != null && devBaseInfo[i].eng != "" && devBaseInfo[i].btsId != '0-0-0-0' && devBaseInfo[i].isShow == 1) {
                    /**edit by sunbing end*/
                    if (multiBtsInfoMap.get(devBaseInfo[i].btsId) != null && multiBtsInfoMap.get(devBaseInfo[i].btsId).type == 1) {
                        if (btsInfoMap.get(devBaseInfo[i].btsId).hitTimes == null) {
                            btsInfoMap.get(devBaseInfo[i].btsId).hitTimes = 0;
                        }
                        btsInfoMap.get(devBaseInfo[i].btsId).hitTimes = btsInfoMap.get(devBaseInfo[i].btsId).hitTimes + 1 // 更新map中的命中次数
                        $(`.bts-click-${devBaseInfo[i].btsId}`).css('z-index', 6000); // z轴置顶
                        $(`.bts-img-${devBaseInfo[i].btsId}`).removeClass('bts-img-unhit'); // 去除未命中标记
                        $(`.bts-click-${devBaseInfo[i].btsId}`).removeClass('bts-click-unhit'); // 去除未命中标记
                        $(`.bts-img-${devBaseInfo[i].btsId}`).removeClass('gray-cover'); // 去除灰色滤镜
                        if (targetCellInfosCache.get(devBaseInfo[i].btsId) == null) {
                            $(`.bts-img-${devBaseInfo[i].btsId}`).attr('src', `img/btsicon/btsiconhit-${btsInfoMap.get(devBaseInfo[i].btsId).mode}.png`);
                            /**edti by gaochao start */
                            if ((replayCurrentTime - btsInfoMap.get(devBaseInfo[i].btsId).reportTime) < 360000) {
                                $(`.bts-img-${devBaseInfo[i].btsId}`).attr('src', `img/btsicon/btsiconhit-${btsInfoMap.get(devBaseInfo[i].btsId).mode}.png`);
                            } else {
                                $(`.bts-img-${devBaseInfo[i].btsId}`).attr('src', `img/btsicon/btslasthit-${btsInfoMap.get(devBaseInfo[i].btsId).mode}.png`);
                            }
                            /**edit by gaochao end */
                        }
                        // $(`.bts-hit-count-${devBaseInfo[i].btsId}`).html(btsInfoMap.get(devBaseInfo[i].btsId).hitTimes);
                        $(`.bts-hit-count-${devBaseInfo[i].btsId}`).html((btsInfoMap.get(devBaseInfo[i].btsId).dlHitTimes == undefined || btsInfoMap.get(devBaseInfo[i].btsId).dlHitTimes == null) ? btsInfoMap.get(devBaseInfo[i].btsId).hitTimes + "/0" : btsInfoMap.get(devBaseInfo[i].btsId).hitTimes + "/" + btsInfoMap.get(devBaseInfo[i].btsId).dlHitTimes);
                        /**add by gaochao start */
                        if (btsInfoMap.get(devBaseInfo[i].btsId).hitTimes != 0) {
                            $(`.bts-hit-count-shadow-${devBaseInfo[i].btsId}`).css('display', 'block');
                        }
                        /**add by gaochao end*/
                        if (hitedBtsCache.btsId != devBaseInfo[i].btsId) {
                            hitedBts.btsId = devBaseInfo[i].btsId;
                            hitedBts.dev.push(devBaseInfo[i].devCode);
                            hitedBtsCache = hitedBts;
                        }
                    } else if (multiBtsInfoMap.get(devBaseInfo[i].btsId) != null && multiBtsInfoMap.get(devBaseInfo[i].btsId).type == 2) {
                        if (btsInfoMap.get(devBaseInfo[i].btsId).hitTimes == null) {
                            btsInfoMap.get(devBaseInfo[i].btsId).hitTimes = 0;
                        }
                        btsInfoMap.get(devBaseInfo[i].btsId).hitTimes = btsInfoMap.get(devBaseInfo[i].btsId).hitTimes + 1 // 更新map中的命中次数
                        //复合基站
                        $(`.multi-bts-img-${devBaseInfo[i].btsId}`).removeClass('bts-img-unhit'); // 去除未命中标记
                        $(`.multi-bts-click-${devBaseInfo[i].btsId}`).removeClass('bts-click-unhit'); // 去除未命中标记
                        $(`.multi-bts-img-${devBaseInfo[i].btsId}`).removeClass('gray-cover'); // 去除灰色滤镜
                        $(`.multi-bts-click-${devBaseInfo[i].btsId}`).css('z-index', 6000); // z轴置顶
                        // $(`.multi-bts-hit-count-${key}`).html(btsHitInfo.hitTimes+"/"+btsHitInfo.dlHitTimes);
                        $(`.multi-bts-img-${devBaseInfo[i].btsId}`).attr('src', `img/multibtsicon/btsiconhit-${btsInfoMap.get(devBaseInfo[i].btsId).mode}.png`);
                        //子图标添加样式
                        $(`.bts-img-${devBaseInfo[i].btsId}`).removeClass('bts-img-unhit'); // 去除未命中标记
                        $(`.multi-sub-bts-click-${devBaseInfo[i].btsId}`).removeClass('bts-click-unhit'); // 去除未命中标记
                        $(`.bts-img-${devBaseInfo[i].btsId}`).removeClass('gray-cover'); // 去除灰色滤镜
                        $(`.multi-sub-bts-click-${devBaseInfo[i].btsId}`).css('z-index', 6000); // z轴置顶
                        $(`.multi-sub-bts-hit-count-${devBaseInfo[i].btsId}`).html((btsInfoMap.get(devBaseInfo[i].btsId).dlHitTimes == undefined || btsInfoMap.get(devBaseInfo[i].btsId).dlHitTimes == null) ? btsInfoMap.get(devBaseInfo[i].btsId).hitTimes + "/0" : btsInfoMap.get(devBaseInfo[i].btsId).hitTimes + "/" + btsInfoMap.get(devBaseInfo[i].btsId).dlHitTimes);
                        $(`.multi-sub-bts-hit-count-shadow-${devBaseInfo[i].btsId}`).css('display', 'block');
                        $(`.bts-img-${devBaseInfo[i].btsId}`).attr('src', `img/btsicon/btsiconhit-${btsInfoMap.get(devBaseInfo[i].btsId).mode}.png`);
                        if (hitedBtsCache.btsId != devBaseInfo[i].btsId) {
                            hitedBts.btsId = devBaseInfo[i].btsId;
                            hitedBts.dev.push(devBaseInfo[i].devCode);
                            hitedBtsCache = hitedBts;
                        }
                    } else if (multiBtsInfoMap.get(devBaseInfo[i].btsId) == null && btsInfoMap.get(devBaseInfo[i].btsId) != undefined) {
                        if (btsInfoMap.get(devBaseInfo[i].btsId).hitTimes == null) {
                            btsInfoMap.get(devBaseInfo[i].btsId).hitTimes = 0;
                        }
                        btsInfoMap.get(devBaseInfo[i].btsId).hitTimes = btsInfoMap.get(devBaseInfo[i].btsId).hitTimes + 1 // 更新map中的命中次数
                        let parentBtsId = btsInfoMap.get(devBaseInfo[i].btsId).parentBtsId;
                        $(`.multi-bts-img-${parentBtsId}`).removeClass('bts-img-unhit'); // 去除未命中标记
                        $(`.multi-bts-click-${parentBtsId}`).removeClass('bts-click-unhit'); // 去除未命中标记
                        $(`.multi-bts-img-${parentBtsId}`).removeClass('gray-cover'); // 去除灰色滤镜
                        $(`.multi-bts-click-${parentBtsId}`).css('z-index', 6000); // z轴置顶
                        // $(`.multi-bts-hit-count-${parentBtsId}`).html(btsHitInfo.hitTimes+"/"+btsHitInfo.dlHitTimes);
                        $(`.multi-bts-img-${parentBtsId}`).attr('src', `img/multibtsicon/btsiconhit-${btsInfoMap.get(devBaseInfo[i].btsId).mode}.png`);
                        //子图标添加样式
                        $(`.bts-img-${devBaseInfo[i].btsId}`).removeClass('bts-img-unhit'); // 去除未命中标记
                        $(`.multi-sub-bts-click-${devBaseInfo[i].btsId}`).removeClass('bts-click-unhit'); // 去除未命中标记
                        $(`.bts-img-${devBaseInfo[i].btsId}`).removeClass('gray-cover'); // 去除灰色滤镜
                        $(`.multi-sub-bts-click-${devBaseInfo[i].btsId}`).css('z-index', 6000); // z轴置顶
                        $(`.multi-sub-bts-hit-count-${devBaseInfo[i].btsId}`).html((btsInfoMap.get(devBaseInfo[i].btsId).dlHitTimes == undefined || btsInfoMap.get(devBaseInfo[i].btsId).dlHitTimes == null) ? btsInfoMap.get(devBaseInfo[i].btsId).hitTimes + "/0" : btsInfoMap.get(devBaseInfo[i].btsId).hitTimes + "/" + btsInfoMap.get(devBaseInfo[i].btsId).dlHitTimes);
                        $(`.multi-sub-bts-hit-count-shadow-${devBaseInfo[i].btsId}`).css('display', 'block');
                        $(`.bts-img-${devBaseInfo[i].btsId}`).attr('src', `img/btsicon/btsiconhit-${btsInfoMap.get(devBaseInfo[i].btsId).mode}.png`);
                        if (hitedBtsCache.btsId != devBaseInfo[i].btsId) {
                            hitedBts.btsId = devBaseInfo[i].btsId;
                            hitedBts.dev.push(devBaseInfo[i].devCode);
                            hitedBtsCache = hitedBts;
                        }
                    }


                }

                if (devBaseInfo[i].dlBtsId != undefined && devBaseInfo[i].dlBtsId != '0-0-0-0' && devBaseInfo[i].dlBtsId != '') {
                    /**edit by sunbing end*/
                    if (multiBtsInfoMap.get(devBaseInfo[i].dlBtsId) != null && multiBtsInfoMap.get(devBaseInfo[i].dlBtsId).type == 1) {
                        if (btsInfoMap.get(devBaseInfo[i].dlBtsId).dlHitTimes == null) {
                            btsInfoMap.get(devBaseInfo[i].dlBtsId).dlHitTimes = 0;
                        }
                        btsInfoMap.get(devBaseInfo[i].dlBtsId).dlHitTimes = btsInfoMap.get(devBaseInfo[i].dlBtsId).dlHitTimes + 1 // 更新map中的命中次数
                        $(`.bts-click-${devBaseInfo[i].dlBtsId}`).css('z-index', 6000); // z轴置顶
                        $(`.bts-img-${devBaseInfo[i].dlBtsId}`).removeClass('bts-img-unhit'); // 去除未命中标记
                        $(`.bts-click-${devBaseInfo[i].dlBtsId}`).removeClass('bts-click-unhit'); // 去除未命中标记
                        $(`.bts-img-${devBaseInfo[i].dlBtsId}`).removeClass('gray-cover'); // 去除灰色滤镜
                        if (targetCellInfosCache.get(devBaseInfo[i].dlBtsId) == null) {
                            $(`.bts-img-${devBaseInfo[i].dlBtsId}`).attr('src', `img/btsicon/btsiconhit-${btsInfoMap.get(devBaseInfo[i].dlBtsId).mode}.png`);
                            /**edti by gaochao start */
                            if ((replayCurrentTime - btsInfoMap.get(devBaseInfo[i].dlBtsId).reportTime) < 360000) {
                                $(`.bts-img-${devBaseInfo[i].dlBtsId}`).attr('src', `img/btsicon/btsiconhit-${btsInfoMap.get(devBaseInfo[i].dlBtsId).mode}.png`);
                            } else {
                                $(`.bts-img-${devBaseInfo[i].dlBtsId}`).attr('src', `img/btsicon/btslasthit-${btsInfoMap.get(devBaseInfo[i].dlBtsId).mode}.png`);
                            }
                            /**edit by gaochao end */
                        }
                        // $(`.bts-hit-count-${devBaseInfo[i].dlBtsId}`).html(btsInfoMap.get(devBaseInfo[i].dlBtsId).dlHitTimes);
                        $(`.bts-hit-count-${devBaseInfo[i].dlBtsId}`).html((btsInfoMap.get(devBaseInfo[i].dlBtsId).hitTimes == undefined || btsInfoMap.get(devBaseInfo[i].dlBtsId).hitTimes == null) ? "/0" + btsInfoMap.get(devBaseInfo[i].dlBtsId).dlHitTimes : btsInfoMap.get(devBaseInfo[i].dlBtsId).hitTimes + "/" + btsInfoMap.get(devBaseInfo[i].dlBtsId).dlHitTimes);

                        /**add by gaochao start */
                        if (btsInfoMap.get(devBaseInfo[i].dlBtsId).dlHitTimes != 0) {
                            $(`.bts-hit-count-shadow-${devBaseInfo[i].dlBtsId}`).css('display', 'block');
                        }
                        /**add by gaochao end*/
                        if (hitedBtsCache.btsId != devBaseInfo[i].dlBtsId) {
                            hitedBts.btsId = devBaseInfo[i].dlBtsId;
                            hitedBts.dev.push(devBaseInfo[i].devCode);
                            hitedBtsCache = hitedBts;
                        }
                    } else if (multiBtsInfoMap.get(devBaseInfo[i].dlBtsId) != null && multiBtsInfoMap.get(devBaseInfo[i].dlBtsId).type == 2) {
                        if (btsInfoMap.get(devBaseInfo[i].dlBtsId).dlHitTimes == null) {
                            btsInfoMap.get(devBaseInfo[i].dlBtsId).dlHitTimes = 0;
                        }
                        btsInfoMap.get(devBaseInfo[i].dlBtsId).dlHitTimes = btsInfoMap.get(devBaseInfo[i].dlBtsId).dlHitTimes + 1 // 更新map中的命中次数
                        //复合基站
                        $(`.multi-bts-img-${devBaseInfo[i].dlBtsId}`).removeClass('bts-img-unhit'); // 去除未命中标记
                        $(`.multi-bts-click-${devBaseInfo[i].dlBtsId}`).removeClass('bts-click-unhit'); // 去除未命中标记
                        $(`.multi-bts-img-${devBaseInfo[i].dlBtsId}`).removeClass('gray-cover'); // 去除灰色滤镜
                        $(`.multi-bts-click-${devBaseInfo[i].dlBtsId}`).css('z-index', 6000); // z轴置顶
                        // $(`.multi-bts-hit-count-${key}`).html(btsHitInfo.hitTimes+"/"+btsHitInfo.dlHitTimes);
                        $(`.multi-bts-img-${devBaseInfo[i].dlBtsId}`).attr('src', `img/multibtsicon/btsiconhit-${btsInfoMap.get(devBaseInfo[i].dlBtsId).mode}.png`);
                        //子图标添加样式
                        $(`.bts-img-${devBaseInfo[i].dlBtsId}`).removeClass('bts-img-unhit'); // 去除未命中标记
                        $(`.multi-sub-bts-click-${devBaseInfo[i].dlBtsId}`).removeClass('bts-click-unhit'); // 去除未命中标记
                        $(`.bts-img-${devBaseInfo[i].dlBtsId}`).removeClass('gray-cover'); // 去除灰色滤镜
                        $(`.multi-sub-bts-click-${devBaseInfo[i].dlBtsId}`).css('z-index', 6000); // z轴置顶
                        $(`.multi-sub-bts-hit-count-${devBaseInfo[i].dlBtsId}`).html((btsInfoMap.get(devBaseInfo[i].dlBtsId).hitTimes == undefined || btsInfoMap.get(devBaseInfo[i].dlBtsId).hitTimes == null) ? "/0" + btsInfoMap.get(devBaseInfo[i].dlBtsId).dlHitTimes : btsInfoMap.get(devBaseInfo[i].dlBtsId).hitTimes + "/" + btsInfoMap.get(devBaseInfo[i].dlBtsId).dlHitTimes);
                        $(`.multi-sub-bts-hit-count-shadow-${devBaseInfo[i].dlBtsId}`).css('display', 'block');
                        $(`.bts-img-${devBaseInfo[i].dlBtsId}`).attr('src', `img/btsicon/btsiconhit-${btsInfoMap.get(devBaseInfo[i].dlBtsId).mode}.png`);

                        if (hitedBtsCache.btsId != devBaseInfo[i].dlBtsId) {
                            hitedBts.btsId = devBaseInfo[i].dlBtsId;
                            hitedBts.dev.push(devBaseInfo[i].devCode);
                            hitedBtsCache = hitedBts;
                        }
                    }
                    else if (multiBtsInfoMap.get(devBaseInfo[i].dlBtsId) == null && btsInfoMap.get(devBaseInfo[i].dlBtsId) != undefined) {
                        if (btsInfoMap.get(devBaseInfo[i].dlBtsId).dlHitTimes == null) {
                            btsInfoMap.get(devBaseInfo[i].dlBtsId).dlHitTimes = 0;
                        }
                        btsInfoMap.get(devBaseInfo[i].dlBtsId).dlHitTimes = btsInfoMap.get(devBaseInfo[i].dlBtsId).dlHitTimes + 1 // 更新map中的命中次数
                        let parentBtsId = btsInfoMap.get(devBaseInfo[i].dlBtsId).parentBtsId;
                        $(`.multi-bts-img-${parentBtsId}`).removeClass('bts-img-unhit'); // 去除未命中标记
                        $(`.multi-bts-click-${parentBtsId}`).removeClass('bts-click-unhit'); // 去除未命中标记
                        $(`.multi-bts-img-${parentBtsId}`).removeClass('gray-cover'); // 去除灰色滤镜
                        $(`.multi-bts-click-${parentBtsId}`).css('z-index', 6000); // z轴置顶
                        // $(`.multi-bts-hit-count-${parentBtsId}`).html(btsHitInfo.hitTimes+"/"+btsHitInfo.dlHitTimes);
                        $(`.multi-bts-img-${parentBtsId}`).attr('src', `img/multibtsicon/btsiconhit-${btsInfoMap.get(devBaseInfo[i].dlBtsId).mode}.png`);
                        //子图标添加样式
                        $(`.bts-img-${devBaseInfo[i].dlBtsId}`).removeClass('bts-img-unhit'); // 去除未命中标记
                        $(`.multi-sub-bts-click-${devBaseInfo[i].dlBtsId}`).removeClass('bts-click-unhit'); // 去除未命中标记
                        $(`.bts-img-${devBaseInfo[i].dlBtsId}`).removeClass('gray-cover'); // 去除灰色滤镜
                        $(`.multi-sub-bts-click-${devBaseInfo[i].dlBtsId}`).css('z-index', 6000); // z轴置顶
                        $(`.multi-sub-bts-hit-count-${devBaseInfo[i].dlBtsId}`).html((btsInfoMap.get(devBaseInfo[i].dlBtsId).hitTimes == undefined || btsInfoMap.get(devBaseInfo[i].dlBtsId).hitTimes == null) ? "/0" + btsInfoMap.get(devBaseInfo[i].dlBtsId).dlHitTimes : btsInfoMap.get(devBaseInfo[i].dlBtsId).hitTimes + "/" + btsInfoMap.get(devBaseInfo[i].dlBtsId).dlHitTimes);
                        $(`.multi-sub-bts-hit-count-shadow-${devBaseInfo[i].dlBtsId}`).css('display', 'block');
                        $(`.bts-img-${devBaseInfo[i].dlBtsId}`).attr('src', `img/btsicon/btsiconhit-${btsInfoMap.get(devBaseInfo[i].dlBtsId).mode}.png`);

                        if (hitedBtsCache.btsId != devBaseInfo[i].dlBtsId) {
                            hitedBts.btsId = devBaseInfo[i].dlBtsId;
                            hitedBts.dev.push(devBaseInfo[i].devCode);
                            hitedBtsCache = hitedBts;
                        }
                    }

                }



                /**edit by sunbing start*/
                if (hitedBts.btsId != null && hitedBts.btsId != "" && isBtsOpen) {
                    /**edit by sunbing end*/
                    DrawMultiBtsEcharts.showBtsStyleCSS(hitedBts);
                }
                /* */
                historyDevInfoMap.set(devBaseInfo[i].devCode, {
                    lastBaiduPoint: currentBaiduPoint,
                    lastActiveHit: devBaseInfo[i].activeHit,
                    lastStatus: devBaseInfo[i].status,
                });
            }
            /* 设备主动式详细信息 */
            if (devActiveDetailInfo && devActiveDetailInfo.length > 0) {
                for (let i = 0; i < devActiveDetailInfo.length; i++) {
                    PrasingDevActiveDetailInfo.showDevActiveEngLogInfo(devActiveDetailInfo[i]);
                    if (new Date(devActiveDetailInfo[i].reportTime).getTime() > endTime) {
                        devActiveDetailInfoIndex = i;
                        PrasingDevActiveDetailInfo.showDevActiveDetailInfo(devActiveDetailInfo[i]);
                        break;
                    }
                }
            }
            /* 基站解析*/
            for (let i = 0; i < statusInfo.length; i++) {
                if (statusInfo[i].reportTime > endTime) {
                    statusIndex = i;
                    PrasingBtsInfoCR.prasingStatusInfo(statusInfo[i]);
                    break;
                }
            }
            /* 目标小区*/
            for (let i = 0; i < targetCellInfo.length; i++) {
                if (targetCellInfo[i].createTime > endTime) {
                    targetCellInfoIndex = i;
                    break;
                }
                targetCellInfosCache.set(targetCellInfo[i].btsId, targetCellInfo[i]);
                PrasingBtsInfoCR.showTargetCell();
            }
            /**add by gaochao start */
            /* 预锁基站*/
            for (let i = 0; i < preLockCellInfo.length; i++) {
                if (preLockCellInfo[i].createTime > endTime) {
                    devPreLockCellInfoIndex = i;
                    break;
                }
                // preLockCellInfosCache.set(preLockCellInfo[i].btsId, preLockCellInfo[i]);
                // PrasingBtsInfoCR.showPreLockCell();
            }
            /**add by gaochao end*/
            
            /* 目标所在基站LTE信息（Catch）*/
            if (lteCatchInfo && lteCatchInfo.length > 0) {
                for (let i = 0; i < lteCatchInfo.length; i++) {
                    if (new Date(lteCatchInfo[i].reportTime).getTime() > endTime) {
                        lteCatchInfoIndex = i;
                        PrasingLteCatchInfo.showLteCatchInfo(lteCatchInfo[i]);
                        break;
                    }
                    /**/
                }
            }
            // /* 设备主动式详细信息 */
            // if (devActiveDetailInfo && devActiveDetailInfo.length > 0) {
            //     for (let i = 0; i < devActiveDetailInfo.length; i++) {
            //         PrasingDevActiveDetailInfo.showDevActiveEngLogInfo(devActiveDetailInfo[i]);
            //         if (new Date(devActiveDetailInfo[i].reportTime).getTime() > endTime) {
            //             devActiveDetailInfoIndex = i;
            //             PrasingDevActiveDetailInfo.showDevActiveDetailInfo(devActiveDetailInfo[i]);
            //             break;
            //         }
            //     }
            // }

            /* 设备TA Data信息 */
            if (devTdoaDataInfo && devTdoaDataInfo.length > 0) {
                for (let i = 0; i < devTdoaDataInfo.length; i++) {
                    if (new Date(devTdoaDataInfo[i].reportTime).getTime() > endTime) {
                        break;
                    } else {
                        PrasingHistoryTaDataInfo.showTaDataInfo(devTdoaDataInfo[i]);
                        taDataInfoIndex = i;
                    }
                }

            }

            /* 设备TA Draw信息 */
            if (devTdoaDrawInfo && devTdoaDrawInfo.length > 0) {
                for (let i = 0; i < devTdoaDrawInfo.length; i++) {
                    if (new Date(devTdoaDrawInfo[i].reportTime).getTime() > endTime) {
                        if (i > 0) {
                            PrasingTaDrawInfo.showTaDrawInfo(devTdoaDrawInfo[i]);
                        }
                        taDrawInfoIndex = i;
                        break;
                    }
                }
            }

            historyRouteLineIsFinish = true;
        }

    }

}