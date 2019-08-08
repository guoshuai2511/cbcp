import { TopHeader } from '../../common/topHeader/TopHeader.js';
import { VehicleDispatchOperation } from './ajax/VehicleDispatchOperation.js';
import { GPSToBaiduPoint } from '../../common/baiduMap/GPSToBaiduPoint.BaiduMap.js';
import { WebSocketConnection } from './websocket/WebSocketConnection.js';
import { WebSocketJSONProcess } from './websocket/WebSocketJSONProcess.js';
import { VehicleOverlayConstructor } from './overLay/VehicleOverlayConstructor.js';

/* js版本号，判断服务器端是否已刷新*/
console.log('js.version=2.1.10');
/* 生成顶部菜单 */
TopHeader.initHeader();
/* 打开websocket*/
function openWebsocket() {
    let webSocketUrl = [
        'ws:' + projectUrl + '/websocket/vehicleMonitor',
        'ws:' + projectUrl + '/websocket/vehicleMonitor',
        'ws:' + projectUrl + '/sockjs/websocket/vehicleMonitor'
    ];
    let webSocket = new WebSocketConnection(webSocketUrl);
    webSocket.onopen = WebSocketJSONProcess.onOpen;
    webSocket.onmessage = WebSocketJSONProcess.onMessage;
    webSocket.onerror = WebSocketJSONProcess.onError;
    webSocket.onclose = WebSocketJSONProcess.onClose;
}
/* 建立websocket连接*/
openWebsocket();

