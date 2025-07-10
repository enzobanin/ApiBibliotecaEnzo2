"use strict";
// import { Usuario } from "../model/Usuario";
// import { UsuarioRepository } from "../repository/UsuarioRepository";
// import { CursoRepository } from "../repository/CursoRepository";
// import { CategoriaUsuarioRepository } from "../repository/CategoriaUsuarioRepository";
// export class UsuarioService{
//     private static instance : UsuarioService;
//     private UsuarioRepository = UsuarioRepository.getInstance();
//     private CursoRepository = CursoRepository.getInstance();
//     private CategoriaUsuarioRepository = CategoriaUsuarioRepository.getInstance();
//     private constructor() {}
//     public static getInstance(): UsuarioService {
//         if (!this.instance) {
//             this.instance = new UsuarioService();
//         }
//         return this.instance;
//     }
//     VerificaCurso(curso_id:number):void{
//         const curso = this.CursoRepository.ListaCursoPorId(curso_id);
//         if(!curso){
//             throw new Error("ID do curso não encontrado");
//         }
//         return;
//     }
//     VerificaCategoria(categoria_id:number):void{
//         const categoria = this.CategoriaUsuarioRepository.ListaCategoriaPorId(categoria_id);
//         if(!categoria){
//             throw new Error("ID da categoria não encontrada");
//         }
//         return;
//     }
//     VerificaCpfRepetido(cpf:string):void{
//         if(this.UsuarioRepository.ValidaCpfExistente(cpf)){
//             throw new Error("Já existe um usuario com este CPF");
//         }
//         return;
//     }
//     ValidaCpf(cpf:string):boolean{
//         if(cpf.length != 11){
//             throw new Error("CPF deve possuir 11 numeros");
//         }else {
//             const CpfN = cpf.split('').map(Number); // vai dividir a string em um array de caracteres
//                                                     // cada caractere vai ser convertido em numero
//             if(CpfN.every(n=>n == CpfN[0])){
//                 throw new Error("Este CPF é uma sequência de numeros repetidos");
//             }
//             const dig10 = this.ValidarOsDigitos(10,CpfN);
//             const copiaCpf = [...CpfN];
//             copiaCpf.push(dig10);
//             const dig11 = this.ValidarOsDigitos(11,copiaCpf);
//             if(dig10 == CpfN[9]&& dig11 == CpfN[10]){
//                 return true;
//             }else{
//                 throw new Error("CPF com dígitos de verificação errado");
//             }
//         } 
//     }
//     ValidarOsDigitos(num : number, CpfN: number[]):number{
//         let soma = 0;
//         for(let i = 0; i < num - 1 ; i++){
//             soma += CpfN[i] * (num-i);
//         }
//         const div = soma % 11;
//         if(div < 2){
//             return 0;
//         }
//         else{
//             return 11 - div;
//         }
//     }
//     InsereUsuario(data:any):Usuario{
//         const {id,nome,cpf,email,categoria_id,curso_id} = data;
//         if(!nome||!cpf||!email||!categoria_id||!curso_id){
//             throw new Error("Informações Incompletas");
//         }
//         this.VerificaCurso(curso_id);
//         this.VerificaCategoria(categoria_id);
//         this.ValidaCpf(cpf);
//         this.VerificaCpfRepetido(cpf);
//         const novoUsuario = new Usuario(id, nome, cpf,email,true,
//             categoria_id,curso_id)
//         this.UsuarioRepository.InsereUsuario(novoUsuario);
//         return novoUsuario;
//     }
//     GetTodosUsuarios():Usuario[]{
//         return this.UsuarioRepository.MostraTodosUsuarios();
//     }
//     GetUsuarioPorCpf(cpf:string):Usuario{
//         const valido = this.UsuarioRepository.MostraUsuarioPorCPF(cpf);
//         if(!valido){
//             throw new Error("Usuario com este CPF nao encontrado");
//         }
//         return valido;
//     }
//     PutUsuario(cpf:string, usuarioNovo:Usuario):Usuario{
//         const atualiza = this.UsuarioRepository.AtualizaUsuarioPorCPF(cpf,usuarioNovo);
//         if(!atualiza){
//             throw new Error("Usuario com este CPF nao encontrado");
//         }
//         return usuarioNovo;
//     }
//     DeleteUsuarioPorCpf(cpf:string){
//         const deleta = this.UsuarioRepository.DeletaUsuarioPorCPF(cpf);
//         if(!deleta){
//             throw new Error("Usuario com este CPF nao encontrado");
//         }
//         return deleta;
//     }
// }
