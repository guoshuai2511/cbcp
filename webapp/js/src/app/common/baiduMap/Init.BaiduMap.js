let map = null;
let BMapExt;
let mapNavigation;

export class BaiduMapInit {

    /*初始化地图*/
    static initMap() {
        /* 创建map实例*/
        this.map = new BMap.Map('allmap', { enableMapClick: false }); // 禁用显示标注详细信息
        /* 通过当前IP设置地图中心与显示级别*/
        this.map.centerAndZoom(new BMap.Point(114.2814580000, 30.5249590000), 6);
        new BMap.LocalCity().get((result) => {
            this.map.setCenter(result.name);
        });
        /* 添加地图类型控件*/
        this.map.addControl(new BMap.MapTypeControl({ mapTypes: [BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP, BMAP_HYBRID_MAP] }));
        /* 开启鼠标滚轮缩放*/
        this.map.enableScrollWheelZoom(true);
        /* 禁止双击放大*/
        this.map.disableDoubleClickZoom();
        /* 开启键盘控制功能*/
        this.map.enableKeyboard();
        /* zoom缩小，触发显示点聚合*/
        this.map.setZoom(12);
        /* 地图缩放与移动控件*/
        this.mapNavigation = new BMap.NavigationControl({ offset: new BMap.Size(235, 5) });
        this.map.addControl(this.mapNavigation);
        return this.map;
    }

    static getBaiduMap() {
        return this.map;
    }

    static getBMapExt() {
        return this.BMapExt;
    }

    static getBaiduMapNavigation() {
        return this.mapNavigation;
    }

    /* 放大与缩小事件*/
    static addMapZoom() {
        map.setZoom(map.getZoom() + 1);
    }
    static narrowMapZoom() {
        map.setZoom(map.getZoom() - 1);
    }


}