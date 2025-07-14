import { LivroService } from "../service/LivroService";
import { Body,Controller,Delete,Get,Path,Post,Put,Query,Res,
    Route,Tags,TsoaResponse
 } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { Livro } from "../model/entidades/Livro";
import { LivroDto } from "../model/dto/LivroDto";
@Route("livros")
@Tags("Livros")


export class LivroController extends Controller{
    livroService = LivroService.getInstance();

    @Post()
    async CadastrarLivro(
    @Body()dto:LivroDto,
    @Res()fail:TsoaResponse<400,BasicResponseDto>,
    @Res()success:TsoaResponse<201,BasicResponseDto>
    ): Promise<void>{
        try{
            const livro = await this.livroService.InsertLivro(dto);
            return success(201, new BasicResponseDto("Livro adicionado: ", livro));
        }catch(error:any){
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }
    @Get()
    async ListaTodosLivros(
        @Res()fail:TsoaResponse<400,BasicResponseDto>,
        @Res()success:TsoaResponse<201,BasicResponseDto>,
        @Query()titulo?:string, 
        @Query()autor?:string, 
        @Query()editora?:string, 
        @Query()categoria_id?:number 
    ):Promise<Livro[]>{
        try{
            const query = {
            titulo,
            autor,
            editora,
            categoria_id: categoria_id ? Number(categoria_id):undefined,
            };
            return await this.livroService.SelectLivrosFiltrados(query)
        }catch(error:any){
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }
    @Get("isbn")
    async ListaLivroPorISBN(
        @Res()fail:TsoaResponse<400,BasicResponseDto>,
        @Res()success:TsoaResponse<201,BasicResponseDto>,
        @Query()isbn:string
    ):Promise<Livro|boolean>{
        try{
            return await this.livroService.SelectLivroPorISBN(isbn);
        }catch(error:any){
            return fail(400,new BasicResponseDto(error.message, undefined))
        }
    }
    @Put("isbn")
    async AtualizaLivroPorISBN(
        @Res()fail:TsoaResponse<400,BasicResponseDto>,
        @Res()success:TsoaResponse<201,BasicResponseDto>,
        @Query()isbn:string,
        @Body()dto:LivroDto,
    ):Promise<Livro|boolean>{
        try{
            const livroAtualizado = await this.livroService.UpdateLivros(isbn,dto);
            return success(201, new BasicResponseDto("Livro atualizado: ", livroAtualizado))
        }catch(error:any){
            return fail(400,new BasicResponseDto(error.message, undefined))
        }
    }
    @Delete("isbn")
    async DeletaLivroPorISBN(
        @Res()fail:TsoaResponse<400,BasicResponseDto>,
        @Res()success:TsoaResponse<201,BasicResponseDto>,
        @Query()isbn:string,
    ):Promise<void>{
        try{
            const resultado = await this.livroService.DeleteLivroPorISBN(isbn);
            if(resultado){
                return success(201, new BasicResponseDto("Livro deletado: ", resultado));
            }
        }catch(error:any){
            return fail(400,new BasicResponseDto(error.message, undefined))
        }
    }
}

