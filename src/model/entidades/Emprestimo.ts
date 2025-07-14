export class Emprestimo{
    id:number;
    cpf_usuario:string;
    isbn_livro:string;
    data_emprestimo:Date|null;
    data_devolucao:Date|null;
    data_entrega:Date|null;
    dias_atraso:number;
    suspensao_ate:Date|null;
    
    constructor(id?:number,
    cpf_usuario?:string,
    isbn_livro?:string,
    data_emprestimo?:Date|null,
    data_devolucao?:Date|null,
    data_entrega?:Date|null,
    dias_atraso?:number,
    suspensao_ate?:Date|null){
        this.id = id||0;
        this.cpf_usuario = cpf_usuario||'';
        this.isbn_livro = isbn_livro||'';
        this.data_emprestimo = data_emprestimo||null;
        this.data_devolucao = data_devolucao||null;
        this.data_entrega = data_entrega||null;
        this.dias_atraso = dias_atraso||0;
        this.suspensao_ate = suspensao_ate||null;
    }
}