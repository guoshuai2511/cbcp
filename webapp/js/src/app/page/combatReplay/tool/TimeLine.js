import {
    CarHistoryShadowOverlayConstructor
} from '../../realTimeCombat/overlay/CarHistoryShadowOverlayConstructor.js';
import {
    SingleHistoryShadowOverlayConstructor
} from '../../realTimeCombat/overlay/SingleHistoryShadowOverlayConstructor.js';

export class TimeLine {

    static add0AtFirst(value) {
        if (Number(value) < 10) {
            return '0' + value;
        } else {
            return value;
        }
    }

    /* 绘制时间轴*/
    static initTimeLine(startTime, endTime) {

        timeLineEndValue = new Date(startTime); // 
        /* 时间轴末尾值*/
        let timeEnd = parseInt(new Date(startTime).getTime() / 1000) - new Date(startTime).getSeconds() + 1 * 60;
        /* 时间轴开始时间（）*/
        if (new Date(startTime).getSeconds() >= 30) {
            timeLineStartValue = parseInt((new Date(startTime).getTime()) / 1000) + 0.5 * 60;
        } else {
            timeLineStartValue = parseInt((new Date(startTime).getTime()) / 1000) + 1 * 60;
        }
        /* 将caseStartTime设为时间轴最左侧的起始时间*/
        caseStartTime = timeLineStartValue * 1000 - new Date(timeLineStartValue * 1000).getSeconds() * 1000 - 60000;
        /* 当前播放的时间归零*/
        replayCurrentTime = timeLineStartValue * 1000 - new Date(timeLineStartValue * 1000).getSeconds() * 1000 - 60000;
        /* 时间轴长度*/
        let timeLength = timeEnd - timeLineStartValue + (parseInt((endTime - startTime) / 60000) + 1) * 60;
        /* 时间轴中html代码*/
        let timeLineHtml = '';
        for (let i = 0; i <= timeLength; i++) {
            let currentTime = timeLineStartValue + i;
            if (i % 30 == 0) {
                if (i % 60 == 0) {
                    if (new Date(currentTime * 1000).getMinutes() % 5 == 0) {
                        /* 大刻度*/
                        timeLineHtml = timeLineHtml + `
                            <div class="time-line-divider-long">
                                <div class="time-line-divider-time">
                                    ${TimeLine.add0AtFirst(new Date(currentTime * 1000).getHours())}:${TimeLine.add0AtFirst(new Date(currentTime * 1000).getMinutes())}
                                </div>
                            </div>
                        `;
                    } else {
                        /* 小刻度*/
                        timeLineHtml = timeLineHtml + `
                            <div class="time-line-divider-short"></div>
                        `;
                    }
                }
                if (currentTime > timeEnd) {
                    timeDividerCountOver = timeDividerCountOver + 0.5;
                }
                /* 时间轴格数*/
                timeDividerCount = timeDividerCount + 0.5;
            }
        }
        $('.time-line-divider-container').append(timeLineHtml);
        $('.time-line-divider-container').css('left', 0);
        /* window resize监听事件*/
        let timeLineAutoSize = function () {
            /* 时间轴容器宽度*/
            $('.time-line-area').css('width', $(window).width() - 270 - 170);
            /* 刻度宽度*/
            $('.time-line-divider-long, .time-line-divider-short').css('margin-left', $('.time-line-container').width() * 0.025 - 1);
            /* 刻度容器宽度*/
            $('.time-line-divider-container').css('width', timeDividerCount * ($('.time-line-container').width() * 0.025));
            //$('.time-line-blue-cover').css('width', ((timeDividerCount - timeDividerCountOver) / timeDividerCount) * 100 + '%'); // 设置蓝色覆盖层宽度
            /* 能量块*/
            $(`.eng-column-chart-container`).css('width', timeDividerCount * $('.eng-column-chart').width() * 0.025);
            $('.eng-column-value').css('width', $('.eng-column-chart').width() * 0.025 / 2 * 0.6);
            $('.eng-column-value').css('margin-left', $('.eng-column-chart').width() * 0.025 / 2 * 0.2);
            $('.eng-column-value').css('margin-right', $('.eng-column-chart').width() * 0.025 / 2 * 0.2);
            /* 进度条*/
            $('.time-line-progress').css('width', ($('.time-line-area').width() - 90) + 'px');
        }
        timeLineAutoSize();
        window.addEventListener('resize', function () {
            timeLineAutoSize();
        }, false);
        /* 设置红色marker的位置*/
        $('.time-line-marker').css('left', Number((1 - ($('.time-line-divider-container').width() - $('.time-line-blue-cover').width() + parseFloat($('.time-line-divider-container').css('right'))) / $('.time-line-container').width()) * 100) + '%');
        /* 滑动条*/
        $('.time-line-slider').rangeSlider({
            defaultValues: {
                min: 0,
                max: ($('.time-line-container').width() / $('.time-line-divider-container').width()) * 100
            },
            range: {
                min: ($('.time-line-container').width() / $('.time-line-divider-container').width()) * 100,
                max: ($('.time-line-container').width() / $('.time-line-divider-container').width()) * 100
            },
            valueLabels: 'hide',
            wheelMode: 'scroll'
        });
        $('.ui-rangeSlider-label').css('display', 'none');
        /* 滑动条回调函数*/
        $('.time-line-slider').on('valuesChanging', function (e, data) {
            let perc = ((data.values.min + data.values.max - (($('.time-line-container').width() / $('.time-line-divider-container').width()) * 100)) / 2) / (100 - (($('.time-line-container').width() / $('.time-line-divider-container').width()) * 100));
            /* 时间轴位置*/
            $('.time-line-divider-container').css('left', -perc * ($('.time-line-divider-container').width() - $('.time-line-container').width()));
            /* 能量轴位置*/
            $('.eng-column-chart-container').css('left', -perc * ($('.time-line-divider-container').width() - $('.time-line-container').width()));
            /* 绘制历史影子*/
            let markerTime = TimeLine.getMarkerTime();
            TimeLine.devHistoryShadow(markerTime);
            $('.view-default-btn-bg').css('background-position', '-210px -30px');
        });
        /* 时间轴初始化完成后,若当前系统时间秒数大于30，左移一次*/
        if (new Date(startTime).getSeconds() >= 30) {
            /* 蓝色覆盖层宽度超出，才添加刻度*/
            if (timeDividerCountOver / timeDividerCount <= 0.125) {
                timeDividerCount = timeDividerCount + 0.5;
                $('.time-line-divider-long, .time-line-divider-short').css('margin-left', $('.time-line-container').width() * 0.025 - 1);
                $('.time-line-divider-container').css('width', $('.time-line-container').width() * 0.025 / 2 + $('.time-line-divider-container').width());
                /* 设置蓝色覆盖层*/
                // $('.time-line-blue-cover').css('width', ((timeDividerCount - timeDividerCountOver) / timeDividerCount) * 100 + '%');
            } else {
                timeDividerCountOver = timeDividerCountOver - 0.5;
                /* 设置蓝色覆盖层*/
                // $('.time-line-blue-cover').css('width', ((timeDividerCount - timeDividerCountOver) / timeDividerCount) * 100 + '%');
                // $('.time-line-marker').css('left', Number((1 - ($('.time-line-divider-container').width() - $('.time-line-blue-cover').width() + parseFloat($('.time-line-divider-container').css('right'))) / $('.time-line-container').width()) * 100) + '%');
            }
            /* 修改滑动条*/
            $('.time-line-slider').rangeSlider('option', 'range', {
                min: ($('.time-line-container').width() / $('.time-line-divider-container').width()) * 100,
                max: ($('.time-line-container').width() / $('.time-line-divider-container').width()) * 100
            });
        }
        /* 存储蓝色覆盖层初始宽度*/
        timeLineBlueCoverDefaultWidth = ($('.time-line-blue-cover').width() / $('.time-line-divider-container').width()) * 100;

        /* 时间轴复位*/
        /**edit by gaochao start */
        // $('.view-default-btn').click(function () {
        $('.view-lock-btn').click(function () {
            mapFollowFlag = true;
            $('.view-lock-btn div').css("background", "url(img/icon/location_active.png)no-repeat");
            /**edit by gaochao end */
            if ($('.time-line-blue-cover').width() / $('.time-line-container').width() >= 0.875) {
                $('.time-line-divider-container').css('left', $('.time-line-container').width() - $('.time-line-blue-cover').width() - ($('.time-line-container').width() * 0.025 / 2) * 10);
                $('.eng-column-chart-container').css('left', $('.time-line-container').width() - $('.time-line-blue-cover').width() - ($('.time-line-container').width() * 0.025 / 2) * 10);
            } else {
                $('.time-line-divider-container').css('left', '0px');
                $('.eng-column-chart-container').css('left', '0px');
            }
            $('.time-line-marker').css('left', Number((1 - ($('.time-line-divider-container').width() - $('.time-line-blue-cover').width() + parseFloat($('.time-line-divider-container').css('right'))) / $('.time-line-container').width()) * 100) + '%');
            /* 修改滑动条（还原滑动条位置）*/
            $('.time-line-slider').rangeSlider('option', 'range', {
                min: ($('.time-line-container').width() / $('.time-line-divider-container').width()) * 100,
                max: ($('.time-line-container').width() / $('.time-line-divider-container').width()) * 100
            });
            /* 手动设置滑动条位置（还原滑动条位置）*/
            $('.ui-rangeSlider-bar').css('left', $('.ui-rangeSlider-container').width() * (($('.time-line-divider-container').width() - $('.time-line-container').width() + parseFloat($('.time-line-divider-container').css('right'))) / $('.time-line-divider-container').width()));
            $('.ui-rangeSlider-leftHandle').css('left', $('.ui-rangeSlider-container').width() * (($('.time-line-divider-container').width() - $('.time-line-container').width() + parseFloat($('.time-line-divider-container').css('right'))) / $('.time-line-divider-container').width()));
            $('.ui-rangeSlider-rightHandle').css('left', $('.ui-rangeSlider-container').width() * (1 + parseFloat($('.time-line-divider-container').css('right')) / $('.time-line-divider-container').width()) - 6);
            $('.view-default-btn-bg').css('background-position', '-180px -30px');
            map.removeOverlay(historyShadowOverlay);
            devDrawInfoMap.forEach((eachDev) => {
                if (eachDev.isCorrentView) {
                    /**edit by gaochao start */
                    if (mapFollowFlag) {
                        map.setCenter(new BMap.Point(devInfoMap.get(eachDev.devCode).baiduGpsInfo.lng, devInfoMap.get(eachDev.devCode).baiduGpsInfo.lat));
                        map.setZoom(map.getZoom() - 1);
                        map.setZoom(map.getZoom() + 1);
                    }
                    /**edit by gaochao end */
                }
            });
            timeLineMarketIsClicked = false;
            timeLineSlidertIsPressed = false;
        });

    }

