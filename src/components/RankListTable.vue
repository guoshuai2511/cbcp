<template>
  <el-table :data="tableData" id ="table-tbody" class="rank_list_table">
    <el-table-column prop="rowno" label="排名">
    </el-table-column>
    <el-table-column prop="userName" label="账号">
    </el-table-column>
    <el-table-column prop="caseCount" label="办案次数">
    </el-table-column>
    <el-table-column prop="totalScore" label="评分">
    </el-table-column>
    <el-table-column :formatter="getRaneChange" label="排名变化">
    </el-table-column>
  </el-table>
</template>
<script type="text/javascript">
  /* import $ from 'jquery'; */
  import $axios from 'axios';
  let item;
  let _self = this;
  export default { //这里需要将模块引出，可在其他地方使用
    data (){ //注意：data即使不需要传数据，也必须return,否则会报错
      return {  
        tableData: [{
          "rowno": 1,
          "lastRowno": 1,
          "userName": "liuliang",
          "caseCount": 410,
          "userId": 26,
          "totalScore": 16896
        }, {
          "rowno": 2,
          "lastRowno": 2,
          "userName": "chenqi",
          "caseCount": 342,
          "userId": 21,
          "totalScore": 15910
        }, {
          "rowno": 3,
          "lastRowno": 3,
          "userName": "chenliao",
          "caseCount": 275,
          "userId": 10,
          "totalScore": 14892
        }, {
          "rowno": 4,
          "lastRowno": 4,
          "userName": "dengqifeng",
          "caseCount": 266,
          "userId": 23,
          "totalScore": 14078
        }, {
          "rowno": 5,
          "lastRowno": 5,
          "userName": "wukongquan",
          "caseCount": 310,
          "userId": 31,
          "totalScore": 12999
        }, {
          "rowno": 6,
          "lastRowno": 6,
          "userName": "fengwang",
          "caseCount": 267,
          "userId": 24,
          "totalScore": 11336
        }, {
          "rowno": 7,
          "lastRowno": 7,
          "userName": "xiezhihuang",
          "caseCount": 148,
          "userId": 33,
          "totalScore": 8595
        }, {
          "rowno": 8,
          "lastRowno": 8,
          "userName": "chenyongjie",
          "caseCount": 194,
          "userId": 22,
          "totalScore": 8472
        }, {
          "rowno": 9,
          "lastRowno": 9,
          "userName": "liuzhenpeng",
          "caseCount": 165,
          "userId": 18,
          "totalScore": 8362
        }, {
          "rowno": 10,
          "lastRowno": 10,
          "userName": "wuhaotian",
          "caseCount": 183,
          "userId": 30,
          "totalScore": 7493
        }]
      }
    },
    methods:{
      //获得排名
      topRankTable(){
        $axios.get('http://localhost:9090/static/topRank.json').then(resultS => {
          item = resultS.data.dataList;
          _self.tableData = item;
          console.log(item)
        });
      },
      getRaneChange (lastRowno,rowno){
        if (lastRowno > rowno) {
          return `上升`;
        } else if (lastRowno < rowno) {
          return `下降`;
        } else {
          return `持平`;
        }
      }
    },
    mounted() {
      this.topRankTable();
    },
  }
</script>
<style scoped>
  @import "../../static/css/common.css"; 
</style>
<style type="text/css" scoped>
  /deep/ .cell{
    text-align:center;
    color:#fff !important;
  }
</style>
