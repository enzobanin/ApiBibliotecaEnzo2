import { Livro } from "../model/Livro";
import { LivroRepository } from "../repository/LivroRepository";

export class LivroService{
    private static instance : LivroService;
    private LivroRepository = LivroRepository.getInstance();
    
    private constructor() {}

    public static getInstance(): LivroService {
        if (!this.instance) {
            this.instance = new LivroService();
        }
        return this.instance;
    }

    CadastrarLivro(data:any):Livro{
        const{id,titulo, autor, editora, edicao,isbn, categoria_id} = data;
        if(!titulo||!autor||!editora||!edicao||!isbn||!categoria_id){
            throw new Error("Informações Incompletas");
        }
        const NovoLivro = new Livro(id,titulo, autor, editora, edicao, isbn,categoria_id);
        this.LivroRepository.InsereLivro(NovoLivro);
        return NovoLivro;
    }
    GetLivros():Livro[]{
        return this.LivroRepository.MostraTodosLivros();
    }
    GetLivrosPorISBN(isbn:string):Livro{
        const mostrar = this.LivroRepository.MostraLivroPorISBN(isbn);
        if(!mostrar){
            throw new Error("isbn incorreto");
        }
        return mostrar;
    }
    GetLivrosPorTitulo(titulo:string):Livro{
        const Livro = this.LivroRepository.MostraLivroPorTitulo(titulo);
        if(!Livro){
            throw new Error("Livro não encontrado");
        }
        return Livro;
    }
    GetLivrosPorAutor(autor:string):Livro[]{
        const Autor = this.LivroRepository.MostraLivroPorAutor(autor);
        if(Autor.length===0){
            throw new Error("Autor não encontrado");
        }
        return Autor;
    }
    GetLivrosPorEditora(editora:string):Livro[]{
        const Editora = this.LivroRepository.MostraLivroPorAutor(editora);
        if(Editora.length===0){
            throw new Error("Editora não encontrada");
        }
        return Editora;
    }
    GetLivrosPorCategoria(categoria:number):Livro[]{
        const Categoria = this.LivroRepository.MostraLivroPorCategoria(categoria);
        if(Categoria.length===0){
            throw new Error("Categoria não encontrada");
        }
        return Categoria;
    }
    PutLivros(isbn:string, LivroAtualizado:Livro):Livro{
        const atualiza = this.LivroRepository.AtualizaLivroPorISBN(isbn,LivroAtualizado);
        if(!atualiza){
            throw new Error("Não foi possível encontrar o isbn");
        }
        return LivroAtualizado;
    }
    DeleteLivroPorisbn(isbn:string):boolean{
        const deletar = this.LivroRepository.DeletaLivroPorISBN(isbn);
        if(deletar==false){
            throw new Error("isbn incorreto");
        }
        return deletar;
    }
}