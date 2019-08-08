import { CommonUtil } from '../../../common/util/CommonUtil.js';

import { CarHistoryShadowOverlayConstructor } from '../overlay/CarHistoryShadowOverlayConstructor.js';
import { SingleHistoryShadowOverlayConstructor } from '../overlay/SingleHistoryShadowOverlayConstructor.js';
import { GPSToBaiduPoint } from '../../../common/baiduMap/GPSToBaiduPoint.BaiduMap.js';

export class TimeLine {

    static initTimeLine() {

        /* 获取服务器当前时间*/
        let serverDate = CommonUtil.getServerDate().getTime();

        /* 当前时间（蓝色覆盖物末尾值）*/
        let timeLineEndValue = new Date(serverDate);
        /* 时间轴末尾时间值*/
        let timeEnd = parseInt(new Date(serverDate).getTime() / 1000) - new Date(serverDate).getSeconds() + 1 * 60; // 减去秒数，分钟取整
        /* 设置时间轴开始时间*/
        if (new Date(caseStartTime).getSeconds() >= 30) {
            timeLineStartValue = parseInt((new Date(caseStartTime).getTime()) / 1000) + 1 * 60;
        } else {
            timeLineStartValue = parseInt((new Date(caseStartTime).getTime()) / 1000) + 1.5 * 60;
        }
        /* 设置时间轴长度*/
        let timeLength;
        if (40 - parseInt((new Date(serverDate).getTime() - new Date(caseStartTime).getTime()) / 60000) > 5) {
            /* 若开始时间至结束时间小于40分钟，则将时间轴长度设为40分钟*/
            // timeLength = timeEnd - timeLineStartValue + (40 - parseInt((new Date(serverDate).getTime() + new Date(caseStartTime).getSeconds() * 1000 + new Date(caseStartTime).getMilliseconds() - new Date(caseStartTime).getTime()) / 60000)) * 60;
            timeLength = 2355; // 根据上述公式得出的固定值
        } else {
            /* 若开始时间至结束时间大于40分钟，则将时间轴长度在此基础上增加5分钟*/
            timeLength = timeEnd - timeLineStartValue + 5 * 60;
        }
        let timeLineHtml = ''; // 时间轴模块HTML代码
        /* 在小于10的数字前添加0*/
        let add0AtFirst = function (param) {
            if (Number(param) < 10) {
                return '0' + param;
            } else {
                return param;
            }
        }

        for (let i = 0; i <= timeLength; i++) {
            let currentTime = timeLineStartValue + i;
            if (i % 30 == 0) {
                if (i % 60 == 0) {
                    if (new Date(currentTime * 1000).getMinutes() % 5 == 0) {
                        /* 每5分钟处绘制大刻度*/
                        timeLineHtml = timeLineHtml + `
                            <div class="time-line-divider-long">
                                <div class="time-line-divider-time">
                                    ${add0AtFirst(new Date(currentTime * 1000).getHours())}:${add0AtFirst(new Date(currentTime * 1000).getMinutes())}
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
                    /* 超出当前时间的格数*/
                    timeDividerCountOver = timeDividerCountOver + 0.5;
                }
                /* 时间轴总格数*/
                timeDividerCount = timeDividerCount + 0.5;
            }
        }
        if (timeDividerCount < 40) {
            timeDividerCount = 40;
        } else if (timeDividerCount > 40) {
            if (new Date(caseStartTime).getSeconds() != 0 && new Date(caseStartTime).getSeconds() != 30) {
                timeDividerCountOver = timeDividerCountOver - 0.5;
            }
        }
        $('.time-line-divider-container').append(timeLineHtml);
        $('.time-line-divider-container').css('right', 0);
        /* window resize监听事件，宽度自适应*/
        let timeLineAutoSize = function () {
            $('.time-line-area').css('width', $(window).width() - 270);
            /* 刻度值左边距*/
            $('.time-line-divider-long, .time-line-divider-short').css('margin-left', $('.time-line-container').width() * 0.025 - 1);
            /* 刻度容器宽度*/
            $('.time-line-divider-container').css('width', timeDividerCount * ($('.time-line-container').width() * 0.025));
            /* 蓝色覆盖层宽度*/
            $('.time-line-blue-cover').css('width', ((timeDividerCount - timeDividerCountOver) / timeDividerCount) * 100 + '%');
            /* 能量条容器宽度*/
            $(`.eng-column-chart-container`).css('width', timeDividerCount * $('.eng-column-chart').width() * 0.025);
            /* 每个能量条宽度*/
            $('.eng-column-value').css('width', $('.eng-column-chart').width() * 0.025 / 2 * 0.6);
            $('.eng-column-value').css('margin-left', $('.eng-column-chart').width() * 0.025 / 2 * 0.2);
            $('.eng-column-value').css('margin-right', $('.eng-column-chart').width() * 0.025 / 2 * 0.2);
        }
        timeLineAutoSize();
        window.addEventListener('resize', function () {
            timeLineAutoSize();
        }, false);
        /* 设置红色marker的位置*/
        $('.time-line-marker').css('left', Number((1 - ($('.time-line-divider-container').width() - $('.time-line-blue-cover').width() + parseFloat($('.time-line-divider-container').css('right'))) / $('.time-line-container').width()) * 100) + '%');
        /* 设置滑动条参数*/
        $('.time-line-slider').rangeSlider({
            defaultValues: {
                min: (1 - ($('.time-line-container').width() / $('.time-line-divider-container').width())) * 100,
                max: 100
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
            /* 时间轴位置*/           // 下行公式：里面的div宽-外部div宽
            $('.time-line-divider-container').css('right', (perc - 1) * ($('.time-line-divider-container').width() - $('.time-line-container').width()));
            /* 能量轴位置*/
            $('.eng-column-chart-container').css('right', (perc - 1) * ($('.time-line-divider-container').width() - $('.time-line-container').width()));
            /* 刻度尺位置*/
            let dividerRight = parseFloat($('.time-line-divider-container').css('right'));
            /* 防止刻度尺超出蓝色覆盖层*/
            let maxPerc = (1 - ($('.time-line-divider-container').width() - $('.time-line-blue-cover').width() + dividerRight) / $('.time-line-container').width()) * 100;
            if (maxPerc < 100) {
                let markLeft = $('.time-line-marker').css('left');
                if (Number(markLeft.substring(0, markLeft.length - 2)) / $('.time-line-container').width() > (maxPerc / 100)) {
                    $('.time-line-marker').css('left', maxPerc + '%');
                }
            }
            /* 绘制历史影子*/
            let markerTime = TimeLine.getMarkerTime(); // 获取marker所在的时间
            TimeLine.devHistoryShadow(markerTime);
            $('.view-default-btn-bg').css('background-position', '-210px -30px');
        });
        /* 时间轴初始化完成后,若当前系统时间秒数大于30，左移一次*/
        if (new Date(serverDate).getSeconds() >= 30) {
            /* 蓝色覆盖层宽度超出，才添加刻度*/
            if (timeDividerCountOver / timeDividerCount < 0.124) {
                timeDividerCount = timeDividerCount + 0.5;
                $('.time-line-divider-long, .time-line-divider-short').css('margin-left', $('.time-line-container').width() * 0.025 - 1);
                $('.time-line-divider-container').css('width', $('.time-line-container').width() * 0.025 / 2 + $('.time-line-divider-container').width());
                /* 设置蓝色覆盖层*/
                $('.time-line-blue-cover').css('width', ((timeDividerCount - timeDividerCountOver) / timeDividerCount) * 100 + '%');
            } else {
                timeDividerCountOver = timeDividerCountOver - 0.5;
                /* 设置蓝色覆盖层*/
                $('.time-line-blue-cover').css('width', ((timeDividerCount - timeDividerCountOver) / timeDividerCount) * 100 + '%');
                $('.time-line-marker').css('left', Number((1 - ($('.time-line-divider-container').width() - $('.time-line-blue-cover').width() + parseFloat($('.time-line-divider-container').css('right'))) / $('.time-line-container').width()) * 100) + '%');
            }
            /* 修改滑动条*/
            $('.time-line-slider').rangeSlider('option', 'range', {
                min: ($('.time-line-container').width() / $('.time-line-divider-container').width()) * 100,
                max: ($('.time-line-container').width() / $('.time-line-divider-container').width()) * 100
            });
        }
        /* 点击事件*/
        $('#time-line-click-cover').click(function (e) {
            /* 刻度点击事件在时间轴上的百分比位置*/
            let clickLeftPerc = (e.offsetX / $(this).width()) * 100;
            /* 获取时间轴容器的right值*/
            let dividerRight = parseFloat($('.time-line-divider-container').css('right')); // 强转为float类型，可以完美去掉末尾“px”
            /* 获取最大百分比，防止刻度尺超出蓝色覆盖层*/
            let maxPerc = (1 - ($('.time-line-divider-container').width() - $('.time-line-blue-cover').width() + dividerRight) / $('.time-line-container').width()) * 100;
            if (clickLeftPerc < maxPerc) {
                $('.time-line-marker').css('left', clickLeftPerc + '%');
            } else {
                $('.time-line-marker').css('left', maxPerc + '%');
            }
            timeLineMarketIsClicked = true;
            /* 获取刻度尺对应时间*/
            let markerTime = TimeLine.getMarkerTime();
            /* 绘制影子*/
            TimeLine.devHistoryShadow(markerTime);
            $('.view-default-btn-bg').css('background-position', '-210px -30px');
        });

        /* 时间轴随时间更新*/
        /*edit by guoshuai start 2019/3/19*/
        realTimeCombatLineTimer = setInterval(() => {
            /*edit by guoshuai end 2019/3/19*/
            /* 用监听的方式检测时间变化，系统时间增加一分钟就更新时间轴*/
            let currentTime = new Date(serverDate);
            if (parseInt(currentTime.getTime() / 1000) % 30 == 0) {
                /* 蓝色覆盖层宽度超出，才添加刻度*/
                if (timeDividerCountOver / timeDividerCount < 0.124) {
                    timeDividerCount = timeDividerCount + 0.5;
                    /* 添加刻度*/
                    let addHtml = '';
                    /* 30秒的时候不添加刻度*/
                    if (currentTime.getMinutes() != timeLineEndValue.getMinutes()) {
                        /* 更新时间轴末尾时间值*/
                        timeLineEndValue = new Date(serverDate);
                        if (currentTime.getMinutes() % 5 == 0) {
                            addHtml = `
                            <div class="time-line-divider-long">
                                <div class="time-line-divider-time">
                                    ${add0AtFirst(new Date(currentTime.getTime() + 5 * 60 * 1000).getHours())}:${add0AtFirst(new Date(currentTime.getTime() + 5 * 60 * 1000).getMinutes())}
                                </div>
                            </div>
                        `;
                        } else {
                            addHtml = `
                            <div class="time-line-divider-short"></div>
                        `;
                        }
                        $('.time-line-divider-container').append(addHtml);
                    }
                    $('.time-line-divider-long, .time-line-divider-short').css('margin-left', $('.time-line-container').width() * 0.025 - 1);
                    $('.time-line-divider-container').css('width', $('.time-line-container').width() * 0.025 / 2 + $('.time-line-divider-container').width());
                    /* 设置蓝色覆盖层*/
                    $('.time-line-blue-cover').css('width', ((timeDividerCount - timeDividerCountOver) / timeDividerCount) * 100 + '%');
                    /* 修改滑动条参数*/
                    $('.time-line-slider').rangeSlider('option', 'range', {
                        min: ($('.time-line-container').width() / $('.time-line-divider-container').width()) * 100,
                        max: ($('.time-line-container').width() / $('.time-line-divider-container').width()) * 100
                    });
                    /* 设置滑动条位置*/
                    $('.ui-rangeSlider-bar').css('left', $('.ui-rangeSlider-container').width() * (($('.time-line-divider-container').width() - $('.time-line-container').width() + parseFloat($('.time-line-divider-container').css('right'))) / $('.time-line-divider-container').width()));
                    $('.ui-rangeSlider-leftHandle').css('left', $('.ui-rangeSlider-container').width() * (($('.time-line-divider-container').width() - $('.time-line-container').width() + parseFloat($('.time-line-divider-container').css('right'))) / $('.time-line-divider-container').width()));
                    $('.ui-rangeSlider-rightHandle').css('left', $('.ui-rangeSlider-container').width() * (1 + parseFloat($('.time-line-divider-container').css('right')) / $('.time-line-divider-container').width()) - 6);
                } else {
                    timeDividerCountOver = timeDividerCountOver - 0.5;
                    /* 设置蓝色覆盖层*/
                    $('.time-line-blue-cover').css('width', ((timeDividerCount - timeDividerCountOver) / timeDividerCount) * 100 + '%');
                    if (!timeLineMarketIsClicked) {
                        $('.time-line-marker').css('left', Number((1 - ($('.time-line-divider-container').width() - $('.time-line-blue-cover').width() + parseFloat($('.time-line-divider-container').css('right'))) / $('.time-line-container').width()) * 100) + '%');
                    }
                }
                /* 绘制能量块*/
                devDrawInfoMap.forEach((eachDev) => {
                    // 添加能量块
                    let drawEng = devDrawInfoMap.get(eachDev.devCode).maxEng.value;
                    let engHeight = (drawEng / 255) * 30;
                    if (engHeight < 1 && drawEng != 0) {
                        engHeight = 1; // 能量值不等于1时，能量柱最小高度为1，不然看不到
                    }
                    let blockBgColor = '#33c0db'; // 默认为蓝色
                    // console.log(drawEng);
                    switch (drawEng) {
                        case 1000:
                            blockBgColor = '#aaa'; // 主动式命中
                            break;
                        case 2000:
                            blockBgColor = '#ff0000'; // 主动式脱网
                            break;
                        /**add by gaochao start */
                        case 1001:
                            blockBgColor = 'linear-gradient(to right,red,red,red,red,#aaa,#aaa,#aaa,#aaa)'; //同半分钟命中后脱网
                            break;
                        case 2001:
                            blockBgColor = 'linear-gradient(to right,#aaa,#aaa,#aaa,#aaa,red,red,red,red)'; // 同半分钟脱网后命中
                            break;
                        /**add by gaochao end*/
                        default:
                            break;
                    }
                    /*
                    let ecvb;
                    if (serverDate.getSeconds() > 25) {
                        // 30秒处
                        ecvb = serverDate.Format('yyyy-MM-dd-hh-mm') + '-00';
                    } else {
                        // 00秒处
                        ecvb = new Date(serverDate.getTime() - 60 * 1000).Format('yyyy-MM-dd-hh-mm') + '-30';
                    }*/
                    // class="ecvb-${eachDev.devCode}-${ecvb}"
                    /* 根据设备编号，在该设备对应的能量条中填入能量块*/
                    $(`.eng-column-chart-container-${eachDev.devCode}`).append(`
                        <div class="eng-column-value eng-column-value-${eachDev.devCode}" style="background:rgba(0,0,0,0);">
                            <div style="position:relative; top:${30 - engHeight}px; background:${blockBgColor}; height:${engHeight}px;"></div>
                        </div>
                    `);
                    /* 能量块宽度大小*/
                    $(`.eng-column-value-${eachDev.devCode}`).css('width', $('.eng-column-chart').width() * 0.025 / 2 * 0.7);
                    $(`.eng-column-value-${eachDev.devCode}`).css('margin-left', $('.eng-column-chart').width() * 0.025 / 2 * 0.15);
                    $(`.eng-column-value-${eachDev.devCode}`).css('margin-right', $('.eng-column-chart').width() * 0.025 / 2 * 0.15);
                    /* 能量块容器宽度自增*/
                    if ($('.time-line-blue-cover').width() / $('.time-line-container').width() >= 0.875) {
                        $(`.eng-column-chart-container-${eachDev.devCode}`).css('width', $('.eng-column-chart').width() * 0.025 / 2 + $(`.eng-column-chart-container-${eachDev.devCode}`).width());
                    }
                    // 绘制完成后存储信息
                    if (drawEng > 0) {
                        let mapKey;
                        if (new Date(serverDate).getSeconds() > 25) {
                            // 30秒处
                            mapKey = new Date(serverDate).Format('yyyy-MM-dd hh:mm') + ':00';
                        } else {
                            // 00秒处
                            mapKey = new Date(new Date(serverDate).getTime() - 60 * 1000).Format('yyyy-MM-dd hh:mm') + ':30';
                        }
                        devDrawInfoMap.get(eachDev.devCode).timeLineEngMap.set(mapKey, {
                            position: { lng: devDrawInfoMap.get(eachDev.devCode).maxEng.position.lng, lat: devDrawInfoMap.get(eachDev.devCode).maxEng.position.lat, northAngle: devDrawInfoMap.get(eachDev.devCode).maxEng.position.northAngle },
                            detail: devDrawInfoMap.get(eachDev.devCode).maxEng.detail,
                            passive: devDrawInfoMap.get(eachDev.devCode).maxEng.value,
                        });
                    }
                    // 绘制完成能量缓存归零
                    devDrawInfoMap.get(eachDev.devCode).maxEng.value = 0;
                });
            }
            serverDate = serverDate + 1000;
        }, 1000);

        /* 时间轴复位*/
        /**edit by gaochao start */
        // $('.view-default-btn').click(function () {
            $('.view-lock-btn').click(function () {
            mapFollowFlag = true;
            $('.view-lock-btn div').css("background", "url(img/icon/location_active.png)no-repeat");
        /**edit by gaochao end */
            $('.time-line-divider-container').css('right', '0px');
            timeLineMarketIsClicked = false;
            $('.time-line-marker').css('left', Number((1 - ($('.time-line-divider-container').width() - $('.time-line-blue-cover').width() + parseFloat($('.time-line-divider-container').css('right'))) / $('.time-line-container').width()) * 100) + '%');
            /* 还原滑动条滑块位置*/
            $('.ui-rangeSlider-bar').css('left', $('.ui-rangeSlider-container').width() * (1 - $('.time-line-container').width() / $('.time-line-divider-container').width()));
            $('.ui-rangeSlider-leftHandle').css('left', $('.ui-rangeSlider-container').width() * (1 - $('.time-line-container').width() / $('.time-line-divider-container').width()));
            $('.ui-rangeSlider-rightHandle').css('left', $('.ui-rangeSlider-container').width() - 6);
            map.removeOverlay(historyShadowOverlay);
            $('.eng-column-chart-container').css('right', '0px');
            $('.view-default-btn-bg').css('background-position', '-180px -30px');
            devDrawInfoMap.forEach((eachDev) => {
                if (eachDev.isCorrentView) {
                    /**edit by gaochao start */
                    if (mapFollowFlag) {
                        /**edit by gaochao start */
                        let point = [devInfoMap.get(eachDev.devCode).gpsInfo.lng, devInfoMap.get(eachDev.devCode).gpsInfo.lat];
                        let bdPoint = GPSToBaiduPoint.getBaiduPointLocation([point])[0];
                        // map.setCenter(new BMap.Point(devInfoMap.get(eachDev.devCode).baiduGpsInfo.lng, devInfoMap.get(eachDev.devCode).baiduGpsInfo.lat));
                        map.setCenter(new BMap.Point(bdPoint.lng, bdPoint.lat));
                        /**edit by gaochao start */
                        map.setZoom(map.getZoom() - 1);
                        map.setZoom(map.getZoom() + 1);
                    }
                    /**edit by gaochao end */
                }
            });
        });

    }

    /* 获取刻度尺时间值*/
    static getMarkerTime() {
        let markerLeftPerc = parseFloat($('.time-line-marker').css('left')) / $('.time-line-container').width() * 100;
        /* 获取能量条能量值*/
        // 先获取红色刻度值在时间轴上的百分比
        // 算出超出部分有多少格
        let outerCount = ($('.time-line-divider-container').width() - $('.time-line-container').width() + parseFloat($('.time-line-divider-container').css('right'))) / ($('.time-line-container').width() * 0.025);
        // 红色刻度尺前面的格数 + 超出部分的格数
        let markerLeftCount = markerLeftPerc / 2.5 + outerCount - 1.5;
        // 通过格数确定时间戳
        let clickedTime = new Date((timeLineStartValue + markerLeftCount * 1 * 60) * 1000);
        let markerTime;
        if (clickedTime.getSeconds() < 30) {
            markerTime = new Date((timeLineStartValue + markerLeftCount * 1 * 60) * 1000).Format('yyyy-MM-dd hh:mm') + ':00';
        } else {
            markerTime = new Date((timeLineStartValue + markerLeftCount * 1 * 60) * 1000).Format('yyyy-MM-dd hh:mm') + ':30';
        }
        return markerTime;
    }

    /* 绘制影子*/
    static devHistoryShadow(markerTime) {
        /* 移除上一个影子*/
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

}