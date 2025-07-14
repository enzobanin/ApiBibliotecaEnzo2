export class EmprestimoEntradaDto{
    cpf_usuario:string;
    isbn_livro:string;
    constructor(
    cpf_usuario?:string,
    isbn_livro?:string
    ){
        this.cpf_usuario = cpf_usuario||'';
        this.isbn_livro = isbn_livro||'';
    }
}