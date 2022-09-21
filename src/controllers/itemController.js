import { responseCodes, validations } from "../resources/index.js";

async function createItem(req, res) {
	try {
		const {
			name,
			description,
		} = req.body;

		console.log(`[createItem] name = ${name}`);
		console.log(`[createItem] description = ${description}`);

		description.trim();

		if (!validations.nameValidation(name) || description === "" || description === null) {
			res.status(400).send({
				code: responseCodes.invalidData,
			});
			return;
		}

		const newItem = {
			name,
			description,
			enabled: true,
		};

		const createdItem = newItem; // enquanto o bd não está funcionando usar essa linha
		// const createdItem == await Item.createItem(newItem);

		res.status(201).send({
			code: responseCodes.created,
			result: createdItem,
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
	createItem,
};
