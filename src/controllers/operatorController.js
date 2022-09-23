import { Operator } from "../models/operator.js";
import { responseCodes, validations } from "../resources/index.js";

async function createOperator(req, res) {
	try {
		const { operatorType } = req.body;

		// validar tipo de operador
		if (!validations.operatorTypeValidation(operatorType)) {
			res.status(400).send({
				code: responseCodes.invalidData,
			});
			return;
		}

		const newUser = { operatorType };

		const createdUser = await Operator.createOperator(newUser);

		res.status(201).send({
			code: responseCodes.created,
			result: createdUser,
		});
		return;
	} catch (error) {
		console.log(`Error: ${error}`);

		res.status(500).send({
			code: responseCodes.unknownInternalError,
			error,
		});
	}
}

export {
	createOperator,
};
