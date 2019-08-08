export class DrawTable {

    static caseTable(result) {
        let htmlValue = `
            <tr class="tbody-th">
                <td>作战成员</td>
                <td>起始日期</td>
                <td>作战时长</td>
                <td>省市</td>
                <td>设备</td>
                <td>作战名称</td>
                <td>标签</td>
                <td>备注</td>
                <td>评分</td>
                <td>操作</td>
            </tr>
        `;
        let tableContent = result.pageInfo.list;
        function add0(val) {
            if (val >= 10) {
                return '' + val;
            } else {
                return '0' + val;
            }
        }
        function removeNull(val) {
            if (val && typeof(val) != "undefined") {
                return val;
            } else {
                return '';
            }
        }
        function getUserList(list) {
            let value = '';
            for (let i = 0; i < list.length; i++) {
                value = value + list[i].username + '/' + list[i].handleSeq + '，';
            }
            return value.substring(0, value.length - 1);
        }
        function getDevList(list) {
            let value = '';
            for (let i = 0; i < list.length; i++) {
                value = value + list[i].devCode + '，';
            }
            return value.substring(0, value.length - 1);
        }
        function getStartTime(value) {
            return new Date(value).Format('yyyy-MM-dd');
        }
        function getContinuousTime(startTime, endTime) {
            let sec = parseInt((endTime - startTime) / 1000);
            /* delete by guoshuai start 2018-9-26
            let hour = parseInt(sec / 3600);
            let minute = parseInt((sec % 3600) / 60);
            return hour + '小时' + (minute <= 0 && hour <= 0 ? 1 : minute) + '分钟';
            delete by guoshuai end 2018-9-26*/
            /*add by guoshuai start 2018-9-29*/
            let minute = parseInt(sec / 60);
            if( minute <= 0){
                return '1分钟';
            }else{
                return minute+ '分钟';
            }
            /*add by guoshuai end 2018-9-29*/
        }
        /*add by guoshuai start 2018-9-29*/
        function getContinuousTime2(startTime, endTime) {
            let sec = parseInt((endTime - startTime) / 1000);
            let minute = parseInt(sec / 60);
            if( minute <= 0){
                return '1min';
            }else{
                return minute+ 'min';
            }
        }
        /*add by guoshuai end 2018-9-29*/
        function getScore(score) {
            let grayNum = 0;
            if (score == 100) {
                grayNum = 0;
            } else if (score >= 80) {
                grayNum = 1;
            } else if (score >= 60) {
                grayNum = 2;
            } else if (score >= 40) {
                grayNum = 3;
            } else if (score >= 20) {
                grayNum = 4;
            } else {
                grayNum = 5;
            }
            let htmlString = '';
            for (let i = 0; i < 5; i++) {
                let isGray = '';
                if (i < grayNum) {
                    isGray = 'gray-cover';
                }
                // if ((i + 1) / 5 > score / 100) {
                //     isGray = 'gray-cover';
                // }
                htmlString = `
                    <div class="grade-star-icon-intable ${isGray}"></div>
                `+ htmlString;
            }
            return htmlString;
        }
        
        function getCombatName(data) {
            if (null != data.combatReview) {
                if (data.combatReview.combatName && typeof(data.combatReview.combatName) != "undefined") {
                    return data.combatReview.combatName;
                } else {
                    return '';
                }
            } else {
                return '';
            }
        }
        for (let i = 0; i < tableContent.length; i++) {
            htmlValue = htmlValue + `
                <tr class="tbody-tr">
                    <td title="${getUserList(tableContent[i].userList)}">
                        <div class="table-td-user-names abbreviation">
                            ${getUserList(tableContent[i].userList)}
                        </div>
                    </td>
                    <td>
                        <div class="startTimeDiv abbreviation">${getStartTime(tableContent[i].startTime)}</div>
                    </td>
                    <td>
                        <div class="getContinuousTimeDiv abbreviation">
                            ${getContinuousTime(tableContent[i].startTime, tableContent[i].endTime)}(${add0(new Date(tableContent[i].startTime).getHours())}:${add0(new Date(tableContent[i].startTime).getMinutes())}~${add0(new Date(tableContent[i].endTime).getHours())}:${add0(new Date(tableContent[i].endTime).getMinutes())})
                        </div>
                    </td>
                    <td title="${removeNull(tableContent[i].areaFullName)}">
                        <div class="areaFullNameDiv abbreviation">${removeNull(tableContent[i].areaFullName)}</div>
                    </td>
                    <td title="${getDevList(tableContent[i].devList)}">
                        <div class="table-td-used-devs abbreviation" style="padding-left:10px; padding-right:5px;">
                            ${getDevList(tableContent[i].devList)}
                        </div>
                    </td>
                    <!--作战名称-->
                    <td title="${getCombatName(tableContent[i])}">
                        <div class="tagDiv abbreviation">
                            ${getCombatName(tableContent[i])}
                        </div>
                    </td>
                    <!--标签-->
                    <td title="${tableContent[i].combatReview == null ? '' : removeNull(tableContent[i].combatReview.tag)}">
                        <div class="tagDiv abbreviation">
                            ${tableContent[i].combatReview == null ? '' : removeNull(tableContent[i].combatReview.tag)}
                        </div>
                    </td>
                    <!--备注-->
                    <td title="${tableContent[i].combatReview == null ? '' : removeNull(tableContent[i].combatReview.remark)}">
                        <div class="tagDiv abbreviation">
                            ${tableContent[i].combatReview == null ? '' : removeNull(tableContent[i].combatReview.remark)}
                        </div>
                    </td>
                    <!--add by guoshuai start 2018-9-29-->
                    <td title="作战评分：${tableContent[i].score}">
						<div class="grade-star-container-intable">
							${getScore(tableContent[i].score)}
						</div>
                    </td>
                    <td id="case-sec">
                        <div class = "commandBtnDiv abbreviation">
                            <div class="mdui-ripple command-btn command-btn-media" data-tr-index="${i}"></div>
                        </div>
                    </td>
                    <!--add by guoshuai end 2018-9-29-->
				</tr>
            `;
        };
        /*add by guoshuai start 2018-9-29*/
        let htmlNew2='';
        for (let i = 0; i < tableContent.length; i++) {
            htmlNew2 = htmlNew2+`
                <div class="case-jt-block">
                    <div id="cjb-box1">
                        <div class="case-jt-logo">
                            <!--
                            <div id="cjl-wt">
                                <span></span>
                                <span>次</span>
                            </div>
                            -->
                            <div id="cjl-cont">
                                <span></span>
                                <span>${getContinuousTime2(tableContent[i].startTime, tableContent[i].endTime)}</span>
                            </div>
                        </div>
                        <div class="case-jt-simple">
                            <div class="cjs-address">
                                <span>作战地址&nbsp;:</span>
                                <p style="width: 197px;height: 20px;">${removeNull(tableContent[i].areaFullName)}</p>
                            </div>
                            <div class="cjs-date">
                                <span>日期&nbsp;:</span>
                                <p style="margin-left: 26px;">${getStartTime(tableContent[i].endTime)}</p>
                            </div>
                        </div>
                    </div>
                    <div id="cjb-box2">
                        <div class="case-jt-name">
                            <span>作战成员&nbsp;:</span>
                            <span title="${getUserList(tableContent[i].userList)}" style="
                                width: 160px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            ">${getUserList(tableContent[i].userList)}</span>
                            <div class="mdui-ripple command-btn command-btn-combat" data-tr-index="${i}"></div>
                        </div>
                        <div class="case-jt-detailed">
                            <div>
                                <span>地址&nbsp;:</span>
                                <span title="${removeNull(tableContent[i].areaFullName)}">${removeNull(tableContent[i].areaFullName)}</span>
                            </div>
                            <div>
                                <span>时间&nbsp;:</span>
                                <span>${getStartTime(tableContent[i].startTime)}-${getStartTime(tableContent[i].endTime)}</span>
                            </div>
                            <div>
                                <span>设备&nbsp;:</span>
                                <span style="overflow: hidden; text-overflow: ellipsis; width:200px;height:40px;white-space: nowrap;" title="${getDevList(tableContent[i].devList)}">${getDevList(tableContent[i].devList)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        };
        $('.view-data-block').html(htmlNew2);
        /*add by guoshuai end 2018-9-29*/
        $('#table-tbody').html(htmlValue);
        $('#table-tbody').width($(window).width()*0.9505);
        $('.table-td-user-names').width($(window).width()*0.1041);
        $('.commandBtnDiv').width($(window).width()*0.0364);
        $('.startTimeDiv').width($(window).width()*0.0520);
        $('.getContinuousTimeDiv').width($(window).width()*0.0937);
        $('.areaFullNameDiv').width($(window).width()*0.1625);
        $('.table-td-used-devs').width($(window).width()*0.2005);
        $('.tagDiv').width($(window).width()*0.0678);
        $('.grade-star-container-intable').width($(window).width()*0.0833);
        $(window).resize(function () {
            $('.grade-star-container-intable').width($(window).width()*0.0833);
            $('.table-td-used-devs').width($(window).width()*0.2005);
            $('.tagDiv').width($(window).width()*0.0678);
            $('#table-tbody').width($(window).width()*0.9505);
            $('.commandBtnDiv').width($(window).width()*0.0364);
            $('.startTimeDiv').width($(window).width()*0.0520);
            $('.getContinuousTimeDiv').width($(window).width()*0.0937);
            $('.areaFullNameDiv').width($(window).width()*0.1625);
            $('.table-td-user-names').width($(window).width()*0.1041);
        })
        /*add by guoshuai end 2018-9-29*/
    }

}