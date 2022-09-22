export default function Cart(cart) {
	// cart: { itemsArray: [{item, quantidade}], itemsPrice}

	// if (cart.hasOwnProperty("itemsArray")) {
	// 	this.itemsArray = cart.itemsArray;
	// 	this.itemsPrice = cart.itemsPrice; 
	// } else {
	// 	this.itemsArray = [];
	// 	this.itemsPrice = 0;
	// }

	
	this.itemsArray = cart.itemsArray || [];
	this.itemsPrice = cart.itemsPrice || 0;

	this.add = (cartItem) => {
		// Verificar se o cartItem nao é vazio
		// verificar se a quantidade é um numero
		// verificar se value do item é um numero
		// Verificar se tem a quqntidade em estoque
		// Verificar se já existe esse item no carrinho
		const { itemsArray } = this;
		let { itemsPrice } = this;
		if (itemsArray !== []) {
			const itemAlreadyExists = [];
			itemsArray.forEach((element, index) => {
				console.log("Entrando no for each");
				if (element.item.id === cartItem.item.id) {
					itemAlreadyExists.push(index);
				}
			});

			const itemIndex = (itemAlreadyExists === [] ? false : itemAlreadyExists[0]);
			// se sim, atualiza a quantidade
			// se não, adiciona o item no array
			if (!itemIndex) {
				itemsArray.push(cartItem);
			} else {
				console.log(itemsArray[itemIndex].quantity);
				itemsArray[itemIndex].quantity += cartItem.quantity;
				console.log(itemsArray[itemIndex].quantity);
			}
		} else {
			itemsArray.push(cartItem);
		}

		itemsPrice += cartItem.quantity * cartItem.item.value;

		// Atualiza o itens price
		// Retorna o novo objeto de carrinho
		// const newCart = { itemsArray: this.itemsArray, itemsPrice: this.itemsPrice };
		// return newCart;
	};
}