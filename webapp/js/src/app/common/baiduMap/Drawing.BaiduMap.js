import { BaiduMapDistance } from './Distance.BaiduMap.js'

export class BaiduMapDrawing {

    static initDrawingTools(map) {
        /* 鼠标绘制工具*/
        // 鼠标绘制完成回调方法   获取各个点的经纬度
        let overlays = [];
        let overlaycomplete = function (e) {
            overlays.push(e.overlay);
            if (e.drawingMode == 'marker' && thisPageType == 'RTC') {
                /* 移除上一个*/
                if (overlays.length > 1) {
                    map.removeOverlay(overlays[0]);
                    overlays.splice(0, 1);
                }
                let id = new Date().getTime();
                let devDivHtml = '';
                let isExistCar = false;
                let index = 0;
                devDrawInfoMap.forEach((eachDev) => {
                    if (eachDev.devType == 1) {
                        isExistCar = true;
                    }
                });
                devDrawInfoMap.forEach((eachDev) => {
                    let checked = '';
                    if (isExistCar) {
                        if (eachDev.devType == 1 && index == 0) {
                            checked = 'checked';
                            index = index + 1;
                        }
                    } else {
                        if (index == 0) {
                            checked = 'checked';
                            index = index + 1;
                        }
                    }
                    devDivHtml = devDivHtml + `
                        <div style="position: relative;">
                            <label class="mdui-radio" style="font-weight: 100;">
                                <input class="target-point-radio-${id}" type="radio" data-dev-code="${eachDev.devCode}" name="group1"/ ${checked}>
                                <i class="mdui-radio-icon"></i>
                                ${eachDev.devCode}(${eachDev.userName})
                            </label>
                        </div>
                    `;
                });
                let infoWindowHtml = `
                    <h5>发送可疑目标位置</h5>
                    <div class="target-point-dev-selector-container">
                        <form>
                            ${devDivHtml}
                        </form>
                    </div>
                    <div class="target-point-send-status target-point-send-status-${id}"></div>
                    <button type="button" class="target-point-send target-point-send-${id} btn btn-default" onclick="sendPointToDev(${id})"
                            data-id="${id}" data-lng="${e.overlay.point.lng}" data-lat="${e.overlay.point.lat}">发送</button>
                `;
                let infoWindow = new BMap.InfoWindow(infoWindowHtml);  // 创建信息窗口对象
                e.overlay.openInfoWindow(infoWindow);
                e.overlay.addEventListener('click', function (e) {
                    this.openInfoWindow(infoWindow);
                });
            }
            /**add by gaochao start */
            $('#drawing-clear-last').css('background','url(img/icon/back.png)no-repeat');
            $('#drawing-clear-all').css('background','url(img/icon/clear.png)no-repeat');
            /**add by gaochao end*/
        };
        /**add by gaochao start */
        let overlaycomplete_polygon = function(e){
            $('#drap-polygon').css('background','url(img/icon/polygon.png)');
            $('#drap-polygon').attr('data-is-open', '0');
            overlays.push(e.overlay);
            var path = e.overlay.getPath();//Array<Point> 返回多边型的点数组
            for(var i=0;i<path.length;i++){
                console.log("lng:"+path[i].lng+"\n lat:"+path[i].lat);
            }
            $('#drawing-clear-last').css('background','url(img/icon/back.png)no-repeat');
            $('#drawing-clear-all').css('background','url(img/icon/clear.png)no-repeat');
        };
        /**add by gaochao end*/
        let styleOptions = {
            strokeColor: "rgb(34,121,181)",    //边线颜色。
            fillColor: "rgb(34,121,181)",      //填充颜色。当参数为空时，圆形将没有填充效果。
            strokeWeight: 3,       //边线的宽度，以像素为单位。
            strokeOpacity: 0.8,       //边线透明度，取值范围0 - 1。
            fillOpacity: 0.3,      //填充的透明度，取值范围0 - 1。
            strokeStyle: 'solid' //边线的样式，solid或dashed。
        }

        // 实例化鼠标绘制工具
        let drawingManager = new BMapLib.DrawingManager(map, {
            isOpen: false, //是否开启绘制模式
            enableDrawingTool: false, //是否显示工具栏
            drawingToolOptions: {
                anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
                offset: new BMap.Size(5, 5), //偏离值
            },      
            circleOptions: styleOptions, //圆的样式
            polylineOptions: styleOptions, //线的样式
            polygonOptions: styleOptions, //多边形的样式
            rectangleOptions: styleOptions //矩形的样式

        });
        /**add by gaochao start */
        let drawingManager_polygon = new BMapLib.DrawingManager(map, {
            isOpen: false, //是否开启绘制模式
            enableDrawingTool: false, //是否显示工具栏
            drawingMode:BMAP_DRAWING_POLYGON,//绘制模式  多边形
            drawingToolOptions: {
                anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
                offset: new BMap.Size(5, 5), //偏离值
                drawingModes:[
                    BMAP_DRAWING_POLYGON
                ]
            },
            polygonOptions: styleOptions //多边形的样式
        });
        let drawingManager_circle = new BMapLib.DrawingManager(map, {
            isOpen: false, //是否开启绘制模式
            enableDrawingTool: false, //是否显示工具栏
            drawingMode:BMAP_DRAWING_CIRCLE,//绘制模式  圆
            drawingToolOptions: {
                anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
                offset: new BMap.Size(5, 5), //偏离值
                drawingModes:[
                    BMAP_DRAWING_CIRCLE
                ]
            },
            polygonOptions: styleOptions //多边形的样式
        });
        /**add by gaochao end*/
        map.disableDoubleClickZoom();

        // 添加鼠标绘制工具监听事件，用于获取绘制结果
        drawingManager.addEventListener('overlaycomplete', overlaycomplete);
        /**add by gaochao start */
        drawingManager_polygon.addEventListener('overlaycomplete', overlaycomplete_polygon);
        drawingManager_circle.addEventListener('overlaycomplete', overlaycomplete_polygon);
        /**add by gaochao end*/

        /* 向服务器发送点移除*/
        function removeAndSend(marker) {
            // console.log(marker.getPath());
            // let removeLng = marker.getPosition().lng;
            // let removeLat = marker.getPosition().lat;
            // let RemoveBean = function (devCode, locationType, lng, lat, radius,
            //     status) {
            //     this.devCode = devCode;
            //     this.locationType = locationType;
            //     this.lng = lng;
            //     this.lat = lat;
            //     this.radius = radius;
            //     this.status = status;
            // }
            // $.ajax({
            //     url: '../commandManage/realTimeCombat/sendMsgToDev',
            //     type: 'POST',
            //     async: true,
            //     contentType: "application/json; charset=utf-8",
            //     data: JSON.stringify(new RemoveBean(sentMarkerPointDev, 0, removeLng, removeLat, 0, -1)),
            //     dataType: 'json',
            //     success: function (result) { }
            // });
            map.removeOverlay(marker);
        }

        // 移除单个(撤销)
        $('#drawing-clear-last').click(function () {
            let i = overlays.length;
            if (i > 0) {
                removeAndSend(overlays[i - 1]);
                overlays.length = i - 1;
            }
            /**add by gaochao start */
            if(overlays.length == 0){
                $('#drawing-clear-last').css('background','url(img/icon/back_unclick.png)no-repeat');
                $('#drawing-clear-all').css('background','url(img/icon/clear_unclick.png)no-repeat');
              }
            /**add by gaochao end*/
        });

        // 移除全部
        $('#drawing-clear-all').click(function () {
            if(overlays.length != 0){
            $('#delete-pointmarks-modal').modal('show'); // 打开确认模态框
            }
        });
        $('#drawing-clear-all-ensure').click(function () {
            for (let i = 0; i < overlays.length; i++) {
                removeAndSend(overlays[i]);
            }
            overlays.length = 0;
            $('#delete-pointmarks-modal').modal('hide'); // 关闭确认模态框
            /**add by gaochao start */
            $('#drawing-clear-last').css('background','url(img/icon/back_unclick.png)no-repeat');
            $('#drawing-clear-all').css('background','url(img/icon/clear_unclick.png)no-repeat');
            /**add by gaochao end*/
        });

        // 关闭绘制
        function closeMapDrawing() {
            drawingManager.close();
            drawingManager_polygon.close();
            drawingManager_circle.close();
            $('.drawing-tool-btn').addClass('gray-cover');
            /**add by gaochao start */
            $('#draw-point').css('background','url(img/icon/point.png)');
            $('#drap-polygon').css('background','url(img/icon/polygon.png)');
            $('#drap-circle').css('background','url(img/icon/circle.png)');
            /**add by gaochao end */
            $('#drawing-remove').removeClass('gray-cover');
            $('#draw-point').attr('data-is-open', '0');
            $('#drap-polygon').attr('data-is-open', '0');
            $('#drap-circle').attr('data-is-open', '0');
        }
        $('#drawing-remove').click(function () {
            closeMapDrawing();
            /**add by gaochao start */
            // $('#distance-measurement').addClass('gray-cover');
            $('#distance-measurement').css('background','url(img/icon/rule.png)');
            /**add by gaochao end */        
        });

        // 地图绘制
        $('.drawing-tool-btn').click(function () {
            $('#drawing-remove').addClass('gray-cover');
            $('.drawing-tool-btn').addClass('gray-cover');
            $(this).removeClass('gray-cover');
            drawingManager.setDrawingMode($(this).attr('data-drawing-type')); // 设置模式
            drawingManager.open(); // 打开功能
            map.disableDoubleClickZoom(); // 禁止双击放大
        });
        $('#draw-point').click(function () {
            if ($(this).attr('data-is-open') == 0) {
                $(this).attr('data-is-open', '1');
                $('#draw-point').css('background','url(img/icon/point_active.png)');
                // $(this).removeClass('gray-cover');
                drawingManager.setDrawingMode($(this).attr('data-drawing-type')); // 设置模式
                drawingManager.open(); // 打开功能
                map.disableDoubleClickZoom(); // 禁止双击放大
                $('#drap-polygon').css('background','url(img/icon/polygon.png)');
                $('#drap-circle').css('background','url(img/icon/circle.png)');
                $('#drap-polygon').attr('data-is-open', '0');
                $('#drap-circle').attr('data-is-open', '0');
                drawingManager_polygon.close();
                drawingManager_circle.close();
            } else {
                $(this).attr('data-is-open', '0');
                closeMapDrawing();
            }
        });

        /**add by gaochao start */
        $('#drap-polygon').click(function () {
            if ($(this).attr('data-is-open') == 0) {
                $(this).attr('data-is-open', '1');
                $('#drap-polygon').css('background','url(img/icon/polygon_active.png)');
                // drawingManager_polygon.setDrawingMode($(this).attr('data-drawing-type')); // 设置模式
                drawingManager_polygon.open(); // 打开功能
                map.disableDoubleClickZoom(); // 禁止双击放大
                $('#drap-circle').css('background','url(img/icon/circle.png)');
                $('#drap-circle').attr('data-is-open', '0');
                $('#draw-point').css('background','url(img/icon/point.png)');
                $('#draw-point').attr('data-is-open', '0');
                drawingManager.close();
                drawingManager_circle.close();
            } else {
                $(this).attr('data-is-open', '0');
                closeMapDrawing();
            }
        });

        $('#drap-circle').click(function () {
            if ($(this).attr('data-is-open') == 0) {
                $(this).attr('data-is-open', '1');
                $('#drap-circle').css('background','url(img/icon/circle_active.png)');
                // drawingManager_polygon.setDrawingMode($(this).attr('data-drawing-type')); // 设置模式
                drawingManager_circle.open(); // 打开功能
                map.disableDoubleClickZoom(); // 禁止双击放大
                $('#drap-polygon').css('background','url(img/icon/polygon.png)');
                $('#drap-polygon').attr('data-is-open', '0');
                $('#draw-point').css('background','url(img/icon/point.png)');
                $('#draw-point').attr('data-is-open', '0');
                drawingManager.close();
                drawingManager_polygon.close();
            } else {
                $(this).attr('data-is-open', '0');
                closeMapDrawing();
            }
        });

        /**add by gaochao end */

        /* 添加地图右键点击事件*/
        map.addEventListener("rightclick", function () {
            closeMapDrawing();
            /**add by gaochao start */
            // $('#distance-measurement').addClass('gray-cover');
            $('#distance-measurement').css('background','url(img/icon/rule.png)');
            /**add by gaochao end */
            BaiduMapDistance.getDistanceToolInstance().close();
        });
        
        /* hover事件*/
        /**add by gaochao start */
        // $('#drawing-clear-last, #drawing-clear-all').hover(function () {
        //     $(this).removeClass('gray-cover');
        // }, function () {
        //     $(this).addClass('gray-cover');
        // });
        /**add by gaochao start */
        /*-END鼠标绘制工具-*/

    }

}