"use strict";
// import { Estoque } from "../model/Estoque";
// import { EstoqueRepository } from "../repository/EstoqueRepository";
// import { LivroService } from "./LivroService";
// export class EstoqueService{
//     private static instance : EstoqueService;
//     private EstoqueRepository:EstoqueRepository= EstoqueRepository.getInstance();
//     private livroService = LivroService.getInstance();
//     private constructor() {}
//     public static getInstance(): EstoqueService {
//         if (!this.instance) {
//             this.instance = new EstoqueService();
//         }
//         return this.instance;
//     }
//     VerificaExemplar(id:number):boolean{
//         if(this.EstoqueRepository.ExisteEstoqueId(id)){
//             return true;
//         }
//         throw new Error("Já existe um livro com este ID");
//     }
//     VerificaExemplarDisponivel(id:number):boolean{
//         const exemplar = this.EstoqueRepository.ExibeExemplarPorId(id);
//         if(!exemplar){
//             throw new Error("Exemplar não encontrado");
//             }
//         exemplar.disponivel = exemplar.quantidade_emprestada < exemplar.quantidade;    
//         if(exemplar.disponivel!==true){
//             throw new Error("Livro Indisponível");
//         }
//         return true;
//     }
//     InsereNovoExemplar(data:any):Estoque{
//         const{id, livro_id,isbn, quantidade
//             } = data;
//         if(!livro_id||!isbn){
//             throw new Error("Informações Incompletas");
//         }
//         this.VerificaExemplar(id);
//         const livroExistente = this.livroService.GetLivrosPorISBN(isbn);
//         if(!livroExistente){
//             throw new Error("ISBN inexistente")
//         }
//         const estoqueExistente = this.EstoqueRepository.ExibeExemplares()
//         .find(e => e.livro_id === livro_id);
//         if (estoqueExistente) {
//             estoqueExistente.quantidade += quantidade;
//             this.EstoqueRepository.AtualizaDisponibilidadePorId(estoqueExistente.id, estoqueExistente);
//         return estoqueExistente;
//     }
//         const novoExemplar = new Estoque(id,livro_id,quantidade,0,true);
//         this.EstoqueRepository.InsereExemplar(novoExemplar);
//         console.log("Exemplar salvo", novoExemplar);
//         return novoExemplar;
//     }
//     GetExemplarComDisponibilidade():Estoque[]{
//         return this.EstoqueRepository.ExibeExemplares()
//         .filter(e => e.disponivel === true && e.quantidade > e.quantidade_emprestada);
//     }
//     GetExemplarPorID(id:number):Estoque{
//         const listar = this.EstoqueRepository.ExibeExemplarPorId(id);
//         if(!listar){
//             throw new Error("Id não encontrado")
//         }
//         return listar;
//     }
//     PutDisponibilidade(id:number, emprestimo:boolean){
//         const exemplar = this.EstoqueRepository.ExibeExemplarPorId(id);
//         if(!exemplar){
//             throw new Error ("Exemplar não encontrado")
//         }
//         if(emprestimo){// se estiver emprestando
//             if (exemplar.quantidade <= exemplar.quantidade_emprestada) {
//                 throw new Error("Não há exemplares disponíveis para empréstimo");
//             }
//         exemplar.quantidade_emprestada++;
//         } else { // se estiver devolvendo
//                 if (exemplar.quantidade_emprestada > 0) {
//                     exemplar.quantidade_emprestada--;
//                 }
//         }
//         exemplar.disponivel = exemplar.quantidade > exemplar.quantidade_emprestada;
//         this.EstoqueRepository.AtualizaDisponibilidadePorId(id, exemplar);
//     }
//     DeleteExemplarPorId(id:number):boolean{
//         const deletar = this.EstoqueRepository.RemoveExemplarPorId(id);
//         if(deletar==false){
//             throw new Error ("Exemplar não encontrado");
//         }
//         return deletar;
//     }
// }
