export class UsuarioDto{
    nome:string;
    cpf:string;
    email:string;
    categoria_id:number;
    curso_id:number;

    constructor(
    nome?:string,
    cpf?:string,
    email?:string,
    categoria_id?:number,
    curso_id?:number){
        this.nome = nome||'';
        this.cpf = cpf||'';
        this.email = email||'';
        this.categoria_id = categoria_id||0;
        this.curso_id = curso_id||0;
    }
}