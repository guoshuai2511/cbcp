export class GPSToBaiduPoint {

    /* 使用百度地图自带方法，每次解析10个坐标*/
    static getBaiduPointByGPS(pointArray) {
        let convertor = new BMap.Convertor();
        let points = [];
        for (let i = 0; i < pointArray.length; i++) {
            points.push(new BMap.Point(pointArray[i][0], pointArray[i][1]));
        }
        /* 使用promise返回异步结果*/
        return new Promise((resolve) => {
            convertor.translate(points, 1, 5, (data) => {
                let point = [];
                for (let i = 0; i < data.points.length; i++) {
                    let lng = Number(data.points[i].lng.toString().match(/^\d+(?:\.\d{0,6})?/));
                    let lat = Number(data.points[i].lat.toString().match(/^\d+(?:\.\d{0,6})?/));
                    point.push({ lng: lng, lat: lat });
                }
                resolve(point);
            });
        });
    }

    /* 使用webapi与jsonp，每次解析100个坐标*/
    static getBaiduPointByGPSTypeB(pointArray) {
        let ak = 'PgNHPqzIRsGR1yhs8nkoCtXOZLbwmawp';
        let pointString = '';
        /* 数组转字符串*/
        for (let i = 0; i < pointArray.length; i++) {
            pointString = pointString + pointArray[i][0] + ',' + pointArray[i][1] + ';';
        }
        /* 去掉末尾分号";"*/
        pointString = pointString.substring(0, pointString.length - 1);
        let url = 'http://api.map.baidu.com/geoconv/v1/?coords=' + pointString + '&from=1&to=5&ak=' + ak;
        /* 使用promise返回ajax请求结果*/
        return new Promise((resolve) => {
            $.ajax({
                url: url,
                type: 'get',
                dataType: "jsonp",
                jsonp: "callback",
            }).then((result) => {
                resolve(result.result);
            });
        });
    }

    /* 坐标转换离线方法（同步）*/
    static getBaiduPointLocation(pointArray) {

        // 圆周率
        let pi = Math.PI;
        // 卫星椭球坐标投影到平面坐标系的投影因子
        let a = 6378245.0;
        // 椭球的偏心率
        let ee = 0.00669342162296594323;
        // 圆周率转换量
        let x_pi = pi * 3000.0 / 180.0;

        function wgs2bd(lat, lng) {
            let _wgs2gcj = wgs2gcj(lat, lng);
            let _gcj2bd = gcj2bd(_wgs2gcj[0], _wgs2gcj[1]);
            return _gcj2bd;
        }

        /**
         * GCJ坐标转百度坐标
         * @param lat
         * @param lng
         * @return
         */
        function gcj2bd(lat, lng) {
            let x = lng, y = lat;
            let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
            let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
            let bd_lng = z * Math.cos(theta) + 0.0065;
            let bd_lat = z * Math.sin(theta) + 0.006;
            return [bd_lat, bd_lng];
        }

        /**
         * WGS坐标转GCJ坐标
         * @param lat
         * @param lng
         * @return
         */
        function wgs2gcj(lat, lng) {
            let dLat = transformLat(lng - 105.0, lat - 35.0);
            let dLng = transformLng(lng - 105.0, lat - 35.0);
            let radLat = lat / 180.0 * pi;
            let magic = Math.sin(radLat);
            magic = 1 - ee * magic * magic;
            let sqrtMagic = Math.sqrt(magic);
            dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
            dLng = (dLng * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
            let mgLat = lat + dLat;
            let mgLng = lng + dLng
            let loc = [mgLat, mgLng];
            return loc;
        }

        function transformLat(lat, lng) {
            let ret = -100.0 + 2.0 * lat + 3.0 * lng + 0.2 * lng * lng + 0.1 * lat * lng + 0.2 * Math.sqrt(Math.abs(lat));
            ret += (20.0 * Math.sin(6.0 * lat * pi) + 20.0 * Math.sin(2.0 * lat * pi)) * 2.0 / 3.0;
            ret += (20.0 * Math.sin(lng * pi) + 40.0 * Math.sin(lng / 3.0 * pi)) * 2.0 / 3.0;
            ret += (160.0 * Math.sin(lng / 12.0 * pi) + 320 * Math.sin(lng * pi / 30.0)) * 2.0 / 3.0;
            return ret;
        }

        function transformLng(lat, lng) {
            let ret = 300.0 + lat + 2.0 * lng + 0.1 * lat * lat + 0.1 * lat * lng + 0.1 * Math.sqrt(Math.abs(lat));
            ret += (20.0 * Math.sin(6.0 * lat * pi) + 20.0 * Math.sin(2.0 * lat * pi)) * 2.0 / 3.0;
            ret += (20.0 * Math.sin(lat * pi) + 40.0 * Math.sin(lat / 3.0 * pi)) * 2.0 / 3.0;
            ret += (150.0 * Math.sin(lat / 12.0 * pi) + 300.0 * Math.sin(lat / 30.0 * pi)) * 2.0 / 3.0;
            return ret;
        }

        let point = [];
        for (let i = 0; i < pointArray.length; i++) {
            let arr = wgs2bd(Number(pointArray[i][1]), Number(pointArray[i][0]));
            point.push({ lng: arr[1], lat: arr[0] });
        }
        return point;

    }

    /* 坐标转换离线方法（异步）*/
    static getBaiduPointLocationPromise(pointArray) {

        return new Promise((resolve) => {
            let point = this.getBaiduPointLocation(pointArray);
            resolve(point);
        });

    }
    
}


