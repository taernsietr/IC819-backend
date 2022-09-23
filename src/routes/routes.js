import { Router } from "express";
import { createClient } from "../controllers/clientController.js";
import { createOperator } from "../controllers/operatorController.js";
import { createDeliveryCompany } from "../controllers/deliveryCompanyController.js";
import { getMenu, getImgMenu, getItems } from "../resources/mock/getMenu.js";
import { createCart, addCart, getCart, clearCart, removeItem} from "../controllers/cart/cartController.js";
import { getSession, deleteSession } from "../controllers/user/session.js";
import { createOrder } from "../controllers/orderController.js";
import { createItem } from "../controllers/itemController.js";

const router = Router();

// Mock com menu e itens
router.get("/menu-items", getMenu);
router.get("/items", getItems);
router.get("/images/:imageName", getImgMenu);

// Acessáveis por qualquer usuário (não necessita de autenticação)

// Sessão
router.get("/sessao", getSession); // pegar sessão
router.get("/sessao/destruir", deleteSession); // deletar sessão

// Carrinho
router.get("/", createCart); // criar carrinho na sessão
router.post("/add-carrinho", addCart); // adicionar item no carrinho
router.get("/get-cart", getCart); // retornar o carrinho
router.post("/remover-item", removeItem); // remover item do carrinho
router.get("/limpar-carrinho", clearCart); // limpar o carrinho
router.post("/finalizar-pedido", createOrder); // finalizar pedido
// updata quantity

// Cliente
router.post("/cliente/cadastrar", createClient); // cadastrar cliente

// Acessáveis apenas por certos usuários
// TODO: colocar camada de autenticação
router.post("/operador/cadastrar", createOperator);
router.post("/empresa-entrega/cadastrar", createDeliveryCompany);

router.post("/item/criar", createItem);
export default router;
