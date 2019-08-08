export class BtsHitEffectionOverlayConstructor {

    constructor(point, color) {
        return this.draw(point, color);
    }

    draw(point, color) {

        function btsHitEffectionOverlay(point, color) {
            this._point = point;
            this._color = color;
        }
        btsHitEffectionOverlay.prototype = new BMap.Overlay();
        btsHitEffectionOverlay.prototype.initialize = function (map) {
            this._map = map;
            let div = this._div = document.createElement('div');
            div.style.position = 'absolute';
            $(div).addClass('bts-hit-effection');
            $(div).css('background-color', this._color);
            map.getPanes().labelPane.appendChild(div);
            this._div = div;
            return div;
        }
        btsHitEffectionOverlay.prototype.draw = function () {
            let position = this._map.pointToOverlayPixel(this._point);
            this._div.style.left = position.x + 'px';
            this._div.style.top = (position.y - 26) + 'px';
        }

        return new btsHitEffectionOverlay(point, color);

    }

}