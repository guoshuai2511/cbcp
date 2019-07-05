import {formatDate} from '../../../lib/timeFormat.js';
export class DrawTable {
    constructor(result) {
        return this.userTable(result);
    }
    userTable(result) {
        console.log(result);
        let doOperationTh = '';
        let doOperationCheckBoxTh = ``;
        doOperationTh = '<td class="table-in-todo" style="width:210px;">操作</td>';
        doOperationCheckBoxTh = `
                <td class="am-text-middle table-td-selector" style="width:40px">
                    <div class="myCheckBox">
                        <input class="all-checkbox-user" type="checkbox">
                    </div>
                </td>
            `;
        //}
        $('#table-tbody').html(`
            <tr class="tbody-th">
                ${doOperationCheckBoxTh}
                <td>头像</td>
                <td>账号</td>
                <td>真实姓名</td>
                <td>性别</td>
                <td>手机号</td>
                <td>创建时间</td>
                <td>最后登录IP</td>
                <td>最后登录时间</td>
                <td>绑定IP</td>
                <td>登录短信验证</td>
                <td>停启用</td>
                ${doOperationTh}
            </tr>
        `);
        //获取用户头像
        function getGender(val) {
            if (val == 0) {
                return '男';
            } else {
                return '女';
            }
        }
        function getLocked(val) {
            if (val == 0) {
                return '<span class="text-green">已启用</span>';
            } else {
                return '<span class="text-red">已停用</span>';
            }
        }
        function getLockedBtn(val) {
            if (val == 0) {
                return '<button type="button" class="table-in-btn btn-red stop-user">停用</button>';
            } else {
                return '<button type="button" class="table-in-btn btn-green stop-user">启用</button>';
            }
        }
        function getTime(val) {
            if (val == null) {
                return '';
            } else {
                return formatDate(new Date(val),'yyyy-MM-dd hh:mm:ss');
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
        //获取头像
        function getHeadPic(url){
            if(url == '' || url == undefined || url == null){
                return '../../../static/img/usermanageicon/user-default-head.png'
            }else{
                return url;
            }
        }
        let htmlValue = ``;
        for (let i = 0; i < result.length; i++) {
            let doOperationCheckBoxTd = ``;
            doOperationCheckBoxTd = `
                <td class="am-text-middle table-td-selector">
                    <div class="myCheckBox">
                        <input class="checkbox-user"  type="checkbox" data-id=${result[i].id} >
                    </div>
                </td>
            `;
            htmlValue = htmlValue + `
                <tr class="tbody-tr">
                    ${doOperationCheckBoxTd}
                    <td style="width:66px;">
                        <div style="width:38px;height:34px; margin-left:14px; margin-top:1px; background:url(${getHeadPic(result[i].headAddr)}) no-repeat;background-size:100% 100%; border-radius:50%;"></div>
                    </td>
                    <td>${result[i].username}</td>
                    <td>${result[i].realname}</td>
                    <td>${getGender(result[i].sex)}</td>
                    <td>${result[i].tel}</td>
                    <td>${getTime(result[i].createTime)}</td>
                    <td>${removeNull(result[i].lastLoginIp)}</td>
                    <td>${getTime(result[i].lastLoginTime)}</td>
                    <td>219.140.140.127</td>
                    <td>已开启</td>
                    <td class="user-on-use">${getLocked(result[i].locked)}</td>
                    <td class="table-in-todo">
                        <button type="button" class="table-in-btn btn-yellow update-user" data-index="${i}">修改</button>
                        ${getLockedBtn(result[i].locked)}
                        <button type="button" class="table-in-btn btn-red delete-user">删除</button>
                        <button type="button" class="table-in-btn btn-blue view-user" data-index="${i}">详情</button>
                        <!--<button type="button" class="table-in-btn btn-green user-dev-manage" data-dept="${result[i].deptId}" data-userId="${result[i].id}">管理下属设备</button>
                        <button type="button" class="table-in-btn btn-blue user-phone-manage" data-dept="${result[i].deptId}" data-userId="${result[i].id}" data-index="${i}">管理下属手机号</button>-->
                    </td>
                </tr>
            `;
            
        }
        $('#table-tbody').append(htmlValue);
    }

}