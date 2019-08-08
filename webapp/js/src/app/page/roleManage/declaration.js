/* 每页显示数量*/
let pageItemNum = 10;
/* 用户每页显示数量*/
let userPageItemNum = 10;

let queryCache;
let resultCache;
let menuTreeList = [];

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
class RoleVo {
    constructor() {
        this.roleId;
        this.roleName;
        this.remark;
        this.createrId;
        this.createTime;
        this.updaterId;
        this.updateTime;
        this.menus = [];
        this.dataType;
        this.otherDeptIds = '';
        this.otherDevCodes = '';
    }
}

let roleInputCache = {};

/* 是否禁用点击*/
let checkForbidden = false;

/* 权限范围*/
let permissionDataType = 1;

//登录图片
let loginLogoImgUrl;
let homeLogoImgUrl;