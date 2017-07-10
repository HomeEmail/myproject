<template>
<div :style="stylecss" v-show="visible">

<mu-circular-progress v-show="visible" :size="size" style="top:48%;"></mu-circular-progress>

</div>
</template>

<script>

export default {
    name: 'msgBox',
    data () {
        return {
            visible: false,
            size: 40,
            closed:false,
            onClose:null,
            stylecss:{
                position:'fixed',
                width:'100%',
                height:'100%',
                textAlign:'center',
                left:0,
                top:0,
                zIndex:999999,
                background:'rgba(255,255,255,0.7)'
            }
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
        },
        hide(){
            this.visible=false;
            this.closed=true;
            if(typeof this.onClose === 'function'){
                this.onClose(this);
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
