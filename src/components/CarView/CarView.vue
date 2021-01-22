<template>
  <div class="car-view">
    <!-- 購物車商品項目 -->
    <!-- 使用ref拿取組件 -->
    <CartItemView
      v-for="(item, index) in cartsList"
      :key="index"
      :cart="item"
      :isChecked="selectList[index]"
      @onCheckedChange="onItemCheckedChange"
      :index="index"
      ref="CartItemView"
    ></CartItemView>

    <!-- 提交訂單 -->
    <van-submit-bar
      label="總計："
      :price="totalPrice"
      button-text="提交訂單"
      @submit="onSubmit"
    >
      <van-checkbox
        v-model="isAll"
        checked-color="red"
        class="all-checkbox"
        @change="onChageAllSelect"
        >全選</van-checkbox
      >
    </van-submit-bar>

    <!-- 選擇地址 -->
    <van-popup v-model="isSubmit" position="bottom">
      <SelectAddrView
        :addrList="addrList"
        @onEditAddr="onEditAddr"
      ></SelectAddrView>
    </van-popup>

    <!-- 地址編輯 -->
    <van-popup v-model="isEdit" position="bottom">
      <EditAddrView
        :editValue="editValue"
        @onSaveNewAddr="onSaveNewAddr"
      ></EditAddrView>
    </van-popup>
  </div>
</template>

<script>
import { SubmitBar, Checkbox, Popup } from "vant";
import CartItemView from "../CartItemView/CartItemView.vue";
import SelectAddrView from "../SelectAddrView/SelectAddrView.vue";
import EditAddrView from "../EditAddrView/EditAddrView.vue";

export default {
  name: "carView",
  components: {
    CartItemView,
    [SubmitBar.name]: SubmitBar,
    [Checkbox.name]: Checkbox,
    [Popup.name]: Popup,
    SelectAddrView,
    EditAddrView,
  },
  data() {
    return {
      title: "購物車",
      navViewShow: true,
      cartsList: [],
      isAll: true,
      selectList: [],
      isSubmit: false,
      addrList: [],
      isEdit: false,
      editValue: [],
      editIdex: -1,
    };
  },
  methods: {
    onSubmit: function () {
      console.log("提交訂單");
      this.isSubmit = true;
    },
    onItemCheckedChange: function (isChecked, index) {
      // console.log(isChecked, index);
      // 更新 selectList
      //this.selectList[index] = isChecked;
      // 發生錯誤-利用陣列索引直接設值時vue無法監測

      // 動態添加新的響應式屬性
      this.$set(this.selectList, index, isChecked);
    },
    onChageAllSelect: function () {
      for (var i = 0; i < this.selectList.length; i++) {
        // 發生錯誤-利用陣列索引直接設值時vue無法監測
        // this.selectList[i] = this.isAll;
        this.$set(this.selectList, i, this.isAll);

        //將對應的狀態傳到子組件
        this.$refs.CartItemView[i].onItemViewChange(this.isAll);
      }
      // console.log(this.selectList);
    },
    onEditAddr: function (index) {
      this.isEdit = true;
      this.editValue = this.addrList[index];
      this.editIdex = index;
      console.log(this.editValue);
    },
    onSaveNewAddr: function (newAddr) {
      // 更新訊息
      this.$set(this.addrList, this.editIdex, newAddr);
      // 控制頁面
      this.isEdit = false;
    },
  },
  computed: {
    totalPrice: function () {
      var total = 0;
      for (var i = 0; i < this.selectList.length; i++) {
        if (this.selectList[i]) {
          var price = this.cartsList[i].price;
          var num = this.cartsList[i].num;
          var count = price * num * 100;
          total += count;
        }
      }
      // 單位不同
      return total;
    },
  },
  created() {
    // 發送標題
    this.$emit("ontitle", this.title),
      this.$emit("onNavShow", this.navViewShow);

    var that = this;
    this.$ajax
      .get("/json/cart.json")
      .then(function (response) {
        // console.log(response.data);
        that.cartsList = response.data;

        for (var i = 0; i < that.cartsList.length; i++) {
          that.selectList.push(true);
        }
      })
      .catch(function (err) {
        console.log(err);
      });

    this.$ajax
      .get("/json/user-addr.json")
      .then(function (response) {
        // console.log(response.data);
        that.addrList = response.data;
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
  padding-bottom: 6.25rem;
  box-sizing: border-box;
}
.car-view .van-submit-bar {
  margin-bottom: 2.875rem;
  z-index: 0;
}
.car-view .van-submit-bar.all-checkbox {
  margin-left: 0.9375rem;
}
</style>
