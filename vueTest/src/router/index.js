import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// import Hello from 'components/Hello'



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
