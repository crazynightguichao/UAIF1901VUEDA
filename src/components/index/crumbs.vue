// 面包屑
<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{cmenus.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
    data(){
        return {
            cmenus: "",
        }
    },
    props:["crumbsname"],
    created() {
        this.cmenus = this.$route;
    }
}
</script>

<style>
.el-breadcrumb{
    display: block;
    height: 50px;
    line-height: 50px;
}
</style>
