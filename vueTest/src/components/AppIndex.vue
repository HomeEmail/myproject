<template>
<div>

<!-- 中间内容 -->
<div class="contentWrapper">
	<!-- <keep-alive><router-view class="" name="indexMovies"></router-view></keep-alive>
	<keep-alive><router-view class="" name="indexMusic"></router-view></keep-alive>
	<keep-alive><router-view class="" name="indexBooks"></router-view></keep-alive>
	<keep-alive><router-view class="" name="indexPictures"></router-view></keep-alive> -->
	<keep-alive><router-view class=""></router-view></keep-alive>
</div>

<div class="topBarWrapper">
	<mu-appbar title="Title">
		<!-- <mu-icon-button icon="menu" @click="leftMenuToggle()" slot="left"/> -->
		<mu-icon-button @click="leftMenuToggle()" slot="left">
			<i class="iconfont icon-list"></i><!-- 使用自定义图标库图标 -->
		</mu-icon-button>
		<!-- <mu-icon-button icon="account_circle" slot="right"/> -->
		<mu-icon-button icon="account_circle" slot="right">
			<i class="iconfont icon-home"></i><!-- 使用自定义图标库图标 -->
		</mu-icon-button>
	</mu-appbar>
</div>

<div class="bottomMenuWrapper">
	<mu-bottom-nav :value="bottomNav" shift @change="handleChange">
	    <mu-bottom-nav-item value="movies" to="/indexMovies" replace title="视频">
			<i class="mu-bottom-item-icon iconfont icon-home" style=""></i><!-- 使用自定义图标库图标 -->
	    </mu-bottom-nav-item>
	    <!-- <mu-bottom-nav-item value="music" title="音乐" icon="music_note"/> -->
	    <mu-bottom-nav-item value="music" to="/indexMusic" replace title="音乐">
	    	<i class="mu-bottom-item-icon iconfont icon-home" style=""></i><!-- 使用自定义图标库图标 -->
	    </mu-bottom-nav-item>
	    <mu-bottom-nav-item value="books" to="/indexBooks" replace title="图书">
			<i class="mu-bottom-item-icon iconfont icon-home" style=""></i><!-- 使用自定义图标库图标 -->
	    </mu-bottom-nav-item>
	    <mu-bottom-nav-item value="pictures" to="/indexPictures" replace title="相册">
			<i class="mu-bottom-item-icon iconfont icon-home" style=""></i><!-- 使用自定义图标库图标 -->
	    </mu-bottom-nav-item>
	</mu-bottom-nav>
</div>

<!-- 左侧边栏菜单 -->
<mu-drawer :open="leftMenuOpen" :docked="false" @close="leftMenuToggle()">
	<mu-appbar title="菜单">
		<mu-flat-button label="关闭" @click="leftMenuToggle()" slot="right" />
		<!-- <mu-icon-button icon="close" @click="leftMenuToggle()" slot="right" /> -->
	</mu-appbar>

	<mu-list @itemClick="leftMenuToggle()">
		<mu-list-item title="菜单1">
			<!-- <mu-icon slot="left" value="inbox"></mu-icon> -->
			<i slot="left" class="iconfont icon-home"></i><!-- 使用自定义图标库图标 -->
		</mu-list-item>
		<mu-list-item title="菜单2">
			<!-- <mu-icon slot="left" value="grade"></mu-icon> -->
			<i slot="left" class="iconfont icon-home"></i><!-- 使用自定义图标库图标 -->
		</mu-list-item>
		<mu-list-item title="菜单3菜单3菜单3菜单3菜单3">
			<!-- <mu-icon slot="left" value="send" color="red"></mu-icon> -->
			<i slot="left" class="iconfont icon-home" style="color:red;"></i><!-- 使用自定义图标库图标 -->
		</mu-list-item>
		<mu-divider />
		<mu-list-item title="菜单4">
			<!-- <mu-icon slot="left" value="drafts"></mu-icon> -->
			<i slot="left" class="iconfont icon-home"></i><!-- 使用自定义图标库图标 -->
		</mu-list-item>
	</mu-list>
