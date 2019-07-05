<template>
  <div style="margin-top: 48px;">
    <div class="add_user_div">
        
        <button class="table_button btn-green export_excel">导出</button>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData.slice((currpage-1)*pagesize,currpage*pagesize)"
      tooltip-effect="dark"
      style="width: 100%"
      :row-style ="rowStyle"
      :header-cell-style ="headerCellStyle"
      class ="view-data-table"
     >
      
      <el-table-column
        prop="caseName"
        label="案件名称"
        width="100">
      
      </el-table-column>
      <el-table-column
        prop="username"
        label="工作对象">
      </el-table-column>
      <el-table-column
        prop="realname"
        label="电信标识码"
        width="120">
      </el-table-column>
      <el-table-column
        prop="imsi"
        label="IMSI码"
        width="120">
      </el-table-column>
      <el-table-column
        prop="imei"
        label="IMEI码"
        width="120">
      </el-table-column>
      <el-table-column
        prop="devCode"
        label="设备名称">
      </el-table-column>
      <el-table-column
        prop="applicantName"
        label="办案人账号">
      </el-table-column>
      <el-table-column
        prop="applicantRealName"
        label="办案人">
      </el-table-column>
      <el-table-column
        prop="applicantDeptName"
        label="所属机构">
      </el-table-column>
      <el-table-column
        prop="applyTime"
        label="办案时间"> 
      </el-table-column>
      <el-table-column 
        prop="remark"
        label="备注">
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
      

      }
    },
    methods: {
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
        getEnforceLogData(){
            $axios.get('http://localhost:9090/static/enforceLog.json').then(resultS => {
                let result = resultS.data.pageInfo.list;
                console.log(result);
                this.tableData = result;
                this.total =  resultS.data.pageInfo.list.length;
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
    },
    mounted(){
        this.isExistPageSize();
        this.getDeptTreeData();
        this.getEnforceLogData();
    
        this.deptSelectEnsure();
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
  .export_excel{
    float: left;
    width: 50px;
    height: 28px;
    margin-left: 6px;
    margin-top: 4px;
    line-height:15px;
    cursor: pointer;
  }
</style>
