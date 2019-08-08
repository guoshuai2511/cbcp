import { VehicleOverlayConstructor } from '../overLay/VehicleOverlayConstructor.js';
import { GPSToBaiduPoint } from '../../../common/baiduMap/GPSToBaiduPoint.BaiduMap.js';

export class DrawVehicleOverlay {

    static drawVehicle(vehicleInfoList) {
        let pointArr = [];
        for (let key of vehicleInfoList.keys()) {
            let vehicleData = vehicleInfoList.get(key);
            if (vehicleMarkerCache.get(`${vehicleData.id}`) == undefined || vehicleMarkerCache.get(`${vehicleData.id}`) == null) {
                vehicleGPSCache.set(`${vehicleData.id}`, [vehicleData.lng, vehicleData.lat]);
                let pointEndData = GPSToBaiduPoint.getBaiduPointLocation([[random(vehicleData.lng), random(vehicleData.lat)]]);
                let pointEnd = new BMap.Point(pointEndData[0].lng, pointEndData[0].lat);
                if (firstMove) {
                    pointArr.push(pointEnd);
                }
                let carMarker = new VehicleOverlayConstructor(pointEnd, vehicleData.driverName, vehicleData.id, vehicleData.vehicleType, vehicleData.managerRealName, vehicleData.model, vehicleData.driverRealName, vehicleData.deptName, vehicleData.devs);
                vehiclePointCache.set(`${vehicleData.id}`, pointEnd);
                vehicleMarkerCache.set(`${vehicleData.id}`, carMarker);
                map.addOverlay(carMarker);
            } else {
                let lastLat = vehicleGPSCache.get(`${vehicleData.id}`)[1];
                let nowLat = vehicleInfoList.get(key).lat;
                let lastLng = vehicleGPSCache.get(`${vehicleData.id}`)[0];
                let nowLng = vehicleInfoList.get(key).lng;
                if (lastLat != nowLat || lastLng != nowLng) {
                    map.removeOverlay(vehicleMarkerCache.get(`${vehicleData.id}`));
                    vehicleGPSCache.set(`${vehicleData.id}`, [vehicleData.lng, vehicleData.lat]);
                    let pointEndData = GPSToBaiduPoint.getBaiduPointLocation([[random(vehicleData.lng), random(vehicleData.lat)]]);
                    let pointEnd = new BMap.Point(pointEndData[0].lng, pointEndData[0].lat);
                    let carMarker = new VehicleOverlayConstructor(pointEnd, vehicleData.driverName, vehicleData.id, vehicleData.vehicleType, vehicleData.managerRealName, vehicleData.model, vehicleData.driverRealName, vehicleData.deptName, vehicleData.devs);
                    vehiclePointCache.set(`${vehicleData.id}`, pointEnd);
                    vehicleMarkerCache.set(`${vehicleData.id}`, carMarker);
                    map.addOverlay(carMarker);
                }
            }
        }
        if (firstMove) {
            let v = map.getViewport(pointArr);
            map.centerAndZoom(v.center, v.zoom - 1);
            firstMove = false;
        }
        function random(data) {
            return Math.floor(Math.random() * 10) * 0.00004 + parseFloat(data);
        }
    }

}