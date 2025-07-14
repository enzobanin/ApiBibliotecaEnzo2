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
            return false;
        }
        return true;
    }
}
