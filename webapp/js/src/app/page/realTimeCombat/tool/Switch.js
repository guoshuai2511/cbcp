import { DrawBtsEcharts } from '../overlay/DrawBtsEcharts.js';
/*add by guoshuai */
import { BtsAnalysisOverlayConstructor } from '../overlay/BtsAnalysisOverlayConstructor.js';
import { BtsDivOverlayConstructor } from '../overlay/BtsDivOverlayConstructor.js';
import { BtsSearchOverlayConstructor } from '../overlay/BtsSearchOverlayConstructor.js';
import { DrawDevOverlay } from '../overlay/DrawDevOverlay.js';
import { SingleDivOverlayConstructor } from '../overlay/SingleDivOverlayConstructor.js';
import { GPSToBaiduPoint } from '../../../common/baiduMap/GPSToBaiduPoint.BaiduMap.js';

export class Switch {

    static initSwitch() {
        /**add by gaochao start */
        /**打开/关闭路况信息 */
        let traffic = new BMap.TrafficLayer();        // 创建交通流量图层实例      
        $('#map-traffic-switch').click(function () {
            if ($(this).attr('data-traffic-status') == 0) {
                $(this).css("background", "url(img/icon/traffic_active.png) no-repeat");
                $(this).attr('data-traffic-status', 1);
                map.addTileLayer(traffic);
            } else {
                $(this).css("background", "url(img/icon/traffic.png) no-repeat");
                $(this).attr('data-traffic-status', 0);
                map.removeTileLayer(traffic);
            }
        });

        /**办案与外线切换 */
        $('.group-switch-btn-item').click(function () {
            let groupId = $(this).attr("id");
            $(".group-switch-btn-item").css({
                "color": "rgba(153,153,153,1)",
                "background": "rgba(255,255,255,1)"
            });
            if (groupId == "group-location") {
                $(`#group-location`).css({
                    "color": "#17C1F4",
                    "background": "rgba(7,24,48,1)"
                });
                $('.group-location-container').css('left', '17px');
                $('.group-outside-container').css('left', '-600px');

            } else if (groupId == "group-outside") {
                $(`#group-outside`).css({
                    "color": "#17C1F4",
                    "background": "rgba(7,24,48,1)"
                });
                $('.group-location-container').css('left', '-600px');
                $('.group-outside-container').css('left', '17px');

            }
        });

        /**切换地图图层 */
        let panoramaMap = new BMap.PanoramaCoverageLayer();
        $('.map-typeswich-item').click(function () {
            let mapTypeId = $(this).attr("id");
            $(".map-typeswich-item").css({
                "color": "rgba(153,153,153,1)",
                "background": "rgba(255,255,255,1)"
            });
            if (mapTypeId == "map-type-normal") {
                $(`#map-type-normal`).css({
                    "color": "rgba(255,255,255,1)",
                    "background": "rgba(124,142,168,1)"
                });
                map.setMapType(BMAP_NORMAL_MAP);
                map.removeTileLayer(panoramaMap);
            } else if (mapTypeId == "map-type-satellife") {
                $(`#map-type-satellife`).css({
                    "color": "rgba(255,255,255,1)",
                    "background": "rgba(124,142,168,1)"
                });
                map.setMapType(BMAP_SATELLITE_MAP);
                map.removeTileLayer(panoramaMap);
            } else if (mapTypeId == "map-type-panorama") {
                $(`#map-type-panorama`).css({
                    "color": "rgba(255,255,255,1)",
                    "background": "rgba(124,142,168,1)"
                });
                map.setMapType(BMAP_NORMAL_MAP);
                map.addTileLayer(panoramaMap);
            }
        });

        /**锁定按钮 */
        // $('.view-lock-btn').click(function () {
        //     // console.log($('.view-lock-btn').attr("data-status"));
        //     // console.log(mapFollowFlag);
        //     // if ($('.view-lock-btn').attr("data-status") == 0) {
        //     $('.view-lock-btn div').css("background", "url(img/icon/location_active.png)no-repeat");
        //     // $('.view-lock-btn').attr("data-status", 1)
        //     mapFollowFlag = true;
        //     // } else {
        //     // $('.view-lock-btn div').css("background", "url(img/icon/location.png)no-repeat");
        //     //     $('.view-lock-btn').attr("data-status", 0)
        //     //     mapFollowFlag = false;
        //     // }
        // });
        /**地图拖动后视角不锁定 */
        map.addEventListener("dragend", function () {
            mapFollowFlag = false;
            $('.view-lock-btn div').css("background", "url(img/icon/location.png)no-repeat");
        });

        /**滚轮缩放地图层级 */
        map.addEventListener("zoomend", function () {
            if (map.getZoom() == 3) {
                $('.view-narrow-btn').attr("data-status", 0);
                $('.view-narrow-btn div').css("background", "url(img/icon/zoomout.png)no-repeat");
            } else if (map.getZoom() == 19) {
                $('.view-enlarge-btn').attr("data-status", 0);
                $('.view-enlarge-btn div').css("background", "url(img/icon/zoomin.png)no-repeat");
            } else {
                $('.view-enlarge-btn div').css("background", "url(img/icon/zoomin_active.png)no-repeat");
                $('.view-narrow-btn div').css("background", "url(img/icon/zoomout_active.png)no-repeat");
            }
        });

        /**地图缩/放按钮 */
        $('.view-narrow-btn').click(function () {
            map.zoomOut();
            if ($('.view-enlarge-btn').attr("data-status") == 0) {
                $('.view-enlarge-btn div').css("background", "url(img/icon/zoomin_active.png)no-repeat");
            }
            if (map.getZoom() == 3) {
                $('.view-narrow-btn').attr("data-status", 0);
                $('.view-narrow-btn div').css("background", "url(img/icon/zoomout.png)no-repeat");
            }
        });
        $('.view-enlarge-btn').click(function () {
            map.zoomIn();
            if ($('.view-narrow-btn').attr("data-status") == 0) {
                $('.view-narrow-btn div').css("background", "url(img/icon/zoomout_active.png)no-repeat");
            }
            if (map.getZoom() == 19) {
                $('.view-enlarge-btn').attr("data-status", 0);
                $('.view-enlarge-btn div').css("background", "url(img/icon/zoomin.png)no-repeat");
            }
        });
        /**声音开关 */
        $(document).on("click", ".group-location-voice", function () {
            let thisCode = $(this).attr("data-code");
            if ($(`#group-location-voice-${thisCode}`).attr("data-status") == 1) {
                $(`#group-location-voice-${thisCode}`).css("background", "url(img/icon/voice_none.png)");
                $(`#group-location-voice-${thisCode}`).attr("data-status", 0);
                voiceDevCode[thisCode] = 0;
                // console.log(voiceDevCode);

            } else {
                $(`#group-location-voice-${thisCode}`).css("background", "url(img/icon/voice.png)");
                $(`#group-location-voice-${thisCode}`).attr("data-status", 1);
                voiceDevCode[thisCode] = 1;
                // console.log(voiceDevCode);

            }
            return false;
        });

        $(document).on("click", ".right-chat-control-btn", function () {
            if ($(this).attr('data-status') == "left") {
                $(this).attr('data-status', "right");
                $(this).removeClass('contril-btn-right');
                $(this).addClass('contril-btn-left');
                $('.right-tools-container').removeClass('right-tools-container-right');
                $('.right-tools-container').addClass('right-tools-container-left');
                $('.right-chat-container').removeClass('right-chat-container-right');
                $('.right-chat-container').addClass('right-chat-container-left');
                $('.right-chat-container').css('display', 'none');
            } else if ($(this).attr('data-status') == "right") {
                $(this).attr('data-status', "left");
                $(this).removeClass('contril-btn-left');
                $(this).addClass('contril-btn-right');
                $('.right-tools-container').removeClass('right-tools-container-left');
                $('.right-tools-container').addClass('right-tools-container-right');
                $('.right-chat-container').removeClass('right-chat-container-left');
                $('.right-chat-container').addClass('right-chat-container-right');
                $('.right-chat-container').css('display', 'block');
            }
        });

        /* 高级面板设备切换*/
        $(document).on('click', '.advance-info-dropdown-toggle-content-item', function () {
            let selectedDevCode = $(this).attr('data-dev-code');
            $(`.advance-info-time`).css('display', 'none');
            $(`.advance-info-time-${selectedDevCode}`).css('display', 'block');
            $('.advance-info-content-container').css('display', 'none');
            $(`.advance-info-content-container-${selectedDevCode}-${analysisModeNow}`).css('display', 'block');
            $('.advance-info-dropdown-toggle-container').html(`
                <div class="advance-info-dropdown-toggle">${selectedDevCode}(${devDrawInfoMap.get(selectedDevCode).realName})</div>
                <div class="advance-info-dropdown-toggle-icon"></div>
            `);
            analysisDevCodeNow = `${selectedDevCode}`;
        });

        $(document).on('click', '.advance-info-modetype-btn', function () {
            let selectedMode = $(this).attr('data-mode');
            $('.advance-info-modetype-btn').css('background', '#fff');
            $('.advance-info-modetype-btn').css('color', '#2A8CFF');
            $('.advance-info-modetype-btn').css('border', '1px solid #2A8CFF');
            $(`#advance-info-modetype-btn-${selectedMode}`).css('background', '#2A8CFF');
            $(`#advance-info-modetype-btn-${selectedMode}`).css('color', '#fff');
            $(`#advance-info-modetype-btn-${selectedMode}`).css('border', '1px solid #2A8CFF');
            $('.advance-info-content-container').css('display', 'none');
            $(`.advance-info-content-container-${analysisDevCodeNow}-${selectedMode}`).css('display', 'block');
            analysisModeNow = `${selectedMode}`;
        });


        /**add by gaochao end */
        /* 打开/关闭目标标记 */
        $('#end-marker-view-switch').click(function () {
            if ($(this).attr('end-marker-view-status') == 0) {
                /* 打开设备轨迹显示*/
                // $(this).removeClass('gray-cover');
                $(this).css("background", "url(img/icon/endMarker_active.png)no-repeat");
                $(this).attr('end-marker-view-status', 1);
                if (endPoint != null) {
                    endMarker.show();
                    map.setCenter(endPoint);
                    map.setZoom(map.getZoom() - 1);
                    map.setZoom(map.getZoom() + 1);
                }
            } else {
                /* 关闭设备轨迹显示*/
                // $(this).addClass('gray-cover');
                $(this).css("background", "url(img/icon/endMarker.png)no-repeat");
                $(this).attr('end-marker-view-status', 0);
                if (endPoint != null) {
                    endMarker.hide();
                }
            }
        });

        /* 打开/关闭目标标记 */
        $('#vehicle-marker-view-switch').click(function () {
            if ($(this).attr('vehicle-marker-view-status') == 0) {
                /* 打开设备轨迹显示*/
                // $(this).removeClass('gray-cover');
                $(this).css("background", "url(img/icon/vehicle_active.png)no-repeat");
                $(this).attr('vehicle-marker-view-status', 1);
                if (vehicleMarkerCache.size > 0) {
                    for (let value of vehicleMarkerCache.values()) {
                        value.show();
                    }
                }
            } else {
                /* 关闭设备轨迹显示*/
                // $(this).addClass('gray-cover');
                $(this).css("background", "url(img/icon/vehicle.png)no-repeat");
                $(this).attr('vehicle-marker-view-status', 0);
                if (vehicleMarkerCache.size > 0) {
                    for (let value of vehicleMarkerCache.values()) {
                        value.hide();
                    }
                }
            }
        });
        /* 打开/关闭设备轨迹线 */
        $('#dev-route-line-switch').click(function () {
            if ($(this).attr('data-dev-route-line-status') == 0) {
                /* 打开设备轨迹显示*/
                // $(this).removeClass('gray-cover');
                $(this).css("background", "url(img/icon/car_load_active.png)no-repeat");
                $(this).attr('data-dev-route-line-status', 1);
                lineOverlayMap.isShow = true;
                lineOverlayMap.line.forEach((eachLine) => {
                    for (let i = 0; i < eachLine.line.length; i++) {
                        eachLine.line[i].show();
                    }
                    for (let i = 0; i < eachLine.tempLine.length; i++) {
                        eachLine.tempLine[i].show();
                    }
                });
            } else {
                /* 关闭设备轨迹显示*/
                // $(this).addClass('gray-cover');
                $(this).css("background", "url(img/icon/car_load.png)no-repeat");
                $(this).attr('data-dev-route-line-status', 0);
                lineOverlayMap.isShow = false;
                lineOverlayMap.line.forEach((eachLine) => {
                    for (let i = 0; i < eachLine.line.length; i++) {
                        eachLine.line[i].hide();
                    }
                    for (let i = 0; i < eachLine.tempLine.length; i++) {
                        eachLine.tempLine[i].hide();
                    }
                });
            }
        });

        /* 打开/关闭能量轨迹 */
        $('#eng-orientation-switch').click(function () {
            if ($(this).attr('data-eng-orientation-status') == 0) {
                /* 打开能量轨迹显示 */
                /**edit by gaochao start */
                // $('.energy-scale').css('display', 'block');
                $('.view-color-container').css('display', 'block');
                /**edit by gaochao start */
                // $(this).removeClass('gray-cover');
                $(this).css("background", "url(img/icon/eng_load_active.png)no-repeat");
                $(this).attr('data-eng-orientation-status', 1);
                carEngOrientationArray.isShow = true;
                for (let i = 0; i < carEngOrientationArray.overlay.length; i++) {
                    carEngOrientationArray.overlay[i].overlay.show();
                }
                singleEngOrientationArray.isShow = true;
                for (let i = 0; i < singleEngOrientationArray.overlay.length; i++) {
                    singleEngOrientationArray.overlay[i].overlay.show();
                }
            } else {
                /* 关闭能量轨迹显示 */
                /**edit by gaochao start */
                $('.energy-scale').css('display', 'none');
                $('.view-color-container').css('display', 'none');
                /**edit by gaochao start */
                // $(this).addClass('gray-cover');
                $(this).css("background", "url(img/icon/eng_load.png)no-repeat");
                $(this).attr('data-eng-orientation-status', 0);
                carEngOrientationArray.isShow = false;
                for (let i = 0; i < carEngOrientationArray.overlay.length; i++) {
                    carEngOrientationArray.overlay[i].overlay.hide();
                }
                singleEngOrientationArray.isShow = false;
                for (let i = 0; i < singleEngOrientationArray.overlay.length; i++) {
                    singleEngOrientationArray.overlay[i].overlay.hide();
                }
            }
        });

        /* 打开/关闭主动式轨迹 */
        $('#passive-route-line-switch').click(function () {
            if ($(this).attr('data-switch-close') == 1) {
                if ($(this).attr('data-passive-route-line-status') == 0) {
                    /* 打开主动式轨迹显示*/
                    // $(this).removeClass('gray-cover');
                    $(this).css("background", "url(img/icon/active_load_avtive.png)no-repeat");
                    $(this).attr('data-passive-route-line-status', 1);
                    linePassive.isShow = true;
                    for (let i = 0; i < linePassive.line.length; i++) {
                        linePassive.line[i].show();
                    }
                    for (let i = 0; i < linePassive.overlay.length; i++) {
                        linePassive.overlay[i].show();
                    }
                } else {
                    /* 关闭主动式轨迹显示*/
                    // $(this).addClass('gray-cover');
                    $(this).css("background", "url(img/icon/active_load.png)no-repeat");
                    $(this).attr('data-passive-route-line-status', 0);
                    linePassive.isShow = false;
                    for (let i = 0; i < linePassive.line.length; i++) {
                        linePassive.line[i].hide();
                    }
                    for (let i = 0; i < linePassive.overlay.length; i++) {
                        linePassive.overlay[i].hide();
                    }
                }
            }
        });

        /* 打开/关闭基站信息*/
        $('#bts-show-switch').click(function () {
            if ($(this).attr('data-bts-show-status') == 0) {
                isBtsOpen = true;
                /* 打开基站显示 */
                // $(this).removeClass('gray-cover');
                $(this).css("background", "url(img/icon/bts_icon_active.png)no-repeat");
                $(this).attr('data-bts-show-status', 1);
                btsDivMap.forEach((eachBtsDiv) => {
                    eachBtsDiv.btsCover.show();
                });
                //targetCellLineCache.show();
                /* 显示基站特效*/
                if (hitedBtsCache.btsId != null && isBtsOpen) {
                    DrawBtsEcharts.showBtsStyleCSS(hitedBtsCache);
                }
                /* 打开基站解析*/
                for (let i = 0; i < btsAnalysisOverlayCache.length; i++) {
                    btsAnalysisOverlayCache[i].show();
                }
            } else {
                isBtsOpen = false;
                /* 关闭基站显示 */
                // $(this).addClass('gray-cover');
                $(this).css("background", "url(img/icon/bts_icon.png)no-repeat");
                $(this).attr('data-bts-show-status', 0);
                btsDivMap.forEach((eachBtsDiv) => {
                    eachBtsDiv.btsCover.hide();
                });
                //targetCellLineCache.hide();
                /* 关闭基站特效*/
                // if (flashMarkerInterval != null) {
                //     /* 清除定时器*/
                //     clearInterval(flashMarkerInterval);
                //     flashMarkerInterval = null;
                //     /* 清除canvas*/
                //     $('.bts-hit-canvas').remove();
                // }
                if (btsHitEffectionCover != null) {
                    map.removeOverlay(btsHitEffectionCover);
                }
                /* 关闭基站解析*/
                for (let i = 0; i < btsAnalysisOverlayCache.length; i++) {
                    btsAnalysisOverlayCache[i].hide();
                }
            }
        });

        /* 打开/关闭 TA产品化绘图*/
        $('#ta-prod-show-switch').click(function () {
            if ($(this).attr('data-ta-prod-show-status') == 0) {
                isTaDrawProdOpen = true;
                /* 打开产品化绘图显示 */
                // $(this).removeClass('gray-cover');
                $(this).css("background", "url(img/icon/ta_pro_active.png)no-repeat");
                $(this).attr('data-ta-prod-show-status', 1);
                /* 打开产品化绘图*/
                for (let i = 0; i < taCircleProdOverlayCache.length; i++) {
                    taCircleProdOverlayCache[i].show();
                }
                for (let i = 0; i < taPointsProdOverlayCache.length; i++) {
                    taPointsProdOverlayCache[i].show();
                }
                for (let i = 0; i < taPolygonProdOverlayCache.length; i++) {
                    taPolygonProdOverlayCache[i].show();
                }
            } else {
                isTaDrawProdOpen = false;
                /* 关闭产品化绘图显示 */
                // $(this).addClass('gray-cover');
                $(this).css("background", "url(img/icon/ta_pro.png)no-repeat");
                $(this).attr('data-ta-prod-show-status', 0);
                /* 关闭产品化绘图*/
                for (let i = 0; i < taCircleProdOverlayCache.length; i++) {
                    taCircleProdOverlayCache[i].hide();
                }
                for (let i = 0; i < taPointsProdOverlayCache.length; i++) {
                    taPointsProdOverlayCache[i].hide();
                }
                for (let i = 0; i < taPolygonProdOverlayCache.length; i++) {
                    taPolygonProdOverlayCache[i].hide();
                }
            }
        });
        /* 打开/关闭 TA调试绘图*/
        $('#ta-debug-show-switch').click(function () {
            if ($(this).attr('data-ta-debug-show-status') == 0) {
                isTaDrawDebugOpen = true;
                /* 打开产品化绘图显示 */
                // $(this).removeClass('gray-cover');
                $(this).css("background", "url(img/icon/ta_debug_active.png)no-repeat");
                $(this).attr('data-ta-debug-show-status', 1);
                /* 打开产品化绘图*/
                for (let i = 0; i < taCircleDebugOverlayCache.length; i++) {
                    taCircleDebugOverlayCache[i].show();
                }
                for (let i = 0; i < taPointsDebugOverlayCache.length; i++) {
                    taPointsDebugOverlayCache[i].show();
                }
                for (let i = 0; i < taPolygonDebugOverlayCache.length; i++) {
                    taPolygonDebugOverlayCache[i].show();
                }
            } else {
                isTaDrawDebugOpen = false;
                /* 关闭产品化绘图显示 */
                // $(this).addClass('gray-cover');
                $(this).css("background", "url(img/icon/ta_debug.png)no-repeat");
                $(this).attr('data-ta-debug-show-status', 0);
                /* 关闭产品化绘图*/
                for (let i = 0; i < taCircleDebugOverlayCache.length; i++) {
                    taCircleDebugOverlayCache[i].hide();
                }
                for (let i = 0; i < taPointsDebugOverlayCache.length; i++) {
                    taPointsDebugOverlayCache[i].hide();
                }
                for (let i = 0; i < taPolygonDebugOverlayCache.length; i++) {
                    taPolygonDebugOverlayCache[i].hide();
                }
            }
        });
        /* 语音模式切换*/
        $('#eng-audio-selector').click(function () {
            if (!$(this).hasClass('gray-cover')) {
                if ($('.eng-audio-selector-menu').css('display') == 'none') {
                    /* 打开语音模式选择面板*/
                    $('.eng-audio-selector-menu').css('display', 'block');
                } else {
                    /* 关闭语音模式选择面板*/
                    $('.eng-audio-selector-menu').css('display', 'none');
                }
            }
        });
        $('.eng-audio-selector-item').click(function () {
            switch (Number($(this).attr('data-audio-type'))) {
                case 1:
                    engAudioType = 1;
                    if (thisPageType == 'CR') {
                        engAudioTypeCache = 1;
                    }
                    $('#eng-audio-selector').css('background-position', '-200px -40px');
                    break;
                case 2:
                    engAudioType = 2;
                    if (thisPageType == 'CR') {
                        engAudioTypeCache = 2;
                    }
                    $('#eng-audio-selector').css('background-position', '-240px -40px');
                    break;
                case 3:
                    engAudioType = 3;
                    if (thisPageType == 'CR') {
                        engAudioTypeCache = 3;
                    }
                    $('#eng-audio-selector').css('background-position', '-160px -40px');
                    break;
                default:
                    break;
            }
            $('.eng-audio-selector-menu').css('display', 'none');
        });

        //基站查询模态框
        $('#bts-search').click(function () {
            $('#paste_btsId').val('');
            $('#source-networkType').html('源1')
            $('#source-networkType2').html('源1');
       /*      $('#classic_mode_input').attr('checked', 'checked');
            $('#paste_mode_input').removeAttr('checked');
            $('.search_bts_classic_mode').css('display','block');
            $('.search_bts_paste_mode').css('display','none'); */
            $('.no-cdma-lac-tac').val('');
            $('.no-cdma-ci').val('');
            $('.cdma-sid').val('');
            $('.cdma-nid').val('');
            $('.cdma-bid').val('');
            $('.isTrue').html('');
            $('#cdma').hide();
            $('#no-cdma').show();
            operator = "中国移动";
            networkType = 'LTE';
            $('#mob-netWork').show();
            $('#uni-netWork').hide();
            $('#tel-netWork').hide();
            $('#mncType').html(operator);
            $('#mob-networkType').html(networkType);

            $('#ten-lac-tac').show();
            $('#ten-ci').show();
            $('#ten-sid').show();
            $('#ten-nid').show();
            $('#ten-bid').show();
            $('#sixteen-lac-tac').hide();
            $('#sixteen-ci').hide();
            $('#sixteen-sid').hide();
            $('#sixteen-nid').hide();
            $('#sixteen-bid').hide();
            $('#ten-binary-system').attr('checked', 'checked');
            $('#sixteen-binary-system').removeAttr('checked');
        });

        let operator = "中国移动";
        let networkType = 'LTE';

        /*网络运营商选择*/
        $(document).on('click', '.mnc-selector', function () {
            $('#mncType').html($(this).html());
            operator = $('#mncType').html();
            if (operator == "中国移动") {
                $('#mob-networkType').html('LTE');
                $('#mob-netWork').show();
                $('#uni-netWork').hide();
                $('#tel-netWork').hide();
                $('#cdma').hide();
                $('#no-cdma').show();
            } else if (operator == "中国联通") {
                $('#uni-networkType').html('LTE');
                $('#uni-netWork').show();
                $('#mob-netWork').hide();
                $('#tel-netWork').hide();
                $('#cdma').hide();
                $('#no-cdma').show();
            } else if (operator == "中国电信") {
                $('#tel-networkType').html('LTE');
                $('#tel-netWork').show();
                $('#uni-netWork').hide();
                $('#mob-netWork').hide();
                $('#cdma').hide();
                $('#no-cdma').show();
            }
        });
        /*中国移动网络制式选择*/
        $(document).on('click', '.mob-network-selector', function () {
            $('#mob-networkType').html($(this).html());
            networkType = $('#mob-networkType').html();
            console.log(networkType);
            $('#cdma').hide();
            $('#no-cdma').show();
            $('.isTrue').html('');
        });
        /*中国联通网络制式选择*/
        $(document).on('click', '.uni-network-selector', function () {
            $('#uni-networkType').html($(this).html());
            networkType = $('#uni-networkType').html();
            console.log(networkType);
            $('#cdma').hide();
            $('#no-cdma').show();
            $('.isTrue').html('');
        });
        /*中国电信网络制式选择*/
        $(document).on('click', '.tel-network-selector', function () {
            $('#tel-networkType').html($(this).html());
            networkType = $('#tel-networkType').html();
            if (operator == "中国电信" && networkType == 'CDMA') {
                $('#cdma').show();
                $('#no-cdma').hide();
            } else {
                $('#cdma').hide();
                $('#no-cdma').show();
            }
            $('.isTrue').html('');
        });

        function removeNUll(val) {
            if (val == '') {
                return null;
            } else {
                return val;
            }
        }

        //请求操作
        function geographic(data, mcc, mnc, netWork, lacNum, ciNum, bidNum, sidNum, nidNum) {
            $.ajax({
                url: 'commandManage/api/getBtsInfo',
                type: 'POST',
                async: true,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data),
                dataType: 'json',
                success: function (result) {
                    console.log(result);
                    let addressData = $.parseJSON(result.dataMap.btsInfo);
                    if (addressData.bts) {
                        let lat = addressData.bts.lat;
                        let lng = addressData.bts.lng;
                        //坐标转换
                        let currentPoint = GPSToBaiduPoint.getBaiduPointLocation([[lng, lat]])[0];
                        let point = new BMap.Point(currentPoint.lng, currentPoint.lat);
                        let mode = netWork;
                        let sid = removeNUll(sidNum);
                        let nid = removeNUll(nidNum);
                        let bid = removeNUll(bidNum);
                        let lacTac = removeNUll(lacNum);
                        let radius = addressData.bts.radius;
                        let cellId = removeNUll(ciNum);
                        let btsId = addressData.bts.bts_id;

                        let cover = new BtsSearchOverlayConstructor(point, mcc, mnc, mode, sid, nid, bid, lacTac, radius, cellId, btsId);
                        map.addOverlay(cover);

                        /* 存储绘制结果*/
                        let btsSearchDiv = function () {
                            this.btsCover;
                            this.btsRadius;
                            this.btsRangeCircle;
                            this.lat;
                            this.lng;
                        }
                        btsSearchDiv.lat = lat;
                        btsSearchDiv.lng = lng;
                        btsSearchDiv.btsCover = cover;
                        btsSearchDiv.btsRadius = radius;
                        btsSearchDivMap.set(btsId, btsSearchDiv);
                        map.centerAndZoom(new BMap.Point(lng, lat), 16);
                    } else {
                        $('#alert-modal').modal('show');
                        $('#alert-modal-content').html('未查询到该基站位置');
                    }
                },
                error: function (xhr, textStatus) {
                    $('#alert-modal').modal('show');
                    $('#alert-modal-content').html('输入信息错误');
                    console.log('错误');
                    console.log(xhr);
                    console.log(textStatus);
                },
            });
        }
        /* 只允许输入数字*/
        $(document).on('keyup blur', '.input-num-only', function () {
            this.value = this.value.replace(/[^\d]/g, '');
        });
        /* 只允许输入数字和字母*/
        $(document).on('keyup blur', '.input-num-word', function () {
            //this.value = this.value.replace(/[^\w\.\/]/g, '');
            this.value = this.value.replace(/[^0-9a-fA-F\n]/g, '');
        });

