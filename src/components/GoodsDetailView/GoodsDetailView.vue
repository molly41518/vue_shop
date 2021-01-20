<template>
  <div class="goods-detail-view" v-if="goodsDetail">
    <!-- 導覽列 -->
    <van-nav-bar fixed title="商品詳情" left-arrow @click-left="onBack" />
    <!-- 輪播圖 -->
    <van-swipe :autoplay="3000" class="banners">
      <van-swipe-item v-for="(item, index) in goodsDetail.banners" :key="index">
        <img v-lazy="item.img" />
      </van-swipe-item>
    </van-swipe>
    <!-- 主體內容 -->
    <div class="content-view">
      <!-- 價格 -->
      <div class="price-view">
        <p class="new-price">${{ goodsDetail.newPrice }}</p>
        <p class="old-price">原價${{ goodsDetail.oldPrice }}</p>
        <span class="sale-item" v-if="goodsDetail.sale">特價</span>
      </div>
      <!-- 規格 -->
      <div class="standard-view">
        <div class="items">
          <div v-for="(item, index) in goodsDetail.standardImages" :key="index">
            <img :src="item.img" :alt="item.color" />
          </div>
        </div>
        <div class="side">
          <select name="eyes">
            <option value="左眼">左眼</option>
            <option value="右眼">右眼</option>
          </select>
          <select name="degree">
            <option
              v-for="(item, index) in goodsDetail.degree"
              :key="index"
              value="item"
            >
              {{ item }}
            </option>
          </select>
          <van-stepper v-model="number" />
        </div>
      </div>
      <!-- 描述 -->
      <div class="desc-view">
        <div class="title">
          <span>自營</span>
          <p>{{ goodsDetail.name }}</p>
        </div>
        <p class="desc">
          {{ goodsDetail.desc }}
        </p>
      </div>
      <!-- 說明 -->
      <div class="explain-view">
        <span>說明</span>
        <p>{{ goodsDetail.explain }}</p>
        <van-icon name="arrow" class="icon" />
      </div>
    </div>
    <!-- 顧客評價 -->
    <div class="appraise-view">
      <div class="appraise-title">
        <span class="title"> 商品評價({{ goodsDetail.appraise.num }})</span>
        <span class="rate-score">
          好評{{ goodsDetail.appraise.rateScore }}%
          <van-icon name="arrow" class="icon" />
        </span>
      </div>

      <div class="appraise-content">
        <div class="appraise-box" ref="scollView">
          <UserAppraise
            ref="userAppraise"
            v-for="(item, index) in goodsDetail.appraise.list"
            :key="index"
            :appraise="item"
          ></UserAppraise>
        </div>
      </div>
    </div>
    <!-- 產品資訊 -->
    <div class="product-view">
      <h3>圖文詳情</h3>
      <h4>產品資訊</h4>
      <table>
        <tr v-for="(item, index) in goodsDetail.productMessage" :key="index">
          <td>{{ item.key }}</td>
          <td>{{ item.value }}</td>
        </tr>
      </table>
    </div>
    <!-- 產品特色 -->
    <div class="product-view">
      <h3>產品特色</h3>
      <div
        class="producr-border"
        v-for="(item, index) in goodsDetail.productStamp"
        :key="index"
      >
        <h4>{{ item.stamp }}</h4>
        <p>{{ item.text }}</p>
        <img :src="item.img" alt="" />
      </div>
    </div>
    <!-- 加入購物車 -->
    <van-goods-action>
      <van-goods-action-icon icon="like-o" text="收藏" @click="onCollect" />
      <van-goods-action-icon icon="cart" text="購物車" @click="onCart" />
      <van-goods-action-button
        type="warning"
        text="加入購物車"
        @click="onAddCart"
      />
      <van-goods-action-button type="danger" text="立即購買" @click="onBuy" />
    </van-goods-action>
  </div>
</template>

