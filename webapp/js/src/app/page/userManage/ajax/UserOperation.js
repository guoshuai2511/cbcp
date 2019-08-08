export class UserOperation {

    static operation(data, dataType, method) {
        let url = 'systemManage/userManage/' + dataType;
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
                    data: data,
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