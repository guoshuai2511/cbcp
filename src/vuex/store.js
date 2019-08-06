import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    // 商品列表
    shopList:[{
        id: 1,
        name: '兰博基尼',
        price: 10
    },{
        id: 2,
        name: '五菱宏光',
        price: 99999
    }],
    // 购物车列表
    addList: [],
    //购物总金额
    count:0
}

export default new Vuex.Store({
    state,
    mutations:{
        increment(state,value){
            state.count += value;
        }
    }
})