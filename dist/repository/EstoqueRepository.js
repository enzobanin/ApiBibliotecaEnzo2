"use strict";
// import { Estoque } from "../model/entidades/Estoque";
// export class EstoqueRepository{
//     private static instance:EstoqueRepository;
//     private EstoqueLista : Estoque[] = [];
//     private constructor(){}
//     public static getInstance():EstoqueRepository{
//         if(!this.instance){
//             this.instance = new EstoqueRepository();
//         }
//         return this.instance;
//     }
//     InsereExemplar(exemplar:Estoque):void{ 
//         this.EstoqueLista.push(exemplar);
//     }
//     ExibeExemplares():Estoque[]{ 
//         return this.EstoqueLista.filter(e => e.status === 'disponivel');
//     }
//     ExibeExemplarPorISBN(isbn:string):Estoque|undefined{
//         const exemplar = this.EstoqueLista.find(e=>e.livro_isbn === isbn);
//         if(exemplar){
//             return exemplar;
//         }
//         return;
//     }
//     AtualizaDisponibilidadePorISBN(isbn:string,ExemplarNovo:Estoque):Estoque|undefined{
//         const ExemplarAtual = this.EstoqueLista.find(e=>e.livro_isbn===isbn);
//         if(ExemplarAtual){
//             ExemplarAtual.quantidade = ExemplarNovo.quantidade;
//             if(ExemplarNovo.quantidade < ExemplarNovo.quantidade_emprestada){
//                 throw new Error("Quantidade emprestada não pode ser maior que a quantidade total");
//             }
//             ExemplarAtual.quantidade_emprestada = ExemplarNovo.quantidade_emprestada;
//             if(ExemplarAtual.quantidade === ExemplarAtual.quantidade_emprestada){
//                 ExemplarAtual.status = 'emprestado';
//             }
//             else{
//                 ExemplarAtual.status = 'disponivel';
//             }
//             return ExemplarAtual;
//         }
//         return;
//     }
//     RemoveExemplarPorISBN(isbn:string):Estoque|undefined{
//         const deletar = this.EstoqueLista.find(e=>e.livro_isbn===isbn);
//         if(deletar){
//             if(deletar.quantidade_emprestada > 0){
//                 throw new Error("Exemplar não pode ser deletado, pois está emprestado");
//             }
//             return deletar;
//         }
//     }
// }
