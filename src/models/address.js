import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const AddressModel = sequelize.define("Address",
    {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		street: {
			type: DataTypes.STRING(32),
			allowNull: false,
		},
		number: {
			type: DataTypes.STRING(4),
			allowNull: true, // TODO: definir se casos em que o endereço não tem número devem conter isso explicitamente no campo Rua
		},
		additionalInfo: {
			type: DataTypes.STRING(256),
			allowNull: true,
		},
		district: {
			type: DataTypes.STRING(64),
			allowNull: false,
		},
		city: {
			type: DataTypes.STRING(64),
			allowNull: false,
		},
		postCode: {
			type: DataTypes.STRING(7), // TODO: verificar tamanho
			allowNull: false,
		}
	}
);

export const Address = {

};

