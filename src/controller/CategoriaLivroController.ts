import { Request, Response } from "express";
import { CategoriaLivroService } from "../service/CategoriaLivroService";
const categoriaLivroService = new CategoriaLivroService();

export function ListaTodasCategorias(req:Request, res:Response){
    try {
        res.status(200).json(categoriaLivroService.ListaCategoriaLivros());
    }catch(e:unknown){
        res.status(400).json({status:"Error",
            message:(e as Error).message})
    }
}