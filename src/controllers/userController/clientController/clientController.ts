import { Client, ClientModel } from "../../../models/client";
import type { ClientDataType } from "../../../resources/types";
import { responseCodes } from "../../../resources";

import { Response } from "express";

type createClientRequestType = {
	body: {
		data: ClientDataType
	}
}

// add req/res
async function createClient(req: createClientRequestType, res: Response) {
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

		const newUser: ClientDataType = {
			name: data.name,
			cpf: data.cpf,
			email: data.email,
			phone: data.phone,
			passwordHash: data.passwordHash,
			token: ""
		};

		Client.createClient(newUser);

		res.status(201).send({
			code: responseCodes.created,
		});

	} catch (e: unknown) {
		res.status(500).send({
			code: responseCodes.unknownInternalError,
			error: e,
		});
	}
}

const userController = {
	createClient,

};

export default userController;
