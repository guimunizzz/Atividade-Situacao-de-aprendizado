import { Request, Response } from 'express';
import { MovimentacaoService } from '../services/movimentacao.services';

export class MovimentacaoController {
    constructor(private readonly _service = new MovimentacaoService()) { }

    listarTodos = async (req: Request, res: Response): Promise<void> => {
        try {
            const movimentacoes = await this._service.selecionarTodos();
            res.status(200).json({
                mensagem: 'Movimentações listadas com sucesso.',
                recurso: movimentacoes,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ mensagem: 'Erro interno do servidor.', error: error instanceof Error ? error.message : 'Erro desconhecido' });
        }
    };

    buscarPorId = async (req: Request, res: Response): Promise<void> => {
        try {
            const idMovimentacao = Number(req.params.id);

            if (idMovimentacao === null) {
                res.status(400).json({
                    mensagem: 'Dados invalidos.',
                    erros: [{ campo: 'id', mensagem: 'Informe um id valido.' }],
                });
                return;
            }

            const movimentacao = await this._service.selecionarPorId(idMovimentacao);
            res.status(200).json({
                mensagem: 'Movimentação encontrada com sucesso.',
                recurso: movimentacao,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ mensagem: 'Erro interno do servidor.', error: error instanceof Error ? error.message : 'Erro desconhecido' });
        }
    };

    criarMovimentacao = async (req: Request, res: Response): Promise<void> => {
        try {
            const { tipoMovimento, quantidade, idLote, idProduto } = req.body;
            const novaMovimentacao = await this._service.adicionarMovimentacao(
                tipoMovimento,
                Number(quantidade),
                Number(idLote),
                Number(idProduto)
            );
            res.status(201).json({ novaMovimentacao });
        } catch (error) {
            console.log(error);
            res.status(500).json({ mensagem: 'Erro interno do servidor.', error: error instanceof Error ? error.message : 'Erro desconhecido' });
        }
    };

    atualizarMovimentacao = async (req: Request, res: Response): Promise<void> => {
        try {
            const idMovimentacao = Number(req.params.id);
            const { tipoMovimento, quantidade, idLote, idProduto } = req.body;
            const movimentacaoAlterada = await this._service.editarMovimentacao(
                idMovimentacao,
                tipoMovimento,
                Number(quantidade),
                Number(idLote),
                Number(idProduto)
            );
            res.status(201).json({ movimentacaoAlterada });
        } catch (error) {
            console.log(error);
            res.status(500).json({ mensagem: 'Erro interno do servidor.', error: error instanceof Error ? error.message : 'Erro desconhecido' });
        }
    };

    deletarMovimentacao = async (req: Request, res: Response): Promise<void> => {
        try {
            const idMovimentacao = Number(req.params.id);

            if (idMovimentacao === null) {
                res.status(400).json({
                    mensagem: 'Dados invalidos.',
                    erros: [{ campo: 'id', mensagem: 'Informe um id valido.' }],
                });
                return;
            }

            await this._service.deletarMovimentacao(idMovimentacao);
            res.status(200).json({ mensagem: 'Movimentação deletada com sucesso.' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ mensagem: 'Erro interno do servidor.', error: error instanceof Error ? error.message : 'Erro desconhecido' });
        }
    };
}
