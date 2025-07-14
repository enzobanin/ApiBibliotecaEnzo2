import { UsuarioService } from "../service/UsuarioService";
import { Body,Controller,Delete,Get,Path,Post,Put,Query,Res,
    Route,Tags,TsoaResponse
 } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { Usuario } from "../model/entidades/Usuario"; 
import { UsuarioDto } from "../model/dto/UsuarioDto";

@Route("usuarios")
@Tags("Usuários")

export class UsuarioController extends Controller{
    usuarioService = UsuarioService.getInstance();

    @Post()
    async CadastrarUsuario(
        @Body()dto:UsuarioDto,
        @Res()fail:TsoaResponse<400,BasicResponseDto>,
        @Res()success:TsoaResponse<201,BasicResponseDto>
    ):Promise<void>{
      try{
            const usuario = await this.usuarioService.InsereUsuario(dto);
            return success(201, new BasicResponseDto("Usuário adicionado: ", usuario));
        }catch(error:any){
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    } 
    @Get()
    async ListaTodosUsuarios(
        @Res()fail:TsoaResponse<400,BasicResponseDto>,
        @Res()success:TsoaResponse<201,BasicResponseDto>,
        @Query()nome?:string, 
        @Query()ativo?:'ativo'|'inativo'|'suspenso', 
        @Query()categoria_id?:number, 
        @Query()curso_id?:number 
    ):Promise<Usuario[]>{
        try{
           const query = {
            nome,
            ativo,
            categoria_id: categoria_id ? Number(categoria_id):undefined,
            curso_id: curso_id ? Number(curso_id):undefined,
            }; 
            return await this.usuarioService.SelectUsuariosFiltros(query);
        }catch(error:any){
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }
   @Get("cpf")
    async ListaUsuarioPorCPF(
        @Res()fail:TsoaResponse<400,BasicResponseDto>,
        @Res()success:TsoaResponse<201,BasicResponseDto>,
        @Query()cpf:string
    ):Promise<Usuario|boolean>{
        try{
            return await this.usuarioService.SelectUsuarioPorCPF(cpf);
        }catch(error:any){
            return fail(400,new BasicResponseDto(error.message, undefined))
        }
    } 
    @Put("cpf")
    async AtualizaUsuarioPorCpf(
        @Res()fail:TsoaResponse<400,BasicResponseDto>,
        @Res()success:TsoaResponse<201,BasicResponseDto>,
        @Query()cpf:string,
        @Body()dto:UsuarioDto,
    ):Promise<Usuario|boolean>{
        try{
            const usuarioAtualizado = await this.usuarioService.UpdateUsuarioPorCPF(cpf,dto);
            return success(201, new BasicResponseDto("Usuário atualizado: ", usuarioAtualizado))
        }catch(error:any){
            return fail(400,new BasicResponseDto(error.message, undefined))
        }
    }
    @Delete("cpf")
    async DeletaUsuarioPorCPF(
        @Res()fail:TsoaResponse<400,BasicResponseDto>,
        @Res()success:TsoaResponse<201,BasicResponseDto>,
        @Query()cpf:string,
    ):Promise<void>{
        try{
            const resultado = await this.usuarioService.DeleteUsuarioPorCPF(cpf);
            if(resultado){
                return success(201, new BasicResponseDto("Usuário deletado: ", resultado));
            }
        }catch(error:any){
            return fail(400,new BasicResponseDto(error.message, undefined))
        }
    } 
}



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

