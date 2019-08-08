export class ModalContent {

    static getInputHtml(type, data, id) {

        let tagListHtml = '';
        if (tagListCache != null && tagListCache.length > 0) {
            for (let i = 0; i < tagListCache.length; i++) {
                if (tagListCache[i].replace(/\s/g, '') != '') {
                    tagListHtml = tagListHtml + `
                        <li>
                            <a class="dropdown-menu-selector tag-selector"
                            style="width:100%; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${tagListCache[i]}</a>
                        </li>
                    `;
                }
            }
        }

        let htmlValue = '';
        switch (type) {
            case 'add':
                htmlValue = `
                    <div class="modal-header">
                        <button type="button" class="close" style="color: #dedede" data-dismiss="modal" aria-label="Close">
                            <!-- 
							<span aria-hidden="true">&times;</span>
							 -->
							<!--add by guoshuai start 2018-10-15-->
			                <span aria-hidden="true" class="add-user-close"></span>
			                <!--add by guoshuai end 2018-10-15-->
                        </button>
                        <h4 class="modal-title">新增审核</h4>
                    </div>
                    <div class="modal-body">
                        <div class="input-group input-group-sm modal-input">
                            <span class="input-group-addon modal-input-title">作战名称</span>
                            <input type="text" class="form-control modal-input-area modal-input-background input-space-forbidden-caseName" id="caseName-input" maxlength="16">
                            <span class="input-check" id="is-caseName-true"></span>
                        </div>
                        <div class="input-group input-group-sm modal-input">
                            <span class="input-group-addon modal-input-title">标签</span>
                            <div class="btn-group" style="float:left;">
                                <input type="text" class="form-control modal-input-area modal-input-background dropdown-toggle"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="tag-input" maxlength="16">
                                ${tagListHtml == '' ? '' : `
                                <ul class="dropdown-menu tag-list-dropdown-menu" style="width:200px; max-height:250px; overflow:auto; background:rgb(40, 40, 40);">
                                    ${tagListHtml}
                                </ul>
                                `}
                            </div>
                            <span class="input-check" id="is-tag-true"></span>
                        </div>
                        <div class="input-group input-group-sm modal-input">
                            <span class="input-group-addon modal-input-title"><span class="text-red">*</span>&nbsp;审核状态</span>
                            <div class="btn-group" style="float:left;">
                                <button type="button" id="reviewStatus-button"
                                    style="width: 200px; text-align: left;color: #fff;"
                                    class="btn btn-default btn-sm dropdown-toggle"
                                    data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    <span id="reviewStatus-input" data-status="100">&nbsp;</span> <span class="caret" style="float: right; margin-top: 6px;"></span>
                                </button>
                                <ul class="dropdown-menu" style="width: 200px; background: rgb(40, 40, 40);">
                                    <li><a class="dropdown-menu-selector reviewStatus-selector" data-status="1">真实</a></li>
                                    <li><a class="dropdown-menu-selector reviewStatus-selector" data-status="-1">无效</a></li>
                                </ul>
                            </div>
                            <span class="input-check" id="is-reviewStatus-true"></span>
                        </div>
                        <div class="input-group input-group-sm modal-input">
                            <span class="input-group-addon modal-input-title">备注</span>
                            <textarea type="text" class="form-control modal-input-area modal-input-background" id="remark-input" style="width:285px !important; min-width:285px !important; height:65px;"></textarea>
                        </div>
                        <div class="modal-input" id="content-tips" style="margin-top: 15px; display: block;margin-left: 22px;">
                            <span style="">
                                注：带 "<span class="text-red">*</span>"为必填项
                            </span>
                        </div>
                    </div>
                    <div class="modal-footer">
                    	<button type="button" class="btn btn-primary confirm" id="case-modal-submit-add" data-type="${type}" data-caseId="${id}" data-caseSerial="${data.serialNum}">确认添加</button>
                        <button type="button" class="btn btn-default cancel" data-dismiss="modal">取消</button>
                    </div>
                `;
                break;
            case 'update':
                let reviewStatusCode = 100;
                let reviewStatusValue = '&nbsp;';
                switch (data.reviewStatus) {
                    case 1:
                        reviewStatusCode = 1;
                        reviewStatusValue = '真实';
                        break;
                    case -1:
                        reviewStatusCode = -1;
                        reviewStatusValue = '无效';
                        break;
                    default:
                        break;
                }
                htmlValue = `
                    <div class="modal-header">
                        <button type="button" class="close" style="color: #dedede" data-dismiss="modal" aria-label="Close">
                            <!-- 
							<span aria-hidden="true">&times;</span>
							 -->
							<!--add by guoshuai start 2018-10-15-->
			                <span aria-hidden="true" class="add-user-close"></span>
			                <!--add by guoshuai end 2018-10-15-->
                        </button>
                        <h4 class="modal-title">修改审核</h4>
                    </div>
                    <div class="modal-body">
                        <div class="input-group input-group-sm modal-input">
                            <span class="input-group-addon modal-input-title">作战名称</span>
                            <input type="text" class="form-control modal-input-area modal-input-background input-space-forbidden-caseName" id="caseName-input" maxlength="16" value="${data.combatName == null ? '' : data.combatName}">
                            <span class="input-check" id="is-caseName-true"></span>
                        </div>
                        <div class="input-group input-group-sm modal-input">
                            <span class="input-group-addon modal-input-title">标签</span>
                            <div class="btn-group" style="float:left;">
                                <input type="text" class="form-control modal-input-area modal-input-background dropdown-toggle"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="tag-input" maxlength="16"
                                       value="${data.tag == null ? '' : data.tag}">
                                ${tagListHtml == '' ? '' : `
                                <ul class="dropdown-menu tag-list-dropdown-menu" style="width:200px; max-height:250px; overflow:auto;  background:rgb(40, 40, 40);">
                                    ${tagListHtml}
                                </ul>
                                `}
                            </div>
                            <span class="input-check" id="is-tag-true"></span>
                        </div>
                        <div class="input-group input-group-sm modal-input">
                            <span class="input-group-addon modal-input-title"><span class="text-red">*</span>&nbsp;审核状态</span>
                            <div class="btn-group" style="float:left;">
                                <button type="button" id="reviewStatus-button"
                                    style="width: 200px; text-align: left;color: #fff;"
                                    class="btn btn-default btn-sm dropdown-toggle"
                                    data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    <span id="reviewStatus-input" data-status="${reviewStatusCode}">${reviewStatusValue}</span> <span class="caret" style="float: right; margin-top: 6px;"></span>
                                </button>
                                <ul class="dropdown-menu" style="width: 200px; background: rgb(40, 40, 40);">
                                    <li><a class="dropdown-menu-selector reviewStatus-selector" data-status="1">真实</a></li>
                                    <li><a class="dropdown-menu-selector reviewStatus-selector" data-status="-1">无效</a></li>
                                </ul>
                            </div>
                            <span class="input-check" id="is-reviewStatus-true"></span>
                        </div>
                        <div class="input-group input-group-sm modal-input">
                            <span class="input-group-addon modal-input-title">备注</span>
                            <textarea type="text" class="form-control modal-input-area modal-input-background" id="remark-input" style="width:285px !important; min-width:285px !important; height:65px;">${data.remark == null ? '' : data.remark}</textarea>
                        </div>
                        <div class="modal-input" id="content-tips" style="margin-top: 15px; display: block;margin-left: 22px;">
                            <span style="">
                                注：带 "<span class="text-red">*</span>"为必填项
                            </span>
                        </div>
                    </div>
                    <div class="modal-footer">
                    	<button type="button" class="btn btn-primary confirm" id="case-modal-submit-add" data-type="${type}" data-caseId="${id}" data-caseSerial="${data.serialNum}">确认添加</button>
                        <button type="button" class="btn btn-default cancel" data-dismiss="modal">取消</button>
                    </div>
                `;
                break;
            default:
                break;
        }
        return htmlValue;
    }

}