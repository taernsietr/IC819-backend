// TODO: procurar regras pra nome
export default function nameValidation(name) {
	// validação de nome
	name.trim();

	if (name == null) {
		return false;
	}

	return true;
}
