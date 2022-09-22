import express from "express";
import cookieParser from "cookie-parser";
import sessions from "express-session";
import cors from "cors";
import * as dotenv from "dotenv";

import router from "./routes/routes.js";

dotenv.config();

const server = express();
const port = process.env.SERVER_PORT || 5000;

server.use(cors());
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
