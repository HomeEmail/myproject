//全局的getters


export const pmActived = state => {
    return state.modulesA.pm.filter(item => item.status);
}



// export const cartProducts = state => {
// 	return state.cart.added.map(({ id, quantity }) => {
// 		const product = state.products.all.find(p => p.id === id);
// 		return {
// 			title: product.title,
// 			price: product.price,
// 			quantity
// 		};
// 	});
// }