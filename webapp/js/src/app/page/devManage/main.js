import { TopHeader } from '../../common/topHeader/topHeader.js';
import { MyCookie } from '../../common/cookie/MyCookie.js';

import { DevOperation } from './ajax/DevOperation.js';
import { DrawTable } from './table/DrawTable.js';
import { PageInfo } from './table/PageInfo.js';
import { ModalContent } from './table/ModalContent.js';
import { GPSToBaiduPoint } from '../../common/baiduMap/GPSToBaiduPoint.BaiduMap.js';
import { DeptTree } from './tree/DeptTree.js';

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

let isDevCodeExistAdd = false;
let isdeptId = false;
let isSubmitContinue = false;

/* 搜索条件缓存*/
devQuery.pageNum = 1;
devQuery.pageSize = pageItemNum;

initQuery();

function initQuery() {
    let initQueryData = new DevQueryBean();
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
    devQuery.pageNum = 1;
    devQuery.pageSize = pageItemNum;
    query(devQuery);
});

/* 获取组织机构树状图*/
DevOperation.operation(null, `getDeptTreeList`, 'GET').then((result) => {
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
    $('#dev-selector-button').html(`<span id="dev-query-selector-input" data-vehicleid="0" style="color: #fff;">&nbsp;</span> <span class="caret" style="float: right;"></span>`);
    let deptId = $('#selected-institutions-value').attr('data-dept-id');
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
    let devQueryCos = new DevQueryBean();
    devQueryCos.devCode = $('#name-value').val().replace(/(^\s*)|(\s*$)/g, "");
    devQueryCos.deptId = $('#dept-query-selector-input').attr('data-dept-id');
    devQueryCos.pageNum = 1;
    devQueryCos.pageSize = pageItemNum;
    devQuery = devQueryCos;
    query(devQuery);
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
/* 新增弹出框口 */
$('#add-dev-btn').click(function () {
    isSubmitContinue = true;
    $('#dev-input-modal').html(ModalContent.getDevInputHtml(1, null));
    $('#dev-modal').modal('show');
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
/* 修改*/

$(document).on('click', '.update-dev', function () {
    $('#dev-selector-button').removeAttr('disabled');
    
    let divIndex = $($($(this).parent()).parent()).index();
    let devInfo = resultCache[divIndex - 1];
    
    let confirmTime = devInfo.confirmTime;
    let updateVo = new DevVo();
    updateVo.deptId = $('.table-in-todo').eq(divIndex-1).attr('data-dept-id');
    updateVo.confirmTime = $('.table-in-todo').eq(divIndex-1).attr('data-confirmTime');

    updateVo.status = $('.table-in-todo').eq(divIndex-1).attr('data-status');

    $('#dev-input-submit').attr('data-index',divIndex);
    currentUpdateDev = devInfo;
    isDevCodeExistAdd = false;
    isSubmitContinue = true;
    /* 显示模态框*/
    $('#dev-input-modal').html(ModalContent.getDevInputHtml(2, devInfo));
    $('#dev-modal').modal('show');
    $('#query-time-start-timeDev').attr('value',confirmTime);
    if(devInfo.plateNum==''||devInfo.plateNum==null||devInfo.plateNum==undefined){
        $('#dev-query-selector-input').html('');
        $('#dev-selector-button').css('height','30px');
    }else{
        $('#dev-query-selector-input').html(devInfo.plateNum);
        $('#dev-query-selector-input').attr('data-vehicleId',devInfo.dwVehicleId);
        $('#dev-query-selector-input').css({'display':'block','float': 'left'});
        $('#dev-query-selector-remove').css('display','block');
    }
});
/* 删除*/
$(document).on('click', '.delete-dev', function () {
    let divIndex = $($($(this).parent()).parent()).index();
    let devInfo = resultCache[divIndex - 1];
    let ids = {
        ids: [devInfo.id]
    }
    ensureModal('deleteDev', '是否删除？', ids);
});

/* 批量删除*/
function batchDel() {
    let ids = {
        ids: []
    }
    let statusK=[];

    if (selectedArr.length > 0) {
        for(let j =0; j<$('.table-in-todo').length;j++){
            for(let i =0 ;i<selectedArr.length;i++){
                if(selectedArr[i]==$('.table-in-todo').eq(j).attr('dev-id')){
                    statusK.push($('.table-in-todo').eq(j).attr('data-status'))
                }
            }
        }
       
        ids.ids = selectedArr;
        if(statusK.indexOf('2')==-1){
            ensureModal('deleteDev', '是否删除？', ids);
        }else{
            $('#alert-modal-content').html('有设备处于启用状态');
            $('#alert-modal').modal('show');
        }
    } else {
        $('#alert-modal-content').html('请先勾选');
        $('#alert-modal').modal('show');
    }
};
//设备类型选择
$(document).on('click','.devType-selector',function(){
    $('#devType-input').html($(this).html());
    $('#devType-input').attr('date-devType',$(this).attr('data-devType'))
})

/* 检验设备是否存在*/
$(document).on('blur', '#devCode-input', function () {
    let devCodeVal = $('#devCode-input').val().replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    if (devCodeVal != '') {
        if (/[\u0391-\uffe5]/.test(devCodeVal)) {
            $('#is-have-dev').html(`<span class="text-red">设备编号不能使用中文字符</span>`);
            isSubmitContinue = false;
            return;
        }
        let url = '';
        if($(this).attr('data-type') === '1'){
            url = `checkDevCode/add/${devCodeVal}`
        }else{
            url = `checkDevCode/update/${devCodeVal}/${$(this).attr('data-devId')}`
        }
        isSubmitContinue = false;
        DevOperation.operation(null, url, 'GET').then((result) => {
            isSubmitContinue = true;
            if (result.retcode == 1) {
                isDevCodeExistAdd = false;
                $('#is-have-dev').html(`<span class="text-green">设备编号可用</span>`);
            } else {
                isDevCodeExistAdd = true;
                $('#is-have-dev').html(`<span class="text-red">设备编号已存在</span>`);
            }
        }).catch((e) => {
            isSubmitContinue = true;
            $('#is-have-dev').html(`<span class="text-red">系统异常，http错误${e.status}</span>`);
        });
    }
});

//添加设备
function addDev() {
    let devInfo = new DevVo();
    devInfo.devCode = $('#devCode-input').val().replace(/(^\s*)|(\s*$)/g, ""); 
    devInfo.deptId = parseInt($('#dept-input-container-value').attr('data-dept-id'));
    devInfo.disCode=$('#disCode-input').val();
    devInfo.confirmTime = $('.devComfirmTime').val();
    devInfo.devType = parseInt($('#devType-input').attr('date-devType'));
    if(parseInt($('#dev-query-selector-input').attr('data-vehicleId')) != null && parseInt($('#dev-query-selector-input').attr('data-vehicleId')) != 0 && $('#dev-query-selector-input').attr('data-vehicleId') != undefined){
        devInfo.dwVehicleId = parseInt($('#dev-query-selector-input').attr('data-vehicleId'));
    }
    if (devInfo.devCode != '' && $('#dept-input-container-value').attr('data-dept-id') != '' && devInfo.disCode !='') {
        if (/[\u0391-\uffe5]/.test(devInfo.devCode)) {
            $('#is-have-dev').html(`<span class="text-red">设备编号不能使用中文字符</span>`);
            return;
        }
        if (isDevCodeExistAdd) {
            $('#is-have-dev').html(`<span class="text-red">设备编号已存在</span>`);
        } else {
            doOperation(devInfo, 'addDev', '添加');
        }
    } else {
        if ($("#devCode-input").val() == '') {
            $('#is-have-dev').html(`<span class="text-red">请输入设备编号</span>`);
        }
        if ($("#dept-input-container-value").html() == '') {
            $('#is-dept-true').html(`<span class="text-red">请输入部门</span>`);
        }else{
            $('#is-dept-true').html(``);
        }
        if($("#disCode-input").val() == ''){
            $('#is-have-dis').html(`<span class="text-red">请输入显示编号</span>`);
        }else{
            $('#is-have-dis').html(``);
        }
    }
};
/* 提交操作*/
function doOperation(devInfo, url, word) {
    $('.loading-gif').attr('src', 'img/loading.gif');
    $('.loading-word').html('正在提交...')
    $('.submit-loading').css('display', 'block');
    DevOperation.operation(JSON.stringify(devInfo), url, 'POST').then((result) => {
        if (result.retcode == 1) {
            $('.loading-gif').attr('src', 'img/submit_success.png');
            $('.loading-word').html(`<span style="color: rgb(10, 180, 0)">${word}成功</span>`);
            switch (url) {
                case 'updateDev':
                    query(devQuery);
                    break;
                case 'addDev':
                    initQuery();
                    $('#is-have-dev').html('');
                    $('#is-pwd-true').html('');
                    $('#is-tel-true').html('');
                    break;
                case 'deleteDev':
                    initQuery();
                    break;
                case 'entryDev':
                    initQuery();
                    break;
                case 'disableDev':
                    initQuery();
                break;
                case 'enableDev':
                    initQuery();
                break;
                default:
                    break;
            }
            $('#dev-modal').modal('hide');
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

/* Modal设备信息提交*/
$(document).on('click', '#dev-modal-submit-add', function () {
    if (isSubmitContinue) {
        addDev();
    }
});

/* 危险操作确认框*/
function ensureModal(type, content, data) {
    $('#modal-alert-content').html(content);
    $('#ensure-modal').modal('show');
    $('#ensure-modal-submit').unbind("click");
    $('#ensure-modal-submit').click(function () {
        $('#ensure-modal').modal('hide');
        switch (type) {
            case 'deleteDev':
                doOperation(data, 'deleteDev', '删除');
                break;
            case 'disableDev':
                doOperation(data, 'disableDev', '停用');
            break;
            case 'enableDev':
                doOperation(data, 'enableDev', '启用');
            break;
            default:
                break;
        }
        $('#ensure-modal-submit').unbind("click");
    });
};

/* 设备查询*/
function query(data) {
    DevOperation.operation(JSON.stringify(data), 'getDevList', 'POST').then((result) => {
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

/*显示设备地理位置模态框*/
$(document).on('click', '.view-dev', function () {
    $('#dev-position-modal').modal('show');
    let targetBtsBdPoint = GPSToBaiduPoint.getBaiduPointLocation([[$(this).attr('data-lng'), $(this).attr('data-lat')]])[0];
    devLat = targetBtsBdPoint.lat;
    devLng = targetBtsBdPoint.lng;
    devName = $(this).attr('data-name');
    /* mpaFlag =true; */
    drawMap(devName,devLat,devLng);
});

//画设备的地理位置
function drawMap(devName,devLat,devLng){
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
}


/* 停用*/
$(document).on('click', '.stop-user', function () {
    let divIndex = $($($(this).parent()).parent()).index();
    let devInfo = resultCache[divIndex - 1];
    let ids = {
        ids: [devInfo.id]
    }
    ensureModal('disableDev', '是否停用？', ids);
});

/* 启用*/
$(document).on('click', '.start-user', function () {
    let divIndex = $($($(this).parent()).parent()).index();
    let devInfo = resultCache[divIndex - 1];
    let ids = {
        ids: [devInfo.id]
    }
    ensureModal('enableDev', '是否启用？', ids);
});


//打开录入模态框
$(document).on('click', '.entry-dev', function () {
    $('#dev-selector-button').removeAttr('disabled');
    $('#dev-query-selector-input').html('');
    let divIndex = $($($(this).parent()).parent()).index();
    let devInfo = resultCache[divIndex - 1];
    let entryVo = new DevVo();
    entryVo.deptId = $('.table-in-todo').eq(divIndex-1).attr('data-dept-id');
    entryVo.confirmTime = $('.table-in-todo').eq(divIndex-1).attr('data-confirmTime');
    entryVo.status = $('.table-in-todo').eq(divIndex-1).attr('data-status');
    let confirmTime = devInfo.confirmTime;
    $('#dev-input-submit').attr('data-index',divIndex);
    $('#dev-input-submit').attr('dev-id', $('.table-in-todo').eq(divIndex-1).attr('dev-id'));
    currentUpdateDev = devInfo;
    isDevCodeExistAdd = false;
    isSubmitContinue = true;
    /* 显示模态框*/
    $('#dev-input-modal').html(ModalContent.getDevInputHtml(3, devInfo));
    $('#dev-modal').modal('show');
    $('#query-time-start-timeDev').attr('value',confirmTime);
});

//确认录入
function Null(val){
    if(val==''){
        return null;
    }else{
        return val;
    }
}
$(document).on('click', '#dev-input-submit', function () {
    let divIndex = $(this).attr('data-index');
    let entryVo = new DevVo();
    entryVo.deptId = parseInt($('#dept-input-container-value').attr('data-dept-id'));
    entryVo.confirmTime = Null($('#query-time-start-timeDev').val());
    entryVo.devId = parseInt($('#disCode-input').attr('data-devid'));
    if(parseInt($('#dev-query-selector-input').attr('data-vehicleId')) != null && parseInt($('#dev-query-selector-input').attr('data-vehicleId')) != 0 && $('#dev-query-selector-input').attr('data-vehicleId') != undefined){
        entryVo.dwVehicleId = parseInt($('#dev-query-selector-input').attr('data-vehicleId'));
    }
    doOperation(entryVo, 'entryDev', '录入');
});

//确认修改
$(document).on('click', '#dev-modal-submit-update', function () {
    let divIndex = $(this).attr('data-index');
    let updateVo = new DevVo();
    if(parseInt($('#dev-query-selector-input').attr('data-vehicleId')) != null && parseInt($('#dev-query-selector-input').attr('data-vehicleId')) != 0 && $('#dev-query-selector-input').attr('data-vehicleId') != undefined){
        updateVo.dwVehicleId = parseInt($('#dev-query-selector-input').attr('data-vehicleId'));
    }
    updateVo.deptId = parseInt($('#dept-input-container-value').attr('data-dept-id'));
    updateVo.confirmTime = Null($('#query-time-start-timeDev').val());
    updateVo.devId = parseInt($('#disCode-input').attr('data-devid'));

    updateVo.devCode = $('#devCode-input').val().replace(/(^\s*)|(\s*$)/g, ""); 
    updateVo.disCode=$('#disCode-input').val();

    updateVo.devType = parseInt($('#devType-input').attr('date-devType'));
    if (updateVo.devCode != '' && $('#dept-input-container-value').attr('data-dept-id') != '' && updateVo.disCode != '') {
        if (/[\u0391-\uffe5]/.test(updateVo.devCode)) {
            $('#is-have-dev').html(`<span class="text-red">设备编号不能使用中文字符</span>`);
            return;
        }
        if (isDevCodeExistAdd) {
            $('#is-have-dev').html(`<span class="text-red">设备编号已存在</span>`);
        } else {
            doOperation(updateVo, 'updateDev', '修改');
        }
    } else {
        if ($("#devCode-input").val() == '') {
            $('#is-have-dev').html(`<span class="text-red">请输入设备编号</span>`);
        }
        if ($("#dept-input-container-value").html() == '') {
            $('#is-dept-true').html(`<span class="text-red">请输入部门</span>`);
        }else{
            $('#is-dept-true').html(``);
        }
        if($("#disCode-input").val() == ''){
            $('#is-have-dis').html(`<span class="text-red">请输入显示编号</span>`);
        }else{
            $('#is-have-dis').html(``);
        }
    }
});

/* 所属车辆选择删除*/
$(document).on('click','#dev-query-selector-remove',function () {
    $('#dev-query-selector-input').html('&nbsp;');
    $('#dev-query-selector-input').attr('data-vehicleId', 0);
    $('#dev-query-selector-remove').css('display', 'none');

    
});
//获取机构下的车辆信息
$(document).on('click','#dev-selector-button',function(){
    let deptId = $('#dept-input-container-value').attr('data-dept-id');
    DevOperation.operation(null, 'getDwVehicleListByDeptId/'+deptId, 'GET').then((result) => {
        let htmlVal = '';
        if (result.retcode == 1) {
            if(result.dataList!=''){
                for(let i = 0;i<result.dataList.length;i++){
                    htmlVal = htmlVal+`
                        <div data-vehicleId = ${result.dataList[i].id} data-vehicleNum = ${result.dataList[i].vehicleNum} 
                        data-plateNum = ${result.dataList[i].plateNum} class='vehicle-select-item'>
                            ${result.dataList[i].plateNum}</div>
                    `
                };
            }else{
                //$(this).attr('disabled',true);
                $(this).html('该机构无下属车辆')
            }    
        } else {
          
        }
        $('#dev-query-selector-container').html(htmlVal);
    }).catch((e) => {
                
    });
});

//车辆选择
$(document).on('click','.vehicle-select-item',function(){
    $('#dev-query-selector-remove').css('display','block');
    $('#dev-query-selector-input').html($(this).html().replace(/\s+/g,""));
    $('#dev-query-selector-input').attr('data-vehicleId',$(this).attr('data-vehicleId'));
})