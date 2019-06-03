// 仪表盘
<template>
  <div class="dashboard">
    <crumbs></crumbs>
    <el-row :gutter="24">
      <el-col :span="4" v-for="(v, index) in message" :key="index">
        <topsign :messages="v"></topsign>
      </el-col>
      
    </el-row>
    <el-row :gutter="24" style="margin: 20px 0;">
      <el-col :span="12" style="padding-left:0;">
        <el-card class="box-card">
          <div slot="header" class="clearfix" style="display: flex;">
            <i class="el-icon-pie-chart" style="font-size: 24px;"></i>
            <span>资产概况</span>
          </div>
          <el-row :gutter="24" style="text-align: center;">
            <el-col :span="12">
              <div style="height:30px;">在用</div>
              <el-progress type="circle" :width="160" :percentage="46" :stroke-width="13"></el-progress>
            </el-col>
            <el-col :span="12">
              <div style="height:30px;">闲置</div>
              <el-progress
                type="circle"
                :width="160"
                :percentage="54"
                :stroke-width="13"
                color="#67C23A"
              ></el-progress>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="12" style="padding-right:0;">
        <el-card class="box-card">
          <div slot="header" class="clearfix" style="display: flex;">
            <i class="el-icon-pie-chart" style="font-size: 24px;"></i>
            <span>资产状态占比</span>
          </div>
          <ve-pie
            :tooltip="{trigger:'item',formatter:'{a}<br/>{b}:{c}({d}%)'}"
            :legend="{type: 'scroll',orient: 'vertical',right: 10,top: 20,bottom: 20,data:chartData.columns}"
            height="194px"
            :series="{name:'资产状态',type:'pie',radius:'75%',center:['40%','50%'],data:chartData.rows}"
            :colors="colorList"
          ></ve-pie>
        </el-card>
      </el-col>
    </el-row>
    <el-card class="box-card">
      <div slot="header" class="clearfix" style="display: flex;">
        <i class="el-icon-pie-chart" style="font-size: 24px;"></i>
        <span>资产分类统计</span>
      </div>
      <ve-histogram :data="chartData1" :tooltip="{trigger:'item'}" :colors="colors"></ve-histogram>
    </el-card>
    <div class="copyright1">Copyright ©2018 丁艾资产管理系统 版权所有.</div>
  </div>
</template>

<script>
import topsign from '@/components/index/topSign.vue'
import crumbs from '@/components/index/crumbs.vue'

export default {
  data () {
    this.colorList = ['#67C23A', '#409EFF', '#F56C6C']
    this.colors = ['#67C23A']
    return {
      message: [
        {  number: 125 },
        {  number: 133 },
        {  number: 205 },
        {  number: 180 },
        {  number: 174 },
        {  number: 216 }
      ],
      chartData: {
        columns: ['闲置', '在用', '报废'],
        rows: [
          { name: '闲置', value: 1393 },
          { name: '在用', value: 3530 },
          { name: '报废', value: 2923 }
        ]
      },
      chartData1: {
        columns: ['类型', '数量'],
        rows: [
          { 类型: '土地房屋及建筑物', 数量: 1393 },
          { 类型: '专用设备', 数量: 3530 },
          { 类型: '电器设备', 数量: 2923 },
          { 类型: '电子产品及通信设备', 数量: 430 },
          { 类型: '文艺体育设备', 数量: 923 },
          { 类型: '图书文物及成列品', 数量: 1920 },
          { 类型: '家具用具及其他类', 数量: 620 }
        ]
      }
    }
  },
  components: {
    topsign,
    crumbs
  }
}
</script>

<style>
.copyright1 {
  color: #999;
  font-size: 12px;
  text-align: right;
  margin: 20px 0;
}
</style>
