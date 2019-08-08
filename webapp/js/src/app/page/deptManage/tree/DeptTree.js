import { DeptInfo } from '../table/DeptInfo.js';

export class DeptTree {

    static drawTree(data) {
        let treeData = DeptTree.parsingData(data);
        let pageAreaSetting = {
            view: {
                showIcon: false,
                fontCss: { color: '#dedede', "font-size": "20px" }
            },
            callback: {
                onClick: function (event, treeId, treeNode) {
                    for (let i = 0; i < resultCache.length; i++) {
                        if (resultCache[i].deptId == treeNode.deptId) {
                            isDeptNameTrueType = 2;
                            currentSelectedDept = resultCache[i];
                            $('#dept-content-title').html(`${resultCache[i].name}&nbsp;&nbsp;基本信息`);
                            DeptInfo.draw(resultCache, resultCache[i], 'update');
                            break;
                        }
                    }
                }
            },
        };
        let panelAreaSetting = {
            view: {
                showIcon: false,
                fontCss: { color: '#dedede', "font-size": "20px" }
            },
            callback: {
                onClick: function (event, treeId, treeNode) {
                    let temp = treeNode;
                    let parentNodes = [];
                    while (true) {
                        if (temp != null) {
                            parentNodes.push(temp);
                            temp = temp.getParentNode();
                        } else {
                            break;
                        }
                    }
                    let htmlValue = `
                        <div class="each-divinner-item">
                            <span class="selected-institutions-value-modal" id="selected-institutions-value" data-dept-id="${treeNode.deptId}">${treeNode.name}</span>
                            <i class="iconfont icon-x-close item-close selected-dept-modal-item-delete"></i>
                        </div>
                    `;
                    $('#dept-selected-area').html(htmlValue);
                    // console.log(parentNodes);
                }
            },
        };
        $.fn.zTree.init($('#dept-show-area'), pageAreaSetting, treeData);
        $.fn.zTree.init($('#dept-selector-tree'), panelAreaSetting, treeData);
    }

    static parsingData(data) {
        let treeData = [];
        function getTreeEval(layer) {
            let defaultValue = 'treeData';
            for (let i = 1; i < layer; i++) {
                defaultValue = `${defaultValue}[${defaultValue}.length - 1].children`;
            }
            return (defaultValue);
        }
        for (let i = 0; i < data.length; i++) {
            if (data[i].name != '') {
                eval(`
                    if (${getTreeEval(data[i].layer)} == null) {
                        ${getTreeEval(data[i].layer)} = [];
                    }
                    ${getTreeEval(data[i].layer)}.push({ name: data[i].name, open: true, deptId: data[i].deptId });
                `);
            }
        }
        /*
        if (data[i].layer == 1) {
            treeData.push({ name: data[i].name, open: true, deptId: data[i].deptId });
        }
        if (data[i].layer == 2) {
            if (treeData[treeData.length - 1].children == null) {
                treeData[treeData.length - 1].children = [];
            }
            treeData[treeData.length - 1].children.push({ name: data[i].name, open: true, deptId: data[i].deptId });
        }
        if (data[i].layer == 3) {
            if (treeData[treeData.length - 1].children[treeData[treeData.length - 1].children.length - 1].children == null) {
                treeData[treeData.length - 1].children[treeData[treeData.length - 1].children.length - 1].children = [];
            }
            treeData[treeData.length - 1].children[treeData[treeData.length - 1].children.length - 1].children.push({ name: data[i].name, open: true, deptId: data[i].deptId });
        }
        */
        return treeData;
    }

}