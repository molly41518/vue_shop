<template>
  <div class="mine-view">
    <!-- 個人訊息 -->
    <div class="user-view">
      <div class="content-wrapper">
        <div class="user-msg">
          <img src="http://vue.shop/img/atom.png" alt="" />
          <p>小金剛</p>
        </div>
        <van-row>
          <van-col span="6">
            <dl>
              <dt>3</dt>
              <dd>收藏</dd>
            </dl>
          </van-col>
          <van-col span="6">
            <dl>
              <dt>2</dt>
              <dd>關注</dd>
            </dl>
          </van-col>
          <van-col span="6">
            <dl>
              <dt>22</dt>
              <dd>瀏覽</dd>
            </dl>
          </van-col>
          <van-col span="6">
            <dl style="border: 0">
              <dt>33</dt>
              <dd>心得</dd>
            </dl>
          </van-col>
        </van-row>
      </div>
    </div>
    <!-- 我的訂單 -->
    <div class="item-wrapper">
      <div class="title-wrapper">
        <h4>我的訂單</h4>
        <a href="#" @click="onOrderView(0)">
          查看全部
          <van-icon name="arrow" />
        </a>
      </div>
      <van-row>
        <van-col span="6">
          <MineItemView
            icon="shop"
            name="待付款"
            type="1"
            @onItemClick="onOrderView"
          ></MineItemView>
        </van-col>
        <van-col span="6">
          <MineItemView
            icon="shop-collect"
            name="待出貨"
            type="2"
            @onItemClick="onOrderView"
          ></MineItemView>
        </van-col>
        <van-col span="6">
          <MineItemView
            icon="underway"
            name="待收貨"
            type="3"
            @onItemClick="onOrderView"
          ></MineItemView>
        </van-col>
        <van-col span="6">
          <MineItemView icon="alipay" name="退貨"></MineItemView>
        </van-col>
      </van-row>
    </div>
    <!-- 我的服務 -->
    <div class="item-wrapper">
      <div class="title-wrapper">
        <h4>我的服務</h4>
        <a href="#">
          查看全部
          <van-icon name="arrow" />
        </a>
      </div>
      <van-row style="border-bottom: 0.0625rem solid #dbdbdb">
        <van-col span="6">
          <MineItemView
            icon="shop"
            name="邀請好友"
            other="立賺30元"
          ></MineItemView>
        </van-col>
        <van-col span="6">
          <MineItemView
            icon="shop-collect"
            name="簽到領禮包"
            other="立賺10元"
          ></MineItemView>
        </van-col>
        <van-col span="6">
          <MineItemView
            icon="underway"
            name="優惠券"
            other="3張"
          ></MineItemView>
        </van-col>
        <van-col span="6">
          <MineItemView icon="alipay" name="限時購買"></MineItemView>
        </van-col>
      </van-row>
      <van-row style="border-bottom: 0.0625rem solid #dbdbdb">
        <van-col span="6">
          <MineItemView icon="shop" name="我的收藏" other="10個"></MineItemView>
        </van-col>
        <van-col span="6">
          <MineItemView
            icon="shop-collect"
            name="收貨地址"
            other="2個"
          ></MineItemView>
        </van-col>
        <van-col span="6">
          <MineItemView icon="underway" name="客戶中心"></MineItemView>
        </van-col>
        <van-col span="6">
          <MineItemView icon="alipay" name="加值中心"></MineItemView>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="6">
          <MineItemView icon="shop" name="我的回答"></MineItemView>
        </van-col>
        <van-col span="6">
          <MineItemView icon="shop-collect" name="領券中心"></MineItemView>
        </van-col>
        <van-col span="6">
          <MineItemView
            icon="underway"
            name="驗光單"
            other="3張"
          ></MineItemView>
        </van-col>
        <van-col span="6">
          <MineItemView
            icon="alipay"
            name="試用中心"
            other="1元試用"
          ></MineItemView>
        </van-col>
      </van-row>
    </div>
    <!-- 登出 -->
    <div class="logout">
      <a href="#">登出</a>
    </div>
    <!-- 訂單詳細頁 -->
    <transition name="slide-right">
      <OrderView
        v-if="orderViewShow"
        @onBack="onOrderViewHidden"
        :orderType="orderType"
      ></OrderView>
    </transition>
  </div>
</template>

<script>
import { Col, Row, Icon } from "vant";
import MineItemView from "../MineItemView/MineItemView.vue";
import OrderView from "../OrderView/OrderView.vue";

export default {
  name: "mineView",
  components: {
    [Col.name]: Col,
    [Row.name]: Row,
    [Icon.name]: Icon,
    MineItemView,
    OrderView,
  },
  data() {
    return {
      title: "我的",
      navViewShow: false,
      orderViewShow: false,
      orderType: -1,
    };
  },
  methods: {
    onOrderView: function (num) {
      this.orderType = parseInt(num);
      this.orderViewShow = true;
    },
    onOrderViewHidden: function () {
      this.orderViewShow = false;
    },
  },
  created() {
    // 發送標題
    this.$emit("ontitle", this.title),
      this.$emit("onNavShow", this.navViewShow);
  },
};
</script>

<style>
.mine-view {
  overflow: auto;
  padding-bottom: 3.125rem;
}

.mine-view .user-view {
  width: 100%;
  height: 10rem;
  background: red;
  margin-bottom: 3.125rem;
  padding: 5rem 2rem 0;
  box-sizing: border-box;
}
.mine-view .user-view .content-wrapper {
  height: 7.6875rem;
  background: white;
  position: relative;
  border-radius: 0.625rem;
}
.mine-view .user-view .content-wrapper .user-msg {
  height: 3.4375rem;
  line-height: 3.4375rem;
  padding-bottom: 0.875rem;
}
.mine-view .user-view .content-wrapper .user-msg img {
  width: 4.1875rem;
  height: 4.1875rem;
  border-radius: 50%;
  position: absolute;
  left: 1.25rem;
  top: -1.25rem;
}
.mine-view .user-view .content-wrapper .user-msg p {
  font-size: 0.9375rem;
  text-align: center;
}
.mine-view .user-view .content-wrapper dl {
  text-align: center;
  border-right: 0.0625rem solid #dbdbdb;
  height: 2.625rem;
}
.mine-view .user-view .content-wrapper dl dt {
  margin-bottom: 0.625rem;
  font-size: 0.6875rem;
  color: #7e7e7e;
}
.mine-view .user-view .content-wrapper dl dd {
  font-size: 0.75rem;
  color: #dbdbdb;
}
.mine-view .item-wrapper {
  padding: 0 0.625rem;
  margin-bottom: 0.625rem;
  background: white;
}
.mine-view .item-wrapper .title-wrapper {
  border-bottom: 0.0625rem solid #dbdbdb;
  height: 3.125rem;
  font-size: 0.875rem;
  line-height: 3.125rem;
}
.mine-view .item-wrapper .title-wrapper h4 {
  font-weight: 800;
  float: left;
}
.mine-view .item-wrapper .title-wrapper a {
  float: right;
  color: #dbdbdb;
  /* vertical-align: middle; */
}
.mine-view .logout {
  width: 100%;
  padding: 0 0.625rem 0.625rem 0.625rem;
  box-sizing: border-box;
}
.mine-view .logout a {
  display: block;
  border: 0.0625rem solid #dbdbdb;
  text-align: center;
  height: 2.5625rem;
  line-height: 2.5625rem;
  background: white;
  color: black;
}
</style>
