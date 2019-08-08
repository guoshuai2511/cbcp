import { GPSToBaiduPoint } from '../../../common/baiduMap/GPSToBaiduPoint.BaiduMap.js';
import { DrawDevCover } from '../overlay/DrawDevCover.js';

export class ParsingDevInfo {

    static parsingDevInfo(devBaseInfo) {
        /* 需要重绘制的设备数组*/
        let devBaseInfoRefresh = [];
        /* 将接收到的信息通过key-value存储*/
        for (let i = 0, len = devBaseInfo.length; i < len; i++) {
            if (devInfoMap.get(devBaseInfo[i].devCode) != null) {
                /* 如果map集合中的key含该设备编号，则保存其‘设备详细信息面板是否开启’的信息，若不包含，则设置默认值false */
                devBaseInfo[i].isInfoPanelOpen = devInfoMap.get(devBaseInfo[i].devCode).isInfoPanelOpen;
                /* 上一次的GPS坐标*/
                devBaseInfo[i].lastGpsInfo = devInfoMap.get(devBaseInfo[i].devCode).lastGpsInfo;
                /* 上一次的工作状态*/
                devBaseInfo[i].lastStatus = devInfoMap.get(devBaseInfo[i].devCode).lastStatus;
                //console.log(devBaseInfo[i].lastGpsInfo.lng);
                //console.log(devBaseInfo[i].lastGpsInfo.lng == devBaseInfo[i].gpsInfo.lng && devBaseInfo[i].lastGpsInfo.lat == devBaseInfo[i].gpsInfo.lat && devBaseInfo[i].lastStatus == devBaseInfo[i].status);
                if (devBaseInfo[i].lastGpsInfo.lng == devBaseInfo[i].gpsInfo.lng && devBaseInfo[i].lastGpsInfo.lat == devBaseInfo[i].gpsInfo.lat && devBaseInfo[i].lastStatus == devBaseInfo[i].status) {
                    devBaseInfo[i].shouldRefresh = false;
                } else {
                    devBaseInfo[i].shouldRefresh = true;
                    devBaseInfoRefresh.push(devBaseInfo[i]);
                }
            } else {
                devBaseInfo[i].isInfoPanelOpen = false;
                devBaseInfo[i].lastGpsInfo = { lng: '0', lat: '0' }; 
                devBaseInfo[i].lastStatus = 1;
                devBaseInfo[i].shouldRefresh = true;
                devBaseInfoRefresh.push(devBaseInfo[i]);
            }
            devInfoMap.set(devBaseInfo[i].devCode, devBaseInfo[i]);
        }
        this.getDevBaiduPoint(devBaseInfoRefresh);
    }

    /* GPS坐标转百度坐标 */
    static getDevBaiduPoint(devBaseInfo) {
        let pointArray = [];
        for (let i = 0, len = devBaseInfo.length; i < len; i++) {
            let point = [devBaseInfo[i].gpsInfo.lng, devBaseInfo[i].gpsInfo.lat];
            pointArray.push(point);
        }

        /* 分割pointArray */
        let splitPointArray = [];
        let eachPointGroup = [];
        let index = 0;
        for (let i = 0, len = pointArray.length; i < len; i++) {
            eachPointGroup.push(pointArray[i]);
            index = index + 1;
            if (eachPointGroup.length == 100) {
                splitPointArray.push(eachPointGroup);
                eachPointGroup = [];
                index = 0;
            }
            if (i == pointArray.length - 1) {
                splitPointArray.push(eachPointGroup);
            }
        }
        for (let i = 0; i < splitPointArray.length; i++) {
            GPSToBaiduPoint.getBaiduPointLocationPromise(splitPointArray[i]).then((result) => {
                let drawArr = [];
                for (let j = 0; j < result.length; j++) {
                    devBaseInfo[j + i * 100].baiduGpsInfo = { lng: result[j].lng, lat: result[j].lat };
                    drawArr.push(devBaseInfo[j + i * 100]);
                }
                this.drawDev(drawArr);
            });
        }
    }

    /*在map中存储设备信息，并执行绘制方法*/
    static drawDev(devBaseInfo) {
        let drawMap = new Map();
        for (let i = 0, len = devBaseInfo.length; i < len; i++) {
            devInfoMap.set(devBaseInfo[i].devCode, devBaseInfo[i]);
            drawMap.set(devBaseInfo[i].devCode, devBaseInfo[i]);
        }
        DrawDevCover.drawDev(drawMap);
    }

}