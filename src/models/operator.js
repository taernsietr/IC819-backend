import { Model, DataTypes } from "sequelize";
import sequelize from "../db.js";
import { validations } from "../resources/index.js";

export class OperatorModel extends Model {}

OperatorModel.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		operatorType: {
			type: DataTypes.ENUM,
			values: ["adm", "kitchen"], // TODO: padronizar tipos de operadores
			allowNull: false,
		},
		createdAt: DataTypes.DATE,
		updatedAt: DataTypes.DATE,
	},
	{
		sequelize,
		tableName: "operators",
	},
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
