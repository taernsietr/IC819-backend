import Cart from "../../models/cart.js";

function createCartSession(req, res) {
	const cart = new Cart(req.session.cart ? req.session.cart : {});
	req.session.cart = cart;
    console.log("Atribuindo novo carrinho a req.session.cart: ", req.session.cart)
	res.send(req.session);
}

function addToCart(req, res) {
	// na requisição pegar o cartItem do req.body
	// instanciar o carrinho e adicionar o item + quantidade no model do carrinho
	// salvar o novo carrinho no carrinhco da
    const cartSession = req.session.cart;
    console.log("cart session: ", cartSession)
	const cartItem = req.body;
	console.log("CartItem: ", cartItem);
    console.log("Sessão existente: ", req.session);
	const cart = new Cart(req.session.cart ? req.session.cart : {});
	cart.add(cartItem);
	req.session.cart = cart;
	console.log("depois: ", req.session.cart);
	res.send(cart);
}

function getSession(req, res) {
	const request = req.session;
	res.send(request);
}

export {
	createCartSession,
	addToCart,
	getSession,
	// removerFromCart,
	// getCart,
};

// Criar carrinho pra todos usuário
// Recebe requisição de adicionar ao carrinho contendo informações do item e quantidade
// Verfica se possui a quantidade desejada
// Caso sim, adicione o pedido ao carrinho associado a sessão do usuário
// Pagina carrinho vai fazer requisição e retornar o objeto da sessao
// Pagina carrinho ser diferente quando está vazia