</mu-drawer>

<div>
</template>

<script type="es6">

export default {
	name: 'AppIndex',
	data () {
		return {
			bottomNav: 'movies',
			leftMenuOpen:false,
			transitionName:'fade',
			scrollY1:0,
			scrollY2:0,
			scrollY3:0,
			scrollY4:0
		}
	},
	methods: {
		handleChange(val) {
			this.bottomNav = val
			//console.log(this.$route.path);
		},
		leftMenuToggle(){
			this.leftMenuOpen=!this.leftMenuOpen;

		}
	},
	watch:{
		'$route'(to,from){
			console.log('watch $route');
			console.log(to);
		}
	},
	beforeCreate(){
		console.log('beforeCreate');
	},
	created(){
		console.log('created');
	},
	beforeMount(){
		console.log('beforeMount');
		console.log('beforeMount-'+this.$route.path);
		if(this.$route.path.indexOf('indexMovies')>-1){
			this.bottomNav='movies';
		}
		if(this.$route.path.indexOf('indexMusic')>-1){
			this.bottomNav='music';
		}
		if(this.$route.path.indexOf('indexBooks')>-1){
			this.bottomNav='books';
		}
		if(this.$route.path.indexOf('indexPictures')>-1){
			this.bottomNav='pictures';
		}

	},
	mounted(){
		console.log('mounted');
	},
	beforeUpdate(){
		console.log('beforeUpdate');
	},
	updated(){
		console.log('updated');
		var scrollY=0;
		if(this.$route.path.indexOf('indexMovies')>-1){
			scrollY=this.scrollY1;
		}
		if(this.$route.path.indexOf('indexMusic')>-1){
			scrollY=this.scrollY2;
		}
		if(this.$route.path.indexOf('indexBooks')>-1){
			scrollY=this.scrollY3;
		}
		if(this.$route.path.indexOf('indexPictures')>-1){
			scrollY=this.scrollY4;
		}
		console.log('scrollY:'+scrollY);
		window.scrollTo(0,scrollY);
	},
	activated(){
		console.log('activated');

	},
	deactivated(){
		console.log('deactivated');
	},
	beforeDestroy(){
		console.log('beforeDestroy');
	},
	destroyed(){
		console.log('destroyed');
	},
	beforeRouteEnter (to, from, next) {
		// 在渲染该组件的对应路由被 confirm 前调用
		// 不！能！获取组件实例 `this`
		// 因为当钩子执行前，组件实例还没被创建
		console.log('appindex-beforeRouteEnter');
		console.log(to);
		console.log(from);
		next();
	},
	beforeRouteUpdate (to, from, next) {
		// 在当前路由改变，但是该组件被复用时调用
		// 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
		// 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
		// 可以访问组件实例 `this`
		if(this.$route.path.indexOf('indexMovies')>-1){
			this.scrollY1=window.scrollY;
		}
		if(this.$route.path.indexOf('indexMusic')>-1){
			this.scrollY2=window.scrollY;
		}
		if(this.$route.path.indexOf('indexBooks')>-1){
			this.scrollY3=window.scrollY;
		}
		if(this.$route.path.indexOf('indexPictures')>-1){
			this.scrollY4=window.scrollY;
		}
		console.log('appindex-beforeRouteUpdate');
		console.log(to);
		console.log(from);
		next();
	},
	beforeRouteLeave (to, from, next) {
		// 导航离开该组件的对应路由时调用
		// 可以访问组件实例 `this`
		console.log('appindex-beforeRouteLeave');
		console.log(to);
		console.log(from);
		next();
	}
}
</script>

<style scoped lang="less">
.bottomMenuWrapper{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
}
.topBarWrapper{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
}
.contentWrapper{
	padding: 56px 0px;
}
.icon-list{
	font-size: 26px;
}
.icon-home{
	font-size: 22px;
}
.bottomMenuWrapper .icon-home{
	font-size: 16px;
}
@h1c:red;
h1{
	color: @h1c;
}
</style>
