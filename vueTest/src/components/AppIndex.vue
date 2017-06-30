<template>
<div>

<!-- 中间内容 -->
<div class="contentWrapper">
	<mu-content-block v-if="bottomNav==='movies'">
		<h1>视频</h1>
	    散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
	</mu-content-block>
	<mu-content-block v-if="bottomNav==='music'">
		<h1>音乐</h1>
		<img src="../assets/logo.png">
	    散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
	</mu-content-block>
	<mu-content-block v-if="bottomNav==='books'">
		<h1>图书</h1>
	    散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
	</mu-content-block>
	<mu-content-block v-if="bottomNav==='pictures'">
		<h1>相册</h1>
	    散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
	</mu-content-block>
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
	    <mu-bottom-nav-item value="movies" title="视频" icon="ondemand_video"/>
	    <!-- <mu-bottom-nav-item value="music" title="音乐" icon="music_note"/> -->
	    <mu-bottom-nav-item value="music" title="音乐">
	    	<i class="mu-bottom-item-icon iconfont icon-home" style=""></i><!-- 使用自定义图标库图标 -->
	    </mu-bottom-nav-item>
	    <mu-bottom-nav-item value="books" title="图书" icon="books"/>
	    <mu-bottom-nav-item value="pictures" title="相册" icon="photo"/>
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
		handleChange (val) {
			this.bottomNav = val
		},
		leftMenuToggle(){
			this.leftMenuOpen=!this.leftMenuOpen;
			
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