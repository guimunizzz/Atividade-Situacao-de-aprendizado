export enum TipoMovimento {
    ENTRADA = 'ENTRADA',
    SAIDA = 'SAIDA'
}

export class Movimentacao {
    private readonly _idMovimentacao?: number;
    private _tipoMovimento!: TipoMovimento;
    private _quantidade: number = 0;
    private _id_lote: number = 0;
    private _id_produto: number = 0;
    private readonly _dt_movimentacao?: Date;

    constructor(
        tipoMovimento: TipoMovimento,
        quantidade: number,
        idLote: number,
        idProduto: number,
        idMovimentacao?: number,
        dtMovimentacao?: Date
    ) {
        this.TipoMovimento = tipoMovimento;
        this.Quantidade = quantidade;
        this.IdLote = idLote;
        this.IdProduto = idProduto;
        this._idMovimentacao = idMovimentacao;
        this._dt_movimentacao = dtMovimentacao;
    }

    public get IdMovimentacao(): number | undefined {
        return this._idMovimentacao;
    }

    public get TipoMovimento(): TipoMovimento {
        return this._tipoMovimento;
    }

    public get Quantidade(): number {
        return this._quantidade;
    }

    public get IdLote(): number {
        return this._id_lote;
    }

    public get IdProduto(): number {
        return this._id_produto;
    }

    public get DtMovimentacao(): Date | undefined {
        return this._dt_movimentacao;
    }

    public set TipoMovimento(value: TipoMovimento) {
        this.validarTipoMovimento(value);
        this._tipoMovimento = value;
    }

    public set Quantidade(value: number) {
        this.validarQuantidade(value);
        this._quantidade = value;
    }

    public set IdLote(value: number) {
        this.validarIdLote(value);
        this._id_lote = value;
    }

    public set IdProduto(value: number) {
        this.validarIdProduto(value);
        this._id_produto = value;
    }

    public static adicionar(
        tipoMovimento: TipoMovimento,
        quantidade: number,
        idLote: number,
        idProduto: number
    ): Movimentacao {
        return new Movimentacao(tipoMovimento, quantidade, idLote, idProduto);
    }

    public static editar(
        tipoMovimento: TipoMovimento,
        quantidade: number,
        idLote: number,
        idProduto: number,
        idMovimentacao: number
    ): Movimentacao {
        return new Movimentacao(tipoMovimento, quantidade, idLote, idProduto, idMovimentacao);
    }

    public validarQuantidade(value: number): void {
        if (!Number.isInteger(value)) {
            throw new TypeError('A quantidade deve ser um numero inteiro.');
        }

        if (value <= 0) {
            throw new TypeError('A quantidade deve ser maior que zero.');
        }
    }

    private validarTipoMovimento(value: TipoMovimento): void {
        if (!Object.values(TipoMovimento).includes(value)) {
            throw new TypeError('O tipo de movimento deve ser ENTRADA ou SAIDA.');
        }
    }

    private validarIdLote(value: number): void {
        if (!Number.isInteger(value)) {
            throw new TypeError('O id do lote deve ser um numero inteiro.');
        }

        if (value <= 0) {
            throw new TypeError('O id do lote deve ser um numero valido maior que zero.');
        }
    }

    private validarIdProduto(value: number): void {
        if (!Number.isInteger(value)) {
            throw new TypeError('O id do produto deve ser um numero inteiro.');
        }

        if (value <= 0) {
            throw new TypeError('O id do produto deve ser um numero valido maior que zero.');
        }
    }
}