    static getMarkerTime() {
        /* 获取红色刻度值在时间轴容器上的百分比*/
        let markerLeftPerc = parseFloat($('.time-line-marker').css('left')) / $('.time-line-container').width() * 100;
        /* 算出左边部分超出有多少格*/
        let outerCount = ($('.time-line-divider-container').width() - $('.time-line-container').width() + parseFloat($('.time-line-divider-container').css('right'))) / ($('.time-line-container').width() * 0.025);
        /* 红色刻度尺前面的格数 + 超出部分的格数*/
        let markerLeftCount = markerLeftPerc / 2.5 + outerCount;
        // 通过格数确定时间戳 // timeLineStartValue * 1000 - new Date(timeLineStartValue * 1000).getSeconds() * 1000 - 60000;
        let clickedTime = new Date(((timeLineStartValue * 1000 - new Date(timeLineStartValue * 1000).getSeconds() * 1000 - 60000) / 1000 + markerLeftCount * 1 * 60) * 1000);
        return clickedTime;
    }

    /* 绘制影子*/
    static devHistoryShadow(clickedTime) {
        let markerTime
        /* 设置key值*/
        if (clickedTime.getSeconds() < 30) {
            markerTime = clickedTime.Format('yyyy-MM-dd hh:mm') + ':00';
        } else {
            markerTime = clickedTime.Format('yyyy-MM-dd hh:mm') + ':30';
        }
        /* 绘制前需移除上一个影子*/
        if (historyShadowOverlay != null) {
            map.removeOverlay(historyShadowOverlay);
        }
        devDrawInfoMap.forEach((eachDev) => {
            if (eachDev.isCorrentView) { // 只绘制当前视角的设备
                let shadowInfo = eachDev.timeLineEngMap.get(markerTime);
                if (shadowInfo != null) { // 在存储的map中找到对应的时间点
                    let devCode = eachDev.devCode;
                    let devType = Number(eachDev.devType);
                    let point = new BMap.Point(shadowInfo.position.lng, shadowInfo.position.lat);
                    let northAngle = shadowInfo.position.northAngle;
                    let energy = shadowInfo.detail;
                    let passive = shadowInfo.passive;
                    switch (devType) {
                        case 1:
                            historyShadowOverlay = new CarHistoryShadowOverlayConstructor(point, devCode, northAngle, energy, passive);
                            map.addOverlay(historyShadowOverlay);
                            break;
                        case 2:
                            historyShadowOverlay = new SingleHistoryShadowOverlayConstructor(point, devCode, northAngle, energy);
                            map.addOverlay(historyShadowOverlay);
                            break;
                        default:
                            break;
                    }
                }
            }
        });
    }

