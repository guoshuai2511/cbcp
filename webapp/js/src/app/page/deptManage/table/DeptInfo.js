export class DeptInfo {

    static draw(allData, data, type) {
        let parentDept = {};
        let parentItemHtml = '';
        /*
        for (let i = 0; i < allData.length; i++) {
            if (type == 'update') {
                if (allData[i].deptId != data.deptId) {
                    parentItemHtml = parentItemHtml + `
                        <li><a class="dropdown-menu-selector dept-selector-item" style="color: #dedede" data-dept-id="${allData[i].deptId}">${allData[i].name}</a></li>
                    `;
                }
            } else {
                parentItemHtml = parentItemHtml + `
                    <li><a class="dropdown-menu-selector dept-selector-item" style="color: #dedede" data-dept-id="${allData[i].deptId}">${allData[i].name}</a></li>
                `;
            }
        }
        */
        if (data != null) {
            for (let i = 0; i < allData.length; i++) {
                if (data.layer != null) {
                    if (allData[i].layer < data.layer) {
                        parentDept = allData[i];
                    }
                    if (allData[i].deptId == data.deptId) {
                        break;
                    }
                }
            }
        }
        let htmlValue = `
            <div class="input-group modal-input">
                <span class="input-group-addon modal-input-title">
                <span class="text-red">*</span>&nbsp;组织机构名称</span>
                <input type="text" value="${data.name == null ? '' : data.name}" data-type="${type}" data-dept-id="${data.deptId == null ? '' : data.deptId}"
                       class="form-control modal-input-area modal-input-background input-space-forbidden" id="dept-update-input-name" maxlength="16">
                <span class="input-check" id="is-deptname-true"></span>
            </div>
            <div class="input-group modal-input">
                <span class="input-group-addon modal-input-title">
                    <span class="text-red">*</span>&nbsp;上级组织机构
                </span>
                <div class="btn-group">
                    <button type="button" ${type == 'add' ? '' : 'disabled="disabled"'}  data-toggle="modal" data-target="#dept-selector-modal"
                        style="width: 200px; height:34px; text-align: left; color: #fff;"
                        class="btn btn-default btn-sm" id="dept-update-input-parentId" data-dept-id="${parentDept.deptId == null ? '' : parentDept.deptId}">
                        ${parentDept.name == null ? '' : parentDept.name}
                    </button>
                    <ul class="dropdown-menu" style="width: 200px; cursor: pointer;">
                        ${parentItemHtml}
                    </ul>
                </div>
            </div>
            <div class="input-group modal-input">
                <span class="input-group-addon modal-input-title">组织架构描述</span>
                <textarea style="width: 300px !important;" rows="3" id="dept-update-input-remark" class="form-control modal-input-background" maxlength="140">${data.remark == null ? '' : data.remark}</textarea>
            </div>
            <!--
            <div class="input-group modal-input">
                <span class="input-group-addon modal-input-title">查看组织人员</span>
                <div class="dept-personnel">
                    <div class="each-divinner-item">admin</div>
                    <div class="each-divinner-item">huqi</div>
                    <div class="each-divinner-item">gaochao</div>
                    <div class="each-divinner-item">chaipeng</div>
                    <div class="each-divinner-item">shufuchen</div>
                    <div class="each-divinner-item">chenliang</div>
                    <div class="each-divinner-item">sunbing</div>
                    <div class="each-divinner-item">wangxiaowei</div>
                </div>
            </div>
            -->
            <div class="update-btn">
                ${type == 'update' ? `
                <button data-dept-name="${data.name}" data-dept-id="${data.deptId}" class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-pink view-user-btn">查看下属人员</button>
                ` : ''}
                <button id="update-dept-btn" data-dept-id="${data.deptId == null ? '' : data.deptId}" data-type="${type}" class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-blue" style="margin-left:20px;color:#fff !important;">${type == 'add' ? '提交' : '更新'}</button>
            </div>
        `;
        $('#dept-info-panel').html(htmlValue);
    }

}