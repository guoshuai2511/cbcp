import { BtsAnalysisOverlayConstructor } from '../overlay/BtsAnalysisOverlayConstructor.js';

export class DrawBtsAnalysis {

    static drawAnalysis(drawMap) {

        /* 先移除所有解析进度*/
        for (let i = 0; i < btsAnalysisOverlayCache.length; i++) {
            map.removeOverlay(btsAnalysisOverlayCache[i]);
        }
        /* 置灰所有基站（排除红色和黄色基站）*/
        $('.bts-img-unhit').addClass('gray-cover'); // 所有基站置灰
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
                    if (btsInfoMap.get(infoList[i].btsId) != null) {
                        let lng = btsInfoMap.get(infoList[i].btsId).lng;
                        let lat = btsInfoMap.get(infoList[i].btsId).lat;
                        let mode = infoList[i].mode;
                        let broadcastPercent = infoList[i].broadcastPercent;
                        let dedicatedPercent;
                        /* C网和W网只有一个，其余两个*/
                        if (mode != 'cdma' && mode != 'wcdma') {
                            dedicatedPercent = infoList[i].dedicatedPercent;
                        }
                        /* 如果命中次数==0，图片替换为蓝色，不替换目标基站的颜色*/
                        if (targetCellInfosCache.get(infoList[i].btsId) == null) {
                            if (btsInfoMap.get(infoList[i].btsId).hitTimes == 0 || btsInfoMap.get(infoList[i].btsId).hitTimes == null) {
                                $(`.bts-img-${infoList[i].btsId}`).removeClass('gray-cover'); // 去除灰色滤镜
                                $(`.bts-click-${infoList[i].btsId}`).css('z-index', 5500); // z轴置中
                            }
                        }
                        let overlay = new BtsAnalysisOverlayConstructor(new BMap.Point(lng, lat), broadcastPercent, dedicatedPercent, isGray);
                        btsAnalysisOverlayCache.push(overlay);
                        map.addOverlay(overlay);
                        if (!isBtsOpen) {
                            overlay.hide();
                        }
                    }
                }
            }
        }
    }

}