<template>
  <div class="order-item-view">
    <div class="order-title">
      <span class="time">{{ goods.orderTime }}</span>
      <!-- <span class="type">{{ goods.type }}</span> -->
      <span class="type">{{ typeStr }}</span>
    </div>
    <div class="order-goods">
      <div class="img">
        <img :src="goods.img" alt="" />
      </div>
      <div class="desc">
        <p>{{ goods.desc }}</p>
      </div>
      <div class="price">
        <p>${{ goods.price }}</p>
        <p>X{{ goods.num }}</p>
      </div>
    </div>
    <div class="order-other">
      <p>
        <span>共{{ goods.num }}件 應付金額:</span>
        <span>${{ goods.num * goods.price }}</span>
      </p>
      <div class="buttons">
        <van-button v-show="again" round type="default" size="small"
          >再次購買</van-button
        >
        <van-button v-show="logistics" round type="default" size="small"
          >查看物流</van-button
        >
        <van-button v-show="cancel" round type="default" size="small"
          >取消訂單</van-button
        >
        <van-button v-show="pay" round type="danger" size="small"
          >立即購買</van-button
        >
        <van-button v-show="prompt" round type="default" size="small"
          >提醒出貨</van-button
        >
        <van-button v-show="confirm" round type="danger" size="small"
          >確認收貨</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from "vant";
export default {
  name: "orderItemView",
  props: ["goods"],
  components: {
    [Button.name]: Button,
  },
  data() {
    return {
      again: false,
      logistics: false,
      cancel: false,
      pay: false,
      prompt: false,
      confirm: false,
    };
  },
  methods: {
    changes: function (type) {
      switch (type) {
        case 1:
          this.pay = true;
          this.cancel = true;
          break;
        case 2:
          this.logistics = true;
          this.cancel = true;
          this.prompt = true;
          break;
        case 3:
          this.cancel = true;
          this.confirm = true;
          break;
        default:
          this.logistics = true;
          this.again = true;
      }
    },
  },
  computed: {
    typeStr: function () {
      if (this.goods.type == 1) {
        this.changes(this.goods.type);
        return "待付款";
      } else if (this.goods.type == 2) {
        this.changes(this.goods.type);
        return "待出貨";
      } else if (this.goods.type == 3) {
        this.changes(this.goods.type);
        return "待收貨";
      } else {
        this.changes(this.goods.type);
        return "交易成功";
      }
    },
  },
};
</script>

<style>
.order-item-view {
  padding: 1.25rem 0.9375rem;
  background: white;
  margin-top: 0.625rem;
}
.order-item-view .order-title {
  font-size: 0.75rem;
  transform: scale(0.9);
  line-height: 1.875rem;
  border-bottom: 0.0625rem solid #e8e8e8;
  overflow: hidden;
  font-weight: 600;
}
.order-item-view .order-title .time {
  display: block;
  float: left;
}
.order-item-view .order-title .type {
  display: block;
  float: right;
}
.order-item-view .order-goods {
  border-bottom: 0.0625rem solid #e8e8e8;
  height: 6.625rem;
  overflow: hidden;
  display: flex;
  align-items: center;
}
.order-item-view .order-goods .img {
  width: 6.25rem;
  height: 6.625rem;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
}
.order-item-view .order-goods .img img {
  max-height: 90%;
  max-width: 90%;
}
.order-item-view .order-goods .desc {
  width: 12.5rem;
  font-size: 0.75rem;
  line-height: 1.1875rem;
  font-weight: 600;
}

.order-item-view .order-goods .price {
  width: 2.1875rem;
  float: left;
  font-size: 0.75rem;
  line-height: 1.1875rem;
  color: #7d7380;
  text-align: right;
}
.order-item-view .order-other {
  text-align: right;
}

.order-item-view .order-other p {
  font-size: 0.8125rem;
  color: #7d7380;
  margin: 0.8125rem 0 0.8125rem;
}
.order-item-view .order-other p span:nth-of-type(2) {
  color: red;
}
.order-item-view .order-other .buttons button {
  margin-left: 0.3125rem;
}
</style>
