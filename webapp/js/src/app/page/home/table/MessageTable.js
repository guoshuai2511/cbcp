export class MessageTable {

    static drawTable(data) {
        
        if (data == null || data.length == 0) {
            $('#working-case-num').html(0);
            $('.new-message-item-container').html('<div class="new-message-none">暂无消息</div>');
        } else {

            let htmlValue = '';
            let workingNum = 0;
            function getUsers(map) {
                let value = '';
                // let userSet = new Set();
                // for (let key in map) {
                //     userSet.add(map[key].userName);
                // }
                // for (let item of userSet.keys()) {

                //     value = value + item + '，';
                // }

                let userMap = new Map();
                for (let key in map) {
                    if (userMap.get(map[key].userName) == null) {
                        userMap.set(map[key].userName, { name: map[key].userName, seq: map[key].seq });
                    } else {
                        if (userMap.get(map[key].userName).seq < map[key].seq) {
                            userMap.set(map[key].userName, { name: map[key].userName, seq: map[key].seq });
                        }
                    }
                }
                userMap.forEach((each) => {
                    value = value + each.name + '/' + each.seq + '，';
                });

                return value.substring(0, value.length - 1);
            }
            function getContinousTime(status, startTime, endTime) {
                let second;
                if (status == 1) {
                    second = new Date().getTime() - startTime;
                } else {
                    second = endTime - startTime;
                }
                let minutes = (second / 1000) / 60;
                if (minutes < 60) {
                    return (parseInt(minutes) <= 0 ? 1 : parseInt(minutes)) + 'min';
                } else {
                    let hours = parseInt(minutes / 60);
                    return '' + hours + 'h ' + parseInt(minutes - 60 * hours) + 'min';
                }
            }
            function getStatus(status) {
                let color;
                let content;
                let clazz;
                let url;
                if (status == 1) {
                   
                    color = '#23dcb3';
                    /*delete by guoshuai start 2018-9-27
                    content = '已开始';
                    delete by guoshuai end 2018-9-27*/
                    /*add by guoshuai start 2018-9-27*/
                    // color = '#17c1f4';
                    // color = '#ff6700';
                    content = '进行中';
                    /*add by guoshuai end 2018-9-27*/
                    clazz = 'new-message-play-btn';
                    url = 'getRealTimeCombatInfo';
                } else {
                    /*delete by guoshuai start 2018-9-27
                    
                    content = '已结束';
                    delete by guoshuai end 2018-9-27*/
                    /*add by guoshuai start 2018-9-27*/
                    color = '#ff6700';
                    content = '已结束';
                    /*add by guoshuai end 2018-9-27*/
                    clazz = 'new-message-replay-btn';
                    url = 'getHistoryCombatInfo';
                }
                return {
                    color: color,
                    content: content,
                    clazz: clazz,
                    url: url,
                };
            }
            function removeNull(tmp) {
                if (tmp && typeof(tmp) != "undefined") {
                    return tmp;
                } else {
                    return '';
                }
            }
            // for (let i = data.length - 1; i >= 0; i--) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].status == 1) {
                    workingNum = workingNum + 1;
                }
                htmlValue = htmlValue + `
                    <div class="new-message-item">
                        <div class="message-user-pic">
                            <!-- delete by guoshuai start 2018-9-27
                            <img src="./img/message_user_pic.png">
                            delete by guoshuai end 2018-9-27-->
                        </div>
                        <div class="new-message-content">
                            <div class="new-message-word-1">
                                ${new Date(data[i].startTime).Format('yyyy-MM-dd hh:mm')} <span style="color: /*add by guoshuai start 2018-9-27*/#23b5e8;/*add by guoshuai end 2018-9-27*//*delete by guoshua start 2018-9-27${getStatus(data[i].status).color}delete by guoshua end 2018-9-27*/">[${getContinousTime(data[i].status, data[i].startTime, data[i].endTime)}]</span>
                            </div>
                            <div class="new-message-word-2">
                                <div title="${data[i].status == 1 ? getUsers(data[i].userMap) : getUsers(data[i].offlineUserMap)}" style="/*delete by guoshuai min-width: 70px; max-width: 100px;*/ white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" class="new-message-name-v">
                                    ${data[i].status == 1 ? getUsers(data[i].userMap) : getUsers(data[i].offlineUserMap)}
                                </div>
                               
                                <!--add by guo shuai 2018-8-3 start-->
                                <div  class="new-message-area-v">
                                    <div title="${removeNull(data[i].areaFullName)}" style="/*delete by guoshuai min-width: 100px; max-width: 155px;*/ overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" class="new-message-areaname-v">${removeNull(data[i].areaFullName)}</div>
                                    <span style="color: ${getStatus(data[i].status).color};float:right;">${getStatus(data[i].status).content}</span>
                                </div>
                                <!--add by guo shuai 2018-8-3 end-->
                            </div>
                            <div></div>
                            <div class="${getStatus(data[i].status).clazz} mdui-ripple" data-url="${getStatus(data[i].status).url}" data-case-serial="${data[i].serialNum}"></div>
                        </div>
                    </div>
                `;
            }
            $('#working-case-num').html(workingNum);
            $('.new-message-item-container').html(htmlValue);
        }
    }

}