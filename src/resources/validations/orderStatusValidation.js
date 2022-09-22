import { orderStatus } from "../../models/dataEnums.js";

export default function orderStatusValidation(ordStatus) {
	const result = orderStatus.find((e) => e === ordStatus);

	if (result === undefined) {
		return false;
	}

	return true;
}
