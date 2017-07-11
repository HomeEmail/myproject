<template>
<mu-content-block>
    <h1>图书</h1>
    <p>散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！</p>
    <h2>下面的内容是ajax过来的</h2>
    <div style="text-align:center"></div>
    <mu-circular-progress v-show="isLoading" :size="40"></mu-circular-progress>

    <h3>{{programName}}</h3>
    <div>视频列表</div>
    <ul>
        <li v-for="item in pm">
            {{ item.contentName }}
        </li>
    </ul>

</mu-content-block>
</template>

<script type="es6">
import {openAlert} from '../common'
import * as types from '../store/mutation-types'

export default {
    name: 'indexBooks',
    data () {
        return {
            isLoading:true
        }
    },
    computed:{
        programName(){
            return this.$store.state.modulesA.name ;
        },
        pm(){
            return this.$store.state.modulesA.pm;
        }
    },
    created() {
        //this.getData();
    },
    updated(){
        console.log('------------books updated-------');

    },
    activated(){
        console.log('------------books activated-------');
        this.getData();//拿最新的数据
        //this.$loading().show();
    },
    deactivated(){
        console.log('------------books deactivated-------');
    },
    methods:{
        getData(){
            //this.$msgBox({msg:'正在加载内容',duration:2000});
           
            let loading=this.$loading();
            loading.show();
            this.$store.dispatch(types.set_programDetail_data,{vm:this}).then(()=>{
                loading.hide();
                console.log(this.$store.state);
            }).catch(()=>{
                this.$msgBox('网络错误');
            });
            //this.$msgBox('网络错误');
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
