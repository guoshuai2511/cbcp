import { BaiduMapInit } from '../../../common/baiduMap/Init.BaiduMap.js';

import { BtsValue } from '../bts/BtsValue.js';

export class BtsSearchOverlayConstructor {

    constructor(point, mcc, mnc, mode, sid, nid, bid, lacTac, radius, cellId, btsId) {
        return this.draw(point, mcc, mnc, mode, sid, nid, bid, lacTac, radius, cellId, btsId);
    }

    draw(point, mcc, mnc, mode, sid, nid, bid, lacTac, radius, cellId, btsId) {

        /* 定义自定义覆盖物的构造函数 */
        function BtsSearchOverlay(point, mcc, mnc, mode, sid, nid, bid, lacTac, radius, cellId, btsId) {
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
        }
        /* 继承API的BMap.Overlay */
        BtsSearchOverlay.prototype = new BMap.Overlay();
        /* 实现初始化方法 */
        BtsSearchOverlay.prototype.initialize = function (map) {
            /* 保存map对象实例 */
            this._map = map;
            /* 创建div元素，作为自定义覆盖物的容器 */
            let div = this._div = document.createElement('div');
            div.style.position = 'absolute';
            div.style.zIndex = 8100;
            $(div).attr('class', `bts-click-search-${this._btsId}`);
            $(div).attr('data-open-status', 'close');
            div.style.display = 'inline-block';
            let btsImg = '';
            let btsHitStatus = '';
            let btsHitGray = '';
            div.innerHTML = `
                <!--基站图片-->
                <img class="bts-search-img bts-search-img-${this._btsId} ${btsHitStatus} ${btsHitGray}" data-bts-mode="${this._mode}" data-bts-id="${this._btsId}" src="img/btsicon/btsiconsearch.png">

                <!--选中框-->
                <div class="bts-selectedCircle bts-selectedCircle-${this._btsId}" style="display:none;"></div>
                <!--基站获取数值-->
                <!--<div style="z-index:8000;" class="bts-value bts-value-${this._btsId}" style="display:none;">${BtsValue.btsTag(this._mode, this._mcc, this._mnc, this._lacTac, this._sid, this._nid, this._bid, this._cellId)}</div>-->
                <div style="z-index:8000;" class="bts-value bts-value-${this._btsId}" style="display:none;">${this._btsId}</div>
                <!--基站信息框-->
                <div style="z-index:8000;" class="bts-info-panel bts-info-search-panel-${this._btsId}" style="display:none;">
                    <div class="bts-info-panel-search-close bts-info-panel-close-${this._btsId}" data-bts-id="${this._btsId}">
                        <span class="glyphicon iconfont icon-close"></span>
                    </div>
                    <div class="bts-info-panel-decoration"></div>
                    <img class="bts-name-icon" src="img/${BtsValue.btsNameIcon(this._mnc)}.png">
                    <span class="bts-name">${BtsValue.btsName(this._mnc)}&nbsp;${this._mode.toUpperCase()}</span>
                    <!--<span class="bts-identifier">基站标识：${BtsValue.btsTag(this._mode, this._mcc, this._mnc, this._lacTac, this._sid, this._nid, this._bid, this._cellId)}</span>-->
                    <span class="bts-identifier">基站标识：${this._btsId}</span>
                    <span class="bts-range">覆盖范围：${this._radius}m</span>
                    <button class="myCosButton-inner show-range-button-${this._btsId}" data-bts-id="${this._btsId}" data-open-status="close" id='show-range-button-search'>显示半径</button>
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
        BtsSearchOverlay.prototype.draw = function () {
            /* 根据地理坐标转换为像素坐标，并设置给容器 */
            let position = this._map.pointToOverlayPixel(this._point);
            this._div.style.left = position.x + 'px';
            this._div.style.top = position.y + 'px';
        }
        /* 查询基站基站覆盖范围显示*/

        return new BtsSearchOverlay(point, mcc, mnc, mode, sid, nid, bid, lacTac, radius, cellId, btsId);

    }

}