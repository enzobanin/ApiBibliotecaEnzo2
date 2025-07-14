import { CategoriaLivroService } from "../service/CategoriaLivroService";
import { Body,Controller,Delete,Get,Path,Post,Put,Query,Res,
    Route,Tags,TsoaResponse
 } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { CategoriaLivro } from "../model/entidades/CategoriaLivro";
@Route("catalogos/categorias-livro")
@Tags("Categoria Livro")
export class CategoriaLivroController extends Controller{
    categoriaLivroService = CategoriaLivroService.getInstance();

    @Get()
    async ListarTodasCategorias(
        @Res() fail: TsoaResponse<400,BasicResponseDto>,
        @Res() success: TsoaResponse<200,BasicResponseDto>,
    ):Promise<CategoriaLivro[]>{
        try{
            return await this.categoriaLivroService.SelectTodasCategoriasLivros();
        }catch(error:any){
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }
}

