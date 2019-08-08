/* 每页显示数量*/
let pageItemNum = 20;

let eventEggs = 'add by guoshuai date:2019/7/26';
/* 查询类*/
class VehicleQueryBean {
    constructor() {
        this.vehicleNum;
        this.plateNum;
        this.managerName;
        this.deptId;
        this.pageSize;
        this.pageNum;
    }
}

/* update*/
class VehicleVo {
    constructor() {
        this.id;
        this.vehicleNum;
        this.vehicleType;
        this.model;
        this.deptId;
        this.managerId;
        this.remark;
        this.plateNum;
        this.confirmTime;
        this.managerName;
        this.driverId;
        this.driverName;
        this.devIds;
        this.vehicleId;
    }
}

/*存储已勾选的节点*/
let selectedArr = new Array();

let resultCache;

let currentUpdateVehicle;

let vehicleQuery = new VehicleQueryBean();

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