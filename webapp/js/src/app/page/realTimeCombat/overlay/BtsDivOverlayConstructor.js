import { BaiduMapInit } from '../../../common/baiduMap/Init.BaiduMap.js';

import { BtsValue } from '../bts/BtsValue.js';

export class BtsDivOverlayConstructor {

    constructor(point, mcc, mnc, mode, sid, nid, bid, lacTac, radius, cellId, btsId, hitTimes, dlHitTimes, credibility) {
        return this.draw(point, mcc, mnc, mode, sid, nid, bid, lacTac, radius, cellId, btsId, hitTimes, dlHitTimes, credibility);
    }

    draw(point, mcc, mnc, mode, sid, nid, bid, lacTac, radius, cellId, btsId, hitTimes, dlHitTimes, credibility) {
        /* 定义自定义覆盖物的构造函数 */
        function BtsDivOverlay(point, mcc, mnc, mode, sid, nid, bid, lacTac, radius, cellId, btsId, hitTimes, dlHitTimes, credibility) {
            this._point = point;
            this._mcc = mcc;
            this._mnc = mnc;
            this._mode = mode;
            this._sid = sid;
            this._nid = nid;
            this._bid = bid;
            this._lacTac = lacTac;
            this._radius = radius;
            this._cellId = cellId;
            this._btsId = btsId;
            this._hitTimes = hitTimes;
            this._dlHitTimes = dlHitTimes;
            this._credibility = credibility;
        }
        /* 继承API的BMap.Overlay */
        BtsDivOverlay.prototype = new BMap.Overlay();
        /* 实现初始化方法 */
        BtsDivOverlay.prototype.initialize = function (map) {
            /* 保存map对象实例 */
            this._map = map;
            /* 创建div元素，作为自定义覆盖物的容器 */
            let div = this._div = document.createElement('div');
            /**add by gaochao start */
            let btsCredibilityColor = "#666666";
            if (this._credibility == 1) {
                //省厅准确基站表
                btsCredibilityColor = "#36B21D";
            } else if (this._credibility == 2) {
                //enodeb表
                btsCredibilityColor = "#FFD800";
            } else if (this._credibility == 3) {
                //手动上报的基站表
                btsCredibilityColor = "#2588B4";
            } else if (this._credibility == 4) {
                //TA上报的基站表
                btsCredibilityColor = "#648DA0";
            } else if (this._credibility == 5) {
                //计算后的基站表
                btsCredibilityColor = "#CC25E0";
            }
            /**add by gaochao end*/
            div.style.position = 'absolute';
            div.style.zIndex = 5000;
            $(div).attr('class', `bts-click-unhit bts-click-${this._btsId}`);
            $(div).attr('data-open-status', 'close');
            div.style.display = 'inline-block';
            let btsImg = '';
            let btsHitStatus = '';
            let btsHitGray = '';
            let hitTimesValue = '';
            if (this._hitTimes == 0 || this._hitTimes == null) {
                btsImg = 'btsicon'; // 默认图片为蓝色
                btsHitStatus = 'bts-img-unhit';
                btsHitGray = 'gray-cover'
            } else {
                btsImg = 'btsiconhit'; // 命中后图片为红色
                hitTimesValue = this._hitTimes;
            }
            /**add by gaochao start */
            let dlHitTimesValue = '';
            if (this._dlHitTimes == 0 || this._dlHitTimes == null) {
            } else {
                btsImg = 'btsiconhit'; // 命中后图片为红色
                dlHitTimesValue = this._dlHitTimes;
            }
            /**add by gaochao end*/

            /**edti by gaochao start */
            div.innerHTML = `
                <!--基站图片-->
                <img class="bts-img bts-img-${this._btsId} ${btsHitStatus} ${btsHitGray}" data-bts-mode="${this._mode}" data-bts-id="${this._btsId}" src="img/btsicon/${btsImg}-${this._mode}.png">
                <div class="bts-hit-count bts-hit-count-${this._btsId}" data-bts-id="${this._btsId}">${(hitTimesValue == '' && dlHitTimesValue == "") ? "" : (hitTimesValue == "" ? 0 : hitTimesValue) + "/" + (dlHitTimesValue == "" ? 0 : dlHitTimesValue)}</div>
                <div class="bts-hit-count-shadow bts-hit-count-shadow-${this._btsId}"></div>
                <div class="bts-credibility" style="background:${btsCredibilityColor}"></div>
                <!--选中框-->
                <div class="bts-selectedCircle bts-selectedCircle-${this._btsId}" style="display:none;"></div>
                <!--基站获取数值-->
                <div style="z-index:8000;" class="bts-value bts-value-${this._btsId}" style="display:none;">${BtsValue.btsTag(this._mode, this._mcc, this._mnc, this._lacTac, this._sid, this._nid, this._bid, this._cellId)}</div>
                <!--基站信息框-->
                <div style="z-index:8000;" class="bts-info-panel bts-info-panel-${this._btsId}" style="display:none;">
                    <div class="bts-info-panel-close bts-info-panel-close-${this._btsId}" data-bts-id="${this._btsId}">
                        <span class="glyphicon iconfont icon-close"></span>
                    </div>
                    <div class="bts-info-panel-decoration"></div>
                    <img class="bts-name-icon" src="img/${BtsValue.btsNameIcon(this._mnc)}.png">
                    <span class="bts-name">${BtsValue.btsName(this._mnc)}&nbsp;${this._mode.toUpperCase()}</span>
                    <span class="bts-identifier">基站标识：${BtsValue.btsTag(this._mode, this._mcc, this._mnc, this._lacTac, this._sid, this._nid, this._bid, this._cellId)}</span>
                    <span class="bts-range">覆盖范围：${this._radius}m</span>
                    <button class="myCosButton-inner show-range-button show-range-button-${this._btsId}" data-bts-id="${this._btsId}" data-open-status="close">显示半径</button>
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
        BtsDivOverlay.prototype.draw = function () {
            /* 根据地理坐标转换为像素坐标，并设置给容器 */
            let position = this._map.pointToOverlayPixel(this._point);
            this._div.style.left = position.x + 'px';
            this._div.style.top = position.y + 'px';
        }

        return new BtsDivOverlay(point, mcc, mnc, mode, sid, nid, bid, lacTac, radius, cellId, btsId, hitTimes, dlHitTimes, credibility);

    }

}