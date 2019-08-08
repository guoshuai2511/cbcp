import { BaiduMapInit } from '../../../common/baiduMap/Init.BaiduMap.js';
import { GPSToBaiduPoint } from '../../../common/baiduMap/GPSToBaiduPoint.BaiduMap.js';

import { DrawMultiBtsEcharts } from '../overlay/DrawMultiBtsEcharts.js'
import { DrawDevOverlay } from '../overlay/DrawDevOverlay.js';
import { DrawBtsOverlay } from '../overlay/DrawBtsOverlay.js';

import { Energy } from '../energy/Energy.js';
import { EnergySound } from '../sound/EnergySound.js';

export class ParsingDevInfo {

    static parsingDevInfo(devBaseInfo, isPlayEngAudio) {
        Array.prototype.remove = function (dx) {
            if (isNaN(dx) || dx > this.length) { return false; }
            for (var i = 0, n = 0; i < this.length; i++) {
                if (this[i] != this[dx]) {
                    this[n++] = this[i]
                }
            }
            this.length -= 1
        }
        // console.table(devBaseInfo);
        // /* 授时图标，主授时1，被授时2*/
        for (let i = 0; i < devBaseInfo.length; i++) {
            if (devBaseInfo[i].engInfo != null) {
                if (devBaseInfo[i].engInfo.syncMode == 1) {
                    // $(`.team-each-dev-timeservice-${devBaseInfo[i].devCode}`).html('主授时');
                    $(`.team-each-dev-timeservice-${devBaseInfo[i].devCode}`).css('background-position', '-20px -70px');
                    $(`.team-each-dev-timeservice-${devBaseInfo[i].devCode}`).css('display', 'block');
                    /**add by gaochao start */
                    $(`#team-each-dev-timeservice-status-${devBaseInfo[i].devCode}`).css('display', 'block');
                    $(`#team-each-dev-timeservice-value-${devBaseInfo[i].devCode}`).css('display', 'block');
                    $(`#team-each-dev-timeservice-status-${devBaseInfo[i].devCode}`).css('background', 'url(img/icon/timeserver_main.png)');
                    $(`#team-each-dev-timeservice-value-${devBaseInfo[i].devCode}`).html('主授时');
                    /**add by gaochao end */
                } else if (devBaseInfo[i].engInfo.syncMode == 2) {
                    // $(`.team-each-dev-timeservice-${devBaseInfo[i].devCode}`).html('被授时');
                    $(`.team-each-dev-timeservice-${devBaseInfo[i].devCode}`).css('background-position', '-40px -70px');
                    $(`.team-each-dev-timeservice-${devBaseInfo[i].devCode}`).css('display', 'block');
                    /**add by gaochao start */
                    $(`#team-each-dev-timeservice-status-${devBaseInfo[i].devCode}`).css('display', 'block');
                    $(`#team-each-dev-timeservice-value-${devBaseInfo[i].devCode}`).css('display', 'block');
                    $(`#team-each-dev-timeservice-status-${devBaseInfo[i].devCode}`).css('background', 'url(img/icon/timeserver_passive.png)');
                    $(`#team-each-dev-timeservice-value-${devBaseInfo[i].devCode}`).html('被授时');
                    /**add by gaochao end */
                } else {
                    $(`.team-each-dev-timeservice-${devBaseInfo[i].devCode}`).css('display', 'none');
                    /**add by gaochao start */
                    $(`#team-each-dev-timeservice-status-${devBaseInfo[i].devCode}`).css('display', 'none');
                    $(`#team-each-dev-timeservice-value-${devBaseInfo[i].devCode}`).css('display', 'none');
                    /**add by gaochao end */
                }
            }
        }

        for (let i = 0; i < devBaseInfo.length; i++) {
            if (devBaseInfo[i].engInfo != undefined && devBaseInfo[i].engInfo.isShow == 0) {
                devBaseInfo.remove(i);
            }
        }
        if (devBaseInfo[0] != null) {
            /* 设置中心点*/
            for (let i = 0; i < devBaseInfo.length; i++) { // 有车载的情况
                if (devBaseInfo[i].devType == 1) {
                    centerPointDevCode = devBaseInfo[i].devCode;
                    break;
                }
            }
            if (centerPointDevCode == null) { // 没有车载的情况
                centerPointDevCode = devBaseInfo[0].devCode;
            }
            /**add by gaochao start */
            for (let i = 0; i < devBaseInfo.length; i++) {
                if (devBaseInfo[i].devType == 1) {
                    if (devBaseInfo[i].activeSupport == 1) {
                        activeSupport = 1;
                        break;
                    } else {
                        activeSupport = 0;
                    }
                }
            }
            for (let i = 0; i < devBaseInfo.length; i++) {
                if (devBaseInfo[i].devType == 1) {
                    if (devBaseInfo[i].activeEnable == 1) {
                        activeEnable = 1;
                        break;
                    } else {
                        activeEnable = 0;
                    }
                }
            }
            /**add by gaochao end*/
            /* 主动式图标*/
            for (let i = 0; i < devBaseInfo.length; i++) {
                if (devBaseInfo[i].devType == 1) {
                    $('.activedev-info-value').css("display", "block");
                    $('.activedev-info-time').css("display", "block");
                    $('.activedev-info-btn').css("display", "block");
                    /**edit by gaochao start */
                    if (activeSupport == 0) {
                        /**不支持主动式 */
                        $('.activedev-info-icon-new').css('display', 'block');
                        $('.activedev-info-title').css('display', 'block');
                        $('.activedev-info-title').css('color', '#fff');
                        $('.activedev-info-title').html('不支持主动式');
                        $('.activedev-info-icon-new').css('background', 'url(img/icon/active_notsupport.png)');
                    } else {
                        /**支持主动式 */
                        $('.activedev-info-icon-new').css('display', 'block');
                        // $('.activedev-info-title').css('display', 'block');
                        // $('.activedev-info-title').css('color', '#fff');
                        // $('.activedev-info-title').html('主动式未开启');
                        // $('.activedev-info-icon-new').css('background', 'url(img/icon/active_support.png)');
                        if (devBaseInfo[i].activeEnable != 1) {
                            /* 主动式关闭*/
                            if (!$('.activedev-info-icon').hasClass('gray-cover')) {
                                $('.activedev-info-icon').addClass('gray-cover');
                                /**add by gaochao start */
                                $('.activedev-info-title').css('display', 'block');
                                $('.activedev-info-title').css('color', '#fff');
                                // $('.activedev-info-title').html('主动式未开启');
                                $('.activedev-info-icon-new').css('background', 'url(img/icon/active_support.png)');
                                /**add by gaochao end */
                            }
                        } else {
                            /* 主动式开启*/
                            if ($('.activedev-info-icon').hasClass('gray-cover')) {
                                $('.activedev-info-icon').removeClass('gray-cover');
                                /**add by gaochao start */
                                $('.activedev-info-title').css('display', 'block');
                                $('.activedev-info-title').css('color', '#fff');
                                // $('.activedev-info-title').html('主动式未命中');
                                $('.activedev-info-icon-new').css('background', 'url(img/icon/active_active.png)');
                                /**add by gaochao end */
                            }
                        }
                    }
                    /**edit by gaochao end */
                }
            }
            /* 更新右侧面版GPS信息*/
            for (let i = 0; i < devBaseInfo.length; i++) {
                if (devBaseInfo[i].gpsInfo == undefined) {
                    continue;
                }
                if (devBaseInfo[i].gpsInfo.accuracy <= 50) {
                    $(`#team-each-dev-gpsstatus-${devBaseInfo[i].devCode}`).removeClass('gray-cover');
                    $(`#team-each-dev-gpsstatus-${devBaseInfo[i].devCode}`).attr('title', 'GPS信号强');
                    /**add by gaochao start */
                    $(`#team-each-dev-gps-status-${devBaseInfo[i].devCode}`).css('background', 'url("img/icon/my_gps_active.png")');
                    $(`#team-each-dev-gps-value-${devBaseInfo[i].devCode}`).html('正常');
                    /**add by gaochao end */
                } else {
                    $(`#team-each-dev-gpsstatus-${devBaseInfo[i].devCode}`).addClass('gray-cover');
                    $(`#team-each-dev-gpsstatus-${devBaseInfo[i].devCode}`).attr('title', 'GPS信号弱');
                    /**add by gaochao start */
                    $(`#team-each-dev-gps-status-${devBaseInfo[i].devCode}`).css('background', 'url("img/icon/my_gps.png")');
                    $(`#team-each-dev-gps-value-${devBaseInfo[i].devCode}`).html('无信号');
                    /**add by gaochao end */
                }
            }
            /**ed by gaochao start */
            for (let i = 0; i < devBaseInfo.length; i++) {
                if (devBaseInfo[i].devType == 1) {
                    $(`#team-each-dev-speed-value-${devBaseInfo[i].devCode}`).html(`${(devBaseInfo[i].gpsInfo == undefined || devBaseInfo[i].gpsInfo == null) ? "" : devBaseInfo[i].gpsInfo.speed + "km/h"}`);
                } else {
                    $(`#team-each-dev-altitude-value-${devBaseInfo[i].devCode}`).html(`${(devBaseInfo[i].gpsInfo == undefined || devBaseInfo[i].gpsInfo == null) ? "" : (devBaseInfo[i].gpsInfo.elevation + "m")}`);
                    /**edit by gaochao end */
                }
            }
            /* 主动式命中脱网*/
            let passiveActiveFlag = 0;
            let passiveActiveIndex = 0;
            for (let i = 0; i < devBaseInfo.length; i++) {
                if (devBaseInfo[i].activeHit == 1 || devBaseInfo[i].activeHit == 2) {
                    passiveActiveFlag = devBaseInfo[i].activeHit;
                    passiveActiveIndex = i;
                    break;
                }
            }
            /**edti by gaochao start */
            if (activeSupport == 0) {
                $('.activedev-info-title').css('color', '#fff');
                $('.activedev-info-title').html('不支持主动式');
                $('.activedev-info-icon-new').css('background', 'url(img/icon/active_notsupport.png)');
            } else if (activeEnable == 0) {
            	$('.activedev-info-btn').css("display", "block");
                $('.activedev-info-title').css('display', 'block');
                $('.activedev-info-title').css('color', '#fff');
                // $('.activedev-info-title').html('主动式未开启');
                $('.activedev-info-icon-new').css('background', 'url(img/icon/active_support.png)');
            } else if (devBaseInfo[passiveActiveIndex].devType == 1) {
            	$('.activedev-info-btn').css("display", "block");
                switch (passiveActiveFlag) {
                    case 0:
                        /* 默认*/
                        $('.activedev-info-status-value').css('background', '#999');
                        $('.activedev-info-status-value').html('主动式未命中');
                        /**add by gaochao start */
                        $('.activedev-info-title').css('color', '#fff');
                        // $('.activedev-info-title').html('主动式未命中');
                        /**add by gaochao end */
                        passiveActiveStatus = 0;
                        break;
                    case 1:
                        /* 命中*/
                        if ($('#passive-route-line-switch').attr('data-switch-close') == 0) {
                            $('#passive-route-line-switch').attr('data-switch-close', 1);
                            /**edit by gaochao start */
                            $('.activedev-info-value').css("display", "block");
                            $('.activedev-info-time').css("display", "block");
                            //$('.activedev-info-btn').css("display", "block");
                            // $('#passive-route-line-switch').removeClass('gray-cover');
                            $('#passive-route-line-switch').css('background', 'url(img/icon/active_load_avtive.png)');
                            /**edit by gaochao end */
                        }
                        $('.activedev-info-status-value').css('background', '#ff0000');
                        $('.activedev-info-status-value').html('主动式命中');
                        /**add by gaochao start */
                        $('.activedev-info-title').css('color', 'rgba(23,193,244,1)');
                        $('.activedev-info-title').html('主动式命中');
                        $('.activedev-info-icon-new').css('background', 'url(img/icon/active_active.png)');
                        /**add by gaochao end */
                        break;
                    case 2:
                        /* 脱网*/
                        $('.activedev-info-status-value').css('background', '#999');
                        $('.activedev-info-status-value').html('主动式脱网');
                        /**add by gaochao start */
                        $('.activedev-info-title').css('color', '#fff');
                        $('.activedev-info-title').html('主动式脱网');
                        $('.activedev-info-icon-new').css('background', 'url(img/icon/active_active.png)');
                        /**add by gaochao end */
                        break;
                    default:
                        break;
                }
            }
            if (activeSupport == 1) {
                if (devBaseInfo[passiveActiveIndex].devType == 1) {
                    /**edit by gaochao end */
                    // if (lastPassiveActiveStatus != null) {
                    switch (passiveActiveFlag) {
                        case 0:
                            /* 默认*/
                            passiveActiveStatus = 0;
                            break;
                        case 1:
                            /* 命中*/
                            if (passiveActiveStatus != 1) {
                                if (engAudioType != 3) {
                                    EnergySound.playPassiveActive(true);
                                }
                                passiveActiveStatus = 1;
                                /**add by gaochao start */
                                let hitedBts = { btsId: null, dev: [] };
                                DrawMultiBtsEcharts.showBtsStyleCSS(hitedBts);
                                /**add by gaochao end */
                                /* 时间轴信息中存储主动式命中*/
                                if (devBaseInfo[passiveActiveIndex].devType == 1) {
                                    let bp = GPSToBaiduPoint.getBaiduPointLocation([[devBaseInfo[passiveActiveIndex].gpsInfo.lng, devBaseInfo[passiveActiveIndex].gpsInfo.lat]])[0];
                                    if (devDrawInfoMap.get(devBaseInfo[passiveActiveIndex].devCode).maxEng.value == 1000) {
                                        devDrawInfoMap.get(devBaseInfo[passiveActiveIndex].devCode).maxEng.value = 2001;
                                    } else {
                                        devDrawInfoMap.get(devBaseInfo[passiveActiveIndex].devCode).maxEng.value = 2000;
                                    }
                                    devDrawInfoMap.get(devBaseInfo[passiveActiveIndex].devCode).maxEng.position.lng = bp.lng;
                                    devDrawInfoMap.get(devBaseInfo[passiveActiveIndex].devCode).maxEng.position.lat = bp.lat;
                                    devDrawInfoMap.get(devBaseInfo[passiveActiveIndex].devCode).maxEng.position.northAngle = devBaseInfo[passiveActiveIndex].gpsInfo.northAngle;
                                    if (devBaseInfo[passiveActiveIndex].energy != null) {
                                        devDrawInfoMap.get(devBaseInfo[passiveActiveIndex].devCode).maxEng.detail = devBaseInfo[passiveActiveIndex].energy;
                                    } else {
                                        devDrawInfoMap.get(devBaseInfo[passiveActiveIndex].devCode).maxEng.detail = [0, 0, 0, 0];
                                    }
                                }
                            }
                            break;
                        case 2:
                            /* 脱网*/
                            /**add by gaochao end */
                            if (passiveActiveStatus != 2) {
                                if (engAudioType != 3) {
                                    EnergySound.playPassiveActive(false);
                                }
                                passiveActiveStatus = 2;
                                /* 时间轴信息中存储主动式脱网*/
                                if (devBaseInfo[passiveActiveIndex].devType == 1) {
                                    let bp = GPSToBaiduPoint.getBaiduPointLocation([[devBaseInfo[passiveActiveIndex].gpsInfo.lng, devBaseInfo[passiveActiveIndex].gpsInfo.lat]])[0];
                                    if (devDrawInfoMap.get(devBaseInfo[passiveActiveIndex].devCode).maxEng.value == 2000) {
                                        devDrawInfoMap.get(devBaseInfo[passiveActiveIndex].devCode).maxEng.value = 1001;
                                    } else {
                                        devDrawInfoMap.get(devBaseInfo[passiveActiveIndex].devCode).maxEng.value = 1000;
                                    }
                                    devDrawInfoMap.get(devBaseInfo[passiveActiveIndex].devCode).maxEng.position.lng = bp.lng;
                                    devDrawInfoMap.get(devBaseInfo[passiveActiveIndex].devCode).maxEng.position.lat = bp.lat;
                                    devDrawInfoMap.get(devBaseInfo[passiveActiveIndex].devCode).maxEng.position.northAngle = devBaseInfo[passiveActiveIndex].gpsInfo.northAngle;
                                    if (devBaseInfo[passiveActiveIndex].energy != null) {
                                        devDrawInfoMap.get(devBaseInfo[passiveActiveIndex].devCode).maxEng.detail = devBaseInfo[passiveActiveIndex].energy;
                                    } else {
                                        devDrawInfoMap.get(devBaseInfo[passiveActiveIndex].devCode).maxEng.detail = [0, 0, 0, 0];
                                    }
                                }
                            }
                            break;
                        default:
                            break;
                    }
                    // }
                    // lastPassiveActiveStatus = devBaseInfo[passiveActiveIndex].activeHit; // 保存上一次的信息
                }
            }
            /* 能量语音播报*/
            let engAudioInfo = { devType: null, deg: null, value: null, index: null, isPlay: false, hasA: false };
            let setEngAudioInfo = function (devBaseInfo) {
                /* 判断设备数量（报单兵还是单兵A等）*/
                let carDevNum = 0;
                let singleDevNum = 0;
                devDrawInfoMap.forEach((eachDev) => {
                    switch (eachDev.devType) {
                        case 1:
                            carDevNum = carDevNum + 1;
                            break;
                        case 2:
                            singleDevNum = singleDevNum + 1;
                            break;
                        default:
                            break;
                    }
                });
                switch (devBaseInfo.devType) {
                    case 1: // 车载能量
                        if (carDevNum < 2) {
                            engAudioInfo.hasA = false;
                        } else {
                            engAudioInfo.hasA = true;
                        }
                        let engArray = devBaseInfo.engInfo.eng.split("-");
                        if (engArray[0] == 1 && engArray[1] == 1 && engArray[2] == 1 && engArray[3] == 1) {
                            engAudioInfo.devType = 1;
                            engAudioInfo.value = 1;
                            engAudioInfo.index = devDrawInfoMap.get(devBaseInfo.devCode).devImgIndex;
                            if (devInfoMap.get(devBaseInfo.devCode) != null && devInfoMap.get(devBaseInfo.devCode).lastEngInfo != null) {
                                /* 实时作战中，能量值没有变化就不报*/
                                if (thisPageType == 'RTC' && devInfoMap.get(devBaseInfo.devCode).lastEngInfo.lastReportTime == devBaseInfo.engInfo.lastReportTime) {
                                    engAudioInfo.isPlay = false;
                                } else {
                                    engAudioInfo.isPlay = true;
                                }
                            } else {
                                engAudioInfo.isPlay = true;
                            }
                        } else if (engArray[0] != 0 && engArray[1] != 0 && engArray[2] != 0 && engArray[3] != 0) {
                            engAudioInfo.devType = 1;
                            engAudioInfo.deg = Energy.getEnergyOrientation(engArray, 0);
                            engAudioInfo.value = Energy.getEnergyMaxValue(engArray);
                            engAudioInfo.index = devDrawInfoMap.get(devBaseInfo.devCode).devImgIndex;
                            if (devInfoMap.get(devBaseInfo.devCode) != null && devInfoMap.get(devBaseInfo.devCode).lastEngInfo != null) {
                                if (thisPageType == 'RTC' && devInfoMap.get(devBaseInfo.devCode).lastEngInfo.lastReportTime == devBaseInfo.engInfo.lastReportTime) {
                                    engAudioInfo.isPlay = false;
                                } else {
                                    engAudioInfo.isPlay = true;
                                }
                            } else {
                                engAudioInfo.isPlay = true;
                            }
                        }
                        break;
                    case 2: // 单兵能量
                        if (singleDevNum < 2) {
                            engAudioInfo.hasA = false;
                        } else {
                            engAudioInfo.hasA = true;
                        }
                        engAudioInfo.devType = 2;
                        engAudioInfo.value = devBaseInfo.engInfo.eng;
                        engAudioInfo.index = devDrawInfoMap.get(devBaseInfo.devCode).devImgIndex;
                        if (devInfoMap.get(devBaseInfo.devCode) != null && devInfoMap.get(devBaseInfo.devCode).lastEngInfo != null) {
                            /* 实时作战中，能量值没有变化就不报*/
                            if (thisPageType == 'RTC' && devInfoMap.get(devBaseInfo.devCode).lastEngInfo.lastReportTime == devBaseInfo.engInfo.lastReportTime) {
                                engAudioInfo.isPlay = false;
                            } else {
                                engAudioInfo.isPlay = true;
                            }
                        } else {
                            engAudioInfo.isPlay = true;
                        }
                        break;
                    default:
                        break;
                }
            }
            switch (engAudioType) {
                case 1: // 单选
                    /* 只选择当前视角的设备，不选中其它设备*/
                    for (let i = 0; i < devBaseInfo.length; i++) {
                        if (devDrawInfoMap.get(devBaseInfo[i].devCode).isCorrentView) {
                            if (devBaseInfo[i].engInfo != null) {
                                setEngAudioInfo(devBaseInfo[i]);
                            }
                            break;
                        }
                    }
                    break;
                case 2: // 优选
                    /* 优先选择当前视角*/
                    /**edti by gaochao start */
                    for (let i = 0; i < devBaseInfo.length; i++) {
                        if (devDrawInfoMap.get(devBaseInfo[i].devCode).isCorrentView) {
                            if (devBaseInfo[i].engInfo != null) {
                                if (voiceDevCode[devBaseInfo[i].devCode] != 0) {
                                    setEngAudioInfo(devBaseInfo[i]);
                                }
                            }
                            break;
                        }
                    }
                    /* 若当前视角的设备无能量值，则选择其它设备*/
                    if (!engAudioInfo.isPlay) {
                        for (let i = 0; i < devBaseInfo.length; i++) {
                            if (devBaseInfo[i].engInfo != null) {
                                if (voiceDevCode[devBaseInfo[i].devCode] != 0) {
                                    setEngAudioInfo(devBaseInfo[i]);
                                }
                            }
                            /**edit by gaochao end */
                            if (engAudioInfo.isPlay) {
                                break;
                            }
                        }
                    }
                    break;
                case 3: // 静音
                    break;
                default:
                    break;
            }
            if (isPlayEngAudio) {
                if (!audioPlayerStatus && engAudioInfo.isPlay) {
                    audioPlayerStatus = true;
                    switch (engAudioInfo.devType) {
                        case 1:
                            EnergySound.playCarAudio(engAudioInfo.index, engAudioInfo.deg, engAudioInfo.value, engAudioInfo.hasA);
                            break;
                        case 2:
                            EnergySound.playSingleAudio(engAudioInfo.index, engAudioInfo.value, engAudioInfo.hasA);
                            break;
                        default:
                            break;
                    }
                }
            }
            /* 基站命中特效*/
            if (thisPageType == 'RTC') {
                let hitedBts = { btsId: null, dev: [] };
                let lastReportTimeCache = 0;
                for (let i = 0; i < devBaseInfo.length; i++) {
                    if (devBaseInfo[i].engInfo != null && devBaseInfo[i].engInfo.btsId != '0-0-0-0') {
                        if (devBaseInfo[i].engInfo.lastReportTime >= lastReportTimeCache) {
                            if (hitedBts.dev.length > 0) {
                                hitedBts.dev = [];
                            }
                            hitedBts.btsId = devBaseInfo[i].engInfo.btsId;
                            hitedBts.dev.push(devBaseInfo[i].devCode);
                            lastReportTimeCache = devBaseInfo[i].engInfo.lastReportTime;
                        }
                    }
                }
                /**edit by sunbing start*/
                if (hitedBts.btsId != null && hitedBts.btsId != "") {
                    /**edit by sunbing end*/
                    let isEquals = 0;
                    /* 如果上次数据中的命中基站和本次相同，不用重绘*/
                    if (hitedBts.btsId == hitedBtsCache.btsId) {
                        for (let i = 0; i < hitedBts.dev.length; i++) {
                            for (let j = 0; j < hitedBtsCache.dev.length; j++) {
                                if (hitedBts.dev[i] == hitedBtsCache.dev[j]) {
                                    isEquals = isEquals + 1;
                                }
                            }
                        }
                    }
                    if (isEquals < hitedBts.dev.length) {
                        hitedBtsCache = hitedBts;
                        if (isBtsOpen) {
                            DrawMultiBtsEcharts.showBtsStyleCSS(hitedBts);
                        }
                    }
                } else {
                    hitedBtsCache = hitedBts; // 存入缓存
                }
            }

            /* 需要重绘制的小车数组*/
            let devBaseInfoRefresh = [];
            /* 将json信息存入map*/
            for (let i = 0, len = devBaseInfo.length; i < len; i++) {
                if (devInfoMap.get(devBaseInfo[i].devCode) != null) {
                    /* 如果map集合中的key含该设备编号，则保存其‘设备详细信息面板是否开启’的信息，若不包含，则设置默认值false */
                    devBaseInfo[i].isInfoPanelOpen = devInfoMap.get(devBaseInfo[i].devCode).isInfoPanelOpen;
                    /* 上一次的GPS坐标*/
                    devBaseInfo[i].lastGpsInfo = devInfoMap.get(devBaseInfo[i].devCode).lastGpsInfo;
                    /* 上一次的百度坐标*/
                    devBaseInfo[i].lastBaiduGpsInfo = devInfoMap.get(devBaseInfo[i].devCode).lastBaiduGpsInfo;
                    /* 上一次的工作状态*/
                    devBaseInfo[i].lastStatus = devInfoMap.get(devBaseInfo[i].devCode).lastStatus;
                    /* 上一次的主动式命中信息*/
                    devBaseInfo[i].lastActiveHit = devInfoMap.get(devBaseInfo[i].devCode).lastActiveHit;
                    /* 上一次的能量值*/
                    devBaseInfo[i].lastEngInfo = devInfoMap.get(devBaseInfo[i].devCode).lastEngInfo;
                    /* 添加0能量值*/
                    try {
                        /**add by gaochao start */
                        if (devBaseInfo[i].engInfo.eng == null || devBaseInfo[i].engInfo.eng == "") {
                            /**add by gaochao end*/
                            devBaseInfo[i].engInfo.isHit = false;
                            if (devBaseInfo[i].devType == 1) {
                                devBaseInfo[i].engInfo.eng = '0-0-0-0';
                            } else {
                                devBaseInfo[i].engInfo.eng = '0';
                            }
                        } else {
                            devBaseInfo[i].engInfo.isHit = true;
                        }
                    } catch (error) {
                        if (devBaseInfo[i].devType == 1) {
                            devBaseInfo[i].engInfo = { eng: '0-0-0-0', isHit: false };
                        } else {
                            devBaseInfo[i].engInfo = { eng: '0', isHit: false };
                        }
                    }
                    /* 精度值大于10，使用上一次的GPS信息*/
                    if (devBaseInfo[i].gpsInfo != undefined && devBaseInfo[i].devType == 2 && devBaseInfo[i].gpsInfo.accuracy > 50) {
                        devBaseInfo[i].gpsInfo.lng = devBaseInfo[i].lastGpsInfo.lng;
                        devBaseInfo[i].gpsInfo.lat = devBaseInfo[i].lastGpsInfo.lat;
                    }
                    /* 重绘条件*/
                    switch (thisPageType) {
                        case 'RTC':
                            if (devBaseInfo[i].lastGpsInfo.northAngle == devBaseInfo[i].gpsInfo.northAngle && devBaseInfo[i].lastGpsInfo.lng == devBaseInfo[i].gpsInfo.lng && devBaseInfo[i].lastGpsInfo.lat == devBaseInfo[i].gpsInfo.lat && devBaseInfo[i].lastStatus == devBaseInfo[i].status) {
                                devBaseInfo[i].shouldRefresh = false;
                                if (devBaseInfo[i].lastEngInfo.lastReportTime != devBaseInfo[i].engInfo.lastReportTime) {
                                    devBaseInfo[i].shouldRefresh = true;
                                    devBaseInfoRefresh.push(devBaseInfo[i]);
                                }
                            } else {
                                devBaseInfo[i].shouldRefresh = true;
                                devBaseInfoRefresh.push(devBaseInfo[i]);
                            }
                            break;
                        case 'CR':
                            devBaseInfo[i].shouldRefresh = true;
                            devBaseInfoRefresh.push(devBaseInfo[i]);
                            break;
                        default:
                            break;
                    }
                } else {
                    /* 新添加的设备信息缓存初始化 */
                    devBaseInfo[i].isInfoPanelOpen = false;
                    devBaseInfo[i].lastGpsInfo = { lng: '0', lat: '0' };
                    devBaseInfo[i].lastBaiduGpsInfo = { lng: '0', lat: '0' };
                    devBaseInfo[i].lastStatus = 1;
                    devBaseInfo[i].lastActiveHit = 0;
                    try {
                        /**edit by gaochao start */
                        if (devBaseInfo[i].engInfo.eng == null || devBaseInfo[i].engInfo.eng == "") {
                            /**edit by gaochao end */
                            if (devBaseInfo[i].devType == 1) {
                                devBaseInfo[i].engInfo.eng = '0-0-0-0';
                                devBaseInfo[i].engInfo.isHit = false;
                            } else {
                                devBaseInfo[i].engInfo.eng = '0';
                                devBaseInfo[i].engInfo.isHit = false;
                            }
                        } else {
                            devBaseInfo[i].engInfo.isHit = true;
                        }
                    } catch (error) {
                        if (devBaseInfo[i].devType == 1) {
                            devBaseInfo[i].engInfo = { eng: '0-0-0-0', isHit: false };
                        } else {
                            devBaseInfo[i].engInfo = { eng: '0', isHit: false };
                        }
                    }
                    if (devBaseInfo[i].devType == 1) {
                        devBaseInfo[i].lastEngInfo = { eng: '0-0-0-0', isHit: false };
                    } else {
                        devBaseInfo[i].lastEngInfo = { eng: '0', isHit: false };
                    }
                    devBaseInfo[i].shouldRefresh = true;
                    devBaseInfoRefresh.push(devBaseInfo[i]);
                }
                devInfoMap.set(devBaseInfo[i].devCode, devBaseInfo[i]);
            }
            this.getDevBaiduPoint(devBaseInfoRefresh);
        }
    }

    /* GPS坐标转百度坐标 */
    static getDevBaiduPoint(devBaseInfo) {
        let pointArray = [];
        for (let i = 0, len = devBaseInfo.length; i < len; i++) {
            let point = [devBaseInfo[i].gpsInfo.lng, devBaseInfo[i].gpsInfo.lat];
            pointArray.push(point);
        }
        GPSToBaiduPoint.getBaiduPointLocationPromise(pointArray).then((point) => {
            let drawArr = [];
            for (let i = 0; i < point.length; i++) {
                devBaseInfo[i].baiduGpsInfo = { lng: point[i].lng, lat: point[i].lat };
                drawArr.push(devBaseInfo[i]);
            }
            this.drawDev(drawArr); // 转换完成后绘制
        });
    }

    /*在map中存储设备信息，并执行绘制方法*/
    static drawDev(devBaseInfo) {
        let drawMap = new Map();
        for (let i = 0, len = devBaseInfo.length; i < len; i++) {
            devInfoMap.set(devBaseInfo[i].devCode, devBaseInfo[i]);
            drawMap.set(devBaseInfo[i].devCode, devBaseInfo[i]);
        }
        DrawDevOverlay.drawDev(drawMap);
    }

}