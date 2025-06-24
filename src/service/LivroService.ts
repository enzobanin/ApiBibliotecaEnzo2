import { Livro } from "../model/Livro";
import { LivroRepository } from "../repository/LivroRepository";
import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepository";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";

export class LivroService{
    private static instance : LivroService;
    private LivroRepository = LivroRepository.getInstance();
    private CategoriaLivroRepository = CategoriaLivroRepository.getInstance();
    private EmprestimoRepository = EmprestimoRepository.getInstance();

    private constructor() {}

    public static getInstance(): LivroService {
        if (!this.instance) {
            this.instance = new LivroService();
        }
        return this.instance;
    }
    
    VerificaCategoria(categoria_id:number):void{
        const categoria = this.CategoriaLivroRepository.ListaCategoriaPorId(categoria_id);
        if(!categoria){
            throw new Error("ID da categoria não encontrada");
        }
        return;
    }

    CadastrarLivro(data:any):Livro{
        const{id,titulo, autor, editora, edicao,isbn, categoria_id} = data;
        if(!titulo||!autor||!editora||!edicao||!isbn||!categoria_id){
            throw new Error("Informações Incompletas");
        }
        this.VerificaCategoria(categoria_id); //verifica se a categoria inserida é valida
        if (this.LivroRepository.ExisteLivroCombinacao(autor, editora, edicao)) {
            throw new Error("Já existe um livro com esta combinação de autor, editora e edição");
        }
        const NovoLivro = new Livro(id,titulo, autor, editora, edicao, isbn,categoria_id);
        this.LivroRepository.InsereLivro(NovoLivro);
        return NovoLivro;
    }
    GetLivrosPorISBN(isbn:string):Livro{
        const mostrar = this.LivroRepository.MostraLivroPorISBN(isbn);
        if(!mostrar){
            throw new Error("isbn incorreto");
        }
        return mostrar;
    }
    PutLivros(isbn:string, LivroAtualizado:Livro):Livro{
        const atualiza = this.LivroRepository.AtualizaLivroPorISBN(isbn,LivroAtualizado);
        if(!atualiza){
            throw new Error("Não foi possível encontrar o isbn");
        }
        return LivroAtualizado;
    }
    DeleteLivroPorisbn(isbn:string):boolean{
        const livro = this.LivroRepository.BuscaLivroPorISBN(isbn);
        if(!livro){
            throw new Error("isbn incorreto");
        }
        const temEmprestimo = this.EmprestimoRepository.ExisteEmprestimoAtivoPorLivro(livro.id);
        if (temEmprestimo) {
            throw new Error("Este livro contém empréstimos ativos");
        }
        return this.LivroRepository.DeletaLivroPorISBN(isbn);
    }
    GetLivrosFiltrados(query: {titulo?: string; autor?: string;
    editora?: string; categoria_id?: number;}): Livro[] {
    return this.LivroRepository.FiltrarLivros(query);
    }
}