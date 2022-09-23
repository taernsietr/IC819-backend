import { responseCodes, validations } from "../resources/index.js";
import { DeliveryCompany } from "../models/deliveryCompany.js";

async function createDeliveryCompany(req, res) {
	try {
		const { name, fee } = req.body;
		console.log(`[createDeliveryCompany] name = ${name}`);
		console.log(`[createDeliveryCompany] fee = ${fee}`);

		if (
			!validations.nameValidation(name)) {
			console.log(`[createDeliveryC] nameVal =${validations.nameValidation(name)}`);
			res.status(400).send({
				code: responseCodes.invalidData,
			});
			return;
		}

		const newDeliveryCompany = {
			name,
			fee,
		};

		const created = await DeliveryCompany.createDeliveryCompany(newDeliveryCompany);

		res.status(201).send({
			code: responseCodes.created,
			result: created,
		});
	} catch (error) {
		console.log(`ERROR: ${error}`);
		res.status(500).send({
			code: responseCodes.unknownInternalError,
			error,
		});
	}
}

export {
	createDeliveryCompany,
};
