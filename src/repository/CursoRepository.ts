import { Curso } from "../model/entidades/Curso";

export class CursoRepository{
    private static instance: CursoRepository;
    private CursoLista : Curso[] = [];

    private constructor(){
        this.CursoLista = [
            new Curso(1,"ADS"),
            new Curso(2,"Pedagogia"),
            new Curso(3,"Administração"),
        ]
    }

    public static getInstance():CursoRepository{
        if(!this.instance){
            this.instance = new CursoRepository();
        }
        return this.instance;
    }
    
    ListaTodosCurso():Curso[]{
        return this.CursoLista;
    }
    ListaCursoPorId(id:number):boolean{
        const curso = this.CursoLista.findIndex(c=>c.id === id);
        if(curso!==-1){
            return true;
        }
        return false;
    }
}