import { Energy } from '../energy/Energy.js';

export class SingleHistoryShadowOverlayConstructor {

    constructor(point, devCode, northAngle, energy) {
        return this.draw(point, devCode, northAngle, energy);
    }

    /**
     * 使用百度地图API官方写法，不做任何更改
     */
    draw(point, devCode, northAngle, energy) {

        /* 定义自定义覆盖物的构造函数 */
        function singleHistoryShadowOverlay(point, devCode, northAngle, energy) {
            this._point = point;
            this._devCode = devCode;
            this._northAngle = northAngle;
            this._energy = energy;
        }

        /* 继承API的BMap.Overlay */
        singleHistoryShadowOverlay.prototype = new BMap.Overlay();

        /* 实现初始化方法 */
        singleHistoryShadowOverlay.prototype.initialize = function (map) {
            /* 保存map对象实例 */
            this._map = map;
            /* 创建div元素，作为自定义覆盖物的容器 */
            var div = this._div = document.createElement('div');
            div.style.position = 'absolute';
            /* 能量值div*/
            let energyDiv = '';
            /* 自定义覆盖物div中的html代码 */
            /**edti by gaochao start */
            div.innerHTML = `
                <!--单兵图片-->
                <div class="single-img" style="transform:rotate(${this._northAngle - 90}deg);">
                    <img class="gray-cover" src="img/single_${devDrawInfoMap.get(this._devCode).devImgIndex}.png" style="width:46px;height:37px;position:absolute;left:5px;top:0;opacity:0.8;">
                </div>
                <!--单兵能量-->
                <div class="energy-word-single" style="left:-18px;top:-52px;background:rgba(0,0,0,0.5);">${this._energy}</div>
            `;
            /**edit by gaochao end */
            div.style.zIndex = 8500;
            /* 将div添加到覆盖物容器中 */
            map.getPanes().labelPane.appendChild(div);
            /* 保存div实例 */
            this._div = div;
            /* 需要将div元素作为方法的返回值 */
            return div;
        }

        /* 绘制覆盖物,实现绘制方法 */
        singleHistoryShadowOverlay.prototype.draw = function () {
            /* 根据地理坐标转换为像素坐标，并设置给容器 */
            let position = this._map.pointToOverlayPixel(this._point);
            this._div.style.left = position.x + 'px';
            this._div.style.top = position.y + 'px';
        }

        return new singleHistoryShadowOverlay(point, devCode, northAngle, energy);

    }

}