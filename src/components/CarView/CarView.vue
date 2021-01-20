<template>
  <div class="car-view">
    <CartItemView
      v-for="(item, index) in cartslist"
      :key="index"
      :cart="item"
    ></CartItemView>
  </div>
</template>

<script>
import CartItemView from "../CartItemView/CartItemView.vue";
export default {
  name: "carView",
  components: {
    CartItemView,
  },
  data() {
    return {
      title: "購物車",
      navViewShow: true,
      cartslist: [],
    };
  },
  created() {
    // 發送標題
    this.$emit("ontitle", this.title),
      this.$emit("onNavShow", this.navViewShow);

    var that = this;
    this.$ajax
      .get("/json/cart.json")
      .then(function (response) {
        that.cartslist = response.data;
        // console.log(response.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  },
};
</script>

<style>
.car-view {
  padding-top: 2.8125rem;
}
</style>
