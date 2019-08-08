import { GPSToBaiduPoint } from '../../../common/baiduMap/GPSToBaiduPoint.BaiduMap.js';

import { PrasingBtsInfo } from '../../realTimeCombat/parsing/PrasingBtsInfo.js';

import { DrawBtsOverlay } from '../../realTimeCombat/overlay/DrawBtsOverlay.js';
import { DrawBtsAnalysis } from '../../realTimeCombat/overlay/DrawBtsAnalysis.js';
import { ParsingMultiBtsInfo } from '../../realTimeCombat/parsing/ParsingMultiBtsInfo.js';

export class PrasingBtsInfoCR {

    static prasingBtsInfo(btsBaseInfo) {
          /* 只绘制新增的基站*/
          if (btsInfoMap.get(btsBaseInfo.btsId) == null) {
            if (btsBaseInfo.lng != null && btsBaseInfo.lat != null) {
                let point = GPSToBaiduPoint.getBaiduPointLocation([[btsBaseInfo.lng, btsBaseInfo.lat]])[0];
                btsBaseInfo.lng = point.lng;
                btsBaseInfo.lat = point.lat;
                btsBaseInfo.isInfoPanelOpen = false;
                btsBaseInfo.isRadiusOpen = false;
                btsBaseInfo.needDraw = true;
                btsInfoMap.set(btsBaseInfo.btsId, btsBaseInfo);
                DrawBtsOverlay.drawBts([{ btsInfo: btsBaseInfo }]); // 调用实时作战的方法
            }
        }
    }

    static prasingStatusInfo(devStateInfo) {
        let reportTimeCache = devStateInfo.reportTime;
        delete devStateInfo.reportTime;
        devStateInfoMapCache = devStateInfo;
        /* 触发信息*/
        for (let key in devStateInfo) {
            if (devStateInfo[key].triggerInfo != null && devDrawInfoMap.get(key).devType == 1) {
                let triggerInfo = JSON.parse(devStateInfo[key].triggerInfo);
                /**add by gaochao start */
                $('.sms-info-icon').css('background',`url(img/icon/sms_${triggerInfo.triggerStatus}.png)`);
                /**add by gaochao end*/
                $('#sms-send-value').html(triggerInfo.sendTimes);
                $('#sms-finish-value').html(triggerInfo.completeTimes);
                $('#sms-receipt-value').html(triggerInfo.receiptTimes);
            }
        }
        // PrasingBtsInfo.cellAnalysis(devStateInfo);
        ParsingMultiBtsInfo.cellAnalysis(devStateInfo);
        devStateInfo.reportTime = reportTimeCache;
    }

    static showTargetCell() {
        PrasingBtsInfo.showTargetCell();
    }
    static showPreLockCell() {
        ParsingMultiBtsInfo.showPreLockCell();
    }

}