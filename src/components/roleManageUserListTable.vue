<template>
  <div style="margin-top: 48px;" id="user_list_table">
    <el-table
      ref="multipleTable"
      :data="tableData.slice((currpage-1)*pagesize,currpage*pagesize)"
      tooltip-effect="dark"
      :row-style ="rowStyle"
      :header-cell-style ="headerCellStyle"
      class ="view-data-table"
      @selection-change="handleSelectionChange">
     
      <el-table-column
        label="账号"
        prop="username">
      </el-table-column>
      <el-table-column
        prop="realname"
        label="真实姓名">
      </el-table-column>
      <el-table-column
        label="性别">
        <template slot-scope="scope">
          {{getSex(scope.row.sex)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="tel"
        label="手机号"
        >
      </el-table-column> 
      <el-table-column
        label="停启用" width="80px">
        <template slot-scope="scope">
          <span :class="getlockeClass(scope.row.status)">{{getLockeText(scope.row.status)}}</span>
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
  import { GPSToBaiduPoint } from '../../static/lib/GPSToBaiduPoint.BaiduMap.js' 
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
        //决定表格停启用文字
        getLockeText(val){
            if(val === 0){
            return '启用'
            } else{
            return '停用'
            }
        },
        //决定表格停启用文字的颜色
        getlockeClass(val){
            if(val === 2){
                return 'text-green'
            } else if(val === 3){
                return 'text-red'
            } else if(val === 1){
                return 'text-orange'
            }
        },
        getSex(val){
            if(val === 0){
            return '男'
            } else{
            return '女'
            }
        },
        //获取角色列表数据
        getRoleManageUserListData(){
            $axios.get('http://localhost:9090/static/getRoleMangeUserList.json').then(resultS => {
                let result = resultS.data.pageInfo.list;
                this.tableData = result;
                this.total =  resultS.data.pageInfo.length;

                console.log(result);
            });
        },
    },
    mounted(){
        this.getRoleManageUserListData();
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
      width:96%;
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
  /deep/ .mapView{
    background: url(../../static/img/iconpic/GPSIcon.png) no-repeat;
    width: 24px;
    height: 24px;
    border: none;
    margin: 0 auto;
    cursor: pointer;
  }
</style>
