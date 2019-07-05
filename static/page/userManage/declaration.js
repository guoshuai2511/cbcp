export class Declaration {
    constructor() {
        return this.declaration();
    }
    declaration() {
        /* 每页显示数量*/
        let pageItemNum = 30;

        /* 查询类*/
        class UserQueryBean {
            constructor() {
                this.username;
                this.realname;
                this.tel;
                this.locked;
                this.deptId;
                this.roleId;
                this.devUseRoleId;
                this.pageSize;
                this.pageNum;
            }
        }

        /* update*/
        class UserVo {
            constructor() {
                this.id;
                this.username;
                this.password;
                this.rePassword;
                this.realname;
                this.headAddr;
                this.sex;
                this.devUseType;
                this.phoneUseType;
                this.startTime;
                this.endTime;
                this.devPermsStartTime;
                this.devPermsEndTime;
                this.phonePermsStartTime;
                this.phonePermsEndTime;
                this.devId;
                this.userId;
                this.tel;
                this.deptId;
                this.roleIds;
                this.devIds;
                this.locked;
                this.status;
                this.type;
                this.createrId;
                this.createTime;
                this.updaterId;
                this.updateTime;
                this.salt;
                this.dwPhoneId;
            }
        }

        /* User类*/
        class User {
            constructor() {
                this.username;
                this.realname;
                this.password;
                this.sex;
                this.tel;
                this.locked;
                this.statu;
            }
        }

        /*存储已勾选的节点*/
        let selectedArr = new Array();

        let resultCache;

        let currentUpdateUser;

        let userModalSubmitType;

        let userQuery = new UserQueryBean();

        let user = new User();
        //测试手机号勾选
        let selectedPhoneArr = new Array();
        /* 存储角色列表*/
        let roleListCache;
        /* 存储组织机构树状图*/
        let deptTreeCache;
        /* 存储设备使用角色列表*/
        let devUseRoleListCache;

        /* 选择的设备*/
        let selectedDevMap = new Map();
        /**/
        let resultDevCache;
        //用户下属手机号缓存
        let resultPhoneCache;
        //机构下属手机号缓存
        let resultPhoneCacheList
        //登录图片
        let loginLogoImgUrl;
        let homeLogoImgUrl;
        //头像路径缓存 add by guoshuai start
        let selectedImgPath;
        //add by guoshuai end
    }
}