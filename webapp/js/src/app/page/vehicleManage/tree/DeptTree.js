export class DeptTree {

    static drawTree(data) {
        let treeData = DeptTree.parsingData(data);
        let modalSetting = {
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
                }
            },
        };
        $.fn.zTree.init($('#dept-selector-tree'), modalSetting, treeData);
        let selectorSetting = {
            view: {
                showIcon: false,
                fontCss: { color: '#000', "font-size": "15px" }
            },
            callback: {
                onClick: function (event, treeId, treeNode) {
                    $('#dept-query-selector-input').html(treeNode.name);
                    $('#dept-query-selector-input').attr('data-dept-id', treeNode.deptId);
                    $('#dept-query-selector-remove').css('display', 'block');
                    console.log(treeNode.deptId);
                }
            },
        };
        $.fn.zTree.init($('#dept-query-selector-tree'), selectorSetting, treeData);
    }

    static parsingData(data) {
    	let layerIndex = data[0].layer;
        let treeData = [];
        function getTreeEval(layer) {
            let defaultValue = 'treeData';
            for (let i = layerIndex; i < layer; i++) {
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
        return treeData;
    }

}