import { TopHeader } from '../../common/topHeader/topHeader.js';
import { MyCookie } from '../../common/cookie/MyCookie.js';

import { VehicleOperation } from './ajax/VehicleOperation.js';
import { DrawTable } from './table/DrawTable.js';
import { PageInfo } from './table/PageInfo.js';
import { ModalContent } from './table/ModalContent.js';
import { GPSToBaiduPoint } from '../../common/baiduMap/GPSToBaiduPoint.BaiduMap.js';
import { DeptTree } from './tree/DeptTree.js';
import { DevListPanel } from './table/DevListPanel.js';
import { ManagerListPanel } from './table/ManagerListPanel.js';
import { toUnicode } from 'punycode';

//生成顶部菜单
TopHeader.initHeader();

/* 禁止输入空格*/
$(document).on('keyup blur', '.input-space-forbidden', function () {
    this.value = this.value.replace(/\s+/g, '');
});
/* 设备编号禁止输入空格*/
$(document).on('keyup blur', '.input-space-forbidden-dev', function () {
    if (/\s/.test(this.value)) {
        $('#is-have-dev').html(`<span class="text-red">设备编号不能包含空格</span>`);
    }
    this.value = this.value.replace(/\s+/g, '');
});
/* 禁止输入中文*/
$(document).on('keyup blur', '.input-znch-forbidden', function () {
    this.value = this.value.replace(/[\u4e00-\u9fa5]/g, '');
});

/* 设置默认页数*/
if (MyCookie.getCookie('devManagePageNum') != '') {
    pageItemNum = Number(MyCookie.getCookie('devManagePageNum'));
    $('.show-item-num').html(pageItemNum + '条');
}

/* 搜索条件缓存*/
vehicleQuery.pageNum = 1;
vehicleQuery.pageSize = pageItemNum;

initQuery();

function initQuery() {
    let initQueryData = new VehicleQueryBean();
    initQueryData.pageNum = 1;
    initQueryData.pageSize = pageItemNum;
    query(initQueryData);
}

/* 选择每页显示数量*/
$('.total-count-selector').click(function () {
    pageItemNum = $(this).children(0).html();
    /* 设置cookie*/
    MyCookie.setCookie('devManagePageNum', pageItemNum, 365);
    $('.show-item-num').html(pageItemNum + '条');
    vehicleQuery.pageNum = 1;
    vehicleQuery.pageSize = pageItemNum;
    query(vehicleQuery);
});

/* 获取组织机构树状图*/
VehicleOperation.operation(null, `getDeptTreeList`, 'GET').then((result) => {
    if (result.retcode == 1) {
        deptTreeCache = result.dataList;
        DeptTree.drawTree(result.dataList);
    }
});
//删除组织结构
$(document).on('click', '.selected-dept-modal-item-delete', function () {
    $($(this).parent()).remove();
    let treeObj = $.fn.zTree.getZTreeObj('dept-selector-tree');
    treeObj.cancelSelectedNode();
});
/* 选取上级组织modal确定*/
$('#dept-selector-ensure').click(function () {
    let deptName = $('#selected-institutions-value').html();
    let deptId = $('#selected-institutions-value').attr('data-dept-id');
    if($('#dept-input-container-value').attr('data-dept-id') == deptId){

    }else{
        $('.adminType').html('');
        $('.adminType').attr('managerId', '');
        $('.driver').html('');
        $('.driver').attr('managerId', '');
    }
    if (deptName != null && deptId != null) {
        $('#is-dept-true').html('');
        $('#dept-input-container-value').html(`${deptName == null ? '' : deptName}`);
        $('#dept-input-container-value').attr('data-dept-id', `${deptId == null ? '' : deptId}`);
    }
});
/* 打开组织机构选择框*/
$(document).on('click', '#dept-input-container-value', function () {
    $('#dept-selector-modal').modal('show');
});
/* 搜索*/
$('.guide-search-btn').click(function () {
    let vehicleQueryCos = new VehicleQueryBean();
    vehicleQueryCos.vehicleNum = $('#vehicleNum-value').val().trim();
    vehicleQueryCos.plateNum = $('#plateNum-value').val().trim();
    vehicleQueryCos.managerName = $('#managerName-value').val().trim();
    vehicleQueryCos.deptId = $('#dept-query-selector-input').attr('data-dept-id');
    vehicleQueryCos.pageNum = 1;
    vehicleQueryCos.pageSize = pageItemNum;
    vehicleQuery = vehicleQueryCos;
    query(vehicleQuery);
});

