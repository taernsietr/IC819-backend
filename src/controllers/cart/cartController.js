import { responseCodes, validations } from "../../resources/index.js";

const initialCart = { items: [], itemsPrice: 0 };
// Criar carrinho pra todos usuário
// Recebe requisição de adicionar ao carrinho contendo informações do item e quantidade
// Verfica se possui a quantidade desejada
// Caso sim, adicione o pedido ao carrinho associado a sessão do usuário
// Pagina carrinho vai fazer requisição e retornar o objeto da sessao
// Pagina carrinho ser diferente quando está vazia

export function createCart(req, res) {
	const userSession = req.session;
	const cart = initialCart;
	userSession.cart = cart;

	res.status(201).send("ok");
}

export function addCart(req, res) {
	console.log(`[add] começando`);
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

	console.log(`[add] cart = ${JSON.stringify(cart)}`);

	// Se o carrinho é vazio (initialCart), é só add o item
	if (JSON.stringify(cart) === JSON.stringify(initialCart)) {
		console.log("carrinho vazio");
		cart.items.push(newItem);
	} else { // Se o carrinho não é vazio
		// verificar se o item já ta no carrinho
		console.log("carrinho não vazio");

		const itemAlreadyExists = [];
		cart.items.forEach((element, index) => {
			if (element.item.id === newItem.item.id) {
				itemAlreadyExists.push(index);
			}
		});

		console.log(`[add] itemAlreadyExists = ${JSON.stringify(itemAlreadyExists)}`);

		const itemIndex = (itemAlreadyExists === [] ? false : itemAlreadyExists[0]);

		console.log(`[add] itemIndex = ${JSON.stringify(itemIndex)}`);

		// se já existe no carrinho, aumentar a quantidade
		if (itemIndex) {
			cart.items[itemIndex].quantity += newItem.quantity;
			console.log("existe no carrinho");
		} else {
			// se não existe no carrinho, só adicionar
			cart.items.push(newItem);
			console.log("não existe no carrinho");
		}
	}

	// Atualizar itemsPrice
	const addPrice = newItem.item.value * newItem.quantity;
	console.log(`[add] addPrice = ${JSON.stringify(addPrice)}`);

	cart.itemsPrice += addPrice;

	req.session.cart = cart;

	console.log(`carrinho depois: ${JSON.stringify(req.session?.cart)}`);

	res.status(200).send("ok");
}

export function getCart(req, res) {
	const userSession = req.session;
	const cart = req.session.cart ? req.session.cart : initialCart;
	userSession.cart = cart;
	res.status(200).send({ code: responseCodes.success, result: userSession.cart });
}

export function removeCart(req, res) {
	// Receber qual o item que o usuário quer remover, através de post
	// pegar o id do item
	// chegar no array de items qual item possui o mesmo

	const userSession = req.session;
}
// limpar  carrinho
