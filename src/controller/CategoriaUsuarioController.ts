import { CategoriaUsuarioService } from "../service/CategoriaUsuarioService";
import { Body,Controller,Delete,Get,Path,Post,Put,Query,Res,
    Route,Tags,TsoaResponse
 } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { CategoriaUsuario } from "../model/entidades/CategoriaUsuario";
@Route("catalogos/categorias-usuario")
@Tags("Categoria Usuário")

export class CategoriaUsuarioController extends Controller{
    categoriaUsuarioService = CategoriaUsuarioService.getInstance();

    @Get()
    async ListarTodasCategorias(
        @Res()fail:TsoaResponse<400,BasicResponseDto>,
        @Res()success:TsoaResponse<200,BasicResponseDto>
    ):Promise<CategoriaUsuario[]>{
        try{
            return await this.categoriaUsuarioService.SelectTodasCategoriasUsuarios();
        }catch(error:any){
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }
}


