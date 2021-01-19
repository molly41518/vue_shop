import Vue from 'vue'
import App from './App.vue'

// 導入套件
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 解決轉換Router問題
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

// 導入 Axios
import Axios from 'axios'
// 修改Vue原型屬性
Vue.prototype.$ajax = Axios

// 懶加載(讀到才加載)
import { Lazyload } from 'vant'
Vue.use(Lazyload)

//導入狀態管理Vuex
import Vuex from 'vuex'
Vue.use(Vuex)

// 定義狀態管理器
var store = new Vuex.Store({
  state:{ //定義狀態
    goodsDetailShow: false,
    goodsItemid:0
  },
  mutations:{ //定義方法
    changeGoodsDetailShow(state){
      state.goodsDetailShow = !state.goodsDetailShow
      
    },
    changeGoodsItemId(state,goodsId){
      // console.log(goodsId)
      state.goodsItemid= goodsId
    }
  }
})

Vue.config.productionTip = false

// 導入組件
import HomeView from './components/HomeView/HomeView.vue'
import AssortView from './components/AssortView/AssortView.vue'
import CarView from './components/CarView/CarView.vue'
import SearchView from './components/SearchView/SearchView.vue'
import MineView from './components/MineView/MineView.vue'

// 定義路由規則
var routes=[
  {
    path:'/',
    // 重定向
    redirect:'/home'
  },
  {
    path:'/home',
    component:HomeView
  },
  {
    path:'/assort',
    component:AssortView
  },
  {
    path:'/car',
    component:CarView
  },
  {
    path:'/search',
    component:SearchView
  },
  {
    path:'/mine',
    component:MineView
  },
]

// 實作化路由
var router = new VueRouter({
  routes:routes
  // 若名稱相同可單獨只寫
  // routes
})


new Vue({
  render: h => h(App),
  // 加入路由管理器
  router,
  // 加入狀態管理器
  store
}).$mount('#app')
