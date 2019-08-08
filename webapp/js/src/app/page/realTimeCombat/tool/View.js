import { PrasingBtsInfo } from '../parsing/PrasingBtsInfo.js';
import { ParsingMultiBtsInfo } from '../parsing/ParsingMultiBtsInfo.js';

import { DrawBtsEcharts } from '../overlay/DrawBtsEcharts.js';

import { TimeLine } from '../tool/TimeLine.js';
import { GPSToBaiduPoint } from '../../../common/baiduMap/GPSToBaiduPoint.BaiduMap.js';

export class View {

    static initViewPanel() {
        /**add by gaochao start */
        $(document).on("mousedown", ".windowpop-title", function () {
            /**edti by gaochao start */
            let selectedUsername = $(this).attr('data-info-devcode');
            // let selectedUsername = $(this).attr('data-info-username');
            /**edit by gaochao end */
            console.log("selectedUsername" + selectedUsername);
            let isMove = true;
            let abs_x = event.pageX - $(`.windowpop-container-${selectedUsername}`).offset().left;
            let abs_y = event.pageY - $(`.windowpop-container-${selectedUsername}`).offset().top;
            $(document).mousemove(function (event) {
                if (isMove) {
                    let obj = $(`.windowpop-container-${selectedUsername}`);
                    let left_x = event.pageX - abs_x;
                    let top_y = event.pageY - abs_y;
                    obj.css({
                        'left': left_x,
                        'top': top_y
                    });
                    if (obj.offset().left < 0) {
                        obj.css({
                            'left': 0,
                        });
                    }
                    if (obj.offset().left > (window.innerWidth - 640)) {
                        obj.css({
                            'left': window.innerWidth - 640,
                        });
                    }
                    if (obj.offset().top < 50) {
                        obj.css({
                            'top': 50,
                        });
                    }
                    if (obj.offset().top > (window.innerHeight - 480)) {
                        obj.css({
                            'top': window.innerHeight - 480,
                        });
                    }
                }
            }).mouseup(function () {
                isMove = false;
            });
        });
        let playerMap = {};
        let player;
        let lastTop;
        $(function () {
            $(document).on("click", ".team-each-dev-video", function () {
                let selectedUsername = $(this).attr('data-info-username');
                if (eval("playerMap." + selectedUsername + " ==null")) {
                    playerMap[`${selectedUsername}`] = selectedUsername;
                    // console.log("selectedUsername:    " + selectedUsername);
                    let windowsVideo = `<div class="windowpop-container windowpop-container-${selectedUsername}">
                    <div class="windowpop-title"  data-info-username="${selectedUsername}">
                        <span>${selectedUsername}</span>
                    </div>
                    <div class="windows-close"  data-info-username="${selectedUsername}">X</div>
                    <div class="windowpop-content">
                    <video id="${selectedUsername}" class="video-js" preload="auto" width="636" height="400" poster="" data-setup="{}">
                    <source src="rtmp://106.15.195.82:1935/hls/${selectedUsername}" type="rtmp/flv"></video>
                    </div>
                    </div>`;
                    $(".map-area-container").append(windowsVideo);

                    player = videojs(`${selectedUsername}`, {
                        autoplay: true,
                    }, function onPlayerReady() {
                        this.play();
                    });
                    $(`.windowpop-container-${selectedUsername}`).fadeIn(300);
                }
                player = videojs(`${selectedUsername}`);
                $(`.windowpop-container-${selectedUsername}`).css({ 'top': lastTop, });
                return false;

            });
        });
        /**add by gaochao start */
        $(function () {
            $(document).on("click", ".group-location-video-popup", function () {
                let selectedDevCode = $(this).attr('data-devcode');
                let selectedDevCodeView = $(this).attr('data-devcode');
                if (eval(`playerMap["${selectedDevCodeView}"] ==null`)) {
                    playerMap[`${selectedDevCodeView}`] = selectedDevCode;
                    // console.log("selectedUsername:    " + selectedUsername);
                    let windowsVideo = `<div class="windowpop-container windowpop-container-${selectedDevCode}">
                    <div class="windowpop-title"  data-info-devcode="${selectedDevCode}">
                        <span>${selectedDevCode}</span>
                    </div>
                    <div class="windows-close"  data-info-devcode="${selectedDevCode}">X</div>
                    <div class="windowpop-content">
                    <video id="${selectedDevCode}_popup" class="video-js" preload="auto" width="636" height="400" poster="" data-setup="{}">
                    <source src="rtmp://106.15.195.82:1935/hls/${selectedDevCode}" type="rtmp/flv"></video>
                    </div>
                    <div class="windowpop-muted" data-info-devcode="${selectedDevCode}" data-status="0"></div>
                    </div>`;
                    $(".map-area-container").append(windowsVideo);
                    player = videojs(`${selectedDevCode}_popup`, {
                        autoplay: true,
                    }, function onPlayerReady() {
                        this.play();
                    });

                    $(`.windowpop-container-${selectedDevCode}`).fadeIn(300);
                }
                $(`.windowpop-container-${selectedDevCode}`).css({ 'top': lastTop, });
                $(`.group-location-video-out-${selectedDevCode}`).click();
                $(`.group-location-video-out-${selectedDevCode}`).attr('data-info-close', 0);
                player = videojs(`${selectedDevCode}`);
                player.pause();
                player = videojs(`${selectedDevCode}_popup`);
                player.load();
                player.play();
                return false;
            });
        });
        /**add by gaochao end*/
        $(document).on("click", ".windows-close", function () {
            let selectedVideo = $(this).attr('data-info-devcode');
            $(`group-location-video-out-${selectedVideo}`).attr('data-info-close', 1);
            lastTop = $(`.windowpop-container-${selectedVideo}`).offset().top;
            $(`.windowpop-container-${selectedVideo}`).css({ 'top': -1000, });
            $(`.group-location-video-out-${selectedVideo}`).attr('data-info-close', 1);
            $(`.group-location-video-out-${selectedVideo}`).click();
            player = videojs(`${selectedVideo}_popup`);
            player.pause();
            player = videojs(`${selectedVideo}`);
            player.load();
            player.play();
        });
        $(document).on("click", ".windowpop-muted", function () {
            let selectedVideo = $(this).attr('data-info-devcode');
            if ($(this).attr('data-status') == 0) {
                $(this).css("background", "url(img/icon/voice_none.png) no-repeat");
                player = videojs(`${selectedVideo}_popup`);
                player.muted(true);
                $(this).attr('data-status', 1);
            } else {
                $(this).css("background", "url(img/icon/voice.png) no-repeat");
                player.muted(false);
                $(this).attr('data-status', 0);
            }
        });

        /**add by gaochao end */

        /* 右面板点击切换视角*/
        $(document).on('click', '.team-each-dev', function () {
            let selectedDevCode = $(this).attr('data-info-devcode');
            View.ViewChange(selectedDevCode);
            $('.team-each-dev').removeClass('team-each-dev-active');
            $(this).addClass('team-each-dev-active');
            $('.view-switch-chooser').css('display', 'none');
            let imgType = '';
            if (devDrawInfoMap.get(selectedDevCode).devType == 1) {
                imgType = 'car';
            } else {
                imgType = 'single';
            }
            /**edti by gaochao start */
            $('.view-current-dev').html(`
                <span class="view-current-username user-name-value-by-id-${devDrawInfoMap.get(selectedDevCode).userId}">${devDrawInfoMap.get(selectedDevCode).realName}</span>
                <img class="view-current-dev-img-${imgType}" src="img/${imgType}_${devDrawInfoMap.get(selectedDevCode).devImgIndex}.png">
                <i class="mdui-icon material-icons">&#xe5c7;</i>
            `);
            /**edit by gaochao end */
        });

        /**add by gaochao start */
        $(document).on('click', '.group-location-each', function () {
            let selectedDevCode = $(this).attr('data-info-devcode');
            View.ViewChange(selectedDevCode);
            $('.group-location-each').removeClass('group-location-choose');
            $(this).addClass('group-location-choose');
            let imgType = '';
            if (devDrawInfoMap.get(selectedDevCode).devType == 1) {
                imgType = 'car';
            } else if (devDrawInfoMap.get(selectedDevCode).devType == 2) {
                imgType = 'single';
            } else if (devDrawInfoMap.get(selectedDevCode).devType == 3) {
                imgType = 'outside';
            }
            /**edti by gaochao start */
            $('.view-current-dev').html(`
                <span class="view-current-username user-name-value-by-id-${devDrawInfoMap.get(selectedDevCode).userId}">${devDrawInfoMap.get(selectedDevCode).realName}</span>
                <img class="view-current-dev-img-${imgType}" src="img/${imgType}_${devDrawInfoMap.get(selectedDevCode).devImgIndex}.png">
                <i class="mdui-icon material-icons">&#xe5c7;</i>
            `);
            /**edit by gaochao end */
        });
        $(document).on('click', '.group-outside-each-item', function () {
            let selectedDevCode = $(this).attr('data-info-devcode');
            View.ViewChange(selectedDevCode);
            $('.group-outside-each-item').removeClass('group-location-choose');
            $(this).addClass('group-location-choose');
            let imgType = '';
            if (devDrawInfoMap.get(selectedDevCode).devType == 1) {
                imgType = 'car';
            } else if (devDrawInfoMap.get(selectedDevCode).devType == 2) {
                imgType = 'single';
            } else if (devDrawInfoMap.get(selectedDevCode).devType == 3) {
                imgType = 'outside';
            }
            /**edti by gaochao start */
            $('.view-current-dev').html(`
                <span class="view-current-username user-name-value-by-id-${devDrawInfoMap.get(selectedDevCode).userId}">${devDrawInfoMap.get(selectedDevCode).realName}</span>
                <img class="view-current-dev-img-${imgType}" src="img/${imgType}_${devDrawInfoMap.get(selectedDevCode).devImgIndex}.png">
                <i class="mdui-icon material-icons">&#xe5c7;</i>
            `);
            /**edit by gaochao end */
        });
        let videoMap = {};
        $(document).on('click', '.group-location-video-out', function () {
            let selectedDevCode = $(this).attr('data-info-devcode');
            if ($(`.group-location-video-out-${selectedDevCode}`).attr('data-info-close') == 1) {
                if ($(this).attr("data-info-status") == 0) {
                    $(this).css("background", "url(img/icon/video_in.png) no-repeat");
                    $(`.team-each-dev-${selectedDevCode}`).css('width', '386px');
                    $(this).attr("data-info-status", 1);
                    if (eval(`videoMap["${selectedDevCode}"] ==null`)) {
                        videoMap[`${selectedDevCode}`] = selectedDevCode;
                        // console.log("selectedUsername:    " + selectedUsername);
                        let windowsVideo = `
                    <div>
                    <video id="${selectedDevCode}" class="video-js" preload="auto" width="140" height="132" poster="" data-setup="{}">
                    <source src="rtmp://106.15.195.82:1935/hls/${selectedDevCode}" type="rtmp/flv"></video>
                    </div>
                    <div class="group-location-video-popup group-location-video-popup-${selectedDevCode}" data-devcode="${selectedDevCode}"></div>
                    `
                            ;
                        $(`.group-location-video-container-${selectedDevCode}`).append(windowsVideo);
                        player = videojs(`${selectedDevCode}`, {
                            autoplay: true,
                        }, function onPlayerReady() {
                            this.muted(true);
                            this.play();
                        });
                        $(`.group-location-video-container-${selectedDevCode}`).css('display', 'block');
                    }
                    $(`.group-location-video-container-${selectedDevCode}`).css('right', '7px');
                    player = videojs(`${selectedDevCode}`);
                    player.load();
                    player.play();
                } else {
                    $(this).css("background", "url(img/icon/video_out.png) no-repeat");
                    $(`.team-each-dev-${selectedDevCode}`).css('width', '236px');
                    $(`.group-location-video-container-${selectedDevCode}`).css('right', '1170px');
                    $(this).attr("data-info-status", 0);
                    player = videojs(`${selectedDevCode}`);
                    player.pause();
                }
            }
            return false;
        });


        $(document).on("mousedown", ".target-lte-info-title", function () {
            let isMove = true;
            let abs_x = event.pageX - $(`.target-lte-info-container`).offset().left;
            let abs_y = event.pageY - $(`.target-lte-info-container`).offset().top;
            $(document).mousemove(function (event) {
                if (isMove) {
                    let obj = $(`.target-lte-info-container`);
                    let left_x = event.pageX - abs_x;
                    let top_y = event.pageY - abs_y;
                    obj.css({
                        'left': left_x,
                        'top': top_y
                    });
                    if (obj.offset().left < 0) {
                        obj.css({
                            'left': 0,
                        });
                    }
                    if (obj.offset().left > (window.innerWidth - 416)) {
                        obj.css({
                            'left': window.innerWidth - 416,
                        });
                    }
                    if (obj.offset().top < 50) {
                        obj.css({
                            'top': 50,
                        });
                    }
                    if (obj.offset().top > (window.innerHeight - 310)) {
                        obj.css({
                            'top': window.innerHeight - 310,
                        });
                    }
                }
            }).mouseup(function () {
                isMove = false;
            });
        });

        $(document).on("mousedown", ".ta-info-title", function () {
            let isMove = true;
            let abs_x = event.pageX - $(`.ta-info-container`).offset().left;
            let abs_y = event.pageY - $(`.ta-info-container`).offset().top;
            $(document).mousemove(function (event) {
                if (isMove) {
                    let obj = $(`.ta-info-container`);
                    let left_x = event.pageX - abs_x;
                    let top_y = event.pageY - abs_y;
                    obj.css({
                        'left': left_x,
                        'top': top_y
                    });
                    if (obj.offset().left < 0) {
                        obj.css({
                            'left': 0,
                        });
                    }
                    if (obj.offset().left > (window.innerWidth - 772)) {
                        obj.css({
                            'left': window.innerWidth - 772,
                        });
                    }
                    if (obj.offset().top < 50) {
                        obj.css({
                            'top': 50,
                        });
                    }
                    if (obj.offset().top > (window.innerHeight - 448)) {
                        obj.css({
                            'top': window.innerHeight - 448,
                        });
                    }
                }
            }).mouseup(function () {
                isMove = false;
            });
        });
        $(document).on("mousedown", ".advance-info-title", function () {
            let isMove = true;
            let abs_x = event.pageX - $(`.advance-info-containers`).offset().left;
            let abs_y = event.pageY - $(`.advance-info-containers`).offset().top;
            $(document).mousemove(function (event) {
                if (isMove) {
                    let obj = $(`.advance-info-containers`);
                    let left_x = event.pageX - abs_x;
                    let top_y = event.pageY - abs_y;
                    obj.css({
                        'left': left_x,
                        'top': top_y
                    });
                    if (obj.offset().left < 0) {
                        obj.css({
                            'left': 0,
                        });
                    }
                    if (obj.offset().left > (window.innerWidth - 610)) {
                        obj.css({
                            'left': window.innerWidth - 610,
                        });
                    }
                    if (obj.offset().top < 50) {
                        obj.css({
                            'top': 50,
                        });
                    }
                    if (obj.offset().top > (window.innerHeight - 436)) {
                        obj.css({
                            'top': window.innerHeight - 436,
                        });
                    }
                }
            }).mouseup(function () {
                isMove = false;
            });
        });

        $(document).on("mousedown", ".active-info-title", function () {
            let isMove = true;
            let abs_x = event.pageX - $(`.active-info-container`).offset().left;
            let abs_y = event.pageY - $(`.active-info-container`).offset().top;
            $(document).mousemove(function (event) {
                if (isMove) {
                    let obj = $(`.active-info-container`);
                    let left_x = event.pageX - abs_x;
                    let top_y = event.pageY - abs_y;
                    obj.css({
                        'left': left_x,
                        'top': top_y
                    });
                    if (obj.offset().left < 0) {
                        obj.css({
                            'left': 0,
                        });
                    }
                    if (obj.offset().left > (window.innerWidth - 320)) {
                        obj.css({
                            'left': window.innerWidth - 320,
                        });
                    }
                    if (obj.offset().top < 50) {
                        obj.css({
                            'top': 50,
                        });
                    }
                    if (obj.offset().top > (window.innerHeight - 240)) {
                        obj.css({
                            'top': window.innerHeight - 240,
                        });
                    }
                }
            }).mouseup(function () {
                isMove = false;
            });
        });

        /*基站搜索弹框*/
        $(document).on("mousedown", ".move_search_modal", function () {
            let isMove = true;
            let abs_x = event.pageX - $(`.search-bts-containers`).offset().left;
            let abs_y = event.pageY - $(`.search-bts-containers`).offset().top;
            $(document).mousemove(function (event) {
                if (isMove) {
                    let obj = $(`.search-bts-containers`);
                    let left_x = event.pageX - abs_x;
                    let top_y = event.pageY - abs_y;
                    obj.css({
                        'left': left_x,
                        'top': top_y
                    });
                    if (obj.offset().left < 0) {
                        obj.css({
                            'left': 0,
                        });
                    }
                    if (obj.offset().left > (window.innerWidth - 320)) {
                        obj.css({
                            'left': window.innerWidth - 320,
                        });
                    }
                    if (obj.offset().top < 50) {
                        obj.css({
                            'top': 50,
                        });
                    }
                    if (obj.offset().top > (window.innerHeight - 240)) {
                        obj.css({
                            'top': window.innerHeight - 240,
                        });
                    }
                }
            }).mouseup(function () {
                isMove = false;
            });
        });

        /**add by gaochao end */
        /* 左下角view-current-dev点击*/
        $('.view-current-dev').click(function () {
            if ($('.view-switch-chooser').css('display') == 'none') {
                $('.view-switch-chooser').css('display', 'block');
            } else {
                $('.view-switch-chooser').css('display', 'none');
            }
        });
        $(document).on('click', '.choose-container', function () {
            let selectedDevCode = $(this).attr('data-devcode');
            View.ViewChange(selectedDevCode);
            /*edti by gaochao start */
            // $('.team-each-dev').removeClass('team-each-dev-active');
            // $(`.team-each-dev-${selectedDevCode}`).addClass('team-each-dev-active');
            $('.group-location-each').removeClass('group-location-choose');
            $(`.team-each-dev-${selectedDevCode}`).addClass('group-location-choose');
            /*edti by gaochao end */
            $('.view-switch-chooser').css('display', 'none');
            let imgType = '';
            if (devDrawInfoMap.get(selectedDevCode).devType == 1) {
                imgType = 'car';
            } else {
                imgType = 'single';
            }
            $('.view-current-dev').html(`
                <span class="view-current-username user-name-value-by-id-${devDrawInfoMap.get(selectedDevCode).userId}">${devDrawInfoMap.get(selectedDevCode).userName}</span>
                <img class="view-current-dev-img-${imgType}" src="img/${imgType}_${devDrawInfoMap.get(selectedDevCode).devImgIndex}.png">
                <i class="mdui-icon material-icons">&#xe5c7;</i>
            `);
        });
    }

