/**
 * TA绘图信息
 */
import { DrawTaOverlay } from '../overlay/DrawTaOverlay.js';
export class PrasingTaDrawInfo {

	static showTaDrawInfoList(devTdoaDrawInfoList) {
		if(devTdoaDrawInfoList && typeof(devTdoaDrawInfoList) != undefined && devTdoaDrawInfoList != '') {
			for(let i = 0; i < devTdoaDrawInfoList.length; i++) {
				let devCode = devTdoaDrawInfoList[i].devCode;
				let reportTime = devTdoaDrawInfoList[i].reportTime;
				if(null != devCode && null != reportTime) {
					if(historyTaDrawReportTimeArray.length > 0) {
						let flag = false;
						for(let j = 0; j < historyTaDrawReportTimeArray.length; j++) {
							if(historyTaDrawReportTimeArray[j] == reportTime) {
								flag = true;
								break;
							}
						}
						if(!flag) {
							this.showTaDrawInfo(devTdoaDrawInfoList[i]);
							historyTaDrawReportTimeArray.push(reportTime);
						}
					}else {
						this.showTaDrawInfo(devTdoaDrawInfoList[i]);
						historyTaDrawReportTimeArray.push(reportTime);
					}
				
				}
			}
		}
	}
	
	static showTaDrawInfo(devTdoaDrawInfo) {
		if(devTdoaDrawInfo.circles && typeof(devTdoaDrawInfo.circles) != undefined && devTdoaDrawInfo.circles != '') {
			//绘制圆形
			let circleArray = [];
			try {
				circleArray = JSON.parse(devTdoaDrawInfo.circles);
			} catch (e) { console.error(e) }
			if(circleArray.length > 0) {
				DrawTaOverlay.drawTaCircle(circleArray);
			}
		}
		if(devTdoaDrawInfo.points && typeof(devTdoaDrawInfo.points) != undefined && devTdoaDrawInfo.points != '') {
			//绘制点集合
			let pointArray = [];
			try {
				pointArray = JSON.parse(devTdoaDrawInfo.points);
			} catch (e) { console.error(e) }
			if(pointArray.length > 0) {
				DrawTaOverlay.drawTaPoints(pointArray);
			}
		}
		if(devTdoaDrawInfo.polygons && typeof(devTdoaDrawInfo.polygons) != undefined && devTdoaDrawInfo.polygons != '') {
			//绘制多边形
			let polygonArray = [];
			try {
				polygonArray = JSON.parse(devTdoaDrawInfo.polygons);
			} catch (e) { console.error(e) }
			if(polygonArray.length > 0) {
				DrawTaOverlay.drawTaPolygon(polygonArray);
			}
		}

	}
}