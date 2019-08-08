/* 该页面类型 */
let thisPageType = 'RTC';

/* 作战开始时间*/
let caseStartTime;

/* index对应字母*/
let abcCache = ['A', 'B', 'C', 'D', 'E'];

let eventEggs = 'One of the developers:guoshuai';

/* 用户信息*/
let userInfosCache = [];

/* 无GPS模态框是否打开 */
let isNoGpsModalOpen = false;

/* 基站命中特效echarts定时器*/
let flashMarkerInterval;

/* 基站命中特效css覆盖物*/
let btsHitEffectionCover;

/* 历史轨迹是否绘制完成*/
let historyRouteLineIsFinish = false;

/* 历史能量轴相关信息*/
let maxEngHistoryCache = new Map();

/* 绘制历史轨迹的缓存*/
let historyDevLineMap = new Map();

/* 颜色库*/
let devColorLib = {
    car: ['rgb(250,103,0)', 'rgb(126,145,164)'],
    single: ['rgb(18,163,229)', 'rgb(72,209,114)', 'rgb(255,198,1)', 'rgb(132,81,242)'],
};

/* 当前视角的设备devCode*/
let currentViewDevCode = '';

/* 设备显示信息集合 */
let devDrawInfoMap = new Map();

/* 设备信息所对应的Map集合 */
let devInfoMap = new Map();

/* 设备覆盖物所对应的Map集合 */
let devDivMap = new Map();

/* 基站信息对应的Map集合 */
let btsInfoMap = new Map();

/* 复合基站信息对应的Map集合 */
let multiBtsInfoMap = new Map();

/* 基站覆盖物所对应的Map集合 */
let btsDivMap = new Map();

/* 中心点设备编号缓存*/
let centerPointDevCode = null;

/* 设备轨迹线*/
let lineOverlayMap = { line: new Map(), isShow: true };

/* 设备轨迹线缓存
let lineOverlayMapTemp = { line: new Map(), isShow: true };*/

/* 设备轨迹线次数缓存*/
let lineOverlayCountCache = new Map();

/* 主动式轨迹线*/
let linePassive = { overlay: [], line: [], isShow: true };

/* 单兵命中的基站信息对应的Map集合 */
let singleBtsInfoMap = new Map();

/* 单兵命中的基站覆盖物所对应的Map集合 */
let singleBtsDivMap = new Map();

/* 车载能量指示数组 */
let carEngOrientationArray = { overlay: [], isShow: true };

/* 单兵能量指示数组 */
let singleEngOrientationArray = { overlay: [], isShow: true };

let canBtsOpen = false;

/* 目标小区缓存*/
let targetCellInfosCache = new Map();
/**add by gaochao start */
let devPreLockCellInfosCache = new Map();
let devPreLockCellClearInfosCache = {};

/**add by gaochao end*/

/* 目标小区指示线*/
let targetCellLineCache;
/**add by gaochao start */
let devPreLockCellLineCache;
/**add by gaochao end*/

/* 命中基站未查到在地图上标注一个未定义的基站图标*/
let ifNullHitedBts;

/* 基站解析信息与触发信息缓存*/
let devStateInfoMapCache = new Map();

/* 基站解析进度缓存*/
let btsAnalysisOverlayCache = [];

/* 基站echarts特效相关信息*/
let hitedBtsEcharts = new Map();

/* 命中的基站缓存*/
let hitedBtsCache = [];

/* echarts是否需要重绘*/
shouldEchartsRefresh = false;

/* 每个设备正在解析的基站*/
let devCellAnalysisMap = new Map();

/* 是否打开/关闭基站显示*/
let isBtsOpen = true;

/* 上一次命中的基站*/
let lastHitedBts;

/* 热力图覆盖物缓存*/
let heatmapOverlayCache = [];

/* 当前时间分钟数*/
let currentMinutesCache = new Date().getMinutes();

/* 时间轴起始时间*/
let timeLineStartValue;

/* 时间轴刻度数量（蓝色）*/
let timeDividerCount = 0;

/* 时间轴刻度数量（灰色）*/
let timeDividerCountOver = 0;

/* 时间轴影子覆盖物*/
let historyShadowOverlay;

/* 时间轴刻度是否被点击过*/
let timeLineMarketIsClicked = false;

/* 默认语音播报类型*/
let engAudioType = 2; // 1单选，2优选，3静音

/* 语音播报状态*/
let audioPlayerStatus = false;

/* 当前主动式命中状态*/
let passiveActiveStatus = 0;

/* 上一次主动式命中状态*/
let lastPassiveActiveStatus;

/* 移动次数*/
let moveTimes = 0;

/* 每页显示数量*/
let pageItemNum = 30;

/* 当前页数*/
let currentPage = 1;

/* 搜索类*/
let RealTimeCombatGuideVo = function () {
    this.userId;
    this.userName;
    this.areaName;
    this.areaCode;
    this.areaName;
    
    this.devCode;
    this.earliestStartTime;
    this.latestStartTime;
}

/* 搜索类缓存*/
let RealTimeCombatGuideVoCache = new RealTimeCombatGuideVo();

/* 搜索结果缓存*/
let queryResultCache;

/* 打点发送的设备编号缓存*/
let sentMarkerPointDev;

/* 基站查询缓存*/
let btsSearchDivMap = new Map();
//登录图片
let loginLogoImgUrl;
let homeLogoImgUrl;

/* 主动式详细信息能量 */
let EngInfo = function () {
    this.eng;
    this.freq;
    this.pci;
    this.reportTime;
}

let devActiveEngInfoLogCatch = [];
let lastDevActiveEngInfoReportTime = 0;

let devTdoaDataInfoLogCatch = [];
let historyTaDataReportTimeArray = [];
let historyTaDrawReportTimeArray = [];

/* 是否打开/关闭TA产品化绘图显示*/
let isTaDrawProdOpen = true;
/* 是否打开/关闭TA调试化绘图显示*/
let isTaDrawDebugOpen = true;
/* 热力图覆盖物缓存*/
let taCircleProdOverlayCache = [];
/* 热力图覆盖物缓存*/
let taCircleDebugOverlayCache = [];
/* 热力图覆盖物缓存*/
let taPointsProdOverlayCache = [];
/* 热力图覆盖物缓存*/
let taPointsDebugOverlayCache = [];
/* 热力图覆盖物缓存*/
let taPolygonProdOverlayCache = [];
/* 热力图覆盖物缓存*/
let taPolygonDebugOverlayCache = [];

/*add by guoshuai start 2019/3/8*/
/*实时作战显示时长自增定时器*/
let realTimeCombatTimer;
/*时间轴时长自增定时器*/
let realTimeCombatLineTimer;
/*add by guoshuai end 2019/3/8*/

/**add by gaochao start */
let mapFollowFlag = true;
let activeSupport = 0;
let activeEnable = 0;
let voiceDevCode = new Map();
let analysisModeNow = "lte";
let analysisDevCodeNow = "";
let analysisInfoMap = new Map();
let analysisInfoHitMap = new Map();
let btsHitTimerMap = new Map();
let btsHitTimer = {};
let chartMsgInfosCache = new Map();
let chartMsgInfosListCache = [];
/**add by gaochao end */

let btsActiveCache;

let btsNowFlagMarker = null;

let vehicleMarkerCache = new Map();
let vehicleGPSCache = new Map();

let btsListCon = 0;
let btsListMap = new Map();
let btsNowFlagLabel;