//搜索设备的方法
function searchAllDev(selectedDevList) {
    $('.modal-group-vehicle-list-content').html('');
    VehicleDispatchOperation.operation(null, `getVehicleListByKeyWord/`, 'GET').then((result) => {
        if (result.retcode == 1) {
            if (result.dataList != null) {
                let list = result.dataList;
                let htmlValue = ``;
                if (selectedDevList == null || selectedDevList == '' || selectedDevList == undefined) {
                    for (let i = 0; i < list.length; i++) {
                        htmlValue = htmlValue + `
                            <div class="data-member" id="${list[i].plateNum}" data-status=0 data-id="${list[i].id}">
                                <span id="${list[i].plateNum}" class="select-dev-block"></span>
                                <span class="data-display">${list[i].plateNum}</span>
                            </div>
                        `;
                    }
                } else {
                    for (let i = 0; i < list.length; i++) {
                        if (selectedDevList.indexOf(list[i].plateNum) != -1) {
                            htmlValue = htmlValue + `
                                <div class="data-member" id="${list[i].plateNum}" data-status=1 data-id="${list[i].id}">
                                    <span id="${list[i].plateNum}" class="select-dev-block select-dev-block-active"></span>
                                    <span class="data-display">${list[i].plateNum}</span>
                                </div>
                            `;
                        } else {
                            htmlValue = htmlValue + `
                                <div class="data-member" id="${list[i].plateNum}" data-status=0 data-id="${list[i].id}">
                                    <span id="${list[i].plateNum}" class="select-dev-block"></span>
                                    <span class="data-display">${list[i].plateNum}</span>
                                </div>
                            `;
                        }
                    }
                }
                $('.modal-group-vehicle-list-content').html(htmlValue);
            } else {
                $('.modal-group-vehicle-list-content').html(``)
            }

        } else {
            $('.modal-group-vehicle-list-content').html(``)
        }
    }).catch((e) => {
        $('.modal-group-vehicle-list-content').html(`<span class="text-red">http错误${e.status}</span>`);
    });
}
//勾选设备
$(document).on('click', '.data-member', function () {
    let disCode = $(this).attr('id');
    let devId = $(this).attr('data-id');
    let status = $(this).attr('data-status');
    if (status == 0) {
        $(this).children('.select-dev-block').addClass('select-dev-block-active');
        let htmlValue = `
            <div class="vehicleItem dev-${disCode}">
                <span class="dev-item" data-id="${devId}">
                    ${disCode}
                </span>
                <span class="delete-vehicle-this"></span>
                <span>&nbsp;</span>
            </div>
        `;
        if ($('.dev-' + disCode).length < 1) {
            $('.modal-group-vehicle-content').append(htmlValue);
        }

        $(this).attr('data-status', 1);
    } else if (status == 1) {
        $(this).children('.select-dev-block').removeClass('select-dev-block-active');
        $('.dev-' + disCode).remove();
        $(this).attr('data-status', 0);
    }
})
//删除选中的设备
$(document).on('click', '.delete-vehicle-this', function () {
    $(this).parent('.vehicleItem').remove();
    let devName = $(this).parent('.vehicleItem').children('.dev-item').text().replace(/\s*/g, "");
    if ($('#' + devName).attr('data-status') == 1) {
        $('#' + devName).attr('data-status', 0);
        $('#' + devName).children('.select-dev-block').removeClass('select-dev-block-active');
    }
})
//搜索特定的设备编号方法
function searchDev(data, selectedDevList) {
    $('.modal-group-vehicle-list-content').html('');
    VehicleDispatchOperation.operation(null, `getVehicleListByKeyWord/${data}`, 'GET').then((result) => {
        if (result.retcode == 1) {
            if (result.dataList != null) {
                let list = result.dataList;
                let htmlValue = ``;
                if (selectedDevList == null || selectedDevList == '' || selectedDevList == undefined) {
                    for (let i = 0; i < list.length; i++) {
                        htmlValue = htmlValue + `
                            <div class="data-member" id="${list[i].plateNum}" data-status=0 data-id="${list[i].id}">
                                <span id="${list[i].plateNum}" class="select-dev-block"></span>
                                <span class="data-display">${list[i].plateNum}</span>
                            </div>
                        `;
                    }
                } else {
                    for (let i = 0; i < list.length; i++) {
                        if (selectedDevList.indexOf(list[i].plateNum) != -1) {
                            htmlValue = htmlValue + `
                                <div class="data-member" id="${list[i].plateNum}" data-status=1 data-id="${list[i].id}">
                                    <span id="${list[i].plateNum}" class="select-dev-block select-dev-block-active"></span>
                                    <span class="data-display">${list[i].plateNum}</span>
                                </div>
                            `;
                        } else {
                            htmlValue = htmlValue + `
                                <div class="data-member" id="${list[i].plateNum}" data-status=0 data-id="${list[i].id}">
                                    <span id="${list[i].plateNum}" class="select-dev-block"></span>
                                    <span class="data-display">${list[i].plateNum}</span>
                                </div>
                            `;
                        }
                    }
                }
                $('.modal-group-vehicle-list-content').html(htmlValue);
            } else {
                $('.modal-group-vehicle-list-content').html(``)
            }

        } else {
            $('.modal-group-vehicle-list-content').html(``)
        }
    }).catch((e) => {
        $('.modal-group-vehicle-list-content').html(`<span class="text-red">http错误${e.status}</span>`);
    });
}
// //搜索栏搜索车辆或设备
$(document).on('keyup', '.modal-group-vehicle-list-input', function () {
    let val = $(this).val();
    if (val == '') {
        searchAllDev(null);
    } else {
        searchDev(val, null);
    }
});
//搜索栏搜索车辆或设备
$(document).on('click', '.modal-group-vehicle-list-img', function () {
    let val = $(".modal-group-vehicle-list-input").val();
    if (val == '') {
        searchAllDev(null);
    } else {
        searchDev(val, null);
    }
});
$(document).on('keyup', '.vehicle-list-dev-search-input', function () {
    let val = $(this).val();
    if (val == '') {
        initVehicleQuery(val);
    } else {
        // initVehicleQuery(val);
    }
});
$(document).on('click', '.vehicle-list-dev-search-img', function () {
    let val = $('.vehicle-list-dev-search-input').val();
    if (val == '') {

    } else {
        initVehicleQuery(val);
    }
});
//收集选中的设备名称
function getSelectDevAggregateName() {
    let length = $('#devSelectedArea .vehicleItem').length;
    let list = [];
    for (let i = 0; i < length; i++) {
        list.push($('.vehicleItem').eq(i).children('.dev-item').text().replace(/\s/g, ''));
    }
    return list;
}
function checkNameNull(data) {
    if (data == undefined || data == '') {
        $('.modal-group-name-tips').html("请填写队伍名称");
        $('.modal-group-name-tips').show();
    } else {
        $('.modal-group-name-tips').hide();
    }
}
function checkVehicleNull(data) {
    if (data == undefined || data.length <= 0) {
        $('.modal-group-vehicle-tips').html("请选择车辆");
        $('.modal-group-vehicle-tips').show();
    } else {
        $('.modal-group-vehicle-tips').hide();
    }
}
function checkName(data) {
    let resultData = { flag: false, content: "验证失败,请重试" };
    let url = 'enforceManage/vehicleDispatch/' + `checkTeamName/${data}/`;
    let method = 'GET';
    $.ajax({
        url: url,
        type: method,
        async: false,
        contentType: "application/json; charset=utf-8",
        data: null,
        dataType: 'json',
        success: function (result) {
            if (result.retcode == 1) {
                resultData.content = result.message;
                resultData.flag = true;
                $('.modal-group-name-tips').hide();
            } else {
                resultData.content = result.message;
                resultData.flag = false;
                $('.modal-group-name-tips').html(result.message);
                $('.modal-group-name-tips').show();
            }
        },
        error: function (error) {
            $('.modal-group-name-tips').html("验证失败，请重试");
            $('.modal-group-name-tips').show();
        },
    });
    return resultData;
}
$(document).on('click', '#groupSure', function () {
    let vehicleDispatchVo = new VehicleDispatchVo();
    let length = $('.modal-group-vehicle-content .vehicleItem').length;
    let list = [];
    let url = "";
    let content = "";
    let checkNameFlag = true;
    for (let i = 0; i < length; i++) {
        list.push($('.vehicleItem').eq(i).children('.dev-item').attr("data-id"));
    }
    vehicleDispatchVo.teamName = $('.modal-group-name-content').val().replace(/\s*/g, "");
    vehicleDispatchVo.vehicleIds = list;
    checkNameNull(vehicleDispatchVo.teamName);
    checkVehicleNull(vehicleDispatchVo.vehicleIds);
    if (vehicleDispatchVo.teamName != undefined && vehicleDispatchVo.teamName != '' && vehicleDispatchVo.vehicleIds != undefined && vehicleDispatchVo.vehicleIds.length > 0) {
        if (editId != null && editId != "") {
            url = "updateVehicleTeam";
            vehicleDispatchVo.teamId = editId;
            content = "更新";
        } else {
            url = "addVehicleTeam";
            content = "新增";
            checkNameFlag = checkName(vehicleDispatchVo.teamName).flag;
        };
        if (checkNameFlag) {
            $('.submit-loading').css('display', 'block');
            $('.modal-group-name-tips').hide();
            $('.modal-group-vehicle-tips').hide();
            VehicleDispatchOperation.operation(JSON.stringify(vehicleDispatchVo), url, 'POST').then((result) => {
                if (result.retcode == 1) {
                    $('.loading-gif').attr('src', 'img/submit_success.png');
                    $('.loading-word').html(`<span style="color: rgb(10, 180, 0);">${content}成功</span > `);
                    setTimeout(function () {
                        $('.submit-loading').fadeOut(800);
                    }, 1000);
                    initVehicleTeamQuery();
                } else {
                    $('.loading-gif').attr('src', 'img/submit_fail.png');
                    $('.loading-word').html(`<span style="color: rgb(255, 120, 120);">${content}失败</span > `);
                    setTimeout(function () {
                        $('.submit-loading').fadeOut(800);
                    }, 1000);
                }
            }).catch((e) => {
                $('.loading-gif').attr('src', 'img/submit_fail.png');
                $('.loading-word').html(`<span style="color: rgb(255, 120, 120);">${content}失败</span > `);
                setTimeout(function () {
                    $('.submit-loading').fadeOut(800);
                }, 1000);
            });
            $('#vehicleDispatch-add-modal').modal('hide');
        }
    }
})
$(document).on('click', '#dismissGroup', function () {
    if (editId) {
        dismissGroup(editId);
    }
})

