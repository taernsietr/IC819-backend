import { responseCodes } from "../../resources/index.js";

export function getSession(req, res) {
	const userSession = req.session;
	res.status(200).send({ userSession });
}

export function deleteSession(req, res) {
	req.session.destroy();
	res.status(200).send({ code: responseCodes.session.deleted });
}
