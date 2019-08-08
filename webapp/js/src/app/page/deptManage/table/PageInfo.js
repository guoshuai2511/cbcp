import { deptOperation } from '../ajax/deptOperation.js';

import { DeptUser } from '../table/DeptUser.js';

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
                    if (userQueryCache.pageNum != page) {
                        userQueryCache.pageNum = page;
                        deptOperation.operation(userQueryCache, 'getUserListByDeptId', 'POST').then((result) => {
                            DeptUser.draw(result.pageInfo.list);
                        });
                    }
                }
            });
        }
    }

}