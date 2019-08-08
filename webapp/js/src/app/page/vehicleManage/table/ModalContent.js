export class ModalContent {
    static getVehicleInfoHtml(type, data) {
        /* 重置各面板*/
        $('#dept-selected-area').html('');
        $('#role-selected-area').html('');
        let treeObj = $.fn.zTree.getZTreeObj('dept-selector-tree');
        treeObj.cancelSelectedNode();
        $('.role-checkbox-item').prop('checked', false);
        function removeNull(val) {
            if (val == null) {
                return '';
            } else {
                return val;
            }
        };
        /* */
        let htmlValue = '';
        let roleListHtml = '';
        if (roleListCache != null) {
            for (let i = 0; i < roleListCache.length; i++) {
                roleListHtml = roleListHtml + `<li><a class="dropdown-menu-selector role-selector" data-role-id="${roleListCache[i].roleId}">${roleListCache[i].roleName}</a></li>`;
            }
        }
        //单兵和车载的判断
        function devOrSingleColor(val){
            if (val == null) {
                return '';
            } else if(val == 1) {
                return '#F19149';
            }else if(val == 2) {
                return '#22AC38';
            }
        } 
        function devOrSingle(val){
            if (val == null) {
                return '';
            } else if(val == 1) {
                return '车载';
            }else if(val == 2) {
                return '单兵';
            }
        } 
        let corollaryEquipmentHtml = '';
        for(let i=0;i<data.length;i++){
            corollaryEquipmentHtml = corollaryEquipmentHtml + `
                <div class="corollaryEquipmenMinBox">
                    <div class = "vehicle-info-box">
                        <span class = "vehicle-dev" style="background:${devOrSingleColor(data[i].color)}; color:#fff">${devOrSingle(data[i].color)}</span>
                        <span class = "vehicle-dev-name">${(data[i].color)}</span>
                    </div>
                    <div class = "vehicle-info-box">
                        <span class="passiveOrInitiative"></span>
                        <span class="passiveOrInitiativeIinformation"></span>
                    </div>
                    <div class = "vehicle-info-box">
                        <span class="passiveOrInitiative"></span>
                        <span class="passiveOrInitiativeIinformation"></span>
                    </div>
                </div>
            `;
        }
        switch (type) {
            case 1:
                $('#dept-selected-area').html('');
                htmlValue = `<div class="modal-header">
                                <button type="button" class="close" style="color: #dedede" data-dismiss="modal" aria-label="Close">
		                            <span aria-hidden="true" class="add-user-close"></span>
                                </button>
                                <h4 class="modal-title">配套设备</h4>
                            </div>
                            <div class="modal-body" style="height:600px; overflow-x:hidden; overflow-y:scroll;">
                                <div class="input-group input-group-sm modal-input">
                                    <span>车牌号：</span>
                                    <span></span>
                                    <span>车辆类型：</span>
                                    <span></span>
                                    <span>品牌：</span>
                                    <span></span>
                                    <span>型号：</span>
                                    <span></span>
                                </div>
                                <div class="input-group input-group-sm modal-input">
                                    <h5 class="modal-title">配套设备</h5>
                                </div>
                                ${corollaryEquipmentHtml}
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default cancel" data-dismiss="modal">关闭</button>
                            </div>`;
                break;
            case 2:
                htmlValue = `<div class="modal-header">
                                <button type="button" class="close" style="color: #dedede" data-dismiss="modal" aria-label="Close">
		                            <span aria-hidden="true" class="add-user-close"></span>
                                </button>
                                <h4 class="modal-title">修改车辆信息</h4>
                             </div>
                             <div class="modal-body">
                                <div class="input-group input-group-sm modal-input">
                                    <span class="input-group-addon modal-input-title"><span class="text-red"></span>车辆编号</span>
                                    <input value="${removeNull(data.vehicleNum)}"data-type="${type}" type="text" class="form-control modal-input-area modal-input-background input-space-forbidden-dev" id="vehicleNum-input" data-type="add" data-devId="${removeNull(data.vehicleNum)}" aria-describedby="basic-addon3" disabled="disabled">
                                </div>
                                <div class="input-group input-group-sm modal-input">
                                    <span class="input-group-addon modal-input-title"><span class="text-red">*</span>&nbsp;车牌号</span>
                                    <input value="${removeNull(data.plateNum)}"data-type="${type}" type="text" class="form-control modal-input-area modal-input-background input-space-forbidden-dev plate-number-legitimate" id="plateNum-input" aria-describedby="basic-addon3" maxlength="8" table-id="${removeNull(data.id)}">
                                    <span class="input-check" id="is-plateNum-true"></span>
                                </div>
                                <!--车辆类型-->
                                <div class="input-group input-group-sm modal-input">
                                    <span class="input-group-addon modal-input-title"><span class="text-red">*</span>&nbsp;车辆类型</span>
                                    <input value="${removeNull(data.vehicleType)}"data-type="${type}" type="text" class="form-control modal-input-area modal-input-background input-space-forbidden-dev" id="vehicleType-input" aria-describedby="basic-addon3" maxlength="8">
                                    <span class="input-check" id="is-vehicleType-true"></span>
                                </div>
                                <!--品牌型号-->
                                <div class="input-group input-group-sm modal-input">
                                    <span class="input-group-addon modal-input-title">品牌型号</span>
                                    <input value="${removeNull(data.model)}"data-type="${type}" type="text" class="form-control modal-input-area modal-input-background input-space-forbidden-dev" id="vehicleModel-input" aria-describedby="basic-addon3" maxlength="10">
                                    <span class="input-check" id="is-model-true"></span>
                                </div>
                                <!--所属单位-->
                                <div class="input-group input-group-sm modal-input">
                                    <span class="input-group-addon modal-input-title"><span class="text-red">*</span>&nbsp;所属单位</span>
                                    <div class="dept-input-container" id="dept-input-container-value" data-dept-id="${removeNull(data.deptId)}" data-type="add">${removeNull(data.deptName)}</div>
                                    <span class="input-check" id="is-dept-true"></span>
                                </div>
                                <!--列装时间-->
                                <div class="input-group input-group-sm modal-input">
                                    <span class="input-group-addon modal-input-title">列装时间</span>
                                    <input type="text" id="query-time-end-timeDev" style="float: none;position: relative;background-color: #011731 !important; width:200px !important;
                                        background:url('img/usermanageicon/date3x.png')172px 4px no-repeat; background-size:11% 70%;font-size:13px; border: 1px solid #174275;color:#fff;"
                                        class="form-control input-background input-data-picker-md"
                                        onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"><span class="input-check" id="is-startTime-true" style="
                                            position: absolute;
                                            width: 105px;
                                            top: 120px;
                                            left: 428px;
                                        "></span>
                                    <span class="input-check" id="is-confirmTime-true"></span>
                                </div>
                                <!--管理者账号-->
                                <div class="input-group input-group-sm modal-input">
                                    <span class="input-group-addon modal-input-title">管理者账号</span>
                                    <div class="btn-group" id="manager-box" data-type="add">
                                        <input type="text" id="manager-button" autocomplete="off"
                                        style="width: 200px; text-align: left; border: 1px solid #174275;color: #fff;height:30px;"
                                        class="btn btn-default btn-sm dropdown-toggle adminType"
                                        data-toggle="dropdown"
                                        managerId="${removeNull(data.managerId)}" 
                                        value="${removeNull(data.managerName)}"
                                        />
                                        <ul class="CR-scrollY" style="width: 200px; background: rgb(40, 40, 40) ;background: #08264a ;" id="managerList">
                                           
                                        </ul>
                                    </div>
                                    <span class="input-check" id="is-managerIs"></span>
                                </div>
                                <!--使用人账号-->
                                <div class="input-group input-group-sm modal-input">
                                    <span class="input-group-addon modal-input-title">使用人账号</span>
                                    <div class="btn-group" id="driver-box" data-type="add">
                                        <input type="text" id="driver-button" autocomplete="off"
                                        style="width: 200px; text-align: left; border: 1px solid #174275; color: #fff;height:30px;"
                                        class="btn btn-default btn-sm dropdown-toggle driver"
                                        managerId="${removeNull(data.driverId)}" 
                                        value="${removeNull(data.driverName)}"
                                        />
                                        <ul class="CR-scrollY" style="width: 200px; background: rgb(40, 40, 40) ;background: #08264a ;" id="driverList">
                                          
                                        </ul>
                                    </div>
                                    <span class="input-check" id="is-driverIs"></span>
                                </div>
                                <!--备注-->
                                <div class="input-group input-group-sm modal-input">
                                    <span class="input-group-addon modal-input-title">备注</span>
                                    <textarea type="text" class="form-control modal-input-area modal-input-background" id="remark-input">${removeNull(data.remark)}</textarea>
                                </div>
                                <div class="modal-input" id="content-tips" style="margin-top: 15px; display: block; left: 24px;">
                                    <span style="">
                                        注：带 "<span class="text-red">*</span>"为必填项
                                    </span>
                                </div>
                            </div>
                             <div class="modal-footer">
                             	<button type="button" class="btn btn-primary confirm" id="vehicle-information-submit-update" data-index="${data.id}">确认修改</button>
                                <button type="button" class="btn btn-default cancel" data-dismiss="modal">取消</button>
                             </div>`;
                break;
            case 3:
                htmlValue = `<div class="modal-header">
                                <button type="button" class="close" style="color: #dedede" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true" class="add-user-close"></span>
                                </button>
                                <h4 class="modal-title">车辆录入</h4>
                            </div>
                            <div class="modal-body">
                                <div class="input-group input-group-sm modal-input">
                                    <span class="input-group-addon modal-input-title"><span class="text-red"></span>车辆编号</span>
                                    <input value="${removeNull(data.vehicleNum)}"data-type="${type}" type="text" class="form-control modal-input-area modal-input-background input-space-forbidden-dev" id="vehicleNum-input" data-type="add" data-devId="${removeNull(data.vehicleNum)}" aria-describedby="basic-addon3" disabled="disabled">
                                </div>
                                <div class="input-group input-group-sm modal-input">
                                    <span class="input-group-addon modal-input-title"><span class="text-red">*</span>&nbsp;车牌号</span>
                                    <input value="${removeNull(data.plateNum)}"data-type="${type}" type="text" class="form-control modal-input-area modal-input-background input-space-forbidden-dev plate-number-legitimate" id="plateNum-input" aria-describedby="basic-addon3" maxlength="8" table-id="${removeNull(data.id)}">
                                    <span class="input-check" id="is-plateNum-true"></span>
                                </div>
                                <!--车辆类型-->
                                <div class="input-group input-group-sm modal-input">
                                    <span class="input-group-addon modal-input-title"><span class="text-red">*</span>&nbsp;车辆类型</span>
                                    <input value="${removeNull(data.vehicleType)}"data-type="${type}" type="text" class="form-control modal-input-area modal-input-background input-space-forbidden-dev" id="vehicleType-input" aria-describedby="basic-addon3" maxlength="8">
                                    <span class="input-check" id="is-vehicleType-true"></span>
                                </div>
                                <!--品牌型号-->
                                <div class="input-group input-group-sm modal-input">
                                    <span class="input-group-addon modal-input-title">品牌型号</span>
                                    <input value="${removeNull(data.model)}"data-type="${type}" type="text" class="form-control modal-input-area modal-input-background input-space-forbidden-dev" id="vehicleModel-input" aria-describedby="basic-addon3" maxlength="10">
                                    <span class="input-check" id="is-model-true"></span>
                                </div>
                                <!--所属单位-->
                                <div class="input-group input-group-sm modal-input">
                                    <span class="input-group-addon modal-input-title"><span class="text-red">*</span>&nbsp;所属单位</span>
                                    <div class="dept-input-container" id="dept-input-container-value" data-dept-id="${removeNull(data.deptId)}" data-type="add">${removeNull(data.deptName)}</div>
                                    <span class="input-check" id="is-dept-true"></span>
                                </div>
                                <!--列装时间-->
                                <div class="input-group input-group-sm modal-input">
                                    <span class="input-group-addon modal-input-title">列装时间</span>
                                    <input type="text" id="query-time-start-timeDev" style="float: none;position: relative;background-color: #011731 !important; width:200px !important;
                                        background:url('img/usermanageicon/date3x.png')172px 4px no-repeat; background-size:11% 70%;font-size:13px; border: 1px solid #174275;color:#fff;"
                                        class="form-control input-background input-data-picker-md"}"
                                        onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"><span class="input-check" id="is-startTime-true" style="
                                            position: absolute;
                                            width: 105px;
                                            top: 120px;
                                            left: 428px;
                                        "></span>
                                    <span class="input-check" id="is-confirmTime-true"></span>
                                </div>
                                <!--管理者账号-->
                                <div class="input-group input-group-sm modal-input">
                                    <span class="input-group-addon modal-input-title">管理者账号</span>
                                    <div class="btn-group" id="manager-box" data-type="add">
                                        <input type="text" id="manager-button" autocomplete="off"
                                        style="width: 200px; text-align: left; border: 1px solid #174275; color: #fff;height:30px;"
                                        class="btn btn-default btn-sm dropdown-toggle adminType"
                                        data-toggle="dropdown" 
                                        managerId="${removeNull(data.managerId)}" value="${removeNull(data.managerName)}"
                                        />
                                        <ul class="CR-scrollY" style="width: 200px; background: rgb(40, 40, 40) ;background: #08264a;" id="managerList">
                                            
                                        </ul>
                                    </div>
                                    <span class="input-check" id="is-managerIs"></span>
                                </div>
                                <!--使用人账号-->
                                <!--<div class="input-group input-group-sm modal-input">
                                    <span class="input-group-addon modal-input-title">使用人账号</span>
                                    <input type="text" value="${removeNull(data.driverName)}" class="form-control modal-input-area modal-input-background input-space-forbidden-dev driver-input" id="driver" aria-describedby="basic-addon3" managerId="${removeNull(data.driverId)}">
                                    <span class="input-check" id="is-driverName-true"></span>
                                </div>
                                -->
                                <div class="input-group input-group-sm modal-input">
                                    <span class="input-group-addon modal-input-title">使用人账号</span>
                                    <div class="btn-group" id="driver-box" data-type="add">
                                        <input type="text" id="driver-button" autocomplete="off"
                                        style="width: 200px; text-align: left; border: 1px solid #174275;color: #fff;height:30px;"
                                        class="btn btn-default btn-sm dropdown-toggle driver"
                                        managerId="${removeNull(data.driverId)}"
                                        value="${removeNull(data.driverName)}"
                                        />
                                        <ul class="CR-scrollY" style="width: 200px; background: rgb(40, 40, 40) ;background: #08264a ;" id="driverList">
                                          
                                        </ul>
                                    </div>
                                    <span class="input-check" id="is-driverIs"></span>
                                </div>
                                <!--备注-->
                                <div class="input-group input-group-sm modal-input">
                                    <span class="input-group-addon modal-input-title">备注</span>
                                    <textarea type="text" class="form-control modal-input-area modal-input-background" id="remark-input">${removeNull(data.remark)}</textarea>
                                </div>
                                <div class="modal-input" id="content-tips" style="margin-top: 15px; display: block; left: 24px;">
                                    <span style="">
                                        注：带 "<span class="text-red">*</span>"为必填项
                                    </span>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary confirm" id="dev-input-submit" data-index="${data.id}">确认录入</button>
                                <button type="button" class="btn btn-default" data-dismiss="modal" id="dev-input-cancel">取消</button>
                            </div>`;
                break;
            default:
                break;
        }
        return htmlValue;
    }

}