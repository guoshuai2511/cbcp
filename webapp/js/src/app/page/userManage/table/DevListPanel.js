export class DevListPanel {

    static drawAll(data) {
        console.log(data);
        let htmlValue = `
            <div style="margin-left: 50px;">
                <label class="mdui-checkbox">
                    <input type="checkbox" class="dev-checkbox-all" />
                    <i class="mdui-checkbox-icon"></i>
                    <span class="dev-selector-each-items-words">全选</span>
                </label>
            </div>
        `;
        for (let i = 0; i < data.length; i++) {
            htmlValue = htmlValue + `
                <div style="margin-left: 50px;">
                    <label class="mdui-checkbox">
                        <input type="checkbox" class="dev-checkbox-item dev-checkbox-item-${data[i].devCode}" data-devCode="${data[i].devCode}" data-devId="${data[i].id}"/>
                        <i class="mdui-checkbox-icon"></i>
                        <span class="dev-selector-each-items-words">${data[i].devCode}</span>
                    </label>
                </div>
            `;
        }
        $('.use-dev-role-dev-list').html(htmlValue);
        /*add by guoshuai start 2018-10-8*/
        $('.dept-modal-area-four #div_items').html('');
        let searchHtml=`
        `;
        for (let i = 0; i < data.length; i++) {
            searchHtml = searchHtml + ` 
                <div>   
                    <label class="mdui-checkbox" style="padding-left:0">
                        <input type="checkbox" class="dev-checkbox-item div_item dev-checkbox-item-${data[i].devCode}" data-devCode="${data[i].devCode}" data-devId="${data[i].id}"/>
                        <span class="dev-selector-each-items-words">${data[i].devCode}</span>
                    </label> 
                </div>                                   
            `;
        }
        $('.dept-modal-area-four #div_items').html(searchHtml);
        /*add by guoshuai end 2018-10-8*/
        

    }

    static drawUser(data) {

        console.log(data);
        for (let i = 0; i < data.length; i++) {
            $(`.dev-checkbox-item-${data[i].devCode}`).prop('checked', true);
            $('#dev-selected-area').append(`
                <div class="each-divinner-item selected-dev-items-in-panel selected-devCode-${data[i].devCode}" data-devCode="${data[i].devCode}">
                    <span class="selected-dev-value-in-panel">${data[i].devCode}</span>
                    <i class="iconfont icon-x-close item-close selected-dev-delete" data-devCode="${data[i].devCode}"></i>
                </div>
            `);
            selectedDevMap.set(data[i].devCode, data[i].id);
        }
        let isAllChecked = true;
        for (let i = 0; i < $('.dev-checkbox-item').length; i++) {
            if (!$($('.dev-checkbox-item')[i]).is(':checked')) {
                isAllChecked = false;
                break;
            }
        }
        if (isAllChecked) {
            $('.dev-checkbox-all').prop('checked', true);
        }
        /*add by guoshuai start 2018-8-25*/
        let doOperationTh = '';
        doOperationTh = '<td class="table-in-todo" style="width:153px;">操作</td>';
        let doOperationCheckBoxTh2 = ``;
        doOperationCheckBoxTh2 = `
            <td class="am-text-middle table-td-selector" style="width:45px;">
                <div class="myCheckBox">
                    <input class="all-checkbox-user-dev" type="checkbox">
                </div>
            </td>
        `;
        $('#dev-table-tbody').html(`
            <tr class="tbody-th">
                ${doOperationCheckBoxTh2}
                <td style="width:250px;">设备编号</td>
                <td style="width:200px;">有效期开始时间</td>
                <td style="width:200px;">有效期结束时间</td>
                
                <!--<td class="table-in-todo">操作</td>-->
                ${doOperationTh}
            </tr>
        `);
        let htmlValue2='';
        for(let i=0;i<data.length;i++){
            function getLocked(val) {
                if (val == 0) {
                    return '<span class="text-green">已启用</span>';
                } else {
                    return '<span class="text-red">已停用</span>';
                }
            }
            function getLockedBtn(val) {
                if (val == 0) {
                    return '<button type="button" class="table-in-btn btn-yellow new-stop-user">停用</button>';
                } else {
                    return '<button type="button" class="table-in-btn btn-green new-stop-user">启用</button>';
                }
            }
            function startTime(val) {
                if (val == null) {
                    return '';
                } else {
                    return new Date(val).Format('yyyy-MM-dd hh:mm:ss');
                }
            }
            function endTime(val) {
                if (val == null) {
                    return '';
                } else {
                    return new Date(val).Format('yyyy-MM-dd hh:mm:ss');
                }
            }
            /* 防止出现null*/
            function removeNull(val) {
                if (val == null) {
                    return '';
                } else {
                    return val;
                }
            }
            let doOperationCheckBoxTd2 = ``;
            doOperationCheckBoxTd2 = `
                    <td class="am-text-middle table-td-selector">
                        <div class="myCheckBox">
                        
                            <input class="checkbox-user-dev"  type="checkbox" data-id="${data[i].userId}" data-dev-id="${data[i].id}">
                        </div>
                    </td>
                `;
            htmlValue2 = htmlValue2 + `
                <tr class="tbody-tr" style="border-bottom:1px solid rgb(100,100,100);">
                    ${doOperationCheckBoxTd2}
                    <td data-id="${data[i].id}" class="discernment-dev">${data[i].devCode}</td>
                    <td>${startTime(data[i].startTime)}</td>
                    <td>${endTime(data[i].endTime)}</td>
                    
                    <td class="table-in-todo">
                        
                        <button type="button" class="table-in-btn btn-blue update-dev-change" data-id="${data[i].id}" data-index="${i}">修改</button>
                        <button type="button" class="table-in-btn btn-red delete-dev-four" data-id="${data[i].userId}" data-index="${i}" data-dev-id="${data[i].id}">删除</button>
                    </td>
                </tr>

            `;
        }
        $('#dev-table-tbody').append(htmlValue2);
    }

    //获取机构下的测试手机号
    static drawPhoneList(data) {
        $('.dept-modal-area-phone #phone_items').html('');
        let searchHtml=``;
        for (let i = 0; i < data.length; i++) {
            searchHtml = searchHtml + ` 
                <div>   
                    <label class="mdui-checkbox" style="padding-left:0">
                        <input type="checkbox" class="dev-checkbox-item phone-item dev-checkbox-item-${data[i].id}" data-phoneId="${data[i].id}" data-phoneNum="${data[i].phoneNum}"/>
                        <span class="dev-selector-each-items-words">${data[i].phoneNum}</span>
                    </label> 
                </div>                                   
            `;
        }
        $('.dept-modal-area-phone #phone_items').html(searchHtml);
    }
}
