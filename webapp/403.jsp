<%@ page language="java" contentType="text/html; charset=UTF-8"
	session="false" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="icon" type="image/ico" href="img/jiantong_logo.ico?v=2.0.4">
<title>协同作战指挥平台</title>
<link rel="stylesheet" href="css/error/page-error.css">
</head>
<body>
	<div class="error-page">
		<div class="error-page-container">
			<div class="error-page-main">
				<h3>
					<strong>403</strong>请求被拒绝
				</h3>
				<div class="error-page-actions">
					<div>
						<h4>可能原因：</h4>
						<ol>
							<li>您的账号没有权限</li>
							<li>访问了错误的路径</li>
						</ol>
					</div>
					<div>
						<h4>可以尝试：</h4>
						<ul>
							<li><a href="home">返回首页</a></li>
							<li><a href="logout">退出登录</a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>