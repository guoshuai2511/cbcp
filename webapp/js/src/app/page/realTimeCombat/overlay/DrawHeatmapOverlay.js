import { GPSToBaiduPoint } from '../../../common/baiduMap/GPSToBaiduPoint.BaiduMap.js';

export class DrawHeatmapOverlay {

    static drawHeatmap(data) {

        /* 移除上一次的热力图*/
        for (let i = 0; i < heatmapOverlayCache.length; i++) {
            let isExist = false;
            for (let j = 0; j < data.length; j++) {
                if (heatmapOverlayCache[j].uuid == data[j].uuid) {
                    isExist = true;
                    break;
                }
            }
            if (!isExist) {
                for (let j = 0; j < heatmapOverlayCache[i].overlay.length; j++) {
                    map.removeOverlay(heatmapOverlayCache[i].overlay[j]);
                }
                heatmapOverlayCache.splice(i, 1);
            }
        }
        for (let i = 0; i < data.length; i++) {
            let needDraw = true;
            for (let j = 0; j < heatmapOverlayCache.length; j++) {
                if (heatmapOverlayCache[j].uuid == data[i].uuid) {
                    needDraw = false;
                    break;
                }
            }
            if (needDraw) {
                // let points = [];
                // for (let j = 0; j < data[i].points.length; j++) {
                //     let gpsInfo = GPSToBaiduPoint.getBaiduPointLocation([[data[i].points[j].lng, data[i].points[j].lat]])[0];
                //     points.push({ lng: gpsInfo.lng, lat: gpsInfo.lat, count: data[i].points[j].count });
                // }
                // let heatmapOverlay = new BMapLib.HeatmapOverlay({ "radius": 20 });
                /* 添加热力图缓存*/
                let overlayCache = [];
                let circles = data[i].circles;
                for (let j = 0; j < circles.length; j++) {
                    let point = GPSToBaiduPoint.getBaiduPointLocation([[circles[j].lng, circles[j].lat]])[0];
                    let TDOACircle = new BMap.Circle(
                        new BMap.Point(point.lng, point.lat), circles[j].radius, {
                            strokeColor: 'red',
                            strokeWeight: 1,
                            strokeOpacity: 0.7,
                            fillColor: ''
                        }
                    );
                    overlayCache.push(TDOACircle);
                    map.addOverlay(TDOACircle);
                }
                // heatmapOverlay.setDataSet({ data: points, max: 100 });
                heatmapOverlayCache.push({ uuid: data[i].uuid, overlay: overlayCache });
            }
        }
    }

}