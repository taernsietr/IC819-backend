import { responseCodes, validations } from "../resources/index.js";

// AUXILIARES! só pra não dar erro por enquanto
// TODO: fazer no bd
const Item = {
	getById: async (id) => {
		console.log(`find item by id ${id}`);
	},
};
// TODO: fazer no bd
const OrderItem = {
	createOrderItem: async (orderItem) => {
		console.log(`create order item ${orderItem}`);
	},
};
// TODO: fazer no bd APENAS SE DER TEMPO! como ainda estamos trabalhanso só com cliente n logado n é prioridade
const Client = {
	getByToken: async (token) => {
		console.log(`find client by token ${token}`);
	},
};

// const CartItem =	{
// 	item: {
// 		id: string,
// 		name: string,
// 		imageName: string,
// 		description: string,
// 		enable: boolean,
// 		availableInStock: number,
// 		value: number,
// 		weight: number,
// 	},
// 	quantity: number,
// };

// validar o array de items do carrinho
async function itemsArrayValidation(itemsArray) {
	let totalPrice = 0;

	// verificar se o array não está vazio
	if (!itemsArray || itemsArray === []) {
		return {
			result: false,
			code: responseCodes.emptyData,
		};
	}

	// para cada item
	itemsArray.forEach((i) => {
		// verificar se a id existe, se a quantidade é um número e se o valor é um número
		if (
			!i.item.id
			|| !(i.quantity instanceof Number)
			|| !(i.item.value instanceof Number)
		) {
			return {
				result: false,
				code: responseCodes.invalidData,
			};
		}

		const bdItem = Item.getById(i.item.id);

		// verificar se há a quantidade em estoque
		if (i.quantity > bdItem.availableInStock) {
			return {
				result: false,
				code: responseCodes.unavailableStock,
			};
		}

		// se tudo certo, adiciona o preço no total price
		totalPrice += i.quantity * i.item.value;

		console.log(`preço do item = ${i.quantity * i.item.value}`);
		console.log(`totalPrice = ${totalPrice}`);

		return null;
	});

	return {
		result: true,
		totalPrice,
	};
}

// criar cada OrderItem referente a um item do carrinho
async function createOrderItems(itemsArray, orderID) {
	// pra cada item, criar no bd
	itemsArray.forEach(async (i) => {
		await OrderItem.createOrderItem({
			itemID: i.item.id,
			orderID,
			quantity:
			i.quantity,
		});
	});
}

// criar pedido: cria pedido e cada instância de orderItem do carrinho
async function createOrder(req, res) {
	try {
		const {
			clientToken,
			deliveryID,
			address, // {objeto endereço}
			status, // botar só na criação (tirar esperando pagamento)
			itemsPrice,
			feePrice,
			items, // verificar qual vai ser o nome do atributo
		} = req.body;

		// verificar se o token existe. se existir, procurar no BD
		const clientID = clientToken ? await Client.getByToken(clientToken) : null;

		// validar o status do pedido
		if (!validations.orderStatusValidation(status)) {
			res.status(400).send({
				code: responseCodes.invalidData,
			});
			return;
		}

		// verificar se o items é valido
		const isItemsValid = await itemsArrayValidation(items);
		if (isItemsValid.result === false) {
			res.status(400).send({
				code: isItemsValid.code,
			});
			return;
		}

		// verificar se o preço total é válido
		if (!itemsPrice === isItemsValid.totalPrice) { // Ajeitar nome
			res.status(500).send({
				code: responseCodes.unknownInternalError,
			});
		}

		const newOrder = {
			clientID,
			deliveryID,
			status,
			// Passar os preços
		};

		const createdOrder = { id: "adhiudhai", ...newOrder }; // enquanto o bd não está funcionando usar essa linha
		// const createdOrder = await Operator.createOperator(newOrder);

		// com o pedido criado, temos que criar as instâncias de orderItem
		const createdOrdemItems = await createOrderItems(items, createOrder.id);

		res.status(201).send({
			code: responseCodes.created,
			result: { createdOrder, createdOrdemItems },
		});
		return;
	} catch (error) {
		console.log(`ERROR: ${error}`);
		res.status(500).send({
			code: responseCodes.unknownInternalError,
			error,
		});
	}
}

export {
	createOrder,
};
