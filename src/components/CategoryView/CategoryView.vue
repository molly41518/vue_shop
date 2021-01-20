<template>
    <div class="categroy-view">
        <dl>
            <dt style="background:red;"></dt>
            <dd>框架</dd>
        </dl>
        <dl>
            <dt style="background:blue;"></dt>
            <dd>框架</dd>
        </dl>
        <dl>
            <dt style="background:black;"></dt>
            <dd>框架</dd>
        </dl>
        <dl>
            <dt style="background:green;"></dt>
            <dd>框架</dd>
        </dl>
        <dl>
            <dt style="background:orange;"></dt>
            <dd>框架</dd>
        </dl>
    </div>
</template>

<script>
export default {
  name: 'categroyView', 
}
</script>

<style>
.categroy-view{
    background: white;
    overflow: hidden;
}
.categroy-view dl{
    width: 20%;
    height: 5.3125rem;
    float: left;
    text-align: center;
    padding: 0.6875rem 0 0;
    box-sizing: border-box;
}
.categroy-view dl dt{
    width: 2.5rem;
    height: 2.5rem;
    display: inline-block;
    border-radius: 50%;
    margin-bottom:0.4375rem;
}
.categroy-view dl dd{
    font-size: 0.8125rem;
}
</style>
