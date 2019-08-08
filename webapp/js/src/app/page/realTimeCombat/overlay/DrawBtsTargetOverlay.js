import { BtsTargetOverlayConstructor } from '../overlay/BtsTargetOverlayConstructor.js';

export class DrawBtsTargetOverlay {

    static drawBts(btsInfo) {
        let btsId = btsInfo.btsId;
        let baiduPoint = new BMap.Point(btsInfo.lng, btsInfo.lat); // 百度地图坐标 
        /* 绘制基站 */
        let cover = new BtsTargetOverlayConstructor(baiduPoint, btsInfo.btsId, btsInfo.mode, btsInfo.radius, btsInfo.credibility);
        map.addOverlay(cover);
        /* 是否显示基站 */
        //if (isBtsOpen && map.getBounds().containsPoint(baiduPoint)) {
        if (isBtsOpen) {
            cover.show();
        } else {
            cover.hide();
        }
        $('.bts-value-' + btsId).css('display', 'none');

        let btsDiv = function () {
            this.btsCover;
            this.btsRadius;
        }
        btsDiv.btsCover = cover;
        // btsDiv.btsRadius = btsRangeCircle;
        btsDivMap.set(btsId, btsDiv);
    }

}