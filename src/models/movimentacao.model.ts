export class Movimentacao {
    private readonly _idMovimentacao?: number;
    private _tipoMovimento: string = '';
    private _quantidade: number = 0;
    private _idLote: number = 0;
    private _idProduto: number = 0;
    private readonly _dtMovimentacao?: Date;

    constructor(
        tipoMovimento: string,
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
        this._dtMovimentacao = dtMovimentacao;
    }

    public get IdMovimentacao(): number | undefined {
        return this._idMovimentacao;
    }

    public get TipoMovimento(): string {
        return this._tipoMovimento;
    }

    public get Quantidade(): number {
        return this._quantidade;
    }

    public get IdLote(): number {
        return this._idLote;
    }

    public get IdProduto(): number {
        return this._idProduto;
    }

    public get DtMovimentacao(): Date | undefined {
        return this._dtMovimentacao;
    }

    public set TipoMovimento(value: string) {
        this._validarTipoMovimento(value);
        this._tipoMovimento = value;
    }

    public set Quantidade(value: number) {
        this._validarQuantidade(value);
        this._quantidade = value;
    }

    public set IdLote(value: number) {
        this._validarIdLote(value);
        this._idLote = value;
    }

    public set IdProduto(value: number) {
        this._validarIdProduto(value);
        this._idProduto = value;
    }

    public static adicionar(
        tipoMovimento: string,
        quantidade: number,
        idLote: number,
        idProduto: number
    ): Movimentacao {
        return new Movimentacao(tipoMovimento, quantidade, idLote, idProduto);
    }

    public static editar(
        tipoMovimento: string,
        quantidade: number,
        idLote: number,
        idProduto: number,
        idMovimentacao: number
    ): Movimentacao {
        return new Movimentacao(tipoMovimento, quantidade, idLote, idProduto, idMovimentacao);
    }

    private _validarTipoMovimento(value: string): void {
        if (typeof value !== 'string') {
            throw new TypeError('O tipo de movimento deve ser um texto(string).');
        }
        if (value !== 'ENTRADA' && value !== 'SAIDA') {
            throw new TypeError('O tipo de movimento deve ser ENTRADA ou SAIDA.');
        }
    }

    private _validarQuantidade(value: number): void {
        if (typeof value !== 'number') {
            throw new TypeError('A quantidade deve ser um número.');
        }
        if (value <= 0) {
            throw new TypeError('A quantidade deve ser maior que zero.');
        }
    }

    private _validarIdLote(value: number): void {
        if (typeof value !== 'number') {
            throw new TypeError('O id do lote deve ser um número.');
        }
        if (value <= 0) {
            throw new TypeError('O id do lote deve ser um número válido maior que zero.');
        }
    }

    private _validarIdProduto(value: number): void {
        if (typeof value !== 'number') {
            throw new TypeError('O id do produto deve ser um número.');
        }
        if (value <= 0) {
            throw new TypeError('O id do produto deve ser um número válido maior que zero.');
        }
    }
}