//选中所有子全选全选按钮选中，若没有全选子选择则全选不被选中
$(document).on("change", ".checkbox-item", function () {
    if ($(this).is(":checked")) {
        let flag = true;
        for (let i = 0; i < $('.checkbox-item').length; i++) {
            if (!$($('.checkbox-item')[i]).is(':checked')) {
                flag = false;
                break;
            }
        }
        if (flag) {
            $(".checkbox-all").prop('checked', true);
        }
    } else {
        $(".checkbox-all").prop('checked', false);
    }
});
/* 全选选择框 */
$(document).on('change', '.checkbox-all', function () {
    if ($(this).is(':checked')) {
        $('.checkbox-item').each(function () {
            $(this).prop('checked', true);
        });
    } else {
        $('.checkbox-item').each(function () {
            $(this).prop('checked', false);
        });
    }
    $('.checkbox-item').each(function () {
        $(this).change();
    });
});
/* 小项选择框 */
$(document).on('change', '.checkbox-dev', function () {
    let selectId = parseInt($(this).attr('data-id'));
    let currentIndex = $.inArray(selectId, selectedArr);
    if ($(this).is(':checked')) {
        if (currentIndex == -1) {
            selectedArr.push(selectId);
        }
    } else {
        if (currentIndex > -1) {
            selectedArr.splice(currentIndex, 1);
        }
    }
});

$(document).on('change', '.checkbox-item', function () {
    let selectId = parseInt($(this).attr('data-id'));
    let currentIndex = $.inArray(selectId, selectedArr);
    if ($(this).is(':checked')) {
        if (currentIndex == -1) {
            selectedArr.push(selectId);
        }
    } else {
        if (currentIndex > -1) {
            selectedArr.splice(currentIndex, 1);
        }
    }
});

/* 批量删除*/
$('#del-dev-btn').click(function () {
    batchDel();
});

/* 删除*/
$(document).on('click', '.delete-dev', function () {
    let divIndex = $($($(this).parent()).parent()).index();
    let devInfo = resultCache[divIndex];
    let ids = {
        ids: [devInfo.id]
    }
    ensureModal('deleteVehicle', '是否删除？', ids);
});

/* 批量删除*/
function batchDel() {
    let ids = {
        ids: []
    }

    if (selectedArr.length > 0) {
        ids.ids = selectedArr;
        ensureModal('deleteVehicle', '是否删除？', ids);
    } else {
        $('#alert-modal-content').html('请先勾选');
        $('#alert-modal').modal('show');
    }
};

/*判断车牌号是否重复且是否合法的方法*/
//车牌号验证方法
function isVehicleNumber(vehicleNumber) {
    let xreg=/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
    let creg=/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
    if(vehicleNumber.length == 7){
      return creg.test(vehicleNumber);
    } else if(vehicleNumber.length == 8){
      return xreg.test(vehicleNumber);
    } else{
      return false;
    }
}
let plateNumFlag;
function isPlateNumRepeat(id,PlateNum){
    if(PlateNum !=''){
        if(isVehicleNumber(PlateNum)){
            $('#is-plateNum-true').html(``);
            $('#is-plateNum-true').html(`<img src="img/loading.gif" style="width:20px;height:20px;margin-top:6px;"></img>`);
            VehicleOperation.operation(null, `checkPlateNum/`+id+'/'+PlateNum, 'GET').then((result) => {
                $('#is-plateNum-true').html(``);
                if (result.retcode == 1) {
                    if(result.data==null){
                        $('#is-plateNum-true').html(`<img src="img/iconpic/success.png" style="margin-top: 2px;"></img>`);
                        plateNumFlag = true;
                    }else{
                        $('#is-plateNum-true').html(`<img src="img/iconpic/fail.png" style="margin-top: 5px; float:left;"></img>
                            <span class="text-red" style="float:left;">车牌号重复录入</span>`);
                        plateNumFlag = false;
                    }
                    
            } else {
                $('#is-plateNum-true').html(`<img src="img/iconpic/fail.png" style="margin-top: 5px; float:left;"></img>
                <span class="text-red" style="float:left;">车牌号重复录入</span>`);
                plateNumFlag = false;
            }
            }).catch((e) => {
                $('#is-plateNum-true').html(`<span class="text-red">系统异常，http错误${e.status}</span>`);
            });
        }else{
            $('#is-plateNum-true').html(`<span class="text-red">车牌号格式不正确</span>`);
            plateNumFlag = false;
        }
    }else{
        $('#is-plateNum-true').html(`<span class="text-red">车牌号不能为空</span>`);
        plateNumFlag = false;
    }
    
}

