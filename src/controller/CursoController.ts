import { CursoService } from "../service/CursoService";
import { Body,Controller,Delete,Get,Path,Post,Put,Query,Res,
    Route,Tags,TsoaResponse
 } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { Curso } from "../model/entidades/Curso";
@Route("catalogos/cursos")
@Tags("Cursos")

export class CursoController extends Controller{
    categoriaCursoService = CursoService.getInstance();

    @Get()
    async ListarTodasCategorias(
        @Res()fail:TsoaResponse<400,BasicResponseDto>,
        @Res()success:TsoaResponse<200,BasicResponseDto>
    ):Promise<Curso[]>{
        try{
            return await this.categoriaCursoService.SelectTodasCursos();
        }catch(error:any){
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }
}




// export function ListaTodosCurso (req:Request, res:Response){
//     try{
//         res.status(200).json(cursoService.ListaCursos())
//     }catch(e:unknown){
//         res.status(400).json({status:"Error",
//             message:(e as Error).message})
//     }
// }

