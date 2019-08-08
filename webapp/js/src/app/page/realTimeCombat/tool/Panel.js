export class Panel {

    static addNewDev(devBaseInfo, i) {
        devDrawInfoMap.set(devBaseInfo[i].devCode, 1);
        /* 右部面板添加新设备*/
        let isAddActive = '';
        /**add by gaochao start */
        let isActive = '';
        /**add by gaochao end */
        if (devDrawInfoMap.size == 1) {
            currentViewDevCode = devBaseInfo[i].devCode;
            isAddActive = 'team-each-dev-active';
            /**add by gaochao start */
            isActive = 'group-location-choose';
            /**add by gaochao end */
            if (devBaseInfo[i].devType == 1) {
                $('.car-speed').css('display', 'block'); // 显示车速表
            }
        }
        /* 确定设备图片索引*/
        let devImgIndex = 0;
        devDrawInfoMap.forEach((eachDev) => {
            if (devBaseInfo[i].devType == eachDev.devType) {
                devImgIndex++;
            }
        });
        if (devBaseInfo[i].devType == 1) {
            $('.team-each-dev-container-car').append(`
                <div class="team-each-dev team-each-dev-${devBaseInfo[i].devCode} ${isAddActive}" data-info-devcode="${devBaseInfo[i].devCode}">
                    <!--用户名-->
                    <div class="team-each-dev-uaername user-name-value-by-id-${devBaseInfo[i].userId}" title=""></div>
                    <!--设备图片-->
                    <img class="team-each-dev-icon-car team-each-dev-icon-${devBaseInfo[i].devCode}" src="img/car_${devImgIndex}.png">
                    <!--GPS状态-->
                    <div class="team-each-dev-gpsstatus" id="team-each-dev-gpsstatus-${devBaseInfo[i].devCode}" title=""></div>
                    <!--车载A-->
                    <div class="team-each-dev-index-car">${abcCache[devImgIndex]}</div>
                    <!--授时-->
                    <div class="team-each-dev-timeservice team-each-dev-timeservice-${devBaseInfo[i].devCode}" style="display:none;"></div>
                    <div class="team-each-dev-eng-car">
                        <div class="eng-orientation-icon"></div>
                        <!--能量值-->
                        <div class="eng-value-car eng-value-car-0" id="eng-value-car-0-${devBaseInfo[i].devCode}"><span style="color: #555">0</span></div>
                        <div class="eng-value-car eng-value-car-1" id="eng-value-car-1-${devBaseInfo[i].devCode}"><span style="color: #555">0</span></div>
                        <div class="eng-value-car eng-value-car-2" id="eng-value-car-2-${devBaseInfo[i].devCode}"><span style="color: #555">0</span></div>
                        <div class="eng-value-car eng-value-car-3" id="eng-value-car-3-${devBaseInfo[i].devCode}"><span style="color: #555">0</span></div>
                        <!--能量命中时间-->
                        <div class="eng-hit-time-car" id="eng-hit-time-car-${devBaseInfo[i].devCode}"></div>
                    </div>
                </div>
            `);
            /**add by gaochao start */
            $('.group-location-car-container').append(`
            <div class="group-location-each team-each-dev-${devBaseInfo[i].devCode} ${isActive}" data-info-devcode="${devBaseInfo[i].devCode}">
                <div class="group-location-person">
                    <div class="group-location-person-photo user-name-value-by-id-${devBaseInfo[i].userId}-photo"></div>
                    <div class="group-location-person-status group-location-person-status-${devBaseInfo[i].devCode}" data-info-status=1></div>
                    <div class="group-location-person-name user-name-value-by-id-${devBaseInfo[i].userId}" title=""></div>
                    <div class="group-location-person-gps-icon" id="team-each-dev-gps-status-${devBaseInfo[i].devCode}" title=""></div>
                    <div class="group-location-person-gps-value" id="team-each-dev-gps-value-${devBaseInfo[i].devCode}"></div>
                    <div class="group-location-person-speed-icon"></div>
                    <div class="group-location-person-speed-value" id="team-each-dev-speed-value-${devBaseInfo[i].devCode}">0km/h</div>
                </div>
                <div class="group-location-line"></div>
                <div class="group-location-car-dev">
                    <div class="group-location-devcode">${devBaseInfo[i].devCode}</div>
                    <div class="group-location-car-engtime" id="eng-hit-time-car-${devBaseInfo[i].devCode}"></div>
                    <div class="group-location-more-engtime"></div>
                    <div class="group-location-timeserver-icon" id="team-each-dev-timeservice-status-${devBaseInfo[i].devCode}" style="display:none;"></div>
                    <div class="group-location-timeserver-value" id="team-each-dev-timeservice-value-${devBaseInfo[i].devCode}" style="display:none;"></div>
                    <div class="group-location-temperature-icon" id="team-each-dev-temperature-icon-${devBaseInfo[i].devCode}"></div>
                    <div class="group-location-temperature-value" id="team-each-dev-temperature-value-${devBaseInfo[i].devCode}">0℃</div>
                    <div class="group-location-battery-car-icon" id="team-each-dev-battery-icon-${devBaseInfo[i].devCode}"></div>
                    <div class="group-location-battery-value" id="team-each-dev-battery-value-${devBaseInfo[i].devCode}">0%</div>
                    <div class="group-location-dev-line"></div>
                    <div class="group-location-car-icon team-each-dev-icon-${devBaseInfo[i].devCode}"  style="background:url(img/icon/car_${devImgIndex}.png)no-repeat;"></div>
                    <div class="group-location-careng-top group-location-careng" id="eng-value-car-0-${devBaseInfo[i].devCode}"><span style="color: #666666">0</span></div>
                    <div class="group-location-careng-right group-location-careng" id="eng-value-car-1-${devBaseInfo[i].devCode}"><span style="color: #666666">0</span></div>
                    <div class="group-location-careng-left group-location-careng" id="eng-value-car-3-${devBaseInfo[i].devCode}"><span style="color: #666666">0</span></div>
                    <div class="group-location-careng-bottom group-location-careng" id="eng-value-car-2-${devBaseInfo[i].devCode}"><span style="color: #666666">0</span></div>
                    <div class="group-location-voice" id="group-location-voice-${devBaseInfo[i].devCode}" data-code="${devBaseInfo[i].devCode}" data-status=1></div>
                </div>
            </div>
            `)
            /**add by gaochao end */
        } else if (devBaseInfo[i].devType == 2) {
            if (thisPageType == 'RTC') {
                $('.team-each-dev-container-car').append(`
                <div class="team-each-dev team-each-dev-${devBaseInfo[i].devCode} ${isAddActive}" data-info-devcode="${devBaseInfo[i].devCode}">
                    <!--用户名-->
                    <div class="team-each-dev-uaername user-name-value-by-id-${devBaseInfo[i].userId}" title=""></div>
                    <!--设备图片-->
                    <img class="team-each-dev-icon-single team-each-dev-icon-${devBaseInfo[i].devCode}" src="img/single_${devImgIndex}.png">
                    <!--GPS状态-->
                    <div class="team-each-dev-gpsstatus" id="team-each-dev-gpsstatus-${devBaseInfo[i].devCode}" title=""></div>
                    <!--单兵A-->
                    <div class="team-each-dev-index-single">${abcCache[devImgIndex]}</div>
                    <!--授时-->
                    <div class="team-each-dev-timeservice team-each-dev-timeservice-${devBaseInfo[i].devCode}" style="display:none;"></div>
                    <div class="team-each-dev-video team-each-dev-video-id-${devBaseInfo[i].userId}" data-info-username = ""></div>
                    <div class="team-each-dev-eng-single">
                        <!--能量值-->
                        <div class="eng-value-single" id="eng-value-single-${devBaseInfo[i].devCode}"><span style="color: #555">0</span></div>
                        <!--能量命中时间-->
                        <div class="eng-hit-time-single" id="eng-hit-time-single-${devBaseInfo[i].devCode}"></div>
                    </div>
                </div>
            `);
                /**add by gaochao start */
                $('.group-location-single-container').append(`
           <div class="group-location-each team-each-dev-${devBaseInfo[i].devCode} ${isActive}" data-info-devcode="${devBaseInfo[i].devCode}">
          <div class="group-location-person">
              <div class="group-location-person-photo user-name-value-by-id-${devBaseInfo[i].userId}-photo"></div>
              <div class="group-location-person-status group-location-person-status-${devBaseInfo[i].devCode}" data-info-status=1></div>
              <div class="group-location-person-name user-name-value-by-id-${devBaseInfo[i].userId}" title=""></div>
              <div class="group-location-person-gps-icon" id="team-each-dev-gps-status-${devBaseInfo[i].devCode}"></div>
              <div class="group-location-person-gps-value" id="team-each-dev-gps-value-${devBaseInfo[i].devCode}"></div>
              <div class="group-location-person-altitude-icon"></div>
              <div class="group-location-person-altitude-value" id="team-each-dev-altitude-value-${devBaseInfo[i].devCode}">0m</div>
          </div>
          <div class="group-location-line"></div>
          <div class="group-location-single-dev">
              <div class="group-location-devcode">${devBaseInfo[i].devCode}</div>
              <div class="group-location-single-engtime" id="eng-hit-time-single-${devBaseInfo[i].devCode}"></div>
              <div class="group-location-timeserver-icon" id="team-each-dev-timeservice-status-${devBaseInfo[i].devCode}" style="display:none;"></div>
              <div class="group-location-timeserver-value" id="team-each-dev-timeservice-value-${devBaseInfo[i].devCode}" style="display:none;"></div>
              <div class="group-location-temperature-icon" id="team-each-dev-temperature-icon-${devBaseInfo[i].devCode}"></div>
              <div class="group-location-temperature-value" id="team-each-dev-temperature-value-${devBaseInfo[i].devCode}">0℃</div>
              <div class="group-location-battery-single-icon" id="team-each-dev-battery-icon-${devBaseInfo[i].devCode}"></div>
              <div class="group-location-battery-value" id="team-each-dev-battery-value-${devBaseInfo[i].devCode}">0%</div>
              <div class="group-location-dev-line"></div>
              <div class="group-location-single-icon team-each-dev-icon-${devBaseInfo[i].devCode}" style="background:url(img/icon/single_${devImgIndex}.png) no-repeat;"></div>
              <div class="group-location-single-eng" id="eng-value-single-${devBaseInfo[i].devCode}"><span style="color: #999999"></span></div>
              <div class="group-location-voice" id="group-location-voice-${devBaseInfo[i].devCode}" data-code="${devBaseInfo[i].devCode}" data-status=1></div>
              <div class="group-location-video-out group-location-video-out-${devBaseInfo[i].devCode}" id="group-location-video-out-${devBaseInfo[i].devCode}" data-info-status="0" data-info-close="1" data-info-devcode="${devBaseInfo[i].devCode}"></div>
              <div class="group-location-video-container group-location-video-container-${devBaseInfo[i].devCode}" data-info-devCode="${devBaseInfo[i].devCode}"></div>
          </div>
          <div class=""></div>
      </div>
      `);
                /**add by gaochao end */
            } else {
                $('.team-each-dev-container-car').append(`
                    <div class="team-each-dev team-each-dev-${devBaseInfo[i].devCode} ${isAddActive}" data-info-devcode="${devBaseInfo[i].devCode}">
                        <!--用户名-->
                        <div class="team-each-dev-uaername user-name-value-by-id-${devBaseInfo[i].userId}" title=""></div>
                        <!--设备图片-->
                        <img class="team-each-dev-icon-single team-each-dev-icon-${devBaseInfo[i].devCode}" src="img/single_${devImgIndex}.png">
                        <!--GPS状态-->
                        <div class="team-each-dev-gpsstatus" id="team-each-dev-gpsstatus-${devBaseInfo[i].devCode}" title=""></div>
                        <!--单兵A-->
                        <div class="team-each-dev-index-single">${abcCache[devImgIndex]}</div>
                        <!--授时-->
                        <div class="team-each-dev-timeservice team-each-dev-timeservice-${devBaseInfo[i].devCode}" style="display:none;"></div>
                        <div class="team-each-dev-eng-single">
                            <!--能量值-->
                            <div class="eng-value-single" id="eng-value-single-${devBaseInfo[i].devCode}"><span style="color: #555">0</span></div>
                            <!--能量命中时间-->
                            <div class="eng-hit-time-single" id="eng-hit-time-single-${devBaseInfo[i].devCode}"></div>
                        </div>
                    </div>
                `);
                /**add by gaochao start */
                $('.group-location-single-container').append(`
                <div class="group-location-each team-each-dev-${devBaseInfo[i].devCode} ${isActive}" data-info-devcode="${devBaseInfo[i].devCode}">
                    <div class="group-location-person">
                        <div class="group-location-person-photo user-name-value-by-id-${devBaseInfo[i].userId}-photo"></div>
                        <div class="group-location-person-status group-location-person-status-${devBaseInfo[i].devCode}" data-info-status=1></div>
                        <div class="group-location-person-name user-name-value-by-id-${devBaseInfo[i].userId}" title=""></div>
                        <div class="group-location-person-gps-icon" id="team-each-dev-gps-status-${devBaseInfo[i].devCode}"></div>
                        <div class="group-location-person-gps-value" id="team-each-dev-gps-value-${devBaseInfo[i].devCode}"></div>
                        <div class="group-location-person-altitude-icon"></div>
                        <div class="group-location-person-altitude-value" id="team-each-dev-altitude-value-${devBaseInfo[i].devCode}">0m</div>
                    </div>
                    <div class="group-location-line"></div>
                    <div class="group-location-single-dev">
                        <div class="group-location-devcode">${devBaseInfo[i].devCode}</div>
                        <div class="group-location-single-engtime" id="eng-hit-time-single-${devBaseInfo[i].devCode}"></div>
                        <div class="group-location-timeserver-icon" id="team-each-dev-timeservice-status-${devBaseInfo[i].devCode}" style="display:none;"></div>
                        <div class="group-location-timeserver-value" id="team-each-dev-timeservice-value-${devBaseInfo[i].devCode}" style="display:none;"></div>
                        <div class="group-location-temperature-icon" id="team-each-dev-temperature-icon-${devBaseInfo[i].devCode}"></div>
                        <div class="group-location-temperature-value" id="team-each-dev-temperature-value-${devBaseInfo[i].devCode}">0℃</div>
                        <div class="group-location-battery-single-icon" id="team-each-dev-battery-icon-${devBaseInfo[i].devCode}"></div>
                        <div class="group-location-battery-value" id="team-each-dev-battery-value-${devBaseInfo[i].devCode}">0%</div>
                        <div class="group-location-dev-line"></div>
                        <div class="group-location-single-icon team-each-dev-icon-${devBaseInfo[i].devCode}" style="background:url(img/icon/single_${devImgIndex}.png) no-repeat;"></div>
                        <div class="group-location-single-eng" id="eng-value-single-${devBaseInfo[i].devCode}"><span style="color: #999999"></span></div>
                        <div class="group-location-voice" id="group-location-voice-${devBaseInfo[i].devCode}" data-code="${devBaseInfo[i].devCode}" data-status=1></div>
                    </div>
                    <div class=""></div>
                </div>
            `);
                /**add by gaochao end */
            }
        } else if (devBaseInfo[i].devType == 3) {
            if (thisPageType == 'RTC') {
                let player;
                $('.group-outside-container').append(`
                <div class="group-outside-each-item team-each-dev-${devBaseInfo[i].devCode} ${isActive}" data-info-devcode="${devBaseInfo[i].devCode}">
                    <div class="group-outside-each-photo user-name-value-by-id-${devBaseInfo[i].userId}-photo"></div>
                    <div class="group-outside-each-status group-location-person-status-${devBaseInfo[i].devCode}" data-info-status=1></div>
                    <div class="group-outside-each-name user-name-value-by-id-${devBaseInfo[i].userId}" title=""></div>
                    <div class="group-outside-each-gps-icon"  id="team-each-dev-gps-status-${devBaseInfo[i].devCode}"></div>
                    <div class="group-outside-each-gps-value" id="team-each-dev-gps-value-${devBaseInfo[i].devCode}"></div>
                    <div class="group-outside-each-altitude-icon"></div>
                    <div class="group-outside-each-altitude-value" id="team-each-dev-altitude-value-${devBaseInfo[i].devCode}">0m</div>
                    <div class="group-outside-each-line"></div>
                    <div class="group-outside-video-container group-outside-video-container-${devBaseInfo[i].devCode}" data-info-devCode="${devBaseInfo[i].devCode}">
                    <div>
                    <video id="${devBaseInfo[i].devCode}" class="video-js" preload="auto" width="140" height="132" poster="" data-setup="{}">
                    <source src="rtmp://106.15.195.82:1935/hls/${devBaseInfo[i].devCode}" type="rtmp/flv"></video>
                    </div>
                        <div class="group-location-video-popup group-location-video-popup-${devBaseInfo[i].devCode}" data-devcode="${devBaseInfo[i].devCode}"></div>
                    </div>
                </div>
                `);
                player = videojs(`${devBaseInfo[i].devCode}`, {
                    autoplay: true,
                }, function onPlayerReady() {
                    this.muted(true);
                    this.play();
                });
            } else {
                $('.group-outside-container').append(`
                <div class="group-outside-each-item team-each-dev-${devBaseInfo[i].devCode} ${isActive}" data-info-devcode="${devBaseInfo[i].devCode}">
                    <div class="group-outside-each-photo user-name-value-by-id-${devBaseInfo[i].userId}-photo"></div>
                    <div class="group-outside-each-status group-location-person-status-${devBaseInfo[i].devCode}" data-info-status=1></div>
                    <div class="group-outside-each-name user-name-value-by-id-${devBaseInfo[i].userId}" title=""></div>
                    <div class="group-outside-each-gps-icon"  id="team-each-dev-gps-status-${devBaseInfo[i].devCode}"></div>
                    <div class="group-outside-each-gps-value" id="team-each-dev-gps-value-${devBaseInfo[i].devCode}"></div>
                    <div class="group-outside-each-altitude-icon"></div>
                    <div class="group-outside-each-altitude-value" id="team-each-dev-altitude-value-${devBaseInfo[i].devCode}">0m</div>
                    <div class="group-outside-each-line"></div>
                    <div class="group-outside-video-container group-outside-video-container-${devBaseInfo[i].devCode}" data-info-devCode="${devBaseInfo[i].devCode}">

                    </div>
                </div>
                `);
            }
        }
        /* 左下角设备视角选择*/
        if (devBaseInfo[i].devType == 1) {
            $('.choose-container-car').append(`
                <div class="choose-divide-line"></div>
                <div class="choose-container" data-devcode="${devBaseInfo[i].devCode}">
                    <span class="user-name-value-by-id-${devBaseInfo[i].userId}"></span> <img class="choose-item-img-car" src="img/car_${devImgIndex}.png">
                </div>
            `);
        } else {
            $('.choose-container-single').append(`
                <div class="choose-divide-line"></div>
                <div class="choose-container" data-devcode="${devBaseInfo[i].devCode}">
                    <span class="user-name-value-by-id-${devBaseInfo[i].userId}"></span> <img class="choose-item-img-single" src="img/single_${devImgIndex}.png">
                </div>
            `);
        }
        $('.view-switch-chooser').css('height', $('.view-switch-chooser').height() + 81);
        $('.view-switch-chooser').css('top', -$('.view-switch-chooser').height() - 5);
        if (isAddActive != '') {
            if (devBaseInfo[i].devType == 1) {
                $('.view-current-dev').append(`
                    <span class="view-current-username user-name-value-by-id-${devBaseInfo[i].userId}">()</span>
                    <img class="view-current-dev-img-car" src="img/car_${devImgIndex}.png">
                    <i class="mdui-icon material-icons">&#xe5c7;</i>
                `);
                /**add by gaochao start */
                $('.view-current-dev-container').append(`
                <div class="view-current-dev-icon-car" style="background:url(img/icon/car_view_${devImgIndex}.png) no-repeat;background-size: cover;"></div>
				<div class="view-current-username-content  user-name-value-by-id-${devBaseInfo[i].userId}"></div>
                `);
                /**add by gaochao end */
            } else {
                $('.view-current-dev').append(`
                    <span class="view-current-username user-name-value-by-id-${devBaseInfo[i].userId}">()</span>
                    <img class="view-current-dev-img-single" src="img/single_${devImgIndex}.png">
                    <i class="mdui-icon material-icons">&#xe5c7;</i>
                `);
                /**add by gaochao start */
                if (devBaseInfo[i].devType == 2) {
                    $('.view-current-dev-container').append(`
                    <div class="view-current-dev-icon-single" style="background:url(img/icon/single_view_${devImgIndex}.png)no-repeat;background-size: cover;"></div>
                    <div class="view-current-username-content  user-name-value-by-id-${devBaseInfo[i].userId}"></div>
                    `);
                }
                if (devBaseInfo[i].devType == 3) {
                    $('.view-current-dev-container').append(`
                    <div class="view-current-dev-icon-single" style="background:url(img/icon/outside_view_${devImgIndex}.png)no-repeat;background-size: cover;"></div>
                    <div class="view-current-username-content  user-name-value-by-id-${devBaseInfo[i].userId}"></div>
                    `);
                }
                /**add by gaochao end */
            }
        }
        /* 建立视角存储*/
        let isCorrentView = false;
        if (isAddActive != '') {
            isCorrentView = true;
        }
        /** */ //currentViewDevCode = devBaseInfo[i].devCode;
        devDrawInfoMap.set(devBaseInfo[i].devCode, {
            userId: devBaseInfo[i].userId,
            userName: null,
            realName: null,
            headAddr: null,
            devCode: devBaseInfo[i].devCode,
            devType: Number(devBaseInfo[i].devType),
            devImgIndex: devImgIndex,
            isCorrentView: isCorrentView, // 是否为当前视角
            routeLineColor: '#888888', // 路径线颜色
            maxEng: { value: 0, position: { lng: 0, lat: 0, northAngle: 0, }, detail: '' },
            timeLineEngMap: new Map(),
            isShow: devBaseInfo[i].isShow,
        });
        /* 建立路径线存储*/
        lineOverlayMap.line.set(devBaseInfo[i].devCode, {
            devCode: devBaseInfo[i].devCode,
            line: [],
            tempLine: [],
            dataCache: [],
        });
        /* 添加时间轴能量条*/
        let engColumnDisplay = 'none';
        if (isCorrentView) {
            engColumnDisplay = 'block';
        }
        $('.eng-column-chart').append(`<div class="eng-column-chart-container eng-column-chart-container-${devBaseInfo[i].devCode}" style="display:${engColumnDisplay};"></div>`);
        let engColumnValueDefault = '';
        let timeDividerCountByPageType = 0;
        switch (thisPageType) {
            case 'RTC':
                timeDividerCountByPageType = timeDividerCount * 2 - timeDividerCountOver * 2;
                break;
            case 'CR':
                if (new Date(caseStartTime).getSeconds() >= 30) {
                    timeDividerCountByPageType = timeDividerCountOver * 2 + 1;
                } else {
                    timeDividerCountByPageType = timeDividerCountOver * 2;
                }
                break;
            default:
                break;
        }
        for (let j = 0; j < timeDividerCountByPageType; j++) {
            let ecvb;
            let time;
            switch (thisPageType) {
                case 'RTC':
                    if (new Date(caseStartTime).getSeconds() >= 30) {
                        time = new Date((parseInt(caseStartTime / 1000) + j * 30 - 30) * 1000);
                    } else {
                        time = new Date((parseInt(caseStartTime / 1000) + j * 30) * 1000);
                    }
                    break;
                case 'CR':
                    time = new Date((parseInt(caseStartTime / 1000) + j * 30) * 1000);
                    break;
                default:
                    break;
            }
            if (time.getSeconds() >= 0 && time.getSeconds() < 30) {
                // 00秒处
                ecvb = time.Format('yyyy-MM-dd-hh-mm') + '-00';
            } else {
                // 30秒处
                ecvb = time.Format('yyyy-MM-dd-hh-mm') + '-30';
            }
            engColumnValueDefault = engColumnValueDefault + `
                <div class="eng-column-value eng-column-value-${devBaseInfo[i].devCode}" style="background:rgba(0,0,0,0)">
                    <div class="ecvb-${devBaseInfo[i].devCode}-${ecvb}" style="position:relative; top:0; background:rgba(0,0,0,0); height:0;"></div>
                </div>
            `;
        }
        // 添加能量块
        $(`.eng-column-chart-container-${devBaseInfo[i].devCode}`).append(engColumnValueDefault);
        // 设置能量块位置
        $(`.eng-column-value-${devBaseInfo[i].devCode}`).css('width', $('.eng-column-chart').width() * 0.025 / 2 * 0.7);
        $(`.eng-column-value-${devBaseInfo[i].devCode}`).css('margin-left', $('.eng-column-chart').width() * 0.025 / 2 * 0.15);
        $(`.eng-column-value-${devBaseInfo[i].devCode}`).css('margin-right', $('.eng-column-chart').width() * 0.025 / 2 * 0.15);
        // 设置能量块容器长度
        $(`.eng-column-chart-container-${devBaseInfo[i].devCode}`).css('width', timeDividerCount * $('.eng-column-chart').width() * 0.025);
        switch (thisPageType) {
            case 'RTC':
                $(`.eng-column-chart-container-${devBaseInfo[i].devCode}`).css('right', 0);
                break;
            case 'CR':
                $(`.eng-column-chart-container-${devBaseInfo[i].devCode}`).css('left', 0);
                break;
            default:
                break;
        }
        /* 添加高级面板*/
        let advanceInfoPanelDisplay = 'none';
        if (isCorrentView) {
            advanceInfoPanelDisplay = 'block';
        }
        if (isCorrentView) {
            $('#default-advance-info-panel-dev').html(`
                ${devBaseInfo[i].devCode}&nbsp;<span style="color: #566ae2" class="user-name-value-by-id-${devBaseInfo[i].userId}">()</span> <span class="caret"></span>
            `);
            /**add by gaochao start */
            $('.advance-info-dropdown-toggle-container').html(`
            <div class="advance-info-dropdown-toggle">${devBaseInfo[i].devCode}(<span class="user-name-value-by-id-${devBaseInfo[i].userId}">()</span>)</div>
            <div class="advance-info-dropdown-toggle-icon"></div>
            `);
            /**add by gaochao end */
            analysisDevCodeNow = `${devBaseInfo[i].devCode}`;
        }
        $('#advance-info-panel-dev-selector').append(`
            <li>
                <a class="advance-info-panel-selector-item" data-dev-code="${devBaseInfo[i].devCode}">
                    ${devBaseInfo[i].devCode}&nbsp;
                    <span style="color: #566ae2" class="user-name-value-by-id-${devBaseInfo[i].userId}">()</span>
                </a>
            </li>
        `);
        /**add by gaochao start */
        $('.advance-info-dropdown-toggle-content').append(`
            <div class="advance-info-dropdown-toggle-content-item" data-dev-code="${devBaseInfo[i].devCode}">${devBaseInfo[i].devCode}(<span class="user-name-value-by-id-${devBaseInfo[i].userId}">()</span>)</div>
            `);
        $('.advance-info-value-container').append(`
            <div class="advance-info-content-container advance-info-content-container-${devBaseInfo[i].devCode}-lte CR-scrollY" style="display:${advanceInfoPanelDisplay};"></div>
            <div class="advance-info-content-container advance-info-content-container-${devBaseInfo[i].devCode}-wcdma CR-scrollY" style="display:${advanceInfoPanelDisplay};display:none"></div>
            <div class="advance-info-content-container advance-info-content-container-${devBaseInfo[i].devCode}-cdma CR-scrollY" style="display:${advanceInfoPanelDisplay};display:none"></div>
            <div class="advance-info-content-container advance-info-content-container-${devBaseInfo[i].devCode}-gsm CR-scrollY" style="display:${advanceInfoPanelDisplay};display:none"></div>
            `);
        $('.advance-info-time-container').append(`
					<div class="advance-info-time advance-info-time-${devBaseInfo[i].devCode}" style="display:${advanceInfoPanelDisplay}"></div>
            `);
        /**add by gaochao end */
        $('#advance-info-content-body').append(`
            <div class="advance-info-content advance-info-content-${devBaseInfo[i].devCode}" style="display:${advanceInfoPanelDisplay}">
                <div class="channel-info-area">
                    <div class="info-block-title">通道信息</div>
                    <div class="channel-info-table-border">
                        <table class="channel-info-table">
                            <thead>
                                <tr>
                                    <th style="width: 115px;">基站</th>
                                    <th style="width: 135px;">位置区标识码</th>
                                    <th style="width: 86px;">解析</th>
                                    <th style="width: 50px;">中标数</th>
                                    <th style="width: 34px;">场强</th>
                                    <th style="width: 34px;">增益</th>
                                </tr>
                            </thead>
                            <tbody class="channel-info-table-tbody channel-info-table-tbody-${devBaseInfo[i].devCode}">
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="uplink-gain-info-area">
                    <div class="info-block-title">上行增益</div>
                    <div class="uplink-gain-info-content">
                        <div class="uplink-gain-status-line">
                            <div class="uplink-gain-status-gray-cover uplink-gain-status-gray-cover-${devBaseInfo[i].devCode}" style="width: 100%"></div>
                            <div class="uplink-gain-status-pot uplink-gain-status-pot-${devBaseInfo[i].devCode}" style="left: 0%;"></div>
                        </div>
                        <div class="uplink-gain-status-value uplink-gain-status-value-${devBaseInfo[i].devCode}">0</div>
                    </div>
                </div>
                <!--
                <div class="statistical-info-area">
                    <div class="info-block-title">统计信息</div>
                    <ul class="nav nav-tabs statistical-info-nav">
                        <li role="presentation" class="active"><a>LTE统计一</a></li>
                        <li role="presentation"><a>LTE统计二</a></li>
                        <li role="presentation"><a>LTE目标状态显示</a></li>
                    </ul>
                    <div class="statistical-info-table-border">
                        <table class="statistical-info-table">
                            <thead>
                                <tr>
                                    <th>时间</th>
                                    <th>次数</th>
                                    <th>标识1</th>
                                    <th>标识2</th>
                                    <th>tac</th>
                                    <th>ci</th>
                                    <th>level</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                -->
            </div>
        `);
        $('.advance-info-content').css('height', $(window).height() - 350); // 高级面板高度自适应
        $('.channel-info-table-border').css('height', $('.advance-info-content').height() - 30); // 表格高度自适应
        $('.channel-info-table-tbody').css('height', $('.advance-info-content').height() - 70); // tbody高度自适应
        $('.statistical-info-table-border').css('height', $('.advance-info-content').height() - 198);// 统计信息面板自适应
    }

    static removeAllDev() {
        $('.car-speed').css('display', 'none');
        $('.team-each-dev-container-car').html('');
        $('.choose-container-car').html('');
        $('.choose-container-single').html('');
        $('.view-current-dev').html('');
        /**add by gaochao start */
        $('.group-location-car-container').html('');
        $('.group-location-single-container').html('');
        $('.group-outside-container').html('');
        $('.view-current-dev-container').html('');
        $('.advance-info-dropdown-toggle-content').html('');
        $('.advance-info-value-container').html('');
        $('.advance-info-time-container').html('');
        /**add by gaochao end */
        $('#default-advance-info-panel-dev').html('');
        $('#advance-info-panel-dev-selector').html('');
        $('#advance-info-content-body').html('');
        $('.view-switch-chooser').css('height', 0);
        $('.view-switch-chooser').css('top', 0);
        /* 当前视角的设备devCode*/
        currentViewDevCode = '';
        /* 设备显示信息集合 */
        devDrawInfoMap = new Map();
        /* 设备信息所对应的Map集合 */
        devInfoMap = new Map();
        /* 设备覆盖物所对应的Map集合 */
        devDivMap = new Map();
        /* 基站信息对应的Map集合 */
        btsInfoMap = new Map();
        
        multiBtsInfoMap = new Map();
        /* 基站覆盖物所对应的Map集合 */
        btsDivMap = new Map();
        /* 中心点设备编号缓存*/
        centerPointDevCode = null;
        /* 设备轨迹线*/
        lineOverlayMap = { line: new Map(), isShow: true };
        /* 主动式轨迹线*/
        linePassive = { overlay: [], line: [], isShow: true };
        /* 单兵命中的基站信息对应的Map集合 */
        singleBtsInfoMap = new Map();
        /* 单兵命中的基站覆盖物所对应的Map集合 */
        singleBtsDivMap = new Map();
        /* 热力图缓存*/
        heatmapOverlayCache = new Map();
        /* 时间轴起始时间*/
        timeLineStartValue = null;
        /* 时间轴刻度数量（蓝色）*/
        timeDividerCount = 0;
        /* 时间轴刻度数量（灰色）*/
        timeDividerCountOver = 0;
        /* 时间轴影子覆盖物*/
        historyShadowOverlay = null;
        /* 当前主动式命中状态*/
        passiveActiveStatus = 0;
        /* 车载能量指示数组 */
        carEngOrientationArray = { overlay: [], isShow: true };
        /* 单兵能量指示数组 */
        singleEngOrientationArray = { overlay: [], isShow: true };
        /* 目标小区缓存*/
        targetCellInfosCache = new Map();
        /**add by gaochao start */
        devPreLockCellInfosCache = new Map();
        /**add by gaochao end*/
        /* 目标小区指示线*/
        targetCellLineCache = null;
        /**add by gaochao start */
        devPreLockCellLineCache = null;
        /**add by gaochao end*/
        /* 基站解析信息与触发信息缓存*/
        devStateInfoMapCache = new Map();
        /* 基站解析进度缓存*/
        btsAnalysisOverlayCache = [];
        /* 基站echarts特效相关信息*/
        hitedBtsEcharts = new Map();
        /* 命中的基站缓存*/
        hitedBtsCache = [];
        /* 每个设备正在解析的基站*/
        devCellAnalysisMap = new Map();
        /* 基站命中特效echarts定时器*/
        flashMarkerInterval = null;
        /* 基站命中特效css覆盖物*/
        btsHitEffectionCover = null;
    }

}