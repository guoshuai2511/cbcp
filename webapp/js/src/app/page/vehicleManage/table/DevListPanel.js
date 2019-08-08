export class DevListPanel {

    static drawAll(data) {
        console.log(data);
        //设备被其它车辆关联，置灰
        function setGray(data, i){
            if(data.plateNum != null){
                return `
                    <div class="dev_item dev_select-${data.disCode}" data-devId="${data.devId}" data-disCode="${data.disCode}">   
                        <span class="select-user-block select-user-block-unactive select-user-block-${data.disCode}"></span>
                        <span class="data-display">${data.disCode}(${data.plateNum})</span>
                    </div> 
                `;   
            }else{
                return `
                    <div class="dev_item dev_select dev_select-${data.disCode}" data-devId="${data.devId}" data-disCode="${data.disCode}" data-status=0>   
                        <span class="select-user-block select-user-block-${data.disCode}"></span>
                        <span class="data-display">${data.disCode}</span>
                    </div> 
                `;
            }
        }

        let searchHtml=``;
        for (let i = 0; i < data.length; i++) {
            searchHtml = searchHtml + ` 
                    ${setGray(data[i], i)}                       
            `;
        }
        $('#dev-table-tbody').html(searchHtml);
    }

    static drawUser(data) {
        console.log(data);
        
        let htmlValue2='';
        for(let i=0;i<data.length;i++){
            htmlValue2 = htmlValue2 + `
                <div class="dev_item dev_item-${data[i].disCode}" data-devId="${data[i].devId}" data-disCode="${data[i].disCode}">   
                    <span class="data-display data-display-delete" data-status=0>${data[i].disCode}</span>
                    <span class="delete_dev" data-ensuer="${data[i].disCode}"></span>
                </div> 
            `;
        }
        $('#dev-selected-area').append(htmlValue2);
    }
}
