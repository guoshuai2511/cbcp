export class ControlAuthorityTree {

    static drawTree(data) {
        let treeData = ControlAuthorityTree.parsingData(data);
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
                beforeCheck: function (treeId, treeNode) {
                    if (checkForbidden) {
                        return false;
                    }
                }
                // onCheck: function () {
                //     let treeObj = $.fn.zTree.getZTreeObj('control-authority-tree');
                //     let nodes = treeObj.getCheckedNodes(true);
                //     //console.log(nodes);
                // }
            },
        };
        $.fn.zTree.init($('#control-authority-tree'), setting, treeData);
    }

    static parsingData(data) {

        let setChildren = function (tree, data) {
            if (data.childMenu != null && data.childMenu.length > 0) {
                if (tree.children == null) {
                    tree.children = [];
                }
                for (let i = 0; i < data.childMenu.length; i++) {
                    tree.children.push({ name: data.childMenu[i].name, menuId: data.childMenu[i].menuId, open: true });
                }
            }
            return tree;
        }

        let dataStr = JSON.stringify(data);
        dataStr = dataStr.replace(/childMenu/g, 'open": true, "children');
        dataStr = dataStr.replace(/url/g, 'urlDisableClick');
        let treeData = [
            { name: '全部', open: true, children: JSON.parse(dataStr) }
        ];

        // for (let i = 0; i < data.length; i++) {
        //     treeData[0].children.push(setChildren(treeData[0].children, data[i]));
        // }
        // for (let i = 0; i < data.length; i++) {
        //     treeData[0].children.push(setChildren(treeData[0].children, data[i]));
        //     /*
        //     treeData[0].children.push({ name: data[i].name, menuId: data[i].menuId, open: true });
        //     if (data[i].childMenu != null) {
        //         for (let j = 0; j < data[i].childMenu.length; j++) {
        //             if (treeData[0].children[i].children == null) {
        //                 treeData[0].children[i].children = [];
        //             }
        //             treeData[0].children[i].children.push({ name: data[i].childMenu[j].name, menuId: data[i].childMenu[j].menuId, open: false });
        //         }
        //     }
        //     */
        // }

        return treeData;

    }

}