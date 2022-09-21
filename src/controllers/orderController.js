import { responseCodes, validations } from "../resources/index.js";

async function createOrder(req, res) {
	try {
		const {
			clientID, // ver se vai chegar ou se vamos ter que pegar no bd
			deliveryID,
			status,
			itemsArray, // verificar qual vai ser o nome do atributo
		} = req.body;

		if (!validations.orderStatusValidation(status)) {
			res.status(400).send({
				code: responseCodes.invalidData,
			});
			return;
		}

		const newOrder = {
			clientID,
			deliveryID,
			status,
		};

		const createdOrder = newOrder; // enquanto o bd não está funcionando usar essa linha
		// const createdOrder = await Operator.createOperator(newOrder);

		res.status(201).send({
			code: responseCodes.created,
			result: createdOrder,
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

async function createOrderItem(itemsArray) {

}

/*
export interface ItemsData {
    id: string,
    name: string,
    imageName: string,
    description: string,
    enable?: boolean,
    availableInStock?: number,
    value : number,
    weight: number 
}

export interface CartItem {
    item: ItemsData;
    quantity?: number;
}
*/

export {
	createOrder,
};