/* 车牌号是否合法 且是否重复*/
$(document).on('blur', '.plate-number-legitimate', function () {
    let eq = $('.confirm').attr('data-i');
    let vehicleInfo = resultCache[eq];
    let PlateNum = $('#plateNum-input').val();
    let id = parseInt($('#plateNum-input').attr('table-id')); 
    if(PlateNum == vehicleInfo.plateNum){
        plateNumFlag = true;
    }else{
        if(PlateNum==''){
            $('#is-plateNum-true').html(`<span class="text-red">车牌号不能为空</span>`);
            plateNumFlag = false;
        } else {
            isPlateNumRepeat(id,PlateNum);
        } 
    }
}); 

/* 提交操作*/
function doOperation(devInfo, url, word) {
    $('#dev-modal').modal('hide');
    $('.loading-gif').attr('src', 'img/loading.gif');
    $('.loading-word').html('正在提交...')
    $('.submit-loading').css('display', 'block');
    VehicleOperation.operation(JSON.stringify(devInfo), url, 'POST').then((result) => {
        if (result.retcode == 1) {
            $('.loading-gif').attr('src', 'img/submit_success.png');
            $('.loading-word').html(`<span style="color: rgb(10, 180, 0)">${word}成功</span>`);
            switch (url) {
                case 'updateVehicle':  
                    query(vehicleQuery);
                    $('.submit-loading').css('display', 'block');
                    break;
                case 'deleteVehicle':
                    initQuery();
                    $('.submit-loading').css('display', 'block');
                    break;
                case 'entryVehicle':
                    initQuery();
                    $('.submit-loading').css('display', 'block');
                    break;
                case 'addOrUpdateVehicleDev':
                    $('#vehicle-dev-manage-modal').modal('hide');
                    break;
                default:
                    break;
            }
        } else {
            $('.loading-gif').attr('src', 'img/submit_fail.png');
            $('.loading-word').html(`<span style="color: rgb(255, 120, 120);">${word}失败</span>`);
        }
        setTimeout(function () {
            $('.submit-loading').fadeOut(800);
        }, 1000);
    }).catch((e) => {
        $('.loading-gif').attr('src', 'img/submit_fail.png');
        $('.loading-word').html(`<span style="color: rgb(255, 120, 120);">${word}失败</span > `);
        setTimeout(function () {
            $('.submit-loading').fadeOut(800);
        }, 1000);
    });
};

/* 危险操作确认框*/
function ensureModal(type, content, data) {
    $('#modal-alert-content').html(content);
    $('#ensure-modal').modal('show');
    $('#ensure-modal-submit').unbind("click");
    $('#ensure-modal-submit').click(function () {
        $('#ensure-modal').modal('hide');
        switch (type) {
            case 'deleteVehicle':
                doOperation(data, 'deleteVehicle', '删除');
                break;
            default:
                break;
        }
        $('#ensure-modal-submit').unbind("click");
    });
};

