<template>
<div>
 
<mu-toast v-if="toast" :message="msg" @close="hideToast"/>

</div>
</template>

<script>
export default {
    name: 'msgBox',
    data () {
        return {
            toast: false,
            msg:'提示用语'
        }
    },
    methods:{
        showToast(msg){
            this.toast = true;
            this.msg=msg||this.msg;
            if (this.toastTimer){
                clearTimeout(this.toastTimer);
                this.toastTimer=null;
            }
            this.toastTimer = setTimeout(() => { this.toast = false }, 2000);
        },
        hideToast(){
            this.toast=false;
            if(this.toastTimer){
                clearTimeout(this.toastTimer);
                this.toastTimer=null;
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
</style>
