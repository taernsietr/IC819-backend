import express from "express";
import * as dotenv from "dotenv";
import router from "./routes/routes.js";
import { DataTypes } from "sequelize";
import { sequelize, syncSequelize } from "./db.js";  

import { ClientModel } from "./models/client.js";
import { AddressModel } from "./models/address.js";
import { DeliveryCompanyModel } from "./models/deliveryCompany.js";
import { ItemModel } from "./models/item.js";
import { OrderModel, OrderItem } from "./models/order.js";

dotenv.config();

ClientModel.hasMany(OrderModel, { foreignKey: "id" });
ClientModel.hasOne(AddressModel, { foreignKey: { name: "address", type: DataTypes.UUID }});
AddressModel.belongsTo(ClientModel);
ItemModel.belongsToMany(OrderModel, { through: "OrderItem" });
OrderModel.belongsToMany(ItemModel, { through: "OrderItem" });
syncSequelize();

const server = express();
const port = process.env.SERVER_PORT || 5000;

server.use(express.json());
server.use(router);

server.listen(port, () => {
	console.log(`Rodando em: http://localhost:${port}`);
});

console.log("[MODELS]:");
console.log(sequelize.models);