/* 解散编队*/
function dismissGroup(data) {
    $('#modal-alert-content').html("是否解散该编队");
    $('#ensure-modal').modal('show');
    $('#ensure-modal-submit').unbind("click");
    $('#ensure-modal-submit').click(function () {
        $('#ensure-modal').modal('hide');
        $('.submit-loading').css('display', 'block');
        VehicleDispatchOperation.operation(null, `deleteVehicleTeam/${data}`, 'GET').then((result) => {
            if (result.retcode == 1) {
                $('.loading-gif').attr('src', 'img/submit_success.png');
                $('.loading-word').html(`<span style="color: rgb(10, 180, 0);">解散成功</span > `);
                setTimeout(function () {
                    $('.submit-loading').fadeOut(800);
                }, 1000);
                initVehicleTeamQuery();
            } else {
                $('.loading-gif').attr('src', 'img/submit_fail.png');
                $('.loading-word').html(`<span style="color: rgb(255, 120, 120);">解散失败</span > `);
                setTimeout(function () {
                    $('.submit-loading').fadeOut(800);
                }, 1000);
            }
        }).catch((e) => {
            $('.loading-gif').attr('src', 'img/submit_fail.png');
            $('.loading-word').html(`<span style="color: rgb(255, 120, 120);">解散失败</span > `);
            setTimeout(function () {
                $('.submit-loading').fadeOut(800);
            }, 1000);
        });
        $('#ensure-modal-submit').unbind("click");
        $('#vehicleDispatch-add-modal').modal('hide');
    });
};


