<template>
  <div class="cart-item-view">
    <div class="cart-checkbox">
      <van-checkbox
        v-model="checked"
        checked-color="red"
        class="checked-item"
        @change="onCheckedChange"
      ></van-checkbox>
    </div>
    <div class="cart-img">
      <img :src="cart.img" alt="" />
    </div>
    <div class="cart-detail">
      <div class="goods-detail">
        <span>特價</span>
        <span>{{ cart.name }}</span>
      </div>
      <p>${{ cart.price }}</p>
      <p>X{{ cart.num }}</p>
    </div>
  </div>
</template>

<script>
import { Checkbox } from "vant";
export default {
  name: "cartItemView",
  components: {
    [Checkbox.name]: Checkbox,
  },
  props: ["cart", "isChecked", "index"],
  data() {
    return {
      checked: true,
    };
  },
  methods: {
    onCheckedChange: function () {
      // console.log(this.checked);
      this.$emit("onCheckedChange", this.checked, this.index);
    },
    onItemViewChange: function (checked) {
      // console.log(checked);
      this.checked = checked;
    },
  },
  created() {
    this.checked = this.isChecked;
  },
};
</script>

<style>
.cart-item-view {
  width: 22.1875rem;
  height: 6.25rem;
  margin: 0.625rem;
  border: 0.0625rem solid #bbbbbb;
  box-shadow: 0 0 0.25rem 0 gray;
  border-radius: 0.5rem;
  background: white;
}
.cart-item-view .cart-checkbox {
  width: 1.875rem;
  height: 100%;
  float: left;
  display: flex;

  justify-content: center;
  align-items: center;
}
.cart-item-view .cart-img {
  float: left;
  width: 4.8125rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cart-item-view .cart-img img {
  width: 100%;
}
.cart-item-view .cart-detail {
  float: left;
  margin-top: 1.5625rem;
}
.cart-item-view .cart-detail .goods-detail {
  font-size: 0.875rem;
}
.cart-item-view .cart-detail .goods-detail span:nth-child(1) {
  color: red;
  margin-right: 0.6875rem;
}
.cart-item-view .cart-detail p {
  font-size: 0.75rem;
}
.cart-item-view .cart-detail p:nth-of-type(1) {
  line-height: 2.1875rem;
}
</style>
