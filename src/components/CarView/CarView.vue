<template>
    <div class="car-view">
      購物車
    </div>
</template>

<script>
export default {
  name: 'carView', 
  data() {
    return {
      title:'購物車',
      navViewShow:true
    }
  },
  created() {
    // 發送標題
    this.$emit('ontitle',this.title),
    this.$emit('onNavShow',this.navViewShow)
  },
}
</script>

<style>

</style>
