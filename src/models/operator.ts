import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../db";

import type { OperatorDataType } from "../resources/types";


import { Order } from "./order";

export const Operator = {
	crateOperator: async (operatorData: OperatorDataType) => {
		const createdUser = await OperatorModel.create({
			operatorType: operatorData.operatorType
		});

		return createdUser;
	},
}
export class OperatorModel extends Model<InferAttributes<OperatorModel>, InferCreationAttributes<OperatorModel>> {
	declare id: string;
	declare operatorType: string;

	declare createdAt: CreationOptional<Date>;
	declare updatedAt: CreationOptional<Date>;
}

OperatorModel.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		operatorType: {
			type: DataTypes.STRING(32),
			allowNull: false
		},
		createdAt: DataTypes.DATE,
		updatedAt: DataTypes.DATE
	},
	{
		sequelize,
		tableName: "operators"
	}
);

OperatorModel.hasMany(Order);
