import { GPSToBaiduPoint } from '../../../common/baiduMap/GPSToBaiduPoint.BaiduMap.js';

export class StartPointOverlay {

    static draw(point) {
        let bdPoint = GPSToBaiduPoint.getBaiduPointLocation([[point.lng, point.lat]])[0];
        let myIcon = new BMap.Icon('img/start_point.png', new BMap.Size(42, 34));
        let marker = new BMap.Marker(new BMap.Point(bdPoint.lng, bdPoint.lat), { icon: myIcon });  // 创建标注
        marker.setOffset(new BMap.Size(6, -13));
        map.addOverlay(marker);
    }

}