export class LivroDto{
    titulo:string;
    autor:string;
    editora:string;
    edicao:string;
    isbn:string;
    categoria_id:number;

    constructor(
    titulo?:string,
    autor?:string,
    editora?:string,
    edicao?:string,
    isbn?:string,
    categoria_id?:number){
        this.titulo = titulo||'';
        this.autor = autor||'';
        this.editora = editora||'';
        this.edicao = edicao||'';
        this.isbn = isbn||'';
        this.categoria_id = categoria_id||0;
    }
}