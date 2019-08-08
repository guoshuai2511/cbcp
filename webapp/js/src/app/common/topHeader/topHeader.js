import { MyCookie } from '../cookie/MyCookie.js';
import { CommonUtil } from '../util/CommonUtil.js';

export class TopHeader {

    static initHeader() {
        let currentUrl = window.location.pathname;
        let TopHeaderHtml = '';
        TopHeaderHtml = TopHeaderHtml + `
            <!--delet by guoshuai 2018-9-20 -->
            <img class="top-header-icon" src="img/police_title_icon.png">
            <span class="top-header-title">协同作战指挥平台(内测版)</span>
            <!--delet by guoshuai 2018-9-20 -->
            <!--add by guoshuai 2018-9-20-->
            <!--end by guoshuai 2018-9-20-->
            <!--<div class="top-header-logo-bata"></div>-->
            <div class="top-header-menu">
        `;
        for (let i = 0; i < menuList.length; i++) {
            if (menuList[i].name == '个人中心') {
                continue;
            }
            if (menuList[i].childMenu != null) {
                let isActive = '';
                for (let j = 0; j < menuList[i].childMenu.length; j++) {
                    if (currentUrl.indexOf(menuList[i].childMenu[j].url) >= 0) {
                        isActive = 'header-menu-item-active';
                        break;
                    }
                }
                TopHeaderHtml = TopHeaderHtml + `
                    <div class="header-menu-content">
                        <div class="header-menu-item mdui-ripple ${isActive}" data-menu-index="${i}">
                            ${menuList[i].name}
                            <!-- delete by guoshuai start 2018-10-8
                            <i class="mdui-icon material-icons menu-arrow-down">&#xe5c5;</i>
                            delete by guoshuai end 2018-10-8-->
                            <!--delete by guoshuai start-->
                            <p style="width: 11px;height: 9px;background:url('img/iconpic/slide.png') no-repeat;background-size:100% 100%;position:absolute;top:14px;left:80%;"></p>
                            <!--add by guoshuai end 2018-10-8-->
                        </div>
                        <div class="header-menu-dropdown header-menu-dropdown-${i}">
                `;
                for (let j = 0; j < menuList[i].childMenu.length; j++) {
                    TopHeaderHtml = TopHeaderHtml + `
                            <div class="header-menu-dropdown-item mdui-ripple" ${currentUrl.indexOf(menuList[i].childMenu[j].url) >= 0 ? 'style="background:rgb(0, 97, 160)"' : ''} onclick="window.location.href='${menuList[i].childMenu[j].url.substring(1, menuList[i].childMenu[j].url.length)}'">${menuList[i].childMenu[j].name}</div>
                    `;
                }
                TopHeaderHtml = TopHeaderHtml + `
                        </div>
                    </div>
                `;
            } else {
                TopHeaderHtml = TopHeaderHtml + `
                    <div class="header-menu-content">
                        <div class="header-menu-item mdui-ripple ${currentUrl.indexOf(menuList[i].url) >= 0 && menuList[i].name != '数据分析' ? 'header-menu-item-active' : ''}" data-menu-index="${i}" ${menuList[i].name != '数据分析' ? `onclick="window.location.href='${menuList[i].url.substring(1, menuList[i].url.length)}'"` : ''}>${menuList[i].name}</div>
                    </div>
                `;
            }
        }
        /*delete by guoshuai start 2018-9-28
        TopHeaderHtml = TopHeaderHtml + `
            </div>
            <div class="login-user-name">
                <div class="mdui-ripple">
                    当前用户：
                    ${username}
                    <i class="mdui-icon material-icons menu-arrow-down">&#xe5c5;</i>
                </div>
                <div class="user-option">
                    <div class="option-item mdui-ripple" onclick="window.location.href='systemManage/userCenter'">个人中心</div>
                    <div class="option-item mdui-ripple" id="logout-btn">退出</div>
                </div>
            </div>
            <div class="header-current-time header-info-txt"></div>
        `;
        delete by guoshuai end 2018-9-28*/
        /*
        let TopHeaderHtml = `
            <img class="top-header-icon" src="${pot}/img/police_title_icon.png">
            <span class="top-header-title">协同作战指挥平台</span>
            <div class="top-header-menu">
                <div class="header-menu-content">
                    <div id="home-folder" class="header-menu-item mdui-ripple" data-menu-index="0" onclick="window.location.href='${pot}/home'">总览</div>
                </div>
                <div class="header-menu-content">
                    <div id="combat-folder" class="header-menu-item mdui-ripple" data-menu-index="1">
                        作战指挥<i class="mdui-icon material-icons menu-arrow-down">&#xe5c5;</i>
                    </div>
                    <div class="header-menu-dropdown header-menu-dropdown-1">
                        <div id="real-time-combat-page" class="header-menu-dropdown-item mdui-ripple" onclick="window.location.href='${pot}/commandManage/realTimeCombat'">实时作战</div>
                        <div id="combat-replay-page" class="header-menu-dropdown-item mdui-ripple" onclick="window.location.href='${pot}/commandManage/combatReplay'">历史回放</div>
                    </div>
                </div>
                <div class="header-menu-content">
                    <div class="header-menu-item mdui-ripple" data-menu-index="2">
                        数据分析<i class="mdui-icon material-icons menu-arrow-down">&#xe5c5;</i>
                    </div>
                    <div class="header-menu-dropdown header-menu-dropdown-2">
                        <div class="header-menu-dropdown-item mdui-ripple">敬请期待</div>
                    </div>
                </div>
                <div class="header-menu-content">
                    <div id="system-folder" class="header-menu-item mdui-ripple" data-menu-index="3">
                        系统管理<i class="mdui-icon material-icons menu-arrow-down">&#xe5c5;</i>
                    </div>
                    <div class="header-menu-dropdown header-menu-dropdown-3">
                        <div id="user-manage-page" class="header-menu-dropdown-item mdui-ripple" onclick="window.location.href='${pot}/systemManage/userManage'">用户管理</div>
                        <div id="role-manage-page" class="header-menu-dropdown-item mdui-ripple" onclick="window.location.href='${pot}/systemManage/roleManage'">角色管理</div>
                        <div id="dept-manage-page" class="header-menu-dropdown-item mdui-ripple" onclick="window.location.href='${pot}/systemManage/deptManage'">组织机构管理</div>
                    </div>
                </div>
            </div>
            <div class="login-user-name">
                <div class="mdui-ripple">
                    当前用户：
                    ${username}
                    <i class="mdui-icon material-icons menu-arrow-down">&#xe5c5;</i>
                </div>
                <div class="user-option">
                    <div class="option-item mdui-ripple" onclick="window.location.href='${pot}/systemManage/userCenter'">个人中心</div>
                    <div class="option-item mdui-ripple" id="logout-btn">退出</div>
                </div>
            </div>
            <div class="header-current-time header-info-txt"></div>
        `;
        */
        /*add by guoshuai start 2018-9-28*/
        TopHeaderHtml = TopHeaderHtml + `
            </div>
            <div class="login-user-name">
                <div style="
                    top: 16px;
                    z-index:1000;
                    position: absolute;
                    
                    width: 100%;
                    
                ">  
                    <!--
                    <div id="umr-mess"></div>
                    -->
                    <div id="umr-user"></div>
                    <!--
                    <i 
                    style="display:block;
                    float: left;
                    " id="umr-x";
                    ></i>
                    -->
                    <span id="uo-sp2" style="text-overflow: ellipsis; overflow:hidden;font-size: 18px;"  title=${username}>
                            ${username}
                    </span>
                </div>
                <div class="user-option">
                    <!--
                    <div id ="user-text-box"
                     style="border-bottom:1px solid #03172f;
                            width:120px;
                            height:32px;
                            line-height:32px;
                    ">
                        <span id="uo-sp1"></span>
                        <span id="uo-sp2" style="text-overflow: ellipsis; overflow:hidden;font-size: 18px;"  title=${username}>
                            ${username}
                        </span>
                    </div>
                    -->
                    <div id="userCenter-set" onclick="window.location.href='systemManage/userCenter'"
                        style="
                            border-bottom:1px solid #03172f;
                            width:120px;
                            height:32px;
                            line-height:32px;
                            border-top: 1px solid #0e3463;
                            cursor: pointer;
                        "
                    >
                        <span id="us-sp1"></span>
                        <span id="us-sp2">个人设置</span>
                    </div>
                    <div id="logout-btn"
                            style="
                                width:120px;
                                height:32px;
                                line-height:32px;
                                border-top: 1px solid #0e3463;
                                cursor: pointer;
                        ">
                            <span id="oi-sp1"></span>
                            <span id="oi-sp2">退出</span>
                    </div>    
                </div>
            </div>
            <div class="header-current-time header-info-txt"></div>
            <div onclick="window.location.href='systemManage/userCenter'" id="dgrzx" class="option-item mdui-ripple"></div>
		    <div id="fhdsy" class="option-item mdui-ripple"></div>
        `;
        /*add by guoshuai end 2018-9-28*/
        $('.top-header').append(TopHeaderHtml);
        function getCookie(cname) {
            let name = cname + '=';
            let ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i].trim();
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return '';
        }
        //获取头部图片3.获取logo信息后保存或更新到cookie——若cookie没有则新增，若有且不一致则更新
        //if(!getCookie('homeLogoImgUrl')){
        if( window.localStorage.homeLogoImgUrl==undefined){
            $.ajax({
                url: "home/getSysLogoInfo",
                type: 'GET',
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    if (result.retcode == 1 && result.dataMap && result.dataMap.data && result.dataMap.data.homeLogoImgUrl != "" && typeof(result.dataMap.data.homeLogoImgUrl) != "undefined") {
                        loginLogoImgUrl = result.dataMap.data.loginLogoImgUrl;
                        homeLogoImgUrl =  result.dataMap.data.homeLogoImgUrl;
                        
                        /* MyCookie.setCookie('homeLogoImgUrl',homeLogoImgUrl,365);
                        MyCookie.setCookie('loginLogoImgUrl',loginLogoImgUrl,365); */
                        window.localStorage.setItem('loginLogoImgUrl',loginLogoImgUrl);
                        window.localStorage.setItem('homeLogoImgUrl',homeLogoImgUrl);
                        let htmlValue=`
                            <div class="login-title-word" style="background:url('${loginLogoImgUrl}')"></div>
                        `;
                        $('#login-title-word-box').append(htmlValue);
                        document.getElementById('top-header').style.backgroundImage = "url('"+homeLogoImgUrl+"')";
                    }else{
                        homeLogoImgUrl = 'img/iconpic/logo2.png';
                        document.getElementById('top-header').style.backgroundImage = "url('"+homeLogoImgUrl+"')"
                        let htmlValue='<div id="login-title-word"></div>';
                        loginLogoImgUrl =  htmlValue; 
                        $('#login-title-word-box').append(htmlValue);
                    }
                },
                error: function() {
                
                }
            });
        }else{
            /* loginLogoImgUrl = getCookie('loginLogoImgUrl'); */
            loginLogoImgUrl = window.localStorage.loginLogoImgUrl
            let htmlValue=`
                <div class="login-title-word" style="background:url('${loginLogoImgUrl}')"></div>
            `;
            $('#login-title-word-box').append(htmlValue);
            /* homeLogoImgUrl = getCookie('homeLogoImgUrl'); */
            homeLogoImgUrl = window.localStorage.homeLogoImgUrl;
            document.getElementById('top-header').style.backgroundImage = "url('"+homeLogoImgUrl+"')";

        }

        $('#logout-btn').click(function () {
            MyCookie.deleteCookie('combatReplayQueryCache');
            MyCookie.deleteCookie('combatReplayPlayTimeCache');
            window.location.href = `logout`;
        });

        /*add by guoshuai start 2018-9-28*/
        $(document).on("click","#fhdsy",function () {
            MyCookie.deleteCookie('combatReplayQueryCache');
            MyCookie.deleteCookie('combatReplayPlayTimeCache');
            window.location.href = `logout`;
        });
        /*add by guoshuai end 2018-9-28*/

        $('.header-menu-item').click(function () {
            $('.header-menu-dropdown').slideUp(300);
            if ($('.header-menu-dropdown-' + $(this).attr('data-menu-index')).css('display') == 'none') {
                $('.header-menu-dropdown-' + $(this).attr('data-menu-index')).slideDown(200);
            }
        });

        $('.login-user-name').click(function () {
            if ($('.user-option').css('display') == 'none') {
                $('.user-option').slideDown(200);
                /*add by guoshuai start 2018-9-28*/
                $('#fhdsy').css('display','block');
                $('#dgrzx').css('display','block');
                $('.login-user-name').css('height','160px');
                /*add by guoshuai end 2018-9-28*/
            } else {
                $('.user-option').slideUp(200);
                /*add by guoshuai start 2018-9-28*/
                $('#fhdsy').css('display','none');
                $('#dgrzx').css('display','none');
                $('.login-user-name').css('height','70px');
                /*add by guoshuai end 2018-9-28*/
            }
        });
        $('body').mousedown(function (e) {
            try {
                if (e.target.className.indexOf('header-menu-dropdown-item') != -1) {
                    $('.user-option').slideUp(200);
                    /*add by guoshuai start 2018-9-28*/
                    $('#fhdsy').css('display','none');
                    $('#dgrzx').css('display','none');
                    $('.login-user-name').css('height','70px');
                    /*add by guoshuai end 2018-9-28*/
                } else if (e.target.className.indexOf('option-item') != -1) {
                    $('.header-menu-dropdown').slideUp(300);
                } else {
                    $('.user-option').slideUp(200);
                    $('.header-menu-dropdown').slideUp(300);
                    /*add by guoshuai start 2018-9-28*/
                    $('#fhdsy').css('display','none');
                    $('#dgrzx').css('display','none');
                    $('.login-user-name').css('height','70px');
                    /*add by guoshuai end 2018-9-28*/
                }
            } catch (error) {
                $('.user-option').slideUp(200);
                $('.header-menu-dropdown').slideUp(300);
                /*add by guoshuai start 2018-9-28*/
                $('#fhdsy').css('display','none');
                $('#dgrzx').css('display','none');
                $('.login-user-name').css('height','70px');
                /*add by guoshuai end 2018-9-28*/
            }
        });

        let startTimeValue = CommonUtil.getServerDate().getTime();

        let week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        $('.header-current-time').html(new Date(startTimeValue).Format('yyyy-MM-dd hh:mm:ss') + '&nbsp;&nbsp;' + week[new Date(startTimeValue).getDay()]);
        setInterval(function () {
            startTimeValue = startTimeValue + 1000;
            $('.header-current-time').html(new Date(startTimeValue).Format('yyyy-MM-dd hh:mm:ss') + '&nbsp;&nbsp;' + week[new Date(startTimeValue).getDay()]);
        }, 1000);



    }


}
