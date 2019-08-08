export class ManagerListPanel {

    static drawManager(data) {
        let html = '';
        for(let i = 0; i < data.length; i++){
            html = html +`
                <li class="manager-selector dr_selector" managerId="${data[i].id}" data-name="${data[i].username}">${data[i].username}(${data[i].realname})</li>
            `
        }
        $('#managerList').html(html);
    }

    static drawDriver(data) {
        let htmlValue = '';
        for(let i = 0; i < data.length; i++){
            htmlValue = htmlValue +`
                <li class="dr_selector driver-selector" managerId="${data[i].id}" data-name="${data[i].username}">${data[i].username}(${data[i].realname})</li>
            `
        }
        $('#driverList').html(htmlValue);
    }
}
