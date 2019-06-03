// 状态按钮 
// 状态 0：闲置，1：在用，2：借用，3：维修中，4：报废
<template>
    <div class="lsstatus" :style="{backgroundColor:asset[status].color}">
        {{asset[status].label}}
    </div>
</template>
<script>
export default {
    data:function(){
        return {
            asset:{
                0:{label:"闲置",color:"#67C23A"},
                1:{label:"在用",color:"#409EFF"},
                2:{label:"借用",color:"#1898D1"},
                3:{label:"维修中",color:"#E6A23C"},
                4:{label:"报废",color:"#F56C6C"},
            
            }
        }
    },
    props:{
        status:{
            required: true,
            default: 0
        }
    }
}
</script>
<style>
.lsstatus{
    border-radius: 12px;
    color: #fff;
    display: inline-block;
    font-size: 12px;
    line-height: 24px;
    padding: 0 10px;
    /* margin: 0 auto; */

}
</style>


