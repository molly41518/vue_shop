<template>
  <div class="select-addr-view">
    <van-address-list
      v-model="chosenAddressId"
      :list="addrList"
      add-button-text="下一步"
      @add="onNext"
      @edit="onEdit"
    />
  </div>
</template>

<script>
import { AddressList, Toast } from "vant";

export default {
  name: "selectAddrView",
  components: {
    [AddressList.name]: AddressList,
  },
  props: ["addrList"],
  data() {
    return {
      chosenAddressId: "1",
    };
  },
  methods: {
    onNext() {
      Toast("新增地址");
    },
    onEdit(item, index) {
      this.$emit("onEditAddr", index);
    },
  },
};
</script>

<style>
</style>
