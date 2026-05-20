import { Request, Response } from 'express';
import { LoteEstoqueService } from '../services/loteEstoque.services';

export class LoteEstoqueController {
    constructor(private readonly _service = new LoteEstoqueService()) { }

    /**
     * Lista todos os lotes de estoque cadastrados.
     * @param req - Objeto de requisição Express.
     * @param res - Objeto de resposta Express.
     */
    listarTodos = async (req: Request, res: Response): Promise<void> => {
        try {
            const lotes = await this._service.selecionarTodos();
            res.status(200).json({
                mensagem: 'Lotes de estoque listados com sucesso.',
                recurso: lotes,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ mensagem: 'Erro interno do servidor.', error: error instanceof Error ? error.message : 'Erro desconhecido' });
        }
    };

    /**
     * Busca um lote de estoque pelo ID informado na URL.
     * @param req - Objeto de requisição Express (params.id).
     * @param res - Objeto de resposta Express.
     */
    buscarPorId = async (req: Request, res: Response): Promise<void> => {
        try {
            const idLote = Number(req.params.id);

            if (idLote === null) {
                res.status(400).json({
                    mensagem: 'Dados invalidos.',
                    erros: [{ campo: 'id', mensagem: 'Informe um id valido.' }],
                });
                return;
            }

            const lote = await this._service.selecionarPorId(idLote);
            res.status(200).json({
                mensagem: 'Lote de estoque encontrado com sucesso.',
                recurso: lote,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ mensagem: 'Erro interno do servidor.', error: error instanceof Error ? error.message : 'Erro desconhecido' });
        }
    };

    /**
     * Cria um novo lote de estoque com os dados do corpo da requisição.
     * @param req - Objeto de requisição Express (body: { idProduto, dataVencimento, quantidade }).
     * @param res - Objeto de resposta Express.
     */
    criarLote = async (req: Request, res: Response): Promise<void> => {
        try {
            const { idProduto, dataVencimento, quantidade } = req.body;
            const novoLote = await this._service.adicionarLote(idProduto, new Date(dataVencimento), quantidade);
            res.status(201).json({ novoLote });
        } catch (error) {
            console.log(error);
            res.status(500).json({ mensagem: 'Erro interno do servidor.', error: error instanceof Error ? error.message : 'Erro desconhecido' });
        }
    };

    /**
     * Atualiza um lote de estoque existente pelo ID informado na URL.
     * @param req - Objeto de requisição Express (params.id, body: { idProduto, dataVencimento, quantidade }).
     * @param res - Objeto de resposta Express.
     */
    atualizarLote = async (req: Request, res: Response): Promise<void> => {
        try {
            const { idProduto, dataVencimento, quantidade } = req.body;
            const idLote = Number(req.params.id);
            const loteAlterado = await this._service.editarLote(idLote, idProduto, new Date(dataVencimento), quantidade);
            res.status(201).json({ loteAlterado });
        } catch (error) {
            console.log(error);
            res.status(500).json({ mensagem: 'Erro interno do servidor.', error: error instanceof Error ? error.message : 'Erro desconhecido' });
        }
    };

    /**
     * Remove um lote de estoque pelo ID informado na URL.
     * @param req - Objeto de requisição Express (params.id).
     * @param res - Objeto de resposta Express.
     */
    deletarLote = async (req: Request, res: Response): Promise<void> => {
        try {
            const idLote = Number(req.params.id);

            if (idLote === null) {
                res.status(400).json({
                    mensagem: 'Dados invalidos.',
                    erros: [{ campo: 'id', mensagem: 'Informe um id valido.' }],
                });
                return;
            }

            await this._service.deletarLote(idLote);
            res.status(200).json({ mensagem: 'Lote de estoque deletado com sucesso.' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ mensagem: 'Erro interno do servidor.', error: error instanceof Error ? error.message : 'Erro desconhecido' });
        }
    };
}
