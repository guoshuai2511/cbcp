import { GPSToBaiduPoint } from '../../../common/baiduMap/GPSToBaiduPoint.BaiduMap.js';
import { BtsValue } from '../bts/BtsValue.js';
import { DrawMultiBtsOverlay } from '../overlay/DrawMultiBtsOverlay.js';
import { DrawMultiBtsAnalysis } from '../overlay/DrawMultiBtsAnalysis.js';
import { DrawBtsPreLockOverlay } from '../overlay/DrawBtsPreLockOverlay.js';


/**
 * 复合基站解析处理
 * 1.将Map结构的基站数据整理成List结构，根据基站ID排重
 * 2.根据基站ID+基站GPS判断基站是否需要绘制在地图上
 */
export class ParsingMultiBtsInfo {

    static parsingBtsInfosMap(devBtsInfosMap) {
        /* 命中次数清理 */
        $('.bts-hit-count').html("");
        /* 绘制基站 */
        for (let key in devBtsInfosMap) {
            ParsingMultiBtsInfo.prasingBtsInfo(devBtsInfosMap[key]);
        }

        let btsHitInfoMap = new Map();
        //统计所有设备命中信息集合hitTimes累加
        for (let key in devBtsInfosMap) {
            let btsBaseInfo = [];
            let devBtsInfos = devBtsInfosMap[key];
            let btsInfos = devBtsInfos.btsInfos;
            for (let key in btsInfos) {
                btsBaseInfo.push({ btsId: key, btsInfo: JSON.parse(JSON.stringify(btsInfos[key])) });
            }
            for (let i = 0; i < btsBaseInfo.length; i++) {
                //let btsId = BtsValue.btsTag(btsBaseInfo[i].btsInfo.mode, btsBaseInfo[i].btsInfo.mcc, btsBaseInfo[i].btsInfo.mnc, btsBaseInfo[i].btsInfo.lacTac, btsBaseInfo[i].btsInfo.sid, btsBaseInfo[i].btsInfo.nid, btsBaseInfo[i].btsInfo.bid, btsBaseInfo[i].btsInfo.cellId);
                //btsBaseInfo[i].btsId = btsId;
                let btsId = btsBaseInfo[i].btsId;
                if (btsBaseInfo[i].btsInfo.hitTimes > 0 || btsBaseInfo[i].btsInfo.dlHitTimes > 0) {
                    if (btsHitInfoMap.get(btsId) == null) {
                        btsHitInfoMap.set(btsId, JSON.parse(JSON.stringify(btsBaseInfo[i].btsInfo)));
                    } else {
                        let btsHitInfo = JSON.parse(JSON.stringify(btsHitInfoMap.get(btsId)));
                        btsHitInfo.hitTimes = btsHitInfo.hitTimes + btsBaseInfo[i].btsInfo.hitTimes;
                        btsHitInfo.dlHitTimes = btsHitInfo.dlHitTimes + btsBaseInfo[i].btsInfo.dlHitTimes;
                        btsHitInfoMap.set(btsId, btsHitInfo);
                    }
                }
            }
        }
        /* 绘制命中信息 */
        if (btsHitInfoMap.size > 0) {
            for (let key of btsHitInfoMap.keys()) {
                let btsHitInfo = btsHitInfoMap.get(key);
                let btsInfo = btsInfoMap.get(key);
                let multiBtsInfo = multiBtsInfoMap.get(key);
                if (btsInfo != null) {
                    if (multiBtsInfo != null && multiBtsInfo.type == 1) {
                        //单基站
                        $(`.bts-img-${key}`).removeClass('bts-img-unhit'); // 去除未命中标记
                        $(`.bts-click-${key}`).removeClass('bts-click-unhit'); // 去除未命中标记
                        $(`.bts-img-${key}`).removeClass('gray-cover'); // 去除灰色滤镜
                        $(`.bts-click-${key}`).css('z-index', 6000); // z轴置顶
                        $(`.bts-hit-count-${key}`).html(btsHitInfo.hitTimes + "/" + btsHitInfo.dlHitTimes);
                        $(`.bts-hit-count-shadow-${key}`).css('display', 'block');
                        $(`.bts-img-${key}`).attr('src', `img/btsicon/btsiconhit-${btsInfo.mode}.png`);
                    } else if (multiBtsInfo != null && multiBtsInfo.type == 2) {
                        //复合基站
                        $(`.multi-bts-img-${key}`).removeClass('bts-img-unhit'); // 去除未命中标记
                        $(`.multi-bts-click-${key}`).removeClass('bts-click-unhit'); // 去除未命中标记
                        $(`.multi-bts-img-${key}`).removeClass('gray-cover'); // 去除灰色滤镜
                        $(`.multi-bts-click-${key}`).css('z-index', 6000); // z轴置顶
                        // $(`.multi-bts-hit-count-${key}`).html(btsHitInfo.hitTimes+"/"+btsHitInfo.dlHitTimes);
                        $(`.multi-bts-img-${key}`).attr('src', `img/multibtsicon/btsiconhit-${btsInfo.mode}.png`);
                        //子图标添加样式
                        $(`.bts-img-${key}`).removeClass('bts-img-unhit'); // 去除未命中标记
                        $(`.multi-sub-bts-click-${key}`).removeClass('bts-click-unhit'); // 去除未命中标记
                        $(`.bts-img-${key}`).removeClass('gray-cover'); // 去除灰色滤镜
                        $(`.multi-sub-bts-click-${key}`).css('z-index', 6000); // z轴置顶
                        $(`.multi-sub-bts-hit-count-${key}`).html(btsHitInfo.hitTimes + "/" + btsHitInfo.dlHitTimes);
                        $(`.multi-sub-bts-hit-count-shadow-${key}`).css('display', 'block');
                        $(`.bts-img-${key}`).attr('src', `img/btsicon/btsiconhit-${btsInfo.mode}.png`);

                    } else if (multiBtsInfo == null) {
                        let parentBtsId = btsInfo.parentBtsId;
                        $(`.multi-bts-img-${parentBtsId}`).removeClass('bts-img-unhit'); // 去除未命中标记
                        $(`.multi-bts-click-${parentBtsId}`).removeClass('bts-click-unhit'); // 去除未命中标记
                        $(`.multi-bts-img-${parentBtsId}`).removeClass('gray-cover'); // 去除灰色滤镜
                        $(`.multi-bts-click-${parentBtsId}`).css('z-index', 6000); // z轴置顶
                        // $(`.multi-bts-hit-count-${parentBtsId}`).html(btsHitInfo.hitTimes+"/"+btsHitInfo.dlHitTimes);
                        $(`.multi-bts-img-${parentBtsId}`).attr('src', `img/multibtsicon/btsiconhit-${btsInfo.mode}.png`);
                        //子图标添加样式
                        $(`.bts-img-${key}`).removeClass('bts-img-unhit'); // 去除未命中标记
                        $(`.multi-sub-bts-click-${key}`).removeClass('bts-click-unhit'); // 去除未命中标记
                        $(`.bts-img-${key}`).removeClass('gray-cover'); // 去除灰色滤镜
                        $(`.multi-sub-bts-click-${key}`).css('z-index', 6000); // z轴置顶
                        $(`.multi-sub-bts-hit-count-${key}`).html(btsHitInfo.hitTimes + "/" + btsHitInfo.dlHitTimes);
                        $(`.multi-sub-bts-hit-count-shadow-${key}`).css('display', 'block');
                        $(`.bts-img-${key}`).attr('src', `img/btsicon/btsiconhit-${btsInfo.mode}.png`);
                    }
                }
            }
        }
    }

