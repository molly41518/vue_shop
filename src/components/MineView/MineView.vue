<template>
    <div class="mine-view">
        我的
    </div>
</template>

<script>
export default {
  name: 'mineView', 
  data() {
    return {
      title:'我的',
      navViewShow:false
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
