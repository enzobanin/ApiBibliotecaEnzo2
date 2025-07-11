export class Emprestimo{
    id:number;
    cpf_usuario:string;
    isbn_livro:string;
    data_emprestimo:Date;
    data_devolucao:Date;
    data_entrega:Date|null;
    dias_atraso:number;
    suspensao_ate:Date;
    
    constructor(id:number,
    cpf_usuario:string,
    isbn_livro:string,
    data_emprestimo:Date,
    data_devolucao:Date,
    data_entrega:Date|null,
    dias_atraso:number,
    suspensao_ate:Date){
        this.id = id;
        this.cpf_usuario = cpf_usuario;
        this.isbn_livro = isbn_livro;
        this.data_emprestimo = data_emprestimo;
        this.data_devolucao = data_devolucao;
        this.data_entrega = data_entrega;
        this.dias_atraso = dias_atraso;
        this.suspensao_ate = suspensao_ate;
    }
}