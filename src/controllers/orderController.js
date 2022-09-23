import { responseCodes, validations } from "../resources/index.js";
import { Order, OrderItemMethods } from "../models/order.js";
import { orderStatus } from "../models/dataEnums.js";

// criar cada OrderItem referente a um item do carrinho
async function createOrderItems(itemsArray, orderID) {
	// pra cada item, criar no bd
	itemsArray.forEach(async (i) => {
		await OrderItemMethods.createOrderItem({
			itemID: i.item.id,
			orderID,
			quantity: i.quantity,
		});
	});
}

// criar pedido: cria pedido e cada instância de orderItem do carrinho
async function createOrder(req, res) {
	try {
		const {
			address,
			deliveryID,
			itemsPrice,
			fee,
			items, // verificar qual vai ser o nome do atributo
		} = req.body;

		// verificar se o items é valido
		const isItemsValid = validations.itemsArrayValidation(items);
		if (isItemsValid.result === false) {
			res.status(400).send({
				code: isItemsValid.code,
			});
			return;
		}

		// verificar se o preço total é válido
		if (!itemsPrice === isItemsValid.itemsPrice) { // Ajeitar nome
			res.status(500).send({
				code: responseCodes.unknownInternalError,
			});
		}

		const newOrder = {
			deliveryID,
			status: orderStatus[1], // confirmado
			totalPrice: itemsPrice + fee,
		};

		const createdOrder = await Order.createOrder(newOrder);

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
