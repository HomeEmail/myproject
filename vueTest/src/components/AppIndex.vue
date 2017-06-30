<template>
<div>

<!-- 中间内容 -->
<div class="contentWrapper">
	<router-view class="" name="indexMovies"></router-view>
	<router-view class="" name="indexMusic"></router-view>
	<router-view class="" name="indexBooks"></router-view>
	<router-view class="" name="indexPictures"></router-view>
	<router-view class=""></router-view>
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
	    <mu-bottom-nav-item value="movies" to="indexMovies" replace title="视频" icon="ondemand_video"/>
	    <!-- <mu-bottom-nav-item value="music" title="音乐" icon="music_note"/> -->
	    <mu-bottom-nav-item value="music" to="indexMusic" replace title="音乐">
	    	<i class="mu-bottom-item-icon iconfont icon-home" style=""></i><!-- 使用自定义图标库图标 -->
	    </mu-bottom-nav-item>
	    <mu-bottom-nav-item value="books" to="indexBooks" replace title="图书" icon="books"/>
	    <mu-bottom-nav-item value="pictures" to="indexPictures" replace title="相册" icon="photo"/>
	</mu-bottom-nav>
</div>

<!-- 左侧边栏菜单 -->
<mu-drawer :open="leftMenuOpen" :docked="false" @close="leftMenuToggle()">
	<mu-appbar title="菜单">
		<mu-icon-button icon="close" @click="leftMenuToggle()" slot="right" />
	</mu-appbar>

	<mu-list @itemClick="leftMenuToggle()">
		<mu-list-item title="菜单1">
			<!-- <mu-icon slot="left" value="inbox"></mu-icon> -->
			<i slot="left" class="iconfont icon-home"></i>
		</mu-list-item>
		<mu-list-item title="菜单2">
			<mu-icon slot="left" value="grade"></mu-icon>
			<!-- <i slot="left" class="iconfont icon-home"></i> -->
		</mu-list-item>
		<mu-list-item title="菜单3菜单3菜单3菜单3菜单3">
			<!-- <mu-icon slot="left" value="send" color="red"></mu-icon> -->
			<i slot="left" class="iconfont icon-home" style="color:red;"></i><!-- 使用自定义图标库图标 -->
		</mu-list-item>
		<mu-divider />
		<mu-list-item title="菜单4">
			<!-- <mu-icon slot="left" value="drafts"></mu-icon> -->
			<i slot="left" class="iconfont icon-home"></i>
		</mu-list-item>
	</mu-list>
</mu-drawer>

<div>
</template>

<script>
export default {
	name: 'AppIndex',
	data () {
		return {
			bottomNav: 'movies',
			leftMenuOpen:false
		}
	},
	methods: {
		handleChange(val) {
			this.bottomNav = val
			console.log(this.$route.path);
		},
		leftMenuToggle(){
			this.leftMenuOpen=!this.leftMenuOpen;
			
		}
	},
	beforeMount(){
		console.log(this.$route.path);
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
			this.bottomNav='books';
		}

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