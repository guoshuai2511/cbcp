/**
 * TA数据信息
 */
export class PrasingTaDataInfo {

	static showTaDataInfoList(devTdoaDataInfoList) {
		if(devTdoaDataInfoList && typeof(devTdoaDataInfoList) != undefined && devTdoaDataInfoList != '') {
			let showFlag = false;
			for(let i = 0; i < devTdoaDataInfoList.length; i++) {
				let devCode = devTdoaDataInfoList[i].devCode;
				let reportTime = devTdoaDataInfoList[i].reportTime;
				if(null != devCode && null != reportTime) {
					if(historyTaDataReportTimeArray.length > 0) {
						let flag = false;
						for(let j = 0; j < historyTaDataReportTimeArray.length; j++) {
							if(historyTaDataReportTimeArray[j] == reportTime) {
								flag = true;
								break;
							}
						}
						if(!flag) {
							showFlag = true;
							devTdoaDataInfoLogCatch.push(devTdoaDataInfoList[i]);
							historyTaDataReportTimeArray.push(reportTime);
						}
					}else {
						showFlag = true;
						devTdoaDataInfoLogCatch.push(devTdoaDataInfoList[i]);
						historyTaDataReportTimeArray.push(reportTime);
					}
				}
			}
			if(showFlag) {
				showTaDataLog(devTdoaDataInfoLogCatch);
			}
		}
		/*截取有效的gps信息*/
		function gpsSubstring(val){
			if(val && typeof(val) != undefined && val != ''){
				return val.substring(0, 9)
			}
		}
		function showTaDataLog(devTdoaDataInfoArray) {
			let htmlValue = '';
			for(let i = devTdoaDataInfoArray.length - 1; i >= 0; i--) {
				if(i % 2 == 0) {
					htmlValue = htmlValue +  `
						<div class="ta-info-network-odd" style="height: 34px;background: #f0f0f0;">
							<div class="ta-info-content-header-first" style="border-color: #fff;">
									<span class="ta-info-middle-span" style="width: 40px;border-right: 1px solid #fff;">
										<!--<span style="background: url('img/iconpic/CR-public-network.png') no-repeat;background-size: 100% 100%;
										width: 34px;height: 18px;margin: 8px auto;display: block;"></span>-->
										${NetworkType(devTdoaDataInfoArray[i].btsType)}
									</span>
									<span class="ta-info-middle-span" style="width: 79px;border-right: 1px solid #fff;">${removeNull(devTdoaDataInfoArray[i].freq)}/${removeNull(devTdoaDataInfoArray[i].pci)}</span>
									<span class="ta-info-middle-span CR-ellipsis clipboard" style="width: 159px;border-right: 1px solid #fff;" data-clipboard-text="${devTdoaDataInfoArray[i].btsId}">${removeNull(devTdoaDataInfoArray[i].btsId)}</span>
									<span class="ta-info-middle-span show-bts-gps" style="width: 50px;" data-bts-gps-show-status=0>
										<span style="width: 12px;height: 18px;margin: 8px auto; background: url('img/iconpic/CR-GPS.png') no-repeat;
										background-size: 100% 100%;cursor: pointer;display: block;" title="${devTdoaDataInfoArray[i].btsLat},${devTdoaDataInfoArray[i].btsLng}"></span>
										<span class="bts-gps-span">${gpsSubstring(devTdoaDataInfoArray[i].btsLat)},${gpsSubstring(devTdoaDataInfoArray[i].btsLng)}</span>
									</span>
							</div>
							<div class="ta-info-content-header-secede">
								<span class="ta-info-middle-span" style="width: 30px;border-right: 1px solid #fff;">${devTdoaDataInfoArray[i].tdoa}</span>
								<span class="ta-info-middle-span" style="width: 50px;border-right: 1px solid #fff;font-size: 13px;">${devTdoaDataInfoArray[i].tdoaRadius}</span>
								
								<span class="ta-info-middle-span" style="width: 62px;border-right: 1px solid #fff;">${new Date(devTdoaDataInfoArray[i].eventTime).Format('hh:mm:ss')}</span>
							</div>
							<div class="ta-info-content-header-third">
								<span class="ta-info-middle-span CR-ellipsis" style="width: 146px;border-right: 1px solid #fff;" title="${devTdoaDataInfoArray[i].disCode}">${devTdoaDataInfoArray[i].disCode}</span>
								<span class="ta-info-middle-span show-dev-gps" style="width: 33px;border-right: 1px solid #fff;" data-dev-gps-show-status=0>
									<span style="width: 12px;height: 18px;margin: 8px auto; background: url('img/iconpic/CR-GPS.png') no-repeat;
									background-size: 100% 100%;cursor: pointer;display: block;" title="${devTdoaDataInfoArray[i].lat},${devTdoaDataInfoArray[i].lng}"></span>
									<span class="dev-gps-span">${gpsSubstring(devTdoaDataInfoArray[i].lat)},${gpsSubstring(devTdoaDataInfoArray[i].lng)}</span>
								</span>
							</div>
							<div class="ta-info-content-header-fourth" style="line-height: 34px;">${new Date(devTdoaDataInfoArray[i].reportTime).Format('hh:mm:ss')}</div>
						</div>
					`;
				}else {
					htmlValue = htmlValue +  `
						<div class="ta-info-network-even" style="height: 34px;background: #fff;border-right: 1px solid #f0f0f0;">
							<div class="ta-info-content-header-first" style="border-color: #f0f0f0;border-left: 1px solid #f0f0f0;">
									<span class="ta-info-middle-span" style="width: 39px;border-right: 1px solid #f0f0f0;">
										<!--<span style="background: url('img/iconpic/CR-public-network.png') no-repeat;background-size: 100% 100%;
										width: 34px;height: 18px;margin: 8px auto;display: block;"></span>-->
										${NetworkType(devTdoaDataInfoArray[i].btsType)}
									</span>
									<span class="ta-info-middle-span" style="width: 79px;border-right: 1px solid #fff;">${removeNull(devTdoaDataInfoArray[i].freq)}/${removeNull(devTdoaDataInfoArray[i].pci)}</span>
									<span class="ta-info-middle-span CR-ellipsis clipboard" style="width: 159px;border-right: 1px solid #f0f0f0;" data-clipboard-text="${devTdoaDataInfoArray[i].btsId}">${removeNull(devTdoaDataInfoArray[i].btsId)}</span>
									<span class="ta-info-middle-span show-bts-gps" style="width: 50px;" data-bts-gps-show-status=0>
										<span style="width: 12px;height: 18px;margin: 8px auto; background: url('img/iconpic/CR-GPS.png') no-repeat;
										background-size: 100% 100%;cursor: pointer;display: block;" title="${devTdoaDataInfoArray[i].btsLat},${devTdoaDataInfoArray[i].btsLng}"></span>
										<span class="bts-gps-span">${gpsSubstring(devTdoaDataInfoArray[i].btsLat)},${gpsSubstring(devTdoaDataInfoArray[i].btsLng)}</span>
									</span>
							</div>
							<div class="ta-info-content-header-secede">
								<span class="ta-info-middle-span" style="width: 30px;border-right: 1px solid #f0f0f0;">${devTdoaDataInfoArray[i].tdoa}</span>
								<span class="ta-info-middle-span" style="width: 50px;border-right: 1px solid #f0f0f0;font-size: 13px;">${devTdoaDataInfoArray[i].tdoaRadius}</span>
								
								<span class="ta-info-middle-span" style="width: 62px;border-right: 1px solid #fff;">${new Date(devTdoaDataInfoArray[i].eventTime).Format('hh:mm:ss')}</span>
							</div>
							<div class="ta-info-content-header-third">
								<span class="ta-info-middle-span CR-ellipsis" style="width: 146px;border-right: 1px solid #f0f0f0;" title="${devTdoaDataInfoArray[i].disCode}">${devTdoaDataInfoArray[i].disCode}</span>
								<span class="ta-info-middle-span show-dev-gps" style="width: 33px;border-right: 1px solid #f0f0f0;" data-dev-gps-show-status=0>
									<span style="width: 12px;height: 18px;margin: 8px auto; background: url('img/iconpic/CR-GPS.png') no-repeat;
									background-size: 100% 100%;cursor: pointer;display: block;" title="${devTdoaDataInfoArray[i].lat},${devTdoaDataInfoArray[i].lng}"></span>
									<span class="dev-gps-span">${gpsSubstring(devTdoaDataInfoArray[i].lat)},${gpsSubstring(devTdoaDataInfoArray[i].lng)}</span>
								</span>
							</div>
							<div class="ta-info-content-header-fourth" style="line-height: 34px;">${new Date(devTdoaDataInfoArray[i].reportTime).Format('hh:mm:ss')}</div>
						</div>
					`;
				}
			}
			if(htmlValue != '') {
				$(`.ta-info-table`).html(htmlValue); 
			}
		}

		/*去掉null*/
        function removeNull(val){
            if(val==null||val==undefined||!val||val==''){
                return '--'
            }else{
                return val
            }
		}
		/*判断公网还是主动式*/
		function NetworkType(val){
			if(val==1){
				return `
					<span style="background: url('img/iconpic/CR-public-network.png') no-repeat;background-size: 100% 100%;
					width: 34px;height: 18px;margin: 8px auto;display: block;"></span>
				`;
			}else{
				return `
					<span style="background: url('img/iconpic/CR-active.png') no-repeat;background-size: 100% 100%;
					width: 34px;height: 18px;margin: 8px auto;display: block;"></span>
				`;
			}
		}
	}
}