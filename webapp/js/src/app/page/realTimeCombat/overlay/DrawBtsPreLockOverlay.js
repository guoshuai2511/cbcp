import { BtsPreLockOverlayConstructor } from '../overlay/BtsPreLockOverlayConstructor.js';

export class DrawBtsPreLockOverlay {

    static drawBts(btsInfo) {
        let btsId = btsInfo.btsId;
        let baiduPoint = new BMap.Point(btsInfo.lng, btsInfo.lat); // 百度地图坐标 
        /* 绘制基站 */
        /**edti by gaochao start */
        let cover = new BtsPreLockOverlayConstructor(baiduPoint, btsInfo.btsId, btsInfo.mode, btsInfo.radius, btsInfo.credibility);
        devPreLockCellClearInfosCache[btsInfo.btsId] = cover;
        /**edit by gaochao end */
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