import { LivroDto } from "../model/dto/LivroDto";
import { Livro } from "../model/entidades/Livro";
import { LivroRepository } from "../repository/LivroRepository";
import { CategoriaLivroService } from "./CategoriaLivroService";
import { EstoqueService } from "./EstoqueService";

export class LivroService{
    private static instance : LivroService;
    private livroRepository = LivroRepository.getInstance();
    private categoriaLivroService = CategoriaLivroService.getInstance();
    private estoqueService(){
        return EstoqueService.getInstance();
    } 

    private constructor() {}

    static getInstance(){
        if (!this.instance) {
            this.instance = new LivroService();
        }
        return this.instance;
    }
    
    // VerificaCategoria(categoria_id:number):void{
    //     const categoria = this.CategoriaLivroRepository.ListaCategoriaPorId(categoria_id);
    //     if(!categoria){
    //         throw new Error("ID da categoria não encontrada");
    //     }
    //     return;
    // }

    async VerificaCategoria(categoria_id:number):Promise<void>{
        this.categoriaLivroService.SelectCategoriaLivroPorId(categoria_id);
    }

    async InsertLivro(data:any):Promise<Livro>{
        const{titulo, autor, editora, edicao,isbn, categoria_id} = data;
        if(!titulo||!autor||!editora||!edicao||!isbn||!categoria_id){
            throw new Error("Informações Incompletas");
        }
        await this.VerificaCategoria(categoria_id);
        const isbnRepetido = await this.livroRepository.SelectLivroPorISBN(isbn);
        if(isbnRepetido){
            throw new Error("Já existe um livro com este ISBN")
        }
        const combinacao = await this.livroRepository.ExisteCombinacaoAutEditEdic(autor,editora,edicao);
        if(combinacao){
            throw new Error("Já existe um livro com esta combinação");
        }
        return this.livroRepository.InsertLivro(titulo, autor,editora,edicao,
            isbn, categoria_id);
    }
    // CadastrarLivro(data:any):Livro{
    //     const{id,titulo, autor, editora, edicao,isbn, categoria_id} = data;
    //     if(!titulo||!autor||!editora||!edicao||!isbn||!categoria_id){
    //         throw new Error("Informações Incompletas");
    //     }
    //     this.VerificaCategoria(categoria_id); //verifica se a categoria inserida é valida
    //     if(this.livroRepository.BuscaLivroPorISBN(isbn)){ // vai verificar se ja existe livro com este isbn
    //         throw new Error("Já existe um livro com este ISBN");
    //     }
    //     if(this.livroRepository.BuscaLivroPorId(id)){ // vai verificar se o já existe livro com este id
    //         throw new Error("Já existe um livro com este ID");
    //     }
    //     if (this.livroRepository.ExisteLivroCombinacao(autor, editora, edicao)) {
    //         throw new Error("Já existe um livro com esta combinação de autor, editora e edição");
    //     }
    //     const NovoLivro = new Livro(id,titulo, autor, editora, edicao, isbn,categoria_id);
    //     this.livroRepository.InsereLivro(NovoLivro);
    //     return NovoLivro;
    // }

    async SelectLivrosFiltrados(filtros:{
        titulo?:string;
        autor?:string;
        editora?:string;
        categoria_id?:number; 
    }):Promise<Livro[]>{
        return await this.livroRepository.SelectLivroFiltros(filtros);
    }
    // ListaLivrosFiltrados(query: {titulo?: string; autor?: string;
    // editora?: string; categoria_id?: number;}): Livro[] {
    //     return this.livroRepository.FiltrarLivros(query);
    // }
    async SelectLivroPorISBN(isbn:string):Promise<Livro|boolean>{
        const livro = await this.livroRepository.SelectLivroPorISBN(isbn);
        if(!livro){
            throw new Error("Livro com este ISBN não encontrado");
        }
        return livro;
    }
    // ListaLivrosPorISBN(isbn:string):Livro{
    //     const livro = this.livroRepository.BuscaLivroPorISBN(isbn);
    //     if(!livro){
    //         throw new Error("Não existe livro com este ISBN");
    //     }
    //     return livro;
    // }
    async UpdateLivros(isbn:string, livroNovo:LivroDto):Promise<LivroDto>{
        const combinacao = await this.livroRepository.ExisteCombinacaoAutEditEdic(livroNovo?.autor,livroNovo?.editora,livroNovo?.edicao);
        if(combinacao){
            throw new Error("Já existe um livro com esta combinação");
        }
        const livro = await this.livroRepository.UpdateLivroPorISBN(isbn,livroNovo);
        if(!livro){
            throw new Error("Livro não encontrado");
        }
        return livro;
    }
    // AtualizaLivros(isbn:string, LivroAtualizado:Livro):Livro{
    //     const livro = this.livroRepository.AtualizaLivroPorISBN(isbn,LivroAtualizado);
    //     if(!livro){
    //         throw new Error("Não foi possível encontrar o isbn");
    //     }
    //     return LivroAtualizado;
    // }
    async DeleteLivroPorISBN(isbn:string):Promise<boolean>{ //lembrar de verificar a exceção do emp 
        //não pode deletar o livro se ele possuir exemplares
        const existeExemp = await this.estoqueService().VerificaExemplarExistente(isbn);
        if(existeExemp){
            throw new Error("Não será possível deletar o livro, pois há exemplar cadastrado")
        }
        const verificaIsbnExist = await this.livroRepository.SelectLivroPorISBN(isbn);
        if(!verificaIsbnExist){
            throw new Error("Não foi possível encontrar o livro com este ISBN");
        }
        const deleta = await this.livroRepository.DeleteLivroPorISBN(isbn);
        if(deleta){
            return true;
        }
        return false;

    }
    // DeleteLivroPorisbn(isbn:string):boolean{
    //     const livro = this.livroRepository.BuscaLivroPorISBN(isbn);
    //     if(!livro){
    //         throw new Error("isbn incorreto");
    //     }
    //     return this.livroRepository.DeletaLivroPorISBN(isbn);
    // }
    
}