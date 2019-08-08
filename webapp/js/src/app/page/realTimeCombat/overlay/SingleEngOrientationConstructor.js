import { BaiduMapInit } from '../../../common/baiduMap/Init.BaiduMap.js';
import { EnergySound } from '../sound/EnergySound.js';

export class SingleEngOrientationConstructor {

    constructor(point, energy, northAng, devCode, reportTime) {
        return this.draw(point, energy, northAng, devCode, reportTime);
    }

    draw(point, energy, northAng, devCode, reportTime) {

        function singleEngOrientationOverlay(point, energy, northAng, devCode, reportTime) {
            this._point = point;
            this._energy = Number(energy);
            this._northAng = Number(northAng);
            this._devCode = devCode;
            this._reportTime = reportTime;
        }
        singleEngOrientationOverlay.prototype = new BMap.Overlay();
        singleEngOrientationOverlay.prototype.initialize = function (map) {
            this._map = map;
            let div = this._div = document.createElement('div');
            div.style.position = 'absolute';
            /* 能量指示图片*/
            let engImg = document.createElement('img');
            engImg.className = 'energy-orientation-single energy-arrow-hover';
            engImg.src = 'img/singleEng0.png';
            engImg.style.opacity = this._energy / 255;
            div.appendChild(engImg);
            /* 鼠标悬浮显示能量hover*/
            let engDetailsDiv = document.createElement('div');
            engDetailsDiv.style.display = 'none';
            engDetailsDiv.style.position = 'absolute';
            engDetailsDiv.style.zIndex = 9000;
            engDetailsDiv.innerHTML = `<div class="single-energy-details">${this._energy}</div>`;
            div.appendChild(engDetailsDiv);
            /* END*/
            map.getPanes().labelPane.appendChild(div);
            this._div = div;
            return div;
        }
        singleEngOrientationOverlay.prototype.draw = function () {
            let position = this._map.pointToOverlayPixel(this._point);
            this._div.style.left = position.x + 'px';
            this._div.style.top = position.y + 'px';
        }

        return new singleEngOrientationOverlay(point, energy, northAng, devCode, reportTime);

    }

}