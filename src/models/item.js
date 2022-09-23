import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const ItemModel = sequelize.define("Item",
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING(256),
			allowNull: false,
		},
		enabled: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		}
	}
);

