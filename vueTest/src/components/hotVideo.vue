<template>
<div>

    <mu-appbar :title="pageTitle">
        <!-- <mu-icon-button icon="menu" @click="leftMenuToggle()" slot="left"/> -->
        <!-- 返回 -->
        <mu-icon-button @click="goBack()" slot="left">
            <i class="iconfont icon-xiangzuo"></i><!-- 使用自定义图标库图标 -->
        </mu-icon-button>
    </mu-appbar>
    <mu-content-block>
        <h1>流行视频</h1>
        <p>散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！</p>
        <mu-toast message="一段简单的文本" />
    </mu-content-block>

</div>
</template>

<script type="es6">
export default {
    name: 'hotVideo',
    data () {
        return {
            msg: '',
            pageTitle:'热门视频'
        }
    },
    methods:{
        goBack(){
            this.$router.back();
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.icon-xiangzuo{
    font-size: 24px;
}
</style>
