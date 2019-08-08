export class DeptUser {

    static draw(data) {
        let htmlValue = `
            <tr class="tbody-th">
                <td>账号</td>
                <td>真实姓名</td>
                <td>性别</td>
                <td>手机号</td>
                <td>停启用</td>
            </tr>
        `;
        for (let i = 0; i < data.length; i++) {
            htmlValue = htmlValue + `
                <tr class="tbody-tr">
					<td>${data[i].username}</td>
					<td>${data[i].realname}</td>
					<td>${data[i].sex == 0 ? '男' : '女'}</td>
					<td>${data[i].tel}</td>
					<td>${data[i].locked == 0 ? '<span class="text-green">已启用</span>' : '<span class="text-red">已停用</span>'}</td>
				</tr>
            `;
        }
        $('#table-tbody').html(htmlValue);
    }

}