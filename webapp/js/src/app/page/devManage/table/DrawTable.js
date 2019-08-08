export class DrawTable {

    static devTable(result) {
        let doOperationTh = '';
        let doOperationCheckBoxTh = ``;
        //if (isAdmin == 1) {
        doOperationTh = '<td style="width: 200px !important; text-align: center; height:42px">操作</td>';
        doOperationCheckBoxTh = `<td style="width: 50px !important;text-align: center; height:42px">
                                    <label class="mdui-checkbox">
                                        <input type="checkbox" class="checkbox-all"/>
                                        <i class="mdui-checkbox-icon"></i>
                                    </label>
                                </td>`;
        //}
        //console.log(result);
        /*add by guoshuai start 2018-9-12 content:新增显示编号*/
        $('#table-tbody').html(`
            <tr class="tbody-th">
                ${doOperationCheckBoxTh}
                <td style="width:300px !important;height:42px;">设备编号</td>
                <td style="width:300px !important;height:42px;">显示编号</td>
                <!--<td>设备名称</td>-->
                <td>设备类型</td>
                <td style="width:130px !important;height:42px;">被动式支持信息</td>
                <td style="width:130px !important;height:42px;">主动式支持信息</td>
                <!--<td>列装时间</td>-->
                
                <td>所属机构</td>
               
                <td>停启用</td>
                ${doOperationTh}
            </tr>
        `);
        /*add by guoshuai end 2018-9-12 content:新增显示编号*/
        /* 防止出现null*/
        function removeNull(val) {
            if (val == null) {
                return '';
            } else {
                return val;
            }
        };
        //单兵和车载的判断
        function devRemoveNull(val){
            if (val == null) {
                return '';
            } else if(val == 1) {
                return '车载';
            }else if(val == 2) {
                return '单兵';
            }else{
                return '';
            }
        }

        let viewHtml;
        let buttonHtml;
        //启用，停用显示
        function getLocked(val) {
            if (val == 0) {
                return '<span class="text-green">已启用</span>';
            } else if(val == 1) {
                return '<span class="text-red">已停用</span>';
            } else if(val == 2){
                return '<span class="text-orange">待录入</span>';
            }
        }
        //录入，修改 的切换
        function getUsedBtn(val) {
            if (val == 0) {
                return '<button type="button" class="table-in-btn btn-yellow update-dev">录入</button>';
            } else {
                return '<button type="button" class="table-in-btn btn-green update-dev">修改</button>';
            }
        }
        //停用，启用切换
        function getLockedBtn(val) {
            if (val == 0) {
                return '<button type="button" class="table-in-btn btn-yellow stop-user">停用</button>';
            } else {
                return '<button type="button" class="table-in-btn btn-green stop-user">启用</button>';
            }
        }
        //根据status来决定操作内容
        function getOperation(val){
            if (val == 1) {
                return  `
                    <button type="button" class="table-in-btn btn-blue entry-dev">录入</button>
                    <button type="button" class="table-in-btn btn-red delete-dev">删除</button>
                `;
            }else if(val == 2){
                return `
                    <button type="button" class="table-in-btn btn-blue update-dev">修改</button>
                    <button type="button" class="table-in-btn btn-yellow stop-user">停用</button>
                    <button type="button" class="table-in-btn delete-dev"disabled='disabled' style="background-color: #999; border: 1px solid #999; color:#fff;">删除</button>
                `;
            }else if(val == 3){
                return `
                    <button type="button" class="table-in-btn btn-blue update-dev">修改</button>
                    <button type="button" class="table-in-btn btn-green start-user">启用</button>
                    <button type="button" class="table-in-btn btn-red delete-dev">删除</button>
                `;
            }
        }
        //根据status来决定设备状态
        function getStatus(val){
            if (val == 1) {
                return '<span class="text-orange">待录入</span>';
            }else if(val == 2){    
                return  '<span class="text-green">已启用</span>';
            }else if(val == 3){    
                return  '<span class="text-red">已停用</span>';
            }
        }
        //根据status来决定删除按钮是否可用
        /*function getStatusDisbaled(val){
            if (val == 1) {
                $('#del-dev-btn').removeAttr("disabled");
                $('.delete-dev').removeAttr("disabled");
            }else if(val == 2){    
                $('#del-dev-btn').attr('disabled','disabled');
                $('.delete-dev').attr('disabled','disabled');
            }else if(val == 3){    
                $('#del-dev-btn').removeAttr("disabled");
                $('.delete-dev').removeAttr("disabled");
            }
        }*/
        let htmlValue = ``;
        for (let i = 0; i < result.length; i++) {
            let doOperationTd = ``;
            let doOperationCheckBoxTd = ``;
            //if (isAdmin == 1) {
            doOperationTd = `<td class="table-in-todo" style="text-align:center;" data-dept-id="${result[i].deptId}" data-confirmTime="${result[i].confirmTime}" data-status="${result[i].status}" dev-id="${result[i].id}" data-index="${i}">
                                <!--<button type="button" class="table-in-btn btn-blue update-dev" data-index="${i}">修改</button>-->
                                ${getOperation(result[i].status)}
                                <!--<button type="button" class="table-in-btn btn-red delete-dev" style="margin-left:4px;">删除</button>-->
                            </td>`;
            doOperationCheckBoxTd = `<td style="width: 50px;text-align: center;">
                                        <label class="mdui-checkbox deleteDisabled-checkbox">
                                            <input type="checkbox" class="checkbox-item" data-id=${result[i].id}/>
                                            <i class="mdui-checkbox-icon"></i>
                                        </label>
                                    </td>`;
            // `
            //     <td class="am-text-middle table-td-selector">
            //         <div class="myCheckBox">
            //         <!--<input id="mycheckbox" type="checkbox" class="checkbix checkbox-dev" data-color="Blue" data-text="" data-id=${result[i].id}>-->
            //             <input class="checkbox-dev"  type="checkbox" data-id=${result[i].id} >
            //         </div>
            //     </td>
            // `;
            //}
            /*add by guoshuai start 2018-9-12 content:新增disCode*/
            htmlValue = htmlValue + `
                <tr class="tbody-tr">
                    ${doOperationCheckBoxTd}
                    <td data-td="disCode">${removeNull(result[i].devCode)}</td>
                    <td data-td="devCode">${removeNull(result[i].disCode)}</td>
                    <td data-td="devType">${devRemoveNull(result[i].devType)}</td>
                    <td data-td="passiveStandards">
                        <div title ="${removeNull(result[i].passiveStandards)}" class ="passiveStandardsDiv abbreviation">
                            ${removeNull(result[i].passiveStandards)}
                        </div>
                    </td>
                    <td data-td="activeStandards">
                        <div title ="${removeNull(result[i].activeStandards)}" class ="activeStandardsDiv abbreviation">
                            ${removeNull(result[i].activeStandards)}
                        </div>
                    </td>
                    <!--<td data-td="confirmTime">${removeNull(result[i].confirmTime)}</td>-->
                    
                    <td data-td="num" data-deptId="${result[i].deptId}">${removeNull(result[i].deptName)}</td>
                   
                    <td class="user-on-use">${getStatus(result[i].status)}</td>
                    ${doOperationTd}
                </tr>
            `;
        }
        $('#table-tbody').append(htmlValue);
        $('.passiveStandardsDiv').width($(window).width()*0.1);
        $('.activeStandardsDiv').width($(window).width()*0.0678);
        $(window).resize(function () {
            $('.passiveStandardsDiv').width($(window).width()*0.1);
            $('.activeStandardsDiv').width($(window).width()*0.0678);
        })
    }

}