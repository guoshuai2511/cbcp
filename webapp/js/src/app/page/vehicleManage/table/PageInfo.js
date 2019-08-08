import { VehicleOperation } from '../ajax/VehicleOperation.js'

import { DrawTable } from '../table/DrawTable'

export class PageInfo {

    static drawPageController(result) {
        let pageInfo = result.pageInfo;
        let currentPage = pageInfo.pageNum;
        let totalPages = pageInfo.pages;
        if (totalPages == 1) {
            $('.M-box3').pagination({
                pageCount: totalPages,
                coping: true,
                homePage: '首页',
                endPage: '末页',
                prevContent: '',
                nextContent: '',
                callback: function (api) { }
            });
        } else {
            $('.M-box3').pagination({
                pageCount: totalPages,
                current: currentPage,
                mode: 'fixed',
                count: 8,
                jump: true,
                coping: true,
                homePage: '首页',
                endPage: '末页',
                prevContent: '',
                nextContent: '',
                callback: function (api) {
                    let page = api.getCurrent();
                    if (devQuery.pageNum != page) {
                        devQuery.pageNum = page;
                        DevOperation.operation(JSON.stringify(devQuery), 'getDevList', 'POST').then((result) => {
                            resultCache = result.pageInfo.list;
                            DrawTable.devTable(result.pageInfo.list);
                            $(".checkbox-all").prop('checked',false);
                        });
                    }
                }
            });
        }
    }

}