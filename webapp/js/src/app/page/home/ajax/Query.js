export class Query {

    static query(data, url, type) {
        if (data == null) {
            return new Promise((resolve) => {
                $.ajax({
                    url: url,
                    type: type,
                    async: true,
                    contentType: "application/json; charset=utf-8",
                }).then((result) => {
                    resolve(result);
                });
            });
        } else {
            return new Promise((resolve) => {
                $.ajax({
                    url: url,
                    type: type,
                    async: true,
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(data),
                    dataType: 'json'
                }).then((result) => {
                    resolve(result);
                });
            });
        }
    }

}