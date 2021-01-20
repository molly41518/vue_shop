<template>
  <div class="goods-item-view" @click="goodsItemClick(goods.id)">
    <img class="img" v-lazy="goods.img" />
    <p class="title">{{ goods.title }}</p>
    <p class="desc">{{ goods.desc }}</p>
    <p class="other">
      <span class="now-price">${{ goods.nowPrice }}</span>
      <span class="old-price">${{ goods.oldPrice }}</span>
      <span class="rebate">{{ goods.rebate }}折</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "goodsItemView",
  props: ["goods"],
  methods: {
    goodsItemClick: function (goodsId) {
      // console.log(goodsId);
      //改變goodsDetailShow的狀態
      this.$store.commit("changeGoodsDetailShow");
      this.$store.commit("changeGoodsItemId", goodsId);
    },
    created() {
      console.log(this.$store.goodsItemid);
    },
  },
};
</script>

<style>
.goods-item-view {
  width: 50%;
  height: 13.875rem;
  border-right: 0.0625rem solid #bbbbbb;
  border-bottom: 0.0625rem solid #bbbbbb;
  float: left;
  box-sizing: border-box;
  background: white;
  text-align: center;
}
.goods-item-view .img {
  margin-top: 1.5625rem;
  width: 8.75rem;
}
.goods-item-view .title {
  font-size: 0.8125rem;
  color: black;
  margin: 0.625rem 0;
}
.goods-item-view .desc {
  font-size: 0.75rem;
  color: #b4b4b4;
  margin-bottom: 0.8125rem;
}
.goods-item-view .now-price {
  color: red;
  font-size: 1rem;
  font-weight: 800;
  margin-right: 1.125rem;
}
.goods-item-view .old-price {
  font-size: 0.75rem;
  color: #b4b4b4;
  margin-right: 1.125rem;
  text-decoration: line-through;
}
.goods-item-view .rebate {
  font-size: 0.75rem;
  background: red;
  color: white;
  border-radius: 0.1875rem;
  width: 2.0625rem;
  height: 0.75rem;
  display: inline-block;
}
</style>
