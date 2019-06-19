import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import router from './router'
import store from './store/index'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
//路由
router.beforeEach((to,from,next)=>{
next()
})
new Vue({
  store,
  router,
  render: h => h(App),
  created(){

  }
}).$mount('#app')
