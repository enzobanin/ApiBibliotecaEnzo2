"use strict";
// import { Emprestimo } from "../model/Emprestimo";
// export class EmprestimoRepository{
//     private static instance: EmprestimoRepository;
//     private EmprestimoLista: Emprestimo[] = [];
//     private constructor(){}
//     public static getInstance():EmprestimoRepository{
//         if(!this.instance){
//             this.instance = new EmprestimoRepository();
//         }
//         return this.instance;
//     }
//     RegistraEmprestimo(emp:Emprestimo):void{
//         this.EmprestimoLista.push(emp);
//     }
//     MostraTodosOsEmprestimos():Emprestimo[]{
//         return this.EmprestimoLista;
//     }
//     RegistraDevolucao(id:number):boolean{
//         const devolucao = this.EmprestimoLista.find(e=>e.id === id);
//         const hoje : Date = new Date();
//         if(devolucao){
//             devolucao.data_devolucao = hoje; 
//             return true;
//         }
//         return false;
//     }
//     VerificaEmprestimosAtivosUsuarios(id:number):Emprestimo[]{
//         const data = new Date(0);
//         return this.EmprestimoLista.filter(e=>e.usuario_id === id
//             && e.data_devolucao.getTime() === data.getTime()
//          );
//     }
//     BuscaEmprestimoPorId(id:number):Emprestimo{
//         const emp = this.EmprestimoLista.find(e=>e.id === id);
//         if(!emp){
//             throw new Error("Emprestimo nao encontrado");
//         }
//         return emp;
//     }
//     BuscaEmprestimoPorUsuario(usuario_id:number):Emprestimo[]{
//         return this.EmprestimoLista.filter(e=>e.usuario_id === usuario_id);
//     }
//     ExisteEmprestimoAtivoPorLivro(livro_id: number): boolean {
//         return this.EmprestimoLista.some(e =>
//         e.estoque_id === livro_id && e.data_devolucao.getTime() === new Date(0).getTime()
//         );
//     }
// }
