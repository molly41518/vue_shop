<template>
  <div class="search-detail-view">
    <!-- 導覽列 -->
    <van-nav-bar fixed title="商品詳情" left-arrow @click-left="onBack" />
    <SearchItemView
      v-for="(item, index) in searchDataList"
      :key="index"
      :goods="item"
    ></SearchItemView>
  </div>
</template>

<script>
import { NavBar } from "vant";
import SearchItemView from "../SearchItemView/SearchItemView.vue";
export default {
  name: "searchDetailView",
  props: ["searchDataList"],
  components: {
    SearchItemView,
    [NavBar.name]: NavBar,
  },
  methods: {
    // 返回上一頁
    onBack: function () {
      this.$emit("onBack");
    },
  },
};
</script>

<style>
.search-detail-view {
  padding-top: 2.8125rem;
  overflow: auto;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  background: #f2f2f2;
  z-index: 999;
}
</style>
