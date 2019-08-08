import { GPSToBaiduPoint } from '../../../common/baiduMap/GPSToBaiduPoint.BaiduMap.js';

import { DrawBtsOverlay } from '../../realTimeCombat/overlay/DrawBtsOverlay.js';
import { ParsingDevInfo } from '../../realTimeCombat/parsing/ParsingDevInfo.js';
import { DrawBtsEcharts } from '../../realTimeCombat/overlay/DrawBtsEcharts.js';
import { DrawMultiBtsEcharts } from '../../realTimeCombat/overlay/DrawMultiBtsEcharts.js';

export class ParsingDevInfoCR {

    static parsingDevInfo(devBaseInfo, isPlayEngAudio) {
        let hitedBts = { btsId: null, dev: [] };
        /* 基站命中次数*/
        /**edti by gaochao start */
        // if (devBaseInfo.engInfo != null && devBaseInfo.engInfo.btsId != '0-0-0-0') {
        if (devBaseInfo.engInfo != null && devBaseInfo.engInfo.btsId != '0-0-0-0' && devBaseInfo.engInfo.isShow == 1) {
            /**edit by gaochao end */
            if (multiBtsInfoMap.get(devBaseInfo.engInfo.btsId) != null && multiBtsInfoMap.get(devBaseInfo.engInfo.btsId).type == 1) {
                if (btsInfoMap.get(devBaseInfo.engInfo.btsId).hitTimes == null) {
                    btsInfoMap.get(devBaseInfo.engInfo.btsId).hitTimes = 0;
                }
                btsInfoMap.get(devBaseInfo.engInfo.btsId).hitTimes = btsInfoMap.get(devBaseInfo.engInfo.btsId).hitTimes + 1; // 更新map中的命中次数
                $(`.bts-img-${devBaseInfo.engInfo.btsId}`).removeClass('bts-img-unhit'); // 去除未命中标记
                $(`.bts-click-${devBaseInfo.engInfo.btsId}`).removeClass('bts-click-unhit'); // 去除未命中标记
                $(`.bts-img-${devBaseInfo.engInfo.btsId}`).removeClass('gray-cover'); // 去除灰色滤镜
                $(`.bts-click-${devBaseInfo.engInfo.btsId}`).css('z-index', 6000); // z轴置顶
                if (targetCellInfosCache.get(devBaseInfo.engInfo.btsId) == null) {
                    $(`.bts-img-${devBaseInfo.engInfo.btsId}`).attr('src', `img/btsicon/btsiconhit-${btsInfoMap.get(devBaseInfo.engInfo.btsId).mode}.png`);
                    /**add by gaochao start */
                    if (eval(`btsHitTimer['${devBaseInfo.engInfo.btsId}'] == null`)) {
                        btsHitTimer[`${devBaseInfo.engInfo.btsId}`] = window.setInterval(function () {
                            if ((replayCurrentTime - btsInfoMap.get(devBaseInfo.engInfo.btsId).reportTime) > 360000) {
                                $(`.bts-img-${devBaseInfo.engInfo.btsId}`).attr('src', `img/btsicon/btslasthit-${btsInfoMap.get(devBaseInfo.engInfo.btsId).mode}.png`);
                            }
                        }, 10000);
                    }
                    else {
                        clearInterval(btsHitTimer[`${devBaseInfo.engInfo.btsId}`]);
                        btsHitTimer[`${devBaseInfo.engInfo.btsId}`] = window.setInterval(function () {
                            if ((replayCurrentTime - btsInfoMap.get(devBaseInfo.engInfo.btsId).reportTime) > 360000) {
                                $(`.bts-img-${devBaseInfo.engInfo.btsId}`).attr('src', `img/btsicon/btslasthit-${btsInfoMap.get(devBaseInfo.engInfo.btsId).mode}.png`);
                            }
                        }, 10000);

                    }
                    /**add by gaochao end*/
                }
                // $(`.bts-hit-count-${devBaseInfo.engInfo.btsId}`).html(btsInfoMap.get(devBaseInfo.engInfo.btsId).hitTimes);
                $(`.bts-hit-count-${devBaseInfo.engInfo.btsId}`).html((btsInfoMap.get(devBaseInfo.engInfo.btsId).dlHitTimes == undefined || btsInfoMap.get(devBaseInfo.engInfo.btsId).dlHitTimes == null) ? btsInfoMap.get(devBaseInfo.engInfo.btsId).hitTimes + "/0" : btsInfoMap.get(devBaseInfo.engInfo.btsId).hitTimes + "/" + btsInfoMap.get(devBaseInfo.engInfo.btsId).dlHitTimes);
                /**add by gaochao start */
                if (btsInfoMap.get(devBaseInfo.engInfo.btsId).hitTimes != 0) {
                    $(`.bts-hit-count-shadow-${devBaseInfo.engInfo.btsId}`).css('display', 'block');
                }
                /**add by gaochao end*/
                if (hitedBtsCache.btsId != devBaseInfo.engInfo.btsId) {
                    hitedBts.btsId = devBaseInfo.engInfo.btsId;
                    hitedBts.dev.push(devBaseInfo.devCode);
                    hitedBtsCache = hitedBts;
                }
            } else if (multiBtsInfoMap.get(devBaseInfo.engInfo.btsId) != null && multiBtsInfoMap.get(devBaseInfo.engInfo.btsId).type == 2) {
                if (btsInfoMap.get(devBaseInfo.engInfo.btsId).hitTimes == null) {
                    btsInfoMap.get(devBaseInfo.engInfo.btsId).hitTimes = 0;
                }
                btsInfoMap.get(devBaseInfo.engInfo.btsId).hitTimes = btsInfoMap.get(devBaseInfo.engInfo.btsId).hitTimes + 1; // 更新map中的命中次数
                //复合基站
                $(`.multi-bts-img-${devBaseInfo.engInfo.btsId}`).removeClass('bts-img-unhit'); // 去除未命中标记
                $(`.multi-bts-click-${devBaseInfo.engInfo.btsId}`).removeClass('bts-click-unhit'); // 去除未命中标记
                $(`.multi-bts-img-${devBaseInfo.engInfo.btsId}`).removeClass('gray-cover'); // 去除灰色滤镜
                $(`.multi-bts-click-${devBaseInfo.engInfo.btsId}`).css('z-index', 6000); // z轴置顶
                // $(`.multi-bts-hit-count-${key}`).html(btsHitInfo.hitTimes+"/"+btsHitInfo.dlHitTimes);
                $(`.multi-bts-img-${devBaseInfo.engInfo.btsId}`).attr('src', `img/multibtsicon/btsiconhit-${btsInfoMap.get(devBaseInfo.engInfo.btsId).mode}.png`);
                //子图标添加样式
                $(`.bts-img-${devBaseInfo.engInfo.btsId}`).removeClass('bts-img-unhit'); // 去除未命中标记
                $(`.multi-sub-bts-click-${devBaseInfo.engInfo.btsId}`).removeClass('bts-click-unhit'); // 去除未命中标记
                $(`.bts-img-${devBaseInfo.engInfo.btsId}`).removeClass('gray-cover'); // 去除灰色滤镜
                $(`.multi-sub-bts-click-${devBaseInfo.engInfo.btsId}`).css('z-index', 6000); // z轴置顶
                $(`.multi-sub-bts-hit-count-${devBaseInfo.engInfo.btsId}`).html((btsInfoMap.get(devBaseInfo.engInfo.btsId).dlHitTimes == undefined || btsInfoMap.get(devBaseInfo.engInfo.btsId).dlHitTimes == null) ? btsInfoMap.get(devBaseInfo.engInfo.btsId).hitTimes + "/0" : btsInfoMap.get(devBaseInfo.engInfo.btsId).hitTimes + "/" + btsInfoMap.get(devBaseInfo.engInfo.btsId).dlHitTimes);
                $(`.multi-sub-bts-hit-count-shadow-${devBaseInfo.engInfo.btsId}`).css('display', 'block');
                $(`.bts-img-${devBaseInfo.engInfo.btsId}`).attr('src', `img/btsicon/btsiconhit-${btsInfoMap.get(devBaseInfo.engInfo.btsId).mode}.png`);
                /**add by gaochao end*/
                if (hitedBtsCache.btsId != devBaseInfo.engInfo.btsId) {
                    hitedBts.btsId = devBaseInfo.engInfo.btsId;
                    hitedBts.dev.push(devBaseInfo.devCode);
                    hitedBtsCache = hitedBts;
                }
            } else if (multiBtsInfoMap.get(devBaseInfo.engInfo.btsId) == null && btsInfoMap.get(devBaseInfo.engInfo.btsId) != undefined) {
                if (btsInfoMap.get(devBaseInfo.engInfo.btsId).hitTimes == null) {
                    btsInfoMap.get(devBaseInfo.engInfo.btsId).hitTimes = 0;
                }
                btsInfoMap.get(devBaseInfo.engInfo.btsId).hitTimes = btsInfoMap.get(devBaseInfo.engInfo.btsId).hitTimes + 1; // 更新map中的命中次数
                let parentBtsId = btsInfoMap.get(devBaseInfo.engInfo.btsId).parentBtsId;
                $(`.multi-bts-img-${parentBtsId}`).removeClass('bts-img-unhit'); // 去除未命中标记
                $(`.multi-bts-click-${parentBtsId}`).removeClass('bts-click-unhit'); // 去除未命中标记
                $(`.multi-bts-img-${parentBtsId}`).removeClass('gray-cover'); // 去除灰色滤镜
                $(`.multi-bts-click-${parentBtsId}`).css('z-index', 6000); // z轴置顶
                // $(`.multi-bts-hit-count-${parentBtsId}`).html(btsHitInfo.hitTimes+"/"+btsHitInfo.dlHitTimes);
                $(`.multi-bts-img-${parentBtsId}`).attr('src', `img/multibtsicon/btsiconhit-${btsInfoMap.get(devBaseInfo.engInfo.btsId).mode}.png`);
                //子图标添加样式
                $(`.bts-img-${devBaseInfo.engInfo.btsId}`).removeClass('bts-img-unhit'); // 去除未命中标记
                $(`.multi-sub-bts-click-${devBaseInfo.engInfo.btsId}`).removeClass('bts-click-unhit'); // 去除未命中标记
                $(`.bts-img-${devBaseInfo.engInfo.btsId}`).removeClass('gray-cover'); // 去除灰色滤镜
                $(`.multi-sub-bts-click-${devBaseInfo.engInfo.btsId}`).css('z-index', 6000); // z轴置顶
                $(`.multi-sub-bts-hit-count-${devBaseInfo.engInfo.btsId}`).html((btsInfoMap.get(devBaseInfo.engInfo.btsId).dlHitTimes == undefined || btsInfoMap.get(devBaseInfo.engInfo.btsId).dlHitTimes == null) ? btsInfoMap.get(devBaseInfo.engInfo.btsId).hitTimes + "/0" : btsInfoMap.get(devBaseInfo.engInfo.btsId).hitTimes + "/" + btsInfoMap.get(devBaseInfo.engInfo.btsId).dlHitTimes);
                $(`.multi-sub-bts-hit-count-shadow-${devBaseInfo.engInfo.btsId}`).css('display', 'block');
                $(`.bts-img-${devBaseInfo.engInfo.btsId}`).attr('src', `img/btsicon/btsiconhit-${btsInfoMap.get(devBaseInfo.engInfo.btsId).mode}.png`);
                /**add by gaochao end*/
                if (hitedBtsCache.btsId != devBaseInfo.engInfo.btsId) {
                    hitedBts.btsId = devBaseInfo.engInfo.btsId;
                    hitedBts.dev.push(devBaseInfo.devCode);
                    hitedBtsCache = hitedBts;
                }
            }

        }
        /**add by gaochao start */
        if (devBaseInfo.dlBtsId != undefined && devBaseInfo.dlBtsId != '0-0-0-0' && devBaseInfo.dlBtsId != '') {
            if (multiBtsInfoMap.get(devBaseInfo.dlBtsId) != null && multiBtsInfoMap.get(devBaseInfo.dlBtsId).type == 1) {
                if (btsInfoMap.get(devBaseInfo.dlBtsId).dlHitTimes == null) {
                    btsInfoMap.get(devBaseInfo.dlBtsId).dlHitTimes = 0;
                }
                btsInfoMap.get(devBaseInfo.dlBtsId).dlHitTimes = btsInfoMap.get(devBaseInfo.dlBtsId).dlHitTimes + 1; // 更新map中的命中次数
                $(`.bts-img-${devBaseInfo.dlBtsId}`).removeClass('bts-img-unhit'); // 去除未命中标记
                $(`.bts-click-${devBaseInfo.dlBtsId}`).removeClass('bts-click-unhit'); // 去除未命中标记
                $(`.bts-img-${devBaseInfo.dlBtsId}`).removeClass('gray-cover'); // 去除灰色滤镜
                $(`.bts-click-${devBaseInfo.dlBtsId}`).css('z-index', 6000); // z轴置顶
                if (targetCellInfosCache.get(devBaseInfo.dlBtsId) == null) {
                    $(`.bts-img-${devBaseInfo.dlBtsId}`).attr('src', `img/btsicon/btsiconhit-${btsInfoMap.get(devBaseInfo.dlBtsId).mode}.png`);
                    /**add by gaochao start */
                    if (eval(`btsHitTimer['${devBaseInfo.dlBtsId}'] == null`)) {
                        btsHitTimer[`${devBaseInfo.dlBtsId}`] = window.setInterval(function () {
                            if ((replayCurrentTime - btsInfoMap.get(devBaseInfo.dlBtsId).reportTime) > 360000) {
                                $(`.bts-img-${devBaseInfo.dlBtsId}`).attr('src', `img/btsicon/btslasthit-${btsInfoMap.get(devBaseInfo.dlBtsId).mode}.png`);
                            }
                        }, 10000);
                    }
                    else {
                        clearInterval(btsHitTimer[`${devBaseInfo.dlBtsId}`]);
                        btsHitTimer[`${devBaseInfo.dlBtsId}`] = window.setInterval(function () {
                            if ((replayCurrentTime - btsInfoMap.get(devBaseInfo.dlBtsId).reportTime) > 360000) {
                                $(`.bts-img-${devBaseInfo.dlBtsId}`).attr('src', `img/btsicon/btslasthit-${btsInfoMap.get(devBaseInfo.dlBtsId).mode}.png`);
                            }
                        }, 10000);

                    }
                    /**add by gaochao end*/
                }
                // $(`.bts-hit-count-${devBaseInfo.dlBtsId}`).html(btsInfoMap.get(devBaseInfo.dlBtsId).dlHitTimes);
                $(`.bts-hit-count-${devBaseInfo.dlBtsId}`).html((btsInfoMap.get(devBaseInfo.dlBtsId).hitTimes == undefined || btsInfoMap.get(devBaseInfo.dlBtsId).hitTimes == null) ? "/0" + btsInfoMap.get(devBaseInfo.dlBtsId).dlHitTimes : btsInfoMap.get(devBaseInfo.dlBtsId).hitTimes + "/" + btsInfoMap.get(devBaseInfo.dlBtsId).dlHitTimes);

                /**add by gaochao start */
                if (btsInfoMap.get(devBaseInfo.dlBtsId).dlHitTimes != 0) {
                    $(`.bts-hit-count-shadow-${devBaseInfo.dlBtsId}`).css('display', 'block');
                }
                /**add by gaochao end*/
                if (hitedBtsCache.btsId != devBaseInfo.dlBtsId) {
                    hitedBts.btsId = devBaseInfo.dlBtsId;
                    hitedBts.dev.push(devBaseInfo.devCode);
                    hitedBtsCache = hitedBts;
                }
            } else if (multiBtsInfoMap.get(devBaseInfo.dlBtsId) != null && multiBtsInfoMap.get(devBaseInfo.dlBtsId).type == 2) {
                if (btsInfoMap.get(devBaseInfo.dlBtsId).dlHitTimes == null) {
                    btsInfoMap.get(devBaseInfo.dlBtsId).dlHitTimes = 0;
                }
                btsInfoMap.get(devBaseInfo.dlBtsId).dlHitTimes = btsInfoMap.get(devBaseInfo.dlBtsId).dlHitTimes + 1; // 更新map中的命中次数
                //复合基站
                $(`.multi-bts-img-${devBaseInfo.dlBtsId}`).removeClass('bts-img-unhit'); // 去除未命中标记
                $(`.multi-bts-click-${devBaseInfo.dlBtsId}`).removeClass('bts-click-unhit'); // 去除未命中标记
                $(`.multi-bts-img-${devBaseInfo.dlBtsId}`).removeClass('gray-cover'); // 去除灰色滤镜
                $(`.multi-bts-click-${devBaseInfo.dlBtsId}`).css('z-index', 6000); // z轴置顶
                // $(`.multi-bts-hit-count-${key}`).html(btsHitInfo.hitTimes+"/"+btsHitInfo.dlHitTimes);
                $(`.multi-bts-img-${devBaseInfo.dlBtsId}`).attr('src', `img/multibtsicon/btsiconhit-${btsInfoMap.get(devBaseInfo.dlBtsId).mode}.png`);
                //子图标添加样式
                $(`.bts-img-${devBaseInfo.dlBtsId}`).removeClass('bts-img-unhit'); // 去除未命中标记
                $(`.multi-sub-bts-click-${devBaseInfo.dlBtsId}`).removeClass('bts-click-unhit'); // 去除未命中标记
                $(`.bts-img-${devBaseInfo.dlBtsId}`).removeClass('gray-cover'); // 去除灰色滤镜
                $(`.multi-sub-bts-click-${devBaseInfo.dlBtsId}`).css('z-index', 6000); // z轴置顶
                $(`.multi-sub-bts-hit-count-${devBaseInfo.dlBtsId}`).html((btsInfoMap.get(devBaseInfo.dlBtsId).hitTimes == undefined || btsInfoMap.get(devBaseInfo.dlBtsId).hitTimes == null) ? "/0" + btsInfoMap.get(devBaseInfo.dlBtsId).dlHitTimes : btsInfoMap.get(devBaseInfo.dlBtsId).hitTimes + "/" + btsInfoMap.get(devBaseInfo.dlBtsId).dlHitTimes);
                $(`.multi-sub-bts-hit-count-shadow-${devBaseInfo.dlBtsId}`).css('display', 'block');
                $(`.bts-img-${devBaseInfo.dlBtsId}`).attr('src', `img/btsicon/btsiconhit-${btsInfoMap.get(devBaseInfo.dlBtsId).mode}.png`);
                if (hitedBtsCache.btsId != devBaseInfo.dlBtsId) {
                    hitedBts.btsId = devBaseInfo.dlBtsId;
                    hitedBts.dev.push(devBaseInfo.devCode);
                    hitedBtsCache = hitedBts;
                }
            } else if (multiBtsInfoMap.get(devBaseInfo.dlBtsId) == null && btsInfoMap.get(devBaseInfo.dlBtsId) != undefined) {
                if (btsInfoMap.get(devBaseInfo.dlBtsId).dlHitTimes == null) {
                    btsInfoMap.get(devBaseInfo.dlBtsId).dlHitTimes = 0;
                }
                btsInfoMap.get(devBaseInfo.dlBtsId).dlHitTimes = btsInfoMap.get(devBaseInfo.dlBtsId).dlHitTimes + 1; // 更新map中的命中次数
                let parentBtsId = btsInfoMap.get(devBaseInfo.dlBtsId).parentBtsId;
                $(`.multi-bts-img-${parentBtsId}`).removeClass('bts-img-unhit'); // 去除未命中标记
                $(`.multi-bts-click-${parentBtsId}`).removeClass('bts-click-unhit'); // 去除未命中标记
                $(`.multi-bts-img-${parentBtsId}`).removeClass('gray-cover'); // 去除灰色滤镜
                $(`.multi-bts-click-${parentBtsId}`).css('z-index', 6000); // z轴置顶
                // $(`.multi-bts-hit-count-${parentBtsId}`).html(btsHitInfo.hitTimes+"/"+btsHitInfo.dlHitTimes);
                $(`.multi-bts-img-${parentBtsId}`).attr('src', `img/multibtsicon/btsiconhit-${btsInfoMap.get(devBaseInfo.dlBtsId).mode}.png`);
                //子图标添加样式
                $(`.bts-img-${devBaseInfo.dlBtsId}`).removeClass('bts-img-unhit'); // 去除未命中标记
                $(`.multi-sub-bts-click-${devBaseInfo.dlBtsId}`).removeClass('bts-click-unhit'); // 去除未命中标记
                $(`.bts-img-${devBaseInfo.dlBtsId}`).removeClass('gray-cover'); // 去除灰色滤镜
                $(`.multi-sub-bts-click-${devBaseInfo.dlBtsId}`).css('z-index', 6000); // z轴置顶
                $(`.multi-sub-bts-hit-count-${devBaseInfo.dlBtsId}`).html((btsInfoMap.get(devBaseInfo.dlBtsId).hitTimes == undefined || btsInfoMap.get(devBaseInfo.dlBtsId).hitTimes == null) ? "/0" + btsInfoMap.get(devBaseInfo.dlBtsId).dlHitTimes : btsInfoMap.get(devBaseInfo.dlBtsId).hitTimes + "/" + btsInfoMap.get(devBaseInfo.dlBtsId).dlHitTimes);
                $(`.multi-sub-bts-hit-count-shadow-${devBaseInfo.dlBtsId}`).css('display', 'block');
                $(`.bts-img-${devBaseInfo.dlBtsId}`).attr('src', `img/btsicon/btsiconhit-${btsInfoMap.get(devBaseInfo.dlBtsId).mode}.png`);
                if (hitedBtsCache.btsId != devBaseInfo.dlBtsId) {
                    hitedBts.btsId = devBaseInfo.dlBtsId;
                    hitedBts.dev.push(devBaseInfo.devCode);
                    hitedBtsCache = hitedBts;
                }
            }
        }
        /**add by gaochao end*/

        /**edit by sunbing start*/
        if (hitedBts.btsId != null && hitedBts.btsId != "" && isBtsOpen) {
            /**edit by sunbing end*/
            DrawMultiBtsEcharts.showBtsStyleCSS(hitedBts);
        }
        /* 调用实时作战方法*/
        ParsingDevInfo.parsingDevInfo([devBaseInfo], isPlayEngAudio);
    }


}