initVehicleQuery("");
initVehicleTeamQuery();
//车辆、群组信息获取
function initVehicleQuery(data) {
    $('.load-loading').css('display', 'block');
    $('.load-loading-gif').attr('src', 'img/loading.gif');
    $('.vehicle-list-dev-content').html("");
    let html = "";
    let vehicleNum = 0;
    VehicleDispatchOperation.operation(null, `getVehicleTreeListByKeyWord/${data}`, 'GET').then((result) => {
        if (result.retcode == 1 && result.dataList != null && result.dataList.length > 0) {
            console.log(result);
            let provinceList = result.dataList;
            $('.no-data-tablesarch').remove();
            for (let i = 0; i < provinceList.length; i++) {
                let cityList = provinceList[i].citysData;
                vehicleNum = vehicleNum+provinceList[i].count;
                html = html + `	<div class="vehicle-list-dev-content-province">
                <div class="vehicle-list-province-each">
                    <div class="vehicle-list-province-dropdown" dropdown-id="${provinceList[i].province}" dropdown-status="close"></div>
                    <div class="vehicle-list-province-name">${provinceList[i].province}(${provinceList[i].count})</div>
                </div>
                <div class="vehicle-list-dev-content-province-each-list vehicle-list-dev-content-province-each-list-${provinceList[i].province}">`;
                for (let j = 0; j < cityList.length; j++) {
                    let vehicleList = cityList[j].vehicles;
                    html = html + `	<div class="vehicle-list-dev-content-city">
                    <div class="vehicle-list-city-each">
                        <div class="vehicle-list-city-dropdown" dropdown-id="${cityList[j].city}" dropdown-status="close"></div>
                        <div class="vehicle-list-city-name">${cityList[j].city}(${cityList[j].count})</div>
                    </div>
                    <div class="vehicle-list-dev-content-city-each-list vehicle-list-dev-content-city-each-list-${cityList[j].city}">
                    `;
                    for (let k = 0; k < vehicleList.length; k++) {
                        html = html + `
                    <div class="vehicle-list-dev-each" choose-status="false" data-id="${vehicleList[k].id}">
                        <div class="vehicle-list-dev-each-car">${vehicleList[k].driverRealName}(${vehicleList[k].driverTel})</div>
                        <div class="vehicle-list-dev-each-type" title="${(vehicleList[k].address == "" || vehicleList[k].address == undefined || vehicleList[k].address == null) ? "暂无地址信息" : vehicleList[k].address}">${(vehicleList[k].address == "" || vehicleList[k].address == undefined || vehicleList[k].address == null) ? "暂无地址信息" : vehicleList[k].address}</div>
                        <div class="vehicle-list-dev-each-dept">${vehicleList[k].plateNum}</div>
                    </div>
                    `;
                        if (vehicleNumCache.get(vehicleList[k].vehicleNum) == null) {
                            vehicleNumCache.set(vehicleList[k].vehicleNum, vehicleList[k]);
                        }
                    }
                    html = html + `</div></div>`;
                }
                html = html + `</div></div>`;
            }
            $('.information-in-map-vehicle-content').html(vehicleNum+"辆");
            $('.vehicle-list-dev-content').html(html);
            // $('.load-loading-gif').attr('src', 'img/submit_success.png');
            // $('.load-loading-word').html(`<span style="color: rgb(10, 180, 0);">获取成功</span > `);
            $('.load-loading').hide();
        } else {
            $('.table-view-data-area').append(`
                <div class= "no-data-tablesarch">
                    <img class="no-data-icon" src="img/no_data_icon_search.png">
                    <span class="no-data-word">暂无相关数据</span>
                </div>
                `)
            // $('.load-loading-gif').attr('src', 'img/submit_fail.png');
            // $('.load-loading-word').html(`<span style="color: rgb(255, 120, 120);">获取失败</span > `);
            $('.load-loading').hide();
        }
    }).catch((e) => {
        $('.table-view-data-area').append(`
        <div class= "no-data-tablesarch">
            <img class="no-data-icon" src="img/no_data_icon_search.png">
            <span class="no-data-word">暂无相关数据</span>
        </div>
        `)
        // $('.load-loading-gif').attr('src', 'img/submit_fail.png');
        // $('.load-loading-word').html(`<span style="color: rgb(255, 120, 120);">获取失败</span > `);
        $('.load-loading').hide();
    })
};
function initVehicleTeamQuery() {
    $('.load-loading').css('display', 'block');
    $('.load-loading-gif').attr('src', 'img/loading.gif');
    let htmlGroup = "";
    let groupNum = 0;
    VehicleDispatchOperation.operation(null, "getVehicleTeamList", 'GET').then((result) => {
        if (result.retcode == 1 && result.dataList != null && result.dataList.length > 0) {
            console.log(result);
            $('.no-data-tablesarch-group').remove();
            let groupList = result.dataList;
            groupNum = groupList.length;
            for (let i = 0; i < groupList.length; i++) {
                let vehicleList = groupList[i].vehicleList;
                let vehicleIdList = [];
                let vehicleNameList = [];
                let vehicleListDiv = "";
                for (let j = 0; j < vehicleList.length; j++) {
                    vehicleListDiv = vehicleListDiv + `
                        <div class="vehicle-list-group-list-each">
                            <div class="vehicle-list-group-list-each-name">${vehicleList[j].plateNum}</div>
                            <div class="vehicle-list-group-list-each-type">（${vehicleList[j].vehicleType}-${vehicleList[j].model}）</div>
                        </div>
                    `;
                    vehicleIdList.push(vehicleList[j].id);
                    vehicleNameList.push(vehicleList[j].plateNum);
                }
                htmlGroup = htmlGroup + `
                    <div class="vehicle-list-group-each-container">
                        <div class="vehicle-list-group-each">
                            <div class="vehicle-list-group-dropdown vehicle-list-group-dropdown-${groupList[i].teamId}" dropdown-id="${groupList[i].teamId}" dropdown-status="close"></div>
                            <div class="vehicle-list-group-name" data-id="${groupList[i].teamId}">${groupList[i].teamName}</div>
                            <div class="vehicle-list-group-edit" id="vehicle-list-group-edit-${groupList[i].teamId}" data-id="${groupList[i].teamId}"data-name="${groupList[i].teamName}"></div>
                        </div>
                        <div class="vehicle-list-group-list" id="vehicle-list-group-list-${groupList[i].teamId}">
                            ${vehicleListDiv}
                        </div>
                        </div>`;
                vehicleGroupCache.set(`${groupList[i].teamId}`, vehicleIdList);
                vehicleGroupNameCache.set(`${groupList[i].teamId}`, vehicleNameList);
            }
            $('.information-in-map-group-content').html(groupNum);
            $('.vehicle-list-group-container').html(htmlGroup);
            // $('.load-loading-gif').attr('src', 'img/submit_success.png');
            // $('.load-loading-word').html(`<span style="color: rgb(10, 180, 0);">获取成功</span > `);
            $('.load-loading').hide();
        } else {
            $('.vehicle-list-group-container').html(`<div class="table-view-data-area-group"></div>`);
            $('.table-view-data-area-group').append(`
                <div class= "no-data-tablesarch">
                    <img class="no-data-icon" src="img/no_data_icon_search.png">
                    <span class="no-data-word">暂无相关数据</span>
                </div>
                `)
            // $('.load-loading-gif').attr('src', 'img/submit_fail.png');
            // $('.load-loading-word').html(`<span style="color: rgb(255, 120, 120);">获取失败</span > `);
            $('.load-loading').hide();
        }
    }).catch((e) => {
        $('.vehicle-list-group-container').html(`<div class="table-view-data-area-group"></div>`);
        $('.table-view-data-area-group').append(`
        <div class= "no-data-tablesarch">
            <img class="no-data-icon" src="img/no_data_icon_search.png">
            <span class="no-data-word">暂无相关数据</span>
        </div>
        `)
        // $('.load-loading-gif').attr('src', 'img/submit_fail.png');
        // $('.load-loading-word').html(`<span style="color: rgb(255, 120, 120);">获取失败</span > `);
        $('.load-loading').hide();
    });
};