        /* 禁止输入空格*/
        $(document).on('keyup blur', '.input-space-forbidden', function () {
            this.value = this.value.replace(/\s/g, '');
        });

        //数字输入超出或者低于最低值
        $(document).on('blur', '#ten-lac-tac', function () {
            if (this.value > 65535) {
                $('#is-lacTac-true').html(`<span class="text-red">输入数字不能大于65535</span>`);
            } else if (this.value < 1) {
                $('#is-lacTac-true').html(`<span class="text-red">输入数字不能小于1</span>`);
            } else {
                $('#is-lacTac-true').html('');
            }
        });

        $(document).on('blur', '#sixteen-lac-tac', function () {
            if (parseInt(this.value, 16) > 65535) {
                $('#is-lacTac-true').html(`<span class="text-red">输入数字不能大于FFFF</span>`);
            } else if (this.value < 1) {
                $('#is-lacTac-true').html(`<span class="text-red">输入数字不能小于1</span>`);
            } else {
                $('#is-lacTac-true').html('');
            }
        });

        $(document).on('blur', '#ten-ci', function () {
            if (this.value > 268435455) {
                $('#is-ci-true').html(`<span class="text-red">输入数字大于268435455</span>`);
            } else if (this.value < 1) {
                $('#is-ci-true').html(`<span class="text-red">输入数字不能小于1</span>`);
            } else {
                $('#is-ci-true').html('');
            }
        });
        $(document).on('blur', '#sixteen-ci', function () {
            if (parseInt(this.value, 16) > 268435455) {
                $('#is-ci-true').html(`<span class="text-red">输入数字的大于FFFFFFF</span>`);
            } else if (this.value < 1) {
                $('#is-ci-true').html(`<span class="text-red">输入数字不能小于1</span>`);
            } else {
                $('#is-ci-true').html('');
            }
        });

