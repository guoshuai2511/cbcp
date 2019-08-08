export class BtsValue {

    static btsNameIcon(mnc) {
        let value;
        switch (mnc) {
            case '0':
                value = 'Chinamobile';
                break;
            case '00':
                value = 'Chinamobile';
                break;
            case '1':
                value = 'Chinauni';
                break;
            case '01':
                value = 'Chinauni';
                break;
            case '3':
                value = 'Chinatelecom';
                break;
            case '03':
                value = 'Chinatelecom';
                break;
            case '2':
                value = 'Chinamobile';
                break;
            case '02':
                value = 'Chinamobile';
                break;
            case '5':
                value = 'Chinatelecom';
                break;
            case '05':
                value = 'Chinatelecom';
                break;
            case '6':
                value = 'Chinauni';
                break;
            case '06':
                value = 'Chinauni';
                break;
            case '7':
                value = 'Chinamobile';
                break;
            case '07':
                value = 'Chinamobile';
                break;
            case '11':
                value = 'Chinatelecom';
                break;
            case '17':
                value = 'Chinatelecom';
                break;
            case '20':
                value = 'Chinamobile';
                break;
            case '32':
                value = 'Chinamobile';
                break;
            default:
                value = 'null';
                break;
        }
        return value;
    }

    static btsName(mnc) {
        let value;
        switch (mnc) {
            case '0':
                value = '中国移动';
                break;
            case '00':
                value = '中国移动';
                break;
            case '1':
                value = '中国联通';
                break;
            case '01':
                value = '中国联通';
                break;
            case '3':
                value = '中国电信';
                break;
            case '03':
                value = '中国电信';
                break;
            case '2':
                value = '中国移动';
                break;
            case '02':
                value = '中国移动';
                break;
            case '5':
                value = '中国电信';
                break;
            case '05':
                value = '中国电信';
                break;
            case '6':
                value = '中国联通';
                break;
            case '06':
                value = '中国联通';
                break;
            case '7':
                value = '中国移动';
                break;
            case '07':
                value = '中国移动';
                break;
            case '11':
                value = '中国电信';
                break;
            case '17':
                value = '中国电信';
                break;
            case '20':
                value = '中国移动';
                break;
            case '32':
                value = '中国移动';
                break;
            default:
                value = 'null';
                break;
        }
        return value;
    }

    static btsTag(mode, mcc, mnc, lacTac, sid, nid, bid, cellId) {
        if (mode == 'cdma') {
            return `${mcc}-${mnc}-${sid}-${nid}-${bid}`;
            // return mcc + '-' + mnc + '-' + sid + '-' + nid + '-' + bid;
        } else {
            return `${mcc}-${mnc}-${lacTac}-${cellId}`;
            // return mcc + '-' + mnc + '-' + lacTac + '-' + cellId;
        }
    }

}