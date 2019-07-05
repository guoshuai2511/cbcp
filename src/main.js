// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
/*引入jQuery*/
import $ from 'jquery'
/*引入bootstrap*/
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import VueWechatTitle from 'vue-wechat-title'
/*引入百度地图*/
import BMap from 'BMap'
import BaiduMap from 'vue-baidu-map'
import {BmlMarkerClusterer} from 'vue-baidu-map'
Vue.component('bml-marker-clusterer', BmlMarkerClusterer)
/*引进cookie*/
import VueCookies from 'vue-cookies'
/*vuex*/
import Vuex from 'vuex'

Vue.use(VueCookies)

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(Vuex);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
//设置页面title

Vue.use(VueWechatTitle)
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    window.document.title = to.meta.title
  }
  next()
  //解决vue项目中路由不匹配或者路径错误，添加默认404页面的方法
  /* if (to.matched.length === 0) { //匹配前往的路由不存在
    from.name ? next({
      name: from.name
    }) : next('/errorinfo'); //判断此跳转路由的来源路由是否存在，存在的情况跳转到来源路由，否则跳转到404页面
  } else {
    next(); //如果匹配到正确跳转
  } */

})
