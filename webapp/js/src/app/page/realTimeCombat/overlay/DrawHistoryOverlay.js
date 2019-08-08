import { BaiduMapInit } from '../../../common/baiduMap/Init.BaiduMap.js';
import { GPSToBaiduPoint } from '../../../common/baiduMap/GPSToBaiduPoint.BaiduMap.js';

import { BtsValue } from '../bts/BtsValue.js';
import { Energy } from '../energy/Energy.js';

import { BtsValue } from '../bts/BtsValue.js';
import { ParsingMultiBtsInfo } from '../parsing/ParsingMultiBtsInfo.js';
import { DrawBtsEcharts } from '../overlay/DrawBtsEcharts.js';

import { PassiveActiveMarkerOverlayConstructor } from '../overlay/PassiveActiveMarkerOverlayConstructor.js';
import { CarEngOrientationConstructor } from '../overlay/CarEngOrientationConstructor.js';
import { SingleEngOrientationConstructor } from '../overlay/SingleEngOrientationConstructor.js';
import { StartPointOverlay } from '../overlay/StartPointOverlay.js';

import { Panel } from '../tool/Panel.js';

export class DrawHistoryOverlay {

    static engPanelHistory(devBaseInfo, devCount) {
        /* 右面版显示历史授时信息*/
        let devBaseInfoExistMap = new Map();
        for (let i = devBaseInfo.length - 1; i >= 0; i--) {
            if (devBaseInfoExistMap.get(devBaseInfo[i].devCode) == null) {
                if (devBaseInfo[i].syncMode != null) {
                    switch (Number(devBaseInfo[i].syncMode)) {
                        case 1:
                            //$(`.team-each-dev-timeservice-${devBaseInfo[i].devCode}`).html('主授时');
                            $(`.team-each-dev-timeservice-${devBaseInfo[i].devCode}`).css('background-position', '-20px -70px');
                            $(`.team-each-dev-timeservice-${devBaseInfo[i].devCode}`).css('display', 'block');
                            /**add by gaochao start */
                            $(`#team-each-dev-timeservice-status-${devBaseInfo[i].devCode}`).css('display', 'block');
                            $(`#team-each-dev-timeservice-status-${devBaseInfo[i].devCode}`).css('background-position', 'url(img/icon/timeserver_main.png)');
                            $(`#team-each-dev-timeservice-value-${devBaseInfo[i].devCode}`).html('主授时');
                            /**add by gaochao end */
                            break;
                        case 2:
                            //$(`.team-each-dev-timeservice-${devBaseInfo[i].devCode}`).html('被授时');
                            $(`.team-each-dev-timeservice-${devBaseInfo[i].devCode}`).css('background-position', '-40px -70px');
                            $(`.team-each-dev-timeservice-${devBaseInfo[i].devCode}`).css('display', 'block');
                            /**add by gaochao start */
                            $(`#team-each-dev-timeservice-status-${devBaseInfo[i].devCode}`).css('display', 'block');
                            $(`#team-each-dev-timeservice-status-${devBaseInfo[i].devCode}`).css('background-position', 'url(img/icon/timeserver_passive.png)');
                            $(`#team-each-dev-timeservice-value-${devBaseInfo[i].devCode}`).html('被授时');
                            /**add by gaochao end */
                            break;
                        default:
                            break;
                    }
                    devBaseInfoExistMap.set(devBaseInfo[i].devCode, 'exist');
                }
            }
            if (devBaseInfoExistMap.size == devCount) {
                break;
            }
        }
        /* 右面版显示历史能量信息*/
        devBaseInfoExistMap = new Map();
        for (let i = devBaseInfo.length - 1; i >= 0; i--) {
            if (devBaseInfoExistMap.get(devBaseInfo[i].devCode) == null) {
                /**edit by gaochao start */
                if (devBaseInfo[i].eng != null && devBaseInfo[i].eng != ""&& devBaseInfo[i].isShow == 1) {
                    /**edit by gaochao end */
                    switch (Number(devBaseInfo[i].devType)) {
                        case 1:
                            let splitedEnergy = devBaseInfo[i].eng.split('-');
                            let energyArrayPanel = [Number(splitedEnergy[0]), Number(splitedEnergy[1]), Number(splitedEnergy[2]), Number(splitedEnergy[3])];
                            if (energyArrayPanel[0] == 1) {
                                for (let i = 0; i < 4; i++) {
                                    /**edti by gaochao start */
                                    $(`#eng-value-car-${i}-${devBaseInfo[i].devCode}`).html(`<span style="color: #666666;font-size:14px">1</span>`);
                                    /**edit by gaochao end */
                                }
                                $(`#eng-hit-time-car-${devBaseInfo[i].devCode}`).html(`${new Date(devBaseInfo[i].reportTime).Format('hh:mm:ss')}`); // 能量命中时间
                            } else {
                                let maxEngVal = energyArrayPanel[0]; // 设定一个默认初始值
                                let maxEngIndex = 0;
                                /* 获取最大值*/
                                for (let i = 0; i < 4; i++) {
                                    if (maxEngVal < energyArrayPanel[i]) {
                                        maxEngVal = energyArrayPanel[i];
                                        maxEngIndex = i;
                                    }
                                }
                                /* 最大值可能有多个，存储数组索引*/
                                let maxEngArr = [];
                                for (let i = 0; i < 4; i++) {
                                    if (maxEngVal == energyArrayPanel[i]) {
                                        maxEngArr.push(i);
                                    }
                                }
                                for (let i = 0; i < 4; i++) {
                                    let textColor;
                                    /**edti by gaochao start */
                                    let rightInfoPanelColor = ' style="color:#666666;font-size:14px"';
                                    /**edit by gaochao end */
                                    for (let j = 0; j < maxEngArr.length; j++) {
                                        if (i == maxEngArr[j]) {
                                            textColor = 'color:rgb(0, 255, 0)';
                                            /**edti by gaochao start */
                                            rightInfoPanelColor = ' style="color:#E82020;font-size:18px"';
                                            /**edit by gaochao end */
                                            break;
                                        }
                                    }
                                    $(`#eng-value-car-${i}-${devBaseInfo[i].devCode}`).html(`<span${rightInfoPanelColor}>${energyArrayPanel[i]}</span>`);
                                }
                                $(`#eng-hit-time-car-${devBaseInfo[i].devCode}`).html(`${new Date(devBaseInfo[i].reportTime).Format('hh:mm:ss')}`); // 能量命中时间
                            }
                            break;
                        case 2:
                            /**edti by gaochao start */
                            $(`#eng-value-single-${devBaseInfo[i].devCode}`).html(`<span style="color: #E82020">${devBaseInfo[i].eng}</span>`);
                            /**edit by gaochao end */
                            $(`#eng-hit-time-single-${devBaseInfo[i].devCode}`).html(`${new Date(devBaseInfo[i].reportTime).Format('hh:mm:ss')}`);
                            break;
                        default:
                            break;
                    }
                    devBaseInfoExistMap.set(devBaseInfo[i].devCode, 'exist');
                }
            }
            if (devBaseInfoExistMap.size == devCount) {
                break;
            }
        }
    }

