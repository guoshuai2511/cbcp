export class deptOperation {

    static operation(data, dataType, method) {
        let url = 'systemManage/deptManage/' + dataType;
        if (data == null) {
            return new Promise((resolve) => {
                $.ajax({
                    url: url,
                    type: method,
                    async: true,
                    contentType: "application/json; charset=utf-8",
                    success: function (result) {
                        resolve(result);
                    },
                    error: function (error) {
                        resolve(error);
                    },
                });
            });
        } else {
            return new Promise((resolve) => {
                $.ajax({
                    url: url,
                    type: method,
                    async: true,
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(data),
                    dataType: 'json',
                    success: function (result) {
                        resolve(result);
                    },
                    error: function (error) {
                        resolve(error);
                    },
                });
            });
        }
    }
}

/*
$.ajax({
    url: 'systemManage/deptManage/addDept',
    type: 'POST',
    async: true,
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({ deptId:1, name: '顶级机构', remark: '武汉剑通信息' }),
    dataType: 'json',
    success: function (result) {
        console.log(result);
    },
});
*/