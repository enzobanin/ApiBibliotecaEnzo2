export class Estoque{
    id: number;
    livro_isbn:number;
    quantidade:number;
    quantidade_emprestada:number;
    status:'disponivel'| 'emprestado';

    constructor(id: number,
    livro_isbn:number,
    quantidade:number,
    quantidade_emprestada:number){
        this.id = id;
        this.livro_isbn = livro_isbn;
        this.quantidade = quantidade;
        this.quantidade_emprestada = quantidade_emprestada;
        this.status = 'disponivel';
    }
}