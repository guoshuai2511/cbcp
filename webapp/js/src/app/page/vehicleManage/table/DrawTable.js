export class DrawTable {

    static devTable(result) {
        $('#table-tbody').html(``); 
        /* 防止出现null*/
        function removeNull(val) {
            if (val == null) {
                return '';
            } else {
                return val;
            }
        };   
        //根据status来决定操作内容
        function getOperation(val,i){
            if (val == 1) {
                return  `
                    <button type="button" class="table-in-btn btn-green entry-dev" data-index=${i}>录入</button> 
                `;
            }else if(val == 2){
                return `
                    <button type="button" class="table-in-btn btn-yellow update-dev" data-index=${i}>修改</button>
                `;
            }
        }
        
        let htmlValue = ``;
        for (let i = 0; i < result.length; i++) {
            let doOperationTd = ``;
            let doOperationCheckBoxTd = ``;
            doOperationTd = `<td class="table-in-todo" style="text-align:center;" data-dept-id="${result[i].deptId}" data-confirmTime="${result[i].confirmTime}" data-status="${result[i].status}" dev-id="${result[i].id}">
                                ${getOperation(result[i].status,i)}
                                <button type="button" class="table-in-btn btn-red delete-dev">删除</button>
                                <!--<button type="button" class="table-in-btn btn-blue vehicle-details">详情</button>-->
                                <button type="button" class="table-in-btn btn-blue vehicle_dev_manage" data-dept="${result[i].deptId}" data-vehicleId="${result[i].id}">管理下属设备</button>
                            </td>`;
            doOperationCheckBoxTd = `<td style="width: 50px;text-align: center;">
                                        <label class="mdui-checkbox deleteDisabled-checkbox">
                                            <input type="checkbox" class="checkbox-item" data-id=${result[i].id}/>
                                            <i class="mdui-checkbox-icon"></i>
                                        </label>
                                    </td>`;
            htmlValue = htmlValue + `
                <tr class="tbody-tr">
                    ${doOperationCheckBoxTd}
                    <td data-td="vehicleName">${result[i].vehicleNum}</td>
                    <td data-td="vehicleCode">${removeNull(result[i].plateNum)}</td>
                    <td data-td="vehicleType">${result[i].vehicleType}</td>
                    <td data-td="vehicleModel" title = "${result[i].model}">${result[i].model}</td>
                    <td data-td="vehicleUnit" data-deptId="${result[i].deptId}">${removeNull(result[i].deptName)}</td>
                    <td data-td="vehicleAdmin" data-managerRealName="${result[i].managerRealName}">${removeNull(result[i].managerRealName)}</td>
                    
                    <td data-td="vehicleDriver" data-driverRealName="${result[i].driverRealName}">${removeNull(result[i].driverRealName)}</td>
                    
                    <td data-td="vehicleArea" title = "${result[i].address}">
                        <div class="vehicleAreaDiv">
                            ${removeNull(result[i].address)}
                        </div>
                    </td>
                    <td data-td="devGps">
                        <button type="button" class="table-in-btn view-dev" style="margin-left:4px;"data-lng="${result[i].lng}" data-lat="${result[i].lat}"></button>
                    </td>
                    <td data-td="confirmTime">
                        <div class="confirmTimeDiv" title="${removeNull(result[i].confirmTime)}">
                            ${removeNull(result[i].confirmTime)}
                        </div>
                    </td>
                    <td data-td="remark" class="vehicleRemark" title="${removeNull(result[i].remark)}">
                        <div class="vehicleRemarkDiv">${removeNull(result[i].remark)}</div>  
                    </td>
                    ${doOperationTd}
                </tr>
            `;
        }
        $('#table-tbody').append(htmlValue);
        $('.vehicleRemarkDiv').width($(window).width()*0.1906);
        $('.vehicleAreaDiv').width($(window).width()*0.1041);
        $('.confirmTimeDiv').width($(window).width()*0.0885);
        $('.confirmTimeBox').width($(window).width()*0.0885);
        $(window).resize(function () {
            $('.vehicleRemarkDiv').width($(window).width()*0.1906);
            $('.vehicleAreaDiv').width($(window).width()*0.1041);
            $('.confirmTimeDiv').width($(window).width()*0.0885);
            $('.confirmTimeBox').width($(window).width()*0.0885);
        })  
    }

}