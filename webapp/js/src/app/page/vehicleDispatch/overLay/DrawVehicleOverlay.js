import { VehicleOverlayConstructor } from '../overLay/VehicleOverlayConstructor.js';
import { GPSToBaiduPoint } from '../../../common/baiduMap/GPSToBaiduPoint.BaiduMap.js';

export class DrawVehicleOverlay {

    static drawVehicle(vehicleInfoList) {
        let pointArr = [];
        let carMarker;
        for (let key of vehicleInfoList.keys()) {
            let vehicleData = vehicleInfoList.get(key);
            let img = "vehicleMarker";
            if (vehicleData.lat != undefined && vehicleData.lat != null) {
                if (vehicleMarkerCache.get(`${vehicleData.id}`) == undefined || vehicleMarkerCache.get(`${vehicleData.id}`) == null) {
                    if (!!vehicleData.devLat && !!vehicleData.devLng && vehicleData.isCombat == 1) {
                        vehicleData.lng = vehicleData.devLng;
                        vehicleData.lat = vehicleData.devLat;
                        img = "icon/vehicle_onLine";
                    }
                    vehicleGPSCache.set(`${vehicleData.id}`, [vehicleData.lng, vehicleData.lat]);
                    let pointEndData = GPSToBaiduPoint.getBaiduPointLocation([[random(vehicleData.lng), random(vehicleData.lat)]]);
                    let pointEnd = new BMap.Point(pointEndData[0].lng, pointEndData[0].lat);
                    // if (firstMove) {
                    //     pointArr.push(pointEnd);
                    // }
                    carMarker = new VehicleOverlayConstructor(pointEnd,img, vehicleData.driverTel, vehicleData.plateNum, vehicleData.id, vehicleData.vehicleType, vehicleData.managerRealName, vehicleData.model, vehicleData.driverRealName, vehicleData.deptName, vehicleData.devs, vehicleData.vehicleNum);
                    vehiclePointCache.set(`${vehicleData.id}`, pointEnd);
                    vehicleMarkerCache.set(`${vehicleData.id}`, carMarker);
                    map.addOverlay(carMarker);
                    let icon = new BMap.Marker(
                        new BMap.Point(pointEndData[0].lng, pointEndData[0].lat),
                        { icon: new BMap.Icon("./img/car_0.png", new BMap.Size(0, 0)) }
                    );
                    vehicleIconCache.set(`${vehicleData.id}`, icon);
                    if (icon.map == null) {
                        carMarker.hide();
                    } else {
                        carMarker.show();
                    }
                    carMarkerClustererWorking.addMarker(icon);
                } else {
                    if (!!vehicleData.devLat && !!vehicleData.devLng && vehicleData.isCombat == 1) {
                        vehicleData.lng = vehicleData.devLng;
                        vehicleData.lat = vehicleData.devLat;
                        img = "icon/vehicle_onLine";
                    }
                    let lastLat = vehicleGPSCache.get(`${vehicleData.id}`)[1];
                    let nowLat = vehicleInfoList.get(key).lat;
                    let lastLng = vehicleGPSCache.get(`${vehicleData.id}`)[0];
                    let nowLng = vehicleInfoList.get(key).lng;
                    if (lastLat != nowLat || lastLng != nowLng) {
                        map.removeOverlay(vehicleMarkerCache.get(`${vehicleData.id}`));
                        vehicleGPSCache.set(`${vehicleData.id}`, [vehicleData.lng, vehicleData.lat]);
                        let pointEndData = GPSToBaiduPoint.getBaiduPointLocation([[random(vehicleData.lng), random(vehicleData.lat)]]);
                        let pointEnd = new BMap.Point(pointEndData[0].lng, pointEndData[0].lat);
                        carMarker = new VehicleOverlayConstructor(pointEnd,img, vehicleData.driverTel, vehicleData.plateNum, vehicleData.id, vehicleData.vehicleType, vehicleData.managerRealName, vehicleData.model, vehicleData.driverRealName, vehicleData.deptName, vehicleData.devs, vehicleData.vehicleNum);
                        vehiclePointCache.set(`${vehicleData.id}`, pointEnd);
                        carMarkerClustererWorking.removeMarker(vehicleIconCache.get(`${vehicleData.id}`));
                        vehicleMarkerCache.set(`${vehicleData.id}`, carMarker);
                        map.addOverlay(carMarker);
                        let icon = new BMap.Marker(
                            new BMap.Point(pointEndData[0].lng, pointEndData[0].lat),
                            { icon: new BMap.Icon("./img/car_0.png", new BMap.Size(0, 0)) }
                        );
                        vehicleIconCache.set(`${vehicleData.id}`, icon);
                        carMarkerClustererWorking.addMarker(icon);
                        if (icon.map == null) {
                            carMarker.hide();
                        } else {
                            carMarker.show();
                        }
                        map.setZoom(map.getZoom()-1);
                        map.setZoom(map.getZoom()+1);
                    }
                }
            }
        }
        // if (firstMove) {
        //     let v = map.getViewport(pointArr);
        //     map.centerAndZoom(v.center, v.zoom - 1);
        //     firstMove = false;
        // }
        function random(data) {
            return Math.floor(Math.random() * 10) * 0.00001 + parseFloat(data);
        }
    }

}