import { Energy } from '../energy/Energy.js';

export class CarEngOrientationConstructor {

    constructor(point, energy, northAng, devCode, reportTime) {
        return this.draw(point, energy, northAng, devCode, reportTime);
    }

    draw(point, energy, northAng, devCode, reportTime) {
        function outputMaxPrice(array) {
        	let item1 = Math.max.apply(Math, array);
        	let item2 = Math.min.apply(Math, array);
        	return item1 - item2;
        }
        function carEngOrientationOverlay(point, energy, northAng, devCode, reportTime) {
            this._point = point;
            this._energy = energy;
            this._northAng = northAng;
            this._devCode = devCode;
            this._reportTime = reportTime;
        }
        carEngOrientationOverlay.prototype = new BMap.Overlay();
        carEngOrientationOverlay.prototype.initialize = function (map) {
            this._map = map;
            let div = document.createElement('div');
            div.style.position = 'absolute';
            /* 能量指示图片*/
            let engImgHtml = '';
            /*edit by guo shuai start 2019/3/19*/
            if (this._energy[0] <= 10) {
                engImgHtml = `
                    <img src="img/car-eng-1.png" class="energy-arrow-value-0 energy-arrow-hover">
                `;
            } else {
                /**edti by gaochao start */
                if(outputMaxPrice(this._energy) <= 10){
                    engImgHtml = `
                        <img src="img/${Energy.getEnergyBlockImg(this._energy)}" class="energy-arrow-value-0 energy-arrow-hover">
                    `;
                }
                else{
                    let engDeg = Energy.getEnergyOrientation(this._energy, this._northAng);
                    engImgHtml = `
                        <img src="img/${Energy.getEnergyImg(this._energy)}" class="energy-arrow energy-arrow-hover" style="transform:rotate(${engDeg}deg)">
                    `;
                }
            }
            /**edit by gaochao end */
            /*edit by guo shuai end 2019/3/19*/
            $(div).append(engImgHtml);
            /* 鼠标悬浮显示能量hover*/
            let engDetailsDivHtml = '';
            /*edit by guo shuai start 2019/3/19*/
            if (this._energy[0] <= 10) {
                engDetailsDivHtml = `
                    <div style="display:none; position:absolute; z-index:9000">
                        <div class="single-energy-details">1</div>
                    </div>
                `;
            /*edit by guo shuai end 2019/3/19*/
            } else {
                let energyDiv = '';
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
                    let rightInfoPanelColor = ' style="color: #555"';
                    for (let j = 0; j < maxEngArr.length; j++) {
                        if (i == maxEngArr[j]) {
                            textColor = 'color:rgb(0, 255, 0)';
                            rightInfoPanelColor = ' style="color: #ff0000"';
                            break;
                        }
                    }
                    energyDiv = energyDiv + `
                        <div class="energy-word energy-word-${i}" style="background:rgba(60, 60, 60, 0.5);${textColor}"><div class="energy-value" style="transform:rotate(-${this._northAng}deg)">${this._energy[i]}</div></div><!--前方-->
                    `;
                }
                engDetailsDivHtml = `
                    <div style="display:none; position:absolute; z-index:9999">
                        <div class="energy-value-container" style="transform:rotate(${this._northAng}deg);">
                            ${energyDiv}
                        </div>
                    </div>
                `;
            }
            $(div).append(engDetailsDivHtml);
            /* END*/
            map.getPanes().labelPane.appendChild(div);
            this._div = div;
            return div;
        }
        carEngOrientationOverlay.prototype.draw = function () {
            let position = this._map.pointToOverlayPixel(this._point);
            this._div.style.left = position.x + 'px';
            this._div.style.top = position.y + 'px';
        }

        return new carEngOrientationOverlay(point, energy, northAng, devCode, reportTime);

    }

}