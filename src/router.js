import Vue from 'vue'
import Router from 'vue-router'
// import login from './views/login.vue' 


// 使用路由
Vue.use(Router)

export default new Router({
    // mode:'history',  // 没有# ，哈希有#
    // 要跳转的路由，里面是一个个json对象
    routes:[
        // 登录
        {
            path:'/',
            name:'login',
            hidden: false,
            // component:login //第一种：引入login组件
            component:() => import('@/views/login.vue') // 第二种：箭头函数
        },
        // 首页
        {
            path:'/index',
            name:'index',
            hidden: false,
            component:() => import('@/views/index.vue'),
            redirect:{name: 'dashboard'},
            // 点击左边的菜单，右边部分跳转 
            children:[
                // 侧导航
                {
                    path:'dashboard',
                    name:'dashboard',
                    isHidden: false,
                    component: () => import('@/views/index/dashboard.vue'),
                    // meta包含一些需要的属性
                    meta:{
                        title:'仪表盘',
                        icon:'el-icon-stopwatch' ,  
                    },                     
                },
                {
                    path: 'register',
                    name: 'register',
                    isHidden: false,
                    component: () => import('@/views/index/register.vue'),
                    meta: {title:'资产登记',icon:'el-icon-edit'}
                },
                {
                    path: 'receive',
                    name: 'receive',
                    isHidden: false,
                    component: () => import('@/views/index/receive.vue'),
                    meta: {title:'领用退库',icon:'el-icon-tickets'} ,
                },
                {
                    path: 'return',
                    name: 'return',
                    isHidden: false,
                    component: () => import('@/views/index/return.vue'),
                    meta: {title:'借用归还',icon:'el-icon-sell'}
                },
                {
                    path: 'modify',
                    name: 'modify',
                    isHidden: false,
                    component: () => import('@/views/index/modify.vue'),
                    meta: {title:'信息修改',icon:'el-icon-edit-outline'}
                },
                {
                    path: 'repair',
                    name: 'repair',
                    isHidden: false,
                    component: () => import('@/views/index/repair.vue'),
                    meta: {title:'维修管理',icon:'el-icon-setting'}
                },
                {
                    path: 'scrap',
                    name: 'scrap',
                    isHidden: false,
                    component: () => import('@/views/index/scrap.vue'),
                    meta: {title:'报废管理',icon:'el-icon-delete'}
                },
                {
                    path: 'statistics',
                    name: 'statistics',
                    isHidden: false,
                    component: () => import('@/views/index/statistics.vue'),
                    meta: {title:'资产统计',icon:'el-icon-loading'},
                    children:[
                      {
                        path: 'stock',
                        name: 'stock',
                        isHidden: false,
                        component: () => import('@/views/index/stock.vue'),
                        meta: {title:'资产清单',icon:'el-icon-remove-outline'}
                      }
                    ]
                },
               
                // 头部
                {
                    path: 'change',
                    name: 'change',
                    isHidden: true,
                    component: () => import('@/views/index/change.vue'),
                    meta: {title:'修改密码'}
                },
                
            ]
        }
        
    ]
})