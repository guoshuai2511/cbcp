import { BtsDivOverlayConstructor } from './BtsDivOverlayConstructor.js';

export class DrawBtsOverlay {

    static drawBts(btsInfo) {
        /* 绘制所有设备 */
        //console.log(btsInfo)
      
        for (let i = 0; i < btsInfo.length; i++) {
            /* 获取基站ID */
            let btsId = btsInfo[i].btsInfo.btsId;
            /* 获取设备坐标 */
            let lng = btsInfo[i].btsInfo.lng; // 114
            let lat = btsInfo[i].btsInfo.lat; // 30
            let baiduPoint = new BMap.Point(lng, lat); // 百度地图坐标 
            /* 绘制基站 */
            /**edti by gaochao start */
            let cover = new BtsDivOverlayConstructor(baiduPoint, btsInfo[i].btsInfo.mcc, btsInfo[i].btsInfo.mnc, btsInfo[i].btsInfo.mode, btsInfo[i].btsInfo.sid, btsInfo[i].btsInfo.nid, btsInfo[i].btsInfo.bid, btsInfo[i].btsInfo.lacTac, btsInfo[i].btsInfo.radius, btsInfo[i].btsInfo.cellId, btsId, btsInfo[i].btsInfo.hitTimes,btsInfo.dlHitTimes,btsInfo[i].btsInfo.credibility);
            /**edit by gaochao end */
            map.addOverlay(cover);
            /* 是否显示基站 */
            if (isBtsOpen) {
                cover.show();
            } else {
                cover.hide();
            }
            /* 存储绘制结果*/
            let btsDiv = function () {
                this.btsCover;
                this.btsRadius;
            }
            btsDiv.btsCover = cover;
            btsDivMap.set(btsId, btsDiv);
            
        }
    }

}