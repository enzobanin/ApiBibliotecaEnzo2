"use strict";
// import { Livro } from "../model/Livro";
// export class LivroRepository{
//     private static instance: LivroRepository;
//     private LivroLista: Livro[] = [];
//     private constructor(){}
//     public static getInstance():LivroRepository{
//         if(!this.instance){
//             this.instance = new LivroRepository();
//         }
//         return this.instance;
//     }
//     InsereLivro(livro:Livro):void{
//         this.LivroLista.push(livro);
//     }
//     MostraLivroPorISBN(isbn:string):Livro|undefined{
//         return this.BuscaLivroPorISBN(isbn);
//     }
//     AtualizaLivroPorISBN(isbn: string, livroNovo:Livro):boolean{
//         const livroAntigo = this.BuscaLivroPorISBN(isbn);
//         if(livroAntigo){
//             livroAntigo.autor = livroNovo.autor;
//             livroAntigo.categoria_id = livroNovo.categoria_id;
//             livroAntigo.edicao = livroNovo.edicao;
//             livroAntigo.editora = livroNovo.editora;
//             livroAntigo.titulo = livroNovo.titulo;
//             return true;
//         }
//         return false;
//     }
//     DeletaLivroPorISBN(isbn:string):boolean{
//         const PosISBN = this.LivroLista.findIndex(l=>l.isbn===isbn);
//         if(PosISBN!==-1){
//             this.LivroLista.splice(PosISBN,1);
//             return true;
//         }
//         return false;
//     }
//     BuscaLivroPorISBN(isbn:string):Livro|undefined{
//         return this.LivroLista.find(l=>l.isbn===isbn);
//     }
//     BuscaLivroPorId(id:number):Livro{
//         const livro = this.LivroLista.find(l=>l.id === id);
//          if (!livro) {
//         throw new Error("Livro não encontrado");
//     }
//     return livro;
//     }
//     FiltrarLivros(query: {titulo?: string; autor?: string;
//     editora?: string; categoria_id?: number;}): Livro[] {
//     return this.LivroLista.filter((livro) => {
//       if (query.titulo && !livro.titulo.toLowerCase().includes(query.titulo.toLowerCase())) return false;
//       if (query.autor && !livro.autor.toLowerCase().includes(query.autor.toLowerCase())) return false;
//       if (query.editora && !livro.editora.toLowerCase().includes(query.editora.toLowerCase())) return false;
//       if (query.categoria_id && livro.categoria_id !== query.categoria_id) return false;
//       return true;
//     });
//   }
//   ExisteLivroCombinacao(autor: string, editora: string, edicao: string): boolean {
//     return this.LivroLista.some(
//         l => l.autor === autor && l.editora === editora && l.edicao === edicao
//     );
// }
// }
