import { responseCodes, validations } from "../../resources/index.js";

const initialCart = { items: [], itemsPrice: 0 };

// Criar carrinho pra todos usuário
// Recebe requisição de adicionar ao carrinho contendo informações do item e quantidade
// Verfica se possui a quantidade desejada
// Caso sim, adicione o pedido ao carrinho associado a sessão do usuário
// Pagina carrinho vai fazer requisição e retornar o objeto da sessao
// Pagina carrinho ser diferente quando está vazia

export function createCart(req, res) {
	const cart = initialCart;
	req.session.cart = cart;

	res.status(201).send({ code: responseCodes.success });
}

export function getAddCart(req, res) {
	const cart = req.session.cart ? req.session.cart : initialCart;
	req.session.cart = cart;
	const length = req.session.cart.items.length;
	res.send(req.session.cart.items[length]);
}


export function addCart(req, res) {
	try {
	const newItem = req.body;

	console.log(`[add] newItem = ${JSON.stringify(newItem)}`);
	// Validação do item
	const isItemValid = validations.itemsArrayValidation([newItem]);

	console.log(`[add] isItemValid = ${JSON.stringify(isItemValid)}`);

	if (!isItemValid.result) {
		res.status(400).send({
			code: isItemValid.code,
		});
		return;
	}

	console.log(`[add] req.session.cart = ${JSON.stringify(req.session.cart)}`);

	// Verificar se o carrinho da sessão existe. se não existir, ou for [], inicializar atributo
	const cart = (req.session.cart || req.session.cart !== []) ? req.session.cart : initialCart;

	// Se o carrinho é vazio (initialCart), é só add o item
	if (JSON.stringify(cart) === JSON.stringify(initialCart)) {
		console.log("[add] carrinho vazio");
		cart.items.push(newItem);
	} else { // Se o carrinho não é vazio
		// verificar se o item já ta no carrinho
		console.log("[add] carrinho não vazio");

		const itemAlreadyExists = [];
		cart.items.forEach((element, index) => {
			if (element.item.id === newItem.item.id) {
				itemAlreadyExists.push(index);
			}
		});

		console.log(`[add] itemAlreadyExists = ${JSON.stringify(itemAlreadyExists)}`);

		const itemIndex = itemAlreadyExists === [] ? false : itemAlreadyExists[0];

		console.log(`[add] itemIndex = ${JSON.stringify(itemIndex)}`);

		// se já existe no carrinho, aumentar a quantidade
		if (itemIndex !== false && itemIndex !== undefined) {
			cart.items[itemIndex].quantity += newItem.quantity;
			console.log("[add] existe no carrinho");
		} else {
			// se não existe no carrinho, só adicionar
			cart.items.push(newItem);
			console.log("[add] não existe no carrinho");
		}
	}

	// Atualizar itemsPrice
	const addPrice = newItem.item.value * newItem.quantity;
	console.log(`[add] addPrice = ${JSON.stringify(addPrice)}`);

	cart.itemsPrice += addPrice;

	req.session.cart = cart;

	console.log(`[add] carrinho depois: ${JSON.stringify(req.session?.cart)}`);

	res.status(200).send({ code: responseCodes.success });
	return;

	} catch (error) {
		console.log(`ERROR: ${error}`);
		res.status(500).send({
			code: responseCodes.unknownInternalError,
			error,
		});
	}
}

// retornar carrinho
export function getCart(req, res) {
	const cart = req.session.cart ? req.session.cart : initialCart;
	req.session.cart = cart;
	res.status(200).send({ code: responseCodes.success, result: req.session.cart });
}

export function removeItem(req, res) {
	try {
	const itemToBeRemoved = req.body;
	console.log(`[remove] itemToBeRemoved = ${JSON.stringify(itemToBeRemoved)}`);

	const isItemValid = validations.itemsArrayValidation([itemToBeRemoved]);

	if (!isItemValid.result) {
		res.status(400).send({
			code: isItemValid.code,
		});
		return;
	}

	const cart = (req.session.cart || req.session.cart !== []) ? req.session.cart : initialCart;

	if (!(JSON.stringify(cart) === JSON.stringify(initialCart))) {
		const itemAlreadyExists = [];
		cart.items.forEach((element, index) => {
			if (element.item.id === itemToBeRemoved.item.id) {
				itemAlreadyExists.push(index);
			}
		});

		console.log(`[remove] itemAlreadyExists = ${JSON.stringify(itemAlreadyExists)}`);

		const itemIndex = itemAlreadyExists === [] ? false : itemAlreadyExists[0];

		console.log(`[remove] itemIndex = ${JSON.stringify(itemIndex)}`);

		if (itemIndex !== false && itemIndex !== undefined) {
			const updatedCartItems = cart.items.splice(itemIndex, 1);
			console.log(`[remove] updatedCartItems = ${JSON.stringify(updatedCartItems)}`);

			const updatedPrice = cart.itemsPrice - (itemToBeRemoved.item.price * itemToBeRemoved.quantity);

			req.session.cart.items = updatedCartItems;
			req.session.cart.itemsPrice = updatedPrice;
		}

		console.log(`[remove] carrinho atualizado = ${JSON.stringify(req.session.cart)}`);

		res.status(200).send({ code: responseCodes.success });
		return;
	}
		} catch (error) {
		console.log(`ERROR: ${error}`);
		res.status(500).send({
			code: responseCodes.unknownInternalError,
			error,
		});
	}
}

// limpar carrinho
export function clearCart(req, res) {
	req.session.cart = initialCart;

	res.status(200).send({ code: responseCodes.success });
}
