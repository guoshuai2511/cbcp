import { MessageTable } from '../table/MessageTable.js';

let isFirst = true;

export class WebSocketJSONProcessMsg {

    static onOpen() {
        console.log('msg已连接');
        $('#working-case-num').html(0);
        $('.new-message-item-container').html('<div class="new-message-none">暂无消息</div>');
    }

    static onMessage(evt) {
        //console.log(evt.data);
        let resultDataMap = JSON.parse(evt.data);
        //console.log(resultDataMap);

        let topCaseInfos = resultDataMap.topCombatInfos;
        MessageTable.drawTable(topCaseInfos);
    }

    static onError() {
        console.log('连接异常');
    }

    static onClose() {
        console.log('连接关闭');
    }

}