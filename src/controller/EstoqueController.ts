import { Request, Response } from "express";
import { EstoqueService} from "../service/EstoqueService";
const estoqueService = EstoqueService.getInstance();

export function InserirExemplar(req:Request, res:Response){
    try{
        const novoExemplar = estoqueService.InsereNovoExemplar(req.body);
        res.status(201).json({
            status:"Exemplar Adicionado com sucesso",
            Exemplar: novoExemplar
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
        res.status(200).json(estoqueService.ListaExemplarComDisponibilidade());
    }catch(e:unknown){
        res.status(400).json({status:"Operação Invalida",
            message:(e as Error).message})
    }
}

export function ListaExemplarPorISBN(req:Request, res:Response):void{
    try{
        let isbn = req.params.isbn;
        if (typeof isbn !== 'string' || isbn.trim() === '') {
            res.status(400).json({ status: "Erro", message: "ISBN Inválido" });
            return;
        }
        res.status(200).json(estoqueService.ListaExemplarPorISBN(isbn));
    }catch(e:unknown){
        res.status(400).json({status:"Erro interno",
            message:(e as Error).message})
    }
}

export function AtualizaDisponibilidadePorISBN(req:Request, res:Response):void{
    try{
        let isbn = req.params.isbn;
        if (typeof isbn !== 'string' || isbn.trim() === '') {
            res.status(400).json({ status: "Erro", message: "ISBN Inválido" });
            return;
        }
        const exemplarAtualizado =estoqueService.AtualizaDisponibilidade(isbn,req.body)
        res.status(201).json({
            status:"Exemplar Atualizado com sucesso",
            ExemplarAtualizado: exemplarAtualizado
        });
    }catch(e:unknown){
        res.status(400).json({status:"Erro interno",
            message:(e as Error).message})
    }
}

export function DeletaExemplarPorISBN(req:Request, res:Response):void{
    try{
        let isbn = req.params.isbn;
        if (typeof isbn !== 'string' || isbn.trim() === '') {
            res.status(400).json({ status: "Erro", message: "ISBN Inválido" });
            return;
        }
        const exemplarDeletado = estoqueService.DeleteExemplarPorISBN(isbn)
        res.status(201).json({
            status:"Exemplar Deletado com sucesso",
            ExemplarDeletado: exemplarDeletado
        });
    }catch(e:unknown){
        res.status(400).json({status:"Erro interno",
            message:(e as Error).message})
    }
}
