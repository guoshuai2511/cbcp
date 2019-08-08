export class RoleSelectorPanel {

    static draw(data) {
        let htmlValue = '';
        let selectorValue = '';
        for (let i = 0; i < data.length; i++) {
            /* 模态框内容*/
            htmlValue = htmlValue + `
                <div class="role-selector-each-items">
                    <label class="mdui-checkbox">
                        <input type="checkbox" data-role-id="${data[i].roleId}" data-role-name="${data[i].roleName}" class="role-checkbox-item role-checkbox-item-${data[i].roleId}"/>
                        <i class="mdui-checkbox-icon"></i>
                        <span class="role-selector-each-items-words" style="margin-left:25px;">${data[i].roleName}</span>
                    </label>
                </div>
            `;
            /* 页面搜索下拉框内容*/
            selectorValue = selectorValue + `
                <li><a class="role-selector-item" data-role-id="${data[i].roleId}">${data[i].roleName}</a></li>
            `;
        }
        $('#role-selector-panel').html(htmlValue);
        $('#role-selector-container').html(selectorValue);
    }

}