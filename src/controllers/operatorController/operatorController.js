import { Operator, OperatorModel } from "../../models/operator";
import { responseCodes } from "../../resources";

async function createOperator(req, res) {
	try {
		const { data } = req.body;

		// validar tipo de operador
		if (!Operator.isOperatorTypeValid(data.operatorType)) {
			res.status(400).send({
				code: responseCodes.invalidData,
			});
		}

		const newUser = { operatorType: data.operatorType };

		const createdUser = newUser; // enquanto o bd não está funcionando usar essa linha
		// const createdUser = await Operator.createOperator(newUser);

		res.status(201).send({
			code: responseCodes.created,
			result: createdUser,
		});
	} catch (error) {
		res.status(500).send({
			code: responseCodes.unknownInternalError,
			error,
		});
	}
}

export {
	createOperator,
};
