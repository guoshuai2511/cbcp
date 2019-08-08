export class BtsAnalysisOverlayConstructor {

    constructor(point, broadcastPercent, dedicatedPercent, isGray) {
        return this.draw(point, broadcastPercent, dedicatedPercent, isGray);
    }

    /**
    * 使用百度地图API官方写法，不做任何更改
    */
    draw(point, broadcastPercent, dedicatedPercent, isGray) {

        /* 定义自定义覆盖物的构造函数 */
        function btsAnalysisOverlay(point, broadcastPercent, dedicatedPercent, isGray) {
            this._point = point;
            this._broadcastPercent = broadcastPercent;
            this._dedicatedPercent = dedicatedPercent;
            this._isGray = isGray;
        }

        /* 继承API的BMap.Overlay */
        btsAnalysisOverlay.prototype = new BMap.Overlay();

        /* 实现初始化方法 */
        btsAnalysisOverlay.prototype.initialize = function (map) {
            /* 保存map对象实例 */
            this._map = map;
            /* 创建div元素，作为自定义覆盖物的容器 */
            var div = this._div = document.createElement('div');
            div.style.position = 'absolute';
            /* 自定义覆盖物div中的html代码 */
            let grayClass = '';
            if (!this._isGray) {
                grayClass = 'gray-cover';
            }
            /* C网和W网只有一个，其余两个*/
            let imgName;
            if (dedicatedPercent == null) {
                let perc1 = parseInt(this._broadcastPercent / 10);
                if (perc1 % 2 != 0) {
                    perc1 = perc1 - 1;
                }
                imgName = `crc1-${perc1}.png`;
            } else {
                let perc1 = parseInt(this._broadcastPercent / 10);
                let perc2 = parseInt(this._dedicatedPercent / 10);
                if (perc1 % 2 != 0) {
                    perc1 = perc1 - 1;
                }
                if (perc2 % 2 != 0) {
                    perc2 = perc2 - 1;
                }
                imgName = `crc2_${perc1}-${perc2}.png`;
            }
            div.innerHTML = `
                <img class="bts-analysis-img ${grayClass}" src="img/crc/${imgName}">
            `;
            /* 将div添加到覆盖物容器中 */
            map.getPanes().labelPane.appendChild(div);
            /* 保存div实例 */
            this._div = div;
            /* 需要将div元素作为方法的返回值 */
            return div;
        }

        /* 绘制覆盖物,实现绘制方法 */
        btsAnalysisOverlay.prototype.draw = function () {
            /* 根据地理坐标转换为像素坐标，并设置给容器 */
            let position = this._map.pointToOverlayPixel(this._point);
            this._div.style.left = position.x + 'px';
            this._div.style.top = position.y + 'px';
        }

        return new btsAnalysisOverlay(point, broadcastPercent, dedicatedPercent, isGray);

    }

}