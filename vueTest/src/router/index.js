import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// import Hello from 'components/Hello'

import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-teal.css' // 使用 teal 主题
Vue.use(MuseUI)

// import msgBox from 'components/msgBox' //如何作为全局来做呢？
// Vue.prototype.$msgBox=msgBox

//import '../assets/material/font.css'
//import '../assets/material/icon.css'

import '../assets/iconfont/iconfont.css' //导入自定义字体图标样式

import AppIndex from 'components/AppIndex'
import indexMovies from 'components/indexMovies'
import indexMusic from 'components/indexMusic'
import indexBooks from 'components/indexBooks'
import indexPictures from 'components/indexPictures'

import hotVideo from 'components/hotVideo'

import NotFoundPage from 'components/NotFoundPage';

export default new Router({
	mode: 'history',//hash
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
					component:indexMovies
					//components:{indexMovies:indexMovies}
				},
				{
					path:'indexMusic',
					name:'indexMusic',
					component:indexMusic
					//components:{indexMusic:indexMusic}
				},
				{
					path:'indexBooks',
					name:'indexBooks',
					component:indexBooks
					//components:{indexBooks:indexBooks}
				},
				{
					path:'indexPictures',
					name:'indexPictures',
					component:indexPictures,
					//components:{indexPictures:indexPictures},
					meta: { requiresAuth: true } // a meta field $route.matched 来检查路由记录中的 meta 
				}
			]
		},
		{
			path:'/hotVideo',
			name:'hotVideo',
			component:hotVideo
		},
		{
			path:'*',
			name:'NotFoundPage',
			component:NotFoundPage
		}
	],
  	scrollBehavior (to, from, savedPosition) {//通过浏览器的前进后退按钮才有效 路由有transition时不生效，需要独自手动处理

		if (savedPosition) {
			// setTimeout(() => {
	  //           window.scrollTo(savedPosition.x, savedPosition.y)
	  //       }, 200);
			return savedPosition;
		} else {
			return { x: 0, y: 0 };
		}

	}
})
