const { Operator } = require("../../../models/operator");
const { responseCodes, types } = require("../../../resources");
const { Response } = require("express");

const { createOperatorRequestType } = types;

async function createOperator(req: typeof createOperatorRequestType, res: typeof Response) {
	try {
		const { data } = req.body;

		const newUser = { operatorType: data.operatorType }

		const createdUser = newUser; // enquanto o bd não está funcionando usar essa linha
		// const createdUser = await Operator.createOperator(newUser);

		res.status(201).send({
			code: responseCodes.created,
			result: createdUser,
		});

	} catch (error: unknown) {
		res.status(500).send({
			code: responseCodes.unknownInternalError,
			error: error,
		});
	}
}

export {
	createOperator,
}