        $(document).on('blur', '#ten-sid', function () {
            if (this.value > 32767) {
                $('#is-sid-true').html(`<span class="text-red">输入数字不能大于32767</span>`);
            } else if (this.value == "") {
                $('#is-sid-true').html(`<span class="text-red">不能为空</span>`);
            } else if (this.value < 0) {
                $('#is-sid-true').html(`<span class="text-red">输入数字不能小于0</span>`);
            } else {
                $('#is-sid-true').html('');
            }
        });
        $(document).on('blur', '#sixteen-sid', function () {
            if (parseInt(this.value, 16) > 32767) {
                $('#is-sid-true').html(`<span class="text-red">输入数字不能大于7F73</span>`);
            } else if (this.value == "") {
                $('#is-sid-true').html(`<span class="text-red">不能为空</span>`);
            } else if (this.value < 0) {
                $('#is-sid-true').html(`<span class="text-red">输入数字不能小于0</span>`);
            } else {
                $('#is-sid-true').html('');
            }
        });

        $(document).on('blur', '#ten-bid', function () {
            if (this.value > 65535) {
                $('#is-bid-true').html(`<span class="text-red">输入数字不能大于65535</span>`);
            } else if (this.value == "") {
                $('#is-bid-true').html(`<span class="text-red">不能为空</span>`);
            } else if (this.value < 1) {
                $('#is-bid-true').html(`<span class="text-red">输入数字不能小于1</span>`);
            } else {
                $('#is-bid-true').html('');
            }
        });
        $(document).on('blur', '#sixteen-bid', function () {
            if (parseInt(this.value, 16) > 65535) {
                $('#is-bid-true').html(`<span class="text-red">输入数字不能大于FFFF</span>`);
            } else if (this.value == "") {
                $('#is-bid-true').html(`<span class="text-red">不能为空</span>`);
            } else if (this.value < 1) {
                $('#is-bid-true').html(`<span class="text-red">输入数字不能小于1</span>`);
            } else {
                $('#is-bid-true').html('');
            }
        });

