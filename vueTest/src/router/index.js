import Vue from 'vue'
import Router from 'vue-router'
// import Hello from 'components/Hello'
// import Vue from 'vue'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import AppIndex from 'components/AppIndex'
import 'muse-ui/dist/theme-teal.css' // 使用 teal 主题
Vue.use(MuseUI)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AppIndex',
      component: AppIndex
    }
  ]
})
