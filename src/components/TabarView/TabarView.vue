<template>
    <div class="tabbar-view">
        <router-link to='/home'>首頁</router-link>
        <router-link to='/assort'>分類</router-link>
        <router-link to='/search'>搜索</router-link>
        <router-link to='/car'>購物車</router-link>
        <router-link to='/mine'>我的</router-link>
    </div>
</template>

<script>
export default {
  name: 'tabbarView', 
}
</script>

<style>
.tabbar-view{
    height: 3.125rem;
    position: fixed;
    bottom: 0;
    border-top: 0.0625rem solid gray;
    width: 100%;

}
.tabbar-view a{
    display: inline-block;
    width: 20%;
    text-align: center;
    line-height: 3.125rem;
}
</style>
