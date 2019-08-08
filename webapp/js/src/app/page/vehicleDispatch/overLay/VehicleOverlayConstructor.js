export class VehicleOverlayConstructor {

    constructor(point, img, tel, number, id, type, head, model, user, dept, devList, vehicleNum) {
        return this.draw(point, img, tel, number, id, type, head, model, user, dept, devList, vehicleNum);
    }

    draw(point, img, tel, number, id, type, head, model, user, dept, devList, vehicleNum) {
        /* 定义自定义覆盖物的构造函数 */
        function VehicleMarkerOverlay(point, img, tel, number, id, type, head, model, user, dept, devList, vehicleNum) {
            this.img = img;
            this._point = point;
            this.tel = tel;
            this.number = number;
            this.id = id;
            this.type = type;
            this.head = head;
            this.model = model;
            this.user = user;
            this.dept = dept;
            this.devList = devList;
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
            $(div).attr('class', `vehicleMarkerIcon vehicleMarkerIcon-${this.id}`);
            $(div).attr('data-open-status', 'close');
            $(div).attr('z-index-temp', '5000');
            div.style.display = 'inline-block';
            let licenseDisplay = ""
            let panelDisplay = "";
            if (!!vehiclePanelCache.get(`${this.id}`)) {
                if (vehiclePanelCache.get(`${this.id}`) == "open") {
                    panelDisplay = "display:block";
                }

            }
            // if (selectedVehicleId.indexOf(this.id) != -1) {
            //     imgChoose = "Choose";
            //     licenseDisplay = "display:block";
            // }
            div.innerHTML = `
                <!--车辆图片-->
                <img class="vehicleMarker-img vehicleMarker-img-${this.id} vehicleMarker-img-${this.vehicleNum}" data-id="${this.id}" src="img/${this.img}.png" style="top:-40px;left:-23px">
                <div class="vehicleMarker-license-plate vehicleMarker-license-plate-${this.id}" style="${licenseDisplay}">${this.user}</div>
                <!--车辆信息框-->
                <div style="z-index:8000;${panelDisplay}" class="vehicleMarker-info-panel vehicleMarker-info-panel-${this.id}">
                    <div class="vehicleMarker-info-panel-close" data-id="${this.id}">
                    </div>
                    <div class="vehicleMarker-info-panel-decoration"></div>
                    <img class = "vehicleMarker-realPlay vehicleMarker-realPlay-${this.id}" src="img/iconpic/eig-command-21.png" data-url="getRealTimeCombatInfo" data-case-serial>
                    <span class="vehicleMarker-title" style=" position: absolute;left: 20px;">${this.user}</span>
                    <span class="vehicleMarker-tel-title" style=" position: absolute;top: 40px;">电话:</span>
                    <span class="vehicleMarker-tel-content" style="top: 40px;width: 200px;">${this.tel}</span>
                    <span class="vehicleMarker-user-title" style=" position: absolute;top: 60px;">车牌:</span>
                    <span class="vehicleMarker-user-content" style="top: 60px;width: 200px;">${this.number}(${this.type}-${this.model})</span>
                    <span class="vehicleMarker-head-title" style=" position: absolute;top: 80px;">负责人:</span>
                    <span class="vehicleMarker-head-content" style="top: 80px;width: 200px;">${removeNull(this.head)}</span>
                    <span class="vehicleMarker-dept-title" style=" position: absolute;top: 100px;">所属机构:</span>
                    <span class="vehicleMarker-dept-content" style="top: 100px;width: 200px;">${this.dept}</span>
                    <span class="vehicleMarker-dev-title" style=" position: absolute;top: 120px;">携带设备:</span>
                    <span class="vehicleMarker-dev-content" style="top: 120px;width: 200px;">${getDevList(this.devList)}</span>
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

        return new VehicleMarkerOverlay(point, img, tel, number, id, type, head, model, user, dept, devList, vehicleNum);
        function getDevList(devList) {
            let result = '';
            if (devList.length > 0) {
                for (let key in devList) {
                    result = result + devList[key].devCode + "<br>";
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
    }


}