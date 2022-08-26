// autenticações
import generateAccessToken from "./auth/generateAccessToken";
import checkUserAuth from "./auth/checkUserAuth";

// validações
import cpfValidation from "./validations/cpfValidation";
import emailValidation from "./validations/emailValidation";
import phoneNumberValidation from "./validations/phoneNumberValidation";
import nameValidation from "./validations/nameValidation";

// padões de respostas
import codes from "./responseCodes/responseCodes";

// tipos
import t from "./types";

export const auth = {
	generateAccessToken,
	...checkUserAuth,
};

export const validations = {
	emailValidation,
	phoneNumberValidation,
	cpfValidation,
	nameValidation,
};

export const responseCodes = {
	...codes,
};


export const types = {
	...t,
};
