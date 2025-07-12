// import { Curso } from "../model/entidades/Curso";
// import { CursoRepository } from "../repository/CursoRepository";

// export class CursoService{
//     private static instance: CursoService;
//     private cursoRepository: CursoRepository = CursoRepository.getInstance();

//     private constructor() {}

//     public static getInstance(): CursoService {
//         if (!this.instance) {
//             this.instance = new CursoService();
//         }
//         return this.instance;
//     }

//     ListaCursos():Curso[]{
//         return this.cursoRepository.ListaTodosCurso();
//     }

//     ProcuraCursoPorId(id:number):boolean{
//         if(!this.cursoRepository.ListaCursoPorId(id)){
//             throw new Error("Curso não encontrado");
//         }
//         return true;
//     }
// }
