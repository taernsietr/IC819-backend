import Sequelize from "sequelize";

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

async function syncSequelize() {
    try {
        // await sequelize.drop();
        await sequelize.sync();
        // await sequelize.sync({ force: true });
        console.log("Database has been synchronized successfully.");
    } catch (error) {
        console.error("Unable to sync database:", error);
    }
}

export { 
    sequelize,
    syncSequelize
}
