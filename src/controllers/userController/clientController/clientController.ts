// import { Client, ClientModel } from "../../../models/client";
// import { responseCodes } from "../../../resources";
// import type { Response } from "express";

// // tipos
// import type { ClientDataType, createClientRequestType } from "../../../resources/types";

const { Client, ClientModel } = require("../../../models/client");
const { responseCodes } = require("../../../resources");
const { Response } = require("express");
const { ClientDataType, createClientRequestType } = require("../../../resources/types");

// add req/res
async function createClient(req: typeof createClientRequestType, res: typeof Response) {
	try {
		const { data } = req.body;

		// validar os dados
		if (!Client.isNameValid(data?.name) || !Client.isCpfValid(data?.cpf) || !Client.isEmailValid(data?.email) || !Client.isPhoneNumberValid(data?.phone)) {
			res.status(400).send({
				code: responseCodes.invalidData,
			});
		}

		const cpfAlreadyExists = await Client.getByCpf(data.cpf);
		const emailAlreadyExists = await Client.getByEmail(data.email);

		if (cpfAlreadyExists.code !== responseCodes.success || cpfAlreadyExists.result instanceof ClientModel) {
			res.status(400).send({
				code: responseCodes.duplicatedUniqueData.cpf,
			});
		}

		if (emailAlreadyExists.code !== responseCodes.success || emailAlreadyExists.result instanceof ClientModel) {
			res.status(400).send({
				code: responseCodes.duplicatedUniqueData.email,
			});
		}

		if (!data?.passwordHash) {
			res.status(400).send({
				code: responseCodes.emptyData,
				message: "Hash da senha não encontrado"
			});
		}

		const newUser: typeof ClientDataType = {
			name: data.name,
			cpf: data.cpf,
			email: data.email,
			phone: data.phone,
			passwordHash: data.passwordHash,
			token: ""
		};

		const createdUser = newUser; // enquanto o bd não está funcionando usar essa linha
		// const createdUser = await Client.createClient(newUser);

		res.status(201).send({
			code: responseCodes.created,
			result: createdUser,
		});

	} catch (e: unknown) {
		res.status(500).send({
			code: responseCodes.unknownInternalError,
			error: e,
		});
	}
}

export {
	createClient,
}