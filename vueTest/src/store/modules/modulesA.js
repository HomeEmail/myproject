
import * as types from '../mutation-types'
import {ajaxUrlDemo1} from '../../apiUrl'

// initial state
// shape: [{ id, quantity }]
const state = {
	id: '',
	name: '',
	pm:[
		//{id:'',contentName:'',status:0}
	]
}

// getters
const getters = {
	pmDisabled(state, getters, rootState, rootGetters) {
		//...
		return state.pm.filter(item => !item.status);
	}
}

// actions
const actions = {
	[types.set_programDetail_data] ({ commit, state }, payload) {//约定payload 里都包含当前组件实例vm

		return new Promise((resolve, reject) => {

			let url=ajaxUrlDemo1;//
            payload.vm.$ajax({
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
                console.log(response);
                if(response.status==200){//请求成功
                    console.log(response.data);
                    //JSON.stringify(response.data);
                    let data={
                    	id:response.data.snet_ContentBox.id,
                    	name:response.data.snet_ContentBox.contentName,
                    	pm:response.data.pm.records
                    };
                    commit(types.set_programDetail_data,data);
	       			resolve();
	       			return 0;
                }
                reject();
            })
            .catch((error) => {
                //payload.vm.$msgBox('网络错误');
                reject();
            });
			//ajax成功后
	        // commit(types.set_programDetail_data,{});
	        // resolve();
	        //ajax 失败后
	        //reject();
	    });

	    //使用promise后，你可以如下这样使用
	    /*store.dispatch('actionA',{}).then(() => {
		  // ...
		});*/
	}
}

// mutations
const mutations = {
	/*[types.ADD_TO_CART] (state, { id }) {
		state.lastCheckout = null
		const record = state.added.find(p => p.id === id)
		if (!record) {
			state.added.push({
				id,
				quantity: 1
			})
		} else {
			record.quantity++
		}
	},*/
	[types.set_programDetail_data] (state,payload){
		//state=payload;
		Object.assign(state, payload);
    	localStorage.setItem(types.set_programDetail_data, JSON.stringify(payload));
	},
	[types.set_program_pm_data] (state,payload){
		state.pm=payload||[];
    	localStorage.setItem(types.set_program_pm_data, JSON.stringify(payload));
	},
	[types.clear_pm_data] (state) {
		// clear cart
		state.pm = []
	},

}

export default {
	state,
	getters,
	actions,
	mutations
}