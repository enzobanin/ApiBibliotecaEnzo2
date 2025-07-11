import { Request,Response } from "express";
import { CursoService } from "../service/CursoService";
const cursoService = CursoService.getInstance();

export function ListaTodosCurso (req:Request, res:Response){
    try{
        res.status(200).json(cursoService.ListaCursos())
    }catch(e:unknown){
        res.status(400).json({status:"Error",
            message:(e as Error).message})
    }
}

