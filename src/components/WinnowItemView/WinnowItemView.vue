<template>
    <div class="winnow-item-view">
        <h3>{{item.name}}</h3>
        <h4>{{item.desc}}</h4>
        <img :src="item.img" alt="">
    </div>
</template>

<script>
export default {
  name: 'winnowItemView',
  props:['item']

}
</script>

<style>
.winnow-item-view{
    width: 6.25rem;
    height: 6.25rem;
    background: #f6f6f6;
    margin: .3125rem .625rem .625rem 0;
    text-align: center;
    float: left;
}
.winnow-item-view h3{
    font-size: .8125rem;
    margin: .4375rem  .6875rem;
    font-weight: 700;
}
.winnow-item-view h4{
    font-size: .75rem;
    margin-bottom: .3125rem;
    font-weight: 600;
}
.winnow-item-view img{
    width: 4.625rem;
}

</style>
