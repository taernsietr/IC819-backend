import { responseCodes, validations } from "../resources/index.js";
import { Item } from "../models/item.js";
import { OrderItem } from "../models/orderItem.js";
import { Client } from "../models/client.js";

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

// criar cada OrderItem referente a um item do carrinho
async function createOrderItems(itemsArray, orderID) {
	// pra cada item, criar no bd
	itemsArray.forEach(async (i) => {
		await OrderItem.createOrderItem({ // MOCK!!
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
			fee,
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
		const isItemsValid = await validations.itemsArrayValidation(items);
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
