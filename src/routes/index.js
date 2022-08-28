const Router = require("express").Router;
const clientController = require("../controllers/userController/clientController/clientController.ts");

const router = Router();
// Acessáveis por qualquer pessoa (não necessita de autenticação)
router.post('/cliente/cadastrar', clientController.createClient);

// Restritas aos usuários

module.exports = router;