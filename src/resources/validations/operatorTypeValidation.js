import { operatorTypes } from "../../models/dataEnums.js";

export default function operatorTypeValidation(operatorType) {
	const result = operatorTypes.find((e) => e === operatorType);

	if (result === undefined) {
		return false;
	}

	return true;
}