        $(document).on('blur', '#ten-nid', function () {
            if (this.value > 65535) {
                $('#is-nid-true').html(`<span class="text-red">输入数字不能大于65535</span>`);
            } else if (this.value < 0) {
                $('#is-nid-true').html(`<span class="text-red">输入数字不能小于0</span>`);
            } else if (this.value == "") {
                $('#is-nid-true').html(`<span class="text-red">不能为空</span>`);
            } else {
                $('#is-nid-true').html('');
            }
        });
        $(document).on('blur', '#sixteen-nid', function () {
            if (parseInt(this.value, 16) > 65535) {
                $('#is-nid-true').html(`<span class="text-red">输入数字不能大于FFFF</span>`);
            } else if (this.value < 0) {
                $('#is-nid-true').html(`<span class="text-red">输入数字不能小于0</span>`);
            } else if (this.value == "") {
                $('#is-nid-true').html(`<span class="text-red">不能为空</span>`);
            } else {
                $('#is-nid-true').html('');
            }
        });

        //定义无为参数
        let lacNum;
        let ciNum;
        let sidNum;
        let nidNum;
        let bidNum;

        //进制选择;
        $('#sixteen-radio').click(function () {
            $('#ten-lac-tac').hide();
            $('#ten-ci').hide();
            $('#ten-sid').hide();
            $('#ten-nid').hide();
            $('#ten-bid').hide();
            $('#sixteen-lac-tac').show();
            $('#sixteen-ci').show();
            $('#sixteen-sid').show();
            $('#sixteen-nid').show();
            $('#sixteen-bid').show();
            $('#ten-binary-system').removeAttr('checked');
            $('#sixteen-binary-system').attr('checked', 'checked');
            lacNum = isNaN($('#sixteen-lac-tac').val());
            ciNum = isNaN($('#sixteen-ci').val());
            sidNum = isNaN($('#sixteen-sid').val());
            nidNum = isNaN($('#sixteen-nid').val());
            bidNum = isNaN($('#ten-bid').val());
        });
        $('#ten-radio').click(function () {
            $('#ten-lac-tac').show();
            $('#ten-ci').show();
            $('#ten-sid').show();
            $('#ten-nid').show();
            $('#ten-bid').show();
            $('#sixteen-lac-tac').hide();
            $('#sixteen-ci').hide();
            $('#sixteen-sid').hide();
            $('#sixteen-nid').hide();
            $('#sixteen-bid').hide();
            $('#ten-binary-system').attr('checked', 'checked');
            $('#sixteen-binary-system').removeAttr('checked');
            lacNum = $('#ten-lac-tac').val()
            ciNum = $('#ten-ci').val();
            sidNum = $('#ten-sid').val();
            nidNum = $('#ten-nid').val();
            bidNum = $('#ten-bid').val();
        });

