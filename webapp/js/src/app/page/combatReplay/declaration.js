/* 该页面类型*/
let thisPageType = 'CR';

let eventEggs = 'One of the developers:guoshuai';
/* 向导页搜索缓存*/
let queryResultIndex;
let queryResultCache;

/* 搜索条件data缓存*/
let combatReplayBeanQueryCache;

/* 作战开始时间*/
let caseStartTime;

/* 作战结束时间*/
let caseEndTime;

/* 设备数量*/
let replayDevNumCache = 1;

/* 索引*/
let devIndex = 0;
let btsIndex = 0;
let statusIndex = 0;
let heatmapIndex = 0;
let targetCellInfoIndex = 0;
/**add by gaochao start */
let devPreLockCellInfoIndex = 0;
/**add by gaochao end*/
let lteCatchInfoIndex = 0;
let devActiveDetailInfoIndex = 0;
let taDataInfoIndex = 0;
let taDrawInfoIndex = 0;
/* 使用时间*/
let usedSec = 0;
/* 模拟当前时间*/
let replayCurrentTime = 0;

/* index对应字母*/
let abcCache = ['A', 'B', 'C', 'D', 'E'];

/* 基站命中特效echarts定时器*/
let flashMarkerInterval;

/* 基站命中特效css覆盖物*/
let btsHitEffectionCover;

/* 历史信息result缓存*/
let historyInfoCache;

/* 用户信息*/
let userInfosCache = [];

/* 时间轴相关*/
let timeLineEndValue;

/* 时间轴蓝色覆盖层初始宽度*/
let timeLineBlueCoverDefaultWidth = 0;

/* 历史轨迹是否绘制完成*/
let historyRouteLineIsFinish = false;

/* 绘制历史轨迹的缓存*/
let historyDevLineMap = new Map();

/* 颜色库*/
let devColorLib = {
    /**edit by gaochao start */
    car: ['rgb(250,103,0)', 'rgb(126,145,164)'],
    /**edit by gaochao end */
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

/* 多基站信息对应的Map集合 */
let multiBtsInfoMap = new Map();

/* 基站覆盖物所对应的Map集合 */
let btsDivMap = new Map();

/* 中心点设备编号缓存*/
let centerPointDevCode = null;

/* 设备轨迹线*/
let lineOverlayMap = { line: new Map(), isShow: true };

/* 设备轨迹线次数缓存*/
let lineOverlayCountCache = new Map();

/* 主动式轨迹线*/
let linePassive = { overlay: [], line: [], isShow: true };

/* 单兵命中的基站信息对应的Map集合 */
let singleBtsInfoMap = new Map();

/* 单兵命中的基站覆盖物所对应的Map集合 */
let singleBtsDivMap = new Map();

/* 热力图缓存*/
let heatmapOverlayCache = new Map();

/* 时间轴起始时间*/
let timeLineStartValue;

/* 时间轴刻度数量（蓝色）*/
let timeDividerCount = 0;

/* 时间轴刻度数量（灰色）*/
let timeDividerCountOver = 0;

/* 时间轴影子覆盖物*/
let historyShadowOverlay;

/* 当前主动式命中状态*/
let passiveActiveStatus = 0;

/* 上一次主动式命中状态*/
let lastPassiveActiveStatus;

/* 车载能量指示数组 */
let carEngOrientationArray = { overlay: [], isShow: true };

/* 单兵能量指示数组 */
let singleEngOrientationArray = { overlay: [], isShow: true };

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

/* 基站解析信息与触发信息缓存*/
let devStateInfoMapCache = new Map();

/* 基站解析进度缓存*/
let btsAnalysisOverlayCache = [];

/* 基站echarts特效相关信息*/
let hitedBtsEcharts = new Map();

/* 命中的基站缓存*/
let hitedBtsCache = { btsId: null, dev: [] };

/* echarts是否需要重绘*/
shouldEchartsRefresh = false;

/* 每个设备正在解析的基站*/
let devCellAnalysisMap = new Map();

/* 是否打开/关闭基站显示*/
let isBtsOpen = true;

/* 时间轴刻度是否被点击过*/
let timeLineMarketIsClicked = false;

/* 时间轴滑动条是否被拖拽过*/
let timeLineSlidertIsPressed = false;

/* 默认语音播报类型*/
let engAudioType = 2; // 1单选，2优选，3静音
let engAudioTypeCache = 2;

/* 语音播报状态*/
let audioPlayerStatus = false;

/* 每页显示数量*/
let pageItemNum = 30;

/* 类*/
class CombatReplayGuideBean {
    constructor() {
        this.userName;
        this.areaCode;
        this.areaName;

        this.tag;
        this.devCode;
        this.mixWorkingTime;
        this.maxWorkingTime;
        this.score;
        this.userType;
        this.startTime;
        this.endTime;
        this.pageSize = pageItemNum;
        this.pageNum;
    }
}

let CombatReplayGuideCache;

/* 搜索结果*/
let queryResult;

/* 作战标签列表缓存*/
let tagListCache;

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
let lastTaDataInfoReportTime = 0;

/* 是否打开/关闭TA产品化绘图显示*/
let isTaDrawProdOpen = true;
/* 是否打开/关闭TA调试化绘图显示*/
let isTaDrawDebugOpen = true;
/* TA产品化圆形缓存*/
let taCircleProdOverlayCache = [];
/* TA调试圆形缓存*/
let taCircleDebugOverlayCache = [];
/* TA产品化点集合缓存*/
let taPointsProdOverlayCache = [];
/* TA调试点集合缓存*/
let taPointsDebugOverlayCache = [];
/* TA产品化多边形缓存*/
let taPolygonProdOverlayCache = [];
/* TA调试多边形缓存*/
let taPolygonDebugOverlayCache = [];

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
/**add by gaochao end */

let btsActiveCache;

let btsNowFlagMarker = null;

let endMarker = null;

let endPoint = null;

let btsListCon = 0;
let btsListMap = new Map();
let btsNowFlagLabel;