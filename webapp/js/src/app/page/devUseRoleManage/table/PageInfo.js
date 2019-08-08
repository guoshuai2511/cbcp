import { RoleOperation } from '../ajax/RoleOperation.js';

import { RoleListTable } from '../table/RoleListTable.js';
import { RoleUser } from '../table/RoleUser.js';

export class PageInfo {

    static drawPageController(result, type) {
        let pageInfo = result.pageInfo;
        let currentPage = pageInfo.pageNum;
        let totalPages = pageInfo.pages;
        let boxClassName;
        switch (type) {
            case 'roleList':
                boxClassName = '.M-box3';
                break;
            case 'userList':
                boxClassName = '.M-box3-user';
                break;
            default:
                break;
        }
        if (totalPages == 1) {
            $(boxClassName).pagination({
                pageCount: totalPages,
                coping: true,
                homePage: '首页',
                endPage: '末页',
                prevContent: '上页',
                nextContent: '下页',
                callback: function (api) { }
            });
        } else {
            $(boxClassName).pagination({
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
                    switch (type) {
                        case 'roleList':
                            if (queryCache.pageNum != page) {
                                queryCache.pageNum = page;
                                RoleOperation.operation(queryCache, 'getDevUseRoleList', 'POST').then((result) => {
                                    resultCache = result.pageInfo.list;
                                    RoleListTable.drawTable(result.pageInfo.list);
                                });
                            }
                            break;
                        case 'userList':
                            if (userQueryCache.pageNum != page) {
                                userQueryCache.pageNum = page;
                                RoleOperation.operation(userQueryCache, 'getUserListByRoleId', 'POST').then((result) => {
                                    RoleUser.draw(result.pageInfo.list);
                                });
                            }
                            break;
                        default:
                            break;
                    }

                }
            });
        }
    }

}