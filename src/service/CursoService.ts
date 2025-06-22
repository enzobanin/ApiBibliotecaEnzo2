import { Curso } from "../model/Curso";
import { CursoRepository } from "../repository/CursoRepository";

export class CursoService{
    private CursoRepository: CursoRepository = CursoRepository.getInstance();

    getCursos():Curso[]{
        return this.CursoRepository.ListaTodosCurso();
    }
}
