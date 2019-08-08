import { GPSToBaiduPoint } from '../../../common/baiduMap/GPSToBaiduPoint.BaiduMap.js';
import { BtsValue } from '../bts/BtsValue.js';

import { DrawBtsOverlay } from '../overlay/DrawBtsOverlay.js';
import { DrawBtsAnalysis } from '../overlay/DrawBtsAnalysis.js';
import { DrawBtsTargetOverlay } from '../overlay/DrawBtsTargetOverlay.js';
import { DrawBtsPreLockOverlay } from '../overlay/DrawBtsPreLockOverlay.js';
export class PrasingBtsInfo {

    static prasingBtsInfo(recBtsInfoMap) {

        let btsBaseInfo = [];
        let hitTimesCacheMap = new Map();
        let dlHitTimesCacheMap = new Map();
        /* 格式化数据*/
        for (let Key in recBtsInfoMap.btsInfos) {
            btsBaseInfo.push({ btsId: Key, btsInfo: recBtsInfoMap.btsInfos[Key] });
        }
        // console.log(btsBaseInfo)
        /* 刷新命中次数，绘制目标基站*/
        for (let i = 0; i < btsBaseInfo.length; i++) {
            let btsid = BtsValue.btsTag(btsBaseInfo[i].btsInfo.mode, btsBaseInfo[i].btsInfo.mcc, btsBaseInfo[i].btsInfo.mnc, btsBaseInfo[i].btsInfo.lacTac, btsBaseInfo[i].btsInfo.sid, btsBaseInfo[i].btsInfo.nid, btsBaseInfo[i].btsInfo.bid, btsBaseInfo[i].btsInfo.cellId);
            btsBaseInfo[i].btsId = btsid;
            if (btsBaseInfo[i].btsInfo.hitTimes > 0) {
                // console.log("存在命中")
                if (btsInfoMap.get(btsBaseInfo[i].btsId) != null) {
                    /**add by gaochao start */
                    if (hitTimesCacheMap.get(btsBaseInfo[i].btsId) != btsBaseInfo[i].btsInfo.hitTimes) {
                        hitTimesCacheMap.set(btsBaseInfo[i].btsId, btsBaseInfo[i].btsInfo.hitTimes);
                        /**add by gaochao end*/
                        btsInfoMap.get(btsBaseInfo[i].btsId).hitTimes = btsBaseInfo[i].btsInfo.hitTimes; // 更新map中的命中次数(用于重绘红色基站)
                        $(`.bts-img-${btsBaseInfo[i].btsId}`).removeClass('bts-img-unhit'); // 去除未命中标记
                        $(`.bts-click-${btsBaseInfo[i].btsId}`).removeClass('bts-click-unhit'); // 去除未命中标记
                        $(`.bts-img-${btsBaseInfo[i].btsId}`).removeClass('gray-cover'); // 去除灰色滤镜
                        $(`.bts-click-${btsBaseInfo[i].btsId}`).css('z-index', 6000); // z轴置顶
                        /**edti by gaochao start */
                        let hitTimesHtml = $(`.bts-hit-count-${btsBaseInfo[i].btsId}`).html();
                        let hitTimesLast = 0;
                        let dlHitTimesLast = 0;
                        if (hitTimesHtml != null && hitTimesHtml != "") {
                            hitTimesLast = parseInt(hitTimesHtml.split("/")[0]);
                            dlHitTimesLast = parseInt(hitTimesHtml.split("/")[1]);
                        }
                        $(`.bts-hit-count-${btsBaseInfo[i].btsId}`).html((hitTimesLast + btsBaseInfo[i].btsInfo.hitTimes) + "/" + dlHitTimesLast);
                        /**edit by gaochao end */

                        /**add by gaochao start */
                        if (btsBaseInfo[i].btsInfo.hitTimes != 0) {
                            $(`.bts-hit-count-shadow-${btsBaseInfo[i].btsId}`).css('display', 'block');
                        }
                        /**add by gaochao end*/
                        if (targetCellInfosCache.get(btsBaseInfo[i].btsId) == null) {
                            $(`.bts-img-${btsBaseInfo[i].btsId}`).attr('src', `img/btsicon/btsiconhit-${btsBaseInfo[i].btsInfo.mode}.png`);

                            /**add by gaochao start */
                            if (eval(`btsHitTimer['${btsBaseInfo[i].btsId}'] == null`)) {
                                btsHitTimer[`${btsBaseInfo[i].btsId}`] = window.setInterval(function () {
                                    $(`.bts-img-${btsBaseInfo[i].btsId}`).attr('src', `img/btsicon/btslasthit-${btsInfoMap.get(btsBaseInfo[i].btsId).mode}.png`);
                                }, 300000);
                            }
                            else {
                                clearInterval(btsHitTimer[`${btsBaseInfo[i].btsId}`]);
                                btsHitTimer[`${btsBaseInfo[i].btsId}`] = window.setInterval(function () {
                                    $(`.bts-img-${btsBaseInfo[i].btsId}`).attr('src', `img/btsicon/btslasthit-${btsInfoMap.get(btsBaseInfo[i].btsId).mode}.png`);
                                }, 300000);
                            }
                            /**add by gaochao end*/
                        }
                    }
                } else {
                    // 地图上没有基站，取目标基站最近的
                    if (ifNullHitedBts == null) {
                        if (targetCellInfosCache.size != 0) {
                            let targetBtsId;
                            targetCellInfosCache.forEach((eachTargetBts) => {
                                targetBtsId = eachTargetBts.btsId;
                            });
                            if (btsInfoMap.size != 0) {
                                let disCache = 5000;
                                btsInfoMap.forEach((eachBts) => {
                                    if (eachBts.hitTimes == 0 || eachBts.hitTimes == null) {
                                        if (ifNullHitedBts == null) {
                                            ifNullHitedBts = eachBts.btsId;
                                        } else {
                                            if (eachBts.btsId != targetBtsId) {
                                                let dis = map.getDistance(new BMap.Point(btsInfoMap.get(targetBtsId).lng, btsInfoMap.get(targetBtsId).lat), new BMap.Point(eachBts.lng, eachBts.lat));
                                                if (dis < disCache) {
                                                    disCache = dis;
                                                    ifNullHitedBts = eachBts.btsId;
                                                }
                                            }
                                        }
                                    }
                                });
                            }
                        }
                    }
                    if (ifNullHitedBts != null) {
                        if (hitTimesCacheMap.get(ifNullHitedBts) != btsBaseInfo[i].btsInfo.hitTimes) {
                            /**add by gaochao start */
                            hitTimesCacheMap.set(ifNullHitedBts, btsBaseInfo[i].btsInfo.hitTimes);
                            /**add by gaochao end*/
                            let hitTimesHtml = $(`.bts-hit-count-${ifNullHitedBts}`).html();
                            let hitTimesLast = 0;
                            let dlHitTimesLast = 0;
                            if (hitTimesHtml != null && hitTimesHtml != "") {
                                hitTimesLast = parseInt(hitTimesHtml.split("/")[0]);
                                dlHitTimesLast = parseInt(hitTimesHtml.split("/")[1]);
                            }
                            $(`.bts-hit-count-${ifNullHitedBts}`).html((hitTimesLast + btsBaseInfo[i].btsInfo.hitTimes) + "/" + dlHitTimesLast);
                            /**add by gaochao start */
                            if (btsBaseInfo[i].btsInfo.hitTimes != 0) {
                                $(`.bts-hit-count-shadow-${ifNullHitedBts}`).css('display', 'block');
                            }
                            /**add by gaochao end*/
                            $(`.bts-img-${ifNullHitedBts}`).removeClass('bts-img-unhit'); // 去除未命中标记
                            $(`.bts-click-${ifNullHitedBts}`).removeClass('bts-click-unhit'); // 去除未命中标记
                            $(`.bts-img-${ifNullHitedBts}`).removeClass('gray-cover'); // 去除灰色滤镜
                            $(`.bts-img-${ifNullHitedBts}`).attr('src', `img/btsicon/btsiconhit-${btsBaseInfo[i].btsInfo.mode}.png`);
                            /**add by gaochao start */
                            if (eval(`btsHitTimer['${ifNullHitedBts}'] == null`)) {
                                btsHitTimer[`${ifNullHitedBts}`] = window.setInterval(function () {
                                    $(`.bts-img-${ifNullHitedBts}`).attr('src', `img/btsicon/btslasthit-${btsInfoMap.get(ifNullHitedBts).mode}.png`);
                                }, 300000);
                            }
                            else {
                                clearInterval(btsHitTimer[`${ifNullHitedBts}`]);
                                btsHitTimer[`${ifNullHitedBts}`] = window.setInterval(function () {

                                    $(`.bts-img-${ifNullHitedBts}`).attr('src', `img/btsicon/btslasthit-${btsInfoMap.get(ifNullHitedBts).mode}.png`);
                                }, 300000);
                            }
                            /**add by gaochao end*/
                        }
                    }
                }
            }

            /**add by gaochao start */
            if (btsBaseInfo[i].btsInfo.dlHitTimes > 0) {
                if (btsInfoMap.get(btsBaseInfo[i].btsId) != null) {
                    if (dlHitTimesCacheMap.get(btsBaseInfo[i].btsId) != btsBaseInfo[i].btsInfo.dlHitTimes) {
                        dlHitTimesCacheMap.set(btsBaseInfo[i].btsId, btsBaseInfo[i].btsInfo.dlHitTimes);
                        btsInfoMap.get(btsBaseInfo[i].btsId).dlHitTimes = btsBaseInfo[i].btsInfo.dlHitTimes; // 更新map中的命中次数(用于重绘红色基站)
                        $(`.bts-img-${btsBaseInfo[i].btsId}`).removeClass('bts-img-unhit'); // 去除未命中标记
                        $(`.bts-click-${btsBaseInfo[i].btsId}`).removeClass('bts-click-unhit'); // 去除未命中标记
                        $(`.bts-img-${btsBaseInfo[i].btsId}`).removeClass('gray-cover'); // 去除灰色滤镜
                        $(`.bts-click-${btsBaseInfo[i].btsId}`).css('z-index', 6000); // z轴置顶
                        let hitTimesHtml = $(`.bts-hit-count-${btsBaseInfo[i].btsId}`).html();
                        let hitTimesLast = 0;
                        let dlHitTimesLast = 0;
                        if (hitTimesHtml != null && hitTimesHtml != "") {
                            hitTimesLast = parseInt(hitTimesHtml.split("/")[0]);
                            dlHitTimesLast = parseInt(hitTimesHtml.split("/")[1]);
                        }
                        $(`.bts-hit-count-${btsBaseInfo[i].btsId}`).html(hitTimesLast + "/" + (dlHitTimesLast + btsBaseInfo[i].btsInfo.dlHitTimes));
                        if (btsBaseInfo[i].btsInfo.dlHitTimes != 0) {
                            $(`.bts-hit-count-shadow-${btsBaseInfo[i].btsId}`).css('display', 'block');
                        }
                        $(`.bts-img-${btsBaseInfo[i].btsId}`).attr('src', `img/btsicon/btsiconhit-${btsBaseInfo[i].btsInfo.mode}.png`);
                        if (targetCellInfosCache.get(btsBaseInfo[i].btsId) == null) {
                            $(`.bts-img-${btsBaseInfo[i].btsId}`).attr('src', `img/btsicon/btsiconhit-${btsBaseInfo[i].btsInfo.mode}.png`);
                            if (eval(`btsHitTimer['${btsBaseInfo[i].btsId}'] == null`)) {
                                btsHitTimer[`${btsBaseInfo[i].btsId}`] = window.setInterval(function () {
                                    $(`.bts-img-${btsBaseInfo[i].btsId}`).attr('src', `img/btsicon/btslasthit-${btsInfoMap.get(btsBaseInfo[i].btsId).mode}.png`);
                                }, 300000);
                            }
                            else {
                                clearInterval(btsHitTimer[`${btsBaseInfo[i].btsId}`]);
                                btsHitTimer[`${btsBaseInfo[i].btsId}`] = window.setInterval(function () {
                                    $(`.bts-img-${btsBaseInfo[i].btsId}`).attr('src', `img/btsicon/btslasthit-${btsInfoMap.get(btsBaseInfo[i].btsId).mode}.png`);
                                }, 300000);
                            }
                            /**add by gaochao end*/
                        }
                    }
                } else {
                    // 地图上没有基站，取目标基站最近的
                    if (ifNullHitedBts == null) {
                        if (targetCellInfosCache.size != 0) {
                            let targetBtsId;
                            targetCellInfosCache.forEach((eachTargetBts) => {
                                targetBtsId = eachTargetBts.btsId;
                            });
                            if (btsInfoMap.size != 0) {
                                let disCache = 5000;
                                btsInfoMap.forEach((eachBts) => {
                                    if (eachBts.dlHitTimes == 0 || eachBts.dlHitTimes == null) {
                                        if (ifNullHitedBts == null) {
                                            ifNullHitedBts = eachBts.btsId;
                                        } else {
                                            if (eachBts.btsId != targetBtsId) {
                                                let dis = map.getDistance(new BMap.Point(btsInfoMap.get(targetBtsId).lng, btsInfoMap.get(targetBtsId).lat), new BMap.Point(eachBts.lng, eachBts.lat));
                                                if (dis < disCache) {
                                                    disCache = dis;
                                                    ifNullHitedBts = eachBts.btsId;
                                                }
                                            }
                                        }
                                    }
                                });
                            }
                        }
                    }
                    if (ifNullHitedBts != null) {
                        if (dlHitTimesCacheMap.get(ifNullHitedBts) != btsBaseInfo[i].btsInfo.dlHitTimes) {
                            dlHitTimesCacheMap.set(ifNullHitedBts, btsBaseInfo[i].btsInfo.dlHitTimes);
                            let hitTimesHtml = $(`.bts-hit-count-${ifNullHitedBts}`).html();
                            let hitTimesLast = 0;
                            let dlHitTimesLast = 0;
                            if (hitTimesHtml != null && hitTimesHtml != "") {
                                hitTimesLast = parseInt(hitTimesHtml.split("/")[0]);
                                dlHitTimesLast = parseInt(hitTimesHtml.split("/")[1]);
                            }
                            $(`.bts-hit-count-${ifNullHitedBts}`).html(hitTimesLast + "/" + (dlHitTimesLast + btsBaseInfo[i].btsInfo.dlHitTimes));
                            if (btsBaseInfo[i].btsInfo.dlHitTimes != 0) {
                                $(`.bts-hit-count-shadow-${ifNullHitedBts}`).css('display', 'block');
                            }
                            $(`.bts-img-${ifNullHitedBts}`).removeClass('bts-img-unhit'); // 去除未命中标记
                            $(`.bts-click-${ifNullHitedBts}`).removeClass('bts-click-unhit'); // 去除未命中标记
                            $(`.bts-img-${ifNullHitedBts}`).removeClass('gray-cover'); // 去除灰色滤镜
                            $(`.bts-img-${ifNullHitedBts}`).attr('src', `img/btsicon/btsiconhit-${btsBaseInfo[i].btsInfo.mode}.png`);
                            if (eval(`btsHitTimer['${ifNullHitedBts}'] == null`)) {
                                btsHitTimer[`${ifNullHitedBts}`] = window.setInterval(function () {

                                    $(`.bts-img-${ifNullHitedBts}`).attr('src', `img/btsicon/btslasthit-${btsInfoMap.get(ifNullHitedBts).mode}.png`);
                                }, 300000);
                            }
                            else {
                                clearInterval(btsHitTimer[`${ifNullHitedBts}`]);
                                btsHitTimer[`${ifNullHitedBts}`] = window.setInterval(function () {
                                    $(`.bts-img-${ifNullHitedBts}`).attr('src', `img/btsicon/btslasthit-${btsInfoMap.get(ifNullHitedBts).mode}.png`);
                                    // add by caihongyun start
                                    // add by caihongyun end
                                }, 300000);
                            }
                        }
                    }
                }
            }
            /**add by gaochao start */

        }
        /* 判断基站是否已经在地图上，只绘制新增的基站*/
        let unexistBts = [];
        for (let i = 0; i < btsBaseInfo.length; i++) {
            let btsid = BtsValue.btsTag(btsBaseInfo[i].btsInfo.mode, btsBaseInfo[i].btsInfo.mcc, btsBaseInfo[i].btsInfo.mnc, btsBaseInfo[i].btsInfo.lacTac, btsBaseInfo[i].btsInfo.sid, btsBaseInfo[i].btsInfo.nid, btsBaseInfo[i].btsInfo.bid, btsBaseInfo[i].btsInfo.cellId);
            if (btsInfoMap.get(btsid) == null) {
                unexistBts.push(btsBaseInfo[i]);
            }
        }
        // btsInfoMap.forEach((eachBts) => {
        //     for (let i = 0; i < btsBaseInfo.length; i++) {
        //         let btsid = BtsValue.btsTag(btsBaseInfo[i].btsInfo.mode, btsBaseInfo[i].btsInfo.mcc, btsBaseInfo[i].btsInfo.mnc, btsBaseInfo[i].btsInfo.lacTac, btsBaseInfo[i].btsInfo.sid, btsBaseInfo[i].btsInfo.nid, btsBaseInfo[i].btsInfo.bid, btsBaseInfo[i].btsInfo.cellId);
        //         if (btsid == eachBts.btsId) {
        //             btsBaseInfo.splice(i, 1);
        //             break;
        //         }
        //     }
        // });
        /* 筛选信息中是否包含GPS坐标*/
        let carBts = [];
        for (let i = 0; i < unexistBts.length; i++) {
            let lng = unexistBts[i].btsInfo.lng;
            let lat = unexistBts[i].btsInfo.lat;
            if (lng != null && lat != null) {
                carBts.push(unexistBts[i]);
            }
        }
        this.getBtsBaiduPoint(carBts);
    }

