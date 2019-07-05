<template>
  <div style="margin-top: 48px;">
    <el-table
      ref="multipleTable"
      :data="tableData.slice((currpage-1)*pagesize,currpage*pagesize)"
      tooltip-effect="dark"
      :row-style ="rowStyle"
      :header-cell-style ="headerCellStyle"
      class ="view-data-table">
      <el-table-column
        label="作战成员">
        <template slot-scope="scope">
            {{getUserList(scope.row.userList)}}
        </template>
      </el-table-column>
      <el-table-column
        label="起始日期">
        <template slot-scope="scope">
            {{getStartTime(scope.row.startTime)}}
        </template>
      </el-table-column>
      <el-table-column
        label="作战时长">
        <template slot-scope="scope">
            <div class="getContinuousTimeDiv abbreviation">
              {{getContinuousTime(scope.row.startTime,scope.row.endTime)+'('+
              add0(new Date(scope.row.startTime).getHours())+':'+add0(new Date(scope.row.startTime).getMinutes())+'~'+
              add0(new Date(scope.row.endTime).getHours())+':'+add0(new Date(scope.row.endTime).getMinutes())
              +')'}}
            </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="areaFullName"
        label="省市">
      </el-table-column>
      <el-table-column
        label="评分">
       <template slot-scope="scope">
            <div class="grade-star-container-intable" v-html = getScore(scope.row.score) v-bind="getScoreTitle(scope.$index,scope.row.score)">
            </div>
        </template>
      </el-table-column>
      <el-table-column
        label="设备">
         <template slot-scope="scope">
            {{getDevList(scope.row.devList)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="caseReview.caseName"
        label="案件名">
      </el-table-column>
      <el-table-column
        prop="caseReview.tag"
        label="标签">
      </el-table-column>
      <el-table-column
        width="100"
        label="状态">
        <template slot-scope="scope">
            <div :class="getReviewStatusClassName(scope.row.reviewStatus)">
                <span>{{getReviewStatusText(scope.row.reviewStatus)}}</span>
            </div>
        </template>
      </el-table-column>
   
      <el-table-column label="操作" minx-width="170">
        <template slot-scope="scope">
          <el-button
            size="mini"
            :class="getClassName(scope.row.reviewStatus)">
                <span>{{getLockedButtonText(scope.row.reviewStatus)}}</span>
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
   
  </div>
</template>
<script type="text/javascript">
  import {formatDate} from '../../static/lib/timeFormat.js';
  import "../../static/lib/zTree_v3/js/jquery.ztree.all.min.js";
  import { GPSToBaiduPoint } from '../../static/lib/GPSToBaiduPoint.BaiduMap.js' 
  import $axios from 'axios';
  import $ from 'jquery';
  export default {
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
        //决定表格停启用文字
        getReviewStatusText(data){
            switch (data) {
                case 0:
                    return '未审核';
                    break;
                case 1:
                    return '真实案件';
                    break;
                case -1:
                    return '无效案件';
                    break;
                default:
                    return '';
                    break;
            }
        },
        //决定表格停启用文字的颜色
        getReviewStatusClassName(data){
            switch (data) {
                case 0:
                    return 'text-gray';
                    break;
                case 1:
                    return 'text-green';
                    break;
                case -1:
                    return 'text-red';
                    break;
                default:
                    return '';
                    break;
            }
        },
        //决定修改审核还是审核的按钮颜色
        getClassName(val){
            if (val == 0) {
                return 'btn-green table_button add_audit'
            } else {
                return 'btn-blue table_button update_audit';
            }
        },
        //决定修改审核还是审核的按钮文字
        getLockedButtonText(val){
            if (val == 0) {
                return '审核'
            } else {
                return '修改审核';
            }
        },
        getUserList(list) {
            let value = '';
            for (let i = 0; i < list.length; i++) {
                value = value + list[i].username + '/' + list[i].handleCaseSeq + '，';
            }
            return value.substring(0, value.length - 1);
        },
        getDevList(list) {
            let value = '';
            for (let i = 0; i < list.length; i++) {
                value = value + list[i].devCode + '，';
            }
            return value.substring(0, value.length - 1);
        },
        getStartTime(value) {
            return formatDate(new Date(value),'yyyy-MM-dd');
        },
        getContinuousTime(startTime, endTime) {
            let sec = parseInt((endTime - startTime) / 1000);
            let hour = parseInt(sec / 3600);
            let minute = parseInt((sec % 3600) / 60);
            return hour + '小时' + (minute <= 0 && hour <= 0 ? 1 : minute) + '分钟';
        },
        getScore(score) {
            let grayNum = 0;
            if (score == 100) {
                grayNum = 0;
            } else if (score >= 80) {
                grayNum = 1;
            } else if (score >= 60) {
                grayNum = 2;
            } else if (score >= 40) {
                grayNum = 3;
            } else if (score >= 20) {
                grayNum = 4;
            } else {
                grayNum = 5;
            }
            let htmlString = '';
            for (let i = 0; i < 5; i++) {
                let isGray = '';
                if (i < grayNum) {
                    isGray = 'gray-cover';
                }
                htmlString = `
                    <div class="grade-star-icon-intable ${isGray}"></div>
                `+ htmlString;
            }
            return htmlString;
        },
         //不满10前面添0
        add0(val) {
            if (val >= 10) {
                return '' + val;
            } else {
                return '0' + val;
            }
        },
        //显示评分title
        getScoreTitle(index,val){
          let text = '案件评分：' + val + '分'
          $('.grade-star-container-intable').eq(index).attr('title',text)
        },
        //获取设备信息列表数据
        getCaseInfoListData(){
            $axios.get('http://localhost:9090/static/getCaseInfoList.json').then(resultS => {
                let result = resultS.data.pageInfo.list;
                this.tableData = result;
                this.total =  resultS.data.pageInfo.list.length;
                console.log(result);
            });
        },


    },
    mounted(){
        this.getCaseInfoListData();
        this.isExistPageSize();
    },
  }
　　　　
</script>


