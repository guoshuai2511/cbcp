import { UserOperation } from '../ajax/UserOperation.js'

import { DrawTable } from '../table/DrawTable.js'

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
                /*delete by guoshuai start 2018-9-29
                prevContent: '上页',
                nextContent: '下页',
                delete by guoshuai start 2018-9-29*/
                /*add by guoshuai start 2018-9-29*/
                prevContent: '',
                nextContent: '',
                /*add by guoshuai end 2018-9-29*/
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
                /*delete by guoshuai start 2018-9-29
                prevContent: '上页',
                nextContent: '下页',
                delete by guoshuai start 2018-9-29*/
                /*add by guoshuai start 2018-9-29*/
                prevContent: '',
                nextContent: '',
                /*add by guoshuai end 2018-9-29*/
                callback: function (api) {
                    let page = api.getCurrent();
                    if (userQuery.pageNum != page) {
                        userQuery.pageNum = page;
                        UserOperation.operation(JSON.stringify(userQuery), 'getUserList', 'POST').then((result) => {
                            console.log(result);
                            resultCache = result.pageInfo.list;
                            DrawTable.userTable(result.pageInfo.list);
                        });
                    }
                }
            });
        }
    }

}