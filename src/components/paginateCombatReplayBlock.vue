<template>
  <div style="margin-top: 48px;">
    <div class ="view-data-table">
      <el-table
      ref="multipleTable"
      :data="tableData.slice((currpage-1)*pagesize,currpage*pagesize)"
      tooltip-effect="dark"
      :show-header="false"
      >
        <el-table-column>
          <template slot-scope="scope">
            <div class="case-jt-block">
                <div id="cjb-box1">
                    <div class="case-jt-logo">
                        <div id="cjl-cont">
                            <span></span>
                            <span>{{getContinuousTime2(scope.row.startTime, scope.row.endTime)}}</span>
                        </div>
                    </div>
                    <div class="case-jt-simple">
                        <div class="cjs-address">
                            <span>作战地址&nbsp;:</span>
                            <p style="width: 124px;height: 20px;">{{removeNull(scope.row.areaFullName)}}</p>
                        </div>
                        <div class="cjs-date">
                            <span>日期&nbsp;:</span>
                            <p style="margin-left: 28px;">{{getStartTime(scope.row.endTime)}}</p>
                        </div>
                    </div>
                </div>
                <div id="cjb-box2">
                    <div class="case-jt-name">
                        <span>作战成员&nbsp;:</span>
                        <span title="${getUserList(scope.row.userList)}" style="
                            width: 160px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        ">{{getUserList(scope.row.userList)}}</span>
                        <div class="mdui-ripple command-btn command-btn-combat" data-tr-index="${i}"></div>
                    </div>
                    <div class="case-jt-detailed">
                        <div>
                            <span>地址&nbsp;:</span>
                            <span title="${removeNull(scope.row.areaFullName)}">{{removeNull(scope.row.areaFullName)}}</span>
                        </div>
                        <div>
                            <span>时间&nbsp;:</span>
                            <span>{{getStartTime(scope.row.startTime)}}-{{getStartTime(scope.row.endTime)}}</span>
                        </div>
                        <div>
                            <span>设备&nbsp;:</span>
                            <span style="text-align:left;overflow: hidden; text-overflow: ellipsis; width:200px;height:40px;white-space: nowrap;">{{getDevList(scope.row.devList)}}</span>
                        </div>
                    </div>
                </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
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

  export default {
    components:{
        
    },
    data() {
      return {
        tableData: [],
        pagesize: 10,
        currpage: 1,
      }
    },
    methods: {
        //获取案件历史列表数据
        getCaseList() {
            $axios.get('http://localhost:9090/static/getHistoryCaseInfoList.json').then(resultS => {
                let result = resultS.data.pageInfo.list;
                console.log(result);
                this.tableData = result;
                this.total =  resultS.data.pageInfo.list.length;

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
      //去空操作
      removeNull(val) {
          if (val && typeof(val) != "undefined") {
              return val;
          } else {
              return '';
          }
      },
      //解决案件时长小于1分钟时显示为0的问题
      getContinuousTime2(startTime, endTime) {
          let sec = parseInt((endTime - startTime) / 1000);
          let minute = parseInt(sec / 60);
          if( minute <= 0){
              return '1min';
          }else{
              return minute+ 'min';
          }
      },
      //处理时间串函数
      getStartTime(value) {
          return formatDate(new Date(value),'yyyy-MM-dd');
      },
      //处理用户串显示用户名
      getUserList(list) {
          let value = '';
          for (let i = 0; i < list.length; i++) {
              value = value + list[i].username + '/' + list[i].handleCaseSeq + '，';
          }
          return value.substring(0, value.length - 1);
      },
      //处理设备字符串，得到设备信息
      getDevList(list){
        let value = '';
          for (let i = 0; i < list.length; i++) {
              value = value + list[i].devCode + '，';
          }
          return value.substring(0, value.length - 1);
      },

    },
    mounted(){
      this.getCaseList();
      this.isExistPageSize();
    },
  }
　　　　
</script>
<style scoped>
  @import "../../static/css/common.css"; 
  @import "../../static/css/table-view.css";
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
    border-right:none;
  }
  /deep/ .el-table th{
    padding: 0 !important;
    border-right:1px solid #174275;
    border-bottom: 1px solid #174275;
    
  }
  /deep/ .el-table::before{
    display: none;
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
  /deep/ .el-table .cell{
    padding-left: 0;
  }
  /deep/ .command-btn{
    border:none;
  }
  /deep/ .el-table tr{
    background-color: #212529;
    float: left;
    width: 280px;
    height: 170px;
    display: grid;
    margin-left: 12px;
    margin-right: 12px;
    border: 1px solid #174275;
    margin-top: 12px;
    margin-bottom: 10px;
  }
    .el-table, .el-table__expanded-cell {
        background-color: transparent;
    }

    el-table th, .el-table tr {
        background-color: transparent;
    }
    .view-data-table{
        border:none;
    }
</style>
