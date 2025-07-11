import { Request,Response } from "express";
import { CategoriaUsuarioService } from "../service/CategoriaUsuarioService";

const categoriaUsuarioService = CategoriaUsuarioService.getInstance();

export function ListaTodosCategoriasUsuario(req:Request, res:Response){
    try{
        res.status(200).json(categoriaUsuarioService.ListaCategoriaUsuario());
    }catch(e:unknown){
        res.status(400).json({status:"Error",
            message:(e as Error).message
        })
    }
}