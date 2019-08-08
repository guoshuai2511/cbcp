import { CarDivOverlayConstructor } from './CarDivOverlayConstructor.js';
import { SingleDivOverlayConstructor } from './SingleDivOverlayConstructor.js';
import { SingleOutSideOverlayConstructor } from './SingleOutSideOverlayConstructor.js';

export class DrawDevCover {

    static drawDev(devInfo) {
        /* 缓存*/
        let devDivCacheMap = new Map();
        /* 绘制所有设备 */
        devInfo.forEach((eachDevInfo) => {
            /* 获取设备设备编号 */
            let devCode = eachDevInfo.devCode;
            /* 移除上一次的当前设备 */
            if (devDivMap.get(devCode) != null) {
                map.removeOverlay(devDivMap.get(devCode).devCover);
                map.removeOverlay(devDivMap.get(devCode).devIcon);
            }
            /* 获取设备坐标 */
            let lng = eachDevInfo.baiduGpsInfo.lng; // 114
            let lat = eachDevInfo.baiduGpsInfo.lat; // 30
            let baiduPoint = new BMap.Point(lng, lat); // 百度地图坐标
            /* 获取设备是否工作 */
            let status = eachDevInfo.status;
            /* 在地图上显示设备 */
            let cover;
            let devClass;
            switch (eachDevInfo.devType) {
                case 1:
                    devClass = 'car';
                    cover = new CarDivOverlayConstructor(baiduPoint, devCode); // 调用百度地图API，绘制设备
                    map.addOverlay(cover);
                    //cover.hide();
                    break;
                case 2:
                    devClass = 'single';
                    cover = new SingleDivOverlayConstructor(baiduPoint, devCode); // 调用百度地图API，绘制设备
                    map.addOverlay(cover);
                    //cover.hide();
                    break;
                /**add by gaochao start */
                case 3:
                    devClass = 'single';
                    cover = new SingleOutSideOverlayConstructor(baiduPoint, devCode); // 调用百度地图API，绘制设备
                    map.addOverlay(cover);
                    //cover.hide();
                    break;
                /**add by gaochao end*/
                default:
                    devClass = 'null';
                    break;
            }
            /* 获取设备的角度朝向 */
            let deg = eachDevInfo.gpsInfo.northAngle - 90;
            /* 设置设备角度 */
            $('.' + devClass + '-img-' + devCode).css('transform', 'rotate(' + deg + 'deg)');
            /* 设置上一次的GPS信息*/
            devInfoMap.get(devCode).lastGpsInfo = { lng: eachDevInfo.gpsInfo.lng, lat: eachDevInfo.gpsInfo.lat };
            /* 设置上一次的GPS信息*/
            devInfoMap.get(devCode).lastStatus = eachDevInfo.status;
            /* 设置设备详细信息面板是否开启 */
            if (eachDevInfo.isInfoPanelOpen) {
                $('.dev-selecter-circle-' + devCode).css('display', 'block');
                $('.dev-info-panel-' + devCode).css('display', 'block');
            } else {
                $('.dev-selecter-circle-' + devCode).css('display', 'none');
                $('.dev-info-panel-' + devCode).css('display', 'none');
            }
            /* 打开/关闭详细信息框 */
            $('.' + devClass + '-img-' + devCode).click(() => {
                if (!eachDevInfo.isInfoPanelOpen) {
                    $('.dev-selecter-circle-' + devCode).css('display', 'block');
                    $('.dev-info-panel-' + devCode).css('display', 'block');
                    eachDevInfo.isInfoPanelOpen = true;
                } else {
                    $('.dev-selecter-circle-' + devCode).css('display', 'none');
                    $('.dev-info-panel-' + devCode).css('display', 'none');
                    eachDevInfo.isInfoPanelOpen = false;
                }
            });
            $('.dev-info-panel-close-' + devCode).click(() => {
                $('.dev-selecter-circle-' + devCode).css('display', 'none');
                $('.dev-info-panel-' + devCode).css('display', 'none');
                eachDevInfo.isInfoPanelOpen = false;
            });

            /* hover*/
            $('.' + devClass + '-img-' + devCode).hover(function () {
                $('.dev-team-info-' + devCode).css('display', 'block');
            }, function () {
                $('.dev-team-info-' + devCode).css('display', 'none');
            });

            /* 设置设备点聚合所需使用的图标 */
            let icon = new BMap.Marker(
                new BMap.Point(lng, lat),
                { icon: new BMap.Icon("./img/car_0.png", new BMap.Size(0, 0)) }
            );
            /* 移除上一次的点聚合信息 */
            try {
                carMarkerClustererWorking.removeMarker(devDivMap.get(devCode).devIcon);
            } catch (error) { }
            try {
                carMarkerClustererUnwork.removeMarker(devDivMap.get(devCode).devIcon);
            } catch (error) { }
            /* 判断小车是否正在工作 */
            if (status == 1) {
                /* 小车正在工作 */
                carMarkerClustererWorking.addMarker(icon);
            } else {
                /* 小车未工作 */
                carMarkerClustererUnwork.addMarker(icon);
                $('.' + devClass + '-img-' + devCode).css('filter', 'grayscale(100%)'); // 图标置灰
            }
            if (icon.map == null) {
                cover.hide();
            } else {
                cover.show();
            }
            /* 在map集合中保存覆盖物及图标实例 */
            let devDiv = class DevDiv {
                constructor() {
                    this.devCover;
                    this.devIcon;
                }
            }
            devDiv.devCover = cover;
            devDiv.devIcon = icon;
            // 重新保存当前设备覆盖物
            devDivMap.set(devCode, devDiv);
            devDivCacheMap.set(devCode, devDiv);
        });

        devDivMap.forEach((eachDevInfo) => {
            if (eachDevInfo.devIcon.map == null) {
                eachDevInfo.devCover.hide();
            }
        });

    }

}