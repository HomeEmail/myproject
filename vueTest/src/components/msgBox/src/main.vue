<template>
<div>
 
<mu-toast v-if="visible" :message="msg" @close="hide"/>

</div>
</template>

<script>

export default {
    name: 'msgBox',
    data () {
        return {
            visible: false,
            msg:'提示语',
            duration:3000,
            closed:false,
            onClose:null,
            timer:null
        }
    },
    watch:{
        closed(newVal,oldVal){
            if(newVal){
                this.visible = false;
                this.destroyElement();
            }
        }
    },
    methods:{
        destroyElement(){
            this.$destroy(true);
            this.$el.parentNode.removeChild(this.$el);
        },
        show(msg){
            this.visible = true;
            this.closed=false;
            this.msg=msg||this.msg;
            if (this.timer){
                clearTimeout(this.timer);
                this.timer=null;
            }
            this.timer = setTimeout(() => { this.hide(); }, this.duration);
        },
        hide(){
            this.visible=false;
            this.closed=true;
            if(typeof this.onClose === 'function'){
                this.onClose(this);
            }
            
            if(this.timer){
                clearTimeout(this.timer);
                this.timer=null;
            }
        }
    },
    mounted(){
        this.show();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
</style>
