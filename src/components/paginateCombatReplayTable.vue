<template>
  <div>
    <div class ="view-data-table">
      <el-table
      ref="multipleTable"
      :data="tableData.slice((currpage-1)*pagesize,currpage*pagesize)"
      tooltip-effect="dark"
      :row-style ="rowStyle"
      :header-cell-style ="headerCellStyle"
      >
        <el-table-column
          label="作战成员"
          v-bind="reasonableWidth()"
          min-width="11%">
          <template slot-scope="scope">
            <div class="table-td-user-names abbreviation">
                {{getUserList(scope.row.userList)}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="起始日期"
          min-width="5.4%">
          <template slot-scope="scope">
            <div class="startTimeDiv abbreviation">
                {{getStartTime(scope.row.startTime)}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="作战时长"
          min-width="9.8%">
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
          label="省市"
          min-width="16.4%">
          <template slot-scope="scope">
            <div class="areaFullNameDiv abbreviation">
              {{removeNull(scope.row.areaFullName)}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="设备"
          min-width="22%">
          <template slot-scope="scope">
            <div class="table-td-used-devs abbreviation" style="padding-left:10px; padding-right:5px;">
                {{getDevList(scope.row.devList)}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="案件名"
          min-width="7.1%">
          <template slot-scope="scope">
            <div class="tagDiv abbreviation">
              {{removeNull(scope.row.caseName)}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="标签"
          min-width="7.1%">
          <template slot-scope="scope">
            <div class="tagDiv abbreviation">
              {{removeNull(scope.row.tag)}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="备注"
          min-width="7.1%">
          <template slot-scope="scope">
            <div class="tagDiv abbreviation remark" v-bind="getTitle(remark,scope.$index,scope.row.remark)">
              {{removeNull(scope.row.remark)}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="tel"
          label="评分"
          min-width="8.8%">
          <template slot-scope="scope">
              <div class="grade-star-container-intable" v-html = getScore(scope.row.score) v-bind="getScoreTitle(scope.$index,scope.row.score)">
              </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" 
          min-width="3.8%">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              class="command-btn command-btn-table"
              data-tr-index = scope.$index
              @click="replay(scope.$index, scope.row)">
            </el-button>
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
    data() {
      return {
        tableData: [],
        pagesize: 10,
        currpage: 1,
        remark:'remark',
      }
    },
    methods: {
        //获取用户列表数据
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
        //处理用户串显示用户名
        getUserList(list) {
            let value = '';
            for (let i = 0; i < list.length; i++) {
                value = value + list[i].username + '/' + list[i].handleCaseSeq + '，';
            }
            return value.substring(0, value.length - 1);
        },
        //处理时间串函数
        getStartTime(value) {
            return formatDate(new Date(value),'yyyy-MM-dd');
        },
        //得分显示小☆☆个数
        getScore(score){
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
        //作战时长
        getContinuousTime(startTime, endTime) {
            let sec = parseInt((endTime - startTime) / 1000);
            let minute = parseInt(sec / 60);
            if( minute <= 0){
                return '1分钟';
            }else{
                return minute+ '分钟';
            }
        },
        //不满10前面添0
        add0(val) {
            if (val >= 10) {
                return '' + val;
            } else {
                return '0' + val;
            }
        },
        //保证页面不会出现null和undefined
        removeNull(val) {
            if (val == null||val ==undefined || !val) {
                return '';
            } else {
                return val;
            }
        },
        //处理设备字符串，得到设备信息
        getDevList(list){
          let value = '';
            for (let i = 0; i < list.length; i++) {
                value = value + list[i].devCode + '，';
            }
            return value.substring(0, value.length - 1);
        },
        //案件回放按钮
        replay(){},
        //给div添加title
        getScoreTitle(index,val){
          let text = '案件评分：' + val + '分'
          $('.grade-star-container-intable').eq(index).attr('title',text)
        },
        //给div添加title
        getTitle(id,index,val){
          $('.'+id).eq(index).attr('title',val)
        },
        //改变表格
        reasonableWidth(){
          $('.table-td-user-names').width($(window).width()*0.1041);
          $('.commandBtnDiv').width($(window).width()*0.0364);
          $('.startTimeDiv').width($(window).width()*0.0520);
          $('.getContinuousTimeDiv').width($(window).width()*0.0937);
          $('.areaFullNameDiv').width($(window).width()*0.1625);
          $('.table-td-used-devs').css('width',this.w*0.2005)
          $('.abbreviation').css('height','42px')
          $('.tagDiv').width($(window).width()*0.0678);
          $('.grade-star-container-intable').width($(window).width()*0.0833);
        },
        //
        autoWidth(){

        }
    },
    mounted(){
        this.getCaseList();
        this.isExistPageSize();
    },
  }
　　　　
</script>

