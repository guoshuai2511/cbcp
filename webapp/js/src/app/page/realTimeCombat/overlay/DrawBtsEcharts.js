import { DrawBtsOverlay } from '../overlay/DrawBtsOverlay.js';
import { BtsHitEffectionOverlayConstructor } from '../overlay/BtsHitEffectionOverlayConstructor.js';

export class DrawBtsEcharts {

    static showBtsStyleCSS(hitedBts) {
    	/**edit by sunbing start*/
    	if(passiveActiveStatus != 1 || null == hitedBts.btsId) {
    		if (btsHitEffectionCover != null) {
    			map.removeOverlay(btsHitEffectionCover);
    		}
    		let color = this.getEffactionColor(hitedBts);
    		if (btsInfoMap.get(hitedBts.btsId) != null) {
    			let btsPoint = new BMap.Point(btsInfoMap.get(hitedBts.btsId).lng, btsInfoMap.get(hitedBts.btsId).lat);
    			btsHitEffectionCover = new BtsHitEffectionOverlayConstructor(btsPoint, color);
    			map.addOverlay(btsHitEffectionCover);
    		}
    	}
    	/**edit by sunbing end*/
    }

    static showBtsStyle(hitedBts) {
        if (flashMarkerInterval != null) {
            /* 清除定时器*/
            clearInterval(flashMarkerInterval);
            flashMarkerInterval = null;
            /* 清除canvas*/
            $('.bts-hit-canvas').remove();
        }
        /* 设置绘制参数*/
        let markers = [];
        let color = '#999';
        for (let i = 0; i < hitedBts.dev.length; i++) {
            if (currentViewDevCode == hitedBts.dev[i] && devDrawInfoMap.get(hitedBts.dev[i]).isCorrentView) {
                switch (devDrawInfoMap.get(hitedBts.dev[i]).devType) {
                    case 1:
                        color = devColorLib.car[devDrawInfoMap.get(hitedBts.dev[i]).devImgIndex];
                        break;
                    case 2:
                        color = devColorLib.single[devDrawInfoMap.get(hitedBts.dev[i]).devImgIndex];
                        break;
                    default:
                        break;
                }
            }
        }
        if (btsInfoMap.get(hitedBts.btsId) != null) {
            markers.push({
                lnglat: [btsInfoMap.get(hitedBts.btsId).lng, btsInfoMap.get(hitedBts.btsId).lat],
                color: color,
                speed: 1,
                max: 80,
            });
        }
        /* 重新绘制canvas并更新定时器*/
        flashMarkerInterval = this.btsHitStyleConstructor(map, markers);
    }

    /* 获取基站命中效果绘制颜色*/
    static getEffactionColor(hitedBts) {
        /**edit by gaochao start */
        let color = 'rgb(153,153,153)';
        /**edit by gaochao end */
        if(hitedBts && null != hitedBts) {
        	for (let i = 0; i < hitedBts.dev.length; i++) {
        		if (currentViewDevCode == hitedBts.dev[i] && devDrawInfoMap.get(hitedBts.dev[i]).isCorrentView) {
        			switch (devDrawInfoMap.get(hitedBts.dev[i]).devType) {
        			case 1:
        				color = devColorLib.car[devDrawInfoMap.get(hitedBts.dev[i]).devImgIndex];
        				break;
        			case 2:
        				color = devColorLib.single[devDrawInfoMap.get(hitedBts.dev[i]).devImgIndex];
        				break;
        			default:
        				break;
        			}
        		}
        	}
        }
        return color;
    }

