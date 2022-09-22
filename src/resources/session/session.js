export function getSession(req, res) {
	const userSession = req.session;
	res.send({ userSession, session: req.session });
}

export function createCart(req, res) {
	const userSession = req.session;
	const cart = { items: [{ item: { id: "adygduyag", value: 10 }, quantity: 1 }], itemsPrice: 10 };
	userSession.cart = cart;

	res.status(201).send("ok");
}

export function updateCart(req, res) {
	const userSession = req.session;
	console.log(`carrinho atual: ${JSON.stringify(userSession?.cart)}`);

	const cart = req.session.cart ? req.session.cart : { items: [], itemsPrice: 0 };
	const newItem = req.body

	// cart.items.push({ item: { id: "dygauydau", value: 5 }, quantity: 2 });
	cart.items.push(newItem);
	cart.itemsPrice = 1000;

	userSession.cart = cart;

	console.log(`carrinho depois: ${JSON.stringify(userSession?.cart)}`);

	res.status(201).send("ok");
}

export const a = 1;
