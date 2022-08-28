// comuns
export type responseType = {
	message?: string | null,
	code?: string | null,
	result?: unknown,
	error?: unknown,
}

// Cliente
export type ClientDataType = {
	name: string,
	cpf: string,
	email: string,
	phone: string,
	passwordHash: string,
	token: string
}

export type createClientRequestType = {
	body: {
		data: ClientDataType
	}
}

// Operador de cozinha
export type OperatorDataType = {
	operatorType: string, // TODO: definir os tipos possíveis
}

export type createOperatorRequestType = {
	body: {
		data: OperatorDataType
	}
}