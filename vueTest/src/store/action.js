//全局的aciton

import * as types from './mutation-types'

export const addToCart = ({ commit }, product) => {
	if (product.inventory > 0) {
		commit(types.save_some_data, {
			id: product.id
		});
	}
}