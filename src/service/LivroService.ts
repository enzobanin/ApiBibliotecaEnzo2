import { Livro } from "../model/Livro";
import { LivroRepository } from "../repository/LivroRepository";

export class LivroService{
    private LivroRepository = LivroRepository.getInstance();

    CadastrarLivro(data:any):Livro{
        const{id,titulo, ISBN, autor, editora, edicao, categoria_id} = data;
        if(!titulo||!ISBN||!autor||!editora||!edicao||categoria_id){
            throw new Error("Informações Incompletas");
        }
        const NovoLivro = new Livro(id,titulo, ISBN, autor, editora, edicao, categoria_id);
        this.LivroRepository.InsereLivro(NovoLivro);
        return NovoLivro;
    }
    GetLivros():Livro[]{
        return this.LivroRepository.MostraTodosLivros();
    }
    GetLivrosPorIsbn(isbn:string):Livro|undefined{
        const mostrar = this.LivroRepository.MostraLivroPorISBN(isbn);
        if(!mostrar){
            throw new Error("ISBN incorreto");
        }
        return mostrar;
    }
    GetLivrosPorTitulo(titulo:string):Livro|undefined{
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
    PutLivros(isbn:string, LivroAtualizado:Livro):Livro|boolean{
        const atualiza = this.LivroRepository.AtualizaLivroPorISBN(isbn,LivroAtualizado);
        if(atualiza==false){
            throw new Error("Não foi possível encontrar o ISBN");
        }
        return atualiza;
    }
    DeleteLivroPorIsbn(isbn:string):boolean{
        const deletar = this.DeleteLivroPorIsbn(isbn);
        if(deletar==false){
            throw new Error("ISBN incorreto");
        }
        return deletar;
    }
}