//车辆与群组切换
$(document).on('click', '.vehicle-list-switch', function () {
    let chooseId = $(this).attr("id");
    $(".vehicle-list-switch").css("color", "rgba(92,116,147,1)");
    $(this).css("color", "rgba(23, 193, 244, 1)");
    if (chooseId == "vehicle-list-switch-dev") {
        $(".vehicle-list-dev-container").show();
        $(".vehicle-list-group-container").hide();
    } else {
        $(".vehicle-list-dev-container").hide();
        $(".vehicle-list-group-container").show();
    }
});
//群组下拉
$(document).on('click', '.vehicle-list-group-dropdown', function () {
    let groupId = $(this).attr('dropdown-id');
    if ($(this).attr('dropdown-status') == "close") {
        $(this).css("background", "url(img/icon/dropdown_on.png)");
        $(`#vehicle-list-group-list-${groupId}`).show();
        $(this).attr("dropdown-status", "open");
    } else {
        $(this).css("background", "url(img/icon/dropdown_off.png)");
        $(`#vehicle-list-group-list-${groupId}`).hide();
        $(this).attr("dropdown-status", "close");
    }
});

//省份下拉
$(document).on('click', '.vehicle-list-province-each', function () {
    let provinceId = $(this).children('.vehicle-list-province-dropdown').attr('dropdown-id');
    if ($(this).children('.vehicle-list-province-dropdown').attr('dropdown-status') == "close") {
        $(this).children('.vehicle-list-province-dropdown').css("background", "url(img/icon/triangle_dropdown_on.png)");
        $(`.vehicle-list-dev-content-province-each-list-${provinceId}`).show();
        $(this).children('.vehicle-list-province-dropdown').attr("dropdown-status", "open");
    } else {
        $(this).children('.vehicle-list-province-dropdown').css("background", "url(img/icon/triangle_dropdown_off.png)");
        $(`.vehicle-list-dev-content-province-each-list-${provinceId}`).hide();
        $(this).children('.vehicle-list-province-dropdown').attr("dropdown-status", "close");
    }
});

//市级下拉
$(document).on('click', '.vehicle-list-city-each', function () {
    let cityId = $(this).children('.vehicle-list-city-dropdown').attr('dropdown-id');
    if ($(this).children('.vehicle-list-city-dropdown').attr('dropdown-status') == "close") {
        $(this).children('.vehicle-list-city-dropdown').css("background", "url(img/icon/triangle_dropdown_on.png)");
        $(`.vehicle-list-dev-content-city-each-list-${cityId}`).show();
        $(this).children('.vehicle-list-city-dropdown').attr("dropdown-status", "open");
    } else {
        $(this).children('.vehicle-list-city-dropdown').css("background", "url(img/icon/triangle_dropdown_off.png)");
        $(`.vehicle-list-dev-content-city-each-list-${cityId}`).hide();
        $(this).children('.vehicle-list-city-dropdown').attr("dropdown-status", "close");
    }
});

