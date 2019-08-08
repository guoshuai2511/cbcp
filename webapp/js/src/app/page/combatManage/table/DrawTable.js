export class DrawTable {

    static caseTable(result) {
        let htmlValue = `
            <tr class="tbody-th">
                <td style="/*width:159px;*/" class="no-mana">作战成员</td>
                <td style="/*width:129px;*/" class="date-mana">起始日期</td>
                <td style="/*width:256px;*/" class="time-mana">作战时长</td>
                <td style="/*width:274px;*/" class="area-mana">省市</td>
             
                <td style="width:170px;">评分</td>
                <td style="" class="dev-mana">设备</td>
                <td style="width:102px;">作战名称</td>
                <td style="width:102px;">标签</td>
                <td style="width:89px;">状态</td>
                <td style="width:110px;">操作</td>
            </tr>
        `;
        let tableContent = result.pageInfo.list;
        console.log(tableContent);
        function add0(val) {
            if (val >= 10) {
                return '' + val;
            } else {
                return '0' + val;
            }
        }
        function removeNull(val) {
            if (val == null) {
                return '';
            } else {
                return val;
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
            let hour = parseInt(sec / 3600);
            let minute = parseInt((sec % 3600) / 60);
            return hour + '小时' + (minute <= 0 && hour <= 0 ? 1 : minute) + '分钟';
        }
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
            if (data.combatReview != null) {
                if (data.combatReview.combatName != null) {
                    return data.combatReview.combatName;
                } else {
                    return '';
                }
            } else {
                return '';
            }
        }
        function getCombatTag(data) {
            if (data.combatReview != null) {
                if (data.combatReview.tag != null) {
                    return data.combatReview.tag;
                } else {
                    return '';
                }
            } else {
                return '';
            }
        }
        function getReviewStatus(data) {
            switch (data) {
                case 0:
                    return '<span>未审核</span>';
                    break;
                case 1:
                    return '<span class="text-green">真实</span>';
                    break;
                case -1:
                    return '<span class="text-red">无效</span>';
                    break;
                default:
                    return '';
                    break;
            }
        }
        function getButtonType(data) {
            if (data.combatReview != null) {
                if (data.reviewStatus == 0) {
                    if (data.combatReview.combatName != null && data.combatReview.combatName != '') {
                        return 'update';
                    } else {
                        return 'add';
                    }
                } else {
                    return 'update';
                }
            } else {
                if (data.reviewStatus == 0) {
                    return 'add';
                } else {
                    return 'update';
                }
            }
        }
        for (let i = 0; i < tableContent.length; i++) {
            htmlValue = htmlValue + `
                <tr class="tbody-tr">
                    <td title="${getUserList(tableContent[i].userList)}">
                        <div class="table-td-user-names" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;width:100%;padding-left:8px;">
                            ${getUserList(tableContent[i].userList)}
                        </div>
                    </td>
                    <td>
                        <div style="/*width: 95px;*/ white-space: nowrap;">${getStartTime(tableContent[i].startTime)}</div>
                    </td>
                    <td>
                        <div style="/*width: 190px;*/ white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" title="${getContinuousTime(tableContent[i].startTime, tableContent[i].endTime)}(${add0(new Date(tableContent[i].startTime).getHours())}:${add0(new Date(tableContent[i].startTime).getMinutes())}~${add0(new Date(tableContent[i].endTime).getHours())}:${add0(new Date(tableContent[i].endTime).getMinutes())})">
                            ${getContinuousTime(tableContent[i].startTime, tableContent[i].endTime)}(${add0(new Date(tableContent[i].startTime).getHours())}:${add0(new Date(tableContent[i].startTime).getMinutes())}~${add0(new Date(tableContent[i].endTime).getHours())}:${add0(new Date(tableContent[i].endTime).getMinutes())})
                        </div>
                    </td>
                    <td title="${removeNull(tableContent[i].areaFullName)}">
                        <div style="/*delete by guoshuai min-width: 80px; max-width: 140px;end*/ white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${removeNull(tableContent[i].areaFullName)}</div>
                    </td>
                    
                    <td title="作战评分：${tableContent[i].score}">
						<div class="grade-star-container-intable" style="width: 160px;/*add by guoshuai start*/margin-left:10px;/*2018-10-11end*/">
							${getScore(tableContent[i].score)}
						</div>
					</td>
                    <td title="${getDevList(tableContent[i].devList)}">
                        <div class="table-td-used-devs" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;margin-left:1%;">
                            ${getDevList(tableContent[i].devList)}
                        </div>
                    </td>
                    <td title="${getCombatName(tableContent[i])}">
                        <div style="min-width: 75px; max-width: 100px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${getCombatName(tableContent[i])}</div>
                    </td>
                    <td title="${getCombatTag(tableContent[i])}">
                        <div style="min-width: 75px; max-width: 100px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${getCombatTag(tableContent[i])}</div>
                    </td>
                    <td>
                        <div style="/*width: 65px;*/ white-space: nowrap;">${getReviewStatus(tableContent[i].reviewStatus)}</div>
                    </td>
                    <td>
                        <div style="width: 80px;">
                            ${getButtonType(tableContent[i]) == 'add' ? `
                            <button class="mdui-ripple table-in-btn btn-green operation-modal-open-btn" data-type="add" data-caseId="${tableContent[i].combatId}" data-tr-index="${i}">&nbsp;审&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;核&nbsp;</button>` : `
                            <button class="mdui-ripple table-in-btn btn-blue operation-modal-open-btn" data-type="update" data-caseId="${tableContent[i].combatId}" data-tr-index="${i}">修改审核</button>`}
                        </div>
                    </td>
				</tr>
            `;
        }
        $('#table-tbody').html(htmlValue);
        autoWidth();

    }

}