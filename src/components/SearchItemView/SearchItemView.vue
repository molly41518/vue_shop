<template>
  <div class="search-item-view">
    <div class="img">
      <img :src="goods.img" alt="" />
    </div>
    <div class="content">
      <p class="name">{{ goods.name }}</p>
      <p class="keywords">{{ goods.keywords }}</p>
      <p class="price">
        <span>${{ goods.price }}</span>
        <span>單價 ${{ goods.unitPrice }}</span>
      </p>
      <p class="other">
        <span class="sale" v-if="goods.sale">特價</span>
        <span class="appraise">{{ goods.appraiseNum }}</span>
        <span class="rate">{{ goods.rateScore }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchItemView",
  props: ["goods"],
};
</script>

<style>
.search-item-view {
  width: 22.1875rem;
  height: 8rem;
  margin: 0.625rem;
  background: white;
  box-shadow: 0 0 0.25rem 0 gray;
  border-radius: 0.3125rem;
}
.search-item-view .img {
  width: 6.5625rem;
  float: left;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.125rem;
  box-sizing: border-box;
}

.search-item-view .img img {
  max-width: 90%;
  max-height: 90%;
}

.search-item-view .content {
  width: 15.625rem;
  height: 100%;
  float: left;
  padding-top: 0.8125rem;
  padding-right: 1.0625rem;
  box-sizing: border-box;
}

.search-item-view .content .name {
  font-size: 0.8125rem;
  line-height: 1.0625rem;
  font-weight: 600;
}

.search-item-view .content .keywords {
  font-size: 0.8125rem;
  line-height: 1.4375rem;
  color: #ababab;
}
.search-item-view .content .price {
  line-height: 1.875rem;
}

.search-item-view .content .price span:nth-child(1) {
  color: red;
  font-size: 0.875rem;
  margin-right: 1.3125rem;
}
.search-item-view .content .price span:nth-child(2) {
  font-size: 0.6875rem;
  color: #ababab;
}
.search-item-view .content .other {
  line-height: 1.0625rem;
}
.search-item-view .content .other .sale {
  width: 1.875rem;
  height: 1.0625rem;
  font-size: 0.6875rem;
  background: red;
  border-radius: 0.3125rem;
  display: inline-block;
  text-align: center;
  color: white;
  margin-right: 0.6875rem;
}
.search-item-view .content .other .appraise {
  margin-right: 0.6875rem;
}
.search-item-view .content .other .appraise,
.search-item-view .content .other .rate {
  color: #ababab;
  font-size: 0.6875rem;
}
</style>
