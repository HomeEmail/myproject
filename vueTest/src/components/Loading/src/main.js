import Vue from 'vue';

let LoadingConstructor = Vue.extend(require('./main.vue'));

let instance;
let instances = [];
let seed = 1;

var Loading = function(options){
    options = options || {};
    if(typeof options === 'string'){
        options={
            msg : options
        };
    }
    let userOnClose = options.onClose;
    let id = 'Loading_'+ seed++;

    options.onClose = function(){
        Loading.close(id,userOnClose);
    };
    instance = new LoadingConstructor({
        data : options
    });
    instance.id = id;
    instance.vm = instance.$mount();
    document.body.appendChild(instance.vm.$el);
    instance.dom = instance.vm.$el;
    instances.push(instance);

    return instance.vm;
};

Loading.close = function(id, userOnClose) {
    for (let i = 0, len = instances.length; i < len; i++) {
        if (id === instances[i].id) {
            if (typeof userOnClose === 'function') {
                userOnClose(instances[i]);
            }
            instances.splice(i, 1);
            break;
        }
    }
};

export default Loading;
