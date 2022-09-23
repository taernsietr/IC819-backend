import { Item } from "../../models/item.js";
import responseCodes from "../responseCodes/responseCodes.js";

// validar o array de items
export default function itemsArrayValidation(itemsArray) {
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

		const bdItem = Item.getById(i.item.id); // MOCK POR ENQUANTO

		// verificar se há a quantidade em estoque
		if (i.quantity > bdItem.availableInStock) {
			return {
				result: false,
				code: responseCodes.unavailableStock,
			};
		}

		// se tudo certo, adiciona o preço no total price
		totalPrice += i.quantity * i.item.value;

		return null;
	});

	return {
		result: true,
		totalPrice,
	};
}