    static prasingBtsInfo(devBtsInfos) {
        let btsBaseInfo = [];
        let btsInfos = devBtsInfos.btsInfos;
        for (let key in btsInfos) {
            //添加基站属性type=1表示普通基站type=2表示复合基站 child表示子基站集合
            btsInfos[key]['type'] = 1;
            btsInfos[key]['child'] = [];
            //基站颜色状态 5红(带特效) 4红 3粉红 2黄 1蓝 0灰
            btsInfos[key]['color'] = 0;
            //父基站ID
            btsInfos[key]['parentBtsId'] = '';
            /** add by sunbing start */
            //基站解析来源（复合基站使用）默认：0 预锁基站：1 命中基站：2 
            btsInfos[key]['analysisSrc'] = 0;
            //基站解析权值
            btsInfos[key]['analysisValue'] = 0;
            /** add by sunbing end */
            btsBaseInfo.push({ btsId: key, btsInfo: btsInfos[key] });
        }
        ParsingMultiBtsInfo.drawBtsList(btsBaseInfo);
        //统计未在地图上绘制的基站集合
        let unExistBts = [];
        for (let i = 0; i < btsBaseInfo.length; i++) {
            let btsId = BtsValue.btsTag(btsBaseInfo[i].btsInfo.mode, btsBaseInfo[i].btsInfo.mcc, btsBaseInfo[i].btsInfo.mnc, btsBaseInfo[i].btsInfo.lacTac, btsBaseInfo[i].btsInfo.sid, btsBaseInfo[i].btsInfo.nid, btsBaseInfo[i].btsInfo.bid, btsBaseInfo[i].btsInfo.cellId);
            btsBaseInfo[i].btsId = btsId;
            if (btsInfoMap.get(btsId) == null) {
                //检查基站属性是否包含GPS信息
                let lng = btsBaseInfo[i].btsInfo.lng;
                let lat = btsBaseInfo[i].btsInfo.lat;
                if (lng && lng != '' && typeof (lng) != undefined && lat && lat != '' && typeof (lat) != undefined) {
                    unExistBts.push(btsBaseInfo[i]);
                }
            }
        }
        this.handleBtsToDraw(unExistBts);
    }

