import { VehicleOverlayConstructor } from '../overlay/VehicleOverlayConstructor.js';
import { GPSToBaiduPoint } from '../../../common/baiduMap/GPSToBaiduPoint.BaiduMap.js';

export class PrasingVehicleInfo {
    static showVehicle(vehivleList) {
        for (let key in vehivleList) {
            let vehicleData = vehivleList[key];
            if (vehicleData != undefined && vehicleData != null) {
                if (vehicleMarkerCache.get(`${vehicleData.vehicleNum}`) == undefined || vehicleMarkerCache.get(`${vehicleData.vehicleNum}`) == null) {
                    vehicleGPSCache.set(`${vehicleData.vehicleNum}`, [vehicleData.lng, vehicleData.lat]);
                    let pointEndData = GPSToBaiduPoint.getBaiduPointLocation([[random(vehicleData.lng), random(vehicleData.lat)]]);
                    let pointEnd = new BMap.Point(pointEndData[0].lng, pointEndData[0].lat);
                    let carMarker = new VehicleOverlayConstructor(pointEnd, vehicleData.driverName, vehicleData.vehicleNum);
                    vehicleMarkerCache.set(`${vehicleData.vehicleNum}`, carMarker);
                    map.addOverlay(carMarker);
                } else {
                    let lastLat = vehicleGPSCache.get(`${vehicleData.vehicleNum}`)[1];
                    let nowLat = vehivleList[key].lat;
                    let lastLng = vehicleGPSCache.get(`${vehicleData.vehicleNum}`)[0];
                    let nowLng = vehivleList[key].lng;
                    if (lastLat != nowLat || lastLng != nowLng) {
                        map.removeOverlay(vehicleMarkerCache.get(`${vehicleData.vehicleNum}`));
                        vehicleGPSCache.set(`${vehicleData.vehicleNum}`, [vehicleData.lng, vehicleData.lat]);
                        let pointEndData = GPSToBaiduPoint.getBaiduPointLocation([[random(vehicleData.lng), random(vehicleData.lat)]]);
                        let pointEnd = new BMap.Point(pointEndData[0].lng, pointEndData[0].lat);
                        let carMarker = new VehicleOverlayConstructor(pointEnd, vehicleData.driverName, vehicleData.vehicleNum);
                        vehicleMarkerCache.set(`${vehicleData.vehicleNum}`, carMarker);
                        map.addOverlay(carMarker);
                    }
                }
            }
        }
        function random(data) {
            return Math.floor(Math.random() * 10) * 0.00001 + parseFloat(data);
        }
    }
}