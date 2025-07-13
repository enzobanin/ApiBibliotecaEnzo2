import { EstoqueService } from "../service/EstoqueService";
import { Body,Controller,Delete,Get,Path,Post,Put,Query,Res,
    Route,Tags,TsoaResponse
 } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { Estoque } from "../model/entidades/Estoque";
import { EstoqueDto } from "../model/dto/EstoqueDto";
@Route("estoque")
@Tags("Estoque")

export class EstoqueController extends Controller{
    estoqueService = EstoqueService.getInstance();

    @Post()
    async CadastrarExemplar(
    @Body()dto:EstoqueDto,
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
    ):Promise<Estoque[]>{
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
    ):Promise<Estoque|boolean>{
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
        @Body()dto:EstoqueDto,
    ):Promise<Estoque|boolean>{
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

// export function InserirExemplar(req:Request, res:Response){
//     try{
//         const novoExemplar = estoqueService.InsereNovoExemplar(req.body);
//         res.status(201).json({
//             status:"Exemplar Adicionado com sucesso",
//             Exemplar: novoExemplar
//         });
//     }catch(error:unknown){
//         let message:string = "Não foi possível cadastrar o exemplar"
//         if(error instanceof Error){
//             console.error("Erro ao cadastrar exemplar", error.message);
//             message = error.message;
//         }
//          res.status(400).json({ status: "Erro", message })
//     }
// }

// export function ListaExemplarPorDisponibilidade(req:Request,res:Response):void{
//     try{
//         res.status(200).json(estoqueService.ListaExemplarComDisponibilidade());
//     }catch(e:unknown){
//         res.status(400).json({status:"Operação Invalida",
//             message:(e as Error).message})
//     }
// }

// export function ListaExemplarPorISBN(req:Request, res:Response):void{
//     try{
//         let isbn = req.params.isbn;
//         if (typeof isbn !== 'string' || isbn.trim() === '') {
//             res.status(400).json({ status: "Erro", message: "ISBN Inválido" });
//             return;
//         }
//         res.status(200).json(estoqueService.ListaExemplarPorISBN(isbn));
//     }catch(e:unknown){
//         res.status(400).json({status:"Erro interno",
//             message:(e as Error).message})
//     }
// }

// export function AtualizaDisponibilidadePorISBN(req:Request, res:Response):void{
//     try{
//         let isbn = req.params.isbn;
//         if (typeof isbn !== 'string' || isbn.trim() === '') {
//             res.status(400).json({ status: "Erro", message: "ISBN Inválido" });
//             return;
//         }
//         const exemplarAtualizado =estoqueService.AtualizaDisponibilidade(isbn,req.body)
//         res.status(201).json({
//             status:"Exemplar Atualizado com sucesso",
//             ExemplarAtualizado: exemplarAtualizado
//         });
//     }catch(e:unknown){
//         res.status(400).json({status:"Erro interno",
//             message:(e as Error).message})
//     }
// }

// export function DeletaExemplarPorISBN(req:Request, res:Response):void{
//     try{
//         let isbn = req.params.isbn;
//         if (typeof isbn !== 'string' || isbn.trim() === '') {
//             res.status(400).json({ status: "Erro", message: "ISBN Inválido" });
//             return;
//         }
//         const exemplarDeletado = estoqueService.DeleteExemplarPorISBN(isbn)
//         res.status(201).json({
//             status:"Exemplar Deletado com sucesso",
//             ExemplarDeletado: exemplarDeletado
//         });
//     }catch(e:unknown){
//         res.status(400).json({status:"Erro interno",
//             message:(e as Error).message})
//     }
// }
