<template>
  <div class="winnow-view">
    <img :src="bigImg" alt="" class="bigImg" />
    <div class="hidden-view">
      <div class="winnow-box" ref="itemsView">
        <WinnowItemView
          v-for="(item, index) in contents"
          :key="index"
          :item="item"
        ></WinnowItemView>
      </div>
    </div>
  </div>
</template>

<script>
import WinnowItemView from "../WinnowItemView/WinnowItemView.vue";
export default {
  name: "winnowView",
  props: ["bigImg", "contents"],
  components: {
    WinnowItemView,
  },
  //不能使用mounted 因為組件先被載入，但ajax還未拿到資料，所以內容為0
  //必須改用beforeUpdate在更新資料前動態設置寬度
  beforeUpdate() {
    //   拿到winnow-box節點，並動態設置寬度
    var temp = this.contents.length * (100 + 10);
    // console.log(temp)0
    this.$refs.itemsView.style.width = temp / 16 + "rem";
  },
};
</script>

<style>
.winnow-view .bigImg {
  width: 100%;
}

.winnow-view .hidden-view {
  width: 100%;
  overflow: auto;
}

.winnow-box {
  background: white;
  overflow: hidden;
  padding-left: 0.625rem;
}
</style>
