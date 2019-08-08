import { RoleOperation } from '../ajax/RoleOperation.js';

export class DevList {

    static draw(data) {

        let htmlValue = `
            <tr class="tbody-th">
                <td style="width: 32px;">
                    <label class="mdui-checkbox table-in-checkbox">
                    <input class="checkbox-all" type="checkbox" />
                    <i class="mdui-checkbox-icon"></i>
                </label></td>
                <td>设备编号</td>
                <td>所属机构</td>
            </tr>
        `;
        for (let i = 0; i < data.length; i++) {
            htmlValue = htmlValue + `
                <tr class="tbody-tr">
                    <td style="width: 32px;">
                        <label class="mdui-checkbox table-in-checkbox">
                        <input class="checkbox-item checkbox-item-${data[i].devCode}"
                            data-devcode="${data[i].devCode}" type="checkbox" ${selectedDevsCache.has(data[i].devCode) ? 'checked' : ''}/>
                        <i class="mdui-checkbox-icon"></i>
                    </label></td>
                    <td>${data[i].devCode}</td>
                    <td>${data[i].deptName}</td>
                </tr>
            `;
        }
        $('#table-tbody-dev-list').html(htmlValue);

        let isAllChecked = true;
        for (let i = 0; i < $('.checkbox-item').length; i++) {
            if (!$($('.checkbox-item')[i]).is(':checked')) {
                isAllChecked = false;
                break;
            }
        }
        if (isAllChecked) {
            $('.checkbox-all').prop('checked', true);
        }

    }

    static pageInfo(result) {
        let pageInfo = result.pageInfo;
        let currentPage = pageInfo.pageNum;
        let totalPages = pageInfo.pages;
        if (totalPages == 1) {
            $('.M-box3-dev-list').pagination({
                pageCount: totalPages,
                coping: true,
                homePage: '首页',
                endPage: '末页',
                prevContent: '上页',
                nextContent: '下页',
                callback: function (api) { }
            });
        } else {
            $('.M-box3-dev-list').pagination({
                pageCount: totalPages,
                current: currentPage,
                mode: 'fixed',
                count: 8,
                jump: true,
                coping: true,
                homePage: '首页',
                endPage: '末页',
                prevContent: '上页',
                nextContent: '下页',
                callback: function (api) {
                    let page = api.getCurrent();
                    if (devQueryCache.pageNum != page) {
                        devQueryCache.pageNum = page;
                        RoleOperation.operation(devQueryCache, 'getDevList', 'POST').then((result) => {
                            DevList.draw(result.pageInfo.list);
                        });
                    }
                }
            });
        }
    }

}