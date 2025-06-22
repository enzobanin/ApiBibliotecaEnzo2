import { Request, Response } from "express";
import { LivroService } from "../service/LivroService";
import { Livro } from "../model/Livro";
const livroService = new LivroService();

export function CadastrarLivro(req:Request, res:Response){
    try{
        const NovoLivro = livroService.CadastrarLivro(req.body);
        res.status(201).json({
            mensagem:"Livro adicionado!",
            Livro:NovoLivro
        });
    }catch(error:unknown){
        let message:string = "Não foi possível cadastrar o livro"
        if(error instanceof Error){
            message = error.message;
        }
    }
}

export function MostrarTodosLivros(req:Request,res:Response):void{
    try{
        res.status(200).json(livroService.GetLivros());
    }catch(e:unknown){
        res.status(400).json({status:"Operação Invalida",
            message:(e as Error).message})
    }
}
export function MostrarTodosLivrosPorISBN(req:Request,res:Response):void{
    try{
        let isbn = req.params.isbn;
        if (typeof isbn !== 'string' || isbn.trim() === '') {
            res.status(400).json({ status: "Erro", message: "Título Inválido" });
            return;
        }
        res.status(200).json(livroService.GetLivrosPorIsbn(isbn));
    }catch(e:unknown){
        res.status(400).json({status:"Erro interno",
            message:(e as Error).message})
    }
}
export function MostrarTodosLivrosPorTitulo(req:Request,res:Response):void{
    try{
        const titulo = req.query.titulo;
        if (typeof titulo !== 'string' || titulo.trim() === '') {
            res.status(400).json({ status: "Erro", message: "Título Inválido" });
            return;
        }
        const titulos = livroService.GetLivrosPorTitulo(titulo)
        res.status(200).json(titulos);
    }catch(e:unknown){
        res.status(400).json({status:"Erro interno",
            message:(e as Error).message})
    }
}
export function MostrarTodosLivrosPorAutor(req:Request,res:Response):void{
    try{
        const autor = req.query.autor;
        if (typeof autor !== 'string' || autor.trim() === '') {
            res.status(400).json({ status: "Erro", message: "Autor Inválido" });
            return;
        }
        const Autor = livroService.GetLivrosPorAutor(autor)
        res.status(200).json(Autor);
    }catch(e:unknown){
        res.status(400).json({status:"Erro interno",
            message:(e as Error).message})
    }
}
export function MostrarTodosLivrosPorEditora(req:Request,res:Response):void{
    try{
        const editora = req.query.editora;
        if (typeof editora !== 'string' || editora.trim() === '') {
            res.status(400).json({ status: "Erro", message: "Editora Inválida" });
            return;
        }
        const Editora = livroService.GetLivrosPorEditora(editora)
        res.status(200).json(Editora);
    }catch(e:unknown){
        res.status(400).json({status:"Erro interno",
            message:(e as Error).message})
    }
}
export function MostrarTodosLivrosPorCategoria(req:Request,res:Response):void{
    try{
        const categoria = parseInt(req.params.categoria);
        if (isNaN(categoria)) {
            res.status(400).json({ message: "Categoria inválida" });
            return;
        }
        res.status(200).json(livroService.GetLivrosPorCategoria(categoria));
    }catch(e:unknown){
        res.status(400).json({status:"Erro interno",
            message:(e as Error).message})
    }
}

export function AtualizaLivro(req:Request, res:Response):void{
    try{
        const isbn = req.query.isbn;
        if (typeof isbn !== 'string' || isbn.trim() === '') {
            res.status(400).json({ status: "Erro", message: "ISBN Inválido" });
            return;
        }
        const LivroAtualizado = livroService.PutLivros(isbn,req.body);
        res.status(200).json(LivroAtualizado);
    }catch(e:unknown){
        res.status(400).json({status:"Erro interno",
            message:(e as Error).message})
    }
}

export function DeletaLivroPorISBN(req:Request, res:Response):void{
    try{
        const isbn = req.query.isbn;
        if (typeof isbn !== 'string' || isbn.trim() === '') {
            res.status(400).json({ status: "Erro", message: "ISBN Inválido" });
            return;
        }
        res.status(200).json(isbn);
    }catch(e:unknown){
        res.status(400).json({status:"Erro interno",
            message:(e as Error).message})
    }
}