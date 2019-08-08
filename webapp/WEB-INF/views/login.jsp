<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page isELIgnored="false"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<link rel="icon" type="image/ico" href="./img/jiantong_logo.ico?v=2.0.4">
<title>登录</title>
<!-- jquery与bootstrap -->
<script src="./js/lib/jquery/jquery-3.2.1.min.js"></script>
<link rel="stylesheet" href="./js/lib/bootstrarp/css/bootstrap.min.css">
<script src="./js/lib/bootstrarp/js/bootstrap.min.js"></script>
<script type="text/javascript"
	src="js/src/app/page/login/declaration.js?"></script>
<%-- <script src="./js/src/app/common/cookie/MyCookie.js"></script> --%>
<!-- <script src="./js/src/app/common/cookie/login.js"></script> -->
<script type="text/javascript"
	src="js/src/app/page/login/bundle.js?"></script>
<!-- 页面css样式 -->
<link rel="stylesheet" href="./css/login/login.css?v=2.1.5">
<style>
	.bata-page-title-word{
		width: 100px;
		position: absolute;
		left: 47.5%;
		top: 44%;
		color: #fff;
		font-size: 20px;
	}
	/*add by guo shuai start 2018-9-26*/
	#login-bg{
		width: 39.79%;
		height: 44.46%;
		background: url('img/iconpic/log-bg.png');
		background-size: 100% 100%;
		top: 33.26%;
		left: 30.10%;
		position:absolute;
		z-index:100;
	}
	#login-title-word-box{
		width: 90%;
		height: 24.02%;
		border-bottom:1px solid #03172f;
		position:relative;
		left:5%
	}
	#login-title-word{
		width: 80%;
		height: 66px;
		background: url('img/iconpic/log-log.png');
		background-size: 100% 100%;
		background-repeat:no-repeat;
		position:relative;
		left:11%;
		top:19.57%;
	}
	.login-title-word{
		width: 80%;
		height: 66px;
		background-size: 100% 100%;
		position:relative;
		left:11%;
		top:19.57%;
		background-repeat:no-repeat;
	}
	#input-pic1{
		display: block;
		width: 10.86%;
		height: 95%;
		background: url('img/iconpic/log-name.png') no-repeat 50% 50%;
		background-size: 73.68% 73.68%;
		float: left;
		border-right:1px solid #03172f;
	}
	#input-pic2{
		display: block;
		width: 10.86%;
		height: 95%;
		background: url('img/iconpic/log-psw.png') no-repeat 50% 50%;
		background-size: 73.68% 73.68%;
		float: left;
		border-right:1px solid #03172f;

	}
   	#formLogin{
		height:100%;
	}
   	#ipt-tittle-word1{
   		margin-top:6.11%;
   		margin-bottom:3.086%;
   		width:60px;
   		height:18px;
   		font-size:18px;
   		margin-left:20%;
   	}
   	#ipt-tittle-word2{
   		margin-top:3.11%;
   		margin-bottom:3.086%;
   		width:60px;
   		height:18px;
   		font-size:18px;
   		margin-left:20%;
   	}
  	input:-webkit-autofill { 
	   box-shadow: 0 0 0px 1000px #081e39 inset !important;
	   -webkit-text-fill-color: white !important;    
	  }
	#alertMessage-position{
		top: 50%;
	}
	.submit-button-area{
		top:20%;
	}
	@media screen and (max-height: 768px) {
		#alertMessage-position{
			top: 55%;
		}
		.submit-button-area{
			top:11%;
		}
	}