//新建群组
$('.vehicle-list-add-group').click(function () {
    searchAllDev(null);
    editId = "";
    $('#vehicle-modal-title').html("新增车辆编队");
    $('#dismissGroup').hide();
    $('.modal-group-name-content').val("");
    $('.modal-group-name-content').removeAttr("disabled");
    $('.modal-group-name-content').css("cursor", "auto");
    $('.modal-group-vehicle-content').html("");
    $('#vehicleDispatch-add-modal').modal('show');
});
//编辑群组
$(document).on('click', '.vehicle-list-group-edit', function () {
    $('#vehicle-modal-title').html("修改车辆编队");
    $('.modal-group-vehicle-content').html("");
    $('#dismissGroup').show();
    let groupId = $(this).attr("data-id");
    editId = groupId;
    let groupName = $(this).attr("data-name");
    let vehicleIdlist = vehicleGroupCache.get(groupId);
    let vehicleNamelist = vehicleGroupNameCache.get(groupId);
    searchAllDev(vehicleNamelist);
    for (let i = 0; i < vehicleIdlist.length; i++) {
        let htmlValue = `
        <div class="vehicleItem dev-${vehicleNamelist[i]}">
            <span class="dev-item" data-id="${vehicleIdlist[i]}">
                ${vehicleNamelist[i]}
            </span>
            <span class="delete-vehicle-this"></span>
            <span>&nbsp;</span>
        </div>
    `;
        $('.modal-group-vehicle-content').append(htmlValue);
    }
    $('.modal-group-name-content').val(groupName);
    $('.modal-group-name-content').attr("disabled", "disabled");
    $('.modal-group-name-content').css("cursor", "not-allowed");
    $('#vehicleDispatch-add-modal').modal('show');
});
//车辆悬浮变色
$(document).on('mouseenter', '.vehicle-list-dev-each', function () {
    $(this).children('.vehicle-list-dev-each-car').css("color", "#17C1F4");
    $(this).children('.vehicle-list-dev-each-dept').css("color", "#17C1F4");
});
$(document).on('mouseleave', '.vehicle-list-dev-each', function () {
    if ($(this).attr("choose-status") != "true") {
        $(this).children('.vehicle-list-dev-each-car').css("color", "#FCFDFD");
        $(this).children('.vehicle-list-dev-each-dept').css("color", "#FCFDFD");
    }
});
//选中车辆
$(document).on('click', '.vehicle-list-dev-each', function () {
    let vehicleId = $(this).attr("data-id");
    let pointArr = [];
    selectedVehicleId = [];
    // $('.vehicleMarker-img').attr("src", "img/vehicleMarker.png");
    // $(`.vehicleMarker-img-${vehicleId}`).attr("src", "img/vehicleMarkerChoose.png");
    $(`.vehicleMarker-license-plate`).css("display", "none");
    $(`.vehicleMarker-license-plate-${vehicleId}`).css("display", "block");
    if (vehiclePointCache.get(`${vehicleId}`) != undefined && vehiclePointCache.get(`${vehicleId}`) != null) {
        pointArr.push(vehiclePointCache.get(`${vehicleId}`));
        selectedVehicleId.push(vehicleId);
        let v = map.getViewport(pointArr);
        // if (!!carMarkerClustererWorking) {
        //     for (let key of vehicleIconCache.keys()) {
        //         carMarkerClustererWorking.removeMarker(vehicleIconCache.get(key));
        //         carMarkerClustererWorking.addMarker(vehicleIconCache.get(key));
        //     }
        // }
        map.centerAndZoom(v.center, 19);
        map.setZoom(map.getZoom()-1);
        map.setZoom(map.getZoom()+1);
    }
    $('.vehicle-list-dev-each-car').css("color", "#FCFDFD");
    $('.vehicle-list-dev-each-dept').css("color", "#FCFDFD");
    $('.vehicle-list-group-name').css("color", "#FCFDFD");
    $('.vehicle-list-group-name').attr("choose-status", "false");
    $('.vehicle-list-dev-each').attr("choose-status", "false");
    $(this).children('.vehicle-list-dev-each-car').css("color", "#17C1F4");
    $(this).children('.vehicle-list-dev-each-dept').css("color", "#17C1F4");
    $(this).attr("choose-status", "true");
});
//车辆群组悬浮变色
$(document).on('mouseenter', '.vehicle-list-group-name', function () {
    $(this).css("color", "#17C1F4");
});
$(document).on('mouseleave', '.vehicle-list-group-name', function () {
    if ($(this).attr("choose-status") != "true") {
        $(this).css("color", "#FCFDFD");
    }
});
//选中群组
$(document).on('click', '.vehicle-list-group-name', function () {
    let groupId = $(this).attr("data-id");
    let vehicleIdList = vehicleGroupCache.get(groupId);
    let pointArr = [];
    selectedVehicleId = [];
    if (vehicleIdList != undefined && vehicleIdList != null) {
        if (!!vehiclePointCache.size) {
            // $('.vehicleMarker-img').attr("src", "img/vehicleMarker.png");
            $(`.vehicleMarker-license-plate`).css("display", "none");
            for (let i = 0; i < vehicleIdList.length; i++) {
                $(`.vehicleMarker-license-plate-${vehicleIdList[i]}`).css("display", "block");
                // $(`.vehicleMarker-img-${vehicleIdList[i]}`).attr("src", "img/vehicleMarkerChoose.png");
                pointArr.push(vehiclePointCache.get(`${vehicleIdList[i]}`));
                selectedVehicleId.push(vehicleIdList[i]);
            }
            let v = map.getViewport(pointArr);
            // if (!!carMarkerClustererWorking) {
            //     for (let key of vehicleIconCache.keys()) {
            //         carMarkerClustererWorking.removeMarker(vehicleIconCache.get(key));
            //         carMarkerClustererWorking.addMarker(vehicleIconCache.get(key));
            //     }
            // }
            map.centerAndZoom(v.center, v.zoom);
            map.setZoom(map.getZoom()-1);
            map.setZoom(map.getZoom()+1);
        }
    }
    if ($(`.vehicle-list-group-dropdown-${groupId}`).attr('dropdown-status') == "close") {
        $(`.vehicle-list-group-dropdown-${groupId}`).css("background", "url(img/icon/dropdown_on.png)");
        $(`#vehicle-list-group-list-${groupId}`).show();
        $(`.vehicle-list-group-dropdown-${groupId}`).attr("dropdown-status", "open");
    } else {
        $(`.vehicle-list-group-dropdown-${groupId}`).css("background", "url(img/icon/dropdown_off.png)");
        $(`#vehicle-list-group-list-${groupId}`).hide();
        $(`.vehicle-list-group-dropdown-${groupId}`).attr("dropdown-status", "close");
    }
    $('.vehicle-list-dev-each-car').css("color", "#FCFDFD");
    $('.vehicle-list-dev-each-dept').css("color", "#FCFDFD");
    $('.vehicle-list-group-name').css("color", "#FCFDFD");
    $('.vehicle-list-group-name').attr("choose-status", "false");
    $(this).css("color", "#17C1F4");
    $(this).attr("choose-status", "true");
});

