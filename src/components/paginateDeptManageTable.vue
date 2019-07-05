<template>
  <div style="margin-top: 20px;">
    <el-table
      ref="multipleTable"
      :data="tableData.slice((currpage-1)*pagesize,currpage*pagesize)"
      tooltip-effect="dark"
      style="width: 100%"
      :row-style ="rowStyle"
      :header-cell-style ="headerCellStyle"
      class ="view-data-table">
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
        label="停启用" width="80px">
        <template slot-scope="scope">
          <span :class="getlockeClass(scope.row.locked)">{{getlockeStatus(scope.row.locked)}}</span>
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
  import $axios from 'axios';
  import $ from 'jquery';
  export default {
    data() {
      return {
        tableData: [],
        pagesize: 10,
        currpage: 1,
      }
    },
    methods: {
        //获取用户列表数据
        getUserList() {
            $axios.get('http://localhost:9090/static/getUserListByDeptId.json').then(resultS => {
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
    },
    mounted(){
        this.getUserList();
        this.isExistPageSize();
    },
  }
　　　　
</script>
<style>
  @import "../../static/css/common.css"; 
  @import "../../static/css/table-view.css";
  @import '../../static/css/page/userManage.css';
</style>

