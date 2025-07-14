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

