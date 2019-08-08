export class DrawTable {

    static userTable(result) {
        console.log(result);
        let doOperationTh = '';
        let doOperationCheckBoxTh = ``;
        //if (isAdmin == 1) {
        doOperationTh = '<td class="table-in-todo" style="width:426px;">操作</td>';
        doOperationCheckBoxTh = `
                <td class="am-text-middle table-td-selector">
                    <div class="myCheckBox">
                        <input class="all-checkbox-user" type="checkbox">
                    </div>
                </td>
            `;
        //}
        $('#table-tbody').html(`
            <tr class="tbody-th">
                ${doOperationCheckBoxTh}
                <td>账号</td>
                <td>真实姓名</td>
                <td>性别</td>
                <td>手机号</td>
                <td>创建时间</td>
                <td>最后登录IP</td>
                <td>最后登录时间</td>
                <td>停启用</td>
                <!--<td class="table-in-todo">操作</td>-->
                ${doOperationTh}
            </tr>
        `);
        let htmlValue = ``;
        for (let i = 0; i < result.length; i++) {
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
                    return '<button type="button" class="table-in-btn btn-yellow stop-user">停用</button>';
                } else {
                    return '<button type="button" class="table-in-btn btn-green stop-user">启用</button>';
                }
            }
            function getTime(val) {
                if (val == null) {
                    return '';
                } else {
                    return new Date(val).Format('yyyy-MM-dd hh:mm:ss');
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
            let doOperationCheckBoxTd = ``;
            doOperationCheckBoxTd = `
                    <td class="am-text-middle table-td-selector">
                        <div class="myCheckBox">
                        <!--<input id="mycheckbox" type="checkbox" class="checkbix checkbox-user" data-color="Blue" data-text="" data-id=${result[i].id}>-->
                            <input class="checkbox-user"  type="checkbox" data-id=${result[i].id} >
                        </div>
                    </td>
                `;
            //}
            htmlValue = htmlValue + `
                <tr class="tbody-tr">
                    ${doOperationCheckBoxTd}
                    <td>${result[i].username}</td>
                    <td>${result[i].realname}</td>
                    <td>${getGender(result[i].sex)}</td>
                    <td>${result[i].tel}</td>
                    <td>${getTime(result[i].createTime)}</td>
                    <td>${removeNull(result[i].lastLoginIp)}</td>
                    <td>${getTime(result[i].lastLoginTime)}</td>
                    <td class="user-on-use">${getLocked(result[i].locked)}</td>
                    <td class="table-in-todo">
                        <button type="button" class="table-in-btn btn-green view-user" data-index="${i}">查看</button>
                        <button type="button" class="table-in-btn btn-blue update-user" data-index="${i}">修改</button>
                        ${getLockedBtn(result[i].locked)}
                        <button type="button" class="table-in-btn btn-red delete-user">删除</button>
                        <button type="button" class="table-in-btn btn-green user-dev-manage" data-dept="${result[i].deptId}" data-userId="${result[i].id}">管理下属设备</button>
                    </td>
                </tr>
            `;
            
        }
        $('#table-tbody').append(htmlValue);
    }

}