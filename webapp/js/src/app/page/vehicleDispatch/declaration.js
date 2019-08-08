/* 每页显示数量*/
let pageItemNum = 30;
//登录图片
let loginLogoImgUrl;
let homeLogoImgUrl;

class VehicleDispatchVo {
    constructor() {
        this.teamName;
        this.vehicleIds;
        this.teamId;
    }
}

/* 存储组织机构树状图*/
let deptTreeCache;
let resultCache;

// let vehicleDispatchQuery = new VehicleDispatchQueryBean();

let devSelectedNameListCache = '';

let vehicleMarkerCache = new Map();
let vehicleIconCache = new Map();
let vehiclePanelCache = new Map();
let vehicleMarkerList = [];
let devDivMap = new Map();
let vehiclePointCache = new Map();
let vehicleGPSCache = new Map();
let vehicleNumCache = new Map();
let vehicleGroupCache = new Map();
let vehicleGroupNameCache = new Map();

let selectedVehicleId = [];

let editId = "";
let firstMove = true;
let circle;
let searchMarker;

let carMarkerClustererWorking;
