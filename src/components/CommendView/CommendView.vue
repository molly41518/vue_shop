<template>
  <div class="commend-view">
    <van-panel v-for="(item, index) in commendList" :key="index">
      <div class="commend-wrapper">
        <div class="img-view">
          <img :src="item.img" alt="" />
        </div>
        <div class="detail-view">
          <h4 class="title">{{ item.title }}</h4>
          <p class="desc">{{ item.desc }}</p>
          <div class="keywords">
            <span>{{ item.keyword1 }}</span>
            <span>{{ item.keyword2 }}</span>
          </div>
          <p class="price">${{ item.price }}</p>
        </div>
      </div>

      <template #footer>
        <span class="brand">{{ item.brand }}</span>
        <span class="standard">{{ item.standard }}</span>
        <button size="small" class="similar">找相似</button>
      </template>
    </van-panel>
  </div>
</template>

<script>
import { Panel } from "vant";

export default {
  name: "commendView",
  components: {
    [Panel.name]: Panel,
  },
  data() {
    return {
      commendList: [],
    };
  },

  created() {
    var that = this;
    this.$ajax
      .get("/json/commend-list.json")
      .then(function (response) {
        // console.log(response.data);
        that.commendList = response.data;
      })
      .catch(function (err) {
        console.log(err);
      });
  },
};
</script>

<style>
.commend-view .van-cell-group {
  margin-bottom: 0.625rem;
}

.commend-view .van-panel__header {
  padding: 0;
}
.commend-view .commend-wrapper {
  overflow: hidden;
  height: 11.25rem;
  border-bottom: 1px solid #d4d4d4;
}

.commend-view .commend-wrapper .img-view {
  width: 10.3125rem;
  float: left;
  text-align: center;
}
.commend-view .commend-wrapper .img-view img {
  width: 7.5rem;
  margin-top: 1.5625rem;
}
.commend-view .commend-wrapper .detail-view {
  width: 13.125rem;
  float: left;
  margin-top: 0.5625rem;
  padding-right: 1rem;
  box-sizing: border-box;
}
.commend-view .commend-wrapper .detail-view .title {
  font-size: 1rem;
  font-weight: 900;
  line-height: 1.4375rem;
}
.commend-view .commend-wrapper .detail-view .desc {
  font-size: 0.8125rem;
  line-height: 1.125rem;
  color: #737373;
}
.commend-view .commend-wrapper .detail-view .keywords {
  width: 7.25rem;
  height: 1.25rem;
  line-height: 1.25rem;
  margin: 0.625rem 0;
  font-size: 0.8125rem;
  color: #d5b085;
  text-align: center;
  background: #f2f2f2;
  margin-bottom: 0.75rem;
}
.commend-view .commend-wrapper .detail-view .price {
  font-size: 0.875rem;
  color: red;
  font-weight: 800;
}

.commend-view .van-panel__footer {
  height: 2.625rem;
  line-height: 2.625rem;
  font-size: 0.75rem;
  color: #808080;
}
.commend-view .van-panel__footer .brand {
  margin-right: 6.375rem;
}
.commend-view .van-panel__footer .similar {
  margin-top: 0.625rem;
  border: 0.0625rem solid #808080;
  float: right;
  width: 3.5625rem;
  height: 1.25rem;
  line-height: 1.25rem;
  text-align: center;
  border-radius: 0.625rem;
  background: white;
}
</style>
