/**
 * 聊天数据
 */
export class PrasingChartMsgInfo {

    static showChartMsg(chartMsmInfoNow) {
        var bubbleSort = function (arr) {
            for (var i = 0; i < arr.length - 1; i++) {
                for (var j = i + 1; j < arr.length; j++) {
                    if (arr[i].sendTime > arr[j].sendTime) {
                        var temp = arr[i];
                        arr[i] = arr[j];
                        arr[j] = temp;
                    }
                }
            }
            return arr;
        }
        let changeToLish = function (map) {
            var list = [];
            for (var key in map) {
                list.push([key, map[key]]);
            }
            return list;
        };
        let changeToMap = function (list) {
            let map = {};
            for (let i = 0; i < list.length; i++) {
                map[list[i][0]] = list[i][1];
            }
            return map;
        }
        let chartMsmInfo = {};
        for (let key in chartMsmInfoNow) {
            chartMsmInfo[key] = chartMsmInfoNow[key];
        }
        let chartMsmInfoList = changeToLish(chartMsmInfo);

        let temp = bubbleSort(chartMsmInfoList)
        chartMsmInfo = changeToMap(temp);
        for (let key in chartMsmInfo) {
            if (chartMsgInfosCache.size != 0) {
                if (chartMsgInfosCache.get(key) != undefined && chartMsmInfo[key].srcDevCode == chartMsgInfosCache.get(key).srcDevCode && chartMsmInfo[key].sendTime == chartMsgInfosCache.get(key).sendTime) {
                    chartMsmInfo[key] = null;
                }
            }
        }
        for (let key in chartMsmInfo) {
            if (chartMsgInfosListCache.length != 0) {
                for (let i = 0; i < chartMsgInfosListCache.length; i++) {
                    if (chartMsmInfo[key] != null && chartMsmInfo[key].srcDevCode == chartMsgInfosListCache[i].srcDevCode && chartMsmInfo[key].sendTime == chartMsgInfosListCache[i].sendTime) {
                        chartMsmInfo[key] = null;
                    }
                }
            }
        }
        for (let key in chartMsmInfo) {
            if (chartMsmInfo[key] != null) {
                if (chartMsmInfo[key].srcDevCode == "") {
                    $('.right-chat-content').append(
                        `<div class="right-chat-send-photo" style="${(chartMsmInfo[key].headAddr == null || chartMsmInfo[key].headAddr == '') ? '' : `background:url(${chartMsmInfo[key].headAddr});background-size:cover`}"></div>
                        <div class="right-chat-send-name">${chartMsmInfo[key].userRealName}</div>
                        <div class="right-chat-send-time">${new Date(chartMsmInfo[key].sendTime).Format('hh:mm')}</div>
                        <div class="right-chat-send-value-content">
                            <div class="right-chat-send-value">${chartMsmInfo[key].content}</div>
                        </div>	`
                    );
                    let scrollHeight = $('.right-chat-content').prop("scrollHeight");
                    $('.right-chat-content').scrollTop(scrollHeight, 200);

                } else {
                    $('.right-chat-content').append(`
                         <div class="right-chat-get-photo" style="${(chartMsmInfo[key].headAddr == null || chartMsmInfo[key].headAddr == '') ? '' : `background:url(${chartMsmInfo[key].headAddr});background-size:cover`}"></div>
                        <div class="right-chat-get-name">${chartMsmInfo[key].userRealName}</div>
                        <div class="right-chat-get-time">${new Date(chartMsmInfo[key].sendTime).Format('hh:mm')}</div>
                        <div class="right-chat-get-value-content">
                            <div class="right-chat-get-value">${chartMsmInfo[key].content}</div>
                        </div>		 
                        `);
                    let scrollHeight = $('.right-chat-content').prop("scrollHeight");
                    $('.right-chat-content').scrollTop(scrollHeight, 200);

                }
            }

        }

    }
    static showHistoryChartMsg(chartMsgInfosList) {
        if (chartMsgInfosList != null) {
            for (let i = 0; i < chartMsgInfosList.length; i++) {
                if (chartMsgInfosList[i].srcDevCode == "") {
                    $('.right-chat-content').append(
                        `<div class="right-chat-send-photo" style="${(chartMsgInfosList[i].headAddr == null || chartMsgInfosList[i].headAddr == '') ? '' : `background:url(${chartMsgInfosList[i].headAddr});background-size:cover`}"></div>
                        <div class="right-chat-send-name">${chartMsgInfosList[i].userRealName}</div>
                        <div class="right-chat-send-time">${new Date(chartMsgInfosList[i].sendTime).Format('hh:mm')}</div>
                        <div class="right-chat-send-value-content">
                            <div class="right-chat-send-value">${chartMsgInfosList[i].content}</div>
                        </div>	`
                    );
                } else {
                    $('.right-chat-content').append(`
                         <div class="right-chat-get-photo" style="${(chartMsgInfosList[i].headAddr == null || chartMsgInfosList[i].headAddr == '') ? '' : `background:url(${chartMsgInfosList[i].headAddr});background-size:cover`}"></div>
                        <div class="right-chat-get-name">${chartMsgInfosList[i].userRealName}</div>
                        <div class="right-chat-get-time">${new Date(chartMsgInfosList[i].sendTime).Format('hh:mm')}</div>
                        <div class="right-chat-get-value-content">
                            <div class="right-chat-get-value">${chartMsgInfosList[i].content}</div>
                        </div>		 
                        `);
                }
            }
            let scrollHeight = $('.right-chat-content').prop("scrollHeight");
            $('.right-chat-content').scrollTop(scrollHeight, 200);
        }

    }

}