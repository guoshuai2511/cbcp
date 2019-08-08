/* 每页显示数量*/
let pageItemNum = 30;

/* 类*/
class CaseReviewBean {
    constructor() {
        this.combatName;
        this.tag;
        this.userName;
        this.areaCode;
        this.areaName;
       
        this.devCode;
        this.mixWorkingTime;
        this.maxWorkingTime;
        this.score;
        this.userType;
        this.startTime;
        this.endTime;
        this.pageSize;
        this.pageNum;
    }
}

class CaseReviewVo {
    constructor() {
        this.combatId;
        this.combatSerialNum;
        this.combatName;
        this.tag;
        this.reviewStatus;
        this.remark;
    }
}

/* 案件标签列表缓存*/
let tagListCache;

/* 搜素条件缓存*/
let queryCache;

/* 搜索结果缓存*/
let queryResult;
//登录图片
let loginLogoImgUrl;
let homeLogoImgUrl;