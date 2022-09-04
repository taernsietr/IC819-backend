import { Router } from "express";
import { createClient } from "../controllers/clientController.js";
import { createOperator } from "../controllers/operatorController.js";
import { createDeliveryCompany } from "../controllers/deliveryCompanyController.js";

const router = Router();

// Acessáveis por qualquer usuário (não necessita de autenticação)
router.post("/cliente/cadastrar", createClient);

// Acessáveis apenas por certos usuários
// TODO: colocar camada de autenticação
router.post("/operador/cadastrar", createOperator);
router.post("/empresa-entrega/cadastro", createDeliveryCompany);
export default router;
