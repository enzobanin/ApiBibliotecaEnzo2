import { EmprestimoService } from "../service/EmprestimoService";
import { Body,Controller,Delete,Get,Path,Post,Put,Query,Res,
    Route,Tags,TsoaResponse
 } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { EmprestimoEntradaDto } from "../model/dto/EmprestimoEntradaDto";
import { Emprestimo } from "../model/entidades/Emprestimo";
@Route("emprestimos")
@Tags("Emprestimos")

export class EmprestimoController extends Controller{
    emprestimoService = EmprestimoService.getInstance();

   @Post()
    async CadastrarEmprestimo(
        @Body()dto:EmprestimoEntradaDto,
        @Res()fail:TsoaResponse<400,BasicResponseDto>,
        @Res()success:TsoaResponse<201,BasicResponseDto>
    ):Promise<void>{
        try{
            const usuario = await this.emprestimoService.InsereEmprestimo(dto);
            return success(201, new BasicResponseDto("Emprestimo adicionado: ", usuario));
        }catch(error:any){
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }
    @Get()
    async ListaTodosEmprestimos(
        @Res()fail:TsoaResponse<400,BasicResponseDto>,
        @Res()success:TsoaResponse<201,BasicResponseDto>,  
     ):Promise<Emprestimo[]>{
        try{
            return await this.emprestimoService.ListaTodosEmprestimos();
        }catch(error:any){
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }
    @Put("id/devolucao")
    async RegistrarDevolucao(
        @Res()fail:TsoaResponse<400,BasicResponseDto>,
        @Res()success:TsoaResponse<201,BasicResponseDto>,
        @Query()id:number,
    ):Promise<Emprestimo|boolean>{
        try{
            const devolucao = await this.emprestimoService.RealizaDevolucao(id);
            return success(201, new BasicResponseDto("Devolução realizada: ", devolucao))
        }catch(error:any){
            return fail(400,new BasicResponseDto(error.message, undefined))
        }
    }
}

