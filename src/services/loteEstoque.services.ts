import { LoteEstoqueRepository } from '../repository/loteEstoque.repository';
import { LoteEstoque } from '../models/loteEstoque.model';

export class LoteEstoqueService {
    constructor(private readonly _repository = new LoteEstoqueRepository()) { }

    /**
     * Retorna todos os lotes de estoque cadastrados.
     * @returns Promise com a lista de lotes.
     */
    async selecionarTodos() {
        return await this._repository.selectTodos();
    }

    /**
     * Retorna um lote de estoque pelo seu ID.
     * @param id - ID do lote a ser buscado.
     * @returns Promise com os dados do lote encontrado.
     */
    async selecionarPorId(id: number) {
        return await this._repository.selectById(id);
    }

    /**
     * Cria e persiste um novo lote de estoque após validação.
     * @param idProduto - ID do produto associado ao lote.
     * @param dataVencimento - Data de vencimento do lote.
     * @param quantidade - Quantidade de itens no lote.
     * @returns Promise com o resultado da inserção.
     * @throws {Error} Se a data de vencimento for passada ou a quantidade for zero/negativa.
     */
    async adicionarLote(idProduto: number, dataVencimento: Date, quantidade: number) {
        const lote = new LoteEstoque(idProduto, dataVencimento, quantidade);

        if (!lote.validar_vencimento()) {
            throw new Error('A data de vencimento deve ser uma data futura.');
        }
        if (!lote.validar_qtd()) {
            throw new Error('A quantidade do lote deve ser maior que zero.');
        }

        return await this._repository.adicionarLote(lote);
    }

    /**
     * Atualiza um lote de estoque existente após validação.
     * @param id - ID do lote a ser editado.
     * @param idProduto - ID do produto associado.
     * @param dataVencimento - Nova data de vencimento.
     * @param quantidade - Nova quantidade.
     * @returns Promise com o resultado da atualização.
     * @throws {Error} Se a data de vencimento for passada ou a quantidade for zero/negativa.
     */
    async editarLote(id: number, idProduto: number, dataVencimento: Date, quantidade: number) {
        const lote = new LoteEstoque(idProduto, dataVencimento, quantidade, id);

        if (!lote.validar_vencimento()) {
            throw new Error('A data de vencimento deve ser uma data futura.');
        }
        if (!lote.validar_qtd()) {
            throw new Error('A quantidade do lote deve ser maior que zero.');
        }

        return await this._repository.editarLote(id, lote);
    }

    /**
     * Remove um lote de estoque pelo seu ID.
     * @param id - ID do lote a ser deletado.
     * @returns Promise com o resultado da exclusão.
     */
    async deletarLote(id: number) {
        return await this._repository.deletarLote(id);
    }
}
