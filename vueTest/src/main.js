// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from './App'
import router from './router'
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
	console.log('全局路由钩子 beforeEach');
	console.log(to);
	console.log(from);
	if(to.matched.some(record => record.meta.requiresAuth)){
		console.log(to.fullPath+' -> requiresAuth');
		//这个路由需要鉴权，检查是否已经登录，如果没登录重定向到登录页面
		// if(!auth.loggedIn()){
		// 	next({
		// 		path:'/login',
		// 		query:{redirect:to.fullPath}
		// 	})
		// }
	}
	next();
});

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
