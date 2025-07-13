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

// export function CadastrarLivro(req:Request, res:Response){
//     try{
//         const NovoLivro = livroService.CadastrarLivro(req.body);
//         res.status(201).json({
//             mensagem:"Livro adicionado!",
//             Livro:NovoLivro
//         });
//     }catch(error:unknown){
//         let message:string = "Não foi possível cadastrar o livro"
//         if(error instanceof Error){
//             message = error.message;
//         }
//          res.status(500).json({ status: "Erro", message })
//     }
// }

// export function MostrarTodosLivrosPorISBN(req:Request,res:Response):void{
//     try{
//         let isbn = req.params.isbn;
//         if (typeof isbn !== 'string' || isbn.trim() === '') {
//             res.status(400).json({ status: "Erro", message: "ISBN Inválido" });
//             return;
//         }
//         res.status(200).json(livroService.ListaLivrosPorISBN(isbn));
//     }catch(e:unknown){
//         res.status(400).json({status:"Erro interno",
//             message:(e as Error).message})
//     }
// }
// export function MostrarLivrosFiltrados(req: Request, res: Response): void {
//   try {
//     const { titulo, autor, editora, categoria_id } = req.query;

//     const query = {
//       titulo: typeof titulo === "string" ? titulo : undefined,
//       autor: typeof autor === "string" ? autor : undefined,
//       editora: typeof editora === "string" ? editora : undefined,
//       categoria_id: categoria_id ? parseInt(categoria_id as string) : undefined,
//     };

//     const livros = livroService.ListaLivrosFiltrados(query);
//     res.status(200).json(livros);
//   } catch (e: unknown) {
//     res.status(400).json({ status: "Erro interno", message: (e as Error).message });
//   }
// }
// export function AtualizaLivro(req:Request, res:Response):void{
//     try{
//         const isbn = req.params.isbn;
//         if (typeof isbn !== 'string' || isbn.trim() === '') {
//             res.status(400).json({ status: "Erro", message: "ISBN Inválido" });
//             return;
//         }
//         const LivroAtualizado = livroService.AtualizaLivros(isbn,req.body);
//         res.status(200).json(LivroAtualizado);
//     }catch(e:unknown){
//         res.status(400).json({status:"Erro interno",
//             message:(e as Error).message})
//     }
// }

// export function DeletaLivroPorISBN(req:Request, res:Response):void{
//     try{
//         const isbn = req.params.isbn;
//         if (typeof isbn !== 'string' || isbn.trim() === '') {
//             res.status(400).json({ status: "Erro", message: "ISBN Inválido" });
//             return;
//         }
//         const resultado = livroService.DeleteLivroPorisbn(isbn);
//         res.status(200).json({
//             status:"Deletado com sucesso",
//             deletado : resultado
//         });
//     }catch(e:unknown){
//         res.status(400).json({status:"Erro interno",
//             message:(e as Error).message})
//     }
// }