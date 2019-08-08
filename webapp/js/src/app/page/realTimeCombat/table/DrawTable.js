export class DrawTable {

    static getPageNum(num) {
        let allNum = num;
        let pageNum = 0;
        while (true) {
            pageNum = pageNum + 1;
            if (allNum - pageItemNum > 0) {
                allNum = allNum - pageItemNum;
                continue;
            } else {
                break;
            }
        }
        return pageNum;
    }

    /* 分割分页数据*/
    static splitResult(data) {
        let dataSplit = [];
        let count = 0;
        let temp = [];
        for (let i = 0; i < data.length; i++) {
            temp.push(data[i]);
            count = count + 1;
            if (count == pageItemNum) {
                dataSplit.push(temp);
                temp = [];
                count = 0;
            }
            if (i == data.length - 1) {
                dataSplit.push(temp);
            }
        }
        return dataSplit;
    }

    /* 表格分页*/
    static caseTable(result) {
        let splitResult = this.splitResult(result);
        if (this.getPageNum(result.length) == 1) {
            $('.M-box3').pagination({
                pageCount: this.getPageNum(result.length),
                coping: true,
                homePage: '首页',
                endPage: '末页',
                /*delete by guoshuai start 2018-9-28 
                prevContent: '上页',
                nextContent: '下页',
                delete by guoshuai start 2018-9-28 */
                /*add by guoshuai start 2018-9-28 */ 
                prevContent: '',
                nextContent: '',
                /*add by guoshuai start 2018-9-28 */
                callback: function (api) { }
            });
            this.drawCaseTable(splitResult[0]);
        } else {
            $('.M-box3').pagination({
                pageCount: this.getPageNum(result.length),
                mode: 'fixed',
                count: 8,
                jump: true,
                coping: true,
                homePage: '首页',
                endPage: '末页',
               /*delete by guoshuai start 2018-9-28 
                prevContent: '上页',
                nextContent: '下页',
                delete by guoshuai start 2018-9-28 */
                /*add by guoshuai start 2018-9-28 */ 
                prevContent: '',
                nextContent: '',
                /*add by guoshuai start 2018-9-28 */
                callback: function (api) {
                    let page = api.getCurrent();
                    DrawTable.drawCaseTable(splitResult[page - 1]);
                    currentPage = page;
                }
            });
            this.drawCaseTable(splitResult[0]);
        }

    }

    /* 绘制表格*/
    static drawCaseTable(result) {
        let htmlValue = `
            <tr class="tbody-th">
                <td style="width:294px;">作战成员</td>
                <td style="width:292px;">起始时间</td>
                <td style="width:127px;">持续时长</td>
                <td style="width:286px;">省市</td>
                
                <td style="width:642px;">设备</td>
                <td style="width:189px;">操作</td>
            </tr>
        `;
        let tableContent = result;
        /* 防止出现null*/
        function removeNull(val) {
            if (val == null) {
                return '';
            } else {
                return val;
            }
        }
        function getUsers(map) {
            let value = '';
            // let userSet = new Set();
            // for (let key in map) {
            //     userSet.add(map[key].userName + '/' + map[key].seq);
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
        function getDevCodes(list) {
            let value = '';
            for (let i = 0; i < list.length; i++) {
                value = value + list[i] + '，';
            }
            return value.substring(0, value.length - 1);
        }
        function getContinuousTime(startTime) {
            let sec = parseInt((new Date().getTime() - startTime) / 1000);
            /*delete by guoshuai start 2018-9-28
            let hour = parseInt(sec / 3600);
            let minute = parseInt((sec % 3600) / 60);
            return hour + '小时' + (minute <= 0 && hour <= 0 ? 1 : minute) + '分钟';
            delete by guoshuai end 2018-9-28*/
            /*add by guoshuai start 2018-9-28*/
            let minute = parseInt(sec/60);
            if( minute <= 0){
                return '1分钟';
            }else{
                return minute+ '分钟';
            }
            /*add by guoshuai end 2018-9-28*/
        }
        for (let i = 0; i < tableContent.length; i++) {
            htmlValue = htmlValue + ` 
                <tr class="tbody-tr" id="table-value-content">
                    <!-- 作战成员-->
                    <td title="${getUsers(tableContent[i].userMap)}">
                        <div class="table-td-user-names" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                            ${getUsers(tableContent[i].userMap)}
                        </div>
                    </td>
                    <!-- 起始时间-->
                    <td>
                        <div style="/* delete by guoshuai 2018-9-28 start width: 150px; end*/ white-space: nowrap;">${new Date(tableContent[i].startTime).Format('yyyy-MM-dd hh:mm:ss')}</div>
                    </td>
                    <!-- 持续时长-->
                    <td>
                        <div style="/* delete by guoshuai 2018-9-28 start width: 95px; end*/ white-space: nowrap;">${getContinuousTime(tableContent[i].startTime)}</div>
                    </td>
                    <!-- 省市-->
                    <td title="${removeNull(tableContent[i].areaFullName)}">
                        <div style="/* delete by guoshuai 2018-9-28 start width: 160px; end*/ white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${removeNull(tableContent[i].areaFullName)}</div>
                    </td>
                   
                    <!-- 设备-->
                    <td title="${getDevCodes(tableContent[i].devCodeList)}">
                        <div class="table-td-used-devs" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                            ${getDevCodes(tableContent[i].devCodeList)}
                        </div>
                    </td>
                    <!-- 操作-->
                    <td>
                        <div style="/* delete by guoshuai 2018-9-28 start width: 67px; end*/">
                            <!--delete by guoshuai start 2018-10-9
                            <div class="mdui-ripple command-btn" data-case-serial="${tableContent[i].serialNum}">指挥</div>
                            delete by guoshuai start 2018-10-9-->
                            <!--add by guoshuai start 2018-10-9-->
                            <div class="mdui-ripple command-btn command-btn-realtime-class" data-case-serial="${tableContent[i].serialNum}"
                                style="
                                    width:80px;
                                    height:30px;
                                    background: url(.../../img/iconpic/eig-command-21.png);
                                    background-size: 100% 100%;
                                    cursor: pointer;
                                    
                                "></div>
                            <!--add by guoshuai end 2018-10-9-->
                        </div>
                    </td>
                </tr>
            `;
        }
        /*add by guoshuai start 2018-9-28*/
        let htmlNew2='';
        
        console.log(tableContent);
        for (let i = 0; i < tableContent.length; i++) {
            htmlNew2 = htmlNew2+`
                <div class="case-jt-block">
                    <div id="cjb-box1">
                        <div class="case-jt-logo">
                            <div id="cjl-cont-live">
                                <span></span>
                                <span>${getContinuousTime(tableContent[i].startTime)}</span>
                            </div>
                        </div>
                        <div class="case-jt-simple">
                            <div class="cjs-address">
                                <span>作战地址&nbsp;:</span>
                                <p  style="width: 197px;height: 20px;">${removeNull(tableContent[i].areaFullName)}</p>
                            </div>
                            <div class="cjs-date">
                                <span>日期&nbsp;:</span>
                                <p style="margin-left: 27px;">${new Date(tableContent[i].startTime).Format('yyyy-MM-dd')}</p>
                            </div>
                        </div>
                    </div>
                    <div id="cjb-box2">
                        <div class="case-jt-name">
                            <span>作战成员&nbsp;:</span>
                            <span title="${getUsers(tableContent[i].userMap)}">${getUsers(tableContent[i].userMap)}</span>
                            <div class="cjn-zhihui">
                                <p class="command-btn" data-case-serial="${tableContent[i].serialNum}"
                                style="
                                    width: 50px;
                                    background: url('.../../img/iconpic/eig-command.png') no-repeat 0px 3px;
                                    background-size: 38% 85%;
                                    height: 18px;
                                    line-height: 21px;
                                    cursor: pointer;
                                    text-align: right;
                                    margin-top: 3px;
                                ">指挥</p>
                            </div>
                        </div>
                        <div class="case-jt-detailed">
                            <div>
                                <span>地址&nbsp;:</span>
                                <span title="${removeNull(tableContent[i].areaFullName)}">${removeNull(tableContent[i].areaFullName)}</span>
                            </div>
                            <div>
                                <span>时间&nbsp;:</span>
                                <span>${getContinuousTime(tableContent[i].startTime)}</span>
                            </div>
                            <div>
                                <span>设备&nbsp;:</span>
                                <span style="overflow: hidden; text-overflow: ellipsis; width:200px;height:40px;white-space: nowrap;" title="${getDevCodes(tableContent[i].devCodeList)}">${getDevCodes(tableContent[i].devCodeList)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        };
        $('.view-data-block').html(htmlNew2);
        /*add by guoshuai end 2018-9-28*/
        $('#table-tbody').html(htmlValue);
        /*delete by guoshuai start 2018-9-28
        $('.table-td-user-names').css('width', ($(window).width() - 1025) * 0.45); // 表格td自适应
        $('.table-td-used-devs').css('width', ($(window).width() - 1000) * 0.55);
        $('.view-data-table').css('margin-left', -$('.view-data-table').width() / 2);
        delete by guoshuai end 2018-9-28*/
        /*add by guoshuai start 2018-9-28*/
        $('.table-td-used-devs').css('width', '100%');
        /*add by guoshuai end 2018-9-28*/
    }

}