    /* 基站命中效果构造方法*/
    static btsHitStyleConstructor(____map, ____markers) {
        function CanvasLayer(options) {
            this.options = options || {};
            this.paneName = this.options.paneName || 'labelPane';
            this.zIndex = this.options.zIndex || 0;
            this._map = options.map;
            this._lastDrawTime = null;
            this.show();
        }

        CanvasLayer.prototype = new BMap.Overlay();

        CanvasLayer.prototype.initialize = function (map) {
            this._map = map;
            let canvas = this.canvas = document.createElement('canvas');
            let ctx = this.ctx = this.canvas.getContext('2d');
            canvas.style.cssText = 'position:absolute;' + 'left:0;' + 'top:0;' + 'z-index:' + this.zIndex + ';';
            canvas.style.zIndex = '-9999';
            canvas.className = 'bts-hit-canvas';
            this.adjustSize();
            this.adjustRatio(ctx);
            map.getPanes()[this.paneName].appendChild(canvas);
            let that = this;
            map.addEventListener('resize', function () {
                that.adjustSize();
                that._draw();
            });
            return this.canvas;
        };

        CanvasLayer.prototype.adjustSize = function () {
            let size = this._map.getSize();
            let canvas = this.canvas;
            canvas.width = size.width;
            canvas.height = size.height;
            canvas.style.width = canvas.width + 'px';
            canvas.style.height = canvas.height + 'px';
        };

        CanvasLayer.prototype.adjustRatio = function (ctx) {
            let backingStore = ctx.backingStorePixelRatio || ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
            let pixelRatio = (window.devicePixelRatio || 1) / backingStore;
            let canvasWidth = ctx.canvas.width;
            let canvasHeight = ctx.canvas.height;
            ctx.canvas.width = canvasWidth * pixelRatio;
            ctx.canvas.height = canvasHeight * pixelRatio;
            ctx.canvas.style.width = canvasWidth + 'px';
            ctx.canvas.style.height = canvasHeight + 'px';
            // console.log(ctx.canvas.height, canvasHeight);
            ctx.scale(pixelRatio, pixelRatio);
        };

        CanvasLayer.prototype.draw = function () {
            let self = this;
            let args = arguments;

            clearTimeout(self.timeoutID);
            self.timeoutID = setTimeout(function () {
                self._draw();
            }, 15);
        };

        CanvasLayer.prototype._draw = function () {
            let map = this._map;
            let size = map.getSize();
            let center = map.getCenter();
            if (center) {
                let pixel = map.pointToOverlayPixel(center);
                this.canvas.style.left = pixel.x - size.width / 2 + 'px';
                this.canvas.style.top = pixel.y - size.height / 2 + 'px';
                this.dispatchEvent('draw');
                this.options.update && this.options.update.call(this);
            }
        };

        CanvasLayer.prototype.getContainer = function () {
            return this.canvas;
        };

        CanvasLayer.prototype.show = function () {
            if (!this.canvas) {
                this._map.addOverlay(this);
            }
            this.canvas.style.display = 'block';
        };

        CanvasLayer.prototype.hide = function () {
            this.canvas.style.display = 'none';
            //this._map.removeOverlay(this);
        };

        CanvasLayer.prototype.setZIndex = function (zIndex) {
            this.canvas.style.zIndex = zIndex;
        };

        CanvasLayer.prototype.getZIndex = function () {
            return this.zIndex;
        };

        let global = typeof window === 'undefined' ? {} : window;

        let requestAnimationFrame = global.requestAnimationFrame || global.mozRequestAnimationFrame || global.webkitRequestAnimationFrame || global.msRequestAnimationFrame || function (callback) {
            return global.setTimeout(callback, 1000 / 50);
        };

        function Marker(opts) {
            this.city = opts.name;
            this.location = new BMap.Point(opts.lnglat[0], opts.lnglat[1]);
            this.color = opts.color;
            // this.type = opts.type || 'circle';
            this.speed = opts.speed || 0.15;
            this.size = 0;
            this.max = opts.max || 20;
        }

        Marker.prototype.draw = function (context) {
            context.save();
            context.beginPath();
            this._drawCircle(context);
            context.closePath();
            context.restore();

            this.size += 1;
            if (this.size > 80) {
                this.size = 0;
            }
        };

        Marker.prototype._drawCircle = function (context) {
            let pixel = this.pixel || map.pointToPixel(this.location);
            context.strokeStyle = this.color;
            context.moveTo(pixel.x + pixel.size, pixel.y);
            context.arc(pixel.x, pixel.y, this.size, 0, Math.PI * 2);
            context.stroke();
        };

        function FlashMarker(map, dataSet) {
            let animationLayer = null,
                width = map.getSize().width,
                height = map.getSize().height,
                animationFlag = true,
                markers = [];

            let addMarker = function addMarker() {
                if (markers.length > 0) return;
                markers = [];
                for (let i = 0; i < dataSet.length; i++) {
                    markers.push(new Marker(dataSet[i]));
                }
            };

            //上层canvas渲染，动画效果
            let render = function render() {
                let animationCtx = animationLayer.canvas.getContext('2d');
                if (!animationCtx) {
                    return;
                }

                if (!animationFlag) {
                    animationCtx.clearRect(0, 0, width, height);
                    return;
                }

                addMarker();

                animationCtx.fillStyle = 'rgba(0,0,0,0.9)';
                let prev = animationCtx.globalCompositeOperation;
                animationCtx.globalCompositeOperation = 'destination-in';
                animationCtx.fillRect(0, 0, width, height);
                animationCtx.globalCompositeOperation = prev;

                for (let i = 0; i < markers.length; i++) {
                    let marker = markers[i];
                    marker.draw(animationCtx);
                }
            };

            //初始化
            let init = function () {
                animationLayer = new CanvasLayer({
                    map: map,
                    update: render
                });

                mouseInteract();

                let interval = setInterval(() => {
                    render();
                }, 1000 / 50);

                return interval;
            };

            //鼠标事件
            let mouseInteract = function mouseInteract() {
                map.addEventListener('movestart', function () {
                    animationFlag = false;
                });

                map.addEventListener('moveend', function () {
                    animationFlag = true;
                    markers = []; //解决拖动后多余的小圆点bug，没想明白，暂时这样
                });

                map.addEventListener('zoomstart', function () {
                    animationFlag = false;
                });

                map.addEventListener('zoomend', function () {
                    animationFlag = true;
                    markers = [];
                });
            };

            return init();
        }

        return FlashMarker(____map, ____markers);
    }

}