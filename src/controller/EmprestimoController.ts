import { Request, Response } from "express";
import { EmprestimoService } from "../service/EmprestimoService";
import { Emprestimo } from "../model/Emprestimo";
const emprestimoService = EmprestimoService.getInstance();

export function InsereEmprestimo(req:Request, res:Response){
    try{
        const novoEmprestimo = emprestimoService.InsereEmprestimo(req.body);
            res.status(201).json({
                mensagem:"Emprestimo adicionado!",
                Emprestimo:novoEmprestimo
                });
    }catch(error:unknown){
        let message:string = "Não foi possível cadastrar emprestimo"
        if(error instanceof Error){
            message = error.message;
        }
         res.status(400).json({ status: "Erro", message })
    }
}

export function MostrarTodosOsEmprestimos(req:Request, res:Response):void{
    try{
        res.status(200).json(emprestimoService.GetEmprestimos());
    }catch(e:unknown){
        res.status(400).json({status:"Operação Invalida",
            message:(e as Error).message})
    }
}

export function RegistraDevolucao(req:Request, res:Response):void{
    try{
        const id = parseInt(req.params.id);
        if (isNaN(id)){
            res.status(404).json({ message: "ID inválido" });
            return;
        }
        res.status(200).json(emprestimoService.RealizaDevolucao(id));
    }catch(e:unknown){
        res.status(400).json({status:"Erro interno",
            message:(e as Error).message})
    }
}

