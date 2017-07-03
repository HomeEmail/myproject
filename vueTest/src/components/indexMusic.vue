<template>
<mu-content-block>
    <h1>音乐</h1>
    <div style="text-align:center;"><img src="../assets/logo.png"/></div>
    <p>散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！</p>
    
    <div style="text-align:center;"><img src="../assets/logo.png"/></div>
    <p>散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！</p>
    <div style="text-align:center;"><img src="../assets/logo.png"/></div>
    <p>散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！</p>
</mu-content-block>
</template>

<script>
export default {
	name: 'indexMusic',
	data () {
		return {
		  msg: ''
		}
	},
	beforeRouteEnter (to, from, next) {
		// 在渲染该组件的对应路由被 confirm 前调用
		// 不！能！获取组件实例 `this`
		// 因为当钩子执行前，组件实例还没被创建
		console.log('indexMusic-beforeRouteEnter');
		console.log(to);
		console.log(from);
		next();
	},
	beforeRouteUpdate (to, from, next) {
		// 在当前路由改变，但是该组件被复用时调用
		// 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
		// 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
		// 可以访问组件实例 `this`
		console.log('indexMusic-beforeRouteUpdate');
		console.log(to);
		console.log(from);
		next();
	},
	beforeRouteLeave (to, from, next) {
		// 导航离开该组件的对应路由时调用
		// 可以访问组件实例 `this`
		console.log('indexMusic-beforeRouteLeave');
		console.log(to);
		console.log(from);
		next();
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
