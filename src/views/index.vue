<template>
  <el-container>
    <!-- 侧导航 -->
    <el-aside style="width:auto;">
      <div class="logo">
        <img src="@/assets/logo2.png" class="nav-imglogo">
        <span class="text" :class="{dis:isCollapse}">丁艾资产</span>
      </div>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-vertical-demo"
        background-color="#2f3e4e"
        text-color="#fff"
        :router="true"
        active-text-color="#409EFF"
        :collapse="isCollapse"
      >
        <template v-for="v in menus">
          <template v-if="!v.isHidden">
            <el-menu-item v-if="!v.children" :key="v.name" :index="v.name" :route="{name:v.name}">
              <i :class="v.meta.icon"></i>
              <span slot="title">{{v.meta.title}}</span>
            </el-menu-item>
            <el-submenu :index="v.name" :key="v.name" v-else>
              <template slot="title">
                <i :class="v.meta.icon"></i>
                <span slot="title">{{v.meta.title}}</span>
              </template>
              <el-menu-item v-for="list in v.children" :index="list.name" :key="list.name" :route="{name:list.name}">
                <i :class="list.meta.icon"></i>
                <span slot="title">{{list.meta.title}}</span>
              </el-menu-item>
            </el-submenu>
          </template>
        </template>
      </el-menu>
    </el-aside>
    <!-- 右侧页面 -->
    <el-container class="is-vertical">
      <!-- 右侧头部 -->
      <el-header style="padding: 0;">
        <div class="headericon">
          <i
            class="el-icon-s-fold"
            :class="{'rotate':isCollapse,'':!isCollapse}"
            @click="isCollapse = !isCollapse"
          ></i>
        </div>
        <div class="title-menu">
          <el-menu
            :router="true"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
          >
            <el-submenu index="消息" >
              <template slot="title">
                <i class="el-icon-bell"></i>
                <span>消息</span>
              </template>
              <el-menu-item index="消息1" style="height:50px; border-bottom: 1px solid #eee;">
                <div class="lileft">
                  <i class="el-icon-bell"></i>
                </div>
                <div class="liright">
                  <span>新功能上线通知</span>
                  <br>
                  <span>2019-05-28</span>
                </div>
              </el-menu-item>
              <el-menu-item index="消息2" style="height:50px; border-bottom: 1px solid #eee;">
                <div class="lileft">
                  <i class="el-icon-bell"></i>
                </div>

                <div class="liright">
                  <span>新功能上线通知</span>
                  <br>
                  <span>2019-05-28</span>
                </div>
              </el-menu-item>
              <el-menu-item index="消息3" style="height:50px; border-bottom: 1px solid #eee;">
                <div class="lileft">
                  <i class="el-icon-bell"></i>
                </div>
                <div class="liright">
                  <span>新功能上线通知</span>
                  <br>
                  <span>2019-05-28</span>
                </div>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="管理员">
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span>管理员</span>
              </template>
              <el-menu-item index="修改密码" :route="{name: 'change'}">
                <i class="el-icon-tickets"></i>
                <span>修改密码</span>
              </el-menu-item>
              <el-menu-item index="修改资料" :route="{name: 'data'}">
                <i class="el-icon-edit"></i>
                <span>修改资料</span>
              </el-menu-item>
              <el-menu-item index="退出登录" @click="returns">
                <i class="el-icon-switch-button"></i>
                <span>退出登录</span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="帮助">
              <template slot="title">
                <i class="el-icon-question"></i>
                <span>帮助</span>
              </template>
              <el-menu-item index="帮助中心">
                <i class="el-icon-question"></i>
                <span>帮助中心</span>
              </el-menu-item>
              <el-menu-item index="使用手册">
                <i class="el-icon-document"></i>
                <span>使用手册</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </el-header>
      <!-- 右侧主要部分 -->
      <el-main style="padding-top: 0;">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: 'dashboard',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      isCollapse: false,
      menus: [],
    }
  },
  created() {
    this.menus = this.$router.options.routes[1].children;
    this.activeIndex = this.$route.name
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    returns(){
      this.$router.push({name:'login'})
    }
  }
};
</script>

<style>
.el-container {
  width: 100%;
  height: 100%;
}
.el-aside {
  background: #2f3e4e;
  flex-shrink: 0;
}
.el-aside .logo {
  height: 60px;
  padding: 0 20px;
  font-size: 22px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 60px;
}
.nav-imglogo {
  width: 36px;
  height: 36px;
  margin: 12px 0;
  float: left;
}
.logo .text{
  padding-left: 14px;
  padding-right: 22px;
}
.container .el-menu-vertical-demo:not(.el-menu--collapse){
  min-height: 400px;
  width: 200px;
}
.el-aside .el-menu {
  border: none;
}
.dis{
  display: none;
}
.is-vertical {
  flex-direction: column;
}
.el-header {
  height: 60px;
  background: #fff;
  border-bottom: 1px solid #e6e6e6;
  box-sizing: border-box;
  flex-shrink: 0;
}
.el-header .headericon {
  width: 60px;
  height: 60px;
  float: left;
}
.el-icon-s-fold {
  font-size: 20px;
  margin: 20px;
  transition: all 0.5s;
}
.rotate {
  transform: rotate(90deg);
}
.liright {
  display: inline-block;
  font-size: 12px !important;
  height: 40px;
  line-height: 20px;
  margin: 5px 0;
  vertical-align: middle;
  white-space: nowrap;
}
.lileft {
  display: inline-block;
  height: 36px;
  margin: 7px 10px 7px 0;
  width: 36px;
}
.lileft i {
  background-color: #f2f2f2;
  border-radius: 50%;
  height: 100%;
  line-height: 36px;
  text-align: center;
  width: 100% !important;
}
.title-menu {
  float: right;
}
.el-main {
  height: 590px;
}
.dialog-footer{
  text-align: right;
}
</style>


