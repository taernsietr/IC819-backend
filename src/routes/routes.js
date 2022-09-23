import { Router } from "express";
import { createClient } from "../controllers/clientController.js";
import { createOperator } from "../controllers/operatorController.js";
import { createDeliveryCompany } from "../controllers/deliveryCompanyController.js";
import { getMenu, getImgMenu, getItems } from "../resources/mock/getMenu.js";
import { createCart, addCart, getCart } from "../controllers/cart/cartController.js";
import { getSession, deleteSession } from "../controllers/user/session.js";

const router = Router();

// Mock com menu e itens
router.get("/menu-items", getMenu);
router.get("/items", getItems);
router.get("/images/:imageName", getImgMenu);

// Acessáveis por qualquer usuário (não necessita de autenticação)
router.post("/cliente/cadastrar", createClient);

// Sessão
router.get("/sessao", getSession); // pegar sessão
router.get("/sessao/destruir", deleteSession); // deletar sessão

// Carrinho
router.get("/", createCart);
router.post("/add-carrinho", addCart);
router.get("/get-cart", getCart);
// remover item
// finalizar pedido
// retornar o carrinho
// limpar carrinho
// updata quantity

// Acessáveis apenas por certos usuários
// TODO: colocar camada de autenticação
router.post("/operador/cadastrar", createOperator);
router.post("/empresa-entrega/cadastro", createDeliveryCompany);
export default router;
