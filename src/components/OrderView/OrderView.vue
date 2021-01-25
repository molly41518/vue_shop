<template>
  <div class="order-view">
    <van-nav-bar title="訂單明細" left-arrow @click-left="onClickLeft" />
    <van-tabs v-model="active">
      <van-tab title="全部">
        <OrderItemView
          v-for="(goods, index) in orderGoodsList"
          :key="index"
          :goods="goods"
        ></OrderItemView>
      </van-tab>
      <van-tab title="待付款">
        <OrderItemView
          v-for="(goods, index) in orderList1"
          :key="index"
          :goods="goods"
        ></OrderItemView>
      </van-tab>
      <van-tab title="待出貨">
        <OrderItemView
          v-for="(goods, index) in orderList2"
          :key="index"
          :goods="goods"
        ></OrderItemView>
      </van-tab>
      <van-tab title="待收貨">
        <OrderItemView
          v-for="(goods, index) in orderList3"
          :key="index"
          :goods="goods"
        ></OrderItemView>
      </van-tab>
      <van-tab title="交易成功">
        <OrderItemView
          v-for="(goods, index) in orderList4"
          :key="index"
          :goods="goods"
        ></OrderItemView>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { NavBar, Tab, Tabs } from "vant";
import OrderItemView from "../OrderItemView/OrderItemView.vue";
export default {
  name: "orderView",
  props: ["orderType"],
  components: {
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    OrderItemView,
  },
  created() {
    // console.log(this.orderType);
    this.active = this.orderType;

    var that = this;
    this.$ajax
      .get("/json/order.json")
      .then(function (response) {
        that.orderGoodsList = response.data;
        console.log(that.orderGoodsList);
        console.log(that.orderGoodsList.length);

        for (var i = 0; i < that.orderGoodsList.length; i++) {
          var order = that.orderGoodsList[i];
          if (order.type == 1) {
            that.orderList1.push(order);
          } else if (order.type == 2) {
            that.orderList2.push(order);
          } else if (order.type == 3) {
            that.orderList3.push(order);
          } else if (order.type == 4) {
            that.orderList4.push(order);
          }
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  },
  data() {
    return {
      active: 0,
      orderGoodsList: [], //全部
      orderList1: [], //待付款
      orderList2: [], //待出貨
      orderList3: [], //待收貨
      orderList4: [], //交易成功
    };
  },
  methods: {
    onClickLeft: function () {
      this.$emit("onBack");
    },
  },
};
</script>

<style>
.order-view {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #f2f2f2;
  z-index: 100;
}
.order-view .van-tabs__content {
  position: fixed;
  height: 100%;
  width: 100%;
  overflow: auto;
  padding-bottom: 6.1875rem;
  box-sizing: border-box;
}
</style>
