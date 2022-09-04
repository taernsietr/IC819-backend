import { Router } from "express";
import { createClient } from "../controllers/clientController.js";
import { createOperator } from "../controllers/operatorController.js";

const router = Router();

// Acessáveis por qualquer usuário (não necessita de autenticação)
router.post("/cliente/cadastrar", createClient);

// Acessáveis apenas por certos usuários
router.post("/operador/cadastrar", createOperator); // TODO: colocar camada de autenticação

export default router;