/*add by guoshuai end 2018-9-26*/
</style>
</head>
<!--add by guoshuai start 2018-9-26-->
<!--<body>-->
<body style="background:url('img/bg.jpg');background-size:100% 100%; background-color: #081e39;">
<!--add by guoshuai end 2018-9-26-->
	<!-- 
	<div id="alertMessage">${msg}</div>
	<form name="formLogin" action="" id="formLogin" method="post">
		用户名：<input type="text" id="username" name="username" /><br /> 密码：<input
			type="password" id="password" name="password" /><br /> 验证码：<input
			type="text" name="jcaptchaCode" id="jcaptchaCode"> <img
			style="width: 85px; height: 35px; margin-top: -10px;"
			align="absmiddle" id="jcaptcha" src="/CBCP/jcaptcha.jpg" /> <input
			type="submit" value="登录">
	</form>
 -->

	<div class="background">
		<!--delete by guoshuai start 2018-9-26-->
		<!--<img class="top_bg" src="./img/top_bg.png">-->
		<!--delete by guoshuai end 2018-9-26-->
		<!-- <img class="police_icon" src="./img/police_icon.png"> -->
		<!-- delete content: img 2018-9-18 by guoshuai 2018-9-20 -->
		<!--delete by guoshuai start 2018-9-26-->
		<!--<img class="page-title-word" src="./img/page_title_word.png"> <img
			class="bottom_bg" src="./img/bottom_bg.png">
		<div class="bata-page-title-word">(内测版)</div>-->
		<!--delete by guoshuai end 2018-9-26-->
		<!--add by guoshuai start 2018-9-26-->
		<div id="login-bg">
				<div id="login-title-word-box">
						
				</div>
		<!--add by guoshuai end 2018-9-26-->
		<!-- delete content: img 2018-9-18 by guoshuai 2018-9-20 -->
			<div class="login-area">
				<!-- <img class="login-left-img" src="./img/loginleftkey.png"> -->
				<div class="login-inner">
					<form name="formLogin" action="" id="formLogin" method="post">
						<!--<div class="input-each-position" id="alertMessage-position">-->
						<!--add by guoshuai start 2018-9-26-->
						<div class="input-each-position" id="alertMessage-position"
							style="
								position: absolute;
								
								border: none;
								left: 20%;
								display: none;
								width: 69.72%;
							"
						>
						<!--add by guoshuai end 2018-9-26-->
						<!--delete by guoshuai start 2018-9-26-->
							<!--<span class="glyphicon glyphicon-remove-circle" aria-hidden="true"
								style="position: absolute; top: 9px;"></span>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span id="alertMessage">${msg}</span>-->
						<!--delete by guoshuai end 2018-9-26-->
						<!--add by guoshuai start 2018-9-26-->
							<span aria-hidden="true"
								style="
								position: absolute;
								top: 11px;
								display: block;
								height: 22px;
								width: 22px;
								line-height: 22px;
								font-size: 26px;
								">*</span>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span id="alertMessage" style="font-size: 12px;">${msg}</span>	
						<!--add by guoshuai end 2018-9-26-->
						</div>
						<!--delete by guoshuai start 2018-9-26-->
						<!--<div class="input-group input-each-position">
							<span class="input-group-addon input-group-title">用户名</span> <input
								type="text" class="form-control input-grout-content"
								id="username" name="username">
						</div>
						<div class="input-group input-each-position">
							<span class="input-group-addon input-group-title">密码</span> <input
								type="password" class="form-control input-grout-content"
								id="password" name="password">
						</div>-->
						<!--delete by guoshuai end 2018-9-26-->
						<!-- <div class="input-group input-each-position">
							<span class="input-group-addon input-group-title">验证码</span> <input
								type="text" class="form-control input-grout-content-captcha"
								id="jcaptchaCode" name="jcaptchaCode"> <img
								class="captcha-img" src="./jcaptcha.jpg">
						</div> -->
						<!--add by guoshuai start 2018-9-26-->
						<div style="color:#FFF;"id='ipt-tittle-word1'>用&nbsp;&nbsp;户:</div>
						<div class="input-group input-each-position">
							<span id="input-pic1"></span>
							<input
								type="text" class="form-control input-grout-content" autocomplete="off"
								id="username" name="username"style="border:none;color:#fff;box-shadow: none;" placeholder="请输入用户名">
						</div>
						<div style="color:#fff;"id='ipt-tittle-word2'>密&nbsp;&nbsp;码:</div>
						<div class="input-group input-each-position">
							<span id="input-pic2"></span>
							<input
								type="password" class="form-control input-grout-content" autocomplete="off"
								id="password" name="password" style="border:none;color:#ccc;box-shadow: none;"placeholder="请输入密码">
						</div>
						<!--add by guoshuai end 2018-9-26-->
						<!--delete by guoshuai start 2018-9-26-->
						<!--<div class="submit-button-area input-each-position">
							<input type="button" class="login-button" value="登&nbsp;录">
						</div>-->
						<!--delete by guoshuai end 2018-9-26-->
						<!--add by guoshuai start 2018-9-26-->
						<div class="submit-button-area input-each-position">
								<input type="button" class="login-button" style="outline:none !important; background: rgb(59, 180, 242);" value="登&nbsp;&nbsp;&nbsp;&nbsp;录">
						</div>
						<!--add by guoshuai end 2018-9-26-->
					</form>
				</div>
			</div>
		</div>
		<div class="copyright-word">
			Copyright&nbsp;®&nbsp;2017&nbsp;Jiantong&nbsp;Tech.&nbsp;All&nbsp;Rights&nbsp;Reserved.&nbsp;武汉剑通
			版权所有&nbsp;<small>@2.1.16</small>
		</div>
	</div>

