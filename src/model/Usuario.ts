export class Usuario{
    id:number;
    nome:string;
    cpf:string;
    email:string;
    ativo:'ativo' | 'inativo'|'suspenso';
    categoria_id:number;
    curso_id:number;

    constructor(id:number,
    nome:string,
    cpf:string,
    email:string,
    categoria_id:number,
    curso_id:number){
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.ativo = 'ativo';
        this.categoria_id = categoria_id;
        this.curso_id = curso_id;
    }
}