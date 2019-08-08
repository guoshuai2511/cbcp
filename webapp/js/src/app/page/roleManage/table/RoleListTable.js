export class RoleListTable {

    static drawTable(data) {
        let htmlValue = `
            <tr class="tbody-th">
                <td style="width: 200px;">名称</td>
                <td>描述</td>
                <td style="width: 100px;">人员数</td>
                <td style="width: 130px;">操作</td>
            </tr>
        `;
        for (let i = 0; i < data.length; i++) {
            htmlValue = htmlValue + `
                <tr class="tbody-tr">
                    <td style="width: 200px;">${data[i].roleName}</td>
                    <td>${data[i].remark}</td>
                    <td style="width: 100px;">${data[i].userNum}</td>
                    <td class="table-in-todo" style="width: 170px;">
                        <button type="button" class="table-in-btn btn-green view-user" data-role-index="${i}">查看</button>
                        <button type="button" class="table-in-btn btn-blue update-user" data-role-index="${i}">修改</button>
                        <button type="button" class="table-in-btn btn-red delete-user" data-role-id="${data[i].roleId}">删除</button>
                    </td>
                </tr>
            `;
        }
        $('#table-tbody').html(htmlValue);
    }

}