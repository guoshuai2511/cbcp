export class ModalContent {

    static getDevViewHtml(data) {
        let roleValue = ``;
        for (let i = 0; i < data.roleList.length; i++) {
            roleValue = roleValue + `
                ${data.roleList[i].roleName}${i == data.roleList.length - 1 ? '' : '，'}
            `;
        }
        let htmlValue = `<table class="dev-info-table">
                            <tr>
                                <td class="dev-info-name">设备编号</td>
                                <td class="dev-info-value">${data.devCode}</td>
                            </tr>
                            <tr>
                                <td class="dev-info-name">所属机构</td>
                                <td class="dev-info-value">${data.deptName = null ? '' : data.deptName}</td>
                            </tr>
                        </table>`;
        return htmlValue;
    }

    static getDevInputHtml(type, data) {
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
        //排除脏数据设备类型
        function getDevTypeInput(val){
            if( val == 2){
                return `<span id="devType-input" date-devType= 2 >单兵</span>`
            }else{
                return `<span id="devType-input" date-devType= 1 >车载</span>`
            }
        }
        switch (type) {
            case 1:
                $('#dept-selected-area').html('');
                htmlValue = `<div class="modal-header">
                                <button type="button" class="close" style="color: #dedede" data-dismiss="modal" aria-label="Close">
                                    <!--delete by guoshuai start 2018-10-15
		                            <span aria-hidden="true">×</span>
		                            delete by guoshuai end 2018-10-15-->
		                            <!--delete by guoshuai start 2018-10-15-->
		                            <span aria-hidden="true" class="add-user-close"></span>
		                            <!--delete by guoshuai end 2018-10-15-->
                                </button>
                                <h4 class="modal-title">新增设备</h4>
                            </div>
                            <div class="modal-body">
                                <div class="input-group input-group-sm modal-input">
                                    <span class="input-group-addon modal-input-title"><span class="text-red">*</span>设备编号</span>
                                    <input data-type="${type}" type="text" class="form-control modal-input-area modal-input-background input-space-forbidden-dev" id="devCode-input" data-type="add" data-devId="0" aria-describedby="basic-addon3">
                                    <span class="input-check" id="is-have-dev"></span>
                                </div>
                                <!--add by guoshuai start 2018-9-11-->
                                <div class="input-group input-group-sm modal-input">
                                    <span class="input-group-addon modal-input-title"><span class="text-red">*</span>显示编号</span>
                                    <input data-type="${type}" type="text" class="form-control modal-input-area modal-input-background input-space-forbidden-dev" id="disCode-input" data-type="add" data-devId="0" aria-describedby="basic-addon3">
                                    <span class="input-check" id="is-have-dis"></span>
                                </div>
                                <!--add by guoshuai end 2018-9-11-->
                                <div class="input-group input-group-sm modal-input">
                                    <span class="input-group-addon modal-input-title"><span class="text-red">*</span>&nbsp;所属机构</span>
                                    <div class="dept-input-container" id="dept-input-container-value" data-dept-id="" data-type="add"></div>
                                    <span class="input-check" id="is-dept-true"></span>
                                </div>
                                <!--设备类型-->
                                <div class="input-group input-group-sm modal-input">
                                    <span class="input-group-addon modal-input-title"><span class="text-red">*</span>&nbsp;设备类型</span>
                                    <div class="btn-group">
                                        <button type="button" id="sex-button"
                                            style="width: 200px; text-align: left; border: 1px solid #174275; background: #011731 ; color: #fff;"
                                            class="btn btn-default btn-sm dropdown-toggle"
                                            data-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">
                                            <span id="devType-input" date-devType=1>车载</span> <span class="caret" style="float: right; margin-top: 6px;"></span>
                                        </button>
                                        <ul class="dropdown-menu" style="width: 200px; background: #08264a ;">
                                            <li><a class="dropdown-menu-selector devType-selector" data-devType=1>车载</a></li>
                                            <li><a class="dropdown-menu-selector devType-selector" data-devType=2>单兵</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <!--列装时间-->
                                <!--
                                <div class="input-group input-group-sm modal-input">
                                    <span class="input-group-addon modal-input-title"style="position:relative;">列装时间</span>
                                    <input type="text" id="query-time-end-time" style="float: left;width: 200px !important;background-color: #011731 !important;background: url(img/usermanageicon/date3x.png)172px 4px no-repeat;
                                    background-size: 11% 70%; border: 1px solid #174275;"
                                        class="form-control input-background input-data-picker-md devComfirmTime"
                                        onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})">
                                    <span class="input-check" id="is-comfirmeTime-true"></span>
                                </div>
                                -->
                                <div class="modal-input" id="content-tips" style="margin-top: 15px; display: block; left: 24px;">
                                    <span style="">
                                        注：带 "<span class="text-red">*</span>"为必填项
                                    </span>
                                </div>
                            </div>
                            <div class="modal-footer">
                            	<button type="button" class="btn btn-primary confirm" id="dev-modal-submit-add">确认添加</button>
                                <button type="button" class="btn btn-default cancel" data-dismiss="modal">取消</button>
                            </div>`;
                break;
            case 2:
                /*
                let devDeptHtml = ''
                if (data.deptId != null) {
                    for (let i = 0; i < deptTreeCache.length; i++) {
                        if (data.deptId == deptTreeCache[i].deptId) {
                            devDeptHtml = `
                                <div class="each-divinner-item">
                                    <span class="selected-institutions-value-modal" id="selected-institutions-value" data-dept-id="${deptTreeCache[i].deptId}">${deptTreeCache[i].name}</span>
                                    <i class="iconfont icon-x-close item-close selected-dept-modal-item-delete"></i>
                                </div>
                            `;
                            break;
                        }
                    }
                }
                $('#dept-selected-area').html(devDeptHtml);
                */
                htmlValue = `<div class="modal-header">
                                <button type="button" class="close" style="color: #dedede" data-dismiss="modal" aria-label="Close">
                                    <!--delete by guoshuai start 2018-10-15
		                            <span aria-hidden="true">×</span>
		                            delete by guoshuai end 2018-10-15-->
		                            <!--delete by guoshuai start 2018-10-15-->
		                            <span aria-hidden="true" class="add-user-close"></span>
		                            <!--delete by guoshuai end 2018-10-15-->
                                </button>
                                <h4 class="modal-title">修改信息</h4>
                             </div>
                             <div class="modal-body">
                                <div class="input-group input-group-sm modal-input">
                                    <span class="input-group-addon modal-input-title"><span class="text-red">*</span>&nbsp;设备编号</span>
                                    <input value="${data.devCode}" type="text" class="form-control modal-input-area modal-input-background input-space-forbidden-dev" id="devCode-input" data-type="update" data-devId="${data.id}" aria-describedby="basic-addon3">
                                    <span class="input-check" id="is-have-dev"></span>
                                </div>
                                <!--add by guoshuai start 2018-9-11-->
                                <div class="input-group input-group-sm modal-input">
                                    <span class="input-group-addon modal-input-title"><span class="text-red">*</span>显示编号</span>
                                    <input value="${removeNull(data.disCode)}"data-type="${type}" type="text" class="form-control modal-input-area modal-input-background input-space-forbidden-dev" id="disCode-input" data-type="add" data-devId="${removeNull(data.id)}" aria-describedby="basic-addon3"/* *disabled="disabled"*//>
                                    <span class="input-check" id="is-have-dis"></span>
                                </div>
                                <!--add by guoshuai end 2018-9-11-->
                                <div class="input-group input-group-sm modal-input">
                                    <span class="input-group-addon modal-input-title"><span class="text-red">*</span>&nbsp;所属机构</span>
                                    <div class="dept-input-container" id="dept-input-container-value" data-dept-id="${data.deptId == null ? '' : data.deptId}" data-type="update">${data.deptName == null ? '' : data.deptName}</div>
                                    <span class="input-check" id="is-dept-true"></span>
                                </div>
                                <!--设备类型-->
                                <div class="input-group input-group-sm modal-input">
                                    <span class="input-group-addon modal-input-title"><span class="text-red">*</span>&nbsp;设备类型</span>
                                    <div class="btn-group">
                                        <button type="button" id="sex-button"
                                            style="width: 200px; text-align: left; border: 1px solid #174275; background: #011731 ; color: #fff;"
                                            class="btn btn-default btn-sm dropdown-toggle"
                                            data-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">
                                            ${getDevTypeInput(data.devType)}
                                            <span class="caret" style="float: right; margin-top: 6px;"></span>
                                        </button>
                                        <ul class="dropdown-menu" style="width: 200px; background: #08264a ;">
                                            <li><a class="dropdown-menu-selector devType-selector" data-devType=1>车载</a></li>
                                            <li><a class="dropdown-menu-selector devType-selector" data-devType=2>单兵</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <!--
                                <div class="input-group input-group-sm modal-input">
                                    <span class="input-group-addon modal-input-title">列装时间</span>
                                    <input type="text" id="query-time-start-timeDev" style="float: none;position: relative;background-color: #011731 !important; width:200px !important;
                                        background:url('img/usermanageicon/date3x.png')172px 4px no-repeat; background-size:11% 70%;font-size:13px; border: 1px solid #174275;color:#fff;"
                                        class="form-control input-background input-data-picker-md"
                                        onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"><span class="input-check" id="is-startTime-true" style="
                                            position: absolute;
                                            width: 105px;
                                            top: 120px;
                                            left: 428px;
                                        "></span>
                                    <span class="input-check" id="is-dept-true"></span>
                                </div>
                                -->
                                <div class="modal-input" id="content-tips" style="margin-top: 15px; display: block; left: 24px;">
                                    <span style="">
                                        注：带 "<span class="text-red">*</span>"为必填项
                                    </span>
                                 </div>
                             </div>
                             <div class="modal-footer">
                             	<button type="button" class="btn btn-primary confirm" id="dev-modal-submit-update">确认修改</button>
                                <button type="button" class="btn btn-default cancel" data-dismiss="modal">取消</button>
                             </div>`;
                break;
            case 3:
                htmlValue = `<div class="modal-header">
                                <button type="button" class="close" style="color: #dedede" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true" class="add-user-close"></span>
                                </button>
                                <h4 class="modal-title">录入设备</h4>
                            </div>
                            <div class="modal-body">
                                <div class="input-group input-group-sm modal-input">
                                <span class="input-group-addon modal-input-title"><span class="text-red">*</span>设备名称</span>
                                <input value="${removeNull(data.disCode)}"data-type="${type}" type="text" class="form-control modal-input-area modal-input-background input-space-forbidden-dev" id="disCode-input" data-type="add" data-devId="${removeNull(data.id)}" aria-describedby="basic-addon3" disabled="disabled">
                                <span class="input-check" id="is-have-dis"></span>
                            </div>
                            <div class="input-group input-group-sm modal-input">
                                <span class="input-group-addon modal-input-title"><span class="text-red">*</span>&nbsp;所属机构</span>
                                <div class="dept-input-container" id="dept-input-container-value" data-dept-id="${data.deptId == null ? '' : data.deptId}" data-type="update">${data.deptName == null ? '' : data.deptName}</div>
                                <span class="input-check" id="is-dept-true"></span>
                            </div>
                            <!--
                            <div class="input-group input-group-sm modal-input">
                                <span class="input-group-addon modal-input-title">列装时间</span>
                                <input type="text" id="query-time-start-timeDev" style="float: none;position: relative;background-color: #011731 !important; width:200px !important;
                                    background:url('img/usermanageicon/date3x.png')172px 4px no-repeat; background-size:11% 70%;font-size:13px; border: 1px solid #174275;color:#fff;"
                                    class="form-control input-background input-data-picker-md"
                                    onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"><span class="input-check" id="is-startTime-true" style="
                                        position: absolute;
                                        width: 105px;
                                        top: 120px;
                                        left: 428px;
                                    "></span>
                                <span class="input-check" id="is-dept-true"></span>
                            </div>
                            -->
                            <div class="modal-input" id="content-tips" style="margin-top: 15px; display: block; left: 24px;">
                                <span style="">
                                    注：带 "<span class="text-red">*</span>"为必填项
                                </span>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" id="dev-input-submit">确认录入</button>
                            <button type="button" class="btn btn-default" data-dismiss="modal" id="dev-input-cancel">取消</button>
                        </div>`;
                break;
            default:
                break;
        }
        return htmlValue;
    }

}