        //放空操作
        function isNaN(val) {
            if (val == '') {
                return val;
            } else {
                return parseInt(val, 16);
            }
        }
        
        //限制复制基站输入为空
        $(document).on('blur', '#paste_btsId', function(){
            if($(this).val() == ''){
                $('#is-paste_btsId-true').html(`<span class="text-red">请输入基站ID</span>`);
            }else{
                $('#is-paste_btsId-true').html(``);
            }   
        })
        //来源选择
        let source1 = 1;
        let source2 = 1;
        $(document).on('click', '.source-network-selector', function () {
            $('#source-networkType').html($(this).html());
            if($(this).html() == '源1'){
                source1 = 1;
            }else if($(this).html() == '源2'){
                source1 = 2;
            }else if($(this).html() == '源3'){
                source1 = 3;
            }
        });

        $(document).on('click', '.source-network-selector-2', function () {
            $('#source-networkType2').html($(this).html());
            if($(this).html() == '源1'){
                source2 = 1;
            }else if($(this).html() == '源2'){
                source2 = 2;
            }else if($(this).html() == '源3'){
                source2 = 3;
            }
        });

        //选取粘贴模式下基站类型
        $(document).on('click', '.paste-network-selector', function () {
            $('#paste-networkType').html($(this).html());
        });

