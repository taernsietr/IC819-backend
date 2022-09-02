import { Router } from "express";

import { createClient } from "../controllers/clientController/clientController";
import { createOperator } from "../controllers/operatorController/operatorController";

const router = Router();

// Acessáveis por qualquer usuário (não necessita de autenticação)
router.post("/cliente/cadastrar", createClient);

// Acessáveis apenas por certos usuários
router.post("/operador/cadastrar", createOperator); // TODO: colocar camada de autenticação
