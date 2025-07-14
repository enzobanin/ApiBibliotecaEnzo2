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
   

    async SelectLivrosFiltrados(filtros:{
        titulo?:string;
        autor?:string;
        editora?:string;
        categoria_id?:number; 
    }):Promise<Livro[]>{
        return await this.livroRepository.SelectLivroFiltros(filtros);
    }
    
    async SelectLivroPorISBN(isbn:string):Promise<Livro>{
        const livro = await this.livroRepository.SelectLivroPorISBN(isbn);
        return livro;
    }
    
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
   
    async DeleteLivroPorISBN(isbn:string):Promise<boolean>{ 
        
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
    
    
}