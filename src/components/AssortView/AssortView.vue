<template>
  <div class="assort-view">
    <div class="side-view">
      <div
        class="item"
        v-for="(item, index) in assortList"
        :key="index"
        @click="onNavClick(index)"
        ref="sideItem"
      >
        <p>{{ item.text }}</p>
      </div>
    </div>
    <div class="main-view">
      <div class="main-wrapper">
        <div
          class="goods-wrapper"
          v-for="(item, index) in goodsList"
          :key="index"
        >
          <div class="img">
            <img :src="item.img" alt="" />
          </div>
          <div class="content">
            <div class="name">{{ item.name }}</div>
            <div class="old-price">原價: ${{ item.oldPrice }}</div>
            <div class="price">折扣價: ${{ item.price }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "assortView",
  data() {
    return {
      title: "分類",
      navViewShow: true,
      assortList: [],
      activeIndex: 0,
      selectItem: [],
      goodsList: [],
    };
  },
  methods: {
    onNavClick: function (index) {
      this.activeIndex = index;
      this.goodsList = this.assortList[this.activeIndex].children;
      // 將其他選中的樣式清除
      this.selectItem.className = "item";
      this.selectItem = this.$refs.sideItem[this.activeIndex];
      console.log(this.activeIndex);
      this.selectItem.className = "item active";
    },
  },
  created() {
    // 發送標題
    this.$emit("ontitle", this.title),
      this.$emit("onNavShow", this.navViewShow);

    var that = this;
    this.$ajax
      .get("/json/assort.json")
      .then(function (response) {
        // console.log(response.data);
        that.assortList = response.data;

        that.$nextTick(function () {
          that.goodsList = that.assortList[that.activeIndex].children;

          // that.activeIndex = 0
          that.selectItem = that.$refs.sideItem[that.activeIndex];
          that.selectItem.className += " active";
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  },
};
</script>

<style>
.assort-view {
  background: #f2f2f2;
  padding-top: 2.8125rem;
  padding-bottom: 3.125rem;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}
.assort-view .side-view {
  height: 100%;
  width: 5.9375rem;
  float: left;
  background: white;
  padding: 0.9375rem;
  box-sizing: border-box;
}

.assort-view .side-view .item {
  font-size: 0.75rem;
  height: 26px;
  line-height: 26px;
  border-radius: 0.75rem;
  text-align: center;
  margin-bottom: 0.9375rem;
}

.assort-view .side-view .active {
  background: black;
  color: white;
}

.assort-view .main-view {
  width: 16.25rem;
  overflow: auto;
  float: left;
  padding: 0.625rem;
  height: 100%;
}

.assort-view .main-view .main-wrapper {
  width: 100%;
  padding-bottom: 0.625rem;
}

.assort-view .main-view .main-wrapper .goods-wrapper {
  background: white;
  height: 6.25rem;
  margin-bottom: 0.625rem;
  /* padding: 0.625rem; */
  box-sizing: border-box;
  border-radius: 0.3125rem;
}
.assort-view .main-view .main-wrapper .goods-wrapper .img {
  width: 5.625rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
}
.assort-view .main-view .main-wrapper .goods-wrapper .img img {
  max-width: 100%;
  max-height: 100%;
}
.assort-view .main-view .main-wrapper .goods-wrapper .content {
  width: 9.6875rem;
  float: left;
  margin-top: 0.8125rem;
}
.assort-view .main-view .main-wrapper .goods-wrapper .content .name {
  font-size: 0.75rem;
  line-height: 1.0625rem;
}
.assort-view .main-view .main-wrapper .goods-wrapper .content .old-price {
  font-size: 0.75rem;
  line-height: 2.0625rem;
  text-decoration: line-through;
  color: #bbbbbb;
}
.assort-view .main-view .main-wrapper .goods-wrapper .content .price {
  color: red;
  font-size: 0.6875rem;
}
</style>
