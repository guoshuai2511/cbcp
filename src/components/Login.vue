<template>
	<div class="background" v-wechat-title="$route.meta.title">
		<div id="login-bg">
			<div id="login-title-word-box"></div>
			<div class="login-area">
				<div class="login-inner">
					<form name="formLogin" action="" id="formLogin" method="post">
						<div class="input-each-position" id="alertMessage-position"
							style="position: absolute; border: none; left: 20%; display: none; width: 69.72%;">
							<span aria-hidden="true" style="position: absolute; top: 11px; display: block;
							height: 22px; width: 22px; line-height: 22px; font-size: 26px;">*</span>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<span id="alertMessage" style="font-size: 12px;">${msg}</span>	
						</div>
						<div style="color:#FFF;" id='ipt-tittle-word1'>用&nbsp;&nbsp;户:</div>
						<div class="input-group input-each-position">
							<span id="input-pic1"></span>
							<input
								type="text" class="form-control input-grout-content" autocomplete="off"
								id="username" name="username" style="border:none;color:#fff;box-shadow: none;" placeholder="请输入用户名">
						</div>
						<div style="color:#fff;" id='ipt-tittle-word2'>密&nbsp;&nbsp;码:</div>
						<div class="input-group input-each-position">
							<span id="input-pic2"></span>
							<input
								type="password" class="form-control input-grout-content" autocomplete="off" @keyup="enterLogin($event)"
								id="password" name="password" style="border:none;color:#ccc;box-shadow: none;" placeholder="请输入密码">
						</div>
						<div class="submit-button-area input-each-position">
								<input type="button" class="login-button" style="outline:none !important; background: rgb(59, 180, 242);" value="登     录" @click="login"
								@keyup="enterLogin($event)">
						</div>
					</form>
				</div>
			</div>
		</div>
		<div class="copyright-word">
			Copyright&nbsp;®&nbsp;2017&nbsp;Jiantong&nbsp;Tech.&nbsp;All&nbsp;Rights&nbsp;Reserved.&nbsp;武汉剑通
			版权所有&nbsp;<small>@2.1.13</small>
		</div>
	</div>
</template>
<script type="text/javascript">
  export default { //这里需要将模块引出，可在其他地方使用
    data (){ //注意：data即使不需要传数据，也必须return,否则会报错
      return { 

      }
		},
		mounted(){

  	},
  	methods: {
			//根据用户缓存图片
			loginLocalStorage(){
				if((window.localStorage.loginLogoImgUrl == undefined)||(window.localStorage.loginLogoImgUrl==" ")){
					let htmlValue='<div id="login-title-word"></div>';
						loginLogoImgUrl =  htmlValue;
				}else{
						let urlImg = window.localStorage.loginLogoImgUrl;
						let htmlValue=`
								<div class="login-title-word" style="background-image:url('${urlImg}')"></div>
						`;
						loginLogoImgUrl =  htmlValue;
				}
			},
			//登录和错误提示信息
			login(){
				if ($('#username').val() == '' && $('#password').val() == '') {
					$('#alertMessage').html('请输入用户名和密码');
					console.log('my eyes!');
					this.$options.methods.showAlertMsg();
				} else if ($('#username').val() == '') {
					$('#alertMessage').html('请输入用户名');
					this.$options.methods.showAlertMsg();
				} else if ($('#password').val() == '') {
					$('#alertMessage').html('请输入密码');
					this.$options.methods.showAlertMsg();
				} else {
				
				}
			},
			//错误信息显示
			showAlertMsg(){
				if ($(window).height() > 768) {
					$("#alertMessage-position").css('display', 'block');
				} else {
					$("#alertMessage-position").css('display', 'block');
				}
			},
			//按Enter回车键登录
			enterLogin(e){
				if (e.keyCode == 13) {
					this.$options.methods.login();
				}
			}
		}
	};
	
</script>
<style scoped>
	@import "../../static/css/common.css"; 
	@import "../../static/css/login.css"; 
</style>
<style type="text/css">
	.bata-page-title-word{
		width: 100px;
		position: absolute;
		left: 47.5%;
		top: 44%;
		color: #fff;
		font-size: 20px;
	}
	.login-button{
		cursor: pointer;
	}
	#login-bg{
		width: 39.79%;
		height: 44.46%;
		background: url(../../static/img/iconpic/log-bg.png);
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
		left:5%;
	}
	#login-title-word{
		width: 80%;
		height: 66px;
		background: url(../../static/img/iconpic/log-log.png);
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
		background: url(../../static/img/iconpic/log-name.png) no-repeat 50% 50%;
		background-size: 73.68% 73.68%;
		float: left;
		border-right:1px solid #03172f;
	}
	#input-pic2{
		display: block;
		width: 10.86%;
		height: 95%;
		background: url(../../static/img/iconpic/log-psw.png) no-repeat 50% 50%;
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
</style>
