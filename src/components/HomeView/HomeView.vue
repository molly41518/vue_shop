<template>
  <div class="home-view">
    <!-- 輪播圖 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item
        v-for="(item, index) in banner"
        :key="index"
        class="banner-view"
      >
        <img v-lazy="item.img" alt="" />
      </van-swipe-item>
    </van-swipe>
    <!-- 商品分類 -->
    <CategroyView></CategroyView>

    <!-- 父組件傳遞給子組件 -->
    <!-- 單品熱賣 -->
    <TitleView name="單品熱賣" icon="star"></TitleView>
    <SellingView></SellingView>
    <!-- 精選活動 -->
    <TitleView name="精選活動" icon="gift"></TitleView>
    <WinnowView :bigImg="WinnowBig1" :contents="WinnowContents1"></WinnowView>
    <WinnowView :bigImg="WinnowBig2" :contents="WinnowContents2"></WinnowView>
    <!-- 為你推薦 -->
    <TitleView name="為你推薦" icon="label"></TitleView>
    <CommendView></CommendView>

    <!-- 商品詳細頁 -->
    <transition name="slide-right">
      <GoodsDetailView v-if="goodsDetailShow"></GoodsDetailView>
    </transition>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from "vant";
import CategroyView from "../CategoryView/CategoryView.vue";
import TitleView from "../TitleView/TitleView.vue";
import SellingView from "../SellingView/SellingView.vue";
import WinnowView from "../WinnowView/WinnowView.vue";
import CommendView from "../CommendView/CommendView.vue";
import GoodsDetailView from "../GoodsDetailView/GoodsDetailView.vue";

export default {
  name: "homeView",
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    CategroyView,
    TitleView,
    SellingView,
    WinnowView,
    CommendView,
    GoodsDetailView,
  },
  data() {
    return {
      title: "阿丸眼鏡商城",
      navViewShow: true,
      banner: [],
      WinnowBig1: "",
      WinnowContents1: [],
      WinnowBig2: "",
      WinnowContents2: [],
    };
  },
  // 計算屬性
  computed: {
    goodsDetailShow() {
      return this.$store.state.goodsDetailShow;
    },
  },
  // 鉤子函數
  created() {
    // 發送標題
    this.$emit("ontitle", this.title),
      this.$emit("onNavShow", this.navViewShow);

    // 預存this讓banner的this拿到vue組件
    var that = this;

    // 輪播圖數據
    // get請求地址，then請求成功，catch請求失敗
    this.$ajax
      .get("/json/banner.json")
      .then(function (response) {
        // console.log(response.data)
        that.banner = response.data;
      })
      .catch(function (err) {
        console.log(err);
      });
    //精選活動數據
    this.$ajax
      .get("/json/winnow.json")
      .then(function (response) {
        that.WinnowBig1 = response.data.bigImg1;
        that.WinnowContents1 = response.data.winnowItems1;

        that.WinnowBig2 = response.data.bigImg2;
        that.WinnowContents2 = response.data.winnowItems2;
      })
      .catch(function (err) {
        console.log(err);
      });
  },
};
</script>

<style>
.home-view {
  padding-top: 2.8125rem;
  padding-bottom: 3.125rem;
}
.home-view .banner-view {
  height: 9.875rem;
}
.home-view .banner-view img {
  width: 100%;
  height: 100%;
}
</style>
