/* 每页显示数量*/
let pageItemNum = 10;
/* 用户每页显示数量*/
let userPageItemNum = 10;
/* 设备列表每页显示数量*/
let devPageItemNum = 10;

let queryCache;
let resultCache;
let menuTreeList = [];

/* 省级区划列表缓存*/
let provinceAreasCache;

/* 点击类型*/
let roleBtnClickType = '';

/* 查询类*/
class RoleBean {
    constructor() {
        this.roleName;
        this.pageSize;
        this.pageNum;
    }
}

/* 用户类*/
class UserBean {
    constructor() {
        this.username;
        this.realname;
        this.tel;
        this.locked;
        this.deptId;
        this.roleId;
        this.pageSize;
        this.pageNum;
    }
}
let userQueryCache;

/* 添加类*/
class DevUseRoleVo {
    constructor() {
        this.roleId;
        this.roleName;
        this.remark;
        this.useType;
        this.otherDevCode;
        this.sceneType;
        this.enableAreaCode;
        this.enableMode;
        this.startEnableTime;
        this.endEnableTime;
        this.targetNumType;
        this.enableTargetNum;
        this.createrId;
        this.createTime;
        this.updaterId;
        this.updateTime;
    }
}

/* 设备搜索类*/
class DevBean {
    constructor() {
        this.devCode;
        this.deptId;
        this.pageSize;
        this.pageNum;
    }
}
let devQueryCache;

let roleInputCache = {};

/* 是否禁用点击*/
let checkForbidden = false;

/* 是否已搜索精细数据设备列表*/
let isDetailDevListSearched = false;

/* 添加手机号缓存*/
let addTelCache = new Map();

/* 添加制式缓存*/
let addDevModeCache = new Map();

/* 添加地区缓存*/
let addAreaCache = new Map();

/* 添加设备缓存*/
let selectedDevsCache = new Set();

let permissionUseType = 1; // 设备使用权限范围
let permissionSceneType = 1; // 作战场景权限
let permissionTargetNumType = 1; // 作战目标权限