    /**
     * 1.将基站原始坐标转换成百度坐标
     * 2.根据基站距离生成复合基站
     * 3.调用绘制基站方法
     */
    static handleBtsToDraw(srcBtsInfoMap) {
        ParsingMultiBtsInfo.drawBtsList(srcBtsInfoMap);
        if (srcBtsInfoMap.length > 0) {
            //坐标转换
            let pointArray = [];
            for (let i = 0; i < srcBtsInfoMap.length; i++) {
                let lng = srcBtsInfoMap[i].btsInfo.lng;
                let lat = srcBtsInfoMap[i].btsInfo.lat;
                let point = [lng, lat];
                pointArray.push(point);
            }
            let btsBdPoints = GPSToBaiduPoint.getBaiduPointLocation(pointArray);
            for (let i = 0; i < btsBdPoints.length; i++) {
                srcBtsInfoMap[i].btsInfo.lng = btsBdPoints[i].lng;
                srcBtsInfoMap[i].btsInfo.lat = btsBdPoints[i].lat;
                /* 保存至map*/
                //srcBtsInfoMap[i].btsInfo.btsId = srcBtsInfoMap[i].btsId;
                if (btsInfoMap.get(srcBtsInfoMap[i].btsId) == null) {
                    btsInfoMap.set(srcBtsInfoMap[i].btsId, srcBtsInfoMap[i].btsInfo);
                }

            }
            let multiBtsList = [];
            //基站预筛选，将临近的基站合成复合基站
            for (let key of btsInfoMap.keys()) {
                let btsInfo = btsInfoMap.get(key);
                let lngNew = btsInfo.lng;
                let latNew = btsInfo.lat;
                if (multiBtsList.length > 0) {
                    let index = -1;
                    for (let j = 0; j < multiBtsList.length; j++) {
                        let lng = multiBtsList[j].lng;
                        let lat = multiBtsList[j].lat;
                        if (map.getDistance(new BMap.Point(lng, lat), new BMap.Point(lngNew, latNew)) < 50) {
                            index = j;
                            break;
                        }
                    }
                    if (index > -1) {
                        if (multiBtsList[index].type == 1) {
                            //如果是单基站转复合基站
                            let slfBts = JSON.parse(JSON.stringify(multiBtsList[index]));
                            slfBts.parentBtsId = multiBtsList[index].btsId;
                            multiBtsList[index].child.push(slfBts);
                            multiBtsList[index].type = 2;
                            btsInfo.parentBtsId = multiBtsList[index].btsId;
                            let tempBts = JSON.parse(JSON.stringify(btsInfo));
                            multiBtsList[index].child.push(tempBts);
                        } else {
                            //如果已经是复合基站
                            btsInfo.parentBtsId = multiBtsList[index].btsId;
                            let tempBts = JSON.parse(JSON.stringify(btsInfo));
                            multiBtsList[index].child.push(tempBts);
                        }
                    } else {
                        btsInfo.parentBtsId = btsInfo.btsId;
                        let tempBts = JSON.parse(JSON.stringify(btsInfo));
                        multiBtsList.push(tempBts);
                    }
                } else {
                    btsInfo.parentBtsId = btsInfo.btsId;
                    let tempBts = JSON.parse(JSON.stringify(btsInfo));
                    multiBtsList.push(tempBts);
                }
            }

            //地图上绘制复合基站
            for (let i = 0; i < multiBtsList.length; i++) {
                //使用JSON对象克隆，js改变新对象的值不影响引用对象的值
                let multiBts = JSON.parse(JSON.stringify(multiBtsList[i]));
                let btsId = multiBts.btsId;
                if (multiBtsInfoMap.get(btsId) == null) {
                    //绘制基站
                    DrawMultiBtsOverlay.drawBts(multiBts);
                    //添加到缓存
                    multiBtsInfoMap.set(btsId, multiBts);
                } else if (multiBtsInfoMap.get(btsId) != null && multiBtsInfoMap.get(btsId).type == 1 && multiBts.type == 2) {
                    //原先地图上是单基站图片，现在要显示复合基站图标
                    //先移除原图标，再绘制新图标
                    map.removeOverlay(btsDivMap.get(btsId).btsCover);
                    btsDivMap.get(btsId).btsCover = null;
                    //绘制基站
                    DrawMultiBtsOverlay.drawBts(multiBts);
                    //添加到缓存
                    multiBtsInfoMap.set(btsId, multiBts);
                } else if (multiBtsInfoMap.get(btsId) != null && multiBtsInfoMap.get(btsId).type == 2 && multiBtsInfoMap.get(btsId).child.length != multiBts.child.length) {
                    //原本是复合基站，但是新增了子基站,重绘基站
                    map.removeOverlay(btsDivMap.get(btsId).btsCover);
                    btsDivMap.get(btsId).btsCover = null;
                    //绘制基站
                    DrawMultiBtsOverlay.drawBts(multiBts);
                    //添加到缓存
                    multiBtsInfoMap.set(btsId, multiBts);
                }
            }
        }
    }
    /**add by gaochao start */
    //预锁基站
    static showPreLockCell() {

        if (Object.getOwnPropertyNames(devPreLockCellClearInfosCache).length != 0) {
            for (let key in devPreLockCellClearInfosCache) {
                let btsInfo = btsInfoMap.get(key);
                let multiBtsInfo = multiBtsInfoMap.get(key);
                if (btsInfoMap.get(key) != null) {
                    if (multiBtsInfo != null && multiBtsInfo.type == 1) {
                        if ($(`.bts-img-${key}`).hasClass('bts-img-unhit')) {
                            $(`.bts-img-${key}`).addClass('proLock');
                            $(`.bts-img-${key}`).attr('src', `img/btsicon/btsicon-${devPreLockCellClearInfosCache[key]}.png`);
                            $(`.bts-active-img-${key}`).hide();
                        } else {
                            $(`.bts-img-${key}`).attr('src', `img/btsicon/btsiconhit-${devPreLockCellClearInfosCache[key]}.png`);
                            $(`.bts-active-img-${key}`).hide();
                        }
                    } else if (multiBtsInfo != null && multiBtsInfo.type == 2) {
                        //复基站
                        if ($(`.multi-bts-img-${key}`).hasClass('bts-img-unhit')) {
                            $(`.multi-bts-img-${key}`).addClass('proLock');
                            $(`.multi-bts-img-${key}`).attr('src', `img/multibtsicon/btsicon-${devPreLockCellClearInfosCache[key]}.png`);
                            $(`.multi-bts-active-img-${key}`).hide();
                        } else {
                            $(`.multi-bts-img-${key}`).attr('src', `img/multibtsicon/btsiconhit-${devPreLockCellClearInfosCache[key]}.png`);
                            $(`.multi-bts-active-img-${key}`).hide();
                        }

                        if ($(`.bts-img-${key}`).hasClass('bts-img-unhit')) {
                            $(`.bts-img-${key}`).addClass('proLock');
                            $(`.bts-img-${key}`).attr('src', `img/btsicon/btsicon-${devPreLockCellClearInfosCache[key]}.png`);
                            $(`.multi-sub-active-img-${key}`).hide();
                        } else {
                            $(`.bts-img-${key}`).attr('src', `img/btsicon/btsiconhit-${devPreLockCellClearInfosCache[key]}.png`);
                            $(`.multi-sub-active-img-${key}`).hide();
                        }

                    } else if (multiBtsInfo == null) {
                        let parentBtsId = btsInfo.parentBtsId;

                        if ($(`.multi-bts-img-${parentBtsId}`).hasClass('bts-img-unhit')) {
                            $(`.multi-bts-img-${parentBtsId}`).addClass('proLock');
                            $(`.multi-bts-img-${parentBtsId}`).attr('src', `img/multibtsicon/btsicon-${devPreLockCellClearInfosCache[key]}.png`);
                            $(`.multi-bts-active-img-${parentBtsId}`).hide();
                        } else {
                            $(`.multi-bts-img-${parentBtsId}`).attr('src', `img/multibtsicon/btsiconhit-${devPreLockCellClearInfosCache[key]}.png`);
                            $(`.multi-bts-active-img-${parentBtsId}`).hide();
                        }

                        if ($(`.bts-img-${key}`).hasClass('bts-img-unhit')) {
                            $(`.bts-img-${key}`).addClass('proLock');
                            $(`.bts-img-${key}`).attr('src', `img/btsicon/btsicon-${devPreLockCellClearInfosCache[key]}.png`);
                            $(`.multi-sub-active-img-${key}`).hide();
                        } else {
                            $(`.bts-img-${key}`).attr('src', `img/btsicon/btsiconhit-${devPreLockCellClearInfosCache[key]}.png`);
                            $(`.multi-sub-active-img-${key}`).hide();
                        }

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
                let btsInfo = btsInfoMap.get(eachPreLockBts.btsId);
                let multiBtsInfo = multiBtsInfoMap.get(eachPreLockBts.btsId);
                if (multiBtsInfo != null && multiBtsInfo.type == 1) {

                    if ($(`.bts-img-${eachPreLockBts.btsId}`).hasClass('bts-img-unhit')) {
                        $(`.bts-img-${eachPreLockBts.btsId}`).addClass('proLock');
                        $(`.bts-img-${eachPreLockBts.btsId}`).removeClass('gray-cover'); // 去除灰色滤镜
                        $(`.bts-click-${eachPreLockBts.btsId}`).css('z-index', 6000); // z轴置顶
                        $(`.bts-img-${eachPreLockBts.btsId}`).attr('src', `img/btsicon/btsicontarget-${eachPreLockBts.mode}.png`);
                        if (eachPreLockBts.type == 1) {
                            $(`.bts-active-img-${eachPreLockBts.btsId}`).show();
                        }
                        devPreLockCellClearInfosCache[eachPreLockBts.btsId] = eachPreLockBts.mode;
                    }
                } else if (multiBtsInfo != null && multiBtsInfo.type == 2) {
                    if ($(`.multi-bts-img-${eachPreLockBts.btsId}`).hasClass('bts-img-unhit')) {
                        $(`.multi-bts-img-${eachPreLockBts.btsId}`).addClass('proLock');
                        $(`.multi-bts-img-${eachPreLockBts.btsId}`).removeClass('gray-cover'); // 去除灰色滤镜
                        $(`.bts-click-${eachPreLockBts.btsId}`).css('z-index', 6000); // z轴置顶
                        $(`.multi-bts-img-${eachPreLockBts.btsId}`).attr('src', `img/multibtsicon/btsicontarget-${eachPreLockBts.mode}.png`);
                        if (eachPreLockBts.type == 1) {
                            $(`.multi-bts-active-img-${eachPreLockBts.btsId}`).show();
                        }
                    }
                    if ($(`.bts-img-${eachPreLockBts.btsId}`).hasClass('bts-img-unhit')) {
                        $(`.bts-img-${eachPreLockBts.btsId}`).addClass('proLock');
                        $(`.bts-img-${eachPreLockBts.btsId}`).removeClass('gray-cover'); // 去除灰色滤镜
                        $(`.multi-sub-bts-click-${eachPreLockBts.btsId}`).css('z-index', 6000); // z轴置顶
                        $(`.bts-img-${eachPreLockBts.btsId}`).attr('src', `img/btsicon/btsicontarget-${eachPreLockBts.mode}.png`);
                        if (eachPreLockBts.type == 1) {
                            $(`.multi-sub-active-img-${eachPreLockBts.btsId}`).show();
                        }
                        devPreLockCellClearInfosCache[eachPreLockBts.btsId] = eachPreLockBts.mode;
                    }
                } else if (multiBtsInfo == null) {
                    let parentBtsId = btsInfo.parentBtsId;
                    if ($(`.multi-bts-img-${parentBtsId}`).hasClass('bts-img-unhit')) {
                        $(`.multi-bts-img-${parentBtsId}`).addClass('proLock');
                        $(`.multi-bts-img-${parentBtsId}`).removeClass('gray-cover'); // 去除灰色滤镜
                        $(`.bts-click-${parentBtsId}`).css('z-index', 6000); // z轴置顶
                        $(`.multi-bts-img-${parentBtsId}`).attr('src', `img/multibtsicon/btsicontarget-${eachPreLockBts.mode}.png`);
                        if (eachPreLockBts.type == 1) {
                            $(`.multi-bts-active-img-${parentBtsId}`).show();
                        }
                    }

                    if ($(`.bts-img-${eachPreLockBts.btsId}`).hasClass('bts-img-unhit')) {
                        $(`.bts-img-${eachPreLockBts.btsId}`).addClass('proLock');
                        $(`.bts-img-${eachPreLockBts.btsId}`).removeClass('gray-cover'); // 去除灰色滤镜
                        $(`.multi-sub-bts-click${eachPreLockBts.btsId}`).css('z-index', 6000); // z轴置顶
                        $(`.bts-img-${eachPreLockBts.btsId}`).attr('src', `img/btsicon/btsicontarget-${eachPreLockBts.mode}.png`);
                        if (eachPreLockBts.type == 1) {
                            $(`.multi-sub-active-img-${eachPreLockBts.btsId}`).show();
                        }
                        devPreLockCellClearInfosCache[eachPreLockBts.btsId] = eachPreLockBts.mode;
                    }
                }


            } else {
                //地图上没有当前预锁基站，需要检查预锁基站附近是否有基站（与multiBtsInfoMap缓存基站信息对比），解决预锁基站覆盖之前基站位置引起的bug
                let drawFlag = true;
                let preLockBtsLng = eachPreLockBts.lng;
                let preLockBtsLat = eachPreLockBts.lat;
                for (let key of multiBtsInfoMap.keys()) {
                    let btsInfo = multiBtsInfoMap.get(key);
                    let type = btsInfo.type;
                    let lng = btsInfo.lng;
                    let lat = btsInfo.lat;
                    if (type == 2) {
                        let distance = map.getDistance(new BMap.Point(preLockBtsLng, preLockBtsLat), new BMap.Point(lng, lat));
                        if (distance < 50) {
                            drawFlag = false;
                            let dataList = eachPreLockBts.btsId.split("-");
                            eachPreLockBts.mcc = dataList[0];
                            eachPreLockBts.mnc = dataList[1];
                            eachPreLockBts.lacTac = dataList[2];
                            eachPreLockBts.cellId = dataList[3];
                            let preLockBtsOfMultiBts = ParsingMultiBtsInfo.FormatBtsData(eachPreLockBts);
                            preLockBtsOfMultiBts.parentBtsId = btsInfo.btsId;
                            preLockBtsOfMultiBts.type = 1;
                            btsInfo.child.push(preLockBtsOfMultiBts);
                            map.removeOverlay(btsDivMap.get(btsInfo.btsId).btsCover);
                            btsDivMap.get(btsInfo.btsId).btsCover = null;
                            //绘制基站
                            DrawMultiBtsOverlay.drawBts(btsInfo);
                            //添加到缓存
                            multiBtsInfoMap.set(btsInfo.btsId, btsInfo);
                            btsInfoMap.set(eachPreLockBts.btsId, preLockBtsOfMultiBts)
                            // 将当前复合基站图标设置成预锁基站图标，并在子基站添加当前预锁基站信息
                            if ($(`.multi-bts-img-${preLockBtsOfMultiBts.parentBtsId}`).hasClass('bts-img-unhit')) {
                                $(`.multi-bts-img-${preLockBtsOfMultiBts.parentBtsId}`).addClass('proLock');
                                $(`.multi-bts-img-${preLockBtsOfMultiBts.parentBtsId}`).removeClass('gray-cover'); // 去除灰色滤镜
                                $(`.bts-click-${preLockBtsOfMultiBts.parentBtsId}`).css('z-index', 6000); // z轴置顶
                                $(`.multi-bts-img-${preLockBtsOfMultiBts.parentBtsId}`).attr('src', `img/multibtsicon/btsicontarget-${eachPreLockBts.mode}.png`);
                                if (eachPreLockBts.type == 1) {
                                    $(`.multi-bts-active-img-${preLockBtsOfMultiBts.parentBtsId}`).show();
                                }
                            }
                            if ($(`.bts-img-${eachPreLockBts.btsId}`).hasClass('bts-img-unhit')) {
                                $(`.bts-img-${eachPreLockBts.btsId}`).addClass('proLock');
                                $(`.bts-img-${eachPreLockBts.btsId}`).removeClass('gray-cover'); // 去除灰色滤镜
                                $(`.multi-sub-bts-click-${eachPreLockBts.btsId}`).css('z-index', 6000); // z轴置顶
                                $(`.bts-img-${eachPreLockBts.btsId}`).attr('src', `img/btsicon/btsicontarget-${eachPreLockBts.mode}.png`);
                                if (eachPreLockBts.type == 1) {
                                    $(`.multi-sub-active-img-${eachPreLockBts.btsId}`).show();
                                }
                                devPreLockCellClearInfosCache[eachPreLockBts.btsId] = eachPreLockBts.mode;
                            }
                            break;
                        }
                    }
                }
                if (drawFlag) {
                    eachPreLockBts.isInfoPanelOpen = false;
                    eachPreLockBts.isRadiusOpen = false;
                    eachPreLockBts.needDraw = true;
                    // btsInfoMap.set(eachPreLockBts.btsId, eachPreLockBts);
                    DrawBtsPreLockOverlay.drawBts(eachPreLockBts);
                    if (eachPreLockBts.type == 1) {
                        $(`.bts-active-img-${eachPreLockBts.btsId}`).show();
                    }
                }
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
    static FormatBtsData(data) {
        let btsInfo = { btsId: null, mcc: null, mnc: null, mode: null, lacTac: null, cellId: null, sid: null, nid: null, bid: null, lng: null, lat: null, radius: null, credibility: null, time: null, reportTime: null, createTime: null };
        btsInfo.btsId = data.btsId;
        btsInfo.mcc = data.mcc;
        btsInfo.mnc = data.mnc;
        btsInfo.mode = data.mode;
        btsInfo.lacTac = data.lacTac;
        btsInfo.cellId = data.cellId;
        btsInfo.sid = data.sid;
        btsInfo.nid = data.nid;
        btsInfo.bid = data.bid;
        btsInfo.lng = data.lng;
        btsInfo.lat = data.lat;
        btsInfo.radius = data.radius;
        btsInfo.credibility = data.credibility;
        btsInfo.reportTime = data.reportTime;
        btsInfo.createTime = data.createTime;
        btsInfo.hitTimes = 0;
        btsInfo.dlHitTimes = 0;
        return btsInfo;
    }
    /* 基站解析进度 */
    static cellAnalysis(devStateInfoMap) {
        /* 高级面板显示通道信息*/
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
        for (let dev in devStateInfoMap) {
            let infoList = devStateInfoMap[dev].cellAnalysisInfoList;
            let channelInfoHtml = '';
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
                    analysisInfoMapNow.set(infoList[i].btsId, 0);
                    if (infoList[i].hitTimes != null && infoList[i].hitTimes != undefined && infoList[i].hitTimes != '') {
                        analysisInfoMapNow.set(infoList[i].btsId, analysisInfoMapNow.get(infoList[i].btsId) + infoList[i].hitTimes);
                    }
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
                    if (infoList[i].mode == 'lte') {
                        if (advanceInfoHtmlLteCon % 2 == 0) {
                            advanceInfoHtmlLte = advanceInfoHtmlLte + `
                            <div class="advance-info-content-odd">
                                <div class="advance-info-content-active">${isActive(infoList[i].isActive, infoList[i].freqPci, 1)}</div>
                                <div class="advance-info-content-bts" style="${isActive(infoList[i].isActive, infoList[i].freqPci, 2)}">${infoList[i].freqPci}</div>
                                <div class="advance-info-content-locationcode clipboard"  active-status="${isActive(infoList[i].isActive, infoList[i].freqPci, 3)}" data-clipboard-text="${infoList[i].btsId}">${areacode}</div>
                                <div class="advance-info-content-analysis">${perc}</div>
                                <div class="advance-info-content-bid">${infoList[i].hitTimes != undefined ? infoList[i].hitTimes : 0}</div>
                                <div class="advance-info-content-fieldstrength">${infoList[i].dbm}</div>
                            </div>
                            `;
                        } else {
                            advanceInfoHtmlLte = advanceInfoHtmlLte + `
                            <div class="advance-info-content-even">
                                <div class="advance-info-content-active">${isActive(infoList[i].isActive, infoList[i].freqPci, 1)}</div>
                                <div class="advance-info-content-bts" style="${isActive(infoList[i].isActive, infoList[i].freqPci, 2)}">${infoList[i].freqPci}</div>
                                <div class="advance-info-content-locationcode clipboard"  active-status="${isActive(infoList[i].isActive, infoList[i].freqPci, 3)}" data-clipboard-text="${infoList[i].btsId}">${areacode}</div>
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
                                <div class="advance-info-content-active">${isActive(infoList[i].isActive, infoList[i].freqPci, 1)}</div>
                                <div class="advance-info-content-bts" style="${isActive(infoList[i].isActive, infoList[i].freqPci, 2)}">${infoList[i].freqPci}</div>
                                <div class="advance-info-content-locationcode clipboard"  active-status="${isActive(infoList[i].isActive, infoList[i].freqPci, 3)}" data-clipboard-text="${infoList[i].btsId}">${areacode}</div>
                                <div class="advance-info-content-analysis">${perc}</div>
                                <div class="advance-info-content-bid">${infoList[i].hitTimes != undefined ? infoList[i].hitTimes : 0}</div>
                                <div class="advance-info-content-fieldstrength">${infoList[i].dbm}</div>
                            </div>
                            `;
                        } else {
                            advanceInfoHtmlWcdma = advanceInfoHtmlWcdma + `
                            <div class="advance-info-content-even">
                                <div class="advance-info-content-active">${isActive(infoList[i].isActive, infoList[i].freqPci, 1)}</div>
                                <div class="advance-info-content-bts" style="${isActive(infoList[i].isActive, infoList[i].freqPci, 2)}">${infoList[i].freqPci}</div>
                                <div class="advance-info-content-locationcode clipboard"  active-status="${isActive(infoList[i].isActive, infoList[i].freqPci, 3)}" data-clipboard-text="${infoList[i].btsId}">${areacode}</div>
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
                                <div class="advance-info-content-active">${isActive(infoList[i].isActive, infoList[i].freqPci, 1)}</div>
                                <div class="advance-info-content-bts" style="${isActive(infoList[i].isActive, infoList[i].freqPci, 2)}">${infoList[i].freqPci}</div>
                                <div class="advance-info-content-locationcode clipboard"  active-status="${isActive(infoList[i].isActive, infoList[i].freqPci, 3)}" data-clipboard-text="${infoList[i].btsId}">${areacode}</div>
                                <div class="advance-info-content-analysis">${perc}</div>
                                <div class="advance-info-content-bid">${infoList[i].hitTimes != undefined ? infoList[i].hitTimes : 0}</div>
                                <div class="advance-info-content-fieldstrength">${infoList[i].dbm}</div>
                            </div>
                            `;
                        } else {
                            advanceInfoHtmlCdma = advanceInfoHtmlCdma + `
                            <div class="advance-info-content-even">
                                <div class="advance-info-content-active">${isActive(infoList[i].isActive, infoList[i].freqPci, 1)}</div>
                                <div class="advance-info-content-bts" style="${isActive(infoList[i].isActive, infoList[i].freqPci, 2)}">${infoList[i].freqPci}</div>
                                <div class="advance-info-content-locationcode clipboard"  active-status="${isActive(infoList[i].isActive, infoList[i].freqPci, 3)}" data-clipboard-text="${infoList[i].btsId}">${areacode}</div>
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
                                <div class="advance-info-content-active">${isActive(infoList[i].isActive, infoList[i].freqPci, 1)}</div>
                                <div class="advance-info-content-bts" style="${isActive(infoList[i].isActive, infoList[i].freqPci, 2)}">${infoList[i].freqPci}</div>
                                <div class="advance-info-content-locationcode clipboard"  active-status="${isActive(infoList[i].isActive, infoList[i].freqPci, 3)}" data-clipboard-text="${infoList[i].btsId}">${areacode}</div>
                                <div class="advance-info-content-analysis">${perc}</div>
                                <div class="advance-info-content-bid">${infoList[i].hitTimes != undefined ? infoList[i].hitTimes : 0}</div>
                                <div class="advance-info-content-fieldstrength">${infoList[i].dbm}</div>
                            </div>
                            `;
                        } else {
                            advanceInfoHtmlGsm = advanceInfoHtmlGsm + `
                            <div class="advance-info-content-even">
                                <div class="advance-info-content-active">${isActive(infoList[i].isActive, infoList[i].freqPci, 1)}</div>
                                <div class="advance-info-content-bts" style="${isActive(infoList[i].isActive, infoList[i].freqPci, 2)}">${infoList[i].freqPci}</div>
                                <div class="advance-info-content-locationcode clipboard"  active-status="${isActive(infoList[i].isActive, infoList[i].freqPci, 3)}" data-clipboard-text="${infoList[i].btsId}">${areacode}</div>
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
                }
                $(`.channel-info-table-tbody-${dev}`).html(channelInfoHtml);
                $(`.advance-info-content-container-${dev}-lte`).html(advanceInfoHtmlLte);
                $(`.advance-info-content-container-${dev}-wcdma`).html(advanceInfoHtmlWcdma);
                $(`.advance-info-content-container-${dev}-cdma`).html(advanceInfoHtmlCdma);
                $(`.advance-info-content-container-${dev}-gsm`).html(advanceInfoHtmlGsm);
            }
            analysisInfoMapEach.set(dev, analysisInfoMapNow);
            if (devStateInfoMap[dev].reportTime != "" && devStateInfoMap[dev].reportTime != undefined && devStateInfoMap[dev].reportTime != null) {
                $(`.advance-info-time-${dev}`).html(new Date(devStateInfoMap[dev].reportTime).Format('hh:mm:ss'));
            }
        }

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
            if (devStateInfoMap != null) {
                for (let key in devStateInfoMap) {
                    if (devDrawInfoMap.get(key).devType == 1 && devStateInfoMap[key] != null) {
                        let triggerInfoValue = devStateInfoMap[key].triggerInfo;
                        if (triggerInfoValue != null) {
                            $('.sms-info-icon').css('background', `url(img/icon/sms_${triggerInfoValue.triggerStatus}.png)`);
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
                DrawMultiBtsAnalysis.drawAnalysis(devStateInfoMap);
            }
        }
    }
    static drawBtsList(devBtsInfos) {
        if (devBtsInfos.length > 0) {
            for (let i = 0; i < devBtsInfos.length; i++) {
                let btsId = devBtsInfos[i].btsId;
                let btsInfo = devBtsInfos[i].btsInfo;
                let display = "display:none";
                if (btsId != undefined&&btsId.split("-")[1]!=undefined) {
                    if (btsListMap.get(btsId) == null) {
                        let html = ``;
                        if (btsInfo.lat != "" && btsInfo.lat != null) {
                            display = "";
                        }
                        if (btsListCon % 2 == 0) {
                            html = `<div class="advance-info-content-odd">
                                <div class="advance-info-content-list-active advance-info-content-list-active-${btsId}" style="display:none;margin: -2px 0px 0px 6px;"><span style="background: url('img/iconpic/CR-active.png') no-repeat;background-size: 100% 100%;
                                width: 34px;height: 18px;margin: 8px auto;display: block;"></span></div>
                                <div class="advance-info-list-content-btsId advance-info-list-content-btsId-${btsId} clipboard" data-clipboard-text="${btsId}">${btsInfo.lacTac}-${btsInfo.cellId}</div>
                                <div class="advance-info-list-content-GPS"><img class="advance-info-list-content-GPS-img" data-clipboard-text="${btsId}" style="${display}" src="img/icon/gps.png"></div>
                                <div class="advance-info-list-content-time">${!!btsInfo.reportTime?new Date(btsInfo.reportTime).Format('hh:mm:ss'):""}</div>
                            </div>`;
                        } else {
                            html = `<div class="advance-info-content-even">
                                <div class="advance-info-content-list-active advance-info-content-list-active-${btsId}" style="display:none;margin: -2px 0px 0px 6px;"><span style="background: url('img/iconpic/CR-active.png') no-repeat;background-size: 100% 100%;
                                width: 34px;height: 18px;margin: 8px auto;display: block;"></span></div>
                                <div class="advance-info-list-content-btsId advance-info-list-content-btsId-${btsId} clipboard" data-clipboard-text="${btsId}">${btsInfo.lacTac}-${btsInfo.cellId}</div>
                                <div class="advance-info-list-content-GPS"><img class="advance-info-list-content-GPS-img" data-clipboard-text="${btsId}" style="${display}" src="img/icon/gps.png"></div>
                                <div class="advance-info-list-content-time">${!!btsInfo.reportTime?new Date(btsInfo.reportTime).Format('hh:mm:ss'):""}</div>
                            </div>`;
                        }
                        $('.advance-info-list-content-container').prepend(html);
                        $('.advance-info-list-content-lastTime').html(`${!!btsInfo.reportTime?new Date(btsInfo.reportTime).Format('hh:mm:ss'):""}`);
                        btsListCon = btsListCon + 1;
                        btsListMap.set(btsId, btsInfo);
                    }
                }
            }
        }
    }

}

/*是否为主动式基站*/
function isActive(activeStatus, data, type) {
    let result = "";
    if (activeStatus == 1) {
        if (type == 1) {
            result = `
				<span style="background: url('img/iconpic/CR-active.png') no-repeat;background-size: 100% 100%;
				width: 34px;height: 18px;margin: 8px auto;display: block;"></span>
				`;
        } else if (type == 2) {
            result = "color:#F63232;font-weight:1000;";
        } else {
            result = "true";
        }
    } else {
        if (btsActiveCache != undefined && btsActiveCache != null) {
            for (let i = 0; i < btsActiveCache.length; i++) {
                if (btsActiveCache[i].status == 2 && (btsActiveCache[i].freq + "-" + btsActiveCache[i].pci) == data) {
                    if (type == 1) {
                        result = `
							<span style="background: url('img/iconpic/CR-active.png') no-repeat;background-size: 100% 100%;
							width: 34px;height: 18px;margin: 8px auto;display: block;"></span>
							`;
                    } else if (type == 2) {
                        result = "color:#F63232;font-weight:1000;";
                    } else {
                        result = "true";
                    }
                    break;
                }
            }
        }
    }
    return result;
}