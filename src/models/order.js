import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const OrderModel = sequelize.define(
	"Order",
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		status: {
			type: DataTypes.STRING(32),
			allowNull: false,
		},
	},
);

export const OrderItem = sequelize.define(
	"OrderItem",
	{
		quantity: DataTypes.INTEGER,
	},
	{
		timestamps: false,
	},
);

const Order = {

};

export {
	Order,
};

const OrderItemMethods = {
	createOrderItem: async (orderItem) => {
		console.log(`create order item ${orderItem}`); // TODO: fazer no bd
	},
};

export {
	OrderItemMethods,
};
