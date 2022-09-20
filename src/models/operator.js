import { Model, DataTypes } from "sequelize";
import sequelize from "../db.js";
import { validations } from "../resources/index.js";

export const OperatorModel = sequelize.define("Operator",
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		operatorType: {
			type: DataTypes.ENUM,
			values: ["admin", "operator"],
			allowNull: false,
		},
		createdAt: DataTypes.DATE,
		updatedAt: DataTypes.DATE,
	}
);

// TODO: relação
// Operator.hasMany(Order);

export const Operator = {
	crateOperator: async (operatorData) => {
		const createdUser = await OperatorModel.create({
			operatorType: operatorData.operatorType,
		});

		return createdUser;
	},

	isOperatorTypeValid: (operatorType) => {
		// TODO: padronizar os valores dos tipos de operador
		if (operatorType === "ADM'" || operatorType === "KITCHEN") {
			return true;
		}

		return false;
	},
};
