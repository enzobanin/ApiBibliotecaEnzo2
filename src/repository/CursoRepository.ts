import { Curso } from "../model/Curso";

export class CursoRepository{
    private static instance: CursoRepository;
    private CursoLista : Curso[] = [];

    private constructor(){
        this.CursoLista = [
            new Curso(1,"ADS"),
            new Curso(1,"Pedagogia"),
            new Curso(1,"Administração"),
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
}