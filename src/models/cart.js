// Lógica classe

export default function Cart(cart) {
	// cart: { itemsArray: [{item, quantidade}], itemsPrice}

	this.add = (cartItem) => {
		
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