    static ViewChange(selectedDevCode) {
        if (!devDrawInfoMap.get(selectedDevCode).isCorrentView) {
            /* 更改设备路径线颜色*/
            let currentDevCode; // 1.将当前视角的路径线置灰，2.将新视角的路径线设为高亮
            devDrawInfoMap.forEach((eachDev) => {
                if (eachDev.isCorrentView) {
                    currentDevCode = eachDev.devCode;
                }
            });
            // let currentDevLine = lineOverlayMap.line.get(currentDevCode).line;
            for (let i = 0; i < lineOverlayMap.line.get(currentDevCode).line.length; i++) {
                lineOverlayMap.line.get(currentDevCode).line[i].setStrokeColor(devDrawInfoMap.get(currentDevCode).routeLineColor);  // 路径线置灰
            }
            for (let i = 0; i < lineOverlayMap.line.get(currentDevCode).tempLine.length; i++) {
                lineOverlayMap.line.get(currentDevCode).tempLine[i].setStrokeColor(devDrawInfoMap.get(currentDevCode).routeLineColor);  // 路径线置灰
            }
            devDrawInfoMap.get(currentDevCode).isCorrentView = false;
            // let selectedDevLine = lineOverlayMap.line.get(selectedDevCode).line;
            for (let i = 0; i < lineOverlayMap.line.get(selectedDevCode).line.length; i++) {
                lineOverlayMap.line.get(selectedDevCode).line[i].setStrokeColor('#008030'); // 路径线高亮
            }
            for (let i = 0; i < lineOverlayMap.line.get(selectedDevCode).tempLine.length; i++) {
                lineOverlayMap.line.get(selectedDevCode).tempLine[i].setStrokeColor('#008030'); // 路径线高亮
            }
            devDrawInfoMap.get(selectedDevCode).isCorrentView = true;
            /* 切换时间轴能量条*/
            $('.eng-column-chart-container').css('display', 'none');
            $(`.eng-column-chart-container-${selectedDevCode}`).css('display', 'block');
            /* 绘制历史影子
            let markerTime = TimeLine.getMarkerTime();
            TimeLine.devHistoryShadow(markerTime);*/
            /* 如果为车载，更新车速显示*/
            /**del by gaochao start  */
            // if (devDrawInfoMap.get(selectedDevCode).devType == 1) {
            //     $('.car-speed').css('display', 'block');
            //     $('.car-speed-value').html(devInfoMap.get(selectedDevCode).gpsInfo.speed);
            // } else {
            //     $('.car-speed').css('display', 'none');
            // }
            /**del by gaochao end  */
            /* 更新左下角图片*/
            /**edti by gaochao start */
            if (devDrawInfoMap.get(selectedDevCode).devType == 1) {
                $('.view-current-dev').html(`
                    <span class="view-current-username user-name-value-by-id-${devDrawInfoMap.get(selectedDevCode).userId}">${devDrawInfoMap.get(selectedDevCode).realName}</span>
                    <img class="view-current-dev-img-car" src="img/car_${devDrawInfoMap.get(selectedDevCode).devImgIndex}.png">
                    <i class="mdui-icon material-icons">&#xe5c7;</i>
                `);
                /**add by gaochao start */
                $('.view-current-dev-container').html(`
                <div class="view-current-dev-icon-car" style="background:url(img/icon/car_view_${devDrawInfoMap.get(selectedDevCode).devImgIndex}.png)no-repeat;background-size: cover;"></div>
				<div class="view-current-username-content  user-name-value-by-id-${devDrawInfoMap.get(selectedDevCode).userId}" title="${devDrawInfoMap.get(selectedDevCode).realName}">${devDrawInfoMap.get(selectedDevCode).realName}</div>
                `);
                /**add by gaochao end */
            } else {
                $('.view-current-dev').html(`
                    <span class="view-current-username user-name-value-by-id-${devDrawInfoMap.get(selectedDevCode).userId}">${devDrawInfoMap.get(selectedDevCode).realName}</span>
                    <img class="view-current-dev-img-single" src="img/single_${devDrawInfoMap.get(selectedDevCode).devImgIndex}.png">
                    <i class="mdui-icon material-icons">&#xe5c7;</i>
                `);
                /**add by gaochao start */
                if (devDrawInfoMap.get(selectedDevCode).devType == 2) {
                    $('.view-current-dev-container').html(`
                    <div class="view-current-dev-icon-single" style="background:url(img/icon/single_view_${devDrawInfoMap.get(selectedDevCode).devImgIndex}.png)no-repeat;background-size: cover;"></div>
                    <div class="view-current-username-content  user-name-value-by-id-${devDrawInfoMap.get(selectedDevCode).userId}" title="${devDrawInfoMap.get(selectedDevCode).realName}">${devDrawInfoMap.get(selectedDevCode).realName}</div>
                    `);
                } else if (devDrawInfoMap.get(selectedDevCode).devType == 3) {
                    $('.view-current-dev-container').html(`
                    <div class="view-current-dev-icon-single" style="background:url(img/icon/outside_view_${devDrawInfoMap.get(selectedDevCode).devImgIndex}.png)no-repeat;background-size: cover;"></div>
                    <div class="view-current-username-content  user-name-value-by-id-${devDrawInfoMap.get(selectedDevCode).userId}" title="${devDrawInfoMap.get(selectedDevCode).realName}">${devDrawInfoMap.get(selectedDevCode).realName}</div>
                    `);
                }
                /**add by gaochao end */
            }
            /**edit by gaochao end */
            /* 更新当前视角设备值*/
            currentViewDevCode = selectedDevCode;
            /* 重绘echarts特效*/
            if (hitedBtsCache.btsId != null && isBtsOpen) {
                DrawBtsEcharts.showBtsStyleCSS(hitedBtsCache);
            }
            /* 重绘基站解析进度*/
            ParsingMultiBtsInfo.cellAnalysis(devStateInfoMapCache);
        }
        /* 设置地图中心*/
        if (devInfoMap.get(selectedDevCode) != null) {
            let point = [devInfoMap.get(selectedDevCode).gpsInfo.lng, devInfoMap.get(selectedDevCode).gpsInfo.lat];
            let bdPoint = GPSToBaiduPoint.getBaiduPointLocation([point])[0];
            map.setCenter(new BMap.Point(bdPoint.lng, bdPoint.lat));
            map.setZoom(map.getZoom() - 1);
            map.setZoom(map.getZoom() + 1);
        }
    }

}