/* 设备查询*/
function query(data) {
    VehicleOperation.operation(JSON.stringify(data), 'getVehicleList', 'POST').then((result) => {
        if (result.retcode == 1) {
            //清空已选择的id集
            selectedArr = new Array();
            if (result.pageInfo != null && result.pageInfo.list.length > 0) {
                $('.no-data-tablesarch').remove();
                resultCache = result.pageInfo.list;
                DrawTable.devTable(result.pageInfo.list);
                PageInfo.drawPageController(result);
                $('#total-page-num').html(`，共${result.pageInfo.pages}页`);
                $('#total-count').html(result.pageInfo.total);
                $(".checkbox-all").prop('checked',false);
            } else {
                let divHeight = $(window).height() - 500;
                $('.table-view-data-area').append(`
                    <div class= "no-data-tablesarch">
                        <img class="no-data-icon" src="img/no_data_icon_search.png">
                        <span class="no-data-word">无搜索结果</span>
                    </div>
                `);
                $('#table-tbody').html('');
                $('.M-box3').html('');
                $('#total-page-num').html('');
                $('#total-count').html(0);
            }
        } else {
            let divHeight = $(window).height() - 500;
            $('.table-view-data-area').append(`
                <div class= "no-data-tablesarch">
                    <img class="no-data-icon" src="img/no_data_icon_search.png">
                    <span class="no-data-word">无搜索结果</span>
                </div>
            `);
            $('#table-tbody').html('');
            $('.M-box3').html('');
        }
    });
}

/* 所属机构选择*/
$('#dept-query-selector-remove').click(function () {
    $('#dept-query-selector-input').html('&nbsp;');
    $('#dept-query-selector-input').attr('data-dept-id', '');
    $('#dept-query-selector-remove').css('display', 'none');
});

/*显示车辆地理位置模态框*/
$(document).on('click', '.view-dev', function () {
    $('#dev-position-modal').modal('show');
    let targetBtsBdPoint = GPSToBaiduPoint.getBaiduPointLocation([[$(this).attr('data-lng'), $(this).attr('data-lat')]])[0];
    devLat = targetBtsBdPoint.lat;
    devLng = targetBtsBdPoint.lng;

    drawMap(devLat,devLng);
});

