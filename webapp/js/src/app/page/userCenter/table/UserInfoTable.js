export class UserInfoTable {

    static drawTable(data) {
        let roleName = '';
        for (let i = 0; i < data.roleList.length; i++) {
            roleName = roleName + data.roleList[i].roleName + ';';
        }
        if (roleName != '') {
            roleName = roleName.substring(0, roleName.length - 1);
        }
        let htmlValue = `
            <tr>
                <td class="table-title">版本号</td>
                <td class="table-value">V 2.1.13</td>
            </tr>
            <tr>
                <td class="table-title">用户名</td>
                <td class="table-value">${data.username}</td>
            </tr>
            <tr>
                <td class="table-title">真实姓名</td>
                <td class="table-value">${data.realname}</td>
            </tr>
            <tr>
                <td class="table-title">手机号</td>
                <td class="table-value">${data.tel == null ? '' : data.tel}</td>
            </tr>
            <tr>
                <td class="table-title">上次登录IP</td>
                <td class="table-value">${data.lastLoginIp == null ? '' : data.lastLoginIp}</td>
            </tr>
            <tr>
                <td class="table-title">上次登录时间</td>
                <td class="table-value">${data.lastLoginTime == null ? '' : new Date(data.lastLoginTime).Format('yyyy-MM-dd hh:mm:ss')}</td>
            </tr>
            <tr>
                <td class="table-title">角色</td>
                <td class="table-value">${roleName}</td>
            </tr>
        `;
        $('.user-info-table').html(htmlValue);
        /* 设置用户头像*/
        if (data.headAddr != null) {
            $('#user-pic-show').attr('src', `${data.headAddr}`);
        } else {
            $('#user-pic-show').attr('src', 'img/user_pic_default.png');
        }
    }

}