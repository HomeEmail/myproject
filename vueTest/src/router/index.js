import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// import Hello from 'components/Hello'

import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-teal.css' // 使用 teal 主题
Vue.use(MuseUI)

import '../assets/iconfont/iconfont.css' //导入字体样式

import AppIndex from 'components/AppIndex'
import indexMovies from 'components/indexMovies'
import indexMusic from 'components/indexMusic'
import indexBooks from 'components/indexBooks'
import indexPictures from 'components/indexPictures'

import NotFoundPage from 'components/NotFoundPage';

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AppIndex',
      component: AppIndex,
      children:[
      	{
      		path:'',
      		component:indexMovies
      	},
      	{
      		path:'indexMovies',
      		name:'indexMovies',
      		components:{indexMovies:indexMovies}
      	},
      	{
      		path:'indexMusic',
      		name:'indexMusic',
      		components:{indexMusic:indexMusic}
      	},
      	{
      		path:'indexBooks',
      		name:'indexBooks',
      		components:{indexBooks:indexBooks}
      	},
      	{
      		path:'indexPictures',
      		name:'indexPictures',
      		components:{indexPictures:indexPictures}
      	}
      ]
    },
    {
    	path:'*',
    	name:'NotFoundPage',
    	component:NotFoundPage
    }
  ]
})
