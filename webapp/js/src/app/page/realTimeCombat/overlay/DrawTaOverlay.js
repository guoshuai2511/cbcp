export class DrawTaOverlay {

    /* TA 绘圆形、椭圆形 */
    static drawTaCircle(taCircleArray) {
		let colors = ["#ff0000","#ff0000","#ff9400","#ffd900","#6eff00","#00a9ff","#0062ff","#a100ff","#000000"];
		let prodCircles = [];
		let debugCircles = [];
		for(let i = 0; i < taCircleArray.length; i++) {
			if(taCircleArray[i].drawType == 1) {
				prodCircles.push(taCircleArray[i]);
			}else {
				debugCircles.push(taCircleArray[i]);
			}
		}
		if(prodCircles.length > 0) {
			/* 移除上次绘图信息 */
			if(taCircleProdOverlayCache.length > 0) {
				for(let i = 0; i < taCircleProdOverlayCache.length; i++) {
					map.removeOverlay(taCircleProdOverlayCache[i]);
				}
			}
			for(let i = 0; i < prodCircles.length; i++) {
				let option = {
					strokeColor: colors[prodCircles[i].strokeColor],    //边线颜色。
					strokeOpacity: prodCircles[i].strokeOpacity,     //边线透明度，取值范围0 - 1
					strokeStyle: prodCircles[i].strokeStyle == 1 ? 'solid' : 'dashed', //边线的样式，solid或dashed。
					strokeWeight:prodCircles[i].strokeWeight,		//边线宽度1~无穷大
					fillColor: prodCircles[i].fillFlag == 0 ? 'none' : colors[prodCircles[i].fillColor],   //填充颜色
					fillOpacity: prodCircles[i].fillOpacity,     //填充区透明度，取值范围0 - 1
				}
				let overlay = getEllipseOverlay(new BMap.Point(prodCircles[i].lng, prodCircles[i].lat), prodCircles[i].majorAxis, prodCircles[i].shortAxis, prodCircles[i].rotate, prodCircles[i].stroke, option);
				map.addOverlay(overlay);
				if(isTaDrawProdOpen) {
					overlay.show();
				}else {
					overlay.hide();
				}
				taCircleProdOverlayCache.push(overlay);
			}
		}
		if(debugCircles.length > 0) {
			/* 移除上次绘图信息 */
			if(taCircleDebugOverlayCache.length > 0) {
				for(let i = 0; i < taCircleDebugOverlayCache.length; i++) {
					map.removeOverlay(taCircleDebugOverlayCache[i]);
				}
			}
			for(let i = 0; i < debugCircles.length; i++) {
                let option = {
                    strokeColor: colors[debugCircles[i].strokeColor],    //边线颜色。
                    strokeOpacity: debugCircles[i].strokeOpacity,     //边线透明度，取值范围0 - 1
                    strokeStyle: debugCircles[i].strokeStyle == 1 ? 'solid' : 'dashed', //边线的样式，solid或dashed。
                    strokeWeight:debugCircles[i].strokeWeight,		//边线宽度1~无穷大
                    fillColor: debugCircles[i].fillFlag == 0 ? 'none' : colors[debugCircles[i].fillColor],   //填充颜色
                    fillOpacity: debugCircles[i].fillOpacity,     //填充区透明度，取值范围0 - 1
                }
                let overlay = getEllipseOverlay(new BMap.Point(debugCircles[i].lng, debugCircles[i].lat), debugCircles[i].majorAxis, debugCircles[i].shortAxis, debugCircles[i].rotate, debugCircles[i].stroke, option);
                map.addOverlay(overlay);
                if(isTaDrawDebugOpen) {
                    overlay.show();
                }else {
                    overlay.hide();
                }
                taCircleDebugOverlayCache.push(overlay);
            }
		}
        function getEllipseOverlay(center, rlong, rshort, rotate, stroke, option) {
            let centerPoint = center; 
			let longPoint = destinationVincenty(centerPoint, 90, rlong / 2);
			let shortPoint = destinationVincenty(centerPoint, 0, rshort / 2);
			// X:距中心点的横向经度,Y:距中心点的纵向纬度
			let lng_x = Math.abs(longPoint.lng - centerPoint.lng);
			let lat_y = Math.abs(shortPoint.lat - centerPoint.lat);
			let assemble = [];
			let angle;
			let dot;
			let tangent = lng_x / lat_y;
			/* 根据长轴短轴计算椭圆圆周的坐标点*/
			for (let i = 0; i < 96; i++) {
				angle = (2 * Math.PI / 96) * i;
				dot = new BMap.Point(centerPoint.lng + Math.sin(angle) * lat_y * tangent, centerPoint.lat + Math.cos(angle) * lat_y);
				assemble.push(dot);
			}

			let rdeg = rotate * Math.PI / 180;
			let sina = Math.sin(rdeg);
			let cosa = Math.cos(rdeg);
			for (let i = 0; i < assemble.length; i++) {
				let rx0 = centerPoint.lng;
				let ry0 = centerPoint.lat;
				let x0, y0, x1, y1;
				if (assemble[i].lng - centerPoint.lng >= 0 && assemble[i].lat - centerPoint.lat >= 0) {
					// 第一象限
					x0 = map.getDistance(new BMap.Point(assemble[i].lng, centerPoint.lat), new BMap.Point(centerPoint.lng, centerPoint.lat));
					y0 = map.getDistance(new BMap.Point(assemble[i].lng, centerPoint.lat), new BMap.Point(assemble[i].lng, assemble[i].lat));
				} else if (assemble[i].lng - centerPoint.lng < 0 && assemble[i].lat - centerPoint.lat > 0) {
					// 第二象限
					x0 = -map.getDistance(new BMap.Point(assemble[i].lng, centerPoint.lat), new BMap.Point(centerPoint.lng, centerPoint.lat));
					y0 = map.getDistance(new BMap.Point(assemble[i].lng, centerPoint.lat), new BMap.Point(assemble[i].lng, assemble[i].lat));
				} else if (assemble[i].lng - centerPoint.lng <= 0 && assemble[i].lat - centerPoint.lat <= 0) {
					// 第三象限
					x0 = -map.getDistance(new BMap.Point(assemble[i].lng, centerPoint.lat), new BMap.Point(centerPoint.lng, centerPoint.lat));
					y0 = -map.getDistance(new BMap.Point(assemble[i].lng, centerPoint.lat), new BMap.Point(assemble[i].lng, assemble[i].lat));
				} else if (assemble[i].lng - centerPoint.lng > 0 && assemble[i].lat - centerPoint.lat < 0) {
					// 第四象限
					x0 = map.getDistance(new BMap.Point(assemble[i].lng, centerPoint.lat), new BMap.Point(centerPoint.lng, centerPoint.lat));
					y0 = -map.getDistance(new BMap.Point(assemble[i].lng, centerPoint.lat), new BMap.Point(assemble[i].lng, assemble[i].lat));
				}
				x1 = x0 * cosa - y0 * sina;
				y1 = x0 * sina + y0 * cosa;
				assemble[i].lng = destinationVincenty(centerPoint, 90, x1).lng;
				assemble[i].lat = destinationVincenty(centerPoint, 0, y1).lat;
			}
			let overlay = new BMap.Polygon(assemble, option);
			/* 计算椭圆圆周宽度*/
			function setStrokeWeight() {
				let defaultPoint = { lng: 114, lat: 30 };
				let topPosition = map.pointToOverlayPixel(destinationVincenty(defaultPoint, 0, stroke / 2));
				let botPosition = map.pointToOverlayPixel(destinationVincenty(defaultPoint, 0, -stroke / 2));
				overlay.setStrokeWeight(Math.abs(topPosition.y - botPosition.y));
			}
			setStrokeWeight();
			/* 圆周宽度随zoom变化*/
			map.addEventListener("zoomend", function () {
				setStrokeWeight();
			});
			return overlay;
        }

        /* 通过米数、原点GPS坐标、方向夹角，获取第二点GPS坐标*/
		function destinationVincenty(lonlat, brng, dist) {
			/* 椭圆球基础参数*/
			let VincentyConstants = {
				a: 6378137,
				b: 6356752.3142,
				f: 1 / 298.257223563
			};
			/* 度换成弧度*/
			let rad = function (d) {
				return d * Math.PI / 180.0;
			};
			/* 弧度换成度*/
			let deg = function (x) {
				return x * 180 / Math.PI;
			};
			let ct = VincentyConstants;
			let a = ct.a, b = ct.b, f = ct.f;
	
			let lon1 = lonlat.lng;
			let lat1 = lonlat.lat;
	
			let s = dist;
			let alpha1 = rad(brng);
			let sinAlpha1 = Math.sin(alpha1);
			let cosAlpha1 = Math.cos(alpha1);
	
			let tanU1 = (1 - f) * Math.tan(rad(lat1));
			let cosU1 = 1 / Math.sqrt((1 + tanU1 * tanU1)), sinU1 = tanU1 * cosU1;
			let sigma1 = Math.atan2(tanU1, cosAlpha1);
			let sinAlpha = cosU1 * sinAlpha1;
			let cosSqAlpha = 1 - sinAlpha * sinAlpha;
			let uSq = cosSqAlpha * (a * a - b * b) / (b * b);
			let A = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
			let B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
	
			let sigma = s / (b * A), sigmaP = 2 * Math.PI;
			let cos2SigmaM, sinSigma, cosSigma, deltaSigma;
			while (Math.abs(sigma - sigmaP) > 1e-12) {
				cos2SigmaM = Math.cos(2 * sigma1 + sigma);
				sinSigma = Math.sin(sigma);
				cosSigma = Math.cos(sigma);
				deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) -
					B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)));
				sigmaP = sigma;
				sigma = s / (b * A) + deltaSigma;
			}
	
			let tmp = sinU1 * sinSigma - cosU1 * cosSigma * cosAlpha1;
			let lat2 = Math.atan2(sinU1 * cosSigma + cosU1 * sinSigma * cosAlpha1,
				(1 - f) * Math.sqrt(sinAlpha * sinAlpha + tmp * tmp));
			let lambda = Math.atan2(sinSigma * sinAlpha1, cosU1 * cosSigma - sinU1 * sinSigma * cosAlpha1);
			let C = f / 16 * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
			let L = lambda - (1 - C) * f * sinAlpha *
				(sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
	
			let revAz = Math.atan2(sinAlpha, -tmp);
			return { lng: lon1 + deg(L), lat: deg(lat2) };
		}
    }

     /* TA 绘点 */
    static drawTaPoints(taPointsArray) {
		let prodPoints = [];
		let debugPoints = [];
		for(let i = 0; i < taPointsArray.length; i++) {
			if(taPointsArray[i].drawType == 1) {
				prodPoints.push(taPointsArray[i]);
			}else {
				debugPoints.push(taPointsArray[i]);
			}
		}
		if(prodPoints.length > 0) {
			/* 移除上次绘图信息 */
			if(taPointsProdOverlayCache.length > 0) {
				for(let i = 0; i < taPointsProdOverlayCache.length; i++) {
					map.removeOverlay(taPointsProdOverlayCache[i]);
				}
			}
			for(let i = 0; i < prodPoints.length; i++) {
				let marker = getMarkerOverlay(prodPoints[i].lat, prodPoints[i].lng, prodPoints[i].color, prodPoints[i].tips);
				map.addOverlay(marker);
				if(isTaDrawProdOpen) {
					marker.show();
				}else {
					marker.hide();
				}
				taPointsProdOverlayCache.push(marker);
			}
		}
		if(debugPoints.length > 0) {
			 /* 移除上次绘图信息 */
			 if(taPointsDebugOverlayCache.length > 0) {
                for(let i = 0; i < taPointsDebugOverlayCache.length; i++) {
                    map.removeOverlay(taPointsDebugOverlayCache[i]);
                }
            }
            for(let i = 0; i < debugPoints.length; i++) {
                let marker = getMarkerOverlay(debugPoints[i].lat, debugPoints[i].lng, debugPoints[i].color, debugPoints[i].tips);
                map.addOverlay(marker);
                if(isTaDrawDebugOpen) {
                    marker.show();
                }else {
                    marker.hide();
                }
                taPointsDebugOverlayCache.push(marker);
            }
		}

        function getMarkerOverlay(lat, lng, color, tips) {
            let bdPoint = (lat,lng);
			let imgPath;
			switch (color) {
				case 1:
					imgPath = 'img/iconpic/CR-mark1.png';
					break;
				case 2:
					imgPath = 'img/iconpic/CR-mark2.png';
					break;
				case 3:
					imgPath = 'img/iconpic/CR-mark3.png';
					break;
				case 4:
					imgPath = 'img/iconpic/CR-mark4.png';
					break;
				case 5:
					imgPath = 'img/iconpic/CR-mark5.png';
					break;
				case 6:
					imgPath = 'img/iconpic/CR-mark6.png';
					break;
				case 7:
					imgPath = 'img/iconpic/CR-mark7.png';
					break;
				case 8:
					imgPath = 'img/iconpic/CR-mark8.png';
					break;
				default:
					break;
			}
			let marker = new BMap.Marker(
				new BMap.Point(bdPoint.lng, bdPoint.lat),
				{ icon: new BMap.Icon(imgPath, new BMap.Size(19, 43)) }
			);
			var label = new BMap.Label(tips,{offset:new BMap.Size(20,-10)});
			marker.setLabel(label);
			return marker;
        }
    }

     /* TA 绘多边形 */
    static drawTaPolygon(taPolygonArray) {
		let prodPolygons = [];
		let debugPolygons = [];
		for(let i = 0; i < taPolygonArray.length; i++) {
			if(taPolygonArray[i].drawType == 1) {
				prodPolygons.push(taPolygonArray[i]);
			}else {
				debugPolygons.push(taPolygonArray[i]);
			}
		}
		if(prodPolygons.length > 0) {
			/* 移除上次绘图信息 */
            if(taPolygonProdOverlayCache.length > 0) {
                for(let i = 0; i < taPolygonProdOverlayCache.length; i++) {
                    map.removeOverlay(taPolygonProdOverlayCache[i]);
                }
            }
            for(let i = 0; i < prodPolygons.length; i++) {
                let overlay = getPolygonOverlay(prodPolygons[i].strokeStyle, prodPolygons[i].strokeWeight, prodPolygons[i].strokeColor, prodPolygons[i].strokeOpacity, 
                    prodPolygons[i].fillFlag, prodPolygons[i].fillColor, prodPolygons[i].fillOpacity, prodPolygons[i].points);
                map.addOverlay(overlay);
                if(isTaDrawProdOpen) {
                    overlay.show();
                }else {
                    overlay.hide();
                }
                taPolygonProdOverlayCache.push(overlay);
            }
		}
		if(debugPolygons.length > 0) {
			/* 移除上次绘图信息 */
            if(taPolygonDebugOverlayCache.length > 0) {
                for(let i = 0; i < taPolygonDebugOverlayCache.length; i++) {
                    map.removeOverlay(taPolygonDebugOverlayCache[i]);
                }
            }
            for(let i = 0; i < debugPolygons.length; i++) {
                let overlay = getPolygonOverlay(debugPolygons[i].strokeStyle, debugPolygons[i].strokeWeight, debugPolygons[i].strokeColor, debugPolygons[i].strokeOpacity, 
                    debugPolygons[i].fillFlag, debugPolygons[i].fillColor, debugPolygons[i].fillOpacity, debugPolygons[i].points);
                map.addOverlay(overlay);
                if(isTaDrawDebugOpen) {
                    overlay.show();
                }else {
                    overlay.hide();
                }
                taPolygonDebugOverlayCache.push(overlay);
            }
		}
        //生成多边形 
		function getPolygonOverlay(strokeStyle, strokeWeight, strokeColor, strokeOpacity, fillFlag, fillColor, fillOpacity, points) {
			let colors = ["#ff0000","#ff0000","#ff9400","#ffd900","#6eff00","#00a9ff","#0062ff","#a100ff","#000000"];
			let bpoints = [];
			for (let i = 0; i < points.length; i++) {
				let bpoint = points[i];
				bpoints.push(new BMap.Point(bpoint.lng, bpoint.lat));
			}
			let overlay = new BMap.Polygon(bpoints, {strokeStyle:strokeStyle==1?'solid':'dashed',strokeColor:colors[strokeColor], strokeWeight:strokeWeight, strokeOpacity:strokeOpacity,
													fillColor:(fillFlag==0?'none':colors[fillColor]), fillOpacity:fillOpacity});  //创建多边形
			return overlay;
		}
    }

}