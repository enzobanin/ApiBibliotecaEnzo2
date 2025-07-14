import { EstoqueService } from "../service/EstoqueService";
import { Body,Controller,Delete,Get,Path,Post,Put,Query,Res,
    Route,Tags,TsoaResponse
 } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { EstoqueEntradaDto } from "../model/dto/EstoqueEntradaDto";
import { EstoqueSaidaDto } from "../model/dto/EstoqueSaidaDto";
@Route("estoque")
@Tags("Estoque")

export class EstoqueController extends Controller{
    estoqueService = EstoqueService.getInstance();

    @Post()
    async CadastrarExemplar(
    @Body()dto:EstoqueEntradaDto,
    @Res()fail:TsoaResponse<400,BasicResponseDto>,
    @Res()success:TsoaResponse<201,BasicResponseDto>
    ):Promise<void>{
        try{
            const exemplar = await this.estoqueService.InsertExemplar(dto);
            return success(201, new BasicResponseDto("Exemplar adicionado: ", exemplar));
        }catch(error:any){
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }
    @Get()
    async ListaExemplarDisponivel(
        @Res()fail:TsoaResponse<400,BasicResponseDto>,
        @Res()success:TsoaResponse<201,BasicResponseDto>,
    ):Promise<EstoqueSaidaDto[]>{
        try{
            return await this.estoqueService.ListaExemplarComDisponibilidae();
        }catch(error:any){
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }
    @Get("isbn") 
    async ListaExemplarPorISBN(
        @Res()fail:TsoaResponse<400,BasicResponseDto>,
        @Res()success:TsoaResponse<201,BasicResponseDto>,
        @Query()isbn:string
    ):Promise<EstoqueSaidaDto|boolean>{
        try{
            return await this.estoqueService.ListaExemplarPorISBN(isbn);
        }catch(error:any){
            return fail(400,new BasicResponseDto(error.message, undefined))
        }
    }
    @Put("isbn")
    async AtualizaExemplarPorISBN(
        @Res()fail:TsoaResponse<400,BasicResponseDto>,
        @Res()success:TsoaResponse<201,BasicResponseDto>,
        @Query()isbn:string,
        @Body()dto:EstoqueEntradaDto,
    ):Promise<EstoqueSaidaDto|boolean>{
        try{
            const exemplarAtualizado = await this.estoqueService.UpdateEstoque(isbn,dto);
            return success(201, new BasicResponseDto("Exemplar atualizado: ", exemplarAtualizado));
        }catch(error:any){
            return fail(400,new BasicResponseDto(error.message, undefined))
        }
    }
    @Delete("isbn")
    async DeletaExemplarPorISBN(
        @Res()fail:TsoaResponse<400,BasicResponseDto>,
        @Res()success:TsoaResponse<201,BasicResponseDto>,
        @Query()isbn:string,
    ):Promise<void>{
        try{
            const resultado = await this.estoqueService.DeleteExemplarPorISBN(isbn);
            if(resultado){
                return success(201, new BasicResponseDto("Exemplar deletado: ", resultado));
            }
        }catch(error:any){
            return fail(400,new BasicResponseDto(error.message, undefined))
        }
    }
}
