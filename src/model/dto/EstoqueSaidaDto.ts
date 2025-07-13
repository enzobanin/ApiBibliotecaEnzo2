export class EstoqueSaidaDto{
    livro_isbn:string;
    quantidade:number;
    quantidade_emprestada:number;
    status:'disponivel'| 'emprestado';

    constructor(
    livro_isbn?:string,
    quantidade?:number,
    quantidade_emprestada?:number,
    status?:'disponivel'|'emprestado'){
        this.livro_isbn = livro_isbn||'';
        this.quantidade = quantidade||0;
        this.quantidade_emprestada = quantidade_emprestada||0;
        this.status = 'disponivel';
    }
}