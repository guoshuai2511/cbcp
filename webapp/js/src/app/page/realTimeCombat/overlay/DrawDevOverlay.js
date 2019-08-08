import {
    Energy
} from '../energy/Energy.js';
import {
    EnergySound
} from '../sound/EnergySound.js';

import {
    CarDivOverlayConstructor
} from './CarDivOverlayConstructor.js';
import {
    SingleDivOverlayConstructor
} from './SingleDivOverlayConstructor.js';
import {
    SingleOutSideOverlayConstructor
} from './SingleOutSideOverlayConstructor.js';
import {
    CarEngOrientationConstructor
} from './CarEngOrientationConstructor.js';
import {
    SingleEngOrientationConstructor
} from './SingleEngOrientationConstructor.js';
import {
    PassiveActiveMarkerOverlayConstructor
} from './PassiveActiveMarkerOverlayConstructor.js';
import {
    GPSToBaiduPoint
} from '../../../common/baiduMap/GPSToBaiduPoint.BaiduMap.js';
import {
    EngPanel
} from '../table/EngPanel.js';

export class DrawDevOverlay {

    static drawDev(devInfo) {
        /* 缓存 */
        let devDivCacheMap = new Map();
        /* 绘制所有设备 */
        devInfo.forEach((eachDevInfo) => {
            /* 获取设备设备编号 */
            let devCode = eachDevInfo.devCode;
            /* 移除上一次的当前设备 */
            if (devDivMap.get(devCode) != null) {
                map.removeOverlay(devDivMap.get(devCode).devCover);
            }
            /* 获取设备坐标 */
            let lng = eachDevInfo.baiduGpsInfo.lng; // 114
            let lat = eachDevInfo.baiduGpsInfo.lat; // 30
            let baiduPoint = new BMap.Point(lng, lat); // 百度地图坐标
            /* 获取设备是否工作 */
            let status = eachDevInfo.status;
            /* 在地图上显示设备 */
            let lineColor;
            let nextLineColor;
            let energyArray = [];
            let eng;
            let cover;
            let devClass;
            switch (eachDevInfo.devType) {
                case 1:
                    devClass = 'car';
                    if (eachDevInfo.engInfo.isHit) {
                        /* 能量有上报*/
                        eng = eachDevInfo.engInfo.eng;
                        let energyArr = eng.split("-");
                        energyArray = [Number(energyArr[0]), Number(energyArr[1]), Number(energyArr[2]), Number(energyArr[3])];
                        /* 绘制车载设备*/
                        cover = new CarDivOverlayConstructor(baiduPoint, energyArray, devCode, eachDevInfo.gpsInfo.northAngle, true);
                        map.addOverlay(cover);
                        /* 有能量时才绘制能量指示*/
                        if (energyArray[0] == 0 && energyArray[1] == 0 && energyArray[2] == 0 && energyArray[3] == 0) {

                        } else {
                            /* 缓存时间轴能量*/
                            if (Energy.getEnergyMaxValue(energyArray) > devDrawInfoMap.get(devCode).maxEng.value) {
                                devDrawInfoMap.get(devCode).maxEng.value = Energy.getEnergyMaxValue(energyArray);
                                devDrawInfoMap.get(devCode).maxEng.position.lng = baiduPoint.lng;
                                devDrawInfoMap.get(devCode).maxEng.position.lat = baiduPoint.lat;
                                devDrawInfoMap.get(devCode).maxEng.position.northAngle = eachDevInfo.gpsInfo.northAngle;
                                devDrawInfoMap.get(devCode).maxEng.detail = energyArray;
                            }
                            /* 绘制能量指示*/
                            let carEngOriRedraw = true;
                            for (let i = 0; i < carEngOrientationArray.overlay.length; i++) {
                                /* 去掉重复（在当前坐标的5米范围内，只保留最大一次的能量值指示）*/
                                let lastCarEngOriPoint = new BMap.Point(carEngOrientationArray.overlay[i].gps.lng, carEngOrientationArray.overlay[i].gps.lat);
                                let currentCarEngOriPoint = new BMap.Point(eachDevInfo.gpsInfo.lng, eachDevInfo.gpsInfo.lat);
                                if (map.getDistance(lastCarEngOriPoint, currentCarEngOriPoint) <= 5) {
                                    carEngOriRedraw = false;
                                    if (carEngOrientationArray.overlay[i].value < Energy.getEnergyMaxValue(energyArray)) {
                                        map.removeOverlay(carEngOrientationArray.overlay[i].overlay);
                                        carEngOrientationArray.overlay.splice(i, 1);
                                        carEngOriRedraw = true;
                                    }
                                }
                            }
                            if (carEngOriRedraw) {
                                /* 在地图上绘制指示*/
                                let carEngOrientation = new CarEngOrientationConstructor(baiduPoint, energyArray, eachDevInfo.gpsInfo.northAngle, devCode, eachDevInfo.reportTime); // 执行百度地图API方法
                                map.addOverlay(carEngOrientation);
                                carEngOrientationArray.overlay.push({
                                    gps: {
                                        lng: eachDevInfo.gpsInfo.lng,
                                        lat: eachDevInfo.gpsInfo.lat
                                    },
                                    overlay: carEngOrientation,
                                    value: Energy.getEnergyMaxValue(energyArray)
                                });
                                if (!carEngOrientationArray.isShow) {
                                    carEngOrientation.hide();
                                }
                            }
                            /* 右部面板显示能量信息*/
                            EngPanel.showCarEng(devCode, energyArray, eachDevInfo.reportTime);
                        }
                    } else {
                        /* 能量没有上报，获取上一次能量信息 */
                        eng = eachDevInfo.lastEngInfo.eng;
                        let energyArr = eng.split("-");
                        energyArray = [energyArr[0], energyArr[1], energyArr[2], energyArr[3]];
                        /* 绘制车载设备*/
                        cover = new CarDivOverlayConstructor(baiduPoint, energyArray, devCode, false);
                        map.addOverlay(cover);
                    }
                    break;
                case 2:
                    devClass = 'single';
                    if (eachDevInfo.engInfo.isHit) {
                        /* 能量有上报*/
                        eng = eachDevInfo.engInfo.eng;
                        /* 绘制单兵设备*/
                        cover = new SingleDivOverlayConstructor(baiduPoint, eng, devCode, true);
                        map.addOverlay(cover);
                        /* 有能量时才绘制能量指示*/
                        if (eng > 0) {
                            /* 缓存时间轴能量*/
                            if (eng > devDrawInfoMap.get(devCode).maxEng.value) {
                                devDrawInfoMap.get(devCode).maxEng.value = eng;
                                devDrawInfoMap.get(devCode).maxEng.position.lng = baiduPoint.lng;
                                devDrawInfoMap.get(devCode).maxEng.position.lat = baiduPoint.lat;
                                devDrawInfoMap.get(devCode).maxEng.position.northAngle = eachDevInfo.gpsInfo.northAngle;;
                                devDrawInfoMap.get(devCode).maxEng.detail = eng;
                            }
                            /* 绘制能量指示*/
                            let singleEngOriRedraw = true;
                            for (let i = 0; i < singleEngOrientationArray.overlay.length; i++) {
                                /* 去掉重复（在当前坐标的5米范围内，只保留最大一次的能量值指示）*/
                                let lastSingleEngOriPoint = new BMap.Point(singleEngOrientationArray.overlay[i].gps.lng, singleEngOrientationArray.overlay[i].gps.lat);
                                let currentSingleEngOriPoint = new BMap.Point(eachDevInfo.gpsInfo.lng, eachDevInfo.gpsInfo.lat);
                                if (map.getDistance(lastSingleEngOriPoint, currentSingleEngOriPoint) <= 5) {
                                    singleEngOriRedraw = false;
                                    if (singleEngOrientationArray.overlay[i].value < eng) {
                                        map.removeOverlay(singleEngOrientationArray.overlay[i].overlay);
                                        singleEngOrientationArray.overlay.splice(i, 1);
                                        singleEngOriRedraw = true;
                                    }
                                }
                            }
                            if (singleEngOriRedraw) {
                                /* 在地图上绘制指示*/
                                let singleEngOrientation = new SingleEngOrientationConstructor(baiduPoint, eng, eachDevInfo.gpsInfo.northAngle, devCode, eachDevInfo.reportTime);
                                map.addOverlay(singleEngOrientation);
                                singleEngOrientationArray.overlay.push({
                                    gps: {
                                        lng: eachDevInfo.gpsInfo.lng,
                                        lat: eachDevInfo.gpsInfo.lat
                                    },
                                    overlay: singleEngOrientation,
                                    value: eng
                                });
                                if (!singleEngOrientationArray.isShow) {
                                    singleEngOrientation.hide();
                                }
                            }
                            /* 右部面板显示能量信息*/
                            EngPanel.showSingleEng(devCode, eng, eachDevInfo.reportTime);
                        }
                    } else {
                        eng = eachDevInfo.lastEngInfo.eng;
                        cover = new SingleDivOverlayConstructor(baiduPoint, eng, devCode, false);
                        map.addOverlay(cover);
                    }
                    break;
                /**add by gaochao start */
                case 3:
                    devClass = 'single';
                    eng = eachDevInfo.lastEngInfo.eng;
                    cover = new SingleOutSideOverlayConstructor(baiduPoint, eng, devCode, false);
                    map.addOverlay(cover);
                    break;
                /**add by gaochao end*/
                default:
                    devClass = 'null';
                    break;
            }
            /* 获取设备的角度朝向 */
            let deg = eachDevInfo.gpsInfo.northAngle - 90;
            /* 设置设备角度 */
            $('.' + devClass + '-img-' + devCode).css('transform', 'rotate(' + deg + 'deg)');
            /**add by gaochao start */
            $('.' + devClass + '-photo-' + devCode).css('transform', 'rotate(' + (0 - deg) + 'deg)');
            /**add by gaochao end*/
            /* 上一次为工作状态不为0且本次工作状态为1*/
            if (status != 0 && eachDevInfo.lastStatus == 1) {
                /* 中心点坐标*/
                let cpGps = devInfoMap.get(centerPointDevCode).gpsInfo;
                let cpGpsBd = GPSToBaiduPoint.getBaiduPointLocation([
                    [cpGps.lng, cpGps.lat]
                ])[0]
                /* 根据中心点判断是否绘制路径线*/
                let canDrawLine = false;
                if (eachDevInfo.devType == 1) {
                    /* 如果是车载设备，直接绘制路径线*/
                    canDrawLine = true;
                    /**edti by gaochao start */
                } else if (eachDevInfo.devType == 2) {
                    // } else if (eachDevInfo.devType == 2 ||eachDevInfo.devType == 3) {
                    /**edit by gaochao end */
                    /* 如果是单兵设备，根据中心点绘制路径线*/
                    let setCanDrawLine = function (val) {
                        if (devInfoMap.get(centerPointDevCode).devType == 1) {
                            /* 单兵以车载为中心*/
                            if (map.getDistance(new BMap.Point(cpGpsBd.lng, cpGpsBd.lat), baiduPoint) > val) {
                                canDrawLine = true;
                            }
                            /**edti by gaochao start */
                        } else if (devInfoMap.get(centerPointDevCode).devType == 2) {
                            // } else if (devInfoMap.get(centerPointDevCode).devType == 2||devInfoMap.get(centerPointDevCode).devType == 3) {
                            /**edit by gaochao end */
                            /* 单兵以单兵为中心*/
                            if (centerPointDevCode != eachDevInfo.devCode) { // 自己不是中心
                                if (map.getDistance(new BMap.Point(cpGpsBd.lng, cpGpsBd.lat), baiduPoint) > val) {
                                    canDrawLine = true;
                                }
                            } else { // 自己是中心 
                                canDrawLine = true;
                            }
                        }
                    }
                    switch (eachDevInfo.gpsInfo.separateFlag) {
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
                /* 点飘动大于50米，不绘制；精度大于10，不绘制*/
                // && (eachDevInfo.devType == 2 && eachDevInfo.gpsInfo.accuracy <= 10)

                let divide = 0;
                if (eachDevInfo.devType == 1) {
                    divide = 70;
                } else {
                    divide = 35;
                }
                let mergeLine = function () {
                    let lineColor;
                    if (devDrawInfoMap.get(devCode).isCorrentView) {
                        lineColor = '#008030';
                    } else {
                        lineColor = devDrawInfoMap.get(devCode).routeLineColor;
                    }
                    let lintArrTemp = [];
                    let devLine = lineOverlayMap.line.get(devCode).dataCache;
                    /* 将缓存中的坐标合并*/
                    for (let i = 0; i < devLine.length; i++) {
                        if (lintArrTemp.length == 0) {
                            lintArrTemp.push(devLine[i][0]);
                            lintArrTemp.push(devLine[i][1]);
                        } else {
                            lintArrTemp.push(devLine[i][1]);
                        }
                    }
                    /* 移除线段*/
                    for (let i = 0; i < lineOverlayMap.line.get(devCode).tempLine.length; i++) {
                        map.removeOverlay(lineOverlayMap.line.get(devCode).tempLine[i]);
                    }
                    /* 重新绘制整合的线段*/
                    let mergedLine = new BMap.Polyline(lintArrTemp, {
                        strokeColor: lineColor,
                        strokeWeight: 5,
                        strokeOpacity: 0.3
                    });
                    lineOverlayMap.line.get(devCode).line.push(mergedLine);
                    map.addOverlay(mergedLine);
                    if (!lineOverlayMap.isShow) {
                        mergedLine.hide();
                    }
                    /* 次数归零*/
                    lineOverlayCountCache.set(devCode, 0);
                    /* 对应缓存清空*/
                    lineOverlayMap.line.get(devCode).tempLine = [];
                    lineOverlayMap.line.get(devCode).dataCache = [];
                }
                if (map.getDistance(new BMap.Point(eachDevInfo.baiduGpsInfo.lng, eachDevInfo.baiduGpsInfo.lat), new BMap.Point(eachDevInfo.lastBaiduGpsInfo.lng, eachDevInfo.lastBaiduGpsInfo.lat)) <= divide) {
                    /* 车载路径线全绘制，单兵只绘制下车后路径*/
                    //if (eachDevInfo.devType == 1 || eachDevInfo.devType == 2 && eachDevInfo.separateFlag == 1) {
                    if (canDrawLine) {
                        /* 绘制设备路径线*/
                        let lineColor;
                        /* 路径线颜色*/
                        if (devDrawInfoMap.get(devCode).isCorrentView) {
                            lineColor = '#008030'; // 当前视角为绿色
                        } else {
                            lineColor = devDrawInfoMap.get(devCode).routeLineColor; // 非当前视角为灰色
                        }
                        /* 调用API绘制线的参数*/
                        let devRouteLine = new BMap.Polyline([
                            new BMap.Point(eachDevInfo.lastBaiduGpsInfo.lng, eachDevInfo.lastBaiduGpsInfo.lat),
                            new BMap.Point(eachDevInfo.baiduGpsInfo.lng, eachDevInfo.baiduGpsInfo.lat),
                        ], {
                                strokeColor: lineColor,
                                strokeWeight: 5,
                                strokeOpacity: 0.3
                            });
                        /* 用于合并的线段缓存*/
                        lineOverlayMap.line.get(eachDevInfo.devCode).tempLine.push(devRouteLine);
                        /* 用于合并的点数据缓存*/
                        lineOverlayMap.line.get(eachDevInfo.devCode).dataCache.push([new BMap.Point(eachDevInfo.lastBaiduGpsInfo.lng, eachDevInfo.lastBaiduGpsInfo.lat), new BMap.Point(eachDevInfo.baiduGpsInfo.lng, eachDevInfo.baiduGpsInfo.lat)]);
                        /* 将线段添加至地图容器*/
                        map.addOverlay(devRouteLine);
                        /* 是否显示路径线图层*/
                        if (!lineOverlayMap.isShow) {
                            devRouteLine.hide();
                        }
                        /* 统计次数*/
                        if (lineOverlayCountCache.get(devCode) == null) {
                            lineOverlayCountCache.set(devCode, 0);
                        }
                        let lastCount = lineOverlayCountCache.get(devCode);
                        lastCount = lastCount + 1;
                        lineOverlayCountCache.set(devCode, lastCount);
                        /* 点数量大于50个进行合并*/
                        if (lastCount >= 50) {
                            mergeLine();
                        }
                        /* 绘制主动式轨迹*/
                        let drawPassiveLine = function () {
                            let passiveActiveLine = new BMap.Polyline([
                                new BMap.Point(eachDevInfo.lastBaiduGpsInfo.lng, eachDevInfo.lastBaiduGpsInfo.lat),
                                new BMap.Point(eachDevInfo.baiduGpsInfo.lng, eachDevInfo.baiduGpsInfo.lat),
                            ], {
                                    strokeColor: 'red',
                                    strokeWeight: 5,
                                    strokeOpacity: 0.5
                                });
                            linePassive.line.push(passiveActiveLine);
                            map.addOverlay(passiveActiveLine);
                            if (!linePassive.isShow) {
                                passiveActiveLine.hide();
                            }
                        }
                        if (eachDevInfo.activeHit == 1 && eachDevInfo.lastActiveHit == 1 || eachDevInfo.activeHit != 1 && eachDevInfo.lastActiveHit == 1) {
                            if (eachDevInfo.gpsInfo.lng != eachDevInfo.lastGpsInfo.lng && eachDevInfo.gpsInfo.lat != eachDevInfo.lastGpsInfo.lat) {
                                drawPassiveLine();
                            } else {
                                if (eachDevInfo.activeHit == 1 && eachDevInfo.lastActiveHit != 1) {
                                    drawPassiveLine();
                                }
                            }
                        }
                    } else {
                        /* 点断开，合并路径线*/
                        mergeLine();
                    }
                } else {
                    /* 点断开，合并路径线*/
                    mergeLine();
                }
            }

            try {
                /* 目标小区*/
                if (eachDevInfo.devType == 1 && targetCellInfosCache.size != 0) {
                    if (targetCellLineCache != null) {
                        map.removeOverlay(targetCellLineCache);
                        targetCellLineCache = null;
                    }
                    let targetCellPoint;
                    let lngAll = 0;
                    let latAll = 0;
                    targetCellInfosCache.forEach((eachTargetBts) => {
                        lngAll = lngAll + Number(eachTargetBts.lng);
                        latAll = latAll + Number(eachTargetBts.lat);
                    });
                    targetCellPoint = {
                        lng: lngAll / targetCellInfosCache.size,
                        lat: latAll / targetCellInfosCache.size
                    };
                    if (map.getDistance(new BMap.Point(eachDevInfo.baiduGpsInfo.lng, eachDevInfo.baiduGpsInfo.lat), new BMap.Point(targetCellPoint.lng, targetCellPoint.lat)) > 500) {
                        let targetCellLine = new BMap.Polyline([
                            new BMap.Point(targetCellPoint.lng, targetCellPoint.lat),
                            new BMap.Point(eachDevInfo.baiduGpsInfo.lng, eachDevInfo.baiduGpsInfo.lat),
                        ], {
                                strokeColor: 'red',
                                strokeWeight: 1,
                                strokeOpacity: 1
                            });
                        targetCellLineCache = targetCellLine;
                        map.addOverlay(targetCellLine);
                    }
                }
            } catch (error) {

            }

            // try {
            //     if (devPreLockCellLineCache != null) {
            //         map.removeOverlay(devPreLockCellLineCache);
            //         devPreLockCellLineCache = null;
            //     }
            //     /* 预锁基站*/
            //     if (eachDevInfo.devType == 1 && devPreLockCellInfosCache.size != 0) {

            //         let preLockCellPoint;
            //         let lngAll = 0;
            //         let latAll = 0;
            //         devPreLockCellInfosCache.forEach((eachTargetBts) => {
            //             lngAll = lngAll + Number(eachTargetBts.lng);
            //             latAll = latAll + Number(eachTargetBts.lat);
            //         });
            //         preLockCellPoint = {
            //             lng: lngAll / devPreLockCellInfosCache.size,
            //             lat: latAll / devPreLockCellInfosCache.size
            //         };
            //         if (map.getDistance(new BMap.Point(eachDevInfo.baiduGpsInfo.lng, eachDevInfo.baiduGpsInfo.lat), new BMap.Point(preLockCellPoint.lng, preLockCellPoint.lat)) > 500) {
            //             let preLockCellLine = new BMap.Polyline([
            //                 new BMap.Point(preLockCellPoint.lng, preLockCellPoint.lat),
            //                 new BMap.Point(eachDevInfo.baiduGpsInfo.lng, eachDevInfo.baiduGpsInfo.lat),
            //             ], {
            //                     strokeColor: 'red',
            //                     strokeWeight: 1,
            //                     strokeOpacity: 1
            //                 });
            //             devPreLockCellLineCache = preLockCellLine;
            //             map.addOverlay(preLockCellLine);
            //         }
            //     }
            // } catch (error) {

            // }

            /* 主动式命中脱网标记覆盖物*/
            let isDrawPassiveActiveMarkerOverlay = 0;
            if (eachDevInfo.activeHit == 1 && eachDevInfo.lastActiveHit != 1) {
                isDrawPassiveActiveMarkerOverlay = 1; // 主动式命中
            } else if (eachDevInfo.activeHit != 1 && eachDevInfo.lastActiveHit == 1) {
                isDrawPassiveActiveMarkerOverlay = 2; // 主动式脱网
            }
            if (isDrawPassiveActiveMarkerOverlay != 0) {
                let passiveActiveMarkerOverlay = new PassiveActiveMarkerOverlayConstructor(baiduPoint, isDrawPassiveActiveMarkerOverlay);
                linePassive.overlay.push(passiveActiveMarkerOverlay);
                map.addOverlay(passiveActiveMarkerOverlay);
                if (!linePassive.isShow) {
                    passiveActiveMarkerOverlay.hide();
                }
            }

            /* 如果当前视角设备超出可见范围，重设地图中心*/
            if (devDrawInfoMap.get(eachDevInfo.devCode).isCorrentView) {
                let rightTopPosition = map.pointToOverlayPixel(map.getBounds().getNorthEast()); // 右上角坐标
                let leftBottomPosition = map.pointToOverlayPixel(map.getBounds().getSouthWest()); // 左下角坐标
                let devPosition = map.pointToOverlayPixel(baiduPoint); // 设备坐标
                // 设备坐标距离顶部130px，距离底部180px，距离左边100px，距离右边260px，则重设中心点
                if (devPosition.y - rightTopPosition.y < 130 || devPosition.y - leftBottomPosition.y > -180 || devPosition.x - leftBottomPosition.x < 100 || devPosition.x - rightTopPosition.x > -260) {
                    /**edit by gaochao start */
                    if (mapFollowFlag) {
                        map.setCenter(baiduPoint);
                    }
                    /**edit by gaochao end */
                }
            }

            /* 如果为当前视角且为车载，显示车速*/
            /**del by gaochao start */
            if (devDrawInfoMap.get(eachDevInfo.devCode).isCorrentView && eachDevInfo.devType == 1) {
                $('.car-speed-value').html(eachDevInfo.gpsInfo.speed);
            }
            /**del by gaochao end */

            /* 设置设备详细信息面板是否开启 */
            if (eachDevInfo.isInfoPanelOpen) {
                $('.dev-selecter-circle-' + devCode).css('display', 'block');
                $('.dev-info-panel-' + devCode).css('display', 'block');
            } else {
                $('.dev-selecter-circle-' + devCode).css('display', 'none');
                $('.dev-info-panel-' + devCode).css('display', 'none');
            }

            /* 打开/关闭详细信息框 */
            $('.' + devClass + '-img-' + devCode).click(() => {
                if (!devInfoMap.get(eachDevInfo.devCode).isInfoPanelOpen) {
                    $('.dev-selecter-circle-' + devCode).css('display', 'block');
                    $('.dev-info-panel-' + devCode).css('display', 'block');
                    devInfoMap.get(eachDevInfo.devCode).isInfoPanelOpen = true;
                } else {
                    $('.dev-selecter-circle-' + devCode).css('display', 'none');
                    $('.dev-info-panel-' + devCode).css('display', 'none');
                    devInfoMap.get(eachDevInfo.devCode).isInfoPanelOpen = false;
                }
            });
            $('.dev-info-panel-close-' + devCode).click(() => {
                $('.dev-selecter-circle-' + devCode).css('display', 'none');
                $('.dev-info-panel-' + devCode).css('display', 'none');
                devInfoMap.get(eachDevInfo.devCode).isInfoPanelOpen = false;
            });

            /* 设备编号hover*/
            $('.' + devClass + '-img-' + devCode).hover(function () {
                $('.dev-team-info-' + devCode).css('display', 'block');
            }, function () {
                $('.dev-team-info-' + devCode).css('display', 'none');
            });

            /* 判断小车是否正在工作 */
            if (status == 0) {
                $('.' + devClass + '-img-' + devCode).css('filter', 'grayscale(100%)');
                $('.energy-word-0-' + devCode).css('display', 'none');
                $('.energy-word-1-' + devCode).css('display', 'none');
                $('.energy-word-2-' + devCode).css('display', 'none');
                $('.energy-word-3-' + devCode).css('display', 'none');
                $('.dev-team-info-' + devCode).css('top', '30px');
            }
            /* 判断能量是否命中*/
            if (!eachDevInfo.engInfo.isHit) {
                $('.dev-team-info-' + devCode).css('top', '30px');
            }

            /* 更新上一次的能量值(有能量才更新)*/
            devInfoMap.get(devCode).lastEngInfo = eachDevInfo.engInfo;
            /* 更新上一次工作状态*/
            devInfoMap.get(devCode).lastStatus = eachDevInfo.status;
            /* 更新上一次的GPS信息*/
            devInfoMap.get(devCode).lastGpsInfo = eachDevInfo.gpsInfo;
            /* 更新上一次的百度GPS信息 */
            devInfoMap.get(devCode).lastBaiduGpsInfo = eachDevInfo.baiduGpsInfo;
            /* 更新上一次主动式命中信息 */
            devInfoMap.get(devCode).lastActiveHit = eachDevInfo.activeHit;

            /* 在map集合中保存覆盖物及图标实例 */
            let devDiv = class DevDiv {
                constructor() {
                    this.devCover;
                }
            }
            devDiv.devCover = cover;
            devDivMap.set(devCode, devDiv);
        });
    }

}