    static drawHistory(historyDataMap) {

        historyDevBaseInfo(historyDataMap.historyDevBaseInfoList);
        historyBtsBaseInfo(historyDataMap.historyBtsInfoList, historyDataMap.historyDevBaseInfoList);
        /*delete by guoshuai start 2018-10-16
        historyDevStateInfo(historyDataMap.historyDevStateInfoList);
        delete by guoshuai end 2018-10-16*/
        /*add by guoshuai start 2018-10-16*/
        historyDevStateInfo(historyDataMap.historyDevStateInfoList, historyDataMap.historyDevBaseInfoList);
        /*add by guoshuai end 2018-10-16*/
        /* 显示历史最后一次触发信息*/
        /*delete by guoshuai start 2018-10-16
        function historyDevStateInfo(devStateInfo) {
            for (let i = devStateInfo.length - 1; i >= 0; i--) {
                if (devStateInfo[i].triggerInfo != null) {
                    let triggerInfo = JSON.parse(devStateInfo[i].triggerInfo);
                    if (triggerInfo != null) {
                        $('#sms-send-value').html(triggerInfo.sendTimes);
                        $('#sms-finish-value').html(triggerInfo.completeTimes);
                        $('#sms-receipt-value').html(triggerInfo.receiptTimes);
                        break;
                    }
                }
            }
        }
        delete by guoshuai end 2018-10-16*/
        /*add by guoshuai start 2018-10-16*/
        function historyDevStateInfo(devStateInfo, _devBaseInfo) {
            let last_devType;
            for (let i = _devBaseInfo.length - 1; i > 0; i--) {
                last_devType = _devBaseInfo[i].devType;
            }
            for (let i = devStateInfo.length - 1; i >= 0; i--) {
                if (last_devType == 1) {
                    if (devStateInfo[i].triggerInfo != null) {
                        let triggerInfo = JSON.parse(devStateInfo[i].triggerInfo);
                        if (triggerInfo != null) {
                            /**add by gaochao start */
                            $('.sms-info-icon').css('background', `url(img/icon/sms_${triggerInfo.triggerStatus}.png)`);
                            /**add by gaochao end*/
                            $('#sms-send-value').html(triggerInfo.sendTimes);
                            $('#sms-finish-value').html(triggerInfo.completeTimes);
                            $('#sms-receipt-value').html(triggerInfo.receiptTimes);
                            break;
                        }
                    }
                } else {
                    $('#sms-send-value').html('0');
                    $('#sms-finish-value').html('0');
                    $('#sms-receipt-value').html('0');
                }

            }
        }
        /*add by guoshuai end 2018-10-16*/
        /* 绘制历史基站*/
        function historyBtsBaseInfo(btsBaseInfo, devBaseInfo) {
            /* 判断基站是否已经在地图上，只绘制新增的基站*/
            let unExistBts = [];
            for (let i = 0; i < btsBaseInfo.length; i++) {
                let btsId = BtsValue.btsTag(btsBaseInfo[i].mode, btsBaseInfo[i].mcc, btsBaseInfo[i].mnc, btsBaseInfo[i].lacTac, btsBaseInfo[i].sid, btsBaseInfo[i].nid, btsBaseInfo[i].bid, btsBaseInfo[i].cellId);
                if (btsInfoMap.get(btsId) == null) {
                	 let lng = btsBaseInfo[i].lng;
                     let lat = btsBaseInfo[i].lat;
                     if(lng && lng != '' && typeof(lng) != undefined && lat && lat != '' && typeof(lat) != undefined) {
                         btsBaseInfo[i]['btsId'] = btsId;
                         btsBaseInfo[i]['type'] = 1;
                    	 btsBaseInfo[i]['child'] = [];
                    	 btsBaseInfo[i]['color'] = 0;
                    	 btsBaseInfo[i]['parentBtsId'] = '';
                    	 /** add by sunbing start */
                         btsBaseInfo[i]['analysisSrc'] = 0;
                         btsBaseInfo[i]['analysisValue'] = 0;
                         /** add by sunbing end */
                    	 unExistBts.push({ btsInfo: btsBaseInfo[i], btsId: btsId });
                     }
                }
            }
            /* 筛选信息中是否包含GPS坐标*/
            /*let carBts = [];
            for (let i = 0; i < unexistBts.length; i++) {
                let lng = unexistBts[i].btsInfo.lng;
                let lat = unexistBts[i].btsInfo.lat;
                if (lng != null && lat != null) {
                    carBts.push(unexistBts[i]);
                }
            }*/
            //暂时调试关闭
            //PrasingBtsInfo.getBtsBaiduPoint(carBts);
            ParsingMultiBtsInfo.handleBtsToDraw(unExistBts);
            /* 基站绘制完成后根据最后一次历史能量显示命中特效*/
            try {
                for (let i = devBaseInfo.length - 1; i > 0; i--) {
                    if (devBaseInfo[i].btsId != null || devBaseInfo[i].dlBtsId != null) {
                        let hitedBts = { btsId: null, dev: [] };
                        hitedBts.btsId = devBaseInfo[i].btsId;
                        hitedBts.dev.push(devBaseInfo[i].devCode);
                        hitedBtsCache = hitedBts;
                        DrawBtsEcharts.showBtsStyleCSS(hitedBts);
                        break;
                    }
                }
            } catch (error) {
                console.log(error);
            }

        }

        function historyDevBaseInfo(_devBaseInfo) {
            let historyDevInfoMap = new Map();
            let maxEngCache = new Map();
            let i = 0;
            let drawHistoryLineInterval;
            let cpt = { devCode: null, devType: null, lng: null, lat: null };
            if (_devBaseInfo.length > 0) {
                for (let j = 0; j < _devBaseInfo.length; j++) {
                    if (devDrawInfoMap.get(_devBaseInfo[j].devCode) == null) {
                        Panel.addNewDev(_devBaseInfo, j);
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
                } else {
                    $('.team-each-dev-index-car').css('display', 'block');
                }
                if (singleDevNum < 2) {
                    $('.team-each-dev-index-single').css('display', 'none');
                } else {
                    $('.team-each-dev-index-single').css('display', 'block');
                }
                /* 绘制起点*/
                StartPointOverlay.draw({ lng: _devBaseInfo[0].lng, lat: _devBaseInfo[0].lat })
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
                /* 开启定时器*/
                drawHistoryLineInterval = setInterval(() => { draw(_devBaseInfo) }, 5);
            }
            let draw = function (devBaseInfo) {
                /* 更新中心点*/
                if (devBaseInfo[i].devCode == cpt.devCode) {
                    cpt.lng = _devBaseInfo[i].lng;
                    cpt.lat = _devBaseInfo[i].lat;
                }
                if (maxEngCache.get(devBaseInfo[i].devCode) == null) {
                    maxEngCache.set(devBaseInfo[i].devCode, { maxEng: { value: 0, position: { lng: 0, lat: 0, northAngle: 0, }, detail: '' } });
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
                }
                /* 绘制能量指示*/
                let carEngCache = [0, 0, 0, 0];
                if (devBaseInfo[i].isShow == 1) {
                    switch (devBaseInfo[i].devType) {
                        case 1: // 车载
                            let energyArray;
                            /**edit by sunbing start */
                            if (devBaseInfo[i].eng != null && devBaseInfo[i].eng != "") {
                                /**edit by sunbing end */
                                let energyArrayCache = devBaseInfo[i].eng.split('-');
                                energyArray = [Number(energyArrayCache[0]), Number(energyArrayCache[1]), Number(energyArrayCache[2]), Number(energyArrayCache[3])];
                            }
                            if (energyArray != null) {
                                carEngCache = energyArray;
                                if (energyArray[0] != 0 && energyArray[1] != 0 && energyArray[2] != 0 && energyArray[3] != 0) {
                                    // 存储能量最大值
                                    if (Energy.getEnergyMaxValue(energyArray) > maxEngCache.get(devBaseInfo[i].devCode).maxEng.value) {
                                        maxEngCache.get(devBaseInfo[i].devCode).maxEng.value = Energy.getEnergyMaxValue(energyArray);
                                        maxEngCache.get(devBaseInfo[i].devCode).maxEng.position.lng = currentPoint.lng;
                                        maxEngCache.get(devBaseInfo[i].devCode).maxEng.position.lat = currentPoint.lat;
                                        maxEngCache.get(devBaseInfo[i].devCode).maxEng.position.northAngle = devBaseInfo[i].northAngle;
                                        maxEngCache.get(devBaseInfo[i].devCode).maxEng.detail = energyArray;
                                    }
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
                                        carEngOrientationArray.overlay.push({ gps: { lng: devBaseInfo[i].lng, lat: devBaseInfo[i].lat }, overlay: carEngOrientation });
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
                                // 存储能量最大值
                                if (devBaseInfo[i].eng > maxEngCache.get(devBaseInfo[i].devCode).maxEng.value) {
                                    maxEngCache.get(devBaseInfo[i].devCode).maxEng.value = devBaseInfo[i].eng;
                                    maxEngCache.get(devBaseInfo[i].devCode).maxEng.position.lng = currentPoint.lng;
                                    maxEngCache.get(devBaseInfo[i].devCode).maxEng.position.lat = currentPoint.lat;
                                    maxEngCache.get(devBaseInfo[i].devCode).maxEng.position.northAngle = devBaseInfo[i].northAngle;
                                    maxEngCache.get(devBaseInfo[i].devCode).maxEng.detail = devBaseInfo[i].eng;
                                }
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
                                    singleEngOrientationArray.overlay.push({ gps: { lng: devBaseInfo[i].lng, lat: devBaseInfo[i].lat }, overlay: singleEngOrientation });
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
                    if (currentBaiduPoint.lng != lastBaiduPoint.lng || currentBaiduPoint.lat != lastBaiduPoint.lat) {
                        /* 中心点坐标*/
                        let cpGpsBd = GPSToBaiduPoint.getBaiduPointLocation([[cpt.lng, cpt.lat]])[0]
                        let canDrawLine = false; // 根据中心点判断是否绘制路径线
                        if (devBaseInfo[i].devType == 1) { // 车载
                            canDrawLine = true;
                        } else if (devBaseInfo[i].devType == 2) { // 单兵
                            switch (devBaseInfo[i].separateFlag) {
                                case 0:
                                    if (cpt.devType == 1) {
                                        /* 单兵以车载为中心*/
                                        if (map.getDistance(new BMap.Point(cpGpsBd.lng, cpGpsBd.lat), currentBaiduPoint) > 50) {
                                            canDrawLine = true;
                                        }
                                    } else if (cpt.devType == 2) {
                                        /* 单兵以单兵为中心*/
                                        if (cpt.devCode != devBaseInfo[i].devCode) { // 自己不是中心
                                            if (map.getDistance(new BMap.Point(cpGpsBd.lng, cpGpsBd.lat), currentBaiduPoint) > 50) {
                                                canDrawLine = true;
                                            }
                                        } else { // 自己是中心 
                                            canDrawLine = true;
                                        }
                                    }
                                    break;
                                case 1:
                                    canDrawLine = false;
                                    if (cpt.devType == 1) {
                                        /* 单兵以车载为中心*/
                                        if (map.getDistance(new BMap.Point(cpGpsBd.lng, cpGpsBd.lat), currentBaiduPoint) > 100) {
                                            canDrawLine = true;
                                        }
                                    } else if (cpt.devType == 2) {
                                        /* 单兵以单兵为中心*/
                                        if (cpt.devCode != devBaseInfo[i].devCode) { // 自己不是中心
                                            if (map.getDistance(new BMap.Point(cpGpsBd.lng, cpGpsBd.lat), currentBaiduPoint) > 100) {
                                                canDrawLine = true;
                                            }
                                        } else { // 自己是中心 
                                            canDrawLine = true;
                                        }
                                    }
                                    break;
                                case 2:
                                    canDrawLine = true;
                                    break;
                                default:
                                    if (cpt.devType == 1) {
                                        /* 单兵以车载为中心*/
                                        if (map.getDistance(new BMap.Point(cpGpsBd.lng, cpGpsBd.lat), currentBaiduPoint) > 50) {
                                            canDrawLine = true;
                                        }
                                    } else if (cpt.devType == 2) {
                                        /* 单兵以单兵为中心*/
                                        if (cpt.devCode != devBaseInfo[i].devCode) { // 自己不是中心
                                            if (map.getDistance(new BMap.Point(cpGpsBd.lng, cpGpsBd.lat), currentBaiduPoint) > 50) {
                                                canDrawLine = true;
                                            }
                                        } else { // 自己是中心 
                                            canDrawLine = true;
                                        }
                                    }
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
                        // if (map.getDistance(currentBaiduPoint, lastBaiduPoint) <= divide) {
                        //     if (canDrawLine) {
                        //         //if (devBaseInfo[i].devType == 1 || devBaseInfo[i].devType == 2 && devBaseInfo[i].separateFlag == 1) {
                        //         let devRouteLine = new BMap.Polyline([
                        //             lastBaiduPoint,
                        //             currentBaiduPoint,
                        //         ], { strokeColor: '#888888', strokeWeight: 5, strokeOpacity: 0.3 });
                        //         historyDevLineMap.get(devBaseInfo[i].devCode).line.push(devRouteLine);
                        //         lineOverlayMap.line.get(devBaseInfo[i].devCode).line.push(devRouteLine);
                        //         map.addOverlay(devRouteLine);
                        //         if (!lineOverlayMap.isShow) {
                        //             devRouteLine.hide();
                        //         }
                        //     }
                        // }
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
                        if (currentBaiduPoint.lng != lastBaiduPoint.lng || currentBaiduPoint.lat != lastBaiduPoint.lat) {
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
                    /* 存储主动式信息*/
                    switch (isDrawPassiveActiveMarkerOverlay) {
                        case 1:
                            /**edti by gaochao start */
                            if (maxEngCache.get(devBaseInfo[i].devCode).maxEng.value == 1000) {
                                maxEngCache.get(devBaseInfo[i].devCode).maxEng.value = 2001;
                            } else {
                                maxEngCache.get(devBaseInfo[i].devCode).maxEng.value = 2000;
                            }
                            // maxEngCache.get(devBaseInfo[i].devCode).maxEng.value = 2000;
                            /**edit by gaochao end */
                            maxEngCache.get(devBaseInfo[i].devCode).maxEng.position.lng = currentPoint.lng;
                            maxEngCache.get(devBaseInfo[i].devCode).maxEng.position.lat = currentPoint.lat;
                            maxEngCache.get(devBaseInfo[i].devCode).maxEng.position.northAngle = devBaseInfo[i].northAngle;
                            maxEngCache.get(devBaseInfo[i].devCode).maxEng.detail = carEngCache;
                            break;
                        case 2:
                            /**edti by gaochao start */
                            if (maxEngCache.get(devBaseInfo[i].devCode).maxEng.value == 2000) {
                                maxEngCache.get(devBaseInfo[i].devCode).maxEng.value = 1001;
                            } else {
                                maxEngCache.get(devBaseInfo[i].devCode).maxEng.value = 1000;
                            }
                            // maxEngCache.get(devBaseInfo[i].devCode).maxEng.value = 1000;
                            /**edit by gaochao end */
                            maxEngCache.get(devBaseInfo[i].devCode).maxEng.position.lng = currentPoint.lng;
                            maxEngCache.get(devBaseInfo[i].devCode).maxEng.position.lat = currentPoint.lat;
                            maxEngCache.get(devBaseInfo[i].devCode).maxEng.position.northAngle = devBaseInfo[i].northAngle;
                            maxEngCache.get(devBaseInfo[i].devCode).maxEng.detail = carEngCache;
                            break;
                        default:
                            break;
                    }
                }
                /* 填充时间轴*/
                if (i < devBaseInfo.length - 1) {
                    let currentSeconds = new Date(devBaseInfo[i].reportTime).getSeconds();
                    let nextSeconds = new Date(devBaseInfo[i + 1].reportTime).getSeconds();
                    if ((currentSeconds <= 30 && nextSeconds > 30) || (currentSeconds > 30 && nextSeconds <= 30)) {
                        let drawEng = maxEngCache.get(devBaseInfo[i].devCode).maxEng.value;
                        if (drawEng > 0) {
                            //----------------------------------
                            let ecvb;
                            if (currentSeconds > 30) {
                                // 30秒处
                                ecvb = new Date(devBaseInfo[i].reportTime).Format('yyyy-MM-dd-hh-mm') + '-30';
                            } else {
                                // 00秒处
                                ecvb = new Date(devBaseInfo[i].reportTime).Format('yyyy-MM-dd-hh-mm') + '-00';
                            }
                            //----------------------------------
                            let engHeight = (drawEng / 255) * 30;
                            if (engHeight < 1 && drawEng != 0) {
                                engHeight = 1;
                            }
                            let blockBgColor = '#33c0db';
                            switch (drawEng) {
                                case 1000:
                                    blockBgColor = '#aaa';
                                    break;
                                case 2000:
                                    blockBgColor = '#ff0000';
                                    break;
                                /**add by gaochao start */
                                case 1001:
                                    blockBgColor = 'linear-gradient(to right,red,red,red,red,#aaa,#aaa,#aaa,#aaa)'; //同半分钟命中后脱网
                                    break;
                                case 2001:
                                    blockBgColor = 'linear-gradient(to right,#aaa,#aaa,#aaa,#aaa,red,red,red,red)'; // 同半分钟脱网后命中
                                    break;
                                /**add by gaochao end*/
                                default:
                                    break;
                            }
                            /**edti by gaochao start */
                            // 绘制
                           // if (devBaseInfo[i].isShow == 1) {
                                $(`.ecvb-${devBaseInfo[i].devCode}-${ecvb}`).css('top', `${30 - engHeight}px`);
                                $(`.ecvb-${devBaseInfo[i].devCode}-${ecvb}`).css('height', engHeight + 'px');
                                $(`.ecvb-${devBaseInfo[i].devCode}-${ecvb}`).css('background', blockBgColor);
                           // }
                            /**edit by gaochao end */
                            // 绘制完成后存储信息
                            let mapKey;
                            if (currentSeconds > 30) {
                                // 30秒处
                                mapKey = new Date(devBaseInfo[i].reportTime).Format('yyyy-MM-dd hh:mm') + ':30';
                            } else {
                                // 00秒处
                                mapKey = new Date(devBaseInfo[i].reportTime).Format('yyyy-MM-dd hh:mm') + ':00';
                            }
                            devDrawInfoMap.get(devBaseInfo[i].devCode).timeLineEngMap.set(mapKey, {
                                position: { lng: maxEngCache.get(devBaseInfo[i].devCode).maxEng.position.lng, lat: maxEngCache.get(devBaseInfo[i].devCode).maxEng.position.lat, northAngle: maxEngCache.get(devBaseInfo[i].devCode).maxEng.position.northAngle },
                                detail: maxEngCache.get(devBaseInfo[i].devCode).maxEng.detail,
                                passive: maxEngCache.get(devBaseInfo[i].devCode).maxEng.value,
                            });
                        }
                        // 绘制完成能量缓存归零
                        maxEngCache.get(devBaseInfo[i].devCode).maxEng.value = 0;
                    }
                }
                historyDevInfoMap.set(devBaseInfo[i].devCode, {
                    lastBaiduPoint: currentBaiduPoint,
                    lastActiveHit: devBaseInfo[i].activeHit,
                    lastStatus: devBaseInfo[i].status,
                });
                if (i == devBaseInfo.length - 1) {
                    historyRouteLineIsFinish = true;
                    clearInterval(drawHistoryLineInterval);
                }
                i++;
            }
        }

    }

}