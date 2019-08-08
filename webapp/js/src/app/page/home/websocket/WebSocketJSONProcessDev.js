import { ParsingDevInfo } from '../parsing/ParsingDevInfo.js';

let isFirst = true;

export class WebSocketJSONProcessDev {

    static onOpen() {
        console.log('dev已连接');
    }

    static onMessage(evt) {
        // console.log(evt.data);
        let devList = JSON.parse(evt.data);
        //console.log(devList);
        devDistributionListCache = devList;
        switch (devDistributionType) {
            case 1:
                ParsingDevInfo.parsingDevInfo(devList.onlineDevList);
                break;
            case 0:
                ParsingDevInfo.parsingDevInfo(devList.offlineDevList);
                break;
            default:
                break;
        }
        /* 工作中的设备*/
        $('#online-all-dev').html(devList.onlineDevList.length);
        let workingCarNum = 0;
        let workingSingleNum = 0;
        for (let i = 0; i < devList.onlineDevList.length; i++) {
            if (devList.onlineDevList[i].devType == 1) {
                workingCarNum = workingCarNum + 1;
            } else if (devList.onlineDevList[i].devType == 2) {
                workingSingleNum = workingSingleNum + 1;
            }
        }
        /* 工作中的车载*/
        $('#online-all-car').html(workingCarNum);
        /* 工作中的单兵*/
        $('#online-all-single').html(workingSingleNum);
        /* 所有设备*/
        $('#statistics-all-dev').html(devList.onlineDevList.length + devList.offlineDevList.length);
        let offlineCarNum = 0;
        let offlineSingleNum = 0;
        for (let i = 0; i < devList.offlineDevList.length; i++) {
            if (devList.offlineDevList[i].devType == 1) {
                offlineCarNum = offlineCarNum + 1;
            } else if (devList.offlineDevList[i].devType == 2) {
                offlineSingleNum = offlineSingleNum + 1;
            }
        }
        /* 所有车载*/
        $('#statistics-all-car').html(workingCarNum + offlineCarNum);
        /* 所有单兵*/
        $('#statistics-all-single').html(workingSingleNum + offlineSingleNum);

    }

    static onError() {
        console.log('连接异常');
    }

    static onClose() {
        console.log('连接关闭');
    }

}