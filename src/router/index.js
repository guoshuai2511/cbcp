import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import userManage from '@/components/systemManage/userManage'
import deptManage from '@/components/systemManage/deptManage'
import combatReplay from '@/components/commandManage/combatReplay'

Vue.use(Router)

export default new Router({
  //mode:'history',去掉url的#号
  routes: [
    {
      path: '/home',
      name: 'Home',
      //按需加载实现改变页面title的目的
      component: (resolve) => {
        require(['@/components/Home.vue'], resolve)
      },
      meta: {
        title: '总览'
      }
    },{
      path:'/',
      component: (resolve) => {
        require(['@/components/Home.vue'], resolve)
      },
      meta:{
        title: '总览'
      }
    },{
      path:'/login',
      name: 'Login',
      component: (resolve) => {
        require(['@/components/Login.vue'], resolve)
      },
      meta:{
        title: '登录'
      }
    },{
      path:'/systemManage/userManage',
      name: 'userManage',
      component: (resolve) => {
        require(['@/components/systemManage/userManage.vue'], resolve)
      },
      meta:{
        title: '用户管理'
      }
    },{
      path:'/systemManage/deptManage',
      name: 'deptManage',
      component: (resolve) => {
        require(['@/components/systemManage/deptManage.vue'], resolve)
      },
      meta:{
        title: '机构管理'
      }
    },{
      path:'/commandManage/combatReplay',
      name: 'combatReplay',
      component: (resolve) => {
        require(['@/components/commandManage/combatReplay.vue'], resolve)
      },
      meta:{
        title: '历史回放'
      }
    },{
      path:'/systemManage/devManage',
      name: 'devManage',
      component: (resolve) => {
        require(['@/components/systemManage/devManage.vue'], resolve)
      },
      meta:{
        title: '设备管理'
      }
    },{
      path:'/systemManage/roleManage',
      name: 'roleManage',
      component: (resolve) => {
        require(['@/components/systemManage/roleManage.vue'], resolve)
      },
      meta:{
        title: '平台用户功能管理'
      }
    },{
      path:'/systemManage/enforceLog',
      name: 'enforceLog',
      component: (resolve) => {
        require(['@/components/systemManage/enforceLog.vue'], resolve)
      },
      meta:{
        title: '执法日志管理'
      }
    },{
      path:'/systemManage/caseManage',
      name: 'caseManage',
      component: (resolve) => {
        require(['@/components/systemManage/caseManage.vue'], resolve)
      },
      meta:{
        title: '案件筛查'
      }
    },{
      path:'/commandManage/realTimeCombat',
      name: 'realTimeCombat',
      component: (resolve) => {
        require(['@/components/commandManage/realTimeCombat.vue'], resolve)
      },
      meta:{
        title: '实时作战'
      }
    },
  ]
})
