// import Sequelize from "sequelize";
// import db from "../db.js";

// TODO: sequelize
export const OperatorModel = {};

export const Operator = {
	crateOperator: async (operatorData) => {
		const createdUser = await OperatorModel.create({
			operatorType: operatorData.operatorType,
		});

		return createdUser;
	},
};
