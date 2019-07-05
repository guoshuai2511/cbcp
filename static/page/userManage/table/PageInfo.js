//import { UserOperation } from '../ajax/UserOperation.js'
import { DrawTable } from '../table/table.js';
import { factroy } from '../../../lib/pagination/pagination.js'
export class PageInfo {
    constructor(result) {
        return this.drawPageController(result);
    }
    drawPageController(result) {
        $(document).ready(function(){
            let pageInfo = result.pageInfo;
            let currentPage = pageInfo.pageNum;
            let totalPages = pageInfo.pages;
            if (totalPages == 1) {
                pagination({
                    pageCount: totalPages,
                    coping: true,
                    homePage: '首页',
                    endPage: '末页',
                    prevContent: '',
                    nextContent: '',
                    callback: function (api) { }
                });
            } else {
                factroy({
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
        })
    }

}