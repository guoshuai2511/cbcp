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
            <div class="table-td-user-names abbreviation" :title="getUserList(scope.row.userList)">
                {{getUserList(scope.row.userList)}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="起始日期"
          min-width="5.4%">
          <template slot-scope="scope">
            <div class="startTimeDiv abbreviation" :title="getStartTime(scope.row.startTime)">
                {{getStartTime(scope.row.startTime)}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="作战时长"
          min-width="9.8%">
          <template slot-scope="scope">
            <div class="getContinuousTimeDiv abbreviation" :title="getContinuousTime(scope.row.startTime,scope.row.endTime)+'('+
              add0(new Date(scope.row.startTime).getHours())+':'+add0(new Date(scope.row.startTime).getMinutes())+'~'+
              add0(new Date(scope.row.endTime).getHours())+':'+add0(new Date(scope.row.endTime).getMinutes())
              +')'">
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
            <div
              class="command-btn command-btn-table"
              data-tr-index = scope.$index
              @click="replay(scope.$index, scope.row)">
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
    <div class="page-selector">
        <div class="item-count-selector">
            每页：
            <div class="btn-group dropup">
                <button type="button" style="background: #08264a; color: #fff;border:1px solid #174275;"
                    class="btn btn-default btn-sm dropdown-toggle"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="show-item-num" style="display: block; float: left;">30条</span> <span class="caret" style="
                        display: block;
                        float: left;
                        margin-top:3px;
                        width: 12px;
                        height: 12px;
                        border: none;
                        margin-left:6px;
                        background: url('img/iconpic/eig-slideup.png');
                        background-size:100% 100%;
                    "></span>
                </button>
                <ul class="dropdown-menu">
                    <li><a class="total-count-selector"><span>10</span>条</a></li>
                    <li><a class="total-count-selector"><span>20</span>条</a></li>
                    <li><a class="total-count-selector"><span>30</span>条</a></li>
                    <li><a class="total-count-selector"><span>40</span>条</a></li>
                    <li><a class="total-count-selector"><span>50</span>条</a></li>
                </ul>
            </div>
            &nbsp;&nbsp;总共<span id="total-count"></span>条<span id="total-page-num"></span>
        </div>
        <div class="m-style pagination M-box3"></div>
    </div>
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
        replay(){

        },
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

        },
        //把jq分页插件vue化
        pagination(){
            (function (factory) {
                if (typeof define === "function" && (define.amd || define.cmd) && !jQuery) {
                    // AMD或CMD
                    define(["jquery"], factory);
                } else if (typeof module === 'object' && module.exports) {
                    // Node/CommonJS
                    module.exports = function (root, jQuery) {
                        if (jQuery === undefined) {
                            if (typeof window !== 'undefined') {
                                jQuery = require('jquery');
                            } else {
                                jQuery = require('jquery')(root);
                            }
                        }
                        factory(jQuery);
                        return jQuery;
                    };
                } else {
                    //Browser globals
                    factory(jQuery);
                }
            }(function ($) {
                //配置参数
                var defaults = {
                    totalData: 0, //数据总条数
                    showData: 0, //每页显示的条数
                    pageCount: 9, //总页数,默认为9
                    current: 1, //当前第几页
                    prevCls: 'prev', //上一页class
                    nextCls: 'next', //下一页class
                    prevContent: '<', //上一页内容
                    nextContent: '>', //下一页内容
                    activeCls: 'active', //当前页选中状态
                    coping: false, //首页和尾页
                    isHide: false, //当前页数为0页或者1页时不显示分页
                    homePage: '', //首页节点内容
                    endPage: '', //尾页节点内容
                    keepShowPN: false, //是否一直显示上一页下一页
                    mode: 'unfixed', //分页模式，unfixed：不固定页码数量，fixed：固定页码数量
                    count: 4, //mode为unfixed时显示当前选中页前后页数，mode为fixed显示页码总数
                    jump: false, //跳转到指定页数
                    jumpIptCls: 'jump-ipt', //文本框内容
                    jumpBtnCls: 'jump-btn', //跳转按钮
                    /* delete by guoshuai start 2018-9-29
                    jumpBtn: '跳转', //跳转按钮文本
                    delete by guoshuai end 2018-9-29*/
                    /*add by guoshuai start 2018-9-29*/
                    jumpText:'jump-txt',//跳转页数前的class
                    jumpBtn: 'GO', //跳转按钮文本
                    jumpWord:'jump-word',//页
                    /*add by guoshuai end 2018-9-29*/
                    callback: function () { } //回调
                };

                var Pagination = function (element, options) {
                    //全局变量
                    var opts = options, //配置
                        current, //当前页
                        $document = $(document),
                        $obj = $(element); //容器

                    /**
                     * 设置总页数
                     * @param {int} page 页码
                     * @return opts.pageCount 总页数配置
                     */
                    this.setPageCount = function (page) {
                        return opts.pageCount = page;
                    };

                    /**
                     * 获取总页数
                     * 如果配置了总条数和每页显示条数，将会自动计算总页数并略过总页数配置，反之
                     * @return {int} 总页数
                     */
                    this.getPageCount = function () {
                        return opts.totalData && opts.showData ? Math.ceil(parseInt(opts.totalData) / opts.showData) : opts.pageCount;
                    };

                    /**
                     * 获取当前页
                     * @return {int} 当前页码
                     */
                    this.getCurrent = function () {
                        return current;
                    };

                    /**
                     * 填充数据
                     * @param {int} 页码
                     */
                    this.filling = function (index) {
                        var html = '';
                        current = parseInt(index) || parseInt(opts.current); //当前页码
                        var pageCount = this.getPageCount(); //获取的总页数
                        switch (opts.mode) { //配置模式
                            case 'fixed': //固定按钮模式
                                if (opts.coping) {
                                    var home = opts.coping && opts.homePage ? opts.homePage : '1';
                                    html += '<a href="javascript:;" data-page="1">' + home + '</a>'; // 首页
                                }
                                if (current > 1) {
                                    html += '<a href="javascript:;" class="' + opts.prevCls + '">' + opts.prevContent + '</a>'; // 上一页
                                }
                                var start = current > opts.count - 1 ? current + opts.count - 1 > pageCount ? current - (opts.count - (pageCount - current)) : current - parseInt(opts.count / 2) : 1;
                                /*add by guoshuai*/	
                                if(start == 0 ){
                                    start = 1;
                                }
                                var end = current + opts.count - 1 >= pageCount ? pageCount : start + opts.count;
                                /*delete by guoshuai*///var end = current + opts.count - 1 > pageCount ? pageCount : start + opts.count;
                                //
                                if (current >= opts.count && current != 1 && pageCount != opts.count) { // ...
                                    var home = opts.coping && opts.homePage ? opts.homePage : '1';
                                    html += opts.coping ? '<a href="javascript:;" data-page="' + (start - 1) + '">...</a>' : '';
                                }
                                //
                                for (; start <= end; start++) {
                                    if (start != current) {
                                        html += '<a href="javascript:;" data-page="' + start + '">' + start + '</a>';
                                    } else {
                                        html += '<span class="' + opts.activeCls + '">' + start + '</span>';
                                    }
                                }
                                //
                                if (current + opts.count - 2 < pageCount && current >= 1 && pageCount > opts.count) { // ...
                                    // var end = opts.coping && opts.endPage ? opts.endPage : pageCount;
                                    html += opts.coping ? '<a href="javascript:;" data-page="' + start + '">...</a>' : '';
                                }
                                //
                                if (current < pageCount) {
                                    html += '<a href="javascript:;" class="' + opts.nextCls + '" /*add by guoshuai start*/style="border-right: 1px solid #03172f;"/*2018-9-29end*/>' + opts.nextContent + '</a>'; // 下一页
                                }
                                if (opts.coping) {
                                    var _end = opts.coping && opts.endPage ? opts.endPage : pageCount;
                                    html += '<a href="javascript:;" data-page="' + pageCount + '">' + _end + '</a>'; // 末页
                                }
                                break;
                            case 'unfixed': //不固定按钮模式
                                if (current >= opts.count + 2 && current != 1 && pageCount != opts.count) { // 首页
                                    var home = opts.coping && opts.homePage ? opts.homePage : '1';
                                    html += opts.coping ? '<a href="javascript:;" data-page="1">' + home + '</a>' : '';
                                }
                                if (opts.keepShowPN || current > 1) { // 上一页
                                    html += '<a href="javascript:;" class="' + opts.prevCls + '">' + opts.prevContent + '</a>';
                                } else {
                                    if (opts.keepShowPN == false) {
                                        $obj.find('.' + opts.prevCls) && $obj.find('.' + opts.prevCls).remove();
                                    }
                                }
                                if (current >= opts.count + 2 && current != 1 && pageCount != opts.count) { // ...
                                    var home = opts.coping && opts.homePage ? opts.homePage : '1';
                                    html += opts.coping ? '<a href="javascript:;" data-page="' + (current - opts.count - 1) + '">...</a>' : '';
                                }
                                var start = (current - opts.count) <= 1 ? 1 : (current - opts.count);
                                var end = (current + opts.count) >= pageCount ? pageCount : (current + opts.count);
                                for (; start <= end; start++) {
                                    if (start <= pageCount && start >= 1) {
                                        if (start != current) {
                                            html += '<a href="javascript:;" data-page="' + start + '">' + start + '</a>';
                                        } else {
                                            html += '<span class="' + opts.activeCls + '">' + start + '</span>';
                                        }
                                    }
                                }
                                if (current + opts.count < pageCount && current >= 1 && pageCount > opts.count) { // ...
                                    var end = opts.coping && opts.endPage ? opts.endPage : pageCount;
                                    html += opts.coping ? '<a href="javascript:;" data-page="' + start + '">...</a>' : '';
                                }
                                if (opts.keepShowPN || current < pageCount) { // 下一页
                                    html += '<a href="javascript:;" class="' + opts.nextCls + '" /*add by guoshuai start*/style="border-right: 1px solid #03172f;"/*2018-9-29end*/>' + opts.nextContent + '</a>';
                                } else {
                                    if (opts.keepShowPN == false) {
                                        $obj.find('.' + opts.nextCls) && $obj.find('.' + opts.nextCls).remove();
                                    }
                                }
                                if (current + opts.count < pageCount && current >= 1 && pageCount > opts.count) { // 末页
                                    var end = opts.coping && opts.endPage ? opts.endPage : pageCount;
                                    html += opts.coping ? '<a href="javascript:;" data-page="' + pageCount + '">' + end + '</a>' : '';
                                }
                                break;
                            case 'easy': //简单模式
                                break;
                            default:
                        }
                        /*delete by guoshuai start 2018-9-29
                        html += opts.jump ? '<input type="text" class="' + opts.jumpIptCls + '"><a href="javascript:;" class="' + opts.jumpBtnCls + '">' + opts.jumpBtn + '</a>' : '';
                        delete by guoshuai end 2018-9-29*/
                        /*add by guoshuai start 2018-9-29*/
                        html += opts.jump ? '<a class="jumpText"style="border: none;">跳转到</a><input type="text" class="' + opts.jumpIptCls + '"><a class="jumpWord"style="border: none;">页</a><a href="javascript:;" class="' + opts.jumpBtnCls + '">' + opts.jumpBtn + '</a>' : '';
                        /*add by guoshuai end 2018-9-29*/
                        $obj.empty().html(html);
                    };

                    //绑定事件
                    this.eventBind = function () {
                        var that = this;
                        var pageCount = that.getPageCount(); //总页数
                        var index = 1;
                        $obj.off().on('click', 'a', function () {
                            if ($(this).hasClass(opts.nextCls)) {
                                if ($obj.find('.' + opts.activeCls).text() >= pageCount) {
                                    $(this).addClass('disabled');
                                    return false;
                                } else {
                                    index = parseInt($obj.find('.' + opts.activeCls).text()) + 1;
                                }
                            } else if ($(this).hasClass(opts.prevCls)) {
                                if ($obj.find('.' + opts.activeCls).text() <= 1) {
                                    $(this).addClass('disabled');
                                    return false;
                                } else {
                                    index = parseInt($obj.find('.' + opts.activeCls).text()) - 1;
                                }
                            } else if ($(this).hasClass(opts.jumpBtnCls)) {
                                if ($obj.find('.' + opts.jumpIptCls).val() !== '') {
                                    index = parseInt($obj.find('.' + opts.jumpIptCls).val());
                                } else {
                                    return;
                                }
                            } else {
                                index = parseInt($(this).data('page'));
                            }
                            that.filling(index);
                            typeof opts.callback === 'function' && opts.callback(that);
                        });
                        //输入跳转的页码
                        $obj.on('input propertychange', '.' + opts.jumpIptCls, function () {
                            var $this = $(this);
                            var val = $this.val();
                            var reg = /[^\d]/g;
                            if (reg.test(val)) $this.val(val.replace(reg, ''));
                            (parseInt(val) > pageCount) && $this.val(pageCount);
                            if (parseInt(val) === 0) $this.val(1); //最小值为1
                        });
                        //回车跳转指定页码
                        $document.keydown(function (e) {
                            if (e.keyCode == 13 && $obj.find('.' + opts.jumpIptCls).val()) {
                                var index = parseInt($obj.find('.' + opts.jumpIptCls).val());
                                that.filling(index);
                                typeof opts.callback === 'function' && opts.callback(that);
                            }
                        });
                    };

                    //初始化
                    this.init = function () {
                        this.filling(opts.current);
                        this.eventBind();
                        if (opts.isHide && this.getPageCount() == '1' || this.getPageCount() == '0') {
                            $obj.hide();
                        } else {
                            $obj.show();
                        }
                    };
                    this.init();
                };

                $.fn.pagination = function (parameter, callback) {
                    if (typeof parameter == 'function') { //重载
                        callback = parameter;
                        parameter = {};
                    } else {
                        parameter = parameter || {};
                        callback = callback || function () { };
                    }
                    var options = $.extend({}, defaults, parameter);
                    return this.each(function () {
                        var pagination = new Pagination(this, options);
                        callback(pagination);
                    });
                };

            }));
            $('.M-box3').pagination({
                pageCount: 10,
                coping: true,
                homePage: '首页',
                endPage: '末页',
                /*delete by guoshuai start 2018-9-29
                prevContent: '上页',
                nextContent: '下页',
                delete by guoshuai start 2018-9-29*/
                /*add by guoshuai start 2018-9-29*/
                prevContent: '',
                nextContent: '',
                /*add by guoshuai end 2018-9-29*/
                callback: function (api) { }
            });
        },
      
    },
    mounted(){
        this.getCaseList();
        this.isExistPageSize();
        this.pagination();
    },
  }
　　　　
</script>

