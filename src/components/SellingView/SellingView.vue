<template>
  <div class="selling-view">
    <GoodsItemView
      v-for="(goods, index) in sellinglist"
      :key="index"
      :goods="goods"
    ></GoodsItemView>
  </div>
</template>

<script>
import GoodsItemView from "../GoodsItemView/GoodsItemView.vue";

export default {
  name: "sellingView",
  components: {
    GoodsItemView,
  },
  data() {
    return {
      sellinglist: [],
    };
  },
  created() {
    var that = this;
    this.$ajax
      .get("/json/selling-list.json")
      .then(function (respons) {
        //   console.log(respons.data)
        that.sellinglist = respons.data;
      })
      .catch(function (err) {
        console.log(err);
      });
  },
};
</script>

<style>
.selling-view {
  border-left: 0.0625rem solid #bbbbbb;
  border-top: 0.0625rem solid #bbbbbb;
  overflow: hidden;
}
</style>
