export class VehicleOverlayConstructor {

    constructor(point, number, vehicleNum) {
        return this.draw(point, number, vehicleNum);
    }

    draw(point, number, vehicleNum) {
        /* 定义自定义覆盖物的构造函数 */
        function VehicleMarkerOverlay(point, number, vehicleNum) {
            this._point = point;
            this.number = number;
            this.vehicleNum = vehicleNum;
        }
        /* 继承API的BMap.Overlay */
        VehicleMarkerOverlay.prototype = new BMap.Overlay();
        /* 实现初始化方法 */
        VehicleMarkerOverlay.prototype.initialize = function (map) {
            /* 保存map对象实例 */
            this._map = map;
            /* 创建div元素，作为自定义覆盖物的容器 */
            let div = this._div = document.createElement('div');
            /**add by gaochao start */
            /**add by gaochao end*/
            div.style.position = 'absolute';
            div.style.zIndex = 5000;
            $(div).attr('class', `vehicleMarkerIcon vehicleMarkerIcon-${this.vehicleNum}`);
            $(div).attr('data-open-status', 'close');
            $(div).attr('z-index-temp', '5000');
            div.style.display = 'inline-block';
            div.innerHTML = `
                <!--车辆图片-->
                <img class="vehicleMarker-img vehicleMarker-img-${this.vehicleNum}" data-id="${this.vehicleNum}" src="img/vehicleMarker.png" style="top:-40px;left:-23px">
                <div class="vehicleMarker-license-plate vehicleMarker-license-plate-${this.vehicleNum}" style="${getDisplay(this.number)}">${this.number}</div>
                <!--车辆信息框-->
                <div style="z-index:8000;" class="vehicleMarker-info-panel vehicleMarker-info-panel-">
                    <div class="vehicleMarker-info-panel-close" data-id="">
                    </div>
                    <div class="vehicleMarker-info-panel-decoration"></div>
                    <span class="vehicleMarker-title" style=" position: absolute;left: 20px;"></span>
                    <span class="vehicleMarker-type-title" style=" position: absolute;top: 40px;">车型:</span>
                    <span class="vehicleMarker-type-content" style="top: 40px;width: 200px;"></span>
                    <span class="vehicleMarker-head-title" style=" position: absolute;top: 60px;">负责人:</span>
                    <span class="vehicleMarker-head-content" style="top: 60px;width: 200px;"></span>
                    <span class="vehicleMarker-user-title" style=" position: absolute;top: 80px;">使用人:</span>
                    <span class="vehicleMarker-user-content" style="top: 80px;width: 200px;"></span>
                    <span class="vehicleMarker-dept-title" style=" position: absolute;top: 100px;">所属机构:</span>
                    <span class="vehicleMarker-dept-content" style="top: 100px;width: 200px;"></span>
                    <span class="vehicleMarker-dev-title" style=" position: absolute;top: 120px;">携带设备:</span>
                    <span class="vehicleMarker-dev-content" style="top: 120px;width: 200px;"></span>
                </div>
            `;
            /**edit by gaochao end */
            /* 将div添加到覆盖物容器中 */
            map.getPanes().labelPane.appendChild(div);
            /* 保存div实例 */
            this._div = div;
            /* 需要将div元素作为方法的返回值 */
            return div;
        }
        /* 绘制覆盖物,实现绘制方法 */
        VehicleMarkerOverlay.prototype.draw = function () {
            /* 根据地理坐标转换为像素坐标，并设置给容器 */
            let position = this._map.pointToOverlayPixel(this._point);
            this._div.style.left = position.x + 'px';
            this._div.style.top = position.y + 'px';
        }

        return new VehicleMarkerOverlay(point, number, vehicleNum);
        function getDevList(devList) {
            let result = '';
            if (devList.length > 0) {
                for (let key in devList) {
                    result = result + devList[key].disCode + "<br>";
                }
            } else {
                result = "暂无设备";
            }
            return result;
        }
        function removeNull(data) {
            let result = '';
            if (data == null) {
                result = "暂无";
            } else {
                result = data;
            }
            return result;
        }
        function getDisplay(data) {
            let result = '';
            if (data == undefined || data == null) {
                result = "display:none";
            }
            return result;
        }

    }


}