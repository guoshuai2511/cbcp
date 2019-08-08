let isDeptNameTrueType = 0;
let currentSelectedDept;
let resultCache;

/* 用户每页显示数量*/
let userPageItemNum = 10;

/* 更新类，添加类*/
class DeptVo {
    constructor() {
        this.deptId;
        this.parentId;
        this.name;
        this.remark;
        this.createrId;
        this.createTime;
        this.updaterId;
        this.updateTime;
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
//登录图片
let loginLogoImgUrl;
let homeLogoImgUrl;