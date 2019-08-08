import { BaiduMapInit } from '../../../common/baiduMap/Init.BaiduMap.js';
import { Energy } from '../energy/Energy.js';

export class SingleDivOverlayConstructor {

    constructor(point, energy, devCode, isHit) {
        return this.draw(point, energy, devCode, isHit);
    }

    /**
     * 使用百度地图API官方写法，不做任何更改
     */
    draw(point, energy, devCode, isHit) {

        /* 定义自定义覆盖物的构造函数 */
        function singleDivOverlay(point, energy, devCode, isHit) {
            this._point = point; // 设备坐标
            this._energy = energy; // 设备能量信息
            this._devCode = devCode; // 索引（鉴别号）
            this._isHit = isHit; // 是否命中
        }

        /* 继承API的BMap.Overlay */
        singleDivOverlay.prototype = new BMap.Overlay();

        /* 实现初始化方法 */
        singleDivOverlay.prototype.initialize = function (map) {
            /* 保存map对象实例 */
            this._map = map;
            /* 创建div元素，作为自定义覆盖物的容器 */
            var div = this._div = document.createElement('div');
            div.className = 'each-device each-device-' + this._devCode;
            div.style.position = 'absolute';
            div.style.zIndex = 8000;
            div.style.display = 'inline-block';
            /* 自定义覆盖物div中的html代码 */
            /**edti by gaochao start */
            div.innerHTML = `
                <!--设备选中框-->
                <div class="dev-selecter-circle dev-selecter-circle-${this._devCode}"></div>
                <!--单兵图片-->
                <div class="single-img single-img-${this._devCode}">
                    <img class="single-img-src-${this._devCode}" src="img/single_${devDrawInfoMap.get(this._devCode).devImgIndex}.png" style="width:46px;height:37px;position:absolute;left:4px;top:4px;">
                    <div class="single-photo single-photo-${this._devCode}" style="width:22px;height:22px;left:11px;top:9px;${(devDrawInfoMap.get(this._devCode).headAddr == null || devDrawInfoMap.get(this._devCode).headAddr == "") ? "" : `background:url(${devDrawInfoMap.get(this._devCode).headAddr});background-size:cover`}"></div>
                </div>
                <!--单兵组队信息-->
                <div class="dev-team-info dev-team-info-${this._devCode}" style="top:30px; z-index:9000;">
                    <span style="color: rgb(0, 255, 255)">${this._devCode}</span>
                </div>
                <!--单兵信息面板-->
                <div class="dev-info-panel dev-info-panel-${this._devCode}">
                    <div class="dev-info-panel-close dev-info-panel-close-${this._devCode}">
                        <span class="glyphicon iconfont icon-close"></span>
                    </div>
                    <span class="car-name-value">设备名称：${this._devCode}</span><br>
                    <!--<span class="car-group-value">所在组：</span><br>-->
                    <!--<span class="car-leader-value">负责人：</span><br>-->
                    <!--<span class="car-phone-value">手机号：</span><br>-->
                    <!--<button class="myCosButton-inner show-energy-panel-button show-energy-panel-button-${this._devCode}">查看能量历史信息</button>-->
                    <div class="dev-info-panel-bot-decoration"></div>
                </div>
                <!--单兵能量-->
                <div id="energy-value-${this._devCode}" style="display:${Energy.getEnergyDisplay(this._isHit)}">
                    <div class="energy-word-single energy-word-0-${this._devCode}" style="left:-18px;top:-52px;background:` + Energy.getEnergyColor(this._energy, this._isHit) + `">` + this._energy + `</div><!--前方-->
                <div>
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
        singleDivOverlay.prototype.draw = function () {
            /* 根据地理坐标转换为像素坐标，并设置给容器 */
            let position = this._map.pointToOverlayPixel(this._point);
            this._div.style.left = position.x + 'px';
            this._div.style.top = position.y + 'px';
        }

        return new singleDivOverlay(point, energy, devCode, isHit);

    }

}