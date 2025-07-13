import { Curso } from "../model/entidades/Curso";
import { CursoRepository } from "../repository/CursoRepository";

export class CursoService{
    private static instance: CursoService;
    private cursoRepository: CursoRepository = CursoRepository.getInstance();

    private constructor() {}

    static getInstance(){
        if (!this.instance) {
            this.instance = new CursoService();
        }
        return this.instance;
    }

    async SelectTodasCursos():Promise<Curso[]>{
            return this.cursoRepository.SelectCursos();
    }

    async SelectCursoPorId(id:number):Promise<boolean>{
        const categoriaExistente = await this.cursoRepository.SelectCursoPorId(id);
        if(!categoriaExistente){
            throw new Error("Curso com este ID não encontrado");
        }
        return true;
    }
    // ListaCursos():Curso[]{
    //     return this.cursoRepository.ListaTodosCurso();
    // }

    // ProcuraCursoPorId(id:number):boolean{
    //     if(!this.cursoRepository.ListaCursoPorId(id)){
    //         throw new Error("Curso não encontrado");
    //     }
    //     return true;
    // }
}
