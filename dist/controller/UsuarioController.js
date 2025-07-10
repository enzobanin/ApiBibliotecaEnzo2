"use strict";
// import { Request, Response } from "express";
// import { UsuarioService } from "../service/UsuarioService";
// const usuarioService = UsuarioService.getInstance();
// export function InsereUsuario(req:Request, res:Response){
//     try{
//         const novoUsuario = usuarioService.InsereUsuario(req.body);
//         res.status(201).json({
//             mensagem:"Usuario adicionado!",
//             Usuario:novoUsuario
//         });
//     }catch(error:unknown){
//         let message:string = "Não foi possível cadastrar usuario"
//         if(error instanceof Error){
//             message = error.message;
//         }
//          res.status(400).json({ status: "Erro", message })
//     }
// }
// export function MostrarTodosOsUsuarios(req:Request, res:Response):void{
//     try{
//         res.status(200).json(usuarioService.GetTodosUsuarios());
//     }catch(e:unknown){
//         res.status(400).json({status:"Operação Invalida",
//             message:(e as Error).message})
//     }
// }
// export function MostraUsuarioPorCPF(req:Request,res:Response):void{
//     try{
//         let cpf = req.params.cpf;
//         if (typeof cpf !== 'string' || cpf.trim() === '') {
//             res.status(400).json({ status: "Erro", message: "Título Inválido" });
//             return;
//         }
//         res.status(200).json(usuarioService.GetUsuarioPorCpf(cpf));
//     }catch(e:unknown){
//         res.status(400).json({status:"Erro interno",
//             message:(e as Error).message})
//     }
// }
// export function AtualizaUsuarioPorCPF(req:Request, res:Response):void{
//     try{
//         const cpf = req.params.cpf;
//         if (typeof cpf !== 'string' || cpf.trim() === '') {
//             res.status(400).json({ status: "Erro", message: "CPF Inválido" });
//             return;
//         }
//         const usuarioAtualizado = usuarioService.PutUsuario(cpf,req.body);
//         res.status(200).json(usuarioAtualizado);
//     }catch(e:unknown){
//         res.status(400).json({status:"Erro interno",
//             message:(e as Error).message})
//     }
// }
// export function DeletaUsuarioPorCPF(req:Request, res:Response):void{
//     try{
//         const cpf = req.params.cpf;
//         if (typeof cpf !== 'string' || cpf.trim() === '') {
//             res.status(400).json({ status: "Erro", message: "CPF Inválido" });
//             return;
//         }
//         const resultado = usuarioService.DeleteUsuarioPorCpf(cpf);
//         res.status(200).json({
//             status:"Deletado com sucesso",
//             deletado : resultado
//         });
//     }catch(e:unknown){
//         res.status(400).json({status:"Erro interno",
//             message:(e as Error).message})
//     }
// }
