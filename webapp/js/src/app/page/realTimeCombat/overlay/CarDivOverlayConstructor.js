import { Energy } from '../energy/Energy.js';

export class CarDivOverlayConstructor {

    constructor(point, energy, devCode, northAngle, isHit) {
        return this.draw(point, energy, devCode, northAngle, isHit);
    }

    /**
     * 使用百度地图API官方写法，不做任何更改
     */
    draw(point, energy, devCode, northAngle, isHit) {

        /* 定义自定义覆盖物的构造函数 */
        function carDivOverlay(point, energy, devCode, northAngle, isHit) {
            this._point = point; // 设备坐标
            this._energy = [Number(energy[0]), Number(energy[1]), Number(energy[2]), Number(energy[3])]; // 设备能量信息
            this._devCode = devCode; // 索引（鉴别号）
            this._northAngle = Number(northAngle); // 北向
            this._isHit = isHit; // 是否命中
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
            div.style.zIndex = 8000;
            div.style.display = 'inline-block';
            let energyDiv = '';
            if (this._energy[0] == this._energy[1] && this._energy[0] == this._energy[2] && this._energy[0] == this._energy[3]) {
                energyDiv = `
                    <div class="energy-word energy-word-0 energy-word-0-${this._devCode}" style="background:${Energy.getEnergyColor(this._energy[0], this._isHit)};"><div class="energy-value" style="transform:rotate(-${this._northAngle}deg)">${this._energy[0]}</div></div><!--前方-->
                    <div class="energy-word energy-word-1 energy-word-1-${this._devCode}" style="background:${Energy.getEnergyColor(this._energy[1], this._isHit)};"><div class="energy-value" style="transform:rotate(-${this._northAngle}deg)">${this._energy[1]}</div></div><!--右方-->
                    <div class="energy-word energy-word-2 energy-word-2-${this._devCode}" style="background:${Energy.getEnergyColor(this._energy[2], this._isHit)};"><div class="energy-value" style="transform:rotate(-${this._northAngle}deg)">${this._energy[2]}</div></div><!--后方-->
                    <div class="energy-word energy-word-3 energy-word-3-${this._devCode}" style="background:${Energy.getEnergyColor(this._energy[3], this._isHit)};"><div class="energy-value" style="transform:rotate(-${this._northAngle}deg)">${this._energy[3]}</div></div><!--左方-->
                `;
            } else {
                let maxEngVal = this._energy[0]; // 设定一个默认初始值
                let maxEngIndex = 0;
                /* 获取最大值*/
                for (let i = 0; i < 4; i++) {
                    if (maxEngVal < this._energy[i]) {
                        maxEngVal = this._energy[i];
                        maxEngIndex = i;
                    }
                }
                /* 最大值可能有多个，存储数组索引*/
                let maxEngArr = [];
                for (let i = 0; i < 4; i++) {
                    if (maxEngVal == this._energy[i]) {
                        maxEngArr.push(i);
                    }
                }
                for (let i = 0; i < 4; i++) {
                    let textColor;
                    for (let j = 0; j < maxEngArr.length; j++) {
                        if (i == maxEngArr[j]) {
                            /**edit by gaochao start */
                            // textColor = 'color:rgb(0, 255, 0)';
                            textColor = 'color:rgb(0, 0, 0)';
                            /**edit by gaochao start */
                            break;
                        }
                    }
                    energyDiv = energyDiv + `
                        <div class="energy-word energy-word-${i} energy-word-${i}-${this._devCode}" style="background:${Energy.getEnergyColor(this._energy[i], this._isHit)};${textColor}"><div class="energy-value" style="transform:rotate(-${this._northAngle}deg)">${this._energy[i]}</div></div>
                    `;
                }
            }
            /* 自定义覆盖物div中的html代码 */
            div.innerHTML = `
                <!--设备选中框-->
                <div class="dev-selecter-circle dev-selecter-circle-${this._devCode}"></div>
                <!--小车图片-->
                <img class="car-img car-img-${this._devCode}" src="img/car_${devDrawInfoMap.get(this._devCode).devImgIndex}.png">
                <!--小车设备编号-->
                <div class="dev-team-info dev-team-info-${this._devCode}" style="top:55px;">
                    <span style="color: rgb(255, 255, 100)">${this._devCode}</span>
                </div>
                <!--小车信息面板-->
                <div class="dev-info-panel dev-info-panel-${this._devCode}">
                    <div class="dev-info-panel-close dev-info-panel-close-${this._devCode}">
                        <span class="glyphicon iconfont icon-close"></span>
                    </div>
                    <span class="dev-name-value">设备名称：${this._devCode}</span><br>
                    <!--<span class="dev-group-value">所在组：</span><br>-->
                    <!--<span class="dev-leader-value">负责人：</span><br>-->
                    <!--<span class="dev-phone-value">手机号：</span><br>-->
                    <!--<button class="myCosButton-inner show-energy-panel-button show-energy-panel-button-${this._devCode}">查看能量历史信息</button>-->
                    <div class="dev-info-panel-bot-decoration"></div>
                </div>
                <!--四向能量-->
                <div class="energy-value-container" id="energy-value-${this._devCode}" style="transform:rotate(${this._northAngle}deg);display:${Energy.getEnergyDisplay(this._isHit)}">
                    ${energyDiv}    
                <div>
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

        return new carDivOverlay(point, energy, devCode, northAngle, isHit);

    }

}