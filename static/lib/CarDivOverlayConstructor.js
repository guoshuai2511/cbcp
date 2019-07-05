export class CarDivOverlayConstructor {

    constructor(point, devCode) {
        return this.draw(point, devCode);
    }

    /**
     * 使用百度地图API官方写法，不做任何更改
     */
    draw(point, devCode) {

        /* 定义自定义覆盖物的构造函数 */
        function carDivOverlay(point, devCode) {
            this._point = point; // 设备坐标
            this._devCode = devCode; // 设备编号
        }

        /* 继承API的BMap.Overlay */
        carDivOverlay.prototype = new BMap.Overlay();

        /* 实现初始化方法 */
        carDivOverlay.prototype.initialize = function (map) {
            /* 保存map对象实例 */
            this._map = map;
            /* 创建div元素，作为自定义覆盖物的容器 */
            let div = this._div = document.createElement('div');
            div.className = 'each-device each-device-' + this._devCode;
            div.style.position = 'absolute';
            div.style.display = 'inline-block';
            /* 自定义覆盖物div中的html代码 */
            div.innerHTML = `
                <!--设备选中框-->
                <div class="dev-selecter-circle dev-selecter-circle-${this._devCode}"></div>
                <!--小车图片-->
                <img class="car-img car-img-${this._devCode}" src="../../static/img/car_0.png">
                <!--小车组队信息-->
                <div class="dev-team-info dev-team-info-${this._devCode}" style="top:30px;">
                    <span>${this._devCode}</span>
                </div>
                <!--小车信息面板-->
                <div class="dev-info-panel dev-info-panel-${this._devCode}">
                    <div class="dev-info-panel-close dev-info-panel-close-${this._devCode}">
                        <span class="glyphicon iconfont icon-close"></span>
                    </div>
                    <span class="dev-name-value">设备名称：${this._devCode}</span><br>
                    <!-- <button class="myCosButton-inner show-energy-panel-button show-energy-panel-button-${this._devCode}">查看能量历史信息</button> -->
                    <div class="dev-info-panel-bot-decoration"></div>
                </div>
            `;
            /* 将div添加到覆盖物容器中 */
            map.getPanes().labelPane.appendChild(div);
            /* 保存div实例 */
            this._div = div;
            /* 需要将div元素作为方法的返回值 */
            return div;
        }

        /* 绘制覆盖物,实现绘制方法 */
        carDivOverlay.prototype.draw = function () {
            /* 根据地理坐标转换为像素坐标，并设置给容器 */
            let position = this._map.pointToOverlayPixel(this._point);
            this._div.style.left = position.x + 'px';
            this._div.style.top = position.y + 'px';
        }

        return new carDivOverlay(point, devCode);

    }

}