    /* 重置刻度尺位置*/
    static resetTimeLineMarker() {
        $('.time-line-marker').css('left', Number((1 - ($('.time-line-divider-container').width() - $('.time-line-blue-cover').width() + parseFloat($('.time-line-divider-container').css('right'))) / $('.time-line-container').width()) * 100) + '%');
    }

    /* 时间轴自增*/
    static updateTimeLine(updateTime) {
        let currentTime = new Date(updateTime);
        /* 增加蓝色覆盖层的宽度*/
        let blueCoverWidthCache = $('.time-line-blue-cover').width();
        blueCoverWidthCache = blueCoverWidthCache + $('.time-line-container').width() * 0.025 / 60;
        $('.time-line-blue-cover').css('width', (blueCoverWidthCache / $('.time-line-divider-container').width()) * 100 + '%');
        /* 时间轴自动移动*/
        if (!timeLineSlidertIsPressed) {
            if ($('.time-line-blue-cover').width() / $('.time-line-container').width() >= 0.875) {
                /* 时间轴位移量*/
                let dividerContainerLeftCache = parseFloat($('.time-line-divider-container').css('left'));
                if (-dividerContainerLeftCache + $('.time-line-container').width() < $('.time-line-divider-container').width()) {
                    if (-(dividerContainerLeftCache - $('.time-line-container').width() * 0.025) > $('.time-line-divider-container').width()) {
                        dividerContainerLeftCache = -($('.time-line-divider-container').width() - $('.time-line-container').width());
                    } else {
                        dividerContainerLeftCache = dividerContainerLeftCache - $('.time-line-container').width() * 0.025 / 60;
                    }
                    $('.time-line-divider-container').css('left', dividerContainerLeftCache + 'px');
                    $('.eng-column-chart-container').css('left', dividerContainerLeftCache + 'px');
                }
            }
            TimeLine.resetTimeLineMarker();
            /* 修改滑动条*/
            $('.time-line-slider').rangeSlider('option', 'range', {
                min: ($('.time-line-container').width() / $('.time-line-divider-container').width()) * 100,
                max: ($('.time-line-container').width() / $('.time-line-divider-container').width()) * 100
            });
            /* 手动设置滑动条位置*/
            $('.ui-rangeSlider-bar').css('left', $('.ui-rangeSlider-container').width() * (($('.time-line-divider-container').width() - $('.time-line-container').width() + parseFloat($('.time-line-divider-container').css('right'))) / $('.time-line-divider-container').width()));
            $('.ui-rangeSlider-leftHandle').css('left', $('.ui-rangeSlider-container').width() * (($('.time-line-divider-container').width() - $('.time-line-container').width() + parseFloat($('.time-line-divider-container').css('right'))) / $('.time-line-divider-container').width()));
            $('.ui-rangeSlider-rightHandle').css('left', $('.ui-rangeSlider-container').width() * (1 + parseFloat($('.time-line-divider-container').css('right')) / $('.time-line-divider-container').width()) - 6);
        }
        /* 更新进度条*/
        let progressPerc = (1 - (caseEndTime - updateTime) / (caseEndTime - caseStartTime)) * 100;
        $('#time-line-progress').css('width', progressPerc + '%');
    }

}