export class PassiveActiveMarkerOverlayConstructor {

    constructor(point, flag) {
        return this.draw(point, flag);
    }

    /**
     * 使用百度地图API官方写法，不做任何更改
     */
    draw(point, flag) {

        /* 定义自定义覆盖物的构造函数 */
        function passiveActiveMarkerOverlay(point, flag) {
            this._point = point; // 坐标
            this._flag = flag; // 标记
        }

        /* 继承API的BMap.Overlay */
        passiveActiveMarkerOverlay.prototype = new BMap.Overlay();

        /* 实现初始化方法 */
        passiveActiveMarkerOverlay.prototype.initialize = function(map) {
            /* 保存map对象实例 */
            this._map = map;
            /* 创建div元素，作为自定义覆盖物的容器 */
            var div = this._div = document.createElement('div');
            div.style.position = 'absolute';
            /* 自定义覆盖物div中的html代码 */
            div.innerHTML = `
                <img class="passive-active-marker" src="img/passive-active-marker-${this._flag}.png">
            `;
            /* 将div添加到覆盖物容器中 */
            map.getPanes().labelPane.appendChild(div);
            /* 保存div实例 */
            this._div = div;
            /* 需要将div元素作为方法的返回值 */
            return div;
        }

        /* 绘制覆盖物,实现绘制方法 */
        passiveActiveMarkerOverlay.prototype.draw = function() {
            /* 根据地理坐标转换为像素坐标，并设置给容器 */
            let position = this._map.pointToOverlayPixel(this._point);
            this._div.style.left = position.x + 'px';
            this._div.style.top = position.y + 'px';
        }

        return new passiveActiveMarkerOverlay(point, flag);

    }

}