import express from "express";
import cookieParser from "cookie-parser";
import sessions from "express-session";
import cors from "cors";
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

server.use(cors({
	origin:['http://localhost:3000'],
	methods:['GET','POST'],
	credentials: true
}));

server.use(express.json());
server.use(cookieParser());

// 24 horas em milisegundos
const oneDay = 1000 * 60 * 60 * 24;
server.use(sessions({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
}));

server.use(router);

server.listen(port, () => {
	console.log(`Rodando em: http://localhost:${port}`);
});

console.log("[MODELS]:");
console.log(sequelize.models);

