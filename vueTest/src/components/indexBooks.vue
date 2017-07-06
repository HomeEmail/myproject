<template>
<mu-content-block>
    <h1>图书</h1>
    <p>散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！</p>
    <h2>下面的内容是ajax过来的</h2>
    <div style="text-align:center">
    	<mu-circular-progress v-show="isLoading" :size="40"/>
	</mu-circular-progress>

    <p>{{contentText}}</p>
</mu-content-block>
</template>

<script>
import {openAlert} from '../common'
import {ajaxUrlDemo1} from '../apiUrl'

export default {
	name: 'indexBooks',
	data () {
		return {
			msg: '',
            isLoading:true,
            contentText:''
		}
	},
    created() {
        console.log('url:'+ajaxUrlDemo1);
        this.getData();
    },
	methods:{
		getData(){
            

			let url=ajaxUrlDemo1;//'http://fshk.96956.com.cn/utvgoClient/tvutvgo/channel/ajaxDetail.action?channelId=10086&boxId=9311&zoneId=17&pagesize=1000';
            this.isLoading=true;
            this.$ajax({
                method:'get',
                url:url,
                // params: {
                //     ID: 12345
                // },
                // data: {//for post put patch
                //     firstName: 'Fred'
                // },
                //headers: {'X-Custom-Header': 'foobar'}
                responseType:'json' //'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
            })
            .then((response) => {
                this.isLoading=false;
                console.log(response);
                if(response.status==200){//请求成功
                    console.log(response.data);
                    this.contentText=JSON.stringify(response.data);
                }
            })
            .catch((error) => {
                //this.isLoading=false;
                console.log(error);
            });
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
