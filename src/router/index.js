import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/components/login.vue'
// import index from  '@/components/login.vue'
//路由数据

Vue.use(VueRouter)
export default new VueRouter({
    mode:'history',
    routes:[
        {
            path:'/',
            name:'index',
            component:()=> import('@/components/index.vue'),
            meta: {
                title: '客服首页',
                tabbar: true
            }
        },
        {
            path:'/login',
            name:'login',
            component: login,
            meta: {
                title: '登陆',
                tabbar: true
            }
        }
    ]
})

