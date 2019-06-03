// 首页顶部
<template>
    <div class="sign">
        <h3>待签字</h3>
        <span>{{messages.number}}</span>
    </div>
</template>

<script>
export default {
    props:{
        messages:{}
    }
}
</script>

<style>
.sign{
    background: #409eff url(../../assets/top.png) bottom/auto no-repeat;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    color: #fff;
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
}
.sign h3{
    font-size: 12px;
    line-height: 30px;
}
.sign span{
    font-size: 24px;
    height: 40px;
    line-height: 50px;
}
</style>