<script>
import {
  NavBar,
  Swipe,
  SwipeItem,
  Stepper,
  Icon,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
} from "vant";
import UserAppraise from "../UserAppraise/UserAppraise.vue";
export default {
  name: "goodsDetailView",
  components: {
    [NavBar.name]: NavBar,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Stepper.name]: Stepper,
    [Icon.name]: Icon,
    UserAppraise,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton,
  },
  data() {
    return {
      goodsDetail: null,
      number: 1,
    };
  },
  methods: {
    // 返回上一頁
    onBack: function () {
      this.$store.commit("changeGoodsDetailShow");
    },
    onCollect: function () {
      console.log("收");
    },
    onCart: function () {
      console.log("購");
    },
    onAddCart: function () {
      console.log("加");
    },
    onBuy: function () {
      console.log("買");
    },
  },
  beforeUpdate() {
    // nextTick 確保DOM已經渲染完成再做更新
    // el 組件中的 根DOM 元素
    this.$nextTick(function () {
      // console.log(this.$refs.userAppraise[0]);
      var userAppraise = this.$refs.userAppraise[0].$el;
      // 元素寬度
      var width = userAppraise.offsetWidth;

      // getComutedStyle 拿取css樣式(為了取得margin-right)
      var computedStyle = getComputedStyle(userAppraise, null);

      // parseInt去除px，只取數字
      var margin = parseInt(computedStyle.margin);

      // 動態計算寬度
      var temp =
        (this.goodsDetail.appraise.list.length * (width + margin * 2)) / 16 +
        "rem";

      this.$refs.scollView.style.width = temp;
      // console.log(this.$refs.scollView.style.width);
    });
  },
  created() {
    // 根據goodsid 拿到對應的數據
    var that = this;
    this.$ajax
      .get("/json/goods-detail.json")
      .then(function (response) {
        // console.log(response.data);
        that.goodsDetail = response.data;
      })
      .catch(function (err) {
        console.log(err);
      });
  },
};
</script>

<style>
/* 全螢幕覆蓋技巧 */
.goods-detail-view {
  background: #f2f2f2;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 99;
  overflow: auto;
  padding-top: 2.8125rem;
  padding-bottom: 3.125rem;
}
.goods-detail-view .banners img {
  width: 100%;
}

.goods-detail-view .content-view {
  background: white;
  border: 0.0625rem solid #bbbbbb;
  border-right: 0;
  border-left: 0;
  margin-bottom: 0.625rem;
}
.goods-detail-view .content-view .price-view {
  height: 2.8125rem;
  line-height: 2.8125rem;
}
.goods-detail-view .content-view .price-view .new-price {
  float: left;
  font-size: 1.3125rem;
  margin: 0 1.25rem;
  font-weight: 900;
  color: red;
}
.goods-detail-view .content-view .price-view .old-price {
  font-size: 0.75rem;
  color: #7c7c7c;
  float: left;
  margin-right: 1.25rem;
  text-decoration: line-through;
}
.goods-detail-view .content-view .price-view .sale-item {
  display: inline-block;
  font-size: 0.75rem;
  color: white;
  background: red;
  width: 1.875rem;
  height: 1.125rem;
  line-height: 1.125rem;
  text-align: center;
}

