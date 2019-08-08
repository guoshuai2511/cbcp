/* 设备信息所对应的Map集合 */
let devInfoMap = new Map();

/* 设备覆盖物所对应的Map集合 */
let devDivMap = new Map();

/* 从服务器接收到的包含设备信息的json */
let devBaseInfo;

/* 工作中小车的数组 */
let carMarkerPointsWorking = [];

/* 工作中小车的点聚合对象 */
let carMarkerClustererWorking;

/* 未工作小车的数组 */
let carMarkerPointsUnwork = [];

/* 未工作小车的点聚合对象 */
let carMarkerClustererUnwork;

/* 地图设备分布显示类型*/
let devDistributionType = 1;

/* 地图设备分布数据缓存*/
let devDistributionListCache;

/* 检索参数缓存 */
let queryCaseStatisticsType = 2;
let queryStartTime = new Date(new Date().getTime() - 365 * 24 * 3600 * 1000);
let queryEndTime = new Date();
//替换地图方案二 只需替换areaCode、areaName、grade即可
let queryAreaCode = null;
let queryAreaName = null;
let queryGrade = 0;
//let queryAreaCode = 3702;
//let queryAreaName = '青岛市';
//let queryGrade = 2; 
let echartMap;
let initMapFlag = false;
//登录图片
let loginLogoImgUrl;
let homeLogoImgUrl;