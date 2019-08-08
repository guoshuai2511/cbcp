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
        if(data.devPerms) {
        	let devPerms = data.devPerms;
            if(devPerms.devUseType==1){
                html2="本人下属设备"
                
            }else if(devPerms.devUseType==2){
                html2="本人及所在单位设备";
                
            }else if(devPerms.devUseType==3){
                html2='本人及所在单位及下属单位设备';
               
            }else if(devPerms.devUseType==4){
                html2='系统内全部设备';
               
            }else if(devPerms.devUseType==5){
                html2='不限';
               
            }
            if(devPerms.phoneUseType==1){
                html3='本人下属手机号';
                
            }else if(devPerms.phoneUseType==2){
                html3='本人及所在单位手机号';
               
            }else if(devPerms.phoneUseType==3){
                html3='本人及所在单位及下属单位手机号';
                
            }else if(devPerms.phoneUseType==4){
                html3='系统内全部手机号';
                
            }else if(devPerms.phoneUseType==5){
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
            <table class="user-info-table">
                <tr>
                    <td class="user-info-name" style="width:220px;">账号</td>
                    <td class="user-info-value">${data.username}</td>
                </tr>
                <tr>
                    <td class="user-info-name">真实姓名</td>
                    <td class="user-info-value">${data.realname}</td>
                </tr>
                <tr>
                    <td class="user-info-name">性别</td>
                    <td class="user-info-value">${data.sex == 0 ? '男' : '女'}</td>
                </tr>
                <tr>
                    <td class="user-info-name">手机号</td>
                    <td class="user-info-value">${data.tel = null ? '' : data.tel}</td>
                </tr>
                <tr>
                    <td class="user-info-name">所属机构</td>
                    <td class="user-info-value">${deptNameValue}</td>
                </tr>
                <tr>
                    <td class="user-info-name">角色</td>
                    <td class="user-info-value">${roleValue}</td>
                </tr>
                <!-- delete by guoshuai start 2018-8-24-->
                <!--<tr>
                    <td class="user-info-name">设备使用角色</td>
                    <td class="user-info-value">${devUseRoleValue}</td>
                </tr>-->
                <!-- delete by guoshuai end 2018-8-24-->
                <!-- add by guoshuai start 2018-8-24-->
                <tr>
                    <td class="user-info-name">设备使用权限</td>
                    <td class="user-info-value-1 user-info-value" data-id=${html2}>${html2}</td>
                </tr>
                <tr class="dev-use-limit">
                    <td class="user-info-name">设备使用权限有效时间</td>
                    <td class="user-info-value-3 user-info-value">
                        <!--<span style="float:left;
                            width: 200px !important;
                            display: block;
                            height: 36px;
                            
                        ">${data.devPerms == null ? '' : removeNull(data.devPerms.devPermsStartTime)}</span>
                        <span style="float:left; width:30px; text-align:center">至</span>
                        <span style="float:left;
                            width: 200px !important;
                            display: block;
                            height: 36px;
                            text-align: center;
                        ">${data.devPerms == null ? '' : removeNull(data.devPerms.devPermsEndTime)}</span>-->
                        ${data.devPerms == null ? '' : removeNull(data.devPerms.devPermsStartTime,data.devPerms.devPermsEndTime)}
                    </td>
                </tr>
                
                
                <!-- add by guoshuai start 2018-8-24-->
                <tr>
                    <td class="user-info-name">创建时间</td>
                    <td class="user-info-value">${data.createTime == null ? '' : new Date(data.createTime).Format('yyyy-MM-dd hh:mm:ss')}</td>
                </tr>
                <tr>
                    <td class="user-info-name">最后登录IP</td>
                    <td class="user-info-value">${data.lastLoginIp == null ? '' : data.lastLoginIp}</td>
                </tr>
                <tr>
                    <td class="user-info-name">最后登录时间</td>
                    <td class="user-info-value">${data.lastLoginTime == null ? '' : new Date(data.lastLoginTime).Format('yyyy-MM-dd hh:mm:ss')}</td>
                </tr>
                <tr>
                    <td class="user-info-name">停启用</td>
                    <td class="user-info-value">${data.locked == 0 ? '<span class="text-green">已启用</span>' : '<span class="text-red">已停用</span>'}</td>
                </tr>
            </table>
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
        switch (type) {
            case 1:
                htmlValue = `
                    <div class="modal-header" style="/*add by gs*/ width:95%;margin-left:20px;/*end*/">
                        <button type="button" class="close" style="color: #dedede" data-dismiss="modal" aria-label="Close">
                            <!--delete by guoshuai start 2018-10-15
                            <span aria-hidden="true">×</span>
                            delete by guoshuai end 2018-10-15-->
                            <!--delete by guoshuai start 2018-10-15-->
                            <span aria-hidden="true" class="add-user-close"></span>
                            <!--delete by guoshuai end 2018-10-15-->
                        </button>
                        <h4 class="modal-title h4-add">添加用户</h4>
                    </div>
                    <div class="modal-body" style="margin-left:160px">
                        <div class="input-group input-group-sm modal-input">
                            <span class="input-group-addon modal-input-title"><span class="text-red">*</span>&nbsp;账号</span>
                            <input type="text" class="form-control modal-input-area modal-input-background input-space-forbidden-user" id="username-input" maxlength="16" autocompleted="off">
                            <span class="input-check" id="is-have-user" style="width: 400px;position: absolute;"></span>
                        </div>
                        <div class="input-group input-group-sm modal-input user-password-input">
                            <span class="input-group-addon modal-input-title"><span class="text-red">*</span>&nbsp;密码</span>
                            <input type="password" class="form-control modal-input-area modal-input-background password-input input-space-forbidden-password" id="password-input" maxlength="16" autocomplete="new-password">
                        </div>
                        <div class="input-group input-group-sm modal-input user-password-input">
                            <span class="input-group-addon modal-input-title"><span class="text-red">*</span>&nbsp;确认密码</span>
                            <input type="password" class="form-control modal-input-area modal-input-background password-input input-space-forbidden-password" id="repassword-input" maxlength="16">
                            <span class="input-check" id="is-pwd-true"></span>
                        </div>
                        <div class="input-group input-group-sm modal-input">
                            <span class="input-group-addon modal-input-title"><span class="text-red">*</span>&nbsp;真实姓名</span>
                            <input type="text" class="form-control modal-input-area modal-input-background input-space-forbidden" id="realname-input" maxlength="16">
                            <span class="input-check" id="is-realname-input"></span>
                        </div>
                        <div class="input-group input-group-sm modal-input">
                            <span class="input-group-addon modal-input-title"><span class="text-red">*</span>&nbsp;手机号</span>
                            <input type="text" data-type="${type}" class="form-control modal-input-area modal-input-background input-space-forbidden input-num-only" id="tel-input" maxlength="11">
                            <span class="input-check" id="is-tel-true"></span>
                        </div>
                        <div class="input-group input-group-sm modal-input">
                            <span class="input-group-addon modal-input-title"><span class="text-red">*</span>&nbsp;所属机构</span>
                            <div class="dept-input-container" id="dept-input-container-value" data-dept-id="" data-type="add"></div>
                            <span class="input-check" id="is-dept-true"></span>
                        </div>
                        <div class="input-group input-group-sm modal-input">
                            <span class="input-group-addon modal-input-title"><span class="text-red">*</span>&nbsp;角色</span>
                            <div class="role-input-container" id="role-input-container-value" data-role-id="" data-type="add"></div>
                            <span class="input-check" id="is-role-true"></span>
                        </div>
                        <!-- delete by guoshuai start 2018-8-24-->
                        <!--<div class="input-group input-group-sm modal-input">
                            <span class="input-group-addon modal-input-title">设备使用角色</span>
                            <div class="role-input-container" id="dev-user-role-input-container-value" data-type="add"></div>
                            <span class="input-check" id="is-dev-user-role-true"></span>
                        </div>-->
                        <!-- delete by guoshuai end 2018-8-24-->
                        <!-- add by guoshuai start 2018-8-24-->
                        <div class="input-group input-group-sm modal-input">
                            <span class="input-group-addon modal-input-title">设备使用权限</span>
                            <div class="btn-group" id="devUseType-box" data-type="add">
                                <button type="button" id="dev-button"
                                style="width: 200px; text-align: left; border: 1px solid #174275; background: #011731; color: #fff;height:30px;"
                                class="btn btn-default btn-sm dropdown-toggle"
                                data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                                <span id="devUseType"style="
                                        text-overflow: ellipsis;
                                        overflow: hidden;
                                        width: 165px !important;
                                        display: block;
                                        float: left;
                                    ">本人下属设备</span> <span class="caret" style="float: right; margin-top: 6px;"></span>
                                </button>
                                <ul class="dropdown-menu" style="width: 200px; background: rgb(40, 40, 40) ;background: #08264a ;" id="devUseTypeSelect">
                                    <li><a class="dropdown-menu-selector dev-selector" data-dev-id="">本人下属设备</a></li>
                                    <li><a class="dropdown-menu-selector dev-selector" data-dev-id="">本人及所在单位设备</a></li>
                                    <li><a class="dropdown-menu-selector dev-selector" style="text-overflow: ellipsis; overflow:hidden;"  title="本人及所在单位及下属单位设备" data-dev-id="">本人及所在单位及下属单位设备</a></li>
                                    <li><a class="dropdown-menu-selector dev-selector" data-dev-id="">系统内全部设备</a></li>
                                    <li><a class="dropdown-menu-selector dev-selector" data-dev-id="">不限</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="input-group input-group-sm modal-input" style="display:none;width:630px;" id="set-devPermsStartTime">
                            <span class="input-group-addon modal-input-title"style="position:relative;left:-20px;">设备使用权限有效时间</span>
                            <input type="text" id="query-time-start-timeTwo" style="float: left;width: 200px !important;background: #011731 ;position:relative;left:-20px;"
                                    class="form-control input-background input-data-picker-md devPermsStartTime"
                                    >
                            <span style="width:20px;height:30px;float:left;line-height:30px;text-align:center;color:#fff;position:relative;left:-20px;">至</span> 
                            <input type="text" id="query-time-start-timeThree" style="float: left; width: 200px !important;background: #011731 ;position:relative;left:-20px;"
									class="form-control input-background input-data-picker-md devPermsEndTime"
									>   
                        </div>
                        <div class="input-group input-group-sm modal-input" style="display:none;margin-top:-20px;" id="ch-sec-beyond-title">
                            <span class="input-check" id="is-sec-chtime-true" style="
                                        position: ;
                                        width: 300px;
                                        top: 50px;
                                        left: 200px;
                                        margin-left:132px;
                                        "></span>
                        </div>
                        <!--<div class="input-group input-group-sm modal-input" style="display:none" id="set-devPermsEndTime">
                            <span class="input-group-addon modal-input-title">有效期开始结束</span>
                            
                        </div>-->
                        
                        
                        <div class="input-group input-group-sm modal-input" style="display:none;margin-top:-20px;" id="chp-sec-beyond-title">
                            <span class="input-check" id="is-sec-chptime-true" style="
                                        position: ;
                                        width: 300px;
                                        top: 50px;
                                        left: 200px;
                                        margin-left:132px;
                                        "></span>
                        </div>
                        <!--<div class="input-group input-group-sm modal-input" style="display:none" id="set-phonePermsEndTime">
                            <span class="input-group-addon modal-input-title">有效期开始结束</span>
                            <input type="text" id="query-time-end-time" style="float: left;width: 200px !important;background: #011731;"
									class="form-control input-background input-data-picker-md phonePermsEndTime"
									onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})">
                            
                        </div>-->
                        <!-- add by guoshuai end 2018-8-24-->
                        <div class="input-group input-group-sm modal-input">
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
                        <div class="modal-input" id="content-tips" style="margin-top: 15px; display: block;margin-left:-160px;">
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
                            <!--delete by guoshuai start 2018-10-15
                            <span aria-hidden="true">×</span>
                            delete by guoshuai end 2018-10-15-->
                            <!--delete by guoshuai start 2018-10-15-->
                            <span aria-hidden="true" class="add-user-close"></span>
                            <!--delete by guoshuai end 2018-10-15-->
                        </button>
                        <h4 class="modal-title h4-update">修改用户信息</h4>
                    </div>
                    <div class="modal-body" style="margin-left:160px;">
                        <div class="input-group input-group-sm modal-input">
                            <span class="input-group-addon modal-input-title">账号</span>
                            <input value="${data.username}" type="text" class="form-control modal-input-area modal-input-background" id="username-input" disabled="disabled" maxlength="16">
                            <span class="input-check" id="is-have-user"></span>
                        </div>
                        <div class="input-group input-group-sm modal-input user-password-input">
                            <span class="input-group-addon modal-input-title">新密码</span>
                            <input type="password" class="form-control modal-input-area modal-input-background password-input input-space-forbidden" id="password-input" maxlength="16" autocomplete="new-password">
                        </div>
                        <div class="input-group input-group-sm modal-input user-password-input">
                            <span class="input-group-addon modal-input-title">确认密码</span>
                            <input type="password" class="form-control modal-input-area modal-input-background password-input input-space-forbidden" id="repassword-input" maxlength="16">
                            <span class="input-check" id="is-pwd-true"></span>
                        </div>
                        <div class="input-group input-group-sm modal-input">
                            <span class="input-group-addon modal-input-title"><span class="text-red">*</span>&nbsp;真实姓名</span>
                            <input value="${data.realname}" type="text" class="form-control modal-input-area modal-input-background input-space-forbidden" id="realname-input" maxlength="16">
                            <span class="input-check" id="is-realname-input"></span>
                        </div>
                        <div class="input-group input-group-sm modal-input">
                            <span class="input-group-addon modal-input-title"><span class="text-red">*</span>&nbsp;手机号</span>
                            <input value="${data.tel}" type="text" data-type="${type}" data-user-name="${data.username}" class="form-control modal-input-area modal-input-background input-space-forbidden input-num-only" id="tel-input" maxlength="11">
                            <span class="input-check" id="is-tel-true"></span>
                        </div>
                        <div class="input-group input-group-sm modal-input">
                            <span class="input-group-addon modal-input-title"><span class="text-red">*</span>&nbsp;所属机构</span>
                            <div class="dept-input-container" id="dept-input-container-value" data-dept-id="${data.deptId == null ? '' : data.deptId}" data-type="update">${deptName == null ? '' : deptName}</div>
                            <span class="input-check" id="is-dept-true"></span>
                        </div>
                        <div class="input-group input-group-sm modal-input">
                            <span class="input-group-addon modal-input-title"><span class="text-red">*</span>&nbsp;角色</span>
                            <div class="role-input-container" id="role-input-container-value" data-role-id="" data-type="update">
                                ${roleNameInputHtml}
                            </div>
                            <span class="input-check" id="is-role-true"></span>
                        </div>
                        <!-- delete by guoshuai start 2018-8-24-->
                        <!--<div class="input-group input-group-sm modal-input">
                            <span class="input-group-addon modal-input-title">设备使用角色</span>
                            <div class="role-input-container" id="dev-user-role-input-container-value" data-type="update">
                                ${devUseRoleNameInputHtml}
                            </div>
                            <span class="input-check" id="is-dev-user-role-true"></span>
                        </div>-->
                        <!-- add by guoshuai end 2018-8-24-->
                        <div class="input-group input-group-sm modal-input">
                            <span class="input-group-addon modal-input-title">设备使用权限</span>
                            <div class="btn-group" id="devUseType-box" data-type="update">
                                <button type="button" id="dev-button"
                                style="width: 200px; text-align: left; border: 1px solid #174275; background: #011731; color: #fff;height:30px;"
                                class="btn btn-default btn-sm dropdown-toggle"
                                data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                                
                                <span id="devUseType"style="
                                    text-overflow: ellipsis;
                                    overflow: hidden;
                                    width: 165px !important;
                                    display: block;
                                    float: left;
                                ">本人下属设备</span> <span class="caret" style="float: right; margin-top: 6px;"></span>
                                </button>
                                <ul class="dropdown-menu" style="width: 200px; background: #08264a;" id="devUseTypeSelect">
                                    <li><a class="dropdown-menu-selector dev-selector">本人下属设备</a></li>
                                    <li><a class="dropdown-menu-selector dev-selector">本人及所在单位设备</a></li>
                                    <li><a class="dropdown-menu-selector dev-selector" style="text-overflow: ellipsis; overflow:hidden;"  title="本人及所在单位及下属单位设备">本人及所在单位及下属单位设备</a></li>
                                    <li><a class="dropdown-menu-selector dev-selector">系统内全部设备</a></li>
                                    <li><a class="dropdown-menu-selector dev-selector">不限</a></li>
                                </ul>
                            </div>
                            
                        </div>
                        <div class="input-group input-group-sm modal-input" style="display:none;width:630px;" id="set-devPermsStartTime">
                            <span class="input-group-addon modal-input-title" style="position: relative;left:-20px;">设备使用权限有效时间</span>
                            <input type="text" id="query-time-start-timeEig" style="float: left;width: 200px !important;background: #011731;position: relative;left:-20px;"
                                    class="form-control input-background input-data-picker-md devPermsStartTime"
                                    >
                            <span style="width:20px;height:30px;float:left;line-height:30px;text-align:center;color:#fff;position:relative;left:-20px;">至</span> 
                            <input type="text" id="query-time-end-timeEig" style="float: left; width: 200px !important;background: #011731;position:relative;left:-20px;"
									class="form-control input-background input-data-picker-md devPermsEndTime"
									>   
                        </div>
                        <div class="input-group input-group-sm modal-input" style="display:none;margin-top:-20px;" id="ch-beyond-title">
                            <span class="input-check" id="is-chtime-true" style="
                                        position: ;
                                        width: 300px;
                                        top: 50px;
                                        left: 200px;
                                        margin-left:132px;
                                        "></span>
                        </div>
                        
                        <div class="input-group input-group-sm modal-input" style="display:none;margin-top:-20px;" id="chp-beyond-title">
                            <span class="input-check" id="is-chptime-true" style="
                                        position: ;
                                        width: 300px;
                                        top: 50px;
                                        left: 200px;
                                        margin-left:132px;
                                        "></span>
                        </div>
                        <!-- add by guoshuai end 2018-8-24-->
                        <div class="input-group input-group-sm modal-input">
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