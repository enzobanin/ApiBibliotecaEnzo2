import { Request, Response } from "express";
import { EstoqueService} from "../service/EstoqueService";
const estoqueService = EstoqueService.getInstance();

export function InserirExemplar(req:Request, res:Response){
    try{
        const novoExemplar = estoqueService.InsereNovoExemplar(req.body);
        res.status(201).json({
            status:"Exemplar Adicionado com sucesso",
            Livro: novoExemplar
        });
    }catch(error:unknown){
        let message:string = "Não foi possível cadastrar o exemplar"
        if(error instanceof Error){
            console.error("Erro ao cadastrar exemplar", error.message);
            message = error.message;
        }
         res.status(400).json({ status: "Erro", message })
    }
}

export function ListaExemplarPorDisponibilidade(req:Request,res:Response):void{
    try{
        res.status(200).json(estoqueService.GetExemplarComDisponibilidade());
    }catch(e:unknown){
        res.status(400).json({status:"Operação Invalida",
            message:(e as Error).message})
    }
}

export function ListaExemplarPorId(req:Request, res:Response):void{
    try{
        const id = parseInt(req.params.id);
        if(isNaN(id)){
            res.status(404).json({ message: "ID inválido" });
            return;
        }
        res.status(200).json(estoqueService.GetExemplarPorID(id));
    }catch(e:unknown){
        res.status(400).json({status:"Erro interno",
            message:(e as Error).message})
    }
}

export function DeletaExemplarPorId(req:Request, res:Response):void{
    try{
        const id = parseInt(req.params.id);
        if(isNaN(id)){
            res.status(400).json({message:"ID inválido"});
            return;
        }
        res.status(200).json(estoqueService.DeleteExemplarPorId(id));
    }catch(e:unknown){
        res.status(400).json({status:"Erro interno",
            message:(e as Error).message})
    }
}
