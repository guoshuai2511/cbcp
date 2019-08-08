/* 每页显示数量*/
let pageItemNum = 30;
//登录图片
let loginLogoImgUrl;
let homeLogoImgUrl;



/* 查询类*/
class BlackBoxLogQueryBean {
    constructor() {
        this.caseName;
        this.workTarget;
        this.phone;
        this.imsi;
        this.imei;
        this.startTime;
        this.endTime;
        this.applicant;
        this.devCode;
        // this.remark;
        this.deptId;
        this.pageSize;
        this.pageNum;
    }
}

class BlackBoxLogVo{
    constructor() {
        this.caseName;
        this.workTarget;
        this.phone;
        this.imsi;
        this.imei;
        this.devCode;
        this.disCode;
        this.remark;
        this.applicantName;
        this.applyTime;
        this.createTime;
        this.createrId;
    }
}

/* 存储组织机构树状图*/
let deptTreeCache;
let resultCache;

let blackBoxLogQuery = new BlackBoxLogQueryBean();

let devSelectedNameListCache = '';