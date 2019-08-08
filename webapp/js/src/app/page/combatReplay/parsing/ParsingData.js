import { BtsValue } from '../../realTimeCombat/bts/BtsValue.js';

export class ParsingData {

    static FormatDevData(data) {
        let devInfo = { createTime: null, devCode: null, devType: null, engInfo: null, gpsInfo: null, status: null };
        let engInfo = { eng: null, type: null, freqInfo: null, btsId: null, syncMode: null, syncType: null, srcDevCode: null, lastReportTime: null };
        let gpsInfo = { lng: null, lat: null, time: null, northAngle: null, speed: null, elevation: null, accuracy: null, type: null, separateFlag: null };
        gpsInfo.lng = data.lng;
        gpsInfo.lat = data.lat;
        gpsInfo.time = data.gpsTime;
        gpsInfo.northAngle = data.northAngle;
        gpsInfo.speed = data.speed;
        gpsInfo.elevation = data.elevation;
        gpsInfo.accuracy = data.accuracy;
        gpsInfo.type = data.gpsType;
        gpsInfo.separateFlag = data.separateFlag;
        /**edit by gaochao start */
        if (data.eng == null || data.eng == "") {
            /**edit by gaochao end */
            engInfo = null;
        } else {
            engInfo.eng = data.eng;
            engInfo.type = data.engType;
            engInfo.freqInfo = data.freqInfo;
            engInfo.btsId = data.btsId;
            engInfo.syncMode = data.syncMode;
            engInfo.syncType = data.syncType;
            engInfo.srcDevCode = data.srcDevCode;
            engInfo.isShow = data.isShow;
            // engInfo.lastReportTime = data.lastReportTime;
        }
        devInfo.createTime = data.createTime;
        devInfo.devCode = data.devCode;
        devInfo.devType = data.devType;
        devInfo.engInfo = engInfo;
        devInfo.gpsInfo = gpsInfo;
        devInfo.dlBtsId = data.dlBtsId;
        devInfo.activeEnable = data.activeEnable;
        devInfo.activeHit = data.activeHit;
        devInfo.activeSupport = data.activeSupport;
        devInfo.reportTime = data.reportTime;
        devInfo.status = 1;
        return devInfo;
    }

    static FormatBtsData(data) {
        let btsInfo = { btsId: null, mcc: null, mnc: null, mode: null, lacTac: null, cellId: null, sid: null, nid: null, bid: null, lng: null, lat: null, radius: null,credibility: null, time: null, reportTime: null, createTime: null };
        btsInfo.btsId = BtsValue.btsTag(data.mode, data.mcc, data.mnc, data.lacTac, data.sid, data.nid, data.bid, data.cellId);
        btsInfo.mcc = data.mcc;
        btsInfo.mnc = data.mnc;
        btsInfo.mode = data.mode;
        btsInfo.lacTac = data.lacTac;
        btsInfo.cellId = data.cellId;
        btsInfo.sid = data.sid;
        btsInfo.nid = data.nid;
        btsInfo.bid = data.bid;
        btsInfo.lng = data.lng;
        btsInfo.lat = data.lat;
        btsInfo.radius = data.radius;
        btsInfo.credibility = data.credibility;
        btsInfo.reportTime = data.reportTime;
        btsInfo.createTime = data.createTime;
        btsInfo.hitTimes = 0;
        btsInfo.dlHitTimes = 0;
        return btsInfo;
    }

    static FormatStatusData(data) {
        /**edit by gaochao start */
        let statusInfo = { devCode: null, upGainValue: null, triggerInfo: null, cellAnalysisInfoList: [], reportTime: null, createTime: null, energy: null, temperature: null};
        /**edit by gaochao end */
        statusInfo.devCode = data.devCode;
        statusInfo.upGainValue = data.upGainValue;
        statusInfo.triggerInfo = data.triggerInfo;
        statusInfo.cellAnalysisInfoList = JSON.parse(data.cellAnalysisInfo);
        statusInfo.reportTime = data.reportTime;
        statusInfo.createTime = data.createTime;
        /**add by gaochao start */
        statusInfo.energy = data.energy;
        statusInfo.temperature = data.temperature;
        /**add by gaochao end */
        return statusInfo;
    }
    static RepetitionColor(data){
        
    }

}