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


// export function InsereEmprestimo(req:Request, res:Response){
//     try{
//         const novoEmprestimo = emprestimoService.InsereEmprestimo(req.body);
//             res.status(201).json({
//                 mensagem:"Emprestimo adicionado!",
//                 Emprestimo:novoEmprestimo
//                 });
//     }catch(error:unknown){
//         let message:string = "Não foi possível cadastrar emprestimo"
//         if(error instanceof Error){
//             message = error.message;
//         }
//          res.status(400).json({ status: "Erro", message })
//     }
// }

// export function MostrarTodosOsEmprestimos(req:Request, res:Response):void{
//     try{
//         res.status(200).json(emprestimoService.ListaEmprestimos());
//     }catch(e:unknown){
//         res.status(400).json({status:"Operação Invalida",
//             message:(e as Error).message})
//     }
// }

// export function RegistraDevolucao(req:Request, res:Response):void{
//     try{
        
//         const id = parseInt(req.params.id);
//         if (isNaN(id)){
//             res.status(404).json({ message: "ID inválido" });
//             return;
//         }
//         const devolucao = emprestimoService.RealizaDevolucao(id)
//         if (!devolucao) {
//             res.status(404).json({ message: "Empréstimo não encontrado" });
//             return;
//         }
//         res.status(200).json({
//             mensagem: "Devolução realizada com sucesso",
//             emprestimo: devolucao
//         });
//     }catch(e:unknown){
//         res.status(400).json({status:"Erro interno",
//             message:(e as Error).message})
//     }
// }

