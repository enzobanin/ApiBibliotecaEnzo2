// import { Livro } from "../model/entidades/Livro";
// import { LivroRepository } from "../repository/LivroRepository";
// import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepository";

// export class LivroService{
//     private static instance : LivroService;
//     private livroRepository = LivroRepository.getInstance();
//     private CategoriaLivroRepository = CategoriaLivroRepository.getInstance();

//     private constructor() {}

//     public static getInstance(): LivroService {
//         if (!this.instance) {
//             this.instance = new LivroService();
//         }
//         return this.instance;
//     }
    
//     VerificaCategoria(categoria_id:number):void{
//         const categoria = this.CategoriaLivroRepository.ListaCategoriaPorId(categoria_id);
//         if(!categoria){
//             throw new Error("ID da categoria não encontrada");
//         }
//         return;
//     }

//     CadastrarLivro(data:any):Livro{
//         const{id,titulo, autor, editora, edicao,isbn, categoria_id} = data;
//         if(!titulo||!autor||!editora||!edicao||!isbn||!categoria_id){
//             throw new Error("Informações Incompletas");
//         }
//         this.VerificaCategoria(categoria_id); //verifica se a categoria inserida é valida
//         if(this.livroRepository.BuscaLivroPorISBN(isbn)){ // vai verificar se ja existe livro com este isbn
//             throw new Error("Já existe um livro com este ISBN");
//         }
//         if(this.livroRepository.BuscaLivroPorId(id)){ // vai verificar se o já existe livro com este id
//             throw new Error("Já existe um livro com este ID");
//         }
//         if (this.livroRepository.ExisteLivroCombinacao(autor, editora, edicao)) {
//             throw new Error("Já existe um livro com esta combinação de autor, editora e edição");
//         }
//         const NovoLivro = new Livro(id,titulo, autor, editora, edicao, isbn,categoria_id);
//         this.livroRepository.InsereLivro(NovoLivro);
//         return NovoLivro;
//     }
//     ListaLivrosFiltrados(query: {titulo?: string; autor?: string;
//     editora?: string; categoria_id?: number;}): Livro[] {
//         return this.livroRepository.FiltrarLivros(query);
//     }
//     ListaLivrosPorISBN(isbn:string):Livro{
//         const livro = this.livroRepository.BuscaLivroPorISBN(isbn);
//         if(!livro){
//             throw new Error("Não existe livro com este ISBN");
//         }
//         return livro;
//     }
//     AtualizaLivros(isbn:string, LivroAtualizado:Livro):Livro{
//         const livro = this.livroRepository.AtualizaLivroPorISBN(isbn,LivroAtualizado);
//         if(!livro){
//             throw new Error("Não foi possível encontrar o isbn");
//         }
//         return LivroAtualizado;
//     }
//     DeleteLivroPorisbn(isbn:string):boolean{
//         const livro = this.livroRepository.BuscaLivroPorISBN(isbn);
//         if(!livro){
//             throw new Error("isbn incorreto");
//         }
//         return this.livroRepository.DeletaLivroPorISBN(isbn);
//     }
    
// }