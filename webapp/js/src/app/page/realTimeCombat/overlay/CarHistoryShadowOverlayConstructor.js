import { Energy } from '../energy/Energy.js';

export class CarHistoryShadowOverlayConstructor {

    constructor(point, devCode, northAngle, energy, passive) {
        return this.draw(point, devCode, northAngle, energy, passive);
    }

    /**
     * 使用百度地图API官方写法，不做任何更改
     */
    draw(point, devCode, northAngle, energy, passive) {

        /* 定义自定义覆盖物的构造函数 */
        function carHistoryShadowOverlay(point, devCode, northAngle, energy, passive) {
            this._point = point;
            this._devCode = devCode;
            this._northAngle = northAngle;
            this._energy = [Number(energy[0]), Number(energy[1]), Number(energy[2]), Number(energy[3])];
            this._passive = passive;
        }

        /* 继承API的BMap.Overlay */
        carHistoryShadowOverlay.prototype = new BMap.Overlay();

        /* 实现初始化方法 */
        carHistoryShadowOverlay.prototype.initialize = function (map) {
            /* 保存map对象实例 */
            this._map = map;
            /* 创建div元素，作为自定义覆盖物的容器 */
            var div = this._div = document.createElement('div');
            div.style.position = 'absolute';
            /* 能量值div*/
            let energyDiv = '';
            if (this._energy[0] == 0 && this._energy[1] == 0 && this._energy[2] == 0 && this._energy[3] == 0) {
                /*edit by guoshuai start 2019/3/19*/
            } else if (this._energy[0] <= 10 ) {
            /*edit by guoshuai end 2019/3/19*/
                for (let i = 0; i < 4; i++) {
                    energyDiv = energyDiv + `
                        <div class="energy-word energy-word-${i}" style="background:rgba(60, 60, 60, 0.5);"><div class="energy-value" style="transform:rotate(-${this._northAngle}deg)">1</div></div><!--前方-->
                    `;
                }
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
                            textColor = 'color:rgb(0, 255, 0)';
                            break;
                        }
                    }
                    energyDiv = energyDiv + `
                        <div class="energy-word energy-word-${i}" style="background:rgba(60, 60, 60, 0.5);${textColor}"><div class="energy-value" style="transform:rotate(-${this._northAngle}deg)">${this._energy[i]}</div></div><!--前方-->
                    `;
                }
            }
            let passiveHtml = '';
            if (passive == 2000) {
                passiveHtml = passiveHtml + `
                    <div class="shadow-passive" style="color: #ff2222;">主动式命中</div>
                `;
            } else if (passive == 1000) {
                passiveHtml = passiveHtml + `
                    <div class="shadow-passive" style="color: #fff;">主动式脱网</div>
                `;
            }
            /* 自定义覆盖物div中的html代码 */
            div.innerHTML = `
                <!--小车图片-->
                <img class="car-img gray-cover" src="img/car_${devDrawInfoMap.get(this._devCode).devImgIndex}.png" style="transform:rotate(${this._northAngle - 90}deg); opacity:0.75">
                <!--四向能量-->
                <div class="energy-value-container" style="transform:rotate(${this._northAngle}deg);">
                    ${energyDiv}    
                </div>
                <!--主动式信息-->
                ${passiveHtml}
            `;
            div.style.zIndex = 8500;
            /* 将div添加到覆盖物容器中 */
            map.getPanes().labelPane.appendChild(div);
            /* 保存div实例 */
            this._div = div;
            /* 需要将div元素作为方法的返回值 */
            return div;
        }

        /* 绘制覆盖物,实现绘制方法 */
        carHistoryShadowOverlay.prototype.draw = function () {
            /* 根据地理坐标转换为像素坐标，并设置给容器 */
            let position = this._map.pointToOverlayPixel(this._point);
            this._div.style.left = position.x + 'px';
            this._div.style.top = position.y + 'px';
        }

        return new carHistoryShadowOverlay(point, devCode, northAngle, energy, passive);

    }

}