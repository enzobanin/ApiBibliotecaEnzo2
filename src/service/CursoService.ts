import { Curso } from "../model/Curso";
import { CursoRepository } from "../repository/CursoRepository";

export class CursoService{
    private cursoRepository: CursoRepository = CursoRepository.getInstance();

    getCursos():Curso[]{
        return this.cursoRepository.ListaTodosCurso();
    }
}
