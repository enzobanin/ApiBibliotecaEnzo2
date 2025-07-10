"use strict";
// import { Usuario } from "../model/Usuario";
// export class UsuarioRepository{
//     private static instance : UsuarioRepository;
//     private UsuarioLista: Usuario[] = [];
//     private constructor(){}
//     public static getInstance():UsuarioRepository{
//         if(!this.instance){
//             this.instance = new UsuarioRepository();
//         }
//         return this.instance;
//     }
//     InsereUsuario(usuario:Usuario):void{
//         this.UsuarioLista.push(usuario);
//     }
//     MostraTodosUsuarios():Usuario[]{
//         return this.UsuarioLista;
//     }
//     MostraUsuarioPorCPF(cpf:string):Usuario|undefined{
//         return this.UsuarioLista.find(u=>u.cpf===cpf);
//     }
//     AtualizaUsuarioPorCPF(cpf:string,usuarioNovo:Usuario):boolean{
//         const usuarioAntigo = this.UsuarioLista.find(u=>u.cpf===cpf);
//         if(usuarioAntigo){
//             usuarioAntigo.nome = usuarioNovo.nome;
//             usuarioAntigo.categoria_id = usuarioNovo.categoria_id;
//             usuarioAntigo.curso_id = usuarioNovo.curso_id;
//             usuarioAntigo.email = usuarioNovo.email;
//             return true;
//         }
//         return false;
//     }
//     DeletaUsuarioPorCPF(cpf:string):boolean{
//         const usuario = this.UsuarioLista.findIndex(u=>u.cpf === cpf)
//         if(usuario!==-1){
//             this.UsuarioLista.splice(usuario,1);
//             return true;
//         }
//         return false;
//     }
//     ValidaCpfExistente(cpf:string):boolean{
//         const repetido = this.UsuarioLista.findIndex(u=>u.cpf===cpf);
//         if(repetido!==-1){
//             return true;
//         }
//         return false;
//     }
//     UsuarioAtivo(cpf:string):boolean{
//         const ativo = this.UsuarioLista.find(u=>u.cpf === cpf);
//         if(ativo){
//             if(ativo.ativo === true){
//                 return true;
//             }
//         }else{
//            throw new Error("Usuario não encontrado");
//         }
//         return false;
//     }
//     BuscaUsuarioPorId(id:number):Usuario{
//         const usuario = this.UsuarioLista.find(u=>u.id===id);
//         if(!usuario){
//             throw new Error("Usuário não encontrado");
//         }
//         return usuario;
//     }
// }
