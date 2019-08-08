import { DrawVehicleOverlay } from '../overLay/DrawVehicleOverlay.js';
import { PrasingVehicleInfo } from '../parsing/PrasingVehicleInfo.js';

let isFirst = true;
let exitRealTime = null;
export class WebSocketJSONProcess {

    static onOpen() {
        console.log('已连接');
    }

    static onMessage(evt) {

        //devBaseInfo = JSON.parse(evt.data);
        // console.log(evt.data);

        let resultDataMap = JSON.parse(evt.data);

        WebSocketJSONProcess.caseInfosProcessing(resultDataMap.vehicleInfoList);
    }

    static onError() {
        console.log('连接异常');
    }

    static onClose() {
        console.log('连接关闭');
    }

    static caseInfosProcessing(vehicleInfoList) {
        if (isFirst) {
            /* 初始化点聚合*/
            carMarkerClustererWorking = new BMapLib.MarkerClusterer(map, {
                markers: vehicleMarkerList,
                styles: [{
                    url: 'img/workMarkerClusterer.png', // 工作中的设备点聚合图标
                    size: new BMap.Size(53, 53)
                }],
                isAverageCenter: true,
            });
            map.addEventListener("zoomend", showMarkerClusterer);
            map.addEventListener("dragend", showMarkerClusterer);
            function showMarkerClusterer() {
                for (let key of vehicleMarkerCache.keys()) {
                    if (vehicleIconCache.get(key).map == null) {
                        vehicleMarkerCache.get(key).hide();
                    } else {
                        vehicleMarkerCache.get(key).show();
                    }
                }
            }
            isFirst = false;
        }
        if (vehicleInfoList != null) {
            for (let key in vehicleInfoList) {
                if (vehicleNumCache.get(vehicleInfoList[key].vehicleNum) != null) {
                    vehicleNumCache.get(vehicleInfoList[key].vehicleNum).lng = vehicleInfoList[key].lng;
                    vehicleNumCache.get(vehicleInfoList[key].vehicleNum).lat = vehicleInfoList[key].lat;
                    vehicleNumCache.get(vehicleInfoList[key].vehicleNum).isOnLine = vehicleInfoList[key].isOnLine;
                    vehicleNumCache.get(vehicleInfoList[key].vehicleNum).isCombat = vehicleInfoList[key].isCombat;
                    vehicleNumCache.get(vehicleInfoList[key].vehicleNum).serialNum = vehicleInfoList[key].serialNum;
                    vehicleNumCache.get(vehicleInfoList[key].vehicleNum).devLng = vehicleInfoList[key].devLng;
                    vehicleNumCache.get(vehicleInfoList[key].vehicleNum).devLat = vehicleInfoList[key].devLat;
                    vehicleNumCache.get(vehicleInfoList[key].vehicleNum).northAngle = vehicleInfoList[key].northAngle;
                }
            }
            DrawVehicleOverlay.drawVehicle(vehicleNumCache);
            PrasingVehicleInfo.prasingVehicleData(vehicleNumCache);
        }

    }


}