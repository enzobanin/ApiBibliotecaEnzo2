import { CategoriaUsuarioService } from "../service/CategoriaUsuarioService";
import { Body,Controller,Delete,Get,Path,Post,Put,Query,Res,
    Route,Tags,TsoaResponse
 } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { CategoriaLivro } from "../model/entidades/CategoriaLivro";
@Route("catalogos/categorias_usuario")
@Tags("Categoria Usuário")
export class CategoriaUsuarioController extends Controller{
    categoriaUsuarioService = CategoriaUsuarioService.getInstance();

    @Get()
    async ListarTodasCategorias(
        @Res()fail:TsoaResponse<400,BasicResponseDto>,
        @Res()success:TsoaResponse<200,BasicResponseDto>
    ):Promise<CategoriaLivro[]>{
        try{
            return await this.categoriaUsuarioService.SelectTodasCategoriasUsuarios();
        }catch(error:any){
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }
}



// export function ListaTodosCategoriasUsuario(req:Request, res:Response){
//     try{
//         res.status(200).json(categoriaUsuarioService.ListaCategoriaUsuario());
//     }catch(e:unknown){
//         res.status(400).json({status:"Error",
//             message:(e as Error).message
//         })
//     }
// }