import { Model, DataTypes } from "sequelize";
import sequelize from "../db.js";
import { validations } from "../resources/index.js";


export const DeliveryCompanyModel = sequelize.define("DeliveryCompany",
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
	}
);

// TODO: relação
// DeliveryCompany.hasMany(Delivery, { foreignKey: "id" });

export const DeliveryCompany = {
	createDeliveryCompany: async (data) => {
		const createdDeliveryCompany = await DeliveryCompanyModel.create({
			name: data.name,
			fee: data.fee,
		});

		return createdDeliveryCompany;
	},

	validateFee: (fee) => {
		// TODO: ver regras de negócio para a taxa de entrega
		console.log("Validar taxa de entrega");
		return true;
	},
};
