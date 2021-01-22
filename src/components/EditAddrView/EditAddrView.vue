<template>
  <div class="edit-addr-view">
    <van-address-edit
      :area-list="areaList"
      :address-info="editValue"
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-num="2"
      :area-columns-placeholder="['城市', '區域']"
      @save="onSave"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import { AddressEdit, Toast, Area } from "vant";
import AddrAllList from "./areaList";

export default {
  name: "editAddrView",
  props: ["editValue"],
  components: {
    [AddressEdit.name]: AddressEdit,
    [Toast.name]: Toast,
    [Area.name]: Area,
  },
  data() {
    return {
      areaList: AddrAllList,
      searchResult: [],
    };
  },
  methods: {
    onSave(content) {
      console.log(content);
      var new_addr = {
        id: content.id,
        name: content.name,
        tel: content.tel,
        address: content.city + content.county + content.addressDetail,
      };
      // 若有後台，在此發送 ajax 存取
      this.$emit("onSaveNewAddr", new_addr);
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          //之後可加入地圖定位或其他api串聯
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区",
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
  },
};
</script>

<style>
</style>
