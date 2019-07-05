<template>
  <div style="margin-top: 48px;">
    <div class="add_user_div" style="width:96%;">
        <button class="table_button btn-green add_user" @click="addUser()">新增</button>
        <button class="table_button btn-red delete_user">删除</button>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData.slice((currpage-1)*pagesize,currpage*pagesize)"
      tooltip-effect="dark"
      style="width: 96%"
      :row-style ="rowStyle"
      :header-cell-style ="headerCellStyle"
      class ="view-data-table"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection">
      </el-table-column>
      <el-table-column
        label="头像"
        width="60">
        <template slot-scope="scope">
          <img :src="getHeadPic(scope.row.headAddr)" width="40" height="40" class="head_pic"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="username"
        label="账号">
      </el-table-column>
      <el-table-column
        prop="realname"
        label="真实姓名">
      </el-table-column>
      <el-table-column
        label="性别"
        width="150">
        <template slot-scope="scope">
          {{getSex(scope.row.sex)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="tel"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="lastLoginIp"
        label="最后登录IP">
      </el-table-column>
      <el-table-column
        prop="lastLoginTime"
        label="最后登录时间">
      </el-table-column>
      <el-table-column
        prop=""
        label="绑定IP">
      </el-table-column>
      <el-table-column
        prop=""
        label="登录短信验证">
      </el-table-column>
      <el-table-column
        label="停启用" width="80px">
        <template slot-scope="scope">
          <span :class="getlockeClass(scope.row.locked)">{{getlockeStatus(scope.row.locked)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="330px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            class="table_button btn-green"
            @click="getPersonalUserInfoData(scope.$index, scope.row)">查看
          </el-button>
          <el-button
            size="mini"
            class="table_button btn-blue"
            @click="updateUserPersonalInfo(scope.$index, scope.row)">修改
          </el-button>
          <el-button
            size="mini"
            type="danger"
            :data-style="switchStatus(scope.row.locked)"
            :class="getLockeButtonClass(scope.row.locked)"
            @click="stopSwicth(scope.$index, scope.row.locked)">
            <span>{{getLockeText(scope.row.locked)}}</span>
          </el-button>
          <el-button
            size="mini"
            type="danger"
            class="table_button btn-red"
            @click="deleteRow(scope.$index, tableData)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background 
        layout="prev, pager, next, sizes, total, jumper"
        :page-sizes="[10, 20, 30, 50]" 
        :page-size="pagesize"
        :total="tableData.length"
        @current-change="handleCurrentChange" 
        @size-change="handleSizeChange"
        >
    </el-pagination>
    <el-dialog :visible.sync="multiDeleteVisible" title="提示" width="30%">
        <span>确定要删除吗</span>
        <span slot="footer">
          <el-button type="primary" @click="multiDelete">确 定</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
  import {formatDate} from '../../static/lib/timeFormat.js';
  import "../../static/lib/zTree_v3/js/jquery.ztree.all.min.js";
  import $axios from 'axios';
  import $ from 'jquery';
  let newUser;
  /* 存储角色列表*/
	let roleListCache;
	/* 存储组织机构树状图*/
  let deptTreeCache;

  export default {
    props:['url'],
    data() {
      return {
        tableData: [],
        pagesize: 30,
        currpage: 1,
        multipleSelectionFlag:false,
        multiDeleteVisible: false,
        multipleSelection:'',

      }
    },
    methods: {
        //获取用户列表数据
        getUserList() {
            $axios.get(this.url).then(resultS => {
                let result = resultS.data.pageInfo.list;
                if(newUser != undefined && newUser != null && newUser != ''){
                    result.unshift(newUser);
                }
                console.log(result);
                this.tableData = result;
                this.total =  resultS.data.pageInfo.length;
            });
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            this.multipleSelectionFlag = true;
            if (this.multipleSelection.length == 0) {   
            // 如不进行判断则勾选完毕后批量删除按钮还是会在
            this.multipleSelectionFlag = false;
            }
        },
        //批量删除
        multiDelete() {
            this.multiDeleteVisible = false;
            let checkArr = this.multipleSelection;   // multipleSelection存储了勾选到的数据
            let params = [];
            let self = this;
            checkArr.forEach(function (item) {     
                //params.push(item._id);       // 添加所有需要删除数据的id到一个数组，post提交过去
            });
        },
        current_change:function(currpage){
            this.currpage = currpage;
        },
        handleCurrentChange(cpage){
            this.currpage = cpage;
        },
        //判断是否存在页面最大用户数cookie
        isExistPageSize(){
            if(this.$cookies.get('pagesize') === null || this.$cookies.get('pagesize') === undefined || this.$cookies.get('pagesize') === ''){
                this.pagesize = 30;
            }else{
                this.pagesize = parseInt(this.$cookies.get('pagesize'));
            }
        },
        //设置一页可存在最大用户数目
        handleSizeChange(psize) {
            this.$cookies.set('pagesize', psize, 365)
            this.pagesize = psize;
        },

        //获取头像
        getHeadPic(url){
            if(url == '' || url == undefined || url == null){
                return '../../static/img/usermanageicon/user-default-head.png'
            }else{
                return url;
            }
        },
        //设置表格默认背景色
        rowStyle({ row, rowIndex}) {
            if (rowIndex % 2 == 0) {
            return 'background-color:#07203e;height:42px;'
            } else{
            return 'background-color:#093051;height:42px;'
            }
        },
        headerCellStyle(){
            return  'backgroud-color:#0D6087;'
        },
        getSex(val){
            if(val === 0){
            return '男'
            } else{
            return '女'
            }
        },
        //决定表格停启用文字
        getlockeStatus(val){
            if(val === 0){
            return '启用'
            } else{
            return '停用'
            }
        },
        //决定表格停启用文字的颜色
        getlockeClass(val){
            if(val === 0){
            return 'text-green'
            } else{
            return 'text-red'
            }
        },
        //决定表格停启用按钮
        getLockeButtonClass(val){
            if(val === 0){
            return 'btn-red table_button locked_button'
            } else{
            return 'btn-green table_button locked_button'
            }
        },
        //决定表格停启用按钮的状态
        switchStatus(val){
            if(val === 0){
            return '0'
            } else{
            return '1'
            }
        },
        //决定表格停启用按钮的文字
        getLockeText(val){
            if(val === 0){
            return '停用'
            } else{
            return '启用'
            }
        },
        //获取组织机构信息数据
        getDeptTreeData(){
            $axios.get('http://localhost:9090/static/getDeptTreeList.json').then(resultS => {
                let result = resultS.data.dataList;
                deptTreeCache = result;
                console.log(result);
                this.drawTree(result,deptTreeCache);
            });
        },
        //获取用户个人信息数据
        getPersonalUserInfoData(){
            $axios.get('http://localhost:9090/static/getUserInfoDetail.json').then(resultS => {
                let result = resultS.data.dataMap.user;
                console.log(result);
                $('#user-info-content').html(this.getUserViewHtml(result));
                $('#userinfo-view-modal').modal('show');
            });
        },
        //画树状数据结构
        drawTree(data,deptTreeCache) {
            let treeData = this.parsingDataToTree(data,deptTreeCache);
            let modalSetting = {
                view: {
                    showIcon: false,
                    fontCss: { color: '#dedede', "font-size": "20px" }
                },
                callback: {
                    onClick: function (event, treeId, treeNode) {
                        let temp = treeNode;
                        let parentNodes = [];
                        while (true) {
                            if (temp != null) {
                                parentNodes.push(temp);
                                temp = temp.getParentNode();
                            } else {
                                break;
                            }
                        }
                        let htmlValue = `
                            <div class="each-divinner-item">
                                <span class="selected-institutions-value-modal" id="selected-institutions-value" data-dept-id="${treeNode.deptId}">${treeNode.name}</span>
                                <i class="iconfont icon-x-close item-close selected-dept-modal-item-delete">x</i>
                            </div>
                        `;
                        $('#dept-selected-area').html(htmlValue);
                    }
                },
            };
            $.fn.zTree.init($('#dept-selector-tree'), modalSetting, treeData);
            let selectorSetting = {
                view: {
                    showIcon: false,
                    fontCss: { color: '#000', "font-size": "15px" }
                },
                callback: {
                    onClick: function (event, treeId, treeNode) {
                        $('#dept-query-selector-input').html(treeNode.name);
                        $('#dept-query-selector-input').attr('data-dept-id', treeNode.deptId);
                        $('#dept-query-selector-remove').css('display', 'block');
                        console.log(treeNode.deptId);
                    }
                },
            };
            $.fn.zTree.init($('#dept-query-selector-tree'), selectorSetting, treeData);
        },
        //将数控处理成树状数据
        parsingDataToTree(data,deptTreeCache) {
            let layerIndex = data[0].layer;
            let treeData = [];
            function getTreeEval(layer) {
                let defaultValue = 'treeData';
                for (let i = layerIndex; i < layer; i++) {
                    defaultValue = `${defaultValue}[${defaultValue}.length - 1].children`;
                }
                return (defaultValue);
            }
            for (let i = 0; i < data.length; i++) {
                if (data[i].name != '') {
                    eval(`
                        if (${getTreeEval(data[i].layer)} == null) {
                            ${getTreeEval(data[i].layer)} = [];
                        }
                        ${getTreeEval(data[i].layer)}.push({ name: data[i].name, open: true, deptId: data[i].deptId });
                    `);
                }
            }
        
            return treeData;
        },
        //查看用户信息模态框
        getUserViewHtml(data) {
            console.log(data)
            let roleValue = ``;
            if (data.roleList != null) {
                for (let i = 0; i < data.roleList.length; i++) {
                    roleValue = roleValue + `
                        ${data.roleList[i].roleName}${i == data.roleList.length - 1 ? '' : '，'}
                    `;
                }
            }
            /* 防止出现null*/
            function removeNull(val1,val2) {
                if(val1==null&&val2!=null){
                    return ''+'&nbsp;&nbsp;&nbsp;'+' 至 '+ formatDate(val2,'yyyy-MM-dd hh:mm:ss')
                }
                if(val1!=null&&val2==null){
                    return formatDate(val1,'yyyy-MM-dd hh:mm:ss')+' 至 永久';
                }
                if(val1!=null&&val2!=null){
                    return formatDate(val1,'yyyy-MM-dd hh:mm:ss')+' 至 '+ formatDate(val2,'yyyy-MM-dd hh:mm:ss');
                }
                if(val1==null&&val2==null){
                    return  '永久';
                }
            };
            let html2='';
            let html3='';
            /*add by guoshuai start 2018-9-12 content:判断是否有dwPerms*/
            if(data.dwPerms) {
                let dwPerms = data.dwPerms;
                if(dwPerms.devUseType==1){
                    html2="本人下属设备"
                    
                }else if(dwPerms.devUseType==2){
                    html2="本人及所在单位设备";
                    
                }else if(dwPerms.devUseType==3){
                    html2='本人及所在单位及下属单位设备';
                
                }else if(dwPerms.devUseType==4){
                    html2='系统内全部设备';
                
                }else if(dwPerms.devUseType==5){
                    html2='不限';
                
                }
                if(dwPerms.phoneUseType==1){
                    html3='本人下属手机号';
                    
                }else if(dwPerms.phoneUseType==2){
                    html3='本人及所在单位手机号';
                
                }else if(dwPerms.phoneUseType==3){
                    html3='本人及所在单位及下属单位手机号';
                    
                }else if(dwPerms.phoneUseType==4){
                    html3='系统内全部手机号';
                    
                }else if(dwPerms.phoneUseType==5){
                    html3='不限';
                    
                }
            }else{
                $('.user-info-value-2').html('');
                $('.user-info-value-1').html('');
            }
            /*add by guoshuai end 2018-9-12 content:判断是否有dwPerms*/
            let deptNameValue = ``;
            if (data.deptId != null) {
                for (let i = 0; i < deptTreeCache.length; i++) {
                    if (data.deptId == deptTreeCache[i].deptId) {
                        deptNameValue = deptTreeCache[i].name;
                        break;
                    }
                }
            }
            let htmlValue = `
                <div class="user-name-area">
                    <div class="user-pic">
                        <img id="user-pic-show" src="../../static/img/user_pic_default.png"
                            onerror='this.src="../../static/img/user_pic_default.png"' style="width:80px;">
                    </div>
                    <div class="user-name abbreviation" title="${data.username}">
                        ${data.username}
                    </div>
                </div>
                <div class="user_info_detail_modal_div">
                    <div class="user_info_detail_modal_div_left">
                        <span class="user_info_detail_modal_div_span_left">真实姓名</span>
                        <span class="user_info_detail_modal_div_span_right">${data.realname}</span>
                    </div>
                    <div class="user_info_detail_modal_div_right">
                        <span class="user_info_detail_modal_div_span_left">性别</span>
                        <span class="user_info_detail_modal_div_span_right">${data.sex == 0 ? '男' : '女'}</span>
                    </div>
                </div>
                <div class="user_info_detail_modal_div">
                    <div class="user_info_detail_modal_div_left">
                        <span class="user_info_detail_modal_div_span_left">手机号</span>
                        <span class="user_info_detail_modal_div_span_right">${data.tel = null ? '' : data.tel}</span>
                    </div>
                    <div class="user_info_detail_modal_div_right">
                        <span class="user_info_detail_modal_div_span_left">登录短信验证</span>
                        <span class="user_info_detail_modal_div_span_right"></span>
                    </div>
                </div>
                <div class="user_info_detail_modal_div">
                    <div class="user_info_detail_modal_div_left">
                        <span class="user_info_detail_modal_div_span_left">角色</span>
                        <span class="user_info_detail_modal_div_span_right">${roleValue}</span>
                    </div>
                    <div class="user_info_detail_modal_div_right">
                        <span class="user_info_detail_modal_div_span_left">所属单位</span>
                        <span class="user_info_detail_modal_div_span_right">${deptNameValue}</span>
                    </div>
                </div>
                <div class="user_info_detail_modal_div">
                    <div class="user_info_detail_modal_div_left">
                        <span class="user_info_detail_modal_div_span_left">上次登录IP</span>
                        <span class="user_info_detail_modal_div_span_right">${data.lastLoginIp == null ? '' : data.lastLoginIp}</span>
                    </div>
                    <div class="user_info_detail_modal_div_right">
                        <span class="user_info_detail_modal_div_span_left">创建时间</span>
                        <span class="user_info_detail_modal_div_span_right">${data.createTime == null ? '' : formatDate(new Date(data.createTime),'yyyy-MM-dd hh:mm:ss')}</span>
                    </div>
                </div>
                <div class="user_info_detail_modal_div_last">
                    <div class="user_info_detail_modal_div_last_left">
                        <span class="user_info_detail_modal_div_last_span_left">绑定IP</span>
                        <span class="user_info_detail_modal_div_last_span_right"></span>
                    </div>
                    <div class="user_info_detail_modal_div_last_right">
                        <div class="user_info_detail_modal_div_right">
                            <span class="user_info_detail_modal_div_span_left">上次登录时间</span>
                            <span class="user_info_detail_modal_div_span_right">${data.lastLoginTime == null ? '' : formatDate(new Date(data.lastLoginTime),'yyyy-MM-dd hh:mm:ss')}</span>
                        </div>
                        <div class="user_info_detail_modal_div_right">
                            <span class="user_info_detail_modal_div_span_left">账号停启用</span>
                            <span class="user_info_detail_modal_div_span_right">${data.locked == 0 ? '<span class="text-green">已启用</span>' : '<span class="text-red">已停用</span>'}</span>
                        </div>
                    </div>
                </div>
            `;
            return htmlValue;
        },
        //修改用户个人信息
        updateUserPersonalInfo(){
            $axios.get('http://localhost:9090/static/getUserInfoDetail.json').then(resultS => {
                let result = resultS.data.dataMap.user;
                $('#user-input-modal').html(this.getUserInputHtml(2, result));
                $('#user-modal').modal('show');
            });
        },
        //新增或修改模态框
        getUserInputHtml(type, data) {
            /* 重置各面板*/
            $('#dept-selected-area').html('');
            $('#role-selected-area').html('');
            let treeObj = $.fn.zTree.getZTreeObj('dept-selector-tree');
            treeObj.cancelSelectedNode();
            $('.role-checkbox-item').prop('checked', false);
            /* */
            let htmlValue = '';
            let roleListHtml = '';
            if (roleListCache != null) {
                for (let i = 0; i < roleListCache.length; i++) {
                roleListHtml = roleListHtml + `
                    <li><a class="dropdown-menu-selector role-selector" data-role-id="${roleListCache[i].roleId}">${roleListCache[i].roleName}</a></li>
                `;
                }
            }
            //获取头像
            function getHeadPic(url){
                if(url == '' || url == undefined || url == null){
                    return "../../static/img/user_pic_default.png"
                }else{
                    return url;
                }
            }
            switch (type) {
                case 1:
                    htmlValue = `
                        <div class="modal-header" style="/*add by gs*/ width:95%;margin-left:20px;/*end*/">
                            <h4 class="modal-title h4-add">添加用户</h4>
                            <button type="button" class="close" style="color: #dedede" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" class="add-user-close"></span>
                            </button>
                        </div>
                        <div class="modal-body" style="margin-left:20px; height:402px;">
                            <!--<div class="user-name-area">
                                <div class="user-pic">
                                    <img id="user-pic-show" src="img/user_pic_default.png"
                                        onerror='this.src="img/user_pic_default.png"' style="width:80px;">
                                    <div class="outer-cover" data-toggle="modal"
                                        data-target="#change-user-pic-modal">点击添加</div>
                                </div>
                            </div>-->
                            <div class="user_info_modal_input_div" style="margin-top: 50px;">
                                <div class="input-group input-group-sm modal-input" style="float:left;">
                                    <span class="input-group-addon modal-input-title"><span class="text-red start_span">*</span>&nbsp;用户名</span>
                                    <input type="text" class="modal-input-area modal-input-background input-space-forbidden-user user-modal-input" id="username-input" maxlength="16">
                                    <span class="input-check" id="is-have-user" style="position: absolute;"></span>
                                </div>
                                <div class="input-group input-group-sm modal-input" style="float:left;">
                                    <span class="input-group-addon modal-input-title"><span class="text-red start_span">*</span>&nbsp;真实姓名</span>
                                    <input type="text" class="modal-input-area modal-input-background input-space-forbidden user-modal-input" id="realname-input" maxlength="16">
                                    <span class="input-check" id="is-realname-input"></span>
                                </div>
                            </div>
                            <div class="user_info_modal_input_div">
                                <div class="input-group input-group-sm modal-input user-password-input" style="float:left;">
                                    <span class="input-group-addon modal-input-title"><span class="text-red start_span">*</span>&nbsp;密码</span>
                                    <input type="password" class="modal-input-area modal-input-background password-input input-space-forbidden-password user-modal-input" id="password-input" maxlength="16" autocomplete="new-password">
                                </div>
                                <div class="input-group input-group-sm modal-input" style="float:left;">
                                    <span class="input-group-addon modal-input-title"><span class="text-red start_span">*</span>&nbsp;角色</span>
                                    <div class="role-input-container user-modal-input" id="role-input-container-value" data-role-id="" data-type="add"></div>
                                    <span class="input-check" id="is-role-true"></span>
                                </div>
                            </div>
                            <div class="user_info_modal_input_div">
                                <div class="input-group input-group-sm modal-input user-password-input" style="float:left;">
                                    <span class="input-group-addon modal-input-title"><span class="text-red start_span">*</span>&nbsp;确认密码</span>
                                    <input type="password" class="modal-input-area modal-input-background password-input input-space-forbidden-password user-modal-input" id="repassword-input" maxlength="16" autocomplete="new-password">
                                    <span class="input-check" id="is-pwd-true"></span>
                                </div>
                                <div class="input-group input-group-sm modal-input" style="float:left;">
                                    <span class="input-group-addon modal-input-title"><span class="text-red start_span">*</span>&nbsp;所属机构</span>
                                    <div class="dept-input-container user-modal-input" id="dept-input-container-value" data-dept-id="" data-type="add"></div>
                                    <span class="input-check" id="is-dept-true"></span>
                                </div>
                            </div>
                            <div class="user_info_modal_input_div">
                                <div class="input-group input-group-sm modal-input" style="float:left;">
                                    <span class="input-group-addon modal-input-title"><span class="text-red start_span">*</span>&nbsp;手机号</span>
                                    <input type="text" data-type="${type}" class="modal-input-area modal-input-background input-space-forbidden input-num-only user-modal-input" id="tel-input" maxlength="11">
                                    <span class="input-check" id="is-tel-true"></span>
                                </div>
                                <div class="input-group input-group-sm modal-input" style="float:left;">
                                <span class="input-group-addon modal-input-title">性别</span>
                                <div class="btn-group">
                                    <button type="button" id="sex-button"
                                        style="width: 200px; text-align: left; border: 1px solid #174275; background: #011731 ; color: #fff; margin-left:16px;"
                                        class="btn btn-default btn-sm dropdown-toggle"
                                        data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">
                                        <span id="sex-input">男</span> <span class="caret" style="float: right; margin-top: 6px;"></span>
                                    </button>
                                    <ul class="dropdown-menu" style="width: 200px; background: #08264a ;">
                                        <li class="dropdown-menu-selector gender-selector" data-sex=0>男</li>
                                        <li class="dropdown-menu-selector gender-selector" data-sex=1>女</li>
                                    </ul>
                                </div>
                            </div>
                            </div>
                            <div class="user_info_modal_input_div">
                                <div class="input-group input-group-sm modal-input" style="float:left;">
                                    <span class="input-group-addon modal-input-title" style="position: relative;">登录短信验证</span>
                                    <div class="user_login_message_verification" data-status="0">
                                        <span class="user_login_message_verification_ball"></span>
                                    </div>
                                </div>
                                <div class="input-group input-group-sm modal-input" style="float:left;">
                                    <span class="input-group-addon modal-input-title">绑定IP</span>
                                    <input type="text" class="modal-input-area modal-input-background input-space-forbidden input-znch-forbidden user-modal-input" id="binding-ip-input" placeholder="多个IP请用“/”隔开">
                                    <span class="input-check" id="is-ip-true"></span>
                                </div>
                            </div>
                            <div class="modal-input" id="content-tips" style="margin-top: 15px; display: block;margin-left:10px;">
                                <span style="margin-left: 35px;">
                                    注：带 "<span class="text-red">*</span>"为必填项
                                </span>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" id="user-modal-submit-add">确认添加</button>
                            <button type="button" class="btn btn-default" data-dismiss="modal" id="user-modal-submit-cancel">取消</button>
                        </div>
                    `;
                    break;
                case 2:
                    let deptName;
                    if (deptTreeCache != null && data.deptId != null) {
                        for (let i = 0; i < deptTreeCache.length; i++) {
                            if (data.deptId == deptTreeCache[i].deptId) {
                                deptName = deptTreeCache[i].name;
                                break;
                            }
                        }
                    }
                    /* 设置角色*/
                    let roleNameInputHtml = '';
                    let roleNamePanelHtml = '';
                    $('.role-checkbox-item').prop('checked', false);
                    if (roleListCache != null && data.roleList != null) {
                        for (let i = 0; i < data.roleList.length; i++) {
                            for (let j = 0; j < roleListCache.length; j++) {
                                if (data.roleList[i].roleId == roleListCache[j].roleId) {
                                    roleNameInputHtml = roleNameInputHtml + `
                                        <div class="each-divinner-item selected-role-items-in-input">
                                            <span class="selected-role-value-in-input" data-role-id="${data.roleList[i].roleId}">${data.roleList[i].roleName}</span>
                                        </div>
                                    `;
                                    roleNamePanelHtml = roleNamePanelHtml + `
                                        <div class="each-divinner-item selected-role-items-in-panel selected-role-id-${data.roleList[i].roleId}" data-role-id="${data.roleList[i].roleId}" data-role-name="${data.roleList[i].roleName}">
                                            <span class="selected-role-value-in-panel">${data.roleList[i].roleName}</span>
                                            <i class="iconfont icon-x-close item-close selected-role-delete" data-role-id="${data.roleList[i].roleId}">x</i>
                                        </div>
                                    `;
                                    $(`.role-checkbox-item-${data.roleList[i].roleId}`).prop('checked', true);;
                                    break;
                                }
                            }
                        }
                    };
                    $('#role-selected-area').html(roleNamePanelHtml);
                    /* HTML*/
                    htmlValue = `
                        <div class="modal-header">
                            <h4 class="modal-title h4-update">修改用户信息</h4>
                            <button type="button" class="close" style="color: #dedede" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" class="add-user-close"></span>
                            </button>
                        </div>
                        <div class="modal-body" style="margin-left:20px;height: 402px;">
                            <div class="user-name-area">
                                <div class="user-pic">
                                    <img id="user-pic-show" src=${getHeadPic(data.headAddr)}
                                        onerror='this.src=${getHeadPic(data.headAddr)}' style="width:80px;height:80px;border-radius: 50%;">
                                </div>
                                <div class="user-name abbreviation" title="${data.username}">
                                    ${data.username}
                                </div>
                            </div>
                            <div class="user_info_modal_input_div">
                                <div class="input-group input-group-sm modal-input" style="float:left;">
                                    <span class="input-group-addon modal-input-title"><span class="text-red start_span">*</span>&nbsp;真实姓名</span>
                                    <input value="${data.realname}" type="text" class="modal-input-area modal-input-background input-space-forbidden user-modal-input" id="realname-input" maxlength="16">
                                    <span class="input-check" id="is-realname-input"></span>
                                </div>
                                <div class="input-group input-group-sm modal-input" style="float:left;">
                                    <span class="input-group-addon modal-input-title"><span class="text-red start_span">*</span>&nbsp;角色</span>
                                    <div class="role-input-container" id="role-input-container-value" data-role-id="" data-type="update">
                                        ${roleNameInputHtml}
                                    </div>
                                    <span class="input-check" id="is-role-true"></span>
                                </div>
                            </div>
                            <div class="user_info_modal_input_div">
                                <div class="input-group input-group-sm modal-input user-password-input" style="float:left;">
                                    <span class="input-group-addon modal-input-title">新密码</span>
                                    <input type="password" class="modal-input-area modal-input-background password-input input-space-forbidden user-modal-input" id="password-input" maxlength="16">
                                </div>
                                <div class="input-group input-group-sm modal-input" style="float:left;">
                                    <span class="input-group-addon modal-input-title"><span class="text-red start_span">*</span>&nbsp;所属机构</span>
                                    <div class="dept-input-container" id="dept-input-container-value" data-dept-id="${data.deptId == null ? '' : data.deptId}" data-type="update">${deptName == null ? '' : deptName}</div>
                                    <span class="input-check" id="is-dept-true"></span>
                                </div>
                            </div>
                            <div class="user_info_modal_input_div">
                                <div class="input-group input-group-sm modal-input user-password-input" style="float:left;">
                                    <span class="input-group-addon modal-input-title">确认密码</span>
                                    <input type="password" class="modal-input-area modal-input-background password-input input-space-forbidden user-modal-input" id="repassword-input" maxlength="16">
                                    <span class="input-check" id="is-pwd-true"></span>
                                </div>
                                <div class="input-group input-group-sm modal-input" style="float:left;">
                                    <span class="input-group-addon modal-input-title">性别</span>
                                    <div class="btn-group">
                                        <button type="button" id="sex-button"
                                            style="width: 200px; text-align: left; border: 1px solid #174275; background: #011731; color: #fff; margin-left:16px;"
                                            class="btn btn-default btn-sm dropdown-toggle"
                                            data-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">
                                            <span id="sex-input">${data.sex == 0 ? '男' : '女'}</span> <span class="caret" style="float: right; margin-top: 6px;"></span>
                                        </button>
                                        <ul class="dropdown-menu" style="width: 200px; background: #08264a;">
                                            <li class="dropdown-menu-selector gender-selector" data-sex=0>男</li>
                                            <li class="dropdown-menu-selector gender-selector" data-sex=1>女</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="user_info_modal_input_div">
                                <div class="input-group input-group-sm modal-input" style="float:left;">
                                    <span class="input-group-addon modal-input-title"><span class="text-red start_span">*</span>&nbsp;手机号</span>
                                    <input value="${data.tel}" type="text" data-type="${type}" data-user-name="${data.username}" class="modal-input-area modal-input-background input-space-forbidden input-num-only user-modal-input" id="tel-input" maxlength="11">
                                    <span class="input-check" id="is-tel-true"></span>
                                </div>
                                <div class="input-group input-group-sm modal-input" style="float:left;">
                                    <span class="input-group-addon modal-input-title">绑定IP</span>
                                    <input type="text" class="modal-input-area modal-input-background input-space-forbidden input-znch-forbidden user-modal-input" id="binding-ip-input" placeholder="多个IP请用“/”隔开">
                                    <span class="input-check" id="is-ip-true"></span>
                                </div>
                            </div>
                            <div class="user_info_modal_input_div">
                                <div class="input-group input-group-sm modal-input" style="float:left;">
                                    <span class="input-group-addon modal-input-title" style="position: relative;">登录短信验证</span>
                                    <div class="user_login_message_verification" data-status="0">
                                        <span class="user_login_message_verification_ball"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-input" id="content-tips" style="margin-top: 15px; display: block;margin-left:10px;width:440px;">
                                <span style="margin-left: 35px;">
                                    注：带 "<span class="text-red">*</span>"为必填项
                                </span>
                            </div>    
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" id="user-modal-submit-update">确认修改</button>
                            <button type="button" class="btn btn-default" data-dismiss="modal" id="user-modal-cancel-update">取消</button> 
                        </div>
                    `;
                    break;
                default:
                    break;
            }
            return htmlValue;
        },
        /* 停启用*/
        stopSwicth (val1,val2) {
            if(val2 == 0){
                $('.locked_button').eq(val1).children().eq(0).html('启用');
                $('.locked_button').eq(val1).addClass('btn-green');
                $('.locked_button').eq(val1).removeClass('btn-red');
            } else{
                $('.locked_button').eq(val1).children().eq(0).html('停用');
                $('.locked_button').eq(val1).removeClass('btn-green');
                $('.locked_button').eq(val1).addClass('btn-red');
            }
        },
        //打开新增用户模态框
        addUser(){
            $('#user-input-modal').html(this.getUserInputHtml(1, null));
            $('#user-modal').modal('show');
        },
        //性别选择
        sexSelect(){
            $(document).on('click','.gender-selector',function(){
                let val = $(this).attr('data-sex')
                if(val == 0){
                    $('#sex-input').html('男');
                } else {
                    $('#sex-input').html('女');
                }
            }) 
        },
        //添加用户
        addUserOperation(){
            let self = this;
            $(document).on('click','#user-modal-submit-add',function(){
                newUser = {
                    "id": 135,
                    "username": $('#username-input').val(),
                    "realname": $('#realname-input').val(),
                    "password": "3fd8551cb386ea5db65d65a714e5a9bc",
                    "salt": "83e7bae8efe4c63e9c228e6669e49cb1",
                    "headAddr": "https://jt-cloud.oss-cn-beijing.aliyuncs.com/cbcp/res/images/20190422165211.jpg",
                    "sex": 0,
                    "tel": "13666666667",
                    "deptId": 1,
                    "deptName": "顶级机构",
                    "lastLoginIp": "10.10.1.1",
                    "lastLoginTime": 1554712924000,
                    "locked": 0,
                    "status": 1,
                    "type": 1,
                    "createrId": 9,
                    "createTime": 1553917921000,
                    "updaterId": 125,
                    "updateTime": 1555918838000,
                    "handleCaseSeq": null,
                    "roleList": null,
                    "dwPerms": null,
                    "taPerms": null,
                    "dept": null,
                    "credentialsSalt": "piyingjie83e7bae8efe4c63e9c228e6669e49cb1"
                };
                $('#user-modal').modal('hide');
                self.getUserList();
            })
        },
        //打开组织选择框
        popupDeptSelect(){
            $(document).on('click','#dept-input-container-value',function(){
                $('#dept-selector-modal').modal('show');
            })
        },
        /* 选取上级组织modal确定*/
        deptSelectEnsure(){
            $(document).on('click','#dept-selector-ensure',function () {
                let deptName = $('#selected-institutions-value').html();
                let deptId = $('#selected-institutions-value').attr('data-dept-id');
                if (deptName != null && deptId != null) {
                    $('#dept-input-container-value').html(`${deptName == null ? '' : deptName}`);
                    $('#dept-input-container-value').attr('data-dept-id', `${deptId == null ? '' : deptId}`);
                }
            });
        },
        //打开组织选择框
        popupRoleSelect(){
            $(document).on('click','#role-input-container-value',function(){
                $('#role-selector-modal').modal('show');
            })
        },
        /* 获取角色列表*/
        getRoleList(){
            $axios.get('http://localhost:9090/static/getRoleList.json').then(resultS => {
                
                    roleListCache = resultS.data.dataList;
                    this.roleSelectorPanel(resultS.data.dataList);
                })
        },
        //画出角色关系
        roleSelectorPanel(data){
            let htmlValue = '';
            let selectorValue = '';
            for (let i = 0; i < data.length; i++) {
                /* 模态框内容*/
                htmlValue = htmlValue + `
                    <div class="role-selector-each-items">
                        <label class="mdui-checkbox">
                            <input type="checkbox" data-role-id="${data[i].roleId}" data-role-name="${data[i].roleName}" class="role-checkbox-item role-checkbox-item-${data[i].roleId}"/>
                            <i class="mdui-checkbox-icon"></i>
                            <span class="role-selector-each-items-words" style="margin-left:25px;">${data[i].roleName}</span>
                        </label>
                    </div>
                `;
                /* 页面搜索下拉框内容*/
                selectorValue = selectorValue + `
                    <li><a class="role-selector-item" data-role-id="${data[i].roleId}">${data[i].roleName}</a></li>
                `;
            }
            $('#role-selector-panel').html(htmlValue);
            $('#role-selector-container').html(selectorValue);
        },
        //选取角色
        roleSelectEnsure(){
            /* 角色选择CheckBox*/
            $(document).on('change', '.role-checkbox-item', function () {
                if ($(this).is(':checked')) {
                    let htmlValue = `
                        <div class="each-divinner-item selected-role-items-in-panel selected-role-id-${$(this).attr('data-role-id')}" data-role-id="${$(this).attr('data-role-id')}" data-role-name="${$(this).attr('data-role-name')}">
                            <span class="selected-role-value-in-panel">${$(this).attr('data-role-name')}</span>
                            <i class="iconfont icon-x-close item-close selected-role-delete" data-role-id="${$(this).attr('data-role-id')}">x</i>
                        </div>
                    `;
                    $('#role-selected-area').append(htmlValue);
                } else {
                    $(`.selected-role-id-${$(this).attr('data-role-id')}`).remove();
                }
            });
            /* 角色选择项删除*/
            $(document).on('click', '.selected-role-delete', function () {
                $(`.role-checkbox-item-${$(this).attr('data-role-id')}`).prop('checked', false);
                $(`.selected-role-id-${$(this).attr('data-role-id')}`).remove();
            });
            /* 角色选择确定*/
            $(document).on('click','#role-selector-ensure',function () {
                let htmlValue = '';
                for (let i = 0; i < $('.selected-role-items-in-panel').length; i++) {
                    htmlValue = htmlValue + `
                        <div class="each-divinner-item selected-role-items-in-input">
                            <span class="selected-role-value-in-input" data-role-id="${$($('.selected-role-items-in-panel')[i]).attr('data-role-id')}">${$($('.selected-role-items-in-panel')[i]).attr('data-role-name')}</span>
                        </div>
                    `;
                }
                $('#role-input-container-value').html(htmlValue);
                if (htmlValue != '') {
                    $('#is-role-true').html('');
                }
            });
        },
        //删除用户
        deleteRow(index, rows) {
            rows.splice(index, 1);
        },
        //搜索栏 角色选择
        searchRoleSelect(){
            $(document).on('click', '.role-selector-item', function () {
                $('#role-selector-input').html($(this).html());
                $('#role-selector-input').attr('data-role-id', $(this).attr('data-role-id'));
                $('#role-selector-remove').css('display', 'block');
            });
        },
    },
    mounted(){
        this.getUserList();
        this.isExistPageSize();
        this.getDeptTreeData();
        this.sexSelect();
        this.addUserOperation();
        this.popupDeptSelect();
        this.deptSelectEnsure();
        this.popupRoleSelect();
        this.roleSelectEnsure();
        this.getRoleList();
        this.searchRoleSelect();
    },
  }
　　　　
</script>
<style scoped>
  @import "../../static/css/common.css"; 
  @import "../../static/css/table-view.css";
  @import '../../static/css/page/userManage.css';
</style>
<style type="text/css" scoped>
  /deep/ .cell{
    text-align:center;
    color:#fff !important;
  }
  /deep/ .el-table th{
    background-color:#0D6087;
    height:42px;
  }
  /deep/ .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: rgba(0,0,0,0) !important;
  }
  .head_pic{
    width:38px;
    height:34px; 

    margin-top:1px; 
    display: block;
    border-radius:50%;
  }
  /deep/ .el-table td{
    padding: 0 !important;
    border-right:1px solid #174275;
    border-bottom: 1px solid #174275;
  }
  /deep/ .el-table th{
    padding: 0 !important;
    border-right:1px solid #174275;
    border-bottom: 1px solid #174275;
    
  }
  /deep/ .el-table::before{
    background-color: #174275;
  }
  /deep/ .view-data-table{
    border-left:1px solid #174275;
  }
  /deep/ .el-table th:nth-of-type(1){
    border-left:1px solid #174275;
  }
  .el-pagination{
    padding-left: 32%;
    margin-top: 36px;
  }
  /deep/ .el-pagination__total{
    color:#fff;
  }
  /deep/ .el-pagination__jump{
    color:#fff;
  }
  .table_button{
    padding:5px;
  }
  .add_user_div{
      height: 35px;
      background: #081A32;
      border: 1px solid #174275;
  }
  .add_user{
    float: left;
    width: 50px;
    height: 28px;
    margin-left: 4px;
    margin-top: 4px;
    line-height:15px;
    cursor: pointer;
  }
  .delete_user{
    float: left;
    width: 50px;
    height: 28px;
    margin-left: 6px;
    margin-top: 4px;
    line-height:15px;
    cursor: pointer;
  }
</style>
