/* 每页显示数量*/
let pageItemNum = 20;



/* 查询类*/
class DevQueryBean {
    constructor() {
        this.devCode;
        this.deptId;
        this.pageSize;
        this.pageNum;
    }
}

/* update*/
class DevVo {
    constructor() {
        this.devId;
        this.confirmTime;
        this.deptId;
        this.dwVehicleId;
        this.status;
        this.updaterId;
        this.updateTime;
        this.devCode;
        this.disCode;
        this.devType;
    }
}

/*存储已勾选的节点*/
let selectedArr = new Array();

let resultCache;

let currentUpdateDev;

let devModalSubmitType;

let devQuery = new DevQueryBean();

/* 存储角色列表*/
let roleListCache;
/* 存储组织机构树状图*/
let deptTreeCache;
//登录图片
let loginLogoImgUrl;
let homeLogoImgUrl;
//地理坐标
let devLat;
let devLng;
let devName;