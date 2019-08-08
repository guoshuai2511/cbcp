export class ModalContent {
    static getInputHtml(type, data) {
        /* 重置各面板*/
        $('#dept-selected-area').html('');
        let treeObj = $.fn.zTree.getZTreeObj('dept-selector-tree');
        treeObj.cancelSelectedNode();
        function removeNull(val) {
            if (val == null) {
                return '';
            } else {
                return val;
            }
        }
        let htmlValue = ''
        switch (type) {
            case 1:
                htmlValue = `
                    <div class="modal-header" style="width:95%;margin-left:20px;">
                        <button type="button" class="close" style="color: #dedede" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" class="add-user-close"></span>
                        </button>
                        <h4 class="modal-title h4-add">新增执法日志</h4>
                    </div>
                    <div class="modal-body" style="margin-left:160px">
                        <div class="input-group input-group-sm modal-input">
                            <span class="input-group-addon modal-input-title"><span class="text-red">*</span>&nbsp;案件名称</span>
                            <input type="text" data-type="${type}" class="form-control modal-input-area modal-input-background input-space-forbidden input-num-only" 
                            id="caseName">
                            <span class="input-check" id="is-casename-true"></span>
                        </div>

                        <div class="input-group input-group-sm modal-input">
                            <span class="input-group-addon modal-input-title"><span class="text-red">*</span>&nbsp;工作对象</span>
                            <input type="text" data-type="${type}" class="form-control modal-input-area modal-input-background input-space-forbidden input-num-only" 
                            id="workTarget">
                            <span class="input-check" id="is-worktarget-true"></span>
                        </div>

                        <div class="input-group input-group-sm modal-input">
                            <span class="input-group-addon modal-input-title"><span class="text-red">*</span>&nbsp;电信标识码</span>
                            <input type="text" data-type="${type}" class="form-control modal-input-area modal-input-background input-space-forbidden input-num-only"
                            id="phoneNum" maxlength="11">
                            <span class="input-check" id="is-tel-true"></span>
                        </div>

                        <div class="input-group input-group-sm modal-input">
                            <span class="input-group-addon modal-input-title">imsi</span>
                            <input type="text" class="form-control modal-input-area modal-input-background input-space-forbidden" 
                            id="imsi-input">
                        </div>

                        <div class="input-group input-group-sm modal-input">
                            <span class="input-group-addon modal-input-title">imei</span>
                            <input type="text" class="form-control modal-input-area modal-input-background input-space-forbidden" 
                            id="imei-input">
                        </div>
                        
                        <!--办案设备-->
                        <div class="input-group input-group-sm modal-input">
                            <span class="input-group-addon modal-input-title"><span class="text-red">*</span>&nbsp;设备名称</span>
                            <div id="myNewCaseDev-selector-button" class="dept-input-container abbreviation"></div>
                            <span class="input-check" id="is-dev-true"></span>
                        </div>

                        <div class="input-group input-group-sm modal-input">
                            <span class="input-group-addon modal-input-title"><span class="text-red">*</span>&nbsp;办案人账号</span>
                            <input type="text" class="form-control modal-input-area modal-input-background input-space-forbidden input-num-only" 
                            id="applicatName">
                            <span class="input-check" id="is-applicatname-true"></span>
                        </div>

                        <div class="input-group input-group-sm modal-input">
                            <span class="input-group-addon modal-input-title">办案人</span>
                            <input type="text" class="form-control modal-input-area modal-input-background input-space-forbidden" 
                            id="managerRealName-input"  data-manager-id="">
                            <span class="input-check" id="is-have-manager"></span>
                        </div>

                        <div class="input-group input-group-sm modal-input">
                        <span class="input-group-addon modal-input-title"><span class="text-red">*</span>&nbsp;办案时间</span>
                        <input type="text"id="time-input"
                            class="form-control modal-input-area modal-input-background input-space-forbidden"
                            onclick="WdatePicker({onpicked:function(){$('#time-input').blur()},dateFmt:'yyyy-MM-dd HH:mm:ss'})">
                            <span class="input-check" id="is-have-time"></span>
                        </div>

                        <div class="input-group input-group-sm modal-input">
                            <span class="input-group-addon modal-input-title">备注</span>
                            <input type="text" class="form-control modal-input-area modal-input-background input-space-forbidden"
                            id="remark-input">
                        </div>
                        <div class="modal-input" id="content-tips" style="margin-top: 15px; display: block; left: 24px;">
                            <span style="">
                                注：带 "<span class="text-red">*</span>"为必填项
                            </span>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" id="blackBoxlog-modal-submit-add">确认新增</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal" id="blackBoxlog-modal-submit-cancel">取消</button>
                    </div>
                `;
                break;
            default:
                break;
        }
        return htmlValue;
            

    }

}