        //基站查询
        $(document).on('click', '#bts-search-ensure', function () {
            if($('.search_bts_classic_mode').css('display') == 'block'){
                let mcc = 460;
                let netWork; //网络制式
                let mnc; //网络运营商类型
                let num;
                let params;

                if (operator == '中国移动') {
                    mnc = '0'
                } else if (operator == '中国联通') {
                    mnc = '1';
                } else if (operator == '中国电信') {
                    mnc = '3';
                }

                //十进制情况;
                if ($('#ten-binary-system').attr('checked') == 'checked') {
                    lacNum = $('#ten-lac-tac').val();
                    ciNum = $('#ten-ci').val();
                    sidNum = $('#ten-sid').val();
                    nidNum = $('#ten-nid').val();
                    bidNum = $('#ten-bid').val();
                    if (networkType == "CDMA") {
                        num = 460 + '-' + mnc + '-' + sidNum + '-' + nidNum + '-' + bidNum;
                    } else {
                        num = 460 + '-' + mnc + '-' + lacNum + '-' + ciNum;
                    }
                } else {
                    lacNum = isNaN($('#sixteen-lac-tac').val());
                    ciNum = isNaN($('#sixteen-ci').val());
                    sidNum = isNaN($('#sixteen-sid').val());
                    nidNum = isNaN($('#sixteen-nid').val());
                    bidNum = isNaN($('#sixteen-bid').val());
                    if (networkType == "CDMA") {
                        num = 460 + '-' + mnc + '-' + sidNum + '-' + nidNum + '-' + bidNum;
                    } else {
                        num = 460 + '-' + mnc + '-' + lacNum + '-' + ciNum;
                    }
                }
                //网络制式
                if (networkType == "WCDMA") {
                    netWork = 'wcdma';
                } else if (networkType == "LTE") {
                    netWork = 'lte';
                }
                else if (networkType == "CDMA") {
                    netWork = 'cdma';
                }
                else if (networkType == "GSM") {
                    netWork = 'gsm';
                }

                params = netWork + ',' + num + ',' + source1;

                let data = { "param": params };

                if (networkType == "CDMA") {
                    if (($('#ten-sid').val() != '' || $('#sixteen-sid').val() != '') && ($('#ten-bid').val() != '' || $('#sixteen-bid').val() != '') && ($('#ten-nid').val() != '' || $('#sixteen-nid').val() != '') && $('.isTrue').html() == '') {
                        if (btsSearchDivMap.size != 0) {

                            if (btsSearchDivMap.get(num) != undefined) {
                                $('#alert-modal').modal('show');
                                $('#alert-modal-content').html('已查询到该基站位置');
                            } else {
                                geographic(data, mcc, mnc, netWork, lacNum, ciNum, bidNum, sidNum, nidNum);
                            }

                        } else {
                            geographic(data, mcc, mnc, netWork, lacNum, ciNum, bidNum, sidNum, nidNum);
                        }
                    } else {
                    }
                } else {
                    if (($('#ten-lac-tac').val() != '' || $('#sixteen-lac-tac').val() != '') && ($('#ten-ci').val() != '' || $('#sixteen-ci').val() != '') && $('.isTrue').html() == '') {
                        /* geographic(data,mcc,mnc,netWork,lacNum,ciNum,bidNum,sidNum,nidNum);
                        $('#bts-search-modal').modal('hide'); */
                        if (btsSearchDivMap.size != 0) {
                            if (btsSearchDivMap.get(num) != undefined) {
                                $('#alert-modal').modal('show');
                                $('#alert-modal-content').html('已查询到该基站位置');
                            } else {
                                geographic(data, mcc, mnc, netWork, lacNum, ciNum, bidNum, sidNum, nidNum);
                            }

                        } else {
                            geographic(data, mcc, mnc, netWork, lacNum, ciNum, bidNum, sidNum, nidNum);
                        }
                    } else {
                    }
                }
            } else{
                let paste_networkType = $('#paste-networkType').text();
                let netWork;
                //网络制式
                if (paste_networkType == "WCDMA") {
                    netWork = 'wcdma';
                } else if (paste_networkType == "LTE") {
                    netWork = 'lte';
                }
                else if (paste_networkType == "CDMA") {
                    netWork = 'cdma';
                }
                else if (paste_networkType == "GSM") {
                    netWork = 'gsm';
                }
                let num = $('#paste_btsId').val();
                let mnc = num.slice(4,5);
                let params = netWork + ',' + num + ',' + source2;
                let data = { "param": params };
                if($('#paste_btsId').val() != ''){
                    if (btsSearchDivMap.size != 0) {
                        if (btsSearchDivMap.get(num) != undefined) {
                            $('#alert-modal').modal('show');
                            $('#alert-modal-content').html('已查询到该基站位置');
                        } else {
                            geographic(data, 460, mnc, netWork, 0, 0, 0, 0, 0);
                        }

                    } else {
                        geographic(data, 460, mnc, netWork, 0, 0, 0, 0, 0);
                    }
                }else{
                }
            }
        })

        //清除基站查询后留下来的覆盖物
        $(document).on('click', '#bts-mark-delete', function () {
            btsSearchDivMap.forEach(function (value, key, data) {
                let btsSearchDiv = value;
                map.removeOverlay(btsSearchDiv.btsCover);
                map.removeOverlay(btsSearchDiv.btsRangeCircle);
            });
            btsSearchDivMap.clear();
        })

        
        //切换搜索基站的搜索模式,切换到经典模式
        $(document).on('click', '#classic_mode', function(){
            $('.search_bts_classic_mode').css('display','block');
            $('.search_bts_paste_mode').css('display','none');
        })

        //切换搜索基站的搜索模式,切换到经典模式
        $(document).on('click', '#paste_mode', function(){
            $('.search_bts_classic_mode').css('display','none');
            $('.search_bts_paste_mode').css('display','block');
        })
    }

}