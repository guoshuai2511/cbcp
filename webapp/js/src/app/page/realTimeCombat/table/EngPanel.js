export class EngPanel {

    static showCarEng(devCode, energy, reportTime) {
        if (energy[0] == 1 && energy[1] == 1 && energy[2] == 1 && energy[3] == 1) {
            /* 四向能量为1的时候，绘制右部能量面板显示能量信息*/
            for (let i = 0; i < 4; i++) {
                /**edti by gaochao start */
                $(`#eng-value-car-${i}-${devCode}`).html(`<span style="color: #666666;font-size:14px">1</span>`);
                /**edit by gaochao end */
            }
            $(`#eng-hit-time-car-${devCode}`).html(`${new Date(reportTime).Format('hh:mm:ss')}`); // 能量命中时间
        } else {
            let maxEngVal = energy[0]; // 设定一个默认初始值
            let maxEngIndex = 0;
            /* 获取最大值*/
            for (let i = 0; i < 4; i++) {
                if (maxEngVal < energy[i]) {
                    maxEngVal = energy[i];
                    maxEngIndex = i;
                }
            }
            /* 最大值可能有多个，存储数组索引*/
            let maxEngArr = [];
            for (let i = 0; i < 4; i++) {
                if (maxEngVal == energy[i]) {
                    maxEngArr.push(i);
                }
            }
            for (let i = 0; i < 4; i++) {
                /**edti by gaochao start */
                let rightInfoPanelColor = ' style="color: #666666;font-size:14px"';
                /**edit by gaochao end */
                for (let j = 0; j < maxEngArr.length; j++) {
                    if (i == maxEngArr[j]) {
                        /**edti by gaochao start */
                        rightInfoPanelColor = ' style="color: #E82020;font-size:18px"';
                        /**edit by gaochao end */
                        break;
                    }
                }
                /* 绘制右部能量面板显示能量信息*/
                $(`#eng-value-car-${i}-${devCode}`).html(`<span${rightInfoPanelColor}>${energy[i]}</span>`);
            }
            $(`#eng-hit-time-car-${devCode}`).html(`${new Date(reportTime).Format('hh:mm:ss')}`); // 能量命中时间
        }
    }

    static showSingleEng(devCode, energy, reportTime) {
        /**edti by gaochao start */
        $(`#eng-value-single-${devCode}`).html(`<span style="color: #E82020">${energy}</span>`);
        /**edit by gaochao end */
        $(`#eng-hit-time-single-${devCode}`).html(`${new Date(reportTime).Format('hh:mm:ss')}`);
    }

}