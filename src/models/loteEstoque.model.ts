/**
 * 20/05/2026 - loteEstoque.model.ts
 * Descrição: Este arquivo define a classe LoteEstoque, que representa um lote de estoque para um produto específico.
 * Classe que representa um lote de estoque, contendo informações sobre o produto, data de vencimento e quantidade.
 * Esta classe é utilizada para gerenciar os lotes de estoque dos produtos, permitindo o controle de validade e quantidade disponível.
 * Atributos:
 * - idLote: Identificador único do lote (opcional, gerado automaticamente pelo banco de dados).
 * - idProduto: Identificador do produto associado ao lote.
 * - dataVencimento: Data de vencimento do lote.
 * - quantidade: Quantidade de itens disponíveis no lote.
 * Métodos:
 * - validar_vencimento: Valida se a data de vencimento é uma data futura. (now() < dataVencimento)
 * - validar_qtde: Valida se a quantidade é maior que zero. (quantidade > 0)
 * - notificarEstoqueMinimo: Notifica quando a quantidade do lote atingir um nível mínimo (quantidade <= 10).
 * - Construtor: Permite criar uma instância de LoteEstoque com os atributos necessários.
 * - Getters e Setters: Permitem acessar e modificar os atributos do lote de estoque.
 */
export class LoteEstoque {
    private readonly _idLote?: number;
    private readonly _idProduto: number = 0;
    private _dataVencimento: Date = new Date();
    private _quantidade: number = 0;

    constructor(
      idProduto: number,
      dataVencimento: Date,
      quantidade: number,
      idLote?: number
    ) {
      this._idProduto = idProduto;
      this._dataVencimento = dataVencimento;
      this._quantidade = quantidade;
      this._idLote = idLote;
    }
    // getters
    public get IdLote(): number | undefined {
      return this._idLote;
    }
    public get IdProduto(): number {
      return this._idProduto;
    }
    public get DataVencimento(): Date {
      return this._dataVencimento;
    }
    public get Quantidade(): number {
      return this._quantidade;
    }
    // setters
    public set DataVencimento(value: Date) {
      this._dataVencimento = value;
    }
    public set Quantidade(value: number) {
      this._quantidade = value;
    }

    public validar_vencimento(): boolean {
      const hoje = new Date();
      return hoje < this._dataVencimento;
    }

    public validar_qtd(): boolean {
      return this._quantidade > 0;
    }

    // melhorar essa função para enviar um json
    public notificarEstoqueMinimo(): void {
      if (this._quantidade <= 10) {
        console.log(`Atenção: O lote ${this._idLote} do produto ${this._idProduto} atingiu o estoque mínimo. Quantidade atual: ${this._quantidade}`);
      }

    }
  }