.goods-detail-view .content-view .standard-view {
  overflow: hidden;
}
.goods-detail-view .content-view .standard-view .items {
  float: left;
  margin-left: 0.9375rem;
  overflow: hidden;
  width: 14.0625rem;
}
.goods-detail-view .content-view .standard-view .items img {
  width: 3.875rem;
  float: left;
  margin-right: 0.625rem;
  border: 0.0625rem solid gray;
}
.goods-detail-view .content-view .standard-view .side select {
  background: white;
  color: black;
  border-radius: 0.3125rem;
  margin-right: 0.625rem;
  margin-bottom: 0.625rem;
}
.goods-detail-view .content-view .standard-view .side .van-stepper__minus,
.goods-detail-view .content-view .standard-view .side .van-stepper__plus {
  background: white;
  border: 0.0625rem solid #bbbbbb;
  border-radius: 0.3125rem;
}
.goods-detail-view .content-view .standard-view .side .van-stepper__input {
  width: 4.375rem;
  border: 0.0625rem solid #bbbbbb;
  background: white;
  box-sizing: border-box;
}
.goods-detail-view .content-view .desc-view {
  margin-top: 0.9375rem;
  padding: 0 1.25rem;
}
.goods-detail-view .content-view .desc-view .title {
  overflow: hidden;
  margin-bottom: 0.9375rem;
}
.goods-detail-view .content-view .desc-view .title span {
  background: white;
  border: 0.0625rem solid red;
  color: red;
  float: left;
  margin-right: 0.8125rem;
  font-size: 0.75rem;
}
.goods-detail-view .content-view .desc-view .title p {
  float: left;
}
.goods-detail-view .content-view .desc-view .desc {
  font-size: 0.75rem;
  line-height: 1.0625rem;
  color: #7c7c7c;
  border-bottom: 0.0625rem solid #e8e8e8;
  padding-bottom: 1.125rem;
}
.goods-detail-view .content-view .explain-view {
  padding: 0 1.75rem 0 1.4375rem;
  height: 2.5rem;
  line-height: 2.5rem;
  overflow: hidden;
  font-size: 0.75rem;
}
.goods-detail-view .content-view .explain-view span {
  color: black;
  font-weight: 800;
  margin-right: 1.4375rem;
  float: left;
}
.goods-detail-view .content-view .explain-view p {
  color: #7c7c7c;
  float: left;
}
.goods-detail-view .content-view .explain-view .icon {
  color: #7c7c7c;
  float: right;
  line-height: 2.5rem;
}
.goods-detail-view .appraise-view {
  background: white;
  margin-bottom: 0.625rem;
}
.goods-detail-view .appraise-view .appraise-title {
  padding: 0.8125rem 1.5625rem 0.8125rem 1.25rem;
}
.goods-detail-view .appraise-view .appraise-title .title {
  font-size: 0.875rem;
  font-weight: 800;
}
.goods-detail-view .appraise-view .rate-score {
  color: red;
  font-size: 0.875rem;
  float: right;
}
.goods-detail-view .appraise-view .rate-score .icon {
  color: #7c7c7c;
  vertical-align: middle;
}
.goods-detail-view .appraise-view .appraise-content {
  overflow: auto;
  padding-left: 0.5rem;
  padding-bottom: 0.625rem;
  margin-bottom: 0.625rem;
}

.goods-detail-view .appraise-view .appraise-content .appraise-box {
  overflow: hidden;
}

.goods-detail-view .product-view {
  padding: 0.9375rem 0.625rem;
  background: white;
  margin-bottom: 0.625rem;
}
.goods-detail-view .product-view h3 {
  background: black;
  color: white;
  height: 1.875rem;
  line-height: 1.875rem;
  font-size: 0.875rem;
  text-align: center;
  border-radius: 0.3125rem;
}
.goods-detail-view .product-view h4 {
  line-height: 4.125rem;
  font-size: 1rem;
  font-weight: 900;
}
.goods-detail-view .product-view table {
  border: 0.0625rem solid #bbbbbb;
  border-collapse: collapse;
  font-size: 0.75rem;
  width: 100%;
}
.goods-detail-view .product-view table td {
  border: 0.0625rem solid #bbbbbb;
  height: 2.375rem;
  line-height: 2.375rem;
  padding-left: 1.0625rem;
}
.goods-detail-view .product-view table td:nth-child(1) {
  width: 174rpx;
  color: #707070;
}

.goods-detail-view .product-view .producr-border {
  border-bottom: 0.0625rem solid #bbbbbb;
}
.goods-detail-view .product-view .producr-border p {
  font-size: 0.8125rem;
  line-height: 1.0625rem;
}
.goods-detail-view .product-view .producr-border img {
  width: 100%;
}
</style>
