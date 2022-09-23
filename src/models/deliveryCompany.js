import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const DeliveryCompanyModel = sequelize.define(
	"DeliveryCompany",
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
		fee: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
	},
);

export const DeliveryCompany = {
	createDeliveryCompany: async (data) => {
		const createdDeliveryCompany = await DeliveryCompanyModel.create({
			name: data.name,
			fee: data.fee,
		});

		return createdDeliveryCompany;
	},
};
