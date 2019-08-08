/**
 * 目标手机号所在基站LTE信息(Catch)
 */
export class PrasingLteCatchInfo {

	static showLteCatchInfo(lteCatchInfo) {
		/**Catch面板显示信息*/
		/**del by gaochao start*/
		// $(`.target-lte-info-container`).css('display', 'block');
		/**del by gaochao end */
		$(`.target-lte-info-time`).html(`${new Date(lteCatchInfo.reportTime).Format('hh:mm:ss')}`);
		/**edti by gaochao start */
		let btsId = `${lteCatchInfo.mcc}-${mncChange(lteCatchInfo.mnc)}-${lteCatchInfo.tac}-${lteCatchInfo.eci}`;
		let lteInfoHtml = `
			<div class="target-lte-info-content-base clipboard" data-clipboard-text="${btsId}">${btsId}</div>
			<div class="target-lte-info-content-rssi">${lteCatchInfo.rssi}</div>
			`;
		/**edit by gaochao end */
		$(`.target-lte-system-info-content`).html(lteInfoHtml);
		let cellsHtml = '';
		let cellsList = JSON.parse(lteCatchInfo.cells);
		/*判别显示rsrp和rsrq的颜色*/
		function backgroundColor(val) {
			if (val >= -60) {
				return '#25AA00'
			} else if (val >= -80 && val < -60) {
				return '#2296D8'
			} else if (val >= -100 && val < -80) {
				return '#DC7827'
			} else if (val < -100) {
				return '#F63232'
			} else if (val == '' || !val || val == null || val == undefined) {
				return '#fff'
			}
		}
		function mncChange(val) {
			let result = val;
			if (!!val && val.length == 2) {
				if (val.substr(0, 1) == 0) {
					result = val.substr(1, 1);
				}
			}
			return result;
		}
		/*根据rsrp和rsrq的值决定颜色柱的宽度*/
		function backgroundWidth(val) {
			if (val >= -60) {
				return '100%'
			} else if (val >= -80 && val < -60) {
				return '75%'
			} else if (val >= -100 && val < -80) {
				return '50%'
			} else if (val < -100) {
				return '25%'
			} else if (val == '' || !val || val == null || val == undefined) {
				return '100%'
			}
		}
		/*是否为主动式基站*/
		function isActive(earfcn, pci, type) {
			let result = "";
			if (btsActiveCache != undefined && btsActiveCache != null) {
				for (let i = 0; i < btsActiveCache.length; i++) {
					if (btsActiveCache[i].status == 2 && btsActiveCache[i].freq == earfcn && btsActiveCache[i].pci == pci) {
						if (type == 1) {
							result = `
						<span style="background: url('img/iconpic/CR-active.png') no-repeat;background-size: 100% 100%;
						width: 34px;height: 18px;margin: 8px auto;display: block;"></span>
						`;
						} else {
							result = "color:#F63232;font-weight:1000;";
						}
						break;
					}
				}
			}
			return result;
		}

		for (let i = 0; i < cellsList.length; i++) {
			if (i % 2 == 0) {
				/**edti by gaochao start */
				cellsHtml = cellsHtml + `
						<div class="target-lte-info-content-odd">
							<div class="target-lte-info-content-active">${isActive(cellsList[i].earfcn, cellsList[i].pci, 1)}</div>
							<div class="target-lte-info-content-name">${cellsList[i].name}</div>
							<div class="target-lte-info-content-pci" style="${isActive(cellsList[i].earfcn, cellsList[i].pci, 2)}">${cellsList[i].earfcn}/${cellsList[i].pci}</div>
							<div class="target-lte-info-content-rsrp" style="border-color:${backgroundColor(cellsList[i].rsrp)}">
								<div class="target-lte-info-content-rsrp-color" style="background-color:${backgroundColor(cellsList[i].rsrp)};"></div>
								<div class="target-lte-info-content-rsrp-content">${cellsList[i].rsrp}</div>
							</div>
							<div class="target-lte-info-content-rsrq" style="border-color:${backgroundColor(cellsList[i].rsrq)}">
								<div class="target-lte-info-content-rsrq-color" style="background-color:${backgroundColor(cellsList[i].rsrq)};"></div>
								<div class="target-lte-info-content-rsrq-content">${cellsList[i].rsrq}</div>
							</div>
							<div class="target-lte-info-content-ta">${cellsList[i].ta}</div>
						</div>`;
			} else {
				cellsHtml = cellsHtml + `
						<div class="target-lte-info-content-even">
						<div class="target-lte-info-content-active">${isActive(cellsList[i].earfcn, cellsList[i].pci, 1)}</div>
						<div class="target-lte-info-content-name">${cellsList[i].name}</div>
							<div class="target-lte-info-content-pci" style="${isActive(cellsList[i].earfcn, cellsList[i].pci, 2)}">${cellsList[i].earfcn}/${cellsList[i].pci}</div>
							<div class="target-lte-info-content-rsrp" style="border-color:${backgroundColor(cellsList[i].rsrp)}">
								<div class="target-lte-info-content-rsrp-color" style="background-color:${backgroundColor(cellsList[i].rsrp)}"></div>
								<div class="target-lte-info-content-rsrp-content">${cellsList[i].rsrp}</div>
							</div>
							<div class="target-lte-info-content-rsrq" style="border-color:${backgroundColor(cellsList[i].rsrq)}">
								<div class="target-lte-info-content-rsrq-color" style="background-color:${backgroundColor(cellsList[i].rsrq)}"></div>
								<div class="target-lte-info-content-rsrq-content">${cellsList[i].rsrq}</div>
							</div>
							<div class="target-lte-info-content-ta">${cellsList[i].ta}</div>
						</div> `;
			}
			/**edit by gaochao end */
		}
		$(`.target-lte-info-content-container`).html(cellsHtml);

	}
}