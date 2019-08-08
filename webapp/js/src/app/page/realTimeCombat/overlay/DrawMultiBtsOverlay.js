import { MultiBtsOverlayConstructor } from './MultiBtsOverlayConstructor.js';

export class DrawMultiBtsOverlay {

    static drawBts(btsInfo) {
        /** 基站ID */
        let btsId = btsInfo.btsId;
        /** 坐标 */
        let baiduPoint = new BMap.Point(btsInfo.lng, btsInfo.lat);
        let cover = new MultiBtsOverlayConstructor(baiduPoint, btsInfo);
        map.addOverlay(cover);
        if (isBtsOpen) {
            cover.show();
        } else {
            cover.hide();
        }
        /**存储绘制结果 */
        let btsDiv = function () {
            this.btsCover;
            this.btsRadius;
        }
        btsDiv.btsCover = cover;
        btsDivMap.set(btsId, btsDiv);
    }
}