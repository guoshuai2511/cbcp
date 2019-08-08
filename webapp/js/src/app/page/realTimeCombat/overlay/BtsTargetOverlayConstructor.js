import { BtsValue } from '../bts/BtsValue.js';

export class BtsTargetOverlayConstructor {

    constructor(point, btsId, mode, radius,credibility) {
        return this.draw(point, btsId, mode, radius,credibility);
    }

    draw(point, btsId, mode, radius,credibility) {

        /* 定义自定义覆盖物的构造函数 */
        function BtsDivOverlay(point, btsId, mode, radius,credibility) {
            this._point = point;
            this._btsId = btsId;
            this._mode = mode;
            this._radius = radius;
            this._credibility = credibility;
            this._mnc = btsId.split('-')[1] + '';
        }
        /* 继承API的BMap.Overlay */
        BtsDivOverlay.prototype = new BMap.Overlay();
        /* 实现初始化方法 */
        BtsDivOverlay.prototype.initialize = function (map) {
            /* 保存map对象实例 */
            this._map = map;
            /* 创建div元素，作为自定义覆盖物的容器 */
            let div = this._div = document.createElement('div');
            div.style.position = 'absolute';
            $(div).attr('class', "bts-click-" + this._btsId);
            /**add by gaochao start */
            let btsCredibilityColor = "#666666";
            if(this._credibility == 1){
                //省厅准确基站表
                btsCredibilityColor = "#36B21D";
            }else if(this._credibility == 2){
                //enodeb表
                btsCredibilityColor = "#FFD800";
            }else if(this._credibility == 3){
                //手动上报的基站表
                btsCredibilityColor = "#2588B4";
            }else if(this._credibility == 4){
                //TA上报的基站表
                btsCredibilityColor = "#648DA0";
            }else if(this._credibility == 5){
                //计算后的基站表
                btsCredibilityColor = "#CC25E0";
            }
            /**add by gaochao end*/

            div.style.zIndex = 5800;
            div.style.display = 'inline-block';
            div.innerHTML = `
                <!--基站图片-->
                <img class="bts-img bts-img-${this._btsId}" data-bts-id="${this._btsId}" src="img/btsicon/btsicontarget-${this._mode}.png">
                <div class="bts-hit-count bts-hit-count-${this._btsId}"  data-bts-id="${this._btsId}"></div>
                <div class="bts-hit-count-shadow bts-hit-count-shadow-${this._btsId}"></div>
                <div class="bts-credibility" style="background:${btsCredibilityColor}"></div>
                <!--基站获取数值-->
                <div style="z-index:1000;" class="bts-value bts-value-${this._btsId}">${this._btsId}</div>
                <!--基站信息框-->
                <div style="z-index:1000;" class="bts-info-panel bts-info-panel-${this._btsId}">
                    <div class="bts-info-panel-close bts-info-panel-close-${this._btsId}">
                        <span class="glyphicon iconfont icon-close"></span>
                    </div>
                    <div class="bts-info-panel-decoration"></div>
                    <img class="bts-name-icon" src="img/${BtsValue.btsNameIcon(this._mnc)}.png">
                    <span class="bts-name">${BtsValue.btsName(this._mnc)}&nbsp;${this._mode.toUpperCase()}</span>
                    <span class="bts-identifier">基站标识：${this._btsId}</span>
                    <span class="bts-range">覆盖范围：${this._radius}m</span>
                    <button class="myCosButton-inner show-range-button show-range-button-${this._btsId}">显示半径</button>
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
        BtsDivOverlay.prototype.draw = function () {
            /* 根据地理坐标转换为像素坐标，并设置给容器 */
            let position = this._map.pointToOverlayPixel(this._point);
            this._div.style.left = position.x + 'px';
            this._div.style.top = position.y + 'px';
        }

        return new BtsDivOverlay(point, btsId, mode, radius,credibility);

    }

}