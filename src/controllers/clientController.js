/* eslint-disable max-len */
import { responseCodes, validations } from "../resources/index.js";
import { Client, ClientModel } from "../models/client.js";

async function createClient(req, res) {
	try {
		const {
			cpf,
			name,
			email,
			phone,
			passwordHash,
		} = req.body;

		console.log(`[clientController:createClient] cpf = ${cpf}`);
		console.log(`[clientController:createClient] name = ${name}`);
		console.log(`[clientController:createClient] email = ${email}`);
		console.log(`[clientController:createClient] phone = ${phone}`);
		console.log(`[clientController:createClient] passwordHash = ${passwordHash}`);

		// validar os dados
		if (
			!validations.cpfValidation(cpf)
			|| !validations.nameValidation(name)
			|| !validations.emailValidation(email)
			|| !validations.phoneValidation(phone)
		) {
			console.log(`[clientController:createClient] cpfValidation = ${validations.cpfValidation(cpf)}`);
			console.log(`[clientController:createClient] nameValidation = ${validations.nameValidation(name)}`);
			console.log(`[clientController:createClient] emailValidation = ${validations.emailValidation(email)}`);
			console.log(`[clientController:createClient] phoneValidation = ${validations.phoneValidation(phone)}`);
			res.status(400).send({
				code: responseCodes.invalidData,
			});
			return;
		}

		// enquanto não temos o sequelize essa parte não funciona
		/*
		const cpfAlreadyExists = await Client.getByCpf(cpf);
		const emailAlreadyExists = await Client.getByEmail(email);

		if (
			cpfAlreadyExists.code !== responseCodes.success
			|| cpfAlreadyExists.result instanceof ClientModel) {
			res.status(400).send({
				code: responseCodes.duplicatedUniqueData.cpf,
			});
			return;
		}

		if (
			emailAlreadyExists.code !== responseCodes.success
			|| emailAlreadyExists.result instanceof ClientModel) {
			res.status(400).send({
				code: responseCodes.duplicatedUniqueData.email,
			});
			return;
		}
		*/

		if (!passwordHash) {
			res.status(400).send({
				code: responseCodes.emptyData,
				message: "Hash da senha não encontrado",
			});
			return;
		}

		const newUser = {
			name,
			cpf,
			email,
			phone,
			passwordHash,
			token: "",
		};

		const createdUser = newUser; // enquanto o bd não está funcionando usar essa linha
		// const createdUser = await Client.createClient(newUser);

		res.status(201).send({
			code: responseCodes.created,
			result: createdUser,
		});
		return;
	} catch (error) {
		console.log(`ERROR: ${error}`);
		res.status(500).send({
			code: responseCodes.unknownInternalError,
			error,
		});
	}
}

export {
	createClient,

};