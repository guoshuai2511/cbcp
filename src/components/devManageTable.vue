<template>
  <div style="margin-top: 48px;">
    <div class="add_user_div">
        <button class="table_button btn-red delete_user">删除</button>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData.slice((currpage-1)*pagesize,currpage*pagesize)"
      tooltip-effect="dark"
      :row-style ="rowStyle"
      :header-cell-style ="headerCellStyle"
      class ="view-data-table"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection">
      </el-table-column>
      <el-table-column
        label="设备编号"
        prop="devCode">
      </el-table-column>
      <el-table-column
        prop="devName"
        label="设备名称">
      </el-table-column>
      <el-table-column
        label="设备类型">
        <template slot-scope="scope">
          {{getDevType(scope.row.devType)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="passiveStandards"
        label="被动式支持"
        >
        
      </el-table-column>
      <el-table-column
        prop="activeStandards"
        label="主动式信息">
      </el-table-column>
      <el-table-column
        prop="confirmTime"
        label="列装时间">
      </el-table-column>
      <el-table-column
        prop="deptName"
        label="所属机构">
      </el-table-column>
      <el-table-column
        prop="lastReportAddress"
        label="上报地址">
      </el-table-column>
      <el-table-column
        width="100"
        label="上报位置">
        <template slot-scope="scope">
            <div v-bind:data-lng="scope.row.lng" v-bind:data-lat="scope.row.lat" class="mapView" v-bind:data-index="scope.$index"
                @click="mapView(scope.row.lng,scope.row.lat)"
            ></div>
        </template>
      </el-table-column>
      <el-table-column
        label="停启用" width="80px">
        <template slot-scope="scope">
          <span :class="getlockeClass(scope.row.status)">{{getLockeText(scope.row.status)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" minx-width="170">
        <template slot-scope="scope">
          <el-button
            size="mini"
            class="table_button btn-blue"
            @click="updateUserPersonalInfo(scope.$index, scope.row)">修改
          </el-button>
          <el-button
            size="mini"
            type="danger"
            
            :class="getLockeButtonClass(scope.row.status)"
            >
            <span>{{getLockedButtonText(scope.row.status)}}</span>
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
        getlockeStatus(val){
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
        //决定表格停启用按钮
        getLockeButtonClass(val){
            if(val === 2){
                return 'btn-red table_button locked_button'
            } else if(val === 3){
                return 'btn-green table_button unlocked_button'
            } else if(val === 1){
                return 'btn-yellow table_button entery_button'
            }
        },
       
        //决定表格启用栏停启用文字
        getLockeText(val){
             if (val == 1) {
                return '待录入';
            }else if(val == 2){    
                return  '已启用';
            }else if(val == 3){    
                return  '已停用';
            }
        },
        //决定表格停启用按钮的文字
        getLockedButtonText(val){
            if (val == 1) {
                return '录入';
            }else if(val == 2){    
                return  '停用';
            }else if(val == 3){    
                return  '启用';
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
        //获取设备信息列表数据
        getDevInfoListData(){
            $axios.get('http://localhost:9090/static/getDevList.json').then(resultS => {
                let result = resultS.data.pageInfo.list;
                this.tableData = result;
                this.total =  resultS.data.pageInfo.length;
                console.log(result);
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
        
        //删除用户
        deleteRow(index, rows) {
            rows.splice(index, 1);
        },
        //获取设备类型
        getDevType(val){
             if(val == 1) {
                return '车载';
            }else if(val == 2) {
                return '单兵';
            }else{
                return '';
            }
        },
        //打开设备上报位置地图弹框
        /*显示设备地理位置模态框*/
        mapView (lng,lat) {
            $('#dev-position-modal').modal('show');
            let targetBtsBdPoint = GPSToBaiduPoint.getBaiduPointLocation([[lng, lat]])[0];
            let devLat = targetBtsBdPoint.lat;
            let devLng = targetBtsBdPoint.lng;
            this.drawMap(devLat,devLng);
        },
        //画设备的地理位置
        drawMap(devLat,devLng){
            setTimeout(function(){
                /* 初始化地图*/
                let map = new BMap.Map("devMap",{enableMapClick:false});
                let point =  new BMap.Point(devLng, devLat);
                map.centerAndZoom(point, 12);
                // 创建标注
                let marker = new BMap.Marker(point);  
                    map.addOverlay(marker);              
                /*解决弹出框地图的标注不在地图中心的问题*/
                var loadCount = 0;
                map.addEventListener("tilesloaded",function(){
                    if(loadCount == 0){
                        map.setCenter(point);
                    }else{
                        loadCount = 0 ;
                    } 
                }); 
                //禁止拖拽
                /* map.disableDragging();      */
                /* 添加地图类型控件*/
                map.addControl(new BMap.MapTypeControl({ mapTypes: [BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP, BMAP_HYBRID_MAP] }));
                /* 开启鼠标滚轮缩放*/
                map.enableScrollWheelZoom(true);
                /* 禁止双击放大*/
                map.disableDoubleClickZoom();
                /* 开启键盘控制功能*/
                map.enableKeyboard();
                /* zoom缩小，触发显示点聚合*/
                map.setZoom(12);
            },50);
        },
    },
    mounted(){
        this.getDevInfoListData();
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
