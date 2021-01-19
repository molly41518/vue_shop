<template>
  <div id="app">
    <!-- 頭部 -->
    <van-nav-bar :title="title" fixed v-show="navViewShow" />
    <!-- 內容 -->

    <!-- 藉由路由規則對應匹配的組件 -->
    <router-view @ontitle="getTitle" @onNavShow="getnavshow"></router-view>

    <!-- 底部 -->
    <van-tabbar v-model="active" active-color="red" @change="onClickTabbarItem">
      <van-tabbar-item icon="home-o" to="/home">首頁</van-tabbar-item>
      <van-tabbar-item icon="filter-o" to="/assort">分類</van-tabbar-item>
      <van-tabbar-item icon="search" to="/search">搜索</van-tabbar-item>
      <van-tabbar-item icon="cart-o" to="/car" badge="20"
        >購物車</van-tabbar-item
      >
      <van-tabbar-item icon="contact" to="/mine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { NavBar, Tabbar, TabbarItem } from "vant";

export default {
  name: "App",
  components: {
    [NavBar.name]: NavBar,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },
  data() {
    return {
      title: "", //透過子組件傳遞不同分頁的標題
      navViewShow: true, //導航顯示或隱藏
      active: 0,
    };
  },
  methods: {
    getTitle: function (title) {
      this.title = title;
    },
    getnavshow: function (isshow) {
      this.navViewShow = isshow;
    },
    onClickTabbarItem: function () {
      console.log(this.active);
      // 存取this.active的數字
      // window.localStorage 頁面關閉後仍保存
      window.localStorage.setItem("itemIndex", this.active);
    },
  },
  created() {
    // 創建頁面時，拿到目前itemIndex數字
    var itemIndex = parseInt(window.localStorage.getItem("itemIndex"));
    console.log(itemIndex);
    // 判斷itemIndex是否為空
    if (!isNaN(itemIndex)) {
      // 若不為空設定this.active數字
      this.active = itemIndex;
      // 重新設定路由路徑
      // 由於第一筆是/home 所以要+1
      var toPath = this.$router.options.routes[itemIndex + 1].path;
      this.$router.push({ path: toPath });
    }
  },
};
</script>

<style>
body {
  background: #f2f2f2;
}
#app {
  background: #f2f2f2;
}
.van-nav-bar {
  height: 2.8125rem;
  background: red;
  font-size: 1rem;
  line-height: 2.8125rem;
  text-align: center;
}

.van-nav-bar .van-nav-bar__title {
  color: white;
}

.van-nav-bar .van-nav-bar__arrow {
  color: white;
  font-size: 1rem;
}

/* 動畫設計 */
/* transition name="XXX" */
/* 
xxx-enter (進入) 動畫開始狀態
xxx-enter-to (進入) 動畫結束狀態
xxx-enter-active (進入) 動畫時長、曲線

xxx-leave (離開) 動畫開始狀態
xxx-leave-to (離開) 動畫結束狀態
xxx-leave-active (離開) 動畫時長、曲線
 */

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 1s;
}

.slide-right-enter,
.slide-right-leave-to {
  transform: translateX(100%);
}
</style>
