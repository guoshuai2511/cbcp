import { MultiBtsAnalysisOverlayConstructor } from '../overlay/MultiBtsAnalysisOverlayConstructor.js';

export class DrawMultiBtsAnalysis {

    static drawAnalysis(drawMap) {

        /* 先移除所有地图上解析进度*/
        for (let i = 0; i < btsAnalysisOverlayCache.length; i++) {
            map.removeOverlay(btsAnalysisOverlayCache[i]);
        }
        /* 移除子基站解析进度 */
        $('.multi-sub-bts').each(function(){
            if($(this).children().hasClass('mutil-sub-bts-analysis-img')){
                $(this).children('.mutil-sub-bts-analysis-img').remove();
            }
        })
        /* add by sunbing start */
        /** 复合基站解析权值重置 */
        for (let key of multiBtsInfoMap.keys()) {
            let multiBtsInfo = multiBtsInfoMap.get(key);
            if(multiBtsInfo.type == 2) {
                multiBtsInfo.analysisSrc = 0;
                multiBtsInfo.analysisValue = 0;
            }
        }
        /* add by sunbing end */
        /* 置灰所有基站（排除红色和黄色基站）*/
        $('.bts-img-unhit').not('.proLock').addClass('gray-cover'); // 所有基站置灰
        $('.bts-click-unhit').css('z-index', 5000); // z轴置底
        btsAnalysisOverlayCache = [];
        for (let key in drawMap) {
            /* 是否置灰*/
            let isGray;
            if (devDrawInfoMap.get(key) != null) {
                isGray = devDrawInfoMap.get(key).isCorrentView;
            } else {
                isGray = false;
            }
            /* 信息列表*/
            let infoList = drawMap[key].cellAnalysisInfoList;
            /* */
            if (infoList != null) {
                for (let i = 0; i < infoList.length; i++) {
                    let btsInfo = btsInfoMap.get(infoList[i].btsId);
                    if(btsInfo != null) {
                        let multiBtsInfo = multiBtsInfoMap.get(infoList[i].btsId);
                        let broadcastPercent = infoList[i].broadcastPercent;
                        let mode = infoList[i].mode;
                        let dedicatedPercent;
                        /* C网和W网只有一个，其余两个*/
                        if (mode != 'cdma' && mode != 'wcdma') {
                            dedicatedPercent = infoList[i].dedicatedPercent;
                        }
                        if (multiBtsInfo != null && multiBtsInfo.type == 1) {
                            //单个基站
                            let lng = multiBtsInfo.lng;
                            let lat = multiBtsInfo.lat;
                            /* 如果命中次数==0，图片替换为蓝色，不替换目标基站的颜色*/
                            if (targetCellInfosCache.get(infoList[i].btsId) == null) {
                                if (multiBtsInfo.hitTimes == 0 || multiBtsInfo.hitTimes == null) {
                                    $(`.bts-img-${infoList[i].btsId}`).removeClass('gray-cover'); // 去除灰色滤镜
                                    $(`.bts-click-${infoList[i].btsId}`).css('z-index', 5500); // z轴置中
                                    btsInfo.color = 1;
                                    multiBtsInfo.color = 1;
                                }
                            }
                            let overlay = new MultiBtsAnalysisOverlayConstructor(new BMap.Point(lng, lat), broadcastPercent, dedicatedPercent, isGray);
                            btsAnalysisOverlayCache.push(overlay);
                            map.addOverlay(overlay);
                            if (!isBtsOpen) {
                                overlay.hide();
                            }
                        }else {
                             /* 子基站状态 */
                             /* 如果命中次数==0，图片替换为蓝色，不替换目标基站的颜色*/
                             let subBtsColor = 0;
                             if (targetCellInfosCache.get(infoList[i].btsId) == null) {
                                if (btsInfo.hitTimes == 0 || btsInfo.hitTimes == null) {
                                    $(`.bts-img-${infoList[i].btsId}`).removeClass('gray-cover'); // 去除灰色滤镜
                                    //$(`.bts-click-${infoList[i].btsId}`).css('z-index', 5500); // z轴置中
                                    subBtsColor = 1;
                                    btsInfo.color = 1;
                                }
                            }
                            //复合基站下属子基站解析进度条
                            if($(`.multi-sub-bts-click-${infoList[i].btsId}`).parent().parent().attr('data-open-status') == 'open') {
                                let overlay = this.getMultiSubBtsAnalysisOverlay(broadcastPercent, dedicatedPercent, isGray);
                                $(`.multi-sub-bts-click-${infoList[i].btsId}`).children('.mutil-sub-bts-analysis-img').remove();
                                $(`.multi-sub-bts-click-${infoList[i].btsId}`).append(overlay);
                            }
                            /* 父基站状态 */
                            let color = multiBtsInfoMap.get(btsInfo.parentBtsId).color;
                            if(color <= subBtsColor) {
                                $(`.multi-bts-img-${btsInfo.parentBtsId}`).removeClass('gray-cover'); // 去除灰色滤镜
                                multiBtsInfoMap.get(btsInfo.parentBtsId).color = subBtsColor;
                            }
                            /* add by sunbing start */
                            /**复合基站下面添加解析进度条 */
                            //优先级：命中基站、预锁基站、解析最好的基站 (默认基站：0 预锁基站：1 命中基站：2 )
                            let showFlag = false;
                            let analysisSrc = 0;
                            devPreLockCellInfosCache.get(infoList[i].btsId);
                            if(null != devPreLockCellInfosCache.get(infoList[i].btsId)) {
                                //预锁基站
                                analysisSrc = 1;
                            }
                            if(null != btsInfo.hitTimes && btsInfo.hitTimes > 0) {
                                //命中基站
                                analysisSrc = 2;
                            }
                            let analysisValue = broadcastPercent + dedicatedPercent;
                            let parentBtsInfo = multiBtsInfoMap.get(btsInfo.parentBtsId);
                            let currentAnalysisValue = parentBtsInfo.analysisValue;
                            let currentAnalysisSrc = parentBtsInfo.analysisSrc;
                            if(analysisSrc > currentAnalysisSrc) {
                                showFlag = true;
                                parentBtsInfo.analysisSrc = analysisSrc;
                            } else if(analysisSrc == currentAnalysisSrc) {
                                if(analysisValue >= currentAnalysisValue) {
                                    showFlag = true;
                                    parentBtsInfo.analysisValue = analysisValue;
                                }
                            }
                            if(showFlag) {
                                let lng = parentBtsInfo.lng;
                                let lat = parentBtsInfo.lat;
                                let overlay = new MultiBtsAnalysisOverlayConstructor(new BMap.Point(lng, lat), broadcastPercent, dedicatedPercent, isGray);
                                btsAnalysisOverlayCache.push(overlay);
                                map.addOverlay(overlay);
                                if (!isBtsOpen) {
                                    overlay.hide();
                                }
                            }
                            /* add by sunbing end */
                        }
                    }
                }
            }
        }
    }

    static getMultiSubBtsAnalysisOverlay(broadcastPercent, dedicatedPercent, isGray) {
        let grayClass = '';
        if (!isGray) {
            grayClass = 'gray-cover';
        }
        /* C网和W网只有一个，其余两个*/
        let imgName;
        if (dedicatedPercent == null) {
            let perc1 = parseInt(broadcastPercent / 10);
            if (perc1 % 2 != 0) {
                perc1 = perc1 - 1;
            }
            imgName = `crc1-${perc1}.png`;
        } else {
            let perc1 = parseInt(broadcastPercent / 10);
            let perc2 = parseInt(dedicatedPercent / 10);
            if (perc1 % 2 != 0) {
                perc1 = perc1 - 1;
            }
            if (perc2 % 2 != 0) {
                perc2 = perc2 - 1;
            }
            imgName = `crc2_${perc1}-${perc2}.png`;
        }
        let htmlValue = '';
        htmlValue = `
            <img class="mutil-sub-bts-analysis-img ${grayClass}" src="img/crc/${imgName}">
        `;
        return htmlValue;
    }
}