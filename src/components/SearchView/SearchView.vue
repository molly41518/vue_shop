<template>
  <div class="search-view">
    <van-search
      v-model="searchKey"
      show-action
      shape="round"
      placeholder="請輸入搜尋關鍵字"
      @search="onSearch"
    >
      <template #action>
        <div @click="onSearch">搜尋</div>
      </template>
    </van-search>
    <div class="history-view">
      <div class="history-title">
        <h4>最近搜索</h4>
        <span @click="onClear">清空紀錄</span>
      </div>
      <van-tag
        @click="onHistoryItem(item)"
        round
        v-for="(item, index) in historyList"
        :key="index"
        >{{ item }}</van-tag
      >
    </div>
    <!-- 搜尋詳情 -->
    <SearchDetailView
      @onBack="onDetailShow"
      :searchDataList="searchDataList"
      v-if="searchDetailShow"
    ></SearchDetailView>
  </div>
</template>

<script>
import { Search, Tag, Toast } from "vant";
import SearchDetailView from "../SearchDetailView/SearchDetailView.vue";

export default {
  name: "searchView",
  components: {
    [Search.name]: Search,
    [Tag.name]: Tag,
    [Toast.name]: Toast,
    SearchDetailView,
  },
  data() {
    return {
      title: "搜尋",
      navViewShow: false,
      searchKey: "",
      historyList: ["明月", "海昌", "隱形眼鏡"],
      searchDetailShow: false,
      searchDataList: [],
    };
  },
  methods: {
    onSearch: function () {
      if (this.searchKey) {
        this.searchloading();
        this.historyList.push(this.searchKey);
      }
    },
    onClear: function () {
      this.historyList = [];
    },
    onHistoryItem: function (item) {
      this.searchKey = item;
      this.searchloading();
    },
    onDetailShow: function () {
      this.searchDetailShow = false;
    },
    closeLododing: function () {
      // 進入搜尋內容
      this.searchDetailShow = true;
    },
    searchloading: function () {
      // 載入loading
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
        overlay: true,
        duration: 0,
        // 關閉後的回調
        onClose: this.closeLododing,
      });
      // 拿到搜尋關鍵字的資料
      var that = this;
      this.$ajax
        .get("/json/search-detail.json")
        .then(function (response) {
          that.searchDataList = response.data.list;
          Toast.clear();
        })
        .catch(function (err) {
          console.log(err);
        });
    },
  },
  created() {
    this.$emit("ontitle", this.title),
      this.$emit("onNavShow", this.navViewShow);
  },
};
</script>

<style>
.search-view {
  /* position: fixed;
  left: 0;
  top: 0;
  bottom: 0; */
  width: 100%;
  background: #f2f2f2;
}
.search-view .history-view {
  padding: 0 1.25rem;
}
.search-view .history-view .history-title {
  margin: 1.125rem 0 1.25rem;
  overflow: hidden;
}
.search-view .history-view .history-title h4 {
  float: left;
  font-size: 1rem;
  font-weight: 800;
}
.search-view .history-view .history-title span {
  float: right;
  font-size: 1rem;
  color: red;
}
.search-view .history-view .van-tag {
  margin: 0 0.625rem;
  padding-right: 0.625rem;
  padding-left: 0.625rem;
}
</style>