/* 目标点击显示详细信息*/
$(document).on('click', '.vehicleMarker-img, .vehicleMarker-info-panel-close', function () {
    let id = $(this).attr("data-id");
    if ($(`.vehicleMarkerIcon-${id}`).attr('data-open-status') == 'open') {
        /* 关闭*/
        $(`.vehicleMarkerIcon-${id}`).attr('data-open-status', 'close');
        $(`.vehicleMarker-info-panel-${id}`).css('display', 'none');
        $(`.vehicleMarkerIcon-${id}`).css('z-index', $(`.vehicleMarkerIcon`).attr('z-index-temp'));
        vehiclePanelCache.set(id,"close");
    } else {
        /* 打开*/
        $(`.vehicleMarkerIcon-${id}`).attr('z-index-temp', $(`.vehicleMarkerIcon`).css('z-index'));
        $(`.vehicleMarkerIcon-${id}`).attr('data-open-status', 'open');
        $(`.vehicleMarker-info-panel-${id}`).css('display', 'block');
        $(`.vehicleMarkerIcon-${id}`).css('z-index', 9000);
        vehiclePanelCache.set(id,"open");
    }

});


/* 最新动态跳转点击事件*/
$(document).on('click', '.vehicleMarker-realPlay', function () {
    if ($(this).attr('data-case-serial') != undefined && $(this).attr('data-case-serial') != null && $(this).attr('data-case-serial') != "") {
        window.location.href = `./home/getRealTimeCombatInfo/${$(this).attr('data-case-serial')}`;
    }
});

