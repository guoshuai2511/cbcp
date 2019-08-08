/**
 * 主动式详细信息、历史能量信息
 */
export class PrasingDevActiveDetailInfo {

	//主动式详细面板信息展示
	static showDevActiveDetailInfo(devActiveDetailInfo) {
		/**add by gaochao start */
		let ChannelStatusArray = ["未连接", "关闭态", "开启态", "切换中", "开启中", "关闭中"];
		/**add by gaochao end*/
		//devActiveDetailInfo为主动式详细信息JSON对象，取channels字段转JSON对象
		let channels = devActiveDetailInfo.channels;
		let reportTime = devActiveDetailInfo.reportTime;
		let mode = devActiveDetailInfo.mode;
		$(`#active-mode`).html(getModeHtml(mode));
		if (channels && typeof (channels) != undefined && channels != '') {
			let channelArray = [];
			try {
				channelArray = JSON.parse(channels);
				btsActiveCache = channelArray;
				if (channelArray && channelArray.length > 0) {
					$(`#active-info-time`).html(new Date(reportTime).Format('hh:mm:ss'));
					let htmlValue = '';
					for (let i = 0; i < channelArray.length; i++) {
						/**edti by gaochao start */
						if (removeNull(channelArray[i].isHit) == 1) {
							htmlValue = htmlValue + `
							<tr style="background: #FFE4E4">
							<td>
									<div class="active-suggest" style="font-weight: bold;color:${removeNull(channelArray[i].isSuggest) == 1 ? '#17c1f4' : '#000'}">${removeNull(channelArray[i].suggestFreq)}</div>
							</td>
							<td>
									<div class="active-band" style ="font-weight: bold">${removeNull(channelArray[i].band)}</div>
							</td>
							<td>
									<div class="active-pci" style="color: #F63232;font-weight: bold">${removeNull(channelArray[i].freq)}/${removeNull(channelArray[i].pci)}</div>
							</td>
							<td>
									<div class="active-power" style="font-weight: bold">${removeNull(channelArray[i].power)}</div>
							</td>
							<td>
									<div class="active-status" style="font-size:14px;font-weight: bold;${isActive(channelArray[i].status, 3)}">${ChannelStatusArray[statusRemoveNull(channelArray[i].status)] == undefined ? "--" : ChannelStatusArray[statusRemoveNull(channelArray[i].status)]}</div>
							</td>
							</tr>
							`;
						} else {
							htmlValue = htmlValue + `
								<tr>
								<td>
										<div class="active-suggest" style="color:${removeNull(channelArray[i].isSuggest) == 1 ? '#2A8CFF' : '#000'}">${removeNull(channelArray[i].suggestFreq)}</div>
								</td>
								<td>
										<div class="active-band">${removeNull(channelArray[i].band)}</div>
								</td>
								<td>
										<div class="active-pci">${removeNull(channelArray[i].freq)}/${removeNull(channelArray[i].pci)}</div>
								</td>
								<td>
										<div class="active-power">${removeNull(channelArray[i].power)}</div>
								</td>
								<td>
										<div class="active-status" style="font-size:14px;${isActive(channelArray[i].status, 3)}">${ChannelStatusArray[statusRemoveNull(channelArray[i].status)] == undefined ? "--" : ChannelStatusArray[statusRemoveNull(channelArray[i].status)]}</div>
								</td>
								</tr>
								`;
						}

					}
					/**edit by gaochao end */
					if (htmlValue != '') {
						$(`#active-info-content-infoArea`).html(htmlValue);
					}
				}
			} catch (e) { console.error(e) }
		}
		function removeNull(val) {
			if (val && typeof (val) != undefined && val != '') {
				return val;
			} else {
				return '--';
			}
		}
		/**add by gaochao start */
		function statusRemoveNull(val) {
			if (typeof (val) != undefined && val != '' && !isNaN(val)) {
				return val;
			} else {
				return '--';
			}
		}
		/**add by gaochao end*/
		function getModeHtml(val) {
			//不是undefined、null和空字符串中的一种
			if (!!val) {
				if (val == 1) {
					return '(自动模式)';
				} else if (val == 2) {
					return '(手动模式)';
				} else if (val == 3) {
					return '(被授时自动模式)';
				} else {
					return '';
				}
			} else {
				return '';
			}
		}

		function isActive(data, type) {
			if (data == 2) {
				if (type == 1) {
					return "color: #F63232"
				} else if (type == 3) {
					return "color: #52B272"
				} else if (type == 4) {
					return "background: #FFE4E4"
				} else {
					return ""
				}
			} else {
				return "";
			}
		}
	}

	//主动式能量历史面板信息展示
	static showDevActiveEngLogInfo(devActiveDetailInfo) {
		//devActiveDetailInfo为主动式详细信息JSON对象,取eng值
		let eng = devActiveDetailInfo.eng;
		let reportTime = devActiveDetailInfo.reportTime;
		let freq = devActiveDetailInfo.engFreq;
		let pci = devActiveDetailInfo.engPci;
		/**add by gaochao start */
		// $('.activedev-info-value').css("display","block");
		// $('.activedev-info-time').css("display","block");
		// $('.activedev-info-btn').css("display","block");
		/**add by gaochao end */
		if (eng && typeof (eng) != undefined && eng != '' && lastDevActiveEngInfoReportTime != reportTime) {
			let engInfo = new EngInfo();
			engInfo.eng = eng;
			engInfo.freq = freq;
			engInfo.pci = pci;
			engInfo.reportTime = reportTime;
			devActiveEngInfoLogCatch.push(engInfo);
			lastDevActiveEngInfoReportTime = reportTime;
			/**add by gaochao start */
			$('.activedev-info-value').html(eng);
			$('.activedev-info-time').html(`(${new Date(reportTime).Format('hh:mm:ss')})`);
			/**add by gaochao end */
			showEngLog(devActiveEngInfoLogCatch);
		}

		function showEngLog(engInfoArray) {
			let htmlValue = '';
			for (let i = engInfoArray.length - 1; i >= 0; i--) {
				if (i % 2 == 0) {
					/**edti by gaochao start */
					htmlValue = htmlValue + `
						<div class="activeEnergy-eng-content-odd">
							<div class="activeEnergy-eng-span">${engInfoArray[i].eng}</div>
							<div class="activeEnergy-pci-span">${engInfoArray[i].freq}/${engInfoArray[i].pci}</div>
							<div class="activeEnergy-time-span">${new Date(engInfoArray[i].reportTime).Format('hh:mm:ss')}</div>
						</div>`;
				} else {
					htmlValue = htmlValue + `
						<div class="activeEnergy-eng-content-even">
							<div class="activeEnergy-eng-span">${engInfoArray[i].eng}</div>
							<div class="activeEnergy-pci-span">${engInfoArray[i].freq}/${engInfoArray[i].pci}</div>
							<div class="activeEnergy-time-span">${new Date(engInfoArray[i].reportTime).Format('hh:mm:ss')}</div>
						</div> `;
				}
				/**edit by gaochao end */
			}
			$('.history-energy').html(htmlValue);
		}
	}

}