import express from "express";
import * as dotenv from "dotenv";
import router from "./routes/routes.js";

dotenv.config();

const server = express();
const port = process.env.SERVER_PORT || 5000;

server.use(express.json());
server.use(router);

server.listen(port, () => {
	console.log(`Rodando em: http://localhost:${port}`);
});
