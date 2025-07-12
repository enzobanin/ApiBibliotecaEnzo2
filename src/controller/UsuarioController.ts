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
//     const { nome, ativo, categoria_id, curso_id } = req.query;
//     const validarOpcoes = ['ativo', 'inativo', 'suspenso'] as const;
//     const query = {
//         nome: typeof nome === "string" ? nome : undefined,
//         ativo: typeof ativo === "string" && validarOpcoes.includes(ativo as any) 
//         ? ativo as 'ativo' | 'inativo' | 'suspenso' : undefined,
//         categoria_id: categoria_id ? parseInt(categoria_id as string) : undefined,
//         curso_id: curso_id ? parseInt(curso_id as string) : undefined,
//     };
//     const usuario = usuarioService.ListaTodosUsuarios(query);
//         res.status(200).json(usuario);
//     }catch(e:unknown){
//         res.status(400).json({status:"Operação Invalida",
//             message:(e as Error).message})
//     }
// }

// export function MostraUsuarioPorCPF(req:Request,res:Response):void{
//     try{
//         let cpf = req.params.cpf;
//         if (typeof cpf !== 'string' || cpf.trim() === '') {
//             res.status(400).json({ status: "Erro", message: "CPF Inválido" });
//             return;
//         }
//         res.status(200).json(usuarioService.ListaUsuarioPorCpf(cpf));
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
//         const usuarioAtualizado = usuarioService.AtualizaUsuario(cpf,req.body);
//         res.status(200).json({
//             status: "Usuario atualizado com sucesso",
//             Usuario: usuarioAtualizado
//         });
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

