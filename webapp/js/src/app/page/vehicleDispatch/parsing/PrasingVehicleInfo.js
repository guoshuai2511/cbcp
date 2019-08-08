
export class PrasingVehicleInfo {
    static prasingVehicleData(vehicleInfoList) {
        for (let key of vehicleInfoList.keys()) {
            let vehicleData = vehicleInfoList.get(key);
            if (vehicleData.isOnLine == 1 && vehicleData.isCombat != 1) {
                $(`.vehicleMarker-img-${vehicleData.id}`).removeClass('gray-cover');
            } else {
                $(`.vehicleMarker-img-${vehicleData.id}`).addClass('gray-cover');
            }
            if (vehicleData.isCombat == 1) {
                $(`.vehicleMarker-img-${vehicleData.id}`).removeClass('gray-cover');
                $(`.vehicleMarker-img-${vehicleData.id}`).attr("src", "img/icon/vehicle_onLine.png");
                $(`.vehicleMarker-img-${vehicleData.id}`).css("left", "-14px;top:-32px;");
                let deg = vehicleData.northAngle;
                /* 设置设备角度 */
                $(`.vehicleMarker-img-${vehicleData.id}`).css('transform', `rotate(${deg}deg)`);
                $(`.vehicleMarker-realPlay-${vehicleData.id}`).show();
                $(`.vehicleMarker-realPlay-${vehicleData.id}`).attr("data-case-serial", vehicleData.serialNum);
            } else {
                $(`.vehicleMarker-realPlay-${vehicleData.id}`).hide();
                $(`.vehicleMarker-img-${vehicleData.id}`).attr("src", "img/vehicleMarker.png");
                $(`.vehicleMarker-realPlay-${vehicleData.id}`).attr("data-case-serial", "");
                $(`.vehicleMarker-img-${vehicleData.id}`).css("left", "-23px;top:-40px;");
            }
        }
    }
}