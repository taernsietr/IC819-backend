// referência: https://github.com/mariadb-developers/todo-app-nodejs-sequelize/blob/main/src/api/db.js
import * as dotenv from "dotenv";
import Sequelize from "sequelize";

dotenv.config();

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASS,
	{
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect: "mariadb",
	},
);

async function authenticateSequelize() {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
}

authenticateSequelize();

export default sequelize;
