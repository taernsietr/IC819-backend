import { Router } from "express";
import { createClient } from "../controllers/clientController.js";
import { createOperator } from "../controllers/operatorController.js";
import { createDeliveryCompany } from "../controllers/deliveryCompanyController.js";

import { getSession, createCart, updateCart } from "../resources/session/session.js";

const router = Router();

router.get("/", (req, res) => {
	res.send("início");
});

// Acessáveis por qualquer usuário (não necessita de autenticação)
router.post("/cliente/cadastrar", createClient);

router.get("/sessao", getSession);
router.get("/sessao/criar-carrinho", createCart);
router.get("/sessao/att-carrinho", updateCart);

// Acessáveis apenas por certos usuários
// TODO: colocar camada de autenticação
router.post("/operador/cadastrar", createOperator);
router.post("/empresa-entrega/cadastro", createDeliveryCompany);
export default router;
