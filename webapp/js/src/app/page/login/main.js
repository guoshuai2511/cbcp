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
//getCookie('loginLogoImgUrl');
/* console.log(getCookie('loginLogoImgUrl'));
if(getCookie('loginLogoImgUrl')==''){
    let htmlValue='<div id="login-title-word"></div>';

    loginLogoImgUrl =  htmlValue;

}else{
    let urlImg =  getCookie('loginLogoImgUrl');
    let htmlValue=`
        <div class="login-title-word" style="background-image:url('${urlImg}')"></div>
    `;
    loginLogoImgUrl =  htmlValue;
} */ 
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