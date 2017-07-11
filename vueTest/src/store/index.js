import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import modulesA from './modules/modulesA'

Vue.use(Vuex)
console.log('process.env.NODE_ENV:'+process.env.NODE_ENV);
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	actions,
	getters,
	modules: {
	   modulesA
	}
	//strict: debug,
	//plugins: []
});