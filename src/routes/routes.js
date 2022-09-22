import { Router } from "express";
import { createClient } from "../controllers/clientController.js";
import { createOperator } from "../controllers/operatorController.js";
import { createDeliveryCompany } from "../controllers/deliveryCompanyController.js";
import { getMenu, getImgMenu, getItems } from "../resources/mock/getMenu.js";
// import { createCartSession, addToCart, getSession } from "../controllers/cart/cartController.js";

import { getSession, createCart, updateCart } from "../resources/session/session.js";

const router = Router();

// Mock com menu e itens
router.get("/menu/items", getMenu);
router.get("/items", getItems);
router.get("/images/:imageName", getImgMenu);


// Acessáveis por qualquer usuário (não necessita de autenticação)

router.post("/cliente/cadastrar", createClient);

// Sessão 
router.get("/sessao", getSession);
router.get("/", createCart);
router.post("/att-carrinho", updateCart);

// Acessáveis apenas por certos usuários
// TODO: colocar camada de autenticação
router.post("/operador/cadastrar", createOperator);
router.post("/empresa-entrega/cadastro", createDeliveryCompany);
export default router;