//画设备的地理位置
function drawMap(devLat,devLng){
    setTimeout(function(){
        /* 初始化地图*/
        let map = new BMap.Map("devMap");
        let point =  new BMap.Point(devLng, devLat);
        map.centerAndZoom(point, 12);
        var icon = new BMap.Icon('img/car1.png', new BMap.Size(22, 44), {      //20，30是图片大小
            //anchor: new BMap.Size(11, 0)      //这个是信息窗口位置（可以改改看看效果）
            imageOffset: new BMap.Size(0,0)
        });
        icon.setImageSize(new BMap.Size(20, 40));
        // 创建标注
        let marker = new BMap.Marker(point,{
            icon:icon
        });  
        map.addOverlay(marker);              
        /*解决弹出框地图的标注不在地图中心的问题*/
        let loadCount = 0;
        map.addEventListener("tilesloaded",function(){
            if(loadCount == 0){
                map.setCenter(point);
            }else{
                loadCount = 0 ;
            } 
        }); 
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
}

/* 修改*/
$(document).on('click', '.update-dev', function () {
    let divIndex = $($($(this).parent()).parent()).index();
    let vehicleInfo = resultCache[divIndex];
    let confirmTime = vehicleInfo.confirmTime;
    
    /* 显示修改模态框*/
    $('#dev-input-modal').html(ModalContent.getVehicleInfoHtml(2, vehicleInfo));
    $('#vehicle-information-submit-update').attr('data-i',$(this).attr('data-index'));
    $('#dev-modal').modal('show');
    /* $('#query-time-end-timeDev').attr('placeholder',confirmTime); */
    $('#query-time-end-timeDev').attr('value',confirmTime);
    $('.confirm').attr('data-i',divIndex);
});

//打开录入模态框
$(document).on('click', '.entry-dev', function () {
    let divIndex = $($($(this).parent()).parent()).index();
    let vehicleInfo = resultCache[divIndex];
    let confirmTime = vehicleInfo.confirmTime;
    
    /* 显示录入模态框*/
    $('#dev-input-modal').html(ModalContent.getVehicleInfoHtml(3, vehicleInfo));
    $('#dev-input-submit').attr('data-i',$(this).attr('data-index'));
    $('#dev-modal').modal('show');
    if(confirmTime ==''){
        confirmTime = new Date().Format("yyyy-MM-dd hh:mm:ss");
        $('#query-time-start-timeDev').attr('value',confirmTime);
    }else{
        $('#query-time-start-timeDev').attr('value',confirmTime);
    }
    $('.confirm').attr('data-i',divIndex);
});

//确认录入
function Null(val){
    if(val==''){
        return null;
    }else{
        return val;
    }
}
function removeNaN(val){
    if(isNaN(val)){
        return null;
    }else{
        return val;
    }
}

$(document).on('click', '#dev-input-submit', function () {
    let id = parseInt($(this).attr('data-index'));
    let divIndex = $(this).attr('data-i');
    let vehicleInfo = resultCache[divIndex];
    let entryVo = new VehicleVo();
    entryVo.id = id;
    entryVo.vehicleNum = $('#vehicleNum-input').val();
    entryVo.vehicleType = $('#vehicleType-input').val();
    entryVo.model = $('#vehicleModel-input').val();
    entryVo.deptId = parseInt($('#dept-input-container-value').attr('data-dept-id'));
    if($('.adminType').val() != ''){
        entryVo.managerId = removeNaN(parseInt($('.adminType').attr('managerId')));
        entryVo.managerName = $('.adminType').val();
    } else{
        managerFlag = true;
    }
    if($('.driver').val() != ''){
        entryVo.driverId = removeNaN(parseInt($('.driver').attr('managerId')));
        entryVo.driverName = $('.driver').val();
    } else{
        driverFlag = true;
    }
    entryVo.plateNum = $('#plateNum-input').val();
    entryVo.remark = $('#remark-input').val();
    entryVo.confirmTime = Null($('#query-time-start-timeDev').val());
    
    if(vehicleInfo.plateNum == entryVo.plateNum){
        plateNumFlag = true;
    }
    if(entryVo.vehicleType!=''&&entryVo.deptId!='' && plateNumFlag && driverFlag && managerFlag){
        doOperation(entryVo, 'entryVehicle', '录入');
        $('.table-in-todo').eq(divIndex).attr('confirmTime',entryVo.confirmTime);
        $('#vehicleType-input').val('');
        $('#remark-input').val('');
    }else if(entryVo.vehicleType==''){
        $('#is-vehicleType-true').html(`<span class="text-red">车辆类型不能为空</span>`);
    }else if(entryVo.deptId==''){
        $('#is-dept-true').html(`<span class="text-red">所属机构不能为空</span>`);
    }
    
});

$(document).on('blur','#vehicleType-input',function(){
    if(this.value == ''){
        $('#is-vehicleType-true').html(`<span class="text-red">车辆类型不能为空</span>`);
    }else{
        $('#is-vehicleType-true').html(``);
    }
})

//确认修改
$(document).on('click', '#vehicle-information-submit-update', function () {
    let divIndex = $(this).attr('data-i');
    let vehicleInfo = resultCache[divIndex];
    let id = parseInt($(this).attr('data-index'));
    let updateVo = new VehicleVo();
    updateVo.id = id;
    updateVo.vehicleNum = $('#vehicleNum-input').val();
    updateVo.vehicleType = $('#vehicleType-input').val();
    updateVo.model = $('#vehicleModel-input').val();
    updateVo.deptId = parseInt($('#dept-input-container-value').attr('data-dept-id'));
    if($('.adminType').val() != ''){
        updateVo.managerId = parseInt($('.adminType').attr('managerId'));
        updateVo.managerName = $('.adminType').val();
    } else{
        managerFlag = true;
    }
    if($('.driver').val() != ''){
        updateVo.driverId = removeNaN(parseInt($('.driver').attr('managerId')));
        updateVo.driverName = $('.driver').val();
    } else{
        driverFlag = true;
    }
    updateVo.plateNum = $('#plateNum-input').val();
    if(vehicleInfo.plateNum == updateVo.plateNum){
        plateNumFlag = true;
    }
    updateVo.confirmTime = Null($('#query-time-end-timeDev').val());
   
    updateVo.remark = $('#remark-input').val();
    if(updateVo.vehicleType!=''&&updateVo.deptId!='' && plateNumFlag && driverFlag && managerFlag){
        doOperation(updateVo, 'updateVehicle', '修改');
        $('#vehicleType-input').val('');
        $('#remark-input').val('');
    }else if(updateVo.vehicleType==''){
        $('#is-vehicleType-true').html(`<span class="text-red">车辆类型不能为空</span>`);
    }else if(updateVo.deptId==''){
        $('#is-dept-true').html(`<span class="text-red">所属机构不能为空</span>`);
    }
});

//车辆类型选择
$(document).on('click', '.vehicle-selector', function () {
    $('#vehicleType').html($(this).html());
})
//所属选择
$(document).on('click', '.unit-selector', function () {
    $('#unitType').html($(this).html());
})

//详情
$(document).on('click', '.vehicle-details', function () {
    let divIndex = $($($(this).parent()).parent()).index();
    let vehicleInfo = resultCache[divIndex];   
    /* 显示详情模态框*/
    $('#dev-input-modal').html(ModalContent.getVehicleInfoHtml(1, vehicleInfo));
    $('#dev-modal').modal('show');
});

/* 打开下属设备管理框*/
let selectedDevCahce = [];
$(document).on('click', '.vehicle_dev_manage', function () {
    $('#vehicle-dev-manage-modal').modal('show');
    $('#search_dev').val('');
    selectedDevCahce = [];
    $('#vehicle-modal-submit').attr('data-vehicleId', $(this).attr('data-vehicleId'))
    $('.loading-gif').attr('src', 'img/loading.gif');
    $('.loading-word').html('加载中...')
    $('.submit-loading').css('display', 'block');
    $('#dev-selected-area').html('');
    VehicleOperation.operation(null, `getDevList`, 'GET').then((result) => { // 获取全部设备列表
        if (result.retcode == 1) {
            if (result.dataList != null && result.dataList.length > 0) {
                DevListPanel.drawAll(result.dataList);
            }
            else{
                $('#dev-table-tbody').html('');
            }
           
        } else {
            $('.loading-gif').attr('src', 'img/submit_fail.png');
            $('.loading-word').html(`<span style="color: rgb(255, 120, 120);">加载失败</span > `);
            setTimeout(function () {
                $('.submit-loading').fadeOut(500);
            }, 700);
            $('#dev-table-tbody').html('');
        }
    });
    VehicleOperation.operation(null, `getVehicleDevList/${$(this).attr('data-vehicleId')}`, 'GET').then((result) => { // 获取车辆下属设备列表
        if (result.retcode == 1) {
            console.log(result);
           
            if (result.dataList != null && result.dataList.length > 0) {
                DevListPanel.drawUser(result.dataList); // 显示列表的方法
                $('#vehicle-modal-submit').attr('data-flag', 1);
                for(let i = 0; i < result.dataList.length; i++){
                    selectedDevCahce.push(result.dataList[i].devId);
                }
            }else{
                $('#dev-selected-area').html('');
                $('#vehicle-modal-submit').attr('data-flag', 0);
            }
            $('.submit-loading').css('display', 'none');
        } else {
            $('.loading-gif').attr('src', 'img/submit_fail.png');
            $('.loading-word').html(`<span style="color: rgb(255, 120, 120);">加载失败</span > `);
            $('#dev-selected-area').html('');
            setTimeout(function () {
                $('.submit-loading').fadeOut(500);
            }, 700);
        }
    });
});

//下属设备新增
$(document).on('click', '.dev_select', function(){
    let devId = $(this).attr('data-devId');
    let disCode = $(this).attr('data-disCode');
    let status = $(this).attr('data-status');
    if(status == 0){
        let htmlValue2 = `
            <div class="dev_item dev_item-${disCode}" data-devId="${devId}" data-disCode="${disCode}">   
                <span class="data-display data-display-delete" data-status=0>${disCode}</span>
                <span class="delete_dev" data-ensuer="${disCode}"></span>
            </div> 
        `;
        $('#dev-selected-area').append(htmlValue2);
        $(this).attr('data-status', 1);
        $('.select-user-block-' + disCode).addClass('select-user-block-active');
    }else{
        $('.dev_item-' + disCode).remove();
        $(this).attr('data-status', 0);
        $('.select-user-block-' + disCode).removeClass('select-user-block-active');
    }
    
})

//下属设备删除
$(document).on('click', '.delete_dev', function(){
    let disCode = $(this).attr('data-ensuer');
    $('.dev_item-' + disCode).remove();
    $('.dev_select-' + disCode).attr('data-status', 0);
    $('.select-user-block-' + disCode).removeClass('select-user-block-active');
    if($('.dev_select-' + disCode).hasClass("dev_select") == false){
        $('.select-user-block-' + disCode).removeClass('select-user-block-unactive');
        $('.dev_select-' + disCode).addClass("dev_select");
        $('.dev_select-' + disCode + ' .data-display').html(disCode);
    }
})

//下属设备管理新增或修改提交按钮
$(document).on('click', '#vehicle-modal-submit', function(){
    let flag = $(this).attr('data-flag');
    let VehicleInfo = new VehicleVo();
    VehicleInfo.vehicleId = parseInt($(this).attr('data-vehicleId'));
    let list = $('#dev-selected-area .dev_item');
    let arrayList = [];
    for(let i = 0; i < list.length; i++){
        arrayList.push(parseInt($('#dev-selected-area .dev_item').eq(i).attr('data-devId')))
    }
    VehicleInfo.devIds = arrayList;
    //该车辆有下属设备且已选设备不为空或不为空
    if(flag == 1 && arrayList.length >= 0){
        if(JSON.stringify(selectedDevCahce) == JSON.stringify(arrayList)){
            $('#vehicle-dev-manage-modal').modal('hide');
        }else{
            doOperation(VehicleInfo, 'addOrUpdateVehicleDev', '提交');
        }
    }
    //该车辆无下属设备且已选设备为空
    if(flag == 0 && arrayList.length == 0){
        $('#vehicle-dev-manage-modal').modal('hide');
    }
    //该车辆无下属设备且已选设备不为空
    if(flag == 0 && arrayList.length > 0){
        doOperation(VehicleInfo, 'addOrUpdateVehicleDev', '添加设备');
    }
})

//设备模糊搜索方法
function searchDevFn(val){
    VehicleOperation.operation(null, `getDevList/${val}`, 'GET').then((result) => { // 模糊搜索获得设备列表
        if (result.retcode == 1) {
            if (result.dataList != null && result.dataList.length > 0) {
                DevListPanel.drawAll(result.dataList);
            }
            else{
                $('#dev-table-tbody').html(`
                    <span class="error_span_img"></span>
                    <span class="error_span_word">您搜索的设备不存在!</span>
                `);
            }
           
        } else {
            $('#dev-table-tbody').html(`
                <span class="error_span_img"></span>
                <span class="error_span_word">您搜索的设备不存在!</span>
            `);
        }
    });
}

//设备模糊搜索方式1
$(document).on('click', '.search_button', function(){
    let val = $('#search_dev').val();
    searchDevFn(val)
})

//设备模糊搜索方式2
$(document).on('keypress', '#search_dev', function (e) {
    if (e.which == 13) {
        searchDevFn($('#search_dev').val());
    }
});

$(document).on('click','.data-display-delete', function(){
    let status = $(this).attr('data-status');
    if(status == 0){
        $(this).siblings('.delete_dev').css('display','block');
        $(this).attr('data-status',1);
    }else{
        $(this).siblings('.delete_dev').css('display','none');
        $(this).attr('data-status',0);
    }
});

/*选择管理员*/
$(document).on('click', '.manager-selector', function () {
    $('.adminType').val($(this).attr('data-name'));
    $('.adminType').attr('managerId', $(this).attr('managerId'));
});

/*选择使用者*/
$(document).on('click', '.driver-selector', function () {
    $('.driver').val($(this).attr('data-name'));
    $('.driver').attr('managerId', $(this).attr('managerId'));
});

let managerFlag = true;
/*打开管理员选择列表*/
$(document).on('click', '#manager-button', function () {
    let deptId = $('#dept-input-container-value').attr('data-dept-id')
    VehicleOperation.operation(null, `getUserByDeptId/${deptId}`, 'GET').then((result) => { // 获取机构下管理员
        if (result.retcode == 1) {
            if (result.data != null && result.data.length > 0) {
                ManagerListPanel.drawManager(result.data);
                managerFlag = true;
                $('#is-managerIs').html('')
            }
            else{
                $('#managerList').html('');
                $('#is-managerIs').html(`<span class="text-red">该机构下无管理员</span>`);
                managerFlag = false;
            }
           
        } else {
            $('#is-managerIs').html(`<span class="text-red">该机构下无管理员</span>`);
            managerFlag = false;
        }
    });
})

let driverFlag = true;
/*打开使用者选择列表*/
$(document).on('click', '#driver-button', function () {
    let deptId = $('#dept-input-container-value').attr('data-dept-id')
    VehicleOperation.operation(null, `getUserByDeptId/${deptId}`, 'GET').then((result) => { // 获取机构下使用者
        if (result.retcode == 1) {
            if (result.data != null && result.data.length > 0) {
                ManagerListPanel.drawDriver(result.data);
                driverFlag = true;
                $('#is-driverIs').html('')
            }
            else{
                $('#is-driverIs').html(`<span class="text-red">该机构下无使用人</span>`);
                driverFlag = false;
            }
           
        } else {
            $('#is-driverIs').html(`<span class="text-red">该机构下无使用人</span>`);
            driverFlag = false;
        }
    });
})

//模糊查询
$(document).on('keyup', '#manager-button', function () {
    $("#managerList").css('display', 'block');//只要输入就显示列表框  
    if ($("#manager-button").val().length <= 0) {  
        $(".manager-selector").css('display', 'block');//如果什么都没填，跳出，保持全部显示状态 
        return;  
    }  

     
    $(".manager-selector").css('display', 'none');//如果填了，先将所有的选项隐藏
    for (var i = 0; i < $(".manager-selector").length; i++) {  
        //模糊匹配，将所有匹配项显示[匹配首字母]  
        if ($(".manager-selector").eq(i).text().substr(0, $("#manager-button").val().length) == $("#manager-button").val()) {
            $(".manager-selector").eq(i).css('display', 'block');
        } 
        //匹配全部文字
        if($(".manager-selector").eq(i).text().indexOf( $("#manager-button").val() )!=-1 ){
            $(".manager-selector").eq(i).css('display', 'block');
        }  
    }  
});

$(document).on('keyup', '#driver-button', function () {
    $("#driverList").css('display', 'block');//只要输入就显示列表框  
    if ($("#driver-button").val().length <= 0) {  
        $(".driver-selector").css('display', 'block');//如果什么都没填，跳出，保持全部显示状态 
        return;  
    }  

     
    $(".driver-selector").css('display', 'none');//如果填了，先将所有的选项隐藏
    for (var i = 0; i < $(".driver-selector").length; i++) {  
        //模糊匹配，将所有匹配项显示[匹配首字母]  
        if ($(".driver-selector").eq(i).text().substr(0, $("#driver-button").val().length) == $("#driver-button").val()) {
            $(".driver-selector").eq(i).css('display', 'block');
        } 
        //匹配全部文字
        if($(".driver-selector").eq(i).text().indexOf( $("#driver-button").val() )!=-1 ){
            $(".driver-selector").eq(i).css('display', 'block');
        }  
    }  
});

$("body").click(function () {  
    $("#driverList").css('display', 'none');
    $('#managerList').css('display','none');
});