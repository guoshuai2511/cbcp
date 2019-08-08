import {
    Energy
} from '../../realTimeCombat/energy/Energy.js';
import {
    GPSToBaiduPoint
} from '../../../common/baiduMap/GPSToBaiduPoint.BaiduMap.js';

export class EngColumnChartContainer {

    static init(_devBaseInfo) {

        let historyDevInfoMap = new Map();
        let maxEngCache = new Map();
        let devBaseInfoMap = new Map();

        /* 将数组通过设备编号分类*/
        for (let i = 0; i < _devBaseInfo.length; i++) {
            if (devBaseInfoMap.get(_devBaseInfo[i].devCode) == null) {
                devBaseInfoMap.set(_devBaseInfo[i].devCode, [_devBaseInfo[i]]);
            } else {
                devBaseInfoMap.get(_devBaseInfo[i].devCode).push(_devBaseInfo[i]);
            }
        }

        if (devBaseInfoMap.size != 0) {
            /* 遍历map，绘制每个设备对应的能量条*/
            devBaseInfoMap.forEach((devBaseInfo) => {
                /* 绘制能量块*/
                for (let i = 0; i < devBaseInfo.length; i++) {
                    /* 上一次主动式是否命中*/
                    let lastActiveHit = null;
                    /* 最大能量值缓存*/
                    if (maxEngCache.get(devBaseInfo[i].devCode) == null) {
                        maxEngCache.set(devBaseInfo[i].devCode, {
                            maxEng: {
                                value: 0,
                                position: {
                                    lng: 0,
                                    lat: 0,
                                    northAngle: 0,
                                },
                                detail: ''
                            }
                        });
                    }
                    /* 上一次的设备相关信息*/
                    if (historyDevInfoMap.get(devBaseInfo[i].devCode) != null) {
                        lastActiveHit = historyDevInfoMap.get(devBaseInfo[i].devCode).lastActiveHit;
                    }
                    /* 当前坐标*/
                    let currentPoint = GPSToBaiduPoint.getBaiduPointLocation([
                        [devBaseInfo[i].lng, devBaseInfo[i].lat]
                    ])[0];
                    /* 存储能量信息*/
                    let carEngCache = [0, 0, 0, 0];
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
                                    // 存储能量最大值及其相关信息
                                    if (Energy.getEnergyMaxValue(energyArray) > maxEngCache.get(devBaseInfo[i].devCode).maxEng.value) {
                                        maxEngCache.get(devBaseInfo[i].devCode).maxEng.value = Energy.getEnergyMaxValue(energyArray);
                                        maxEngCache.get(devBaseInfo[i].devCode).maxEng.position.lng = currentPoint.lng;
                                        maxEngCache.get(devBaseInfo[i].devCode).maxEng.position.lat = currentPoint.lat;
                                        maxEngCache.get(devBaseInfo[i].devCode).maxEng.position.northAngle = devBaseInfo[i].northAngle;
                                        maxEngCache.get(devBaseInfo[i].devCode).maxEng.detail = energyArray;
                                    }
                                }
                            }
                            break;
                        case 2: // 单兵
                            if (devBaseInfo[i].eng > 0) {
                                // 存储能量最大值及其相关信息
                                if (devBaseInfo[i].eng > maxEngCache.get(devBaseInfo[i].devCode).maxEng.value) {
                                    maxEngCache.get(devBaseInfo[i].devCode).maxEng.value = devBaseInfo[i].eng;
                                    maxEngCache.get(devBaseInfo[i].devCode).maxEng.position.lng = currentPoint.lng;
                                    maxEngCache.get(devBaseInfo[i].devCode).maxEng.position.lat = currentPoint.lat;
                                    maxEngCache.get(devBaseInfo[i].devCode).maxEng.position.northAngle = devBaseInfo[i].northAngle;
                                    maxEngCache.get(devBaseInfo[i].devCode).maxEng.detail = devBaseInfo[i].eng;
                                }
                            }
                            break;
                        default:
                            break;
                    }
                    if (lastActiveHit != null && devBaseInfo[i].devType == 1) {
                        /* 绘制主动式命中/脱网标记*/
                        let isDrawPassiveActiveMarkerOverlay = 0;
                        if (devBaseInfo[i].activeHit == 1 && lastActiveHit != 1) {
                            isDrawPassiveActiveMarkerOverlay = 1; // 主动式命中
                        } else if (devBaseInfo[i].activeHit != 1 && lastActiveHit == 1) {
                            isDrawPassiveActiveMarkerOverlay = 2; // 主动式脱网
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
                        /* 根据reportTime判断“当前”时间，每30秒就填充一次能量块*/
                        if ((currentSeconds <= 30 && nextSeconds > 30) || (currentSeconds > 30 && nextSeconds <= 30)) {
                            /* 获取缓存中的能量值*/
                            let drawEng = maxEngCache.get(devBaseInfo[i].devCode).maxEng.value;
                            if (drawEng > 0) {
                                //----------------------------------
                                let ecvb; // 定位到具体需要填充的div
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
                                    engHeight = 1; // 如果当前有能量值，但是高度小于1，这个能量块就不会显示出来
                                }
                                let blockBgColor = '#33c0db'; // 默认为蓝色
                                switch (drawEng) {
                                    case 1000:
                                        blockBgColor = '#aaa'; // 主动式脱网为灰色
                                        break;
                                    case 2000:
                                        blockBgColor = '#ff0000'; // 主动式命中为红色
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
                                // 填充对应的能量块
                                $(`.ecvb-${devBaseInfo[i].devCode}-${ecvb}`).css('top', `${30 - engHeight}px`);
                                $(`.ecvb-${devBaseInfo[i].devCode}-${ecvb}`).css('height', engHeight + 'px');
                                $(`.ecvb-${devBaseInfo[i].devCode}-${ecvb}`).css('background', blockBgColor);
                                // 绘制完成后在时间轴点击绘制历史影子的相关缓存中存储信息
                                let mapKey;
                                if (currentSeconds > 30) {
                                    // 30秒处
                                    mapKey = new Date(devBaseInfo[i].reportTime).Format('yyyy-MM-dd hh:mm') + ':30';
                                } else {
                                    // 00秒处
                                    mapKey = new Date(devBaseInfo[i].reportTime).Format('yyyy-MM-dd hh:mm') + ':00';
                                }
                                devDrawInfoMap.get(devBaseInfo[i].devCode).timeLineEngMap.set(mapKey, {
                                    position: {
                                        lng: maxEngCache.get(devBaseInfo[i].devCode).maxEng.position.lng,
                                        lat: maxEngCache.get(devBaseInfo[i].devCode).maxEng.position.lat,
                                        northAngle: maxEngCache.get(devBaseInfo[i].devCode).maxEng.position.northAngle
                                    },
                                    detail: maxEngCache.get(devBaseInfo[i].devCode).maxEng.detail,
                                    passive: maxEngCache.get(devBaseInfo[i].devCode).maxEng.value,
                                });
                                // 绘制完成能量缓存归零，开始存储下个半分钟的最大值
                                maxEngCache.get(devBaseInfo[i].devCode).maxEng.value = 0;
                            }
                        }
                    }
                    historyDevInfoMap.set(devBaseInfo[i].devCode, {
                        lastActiveHit: devBaseInfo[i].activeHit
                    });

                }

            });
        }

    }

}