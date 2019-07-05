export class ModalContent {

    static getUserViewHtml(data) {
        console.log(data)
        let roleValue = ``;
        if (data.roleList != null) {
            for (let i = 0; i < data.roleList.length; i++) {
                roleValue = roleValue + `
                    ${data.roleList[i].roleName}${i == data.roleList.length - 1 ? '' : '，'}
                `;
            }
        }
        /* 防止出现null*/
        function removeNull(val1,val2) {
            // if (val == null) {
            //     return '永久';
            // } else {
            //     return new Date(val).Format('yyyy-MM-dd hh:mm:ss');
            // }
            if(val1==null&&val2!=null){
                return ''+'&nbsp;&nbsp;&nbsp;'+' 至 '+new Date(val2).Format('yyyy-MM-dd hh:mm:ss');
            }
            if(val1!=null&&val2==null){
                return new Date(val1).Format('yyyy-MM-dd hh:mm:ss')+' 至 永久';
            }
            if(val1!=null&&val2!=null){
                return new Date(val1).Format('yyyy-MM-dd hh:mm:ss')+' 至 '+ new Date(val2).Format('yyyy-MM-dd hh:mm:ss');
            }
            if(val1==null&&val2==null){
                return  '永久';
            }
        };
        let html2='';
        let html3='';
        //let active="dev-phone-active";
        /*add by guoshuai start 2018-9-12 content:判断是否有dwPerms*/
        if(data.dwPerms) {
        	let dwPerms = data.dwPerms;
            if(dwPerms.devUseType==1){
                html2="本人下属设备"
                
            }else if(dwPerms.devUseType==2){
                html2="本人及所在单位设备";
                
            }else if(dwPerms.devUseType==3){
                html2='本人及所在单位及下属单位设备';
               
            }else if(dwPerms.devUseType==4){
                html2='系统内全部设备';
               
            }else if(dwPerms.devUseType==5){
                html2='不限';
               
            }
            if(dwPerms.phoneUseType==1){
                html3='本人下属手机号';
                
            }else if(dwPerms.phoneUseType==2){
                html3='本人及所在单位手机号';
               
            }else if(dwPerms.phoneUseType==3){
                html3='本人及所在单位及下属单位手机号';
                
            }else if(dwPerms.phoneUseType==4){
                html3='系统内全部手机号';
                
            }else if(dwPerms.phoneUseType==5){
                html3='不限';
                
            }
        }else{
            $('.user-info-value-2').html('');
            $('.user-info-value-1').html('');
        }
        /*add by guoshuai end 2018-9-12 content:判断是否有dwPerms*/
        let deptNameValue = ``;
        if (data.deptId != null) {
            for (let i = 0; i < deptTreeCache.length; i++) {
                if (data.deptId == deptTreeCache[i].deptId) {
                    deptNameValue = deptTreeCache[i].name;
                    break;
                }
            }
        }
        let devUseRoleValue = ``;
        if (data.devUseRoleList != null) {
            for (let i = 0; i < data.devUseRoleList.length; i++) {
                devUseRoleValue = devUseRoleValue + `
                    ${data.devUseRoleList[i].roleName}${i == data.devUseRoleList.length - 1 ? '' : '，'}
                `;
            }
        }
        let htmlValue = `
            <div class="user-name-area">
                <div class="user-pic">
                    <img id="user-pic-show" src="img/user_pic_default.png"
                        onerror='this.src="img/user_pic_default.png"' style="width:80px;">
                </div>
                <div class="user-name abbreviation" title="${data.username}">
                    ${data.username}
                </div>
            </div>
            <div class="user_info_detail_modal_div">
                <div class="user_info_detail_modal_div_left">
                    <span class="user_info_detail_modal_div_span_left">真实姓名</span>
                    <span class="user_info_detail_modal_div_span_right">${data.realname}</span>
                </div>
                <div class="user_info_detail_modal_div_right">
                    <span class="user_info_detail_modal_div_span_left">性别</span>
                    <span class="user_info_detail_modal_div_span_right">${data.sex == 0 ? '男' : '女'}</span>
                </div>
            </div>
            <div class="user_info_detail_modal_div">
                <div class="user_info_detail_modal_div_left">
                    <span class="user_info_detail_modal_div_span_left">手机号</span>
                    <span class="user_info_detail_modal_div_span_right">${data.tel = null ? '' : data.tel}</span>
                </div>
                <div class="user_info_detail_modal_div_right">
                    <span class="user_info_detail_modal_div_span_left">登录短信验证</span>
                    <span class="user_info_detail_modal_div_span_right"></span>
                </div>
            </div>
            <div class="user_info_detail_modal_div">
                <div class="user_info_detail_modal_div_left">
                    <span class="user_info_detail_modal_div_span_left">角色</span>
                    <span class="user_info_detail_modal_div_span_right">${roleValue}</span>
                </div>
                <div class="user_info_detail_modal_div_right">
                    <span class="user_info_detail_modal_div_span_left">所属单位</span>
                    <span class="user_info_detail_modal_div_span_right">${deptNameValue}</span>
                </div>
            </div>
            <div class="user_info_detail_modal_div">
                <div class="user_info_detail_modal_div_left">
                    <span class="user_info_detail_modal_div_span_left">上次登录IP</span>
                    <span class="user_info_detail_modal_div_span_right">${data.lastLoginIp == null ? '' : data.lastLoginIp}</span>
                </div>
                <div class="user_info_detail_modal_div_right">
                    <span class="user_info_detail_modal_div_span_left">创建时间</span>
                    <span class="user_info_detail_modal_div_span_right">${data.createTime == null ? '' : new Date(data.createTime).Format('yyyy-MM-dd hh:mm:ss')}</span>
                </div>
            </div>
            <div class="user_info_detail_modal_div_last">
                <div class="user_info_detail_modal_div_last_left">
                    <span class="user_info_detail_modal_div_last_span_left">绑定IP</span>
                    <span class="user_info_detail_modal_div_last_span_right"></span>
                </div>
                <div class="user_info_detail_modal_div_last_right">
                    <div class="user_info_detail_modal_div_right">
                        <span class="user_info_detail_modal_div_span_left">上次登录时间</span>
                        <span class="user_info_detail_modal_div_span_right">${data.lastLoginTime == null ? '' : new Date(data.lastLoginTime).Format('yyyy-MM-dd hh:mm:ss')}</span>
                    </div>
                    <div class="user_info_detail_modal_div_right">
                        <span class="user_info_detail_modal_div_span_left">账号停启用</span>
                        <span class="user_info_detail_modal_div_span_right">${data.locked == 0 ? '<span class="text-green">已启用</span>' : '<span class="text-red">已停用</span>'}</span>
                    </div>
                </div>
            </div>
        `;
        return htmlValue;
    }

    static getUserInputHtml(type, data) {
        /* 重置各面板*/
        $('#dept-selected-area').html('');
        $('#role-selected-area').html('');
        let treeObj = $.fn.zTree.getZTreeObj('dept-selector-tree');
        treeObj.cancelSelectedNode();
        $('.role-checkbox-item').prop('checked', false);
        /* */
        let htmlValue = '';
        let roleListHtml = '';
        if (roleListCache != null) {
            for (let i = 0; i < roleListCache.length; i++) {
                roleListHtml = roleListHtml + `
                    <li><a class="dropdown-menu-selector role-selector" data-role-id="${roleListCache[i].roleId}">${roleListCache[i].roleName}</a></li>
                `;
            }
        }
        //获取头像
        function getHeadPic(url){
            if(url == '' || url == undefined || url == null){
                return "img/user_pic_default.png"
            }else{
                return url;
            }
        }
        switch (type) {
            case 1:
                htmlValue = `
                    <div class="modal-header" style="/*add by gs*/ width:95%;margin-left:20px;/*end*/">
                        <button type="button" class="close" style="color: #dedede" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" class="add-user-close"></span>
                        </button>
                        <h4 class="modal-title h4-add">添加用户</h4>
                    </div>
                    <div class="modal-body" style="margin-left:20px; height:402px;">
                        <!--<div class="user-name-area">
                            <div class="user-pic">
                                <img id="user-pic-show" src="img/user_pic_default.png"
                                    onerror='this.src="img/user_pic_default.png"' style="width:80px;">
                                <div class="outer-cover" data-toggle="modal"
                                    data-target="#change-user-pic-modal">点击添加</div>
                            </div>
                        </div>-->
                        <div class="user_info_modal_input_div" style="margin-top: 50px;">
                            <div class="input-group input-group-sm modal-input" style="float:left;">
                                <span class="input-group-addon modal-input-title"><span class="text-red">*</span>&nbsp;用户名</span>
                                <input type="text" class="form-control modal-input-area modal-input-background input-space-forbidden-user" id="username-input" maxlength="16">
                                <span class="input-check" id="is-have-user" style="position: absolute;"></span>
                            </div>
                            <div class="input-group input-group-sm modal-input" style="float:left;">
                                <span class="input-group-addon modal-input-title"><span class="text-red">*</span>&nbsp;真实姓名</span>
                                <input type="text" class="form-control modal-input-area modal-input-background input-space-forbidden" id="realname-input" maxlength="16">
                                <span class="input-check" id="is-realname-input"></span>
                            </div>
                        </div>
                        <div class="user_info_modal_input_div">
                            <div class="input-group input-group-sm modal-input user-password-input" style="float:left;">
                                <span class="input-group-addon modal-input-title"><span class="text-red">*</span>&nbsp;密码</span>
                                <input type="password" class="form-control modal-input-area modal-input-background password-input input-space-forbidden-password" id="password-input" maxlength="16">
                            </div>
                            <div class="input-group input-group-sm modal-input" style="float:left;">
                                <span class="input-group-addon modal-input-title"><span class="text-red">*</span>&nbsp;角色</span>
                                <div class="role-input-container" id="role-input-container-value" data-role-id="" data-type="add"></div>
                                <span class="input-check" id="is-role-true"></span>
                            </div>
                        </div>
                        <div class="user_info_modal_input_div">
                            <div class="input-group input-group-sm modal-input user-password-input" style="float:left;">
                                <span class="input-group-addon modal-input-title"><span class="text-red">*</span>&nbsp;确认密码</span>
                                <input type="password" class="form-control modal-input-area modal-input-background password-input input-space-forbidden-password" id="repassword-input" maxlength="16">
                                <span class="input-check" id="is-pwd-true"></span>
                            </div>
                            <div class="input-group input-group-sm modal-input" style="float:left;">
                                <span class="input-group-addon modal-input-title"><span class="text-red">*</span>&nbsp;所属机构</span>
                                <div class="dept-input-container" id="dept-input-container-value" data-dept-id="" data-type="add"></div>
                                <span class="input-check" id="is-dept-true"></span>
                            </div>
                        </div>
                        <div class="user_info_modal_input_div">
                            <div class="input-group input-group-sm modal-input" style="float:left;">
                                <span class="input-group-addon modal-input-title"><span class="text-red">*</span>&nbsp;手机号</span>
                                <input type="text" data-type="${type}" class="form-control modal-input-area modal-input-background input-space-forbidden input-num-only" id="tel-input" maxlength="11">
                                <span class="input-check" id="is-tel-true"></span>
                            </div>
                            <div class="input-group input-group-sm modal-input" style="float:left;">
                            <span class="input-group-addon modal-input-title">性别</span>
                            <div class="btn-group">
                                <button type="button" id="sex-button"
                                    style="width: 200px; text-align: left; border: 1px solid #174275; background: #011731 ; color: #fff;"
                                    class="btn btn-default btn-sm dropdown-toggle"
                                    data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    <span id="sex-input">男</span> <span class="caret" style="float: right; margin-top: 6px;"></span>
                                </button>
                                <ul class="dropdown-menu" style="width: 200px; background: #08264a ;">
                                    <li><a class="dropdown-menu-selector gender-selector">男</a></li>
                                    <li><a class="dropdown-menu-selector gender-selector">女</a></li>
                                </ul>
                            </div>
                        </div>
                        </div>
                        <div class="user_info_modal_input_div">
                            <div class="input-group input-group-sm modal-input" style="float:left;">
                                <span class="input-group-addon modal-input-title" style="position: relative;left: -12px;">登录短信验证</span>
                                <div class="user_login_message_verification" data-status="0">
                                    <span class="user_login_message_verification_ball"></span>
                                </div>
                            </div>
                            <div class="input-group input-group-sm modal-input" style="float:left;">
                                <span class="input-group-addon modal-input-title">绑定IP</span>
                                <input type="text" class="form-control modal-input-area modal-input-background input-space-forbidden input-znch-forbidden" id="binding-ip-input" placeholder="多个IP请用“/”隔开">
                                <span class="input-check" id="is-ip-true"></span>
                            </div>
                        </div>
                        <div class="modal-input" id="content-tips" style="margin-top: 15px; display: block;margin-left:10px;">
                            <span style="margin-left: 35px;">
                                注：带 "<span class="text-red">*</span>"为必填项
                            </span>
                        </div>
                    </div>
                    <div class="modal-footer">
                    	<button type="button" class="btn btn-primary" id="user-modal-submit-add">确认添加</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal" id="user-modal-submit-cancel">取消</button>
                    </div>
                `;
                break;
            case 2:
                let deptName;
                if (deptTreeCache != null && data.deptId != null) {
                    for (let i = 0; i < deptTreeCache.length; i++) {
                        if (data.deptId == deptTreeCache[i].deptId) {
                            deptName = deptTreeCache[i].name;
                            break;
                        }
                    }
                }
                /* 设置角色*/
                let roleNameInputHtml = '';
                let roleNamePanelHtml = '';
                $('.role-checkbox-item').prop('checked', false);
                if (roleListCache != null && data.roleList != null) {
                    for (let i = 0; i < data.roleList.length; i++) {
                        for (let j = 0; j < roleListCache.length; j++) {
                            if (data.roleList[i].roleId == roleListCache[j].roleId) {
                                roleNameInputHtml = roleNameInputHtml + `
                                    <div class="each-divinner-item selected-role-items-in-input">
                                        <span class="selected-role-value-in-input" data-role-id="${data.roleList[i].roleId}">${data.roleList[i].roleName}</span>
                                    </div>
                                `;
                                roleNamePanelHtml = roleNamePanelHtml + `
                                    <div class="each-divinner-item selected-role-items-in-panel selected-role-id-${data.roleList[i].roleId}" data-role-id="${data.roleList[i].roleId}" data-role-name="${data.roleList[i].roleName}">
                                        <span class="selected-role-value-in-panel">${data.roleList[i].roleName}</span>
                                        <i class="iconfont icon-x-close item-close selected-role-delete" data-role-id="${data.roleList[i].roleId}"></i>
                                    </div>
                                `;
                                $(`.role-checkbox-item-${data.roleList[i].roleId}`).prop('checked', true);;
                                break;
                            }
                        }
                    }
                }
                $('#role-selected-area').html(roleNamePanelHtml);
                /* 设置设备使用角色*/
                let devUseRoleNameInputHtml = '';
                let devUseRoleNamePanelHtml = '';
                $('.dev-user-role-checkbox-item').prop('checked', false);
                if (devUseRoleListCache != null && data.roleList != null) {
                    for (let i = 0; i < data.devUseRoleList.length; i++) {
                        for (let j = 0; j < devUseRoleListCache.length; j++) {
                            if (data.devUseRoleList[i].roleId == devUseRoleListCache[j].roleId) {
                                devUseRoleNameInputHtml = devUseRoleNameInputHtml + `
                                    <div class="each-divinner-item selected-dev-user-role-items-in-input">
                                        <span class="selected-dev-user-role-value-in-input" data-role-id="${data.devUseRoleList[i].roleId}">${data.devUseRoleList[i].roleName}</span>
                                    </div>
                                `;
                                devUseRoleNamePanelHtml = devUseRoleNamePanelHtml + `
                                    <div class="each-divinner-item selected-dev-user-role-items-in-panel selected-dev-user-role-id-${data.devUseRoleList[i].roleId}" data-role-id="${data.devUseRoleList[i].roleId}" data-role-name="${data.devUseRoleList[i].roleName}">
                                        <span class="selected-dev-user-role-value-in-panel">${data.devUseRoleList[i].roleName}</span>
                                        <i class="iconfont icon-x-close item-close selected-dev-user-role-delete" data-role-id="${data.devUseRoleList[i].roleId}"></i>
                                    </div>
                                `;
                                $(`.dev-user-role-checkbox-item-${data.devUseRoleList[i].roleId}`).prop('checked', true);
                                break;
                            }
                        }
                    }
                }
                $('#dev-user-role-selected-area').html(devUseRoleNamePanelHtml);
                /* HTML*/
                htmlValue = `
                    <div class="modal-header">
                        <button type="button" class="close" style="color: #dedede" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" class="add-user-close"></span>
                        </button>
                        <h4 class="modal-title h4-update">修改用户信息</h4>
                    </div>
                    <div class="modal-body" style="margin-left:20px;height: 402px;">
                        <div class="user-name-area">
                            <div class="user-pic">
                                <img id="user-pic-show" src=${getHeadPic(data.headAddr)}
                                    onerror='this.src=${getHeadPic(data.headAddr)}' style="width:80px;height:80px;border-radius: 50%;">
                            </div>
                            <div class="user-name abbreviation" title="${data.username}">
                                ${data.username}
                            </div>
                        </div>
                        <div class="user_info_modal_input_div">
                            <div class="input-group input-group-sm modal-input" style="float:left;">
                                <span class="input-group-addon modal-input-title"><span class="text-red">*</span>&nbsp;真实姓名</span>
                                <input value="${data.realname}" type="text" class="form-control modal-input-area modal-input-background input-space-forbidden" id="realname-input" maxlength="16">
                                <span class="input-check" id="is-realname-input"></span>
                            </div>
                            <div class="input-group input-group-sm modal-input" style="float:left;">
                                <span class="input-group-addon modal-input-title"><span class="text-red">*</span>&nbsp;角色</span>
                                <div class="role-input-container" id="role-input-container-value" data-role-id="" data-type="update">
                                    ${roleNameInputHtml}
                                </div>
                                <span class="input-check" id="is-role-true"></span>
                            </div>
                        </div>
                        <div class="user_info_modal_input_div">
                            <div class="input-group input-group-sm modal-input user-password-input" style="float:left;">
                                <span class="input-group-addon modal-input-title">新密码</span>
                                <input type="password" class="form-control modal-input-area modal-input-background password-input input-space-forbidden" id="password-input" maxlength="16">
                            </div>
                            <div class="input-group input-group-sm modal-input" style="float:left;">
                                <span class="input-group-addon modal-input-title"><span class="text-red">*</span>&nbsp;所属机构</span>
                                <div class="dept-input-container" id="dept-input-container-value" data-dept-id="${data.deptId == null ? '' : data.deptId}" data-type="update">${deptName == null ? '' : deptName}</div>
                                <span class="input-check" id="is-dept-true"></span>
                            </div>
                        </div>
                        <div class="user_info_modal_input_div">
                            <div class="input-group input-group-sm modal-input user-password-input" style="float:left;">
                                <span class="input-group-addon modal-input-title">确认密码</span>
                                <input type="password" class="form-control modal-input-area modal-input-background password-input input-space-forbidden" id="repassword-input" maxlength="16">
                                <span class="input-check" id="is-pwd-true"></span>
                            </div>
                            <div class="input-group input-group-sm modal-input" style="float:left;">
                                <span class="input-group-addon modal-input-title">性别</span>
                                <div class="btn-group">
                                    <button type="button" id="sex-button"
                                        style="width: 200px; text-align: left; border: 1px solid #174275; background: #011731; color: #fff;"
                                        class="btn btn-default btn-sm dropdown-toggle"
                                        data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">
                                        <span id="sex-input">${data.sex == 0 ? '男' : '女'}</span> <span class="caret" style="float: right; margin-top: 6px;"></span>
                                    </button>
                                    <ul class="dropdown-menu" style="width: 200px; background: #08264a;">
                                        <li><a class="dropdown-menu-selector gender-selector">男</a></li>
                                        <li><a class="dropdown-menu-selector gender-selector">女</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="user_info_modal_input_div">
                            <div class="input-group input-group-sm modal-input" style="float:left;">
                                <span class="input-group-addon modal-input-title"><span class="text-red">*</span>&nbsp;手机号</span>
                                <input value="${data.tel}" type="text" data-type="${type}" data-user-name="${data.username}" class="form-control modal-input-area modal-input-background input-space-forbidden input-num-only" id="tel-input" maxlength="11">
                                <span class="input-check" id="is-tel-true"></span>
                            </div>
                            <div class="input-group input-group-sm modal-input" style="float:left;">
                                <span class="input-group-addon modal-input-title">绑定IP</span>
                                <input type="text" class="form-control modal-input-area modal-input-background input-space-forbidden input-znch-forbidden" id="binding-ip-input" placeholder="多个IP请用“/”隔开">
                                <span class="input-check" id="is-ip-true"></span>
                            </div>
                        </div>
                        <div class="user_info_modal_input_div">
                            <div class="input-group input-group-sm modal-input" style="float:left;">
                                <span class="input-group-addon modal-input-title" style="position: relative;left: -12px;">登录短信验证</span>
                                <div class="user_login_message_verification" data-status="0">
                                    <span class="user_login_message_verification_ball"></span>
                                </div>
                            </div>
                        </div>
                        <div class="modal-input" id="content-tips" style="margin-top: 15px; display: block;margin-left:10px;width:440px;">
                            <span style="margin-left: 35px;">
                                注：带 "<span class="text-red">*</span>"为必填项
                            </span>
                        </div>    
                    </div>
                    <div class="modal-footer">
                    	<button type="button" class="btn btn-primary" id="user-modal-submit-update">确认修改</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal" id="user-modal-cancel-update">取消</button> 
                    </div>
                `;
                break;
            default:
                break;
        }
        return htmlValue;
    }

}