    static getBtsBaiduPoint(BtsInfo) {
        if (BtsInfo.length > 0) {
            let pointArray = [];
            let pointArraySingle = [];
            for (let i = 0, len = BtsInfo.length; i < len; i++) {
                let lng = BtsInfo[i].btsInfo.lng;
                let lat = BtsInfo[i].btsInfo.lat;
                let point = [lng, lat];
                pointArray.push(point);
            }
            let btsBdPoints = GPSToBaiduPoint.getBaiduPointLocation(pointArray);

            for (let i = 0; i < btsBdPoints.length; i++) {
                BtsInfo[i].btsInfo.lng = btsBdPoints[i].lng;
                BtsInfo[i].btsInfo.lat = btsBdPoints[i].lat;
                /* 保存至map*/
                BtsInfo[i].btsInfo.btsId = BtsInfo[i].btsId;
                if (btsInfoMap.get(BtsInfo[i].btsId) == null) {
                    btsInfoMap.set(BtsInfo[i].btsId, BtsInfo[i].btsInfo);
                    DrawBtsOverlay.drawBts([BtsInfo[i]]);
                }
            }
        }
    }

    /* 目标小区*/
    static showTargetCell() {
        /* 设置颜色或绘制目标基站*/
        targetCellInfosCache.forEach((eachTargetBts) => {
            if (btsInfoMap.get(eachTargetBts.btsId) != null) {
                $(`.bts-img-${eachTargetBts.btsId}`).removeClass('bts-img-unhit'); // 去除未命中标记
                $(`.bts-click-${eachTargetBts.btsId}`).removeClass('bts-click-unhit'); // 去除未命中标记
                $(`.bts-img-${eachTargetBts.btsId}`).removeClass('gray-cover'); // 去除灰色滤镜
                $(`.bts-click-${eachTargetBts.btsId}`).css('z-index', 6000); // z轴置顶
                $(`.bts-img-${eachTargetBts.btsId}`).attr('src', `img/btsicon/btsicontarget-${eachTargetBts.mode}.png`);
            } else {
                eachTargetBts.isInfoPanelOpen = false;
                eachTargetBts.isRadiusOpen = false;
                eachTargetBts.needDraw = true;
                btsInfoMap.set(eachTargetBts.btsId, eachTargetBts);
                DrawBtsTargetOverlay.drawBts(eachTargetBts);
            }
        });
        /* 绘制红色路径*/
        devInfoMap.forEach((eachDevInfo) => {
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
                targetCellPoint = { lng: lngAll / targetCellInfosCache.size, lat: latAll / targetCellInfosCache.size };
                let baiduGpsInfo = GPSToBaiduPoint.getBaiduPointLocation([[eachDevInfo.gpsInfo.lng, eachDevInfo.gpsInfo.lat]])[0];
                if (map.getDistance(new BMap.Point(baiduGpsInfo.lng, baiduGpsInfo.lat), new BMap.Point(targetCellPoint.lng, targetCellPoint.lat)) > 500) {
                    let targetCellLine = new BMap.Polyline([
                        new BMap.Point(targetCellPoint.lng, targetCellPoint.lat),
                        new BMap.Point(baiduGpsInfo.lng, baiduGpsInfo.lat),
                    ], { strokeColor: 'red', strokeWeight: 1, strokeOpacity: 1 });
                    targetCellLineCache = targetCellLine;
                    map.addOverlay(targetCellLine);
                }
            }
        });
    }
    /**add by gaochao start */
    //预锁基站
    static showPreLockCell() {

        if (Object.getOwnPropertyNames(devPreLockCellClearInfosCache).length != 0) {
            for (let key in devPreLockCellClearInfosCache) {
                if (btsInfoMap.get(key) != null) {
                    if ($(`.bts-img-${key}`).hasClass('bts-img-unhit')) {
                        $(`.bts-img-${key}`).attr('src', `img/btsicon/btsicon-${devPreLockCellClearInfosCache[key]}.png`);
                    } else {
                        $(`.bts-img-${key}`).attr('src', `img/btsicon/btsiconhit-${devPreLockCellClearInfosCache[key]}.png`);
                    }
                } else {
                    map.removeOverlay(devPreLockCellClearInfosCache[key]);
                }
            }
            devPreLockCellClearInfosCache = {};
        }
        /* 设置颜色或绘制目标基站*/
        devPreLockCellInfosCache.forEach((eachPreLockBts) => {
            if (btsInfoMap.get(eachPreLockBts.btsId) != null) {
                if ($(`.bts-img-${eachPreLockBts.btsId}`).hasClass('bts-img-unhit')) {
                    // $(`.bts-img-${eachPreLockBts.btsId}`).removeClass('bts-img-unhit'); // 去除未命中标记
                    // $(`.bts-click-${eachPreLockBts.btsId}`).removeClass('bts-click-unhit'); // 去除未命中标记
                    $(`.bts-img-${eachPreLockBts.btsId}`).removeClass('gray-cover'); // 去除灰色滤镜
                    $(`.bts-click-${eachPreLockBts.btsId}`).css('z-index', 6000); // z轴置顶
                    $(`.bts-img-${eachPreLockBts.btsId}`).attr('src', `img/btsicon/btsicontarget-${eachPreLockBts.mode}.png`);
                    devPreLockCellClearInfosCache[eachPreLockBts.btsId] = eachPreLockBts.mode;
                }
            } else {
                eachPreLockBts.isInfoPanelOpen = false;
                eachPreLockBts.isRadiusOpen = false;
                eachPreLockBts.needDraw = true;
                // btsInfoMap.set(eachPreLockBts.btsId, eachPreLockBts);
                DrawBtsPreLockOverlay.drawBts(eachPreLockBts);
            }
        });

        if (devPreLockCellLineCache != null) {
            map.removeOverlay(devPreLockCellLineCache);
            devPreLockCellLineCache = null;
        }
        /* 绘制红色路径*/
        devInfoMap.forEach((eachDevInfo) => {
            /* 目标小区*/
            if (eachDevInfo.devType == 1 && devPreLockCellInfosCache.size != 0) {
                let preLockCellPoint;
                let lngAll = 0;
                let latAll = 0;
                devPreLockCellInfosCache.forEach((eachPreLockBts) => {
                    lngAll = lngAll + Number(eachPreLockBts.lng);
                    latAll = latAll + Number(eachPreLockBts.lat);
                });
                preLockCellPoint = { lng: lngAll / devPreLockCellInfosCache.size, lat: latAll / devPreLockCellInfosCache.size };
                let baiduGpsInfo = GPSToBaiduPoint.getBaiduPointLocation([[eachDevInfo.gpsInfo.lng, eachDevInfo.gpsInfo.lat]])[0];
                if (map.getDistance(new BMap.Point(baiduGpsInfo.lng, baiduGpsInfo.lat), new BMap.Point(preLockCellPoint.lng, preLockCellPoint.lat)) > 500) {
                    let devPreLockCellLine = new BMap.Polyline([
                        new BMap.Point(preLockCellPoint.lng, preLockCellPoint.lat),
                        new BMap.Point(baiduGpsInfo.lng, baiduGpsInfo.lat),
                    ], { strokeColor: 'red', strokeWeight: 1, strokeOpacity: 1 });

                    devPreLockCellLineCache = devPreLockCellLine;
                    map.addOverlay(devPreLockCellLine);
                }
            }
        });

    }
    /**add by gaochao end*/

    /* 基站解析进度*/
    static cellAnalysis(devStateInfoMap) {
        /* 高级面板显示通道信息*/
        /**add by gaochao start */
        let LteConEffective = 0;
        let WcdmaConEffective = 0;
        let CdmaConEffective = 0;
        let GsmConEffective = 0;

        let LteConEffectiveMap = new Map();
        let WcdmaConEffectiveMap = new Map();
        let CdmaConEffectiveMap = new Map();
        let GsmConEffectiveMap = new Map();

        let analysisInfoMapEach = new Map();
        analysisInfoHitMap = new Map();
        /**add by gaochao end*/
        for (let dev in devStateInfoMap) {
            let infoList = devStateInfoMap[dev].cellAnalysisInfoList;
            let channelInfoHtml = '';
            /**add by gaochao start */
            let analysisInfoMapNow = new Map();
            let advanceInfoHtmlLte = '';
            let advanceInfoHtmlWcdma = '';
            let advanceInfoHtmlCdma = '';
            let advanceInfoHtmlGsm = '';
            let advanceInfoHtmlLteCon = 0;
            let advanceInfoHtmlWcdmaCon = 0;
            let advanceInfoHtmlCdmaCon = 0;
            let advanceInfoHtmlGsmCon = 0;
            /**add by gaochao end*/
            if (infoList != null) {
                for (let i = 0; i < infoList.length; i++) {
                    /**add by gaochao start */
                    analysisInfoMapNow.set(infoList[i].btsId, 0);
                    if (infoList[i].hitTimes != null && infoList[i].hitTimes != undefined && infoList[i].hitTimes != '') {
                        analysisInfoMapNow.set(infoList[i].btsId, analysisInfoMapNow.get(infoList[i].btsId) + infoList[i].hitTimes);
                    }
                    /**add by gaochao end*/
                    let btsIdArr = infoList[i].btsId.split('-');
                    let perc;
                    if (infoList[i].mode != 'cdma' && infoList[i].mode != 'wcdma') {
                        perc = infoList[i].broadcastPercent + '%' + '-' + infoList[i].dedicatedPercent + '%';
                    } else {
                        perc = infoList[i].broadcastPercent + '%';
                    }
                    let panelHitTimes;
                    if (btsInfoMap.get(infoList[i].btsId) == null || btsInfoMap.get(infoList[i].btsId).hitTimes == null) {
                        panelHitTimes = 0;
                    } else {
                        panelHitTimes = btsInfoMap.get(infoList[i].btsId).hitTimes;
                    }
                    let areacode = infoList[i].mode == 'cdma' ? `${btsIdArr[btsIdArr.length - 3]}-${btsIdArr[btsIdArr.length - 2]}-${btsIdArr[btsIdArr.length - 1]}` : `${btsIdArr[btsIdArr.length - 2]}-${btsIdArr[btsIdArr.length - 1]}`;
                    //${btsIdArr[btsIdArr.length - 2]}-${btsIdArr[btsIdArr.length - 1]}
                    channelInfoHtml = channelInfoHtml + `
                        <tr>
                            <td style="width: 115px;">${infoList[i].freqPci}</td>
                            <td style="width: 135px;">${areacode}</td>
                            <td style="width: 86px; color: rgb(0, 125, 222)">${perc}</td>
                            <td style="width: 50px;">${panelHitTimes}</td>
                            <td style="width: 34px; color: #ff0000">${infoList[i].dbm}</td>
                            <td style="width: 34px;"></td>
                        </tr>
                    `;
                    /**add by gaochao start */
                    if (infoList[i].mode == 'lte') {
                        if (advanceInfoHtmlLteCon % 2 == 0) {
                            advanceInfoHtmlLte = advanceInfoHtmlLte + `
                        <div class="advance-info-content-odd">
                            <div class="advance-info-content-bts">${infoList[i].freqPci}</div>
                            <div class="advance-info-content-locationcode">${areacode}</div>
                            <div class="advance-info-content-analysis">${perc}</div>
                            <div class="advance-info-content-bid">${infoList[i].hitTimes != undefined ? infoList[i].hitTimes : 0}</div>
                            <div class="advance-info-content-fieldstrength">${infoList[i].dbm}</div>
                        </div>
                            `;
                        } else {
                            advanceInfoHtmlLte = advanceInfoHtmlLte + `
                        <div class="advance-info-content-even">
                            <div class="advance-info-content-bts">${infoList[i].freqPci}</div>
                            <div class="advance-info-content-locationcode">${areacode}</div>
                            <div class="advance-info-content-analysis">${perc}</div>
                            <div class="advance-info-content-bid">${infoList[i].hitTimes != undefined ? infoList[i].hitTimes : 0}</div>
                            <div class="advance-info-content-fieldstrength">${infoList[i].dbm}</div>
                        </div>
                            `;
                        }
                        advanceInfoHtmlLteCon++;
                        if (infoList[i].analysisFlag == 1) {
                            LteConEffective++;
                            if (LteConEffectiveMap.get(areacode) == undefined) {
                                LteConEffectiveMap.set(areacode, 1);
                            }
                        }
                    }
                    if (infoList[i].mode == 'wcdma') {
                        if (advanceInfoHtmlWcdmaCon % 2 == 0) {
                            advanceInfoHtmlWcdma = advanceInfoHtmlWcdma + `
                        <div class="advance-info-content-odd">
                            <div class="advance-info-content-bts">${infoList[i].freqPci}</div>
                            <div class="advance-info-content-locationcode">${areacode}</div>
                            <div class="advance-info-content-analysis">${perc}</div>
                            <div class="advance-info-content-bid">${infoList[i].hitTimes != undefined ? infoList[i].hitTimes : 0}</div>
                            <div class="advance-info-content-fieldstrength">${infoList[i].dbm}</div>
                        </div>
                            `;
                        } else {
                            advanceInfoHtmlWcdma = advanceInfoHtmlWcdma + `
                        <div class="advance-info-content-even">
                            <div class="advance-info-content-bts">${infoList[i].freqPci}</div>
                            <div class="advance-info-content-locationcode">${areacode}</div>
                            <div class="advance-info-content-analysis">${perc}</div>
                            <div class="advance-info-content-bid">${infoList[i].hitTimes != undefined ? infoList[i].hitTimes : 0}</div>
                            <div class="advance-info-content-fieldstrength">${infoList[i].dbm}</div>
                        </div>
                            `;
                        }
                        advanceInfoHtmlWcdmaCon++;
                        if (infoList[i].analysisFlag == 1) {
                            WcdmaConEffective++;
                            if (WcdmaConEffectiveMap.get(areacode) == undefined) {
                                WcdmaConEffectiveMap.set(areacode, 1);
                            }
                        }
                    }
                    if (infoList[i].mode == 'cdma') {
                        if (advanceInfoHtmlCdmaCon % 2 == 0) {
                            advanceInfoHtmlCdma = advanceInfoHtmlCdma + `
                        <div class="advance-info-content-odd">
                            <div class="advance-info-content-bts">${infoList[i].freqPci}</div>
                            <div class="advance-info-content-locationcode">${areacode}</div>
                            <div class="advance-info-content-analysis">${perc}</div>
                            <div class="advance-info-content-bid">${infoList[i].hitTimes != undefined ? infoList[i].hitTimes : 0}</div>
                            <div class="advance-info-content-fieldstrength">${infoList[i].dbm}</div>
                        </div>
                            `;
                        } else {
                            advanceInfoHtmlCdma = advanceInfoHtmlCdma + `
                        <div class="advance-info-content-even">
                            <div class="advance-info-content-bts">${infoList[i].freqPci}</div>
                            <div class="advance-info-content-locationcode">${areacode}</div>
                            <div class="advance-info-content-analysis">${perc}</div>
                            <div class="advance-info-content-bid">${infoList[i].hitTimes != undefined ? infoList[i].hitTimes : 0}</div>
                            <div class="advance-info-content-fieldstrength">${infoList[i].dbm}</div>
                        </div>
                            `;
                        }
                        advanceInfoHtmlCdmaCon++;
                        if (infoList[i].analysisFlag == 1) {
                            CdmaConEffective++;
                            if (CdmaConEffectiveMap.get(areacode) == undefined) {
                                CdmaConEffectiveMap.set(areacode, 1);
                            }
                        }
                    }
                    if (infoList[i].mode == 'gsm') {
                        if (advanceInfoHtmlGsmCon % 2 == 0) {
                            advanceInfoHtmlGsm = advanceInfoHtmlGsm + `
                        <div class="advance-info-content-odd">
                            <div class="advance-info-content-bts">${infoList[i].freqPci}</div>
                            <div class="advance-info-content-locationcode">${areacode}</div>
                            <div class="advance-info-content-analysis">${perc}</div>
                            <div class="advance-info-content-bid">${infoList[i].hitTimes != undefined ? infoList[i].hitTimes : 0}</div>
                            <div class="advance-info-content-fieldstrength">${infoList[i].dbm}</div>
                        </div>
                            `;
                        } else {
                            advanceInfoHtmlGsm = advanceInfoHtmlGsm + `
                        <div class="advance-info-content-even">
                            <div class="advance-info-content-bts">${infoList[i].freqPci}</div>
                            <div class="advance-info-content-locationcode">${areacode}</div>
                            <div class="advance-info-content-analysis">${perc}</div>
                            <div class="advance-info-content-bid">${infoList[i].hitTimes != undefined ? infoList[i].hitTimes : 0}</div>
                            <div class="advance-info-content-fieldstrength">${infoList[i].dbm}</div>
                        </div>
                            `;
                        }
                        advanceInfoHtmlGsmCon++;
                        if (infoList[i].analysisFlag == 1) {
                            GsmConEffective++;
                            if (GsmConEffectiveMap.get(areacode) == undefined) {
                                GsmConEffectiveMap.set(areacode, 1);
                            }
                        }
                    }
                    /**add by gaochao end*/
                }
                $(`.channel-info-table-tbody-${dev}`).html(channelInfoHtml);
                /**add by gaochao start */
                $(`.advance-info-content-container-${dev}-lte`).html(advanceInfoHtmlLte);
                $(`.advance-info-content-container-${dev}-wcdma`).html(advanceInfoHtmlWcdma);
                $(`.advance-info-content-container-${dev}-cdma`).html(advanceInfoHtmlCdma);
                $(`.advance-info-content-container-${dev}-gsm`).html(advanceInfoHtmlGsm);
                /**add by gaochao end*/
            }
            analysisInfoMapEach.set(dev, analysisInfoMapNow);
            /**add by gaochao start */
            if (devStateInfoMap[dev].reportTime != "" && devStateInfoMap[dev].reportTime != undefined && devStateInfoMap[dev].reportTime != null) {
                $(`.advance-info-time-${dev}`).html(new Date(devStateInfoMap[dev].reportTime).Format('hh:mm:ss'));
            }
            /**add by gaochao end*/
        }
        /**add by gaochao start */
        // analysisInfoMap = analysisInfoMapEach;
        // devDrawInfoMap.forEach((eachDev) => {
        //     if (analysisInfoMap.get(eachDev.devCode) != undefined) {
        //         for (let key of analysisInfoMap.get(eachDev.devCode).keys()) {
        //             if (analysisInfoMap.get(eachDev.devCode).get(key) != 0) {
        //                 analysisInfoHitMap.set(key, analysisInfoMap.get(eachDev.devCode).get(key) + (analysisInfoHitMap.get(key) != undefined ? analysisInfoHitMap.get(key) : 0));

        //             }
        //         }
        //     }
        // });
        // console.log(analysisInfoHitMap);
        // for (let key of analysisInfoHitMap.keys()) {
        //     if (btsInfoMap.get(key) != null) {
        //         $(`.bts-img-${key}`).attr('src', `img/btsicon/btsiconhit-${btsInfoMap.get(key).mode}.png`);
        //         $(`.bts-hit-count-${key}`).html((btsInfoMap.get(key).hitTimes) + "/" + analysisInfoHitMap.get(key));
        //     }
        // }

        $('#data-channel-gsm').html(GsmConEffectiveMap.size < 10 ? "&nbsp&nbsp" + GsmConEffectiveMap.size : GsmConEffectiveMap.size);
        $('#data-channel-cdma').html(CdmaConEffectiveMap.sizefective < 10 ? "&nbsp&nbsp" + CdmaConEffectiveMap.size : CdmaConEffectiveMap.size);
        $('#data-channel-wcdma').html(WcdmaConEffectiveMap.size < 10 ? "&nbsp&nbsp" + WcdmaConEffectiveMap.size : WcdmaConEffectiveMap.size);
        $('#data-channel-lte').html(LteConEffectiveMap.size < 10 ? "&nbsp&nbsp" + LteConEffectiveMap.size : LteConEffectiveMap.size);
        for (let key in devStateInfoMap) {
            if (devStateInfoMap[key].energy != null && devStateInfoMap[key].energy != 0) {
                $(`#team-each-dev-battery-value-${devStateInfoMap[key].devCode}`).css('display', 'block');
                $(`#team-each-dev-battery-icon-${devStateInfoMap[key].devCode}`).css('display', 'block');
                $(`#team-each-dev-battery-value-${devStateInfoMap[key].devCode}`).html(`${devStateInfoMap[key].energy}%`);
            }
            if (devStateInfoMap[key].temperature != null && devStateInfoMap[key].temperature != 0) {
                $(`#team-each-dev-temperature-value-${devStateInfoMap[key].devCode}`).css('display', 'block');
                $(`#team-each-dev-temperature-icon-${devStateInfoMap[key].devCode}`).css('display', 'block');
                $(`#team-each-dev-temperature-value-${devStateInfoMap[key].devCode}`).html(`${devStateInfoMap[key].temperature}℃`);
            }
        }
        /**add by gaochao end */
        /* 显示上行增益*/
        for (let key in devStateInfoMap) {
            if (devStateInfoMap[key].upGainValue != null) {
                $(`.uplink-gain-status-pot-${key}`).css('left', devStateInfoMap[key].upGainValue + '%');
                $(`.uplink-gain-status-gray-cover-${key}`).css('width', (1 - devStateInfoMap[key].upGainValue / 100) * 100 + '%');
                $(`.uplink-gain-status-value-${key}`).html(devStateInfoMap[key].upGainValue);
            } else {
                $(`.uplink-gain-status-pot-${key}`).css('left', '0%');
                $(`.uplink-gain-status-gray-cover-${key}`).css('width', '100%');
                $(`.uplink-gain-status-value-${key}`).html('0');
            }
        }
        /* 显示触发信息*/
        if (thisPageType == 'RTC') {
            // if (devStateInfoMap != null && devStateInfoMap[currentViewDevCode] != null) {
            //     let triggerInfoValue = devStateInfoMap[currentViewDevCode].triggerInfo;
            //     if (triggerInfoValue != null) {
            //         $('#sms-send-value').html(triggerInfoValue.sendTimes);
            //         $('#sms-finish-value').html(triggerInfoValue.completeTimes);
            //         $('#sms-receipt-value').html(triggerInfoValue.receiptTimes);
            //     } else {
            //         $('#sms-send-value').html(0);
            //         $('#sms-finish-value').html(0);
            //         $('#sms-receipt-value').html(0);
            //     }
            // }
            if (devStateInfoMap != null) {
                for (let key in devStateInfoMap) {
                    if (devDrawInfoMap.get(key).devType == 1 && devStateInfoMap[key] != null) {
                        let triggerInfoValue = devStateInfoMap[key].triggerInfo;
                        if (triggerInfoValue != null) {
                            /**add by gaochao start */
                            $('.sms-info-icon').css('background', `url(img/icon/sms_${triggerInfoValue.triggerStatus}.png)`);
                            /**add by gaochao end*/
                            $('#sms-send-value').html(triggerInfoValue.sendTimes);
                            $('#sms-finish-value').html(triggerInfoValue.completeTimes);
                            $('#sms-receipt-value').html(triggerInfoValue.receiptTimes);
                        }
                    }
                }
            }
        }
        for (let _key in devStateInfoMap) {
            if (devStateInfoMap[_key].cellAnalysisInfoList != null) {
                for (let key in devStateInfoMap) {
                    /* 如果当前视角中包含重复的基站，则以当前视角的基站为主，清除与当前视角重复的基站*/
                    if (key != currentViewDevCode) {
                        if (devStateInfoMap[key].cellAnalysisInfoList != null) {
                            for (let i = 0; i < devStateInfoMap[key].cellAnalysisInfoList.length; i++) {
                                let isExist = false;
                                if (devStateInfoMap[currentViewDevCode] != null && devStateInfoMap[currentViewDevCode].cellAnalysisInfoList != null) {
                                    for (let j = 0; j < devStateInfoMap[currentViewDevCode].cellAnalysisInfoList.length; j++) {
                                        if (devStateInfoMap[key].cellAnalysisInfoList[i].btsId == devStateInfoMap[currentViewDevCode].cellAnalysisInfoList[j].btsId) {
                                            isExist = true;
                                            break;
                                        }
                                    }
                                }
                                if (isExist) {
                                    devStateInfoMap[key].cellAnalysisInfoList.splice(i, 1);
                                }
                            }
                        }
                    }
                }
                /* 绘制基站解析*/
                DrawBtsAnalysis.drawAnalysis(devStateInfoMap);
            }
        }
    }

}