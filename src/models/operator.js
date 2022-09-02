import Sequelize from "sequelize";
import db from "../db";
import { validations } from "../resources";

// TODO: sequelize
export const OperatorModel = {};

export const Operator = {
	crateOperator: async (operatorData) => {
		const createdUser = await OperatorModel.create({
			operatorType: operatorData.operatorType,
		});

		return createdUser;
	},

	isOperatorTypeValid: (operatorType) => {
		// TODO: padronizar os valores dos tipos de operador
		if (operatorType === "adm" || operatorType === "kitchen") {
			return true;
		}

		return false;
	},
};
