import { BaiduMapInit } from '../../../common/baiduMap/Init.BaiduMap.js';


export class EndOverlayConstructor {

    constructor(point,address) {
        return this.draw(point,address);
    }

    draw(point,address) {
        /* 定义自定义覆盖物的构造函数 */
        function EndMarkerOverlay(point,address) {
            this._point = point;
            this.address = address;
        }
        /* 继承API的BMap.Overlay */
        EndMarkerOverlay.prototype = new BMap.Overlay();
        /* 实现初始化方法 */
        EndMarkerOverlay.prototype.initialize = function (map) {
            /* 保存map对象实例 */
            this._map = map;
            /* 创建div元素，作为自定义覆盖物的容器 */
            let div = this._div = document.createElement('div');
            /**add by gaochao start */
            /**add by gaochao end*/
            div.style.position = 'absolute';
            div.style.zIndex = 5000;
            $(div).attr('class', `endMarkerIcon`);
            $(div).attr('data-open-status', 'close');
            $(div).attr('z-index-temp', '5000');
            div.style.display = 'inline-block';
            div.innerHTML = `
                <!--基站图片-->
                <img class="endMarker-img" src="img/endMarker.png" style="top:-46px;left:0px"> 
                <!--基站信息框-->
                <div style="z-index:8000;" class="endMarker-info-panel" style="display:none;">
                    <div class="endMarker-info-panel-close">
                        <span class="glyphicon iconfont icon-close"></span>
                    </div>
                    <div class="endMarker-info-panel-decoration"></div>
                    <span class="endMarker-title" style=" position: absolute;left: 20px;top: 20px;color: #ffffff;">地址 :</span>
                    <span class="bts-range endMarker-content" style="top: 20px;left: 60px;width: 200px;">${this.address}</span>
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
        EndMarkerOverlay.prototype.draw = function () {
            /* 根据地理坐标转换为像素坐标，并设置给容器 */
            let position = this._map.pointToOverlayPixel(this._point);
            this._div.style.left = position.x + 'px';
            this._div.style.top = position.y + 'px';
        }

        return new EndMarkerOverlay(point, address);

    }

}