$('.map-search-radius-container').click(function (e) {
    $('.map-search-radius-choose').toggle();
    e = e || event;
    stopFunc(e);
});
document.onclick = function (e) {
    $(".map-search-radius-choose").hide();
}
function stopFunc(e) {
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
}
$(document).on('click', '.map-search-radius-choose-each', function () {
    let status = $(this).attr("status");
    if (status != 3) {
        let radius = $(this).attr("data-radius");
        let zoom = $(this).attr("data-zoom");
        $('.map-search-radius-content-input').val("");
        $('.map-search-radius-content-input-container').hide();
        $('.map-search-radius-container').attr("status", status);
        $('.map-search-radius-container').attr("data-radius", radius);
        $('.map-search-radius-container').attr("data-zoom", zoom);
        $('.map-search-radius-content').html($(this).text());
        $('.map-search-radius-choose').hide();
        $('.map-search-radius-container').attr("data-status", 0);
    } else {
        $('.map-search-radius-container').attr("status", status);
        $('.map-search-radius-content-input-container').show();
        $('.map-search-radius-content-input').focus();
    }
});
$(document).on('click', '.map-search-btn', function () {
    let val = $(".map-search-input").val();
    if (val == '') {
    } else {
        setPlace(val);
    }
});
$(document).on('keypress', '.map-search-input', function (event) {
    if (event.keyCode == "13") {
        let val = $(".map-search-input").val();
        if (val == '') {
        } else {
            setPlace(val);
        }
    }
});
$(document).on('keyup', '.map-search-input', function (event) {
    let val = $(".map-search-input").val();
    if (val == '') {
        $('.map-search-input-close').hide();
    } else {
        $('.map-search-input-close').show();
    }
});
$(document).on('click', '.map-search-input-close', function (event) {
    $(".map-search-input").val("")
    if (!!circle) {
        map.removeOverlay(circle);
        circle = null;
    }
    if (!!searchMarker) {
        map.removeOverlay(searchMarker);
        searchMarker = null;
    }
    $(this).hide();
});
function getZoomByRadius(radius) {
    let zoom = 14;
    if (radius > 600000) {
        zoom = 6;
    } else if (200000 <= radius && radius <= 500000) {
        zoom = 7;
    } else if (100000 <= radius && radius < 200000) {
        zoom = 9;
    } else if (50000 <= radius && radius < 100000) {
        zoom = 10;
    } else if (300000 <= radius && radius < 50000) {
        zoom = 11;
    } else if (10000 <= radius && radius < 30000) {
        zoom = 12;
    } else if (5000 <= radius && radius < 10000) {
        zoom = 13;
    } else if (2000 <= radius && radius < 5000) {
        zoom = 14;
    } else if (1000 <= radius && radius < 2000) {
        zoom = 15;
    } else if (200 <= radius && radius < 1000) {
        zoom = 18;
    } else if (radius < 200) {
        zoom = 21;
    }
    return zoom;
}

function G(id) {
    return document.getElementById(id);
}
let ac = new BMap.Autocomplete(    //建立一个自动完成的对象
    {
        "input": "suggestId"
        , "location": map
    });

ac.addEventListener("onhighlight", function (e) {  //鼠标放在下拉列表上的事件
    let str = "";
    let _value = e.fromitem.value;
    let value = "";
    if (e.fromitem.index > -1) {
        value = _value.province + _value.city + _value.district + _value.street + _value.business;
    }
    str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

    value = "";
    if (e.toitem.index > -1) {
        _value = e.toitem.value;
        value = _value.province + _value.city + _value.district + _value.street + _value.business;
    }
    str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
    G("searchResultPanel").innerHTML = str;
});
let myValue;
ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件
    let _value = e.item.value;
    myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
    G("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
    setPlace(null);
});

function setPlace(data) {
    function myFun() {
        let status = $('.map-search-radius-container').attr("status");
        let radius = $('.map-search-radius-container').attr("data-radius");
        if (!!$('.map-search-radius-content-input').val()) {
            radius = $('.map-search-radius-content-input').val() * 1000;
        }
        let zoom = $('.map-search-radius-container').attr("data-zoom");
        if (!!circle) {
            map.removeOverlay(circle);
            circle = null;
        }
        if (!!searchMarker) {
            map.removeOverlay(searchMarker);
            searchMarker = null;
        }
        let point = local.getResults().getPoi(0).point;
        let mPoint = new BMap.Point(point.lng, point.lat);
        map.enableScrollWheelZoom();
        searchMarker = new BMap.Marker(mPoint);
        if (status == 2) {
            circle = new BMap.Circle(mPoint, radius, { fillColor: "blue", strokeWeight: 1, fillOpacity: 0.1, strokeOpacity: 0.1 });
            map.addOverlay(circle);
            map.centerAndZoom(mPoint, zoom);
        } else if (status == 3) {
            if (radius <= 500000) {
                circle = new BMap.Circle(mPoint, radius, { fillColor: "blue", strokeWeight: 1, fillOpacity: 0.1, strokeOpacity: 0.1 });
                map.addOverlay(circle);
            }
            map.centerAndZoom(mPoint, getZoomByRadius(radius));
        }
        else {
            map.centerAndZoom(mPoint, 10);
        }
        map.addOverlay(searchMarker);
    }
    let local = new BMap.LocalSearch(map, { //智能搜索
        onSearchComplete: myFun
    });
    if (!data) {
        local.search(myValue);
    } else {
        local.search(data);
    }
}
// map.addEventListener("click", function (e) {
//     $(`.vehicleMarker-license-plate`).css("display", "none");
//     $('.vehicle-list-dev-each-car').css("color", "#FCFDFD");
//     $('.vehicle-list-dev-each-dept').css("color", "#FCFDFD");
//     $('.vehicle-list-group-name').css("color", "#FCFDFD");
//     $('.vehicle-list-group-name').attr("choose-status", "false");
//     $('.vehicle-list-dev-each').attr("choose-status", "false");
// });