</body>
<script>
	/*add by guoshuai start 2018-9-26*/
	/*add by guoshuai end 2018-9-26*/
	$('.login-button').click(function() {
		login();
	});
	$('#username, #password').keyup(function(e) {
		if (e.keyCode == 13) {
			login();
		}
	});
	//设置cookie
	function setCookie(cname, cvalue, exdays) {
        let d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = 'expires=' + d.toGMTString();
        document.cookie = cname + '=' + cvalue + '; ' + expires + '; path=/';
    }
	//设置取得cookie
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
	//删除cookie
	function deleteCookie(cname) {
		var d = new Date(0);
		var expires = 'expires=' + d.toGMTString();
		document.cookie = cname + '=; ' + expires + '; path=/';
	}
	//插入登录页头部的图片
	$('#login-title-word-box').append(loginLogoImgUrl);

	//登录和错误提示信息
	function login() {
		if ($('#username').val() == '' && $('#password').val() == '') {
			$('#alertMessage').html('请输入用户名和密码');
			showAlertMsg();
		} else if ($('#username').val() == '') {
			$('#alertMessage').html('请输入用户名');
			showAlertMsg();
		} else if ($('#password').val() == '') {
			$('#alertMessage').html('请输入密码');
			showAlertMsg();
		} else {
			deleteCookie('combatReplayQueryCache');
			deleteCookie('combatReplayPlayTimeCache');
			/* deleteCookie('loginLogoImgUrl');
			deleteCookie('homeLogoImgUrl'); */
			window.localStorage.removeItem("homeLogoImgUrl");
			window.localStorage.removeItem("loginLogoImgUrl");
			$('#formLogin').submit();
		}
	}

	function autoHeight() {
		$('.background').css('width', $(window).width());
		$('.background').css('height', $(window).height());
	}
	autoHeight();
	window.onresize = function() {
		autoHeight();
	}

	let content = $('#alertMessage').html();
	console.log(content);
	if (content != '') {
		showAlertMsg();
	}

	function showAlertMsg() {
		if ($(window).height() > 768) {
			$("#alertMessage-position").css('display', 'block');
			/*delete by guoshuai start 2018-9-26
			$('.login-inner').css('height', '300px');
			$('.login-inner').css('margin-top', '-150px');
			$('.login-area').css('height', '326px');
			$('.login-area').css('top', '46%');
			delete by guoshuai end 2018-9-26*/
		} else {
			$("#alertMessage-position").css('display', 'block');
			/*delete by guoshuai start 2018-9-26
			$('.login-inner').css('height', '310px');
			$('.login-inner').css('margin-top', '-155px');
			$('.login-area').css('height', '333px');
			$('.login-area').css('top', '46%');
			delete by guoshuai end 2018-9-26*/
		}
	}
</script>
</html>