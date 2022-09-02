import Sequelize from "sequelize";
import db from "../db";
import { validations } from "../resources";

// TODO: sequelize
export const ClientModel = {};

export const Client = {
	isNameValid: (name) => {
		// validar nome
		if (name === null || !name) {
			return false;
		}

		name = name.trim();

		if (name === "") {
			return false;
		}

		if (!validations.nameValidation(name)) {
			return false;
		}

		return true;
	},

	isCpfValid: (cpf) => {
		// validar cpf
		if (cpf === null || !cpf) {
			return false;
		}

		cpf = cpf.trim();

		if (cpf === "") {
			return false;
		}

		if (!validations.cpfValidation(cpf)) {
			return false;
		}

		return true;
	},

	isEmailValid: (email) => {
		// validar email
		if (email === null || !email) {
			return false;
		}

		email = email.trim();

		if (email === "") {
			return false;
		}

		if (!validations.emailValidation(email)) {
			return false;
		}

		return true;
	},

	isPhoneNumberValid: (phoneNumber) => {
		// validar número de telefone
		if (phoneNumber === null || !phoneNumber) {
			return false;
		}

		phoneNumber = phoneNumber.trim();

		if (phoneNumber === "") {
			return false;
		}

		if (!validations.phoneNumberValidation(phoneNumber)) {
			return false;
		}

		return true;
	},

	isPasswordHashValid: (passHash) => {
		// TODO: verificar se o hash é válido
	},

	createClient: async (data) => {
		const createdUser = await	ClientModel.create({
			name: data.name,
			cpf: data.cpf,
			email: data.email,
			phone: data.phone,
			passwordHash: data.passwordHash,
			token: data.token,
		});

		return createdUser;
	},

	getByCpf: async (cpf) => {
		const res = {
			code: "",
			message: null,
			result: null,
		};

		if (!cpf || cpf == null) {
			console.log("[getByCpf] cpf não existe ou é null");
			res.code = "EMPTY_DATA";
			return res;
		}

		cpf = cpf.trim();

		if (!Client.isCpfValid(cpf)) {
			console.log("[getByCpf] cpf é inválido");
			res.code = "INVALID_DATA";
			return res;
		}

		console.log("[getByCpf] cpf é válido, vai procurar");

		const userFound = await ClientModel.findOne({
			where: { cpf },
		});

		res.result = userFound;
		res.code = "OK";
		return res;
	},

	getByEmail: async (email) => {
		const res = {
			code: "",
			message: null,
			result: null,
		};

		if (!email || email == null) {
			console.log("[getByEmail] email não existe ou é null");
			res.code = "EMPTY_DATA";
			return res;
		}

		email = email.trim();

		if (!Client.isEmailValid(email)) {
			console.log("[getByEmail] email é inválido");
			res.code = "INVALID_DATA";
			return res;
		}

		console.log("[getByEmail] email é válido, vai procurar");

		const userFound = await ClientModel.findOne({
			where: { email },
		});

		res.result = userFound;
		res.code = "OK";
		return res;
	},
};
