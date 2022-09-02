require("dotenv").config();
const express = require("express");

const server = express();

const port = process.env.SERVER_PORT || 5000;
server.use(express.json());

server.listen(port, () => {
	console.log(`Rodando em: http://localhost:${port}`);
});
