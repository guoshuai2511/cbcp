export class InstitutionTree {

    static drawTree(data) {
        let treeData = InstitutionTree.parsingData(data);
        let setting = {
            check: {
                enable: true,
                chkStyle: "checkbox",
                chkboxType: { "Y": "ps", "N": "ps" }
            },
            view: {
                showIcon: false,
                fontCss: { color: '#dedede', "font-size": "20px" }
            },
            callback: {
                onCheck: function () {
                    let treeObj = $.fn.zTree.getZTreeObj('institutions-tree');
                    let nodes = treeObj.getCheckedNodes(true);
                    InstitutionTree.showSelectedItems(nodes);
                }
            },
        };
        $.fn.zTree.init($('#institutions-tree'), setting, treeData);
    }

    static showSelectedItems(data) {
        // console.log(data);
        let htmlValue = '';
        for (let i = 0; i < data.length; i++) {
            if (data[i].level == 2) {
                htmlValue = htmlValue + `
                    <div class="each-divinner-item">
                        <span class="selected-institutions-value-modal">${data[i].name}</span>
                        <i class="iconfont icon-x-close item-close selected-institutions-item-delete" data-tree-id="${data[i].tId}"></i>
                    </div>
                `;
            }
        }
        $('#selected-institutions-area').html(htmlValue);
    }

    static parsingData(data) {
        let treeData = [
            {
                name: '顶级组织', open: true, children: [
                    {
                        name: '六盘水市公安局', open: true, children: [
                            { name: '经侦支队' },
                            { name: '禁毒支队' },
                            { name: '国保支队' },
                            { name: '行侦支队' },
                            { name: '交警支队' },
                            { name: '治安支队' },
                            // {
                            //     name: '红桥分局', open: false, children: [
                            //         { name: '经侦支队' },
                            //         { name: '禁毒支队' },
                            //         { name: '国保支队' },
                            //         { name: '行侦支队' },
                            //         { name: '交警支队' },
                            //         { name: '治安支队' },
                            //     ]
                            // },
                            // {
                            //     name: '六枝分局', open: false, children: [
                            //         { name: '经侦支队' },
                            //         { name: '禁毒支队' },
                            //         { name: '国保支队' },
                            //         { name: '行侦支队' },
                            //         { name: '交警支队' },
                            //         { name: '治安支队' },
                            //     ]
                            // },
                        ]
                    }
                ]
            }
        ];
        return treeData;
    }

}