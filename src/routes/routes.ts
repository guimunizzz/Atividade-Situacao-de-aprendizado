import { Router } from "express";
import fornecedoresRouter from "./fornecedores.routes";
import categoriaRouter from "./categoria.routes";
import estoqueRouter from "./estoque.routes";
import produtosRouter from "./produtos.routes";
import movimentacaoRouter from "./movimentacao.routes";

const router = Router();

router.use("/fornecedores", fornecedoresRouter);
router.use("/categoria", categoriaRouter);
router.use("/estoque", estoqueRouter);
router.use("/produtos", produtosRouter);
router.use("/movimentacao", movimentacaoRouter);

export default router;