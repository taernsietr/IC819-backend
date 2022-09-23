import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

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
	},
);

export const Operator = {
	crateOperator: async (operatorData) => {
		const createdUser = await OperatorModel.create({
			operatorType: operatorData.operatorType,
		});

		return createdUser;
	},
};
